/* =============================================
   LAMIM — HOME MODULE
   ============================================= */
const Home = {
  countdownInterval: null,
  _clockInterval: null,

  init() {
    this.render();
    this.startClock();
    this.updateNextPrayer();
    this.updateSpiritScore();
    this.updateSalahTimeline();
    this.renderDailyInsights();
    this.bindAuroraScrollPause();
  },

  onDataUpdated() {
    this.updateNextPrayer();
    this.updateSalahTimeline();
  },

  bindAuroraScrollPause() {
    if (this._auroraBound) return;
    this._auroraBound = true;
    const bg = document.querySelector('.home-aurora-bg');
    if (!bg) return;
    let timer;
    this._auroraHandler = () => {
      if (!document.body.classList.contains('home-active')) return;
      bg.classList.add('is-scrolling');
      clearTimeout(timer);
      timer = setTimeout(() => bg.classList.remove('is-scrolling'), 120);
    };
    window.addEventListener('scroll', this._auroraHandler, { passive: true });
  },

  destroy() {
    if (this._clockInterval) {
      clearInterval(this._clockInterval);
      this._clockInterval = null;
    }
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
    if (this._auroraHandler) {
      window.removeEventListener('scroll', this._auroraHandler);
      this._auroraHandler = null;
      this._auroraBound = false;
    }
  },

  render() {
    const greeting = this.getGreeting();
    const user = DB.getUser() || {};
    const greetingEl = document.getElementById('home-greeting');
    if (greetingEl) {
      greetingEl.textContent = user.name ? `${greeting}, ${user.name}` : greeting;
    }
  },

  getGreeting() {
    const hour = new Date().getHours();
    const lang = (typeof App !== 'undefined' && App.lang) || 'en';
    const greetings = {
      en: hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening',
      bn: hour < 12 ? 'সুপ্রভাত' : hour < 18 ? 'শুভ অপরাহ্ন' : 'শুভ সন্ধ্যা'
    };
    return greetings[lang] || greetings.en;
  },

  startClock() {
    if (this._clockInterval) clearInterval(this._clockInterval);

    const updateClock = () => {
      const now = new Date();
      const dateEl = document.getElementById('home-date');
      const hijriEl = document.getElementById('home-hijri-date');

      if (dateEl) {
        dateEl.textContent = now.toLocaleDateString(
          (typeof App !== 'undefined' && App.lang) === 'bn' ? 'bn-BD' : 'en-US',
          { weekday: 'long', month: 'long', day: 'numeric' }
        );
      }
      if (hijriEl && Utils.toHijri) {
        hijriEl.textContent = Utils.toHijri(now);
      }
      
      // Update quote & insights every minute dynamically
      this.renderDailyInsights();
    };

    updateClock();
    this._clockInterval = setInterval(updateClock, 60000);
  },

  updateNextPrayer() {
    const times = Utils.calcPrayerTimes();
    const next = Utils.getNextPrayer(times);

    const cardEl = document.getElementById('home-next-prayer');
    const nameEl = document.getElementById('home-next-prayer-name');
    const timeEl = document.getElementById('home-next-prayer-time');
    const countdownEl = document.getElementById('home-next-prayer-countdown');

    if (next && cardEl) {
      cardEl.style.display = 'flex';
      if (nameEl) nameEl.textContent = next.name.charAt(0).toUpperCase() + next.name.slice(1);
      if (timeEl) timeEl.textContent = next.label;

      if (this.countdownInterval) clearInterval(this.countdownInterval);
      if (this._nextPrayerTimeout) clearTimeout(this._nextPrayerTimeout);
      
      const updateCountdown = () => {
        if (countdownEl) {
          countdownEl.textContent = Utils.countdownTo(next.time);
          if (next.time - new Date() <= 0) {
            clearInterval(this.countdownInterval);
            this._nextPrayerTimeout = setTimeout(() => this.updateNextPrayer(), 1000);
          }
        }
      };
      updateCountdown();
      this.countdownInterval = setInterval(updateCountdown, 1000);
    }
  },

  updateSpiritScore() {
    const user = DB.getUser();
    const scoreEl = document.getElementById('home-spirit-score');
    if (scoreEl && user) {
      scoreEl.textContent = Math.round(user.spirit_score || 0);
    }
  },

  updateSalahTimeline() {
    const today = Utils.todayStr();
    const salah = DB.getSalah(today);
    const score = Utils.salahScore(salah);
    const container = document.getElementById('home-salah-timeline');
    const countBadge = document.getElementById('home-salah-count-badge');

    if (countBadge) countBadge.textContent = `${score.done}/5`;

    if (container) {
      const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
      const nodes = container.querySelectorAll('.timeline-node');
      if (nodes.length === prayers.length) {
        prayers.forEach((p, idx) => {
          const key = p.toLowerCase();
          const status = salah[key];
          const node = nodes[idx];
          node.className = `timeline-node${status ? ' status-' + status : ''}`;
        });
        return;
      }
      let html = '';
      prayers.forEach(p => {
        const key = p.toLowerCase();
        const status = salah[key];
        let statusClass = status ? `status-${status}` : '';
        const initial = p.charAt(0);
        html += `
          <div class="timeline-node ${statusClass}">
            <div class="timeline-dot">${initial}</div>
            <span class="timeline-label">${p}</span>
          </div>
        `;
      });
      container.innerHTML = html;
    }
  },

  renderDailyInsights() {
    // 1. Dhikr Count
    const today = Utils.todayStr();
    const dhikrData = DB.getDhikr(today) || {};
    let totalDhikr = 0;
    Object.values(dhikrData).forEach(v => {
      if (typeof v === 'number') totalDhikr += v;
    });
    const dhikrEl = document.getElementById('home-insight-dhikr');
    if (dhikrEl) dhikrEl.textContent = totalDhikr;

    // 2. Streak — use Salah streak (perfect days)
    const salahStreak = DB.getSalahStreak();
    const streakEl = document.getElementById('home-insight-streak');
    if (streakEl) streakEl.textContent = salahStreak.perfect || 0;

    // 3. Dynamic Daily Quote
    const quote = Utils.getQuote();
    const arabicEl = document.getElementById('home-quote-arabic');
    const translationEl = document.getElementById('home-quote-translation');
    const cardEl = document.querySelector('.home-quote');
    
    if (arabicEl && translationEl && quote) {
      // First load check
      if (arabicEl.textContent === '...' || arabicEl.textContent.trim() === '') {
        arabicEl.textContent = quote.arabic;
        translationEl.textContent = quote.translation;
      } 
      // If the quote has changed, animate it
      else if (arabicEl.textContent !== quote.arabic) {
        if (cardEl) {
          if (this._quoteFadeTimeout) clearTimeout(this._quoteFadeTimeout);
          cardEl.classList.add('quote-anim-hidden');
          this._quoteFadeTimeout = setTimeout(() => {
            arabicEl.textContent = quote.arabic;
            translationEl.textContent = quote.translation;
            cardEl.classList.remove('quote-anim-hidden');
          }, 500);
        } else {
          arabicEl.textContent = quote.arabic;
          translationEl.textContent = quote.translation;
        }
      }
    }
  }
};

window.Home = Home;

