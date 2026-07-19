/* =============================================
   LAMIM LANDING PAGE — INTERACTIVE EMULATOR
   Live dashboard preview with tap-to-fill nodes
   ============================================= */

const Emulator = {
  nodes: [],
  currentIndex: 0,
  statuses: ['jamaat', 'jamaat', 'alone', 'jamaat', 'qaza'],
  names: ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'],
  timer: null,
  spiritScore: 72,
  countdownSeconds: 0,
  countdownInterval: null,

  init() {
    this.nodes = document.querySelectorAll('.emulator-node');
    if (!this.nodes.length) return;

    this.nodes.forEach((node, i) => {
      node.addEventListener('click', () => this.toggleNode(i));
      node.style.cursor = 'pointer';
    });

    this.initGreeting();
    this.initCountdown();
    this.startDemo();
  },

  /* ── Dynamic Greeting ── */
  initGreeting() {
    const greetingEls = document.querySelectorAll('.emulator-greeting');
    const heroGreetingEl = document.querySelector('.hero-mockup [style*="0.75rem"]');

    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) return 'Good Morning';
      if (hour >= 12 && hour < 17) return 'Good Afternoon';
      if (hour >= 17 && hour < 21) return 'Good Evening';
      return 'Good Night';
    };

    const greeting = getGreeting();
    greetingEls.forEach(el => {
      el.textContent = `${greeting}, Muhammad`;
    });

    if (heroGreetingEl) {
      heroGreetingEl.textContent = greeting;
    }
  },

  /* ── Simulated Countdown Timer ── */
  initCountdown() {
    // Start from a random time between 30min to 2hours
    this.countdownSeconds = Math.floor(Math.random() * 5400) + 1800;

    const timeEls = document.querySelectorAll('.emulator-prayer-time');

    const updateCountdown = () => {
      if (this.countdownSeconds <= 0) {
        // Reset when reaches 0
        this.countdownSeconds = Math.floor(Math.random() * 5400) + 1800;
      }

      const hours = Math.floor(this.countdownSeconds / 3600);
      const mins = Math.floor((this.countdownSeconds % 3600) / 60);
      const secs = this.countdownSeconds % 60;

      const timeStr = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

      timeEls.forEach(el => {
        el.textContent = timeStr;
      });

      // Update hero mockup inline styles
      const heroTimeEl = document.querySelector('.hero-mockup [style*="1.5rem"]');
      if (heroTimeEl) {
        heroTimeEl.textContent = timeStr;
      }

      this.countdownSeconds--;
    };

    updateCountdown();
    this.countdownInterval = setInterval(updateCountdown, 1000);
  },

  toggleNode(index) {
    const node = this.nodes[index];
    const dot = node.querySelector('.emulator-dot');
    const status = this.statuses[index];

    if (dot.classList.contains('filled')) {
      dot.classList.remove('filled', 'jamaat', 'alone', 'qaza');
      node.classList.remove('filled', 'jamaat', 'alone', 'qaza');
    } else {
      dot.classList.add('filled', status);
      node.classList.add('filled', status);
    }

    this.updateCount();
  },

  updateCount() {
    const filled = document.querySelectorAll('.emulator-dot.filled').length;
    const badge = document.querySelector('.emulator-count');
    if (badge) badge.textContent = `${filled}/5`;
  },

  startDemo() {
    let step = 0;
    const delays = [800, 600, 800, 1000, 1300];

    const playStep = () => {
      if (step >= this.nodes.length) {
        // Reset after 4 seconds and replay
        setTimeout(() => this.resetDemo(), 4000);
        return;
      }
      this.toggleNode(step);
      step++;
      if (step < this.nodes.length) {
        setTimeout(playStep, delays[step] - delays[step - 1] || delays[0]);
      } else {
        setTimeout(() => this.resetDemo(), 4000);
      }
    };

    setTimeout(playStep, delays[0]);
  },

  resetDemo() {
    this.nodes.forEach(node => {
      const dot = node.querySelector('.emulator-dot');
      dot.classList.remove('filled', 'jamaat', 'alone', 'qaza');
      node.classList.remove('filled', 'jamaat', 'alone', 'qaza');
    });
    this.updateCount();

    // Replay with proper staggered delays
    let step = 0;
    const delays = [600, 600, 600, 600, 600];

    const playStep = () => {
      if (step >= this.nodes.length) {
        setTimeout(() => this.resetDemo(), 4000);
        return;
      }
      this.toggleNode(step);
      step++;
      if (step < this.nodes.length) {
        setTimeout(playStep, delays[step]);
      } else {
        setTimeout(() => this.resetDemo(), 4000);
      }
    };

    setTimeout(playStep, delays[0]);
  }
};

document.addEventListener('DOMContentLoaded', () => Emulator.init());
