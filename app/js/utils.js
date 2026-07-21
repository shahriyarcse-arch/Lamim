/* =============================================
   LAMIM — UTILITIES
   ============================================= */
const Utils = {
  // 3:00 AM Offset (Waking Day logic)
  // If the time is before 3:00 AM, it counts as the previous calendar day.
  getOffsetDate() {
    return new Date(Date.now() - (3 * 60 * 60 * 1000));
  },

  todayStr() { 
    return this.dateStr(this.getOffsetDate()); 
  },

  // Use local date components to avoid timezone shift
  dateStr(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  },

  formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  },

  escapeHTML(str) {
    if (!str) return '';
    return String(str).replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  },


  formatDate(date, opts = {}) {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', ...opts });
  },

  // Hijri date (simple approximation)
  toHijri(date) {
    const settings = DB.getSettings();
    const offset = settings.hijriOffset || 0;
    
    // Convert to modified Julian Day
    const jd = Math.floor((date.getTime() / 86400000) + 2440588) + offset;
    let l = jd - 1948440 + 10632;
    const n = Math.floor((l - 1) / 10631);
    l = l - 10631 * n + 354;
    const j = (Math.floor((10985 - l) / 5316)) * (Math.floor((50 * l) / 17719)) +
              (Math.floor(l / 5670)) * (Math.floor((43 * l) / 15238));
    l = l - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) -
        (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
    const month = Math.floor((24 * l) / 709);
    const day = l - Math.floor((709 * month) / 24);
    const year = 30 * n + j - 30;
    const months = ['Muharram','Safar','Rabi al-Awwal','Rabi al-Thani','Jumada al-Awwal','Jumada al-Thani','Rajab',"Sha'ban",'Ramadan','Shawwal',"Dhu al-Qi'dah",'Dhu al-Hijjah'];
    let monthName = months[month - 1];
    let dateStr = `${day} ${monthName} ${year} AH`;
    
    if (typeof App !== 'undefined' && App.lang === 'bn') {
      const bnMonths = ['মুহাররম','সফর','রবিউল আউয়াল','রবিউস সানি','জুমাদাল উলা','জুমাদাস সানি','রজব','শাবান','রমজান','শাওয়াল','জিলকদ','জিলহজ'];
      monthName = bnMonths[month - 1];
      const bnNums = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
      const bnDay = String(day).split('').map(d => bnNums[d]).join('');
      const bnYear = String(year).split('').map(d => bnNums[d]).join('');
      dateStr = `${bnDay} ${monthName} ${bnYear} হিজরি`;
    } else if (typeof window.t === 'function') {
      monthName = window.t(monthName);
      dateStr = `${day} ${monthName} ${year} AH`;
    }
    
    return dateStr;
  },

  /* ---- Accurate Prayer Times (Sun-angle based) ---- */
  _cachedTimes: null,
  _cachedTimesAt: 0,
  calcPrayerTimes() {
    const nowMs = Date.now();
    // Cache for 1 minute
    if (this._cachedTimes && nowMs - this._cachedTimesAt < 60000) {
      return this._cachedTimes;
    }
    
    const settings = DB.getSettings();
    
    // Fallback coordinates (Dhaka)
    let lat = settings.lat || 23.8103;
    let lng = settings.lng || 90.4125;

    // Flag whether we are using the default Dhaka location (no real coords set)
    this._usingDefaultLocation = !settings.lat || !settings.lng;

    // Automatic Location Detection (if not set) — only attempt once
    if (!settings.lat && !this._geoAttempted && navigator.geolocation) {
      this._geoAttempted = true;
      navigator.geolocation.getCurrentPosition((pos) => {
        const newSettings = { ...settings, lat: pos.coords.latitude, lng: pos.coords.longitude };
        DB.setSettings(newSettings);
        this._usingDefaultLocation = false;
        window.dispatchEvent(new CustomEvent('lamim:data-updated'));
      }, null, { timeout: 5000 });
    }
    
    const now = new Date();
    const dayOfYear = this._dayOfYear(now);
    const tzOffset = now.getTimezoneOffset() / -60;

    // Solar calculations
    const D = dayOfYear;
    const g = 357.529 + 0.98560028 * D; // mean anomaly
    const gRad = g * Math.PI / 180;
    const q = 280.459 + 0.98564736 * D;
    const L = q + 1.915 * Math.sin(gRad) + 0.020 * Math.sin(2 * gRad); // ecliptic longitude
    const LRad = L * Math.PI / 180;
    const e = 23.439 - 0.00000036 * D; // obliquity
    const eRad = e * Math.PI / 180;
    const decl = Math.asin(Math.sin(eRad) * Math.sin(LRad)); // declination
    
    // Equation of time (simplified)
    const RA = Math.atan2(Math.cos(eRad) * Math.sin(LRad), Math.cos(LRad));
    const EqT = (q - (RA * 180 / Math.PI)) / 360 * 24 * 60; // in minutes
    const eqtCorrected = ((EqT % 1440) + 1440) % 1440;
    const eqt = eqtCorrected > 720 ? eqtCorrected - 1440 : eqtCorrected;

    // Dhuhr (solar noon)
    const dhuhr = 12 + (-lng / 15) - (eqt / 60) + tzOffset;

    const latRad = lat * Math.PI / 180;

    // Helper: hour angle for a given sun altitude
    const hourAngle = (angle) => {
      const angleRad = angle * Math.PI / 180;
      const cosHA = (Math.sin(angleRad) - Math.sin(latRad) * Math.sin(decl)) /
                    (Math.cos(latRad) * Math.cos(decl));
      if (cosHA > 1 || cosHA < -1) return 0;
      return Math.acos(cosHA) * 180 / Math.PI / 15; // in hours
    };

    // Fajr: Sun at -18° (Muslim World League)
    const fajrHA = hourAngle(-18);
    const fajr = dhuhr - fajrHA;

    // Asr: Hanafi method (shadow = 2x object + noon shadow)
    const asrAngle = Math.atan(1 / (2 + Math.tan(Math.abs(latRad - decl)))) * 180 / Math.PI;
    const asrHA = hourAngle(asrAngle);
    const asr = dhuhr + asrHA;

    // Maghrib: Sun at -0.833° (accounting for refraction)
    const maghribHA = hourAngle(-0.833);
    const maghrib = dhuhr + maghribHA;

    // Isha: Sun at -17° (MWL)
    const ishaHA = hourAngle(-17);
    const isha = dhuhr + ishaHA;

    const makeTime = (hours) => {
      const h = Math.floor(hours);
      const m = Math.round((hours - h) * 60);
      const d = new Date(now);
      d.setHours(h, m, 0, 0);
      return d;
    };

    const times = [
      { name: 'fajr',    time: makeTime(fajr),    label: this.formatTime(makeTime(fajr)) },
      { name: 'dhuhr',   time: makeTime(dhuhr),   label: this.formatTime(makeTime(dhuhr)) },
      { name: 'asr',     time: makeTime(asr),     label: this.formatTime(makeTime(asr)) },
      { name: 'maghrib', time: makeTime(maghrib), label: this.formatTime(makeTime(maghrib)) },
      { name: 'isha',    time: makeTime(isha),     label: this.formatTime(makeTime(isha)) },
    ];
    this._cachedTimes = times;
    this._cachedTimesAt = nowMs;
    return times;
  },

  _dayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    return Math.floor(diff / 86400000);
  },

  getNextPrayer(times) {
    const now = new Date();
    for (const t of times) {
      if (t.time > now) return t;
    }
    // After Isha, next is tomorrow's Fajr — approximate by adding 24h
    const tomorrowFajr = new Date(times[0].time);
    tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
    return { ...times[0], time: tomorrowFajr, label: times[0].label };
  },

  countdownTo(target) {
    const now = Date.now();
    const diff = target.getTime() - now;
    if (diff <= 0) return '00:00:00';
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  },

  // Auto re-detect location when the user has travelled to a new area.
  // Only runs if the user already GRANTED location (no surprise prompts),
  // is throttled to once per 15 min, and only updates when moved > ~30 km.
  async autoUpdateLocationOnTravel() {
    const settings = DB.getSettings();
    if (!settings.lat || !settings.lng) return;
    if (!navigator.geolocation) return;

    // Respect privacy: only auto-update when the user already GRANTED location.
    // (For 'prompt'/'denied' we return WITHOUT consuming the throttle window.)
    try {
      if (navigator.permissions && navigator.permissions.query) {
        const perm = await navigator.permissions.query({ name: 'geolocation' });
        if (perm.state !== 'granted') return;
      }
    } catch (e) { /* permission query unsupported — proceed */ }

    const now = Date.now();
    if (this._lastTravelCheck && now - this._lastTravelCheck < 15 * 60 * 1000) return;
    this._lastTravelCheck = now;

    navigator.geolocation.getCurrentPosition((pos) => {
      const nLat = pos.coords.latitude;
      const nLng = pos.coords.longitude;
      if (this._haversineKm(settings.lat, settings.lng, nLat, nLng) < 30) return;

      const s = DB.getSettings();
      s.lat = nLat;
      s.lng = nLng;
      DB.setSettings(s);
      // Instant: coordinates are local; refine the city name in the background
      window.dispatchEvent(new CustomEvent('lamim:data-updated'));
      Utils.toast('Location updated', 'success');
      Utils.reverseGeocode(nLat, nLng, (name) => {
        const s2 = DB.getSettings();
        s2.locationName = name;
        DB.setSettings(s2);
        window.dispatchEvent(new CustomEvent('lamim:data-updated'));
      });
    }, () => { /* denied / unavailable — keep previous location */ }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 600000 });
  },

  _haversineKm(la1, lo1, la2, lo2) {
    const R = 6371;
    const dLat = (la2 - la1) * Math.PI / 180;
    const dLon = (lo2 - lo1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(la1 * Math.PI / 180) * Math.cos(la2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  },

  // Reverse-geocode with last-result caching: emits the cached city name IMMEDIATELY
  // (instant, no network wait), then refreshes from the network in the background.
  // Falls back to IP geolocation, then to raw coordinates if everything fails.
  reverseGeocode(lat, lng, cb) {
    const key = 'geo:' + lat.toFixed(1) + ',' + lng.toFixed(1);
    const fallbackName = `${lat.toFixed(2)}, ${lng.toFixed(2)}`;
    let servedCache = false;

    // 1) Instant: serve cached result (if any) before touching the network
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const p = JSON.parse(raw);
        if (cb) cb(p.name || fallbackName);
        servedCache = true;
      }
    } catch (e) { /* ignore */ }

    const cacheAndEmit = (city, country) => {
      const name = city && country ? `${city}, ${country}` : (city || country || fallbackName);
      try { localStorage.setItem(key, JSON.stringify({ city, country, name })); } catch (e) { /* ignore */ }
      if (cb) cb(name);
    };

    // 2) Background: refresh from network
    if (!navigator.onLine) { if (!servedCache && cb) cb(fallbackName); return; }
    const ctrl1 = new AbortController();
    const to1 = setTimeout(() => ctrl1.abort(), 8000);
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`, { signal: ctrl1.signal })
      .then((r) => { clearTimeout(to1); if (!r.ok) throw new Error(r.status); return r.json(); })
      .then((data) => cacheAndEmit(data.city || data.locality || '', data.countryName || ''))
      .catch(() => {
        // Network geocode failed — only fall back to IP if we had no cache at all
        if (servedCache) return;
        if (!navigator.onLine) { if (cb) cb(fallbackName); return; }
        const ctrl2 = new AbortController();
        const to2 = setTimeout(() => ctrl2.abort(), 8000);
        fetch('https://ipapi.co/json/', { signal: ctrl2.signal })
          .then((r) => { clearTimeout(to2); if (!r.ok) throw new Error(r.status); return r.json(); })
          .then((d) => { if (d && d.latitude && d.longitude) cacheAndEmit(d.city || '', d.country_name || ''); else if (cb) cb(fallbackName); })
          .catch(() => { if (cb) cb(fallbackName); });
      });
  },

  uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2); },

  // Toast
  toast(msg, type = 'info', duration = 3000) {
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    const container = document.getElementById('toast-container');
    if (!container) return;
    const el = document.createElement('div');
    el.className = `toast toast-${type}`;
    const iconSpan = document.createElement('span');
    iconSpan.className = 'toast-icon';
    iconSpan.textContent = icons[type] || '';
    const msgSpan = document.createElement('span');
    msgSpan.textContent = msg;
    el.appendChild(iconSpan);
    el.appendChild(msgSpan);
    container.appendChild(el);
    setTimeout(() => { el.classList.add('hiding'); setTimeout(() => el.remove(), 350); }, duration);
  },

  // Confetti
  confetti() {
    const colors = ['#d4a843','#f0c456','#3fb950','#58a6ff','#bc8cff','#f85149'];
    for (let i = 0; i < 60; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        el.className = 'confetti-piece';
        const size = Math.random() * 10 + 6;
        el.style.cssText = `
          left:${Math.random()*100}vw; width:${size}px; height:${size}px;
          background:${colors[Math.floor(Math.random()*colors.length)]};
          animation-delay:${Math.random()*1}s;
          animation-duration:${2 + Math.random()*1.5}s;
        `;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 4000);
      }, i * 30);
    }
  },

  // Date display

  // Salah completion score for a day
  salahScore(salahData) {
    const prayers = ['fajr','dhuhr','asr','maghrib','isha'];
    let done = 0;
    let pctScore = 0;
    prayers.forEach(p => { 
      const s = salahData[p];
      if (s && s !== 'missed') {
        done++;
        if (s === 'jamaat' || s === 'alone') pctScore += 20;
        else if (s === 'qaza') pctScore += 10;
      }
    });
    return { done, total: 5, pct: pctScore };
  },

  // Motivational quotes (updates every minute with Bengali translation)
  getQuote() {
    this.ensureVerses();
    const defaultQuotes = [
      { arabic: 'إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا', translation: 'নিশ্চয়ই সালাত বিশ্বাসীদের ওপর নির্দিষ্ট সময়ের জন্য নির্ধারিত। (৪:১০৩)' },
      { arabic: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ', translation: 'জেনে রেখো, আল্লাহর স্মরণেই কেবল অন্তরসমূহ প্রশান্তি পায়। (১৩:২৮)' },
      { arabic: 'وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ', translation: 'ধৈর্য ও সালাতের মাধ্যমে তোমরা সাহায্য প্রার্থনা করো। (২:৪৫)' },
    ];
    
    // Use the 6000+ fetched verses if available, else fallback
    const quotes = (window.LamimVerses && window.LamimVerses.length > 0) ? window.LamimVerses : defaultQuotes;

    // Cycle quotes every minute based on total minutes since epoch to avoid repeats
    const now = new Date();
    const totalMinutes = Math.floor(now.getTime() / 60000);
    return quotes[totalMinutes % quotes.length];
  },

  // Lazily fetch the large Quran verse dataset (js/verses.json ~3.6MB) once, off the startup path.
  _versesLoading: false,
  ensureVerses() {
    if (this._versesLoading || (window.LamimVerses && window.LamimVerses.length)) return;
    this._versesLoading = true;
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), 8000);
    fetch('js/verses.json', { signal: ctrl.signal })
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(d => { window.LamimVerses = d; })
      .catch(e => { if (e.name !== 'AbortError') console.warn('verses load failed', e); })
      .finally(() => { clearTimeout(to); this._versesLoading = false; });
  },

  /* ============================================================
     Accessibility (a11y) — professional pass
     - Dialog semantics + focus trap/return for all modals
     - Keyboard activation for non-native (div/span) proxy buttons
     - Bulk aria-labels for icon-only controls & unlabeled inputs
     ============================================================ */
  initA11y() {
    if (this._a11yReady) return;
    this._a11yReady = true;

    // --- 1. Modal dialog semantics + focus management ---
    const focusablesIn = (root) => [...root.querySelectorAll('a[href], button, input:not([type="hidden"]), textarea, select, [role="button"], [tabindex]:not([tabindex="-1"])')]
      .filter(x => !x.disabled && x.offsetParent !== null);

    this._modalObserver = new MutationObserver((muts) => {
      muts.forEach(m => {
        const el = m.target;
        if (el.classList.contains('hidden')) {
          if (el._prevFocus && el._prevFocus.focus) { try { el._prevFocus.focus({ preventScroll: true }); } catch (e) {} }
        } else {
          el._prevFocus = document.activeElement;
          setTimeout(() => {
            const f = focusablesIn(el);
            const target = (f.find(x => x.tagName === 'INPUT' || x.tagName === 'TEXTAREA' || x.tagName === 'SELECT')) || f[0] || el;
            try { target.focus({ preventScroll: true }); } catch (e) {}
          }, 60);
        }
      });
    });

    const enhanceModal = (el) => {
      if (!el || el.dataset.a11yModal) return;
      el.dataset.a11yModal = '1';
      el.setAttribute('role', 'dialog');
      el.setAttribute('aria-modal', 'true');
      const title = el.querySelector('.modal-title, h1, h2, h3, [data-modal-title]');
      if (title) {
        if (!title.id) title.id = 'mt-' + Math.random().toString(36).slice(2, 9);
        el.setAttribute('aria-labelledby', title.id);
      }
      el.querySelectorAll('.modal-close, .fin-modal-close').forEach(c => { if (!c.getAttribute('aria-label')) c.setAttribute('aria-label', 'Close'); });
      this._modalObserver.observe(el, { attributes: true, attributeFilter: ['class'] });
      if (!el.classList.contains('hidden')) {
        el._prevFocus = document.activeElement;
        setTimeout(() => { const f = focusablesIn(el); try { (f[0] || el).focus({ preventScroll: true }); } catch (e) {} }, 60);
      }
    };
    document.querySelectorAll('.modal-overlay').forEach(enhanceModal);
    // Catch modals created later by JS (finance, gym, etc.)
    new MutationObserver((muts) => {
      muts.forEach(m => m.addedNodes.forEach(n => {
        if (n.nodeType !== 1) return;
        if (n.classList && n.classList.contains('modal-overlay')) enhanceModal(n);
        if (n.querySelectorAll) n.querySelectorAll('.modal-overlay').forEach(enhanceModal);
      }));
    }).observe(document.body, { childList: true, subtree: true });

    // Tab trap while any modal is open
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const open = document.querySelector('.modal-overlay:not(.hidden)');
      if (!open) return;
      const f = focusablesIn(open);
      if (!f.length) { e.preventDefault(); return; }
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }, true);

    // --- 2. Keyboard activation for non-native proxy buttons ---
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const el = e.target.closest && e.target.closest('[data-section], [role="button"]');
      if (!el) return;
      if (el.tagName === 'BUTTON' || el.tagName === 'A') return; // native elements handle their own activation
      if (el.tagName === 'DIV' || el.tagName === 'SPAN' || el.tagName === 'SECTION') {
        e.preventDefault();
        el.click();
      }
    }, true);

    // Make every [role="button"] (incl. JS-injected) keyboard-focusable
    const makeFocusable = (el) => { if (el.matches && el.matches('[role="button"]:not([tabindex])')) el.setAttribute('tabindex', '0'); };
    document.querySelectorAll('[role="button"]:not([tabindex])').forEach(makeFocusable);
    new MutationObserver((muts) => {
      muts.forEach(m => m.addedNodes.forEach(n => {
        if (n.nodeType !== 1) return;
        if (n.matches && n.matches('[role="button"]:not([tabindex])')) n.setAttribute('tabindex', '0');
        if (n.querySelectorAll) n.querySelectorAll('[role="button"]:not([tabindex])').forEach(makeFocusable);
      }));
    }).observe(document.body, { childList: true, subtree: true });

    // --- 3. Bulk aria-labels for icon-only controls (covers duplicates) ---
    const labels = {
      '#salah-prev-day': 'Previous day', '#salah-next-day': 'Next day',
      '#nafl-prev-btn': 'Previous day', '#nafl-next-btn': 'Next day',
      '.dhikr-undo-btn': 'Undo', '.dhikr-reset-btn': 'Reset',
      '.gh-btn-log-exercise': 'Log exercise', '#dhikr-tap-btn': 'Increment dhikr count'
    };
    Object.keys(labels).forEach(sel => document.querySelectorAll(sel).forEach(el => { if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', labels[sel]); }));

    // Static divs that act as buttons: give them role + tabindex too
    ['#topbar-avatar', '#topbar-avatar-section', '.home-spirit-orb-container', '#setup-gender-male', '#setup-gender-female'].forEach(sel =>
      document.querySelectorAll(sel).forEach(el => {
        if (!el.getAttribute('role')) el.setAttribute('role', 'button');
        if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
        if (el.id === 'topbar-avatar' || el.id === 'topbar-avatar-section') el.setAttribute('aria-label', 'Open profile');
        if (el.classList.contains('home-spirit-orb-container')) el.setAttribute('aria-label', 'View spirit score analysis');
        if (el.id === 'setup-gender-male') el.setAttribute('aria-label', 'Select male');
        if (el.id === 'setup-gender-female') el.setAttribute('aria-label', 'Select female');
      })
    );

    // --- 4. Bulk aria-labels for unlabeled inputs ---
    const fields = {
      '#setup-name': 'Your name', '#setup-lat': 'Latitude', '#setup-lng': 'Longitude',
      '#gym-exercise-name': 'Exercise name', '#gym-exercise-sets': 'Sets',
      '#gym-exercise-reps': 'Reps', '#gym-exercise-weight': 'Weight',
      '#gym-sleep-slider': 'Sleep time', '#gym-wake-slider': 'Wake time',
      '#mujahid-custom-habit-input': 'New habit name',
      '#mujahid-startdate-input': 'Start date', '#mujahid-relapse-reason': 'Relapse reason',
      '#finance-expense-amount': 'Expense amount', '#finance-income-amount': 'Income amount',
      '#finance-income-desc': 'Income source', '#finance-savings-target': 'Savings target'
    };
    Object.keys(fields).forEach(sel => document.querySelectorAll(sel).forEach(el => {
      if (!el.getAttribute('aria-label') && !el.getAttribute('aria-labelledby')) el.setAttribute('aria-label', fields[sel]);
    }));
  },

  // Accurate Confirmation Modal
  confirm(title, msg, onConfirm, type = 'warning') {
    const modal = document.getElementById('confirm-modal');
    const titleEl = document.getElementById('confirm-title');
    const msgEl = document.getElementById('confirm-msg');
    const iconEl = document.getElementById('confirm-icon-box');
    const btn = document.getElementById('confirm-yes-btn');
    
    if (!modal || !titleEl || !msgEl || !btn) {
      if (window.confirm(msg)) onConfirm();
      return;
    }

    const types = {
      danger: { icon: '🗑️', color: 'var(--fin-red)', bg: 'rgba(248, 113, 113, 0.1)', btn: 'var(--fin-red)' },
      warning: { icon: '⚠️', color: 'var(--fin-orange)', bg: 'rgba(251, 191, 36, 0.1)', btn: 'var(--fin-orange)' },
      info: { icon: 'ℹ️', color: 'var(--fin-blue)', bg: 'rgba(56, 189, 248, 0.1)', btn: 'var(--fin-blue)' }
    };

    const config = types[type] || types.warning;
    
    titleEl.textContent = title;
    msgEl.textContent = msg;
    if (iconEl) {
      iconEl.textContent = config.icon;
      iconEl.style.color = config.color;
      iconEl.style.background = config.bg;
    }
    btn.style.background = config.btn;

    modal.classList.remove('hidden');

    btn.onclick = () => {
      this.closeConfirm();
      onConfirm();
    };
  },

  closeConfirm() {
    const modal = document.getElementById('confirm-modal');
    if (modal) modal.classList.add('hidden');
  },

  // Themed confirmation for destructive actions (Logout / Delete / Factory Reset).
  // opts: { title, message, icon, color, confirmText, onConfirm }
  dangerConfirm(opts) {
    const modal = document.getElementById('danger-confirm-modal');
    if (!modal) {
      if (window.confirm((opts.title || '') + '\n' + (opts.message || ''))) opts.onConfirm && opts.onConfirm();
      return;
    }
    const titleEl = document.getElementById('danger-title');
    const msgEl = document.getElementById('danger-msg');
    const iconEl = document.getElementById('danger-icon');
    const proceed = document.getElementById('danger-proceed');
    const color = opts.color || '#ef4444';

    if (titleEl) titleEl.textContent = opts.title || 'Are you sure?';
    if (msgEl) msgEl.textContent = opts.message || '';
    if (iconEl) {
      iconEl.innerHTML = opts.icon || '⚠️';
      iconEl.style.background = color + '1f';
      iconEl.style.color = color;
      iconEl.style.boxShadow = `0 0 0 6px ${color}12, 0 12px 30px ${color}2e`;
    }
    if (proceed) {
      proceed.textContent = opts.confirmText || 'Proceed';
      proceed.style.background = `linear-gradient(135deg, ${color}, ${color}cc)`;
      proceed.style.boxShadow = `0 10px 24px ${color}3d`;
    }
    this._dangerOnConfirm = opts.onConfirm;
    modal.classList.remove('hidden');
  },

  closeDangerConfirm() {
    const modal = document.getElementById('danger-confirm-modal');
    if (modal) modal.classList.add('hidden');
    this._dangerOnConfirm = null;
  },

  _confirmDanger() {
    const cb = this._dangerOnConfirm;
    this.closeDangerConfirm();
    if (cb) cb();
  },


  // NOTE: escapeHTML is defined once above (line 27). Do NOT add it again here.

  debounce(func, wait) {
    let timeout;
    const debounced = function executedFunction(...args) {
      const later = () => {
        timeout = null;
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
    debounced.cancel = () => {
      clearTimeout(timeout);
      timeout = null;
    };
    return debounced;
  },

  loadScript(url) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${url}"]`);
      if (existing) {
        if (existing.dataset.loaded === 'true') {
          resolve();
        } else {
          existing.addEventListener('load', () => resolve());
          existing.addEventListener('error', (e) => reject(e));
        }
        return;
      }

      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.dataset.loaded = 'false';

      script.onload = () => {
        script.dataset.loaded = 'true';
        resolve();
      };

      script.onerror = (e) => {
        reject(e);
      };

      document.head.appendChild(script);
    });
  },

  safeRun(fn, context = 'Unknown') {
    try {
      return fn();
    } catch (err) {
      console.error(`[Error Boundary] Crash detected in context: ${context}`, err);
      if (typeof Utils !== 'undefined' && Utils.toast) {
        Utils.toast(`Something went wrong in ${context}. Please try again or refresh.`, 'error');
      }
      return null;
    }
  },

};

