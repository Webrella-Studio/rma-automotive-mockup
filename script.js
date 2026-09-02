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

// Reimagine the Why RMA section so it feels distinct from the service/card sections above it.
const aboutSection=document.querySelector('#about');
if(aboutSection){
  aboutSection.classList.add('about-reimagined');
  aboutSection.innerHTML=`
    <div class="about-stage">
      <div class="about-visual" aria-label="RMA BP automotive service shop">
        <img src="https://images.pexels.com/photos/8478254/pexels-photo-8478254.jpeg?auto=compress&cs=tinysrgb&w=1800" alt="Mechanic working on a car engine inside an automotive repair shop">
        <div class="about-visual-shade" aria-hidden="true"></div>
        <div class="about-guarantee">
          <span>RMA BP STANDARD</span>
          <strong>100%</strong>
          <small>Work guarantee</small>
        </div>
        <div class="about-photo-caption">
          <span>1910 Rockville Pike · Rockville, MD</span>
          <strong>Local service.<br>Serious capability.</strong>
        </div>
      </div>

      <div class="about-proof">
        <p class="eyebrow">Why RMA BP</p>
        <h2>Trust the work.<br><em>Not the guesswork.</em></h2>
        <p class="about-proof-lead">RMA BP keeps automotive service straightforward: broad repair capability, direct communication and a clear path from the problem you notice to the service your car needs.</p>

        <div class="about-proof-list">
          <article>
            <span class="about-proof-mark">F+D</span>
            <div><h3>Foreign &amp; Domestic</h3><p>Service for a wide range of makes and models, from everyday maintenance to diagnostics and repair.</p></div>
            <b>→</b>
          </article>
          <article>
            <span class="about-proof-mark">1:1</span>
            <div><h3>Personalized Service</h3><p>A direct, practical experience built around clear communication instead of unnecessary complexity.</p></div>
            <b>→</b>
          </article>
          <article>
            <span class="about-proof-mark">✓</span>
            <div><h3>Work Guaranteed</h3><p>A visible commitment to workmanship that gives drivers a stronger reason to trust the shop.</p></div>
            <b>→</b>
          </article>
        </div>

        <div class="about-proof-actions">
          <a class="button button-red" href="#book">Request service <span>›</span></a>
          <a class="about-call" href="tel:3018818646"><small>Talk to the shop</small><strong>(301) 881-8646</strong></a>
        </div>
      </div>
    </div>`;

  const aboutStyles=document.createElement('style');
  aboutStyles.id='about-reimagined-styles';
  aboutStyles.textContent=`
    .about-reimagined{padding:0!important;background:#070708!important;position:relative;overflow:hidden;border-top:1px solid #202026;border-bottom:1px solid #202026}
    .about-stage{display:grid;grid-template-columns:minmax(0,.92fr) minmax(0,1.08fr);min-height:720px}
    .about-visual{position:relative;min-height:720px;overflow:hidden;background:#101014}
    .about-visual>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;filter:saturate(.7) contrast(1.08) brightness(.78);transform:scale(1.025);transition:transform 1.2s ease,filter .5s ease}
    .about-reimagined:hover .about-visual>img{transform:scale(1.055);filter:saturate(.82) contrast(1.08) brightness(.82)}
    .about-visual-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,5,7,.08),rgba(5,5,7,.22) 45%,rgba(5,5,7,.9) 100%),linear-gradient(90deg,transparent 58%,rgba(7,7,8,.82) 100%)}
    .about-visual:after{content:"";position:absolute;left:0;right:0;bottom:0;height:3px;background:linear-gradient(90deg,var(--red) 0 34%,transparent 34%)}
    .about-guarantee{position:absolute;top:42px;left:42px;width:176px;padding:20px 20px 18px;background:rgba(8,8,10,.88);border:1px solid rgba(255,255,255,.14);border-top:3px solid var(--red);backdrop-filter:blur(12px);box-shadow:0 24px 55px rgba(0,0,0,.32)}
    .about-guarantee span,.about-guarantee small{display:block;font-family:"Oswald",sans-serif;text-transform:uppercase;letter-spacing:.1em}.about-guarantee span{color:#878790;font-size:9px}.about-guarantee strong{display:block;margin:7px 0 2px;color:#fff;font-family:"Oswald",sans-serif;font-size:54px;line-height:1}.about-guarantee small{color:#d2d2d8;font-size:10px}
    .about-photo-caption{position:absolute;left:42px;right:42px;bottom:44px}.about-photo-caption span{display:block;margin-bottom:10px;color:#b6b6bd;font-size:10px;letter-spacing:.09em;text-transform:uppercase}.about-photo-caption strong{display:block;max-width:520px;color:#fff;font-family:"Oswald",sans-serif;font-size:clamp(38px,3.8vw,58px);font-weight:600;line-height:1;text-transform:uppercase;letter-spacing:-.025em}
    .about-proof{position:relative;padding:76px clamp(46px,5vw,90px);display:flex;flex-direction:column;justify-content:center;background:radial-gradient(circle at 90% 12%,rgba(225,29,46,.12),transparent 28%),linear-gradient(145deg,#111115,#0b0b0e 72%);overflow:hidden}
    .about-proof:before{content:"RMA";position:absolute;right:-18px;bottom:-36px;color:rgba(255,255,255,.018);font-family:"Oswald",sans-serif;font-size:210px;font-weight:700;line-height:.8;letter-spacing:-.06em;pointer-events:none}
    .about-proof .eyebrow{position:relative;z-index:1;margin-bottom:13px}
    .about-proof h2{position:relative;z-index:1;margin:0 0 22px;font-family:"Oswald",sans-serif;font-size:clamp(48px,5.3vw,76px);font-weight:600;line-height:.94;letter-spacing:-.03em;text-transform:uppercase}.about-proof h2 em{font-style:normal;color:var(--red)}
    .about-proof-lead{position:relative;z-index:1;max-width:650px;margin:0 0 34px;color:#aaaab2;font-size:14px;line-height:1.8}
    .about-proof-list{position:relative;z-index:1;border-top:1px solid #303038}
    .about-proof-list article{display:grid;grid-template-columns:58px 1fr 24px;gap:18px;align-items:center;padding:22px 4px;border-bottom:1px solid #303038;transition:padding .24s ease,background .24s ease}
    .about-proof-list article:hover{padding-left:12px;padding-right:12px;background:linear-gradient(90deg,rgba(225,29,46,.07),transparent 72%)}
    .about-proof-mark{width:46px;height:46px;display:grid;place-items:center;border:1px solid #3c3c44;background:#121217;color:var(--red);font-family:"Oswald",sans-serif;font-size:12px;font-weight:600;letter-spacing:.03em}
    .about-proof-list h3{margin:0 0 5px;color:#fff;font-family:"Oswald",sans-serif;font-size:19px;text-transform:uppercase;letter-spacing:.01em}.about-proof-list p{margin:0;max-width:560px;color:#8f8f98;font-size:12px;line-height:1.55}.about-proof-list b{justify-self:end;color:#52525b;font-size:20px;font-weight:400;transition:.2s}.about-proof-list article:hover b{color:var(--red);transform:translateX(3px)}
    .about-proof-actions{position:relative;z-index:1;margin-top:32px;display:flex;align-items:center;gap:24px;flex-wrap:wrap}.about-call{display:flex;flex-direction:column;gap:3px}.about-call small{color:#777780;font-size:9px;letter-spacing:.1em;text-transform:uppercase}.about-call strong{font-family:"Oswald",sans-serif;font-size:17px;letter-spacing:.02em}.about-call:hover strong{color:var(--red)}
    @media(max-width:1000px){.about-stage{grid-template-columns:1fr}.about-visual{min-height:520px}.about-proof{padding:70px clamp(28px,6vw,64px)}}
    @media(max-width:620px){.about-visual{min-height:430px}.about-guarantee{top:24px;left:20px;width:148px;padding:16px}.about-guarantee strong{font-size:44px}.about-photo-caption{left:20px;right:20px;bottom:28px}.about-photo-caption strong{font-size:38px}.about-proof{padding:58px 20px}.about-proof h2{font-size:47px}.about-proof-list article{grid-template-columns:48px 1fr;gap:13px}.about-proof-list b{display:none}.about-proof-mark{width:42px;height:42px}.about-proof-actions{align-items:flex-start;flex-direction:column;gap:18px}.about-proof-actions .button{width:100%}}
    @media(prefers-reduced-motion:reduce){.about-visual>img,.about-proof-list article,.about-proof-list b{transition:none}}
  `;
  document.head.appendChild(aboutStyles);
}