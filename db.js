const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { BRANDS } = require('./brands');

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, 'carconnect.db'));
db.pragma('journal_mode = WAL');
db.pragma('busy_timeout = 5000');

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS brands (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL
);
CREATE TABLE IF NOT EXISTS cars (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER,
  price INTEGER,
  mileage INTEGER,
  power INTEGER,
  fuel TEXT,
  gearbox TEXT,
  body TEXT,
  color TEXT,
  doors INTEGER,
  seats INTEGER,
  location TEXT,
  description TEXT,
  features TEXT DEFAULT '[]',
  photos TEXT DEFAULT '[]',
  sold INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_cars_make ON cars(make);
CREATE INDEX IF NOT EXISTS idx_cars_price ON cars(price);
CREATE INDEX IF NOT EXISTS idx_cars_year ON cars(year);
CREATE INDEX IF NOT EXISTS idx_cars_mileage ON cars(mileage);
CREATE INDEX IF NOT EXISTS idx_cars_fuel ON cars(fuel);
`);

// Seed admin user (default; change via env)
const adminUser = process.env.ADMIN_USER || 'admin';
const adminPass = process.env.ADMIN_PASS || 'carconnect2026';
const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(adminUser);
if (!existing) {
  db.prepare('INSERT INTO users (username, password_hash) VALUES (?,?)')
    .run(adminUser, bcrypt.hashSync(adminPass, 10));
  console.log('Seeded admin user:', adminUser);
}

// Seed brands
const brandCount = db.prepare('SELECT COUNT(*) c FROM brands').get().c;
if (brandCount === 0) {
  const ins = db.prepare('INSERT OR IGNORE INTO brands (name) VALUES (?)');
  const tx = db.transaction(list => list.forEach(b => ins.run(b)));
  tx(BRANDS);
  console.log('Seeded', BRANDS.length, 'brands');
}

module.exports = db;