const UI = {
  showSettingsModal(opts) {
    const modal = document.getElementById('section-settings-modal');
    const title = document.getElementById('settings-modal-title');
    const desc = document.getElementById('settings-modal-desc');
    const confirmBtn = document.getElementById('settings-confirm-btn');
    const iconOrb = document.getElementById('settings-modal-icon');

    if (!modal) return;

    if (opts.title && title) title.textContent = opts.title;
    if (opts.desc && desc) desc.textContent = opts.desc;
    if (opts.confirmText && confirmBtn) confirmBtn.textContent = opts.confirmText;

    // Dynamic Icon/Color theming
    if (opts.type === 'danger' && iconOrb && confirmBtn) {
      iconOrb.style.background = 'rgba(248,113,113,0.1)';
      iconOrb.style.color = '#f87171';
      iconOrb.style.borderColor = 'rgba(248,113,113,0.2)';
      confirmBtn.style.background = '#ef4444';
    }

    // Reset to default if not danger
    if (opts.type !== 'danger' && iconOrb && confirmBtn) {
      iconOrb.style.background = '';
      iconOrb.style.color = '';
      iconOrb.style.borderColor = '';
      confirmBtn.style.background = '';
    }

    // Set callback
    if (confirmBtn) {
      confirmBtn.onclick = () => {
        if (opts.onConfirm) opts.onConfirm();
        this.hideSettingsModal();
      };
    }

    modal.classList.remove('hidden');
  },

  hideSettingsModal() {
    const modal = document.getElementById('section-settings-modal');
    if (modal) modal.classList.add('hidden');
  },

  // PDF Export — Universal: window.open + document.write (works on all devices)
  exportPDF(html) {
    if (!html) return;
    try {
      const cleaned = html.replace(/<script>[\s\S]*?window\.print\(\)[\s\S]*?<\/script>/gi, '');
      const printScript = '<script>window.addEventListener("load",function(){setTimeout(function(){try{window.focus();window.print()}catch(e){}},400)})<\/script>';
      const fullDoc = cleaned.includes('</body>')
        ? cleaned.replace('</body>', printScript + '</body>')
        : cleaned + printScript;

      const win = window.open('', '_blank');
      if (!win) {
        Utils.toast('Please allow popups to export PDF. If popups are already allowed, try exporting again or use Ctrl+P.', 'error');
        return;
      }
      win.document.write(fullDoc);
      win.document.close();
    } catch (err) {
      console.error('PDF export failed:', err);
      Utils.toast('Export failed: ' + err.message + '. Try Ctrl+P instead.', 'error');
    }
  }
};



