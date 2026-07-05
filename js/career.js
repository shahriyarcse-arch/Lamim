const Career = {
  selectedDate: '',

  _icons: {
    clock: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    target: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"/><path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>',
    flame: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
    clipboard: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>',
    chart: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
    code: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    book: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/></svg>',
    globe: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    trending: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
    brain: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4"/><path d="M12 2a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4"/><path d="M8 8h8"/><path d="M8 12h8"/><path d="M8 16h8"/></svg>'
  },

  _catOptions: [
    { value: 'coding', label: 'Coding / Tech', icon: 'code' },
    { value: 'reading', label: 'Reading', icon: 'book' },
    { value: 'language', label: 'Language', icon: 'globe' },
    { value: 'business', label: 'Business', icon: 'trending' },
    { value: 'general', label: 'General', icon: 'brain' }
  ],

  init() {
    this.selectedDate = Utils.todayStr();
    this.renderAll();
    this.bindEvents();
  },

  renderAll() {
    this.renderHeader();
    this.renderStatsSummary();
    this.renderStudyLog();
    this.renderChecklist();
    this.renderHeatMap();
    this.renderWeekChart();
    this.renderSkillProgress();
  },

  renderHeader() {
    const label = document.getElementById('career-date-label');
    if (!label) return;
    const isToday = this.selectedDate === Utils.todayStr();
    if (isToday) {
      label.textContent = 'Today';
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
    if (prev && !prev.dataset.bound) {
      prev.addEventListener('click', () => this.changeDay(-1));
      prev.dataset.bound = 'true';
    }
    if (next && !next.dataset.bound) {
      next.addEventListener('click', () => this.changeDay(1));
      next.dataset.bound = 'true';
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

  _getWeekDates() {
    const now = new Date(this.selectedDate + 'T00:00:00');
    const dayOfWeek = now.getDay();
    const diff = (dayOfWeek + 1) % 7;
    const satDate = new Date(now);
    satDate.setDate(now.getDate() - diff);
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(satDate);
      d.setDate(satDate.getDate() + i);
      dates.push(Utils.dateStr(d));
    }
    return dates;
  },

  /* ==== STATS SUMMARY ==== */
  renderStatsSummary() {
    const container = document.getElementById('career-stats-summary');
    if (!container) return;

    const data = DB.getCareer(this.selectedDate);
    const studyMins = data.studyDuration || 0;
    const checklist = data.checklist || [];
    const done = checklist.filter(x => x.done).length;
    const total = checklist.length;
    const streak = DB.getCareerStreak();

    const n = window.n || (v => v);

    container.innerHTML = `
      <div class="career-stat-pill">
        <span class="stat-icon">${this._icons.clock}</span>
        <span class="stat-value">${n(studyMins)}</span>
        <span class="stat-label">mins today</span>
      </div>
      <div class="career-stat-pill">
        <span class="stat-icon">${this._icons.target}</span>
        <span class="stat-value">${n(done)}/${n(total)}</span>
        <span class="stat-label">goals done</span>
      </div>
      <div class="career-stat-pill">
        <span class="stat-icon">${this._icons.flame}</span>
        <span class="stat-value">${n(streak)}d</span>
        <span class="stat-label">streak</span>
      </div>
    `;
  },

  /* ==== STUDY LOG ==== */
  renderStudyLog() {
    const data = DB.getCareer(this.selectedDate);

    const topicInput = document.getElementById('career-study-topic');
    const durationVal = document.getElementById('career-study-duration-val');
    const durationInput = document.getElementById('career-study-duration');
    const categorySelect = document.getElementById('career-study-category');
    const notesInput = document.getElementById('career-study-notes');

    if (topicInput) topicInput.value = data.focusTopic || '';
    if (durationInput) {
      durationInput.value = data.studyDuration || 0;
      if (durationVal) {
        const mins = data.studyDuration || 0;
        const hrs = Math.floor(mins / 60);
        const rem = mins % 60;
        durationVal.textContent = hrs > 0 ? `${hrs}h ${rem}m` : `${mins} mins`;
      }
    }
    if (notesInput) notesInput.value = data.notes || '';

    if (categorySelect) {
      if (!categorySelect.dataset.populated) {
        this._catOptions.forEach(c => {
          const opt = document.createElement('option');
          opt.value = c.value;
          opt.textContent = c.label;
          categorySelect.appendChild(opt);
        });
        categorySelect.dataset.populated = '1';
      }
      categorySelect.value = data.category || 'coding';
    }
  },

  onStudyDurationChange() {
    const durationInput = document.getElementById('career-study-duration');
    const durationVal = document.getElementById('career-study-duration-val');
    if (durationInput && durationVal) {
      const mins = parseInt(durationInput.value, 10) || 0;
      const hrs = Math.floor(mins / 60);
      const rem = mins % 60;
      durationVal.textContent = hrs > 0 ? `${hrs}h ${rem}m` : `${mins} mins`;
    }
  },

  saveStudyLog() {
    const topicInput = document.getElementById('career-study-topic');
    const durationInput = document.getElementById('career-study-duration');
    const categorySelect = document.getElementById('career-study-category');
    const notesInput = document.getElementById('career-study-notes');

    const topic = topicInput ? topicInput.value.trim() : '';
    const duration = durationInput ? parseInt(durationInput.value, 10) : 0;
    const category = categorySelect ? categorySelect.value : 'coding';
    const notes = notesInput ? notesInput.value.trim() : '';

    const data = DB.getCareer(this.selectedDate);
    data.focusTopic = topic;
    data.studyDuration = duration;
    data.category = category;
    data.notes = notes;

    DB.setCareer(this.selectedDate, data);
    Utils.toast('Study session saved!', 'success');

    this.renderStatsSummary();
    this.renderHeatMap();
    this.renderWeekChart();
    this.renderSkillProgress();
    window.dispatchEvent(new CustomEvent('lamim:data-updated'));
  },

  /* ==== CHECKLIST ==== */
  renderChecklist() {
    const data = DB.getCareer(this.selectedDate);
    const checklist = data.checklist || [];

    const container = document.getElementById('career-checklist-container');
    if (!container) return;

    if (checklist.length === 0) {
      container.innerHTML = `
        <div class="career-empty-state">
          <span class="empty-icon">${this._icons.clipboard}</span>
          No goals set for today. Tap "+ Add" to start tracking.
        </div>
      `;
      return;
    }

    container.innerHTML = checklist.map(item => `
      <div class="career-checklist-item ${item.done ? 'done' : ''}" onclick="Career.toggleChecklistItem(${item.id})">
        <div class="career-checkbox">${item.done ? '✓' : ''}</div>
        <span class="career-item-text">${Utils.escapeHTML(item.text)}</span>
        <button class="career-item-del" onclick="Career.deleteChecklistItem(${item.id}, event)">×</button>
      </div>
    `).join('');
  },

  toggleChecklistItem(id) {
    const data = DB.getCareer(this.selectedDate);
    const item = (data.checklist || []).find(x => x.id === id);
    if (item) {
      item.done = !item.done;
      DB.setCareer(this.selectedDate, data);
      this.renderChecklist();
      this.renderStatsSummary();
      this.renderHeatMap();
      window.dispatchEvent(new CustomEvent('lamim:data-updated'));
    }
  },

  addChecklistItem() {
    const text = prompt('Enter goal description:');
    if (!text || !text.trim()) return;

    const data = DB.getCareer(this.selectedDate);
    if (!data.checklist) data.checklist = [];
    const newId = data.checklist.length > 0 ? Math.max(...data.checklist.map(x => x.id)) + 1 : 1;
    data.checklist.push({ id: newId, text: text.trim(), done: false });

    DB.setCareer(this.selectedDate, data);
    this.renderChecklist();
    this.renderStatsSummary();
    this.renderHeatMap();
    window.dispatchEvent(new CustomEvent('lamim:data-updated'));
  },

  deleteChecklistItem(id, e) {
    if (e) e.stopPropagation();
    const data = DB.getCareer(this.selectedDate);
    if (data.checklist) {
      data.checklist = data.checklist.filter(x => x.id !== id);
      DB.setCareer(this.selectedDate, data);
      this.renderChecklist();
      this.renderStatsSummary();
      this.renderHeatMap();
      window.dispatchEvent(new CustomEvent('lamim:data-updated'));
    }
  },

  /* ==== HEAT MAP ==== */
  renderHeatMap() {
    const container = document.getElementById('career-heatmap-container');
    if (!container) return;

    const weekDays = [
      { key: 'Saturday', label: 'Sat' },
      { key: 'Sunday', label: 'Sun' },
      { key: 'Monday', label: 'Mon' },
      { key: 'Tuesday', label: 'Tue' },
      { key: 'Wednesday', label: 'Wed' },
      { key: 'Thursday', label: 'Thu' },
      { key: 'Friday', label: 'Fri' }
    ];

    const weekDates = this._getWeekDates();

    container.innerHTML = weekDays.map((wd, idx) => {
      const ds = weekDates[idx];
      const d = new Date(ds + 'T00:00:00');
      const career = DB.getCareer(ds);
      const studyMins = career.studyDuration || 0;
      const checkedOff = career.checklist ? career.checklist.some(x => x.done) : false;
      const isFuture = ds > Utils.todayStr();

      let levelClass = 'empty';
      if (isFuture) {
        // keep empty
      } else if (studyMins >= 120) {
        levelClass = 'high';
      } else if (studyMins > 0) {
        levelClass = 'medium';
      } else if (checkedOff) {
        levelClass = 'low';
      }

      const activeClass = ds === this.selectedDate ? 'current-active' : '';

      return `
        <div class="career-heatmap-cell ${levelClass} ${activeClass}"
             onclick="Career.jumpToDate('${ds}')">
          <span class="cell-label">${wd.label}</span>
          <div class="cell-dot"></div>
        </div>
      `;
    }).join('');
  },

  jumpToDate(dateStr) {
    if (dateStr <= Utils.todayStr()) {
      this.selectedDate = dateStr;
      this.renderAll();
    }
  },

  /* ==== WEEKLY CHART ==== */
  renderWeekChart() {
    const container = document.getElementById('career-chart-container');
    if (!container) return;

    const weekDays = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const weekDates = this._getWeekDates();

    let maxMins = 0;
    const dayMins = weekDates.map(ds => {
      if (ds > Utils.todayStr()) return -1;
      const mins = DB.getCareer(ds).studyDuration || 0;
      if (mins > maxMins) maxMins = mins;
      return mins;
    });

    const n = window.n || (v => v);

    container.innerHTML = weekDays.map((label, idx) => {
      const mins = dayMins[idx];
      if (mins === -1) {
        return `
          <div class="career-chart-col">
            <div class="career-chart-bar-wrap">
              <div class="career-chart-bar empty"></div>
            </div>
            <span class="career-chart-label">${label}</span>
          </div>
        `;
      }

      const pct = maxMins > 0 ? (mins / maxMins) * 100 : 0;
      const hrs = Math.floor(mins / 60);
      const rem = mins % 60;
      const display = hrs > 0 ? `${hrs}h` : `${rem}m`;

      return `
        <div class="career-chart-col">
          <span class="career-chart-value">${display}</span>
          <div class="career-chart-bar-wrap">
            <div class="career-chart-bar" style="height:${Math.max(6, pct)}%"></div>
          </div>
          <span class="career-chart-label">${label}</span>
        </div>
      `;
    }).join('');
  },

  /* ==== SKILL PROGRESS ==== */
  renderSkillProgress() {
    const container = document.getElementById('career-skill-bars');
    if (!container) return;

    const categories = [
      { key: 'coding', label: '${this._icons.code} Coding', color: 'coding' },
      { key: 'reading', label: '${this._icons.book} Reading', color: 'reading' },
      { key: 'language', label: '${this._icons.globe} Language', color: 'language' },
      { key: 'business', label: '${this._icons.trending} Business', color: 'business' },
      { key: 'general', label: '${this._icons.brain} General', color: 'general' }
    ];

    const weekDates = this._getWeekDates();

    const totals = {};
    categories.forEach(c => totals[c.key] = 0);

    weekDates.forEach(ds => {
      if (ds > Utils.todayStr()) return;
      const career = DB.getCareer(ds);
      const cat = career.category || 'coding';
      const mins = career.studyDuration || 0;
      if (totals[cat] !== undefined) totals[cat] += mins;
    });

    const maxTotal = Math.max(1, ...Object.values(totals));

    const n = window.n || (v => v);

    let html = `<div class="career-skill-title">${this._icons.chart} This Week by Category</div>`;

    categories.forEach(c => {
      const mins = totals[c.key];
      const pct = (mins / maxTotal) * 100;
      const hrs = Math.floor(mins / 60);
      const rem = mins % 60;
      const display = hrs > 0 ? `${hrs}h ${rem}m` : `${mins}m`;

      html += `
        <div class="career-skill-row">
          <span class="career-skill-label">${c.label}</span>
          <div class="career-skill-track">
            <div class="career-skill-fill ${c.color}" style="width:${Math.max(4, pct)}%"></div>
          </div>
          <span class="career-skill-hours">${display}</span>
        </div>
      `;
    });

    container.innerHTML = html;
  }
};
