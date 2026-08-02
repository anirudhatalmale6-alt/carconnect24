const express = require('express');
const session = require('express-session');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'carconnect24-secret-change-me',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
}));

app.use('/uploads', express.static(UPLOAD_DIR, { maxAge: '7d' }));
app.use(express.static(path.join(__dirname, 'public')));

// ---- Multer: accept images in memory, we resize with sharp ----
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 12 * 1024 * 1024, files: 20 }
});

function requireAuth(req, res, next) {
  if (req.session && req.session.userId) return next();
  return res.status(401).json({ error: 'Not authenticated' });
}

// ================= PUBLIC API =================

// Brand list (for filters + admin search)
app.get('/api/brands', (req, res) => {
  const rows = db.prepare('SELECT name FROM brands ORDER BY name').all();
  res.json(rows.map(r => r.name));
});

// Distinct models for a make (for dependent dropdowns)
app.get('/api/models', (req, res) => {
  const make = req.query.make;
  if (!make) return res.json([]);
  const rows = db.prepare('SELECT DISTINCT model FROM cars WHERE make = ? ORDER BY model').all(make);
  res.json(rows.map(r => r.model));
});

// Search / filter cars — server-side, paginated & indexed
app.get('/api/cars', (req, res) => {
  const q = req.query;
  const where = [];
  const params = {};
  if (q.make)      { where.push('make = @make'); params.make = q.make; }
  if (q.model)     { where.push('model = @model'); params.model = q.model; }
  if (q.fuel)      { where.push('fuel IN (' + q.fuel.split(',').map((_,i)=>`@fuel${i}`).join(',') + ')');
                     q.fuel.split(',').forEach((v,i)=>params['fuel'+i]=v); }
  if (q.gearbox)   { where.push('gearbox IN (' + q.gearbox.split(',').map((_,i)=>`@gb${i}`).join(',') + ')');
                     q.gearbox.split(',').forEach((v,i)=>params['gb'+i]=v); }
  if (q.body)      { where.push('body IN (' + q.body.split(',').map((_,i)=>`@bd${i}`).join(',') + ')');
                     q.body.split(',').forEach((v,i)=>params['bd'+i]=v); }
  if (q.pmin)      { where.push('price >= @pmin'); params.pmin = +q.pmin; }
  if (q.pmax)      { where.push('price <= @pmax'); params.pmax = +q.pmax; }
  if (q.yearmin)   { where.push('year >= @yearmin'); params.yearmin = +q.yearmin; }
  if (q.mileagemax){ where.push('mileage <= @mileagemax'); params.mileagemax = +q.mileagemax; }
  if (q.q) {
    where.push('(make LIKE @kw OR model LIKE @kw OR fuel LIKE @kw OR body LIKE @kw OR color LIKE @kw)');
    params.kw = '%' + q.q + '%';
  }
  if (q.includeSold !== '1') where.push('sold = 0');

  const whereSql = where.length ? 'WHERE ' + where.join(' AND ') : '';

  const sortMap = {
    pl: 'price ASC', ph: 'price DESC', yn: 'year DESC',
    mm: 'mileage ASC', new: 'created_at DESC'
  };
  const orderSql = 'ORDER BY ' + (sortMap[q.sort] || 'created_at DESC');

  const page = Math.max(1, parseInt(q.page) || 1);
  const size = Math.min(48, Math.max(1, parseInt(q.size) || 12));
  const offset = (page - 1) * size;

  const total = db.prepare(`SELECT COUNT(*) c FROM cars ${whereSql}`).get(params).c;
  const rows = db.prepare(`SELECT * FROM cars ${whereSql} ${orderSql} LIMIT ${size} OFFSET ${offset}`).all(params);
  res.json({
    total, page, size, pages: Math.max(1, Math.ceil(total / size)),
    cars: rows.map(hydrate)
  });
});

app.get('/api/cars/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM cars WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(hydrate(row));
});

function hydrate(row) {
  return { ...row,
    features: JSON.parse(row.features || '[]'),
    photos: JSON.parse(row.photos || '[]'),
    sold: !!row.sold
  };
}

// ================= AUTH =================
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const uname = (username || '').trim();
  const user = db.prepare('SELECT * FROM users WHERE username = ? COLLATE NOCASE').get(uname);
  if (!user || !bcrypt.compareSync((password || '').trim(), user.password_hash)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  req.session.userId = user.id;
  req.session.username = user.username;
  res.json({ ok: true, username: user.username });
});
app.post('/api/logout', (req, res) => { req.session.destroy(() => res.json({ ok: true })); });
app.get('/api/me', (req, res) => {
  if (req.session && req.session.userId) return res.json({ username: req.session.username });
  res.status(401).json({ error: 'Not authenticated' });
});

