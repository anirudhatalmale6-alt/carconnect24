const $ = s => document.querySelector(s);
const euro = n => n==null ? '—' : '€' + (+n).toLocaleString('en-US');
const km = n => n==null ? '—' : (+n).toLocaleString('en-US') + ' km';

let BRANDS = [];
let state = {
  make:'', model:'', pmin:'', pmax:'', yearmin:'', mileagemax:'',
  fuel:new Set(), gearbox:new Set(), body:new Set(), q:'', sort:'new', page:1
};
let debounce;

init();
async function init(){
  // years
  const yEl = $('#f-year');
  for (let y=new Date().getFullYear()+1; y>=1990; y--) yEl.add(new Option(y,y));
  BRANDS = await fetch('/api/brands').then(r=>r.json());
  setupCombo();
  $('#f-model').onchange = e => { state.model=e.target.value; state.page=1; load(); };
  $('#f-year').onchange  = e => { state.yearmin=e.target.value; state.page=1; load(); };
  $('#f-mileage').onchange = e => { state.mileagemax=e.target.value; state.page=1; load(); };
  $('#f-pmin').oninput = e => { state.pmin=e.target.value; deb(); };
  $('#f-pmax').oninput = e => { state.pmax=e.target.value; deb(); };
  $('#q').oninput = e => { state.q=e.target.value; deb(); };
  $('#sort').onchange = e => { state.sort=e.target.value; state.page=1; load(); };
  chipGroup('#f-fuel','fuel'); chipGroup('#f-gear','gearbox'); chipGroup('#f-body','body');
  $('#reset').onclick = resetAll;
  load();
}
function deb(){ clearTimeout(debounce); debounce=setTimeout(()=>{state.page=1;load();},250); }

// ---- Searchable brand combobox ----
function setupCombo(){
  const input=$('#makeInput'), list=$('#makeList');
  let active=-1, shown=[];
  const render = term => {
    const t=(term||'').toLowerCase();
    shown = BRANDS.filter(b=>b.toLowerCase().includes(t));
    if(!shown.length){ list.innerHTML='<div class="none">No brand matches</div>'; }
    else list.innerHTML = ['<div data-v="">Any brand</div>',
      ...shown.map(b=>`<div data-v="${b}">${b}</div>`)].join('');
    active=-1;
  };
  const open=()=>{render(input.value);list.classList.add('open');};
  const close=()=>list.classList.remove('open');
  input.addEventListener('focus',open);
  input.addEventListener('input',()=>{render(input.value);list.classList.add('open');});
  input.addEventListener('keydown',e=>{
    const opts=[...list.querySelectorAll('div[data-v]')];
    if(e.key==='ArrowDown'){e.preventDefault();active=Math.min(active+1,opts.length-1);}
    else if(e.key==='ArrowUp'){e.preventDefault();active=Math.max(active-1,0);}
    else if(e.key==='Enter'){e.preventDefault();if(opts[active])opts[active].click();else if(opts[0])opts[0].click();return;}
    else return;
    opts.forEach((o,i)=>o.classList.toggle('active',i===active));
    if(opts[active])opts[active].scrollIntoView({block:'nearest'});
  });
  list.addEventListener('click',e=>{
    const d=e.target.closest('div[data-v]'); if(!d)return;
    const v=d.dataset.v;
    state.make=v; state.model=''; input.value=v; close();
    refreshModels(); state.page=1; load();
  });
  document.addEventListener('click',e=>{ if(!e.target.closest('#makeCombo')) close(); });
}
async function refreshModels(){
  const sel=$('#f-model'); sel.innerHTML='<option value="">Any model</option>';
  if(!state.make) return;
  const models = await fetch('/api/models?make='+encodeURIComponent(state.make)).then(r=>r.json());
  models.forEach(m=>sel.add(new Option(m,m)));
}

function chipGroup(sel,key){
  document.querySelectorAll(sel+' .chip').forEach(ch=>{
    ch.onclick=()=>{ const v=ch.dataset.v;
      if(state[key].has(v)){state[key].delete(v);ch.classList.remove('on');}
      else{state[key].add(v);ch.classList.add('on');}
      state.page=1; load();
    };
  });
}
function resetAll(){
  state={make:'',model:'',pmin:'',pmax:'',yearmin:'',mileagemax:'',fuel:new Set(),gearbox:new Set(),body:new Set(),q:'',sort:'new',page:1};
  $('#makeInput').value='';$('#f-model').innerHTML='<option value="">Any model</option>';
  $('#f-year').value='';$('#f-mileage').value='';$('#f-pmin').value='';$('#f-pmax').value='';
  $('#q').value='';$('#sort').value='new';
  document.querySelectorAll('.chip.on').forEach(c=>c.classList.remove('on'));
  load();
}

