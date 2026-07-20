/* ═══════════════════════════════════════
   LAMIM — INTERACTIONS
   ═══════════════════════════════════════ */

const App = {
  init() {
    this.nav();
    this.reveal();
    this.mobileMenu();
    this.theme();
    this.ranks();
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
  },

  ranks() {
    const items = document.querySelectorAll('.rank-item');
    const desc = document.querySelector('.rank-desc-text');
    const fill = document.querySelector('.rank-bar-fill');
    if (!items.length) return;

    const descriptions = {
      'Ghafil': 'The heedless — unaware of their spiritual state.',
      'Musafir': 'The traveler — beginning the journey of awareness.',
      'Murid': 'The seeker — actively pursuing spiritual growth.',
      'Mujahid': 'The struggler — fighting against spiritual laziness.',
      'Mukhlis': 'The sincere — actions rooted in pure intention.',
      'Muttaqi': 'The God-conscious — cultivating constant awareness.',
      'Muhsin': 'The excellent — worship with love and presence.',
      'Wali': 'The intimate — near to God through devotion.'
    };

    items.forEach((item, i) => {
      item.addEventListener('click', () => {
        items.forEach(b => b.classList.remove('active'));
        item.classList.add('active');
        const r = item.dataset.r;
        if (descriptions[r] && desc) desc.textContent = descriptions[r];
        if (fill) fill.style.width = ((i + 1) / items.length * 100) + '%';
      });
    });
    items[0]?.classList.add('active');
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
