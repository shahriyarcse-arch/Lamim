import Lenis from 'https://unpkg.com/lenis@1.1.21/dist/lenis.mjs';
import { animate, inView, stagger } from "https://cdn.jsdelivr.net/npm/motion@11.18.2/+esm";

/* ---- LENIS SMOOTH SCROLL (skip if reduced motion) ---- */
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.8,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  /* ---- LENIS ANCHOR LINKS ---- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        lenis.scrollTo(target, { offset: -72, duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      }
    });
  });
}

/* ---- EASING ---- */
const ease = [0.16, 1, 0.3, 1];

/* ---- HERO ENTRANCE (on load, skip if reduced motion) ---- */
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  animate('.nav', { opacity: [0, 1] }, { duration: 0.5, easing: ease });

  // Make hero reveal wrapper visible (has .reveal { opacity:0 } from CSS)
  const heroReveal = document.querySelector('.hero .reveal');
  if (heroReveal) { heroReveal.style.opacity = '1'; heroReveal.style.transform = 'none'; }

  animate('.hero h1', { opacity: [0, 1], transform: ['translateY(30px)', 'translateY(0)'] }, { duration: 0.8, delay: 0.08, easing: ease });

  animate('.hero h1 em', { opacity: [0, 1], transform: ['scale(0.88)', 'scale(1)'] }, { duration: 0.6, delay: 0.35, easing: ease });

  animate('.hero p', { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0)'] }, { duration: 0.6, delay: 0.22, easing: ease });

  const heroBtns = document.querySelectorAll('.hero .actions .btn');
  heroBtns.forEach((el, i) => {
    animate(el, { opacity: [0, 1], transform: ['translateY(14px)', 'translateY(0)'] }, { duration: 0.5, delay: 0.38 + i * 0.1, easing: ease }).finished.then(() => {
      el.style.transform = '';
    });
  });

  animate('.hero-art', { opacity: [0, 1], transform: ['scale(0.92)', 'scale(1)'] }, { duration: 0.9, delay: 0.12, easing: ease });

  const tiles = document.querySelectorAll('.hero-art .tile');
  tiles.forEach((el, i) => {
    animate(el, { opacity: [0, 1], transform: ['translateY(16px)', 'translateY(0)'] }, { duration: 0.5, delay: 0.48 + i * 0.07, easing: ease });
  });

  animate('.float', { opacity: [0, 1] }, { duration: 0.5, delay: 0.7, easing: ease });
}

/* ---- SCROLL REVEAL (skip if reduced motion) ---- */
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {

  // All .reveal elements (skip children handled by stagger groups and hero)
  const staggerParents = ['.manifest', '.system'];
  document.querySelectorAll('.reveal').forEach((el) => {
    if (staggerParents.some((sel) => el.closest(sel))) return;
    if (el.closest('.hero')) return;
    inView(el, () => {
      animate(el, { opacity: [0, 1], transform: ['translateY(30px)', 'translateY(0)'] }, { duration: 0.9, easing: ease }).finished.then(() => {
        el.classList.remove('reveal');
        el.style.transform = '';
      });
      return () => {};
    }, { amount: 0.12 });
  });

  // Manifest stagger
  const manifestGrid = document.querySelector('.manifest');
  if (manifestGrid) {
    inView(manifestGrid, () => {
      animate('.manifest article', { opacity: [0, 1], transform: ['translateY(22px)', 'translateY(0)'] }, { duration: 0.6, delay: stagger(0.08), easing: ease }).finished.then(() => {
        document.querySelectorAll('.manifest article').forEach((a) => { a.classList.remove('reveal'); a.style.transform = ''; });
      });
      return () => {};
    }, { amount: 0.12 });
  }

  // System rows stagger
  const system = document.querySelector('.system');
  if (system) {
    inView(system, () => {
      animate('.system-row', { opacity: [0, 1], transform: ['translateY(18px)', 'translateY(0)'] }, { duration: 0.5, delay: stagger(0.05), easing: ease }).finished.then(() => {
        document.querySelectorAll('.system-row').forEach((r) => { r.classList.remove('reveal'); r.style.transform = ''; });
      });
      return () => {};
    }, { amount: 0.1 });
  }

  // FAQ stagger
  const faqList = document.querySelector('.faq-list');
  if (faqList) {
    inView(faqList, () => {
      animate('details', { opacity: [0, 1], transform: ['translateY(14px)', 'translateY(0)'] }, { duration: 0.5, delay: stagger(0.06), easing: ease });
      return () => {};
    }, { amount: 0.1 });
  }

}

/* ---- NAV TOGGLE ---- */
const nav = document.querySelector('.nav');
const menuToggle = document.querySelector('#menuToggle');
const mobileLinks = document.querySelectorAll('.nav-link-mobile');

function toggleMenu(open) {
  const isMobile = open !== undefined ? open : !nav.classList.contains('mobile-active');
  nav.classList.toggle('mobile-active', isMobile);
  menuToggle.setAttribute('aria-expanded', isMobile ? 'true' : 'false');
  menuToggle.textContent = isMobile ? '✕' : '☰';
}

menuToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleMenu();
});

mobileLinks.forEach((link) => {
  link.addEventListener('click', () => toggleMenu(false));
});

document.addEventListener('click', (e) => {
  if (nav.classList.contains('mobile-active') && !nav.contains(e.target)) {
    toggleMenu(false);
  }
});

/* ---- DEMO TABS ---- */
const tabs = document.querySelectorAll('.tab');
const modeEl = document.querySelector('#mode');
const titleEl = document.querySelector('#title');
const copyEl = document.querySelector('#copy');
const valueEl = document.querySelector('#value');
const meterEl = document.querySelector('#meter');

tabs.forEach((t) => {
  t.addEventListener('click', () => {
    tabs.forEach((x) => x.setAttribute('aria-selected', 'false'));
    t.setAttribute('aria-selected', 'true');
    if (modeEl) modeEl.textContent = t.dataset.mode;
    if (titleEl) titleEl.textContent = t.dataset.title;
    if (copyEl) copyEl.textContent = t.dataset.copy;
    if (valueEl) valueEl.textContent = t.dataset.value;
    if (meterEl) meterEl.style.width = t.dataset.value;
  });
});
