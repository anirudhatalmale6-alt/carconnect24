const $ = s => document.querySelector(s);
const euro = n => n==null ? '—' : '€' + (+n).toLocaleString('en-US');
const km = n => n==null ? '—' : (+n).toLocaleString('en-US') + ' km';
let BRANDS = [];
let newPhotos = [];      // {file, url}
let keptPhotos = [];     // existing photo URLs when editing
let editingId = null;
let t0 = null, tickInt = null;

// ---------- auth ----------
fetch('/api/me').then(r => r.ok ? r.json() : Promise.reject()).then(showDash).catch(showLogin);
function showLogin(){ $('#loginView').style.display='block'; $('#dash').style.display='none'; $('#logoutBtn').style.display='none'; }
async function showDash(){
  $('#loginView').style.display='none'; $('#dash').style.display='block'; $('#logoutBtn').style.display='inline';
  BRANDS = await fetch('/api/brands').then(r=>r.json());
  buildFeatures(); setupCombo(); refreshStats();
}
$('#loginBtn').onclick = async () => {
  const r = await fetch('/api/login', { method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ username:$('#lu').value, password:$('#lp').value }) });
  if(r.ok) showDash(); else $('#loginErr').textContent = 'Invalid username or password';
};
$('#lp').addEventListener('keydown', e => { if(e.key==='Enter') $('#loginBtn').click(); });
$('#logoutBtn').onclick = async (e) => { e.preventDefault(); await fetch('/api/logout',{method:'POST'}); showLogin(); };

// ---------- tabs ----------
document.querySelectorAll('.tab').forEach(t => t.onclick = () => {
  document.querySelectorAll('.tab').forEach(x=>x.classList.remove('on'));
  t.classList.add('on');
  const tab=t.dataset.tab;
  $('#tab-add').style.display = tab==='add'?'block':'none';
  $('#tab-inv').style.display = tab==='inv'?'block':'none';
  if(tab==='inv') loadInventory();
});

// ---------- features ----------
const FEATURES=['Navigation','Leather seats','Panoramic roof','Adaptive cruise','Heated seats','Apple CarPlay','Android Auto','Parking sensors','LED headlights','360 camera','Keyless entry','Lane assist','Blind spot','Tow bar','Air conditioning','Cruise control','Alloy wheels','Bluetooth'];
function buildFeatures(){ $('#feats').innerHTML = FEATURES.map(f=>`<div class="chip" data-v="${f}">${f}</div>`).join(''); }

// single/multi chip groups
document.addEventListener('click', e => {
  if(!e.target.classList.contains('chip')) return;
  const g = e.target.parentElement;
  const single = ['fuel','gearbox','body'].includes(g.id);
  if(single) g.querySelectorAll('.chip').forEach(c=>{ if(c!==e.target) c.classList.remove('on'); });
  e.target.classList.toggle('on');
  startTimer();
});

// ---------- brand combobox with add-new ----------
function setupCombo(){
  const input=$('#make'), list=$('#makeList'), addBrand=$('#addBrand');
  let active=-1;
  const render = term => {
    const t=(term||'').toLowerCase().trim();
    const shown = BRANDS.filter(b=>b.toLowerCase().includes(t));
    list.innerHTML = shown.length ? shown.map(b=>`<div data-v="${b}">${b}</div>`).join('')
      : '<div class="none" style="color:var(--muted)">No match — you can add it below</div>';
    active=-1;
    // offer add-new if exact match not present
    const exact = BRANDS.some(b=>b.toLowerCase()===t);
    if(t && !exact){ addBrand.style.display='inline-block'; addBrand.textContent='+ Add "'+input.value.trim()+'" as a new brand'; }
    else addBrand.style.display='none';
  };
  input.addEventListener('focus',()=>{render(input.value);list.classList.add('open');});
  input.addEventListener('input',()=>{render(input.value);list.classList.add('open');startTimer();});
  input.addEventListener('keydown',e=>{
    const opts=[...list.querySelectorAll('div[data-v]')];
    if(e.key==='ArrowDown'){e.preventDefault();active=Math.min(active+1,opts.length-1);}
    else if(e.key==='ArrowUp'){e.preventDefault();active=Math.max(active-1,0);}
    else if(e.key==='Enter'){e.preventDefault();if(opts[active])opts[active].click();else if(opts.length===1)opts[0].click();return;}
    else return;
    opts.forEach((o,i)=>o.classList.toggle('active',i===active));
    if(opts[active])opts[active].scrollIntoView({block:'nearest'});
  });
  list.addEventListener('click',e=>{
    const d=e.target.closest('div[data-v]'); if(!d)return;
    input.value=d.dataset.v; list.classList.remove('open'); addBrand.style.display='none';
  });
  addBrand.onclick = async () => {
    const name = input.value.trim(); if(!name) return;
    await fetch('/api/admin/brands',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name})});
    if(!BRANDS.includes(name)) BRANDS.push(name);
    BRANDS.sort();
    addBrand.style.display='none'; list.classList.remove('open');
    toast(name+' added to your brand list');
  };
  document.addEventListener('click',e=>{ if(!e.target.closest('#makeCombo') && !e.target.closest('#addBrand')) list.classList.remove('open'); });
}