function buildQuery(){
  const p=new URLSearchParams();
  if(state.make)p.set('make',state.make);
  if(state.model)p.set('model',state.model);
  if(state.pmin)p.set('pmin',state.pmin);
  if(state.pmax)p.set('pmax',state.pmax);
  if(state.yearmin)p.set('yearmin',state.yearmin);
  if(state.mileagemax)p.set('mileagemax',state.mileagemax);
  if(state.fuel.size)p.set('fuel',[...state.fuel].join(','));
  if(state.gearbox.size)p.set('gearbox',[...state.gearbox].join(','));
  if(state.body.size)p.set('body',[...state.body].join(','));
  if(state.q)p.set('q',state.q);
  p.set('sort',state.sort); p.set('page',state.page); p.set('size',12);
  return p.toString();
}

async function load(){
  const data = await fetch('/api/cars?'+buildQuery()).then(r=>r.json());
  $('#resCount').textContent = data.total.toLocaleString('en-US');
  $('#fcount').textContent = data.total.toLocaleString('en-US')+' match';
  render(data.cars);
  renderPager(data.pages, data.page);
}

function render(cars){
  const list=$('#list');
  if(!cars.length){list.innerHTML='<div class="empty"><h3>No cars match your filters</h3><p>Try widening your search or reset the filters.</p></div>';return;}
  list.innerHTML=cars.map(c=>{
    const ev=c.fuel==='Electric';
    const imgs = c.photos.length
      ? c.photos.map((p,i)=>`<img src="${p}" class="${i===0?'show':''}" loading="lazy" alt="${c.make} ${c.model}">`).join('')
      : '<div class="ph">No photo</div>';
    const dots = c.photos.length>1 ? `<div class="dots">${c.photos.map((_,i)=>`<i class="${i===0?'on':''}"></i>`).join('')}</div>`:'';
    const arrows = c.photos.length>1 ? '<button class="arrow prev" data-d="-1">‹</button><button class="arrow next" data-d="1">›</button>':'';
    const specs=[['Year',c.year],['Mileage',km(c.mileage)],['Fuel',c.fuel||'—'],
      ['Gearbox',c.gearbox||'—'],['Power',c.power?c.power+' hp':'—'],['Body',c.body||'—']]
      .map(s=>`<div class="spec"><b>${s[1]}</b> <span>${s[0]}</span></div>`).join('');
    const feats=(c.features||[]).slice(0,4).map(f=>`<span>${f}</span>`).join('');
    return `<article class="card" data-id="${c.id}">
      <div class="gal">
        <span class="badge ${ev?'ev':''}">${c.fuel||'Car'}</span>
        ${c.sold?'<span class="sold-tag">SOLD</span>':''}
        ${imgs}${arrows}${dots}
      </div>
      <div class="cbody">
        <div style="display:flex;align-items:flex-start">
          <div><h2>${c.make} ${c.model}</h2>
            <div class="csub">${[c.color,c.doors?c.doors+' doors':'',c.seats?c.seats+' seats':''].filter(Boolean).join(' · ')||'&nbsp;'}</div></div>
          <div class="cprice"><div class="price">${euro(c.price)}</div></div>
        </div>
        <div class="specs">${specs}</div>
        <div class="feat">${feats}</div>
        <div class="cfoot">
          <span class="loc">📍 ${c.location||'Belgium'}</span>
          <button class="view" onclick="location.href='/car.html?id=${c.id}'">View details</button>
        </div>
      </div>
    </article>`;
  }).join('');
  wireCarousels();
}
function wireCarousels(){
  document.querySelectorAll('.gal').forEach(g=>{
    const imgs=[...g.querySelectorAll('img')], dots=[...g.querySelectorAll('.dots i')];
    if(imgs.length<2)return; let idx=0;
    const go=d=>{imgs[idx].classList.remove('show');dots[idx]&&dots[idx].classList.remove('on');
      idx=(idx+d+imgs.length)%imgs.length;
      imgs[idx].classList.add('show');dots[idx]&&dots[idx].classList.add('on');};
    const n=g.querySelector('.next'),p=g.querySelector('.prev');
    n&&(n.onclick=e=>{e.stopPropagation();go(1);});
    p&&(p.onclick=e=>{e.stopPropagation();go(-1);});
  });
}
function renderPager(pages,cur){
  const p=$('#pager'); if(pages<=1){p.innerHTML='';return;}
  let html=`<button ${cur===1?'disabled':''} data-p="${cur-1}">‹</button>`;
  const win=[]; for(let i=1;i<=pages;i++){if(i===1||i===pages||Math.abs(i-cur)<=1)win.push(i);}
  let last=0;
  win.forEach(i=>{ if(i-last>1)html+=`<button disabled>…</button>`;
    html+=`<button class="${i===cur?'on':''}" data-p="${i}">${i}</button>`; last=i;});
  html+=`<button ${cur===pages?'disabled':''} data-p="${cur+1}">›</button>`;
  p.innerHTML=html;
  p.querySelectorAll('button[data-p]').forEach(b=>b.onclick=()=>{
    state.page=+b.dataset.p; load(); window.scrollTo({top:0,behavior:'smooth'});
  });
}
