(function(){
'use strict';
var THEMES=[{"id": "classic", "name": "Classic", "c": ["#0a0a0c", "#e5e5e5", "#242426"]}, {"id": "ocean", "name": "Ocean", "c": ["#060e1c", "#38bdf8", "#0f2240"]}, {"id": "matrix", "name": "Matrix", "c": ["#050c08", "#4ade80", "#0e2116"]}, {"id": "sunset", "name": "Sunset", "c": ["#140a08", "#fb923c", "#341c12"]}, {"id": "sakura", "name": "Sakura", "c": ["#120814", "#f472b6", "#321638"]}, {"id": "royal", "name": "Royal", "c": ["#0c081e", "#facc15", "#21184c"]}],KEY='wanz-theme',root=document.documentElement;
function stored(){try{return localStorage.getItem(KEY)}catch(e){return null}}
function ok(id){return THEMES.some(function(t){return t.id===id})}
function apply(id,save){
  if(!ok(id))id='classic';
  if(id==='classic')root.removeAttribute('data-theme');else root.setAttribute('data-theme',id);
  if(save){try{localStorage.setItem(KEY,id)}catch(e){}}
  return id;
}
var current=apply(stored(),false); // sebelum halaman tampil, jadi tanpa kedipan
function ui(){
  var st=document.createElement('style');
  st.textContent='#wz-th-btn{position:fixed;left:14px;bottom:calc(14px + env(safe-area-inset-bottom,0px));z-index:70;width:44px;height:44px;border-radius:50%;border:1px solid rgb(var(--retro-border,58 58 60));background:rgb(var(--retro-dark,28 28 30));color:rgb(var(--retro-orange,229 229 229));display:grid;place-items:center;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.45)}'+
  '#wz-th-pan{position:fixed;left:14px;bottom:calc(66px + env(safe-area-inset-bottom,0px));z-index:70;width:min(78vw,230px);padding:8px;border-radius:14px;border:1px solid rgb(var(--retro-border,58 58 60));background:rgb(var(--retro-dark,28 28 30));box-shadow:0 14px 40px rgba(0,0,0,.55);display:none;font:600 14px system-ui,sans-serif}'+
  '#wz-th-pan.on{display:block}'+
  '#wz-th-pan button{width:100%;display:flex;align-items:center;gap:10px;padding:9px 10px;border:0;border-radius:10px;background:transparent;color:rgb(var(--retro-light,244 244 245));font:inherit;cursor:pointer;text-align:left}'+
  '#wz-th-pan button:hover,#wz-th-pan button[aria-checked=true]{background:rgb(var(--retro-card,36 36 38))}'+
  '#wz-th-pan i{display:flex}#wz-th-pan i b{width:14px;height:14px;border-radius:50%;border:1px solid rgba(255,255,255,.25);margin-right:-4px}'+
  '#wz-th-btn:focus-visible,#wz-th-pan button:focus-visible{outline:2px solid rgb(var(--retro-orange,229 229 229));outline-offset:2px}';
  document.head.appendChild(st);
  var btn=document.createElement('button');
  btn.id='wz-th-btn';btn.type='button';btn.setAttribute('aria-label','Ganti tema');btn.setAttribute('aria-haspopup','true');btn.setAttribute('aria-expanded','false');
  btn.innerHTML='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.4A3.6 3.6 0 0 0 21 11c0-4.4-4-8-9-8z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10.5" cy="7" r="1"/><circle cx="15.5" cy="7.5" r="1"/></svg>';
  var pan=document.createElement('div');pan.id='wz-th-pan';pan.setAttribute('role','menu');
  THEMES.forEach(function(t){
    var b=document.createElement('button');b.type='button';b.setAttribute('role','menuitemradio');b.setAttribute('data-id',t.id);
    b.innerHTML='<i>'+t.c.map(function(c){return'<b style="background:'+c+'"></b>'}).join('')+'</i><span>'+t.name+'</span>';
    pan.appendChild(b);
  });
  function mark(){Array.prototype.forEach.call(pan.children,function(b){b.setAttribute('aria-checked',b.getAttribute('data-id')===current?'true':'false')})}
  function toggle(open){pan.className=open?'on':'';btn.setAttribute('aria-expanded',open?'true':'false')}
  btn.onclick=function(e){e.stopPropagation();toggle(pan.className!=='on')};
  pan.onclick=function(e){var b=e.target.closest('button');if(!b)return;current=apply(b.getAttribute('data-id'),true);mark();toggle(false)};
  document.addEventListener('click',function(e){if(!pan.contains(e.target))toggle(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){toggle(false);btn.focus()}});
  mark();document.body.appendChild(pan);document.body.appendChild(btn);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ui);else ui();
})();
