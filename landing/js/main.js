/* ═══════════════════════════════════════
   LAMIM — INTERACTIONS
   ═══════════════════════════════════════ */

const App = {
  init() {
    this.nav();
    this.reveal();
    this.mobileMenu();
    this.theme();
  },

  nav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const check = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', check, { passive: true });
    check();
  },

  reveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('show'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => obs.observe(el));
  },

  mobileMenu() {
    const btn = document.querySelector('.hamburger');
    const menu = document.querySelector('.mobile-nav');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      btn.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        menu.classList.remove('open');
        btn.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
    });
  },

  theme() {
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    const html = document.documentElement;
    const cur = html.getAttribute('data-theme') || 'dark';
    btn.setAttribute('aria-label', cur === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');

    btn.addEventListener('click', () => {
      const now = html.getAttribute('data-theme');
      const next = now === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('lamim-theme', next);
      btn.setAttribute('aria-label', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
