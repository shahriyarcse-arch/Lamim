/* =============================================
   LAMIM — NAFL SALAH MODULE
   ============================================= */
const Goals = {
  currentDate: Utils.todayStr(),

  sunnahList: [
    {
      id: 'fajr_s', label: 'Fajr', rakat: 2,
      icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g-nafl-fajr" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FFD1D1"/><stop offset="100%" stop-color="#FF8E8E"/></linearGradient><filter id="f-fajr" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1" result="blur"/></filter></defs><circle cx="12" cy="12" r="10" stroke="url(#g-nafl-fajr)" stroke-width="0.5" opacity="0.3"/><g class="live-pulse-svg"><path d="M12 7V3M12 21V17M17 12H21M3 12H7M18.36 18.36L15.54 15.54M5.64 5.64L8.46 8.46M18.36 5.64L15.54 8.46M5.64 18.36L8.46 15.54" stroke="url(#g-nafl-fajr)" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="12" r="4" fill="url(#g-nafl-fajr)" filter="url(#f-fajr)"/></g></svg>`,
      glow: '0 0 20px rgba(255,142,142,0.4)'
    },
    {
      id: 'dhuhr_s_b', label: 'Dhuhr (B)', rakat: 4,
      icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g-nafl-dhuhr" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FFEBB2"/><stop offset="100%" stop-color="#FFD233"/></linearGradient></defs><circle cx="12" cy="12" r="10" stroke="url(#g-nafl-dhuhr)" stroke-width="0.5" opacity="0.3"/><g style="transform-origin: center"><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="20s" repeatCount="indefinite"/><circle cx="12" cy="12" r="5" fill="url(#g-nafl-dhuhr)" fill-opacity="0.2" stroke="url(#g-nafl-dhuhr)" stroke-width="2"/><path d="M12 2V5M12 19V22M2 12H5M19 12H22" stroke="url(#g-nafl-dhuhr)" stroke-width="2" stroke-linecap="round"/></g></svg>`,
      glow: '0 0 20px rgba(255,210,51,0.4)'
    },
    {
      id: 'dhuhr_s_a', label: 'Dhuhr (A)', rakat: 2,
      icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g-nafl-dhuhr-a" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FFC27A"/><stop offset="100%" stop-color="#FF8A00"/></linearGradient></defs><circle cx="12" cy="12" r="10" stroke="url(#g-nafl-dhuhr-a)" stroke-width="0.5" opacity="0.3"/><g class="live-pulse-svg"><circle cx="12" cy="12" r="6" stroke="url(#g-nafl-dhuhr-a)" stroke-width="2" fill="url(#g-nafl-dhuhr-a)" fill-opacity="0.1"/><path d="M12 8V12L15 14" stroke="url(#g-nafl-dhuhr-a)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`,
      glow: '0 0 20px rgba(255,138,0,0.4)'
    },
    {
      id: 'maghrib_s', label: 'Maghrib', rakat: 2,
      icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g-nafl-maghrib" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#D69CFF"/><stop offset="100%" stop-color="#9D33FF"/></linearGradient></defs><circle cx="12" cy="12" r="10" stroke="url(#g-nafl-maghrib)" stroke-width="0.5" opacity="0.3"/><path d="M2 18H22M12 4V8M4.93 7.07L6.34 8.48M19.07 7.07L17.66 8.48" stroke="url(#g-nafl-maghrib)" stroke-width="2" stroke-linecap="round"/><path d="M16 14C16 16.2091 14.2091 18 12 18C9.79086 18 8 16.2091 8 14" stroke="url(#g-nafl-maghrib)" stroke-width="2" stroke-linecap="round" class="live-pulse-svg"/></svg>`,
      glow: '0 0 20px rgba(157,51,255,0.4)'
    },
    {
      id: 'isha_s', label: 'Isha', rakat: 2,
      icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g-nafl-isha" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#A5B4FC"/><stop offset="100%" stop-color="#6366F1"/></linearGradient></defs><circle cx="12" cy="12" r="10" stroke="url(#g-nafl-isha)" stroke-width="0.5" opacity="0.3"/><g class="live-pulse-svg"><path d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 11.658 20.981 11.3204 20.9439 10.9882C20.2526 12.186 18.9715 13 17.5 13C15.0147 13 13 10.9853 13 8.5C13 6.43572 14.3905 4.69632 16.2996 4.18182C15.0069 3.4206 13.5539 3 12 3Z" fill="url(#g-nafl-isha)" fill-opacity="0.2" stroke="url(#g-nafl-isha)" stroke-width="2"/></g></svg>`,
      glow: '0 0 20px rgba(99,102,241,0.4)'
    },
  ],

  init() {
    this.render(false);
  },

  render(skipAnim = false) {
    this.updateHomeSummary();

    const isToday = this.currentDate === Utils.todayStr();
    const label = document.getElementById('nafl-date-label');
    if (label) label.textContent = isToday ? 'Today' : new Date(this.currentDate + 'T00:00:00').toLocaleDateString('en-US', {month:'short', day:'numeric'});

    // TEMPORAL LOCK: Use explicit ID
    const nextBtn = document.getElementById('nafl-next-btn');
    if (nextBtn) {
      nextBtn.style.display = isToday ? 'none' : 'flex';
    }

    const data = DB.getSalah(this.currentDate);
    if (!data.sunnah) data.sunnah = {};
    if (data.witr === undefined) data.witr = 0;
    if (data.tahajjud_rakat === undefined) data.tahajjud_rakat = 0;

    this.renderSunnah(data.sunnah, skipAnim);
    this.renderTahajjud(data.tahajjud, data.tahajjud_rakat);
    this.renderWitr(data.witr);
    this.renderCelestialProgress(data, skipAnim);
  },

  renderCelestialProgress(data, skipAnim = false) {
    const hero = document.getElementById('nafl-hero-banner');
    if (!hero) return;
    
    // Calculate Completion
    let done = 0;
    if (data.sunnah) Object.values(data.sunnah).forEach(v => { if (v === true || v === 'prayed') done++; });
    if (data.tahajjud_rakat > 0) done++;
    if (data.witr > 0) done++;
    
    const total = this.sunnahList.length + 2;
    const pct = (done / total) * 100;
    
    hero.innerHTML = `
      <div class="nafl-celestial-glass ${skipAnim ? '' : 'anim-scale-up'}">
        <div class="celestial-moon-wrap">
          <div class="celestial-moon-glow" style="opacity: ${0.2 + (pct/200)}"></div>
          <svg class="celestial-moon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="rgba(255,255,255,${0.1 + (pct/200)})" />
          </svg>
        </div>
        <div class="nafl-hero-content">
          <h1 class="nafl-hero-title">Celestial Deeds</h1>
          <p class="nafl-hero-subtitle">Light up your path with Sunnah & Nafl</p>
          <div class="nafl-progress-track">
            <div class="nafl-progress-bar" style="width: ${pct}%"></div>
          </div>
          <div class="nafl-progress-stat">${done} / ${total} Deeds Complete</div>
        </div>
      </div>
    `;
  },

  // --- DASHBOARD SUMMARY ---
  updateHomeSummary() {
    const today = Utils.todayStr();
    const salah = DB.getSalah(today);
    const dhikr = DB.getDhikr(today);

    let sCount = 0;
    ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].forEach(p => { if (salah[p] && salah[p] !== 'missed') sCount++; });
    const dTotal = Object.values(dhikr).reduce((a, b) => a + (b || 0), 0);

    const sEl = document.getElementById('journey-salah-focus');
    const dEl = document.getElementById('journey-dhikr-focus');
    if (sEl) sEl.textContent = `${sCount} / 5`;
    if (dEl) dEl.textContent = `${dTotal > 999 ? (dTotal / 1000).toFixed(1) + 'k' : dTotal} / 100`;

    const history = DB.getSalahHistory(7);
    let activeDays = history.filter(d => {
      let done = 0;
      ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].forEach(p => { if (d.data[p] && d.data[p] !== 'missed') done++; });
      return done >= 1;
    }).length;

    const mEl = document.getElementById('home-mentor-message');
    if (mEl) {
      let msg = "Start your day with Bismillah... ✨";
      if (activeDays >= 6) msg = "Excellent consistency this week! 🌟";
      else if (activeDays >= 3) msg = "You're building a strong habit. Keep it up! 🤍";
      else if (activeDays > 0) msg = "Every prayer is a step closer to peace. 🕊️";
      mEl.textContent = `"${msg}"`;
    }
  },

  // --- NAFL LOGIC ---
  changeDate(days) {
    const d = new Date(this.currentDate);
    d.setDate(d.getDate() + days);
    const nextDate = Utils.dateStr(d);
    if (nextDate > Utils.todayStr()) return;
    this.currentDate = nextDate;
    this.render(false); // Play animations on date change
  },

  resetToday() {
    UI.showSettingsModal({
      title: 'Reset Nafl Data?',
      desc: `Clear all Sunnah & Nafl records for ${Utils.formatDate(new Date(this.currentDate), {day:'numeric', month:'short'})}?`,
      confirmText: 'Yes, Clear',
      type: 'danger',
      onConfirm: () => {
        const data = DB.getSalah(this.currentDate);
        // Explicitly clear all Nafl fields
        data.sunnah = {};
        data.tahajjud = false;
        data.tahajjud_rakat = 0;
        data.witr = 0;
        
        // Save to DB (this triggers sync)
        DB.setSalah(this.currentDate, data);
        
        this.render(true); // skip animation on reset
        Utils.toast('Nafl data cleared', 'info');
        console.log("[Goals] Data reset for sync:", this.currentDate);
      }
    });
  },

  renderSunnah(sunnahData, skipAnim = false) {
    const container = document.getElementById('nafl-sunnah-grid');
    if (!container) return;
    const isFuture = this.currentDate > Utils.todayStr();

    container.innerHTML = this.sunnahList.map((item, idx) => {
      const status = sunnahData[item.id];
      const isLocked = status !== undefined;
      const isPrayed = status === true || status === 'prayed';
      const isMissed = status === 'missed';
      const pts = 2;

      let bgGradient = item.id.includes('fajr') ? 'linear-gradient(135deg, #f472b6, #ec4899)' : item.id.includes('dhuhr') ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' : item.id.includes('maghrib') ? 'linear-gradient(135deg, #a855f7, #8b5cf6)' : 'linear-gradient(135deg, #6366f1, #4f46e5)';

      return `
        <div class="salah-prayer-card nafl-sunnah-card-modern ${skipAnim ? '' : 'anim-fade-in'} ${isLocked ? (isPrayed ? 'has-status status-jamaat active' : 'has-status status-missed') : ''}" 
             id="sunnah-card-${item.id}"
             style="${skipAnim ? '' : `animation-delay: ${idx * 0.04}s;`} ${isFuture ? 'opacity: 0.7; pointer-events: none;' : ''}">
          
          <!-- Prayer Header -->
          <div class="salah-prayer-header">
            <div class="salah-prayer-icon-wrap" style="background: ${bgGradient}; box-shadow: ${item.glow}">
              <span class="salah-prayer-emoji">${item.icon}</span>
            </div>
            <div class="salah-prayer-info">
              <div class="salah-prayer-name">${item.label}</div>
              <div class="salah-prayer-time">${item.rakat} Rakat · Sunnah Mu'akkadah</div>
            </div>
            <div class="salah-prayer-status-badge">
              ${isLocked 
                ? (isPrayed 
                    ? `<div class="salah-status-chip" style="background: rgba(52,211,153,0.15); border-color: rgba(52,211,153,0.4); color: #34d399; box-shadow: 0 0 12px rgba(52,211,153,0.4)">
                         <span>✨</span> Prayed
                       </div>`
                    : `<div class="salah-status-chip" style="background: rgba(248,81,73,0.15); border-color: rgba(248,81,73,0.4); color: #f85149; box-shadow: 0 0 12px rgba(248,81,73,0.4)">
                         <span>❌</span> Missed
                       </div>`)
                : `<div class="salah-status-chip salah-status-pending">
                     <span>⏳</span> Pending
                   </div>`
              }
            </div>
          </div>

          <!-- Status Selection or Locked Result -->
          ${isLocked 
            ? `<div class="salah-locked-result">
                 <div class="salah-locked-icon" style="color: ${isPrayed ? '#34d399' : '#f85149'}; filter: drop-shadow(0 0 8px ${isPrayed ? 'rgba(52,211,153,0.5)' : 'rgba(248,81,73,0.5)'})">
                   ${isPrayed ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'}
                 </div>
                 <div class="salah-locked-info">
                   <div class="salah-locked-status" style="color: ${isPrayed ? '#34d399' : '#f85149'}">${isPrayed ? 'Sunnah Prayed' : 'Sunnah Missed'}</div>
                   <div class="salah-locked-desc" style="display:flex;align-items:center;gap:3px">
                     ${isPrayed ? '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-accent-green);filter:drop-shadow(0 0 4px rgba(16,185,129,0.6))"><polyline points="20 6 9 17 4 12"></polyline></svg> Successful' : '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-accent-red);filter:drop-shadow(0 0 4px rgba(248,81,73,0.6))"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Unsuccessful'}
                     <span style="opacity:0.5;margin:0 2px">•</span> +${isPrayed ? pts : 0} pts
                   </div>
                 </div>
                 <svg class="salah-lock-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: lockPulse 2s ease-in-out infinite"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
               </div>`
            : `<div class="salah-status-selector">
                 <div class="salah-options-label">Did you pray this Sunnah?</div>
                 <div class="salah-options-grid" style="grid-template-columns: repeat(2, 1fr);">
                   <button class="salah-option-btn" style="border-color: rgba(52,211,153,0.3); background: rgba(52,211,153,0.05);" onclick="Goals.selectSunnah('${item.id}', 'prayed')">
                     <span class="salah-opt-icon" style="filter: drop-shadow(0 0 8px rgba(52,211,153,0.5))">✨</span>
                     <span class="salah-opt-label" style="color: #34d399">Prayed</span>
                     <span class="salah-opt-desc">Sunnah Mu'akkadah</span>
                     <span class="salah-opt-pts">+${pts} pts</span>
                   </button>
                   <button class="salah-option-btn" style="border-color: rgba(248,81,73,0.3); background: rgba(248,81,73,0.05);" onclick="Goals.selectSunnah('${item.id}', 'missed')">
                     <span class="salah-opt-icon" style="filter: drop-shadow(0 0 8px rgba(248,81,73,0.5))">❌</span>
                     <span class="salah-opt-label" style="color: #f85149">Missed</span>
                     <span class="salah-opt-desc">Not prayed</span>
                     <span class="salah-opt-pts">+0 pts</span>
                   </button>
                 </div>
               </div>`
          }
        </div>
      `;
    }).join('');
  },

  selectSunnah(id, status) {
    if (this.currentDate > Utils.todayStr()) {
      Utils.toast("Cannot edit future dates", "error");
      return;
    }
    const data = DB.getSalah(this.currentDate);
    if (!data.sunnah) data.sunnah = {};
    const item = this.sunnahList.find(s => s.id === id);

    data.sunnah[id] = status;
    DB.setSalah(this.currentDate, data);
    this.render(true);
  },

  toggleSunnah(id) {
    if (this.currentDate > Utils.todayStr()) {
      Utils.toast("Cannot edit future dates", "error");
      return;
    }
    const data = DB.getSalah(this.currentDate);
    if (!data.sunnah) data.sunnah = {};
    const item = this.sunnahList.find(s => s.id === id);

    if (data.sunnah[id]) {
      const name = item ? item.label : 'this Sunnah';
      Utils.confirm(
        'Unlock Sunnah',
        `Unlock and reset ${name}?`,
        () => {
          delete data.sunnah[id];
          DB.setSalah(this.currentDate, data);
          this.render(true);
        },
        'warning'
      );
      return;
    }
  },

  renderTahajjud(active, rakat) {
    const container = document.getElementById('tahajjud-card-container');
    if (!container) return;

    const isFuture = this.currentDate > Utils.todayStr();
    const isLocked = rakat !== 0 && rakat !== undefined;
    const isPrayed = rakat > 0;
    const isMissed = rakat === -1;

    let bgGradient = 'linear-gradient(135deg, #818cf8, #6366f1)';

    let html = `
      <div class="salah-prayer-card nafl-sunnah-card-modern anim-fade-in ${isLocked ? (isPrayed ? 'has-status status-jamaat active' : 'has-status status-missed') : ''}" 
           id="tahajjud-salah-card"
           style="${isFuture ? 'opacity: 0.7; pointer-events: none;' : ''}">
        
        <!-- Prayer Header -->
        <div class="salah-prayer-header">
          <div class="salah-prayer-icon-wrap" style="background: ${bgGradient}; box-shadow: 0 0 15px rgba(129,140,248,0.4)">
            <span class="salah-prayer-emoji">🌙</span>
          </div>
          <div class="salah-prayer-info">
            <div class="salah-prayer-name">Tahajjud</div>
            <div class="salah-prayer-time">Night Vigils · Nafl</div>
          </div>
          <div class="salah-prayer-status-badge">
            ${isLocked 
              ? (isPrayed 
                  ? `<div class="salah-status-chip" style="background: rgba(52,211,153,0.15); border-color: rgba(52,211,153,0.4); color: #34d399; box-shadow: 0 0 12px rgba(52,211,153,0.4)">
                       <span>✨</span> Prayed (${rakat} RK)
                     </div>`
                  : `<div class="salah-status-chip" style="background: rgba(248,81,73,0.15); border-color: rgba(248,81,73,0.4); color: #f85149; box-shadow: 0 0 12px rgba(248,81,73,0.4)">
                       <span>❌</span> Missed
                     </div>`)
              : `<div class="salah-status-chip salah-status-pending">
                   <span>⏳</span> Pending
                 </div>`
            }
          </div>
        </div>

        <!-- Status Selection or Locked Result -->
        ${isLocked 
          ? `<div class="salah-locked-result">
               <div class="salah-locked-icon" style="color: ${isPrayed ? '#34d399' : '#f85149'}; filter: drop-shadow(0 0 8px ${isPrayed ? 'rgba(52,211,153,0.5)' : 'rgba(248,81,73,0.5)'})">
                 ${isPrayed ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'}
               </div>
               <div class="salah-locked-info">
                 <div class="salah-locked-status" style="color: ${isPrayed ? '#34d399' : '#f85149'}">${isPrayed ? `Tahajjud Prayed (${rakat} RK)` : 'Tahajjud Missed'}</div>
                 <div class="salah-locked-desc" style="display:flex;align-items:center;gap:3px">
                   ${isPrayed ? '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-accent-green);filter:drop-shadow(0 0 4px rgba(16,185,129,0.6))"><polyline points="20 6 9 17 4 12"></polyline></svg> Successful' : '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-accent-red);filter:drop-shadow(0 0 4px rgba(248,81,73,0.6))"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Unsuccessful'}
                   <span style="opacity:0.5;margin:0 2px">•</span> +${isPrayed ? 3 : 0} pts
                 </div>
               </div>
               <svg class="salah-lock-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: lockPulse 2s ease-in-out infinite"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
             </div>`
          : `<div class="salah-status-selector">
               <div class="salah-options-label" style="display:flex; justify-content:space-between; align-items:center;">
                 <span>How many Rakat did you pray?</span>
                 <button onclick="Goals.setTahajjudMissed()" style="background:rgba(248,81,73,0.1); border:1px solid rgba(248,81,73,0.3); color:#f85149; padding:2px 8px; border-radius:12px; font-size:10px; font-weight:bold; cursor:pointer;">❌ Missed</button>
               </div>
               <div class="salah-options-grid" style="grid-template-columns: repeat(3, 1fr); gap:8px; margin-top:8px;">
                 ${[2, 4, 6, 8, 10, 12].map(opt => `
                   <button class="salah-option-btn" style="border-color: rgba(129,140,248,0.3); background: rgba(129,140,248,0.05); min-height:55px; padding:8px;" onclick="Goals.setTahajjudRakat(${opt})">
                     <span class="salah-opt-label" style="color: #818cf8; font-size:13px">${opt} RK</span>
                     <span class="salah-opt-pts">+3 pts</span>
                   </button>
                 `).join('')}
                 <button class="salah-option-btn" style="grid-column: span 3; border-color: rgba(129,140,248,0.3); background: rgba(129,140,248,0.05); min-height:40px; flex-direction:row; gap:6px; padding:6px;" onclick="Goals.promptCustomTahajjud()">
                   <span class="salah-opt-icon" style="font-size:0.9rem">✏️</span>
                   <span class="salah-opt-label" style="color: #818cf8">Custom Rakat</span>
                 </button>
               </div>
             </div>`
        }
      </div>
    `;

    container.innerHTML = html;
  },

  setTahajjudRakat(rakat) {
    if (this.currentDate > Utils.todayStr()) {
      Utils.toast("Cannot edit future dates", "error");
      return;
    }
    const data = DB.getSalah(this.currentDate);
    if (data.tahajjud_rakat !== 0 && data.tahajjud_rakat !== undefined) {
      return;
    }
    data.tahajjud = true;
    data.tahajjud_rakat = rakat;
    DB.setSalah(this.currentDate, data);
    this.render(true);
  },

  setTahajjudMissed() {
    if (this.currentDate > Utils.todayStr()) {
      Utils.toast("Cannot edit future dates", "error");
      return;
    }
    const data = DB.getSalah(this.currentDate);
    if (data.tahajjud_rakat !== 0 && data.tahajjud_rakat !== undefined) {
      return;
    }
    data.tahajjud = false;
    data.tahajjud_rakat = -1;
    DB.setSalah(this.currentDate, data);
    this.render(true);
  },

  promptCustomTahajjud() {
    if (this.currentDate > Utils.todayStr()) {
      Utils.toast("Cannot edit future dates", "error");
      return;
    }
    const data = DB.getSalah(this.currentDate);
    if (data.tahajjud_rakat !== 0 && data.tahajjud_rakat !== undefined) {
      return;
    }
    const r = prompt("Enter custom Rakat number (e.g. 14, 20):");
    if (r) {
      const num = parseInt(r);
      if (!isNaN(num) && num > 0) {
        this.setTahajjudRakat(num);
      } else {
        Utils.toast("Invalid number", "error");
      }
    }
  },

  renderWitr(rakat) {
    const container = document.getElementById('witr-card-container');
    if (!container) return;

    const isFuture = this.currentDate > Utils.todayStr();
    const isLocked = rakat !== 0 && rakat !== undefined;
    const isPrayed = rakat > 0;
    const isMissed = rakat === -1;

    let bgGradient = 'linear-gradient(135deg, #fbbf24, #f59e0b)';

    let html = `
      <div class="salah-prayer-card nafl-sunnah-card-modern anim-fade-in ${isLocked ? (isPrayed ? 'has-status status-jamaat active' : 'has-status status-missed') : ''}" 
           id="witr-salah-card"
           style="${isFuture ? 'opacity: 0.7; pointer-events: none;' : ''}">
        
        <!-- Prayer Header -->
        <div class="salah-prayer-header">
          <div class="salah-prayer-icon-wrap" style="background: ${bgGradient}; box-shadow: 0 0 15px rgba(251,191,36,0.4)">
            <span class="salah-prayer-emoji">⭐</span>
          </div>
          <div class="salah-prayer-info">
            <div class="salah-prayer-name">Witr</div>
            <div class="salah-prayer-time">3 Rakat · Wajib</div>
          </div>
          <div class="salah-prayer-status-badge">
            ${isLocked 
              ? (isPrayed 
                  ? `<div class="salah-status-chip" style="background: rgba(52,211,153,0.15); border-color: rgba(52,211,153,0.4); color: #34d399; box-shadow: 0 0 12px rgba(52,211,153,0.4)">
                       <span>✨</span> Prayed
                     </div>`
                  : `<div class="salah-status-chip" style="background: rgba(248,81,73,0.15); border-color: rgba(248,81,73,0.4); color: #f85149; box-shadow: 0 0 12px rgba(248,81,73,0.4)">
                       <span>❌</span> Missed
                     </div>`)
              : `<div class="salah-status-chip salah-status-pending">
                   <span>⏳</span> Pending
                 </div>`
            }
          </div>
        </div>

        <!-- Status Selection or Locked Result -->
        ${isLocked 
          ? `<div class="salah-locked-result">
               <div class="salah-locked-icon" style="color: ${isPrayed ? '#34d399' : '#f85149'}; filter: drop-shadow(0 0 8px ${isPrayed ? 'rgba(52,211,153,0.5)' : 'rgba(248,81,73,0.5)'})">
                 ${isPrayed ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'}
               </div>
               <div class="salah-locked-info">
                 <div class="salah-locked-status" style="color: ${isPrayed ? '#34d399' : '#f85149'}">${isPrayed ? 'Witr Prayed' : 'Witr Missed'}</div>
                 <div class="salah-locked-desc" style="display:flex;align-items:center;gap:3px">
                   ${isPrayed ? '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-accent-green);filter:drop-shadow(0 0 4px rgba(16,185,129,0.6))"><polyline points="20 6 9 17 4 12"></polyline></svg> Successful' : '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="color:var(--color-accent-red);filter:drop-shadow(0 0 4px rgba(248,81,73,0.6))"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Unsuccessful'}
                   <span style="opacity:0.5;margin:0 2px">•</span> +${isPrayed ? 2 : 0} pts
                 </div>
               </div>
               <svg class="salah-lock-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: lockPulse 2s ease-in-out infinite"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
             </div>`
          : `<div class="salah-status-selector">
               <div class="salah-options-label">Did you pray Witr?</div>
               <div class="salah-options-grid" style="grid-template-columns: repeat(2, 1fr);">
                 <button class="salah-option-btn" style="border-color: rgba(251,191,36,0.3); background: rgba(251,191,36,0.05);" onclick="Goals.toggleWitr()">
                   <span class="salah-opt-icon" style="filter: drop-shadow(0 0 8px rgba(251,191,36,0.5))">✨</span>
                   <span class="salah-opt-label" style="color: #fbbf24">Prayed</span>
                   <span class="salah-opt-desc">3 Rakat Wajib</span>
                   <span class="salah-opt-pts">+2 pts</span>
                 </button>
                 <button class="salah-option-btn" style="border-color: rgba(248,81,73,0.3); background: rgba(248,81,73,0.05);" onclick="Goals.toggleWitrMissed()">
                   <span class="salah-opt-icon" style="filter: drop-shadow(0 0 8px rgba(248,81,73,0.5))">❌</span>
                   <span class="salah-opt-label" style="color: #f85149">Missed</span>
                   <span class="salah-opt-desc">Not prayed</span>
                   <span class="salah-opt-pts">+0 pts</span>
                 </button>
               </div>
             </div>`
        }
      </div>
    `;

    container.innerHTML = html;
  },

  toggleWitr() {
    if (this.currentDate > Utils.todayStr()) {
      Utils.toast("Cannot edit future dates", "error");
      return;
    }
    const data = DB.getSalah(this.currentDate);
    if (data.witr !== 0 && data.witr !== undefined) {
      return;
    }
    data.witr = 3;
    DB.setSalah(this.currentDate, data);
    this.render(true);
  },

  toggleWitrMissed() {
    if (this.currentDate > Utils.todayStr()) {
      Utils.toast("Cannot edit future dates", "error");
      return;
    }
    const data = DB.getSalah(this.currentDate);
    if (data.witr !== 0 && data.witr !== undefined) {
      return;
    }
    data.witr = -1;
    DB.setSalah(this.currentDate, data);
    this.render(true);
  },

  // Keep backward compatibility
  setWitrRakat(rakat) {
    this.toggleWitr();
  },

  // --- SOPHISTICATED HISTORY ---
  showHistory() {
    const modal = document.getElementById('nafl-history-modal');
    const list = document.getElementById('nafl-history-list');
    if (!modal || !list) return;

    const history = DB.getSalahHistory(30);

    let totalRakat = 0;
    let totalPoints = 0;
    let streak = 0;
    let streakActive = true;
    
    // Find the first day the user ever used the app (within the last 30 days)
    let firstActiveIndex = -1;
    for (let i = history.length - 1; i >= 0; i--) {
      const day = history[i];
      const isActive = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].some(p => day.data[p]) || (day.data.sunnah && Object.values(day.data.sunnah).some(v => v === true || v === 'prayed' || v === 'missed')) || day.data.tahajjud_rakat > 0 || day.data.witr > 0;
      if (isActive && firstActiveIndex === -1) {
        firstActiveIndex = i;
      }
    }
    
    const trackingDays = firstActiveIndex !== -1 ? (firstActiveIndex + 1) : 0;
    const MAX_PTS_PER_DAY = 15; // 10 (sunnahs) + 3 (tahajjud) + 2 (witr)

    for (let i = 0; i < history.length; i++) {
      const day = history[i];
      let dayPoints = 0;

      // Sunnahs: 2 pts each
      if (day.data.sunnah) {
        Object.keys(day.data.sunnah).forEach(id => {
          if (day.data.sunnah[id] === true || day.data.sunnah[id] === 'prayed') {
            dayPoints += 2;
          }
        });
      }

      // Tahajjud: 3 pts
      if (day.data.tahajjud_rakat > 0) {
        dayPoints += 3;
      }

      // Witr: 2 pts
      if (day.data.witr > 0) {
        dayPoints += 2;
      }

      totalPoints += dayPoints;

      // Track total rakat for display
      let dayRakat = 0;
      if (day.data.sunnah) {
        Object.keys(day.data.sunnah).forEach(id => {
          if (day.data.sunnah[id] === true || day.data.sunnah[id] === 'prayed') {
            const item = this.sunnahList.find(s => s.id === id);
            if (item) dayRakat += item.rakat;
          }
        });
      }
      dayRakat += (day.data.tahajjud_rakat > 0 ? day.data.tahajjud_rakat : 0);
      dayRakat += (day.data.witr > 0 ? day.data.witr : 0);
      totalRakat += dayRakat;

      if (streakActive) {
        if (dayPoints > 0) {
          streak++;
        } else if (day.date !== Utils.todayStr()) {
          streakActive = false;
        }
      }
    }

    const TOTAL_MAX = trackingDays * MAX_PTS_PER_DAY;
    const completion = TOTAL_MAX > 0 ? ((totalPoints / TOTAL_MAX) * 100).toFixed(1) : '0.0';

    document.getElementById('h-sum-total').textContent = totalRakat + ' RK';
    document.getElementById('h-sum-streak').textContent = streak + 'd';
    document.getElementById('h-sum-avg').textContent = completion + '%';

    list.innerHTML = history.map(day => {
      const isPastDay = day.date !== Utils.todayStr();
      let sunnahDone = [];
      let sunnahMissed = [];
      let dayRakat = 0;

      if (day.data.sunnah) {
        Object.keys(day.data.sunnah).forEach(id => {
          const item = this.sunnahList.find(s => s.id === id);
          if (item) {
            if (day.data.sunnah[id] === true || day.data.sunnah[id] === 'prayed') {
              sunnahDone.push(item.label);
              dayRakat += item.rakat;
            } else if (day.data.sunnah[id] === 'missed' || isPastDay) {
              sunnahMissed.push(item.label);
            }
          }
        });
      }

      if (isPastDay) {
        this.sunnahList.forEach(s => {
          if (!day.data.sunnah || day.data.sunnah[s.id] === undefined) {
            sunnahMissed.push(s.label);
          }
        });
      }

      const tRakat = day.data.tahajjud_rakat > 0 ? day.data.tahajjud_rakat : 0;
      const wRakat = day.data.witr > 0 ? day.data.witr : 0;
      const total = dayRakat + tRakat + wRakat;
      const allSunnahMissed = sunnahDone.length === 0 && sunnahMissed.length > 0;

      if (total === 0 && sunnahDone.length === 0 && sunnahMissed.length === 0) return '';

      return `
        <div class="history-item-modern ${allSunnahMissed ? 'all-missed' : ''}">
          <div class="h-item-date">${day.date === Utils.todayStr() ? 'Today' : Utils.formatDate(new Date(day.date), { day: 'numeric', month: 'short' })}</div>
          <div class="h-item-content">
            <div class="h-item-main">
               ${sunnahDone.map(name => `<div class="h-pill"><span class="dot" style="background:#34d399"></span>${name}</div>`).join('')}
               ${sunnahMissed.map(name => `<div class="h-pill missed"><span class="dot" style="background:rgba(255,255,255,0.15)"></span>${name}</div>`).join('')}
               ${tRakat > 0 ? `<div class="h-pill"><span class="dot" style="background:#818cf8"></span>Tahajjud (${tRakat})</div>` : ''}
               ${wRakat > 0 ? `<div class="h-pill"><span class="dot" style="background:#fbbf24"></span>Witr (${wRakat})</div>` : ''}
            </div>
          </div>
          <div class="h-item-total">${total}<small>RK</small></div>
        </div>
      `;
    }).join('') || '<div class="empty-state">No history recorded yet.</div>';

    modal.classList.remove('hidden');
  },

  hideHistory() {
    document.getElementById('nafl-history-modal')?.classList.add('hidden');
  }
};