// ================= ADMIN: cars =================
app.post('/api/admin/cars', requireAuth, upload.array('photos', 20), async (req, res) => {
  try {
    const photos = await savePhotos(req.files);
    const b = req.body;
    const info = db.prepare(`INSERT INTO cars
      (make,model,year,price,mileage,power,fuel,gearbox,body,color,doors,seats,location,description,features,photos)
      VALUES (@make,@model,@year,@price,@mileage,@power,@fuel,@gearbox,@body,@color,@doors,@seats,@location,@description,@features,@photos)`)
      .run(normalize(b, photos));
    res.json({ ok: true, id: info.lastInsertRowid });
  } catch (e) { console.error(e); res.status(400).json({ error: e.message }); }
});

app.put('/api/admin/cars/:id', requireAuth, upload.array('photos', 20), async (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM cars WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Not found' });
    const newPhotos = await savePhotos(req.files);
    const kept = req.body.existingPhotos ? JSON.parse(req.body.existingPhotos) : [];
    const photos = [...kept, ...newPhotos];
    const data = normalize(req.body, photos);
    data.id = req.params.id;
    db.prepare(`UPDATE cars SET make=@make,model=@model,year=@year,price=@price,mileage=@mileage,
      power=@power,fuel=@fuel,gearbox=@gearbox,body=@body,color=@color,doors=@doors,seats=@seats,
      location=@location,description=@description,features=@features,photos=@photos WHERE id=@id`).run(data);
    res.json({ ok: true });
  } catch (e) { console.error(e); res.status(400).json({ error: e.message }); }
});

app.patch('/api/admin/cars/:id/sold', requireAuth, (req, res) => {
  db.prepare('UPDATE cars SET sold = ? WHERE id = ?').run(req.body.sold ? 1 : 0, req.params.id);
  res.json({ ok: true });
});

app.delete('/api/admin/cars/:id', requireAuth, (req, res) => {
  const row = db.prepare('SELECT photos FROM cars WHERE id = ?').get(req.params.id);
  if (row) {
    JSON.parse(row.photos || '[]').forEach(p => {
      const f = path.join(UPLOAD_DIR, path.basename(p));
      fs.existsSync(f) && fs.unlinkSync(f);
    });
  }
  db.prepare('DELETE FROM cars WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

// add a brand on the fly (admin one-click)
app.post('/api/admin/brands', requireAuth, (req, res) => {
  const name = (req.body.name || '').trim();
  if (!name) return res.status(400).json({ error: 'Name required' });
  db.prepare('INSERT OR IGNORE INTO brands (name) VALUES (?)').run(name);
  res.json({ ok: true });
});

let photoSeq = 0;
async function savePhotos(files) {
  if (!files || !files.length) return [];
  const out = [];
  for (const f of files) {
    photoSeq = (photoSeq + 1) % 100000;
    const base = Date.now().toString(36) + '-' + photoSeq;
    const name = base + '.jpg';
    await sharp(f.buffer)
      .rotate()
      .resize(1280, 960, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toFile(path.join(UPLOAD_DIR, name));
    out.push('/uploads/' + name);
  }
  return out;
}

function normalize(b, photos) {
  let features = b.features;
  if (typeof features === 'string') { try { features = JSON.parse(features); } catch { features = features ? [features] : []; } }
  return {
    make: b.make || '', model: b.model || '',
    year: +b.year || null, price: +b.price || null, mileage: +b.mileage || null,
    power: +b.power || null, fuel: b.fuel || null, gearbox: b.gearbox || null,
    body: b.body || null, color: b.color || null, doors: +b.doors || null,
    seats: +b.seats || null, location: b.location || null, description: b.description || null,
    features: JSON.stringify(Array.isArray(features) ? features : []),
    photos: JSON.stringify(photos)
  };
}

// admin count for dashboard
app.get('/api/admin/stats', requireAuth, (req, res) => {
  const total = db.prepare('SELECT COUNT(*) c FROM cars').get().c;
  const sold = db.prepare('SELECT COUNT(*) c FROM cars WHERE sold=1').get().c;
  res.json({ total, live: total - sold, sold });
});

app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`CarConnect24 running on http://localhost:${PORT}`));
