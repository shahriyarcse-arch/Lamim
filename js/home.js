/* =============================================
   LAMIM — HOME MODULE (Minimal Classic)
   Greetings, Date, Spirit Score, Prayers, Next Prayer
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
      const dateEl = document.getElementById('home-date');
      
      if (dateEl) {
        dateEl.textContent = now.toLocaleDateString(
          localStorage.getItem('lamim_lang') === 'bn' ? 'bn-BD' : 'en-US', 
          { weekday: 'long', month: 'long', day: 'numeric' }
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
    this.updateSpiritScore();
    this.updateSalahCard();
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
    
    const countEl = document.getElementById('home-salah-count');
    if (countEl) countEl.textContent = `${score.done}/5`;
  }
};

window.Home = Home;