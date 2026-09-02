const menuButton = document.querySelector('.menu-button');
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

menuButton?.addEventListener('click', () => {
  document.body.classList.toggle('menu-open');
  const expanded = document.body.classList.contains('menu-open');
  menuButton.setAttribute('aria-expanded', String(expanded));
});

mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-dot');
const prevBtn = document.querySelector('.hero-prev');
const nextBtn = document.querySelector('.hero-next');
let currentHeroSlide = 0;
let heroInterval;

function showHeroSlide(index) {
  heroSlides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  heroDots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  currentHeroSlide = index;
}

function nextHeroSlide() {
  const next = (currentHeroSlide + 1) % heroSlides.length;
  showHeroSlide(next);
}

function prevHeroSlide() {
  const prev = (currentHeroSlide - 1 + heroSlides.length) % heroSlides.length;
  showHeroSlide(prev);
}

function startHeroSlider() {
  if (heroSlides.length > 1) heroInterval = setInterval(nextHeroSlide, 5000);
}

function resetHeroSlider() {
  clearInterval(heroInterval);
  startHeroSlider();
}

if (heroSlides.length) {
  startHeroSlider();
  nextBtn?.addEventListener('click', () => { nextHeroSlide(); resetHeroSlider(); });
  prevBtn?.addEventListener('click', () => { prevHeroSlide(); resetHeroSlider(); });
  heroDots.forEach(dot => {
    dot.addEventListener('click', () => {
      showHeroSlide(Number(dot.dataset.target));
      resetHeroSlider();
    });
  });
}

const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealObserver && reveals.forEach(el => revealObserver.observe(el));

const bookingForm = document.getElementById('booking-form');
const formStatus = document.getElementById('form-status');
bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  formStatus.textContent = 'Concept submission captured. A production version could send this to the RMA Automotive team instantly.';
  bookingForm.reset();
});
