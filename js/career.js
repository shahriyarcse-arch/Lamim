const Career = {
  selectedDate: '',
  _timerRAF: null,

  _icons: {
    clock: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    flame: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
    code: '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    book: '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a1 1 0 0 1 0-5H20"/></svg>',
    globe: '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    trending: '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
    brain: '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>'
  },

  _catOptions: [
    { key: 'coding', label: 'Coding', icon: 'code' },
    { key: 'reading', label: 'Reading', icon: 'book' },
    { key: 'language', label: 'Language', icon: 'globe' },
    { key: 'business', label: 'Business', icon: 'trending' },
    { key: 'general', label: 'General', icon: 'brain' }
  ],

  _suggestedGoals: [
    '30 min LeetCode', 'Read 10 pages', '1 hr deep work', 'Review notes', 'Watch 1 tutorial'
  ],

  _achievements: [
    { key: 'firstSession', label: 'First Session', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>' },
    { key: 'streak7', label: '7-Day Streak', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>' },
    { key: 'hours10', label: '10h Club', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>' },
    { key: 'hours50', label: '50h Expert', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>' },
    { key: 'goals25', label: '25 Goals Done', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' }
  ],

  init() {
    this.selectedDate = Utils.todayStr();
    this.renderAll();
    this.bindEvents();
    this.initTimer();
  },

  renderAll() {
    this.renderHeader();
    this.renderHero();
    this.renderStatStrip();
    this.renderStudyLog();
    this.renderChecklist();
    this.renderGoalsProgress();
    this.renderHeatMap();
    this.renderWeekChart();
    this.renderSkillProgress();
    this.renderCharts();
    this.renderAchievements();
    this.updateHeroMetrics();
  },

  renderHeader() {
    const label = document.getElementById('career-date-label');
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
    const nextBtn = document.getElementById('career-next-day');
    if (nextBtn) nextBtn.style.display = isToday ? 'none' : 'inline-flex';
  },

  bindEvents() {
    const prev = document.getElementById('career-prev-day');
    const next = document.getElementById('career-next-day');
    if (prev && !prev.dataset.bound) { prev.dataset.bound = '1'; prev.addEventListener('click', () => this.changeDay(-1)); }
    if (next && !next.dataset.bound) { next.dataset.bound = '1'; next.addEventListener('click', () => this.changeDay(1)); }

    const goalInput = document.getElementById('career-new-goal-text');
    if (goalInput && !goalInput.dataset.bound) {
      goalInput.dataset.bound = '1';
      goalInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); this.addChecklistItem(); } });
    }

    const topicInput = document.getElementById('career-study-topic');
    if (topicInput && !topicInput.dataset.bound) {
      topicInput.dataset.bound = '1';
      topicInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); this.saveStudyLog(); } });
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
    const wrap = document.getElementById('career-hero-ring');
    if (wrap && window.Charts) {
      Charts.ring(wrap, { size: 132, thickness: 10, value: 0, color: 'currentColor', colorEnd: 'var(--cb-secondary)' });
    }
    const spark = document.getElementById('career-hero-spark');
    if (spark && window.Charts) {
      const data = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(this.selectedDate + 'T00:00:00');
        d.setDate(d.getDate() - i);
        const c = DB.getCareer(Utils.dateStr(d));
        data.push((c.studyDuration || 0));
      }
      Charts.sparkline(spark, data, { color: 'var(--cb-primary)', fillColor: 'var(--cb-primary)', height: 44 });
    }
  },

  _focusScore(data) {
    const study = (data.studyDuration || 0);
    const studyPct = Math.min(100, (study / 120) * 100); // 2h = full
    const checklist = data.checklist || [];
    const doneCount = checklist.filter(x => x.done).length;
    const goalPct = checklist.length ? (doneCount / checklist.length) * 100 : 0;
    return Math.round(studyPct * 0.6 + goalPct * 0.4);
  },

  updateHeroMetrics() {
    const data = DB.getCareer(this.selectedDate);
    const score = this._focusScore(data);
    const ringWrap = document.getElementById('career-hero-ring');
    if (ringWrap && window.Charts) Charts.animateRing(ringWrap, score, { size: 132, thickness: 10 });

    const num = document.getElementById('career-hero-ring-num');
    if (num) num.textContent = window.n ? window.n(score) : score;

    const titleEl = document.getElementById('cb-hero-title');
    if (titleEl) {
      if (score >= 80) titleEl.textContent = 'Locked In';
      else if (score >= 50) titleEl.textContent = 'Building Momentum';
      else if (score >= 25) titleEl.textContent = 'Warming Up';
      else titleEl.textContent = 'Ready to Begin';
    }
    const subEl = document.getElementById('cb-hero-sub');
    if (subEl) {
      const mins = data.studyDuration || 0;
      const done = (data.checklist || []).filter(x => x.done).length;
      subEl.textContent = `${window.n ? window.n(mins) : mins} min studied · ${window.n ? window.n(done) : done} goals done`;
    }
    const streakNum = document.getElementById('cb-hero-streak-num');
    if (streakNum) {
      const s = DB.getCareerStreak();
      streakNum.textContent = window.n ? window.n(s) : s;
    }
  },

  /* ---------- stat strip ---------- */
  renderStatStrip() {
    const n = window.n ? window.n : (x => x);
    const streak = DB.getCareerStreak();
    const data = DB.getCareer(this.selectedDate);
    const studyToday = data.studyDuration || 0;
    const goalsDone = (data.checklist || []).filter(x => x.done).length;

    const [yy, mm] = this.selectedDate.split('-');
    const daysInMonth = new Date(parseInt(yy), parseInt(mm), 0).getDate();
    let monthMins = 0;
    for (let i = 1; i <= daysInMonth; i++) {
      const ds = `${yy}-${mm}-${String(i).padStart(2, '0')}`;
      if (ds > Utils.todayStr()) break;
      const c = DB.getCareer(ds);
      monthMins += (c.studyDuration || 0);
    }
    const monthHours = (monthMins / 60).toFixed(1);

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('cb-stat-streak', n(streak));
    set('cb-stat-streak-sub', streak === 1 ? 'day' : 'days');
    set('cb-stat-study', n(studyToday));
    set('cb-stat-study-sub', 'minutes');
    set('cb-stat-goals', n(goalsDone));
    set('cb-stat-goals-sub', 'done today');
    set('cb-stat-month', n(monthHours));
    set('cb-stat-month-sub', 'hours this mo.');
  },

  /* ---------- study log ---------- */
  renderStudyLog() {
    const data = DB.getCareer(this.selectedDate);
    const topic = document.getElementById('career-study-topic');
    const dur = document.getElementById('career-study-duration');
    const durVal = document.getElementById('career-study-duration-val');
    const notes = document.getElementById('career-study-notes');
    if (topic) topic.value = data.focusTopic || '';
    if (dur) dur.value = data.studyDuration || 0;
    if (notes) notes.value = data.notes || '';
    if (durVal) durVal.textContent = this._fmtDuration(data.studyDuration || 0);

    const chipsEl = document.getElementById('career-category-chips-container');
    const sel = document.getElementById('career-study-category');
    if (chipsEl) {
      chipsEl.innerHTML = '';
      this._catOptions.forEach(opt => {
        const chip = document.createElement('button');
        chip.className = 'cb-chip cat-' + opt.key + (data.category === opt.key ? ' active' : '');
        chip.innerHTML = this._icons[opt.icon] + '<span>' + opt.label + '</span>';
        chip.onclick = () => this.selectCategory(opt.key);
        chipsEl.appendChild(chip);
      });
    }
    if (sel) sel.value = data.category || 'coding';
  },

  _fmtDuration(mins) {
    const n = window.n ? window.n : (x => x);
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h > 0) return n(h) + 'h ' + n(m) + 'm';
    return n(m) + ' mins';
  },

  onStudyDurationChange() {
    const dur = document.getElementById('career-study-duration');
    const durVal = document.getElementById('career-study-duration-val');
    if (!dur || !durVal) return;
    durVal.textContent = this._fmtDuration(parseInt(dur.value) || 0);
  },

  saveStudyLog() {
    const topic = (document.getElementById('career-study-topic') || {}).value || '';
    const dur = parseInt((document.getElementById('career-study-duration') || {}).value) || 0;
    const notes = (document.getElementById('career-study-notes') || {}).value || '';
    const sel = document.getElementById('career-study-category');
    const category = (sel && sel.value) || 'coding';

    if (!topic.trim()) { if (typeof Utils !== 'undefined' && Utils.toast) Utils.toast('Enter a focus topic', 'error'); return; }

    const data = DB.getCareer(this.selectedDate);
    data.focusTopic = topic.trim();
    data.studyDuration = dur;
    data.notes = notes;
    data.category = category;
    DB.setCareer(this.selectedDate, data);

    this.checkAchievements();
    this.renderStatStrip();
    this.renderSkillProgress();
    this.renderCharts();
    this.renderHeatMap();
    this.renderWeekChart();
    this.updateHeroMetrics();
    window.dispatchEvent(new CustomEvent('lamim:data-updated'));
    if (typeof Utils !== 'undefined' && Utils.toast) Utils.toast('Study session saved', 'success');
  },

  selectCategory(cat) {
    const data = DB.getCareer(this.selectedDate);
    data.category = cat;
    DB.setCareer(this.selectedDate, data);
    this.renderStudyLog();
    window.dispatchEvent(new CustomEvent('lamim:data-updated'));
  },

  /* ---------- study timer ---------- */
  initTimer() {
    const state = DB.getCareerTimer();
    const display = document.getElementById('cb-timer-display');
    if (!display) return;
    this._renderTimerButtons(state.running);
    if (state.running) { this._startTimerLoop(); }
    else { this._renderTimerDisplay(state.accumMs); }
  },

  _elapsedMs() {
    const state = DB.getCareerTimer();
    if (!state.running) return state.accumMs || 0;
    return (state.accumMs || 0) + (Date.now() - (state.startedAt || Date.now()));
  },

  _renderTimerDisplay(ms) {
    const display = document.getElementById('cb-timer-display');
    if (!display) return;
    const totalSec = Math.floor(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const n = window.n ? window.n : (x => x);
    const pad = v => String(v).padStart(2, '0');
    display.textContent = h > 0 ? `${n(pad(h))}:${n(pad(m))}:${n(pad(s))}` : `${n(pad(m))}:${n(pad(s))}`;
  },

  _renderTimerButtons(running) {
    const startBtn = document.getElementById('cb-timer-start');
    const stopBtn = document.getElementById('cb-timer-stop');
    const logBtn = document.getElementById('cb-timer-log');
    if (startBtn) startBtn.style.display = running ? 'none' : '';
    if (stopBtn) stopBtn.style.display = running ? '' : 'none';
    if (logBtn) logBtn.disabled = running || this._elapsedMs() < 1000;
  },

  _startTimerLoop() {
    if (this._timerRAF) return;
    const tick = () => {
      this._renderTimerDisplay(this._elapsedMs());
      this._timerRAF = requestAnimationFrame(tick);
    };
    this._timerRAF = requestAnimationFrame(tick);
  },

  _stopTimerLoop() {
    if (this._timerRAF) { cancelAnimationFrame(this._timerRAF); this._timerRAF = null; }
  },

  startTimer() {
    let state = DB.getCareerTimer();
    if (state.running) return;
    state.running = true;
    state.startedAt = Date.now();
    DB.setCareerTimer(state);
    this._renderTimerButtons(true);
    this._startTimerLoop();
  },

  stopTimer() {
    let state = DB.getCareerTimer();
    if (!state.running) return;
    state.accumMs = this._elapsedMs();
    state.running = false;
    state.startedAt = 0;
    DB.setCareerTimer(state);
    this._stopTimerLoop();
    this._renderTimerButtons(false);
    this._renderTimerDisplay(state.accumMs);
  },

  logTimer() {
    const ms = this._elapsedMs();
    const minutes = Math.max(1, Math.round(ms / 60000));
    if (ms < 1000) return;
    const data = DB.getCareer(this.selectedDate);
    data.studyDuration = (data.studyDuration || 0) + minutes;
    if (!data.focusTopic) data.focusTopic = 'Timed session';
    DB.setCareer(this.selectedDate, data);
    DB.setCareerTimer({ running: false, startedAt: 0, accumMs: 0, topic: '', category: 'coding' });
    this._stopTimerLoop();
    this._renderTimerButtons(false);
    this._renderTimerDisplay(0);
    this.renderStatStrip();
    this.renderStudyLog();
    this.renderSkillProgress();
    this.renderCharts();
    this.renderHeatMap();
    this.renderWeekChart();
    this.updateHeroMetrics();
    this.checkAchievements();
    window.dispatchEvent(new CustomEvent('lamim:data-updated'));
    if (typeof Utils !== 'undefined' && Utils.toast) Utils.toast('+' + (window.n ? window.n(minutes) : minutes) + ' min logged', 'success');
  },

  /* ---------- checklist / goals ---------- */
  renderGoalsProgress() {
    const data = DB.getCareer(this.selectedDate);
    const list = data.checklist || [];
    const done = list.filter(x => x.done).length;
    const total = list.length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    const n = window.n ? window.n : (x => x);

    const numEl = document.getElementById('cb-goals-num');
    const denEl = document.getElementById('cb-goals-den');
    const pctEl = document.getElementById('cb-goals-pct');
    const fillEl = document.getElementById('cb-goals-fill');
    if (numEl) numEl.textContent = n(done);
    if (denEl) denEl.textContent = n(total);
    if (pctEl) pctEl.textContent = n(pct) + '%';
    if (fillEl) fillEl.style.width = pct + '%';

    const suggEl = document.getElementById('career-suggested-goals');
    if (suggEl) {
      suggEl.innerHTML = '';
      this._suggestedGoals.forEach(g => {
        const chip = document.createElement('button');
        chip.className = 'cb-suggested-chip';
        chip.textContent = '+ ' + g;
        chip.onclick = () => this.addSuggestedGoal(g);
        suggEl.appendChild(chip);
      });
    }
  },

  renderChecklist() {
    const container = document.getElementById('career-checklist-container');
    if (!container) return;
    const data = DB.getCareer(this.selectedDate);
    const list = data.checklist || [];
    container.innerHTML = '';

    if (list.length === 0) {
      container.innerHTML = `<div class="cb-empty-state"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg><p>No goals yet — add one above</p></div>`;
      return;
    }

    list.forEach(item => {
      const div = document.createElement('div');
      div.className = 'cb-check-item' + (item.done ? ' done' : '');
      div.onclick = (e) => { if (e.target.closest('.cb-check-del')) return; this.toggleChecklistItem(item.id, e); };
      div.innerHTML =
        `<div class="cb-checkbox">${item.done ? '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : ''}</div>` +
        `<div class="cb-check-text">${Utils.escapeHTML(item.text)}</div>` +
        `<button class="cb-check-del" onclick="event.stopPropagation();Career.deleteChecklistItem(${item.id})"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>`;
      container.appendChild(div);
    });
  },

  toggleChecklistItem(id, event) {
    const data = DB.getCareer(this.selectedDate);
    const item = (data.checklist || []).find(x => x.id === id);
    if (!item) return;
    const wasUndone = !item.done;
    item.done = !item.done;
    DB.setCareer(this.selectedDate, data);
    if (item.done && wasUndone && event) {
      this.triggerGoalConfetti(event);
    }
    this.renderChecklist();
    this.renderGoalsProgress();
    this.renderStatStrip();
    this.updateHeroMetrics();
    this.checkAchievements();
    window.dispatchEvent(new CustomEvent('lamim:data-updated'));
  },

  addChecklistItem() {
    const input = document.getElementById('career-new-goal-text');
    if (!input) return;
    const text = input.value.trim();
    if (!text) { input.focus(); return; }
    const data = DB.getCareer(this.selectedDate);
    if (!data.checklist) data.checklist = [];
    const maxId = data.checklist.reduce((m, x) => Math.max(m, x.id || 0), 0);
    data.checklist.push({ id: maxId + 1, text, done: false });
    DB.setCareer(this.selectedDate, data);
    input.value = '';
    this.renderChecklist();
    this.renderGoalsProgress();
    this.renderStatStrip();
    this.updateHeroMetrics();
    window.dispatchEvent(new CustomEvent('lamim:data-updated'));
  },

  addSuggestedGoal(text) {
    const data = DB.getCareer(this.selectedDate);
    if (!data.checklist) data.checklist = [];
    if (data.checklist.some(x => x.text === text)) {
      if (typeof Utils !== 'undefined' && Utils.toast) Utils.toast('Already in your list', 'error');
      return;
    }
    const maxId = data.checklist.reduce((m, x) => Math.max(m, x.id || 0), 0);
    data.checklist.push({ id: maxId + 1, text, done: false });
    DB.setCareer(this.selectedDate, data);
    this.renderChecklist();
    this.renderGoalsProgress();
    this.renderStatStrip();
    this.updateHeroMetrics();
    window.dispatchEvent(new CustomEvent('lamim:data-updated'));
  },

  deleteChecklistItem(id) {
    const data = DB.getCareer(this.selectedDate);
    if (!data.checklist) return;
    data.checklist = data.checklist.filter(x => x.id !== id);
    DB.setCareer(this.selectedDate, data);
    this.renderChecklist();
    this.renderGoalsProgress();
    this.renderStatStrip();
    this.updateHeroMetrics();
    window.dispatchEvent(new CustomEvent('lamim:data-updated'));
  },

  triggerGoalConfetti(e) {
    if (!e) return;
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) || window.innerWidth / 2;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) || window.innerHeight / 2;
    const colors = ['#2dd4bf', '#818cf8', '#fbbf24', '#34d399', '#a78bfa'];
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      p.className = 'cb-particle';
      p.style.left = x + 'px';
      p.style.top = y + 'px';
      p.style.background = colors[i % colors.length];
      const angle = (Math.PI * 2 * i) / 18;
      const dist = 60 + Math.random() * 60;
      p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
      p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 750);
    }
  },

  /* ---------- heatmap ---------- */
  renderHeatMap() {
    const container = document.getElementById('career-heatmap-monthly-container');
    if (!container) return;
    const weeks = 16;
    const days = weeks * 7;
    const today = Utils.todayStr();
    const startD = new Date(this.selectedDate + 'T00:00:00');
    startD.setDate(startD.getDate() - (days - 1));
    let activeCount = 0, totalPast = 0, totalMins = 0;
    let streak = 0;
    const cells = [];
    for (let i = 0; i < days; i++) {
      const d = new Date(startD);
      d.setDate(d.getDate() + i);
      const ds = Utils.dateStr(d);
      const isFuture = ds > today;
      const c = isFuture ? null : DB.getCareer(ds);
      const mins = c ? (c.studyDuration || 0) : 0;
      const anyDone = c && c.checklist && c.checklist.some(x => x.done);
      let cls = 'cb-heatmap-cell';
      if (!isFuture) {
        totalPast++;
        totalMins += mins;
        if (mins >= 120) { cls += ' high'; activeCount++; }
        else if (mins > 0) { cls += ' medium'; activeCount++; }
        else if (anyDone) { cls += ' low'; activeCount++; }
      }
      if (ds === this.selectedDate) cls += ' current';
      cells.push({ ds, cls, isFuture });
    }

    const cur = new Date(today + 'T00:00:00');
    for (let i = 0; i < 365; i++) {
      const ds = Utils.dateStr(cur);
      if (ds > today) { cur.setDate(cur.getDate() - 1); continue; }
      const c = DB.getCareer(ds);
      const ok = (c.studyDuration >= 30) || (c.checklist && c.checklist.some(x => x.done));
      if (ok) streak++;
      else { if (ds !== today) break; }
      cur.setDate(cur.getDate() - 1);
    }

    container.innerHTML = '';
    const grid = document.createElement('div');
    grid.className = 'cb-heatmap';
    cells.forEach(cell => {
      const el = document.createElement('div');
      el.className = cell.cls;
      el.title = cell.ds;
      el.onclick = () => this.jumpToDate(cell.ds);
      grid.appendChild(el);
    });
    container.appendChild(grid);

    const n = window.n ? window.n : (x => x);
    const consistency = totalPast ? Math.round((activeCount / totalPast) * 100) : 0;
    const setText = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    setText('career-heatmap-consistency-pct', n(consistency) + '%');
    setText('career-heatmap-streak', n(streak) + ' days');
    setText('career-heatmap-total-hours', n((totalMins / 60).toFixed(1)) + 'h');
  },

  jumpToDate(dateStr) {
    if (dateStr > Utils.todayStr()) return;
    this.selectedDate = dateStr;
    this.renderAll();
  },

  /* ---------- week chart (real) ---------- */
  renderWeekChart() {
    const container = document.getElementById('career-chart-container');
    if (!container || !window.Charts) return;
    const data = [];
    const dayNames = (typeof App !== 'undefined' && App.lang === 'bn')
      ? ['শনি', 'রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র']
      : ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Utils.todayStr() + 'T00:00:00');
      d.setDate(d.getDate() - i);
      const ds = Utils.dateStr(d);
      const c = DB.getCareer(ds);
      data.push({ label: dayNames[(d.getDay() + 1) % 7], value: (c.studyDuration || 0), highlight: ds === this.selectedDate });
    }
    Charts.barChart(container, data, { color: 'var(--cb-primary)', height: 110 });
  },

  /* ---------- skill bars ---------- */
  _calcCategoryStats() {
    const stats = {};
    this._catOptions.forEach(o => stats[o.key] = 0);
    const [yy, mm] = this.selectedDate.slice(0, 7).split('-');
    const daysInMonth = new Date(parseInt(yy), parseInt(mm), 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      const ds = `${yy}-${mm}-${String(i).padStart(2, '0')}`;
      if (ds > Utils.todayStr()) break;
      const c = DB.getCareer(ds);
      const cat = c.category || 'coding';
      if (stats[cat] !== undefined) stats[cat] += (c.studyDuration || 0);
    }
    return stats;
  },

  renderSkillProgress() {
    const container = document.getElementById('career-skill-bars');
    if (!container) return;
    const stats = this._calcCategoryStats();
    container.innerHTML = '';
    this._catOptions.forEach(opt => {
      const mins = stats[opt.key] || 0;
      const hours = mins / 60;
      let rank = 'novice', rankCls = 'novice';
      if (hours >= 50) { rank = 'Expert'; rankCls = 'expert'; }
      else if (hours >= 15) { rank = 'Specialist'; rankCls = 'specialist'; }
      else if (hours >= 5) { rank = 'Practitioner'; rankCls = 'practitioner'; }
      const pct = Math.min(100, (hours / 50) * 100);
      const n = window.n ? window.n : (x => x);

      const skill = document.createElement('div');
      skill.className = 'cb-skill';
      skill.innerHTML =
        `<div class="cb-skill-head">` +
          `<span class="cb-skill-name">${this._icons[opt.icon]} ${opt.label}</span>` +
          `<span class="cb-skill-rank ${rankCls}">${rank} · ${n(hours.toFixed(1))}h</span>` +
        `</div>` +
        `<div class="cb-skill-track"><div class="cb-skill-fill cat-${opt.key}" style="width:${pct}%"></div></div>`;
      container.appendChild(skill);
    });
  },

  /* ---------- charts (donut + trend) ---------- */
  renderCharts() {
    const stats = this._calcCategoryStats();
    const donutEl = document.getElementById('cb-donut');
    if (donutEl && window.Charts) {
      const colorMap = { coding: '#818cf8', reading: '#fbbf24', language: '#38bdf8', business: '#34d399', general: '#fb923c' };
      const segs = this._catOptions.map(o => ({ value: stats[o.key] || 0, color: colorMap[o.key], label: o.label })).filter(s => s.value > 0);
      const totalMin = segs.reduce((s, x) => s + x.value, 0);
      if (totalMin === 0) {
        Charts.donut(donutEl, [{ value: 1, color: 'rgba(129,140,248,0.15)' }], { size: 120, thickness: 14, centerText: '0h', centerSub: 'this month' });
      } else {
        Charts.donut(donutEl, segs, { size: 120, thickness: 14, centerText: (window.n ? window.n((totalMin / 60).toFixed(0)) : Math.round(totalMin / 60)) + 'h', centerSub: 'this month' });
      }
    }
    const trendEl = document.getElementById('cb-trend');
    if (trendEl && window.Charts) {
      const data = [];
      for (let i = 13; i >= 0; i--) {
        const d = new Date(this.selectedDate + 'T00:00:00');
        d.setDate(d.getDate() - i);
        const c = DB.getCareer(Utils.dateStr(d));
        data.push({ label: '', value: (c.studyDuration || 0) });
      }
      Charts.lineChart(trendEl, data, { color: 'var(--cb-secondary)', height: 90 });
    }
  },

  /* ---------- achievements ---------- */
  checkAchievements() {
    const ach = DB.getCareerAchievements();
    const streak = DB.getCareerStreak();

    let totalMins = 0;
    for (let i = 0; i < 365; i++) {
      const d = new Date(Utils.todayStr() + 'T00:00:00');
      d.setDate(d.getDate() - i);
      const c = DB.getCareer(Utils.dateStr(d));
      totalMins += (c.studyDuration || 0);
    }

    const newly = [];
    if (!ach.firstSession && totalMins > 0) { ach.firstSession = Utils.todayStr(); newly.push('First Session'); }
    if (!ach.streak7 && streak >= 7) { ach.streak7 = Utils.todayStr(); newly.push('7-Day Streak'); }
    if (!ach.hours10 && totalMins >= 600) { ach.hours10 = Utils.todayStr(); newly.push('10h Club'); }
    if (!ach.hours50 && totalMins >= 3000) { ach.hours50 = Utils.todayStr(); newly.push('50h Expert'); }

    DB.setCareerAchievements(ach);
    this.renderAchievements();
    if (newly.length && typeof Utils !== 'undefined' && Utils.toast) {
      Utils.toast('Achievement: ' + newly[0], 'success');
    }
  },

  renderAchievements() {
    const container = document.getElementById('cb-achievements');
    if (!container) return;
    const ach = DB.getCareerAchievements();
    container.innerHTML = '';
    this._achievements.forEach(a => {
      const unlocked = !!ach[a.key];
      const badge = document.createElement('div');
      badge.className = 'cb-badge-ach' + (unlocked ? ' unlocked' : '');
      badge.innerHTML = `<span class="cb-badge-ico">${a.icon}</span> ${a.label}`;
      container.appendChild(badge);
    });
  },

  /* ---------- reset ---------- */
  resetTodayData() {
    if (typeof Utils !== 'undefined' && Utils.confirm) {
      Utils.confirm('Reset Career Data', "Reset all of today's career data?", () => this._doReset());
      return;
    }
    if (!confirm("Reset today's career data?")) return;
    this._doReset();
  },

  _doReset() {
    const def = { focusTopic: "", category: "coding", studyDuration: 0, notes: "", checklist: [] };
    DB.setCareer(this.selectedDate, def);
    this.renderAll();
    window.dispatchEvent(new CustomEvent('lamim:data-updated'));
    if (typeof Utils !== 'undefined' && Utils.toast) Utils.toast('Today reset', 'success');
  },

  /* ---------- PDF export ---------- */
  exportPDF() {
    const year = this.selectedDate.slice(0, 4);
    const month = this.selectedDate.slice(5, 7);
    const monthName = new Date(year, month - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();

    let totalMins = 0, studyDays = 0, totalGoals = 0, goalsDone = 0;
    const catTotals = { coding: 0, reading: 0, language: 0, business: 0, general: 0 };
    const rows = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${month}-${String(day).padStart(2, '0')}`;
      const isFuture = dateStr > Utils.todayStr();
      const c = DB.getCareer(dateStr);
      const mins = c.studyDuration || 0;
      const list = c.checklist || [];
      const done = list.filter(x => x.done).length;
      if (!isFuture) {
        totalMins += mins;
        if (mins > 0) studyDays++;
        totalGoals += list.length;
        goalsDone += done;
        const cat = c.category || 'coding';
        if (catTotals[cat] !== undefined) catTotals[cat] += mins;
      }
      rows.push({ day, mins, goals: list.length, done, topic: c.focusTopic || '—', isFuture });
    }

    const streak = DB.getCareerStreak();
    const avgDaily = studyDays ? (totalMins / studyDays).toFixed(0) : 0;
    const activePct = Math.round((studyDays / daysInMonth) * 100);
    let tier = 'NEEDS WORK', tierColor = '#fbbf24';
    if (activePct >= 80) { tier = 'EXCELLENT'; tierColor = '#34d399'; }
    else if (activePct >= 50) { tier = 'GOOD'; tierColor = '#818cf8'; }

    const catColors = { coding: '#818cf8', reading: '#fbbf24', language: '#38bdf8', business: '#34d399', general: '#fb923c' };
    const maxCat = Math.max(...Object.values(catTotals), 1);
    const skillHtml = Object.entries(catTotals).map(([k, v]) => {
      const pct = (v / maxCat) * 100;
      return `<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px"><span style="font-weight:700;text-transform:capitalize">${k}</span><span style="color:#64748b">${(v / 60).toFixed(1)}h</span></div><div style="height:8px;background:#f1f5f9;border-radius:999px;overflow:hidden"><div style="height:100%;width:${pct}%;background:${catColors[k]};border-radius:999px"></div></div></div>`;
    }).join('');

    const rowHtml = rows.map(r => {
      if (r.isFuture) return `<tr><td colspan="5" style="text-align:center;color:#94a3b8;font-style:italic;padding:8px">Not yet</td></tr>`;
      return `<tr>
        <td style="padding:10px;border-bottom:1px solid #e2e8f0;font-weight:700">${r.day}</td>
        <td style="padding:10px;border-bottom:1px solid #e2e8f0">${r.topic}</td>
        <td style="padding:10px;border-bottom:1px solid #e2e8f0;text-align:center">${r.mins ? r.mins + 'm' : '—'}</td>
        <td style="padding:10px;border-bottom:1px solid #e2e8f0;text-align:center">${r.done}/${r.goals}</td>
        <td style="padding:10px;border-bottom:1px solid #e2e8f0;text-align:center">${r.mins >= 120 ? '✓' : ''}</td>
      </tr>`;
    }).join('');

    const win = window.open('', '_blank');
    if (!win) {
      if (typeof Utils !== 'undefined' && Utils.toast) Utils.toast('Please allow popups to export PDF', 'error');
      return;
    }
    win.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Career Report — ${monthName}</title>
    <style>
      @page { size: A4; margin: 16mm; }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'Inter', -apple-system, sans-serif; color: #0f172a; background: #fff; }
      .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #818cf8; padding-bottom: 16px; margin-bottom: 20px; }
      .logo { font-size: 22px; font-weight: 900; letter-spacing: 0.18em; background: linear-gradient(135deg, #6366f1, #2dd4bf); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
      .subtitle { font-size: 11px; color: #64748b; font-weight: 700; letter-spacing: 0.05em; }
      .meta { text-align: right; font-size: 12px; color: #475569; }
      .meta strong { display: block; font-size: 15px; color: #0f172a; margin-bottom: 2px; }
      .consistency { display: inline-block; padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 800; letter-spacing: 0.06em; background: ${tierColor}22; color: ${tierColor}; margin-bottom: 14px; }
      .summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 20px 0; }
      .sum-card { background: #f8fafc; border-radius: 14px; padding: 16px; border: 1px solid #e2e8f0; }
      .sum-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; font-weight: 700; }
      .sum-val { font-size: 22px; font-weight: 800; color: #6366f1; margin-top: 4px; }
      .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
      .panel { background: #f8fafc; border-radius: 14px; padding: 16px; border: 1px solid #e2e8f0; }
      .panel h3 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; margin-bottom: 12px; }
      table { width: 100%; border-collapse: collapse; font-size: 12px; }
      th { background: #f1f5f9; padding: 10px; text-align: center; font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; }
      th:first-child, th:nth-child(2) { text-align: left; }
      .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 11px; color: #94a3b8; font-style: italic; }
    </style></head><body>
    <div class="header">
      <div>
        <div class="logo">LAMIM</div>
        <div class="subtitle">CAREER BUILDER · MONTHLY REPORT</div>
      </div>
      <div class="meta">
        <strong>${monthName}</strong>
        REF: CBR-${year}${month}
      </div>
    </div>
    <div class="consistency">${tier} · ${activePct}% ACTIVE</div>
    <div class="summary">
      <div class="sum-card"><div class="sum-label">Study Time</div><div class="sum-val">${(totalMins / 60).toFixed(1)}h</div></div>
      <div class="sum-card"><div class="sum-label">Study Days</div><div class="sum-val">${studyDays}</div></div>
      <div class="sum-card"><div class="sum-label">Goals Done</div><div class="sum-val">${goalsDone}/${totalGoals}</div></div>
      <div class="sum-card"><div class="sum-label">Streak</div><div class="sum-val">${streak} days</div></div>
    </div>
    <div class="two-col">
      <div class="panel"><h3>Skill Breakdown</h3>${skillHtml}</div>
      <div class="panel"><h3>Quick Stats</h3>
        <div style="font-size:13px;color:#475569;line-height:2">
          <strong>Avg / study day:</strong> ${avgDaily} min<br>
          <strong>Total focus topics:</strong> ${rows.filter(r => r.topic !== '—').length}<br>
          <strong>Goals completion:</strong> ${totalGoals ? Math.round((goalsDone / totalGoals) * 100) : 0}%
        </div>
      </div>
    </div>
    <table>
      <thead><tr><th>Date</th><th>Focus Topic</th><th>Study</th><th>Goals</th><th>2h+?</th></tr></thead>
      <tbody>${rowHtml}</tbody>
    </table>
    <div class="footer">"The secret of getting ahead is getting started." — Mark Twain</div>
    <script>setTimeout(() => { window.print(); }, 800);</script>
    </body></html>`);
    win.document.close();
  }
};

window.Career = Career;
