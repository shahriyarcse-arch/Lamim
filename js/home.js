/* =============================================
   LAMIM — HOME MODULE (Classic Simple Design)
   Clean, Minimal, No Cards, No Animations
   ============================================= */
const Home = {
  init() {
    this.render();
    this.startClock();
    this.updateNextPrayer();
    this.updateAllCards();
  },

  render() {
    const greeting = this.getGreeting();
    
    const greetingEl = document.getElementById('home-greeting');
    if (greetingEl) greetingEl.textContent = greeting;
  },

  getGreeting() {
    const hour = new Date().getHours();
    const lang = localStorage.getItem('lamim_lang') || 'en';
    
    const greetings = {
      en: hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening',
      bn: hour < 12 ? 'সুপ্রভাত' : hour < 18 ? 'শুভ অপরাহ্ন' : 'শুভ সন্ধ্যা'
    };
    
    return greetings[lang] || greetings.en;
  },

  startClock() {
    const updateClock = () => {
      const now = new Date();
      const clockEl = document.getElementById('home-clock');
      const dateEl = document.getElementById('home-date');
      
      if (clockEl) {
        clockEl.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      }
      
      if (dateEl) {
        dateEl.textContent = now.toLocaleDateString(
          localStorage.getItem('lamim_lang') === 'bn' ? 'bn-BD' : 'en-US', 
          { weekday: 'short', month: 'short', day: 'numeric' }
        );
      }
    };
    
    updateClock();
    setInterval(updateClock, 60000);
  },

  updateNextPrayer() {
    const times = Utils.calcPrayerTimes();
    const next = Utils.getNextPrayer(times);
    
    const nextEl = document.getElementById('home-next-prayer');
    const nameEl = document.getElementById('home-next-prayer-name');
    
    if (next && nextEl) {
      nextEl.style.display = 'block';
      if (nameEl) nameEl.textContent = next.label;
    }
  },

  updateAllCards() {
    this.updateSalahCard();
    this.updateDhikrCard();
    this.updateMujahidCard();
    this.updateGymCard();
    this.updateCareerCard();
    this.updateFinanceCard();
    this.updateSpiritScore();
  },

  updateSpiritScore() {
    const user = DB.getUser();
    const scoreEl = document.getElementById('home-spirit-score');
    if (scoreEl && user) {
      scoreEl.textContent = Math.round(user.spirit_score || 0);
    }
  },

  updateSalahCard() {
    const today = Utils.todayStr();
    const salah = DB.getSalah(today);
    const score = Utils.salahScore(salah);
    const grid = document.getElementById('home-salah-grid');
    
    if (grid) {
      let html = '';
      ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].forEach(prayer => {
        const status = salah[prayer];
        let className = '';
        if (status === 'jamaat' || status === 'alone') className = 'active';
        else if (status === 'qaza') className = 'partial';
        html += `<div class="home-prayer-dot ${className}"></div>`;
      });
      grid.innerHTML = html;
    }
    
    const prayedEl = document.getElementById('home-salah-prayed');
    if (prayedEl) prayedEl.textContent = `${score.done}/5`;
    
    const streakEl = document.getElementById('home-salah-streak');
    if (streakEl) streakEl.textContent = DB.getSalahStreak()?.perfect || 0;
  },

  updateDhikrCard() {
    const today = Utils.todayStr();
    const sessions = DB.getDhikr(today);
    const count = Object.values(sessions).reduce((sum, s) => sum + (s || 0), 0);
    
    const countEl = document.getElementById('home-dhikr-count');
    if (countEl) countEl.textContent = count.toLocaleString();
    
    const targetEl = document.getElementById('home-dhikr-target');
    if (targetEl) targetEl.textContent = (DB.getSettings().dhikrTarget || 100).toLocaleString();
  },

  updateMujahidCard() {
    const habits = DB.getMujahid();
    const active = habits.filter(h => h.active).length;
    const bestStreak = habits.reduce((max, h) => Math.max(max, h.streak || 0), 0);
    
    const activeEl = document.getElementById('home-mujahid-active');
    if (activeEl) activeEl.textContent = active;
    
    const streakEl = document.getElementById('home-mujahid-streak');
    if (streakEl) streakEl.textContent = bestStreak;
  },

  updateGymCard() {
    const today = Utils.todayStr();
    const gym = DB.getGym(today);
    
    const exercisesEl = document.getElementById('home-gym-exercises');
    if (exercisesEl) exercisesEl.textContent = (gym.exercises?.length || 0);
    
    const waterEl = document.getElementById('home-gym-water');
    if (waterEl) waterEl.textContent = (gym.water?.amount || 0);
  },

  updateCareerCard() {
    const today = Utils.todayStr();
    const career = DB.getCareer(today);
    const goals = career.checklist || [];
    const goalsDone = goals.filter(g => g.done).length;
    const totalGoals = goals.length;
    
    const studyEl = document.getElementById('home-career-study');
    if (studyEl) studyEl.textContent = (career.studyDuration || 0);
    
    const goalsEl = document.getElementById('home-career-goals');
    if (goalsEl) goalsEl.textContent = totalGoals ? `${goalsDone}/${totalGoals}` : '0/0';
  },

  updateFinanceCard() {
    const finance = DB.getFinance() || {};
    const summary = finance.summary || {};
    
    const netEl = document.getElementById('home-finance-net');
    if (netEl) {
      const net = summary.monthNet || 0;
      netEl.textContent = net >= 0 ? '+' + net.toLocaleString() : net.toLocaleString();
      netEl.style.color = net >= 0 ? 'var(--color-accent-green)' : 'var(--color-accent-red)';
    }
  }
};

window.Home = Home;