/* =============================================
   LAMIM LANDING PAGE — ANIMATIONS JAVASCRIPT
   ============================================= */

class LamimAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.initScrollReveal();
    this.initMouseGlow();
    this.initStaggerReveal();
    this.initSmoothScroll()
    this.initCardEffects();
    this.initParticleEffects();
  }

  // ===== SCROLL REVEAL EFFECT =====
  initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-fast, .scroll-reveal-blur');

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const delay = element.dataset.delay || 0;
          const duration = element.dataset.duration || '1s';

          setTimeout(() => {
            element.style.transition = `all ${duration} cubic-bezier(0.16, 1, 0.3, 1)`;
            element.classList.add('active');
          }, delay);

          revealObserver.unobserve(element);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    revealElements.forEach(element => {
      element.style.opacity = '0';
      revealObserver.observe(element);
    });
  }

  // ===== MOUSE GLOW EFFECT =====
  initMouseGlow() {
    const mouseGlow = document.createElement('div');
    mouseGlow.className = 'mouse-glow';
    mouseGlow.innerHTML = '';
    mouseGlow.style.cssText = `
      position: fixed;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, rgba(20, 184, 166, 0.08) 40%, transparent 70%);
      pointer-events: none;
      z-index: var(--z-cursor);
      transform: translate(-50%, -50%);
      transition: all 0.3s ease;
      opacity: 0;
      left: 0;
      top: 0;
      filter: blur(2px);
    `;
    document.body.appendChild(mouseGlow);

    let mouseX = 0;
    let mouseY = 0;

    const updateMouseGlow = () => {
      mouseGlow.style.left = mouseX + 'px';
      mouseGlow.style.top = mouseY + 'px';
      mouseGlow.style.opacity = 1;
    };

    document.addEventListener('mousemove', (e) => {
      // Throttle mouse movement for performance
      if (!this.mouseMoved) {
        this.mouseMoved = true;
        requestAnimationFrame(() => {
          mouseX = e.clientX;
          mouseY = e.clientY;
          updateMouseGlow();
          this.mouseMoved = false;
        });
      }
    });

    // Hide glow when mouse leaves window
    document.addEventListener('mouseleave', () => {
      mouseGlow.style.opacity = '0';
    });

    // Parallax effect on mouse movement
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
      const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;

      document.documentElement.style.setProperty('--mouse-x', x * 20 + 'px');
      document.documentElement.style.setProperty('--mouse-y', y * 20 + 'px');
    });
  }

  // ===== STAGGERED REVEAL EFFECT =====
  initStaggerReveal() {
    const staggerElements = document.querySelectorAll('.stagger-children > *');

    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const children = entry.target.children;
          Array.from(children).forEach((child, index) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(30px)';

            setTimeout(() => {
              child.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
              child.style.opacity = '1';
              child.style.transform = 'translateY(0)';
            }, index * 100);
          });

          staggerObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -30px 0px',
      threshold: 0.2
    });

    staggerElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      const parent = element.parentElement;
      if (parent) {
        staggerObserver.observe(parent);
      }
    });
  }

  // ===== SMOOTH SCROLL =====
  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          const headerHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight + 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update active nav link
          document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
          });
          anchor.classList.add('active');
        }
      });
    });
  }

  // ===== CARD INTERACTION EFFECTS =====
  initCardEffects() {
    // Feature card hover effects
    const featureCards = document.querySelectorAll('.feature-card, .bento-item');

    featureCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.classList.add('anim-gelatinous-bounce');
      });

      card.addEventListener('mouseleave', () => {
        card.classList.remove('anim-gelatinous-bounce');
      });

      // 3D tilt effect
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)'
        setTimeout(() => {
          card.classList.remove('anim-gelatinous-bounce');
        }, 2000);
      });
    });
  }

  // ===== PARTICLE EFFECTS =====
  initParticleEffects() {
    // Create animated particles for background
    this.createBackgroundParticles();
    this.createSpotlightEffect();
    this.createGradientShift();
  }

  // ===== BACKGROUND PARTICLES =====
  createBackgroundParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;
      z-index: 0;
    `;

    document.querySelectorAll('.hero-section, .section').forEach(section => {
      section.style.position = 'relative';
      section.appendChild(particlesContainer.cloneNode());
    });

    const createParticle = () => {
      const particle = document.createElement('div');
      const size = Math.random() * 4 + 2;
      const x = Math.random() * 100;
      const animationDuration = Math.random() * 20 + 10;
      const animationDelay = Math.random() * 20;

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(139, 92, 246, 0.1);
        border-radius: 50%;
        left: ${x}%;
        animation: particleFloat ${animationDuration}s ease-in-out infinite;
        animation-delay: ${animationDelay}s;
        box-shadow: 0 0 ${size * 2}px rgba(139, 92, 246, 0.1);
      `;

      particlesContainer.appendChild(particle);
    };

    // Create multiple particles
    for (let i = 0; i < 20; i++) {
      setTimeout(() => createParticle(), i * 100);
    }
  }

  // ===== SPOTLIGHT EFFECT =====
  createSpotlightEffect() {
    const spotlight = document.createElement('div');
    spotlight.className = 'spotlight-effect';
    spotlight.style.cssText = `
      position: absolute;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%);
      pointer-events: none;
      z-index: 1;
      transition: all 0.3s ease;
      left: 0;
      top: 0;
    `;

    document.querySelectorAll('.hero-section, .card-showcase').forEach(element => {
      element.style.position = 'relative';
      element.appendChild(spotlight.cloneNode());
    });

    document.addEventListener('mousemove', (e) => {
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;

      document.querySelectorAll('.spotlight-effect').forEach(spotlight => {
        spotlight.style.left = (x / 10) + 'px';
        spotlight.style.top = (y / 10) + 'px';
      });
    });
  }

  // ===== GRADIENT SHIFT EFFECT =====
  createGradientShift() {
    const gradientContainer = document.querySelector('.hero-section');
    if (!gradientContainer) return;

    const gradients = [
      'linear-gradient(135deg, rgba(139, 92, 246, 0.1), transparent)',
      'linear-gradient(135deg, rgba(20, 184, 166, 0.1), transparent)',
      'linear-gradient(135deg, rgba(240, 196, 86, 0.1), transparent)'
    ];

    let gradientIndex = 0;

    const shiftGradient = () => {
      gradientContainer.style.background = gradients[gradientIndex];
      gradientIndex = (gradientIndex + 1) % gradients.length;
    };

    setInterval(shiftGradient, 5000);
  }

  // ===== COUNTER ANIMATION =====
  animateStatValue(element, target, duration = 2000) {
    const start = 0;
    const range = target - start;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = Math.floor(start + (progress * range));

      element.textContent = currentValue.toLocaleString() + '+';

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(startTime);
  }

  // ===== CARD HOVER EFFECTS =====
  initCardHoverEffects() {
    const cards = document.querySelectorAll('.feature-card, .bento-item');

    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
        card.style.boxShadow = 'var(--shadow-xl), var(--shadow-glow-purple)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = 'none';
      });
    });
  }

  // ===== LAZY LOADING IMAGES =====
  initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback
      images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }

  // ===== NOTIFICATION SYSTEM =====
  showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    notification.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      padding: 12px 24px;
      border-radius: var(--radius-lg);
      background: var(--color-glass-strong);
      backdrop-filter: var(--glass-blur);
      border: 1px solid var(--color-border);
      color: var(--color-text-primary);
      font-size: 14px;
      font-weight: var(--fw-medium);
      z-index: var(--z-toast);
      opacity: 0;
      transition: all 0.3s ease;
      box-shadow: var(--shadow-xl);
    `;

    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(-50%) translateY(0)';
    });

    // Auto remove
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, duration);
  }

  // ===== PERFORMANCE MONITOR =====
  reportPerformance() {
    if ('requestPerformanceEntryTimes' in performance) {
      // Report core web vitals
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          if (perfData) {
            console.log('Page Load Time:', perfData.loadTime);
            console.log('DOM Content Loaded:', perfData.domContentLoadedTime);
          }
        }, 0);
      });
    }
  }
}

// ===== INITIALIZE ON DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', () => {
  window.animationsApp = new LamimAnimations();
});

// ===== CSS ANIMATIONS KEYFRAMES =====
const style = document.createElement('style');
style.textContent = `
@keyframes particleFloat {
  0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100px) translateX(30px); opacity: 0; }
}

@keyframes spotlightPulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 0.8; }
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes ripple {
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(4); opacity: 0; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

/* Custom properties for animations */
:root {
  --mouse-x: 0px;
  --mouse-y: 0px;
}

/* Image lazy load placeholder */
img[data-src] {
  filter: blur(5px);
  transition: filter 0.3s ease;
}

img[data-src]:not([src]) {
  filter: none;
}
`;
document.head.appendChild(style);