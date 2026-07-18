const Gym = {
  selectedDate: '',

  scrollToCard(cardId) {
    const el = document.getElementById(cardId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },

  _icons: {
    dumbbell: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 6.5 17.5 17.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/><path d="m10.2 9-1.7 5.2 5.2-1.7"/><path d="M14.8 9l1.7 5.2-5.2 1.7"/></svg>',
    moon: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    droplet: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5S12 2 12 2 9 6.5 8 9.5a7 7 0 0 0 4 12.5z"/></svg>'
  },

  _templates: {
    push: ['Bench Press', 'Overhead Press', 'Incline Dumbbell Press', 'Tricep Pushdown'],
    pull: ['Pull-ups', 'Barbell Row', 'Face Pulls', 'Bicep Curls'],
    legs: ['Squat', 'Romanian Deadlift', 'Leg Press', 'Calf Raises'],
    upper: ['Bench Press', 'Pull-ups', 'Overhead Press', 'Barbell Row'],
    lower: ['Squat', 'Deadlift', 'Leg Press', 'Hip Thrust']
  },

  init() {
    this.selectedDate = Utils.todayStr();
    this.renderAll();
    this.bindEvents();
  },

  destroy() {
    ['gym-prev-day', 'gym-next-day', 'gym-today-btn'].forEach(id => {
      const el = document.getElementById(id);
      if (el) delete el.dataset.bound;
    });
    const exInput = document.getElementById('gym-exercise-name');
    if (exInput) delete exInput.dataset.bound;
    const wInput = document.getElementById('gym-body-weight');
    const bfInput = document.getElementById('gym-body-fat');
    if (wInput) delete wInput.dataset.bound;
    if (bfInput) delete bfInput.dataset.bound;
  },

  renderAll() {
    this.renderHeader();
    this.renderHero();
    this.renderStatStrip();
    this.renderExercises();
    this.renderSleep();
    this.renderDiet();
    this.renderWater();
    this.renderBodyMetrics();
    this.updateHeroMetrics();
  },

  renderHeader() {
    const label = document.getElementById('gym-date-label');
    if (!label) return;
    const isToday = this.selectedDate === Utils.todayStr();
    if (isToday) {
      label.textContent = window.t ? window.t('Today') : 'Today';
    } else {
      const dObj = new Date(this.selectedDate + 'T00:00:00');
      const formatted = dObj.toLocaleDateString(
        (typeof App !== 'undefined' && App.lang === 'bn') ? 'bn-BD' : 'en-US',
        { month: 'short', day: 'numeric' }
      );
      label.textContent = window.n ? window.n(formatted) : formatted;
    }

    const nextBtn = document.getElementById('gym-next-day');
    if (nextBtn) {
      nextBtn.style.display = isToday ? 'none' : 'inline-flex';
    }

    const todayBtn = document.getElementById('gym-today-btn');
    if (todayBtn) {
      todayBtn.style.display = isToday ? 'none' : 'inline-flex';
    }
  },

  bindEvents() {
    const prev = document.getElementById('gym-prev-day');
    const next = document.getElementById('gym-next-day');
    const todayBtn = document.getElementById('gym-today-btn');

    if (prev && !prev.dataset.bound) {
      prev.dataset.bound = '1';
      prev.addEventListener('click', () => this.changeDay(-1));
    }
    if (next && !next.dataset.bound) {
      next.dataset.bound = '1';
      next.addEventListener('click', () => this.changeDay(1));
    }
    if (todayBtn && !todayBtn.dataset.bound) {
      todayBtn.dataset.bound = '1';
      todayBtn.addEventListener('click', () => {
        this.selectedDate = Utils.todayStr();
        this.renderAll();
      });
    }

    const exInput = document.getElementById('gym-exercise-name');
    if (exInput && !exInput.dataset.bound) {
      exInput.dataset.bound = '1';
      exInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); this.addExercise(); }
      });
    }

    // body metric inputs
    const wInput = document.getElementById('gym-body-weight');
    const bfInput = document.getElementById('gym-body-fat');
    if (wInput && !wInput.dataset.bound) {
      wInput.dataset.bound = '1';
      wInput.addEventListener('change', () => this.saveBodyMetrics());
    }
    if (bfInput && !bfInput.dataset.bound) {
      bfInput.dataset.bound = '1';
      bfInput.addEventListener('change', () => this.saveBodyMetrics());
    }
  },

  changeDay(offset) {
    const d = new Date(this.selectedDate + 'T00:00:00');
    d.setDate(d.getDate() + offset);
    const newDate = Utils.dateStr(d);
    if (newDate > Utils.todayStr()) {
      if (typeof Utils !== 'undefined' && Utils.toast) Utils.toast("Can't go to the future!", 'error');
      return;
    }
    this.selectedDate = newDate;
    this.renderAll();
  },

  /* ---------- HERO scorecard ---------- */
  renderHero() {
    const wrap = document.getElementById('gym-hero-ring');
    if (wrap && window.Charts) {
      Charts.ring(wrap, { size: 132, thickness: 10, value: 0, color: 'currentColor', colorEnd: 'var(--gh-secondary)' });
    }
    this.renderHeroSpark();
  },

  renderHeroSpark() {
    const el = document.getElementById('gym-hero-spark');
    if (!el || !window.Charts) return;
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(this.selectedDate + 'T00:00:00');
      d.setDate(d.getDate() - i);
      const ds = Utils.dateStr(d);
      const g = DB.getGym(ds);
      data.push(this._readinessFor(g));
    }
    Charts.sparkline(el, data, { color: 'var(--gh-primary)', fillColor: 'var(--gh-primary)', height: 44 });
  },

  _readinessFor(gym) {
    const sleep = (gym && gym.sleep) || {};
    const recovery = this._calcRecoveryScore(sleep);
    const water = (gym && gym.water) || {};
    const waterPct = water.goal ? Math.min(100, (water.amount / water.goal) * 100) : 0;
    const diet = (gym && gym.diet) || {};
    const meals = diet.meals || [];
    const protein = meals.reduce((s, m) => s + (Number(m.protein) || 0), 0);
    const nutritionPct = diet.proteinGoal ? Math.min(100, (protein / diet.proteinGoal) * 100) : 0;
    const exercises = (gym && gym.exercises) || [];
    const workoutScore = Math.min(100, exercises.length * 25);
    return Math.round(recovery * 0.4 + waterPct * 0.25 + nutritionPct * 0.2 + workoutScore * 0.15);
  },

  updateHeroMetrics() {
    const gym = DB.getGym(this.selectedDate);
    const readiness = this._readinessFor(gym);

    const ringWrap = document.getElementById('gym-hero-ring');
    if (ringWrap && window.Charts) {
      Charts.animateRing(ringWrap, readiness, { size: 132, thickness: 10 });
    }
    const num = document.getElementById('gym-hero-ring-num');
    if (num) num.textContent = window.n ? window.n(readiness) : readiness;

    const titleEl = document.getElementById('gh-hero-title');
    if (titleEl) {
      if (readiness >= 80) titleEl.textContent = 'Peak Readiness';
      else if (readiness >= 60) titleEl.textContent = 'Strong Day';
      else if (readiness >= 35) titleEl.textContent = 'Getting There';
      else titleEl.textContent = 'Rest & Recover';
    }
    const subEl = document.getElementById('gh-hero-sub');
    if (subEl) {
      const ex = (gym.exercises || []).length;
      const water = (gym.water && gym.water.amount) || 0;
      subEl.textContent = `${window.n ? window.n(ex) : ex} exercises · ${window.n ? window.n(water) : water} ml`;
    }
  },

  /* ---------- stat strip ---------- */
  renderStatStrip() {
    const streak = DB.getGymStreak();
    const gym = DB.getGym(this.selectedDate);
    const volume = this._dayVolume(gym.exercises || []);
    const sleepDur = (gym.sleep && gym.sleep.duration) || 0;
    const water = (gym.water && gym.water.amount) || 0;
    const n = window.n ? window.n : (x => x);

    const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    
    // Update Exercises count
    const exCount = (gym.exercises || []).length;
    setText('gym-stat-exercises', n(exCount));
    
    // Update Recovery Score
    const recoveryScore = (gym.sleep && gym.sleep.recoveryScore) ? gym.sleep.recoveryScore : '--';
    setText('gym-stat-recovery-score', recoveryScore !== '--' ? n(Math.round(recoveryScore)) : '--');
    
    // Note: Hydration percentage is updated via renderWater(), but we can also update it here if needed
    const waterPct = (gym.water && gym.water.goal) ? Math.min(100, (gym.water.amount / gym.water.goal) * 100) : 0;
    setText('gym-stat-hydration-val', n(Math.round(waterPct)) + '%');
  },

  _dayVolume(exercises) {
    return exercises.reduce((s, e) => s + ((Number(e.sets) || 0) * (Number(e.reps) || 0) * (Number(e.weight) || 0)), 0);
  },

  /* ---------- workout logger ---------- */
  renderExercises() {
    const listEl = document.getElementById('gym-exercise-list');
    const emptyEl = document.getElementById('gym-exercise-empty');
    if (!listEl) return;
    const data = DB.getGym(this.selectedDate);
    const exercises = data.exercises || [];
    listEl.innerHTML = '';

    if (exercises.length === 0) {
      if (emptyEl) emptyEl.style.display = 'flex';
      listEl.style.display = 'none';
      return;
    }
    if (emptyEl) emptyEl.style.display = 'none';
    listEl.style.display = 'flex';

    const prs = DB.getPRs();
    exercises.forEach((ex, i) => {
      const w = Number(ex.weight) || 0;
      const sets = Number(ex.sets) || 0;
      const reps = Number(ex.reps) || 0;
      const isPR = w > 0 && prs[ex.name] && prs[ex.name].weight === w;
      const n = window.n ? window.n : (x => x);

      const div = document.createElement('div');
      div.className = 'gh-ex-item';
      div.innerHTML =
        `<span class="gh-ex-tag">${n(sets)}×${n(reps)}</span>` +
        `<span class="gh-ex-name">${Utils.escapeHTML(ex.name)}${isPR ? '<span class="gh-ex-pr">PR</span>' : ''}</span>` +
        `<div class="gh-meal-right">` +
          `${w > 0 ? `<span class="gh-ex-weight">${n(w)} kg</span>` : ''}` +
          `<button class="gh-meal-del" onclick="Gym.deleteExercise(${i})" title="Remove"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>` +
        `</div>`;
      listEl.appendChild(div);
    });
  },

  applyTemplate(name) {
    const tpls = this._templates[name];
    if (!tpls) return;
    document.querySelectorAll('.gh-tpl').forEach(b => b.classList.toggle('active', b.dataset.tpl === name));
    const data = DB.getGym(this.selectedDate);
    data.exercises = tpls.map(n => ({ name: n, sets: 3, reps: 10, weight: 0 }));
    DB.setGym(this.selectedDate, data);
    this.renderExercises();
    this.updateHeroMetrics();
    this.renderStatStrip();
    window.dispatchEvent(new CustomEvent('lamim:data-updated'));
    if (typeof Utils !== 'undefined' && Utils.toast) Utils.toast(name.charAt(0).toUpperCase() + name.slice(1) + ' template applied', 'success');
  },

  addExercise() {
    const nameEl = document.getElementById('gym-exercise-name');
    const setsEl = document.getElementById('gym-exercise-sets');
    const repsEl = document.getElementById('gym-exercise-reps');
    const weightEl = document.getElementById('gym-exercise-weight');
    if (!nameEl) return;

    const name = nameEl.value.trim();
    if (!name) {
      nameEl.focus();
      if (typeof Utils !== 'undefined' && Utils.toast) Utils.toast('Enter an exercise name', 'error');
      return;
    }
    const ex = {
      name,
      sets: Math.max(1, parseInt(setsEl.value) || 3),
      reps: Math.max(1, parseInt(repsEl.value) || 10),
      weight: Math.max(0, parseFloat(weightEl.value) || 0)
    };

    const data = DB.getGym(this.selectedDate);
    if (!data.exercises) data.exercises = [];
    data.exercises.push(ex);

    // PR tracking
    if (ex.weight > 0) {
      const prs = DB.getPRs();
      if (!prs[name] || prs[name].weight < ex.weight) {
        prs[name] = { weight: ex.weight, date: this.selectedDate };
        DB.setPRs(prs);
      }
    }

    DB.setGym(this.selectedDate, data);
    nameEl.value = '';
    setsEl.value = 3;
    repsEl.value = 10;
    weightEl.value = 0;
    this.renderExercises();
    this.updateHeroMetrics();
    this.renderStatStrip();
    window.dispatchEvent(new CustomEvent('lamim:data-updated'));
  },

  deleteExercise(idx) {
    const data = DB.getGym(this.selectedDate);
    if (!data.exercises) return;
    data.exercises.splice(idx, 1);
    DB.setGym(this.selectedDate, data);
    this.renderExercises();
    this.updateHeroMetrics();
    this.renderStatStrip();
    window.dispatchEvent(new CustomEvent('lamim:data-updated'));
  },

  /* ---------- sleep ---------- */
  renderSleep() {
    const data = DB.getGym(this.selectedDate);
    const sleep = data.sleep || {};
    const sleepInput = document.getElementById('gym-sleep-time');
    const wakeInput = document.getElementById('gym-wake-time');
    const quality = document.getElementById('gym-sleep-quality');
    if (sleepInput) sleepInput.value = sleep.sleepTime || '';
    if (wakeInput) wakeInput.value = sleep.wakeTime || '';
    if (quality) quality.value = sleep.quality || 'deep';

    // Populate sliders from stored 24h time
    const sleepSlider = document.getElementById('gym-sleep-slider');
    const wakeSlider = document.getElementById('gym-wake-slider');

    if (sleepSlider && sleep.sleepTime) {
      sleepSlider.value = this._time24ToSleepSlider(sleep.sleepTime);
      this._updateSleepLabel(parseInt(sleepSlider.value));
    } else if (sleepSlider) {
      this._updateSleepLabel(parseInt(sleepSlider.value));
    }

    if (wakeSlider && sleep.wakeTime) {
      wakeSlider.value = this._time24ToWakeSlider(sleep.wakeTime);
      this._updateWakeLabel(parseInt(wakeSlider.value));
    } else if (wakeSlider) {
      this._updateWakeLabel(parseInt(wakeSlider.value));
    }

    // Populate quality pills
    const q = sleep.quality || 'deep';
    document.querySelectorAll('.gh-quality-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.quality === q);
    });

    this.updateSleepStats(sleep);
  },

  /* --- Slider helpers --- */
  // Sleep slider: 0=6PM, 360=12AM, 720=6AM (12h range)
  _sleepSliderTo24h(val) {
    let totalMin = 18 * 60 + parseInt(val); // 6PM = 18:00 base
    if (totalMin >= 24 * 60) totalMin -= 24 * 60;
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  },
  _time24ToSleepSlider(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    let totalMin = h * 60 + m;
    let base = 18 * 60; // 6PM
    let val = totalMin - base;
    if (val < 0) val += 24 * 60;
    return Math.max(0, Math.min(720, val));
  },
  // Wake slider: 0=4AM, 360=10AM, 720=4PM (12h range)
  _wakeSliderTo24h(val) {
    let totalMin = 4 * 60 + parseInt(val); // 4AM = 04:00 base
    if (totalMin >= 24 * 60) totalMin -= 24 * 60;
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  },
  _time24ToWakeSlider(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    let totalMin = h * 60 + m;
    let base = 4 * 60; // 4AM
    let val = totalMin - base;
    if (val < 0) val += 24 * 60;
    return Math.max(0, Math.min(720, val));
  },

  _formatTime12h(time24) {
    const [hStr, mStr] = time24.split(':');
    let h = parseInt(hStr);
    const m = mStr;
    let ampm = 'AM';
    if (h >= 12) { ampm = 'PM'; if (h > 12) h -= 12; }
    if (h === 0) h = 12;
    return `${h}:${m} ${ampm}`;
  },

  _updateSleepLabel(val) {
    const label = document.getElementById('gym-sleep-time-label');
    if (label) label.textContent = this._formatTime12h(this._sleepSliderTo24h(val));
  },
  _updateWakeLabel(val) {
    const label = document.getElementById('gym-wake-time-label');
    if (label) label.textContent = this._formatTime12h(this._wakeSliderTo24h(val));
  },

  onSleepSliderInput(val) {
    this._updateSleepLabel(parseInt(val));
    const time24 = this._sleepSliderTo24h(val);
    const sleepInput = document.getElementById('gym-sleep-time');
    if (sleepInput) sleepInput.value = time24;
    this.onSleepInputChange();
  },

  onWakeSliderInput(val) {
    this._updateWakeLabel(parseInt(val));
    const time24 = this._wakeSliderTo24h(val);
    const wakeInput = document.getElementById('gym-wake-time');
    if (wakeInput) wakeInput.value = time24;
    this.onSleepInputChange();
  },

  onSleepInputChange() {
    const data = DB.getGym(this.selectedDate);
    if (!data.sleep) data.sleep = {};
    data.sleep.sleepTime = (document.getElementById('gym-sleep-time') || {}).value || '';
    data.sleep.wakeTime = (document.getElementById('gym-wake-time') || {}).value || '';
    data.sleep.quality = (document.getElementById('gym-sleep-quality') || {}).value || 'deep';
    DB.setGym(this.selectedDate, data);
    this.updateSleepStats(data.sleep);
    this.updateHeroMetrics();
    this.renderStatStrip();
    window.dispatchEvent(new CustomEvent('lamim:data-updated'));
  },

  onTimeDigitChange() {
    // Legacy stub — no longer used, kept for backward compat
  },

  _calcRecoveryScore(sleep) {
    if (!sleep || !sleep.sleepTime || !sleep.wakeTime) return 0;
    const [sh, sm] = sleep.sleepTime.split(':').map(Number);
    const [wh, wm] = sleep.wakeTime.split(':').map(Number);
    let start = sh * 60 + sm;
    let end = wh * 60 + wm;
    if (end <= start) end += 24 * 60;
    const hours = (end - start) / 60;
    let score;
    if (hours >= 7 && hours <= 9) score = 85;
    else if (hours >= 6 && hours < 7) score = 70;
    else if (hours > 9 && hours <= 10) score = 75;
    else score = 45;
    const q = sleep.quality;
    if (q === 'deep') score += 15;
    else if (q === 'light') score += 0;
    else if (q === 'restless') score -= 15;
    return Math.max(0, Math.min(100, Math.round(score)));
  },

  updateSleepStats(sleep) {
    const n = window.n ? window.n : (x => x);
    const ringWrap = document.getElementById('gym-sleep-ring-svg');
    const durEl = document.getElementById('gym-sleep-duration-val');
    const recEl = document.getElementById('gym-recovery-score-val');
    const gapEl = document.getElementById('gym-sleep-gap-val');
    const badge = document.getElementById('gym-recovery-badge');
    const inDisp = document.getElementById('gym-sleep-time-display');
    const outDisp = document.getElementById('gym-wake-time-display');
    const gauge = document.getElementById('gym-sleep-gauge-val');

    if (!sleep || !sleep.sleepTime || !sleep.wakeTime) {
      if (ringWrap && window.Charts) Charts.ring(ringWrap, { size: 88, thickness: 7, value: 0, color: 'currentColor' });
      if (gauge) gauge.textContent = '--';
      if (durEl) durEl.textContent = '--';
      if (recEl) recEl.textContent = '--';
      if (gapEl) { gapEl.textContent = '--'; gapEl.className = 'gh-gap-val'; }
      if (badge) { badge.textContent = 'PENDING'; badge.className = 'gh-badge pending'; }
      if (inDisp) inDisp.textContent = '--:--';
      if (outDisp) outDisp.textContent = '--:--';
      return;
    }

    const [sh, sm] = sleep.sleepTime.split(':').map(Number);
    const [wh, wm] = sleep.wakeTime.split(':').map(Number);
    let start = sh * 60 + sm;
    let end = wh * 60 + wm;
    if (end <= start) end += 24 * 60;
    const totalMin = end - start;
    const hours = totalMin / 60;

    const score = this._calcRecoveryScore(sleep);
    const goal = 8.0;
    const gap = hours - goal;

    if (ringWrap && window.Charts) Charts.animateRing(ringWrap, score, { size: 88, thickness: 7 });
    if (gauge) gauge.textContent = n(score);
    if (durEl) durEl.textContent = n(hours.toFixed(1)) + 'h';
    if (recEl) recEl.textContent = n(score);
    if (gapEl) {
      gapEl.textContent = (gap >= 0 ? '+' : '') + n(gap.toFixed(1)) + 'h';
      gapEl.className = 'gh-gap-val ' + (gap >= -0.2 ? 'positive' : 'negative');
    }
    if (badge) {
      let cls = 'poor', txt = 'POOR';
      if (score >= 80) { cls = 'excellent'; txt = 'EXCELLENT'; }
      else if (score >= 60) { cls = 'good'; txt = 'GOOD'; }
      badge.textContent = txt; badge.className = 'gh-badge ' + cls;
    }
    if (inDisp) inDisp.textContent = this.formatTime12h(sleep.sleepTime);
    if (outDisp) outDisp.textContent = this.formatTime12h(sleep.wakeTime);

    // persist duration back
    const data = DB.getGym(this.selectedDate);
    if (!data.sleep) data.sleep = {};
    if (data.sleep.duration !== hours) {
      data.sleep.duration = hours;
      DB.setGym(this.selectedDate, data);
    }
  },

  setQuality(q) {
    const qualitySelect = document.getElementById('gym-sleep-quality');
    if (qualitySelect) qualitySelect.value = q;
    
    document.querySelectorAll('.gh-quality-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.quality === q);
    });

    this.onSleepInputChange();
  },

  /* ---------- diet / nutrition ---------- */
  renderDiet() {
    const data = DB.getGym(this.selectedDate);
    const diet = data.diet || {};
    const meals = diet.meals || [];
    const listEl = document.getElementById('gym-meals-list');

    if (listEl) {
      listEl.innerHTML = '';
      if (meals.length === 0) {
        listEl.innerHTML = `<div style="text-align:center;padding:18px;color:var(--gh-text-muted);font-size:13px;font-weight:600">No meals logged yet</div>`;
      } else {
        meals.forEach((m, i) => {
          const div = document.createElement('div');
          div.className = 'gh-meal-item';
          div.innerHTML =
            `<span class="gh-meal-type ${m.type || 'snack'}">${window.t ? window.t(m.type || 'snack') : (m.type || 'snack')}</span>` +
            `<span class="gh-meal-desc">${Utils.escapeHTML(m.desc || '')}</span>` +
            `<div class="gh-meal-right">` +
              `<button class="gh-meal-del" onclick="Gym.deleteMeal(${i})"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>` +
            `</div>`;
          listEl.appendChild(div);
        });
      }
    }
  },

  openMealModal() {
    if (document.getElementById('gh-meal-modal')) return;
    const overlay = document.createElement('div');
    overlay.className = 'gh-modal-overlay';
    overlay.id = 'gh-meal-modal';
    overlay.innerHTML =
      `<div class="gh-modal" onclick="event.stopPropagation()">` +
        `<div class="gh-modal-header">` +
          `<h3>Log Food Intake</h3>` +
          `<p style="font-size:12px; color:var(--gh-text-muted); margin:-12px 0 16px;">Keep a simple journal of what you eat today</p>` +
        `</div>` +
        `<div class="gh-modal-body">` +
          `<div class="gh-modal-field">` +
            `<label class="gh-meta-label" for="gh-meal-desc">What did you eat?</label>` +
            `<input type="text" class="gh-input" id="gh-meal-desc" placeholder="e.g. Rice, Lentils, Fish & Salad">` +
          `</div>` +
          `<div class="gh-modal-field">` +
            `<label class="gh-meta-label">Meal Type</label>` +
            `<div class="gh-seg" id="gh-meal-seg">` +
              `<button class="gh-seg-btn" data-type="breakfast">Breakfast</button>` +
              `<button class="gh-seg-btn active" data-type="lunch">Lunch</button>` +
              `<button class="gh-seg-btn" data-type="dinner">Dinner</button>` +
              `<button class="gh-seg-btn" data-type="snack">Snack</button>` +
            `</div>` +
          `</div>` +
        `</div>` +
        `<div class="gh-modal-actions">` +
          `<button class="gh-btn gh-btn-ghost" onclick="Gym.closeMealModal()">Cancel</button>` +
          `<button class="gh-btn gh-btn-primary" onclick="Gym.submitMeal()">Log Food</button>` +
        `</div>` +
      `</div>`;
    overlay.addEventListener('click', () => this.closeMealModal());
    document.body.appendChild(overlay);

    overlay.querySelectorAll('.gh-seg-btn').forEach(b => {
      b.addEventListener('click', () => {
        overlay.querySelectorAll('.gh-seg-btn').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
      });
    });
    setTimeout(() => { const d = document.getElementById('gh-meal-desc'); if (d) d.focus(); }, 50);
  },

  closeMealModal() {
    const m = document.getElementById('gh-meal-modal');
    if (m) m.remove();
  },

  submitMeal() {
    const desc = (document.getElementById('gh-meal-desc') || {}).value.trim();
    if (!desc) { if (typeof Utils !== 'undefined' && Utils.toast) Utils.toast('Enter what you ate', 'error'); return; }
    const active = document.querySelector('#gh-meal-modal .gh-seg-btn.active');
    const type = active ? active.dataset.type : 'snack';
    this.addMeal(desc, 0, 0, type, 0, 0);
    this.closeMealModal();
  },

  addMealPrompt() { this.openMealModal(); },

  addMealPreset(desc, protein, calories, type) { this.addMeal(desc, protein, calories, type); },

  addMeal(desc, protein, calories, type, carbs, fats) {
    const data = DB.getGym(this.selectedDate);
    if (!data.diet) data.diet = { meals: [], proteinGoal: 150, carbsGoal: 200, fatsGoal: 65 };
    if (!data.diet.meals) data.diet.meals = [];
    data.diet.meals.push({ desc, protein: Number(protein) || 0, calories: Number(calories) || 0, carbs: Number(carbs) || 0, fats: Number(fats) || 0, type });
    DB.setGym(this.selectedDate, data);
    this.renderDiet();
    this.updateHeroMetrics();
    window.dispatchEvent(new CustomEvent('lamim:data-updated'));
  },

  deleteMeal(idx) {
    const data = DB.getGym(this.selectedDate);
    if (!data.diet || !data.diet.meals) return;
    data.diet.meals.splice(idx, 1);
    DB.setGym(this.selectedDate, data);
    this.renderDiet();
    this.updateHeroMetrics();
    window.dispatchEvent(new CustomEvent('lamim:data-updated'));
  },

  /* ---------- water ---------- */
  renderWater() {
    const data = DB.getGym(this.selectedDate);
    const water = data.water || { amount: 0, goal: 3000 };
    const n = window.n ? window.n : (x => x);
    const pct = water.goal ? Math.min(100, (water.amount / water.goal) * 100) : 0;

    const valEl = document.getElementById('gym-water-amount-center');
    const pctEl = document.getElementById('gym-water-pct-center');
    const glassFill = document.getElementById('gym-water-glass-fill');

    if (valEl) valEl.textContent = `${n(water.amount)} ml`;
    if (pctEl) pctEl.textContent = n(Math.round(pct)) + '%';
    
    // Animate the glass fill height
    if (glassFill) {
      glassFill.style.height = `${pct}%`;
    }

    // Update global stat strip new tile if present
    const statValEl = document.getElementById('gym-stat-hydration-val');
    if (statValEl) statValEl.textContent = n(Math.round(pct)) + '%';
  },

  addWater(amount) {
    const data = DB.getGym(this.selectedDate);
    if (!data.water) data.water = { amount: 0, goal: 3000 };
    data.water.amount = Math.max(0, (data.water.amount || 0) + amount);
    DB.setGym(this.selectedDate, data);
    this.renderWater();
    this.updateHeroMetrics();
    this.renderStatStrip();
    window.dispatchEvent(new CustomEvent('lamim:data-updated'));
  },

  /* ---------- body metrics ---------- */
  renderBodyMetrics() {
    const metrics = DB.getBodyMetrics();
    const wInput = document.getElementById('gym-body-weight');
    const bfInput = document.getElementById('gym-body-fat');
    const trendEl = document.getElementById('gym-body-trend');

    // find today's entry (or latest for display)
    const todayEntry = metrics.entries.find(e => e.date === this.selectedDate);
    if (wInput && todayEntry) wInput.value = todayEntry.weight || '';
    if (bfInput && todayEntry) bfInput.value = todayEntry.bodyFat || '';

    if (trendEl && window.Charts) {
      const entries = metrics.entries.slice(-14);
      if (entries.length === 0) {
        trendEl.innerHTML = '<div class="gh-body-empty">Log your weight to see the trend</div>';
      } else {
        Charts.lineChart(trendEl, entries.map(e => ({ label: '', value: e.weight || 0 })), { color: 'var(--gh-secondary)', height: 70 });
      }
    }
  },

  saveBodyMetrics() {
    const wInput = document.getElementById('gym-body-weight');
    const bfInput = document.getElementById('gym-body-fat');
    if (!wInput && !bfInput) return;
    const weight = parseFloat(wInput && wInput.value) || 0;
    const bodyFat = parseFloat(bfInput && bfInput.value) || 0;
    if (!weight && !bodyFat) return;

    const metrics = DB.getBodyMetrics();
    const idx = metrics.entries.findIndex(e => e.date === this.selectedDate);
    const entry = { date: this.selectedDate, weight, bodyFat };
    if (idx >= 0) metrics.entries[idx] = entry;
    else metrics.entries.push(entry);
    // keep sorted & cap to 90 entries
    metrics.entries.sort((a, b) => a.date.localeCompare(b.date));
    if (metrics.entries.length > 90) metrics.entries = metrics.entries.slice(-90);
    DB.setBodyMetrics(metrics);
    this.renderBodyMetrics();
    if (typeof Utils !== 'undefined' && Utils.toast) Utils.toast('Body metrics saved', 'success');
  },

  /* ---------- reset ---------- */
  resetTodayData() {
    if (typeof Utils !== 'undefined' && Utils.confirm) {
      Utils.confirm('Reset Gym Data', 'Reset all of today\'s gym data? This cannot be undone.', () => this._doReset());
      return;
    }
    if (!confirm('Reset all of today\'s gym data?')) return;
    this._doReset();
  },

  _doReset() {
    DB.setGym(this.selectedDate, { exercises: [], sleep: { sleepTime: "", wakeTime: "", quality: "", duration: 0 }, diet: { meals: [], proteinGoal: 150, carbsGoal: 200, fatsGoal: 65, caloriesLevel: "moderate" }, water: { amount: 0, goal: 3000 } });
    this.renderAll();
    window.dispatchEvent(new CustomEvent('lamim:data-updated'));
    if (typeof Utils !== 'undefined' && Utils.toast) Utils.toast('Today reset', 'success');
  },

  formatTime12h(timeStr) {
    if (!timeStr) return '--:--';
    const [h, m] = timeStr.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 || 12;
    const out = `${hour12}:${String(m).padStart(2, '0')} ${period}`;
    return window.n ? window.n(out) : out;
  },

  /* ---------- PDF export (kept & updated) ---------- */
  exportPDF() {
    const year = this.selectedDate.slice(0, 4);
    const month = this.selectedDate.slice(5, 7);
    const monthName = new Date(year, month - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();

    let totalExercises = 0, totalSleepHrs = 0, sleepDays = 0;
    let totalHydrationPct = 0, hydrationDays = 0, loggedDaysCount = 0;
    const rows = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${month}-${String(day).padStart(2, '0')}`;
      const isFuture = dateStr > Utils.todayStr();
      const g = DB.getGym(dateStr);
      const exCount = (g.exercises || []).length;
      const sleep = g.sleep || {};
      let dur = 0;
      if (sleep.sleepTime && sleep.wakeTime) {
        const [sh, sm] = sleep.sleepTime.split(':').map(Number);
        const [wh, wm] = sleep.wakeTime.split(':').map(Number);
        let s = sh * 60 + sm, e = wh * 60 + wm;
        if (e <= s) e += 1440;
        dur = (e - s) / 60;
      }
      const water = (g.water && g.water.amount) || 0;
      const waterGoal = (g.water && g.water.goal) || 3000;
      const meals = (g.diet && g.diet.meals) || [];
      const foodIntake = meals.map(m => m.desc).join(', ') || '—';
      const recovery = this._calcRecoveryScore(sleep);

      const hasActivity = exCount > 0 || dur > 0 || water > 0 || meals.length > 0;

      if (!isFuture) {
        totalExercises += exCount;
        if (dur > 0) { totalSleepHrs += dur; sleepDays++; }
        const wpct = waterGoal ? (water / waterGoal) * 100 : 0;
        totalHydrationPct += wpct; hydrationDays++;
        if (hasActivity) loggedDaysCount++;
      }

      rows.push({
        day, exCount, dur, recovery, water, foodIntake, isFuture
      });
    }

    const avgSleep = sleepDays ? (totalSleepHrs / sleepDays).toFixed(1) : '0';
    const avgHydration = hydrationDays ? Math.round(totalHydrationPct / hydrationDays) : 0;
    const consistencyPct = Math.round((loggedDaysCount / daysInMonth) * 100);
    let consistencyTier = 'NEEDS WORK', consistencyColor = '#fbbf24';
    if (consistencyPct >= 80) { consistencyTier = 'EXCELLENT'; consistencyColor = '#34d399'; }
    else if (consistencyPct >= 50) { consistencyTier = 'GOOD'; consistencyColor = '#22d3ee'; }

    const rowHtml = rows.map(r => {
      if (r.isFuture) {
        return `<tr>
          <td style="padding:10px;border-bottom:1px solid #e2e8f0;font-weight:700;color:#94a3b8">${r.day}</td>
          <td style="padding:10px;border-bottom:1px solid #e2e8f0;text-align:center;color:#cbd5e1">—</td>
          <td style="padding:10px;border-bottom:1px solid #e2e8f0;text-align:center;color:#cbd5e1">—</td>
          <td style="padding:10px;border-bottom:1px solid #e2e8f0;text-align:center;color:#cbd5e1">—</td>
          <td style="padding:10px;border-bottom:1px solid #e2e8f0;text-align:center;color:#cbd5e1">—</td>
          <td style="padding:10px;border-bottom:1px solid #e2e8f0;text-align:left;color:#cbd5e1">—</td>
        </tr>`;
      }
      return `<tr>
        <td style="padding:10px;border-bottom:1px solid #e2e8f0;font-weight:700">${r.day}</td>
        <td style="padding:10px;border-bottom:1px solid #e2e8f0;text-align:center">${r.exCount}</td>
        <td style="padding:10px;border-bottom:1px solid #e2e8f0;text-align:center">${r.dur ? r.dur.toFixed(1) + 'h' : '—'}</td>
        <td style="padding:10px;border-bottom:1px solid #e2e8f0;text-align:center">${r.recovery || '—'}</td>
        <td style="padding:10px;border-bottom:1px solid #e2e8f0;text-align:center">${r.water} ml</td>
        <td style="padding:10px;border-bottom:1px solid #e2e8f0;text-align:left;max-width:250px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;" title="${r.foodIntake}">${r.foodIntake}</td>
      </tr>`;
    }).join('');

    const genDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    const win = window.open('', '_blank');
    if (!win) {
      if (typeof Utils !== 'undefined' && Utils.toast) Utils.toast('Please allow popups to export PDF', 'error');
      return;
    }
    win.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Gym & Diet Report — ${monthName}</title>
    <style>
      @page { size: A4; margin: 16mm; }
      * { box-sizing: border-box; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      body { font-family: 'Inter', 'Segoe UI', -apple-system, sans-serif; color: #1e293b; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; line-height: 1.5; }
      .header { position: relative; display: flex; justify-content: space-between; align-items: flex-end; padding: 26px 28px; margin-bottom: 26px; border-radius: 20px; overflow: hidden; background: linear-gradient(120deg, #0891b2 0%, #06b6d4 45%, #65a30d 100%); color: #fff; box-shadow: 0 14px 38px -16px rgba(8, 145, 178, 0.55); }
      .header::after { content: ''; position: absolute; top: -40%; right: -10%; width: 240px; height: 240px; background: radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%); }
      .logo { font-size: 26px; font-weight: 900; letter-spacing: 0.22em; position: relative; }
      .subtitle { font-size: 11px; color: rgba(255,255,255,0.82); font-weight: 600; letter-spacing: 0.14em; margin-top: 6px; }
      .meta { text-align: right; font-size: 12px; color: rgba(255,255,255,0.88); position: relative; }
      .meta strong { display: block; font-size: 17px; color: #fff; margin-bottom: 3px; font-weight: 800; letter-spacing: 0.02em; }
      .consistency { display: inline-block; padding: 5px 14px; border-radius: 999px; font-size: 11px; font-weight: 800; letter-spacing: 0.07em; background: ${consistencyColor}22; color: ${consistencyColor}; margin-bottom: 18px; border: 1px solid ${consistencyColor}55; }
      .summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin: 22px 0; }
      .sum-card { background: #fff; border-radius: 16px; padding: 18px 18px 16px; border: 1px solid #eef0f4; box-shadow: 0 6px 18px -10px rgba(15, 23, 42, 0.18); position: relative; overflow: hidden; }
      .sum-card::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: var(--c, #06b6d4); }
      .sum-card:nth-child(1) { --c: #0891b2; }
      .sum-card:nth-child(2) { --c: #0ea5e9; }
      .sum-card:nth-child(3) { --c: #22d3ee; }
      .sum-card:nth-child(4) { --c: #65a30d; }
      .sum-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; font-weight: 700; }
      .sum-val { font-size: 28px; font-weight: 800; color: #0f172a; margin-top: 8px; letter-spacing: -0.02em; }
      table { width: 100%; border-collapse: separate; border-spacing: 0; font-size: 12px; border: 1px solid #eef0f4; border-radius: 16px; overflow: hidden; }
      th { background: linear-gradient(180deg, #06b6d4, #0891b2); color: #fff; padding: 13px 14px; text-align: center; font-size: 10px; text-transform: uppercase; letter-spacing: 0.07em; font-weight: 700; }
      th:first-child { text-align: left; }
      th:last-child { text-align: left; }
      td { padding: 10px 14px; border-top: 1px solid #f1f5f9; }
      tbody tr:nth-child(even) { background: #fafbfc; }
      tbody tr:first-child td { border-top: none; }
      .footer { margin-top: 30px; padding-top: 18px; border-top: 1px solid #eef0f4; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #94a3b8; }
      .footer .quote { font-style: italic; }
      .footer .brand { font-weight: 800; letter-spacing: 0.12em; color: #0891b2; }
    </style></head><body>
    <div class="header">
      <div>
        <div class="logo">LAMIM</div>
        <div class="subtitle">TRAINING & RECOVERY · MONTHLY REPORT</div>
      </div>
      <div class="meta">
        <strong>${monthName}</strong>
        REF: GYM-${year}${month}
      </div>
    </div>
    <div class="consistency">${consistencyTier} · ${consistencyPct}% CONSISTENCY</div>
    <div class="summary">
      <div class="sum-card"><div class="sum-label">Total Exercises</div><div class="sum-val">${totalExercises}</div></div>
      <div class="sum-card"><div class="sum-label">Avg Sleep</div><div class="sum-val">${avgSleep}h</div></div>
      <div class="sum-card"><div class="sum-label">Avg Hydration</div><div class="sum-val">${avgHydration}%</div></div>
      <div class="sum-card"><div class="sum-label">Logged Days</div><div class="sum-val">${loggedDaysCount}</div></div>
    </div>
    <table>
      <thead><tr><th>Date</th><th>Exercises</th><th>Sleep</th><th>Recovery</th><th>Water</th><th>Logged Food Intake</th></tr></thead>
      <tbody>${rowHtml}</tbody>
    </table>
    <div class="footer">
      <span class="quote">"Take care of your body. It's the only place you have to live." — Jim Rohn</span>
      <span class="brand">LAMIM · ${genDate}</span>
    </div>
    <script>setTimeout(() => { window.print(); }, 800);</script>
    </body></html>`);
    win.document.close();
  }
};

window.Gym = Gym;
