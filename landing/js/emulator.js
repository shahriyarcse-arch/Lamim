/* =============================================
   LAMIM LANDING PAGE — INTERACTIVE EMULATOR
   ============================================= */

class LamimDashboardEmulator {
  constructor() {
    this.init();
    this.loadDemoState();
  }

  init() {
    this.initState();
    this.initEventListeners();
    this.startTimer();
    this.initHaptic();
  }

  // ===== INITIALIZATION =====
  initState() {
    this.state = {
      dhikrCount: 0,
      dhikrStreak: 0,
      salahCompletion: {
        fajr: false,
        dhuhr: false,
        asr: false,
        maghrib: false,
        isha: false,
        jamaat: 0,
        alone: 0,
        qaza: 0
      },
      spiritualHealth: 92,
      savingsProgress: 85,
      currentTime: new Date(),
      nextSalah: 'Dhuhr',
      nextSalahTime: '12:30',
      isOffline: true,
      hapticEnabled: true,
      soundEnabled: true
    };

    this.saveDemoState();
  }

  loadDemoState() {
    const savedState = localStorage.getItem('lamim-demo-state');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      this.state = { ...this.state, ...parsedState };
    }
  }

  saveDemoState() {
    localStorage.setItem('lamim-demo-state', JSON.stringify(this.state));
  }

  // ===== EVENT LISTENERS =====
  initEventListeners() {
    // Salah buttons
    document.querySelectorAll('.salah-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleSalahClick(e));
      btn.addEventListener('touchstart', (e) => this.handleSalahTouch(e), { passive: true });
    });

    // Dhikr button
    const dhikrBtn = document.querySelector('.dhikr-btn');
    if (dhikrBtn) {
      dhikrBtn.addEventListener('click', () => this.handleDhikrClick());
      dhikrBtn.addEventListener('touchstart', (e) => this.handleDhikrTouch(e), { passive: true });
    }

    // Save button
    const saveBtn = document.querySelector('.save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => this.handleSave());
    }

    // Reset demo button
    const resetBtn = document.querySelector('.reset-demo-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.handleResetDemo());
    }
  }

  // ===== SALSHA HANDLING =====
  handleSalahClick(e) {
    e.preventDefault();
    const salahType = e.currentTarget.dataset.salah;
    this.toggleSalah(salahType);
    this.updateDashboard();
    this.triggerHaptic('light');
    this.playSound('success');
  }

  handleSalahTouch(e) {
    e.preventDefault();
    const salahType = e.currentTarget.dataset.salah;
    this.toggleSalah(salahType);
    this.updateDashboard();
    this.triggerHaptic('light');
    this.playSound('success');
  }

  toggleSalah(salahType) {
    const isCompleted = !this.state.salahCompletion[salahType];

    if (isCompleted) {
      this.state.salahCompletion[salahType] = true;
      this.state.salahCompletion.jamaat++;
      this.state.salahCompletion.qaza--;
    } else {
      this.state.salahCompletion[salahType] = false;
    }

    // Reset next day if all completed
    const allCompleted = Object.entries(this.state.salahCompletion)
      .filter(key => !['jamaat', 'alone', 'qaza'].includes(key))
      .every(([_, value]) => value);

    if (allCompleted) {
      this.resetDay();
    }

    this.saveDemoState();
  }

  // ===== DHIKR HANDLING =====
  handleDhikrClick() {
    this.state.dhikrCount++;
    this.state.dhikrStreak++;

    // Large streak bonus
    if (this.state.dhikrStreak % 10 === 0) {
      this.triggerHaptic('strong');
      this.playSound('bonus');
    } else {
      this.triggerHaptic('light');
      this.playSound('tap');
    }

    this.updateSpiritualHealth();
    this.updateDashboard();
    this.saveDemoState();
    this.createRippleEffect();
  }

  handleDhikrTouch(e) {
    e.preventDefault();
    this.handleDhikrClick();
  }

  createRippleEffect() {
    const dhikrBtn = document.querySelector('.dhikr-btn');
    if (!dhikrBtn) return;

    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(20, 184, 166, 0.6)';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '1000';
    ripple.style.left = '50%';
    ripple.style.top = '50%';

    dhikrBtn.style.position = 'relative';
    dhikrBtn.appendChild(ripple);

    const rect = dhikrBtn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // ===== TIMER =====
  startTimer() {
    setInterval(() => {
      this.state.currentTime = new Date();

      // Update next salah time every minute
      const now = new Date();
      const currentHour = now.getHours();

      if (currentHour === 12 && this.state.nextSalah !== 'Dhuhr') {
        this.state.nextSalah = 'Dhuhr';
        this.state.nextSalahTime = '12:30';
      } else if (currentHour === 15 && this.state.nextSalah !== 'Asr') {
        this.state.nextSalah = 'Asr';
        this.state.nextSalahTime = '15:15';
      } else if (currentHour === 18 && this.state.nextSalah !== 'Maghrib') {
        this.state.nextSalah = 'Maghrib';
        this.state.nextSalahTime = '18:30';
      } else if (currentHour === 19 && this.state.nextSalah !== 'Isha') {
        this.state.nextSalah = 'Isha';
        this.state.nextSalahTime = '19:45';
      } else if (currentHour === 4 && this.state.nextSalah !== 'Fajr') {
        this.state.nextSalah = 'Fajr';
        this.state.nextSalahTime = '05:30';
      }

      this.updateDashboard();
    }, 60000);
  }

  // ===== SPIRITUAL HEALTH CALCULATION =====
  updateSpiritualHealth() {
    const weights = {
      salah: 0.4,
      nafl: 0.2,
      dhikr: 0.15,
      habits: 0.15,
      goals: 0.1
    };

    const salahScore = ((this.state.salahCompletion.jamaat) / 5) * 100;
    const naflScore = (this.state.salahCompletion.jamaat * 0.5) / 5 * 100;
    const dhikrScore = Math.min(this.state.dhikrCount / 100, 1) * 100;
    const habitsScore = 78; // Static for demo
    const goalsScore = 82; // Static for demo

    const totalScore = Math.round(
      (salahScore * weights.salah) +
      (naflScore * weights.nafl) +
      (dhikrScore * weights.dhikr) +
      (habitsScore * weights.habits) +
      (goalsScore * weights.goals)
    );

    this.state.spiritualHealth = totalScore;

    // Update rank
    this.updateRank(totalScore);
  }

  updateRank(score) {
    let rank = '';
    let color = ''
    let description = '';

    if (score >= 90) {
      rank = 'Wali';
      color = '--color-jamaat';
      description = 'A saint who has reached spiritual perfection';
    } else if (score >= 80) {
      rank = 'Muhsin';
      color = '--color-accent-purple';
      description = 'One who does good and avoids evil';
    } else if (score >= 70) {
      rank = 'Muttaqi';
      color = '--color-accent-blue';
      description = 'A righteous person with Taqwa';
    } else if (score >= 60) {
      rank = 'Murid';
      color = '--color-accent-teal';
      description = 'A seeker on the path of spiritual growth';
    } else if (score >= 50) {
      rank = 'Musafir';
      color = '--color-accent-orange';
      description = 'A traveler on the spiritual journey';
    } else {
      rank = 'Ghafil';
      color = '--color-qaza';
      description = 'A negligent person starting their journey';
    }

    this.state.spiritualRank = rank;
    this.state.spiritualRankColor = color;
    this.state.spiritualRankDescription = description;

    this.updateDashboard();
    this.saveDemoState();
  }

  // ===== HAPTIC FEEDBACK =====
  initHaptic() {
    this.hapticSupported = 'navigator' in window && 'vibrate' in navigator;
  }

  triggerHaptic(type) {
    if (!this.hapticSupported || !this.state.hapticEnabled) return;

    const patterns = {
      'light': [10],
      'medium': [20],
      'strong': [50],
      'success': [10, 20, 10],
      'error': [100, 50, 100],
      'bonus': [50, 100, 50]
    };

    const pattern = patterns[type] || patterns['light'];
    navigator.vibrate(pattern);
  }

  // ===== SOUND EFFECTS =====
  playSound(type) {
    // In a real implementation, this would play actual audio
    // For demo purposes, we'll use Web Audio API or Tone.js
    console.log('Playing sound:', type);
    this.createSoundEffect(type);
  }

  createSoundEffect(type) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    const playNote = (frequency, duration, type = 'sine') => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    };

    const patterns = {
      'tap': () => playNote(440, 0.1, 'sine'),
      'success': () => {
        playNote(523, 0.2);
        setTimeout(() => playNote(659, 0.2), 50);
      },
      'bonus': () => {
        playNote(784, 0.3);
        setTimeout(() => playNote(988, 0.3), 100);
      }
    };

    if (patterns[type]) {
      patterns[type]();
    }
  }

  // ===== DASHBOARD UPDATE =====
  updateDashboard() {
    this.updateSalahDisplay();
    this.updateDhikrDisplay();
    this.updateSpiritualHealthDisplay();
    this.updateTimeDisplay();
    this.updateSavingsDisplay();
    this.updateAnimations();
  }

  updateSalahDisplay() {
    const salahCompletion = this.state.salahCompletion;

    // Update salah button states
    document.querySelectorAll('.salah-btn').forEach(btn => {
      const salahType = btn.dataset.salah;
      if (salahCompletion[salahType]) {
        btn.classList.add('completed');
        btn.querySelector('.salah-status').textContent = '✓';
      } else {
        btn.classList.remove('completed');
        btn.querySelector('.salah-status').textContent = '';
      }
    });

    // Update statistik
    const totalSalah = Object.keys(salahCompletion).length - 3; // Exclude jamaat, alone, qaza
    const completedSalah = Object.entries(salahCompletion)
      .filter(([key, value]) => !['jamaat', 'alone', 'qaza'].includes(key) && value)
      .length;

    const spiritualCount = document.querySelector('.spiritual-count');
    if (spiritualCount) {
      spiritualCount.textContent = `${this.state.spiritualHealth}%`;
    }

    const streakCount = document.querySelector('.streak-count');
    if (streakCount) {
      streakCount.textContent = this.state.dhikrStreak;
    }
  }

  updateDhikrDisplay() {
    const dhikrCount = document.querySelector('.dhikr-count');
    const dhikrTotal = document.querySelector('.dhikr-total');
    const dhikrProgress = document.querySelector('.dhikr-progress-fill');

    if (dhikrCount) {
      dhikrCount.textContent = this.state.dhikrCount.toLocaleString();
    }

    if (dhikrTotal) {
      dhikrTotal.textContent = `Target: ${this.state.dhikrCount < 100 ? '100' : this.state.dhikrCount < 1000 ? '1K' : this.state.dhikrCount < 10000 ? '10K' : '100K'}`;
    }

    if (dhikrProgress) {
      const progress = Math.min((this.state.dhikrCount % 100) / 100, 1) * 100;
      dhikrProgress.style.width = `${progress}%`;
    }
  }

  updateSpiritualHealthDisplay() {
    const spiritualHealthBar = document.querySelector('.spiritual-health-bar');
    const spiritualRank = document.querySelector('.spiritual-rank');
    const spiritualRankColor = document.querySelector('.spiritual-rank-color');
    const spiritualDescription = document.querySelector('.spiritual-description');

    if (spiritualHealthBar) {
      spiritualHealthBar.style.width = `${this.state.spiritualHealth}%`;
      spiritualHealthBar.style.background = this.state.spiritualRankColor ? `var(${this.state.spiritualRankColor})` : 'var(--color-jamaat)';

      // Set color based on score
      if (this.state.spiritualHealth >= 90) {
        spiritualHealthBar.style.background = 'var(--color-jamaat)';
      } else if (this.state.spiritualHealth >= 80) {
        spiritualHealthBar.style.background = 'var(--color-accent-purple)';
      } else if (this.state.spiritualHealth >= 70) {
        spiritualHealthBar.style.background = 'var(--color-accent-blue)';
      } else if (this.state.spiritualHealth >= 60) {
        spiritualHealthBar.style.background = 'var(--color-accent-teal)';
      } else {
        spiritualHealthBar.style.background = 'var(--color-qaza)';
      }
    }

    if (spiritualRank) {
      spiritualRank.textContent = this.state.spiritualRank;
    }

    if (spiritualRankColor) {
      spiritualRankColor.style.color = this.state.spiritualRankColor ? `var(${this.state.spiritualRankColor})` : 'var(--color-jamaat)';
    }

    if (spiritualDescription) {
      spiritualDescription.textContent = this.state.spiritualRankDescription;
    }

    const spiritualScore = document.querySelector('.spiritual-score');
    if (spiritualScore) {
      spiritualScore.textContent = this.state.spiritualHealth;
    }
  }

  updateTimeDisplay() {
    const currentTime = document.querySelector('.current-time');
    const nextSalah = document.querySelector('.next-salah');
    const nextSalahTime = document.querySelector('.next-salah-time');

    if (currentTime) {
      const hours = this.state.currentTime.getHours().toString().padStart(2, '0');
      const minutes = this.state.currentTime.getMinutes().toString().padStart(2, '0');
      currentTime.textContent = `${hours}:${minutes}`;
    }

    if (nextSalah) {
      nextSalah.textContent = this.state.nextSalah;
    }

    if (nextSalahTime) {
      nextSalahTime.textContent = this.state.nextSalahTime;
    }

    // Calculate time to next salah
    const timeToNextSalah = document.querySelector('.time-to-next');
    if (timeToNextSalah) {
      const hoursUntil = this.getHoursUntilNextSalah();
      if (hoursUntil > 0) {
        timeToNextSalah.textContent = `Next: ${hoursUntil} hours`;
      } else {
        timeToNextSalah.textContent = 'Soon!';
      }
    }
  }

  getHoursUntilNextSalah() {
    const now = this.state.currentTime;
    const hour = now.getHours();

    let nextSalahHour = 0;
    if (this.state.nextSalah === 'Fajr') nextSalahHour = 5;
    else if (this.state.nextSalah === 'Dhuhr') nextSalahHour = 12;
    else if (this.state.nextSalah === 'Asr') nextSalahHour = 15;
    else if (this.state.nextSalah === 'Maghrib') nextSalahHour = 18;
    else if (this.state.nextSalah === 'Isha') nextSalahHour = 19;

    let hoursUntil = nextSalahHour - hour;
    if (hoursUntil <= 0) hoursUntil += 24;

    return Math.max(hoursUntil, 0);
  }

  updateSavingsDisplay() {
    const savingsProgress = document.querySelector('.savings-progress');
    const savingsAmount = document.querySelector('.savings-amount');
    const targetAmount = document.querySelector('.target-amount');

    if (savingsProgress) {
      savingsProgress.style.width = `${this.state.savingsProgress}%`;
    }

    if (savingsAmount) {
      savingsAmount.textContent = `₹${(this.state.savingsProgress * 1000).toLocaleString()}`;
    }

    if (targetAmount) {
      targetAmount.textContent = `Target: ₹10,000`;
    }

    // Grow savings over time (simulated)
    if (Math.random() < 0.3) {
      this.state.savingsProgress = Math.min(this.state.savingsProgress + Math.random() * 5, 100);
      this.updateDashboard();
    }
  }

  // ===== ANIMATIONS =====
  updateAnimations() {
    // Update animated elements based on state
    const dhikrButton = document.querySelector('.dhikr-btn');
    if (dhikrButton) {
      dhikrButton.style.animation = this.state.dhikrCount > 0 ? 'pulse 0.5s ease' : '';
    }

    // Update spiritual health indicator
    const spiritualHealthBar = document.querySelector('.spiritual-health-bar');
    if (spiritualHealthBar) {
      spiritualHealthBar.style.animation = `gradient-shift ${10 - (this.state.spiritualHealth / 10)}s linear infinite`;
    }

    // Update rank indicator
    const spiritualRankElement = document.querySelector('.spiritual-rank');
    if (spiritualRankElement) {
      spiritualRankElement.classList.add('anim-pulse-glow');
      setTimeout(() => {
        spiritualRankElement.classList.remove('anim-pulse-glow');
      }, 2000);
    }
  }

  // ===== ACTION HANDLERS =====
  handleSave() {
    this.triggerHaptic('medium');
    this.playSound('success');

    const saveMessage = document.createElement('div');
    saveMessage.textContent = '✅ Demo saved! Changes preserved for next visit.';
    saveMessage.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--color-glass-strong);
      backdrop-filter: var(--glass-blur);
      border: 1px solid var(--color-accent-teal);
      color: var(--color-text-primary);
      padding: 12px 24px;
      border-radius: var(--radius-lg);
      font-size: 14px;
      font-weight: var(--fw-medium);
      z-index: var(--z-toast);
      box-shadow: var(--shadow-lg);
      animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(saveMessage);

    setTimeout(() => {
      saveMessage.remove();
    }, 3000);
  }

  handleResetDemo() {
    if (confirm('Reset demo to initial state? This cannot be undone.')) {
      this.initState();
      this.updateDashboard();
      this.saveDemoState();
      this.playSound('success');
    }
  }

  // ===== AUTOMATIONS =====
  resetDay() {
    // Auto-recover qaza prayers and add to next day
    const allCompleted = Object.entries(this.state.salahCompletion)
      .filter(([key, value]) => !['jamaat', 'alone', 'qaza'].includes(key))
      .every(([_, value]) => value);

    if (allCompleted) {
      // Reset salah completion for the day, but keep qaza
      ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].forEach(key => {
        this.state.salahCompletion[key] = false;
      });

      // Reset dhikr streak for next day
      this.state.dhikrStreak = 0;

      // Add qaza to jamaat for next day
      this.state.salahCompletion.qaza = 0;

      this.updateDashboard();
      this.saveDemoState();

      this.playSound('success');
      this.triggerHaptic('medium');
    }
  }

  // ===== PUBLIC API =====
  getDemoState() {
    return { ...this.state };
  }

  setDemoState(newState) {
    this.state = { ...this.state, ...newState };
    this.updateDashboard();
    this.saveDemoState();
  }

  incrementDhikr() {
    this.state.dhikrCount++;
    this.updateDashboard();
    this.saveDemoState();
  }
}

// ===== CSS ANIMATIONS KEYFRAMES =====
const style = document.createElement('style');
style.textContent = `
@keyframes slideIn {
  from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
  to { transform: translateX(-50%) translateY(0); opacity: 1; }
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Utility classes for animations */
.text-glow {
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}

.glow-effect {
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.4);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .emulator-container {
    flex-direction: column;
  }

  .dashboard-section {
    min-height: 300px;
  }
}
`;
document.head.appendChild(style);

// ===== INITIALIZE ON DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', () => {
  window.lamimEmulator = new LamimDashboardEmulator();
});

// ===== EXPOSE GLOBAL API =====
window.LamimDemo = {
  getState: () => window.lamimEmulator ? window.lamimEmulator.getDemoState() : null,
  incrementDhikr: () => window.lamimEmulator ? window.lamimEmulator.incrementDhikr() : null,
  toggleSalah: (salah) => window.lamimEmulator ? window.lamimEmulator.toggleSalah(salah) : null,
  resetDemo: () => window.lamimEmulator ? window.lamimEmulator.handleResetDemo() : null
};