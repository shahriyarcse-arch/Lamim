/* =============================================
   LAMIM — DHIKR MODULE (Infinite & Bilingual)
   ============================================= */

// Basic SVG Icons to replace emojis
const Icons = {
  sparkles: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>',
  heart: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
  kaaba: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v16H4z"/><path d="M4 8h16"/><path d="M12 8v12"/></svg>',
  hands: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>',
  moon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
  star: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  water: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
  circle: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>',
  tasbeeh: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10"/><circle cx="12" cy="2" r="2"/></svg>'
};

const Dhikr = {
  presets: [
    { id: 'subhanallah', arabic: 'سُبْحَانَ اللَّهِ', latin: 'SubhanAllah', meaning: 'Glory be to Allah', category: 'general', icon: Icons.sparkles },
    { id: 'alhamdulillah', arabic: 'الْحَمْدُ لِلَّهِ', latin: 'Alhamdulillah', meaning: 'All praise is due to Allah', category: 'general', icon: Icons.heart },
    { id: 'allhuakbar', arabic: 'اللَّهُ أَكْبَرُ', latin: 'AllhuAkbar', meaning: 'Allah is the Greatest', category: 'general', icon: Icons.kaaba },
    { id: 'la-ilaha', arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ', latin: 'La ilaha illallah', meaning: 'There is no god but Allah', category: 'general', icon: Icons.circle },
    { id: 'astghfirullah', arabic: 'أَسْتَغْفِرُ اللَّهَ', latin: 'Astghfirullah', meaning: 'I seek forgiveness of Allah', category: 'morning', icon: Icons.hands },
    { id: 'salawat', arabic: 'صَلَّى اللَّهُ عَلَيْهِ وَسَلَّমَ', latin: 'Allahumma Salli', meaning: "Prayers upon the Prophet", category: 'general', icon: Icons.star },
    { id: 'hasbunallah', arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ', latin: 'Hasbunallah', meaning: 'Allah is Sufficient for us', category: 'morning', icon: Icons.water },
    { id: 'ya-hayyu', arabic: 'يَا حَيُّ يَا قَيُّومُ', latin: 'Ya Hayyu Ya Qayyum', meaning: 'O Ever-Living, O Sustainer', category: 'evening', icon: Icons.moon },
    { id: 'subhanallahi-wabihamdihi', arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', latin: 'SubhanAllahi Wabihamdihi', meaning: 'Glory and praise be to Allah', category: 'after-prayer', icon: Icons.sparkles },
    { id: 'la-hawla', arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', latin: 'La Hawla Wala Quwwata', meaning: 'There is no power except with Allah', category: 'general', icon: Icons.circle },
  ],

  hadith: {
    en: "The Messenger of Allah (ﷺ) said: “I met Ibrahim on the night of my ascent... inform them that Paradise has pure soil and delicious water, and that it is a flat treeless plain, and that its seeds are: Subḥān Allāh, Al-ḥamdulillāh, Lā ilāha illallāh, and Allāhu Akbar.”",
    bn: "রাসুল (সা.) বলেছেন: মিরাজের রাতে আমি ইবরাহিম (আ.)-এর সাথে সাক্ষাৎ করি। তিনি বললেন: ‘হে মুহাম্মদ! আমার পক্ষ থেকে তোমার উম্মতকে সালাম দাও এবং তাদেরকে জানাও— জান্নাতের মাটি অত্যন্ত উত্তম, পানি অত্যন্ত মিষ্টি, এবং তা সমতল ভূমি। আর এর গাছ রোপণ করা হয় এই শব্দগুলো দিয়ে: সুবহানাল্লাহ, আলহামদুলিল্লাহ, লা ইলাহা ইল্লাল্লাহ, আল্লাহু আকবার।’"
  },

  currentId: 'subhanallah',
  count: 0,

  // Track language fallback if App.lang isn't ready
  getLang() {
    return window.App && App.lang ? App.lang : (DB.rawGet('lamim_lang') || 'en');
  },

  get current() { return this.getAllPresets().find(p => p.id === this.currentId) || this.presets[0]; },

  getAllPresets() {
    return [...this.presets, ...DB.getDhikrPresets()];
  },

  init() {
    // Sync count from DB for today instantly
    this.count = DB.getDhikr(Utils.todayStr())[this.currentId] || 0;

    this.renderMarquee();
    this.renderHero();
    this.renderPresetRow();
    this.renderSessionHistory();
    this.renderLogDate();

    if (!this.initialized) {
      this.bindKeyboard();
      this.initialized = true;
    }
  },

  onDataUpdated() {
    if (document.getElementById('section-dhikr')?.classList.contains('active')) {
      const freshCount = DB.getDhikr(Utils.todayStr())[this.currentId] || 0;
      // Only re-render if count actually changed (to avoid interrupting active tapping)
      if (freshCount !== this.count) {
        this.count = freshCount;
        this.renderHero();
        this.renderSessionHistory();
      }
    }
  },

  renderMarquee() {
    const els = document.querySelectorAll('.dhikr-hadith-text');
    els.forEach(el => {
      el.textContent = this.hadith[this.getLang()] + " • ";
    });
  },

  renderPresetRow() {
    const grid = document.getElementById('dhikr-grid');
    if (!grid) return;
    const presets = this.getAllPresets();

    grid.innerHTML = presets.map((p) => {
      const color = p.color || '#14b8a6';
      return `
        <div class="dhikr-preset-card ${p.id === this.currentId ? 'active' : ''}" role="button" tabindex="0" onclick="Dhikr.selectDhikr('${p.id}')" style="--dc:${color}">
          <div class="dhikr-preset-name">${Utils.escapeHTML(p.latin)}</div>
        </div>
      `;
    }).join('') + `
      <div class="dhikr-preset-card dhikr-add-card" role="button" tabindex="0" onclick="Dhikr.showAddModal()" style="--dc:#14b8a6">
        <div class="dhikr-preset-name">Add</div>
      </div>
    `;
  },

  renderHero() {
    const d = this.current;
    const countEl = document.getElementById('dhikr-tap-count');
    const infoEl = document.getElementById('dhikr-current-info');
    const beadsEl = document.getElementById('dhikr-beads-container');

    if (countEl) countEl.textContent = this.count;

    if (infoEl) {
      const currentName = infoEl.querySelector('.latin-name');
      if (!currentName || currentName.textContent !== d.latin) {
        infoEl.innerHTML = `
          <div class="latin-name">${Utils.escapeHTML(d.latin)}</div>
          <div class="meaning">${Utils.escapeHTML(d.meaning)}</div>
        `;
      }
    }

    // Render infinite looping beads (33 per loop) efficiently
    if (beadsEl) {
      const loopSize = 33;
      const lit = this.count % loopSize;

      if (beadsEl.children.length === loopSize) {
        Array.from(beadsEl.children).forEach((bead, i) => {
          if (i < lit) bead.classList.add('lit');
          else bead.classList.remove('lit');
        });
      } else {
        beadsEl.innerHTML = Array.from({ length: loopSize }, (_, i) =>
          `<div class="bead ${i < lit ? 'lit' : ''}" style="animation-delay: ${i * 0.015}s"></div>`
        ).join('');
      }
    }
  },

  selectDhikr(id) {
    this.currentId = id;
    this.count = DB.getDhikr(Utils.todayStr())[id] || 0;
    this.renderHero();
    this.renderPresetRow();
  },

  tap() {
    this.count++;
    this.saveInstantly();

    // Haptic
    if (navigator.vibrate) navigator.vibrate(25);

    // Animate tap ripple
    const ripple = document.getElementById('tap-ripple');
    if (ripple) {
      // Re-trigger animation
      ripple.classList.remove('animate-ripple');
      void ripple.offsetWidth; // trigger reflow
      ripple.classList.add('animate-ripple');
    }

    // Animate number softly
    const countEl = document.getElementById('dhikr-tap-count');
    if (countEl) {
      countEl.style.transform = 'scale(1.1)';
      setTimeout(() => countEl.style.transform = 'scale(1)', 150);
    }

    // Update UI
    this.renderHero();
    this.renderSessionHistory();
  },

  undo() {
    if (this.count > 0) {
      this.count--;
      this.saveInstantly();
      this.renderHero();
      this.renderSessionHistory();
    }
  },

  reset() {
    const isBn = this.getLang() === 'bn';
    Utils.confirm(
      isBn ? 'কাউন্ট রিসেট করুন' : 'Reset Count',
      isBn ? 'কাউন্ট জিরো (0) করতে চান?' : 'Reset current count to zero?',
      () => {
        this.count = 0;
        this.saveInstantly();
        this.renderHero();
        this.renderSessionHistory();
        Utils.toast(isBn ? 'কাউন্ট রিসেট করা হয়েছে' : 'Count reset successfully', 'success');
      },
      'warning'
    );
  },

  saveInstantly() {
    const today = Utils.todayStr();
    const dhikr = DB.getDhikr(today);
    dhikr[this.currentId] = this.count;
    DB.setDhikr(today, dhikr);
  },

  bindKeyboard() {
    if (this._keyHandler) document.removeEventListener('keydown', this._keyHandler);
    this._keyHandler = (e) => {
      if (e.code === 'Space' && document.getElementById('section-dhikr')?.classList.contains('active')) {
        e.preventDefault();
        this.tap();
      }
    };
    document.addEventListener('keydown', this._keyHandler);
  },

  renderSessionHistory() {
    const el = document.getElementById('dhikr-session-history');
    if (!el) return;
    const today = DB.getDhikr(Utils.todayStr());

    // Filter out zero counts
    const entries = Object.entries(today).filter(([_, cnt]) => cnt > 0);

    if (!entries.length) {
      el.innerHTML = `<div class="dhikr-empty-state anim-fade-in">
        <div class="dhikr-empty-orb">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10"/><circle cx="12" cy="2" r="2"/></svg>
        </div>
        <p class="dhikr-empty-text">${this.getLang() === 'bn' ? 'যিকির শুরু করুন' : 'Your spiritual logs for today will appear here'}</p>
      </div>`;
      return;
    }

    let grid = el.querySelector('.dhikr-session-grid');
    if (!grid) {
      el.innerHTML = '<div class="dhikr-session-grid"></div>';
      grid = el.querySelector('.dhikr-session-grid');
    }

    entries.forEach(([id, cnt]) => {
      const itemEl = document.getElementById(`session-item-${id}`);
      const preset = this.getAllPresets().find(p => p.id === id) || { latin: id, icon: Icons.tasbeeh, target: 0, color: '' };
      const target = preset.target || 0;
      const pct = target > 0 ? Math.min(100, Math.round((cnt / target) * 100)) : 0;
      const color = preset.color || '#14b8a6';

      if (itemEl) {
        const countEl = document.getElementById(`session-count-${id}`);
        if (countEl && countEl.textContent !== cnt.toString()) {
          countEl.textContent = cnt;
          countEl.style.transform = 'scale(1.1)';
          if (countEl.timeoutId) clearTimeout(countEl.timeoutId);
          countEl.timeoutId = setTimeout(() => { countEl.style.transform = 'scale(1)'; }, 100);
        }
        const bar = itemEl.querySelector('.ds-bar-fill');
        if (bar) { bar.style.width = pct + '%'; bar.style.background = color; }
        if (target > 0) {
          const tEl = itemEl.querySelector('.ds-target');
          if (tEl) tEl.textContent = `/ ${target}`;
        }
      } else {
        const temp = document.createElement('div');
        temp.innerHTML = `
          <div class="dhikr-session-item anim-fade-in" id="session-item-${id}" ${color ? `style="--dc:${color}"` : ''}>
            <div class="ds-icon">${preset.icon}</div>
            <div class="ds-info">
              ${preset.arabic ? `<div class="ds-arabic">${preset.arabic}</div>` : ''}
              <div class="ds-name">${Utils.escapeHTML(preset.latin)}</div>
              <div class="ds-count-row">
                <span class="ds-count" id="session-count-${id}" style="transition: all 0.15s ease; display: inline-block;">${cnt}</span>
                ${target > 0 ? `<span class="ds-target">/ ${target}</span>` : ''}
              </div>
              ${target > 0 ? `<div class="ds-bar"><div class="ds-bar-fill" style="width:${pct}%;background:${color}"></div></div>` : ''}
            </div>
            ${target > 0 && cnt >= target ? '<div class="ds-done">✓</div>' : ''}
          </div>
        `;
        grid.appendChild(temp.firstElementChild);
      }
    });

    const validIds = entries.map(([id]) => `session-item-${id}`);
    Array.from(grid.children).forEach(child => {
      if (!validIds.includes(child.id)) grid.removeChild(child);
    });
  },

  renderLogDate() {
    const el = document.getElementById('dhikr-log-date');
    if (!el) return;
    const d = new Date();
    const isBn = this.getLang() === 'bn';
    el.textContent = d.toLocaleDateString(isBn ? 'bn-BD' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  },

  showHistoryModal() {
    const el = document.getElementById('dhikr-history-modal');
    const body = document.getElementById('dhikr-history-modal-body');
    if (!el || !body) return;

    // Aggregate all lamim_dhikr_YYYY-MM-DD keys
    const dbData = {};
    const allKeys = DB.keys();
    for (let i = 0; i < allKeys.length; i++) {
      const key = allKeys[i];
      if (key && key.startsWith('lamim_dhikr_') && key !== 'lamim_dhikr_presets') {
        const dateStr = key.replace('lamim_dhikr_', '');
        try { dbData[dateStr] = JSON.parse(DB.rawGet(key)); } catch (e) { }
      }
    }

    const dates = Object.keys(dbData).sort((a, b) => new Date(b) - new Date(a));
    const dayStats = dates.map(date => {
      const entries = Object.entries(dbData[date] || {}).filter(([_, c]) => c > 0);
      return { date, total: entries.reduce((s, [_, c]) => s + c, 0), entries };
    }).filter(d => d.total > 0);

    if (dayStats.length === 0) {
      body.innerHTML = `<div class="empty-state" style="padding:var(--space-6)">
        <div class="empty-icon" style="color:var(--color-text-muted); margin-bottom: 10px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>
        </div>
        <p>${this.getLang() === 'bn' ? 'কোনো ইতিহাস নেই' : 'No history found'}</p>
      </div>`;
    } else {
      const totalAll = dayStats.reduce((s, d) => s + d.total, 0);
      const activeDays = dayStats.length;
      const best = dayStats.reduce((m, d) => Math.max(m, d.total), 0);
      const streak = this._calcStreak(dayStats.map(d => d.date));

      const isBn = this.getLang() === 'bn';
      let html = `
        <div class="dhikr-hist-summary">
          <div class="dhs-card"><span class="dhs-val">${totalAll}</span><span class="dhs-label">${isBn ? 'মোট যিকির' : 'Total Dhikr'}</span></div>
          <div class="dhs-card"><span class="dhs-val">${activeDays}</span><span class="dhs-label">${isBn ? 'সক্রিয় দিন' : 'Active Days'}</span></div>
          <div class="dhs-card"><span class="dhs-val">${best}</span><span class="dhs-label">${isBn ? 'সেরা দিন' : 'Best Day'}</span></div>
          <div class="dhs-card"><span class="dhs-val">${streak}</span><span class="dhs-label">${isBn ? 'ধারাবাহিক' : 'Streak'}</span></div>
        </div>
        <div class="dhikr-hist-list">
      `;

      dayStats.forEach(d => {
        const date = d.date;
        let displayDate = date;
        if (date === Utils.todayStr()) displayDate = isBn ? 'আজ' : 'Today';
        else {
          const dt = new Date(date);
          displayDate = dt.toLocaleDateString(isBn ? 'bn-BD' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
        }
        html += `
          <div class="dhikr-history-card">
            <div class="dhikr-history-header">
              <span class="dhikr-history-date">${displayDate}</span>
              <span class="dhikr-history-total">${d.total} ${isBn ? 'টি' : ''}</span>
            </div>
            <div class="dhikr-history-list">
        `;
        d.entries.forEach(([id, cnt]) => {
          const preset = this.getAllPresets().find(p => p.id === id) || { latin: id, icon: Icons.tasbeeh, color: '' };
          const color = preset.color || '#14b8a6';
          html += `
            <div class="dhikr-history-item" ${preset.color ? `style="--dc:${preset.color}"` : ''}>
              <div class="dhikr-history-item-left">
                <span class="dhikr-history-item-icon">${preset.icon}</span>
                <span class="dhikr-history-item-name">${preset.latin}</span>
              </div>
              <span class="dhikr-history-item-count">${cnt}</span>
            </div>
          `;
        });
        html += `</div></div>`;
      });
      html += `</div>`;
      body.innerHTML = html;
    }

    el.classList.remove('hidden');
  },

  hideHistoryModal() {
    const el = document.getElementById('dhikr-history-modal');
    if (el) el.classList.add('hidden');
  },

  _calcStreak(dateStrs) {
    const set = new Set(dateStrs);
    let streak = 0;
    let d = new Date();
    // start from today (or yesterday if today missing) so gaps don't break streak
    if (!set.has(Utils.todayStr())) d.setDate(d.getDate() - 1);
    while (set.has(Utils.dateStr(d))) {
      streak++;
      d.setDate(d.getDate() - 1);
    }
    return streak;
  },

  showAddModal() {
    const m = document.getElementById('dhikr-add-modal');
    if (m) m.classList.remove('hidden');
  },

  hideAddModal() {
    const m = document.getElementById('dhikr-add-modal');
    if (m) m.classList.add('hidden');
  },

  saveCustom() {
    const latin = (document.getElementById('custom-latin')?.value || '').trim().slice(0, 60);
    const target = document.getElementById('custom-target')?.value || '33';
    if (!latin) { Utils.toast('Name is required', 'error'); return; }
    const preset = { id: Utils.uid(), latin, meaning: `${this.getLang() === 'bn' ? 'লক্ষ্য: ' : 'Target: '}${target}`, category: 'general', icon: Icons.tasbeeh };
    const presets = DB.getDhikrPresets();
    presets.push(preset);
    DB.setDhikrPresets(presets);
    this.hideAddModal();
    this.renderPresetRow();
    Utils.toast('Custom dhikr added!', 'success');
  },

  resetToday() {
    UI.showSettingsModal({
      title: 'Reset Today\'s Dhikr?',
      desc: 'This will clear all your dhikr sessions and counts for today.',
      confirmText: 'Yes, Clear All',
      type: 'danger',
      onConfirm: () => {
        const today = Utils.todayStr();
        DB.setDhikr(today, {});
        this.init();
        Utils.toast('Dhikr data cleared', 'info');
      }
    });
  },

  destroy() {
    if (this._keyHandler) {
      document.removeEventListener('keydown', this._keyHandler);
      this._keyHandler = null;
    }
    this.initialized = false;
  }
};
window.Dhikr = Dhikr;

