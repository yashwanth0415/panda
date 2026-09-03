(() => {
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const path=location.pathname.split('/').pop()||'index.html';
const active=({'index.html':'home','shop.html':'shop','men.html':'men','women.html':'women','new-arrivals.html':'new','brands.html':'brands','about.html':'about','contact.html':'contact','account.html':'account'})[path];
$$('[data-nav]').forEach(el=>{if(el.dataset.nav===active)el.classList.add('active')});
requestAnimationFrame(()=>$$('.main-nav a,.mobile-bottom-nav a,.mobile-more-btn').forEach((el,i)=>{el.style.setProperty('--delay',`${i*55}ms`);el.classList.add('nav-intro')}));
const drawer=$('#drawer'),more=$('#moreSheet'),search=$('#searchOverlay'),reviews=$('#reviewsModal'),toast=$('#toast');
const lock=on=>document.body.style.overflow=on?'hidden':'';
const open=e=>{if(e){e.classList.add('open');e.setAttribute('aria-hidden','false');lock(true)}};
const close=e=>{if(e){e.classList.remove('open');e.setAttribute('aria-hidden','true');lock(false)}};
const say=t=>{if(!toast)return;toast.textContent=t;toast.classList.add('show');clearTimeout(window.__t);window.__t=setTimeout(()=>toast.classList.remove('show'),1800)};
$$('[data-action="menu"]').forEach(b=>b.onclick=()=>open(drawer));$$('[data-action="close-menu"]').forEach(b=>b.onclick=()=>close(drawer));
$$('[data-action="more"]').forEach(b=>b.onclick=()=>open(more));$$('[data-action="close-more"]').forEach(b=>b.onclick=()=>close(more));
$$('[data-action="search"]').forEach(b=>b.onclick=()=>{open(search);setTimeout(()=>$('#globalSearch')?.focus(),80)});$$('[data-action="close-search"]').forEach(b=>b.onclick=()=>close(search));
$$('[data-action="reviews"]').forEach(b=>b.onclick=()=>open(reviews));$$('[data-action="close-reviews"]').forEach(b=>b.onclick=()=>close(reviews));
[drawer,more,search,reviews].forEach(e=>e?.addEventListener('click',x=>{if(x.target===e)close(e)}));
$('#globalSearch')?.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.value.trim())location.href='shop.html?q='+encodeURIComponent(e.target.value.trim())});
$$('[data-action="heart"]').forEach(b=>b.onclick=()=>{b.classList.toggle('liked');b.textContent=b.classList.contains('liked')?'♥':'♡';say(b.classList.contains('liked')?'Added to wishlist':'Removed from wishlist')});
const getCart=()=>Number(localStorage.getItem('pandaCart')||0),setCart=n=>{localStorage.setItem('pandaCart',String(n));$$('.cart-badge').forEach(e=>e.textContent=n)};setCart(getCart());
$$('[data-action="cart"]').forEach(b=>b.onclick=()=>{setCart(getCart()+1);say('Product added to cart')});
$('#chatBtn')?.addEventListener('click',()=>say('Customer support is ready to help'));

if('IntersectionObserver'in window){
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});
 $$('.reveal,.reveal-section').forEach(e=>io.observe(e));
}else $$('.reveal,.reveal-section').forEach(e=>e.classList.add('visible'));

// Three shoe images, same previous hero composition, auto-advance every 3 seconds.
const shoes=$$('.hero-shoe'),dots=$$('.hero-dots .dot'),timer=$('.slide-timer'); let heroIndex=0,heroTimer;
function showHero(i){
 if(!shoes.length)return;
 heroIndex=(i+shoes.length)%shoes.length;
 shoes.forEach((x,n)=>x.classList.toggle('active',n===heroIndex));
 dots.forEach((x,n)=>x.classList.toggle('active',n===heroIndex));
 if(timer){timer.classList.remove('running');void timer.offsetWidth;timer.classList.add('running')}
 clearTimeout(heroTimer);heroTimer=setTimeout(()=>showHero(heroIndex+1),3000);
}
$$('[data-hero-dot]').forEach(d=>d.onclick=()=>showHero(Number(d.dataset.heroDot)));
showHero(0);
document.addEventListener('visibilitychange',()=>{if(document.hidden)clearTimeout(heroTimer);else if(shoes.length){clearTimeout(heroTimer);heroTimer=setTimeout(()=>showHero(heroIndex+1),3000)}});

// Swipe hero on mobile.
let sx=0;$('.hero-slider')?.addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});
$('.hero-slider')?.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>45)showHero(heroIndex+(dx<0?1:-1))},{passive:true});
$$('.main-nav a').forEach(a=>a.addEventListener('click',()=>document.body.classList.add('page-transition')));
})();