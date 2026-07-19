/* =============================================
   LAMIM LANDING PAGE — ANIMATIONS JS
   ScrollObserver, stagger, mouse-glow, parallax
   ============================================= */

const Animations = {
  init() {
    this.initScrollReveal();
    this.initMouseGlow();
    this.initParallax();
    this.initScrollProgress();
    this.initMagneticButtons();
  },

  /* ── Scroll Reveal (IntersectionObserver) ── */
  initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
  },

  /* ── Mouse Glow on Bento Cards ── */
  initMouseGlow() {
    const cards = document.querySelectorAll('.bento-card, .problem-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        card.style.background = `radial-gradient(300px circle at ${x}px ${y}px, rgba(167,139,250,0.04), var(--bg-glass))`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.background = '';
      });
    });
  },

  /* ── Subtle Parallax on Hero Orbs ── */
  initParallax() {
    const orbs = document.querySelectorAll('[data-parallax]');
    if (!orbs.length) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          orbs.forEach(orb => {
            const speed = parseFloat(orb.dataset.parallax) || 0.3;
            orb.style.transform = `translateY(${scrollY * speed}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  },

  /* ── Scroll Progress Bar ── */
  initScrollProgress() {
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
        bar.style.transform = `scaleX(${progress})`;
      });
    }, { passive: true });
  },

  /* ── Magnetic Button Effect ── */
  initMagneticButtons() {
    const buttons = document.querySelectorAll('.magnetic');
    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => Animations.init());
