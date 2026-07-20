/* =============================================
   LAMIM LANDING PAGE — MAIN JS
   Nav, smooth scroll, active tracking, counters
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
      nav.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', check, { passive: true });
    check();
  },

  /* ── Smooth scroll for anchor links ── */
  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
          // Close mobile menu if open
          document.querySelector('.nav-links')?.classList.remove('open');
        }
      });
    });
  },

  /* ── Active nav section tracking ── */
  initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!sections.length || !links.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(link => {
            link.style.color = link.getAttribute('href') === `#${id}`
              ? 'var(--text-primary)' : '';
          });
        }
      });
    }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

    sections.forEach(section => observer.observe(section));
  },

  /* ── Mobile menu toggle ── */
  initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      const isOpen = links.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    // Close on link click
    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => links.classList.remove('open'));
    });
  },

  /* ── Rank showcase interactive ── */
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
        // Update progress bar
        const fill = document.querySelector('.rank-progress-fill');
        if (fill) fill.style.width = `${((index + 1) / badges.length) * 100}%`;
      });
    });

    // Set first as active
    badges[0]?.classList.add('active');
  },

  /* ── Count-up animation for stats ── */
  initCountUp() {
    const counters = document.querySelectorAll('.count-up');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          const duration = 1500;
          const start = performance.now();

          const animate = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
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

  /* ── Theme toggle (light/dark) with persistence ── */
  initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    const navToggle = document.querySelector('.nav-theme-toggle');
    if (!toggle && !navToggle) return;

    const targets = [toggle, navToggle].filter(Boolean);

    // Read current theme (already set by inline script in <head>)
    const current = document.documentElement.getAttribute('data-theme') || 'dark';

    // Sync aria-labels to match current theme
    targets.forEach(el => {
      el.setAttribute('aria-label', current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });

    // Toggle handler
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