// ---------- timer ----------
function startTimer(){ if(t0) return; t0=Date.now();
  tickInt=setInterval(()=>{ const s=Math.floor((Date.now()-t0)/1000);
    $('#timer').textContent=Math.floor(s/60)+':'+String(s%60).padStart(2,'0'); },500);
}
function resetTimer(){ clearInterval(tickInt); t0=null; $('#timer').textContent='0:00'; }

// ---------- photos ----------
const drop=$('#drop'), fileInput=$('#file');
drop.onclick=()=>fileInput.click();
['dragover','dragenter'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.add('hover');}));
['dragleave','drop'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.remove('hover');}));
drop.addEventListener('drop',e=>addFiles(e.dataTransfer.files));
fileInput.onchange=e=>addFiles(e.target.files);
function addFiles(files){ startTimer();
  [...files].forEach(f=>{ if(!f.type.startsWith('image/'))return;
    newPhotos.push({file:f, url:URL.createObjectURL(f)}); });
  renderThumbs();
}
function renderThumbs(){
  const all = [...keptPhotos.map(u=>({url:u, kept:true})), ...newPhotos.map((p,i)=>({url:p.url, ni:i}))];
  $('#thumbs').innerHTML = all.map((p,i)=>`<div class="thumb ${i===0?'cover':''}">
    <img src="${p.url}"><button data-kept="${p.kept?1:0}" data-i="${p.kept?keptPhotos.indexOf(p.url):p.ni}">×</button></div>`).join('');
  document.querySelectorAll('#thumbs button').forEach(b=>b.onclick=()=>{
    if(b.dataset.kept==='1') keptPhotos.splice(+b.dataset.i,1);
    else newPhotos.splice(+b.dataset.i,1);
    renderThumbs();
  });
}

// ---------- submit (add or edit) ----------
$('#carForm').addEventListener('submit', async e => {
  e.preventDefault();
  const make=$('#make').value.trim(), model=$('#model').value.trim(), price=$('#price').value.trim();
  if(!make||!model||!price){ toast('Add at least brand, model & price', true); return; }
  const fd = new FormData();
  const fields=['make','model','year','price','mileage','power','color','doors','seats','location','description'];
  fields.forEach(f=>fd.append(f, $('#'+f).value));
  fd.append('fuel', sel('#fuel')); fd.append('gearbox', sel('#gearbox')); fd.append('body', sel('#body'));
  fd.append('features', JSON.stringify([...document.querySelectorAll('#feats .chip.on')].map(c=>c.dataset.v)));
  newPhotos.forEach(p=>fd.append('photos', p.file));
  if(editingId) fd.append('existingPhotos', JSON.stringify(keptPhotos));

  $('#publishBtn').disabled=true; $('#publishBtn').textContent = editingId?'Saving…':'Publishing…';
  const url = editingId ? '/api/admin/cars/'+editingId : '/api/admin/cars';
  const method = editingId ? 'PUT' : 'POST';
  const r = await fetch(url, { method, body: fd });
  $('#publishBtn').disabled=false; $('#publishBtn').textContent='Publish car →';
  if(!r.ok){ toast('Something went wrong, try again', true); return; }
  const secs = t0 ? Math.floor((Date.now()-t0)/1000) : 0;
  toast(editingId ? `${make} ${model} updated` : `${make} ${model} published in ${Math.floor(secs/60)}:${String(secs%60).padStart(2,'0')} — now live!`);
  resetForm(); refreshStats();
});
function sel(id){ const c=document.querySelector(id+' .chip.on'); return c?c.dataset.v:''; }

