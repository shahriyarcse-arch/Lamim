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

  init() {
    this.nodes = document.querySelectorAll('.emulator-node');
    if (!this.nodes.length) return;

    this.nodes.forEach((node, i) => {
      node.addEventListener('click', () => this.toggleNode(i));
      node.style.cursor = 'pointer';
    });

    this.startDemo();
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
