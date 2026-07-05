const Gym = {
  selectedDate: '',

  _icons: {
    dumbbell: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 6.5 17.5 17.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/><path d="m10.2 9-1.7 5.2 5.2-1.7"/><path d="M14.8 9l1.7 5.2-5.2 1.7"/></svg>',
    moon: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    droplet: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5S12 2 12 2 9 6.5 8 9.5a7 7 0 0 0 4 12.5z"/></svg>'
  },

  init() {
    this.selectedDate = Utils.todayStr();
    this.renderAll();
    this.bindEvents();
  },

  renderAll() {
    this.renderHeader();
    this.renderStatsSummary();
    this.renderExercises();
    this.renderSleep();
    this.renderDiet();
    this.renderWater();
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
      prev.addEventListener('click', () => this.changeDay(-1));
      prev.dataset.bound = 'true';
    }
    if (next && !next.dataset.bound) {
      next.addEventListener('click', () => this.changeDay(1));
      next.dataset.bound = 'true';
    }

    const nameInput = document.getElementById('gym-exercise-name');
    if (nameInput && !nameInput.dataset.bound) {
      nameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.addExercise();
      });
      nameInput.dataset.bound = 'true';
    }
  },

  changeDay(offset) {
    const d = new Date(this.selectedDate + 'T00:00:00');
    d.setDate(d.getDate() + offset);
    const targetStr = Utils.dateStr(d);
    if (targetStr <= Utils.todayStr()) {
      this.selectedDate = targetStr;
      this.renderAll();
    }
  },

  /* ==== STATS SUMMARY ==== */
  renderStatsSummary() {
    const container = document.getElementById('gym-stats-summary');
    if (!container) return;

    const data = DB.getGym(this.selectedDate);
    const exercises = data.exercises || [];
    const sleep = data.sleep || {};
    const water = data.water || { amount: 0, goal: 3000 };

    const exerciseCount = exercises.length;
    const sleepScore = (sleep.sleepTime && sleep.wakeTime)
      ? this._calcRecoveryScore(sleep)
      : null;
    const waterPct = water.goal > 0 ? Math.round((water.amount / water.goal) * 100) : 0;

    const n = window.n || (v => v);

    container.innerHTML = `
      <div class="gym-stat-pill">
        <span class="stat-icon">${this._icons.dumbbell}</span>
        <span class="stat-value">${n(exerciseCount)}</span>
        <span class="stat-label">Exercises</span>
      </div>
      <div class="gym-stat-pill">
        <span class="stat-icon">${this._icons.moon}</span>
        <span class="stat-value">${sleepScore !== null ? n(sleepScore) + '%' : '--'}</span>
        <span class="stat-label">Recovery</span>
      </div>
      <div class="gym-stat-pill">
        <span class="stat-icon">${this._icons.droplet}</span>
        <span class="stat-value">${n(waterPct)}%</span>
        <span class="stat-label">Hydration</span>
      </div>
    `;
  },

  _calcRecoveryScore(sleep) {
    if (!sleep || !sleep.sleepTime || !sleep.wakeTime) return null;
    const duration = sleep.duration || 0;
    let baseScore = 50;
    if (duration >= 7 && duration <= 9) baseScore = 85;
    else if (duration >= 6 && duration < 7) baseScore = 70;
    else if (duration > 9 && duration <= 10) baseScore = 75;
    else baseScore = 45;
    const qualityModifiers = { restless: -15, light: 0, deep: 15 };
    const quality = sleep.quality || 'light';
    return Math.max(0, Math.min(100, baseScore + (qualityModifiers[quality] || 0)));
  },

  /* ==== EXERCISE LOGGER ==== */
  renderExercises() {
    const data = DB.getGym(this.selectedDate);
    const exercises = data.exercises || [];

    const list = document.getElementById('gym-exercise-list');
    const empty = document.getElementById('gym-exercise-empty');
    if (!list || !empty) return;

    if (exercises.length === 0) {
      list.innerHTML = '';
      empty.style.display = 'flex';
      return;
    }

    empty.style.display = 'none';
    list.innerHTML = exercises.map((ex, idx) => {
      const totalVol = (ex.sets || 0) * (ex.reps || 0) * (ex.weight || 0);
      return `
      <div class="gym-exercise-item" style="animation-delay:${idx * 0.04}s">
        <div class="gym-exercise-info">
          <span class="gym-exercise-name">${Utils.escapeHTML(ex.name)}</span>
          <span class="gym-exercise-meta">${ex.sets} × ${ex.reps} reps · ${totalVol > 0 ? totalVol + ' kg total' : 'bodyweight'}</span>
        </div>
        <div class="gym-exercise-right">
          <span class="gym-exercise-weight">${ex.weight > 0 ? ex.weight + ' kg' : 'BW'}</span>
          <button class="gym-exercise-del" onclick="Gym.deleteExercise(${idx})" title="Remove">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
      </div>`;
    }).join('');
  },

  addExercise() {
    const nameInput = document.getElementById('gym-exercise-name');
    const setsInput = document.getElementById('gym-exercise-sets');
    const repsInput = document.getElementById('gym-exercise-reps');
    const weightInput = document.getElementById('gym-exercise-weight');

    if (!nameInput) return;

    const name = nameInput.value.trim();
    if (!name) {
      Utils.toast('Enter an exercise name', 'error');
      nameInput.focus();
      return;
    }

    const sets = parseInt(setsInput?.value, 10) || 3;
    const reps = parseInt(repsInput?.value, 10) || 10;
    const weight = parseInt(weightInput?.value, 10) || 0;

    const data = DB.getGym(this.selectedDate);
    if (!data.exercises) data.exercises = [];

    data.exercises.push({ name, sets, reps, weight });
    DB.setGym(this.selectedDate, data);

    nameInput.value = '';
    nameInput.focus();

    this.renderExercises();
    this.renderStatsSummary();
    window.dispatchEvent(new CustomEvent('lamim:data-updated'));
  },

  deleteExercise(idx) {
    const data = DB.getGym(this.selectedDate);
    if (data.exercises) {
      data.exercises.splice(idx, 1);
      DB.setGym(this.selectedDate, data);
      this.renderExercises();
      this.renderStatsSummary();
      window.dispatchEvent(new CustomEvent('lamim:data-updated'));
    }
  },

  /* ==== SLEEP LOGGER ==== */
  renderSleep() {
    const data = DB.getGym(this.selectedDate);
    const sleep = data.sleep || { sleepTime: '', wakeTime: '', quality: 'light', duration: 0 };

    const sleepInput = document.getElementById('gym-sleep-time');
    const wakeInput = document.getElementById('gym-wake-time');
    const qualitySelect = document.getElementById('gym-sleep-quality');

    if (sleepInput) sleepInput.value = sleep.sleepTime || '';
    if (wakeInput) wakeInput.value = sleep.wakeTime || '';
    if (qualitySelect) qualitySelect.value = sleep.quality || 'light';

    this.updateSleepStats(sleep);
  },

  updateSleepStats(sleep) {
    const durEl = document.getElementById('gym-sleep-duration-val');
    const scoreEl = document.getElementById('gym-recovery-score-val');
    const badgeEl = document.getElementById('gym-recovery-badge');

    if (!sleep.sleepTime || !sleep.wakeTime) {
      if (durEl) durEl.textContent = '--';
      if (scoreEl) scoreEl.textContent = '--';
      if (badgeEl) {
        badgeEl.textContent = 'PENDING';
        badgeEl.className = 'gym-recovery-badge pending';
      }
      return;
    }

    const t1 = sleep.sleepTime.split(':');
    const t2 = sleep.wakeTime.split(':');
    let h1 = parseInt(t1[0], 10), m1 = parseInt(t1[1], 10);
    let h2 = parseInt(t2[0], 10), m2 = parseInt(t2[1], 10);

    let diffMin = (h2 * 60 + m2) - (h1 * 60 + m1);
    if (diffMin < 0) diffMin += 24 * 60;

    const duration = parseFloat((diffMin / 60).toFixed(1));
    sleep.duration = duration;

    const score = this._calcRecoveryScore(sleep) || 0;

    if (durEl) durEl.textContent = `${window.n ? window.n(duration) : duration} hrs`;
    if (scoreEl) scoreEl.textContent = `${window.n ? window.n(score) : score}%`;

    if (badgeEl) {
      if (score >= 80) {
        badgeEl.textContent = 'EXCELLENT';
        badgeEl.className = 'gym-recovery-badge excellent';
      } else if (score >= 60) {
        badgeEl.textContent = 'GOOD';
        badgeEl.className = 'gym-recovery-badge good';
      } else {
        badgeEl.textContent = 'POOR';
        badgeEl.className = 'gym-recovery-badge poor';
      }
    }

    const data = DB.getGym(this.selectedDate);
    if (JSON.stringify(data.sleep) !== JSON.stringify(sleep)) {
      data.sleep = sleep;
      DB.setGym(this.selectedDate, data);
    }
  },

  onSleepInputChange() {
    const sleepInput = document.getElementById('gym-sleep-time');
    const wakeInput = document.getElementById('gym-wake-time');
    const qualitySelect = document.getElementById('gym-sleep-quality');

    if (!sleepInput || !wakeInput) return;

    const sleep = {
      sleepTime: sleepInput.value,
      wakeTime: wakeInput.value,
      quality: qualitySelect ? qualitySelect.value : 'light',
      duration: 0
    };

    this.updateSleepStats(sleep);
    this.renderStatsSummary();
  },

  /* ==== DIET & MEAL LOGS ==== */
  renderDiet() {
    const data = DB.getGym(this.selectedDate);
    const meals = data.diet?.meals || [];
    const targetProtein = data.diet?.proteinGoal || 150;

    const container = document.getElementById('gym-meals-list');
    if (!container) return;

    if (meals.length === 0) {
      container.innerHTML = `
        <div style="text-align:center;padding:16px;color:var(--color-text-muted);font-size:12px;font-weight:700">
          ${window.t ? window.t('No meals logged today.') : 'No meals logged today.'}
        </div>
      `;
    } else {
      container.innerHTML = meals.map((m, idx) => `
        <div class="gym-meal-item">
          <div style="display:flex;flex-direction:column;gap:2px">
            <span class="gym-meal-desc">${Utils.escapeHTML(m.desc)}</span>
            <span class="gym-meal-meta">${m.type.toUpperCase()}</span>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <div style="text-align:right">
              <div class="gym-meal-val">${window.n ? window.n(m.protein) : m.protein}g P</div>
              <div class="gym-meal-meta">${window.n ? window.n(m.calories) : m.calories} kcal</div>
            </div>
            <button class="gym-meal-del-btn" onclick="Gym.deleteMeal(${idx})">×</button>
          </div>
        </div>
      `).join('');
    }

    const totalProtein = meals.reduce((acc, m) => acc + (m.protein || 0), 0);
    const totalCalories = meals.reduce((acc, m) => acc + (m.calories || 0), 0);

    const proteinProg = document.getElementById('gym-protein-progress');
    const proteinVal = document.getElementById('gym-protein-val');
    const caloriesVal = document.getElementById('gym-calories-val');

    if (proteinProg) {
      proteinProg.style.width = `${Math.min(100, (totalProtein / targetProtein) * 100)}%`;
    }
    if (proteinVal) {
      proteinVal.textContent = `${window.n ? window.n(totalProtein) : totalProtein}g / ${window.n ? window.n(targetProtein) : targetProtein}g`;
    }
    if (caloriesVal) {
      caloriesVal.textContent = `${window.n ? window.n(totalCalories) : totalCalories} kcal`;
    }
  },

  addMealPrompt() {
    const desc = prompt('Enter meal description (e.g. Eggs and Oats):');
    if (!desc) return;
    const protein = parseInt(prompt('Enter protein amount (g):'), 10) || 0;
    const calories = parseInt(prompt('Enter calories (kcal):'), 10) || 0;
    const type = prompt('Meal type (breakfast/lunch/dinner/snack):') || 'snack';
    this.addMeal(desc.trim(), protein, calories, type.toLowerCase());
  },

  addMealPreset(desc, protein, calories, type) {
    this.addMeal(desc, protein, calories, type);
  },

  addMeal(desc, protein, calories, type) {
    const data = DB.getGym(this.selectedDate);
    if (!data.diet) data.diet = { meals: [], proteinGoal: 150, caloriesLevel: 'moderate' };
    if (!data.diet.meals) data.diet.meals = [];

    data.diet.meals.push({ desc, protein, calories, type });
    DB.setGym(this.selectedDate, data);
    this.renderDiet();
    this.renderStatsSummary();
    window.dispatchEvent(new CustomEvent('lamim:data-updated'));
  },

  deleteMeal(idx) {
    const data = DB.getGym(this.selectedDate);
    if (data.diet && data.diet.meals) {
      data.diet.meals.splice(idx, 1);
      DB.setGym(this.selectedDate, data);
      this.renderDiet();
      this.renderStatsSummary();
      window.dispatchEvent(new CustomEvent('lamim:data-updated'));
    }
  },

  /* ==== WATER TRACKER ==== */
  renderWater() {
    const data = DB.getGym(this.selectedDate);
    const water = data.water || { amount: 0, goal: 3000 };
    const pct = Math.min(100, (water.amount / water.goal) * 100);

    const amountEl = document.getElementById('gym-water-amount-val');
    const pctEl = document.getElementById('gym-water-pct');
    const wave = document.getElementById('gym-water-wave');
    const cup = document.querySelector('.gym-water-cup');

    if (amountEl) amountEl.textContent = `${window.n ? window.n(water.amount) : water.amount} ml`;
    if (pctEl) pctEl.textContent = `${Math.round(pct)}%`;
    if (wave) wave.style.top = `${100 - pct}%`;
    if (cup) cup.classList.toggle('gym-water-full', water.amount >= water.goal);
  },

  addWater(amount) {
    const data = DB.getGym(this.selectedDate);
    if (!data.water) data.water = { amount: 0, goal: 3000 };
    data.water.amount = Math.max(0, data.water.amount + amount);
    DB.setGym(this.selectedDate, data);
    this.renderWater();
    this.renderStatsSummary();
    window.dispatchEvent(new CustomEvent('lamim:data-updated'));
  },

  /* ---- Export Monthly PDF ---- */
  exportPDF() {
    const [yearStr, monthStr] = this.selectedDate.split('-');
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10) - 1;
    const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let totalExercises = 0;
    let totalSleepHrs = 0;
    let sleepDays = 0;
    let totalHydrationPct = 0;
    let hydrationDays = 0;
    let totalProtein = 0;
    let totalCalories = 0;
    let tableRows = '';

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
      const data = DB.getGym(dateStr);
      const exercises = data.exercises || [];
      const sleep = data.sleep || {};
      const water = data.water || { amount: 0, goal: 3000 };
      const diet = data.diet || { meals: [], proteinGoal: 150 };
      const meals = diet.meals || [];

      const exCount = exercises.length;
      totalExercises += exCount;

      let sleepHrs = '--';
      let recoveryScore = '--';
      if (sleep.sleepTime && sleep.wakeTime) {
        const t1 = sleep.sleepTime.split(':');
        const t2 = sleep.wakeTime.split(':');
        let h1 = parseInt(t1[0], 10), m1 = parseInt(t1[1], 10);
        let h2 = parseInt(t2[0], 10), m2 = parseInt(t2[1], 10);
        let diffMin = (h2 * 60 + m2) - (h1 * 60 + m1);
        if (diffMin < 0) diffMin += 24 * 60;
        sleepHrs = (diffMin / 60).toFixed(1);
        const duration = parseFloat(sleepHrs);
        let score = 50;
        if (duration >= 7 && duration <= 9) score = 85;
        else if (duration >= 6 && duration < 7) score = 70;
        else if (duration > 9 && duration <= 10) score = 75;
        else score = 45;
        const qm = { restless: -15, light: 0, deep: 15 };
        score = Math.max(0, Math.min(100, score + (qm[sleep.quality] || 0)));
        recoveryScore = score;
        totalSleepHrs += duration;
        sleepDays++;
      }

      const waterPct = water.goal > 0 ? Math.round((water.amount / water.goal) * 100) : 0;
      totalHydrationPct += waterPct;
      if (waterPct > 0) hydrationDays++;

      const dayProtein = meals.reduce((a, m) => a + (m.protein || 0), 0);
      const dayCalories = meals.reduce((a, m) => a + (m.calories || 0), 0);
      totalProtein += dayProtein;
      totalCalories += dayCalories;

      const dayOfWeek = new Date(year, month, d).toLocaleDateString('en-US', { weekday: 'short' });
      const isFuture = dateStr > Utils.todayStr();
      const rowClass = (d % 2 === 0) ? 'row-alt' : '';

      if (isFuture) {
        tableRows += '<tr class="' + rowClass + '"><td class="cell-date"><span class="date-day">' + d + '</span><span class="date-weekday">' + dayOfWeek + '</span></td><td colspan="6" class="cell-empty" style="text-align:center;font-style:italic">Not yet</td></tr>';
      } else {
        tableRows += '<tr class="' + rowClass + '">'
          + '<td class="cell-date"><span class="date-day">' + d + '</span><span class="date-weekday">' + dayOfWeek + '</span></td>'
          + '<td>' + exCount + '</td>'
          + '<td>' + sleepHrs + 'h</td>'
          + '<td>' + (recoveryScore !== '--' ? recoveryScore + '%' : '--') + '</td>'
          + '<td>' + waterPct + '%</td>'
          + '<td>' + dayProtein + 'g</td>'
          + '<td>' + dayCalories + '</td>'
          + '</tr>';
      }
    }

    const avgSleep = sleepDays > 0 ? (totalSleepHrs / sleepDays).toFixed(1) : '--';
    const avgHydration = hydrationDays > 0 ? Math.round(totalHydrationPct / hydrationDays) : '--';
    const user = DB.getUser() || { name: 'LAMIM User' };
    const generatedDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    let consistencyScore = 'NEEDS WORK';
    let consistencyColor = '#d97706';
    let consistencyBg = '#fffbeb';
    let consistencyBorder = '#fde68a';
    const gymDays = daysInMonth - new Date(year, month + 1, 0, 23, 59).getDate(); // simple
    const activeDays = sleepDays; // proxy for active tracking
    const activePct = daysInMonth > 0 ? Math.round((activeDays / daysInMonth) * 100) : 0;
    if (activePct >= 80) {
      consistencyScore = 'EXCELLENT';
      consistencyColor = '#059669';
      consistencyBg = '#ecfdf5';
      consistencyBorder = '#a7f3d0';
    } else if (activePct >= 50) {
      consistencyScore = 'GOOD';
      consistencyColor = '#0891b2';
      consistencyBg = '#ecfeff';
      consistencyBorder = '#a5f3fc';
    }

    const css = `
      @page { size: A4; margin: 0; }
      * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #ffffff; color: #0f172a; font-size: 10px; line-height: 1.4; }
      .page { max-width: 210mm; margin: 0 auto; padding: 28px 32px; }
      .report-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 20px; border-bottom: 2px solid #e2e8f0; margin-bottom: 22px; }
      .brand-section { display: flex; align-items: center; gap: 14px; }
      .brand-logo { width: 42px; height: 42px; background: linear-gradient(135deg, #3b82f6, #6366f1); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 17px; font-weight: 900; letter-spacing: -1px; }
      .brand-text h1 { font-size: 20px; font-weight: 800; letter-spacing: -0.5px; color: #0f172a; line-height: 1.1; }
      .brand-text p { font-size: 9px; color: #64748b; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; margin-top: 3px; }
      .report-meta { text-align: right; }
      .report-meta .user-name { font-size: 14px; font-weight: 700; color: #0f172a; }
      .report-meta .report-period { font-size: 11px; color: #3b82f6; font-weight: 700; margin-top: 2px; }
      .report-meta .report-ref { font-size: 8px; color: #94a3b8; margin-top: 5px; font-family: 'SF Mono', 'Fira Code', monospace; letter-spacing: 0.5px; }
      .report-meta .report-date { font-size: 8px; color: #94a3b8; margin-top: 2px; }
      .summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 24px; }
      .summary-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 10px; text-align: center; }
      .summary-card.primary { background: ${consistencyBg}; border-color: ${consistencyBorder}; }
      .summary-card .card-value { font-size: 26px; font-weight: 800; color: #0f172a; line-height: 1; }
      .summary-card.primary .card-value { color: ${consistencyColor}; }
      .summary-card .card-badge { display: inline-block; font-size: 7px; font-weight: 800; letter-spacing: 1.2px; padding: 3px 8px; border-radius: 6px; margin-top: 6px; background: ${consistencyBg}; color: ${consistencyColor}; border: 1px solid ${consistencyBorder}; }
      .summary-card .card-title { font-size: 8px; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; margin-top: 8px; }
      .section-title { font-size: 10px; font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #e2e8f0; }
      .data-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; table-layout: fixed; }
      .data-table thead th { font-size: 7px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #475569; padding: 10px 4px; border-bottom: 2px solid #0f172a; text-align: center; background: #f8fafc; }
      .data-table thead th:first-child { text-align: left; padding-left: 12px; width: 14%; }
      .data-table tbody tr { border-bottom: 1px solid #f1f5f9; }
      .data-table tbody tr.row-alt { background: #fafbfd; }
      .data-table tbody td { padding: 6px 4px; text-align: center; vertical-align: middle; font-size: 9px; }
      .data-table tbody td:first-child { text-align: left; padding-left: 12px; }
      .cell-date { display: flex; align-items: baseline; gap: 5px; }
      .date-day { font-size: 11px; font-weight: 700; color: #0f172a; }
      .date-weekday { font-size: 7px; color: #94a3b8; font-weight: 600; }
      .cell-empty { color: #cbd5e1; font-size: 9px; }
      .report-footer { padding-top: 16px; border-top: 1px solid #e2e8f0; }
      .quote-box { background: linear-gradient(135deg, #eff6ff, #eef2ff); border-left: 3px solid #3b82f6; padding: 12px 16px; border-radius: 0 10px 10px 0; margin-bottom: 14px; }
      .quote-text { font-size: 10px; color: #475569; font-style: italic; line-height: 1.6; }
      .quote-ref { font-size: 9px; color: #3b82f6; font-weight: 600; margin-top: 4px; font-style: normal; }
      .footer-brand { display: flex; justify-content: space-between; align-items: center; }
      .footer-left { font-size: 8px; color: #94a3b8; letter-spacing: 0.5px; }
      .footer-right { font-size: 8px; color: #94a3b8; font-weight: 600; }
      @media print { body { padding: 0; } .page { padding: 20mm 18mm; } .summary-card { break-inside: avoid; } .data-table thead { display: table-row-group; } .data-table tbody tr { break-inside: avoid; } }
    `;

    const bodyHTML = `
      <div class="page">
        <div class="report-header">
          <div class="brand-section">
            <div class="brand-logo">L</div>
            <div class="brand-text">
              <h1>LAMIM</h1>
              <p>Gym & Diet Report</p>
            </div>
          </div>
          <div class="report-meta">
            <div class="user-name">${user.name}</div>
            <div class="report-period">${monthName} ${year}</div>
            <div class="report-ref">REF: ${Date.now().toString(36).toUpperCase()}</div>
            <div class="report-date">Generated: ${generatedDate}</div>
          </div>
        </div>

        <div class="summary-grid">
          <div class="summary-card primary">
            <div class="card-value">${activePct}%</div>
            <div class="card-badge">${consistencyScore}</div>
            <div class="card-title">Tracking Consistency</div>
          </div>
          <div class="summary-card">
            <div class="card-value">${totalExercises}</div>
            <div class="card-title">Exercises Logged</div>
          </div>
          <div class="summary-card">
            <div class="card-value">${avgSleep !== '--' ? avgSleep + 'h' : '--'}</div>
            <div class="card-title">Avg Sleep Duration</div>
          </div>
          <div class="summary-card">
            <div class="card-value">${avgHydration !== '--' ? avgHydration + '%' : '--'}</div>
            <div class="card-title">Avg Hydration</div>
          </div>
        </div>

        <div class="section-title">Daily Fitness Log — ${monthName} ${year}</div>

        <table class="data-table">
          <thead>
            <tr>
              <th style="width:15%">Date</th>
              <th style="width:14%">Exercises</th>
              <th style="width:14%">Sleep</th>
              <th style="width:14%">Recovery</th>
              <th style="width:14%">Water</th>
              <th style="width:14%">Protein</th>
              <th style="width:15%">Calories</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>

        <div class="report-footer">
          <div class="quote-box">
            <div class="quote-text">"Take care of your body. It's the only place you have to live."</div>
            <div class="quote-ref">— Jim Rohn</div>
          </div>
          <div class="footer-brand">
            <div class="footer-left">LAMIM ECOSYSTEM • SECURE REPORT</div>
            <div class="footer-right">v4.0.0</div>
          </div>
        </div>
      </div>
    `;

    const fullHTML = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>LAMIM - Gym & Diet Report ' + monthName + ' ' + year + '</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"><style>' + css + '</style></head><body>' + bodyHTML + '</body></html>';

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      Utils.toast('Popup blocked. Please allow popups and try again.', 'error');
      return;
    }
    printWindow.document.open();
    printWindow.document.write(fullHTML);
    printWindow.document.close();
    setTimeout(function() {
      printWindow.focus();
      printWindow.print();
    }, 1000);
  }
};