$('#clearBtn').onclick = resetForm;
$('#cancelEdit').onclick = resetForm;
function resetForm(){
  editingId=null; newPhotos=[]; keptPhotos=[];
  $('#carForm').reset();
  document.querySelectorAll('.chip.on').forEach(c=>c.classList.remove('on'));
  renderThumbs(); resetTimer();
  $('#formTitle').textContent='Add a new car';
  $('#publishBtn').textContent='Publish car →';
  $('#cancelEdit').style.display='none';
  $('#addBrand').style.display='none';
}

// ---------- inventory ----------
let invPage=1, invQ='';
$('#invSearch').oninput = e => { invQ=e.target.value; invPage=1; clearTimeout(window._iv); window._iv=setTimeout(loadInventory,250); };
async function loadInventory(){
  const p=new URLSearchParams({ q:invQ, page:invPage, size:8, includeSold:'1', sort:'new' });
  const data = await fetch('/api/cars?'+p).then(r=>r.json());
  $('#invList').innerHTML = data.cars.length ? data.cars.map(c=>`
    <div class="invrow">
      <img src="${c.photos[0]||''}" onerror="this.style.visibility='hidden'">
      <div><div class="t">${c.make} ${c.model} ${c.sold?'<span style="color:#c0392b">· SOLD</span>':''}</div>
        <div class="s">${c.year||''} · ${km(c.mileage)} · ${euro(c.price)}</div></div>
      <div style="display:flex;gap:8px">
        <button class="mini" onclick="editCar(${c.id})">Edit</button>
        <button class="mini ${c.sold?'on':''}" onclick="toggleSold(${c.id},${c.sold?0:1})">${c.sold?'Mark available':'Mark sold'}</button>
        <button class="mini del" onclick="delCar(${c.id})">Delete</button>
      </div>
    </div>`).join('') : '<p style="color:var(--muted)">No cars yet. Add your first one from the “Add a car” tab.</p>';
  renderInvPager(data.pages, data.page);
}
function renderInvPager(pages,cur){
  const p=$('#invPager'); if(pages<=1){p.innerHTML='';return;}
  let h='';
  for(let i=1;i<=pages;i++) h+=`<button class="${i===cur?'on':''}" onclick="invPage=${i};loadInventory()">${i}</button>`;
  p.innerHTML=h;
}
window.toggleSold = async (id,sold) => { await fetch('/api/admin/cars/'+id+'/sold',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({sold})}); loadInventory(); refreshStats(); };
window.delCar = async (id) => { if(!confirm('Delete this car permanently?'))return; await fetch('/api/admin/cars/'+id,{method:'DELETE'}); loadInventory(); refreshStats(); toast('Car deleted'); };
window.editCar = async (id) => {
  const c = await fetch('/api/cars/'+id).then(r=>r.json());
  editingId=id; newPhotos=[]; keptPhotos=[...c.photos];
  document.querySelector('.tab[data-tab="add"]').click();
  $('#formTitle').textContent='Edit car';
  $('#publishBtn').textContent='Save changes';
  $('#cancelEdit').style.display='inline-block';
  ['model','year','price','mileage','power','color','doors','seats','location','description'].forEach(f=>$('#'+f).value=c[f]??'');
  $('#make').value=c.make||'';
  setChip('#fuel',c.fuel); setChip('#gearbox',c.gearbox); setChip('#body',c.body);
  document.querySelectorAll('#feats .chip').forEach(ch=>ch.classList.toggle('on',(c.features||[]).includes(ch.dataset.v)));
  renderThumbs();
  window.scrollTo({top:0,behavior:'smooth'});
};
function setChip(group,val){ document.querySelectorAll(group+' .chip').forEach(ch=>ch.classList.toggle('on',ch.dataset.v===val)); }

async function refreshStats(){
  const s = await fetch('/api/admin/stats').then(r=>r.json()).catch(()=>({total:0,live:0,sold:0}));
  $('#stTotal').textContent=s.total; $('#stLive').textContent=s.live; $('#stSold').textContent=s.sold;
}

// ---------- toast ----------
let tm;
function toast(msg, bad){
  $('#toastmsg').textContent=msg;
  $('#toast').style.background = bad?'#c0392b':'';
  $('#toast').classList.add('show');
  clearTimeout(tm); tm=setTimeout(()=>$('#toast').classList.remove('show'),3200);
}
