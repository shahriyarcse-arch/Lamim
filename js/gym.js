const Gym = {
  selectedDate: '',

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
  },

  bindEvents() {
    const prev = document.getElementById('gym-prev-day');
    const next = document.getElementById('gym-next-day');
    if (prev && !prev.dataset.bound) {
      prev.dataset.bound = '1';
      prev.addEventListener('click', () => this.changeDay(-1));
    }
    if (next && !next.dataset.bound) {
      next.dataset.bound = '1';
      next.addEventListener('click', () => this.changeDay(1));
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
    setText('gym-stat-streak', n(streak));
    setText('gym-stat-streak-sub', streak === 1 ? 'day' : 'days');
    setText('gym-stat-vol', volume >= 1000 ? n((volume / 1000).toFixed(1)) + 'k' : n(Math.round(volume)));
    setText('gym-stat-vol-sub', 'kg lifted');
    setText('gym-stat-sleep', n(sleepDur.toFixed(1)));
    setText('gym-stat-sleep-sub', 'hours');
    setText('gym-stat-water', n(water));
    setText('gym-stat-water-sub', 'ml');
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
      const volume = sets * reps * w;
      const n = window.n ? window.n : (x => x);

      const div = document.createElement('div');
      div.className = 'gh-ex-item';
      div.innerHTML =
        `<div class="gh-ex-ico"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 6.5 17.5 17.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/><path d="m10.2 9-1.7 5.2 5.2-1.7"/><path d="M14.8 9l1.7 5.2-5.2 1.7"/></svg></div>` +
        `<div class="gh-ex-info">` +
          `<div class="gh-ex-name">${Utils.escapeHTML(ex.name)}${isPR ? '<span class="gh-ex-pr">PR</span>' : ''}</div>` +
          `<div class="gh-ex-meta">${n(sets)} sets · ${n(reps)} reps${w > 0 ? ' · ' + n(volume) + ' kg vol' : ' · Bodyweight'}</div>` +
        `</div>` +
        `${w > 0 ? `<div class="gh-ex-weight">${n(w)}<small style="font-size:10px;color:var(--gh-text-muted);font-weight:600"> kg</small></div>` : ''}` +
        `<button class="gh-ex-del" onclick="Gym.deleteExercise(${i})" title="Remove"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>`;
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
    this.updateSleepStats(sleep);
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

  /* ---------- diet / nutrition ---------- */
  renderDiet() {
    const data = DB.getGym(this.selectedDate);
    const diet = data.diet || {};
    const meals = diet.meals || [];
    const listEl = document.getElementById('gym-meals-list');
    const n = window.n ? window.n : (x => x);

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
              (m.protein ? `<span class="gh-meal-protein">${n(m.protein)}g</span>` : '') +
              (m.calories ? `<span class="gh-meal-cal">${n(m.calories)}</span>` : '') +
              `<button class="gh-meal-del" onclick="Gym.deleteMeal(${i})"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>` +
            `</div>`;
          listEl.appendChild(div);
        });
      }
    }

    // macros
    const protein = meals.reduce((s, m) => s + (Number(m.protein) || 0), 0);
    const carbs = meals.reduce((s, m) => s + (Number(m.carbs) || 0), 0);
    const fats = meals.reduce((s, m) => s + (Number(m.fats) || 0), 0);
    const cals = meals.reduce((s, m) => s + (Number(m.calories) || 0), 0);

    const pGoal = diet.proteinGoal || 150;
    const cGoal = diet.carbsGoal || 200;
    const fGoal = diet.fatsGoal || 65;

    this._renderMacroRing('protein', protein, pGoal);
    this._renderMacroRing('carbs', carbs, cGoal);
    this._renderMacroRing('fats', fats, fGoal);

    const pVal = document.getElementById('gym-protein-val');
    const cVal = document.getElementById('gym-carbs-val');
    const fVal = document.getElementById('gym-fats-val');
    if (pVal) pVal.textContent = n(protein) + 'g / ' + n(pGoal) + 'g';
    if (cVal) cVal.textContent = n(carbs) + 'g / ' + n(cGoal) + 'g';
    if (fVal) fVal.textContent = n(fats) + 'g / ' + n(fGoal) + 'g';

    const calEl = document.getElementById('gym-calories-val');
    if (calEl) calEl.textContent = n(cals) + ' kcal';
  },

  _renderMacroRing(which, val, goal) {
    const wrap = document.getElementById('gym-macro-' + which);
    const center = document.getElementById('gym-macro-' + which + '-center');
    if (!wrap || !window.Charts) return;
    const pct = goal ? Math.min(100, (val / goal) * 100) : 0;
    Charts.ring(wrap, { size: 92, thickness: 8, value: pct, color: 'currentColor', colorEnd: 'currentColor' });
    if (center) center.innerHTML = `<span class="gh-macro-ring-val">${window.n ? window.n(Math.round(val)) : Math.round(val)}</span><span class="gh-macro-ring-goal">/ ${window.n ? window.n(goal) : goal}g</span>`;
  },

  openMealModal() {
    if (document.getElementById('gh-meal-modal')) return;
    const overlay = document.createElement('div');
    overlay.className = 'gh-modal-overlay';
    overlay.id = 'gh-meal-modal';
    overlay.innerHTML =
      `<div class="gh-modal" onclick="event.stopPropagation()">` +
        `<h3>Add Meal</h3>` +
        `<div class="gh-modal-field"><label class="gh-meta-label">Description</label><input type="text" class="gh-input" id="gh-meal-desc" placeholder="e.g. Grilled chicken salad"></div>` +
        `<div class="gh-modal-row">` +
          `<div class="gh-modal-field"><label class="gh-meta-label">Protein (g)</label><input type="number" class="gh-input-sm" id="gh-meal-protein" placeholder="0" min="0"></div>` +
          `<div class="gh-modal-field"><label class="gh-meta-label">Calories</label><input type="number" class="gh-input-sm" id="gh-meal-cal" placeholder="0" min="0"></div>` +
        `</div>` +
        `<div class="gh-modal-row">` +
          `<div class="gh-modal-field"><label class="gh-meta-label">Carbs (g)</label><input type="number" class="gh-input-sm" id="gh-meal-carbs" placeholder="0" min="0"></div>` +
          `<div class="gh-modal-field"><label class="gh-meta-label">Fats (g)</label><input type="number" class="gh-input-sm" id="gh-meal-fats" placeholder="0" min="0"></div>` +
        `</div>` +
        `<div class="gh-modal-field"><label class="gh-meta-label">Meal type</label>` +
          `<div class="gh-seg" id="gh-meal-seg">` +
            `<button class="gh-seg-btn" data-type="breakfast">Breakfast</button>` +
            `<button class="gh-seg-btn active" data-type="lunch">Lunch</button>` +
            `<button class="gh-seg-btn" data-type="dinner">Dinner</button>` +
            `<button class="gh-seg-btn" data-type="snack">Snack</button>` +
          `</div>` +
        `</div>` +
        `<div class="gh-modal-actions">` +
          `<button class="gh-btn gh-btn-ghost" onclick="Gym.closeMealModal()">Cancel</button>` +
          `<button class="gh-btn gh-btn-primary" onclick="Gym.submitMeal()">Add Meal</button>` +
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
    if (!desc) { if (typeof Utils !== 'undefined' && Utils.toast) Utils.toast('Enter a description', 'error'); return; }
    const protein = parseFloat((document.getElementById('gh-meal-protein') || {}).value) || 0;
    const calories = parseFloat((document.getElementById('gh-meal-cal') || {}).value) || 0;
    const carbs = parseFloat((document.getElementById('gh-meal-carbs') || {}).value) || 0;
    const fats = parseFloat((document.getElementById('gh-meal-fats') || {}).value) || 0;
    const active = document.querySelector('#gh-meal-modal .gh-seg-btn.active');
    const type = active ? active.dataset.type : 'snack';
    this.addMeal(desc, protein, calories, type, carbs, fats);
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

    const ringWrap = document.getElementById('gym-water-ring-svg');
    const valEl = document.getElementById('gym-water-amount-val');
    const pctEl = document.getElementById('gym-water-pct');
    const goalEl = document.getElementById('gym-water-goal');

    if (ringWrap && window.Charts) {
      Charts.ring(ringWrap, { size: 96, thickness: 8, value: pct, color: 'currentColor', colorEnd: '#0ea5e9' });
    }
    if (valEl) valEl.innerHTML = `${n(water.amount)}<small>ml</small>`;
    if (pctEl) pctEl.textContent = n(Math.round(pct)) + '%';
    if (goalEl) goalEl.textContent = 'of ' + n(water.goal) + ' ml';

    // 7-day trend
    const trendEl = document.getElementById('gym-water-trend');
    if (trendEl && window.Charts) {
      const data7 = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(this.selectedDate + 'T00:00:00');
        d.setDate(d.getDate() - i);
        const g = DB.getGym(Utils.dateStr(d));
        data7.push({ label: '', value: ((g.water && g.water.amount) || 0) });
      }
      Charts.barChart(trendEl, data7, { color: 'var(--gh-water)', height: 50 });
    }
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
    let totalHydrationPct = 0, hydrationDays = 0, totalProtein = 0, totalCalories = 0;
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
      const protein = meals.reduce((s, m) => s + (Number(m.protein) || 0), 0);
      const cals = meals.reduce((s, m) => s + (Number(m.calories) || 0), 0);
      const recovery = this._calcRecoveryScore(sleep);

      if (!isFuture) {
        totalExercises += exCount;
        if (dur > 0) { totalSleepHrs += dur; sleepDays++; }
        const wpct = waterGoal ? (water / waterGoal) * 100 : 0;
        totalHydrationPct += wpct; hydrationDays++;
        totalProtein += protein; totalCalories += cals;
      }

      rows.push({
        day, exCount, dur, recovery, water, protein, cals, isFuture
      });
    }

    const avgSleep = sleepDays ? (totalSleepHrs / sleepDays).toFixed(1) : '0';
    const avgHydration = hydrationDays ? Math.round(totalHydrationPct / hydrationDays) : 0;
    const activeDays = sleepDays;
    const consistencyPct = Math.round((activeDays / daysInMonth) * 100);
    let consistencyTier = 'NEEDS WORK', consistencyColor = '#fbbf24';
    if (consistencyPct >= 80) { consistencyTier = 'EXCELLENT'; consistencyColor = '#34d399'; }
    else if (consistencyPct >= 50) { consistencyTier = 'GOOD'; consistencyColor = '#22d3ee'; }

    const rowHtml = rows.map(r => {
      if (r.isFuture) return `<tr><td colspan="7" style="text-align:center;color:#94a3b8;font-style:italic;padding:8px">Not yet</td></tr>`;
      return `<tr>
        <td style="padding:10px;border-bottom:1px solid #e2e8f0;font-weight:700">${r.day}</td>
        <td style="padding:10px;border-bottom:1px solid #e2e8f0;text-align:center">${r.exCount}</td>
        <td style="padding:10px;border-bottom:1px solid #e2e8f0;text-align:center">${r.dur ? r.dur.toFixed(1) + 'h' : '—'}</td>
        <td style="padding:10px;border-bottom:1px solid #e2e8f0;text-align:center">${r.recovery || '—'}</td>
        <td style="padding:10px;border-bottom:1px solid #e2e8f0;text-align:center">${r.water} ml</td>
        <td style="padding:10px;border-bottom:1px solid #e2e8f0;text-align:center">${r.protein}g</td>
        <td style="padding:10px;border-bottom:1px solid #e2e8f0;text-align:center">${r.cals}</td>
      </tr>`;
    }).join('');

    const win = window.open('', '_blank');
    if (!win) {
      if (typeof Utils !== 'undefined' && Utils.toast) Utils.toast('Please allow popups to export PDF', 'error');
      return;
    }
    win.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Gym & Diet Report — ${monthName}</title>
    <style>
      @page { size: A4; margin: 16mm; }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'Inter', -apple-system, sans-serif; color: #0f172a; background: #fff; }
      .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #22d3ee; padding-bottom: 16px; margin-bottom: 20px; }
      .logo { font-size: 22px; font-weight: 900; letter-spacing: 0.18em; background: linear-gradient(135deg, #06b6d4, #a3e635); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
      .subtitle { font-size: 11px; color: #64748b; font-weight: 700; letter-spacing: 0.05em; }
      .meta { text-align: right; font-size: 12px; color: #475569; }
      .meta strong { display: block; font-size: 15px; color: #0f172a; margin-bottom: 2px; }
      h1 { font-size: 24px; font-weight: 800; margin-bottom: 4px; }
      .summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 20px 0; }
      .sum-card { background: #f8fafc; border-radius: 14px; padding: 16px; border: 1px solid #e2e8f0; }
      .sum-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; font-weight: 700; }
      .sum-val { font-size: 22px; font-weight: 800; color: #0891b2; margin-top: 4px; }
      .consistency { display: inline-block; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 800; letter-spacing: 0.06em; background: ${consistencyColor}22; color: ${consistencyColor}; margin-bottom: 14px; }
      table { width: 100%; border-collapse: collapse; font-size: 12px; }
      th { background: #f1f5f9; padding: 10px; text-align: center; font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; }
      th:first-child { text-align: left; }
      .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 11px; color: #94a3b8; font-style: italic; }
    </style></head><body>
    <div class="header">
      <div>
        <div class="logo">LAMIM</div>
        <div class="subtitle">GYM & DIET · MONTHLY REPORT</div>
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
      <div class="sum-card"><div class="sum-label">Total Protein</div><div class="sum-val">${totalProtein}g</div></div>
    </div>
    <table>
      <thead><tr><th>Date</th><th>Exercises</th><th>Sleep</th><th>Recovery</th><th>Water</th><th>Protein</th><th>Calories</th></tr></thead>
      <tbody>${rowHtml}</tbody>
    </table>
    <div class="footer">"Take care of your body. It's the only place you have to live." — Jim Rohn</div>
    <script>setTimeout(() => { window.print(); }, 800);</script>
    </body></html>`);
    win.document.close();
  }
};

window.Gym = Gym;
