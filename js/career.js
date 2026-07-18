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

  _GOAL_MAX_LEN: 120,

  _emojiRe: /^(?:💻|📖|🎓|🌐|💼|💪|✨|✍️|🎨|🎯)\s*/u,

  init() {
    this.selectedDate = Utils.todayStr();
    this._migrateChecklist();
    this.renderAll();
    this.bindEvents();
    this.initTimer();
  },

  destroy() {
    ['career-prev-day', 'career-next-day', 'career-today-btn'].forEach(id => {
      const el = document.getElementById(id);
      if (el) delete el.dataset.bound;
    });
    const goalForm = document.getElementById('career-goal-form');
    if (goalForm) delete goalForm.dataset.bound;
    const checklistContainer = document.getElementById('career-checklist-container');
    if (checklistContainer) delete checklistContainer.dataset.bound;
    const topicInput = document.getElementById('career-study-topic');
    if (topicInput) delete topicInput.dataset.bound;
    if (this._timerRAF) {
      cancelAnimationFrame(this._timerRAF);
      this._timerRAF = null;
    }
  },

  _migrateChecklist() {
    const today = Utils.todayStr();
    const data = DB.getCareer(today);
    const list = data.checklist || [];
    let changed = false;
    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      if (typeof item === 'string') {
        list[i] = { id: i + 1, text: item, done: false };
        item = list[i];
        changed = true;
      }
      if (!item || typeof item !== 'object') {
        list[i] = { id: i + 1, text: '', done: false };
        item = list[i];
        changed = true;
      }
      if (typeof item.id !== 'number') { item.id = i + 1; changed = true; }
      if (typeof item.text !== 'string') { item.text = ''; changed = true; }
      if (typeof item.done !== 'boolean') { item.done = false; changed = true; }
      const cleaned = item.text.replace(this._emojiRe, '');
      if (cleaned !== item.text) { item.text = cleaned; changed = true; }
      if ('category' in item) { delete item.category; changed = true; }
    }
    if (changed) DB.setCareer(today, data);
  },

  renderAll() {
    this.renderHeader();
    this.renderHero();
    this.renderStatStrip();
    this.renderStudyLog();
    this.renderChecklist();
    this.renderGoalsProgress();
    this.renderHeatMap();
    this.renderSkillProgress();
    this.renderCharts();
    this.renderAchievements();
    this.updateHeroMetrics();
    this.switchProgressTab(this._activeProgressTab || 'weekly');
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
    const todayBtn = document.getElementById('career-today-btn');
    if (todayBtn) todayBtn.style.display = isToday ? 'none' : 'inline-flex';
  },

  bindEvents() {
    const prev = document.getElementById('career-prev-day');
    const next = document.getElementById('career-next-day');
    if (prev && !prev.dataset.bound) { prev.dataset.bound = '1'; prev.addEventListener('click', () => this.changeDay(-1)); }
    if (next && !next.dataset.bound) { next.dataset.bound = '1'; next.addEventListener('click', () => this.changeDay(1)); }
    const todayBtn = document.getElementById('career-today-btn');
    if (todayBtn && !todayBtn.dataset.bound) { todayBtn.dataset.bound = '1'; todayBtn.addEventListener('click', () => { this.selectedDate = Utils.todayStr(); this.renderAll(); }); }

    const goalForm = document.getElementById('career-goal-form');
    if (goalForm && !goalForm.dataset.bound) {
      goalForm.dataset.bound = '1';
      goalForm.addEventListener('submit', (e) => { e.preventDefault(); this.addChecklistItem(); });
    }

    const checklistContainer = document.getElementById('career-checklist-container');
    if (checklistContainer && !checklistContainer.dataset.bound) {
      checklistContainer.dataset.bound = '1';
      checklistContainer.addEventListener('click', (e) => {
        const delBtn = e.target.closest('.cb-check-del');
        if (delBtn) {
          e.stopPropagation();
          const id = parseInt(delBtn.dataset.id, 10);
          if (!isNaN(id)) this.deleteChecklistItem(id);
          return;
        }
        const itemEl = e.target.closest('.cb-check-item');
        if (itemEl) {
          const id = parseInt(itemEl.dataset.id, 10);
          if (!isNaN(id)) this.toggleChecklistItem(id, e);
        }
      });
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
    const delta = Math.min(Date.now() - (state.startedAt || Date.now()), 86400000);
    return (state.accumMs || 0) + delta;
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
    let lastTick = 0;
    const tick = () => {
      const now = performance.now();
      if (now - lastTick >= 250) {
        lastTick = now;
        this._renderTimerDisplay(this._elapsedMs());
      }
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
    state.startedDate = this.selectedDate;
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
    const state = DB.getCareerTimer();
    const targetDate = state.startedDate || this.selectedDate;
    const data = DB.getCareer(targetDate);
    data.studyDuration = (data.studyDuration || 0) + minutes;
    if (!data.focusTopic) data.focusTopic = 'Timed session';
    DB.setCareer(targetDate, data);
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

    const badgeEl = document.getElementById('cb-goals-badge');
    if (badgeEl) {
      badgeEl.textContent = n(done) + ' / ' + n(total);
      badgeEl.className = 'gh-badge ' + (pct >= 100 ? 'excellent' : pct >= 50 ? 'good' : 'pending');
    }

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
      container.innerHTML = '<div class="cb-empty-state"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg><p>No goals yet — add one above</p></div>';
      return;
    }

    list.forEach((item) => {
      if (!item || typeof item !== 'object' || typeof item.id !== 'number') return;
      const text = String(item.text || '');
      const div = document.createElement('div');
      div.className = 'cb-check-item' + (item.done ? ' done' : '');
      div.dataset.id = item.id;
      div.innerHTML =
        '<div class="cb-check-main"><div class="cb-check-text">' + Utils.escapeHTML(text) + '</div></div>' +
        '<button class="cb-check-del" data-id="' + item.id + '" aria-label="Delete goal"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>';
      container.appendChild(div);
    });
  },

  toggleChecklistItem(id, event) {
    const data = DB.getCareer(this.selectedDate);
    const item = (data.checklist || []).find(x => x.id === id);
    if (!item) return;
    item.done = !item.done;
    DB.setCareer(this.selectedDate, data);

    if (event) {
      this.triggerGoalConfetti(event);
    }

    this.renderChecklist();
    this.renderGoalsProgress();
    this.renderStatStrip();
    this.updateHeroMetrics();
    this.checkAchievements();
    this.switchProgressTab(this._activeProgressTab || 'weekly');
    window.dispatchEvent(new CustomEvent('lamim:data-updated'));
  },

  addChecklistItem() {
    const input = document.getElementById('career-new-goal-text');
    if (!input) return;
    let text = String(input.value || '').trim();
    if (!text) { input.focus(); return; }

    if (text.length > this._GOAL_MAX_LEN) {
      text = text.substring(0, this._GOAL_MAX_LEN);
    }

    const data = DB.getCareer(this.selectedDate);
    if (!data.checklist) data.checklist = [];

    const lowerText = text.toLowerCase();
    if (data.checklist.some(x => typeof x.text === 'string' && x.text.toLowerCase() === lowerText)) {
      if (typeof Utils !== 'undefined' && Utils.toast) Utils.toast('Already in your list', 'error');
      input.value = '';
      return;
    }

    const maxId = data.checklist.reduce((m, x) => Math.max(m, (typeof x.id === 'number' ? x.id : 0)), 0);
    data.checklist.push({ id: maxId + 1, text: text, done: false });
    DB.setCareer(this.selectedDate, data);
    input.value = '';
    this.renderChecklist();
    this.renderGoalsProgress();
    this.renderStatStrip();
    this.updateHeroMetrics();
    this.switchProgressTab(this._activeProgressTab || 'weekly');
    window.dispatchEvent(new CustomEvent('lamim:data-updated'));
  },

  addSuggestedGoal(text) {
    text = String(text || '').trim();
    if (!text) return;

    if (text.length > this._GOAL_MAX_LEN) {
      text = text.substring(0, this._GOAL_MAX_LEN);
    }

    const data = DB.getCareer(this.selectedDate);
    if (!data.checklist) data.checklist = [];

    const lowerText = text.toLowerCase();
    if (data.checklist.some(x => typeof x.text === 'string' && x.text.toLowerCase() === lowerText)) {
      if (typeof Utils !== 'undefined' && Utils.toast) Utils.toast('Already in your list', 'error');
      return;
    }

    const maxId = data.checklist.reduce((m, x) => Math.max(m, (typeof x.id === 'number' ? x.id : 0)), 0);
    data.checklist.push({ id: maxId + 1, text: text, done: false });
    DB.setCareer(this.selectedDate, data);
    this.renderAll();
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
    this.switchProgressTab(this._activeProgressTab || 'weekly');
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

  /* ---------- week chart (compat wrapper) ---------- */
  renderWeekChart() {
    this.renderProgressWeekly();
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

  /* ---------- charts (donut + trend) — now handled by progress tabs ---------- */
  renderCharts() {},

  /* ---------- achievements ---------- */
  checkAchievements() {
    const ach = DB.getCareerAchievements();
    const streak = DB.getCareerStreak();

    // Skip the expensive 365-day scan once the top achievement is already unlocked
    let totalMins = ach.totalStudyMins || 0;
    if (!ach.hours50) {
      if (!totalMins) {
        for (let i = 0; i < 365; i++) {
          const d = new Date(Utils.todayStr() + 'T00:00:00');
          d.setDate(d.getDate() - i);
          const c = DB.getCareer(Utils.dateStr(d));
          totalMins += (c.studyDuration || 0);
          if (totalMins >= 3000) break; // highest threshold reached, no need to continue
        }
      }
      ach.totalStudyMins = totalMins;
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
    const esc = (s) => (typeof Utils !== 'undefined' && Utils.escapeHTML) ? Utils.escapeHTML(s) : String(s || '').replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
    const year = this.selectedDate.slice(0, 4);
    const month = this.selectedDate.slice(5, 7);
    const monthName = new Date(year, month - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
    const todayStr = Utils.todayStr();

    let totalGoals = 0, goalsDone = 0, daysWithGoals = 0, perfectDays = 0;
    const rows = [];
    const goalsMap = {};

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${month}-${String(day).padStart(2, '0')}`;
      const isFuture = dateStr > todayStr;
      const c = isFuture ? { checklist: [] } : DB.getCareer(dateStr);
      const list = c.checklist || [];
      const done = list.filter(x => x.done).length;
      if (!isFuture) {
        totalGoals += list.length;
        goalsDone += done;
        if (list.length) daysWithGoals++;
        if (list.length > 0 && list.every(x => x.done)) perfectDays++;
        if (list.length) goalsMap[day] = list.map(x => ({ text: x.text || '', done: !!x.done }));
      }
      rows.push({ day, goals: list.length, done, isFuture });
    }

    const completionPct = totalGoals ? Math.round((goalsDone / totalGoals) * 100) : 0;
    const goalStreak = DB.getCareerStreak();

    /* Month-over-month trend (last 6 months, real stored data) */
    const monthNames = (typeof App !== 'undefined' && App.lang === 'bn')
      ? ['জানু', 'ফেব্রু', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগ', 'সেপ্ট', 'অক্ট', 'নভে', 'ডিসে']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const nowD = new Date(this.selectedDate + 'T00:00:00');
    const todayDate = new Date();
    const trend = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(nowD.getFullYear(), nowD.getMonth() - i, 1);
      const y = d.getFullYear(), m = d.getMonth();
      const dim = new Date(y, m + 1, 0).getDate();
      let mDone = 0, mTotal = 0;
      for (let day = 1; day <= dim; day++) {
        const dt = new Date(y, m, day);
        if (dt > todayDate) break;
        const c = DB.getCareer(Utils.dateStr(dt));
        const cl = c.checklist || [];
        mTotal += cl.length;
        mDone += cl.filter(x => x.done).length;
      }
      trend.push({ label: monthNames[m], pct: mTotal > 0 ? Math.round((mDone / mTotal) * 100) : 0, done: mDone, total: mTotal, isCurrent: (y === nowD.getFullYear() && m === nowD.getMonth()) });
    }
    const maxTrend = Math.max(...trend.map(t => t.pct), 1);
    const trendBars = trend.map(t => {
      const h = Math.max(6, (t.pct / maxTrend) * 100);
      const g1 = t.pct === 100 ? '#34d399' : t.pct >= 50 ? '#fbbf24' : '#818cf8';
      const g2 = t.pct === 100 ? '#0d9488' : t.pct >= 50 ? '#f59e0b' : '#4f46e5';
      const ring = t.isCurrent ? `box-shadow:0 0 0 2px #fff,0 0 0 4px ${g2};` : '';
      return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:8px">
        <div style="font-size:13px;font-weight:800;color:${t.isCurrent ? g2 : '#475569'}">${t.pct}%</div>
        <div style="width:100%;height:110px;display:flex;align-items:flex-end">
          <div style="width:100%;height:${h}%;border-radius:10px 10px 4px 4px;background:linear-gradient(180deg, ${g1} 0%, ${g2} 100%);${ring}"></div>
        </div>
        <div style="font-size:11px;color:${t.isCurrent ? '#0f172a' : '#64748b'};font-weight:${t.isCurrent ? 800 : 600}">${t.label}</div>
        <div style="font-size:10px;color:#94a3b8">${t.done}/${t.total}</div>
      </div>`;
    }).join('');

    const rowHtml = rows.map(r => {
      if (r.isFuture) {
        return `<tr>
          <td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:700;color:#94a3b8">${r.day}</td>
          <td style="padding:8px;border-bottom:1px solid #e2e8f0;text-align:center;color:#cbd5e1">—</td>
          <td style="padding:8px;border-bottom:1px solid #e2e8f0;color:#cbd5e1">—</td>
        </tr>`;
      }
      const goalsCell = goalsMap[r.day]
        ? `<div style="display:flex;flex-wrap:wrap;gap:4px;justify-content:flex-start">` + goalsMap[r.day].map(g => `<span style="display:inline-block;font-size:10px;line-height:1.3;padding:2px 7px;border-radius:999px;white-space:nowrap;${g.done ? 'background:#ecfdf5;color:#047857;border:1px solid #a7f3d0' : 'background:#f1f5f9;color:#64748b;border:1px solid #e2e8f0'}">${g.done ? '✓' : '○'} ${esc(g.text)}</span>`).join('') + `</div>`
        : '—';
      return `<tr>
        <td style="padding:8px;border-bottom:1px solid #e2e8f0;font-weight:700;vertical-align:top">${r.day}</td>
        <td style="padding:8px;border-bottom:1px solid #e2e8f0;text-align:center;vertical-align:top">${r.goals ? r.done + '/' + r.goals : '—'}</td>
        <td style="padding:8px;border-bottom:1px solid #e2e8f0;vertical-align:top">${goalsCell}</td>
      </tr>`;
    }).join('');

    const win = window.open('', '_blank');
    if (!win) {
      if (typeof Utils !== 'undefined' && Utils.toast) Utils.toast('Please allow popups to export PDF', 'error');
      return;
    }
    const genDate = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    win.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Career Report — ${monthName}</title>
    <style>
      @page { size: A4; margin: 16mm; }
      * { box-sizing: border-box; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      body { font-family: 'Inter', 'Segoe UI', -apple-system, sans-serif; color: #1e293b; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; line-height: 1.5; }
      .header { position: relative; display: flex; justify-content: space-between; align-items: flex-end; padding: 26px 28px; margin-bottom: 26px; border-radius: 20px; overflow: hidden; background: linear-gradient(120deg, #4f46e5 0%, #6366f1 40%, #0d9488 100%); color: #fff; box-shadow: 0 14px 38px -16px rgba(79, 70, 229, 0.55); }
      .header::after { content: ''; position: absolute; top: -40%; right: -10%; width: 240px; height: 240px; background: radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%); }
      .logo { font-size: 26px; font-weight: 900; letter-spacing: 0.22em; position: relative; }
      .subtitle { font-size: 11px; color: rgba(255,255,255,0.82); font-weight: 600; letter-spacing: 0.14em; margin-top: 6px; }
      .meta { text-align: right; font-size: 12px; color: rgba(255,255,255,0.88); position: relative; }
      .meta strong { display: block; font-size: 17px; color: #fff; margin-bottom: 3px; font-weight: 800; letter-spacing: 0.02em; }
      .summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin: 22px 0; }
      .sum-card { background: #fff; border-radius: 16px; padding: 18px 18px 16px; border: 1px solid #eef0f4; box-shadow: 0 6px 18px -10px rgba(15, 23, 42, 0.18); position: relative; overflow: hidden; }
      .sum-card::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: var(--c, #6366f1); }
      .sum-card:nth-child(1) { --c: #6366f1; }
      .sum-card:nth-child(2) { --c: #0d9488; }
      .sum-card:nth-child(3) { --c: #f59e0b; }
      .sum-card:nth-child(4) { --c: #ec4899; }
      .sum-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; font-weight: 700; }
      .sum-val { font-size: 28px; font-weight: 800; color: #0f172a; margin-top: 8px; letter-spacing: -0.02em; }
      .panel { background: #fff; border-radius: 16px; padding: 20px 22px; border: 1px solid #eef0f4; box-shadow: 0 6px 18px -12px rgba(15, 23, 42, 0.15); margin: 22px 0; }
      .panel h3 { font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; margin-bottom: 16px; display: flex; align-items: center; gap: 9px; font-weight: 800; }
      .panel h3::before { content: ''; width: 5px; height: 15px; border-radius: 4px; background: linear-gradient(180deg, #6366f1, #0d9488); }
      .ov-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
      .ov-item { background: linear-gradient(180deg, #f8fafc, #fff); border: 1px solid #eef0f4; border-radius: 13px; padding: 16px; }
      .ov-num { font-size: 24px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; }
      .ov-lab { font-size: 11px; color: #94a3b8; font-weight: 600; margin-top: 3px; }
      .comp-bar { height: 12px; background: #eef2f7; border-radius: 999px; overflow: hidden; margin-top: 14px; }
      .comp-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, #34d399, #0d9488); }
      .comp-cap { font-size: 12px; color: #475569; margin-top: 8px; font-weight: 600; }
      table { width: 100%; border-collapse: separate; border-spacing: 0; font-size: 12px; border: 1px solid #eef0f4; border-radius: 16px; overflow: hidden; }
      th { background: linear-gradient(180deg, #6366f1, #4f46e5); color: #fff; padding: 13px 14px; text-align: center; font-size: 10px; text-transform: uppercase; letter-spacing: 0.07em; font-weight: 700; }
      th:first-child { text-align: left; }
      td { padding: 10px 14px; border-top: 1px solid #f1f5f9; }
      tbody tr:nth-child(even) { background: #fafbfc; }
      tbody tr:first-child td { border-top: none; }
      .footer { margin-top: 30px; padding-top: 18px; border-top: 1px solid #eef0f4; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #94a3b8; }
      .footer .quote { font-style: italic; }
      .footer .brand { font-weight: 800; letter-spacing: 0.12em; color: #6366f1; }
      .section-title { font-size: 13px; text-transform: uppercase; letter-spacing: 0.07em; color: #475569; margin: 28px 0 14px; font-weight: 800; display: flex; align-items: center; gap: 9px; }
      .section-title::before { content: ''; width: 5px; height: 16px; border-radius: 4px; background: linear-gradient(180deg, #6366f1, #0d9488); }
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
    <div class="summary">
      <div class="sum-card"><div class="sum-label">Goals Set</div><div class="sum-val">${totalGoals}</div></div>
      <div class="sum-card"><div class="sum-label">Goals Done</div><div class="sum-val">${goalsDone}</div></div>
      <div class="sum-card"><div class="sum-label">Completion</div><div class="sum-val">${completionPct}%</div></div>
      <div class="sum-card"><div class="sum-label">Goal Streak</div><div class="sum-val">${goalStreak} days</div></div>
    </div>
    <div class="panel"><h3>Monthly Overview</h3>
      <div class="comp-bar"><div class="comp-fill" style="width:${completionPct}%"></div></div>
      <div class="comp-cap">Overall goal completion — ${completionPct}%</div>
      <div class="ov-grid" style="margin-top:18px">
        <div class="ov-item"><div class="ov-num">${daysWithGoals}</div><div class="ov-lab">Days with goals</div></div>
        <div class="ov-item"><div class="ov-num">${perfectDays}</div><div class="ov-lab">Perfect days (all done)</div></div>
      </div>
    </div>
    <div class="panel"><h3>6-Month Goal Trend</h3>
      <div style="display:flex;gap:14px;align-items:flex-end;padding:8px 2px 0">${trendBars}</div>
      <div style="font-size:11px;color:#94a3b8;margin-top:16px;border-top:1px solid #f1f5f9;padding-top:12px">Monthly completion rate — goals done vs set · current month highlighted</div>
    </div>
    <div class="section-title">Daily Goals Log</div>
    <table>
      <thead><tr><th>Date</th><th>Done / Total</th><th>Goals</th></tr></thead>
      <tbody>${rowHtml}</tbody>
    </table>
    <div class="footer">
      <span class="quote">"The secret of getting ahead is getting started." — Mark Twain</span>
      <span class="brand">LAMIM · ${genDate}</span>
    </div>
    <script>setTimeout(() => { window.print(); }, 800);</script>
    </body></html>`);
    win.document.close();
  },

  /* ---------- progress tab switching ---------- */
  switchProgressTab(tab) {
    this._activeProgressTab = tab;
    const card = document.getElementById('cb-progress-card');
    if (!card) return;
    card.querySelectorAll('.cb-progress-tab').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
    });
    if (tab === 'weekly') this.renderProgressWeekly();
    else if (tab === 'monthly') this.renderProgressMonthly();
    else if (tab === 'yearly') this.renderProgressYearly();
  },

  /* ---------- progress: weekly ---------- */
  renderProgressWeekly() {
    const statsEl = document.getElementById('cb-progress-stats');
    const chartEl = document.getElementById('cb-progress-chart');
    if (!statsEl) return;

    const selectedStr = this.selectedDate;
    const todayStr = Utils.todayStr();
    const isSelectedToday = selectedStr === todayStr;

    const dayData = DB.getCareer(selectedStr);
    const dayList = dayData.checklist || [];
    const dayDone = dayList.filter(x => x.done).length;
    const dayTotal = dayList.length;

    let streak = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date(this.selectedDate + 'T00:00:00');
      d.setDate(d.getDate() - i);
      const c = DB.getCareer(Utils.dateStr(d));
      const cl = c.checklist || [];
      const done = cl.filter(x => x.done).length;
      streak += cl.length > 0 ? done / cl.length : 0;
    }
    streak = Math.round(streak * 100) / 100;

    let weekGoalsDone = 0, weekGoalsTotal = 0, perfectDays = 0;
    const dayPctList = [];
    const dayNames = (typeof App !== 'undefined' && App.lang === 'bn')
      ? ['শনি', 'রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র']
      : ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(selectedStr + 'T00:00:00');
      d.setDate(d.getDate() - i);
      const ds = Utils.dateStr(d);
      const c = DB.getCareer(ds);
      const cl = c.checklist || [];
      const dDone = cl.filter(x => x.done).length;
      weekGoalsTotal += cl.length;
      weekGoalsDone += dDone;
      const pct = cl.length > 0 ? Math.round((dDone / cl.length) * 100) : 0;
      dayPctList.push({ label: dayNames[(d.getDay() + 1) % 7], pct, done: dDone, total: cl.length, isToday: ds === todayStr });
      if (cl.length > 0 && cl.every(x => x.done)) perfectDays++;
    }
    const weekPct = weekGoalsTotal > 0 ? Math.round(((weekGoalsDone / weekGoalsTotal) * 100) * 10) / 10 : 0;

    const t = (v) => window.n ? window.n(v) : v;
    const dayPct = dayTotal > 0 ? Math.round((dayDone / dayTotal) * 100) : 0;
    const streakText = streak > 0 ? t(streak % 1 === 0 ? streak : streak.toFixed(2)) + '/' + t(7) + '🔥' : '—';
    const heroLabel = isSelectedToday ? 'Today\'s Goals' : 'Day\'s Goals';

    statsEl.innerHTML = `
      <div class="cb-progress-hero-tile">
        <div class="cb-progress-ring-wrap" id="cb-progress-today-ring"></div>
        <div class="cb-progress-hero-info">
          <div class="cb-progress-hero-label">${heroLabel}</div>
          <div class="cb-progress-hero-val">${t(dayDone)} / ${t(dayTotal)}</div>
          <div class="cb-progress-hero-sub">${dayPct}% completed</div>
        </div>
      </div>
      <div class="cb-month-stat-card"><div class="cb-month-stat-label">Goal Streak</div><div class="cb-month-stat-val">${streakText}</div></div>
      <div class="cb-month-stat-card"><div class="cb-month-stat-label">Week Rate</div><div class="cb-month-stat-val">${t(weekPct)}/100%</div></div>
      <div class="cb-month-stat-card"><div class="cb-month-stat-label">Perfect Days</div><div class="cb-month-stat-val">${t(perfectDays)}/7</div></div>`;

    const ringEl = document.getElementById('cb-progress-today-ring');
    if (ringEl && window.Charts) {
      Charts.ring(ringEl, { size: 64, thickness: 7, value: 0, color: 'var(--cb-primary)', colorEnd: 'var(--cb-accent)' });
      setTimeout(() => Charts.animateRing(ringEl, dayPct, { size: 64, thickness: 7 }), 100);
    }

    if (chartEl) {
      const svgH = 190;
      const padTop = 24;
      const padBot = 28;
      const barArea = svgH - padTop - padBot;
      const svgW = 280;
      const cellW = svgW / 7;
      const isFirstRender = !chartEl.querySelector('svg');

      let svg = '';
      dayPctList.forEach((d, i) => {
        const h = d.total > 0 ? Math.max(6, (d.pct / 100) * barArea) : 6;
        const x = i * cellW + 5;
        const y = padTop + barArea - h;
        const w = cellW - 10;

        const gradId = 'bg' + i;
        const g1 = d.pct === 100 ? '#34d399' : d.pct >= 50 ? '#fbbf24' : '#818cf8';
        const g2 = d.pct === 100 ? '#10b981' : d.pct >= 50 ? '#f59e0b' : '#6366f1';

        svg += `<defs><linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${g1}"/><stop offset="100%" stop-color="${g2}"/>
        </linearGradient></defs>`;

        if (isFirstRender) {
          svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="url(#${gradId})" opacity="${d.isToday ? '1' : '0.8'}">
            <animate attributeName="height" from="0" to="${h}" dur="0.5s" fill="freeze"/>
            <animate attributeName="y" from="${padTop + barArea}" to="${y}" dur="0.5s" fill="freeze"/>
          </rect>`;
        } else {
          svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="url(#${gradId})" opacity="${d.isToday ? '1' : '0.8'}"/>`;
        }

        if (d.isToday) {
          svg += `<rect x="${x - 1}" y="${y - 1}" width="${w + 2}" height="${h + 2}" rx="7" fill="none" stroke="${g1}" stroke-width="1.5" opacity="0.5"/>`;
        }

        if (d.total > 0) {
          svg += `<text x="${x + w/2}" y="${y - 7}" text-anchor="middle" fill="${g1}" font-size="10" font-weight="700">${d.done}/${d.total}</text>`;
        }

        const labelColor = d.isToday ? 'var(--cb-text)' : 'var(--cb-text-muted)';
        const fw = d.isToday ? '700' : '500';
        svg += `<text x="${x + w/2}" y="${svgH - 8}" text-anchor="middle" fill="${labelColor}" font-size="11" font-weight="${fw}">${d.label}</text>`;
      });

      chartEl.innerHTML = `<svg width="100%" height="${svgH}" viewBox="0 0 ${svgW} ${svgH}" preserveAspectRatio="xMidYMid meet">${svg}</svg>`;
    }
  },

  /* ---------- progress: monthly ---------- */
  renderProgressMonthly() {
    const statsEl = document.getElementById('cb-progress-stats');
    const chartEl = document.getElementById('cb-progress-chart');
    const extraEl = document.getElementById('cb-progress-extra');
    if (!statsEl) return;

    const now = new Date(this.selectedDate + 'T00:00:00');
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayStr = Utils.todayStr();
    const today = new Date();
    const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();

    let monthGoalsDone = 0, monthGoalsTotal = 0, perfectDays = 0;
    const dayPctList = [];
    const todayDate = today.getDate();

    for (let d = 1; d <= daysInMonth; d++) {
      const dt = new Date(year, month, d);
      const ds = Utils.dateStr(dt);
      const isFuture = isCurrentMonth && d > todayDate;
      const c = isFuture ? { checklist: [] } : DB.getCareer(ds);
      const cl = c.checklist || [];
      const dDone = cl.filter(x => x.done).length;
      if (!isFuture) {
        monthGoalsTotal += cl.length;
        monthGoalsDone += dDone;
      }
      const pct = cl.length > 0 ? Math.round((dDone / cl.length) * 100) : 0;
      dayPctList.push({ label: String(d), pct, done: dDone, total: cl.length, isToday: ds === todayStr, isFuture });
      if (!isFuture && cl.length > 0 && cl.every(x => x.done)) perfectDays++;
    }

    const monthPct = monthGoalsTotal > 0 ? Math.round(((monthGoalsDone / monthGoalsTotal) * 100) * 10) / 10 : 0;

    let streak = 0;
    for (let i = 0; i < daysInMonth; i++) {
      const d = new Date(this.selectedDate + 'T00:00:00');
      d.setDate(d.getDate() - i);
      if (d.getMonth() !== month) break;
      const c = DB.getCareer(Utils.dateStr(d));
      const cl = c.checklist || [];
      const done = cl.filter(x => x.done).length;
      streak += cl.length > 0 ? done / cl.length : 0;
    }
    streak = Math.round(streak * 100) / 100;

    const t = (v) => window.n ? window.n(v) : v;
    const streakText = streak > 0 ? t(streak % 1 === 0 ? streak : streak.toFixed(2)) + '/' + t(daysInMonth) + '🔥' : '—';

    statsEl.innerHTML = `
      <div class="cb-progress-hero-tile">
        <div class="cb-progress-ring-wrap" id="cb-progress-monthly-ring"></div>
        <div class="cb-progress-hero-info">
          <div class="cb-progress-hero-label">Month's Goals</div>
          <div class="cb-progress-hero-val">${t(monthGoalsDone)} / ${t(monthGoalsTotal)}</div>
          <div class="cb-progress-hero-sub">${monthPct}% completed</div>
        </div>
      </div>
      <div class="cb-month-stat-card"><div class="cb-month-stat-label">Goal Streak</div><div class="cb-month-stat-val">${streakText}</div></div>
      <div class="cb-month-stat-card"><div class="cb-month-stat-label">Month Rate</div><div class="cb-month-stat-val">${t(monthPct)}/100%</div></div>
      <div class="cb-month-stat-card"><div class="cb-month-stat-label">Perfect Days</div><div class="cb-month-stat-val">${t(perfectDays)}/${t(daysInMonth)}</div></div>`;

    const ringEl = document.getElementById('cb-progress-monthly-ring');
    if (ringEl && window.Charts) {
      Charts.ring(ringEl, { size: 64, thickness: 7, value: 0, color: 'var(--cb-primary)', colorEnd: 'var(--cb-accent)' });
      setTimeout(() => Charts.animateRing(ringEl, monthPct, { size: 64, thickness: 7 }), 100);
    }

    if (chartEl) {
      const count = dayPctList.length;
      const svgH = 190;
      const padTop = 24;
      const padBot = 28;
      const barArea = svgH - padTop - padBot;
      const svgW = count * 30;
      const cellW = svgW / count;
      const isFirstRender = !chartEl.querySelector('svg');

      let svg = '';
      dayPctList.forEach((d, i) => {
        const h = d.isFuture ? 4 : (d.total > 0 ? Math.max(6, (d.pct / 100) * barArea) : 6);
        const x = i * cellW + 2;
        const y = padTop + barArea - h;
        const w = Math.max(4, cellW - 4);

        if (d.isFuture) {
          svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>`;
        } else {
          const gradId = 'mg' + i;
          const g1 = d.pct === 100 ? '#34d399' : d.pct >= 50 ? '#fbbf24' : '#818cf8';
          const g2 = d.pct === 100 ? '#10b981' : d.pct >= 50 ? '#f59e0b' : '#6366f1';

          svg += `<defs><linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${g1}"/><stop offset="100%" stop-color="${g2}"/></linearGradient></defs>`;

          if (isFirstRender) {
            svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="url(#${gradId})" opacity="${d.isToday ? '1' : '0.7'}">
              <animate attributeName="height" from="0" to="${h}" dur="0.5s" fill="freeze"/>
              <animate attributeName="y" from="${padTop + barArea}" to="${y}" dur="0.5s" fill="freeze"/>
            </rect>`;
          } else {
            svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="url(#${gradId})" opacity="${d.isToday ? '1' : '0.7'}"/>`;
          }

          if (d.isToday) {
            svg += `<rect x="${x - 1}" y="${y - 1}" width="${w + 2}" height="${h + 2}" rx="4" fill="none" stroke="${g1}" stroke-width="1.5" opacity="0.5"/>`;
          }

          if (d.total > 0) {
            const labelText = d.done + '/' + d.total;
            const labelW = labelText.length * 7.5 + 10;
            const labelH = 16;
            const labelX = x + w / 2;
            const labelY = y - 6;
            svg += `<rect x="${labelX - labelW/2}" y="${labelY - labelH + 2}" width="${labelW}" height="${labelH}" rx="8" fill="${g1}" opacity="0.2"/>`;
            svg += `<text x="${labelX}" y="${labelY}" text-anchor="middle" fill="${g1}" font-size="11" font-weight="800" letter-spacing="0.3">${labelText}</text>`;
          }
        }
      });

      dayPctList.forEach((d, i) => {
        const x = i * cellW + cellW / 2;
        const labelColor = d.isFuture ? 'rgba(255,255,255,0.15)' : (d.isToday ? 'var(--cb-text)' : 'var(--cb-text-muted)');
        svg += `<text x="${x}" y="${svgH - 8}" text-anchor="middle" fill="${labelColor}" font-size="10" font-weight="${d.isToday ? '700' : '500'}">${d.label}</text>`;
      });

      chartEl.innerHTML = `<div style="overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none"><svg width="${svgW}" height="${svgH}" viewBox="0 0 ${svgW} ${svgH}" style="display:block;min-width:${svgW}px">${svg}</svg></div>`;
    }

    if (extraEl) extraEl.innerHTML = '';
  },

  /* ---------- progress: yearly ---------- */
  renderProgressYearly() {
    const statsEl = document.getElementById('cb-progress-stats');
    const chartEl = document.getElementById('cb-progress-chart');
    const extraEl = document.getElementById('cb-progress-extra');
    if (!statsEl) return;

    const now = new Date(this.selectedDate + 'T00:00:00');
    const year = now.getFullYear();
    const today = new Date();
    const todayStr = Utils.todayStr();
    const isCurrentYear = year === today.getFullYear();

    let yearGoalsDone = 0, yearGoalsTotal = 0, perfectDays = 0, totalDays = 0;
    const monthData = [];
    const monthNames = (typeof App !== 'undefined' && App.lang === 'bn')
      ? ['জানু', 'ফেব্রু', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগ', 'সেপ্ট', 'অক্টো', 'নভে', 'ডিসে']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let m = 0; m < 12; m++) {
      const daysInMonth = new Date(year, m + 1, 0).getDate();
      let mDone = 0, mTotal = 0, mPerfect = 0, mDaysCounted = 0;
      for (let d = 1; d <= daysInMonth; d++) {
        const dt = new Date(year, m, d);
        if (isCurrentYear && dt > today) break;
        totalDays++;
        mDaysCounted++;
        const ds = Utils.dateStr(dt);
        const c = DB.getCareer(ds);
        const cl = c.checklist || [];
        const dDone = cl.filter(x => x.done).length;
        mTotal += cl.length;
        mDone += dDone;
        yearGoalsTotal += cl.length;
        yearGoalsDone += dDone;
        if (cl.length > 0 && cl.every(x => x.done)) { mPerfect++; perfectDays++; }
      }
      const mPct = mTotal > 0 ? Math.round((mDone / mTotal) * 100) : 0;
      monthData.push({ label: monthNames[m], pct: mPct, done: mDone, total: mTotal, isCurrent: m === now.getMonth() });
    }

    const yearPct = yearGoalsTotal > 0 ? Math.round(((yearGoalsDone / yearGoalsTotal) * 100) * 10) / 10 : 0;

    let streak = 0;
    for (let i = 0; i < 366; i++) {
      const d = new Date(this.selectedDate + 'T00:00:00');
      d.setDate(d.getDate() - i);
      if (d.getFullYear() !== year) break;
      const c = DB.getCareer(Utils.dateStr(d));
      const cl = c.checklist || [];
      const done = cl.filter(x => x.done).length;
      streak += cl.length > 0 ? done / cl.length : 0;
    }
    streak = Math.round(streak * 100) / 100;

    const t = (v) => window.n ? window.n(v) : v;
    const streakText = streak > 0 ? t(streak % 1 === 0 ? streak : streak.toFixed(2)) + '/' + t(totalDays) + '🔥' : '—';

    statsEl.innerHTML = `
      <div class="cb-progress-hero-tile">
        <div class="cb-progress-ring-wrap" id="cb-progress-yearly-ring"></div>
        <div class="cb-progress-hero-info">
          <div class="cb-progress-hero-label">Year's Goals</div>
          <div class="cb-progress-hero-val">${t(yearGoalsDone)} / ${t(yearGoalsTotal)}</div>
          <div class="cb-progress-hero-sub">${yearPct}% completed</div>
        </div>
      </div>
      <div class="cb-month-stat-card"><div class="cb-month-stat-label">Goal Streak</div><div class="cb-month-stat-val">${streakText}</div></div>
      <div class="cb-month-stat-card"><div class="cb-month-stat-label">Year Rate</div><div class="cb-month-stat-val">${t(yearPct)}/100%</div></div>
      <div class="cb-month-stat-card"><div class="cb-month-stat-label">Perfect Days</div><div class="cb-month-stat-val">${t(perfectDays)}/${t(totalDays)}</div></div>`;

    const ringEl = document.getElementById('cb-progress-yearly-ring');
    if (ringEl && window.Charts) {
      Charts.ring(ringEl, { size: 64, thickness: 7, value: 0, color: 'var(--cb-primary)', colorEnd: 'var(--cb-accent)' });
      setTimeout(() => Charts.animateRing(ringEl, yearPct, { size: 64, thickness: 7 }), 100);
    }

    if (chartEl) {
      const svgH = 190;
      const padTop = 24;
      const padBot = 28;
      const barArea = svgH - padTop - padBot;
      const svgW = 280;
      const cellW = svgW / 12;
      const isFirstRender = !chartEl.querySelector('svg');

      let svg = '';
      monthData.forEach((d, i) => {
        const h = d.total > 0 ? Math.max(6, (d.pct / 100) * barArea) : 6;
        const x = i * cellW + 3;
        const y = padTop + barArea - h;
        const w = cellW - 6;

        const gradId = 'yg' + i;
        const g1 = d.pct === 100 ? '#34d399' : d.pct >= 50 ? '#fbbf24' : '#818cf8';
        const g2 = d.pct === 100 ? '#10b981' : d.pct >= 50 ? '#f59e0b' : '#6366f1';

        svg += `<defs><linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${g1}"/><stop offset="100%" stop-color="${g2}"/></linearGradient></defs>`;

        if (isFirstRender) {
          svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="url(#${gradId})" opacity="${d.isCurrent ? '1' : '0.8'}">
            <animate attributeName="height" from="0" to="${h}" dur="0.5s" fill="freeze"/>
            <animate attributeName="y" from="${padTop + barArea}" to="${y}" dur="0.5s" fill="freeze"/>
          </rect>`;
        } else {
          svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="url(#${gradId})" opacity="${d.isCurrent ? '1' : '0.8'}"/>`;
        }

        if (d.isCurrent) {
          svg += `<rect x="${x - 1}" y="${y - 1}" width="${w + 2}" height="${h + 2}" rx="5" fill="none" stroke="${g1}" stroke-width="1.5" opacity="0.5"/>`;
        }

        if (d.total > 0) {
          const labelText = d.done + '/' + d.total;
          const labelW = labelText.length * 7 + 8;
          const labelH = 14;
          const labelX = x + w / 2;
          const labelY = y - 6;
          svg += `<rect x="${labelX - labelW/2}" y="${labelY - labelH + 2}" width="${labelW}" height="${labelH}" rx="7" fill="${g1}" opacity="0.18"/>`;
          svg += `<text x="${labelX}" y="${labelY}" text-anchor="middle" fill="${g1}" font-size="10" font-weight="800" letter-spacing="0.2">${labelText}</text>`;
        }

        const labelColor = d.isCurrent ? 'var(--cb-text)' : 'var(--cb-text-muted)';
        const fw = d.isCurrent ? '700' : '500';
        svg += `<text x="${x + w/2}" y="${svgH - 8}" text-anchor="middle" fill="${labelColor}" font-size="9" font-weight="${fw}">${d.label}</text>`;
      });

      chartEl.innerHTML = `<svg width="100%" height="${svgH}" viewBox="0 0 ${svgW} ${svgH}" preserveAspectRatio="xMidYMid meet">${svg}</svg>`;
    }

    if (extraEl) extraEl.innerHTML = '';
  }
};

window.Career = Career;
