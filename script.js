const slides=[...document.querySelectorAll('.hero-slide')];
const dots=[...document.querySelectorAll('.hero-dot')];
const prev=document.querySelector('.hero-prev');
const next=document.querySelector('.hero-next');
let current=0;
let timer;

function showSlide(index){
  current=(index+slides.length)%slides.length;
  slides.forEach((slide,i)=>slide.classList.toggle('active',i===current));
  dots.forEach((dot,i)=>dot.classList.toggle('active',i===current));
  restartTimer();
}
function restartTimer(){
  clearInterval(timer);
  timer=setInterval(()=>showSlide(current+1),6500);
}
prev?.addEventListener('click',()=>showSlide(current-1));
next?.addEventListener('click',()=>showSlide(current+1));
dots.forEach((dot,i)=>dot.addEventListener('click',()=>showSlide(i)));
restartTimer();

const revealObserver=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.14,rootMargin:'0px 0px -35px'});
document.querySelectorAll('.reveal,.diagnostic-band').forEach(el=>revealObserver.observe(el));

const menuButton=document.querySelector('.menu-button');
const mobileNav=document.querySelector('.mobile-nav');
menuButton?.addEventListener('click',()=>{
  const open=mobileNav.classList.toggle('open');
  document.body.classList.toggle('menu-open',open);
  menuButton.setAttribute('aria-expanded',String(open));
});
mobileNav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  mobileNav.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuButton?.setAttribute('aria-expanded','false');
}));

const form=document.querySelector('#booking-form');
const status=document.querySelector('#form-status');
form?.addEventListener('submit',(e)=>{
  e.preventDefault();
  status.textContent='Thanks — this concept form is ready to connect to RMA’s preferred booking workflow.';
  form.querySelector('button').textContent='Request received ✓';
  setTimeout(()=>{form.querySelector('button').textContent='Request appointment ↗';},3500);
});

const tilt=document.querySelector('.tilt-card');
if(tilt && window.matchMedia('(pointer:fine)').matches){
  tilt.addEventListener('mousemove',(e)=>{
    const r=tilt.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    tilt.style.transform=`perspective(900px) rotateX(${y*-4}deg) rotateY(${x*5}deg) translateY(-4px)`;
  });
  tilt.addEventListener('mouseleave',()=>{tilt.style.transform='';});
}

let ticking=false;
window.addEventListener('scroll',()=>{
  if(!ticking){
    requestAnimationFrame(()=>{
      const header=document.querySelector('.site-header');
      header?.classList.toggle('scrolled',window.scrollY>80);
      ticking=false;
    });
    ticking=true;
  }
});

// Dark-footer logo treatment: preserve RMA red accents while turning the dark mark white.
const footerLogoPlate=document.querySelector('.site-footer .logo-plate');
const footerLogo=footerLogoPlate?.querySelector('img');
if(footerLogoPlate && footerLogo){
  footerLogo.src='assets/rma-logo-white.svg';
  footerLogoPlate.style.background='transparent';
  footerLogoPlate.style.padding='0';
  footerLogoPlate.style.borderRadius='0';
  footerLogo.style.width='145px';
  footerLogo.style.height='auto';
}

// Use the direct RMA BP Automotive shop number everywhere on the page.
const automotivePhone='3018818646';
const automotivePhoneDisplay='(301) 881-8646';
document.querySelectorAll('a[href^="tel:"]').forEach(link=>{
  link.href=`tel:${automotivePhone}`;
  const strong=link.querySelector('strong');
  if(strong){
    strong.textContent=automotivePhoneDisplay;
  }else{
    link.textContent=automotivePhoneDisplay;
  }
});

// Replace the decorative world map with a live map centered on the actual Rockville shop address.
const mapCard=document.querySelector('.map-card');
const oldMapImage=mapCard?.querySelector('img');
if(mapCard && oldMapImage){
  const mapFrame=document.createElement('iframe');
  mapFrame.className='map-embed';
  mapFrame.title='Map showing RMA BP Automotive Service Center at 1910 Rockville Pike, Rockville, Maryland';
  mapFrame.src='https://www.google.com/maps?q=1910%20Rockville%20Pike%2C%20Rockville%2C%20MD%2020852&z=16&output=embed';
  mapFrame.loading='lazy';
  mapFrame.referrerPolicy='no-referrer-when-downgrade';
  mapFrame.setAttribute('allowfullscreen','');
  oldMapImage.replaceWith(mapFrame);

  const mapStyle=document.createElement('style');
  mapStyle.textContent=`
    .map-card .map-embed{position:absolute;inset:0;width:100%;height:100%;border:0;filter:grayscale(1) brightness(.62) contrast(1.12)}
    .map-card:after{pointer-events:none}
    .map-card:hover .map-embed{filter:grayscale(.65) brightness(.72) contrast(1.08)}
  `;
  document.head.appendChild(mapStyle);
}
