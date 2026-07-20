/* =============================================
   LAMIM LANDING — MAIN CONTROLLER
   Floating Nav × Staggered Menu × Rank Showcase
   ============================================= */

const Main = {
  init() {
    this.initNav();
    this.initSmoothScroll();
    this.initActiveNav();
    this.initMobileMenu();
    this.initRankShowcase();
    this.initCountUp();
    this.initThemeToggle();
  },

  /* ── Nav scroll effect ── */
  initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    const check = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', check, { passive: true });
    check();
  },

  /* ── Smooth scroll ── */
  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          const offset = 100;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
          document.querySelector('.nav-links')?.classList.remove('open');
          const toggle = document.querySelector('.nav-toggle');
          if (toggle) {
            toggle.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
          }
        }
      });
    });
  },

  /* ── Active nav tracking ── */
  initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!sections.length || !links.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(link => {
            const isActive = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('active', isActive);
          });
        }
      });
    }, { threshold: 0.2, rootMargin: '-100px 0px -40% 0px' });

    sections.forEach(section => observer.observe(section));
  },

  /* ── Mobile menu with staggered reveal ── */
  initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
      const isOpen = links.classList.contains('open');
      if (isOpen) {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      } else {
        links.classList.add('open');
        toggle.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Close menu');
      }
    });

    // Close on link click
    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  },

  /* ── Rank showcase ── */
  initRankShowcase() {
    const badges = document.querySelectorAll('.rank-badge');
    const descEl = document.querySelector('.rank-desc-text');
    if (!badges.length) return;

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

    badges.forEach((badge, index) => {
      badge.addEventListener('click', () => {
        badges.forEach(b => b.classList.remove('active'));
        badge.classList.add('active');
        const rank = badge.dataset.rank;
        if (descriptions[rank] && descEl) {
          descEl.textContent = descriptions[rank];
        }
        const fill = document.querySelector('.rank-progress-fill');
        if (fill) fill.style.width = `${((index + 1) / badges.length) * 100}%`;
      });
    });

    badges[0]?.classList.add('active');
  },

  /* ── Count-up ── */
  initCountUp() {
    const counters = document.querySelectorAll('.count-up');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const duration = 1800;
          const start = performance.now();

          const animate = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            el.textContent = Math.round(target * eased).toLocaleString();
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  },

  /* ── Theme toggle ── */
  initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    const navToggle = document.querySelector('.nav-theme-toggle');
    if (!toggle && !navToggle) return;

    const targets = [toggle, navToggle].filter(Boolean);
    const current = document.documentElement.getAttribute('data-theme') || 'dark';

    targets.forEach(el => {
      el.setAttribute('aria-label', current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });

    const doToggle = () => {
      const now = document.documentElement.getAttribute('data-theme');
      const next = now === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('lamim-theme', next);
      targets.forEach(el => {
        el.setAttribute('aria-label', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      });
    };

    targets.forEach(el => el.addEventListener('click', doToggle));
  }
};

document.addEventListener('DOMContentLoaded', () => Main.init());
