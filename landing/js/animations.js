/* =============================================
   LAMIM — ANIMATION ENGINE
   Scroll Blur × Ambient Blobs × Magnetic Physics
   ============================================= */

const Animations = {
  init() {
    this.initScrollReveal();
    this.initMouseGlow();
    this.initScrollProgress();
    this.initMagneticButtons();
  },

  initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
    elements.forEach(el => observer.observe(el));
  },

  initMouseGlow() {
    const cards = document.querySelectorAll('.bento-card, .problem-card, .install-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const inner = card.querySelector('.bento-card-inner, .problem-card-inner, .install-card-inner');
        if (inner) {
          inner.style.setProperty('--mouse-x', `${x}px`);
          inner.style.setProperty('--mouse-y', `${y}px`);
        }
      });
    });
  },

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

  initMagneticButtons() {
    const buttons = document.querySelectorAll('.magnetic');
    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => Animations.init());
