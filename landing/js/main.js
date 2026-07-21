/* =============================================
   LAMIM LANDING PAGE — MAIN JAVASCRIPT
   ============================================= */

class LamimLandingPage {
  constructor() {
    this.init();
  }

  init() {
    this.initNavigation();
    this.initScrollEffects();
    this.initMouseGlow();
    this.initObserver();
    this.initCounterAnimations();
    this.initThemeToggle();
    this.initSmoothScroll();
  }

  // ===== NAVIGATION =====
  initNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Navbar scroll effect
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      lastScrollTop = scrollTop;
    });

    // Mobile menu toggle
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', () => {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
      });
    }

    // Close mobile menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Active nav link based on scroll position
    this.updateActiveNavLink();
    window.addEventListener('scroll', () => this.updateActiveNavLink());
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';
    const scrollY = window.pageYOffset + 150; // Offset for sticky nav

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(currentSection)) {
        link.classList.add('active');
      }
    });
  }

  // ===== SCROLL EFFECTS =====
  initScrollEffects() {
    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', () => {
        const heroSection = document.querySelector('#hero');
        if (heroSection) {
          const headerHeight = document.querySelector('.navbar').offsetHeight;
          window.scrollTo({
            top: heroSection.offsetTop,
            behavior: 'smooth'
          });
        }
      });
    }

    // Navbar transparency on scroll
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(2, 4, 8, 0.9)';
        navbar.style.backdropFilter = 'blur(20px)';
      } else {
        navbar.style.background = 'transparent';
        navbar.style.backdropFilter = 'blur(16px)';
      }
    });
  }

  // ===== MOUSE GLOW EFFECT =====
  initMouseGlow() {
    const mouseGlow = document.createElement('div');
    mouseGlow.className = 'mouse-glow';
    mouseGlow.style.cssText = `
      position: fixed;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
      pointer-events: none;
      z-index: var(--z-cursor);
      transform: translate(-50%, -50%);
      transition: all 0.1s ease;
      opacity: 0;
      left: 0;
      top: 0;
    `;
    document.body.appendChild(mouseGlow);

    document.addEventListener('mousemove', (e) => {
      mouseGlow.style.left = e.clientX + 'px';
      mouseGlow.style.top = e.clientY + 'px';
      mouseGlow.style.opacity = 1;

      // Calculate angle for card tilt effects
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      document.documentElement.style.setProperty('--mouse-x', (x / 20) + 'px');
      document.documentElement.style.setProperty('--mouse-y', (y / 20) + 'px');
    });

    // Hide glow when mouse leaves window
    document.addEventListener('mouseleave', () => {
      mouseGlow.style.opacity = 0;
    });
  }

  // ===== SCROLL OBSERVER =====
  initObserver() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');

          // Trigger animations for children
          if (entry.target.classList.contains('scroll-reveal-stagger')) {
            const children = entry.target.children;
            Array.from(children).forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('active');
              }, index * 100);
            });
          }
        }
      });
    }, observerOptions);

    // Observe all scroll-reveal elements
    document.querySelectorAll('.scroll-reveal, .scroll-reveal-fast, .scroll-reveal-stagger, .scroll-reveal-blur').forEach(element => {
      observer.observe(element);
    });
  }

  // ===== COUNTER ANIMATIONS =====
  initCounterAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounters(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe stats sections
    document.querySelectorAll('.stats-grid').forEach(statsGrid => {
      observer.observe(statsGrid);
    });
  }

  animateCounters(element) {
    const statValues = element.querySelectorAll('.stat-value');

    statValues.forEach(stat => {
      const target = stat.textContent;
      const isPercentage = target.includes('%');
      const isNumber = !isNaN(parseFloat(target)) && isFinite(target);

      if (isPercentage) {
        const finalValue = parseFloat(target);
        this.countUp(stat, 0, finalValue, 2000, '%');
      } else if (isNumber) {
        const finalValue = parseInt(target);
        this.countUp(stat, 0, finalValue, 2000, '');
      }
    });
  }

  countUp(element, start, end, duration, suffix) {
    const range = end - start;
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = Math.floor(start + (progress * range));

      element.textContent = currentValue + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(startTime);
  }

  // ===== THEME TOGGLE =====
  initThemeToggle() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('lamim-theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // Theme toggle button (if present)
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('lamim-theme', newTheme);

        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }));
      });
    }
  }

  // ===== SMOOTH SCROLL =====
  initSmoothScroll() {
    // Smooth scroll for internal links
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
        }
      });
    });
  }

  // ===== CARD TILT EFFECT =====
  initCardTilt() {
    const bentoItems = document.querySelectorAll('.bento-item');

    bentoItems.forEach(item => {
      item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        item.style.setProperty('--rotate-x', rotateX + 'deg');
        item.style.setProperty('--rotate-y', rotateY + 'deg');
      });

      item.addEventListener('mouseleave', () => {
        item.style.setProperty('--rotate-x', '0deg');
        item.style.setProperty('--rotate-y', '0deg');
      });
    });
  }

  // ===== STATISTICS COUNTER =====
  startStatisticsCounter() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateStatValues(entry.target.querySelectorAll('.stat-value'));
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.stats-grid').forEach(statsGrid => {
      observer.observe(statsGrid);
    });
  }

  animateStatValues(statElements) {
    statElements.forEach(stat => {
      const targetValue = stat.textContent;
      const suffix = stat.querySelector('span') ? stat.querySelector('span').textContent : '';
      const numberValue = parseFloat(targetValue.replace(/[^0-9.]/g, ''));

      if (!isNaN(numberValue)) {
        this.animateNumber(stat, 0, numberValue, 2000, suffix);
      }
    });
  }

  animateNumber(element, start, end, duration, suffix) {
    const range = end - start;
    const startTime = performance.now();

    const updateNumber = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = start + (progress * range);

      element.textContent = currentValue.toFixed(0) + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        element.textContent = end + suffix;
      }
    };

    requestAnimationFrame(startTime);
  }

  // ===== SCROLL TO TOP BUTTON =====
  initScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--gradient-purple);
      color: white;
      border: none;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
      opacity: 0;
      transition: all 0.3s ease;
      z-index: var(--z-toast);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow-lg);
    `;

    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        scrollToTopBtn.style.opacity = '1';
      } else {
        scrollToTopBtn.style.opacity = '0';
      }
    });

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
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
      transform: translateX(-50%);
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
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);

    // Remove after duration
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, duration);
  }

  // ===== LAZY LOAD IMAGES =====
  initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const image = entry.target;
            image.src = image.dataset.src;
            image.removeAttribute('data-src');
            imageObserver.unobserve(image);
          }
        });
      });

      images.forEach(image => imageObserver.observe(image));
    } else {
      // Fallback for older browsers
      images.forEach(image => {
        image.src = image.dataset.src;
        image.removeAttribute('data-src');
      });
    }
  }

  // ===== ACCESSIBILITY =====
  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  // ===== PERFORMANCE OPTIMIZATION =====
  preloadCriticalResources() {
    // Preload critical fonts
    const fonts = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;600;700;800&family=Amiri:ital@0;1&display=swap'
    ];

    fonts.forEach(fontUrl => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = fontUrl;
      document.head.appendChild(link);

      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = fontUrl;
      document.head.appendChild(style);
    });
  }

  // ===== ERROR HANDLING =====
  handleError(error) {
    console.error('Lamim Landing Page Error:', error);
    this.showNotification('An error occurred. Please refresh the page.', 'error');
  }
}

// ===== INITIALIZE ON DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', () => {
  window.lamimApp = new LamimLandingPage();

  // Initialize card tilt effects after a short delay
  setTimeout(() => {
    window.lamimApp.initCardTilt();
  }, 100);

  // Initialize statistics counter
  setTimeout(() => {
    window.lamimApp.startStatisticsCounter();
  }, 500);
});

// ===== SERVICE WORKER REGISTRATION FOR PWA =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}