/* =============================================
   LAMIM — OFFLINE AUTH/SETUP MODULE
   ============================================= */
const Auth = {
  init() {
    this.selectedGender = null;
    this.bindSetup();
  },

  setGender(gender) {
    this.selectedGender = gender;
    const maleCard = document.getElementById('setup-gender-male');
    const femaleCard = document.getElementById('setup-gender-female');
    if (gender === 'male') {
      maleCard?.classList.add('active');
      femaleCard?.classList.remove('active');
    } else {
      femaleCard?.classList.add('active');
      maleCard?.classList.remove('active');
    }
  },



  nextStep(currentStep) {
    if (currentStep === 1) {
      const nameInput = document.getElementById('setup-name');
      const err = document.getElementById('setup-name-err');
      const name = nameInput ? nameInput.value.trim() : '';
      if (!name) {
        if (nameInput) nameInput.classList.add('input-error');
        if (err) { err.textContent = 'Name is required'; err.classList.add('show'); }
        if (nameInput) nameInput.focus();
        return;
      }
      if (name.length < 2 || name.length > 50) {
        if (nameInput) nameInput.classList.add('input-error');
        if (err) { err.textContent = 'Name must be 2–50 characters'; err.classList.add('show'); }
        if (nameInput) nameInput.focus();
        return;
      }
      if (nameInput) nameInput.classList.remove('input-error');
      if (err) err.classList.remove('show');
    }
    
    if (currentStep === 2) {
      if (!this.selectedGender) {
        Utils.toast('Please select a gender to continue', 'warning');
        return; // Prevent skipping
      }
    }

    // Step 3 (DOB) always has a valid value via drum picker, so we can proceed safely
    this.goToStep(currentStep + 1);
  },

  prevStep(currentStep) {
    this.goToStep(currentStep - 1);
  },

  goToStep(stepNum) {
    const wrapper = document.getElementById('setup-steps-wrapper');
    if (!wrapper) return;

    // 4 steps — each is 25% wide
    const translatePct = -((stepNum - 1) * 25);
    wrapper.style.transform = `translateX(${translatePct}%)`;

    // Update progress dots
    const dots = document.querySelectorAll('.setup-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === (stepNum - 1));
    });

    // Re-trigger anim-target animations on the new step
    const newStep = document.querySelector(`.setup-step[data-step="${stepNum}"]`);
    if (newStep) {
      newStep.querySelectorAll('.anim-target').forEach((el, i) => {
        el.style.animation = 'none';
        void el.offsetHeight;
        el.style.animation = '';
        el.style.animationDelay = (i * 0.08) + 's';
      });
    }

    // Initialise DOB drum picker when arriving at step 3
    if (stepNum === 3) this.initDOBPicker();
  },

  initDOBPicker() {
    if (this._dobReady) return; // only build once
    this._dobReady = true;

    const ITEM_H = 44;
    const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let selD = 0, selM = 0, selY = 60; // defaults: day=1, Jan, year=2000

    const fill = (colId, labels, defaultIdx) => {
      const col = document.getElementById(colId);
      if (!col) return;
      let h = '<div class="dob-drum-pad"></div>';
      labels.forEach(l => { h += `<div class="dob-drum-item">${l}</div>`; });
      h += '<div class="dob-drum-pad"></div>';
      col.innerHTML = h;
      requestAnimationFrame(() => { col.scrollTop = defaultIdx * ITEM_H; });

      let t;
      col.addEventListener('scroll', () => {
        clearTimeout(t);
        t = setTimeout(() => {
          const idx = Math.round(col.scrollTop / ITEM_H);
          col.scrollTo({ top: idx * ITEM_H, behavior: 'smooth' });
          return idx;
        }, 80);
      }, { passive: true });
      return col;
    };

    const days = Array.from({length:31}, (_,i) => String(i+1).padStart(2,'0'));
    const years = Array.from({length:86}, (_,i) => String(1930+i));

    const colD = fill('dob-col-d', days, selD);
    const colM = fill('dob-col-m', MONTHS, selM);
    const colY = fill('dob-col-y', years, selY);

    const sync = () => {
      if (colD) selD = Math.round(colD.scrollTop / ITEM_H);
      if (colM) selM = Math.round(colM.scrollTop / ITEM_H);
      if (colY) selY = Math.round(colY.scrollTop / ITEM_H);
      const inp = document.getElementById('setup-dob');
      if (inp) inp.value = `${1930+selY}-${String(selM+1).padStart(2,'0')}-${String(selD+1).padStart(2,'0')}`;
    };

    [colD, colM, colY].forEach(col => {
      if (!col) return;
      col.addEventListener('scroll', () => { clearTimeout(col._st); col._st = setTimeout(sync, 120); }, {passive:true});
    });

    sync();
  },

  async detectLocation(e) {
    if (this._isSyncingLocation) return;
    this._isSyncingLocation = true;

    const statusText = document.getElementById('setup-location-status');
    const icon = document.getElementById('setup-detect-icon');
    const latInput = document.getElementById('setup-lat');
    const lngInput = document.getElementById('setup-lng');
    const err = document.getElementById('setup-loc-err');

    if (statusText) statusText.textContent = 'Detecting your coordinates...';
    if (icon) icon.classList.add('rotating');
    if (err) err.classList.remove('show');

    const updateFields = (lat, lng) => {
      if (latInput) latInput.value = lat.toFixed(6);
      if (lngInput) lngInput.value = lng.toFixed(6);
      // Instant cached name + background refresh via shared helper
      Utils.reverseGeocode(lat, lng, (name) => {
        if (statusText) statusText.textContent = `Detected: ${name}`;
        Utils.toast(`Location detected: ${name}`, 'success');
        if (icon) icon.classList.remove('rotating');
        this._isSyncingLocation = false;
      });
    };

    if (!navigator.geolocation) {
      this.ipLocationFallback(updateFields, icon, statusText);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => updateFields(pos.coords.latitude, pos.coords.longitude),
      (geoErr) => {
        console.warn("Setup geolocation failed, trying IP fallback...", geoErr);
        this.ipLocationFallback(updateFields, icon, statusText);
      },
      { timeout: 6000 }
    );
  },

  async ipLocationFallback(updateFields, icon, statusText) {
    try {
      if (!navigator.onLine) throw new Error("Offline");
      const ctrl = new AbortController();
      const to = setTimeout(() => ctrl.abort(), 8000);
      const res = await fetch('https://ipapi.co/json/', { signal: ctrl.signal });
      clearTimeout(to);
      if (!res.ok) throw new Error(res.status);
      const data = await res.json();
      if (data.latitude && data.longitude) {
        updateFields(data.latitude, data.longitude);
      } else {
        throw new Error("IP Geolocation failed");
      }
    } catch (ipErr) {
      Utils.toast('Could not detect location. Please input coordinates manually.', 'warning');
      if (statusText) statusText.textContent = 'Auto-detection failed. Enter manually.';
      if (icon) icon.classList.remove('rotating');
      this._isSyncingLocation = false;
    }
  },

  submitSetup() {
    if (this._submitting) return;
    const nameInput = document.getElementById('setup-name');
    const name = (nameInput ? nameInput.value.trim() : '');

    if (!name) {
      this.goToStep(1);
      if (nameInput) nameInput.classList.add('input-error');
      const err = document.getElementById('setup-name-err');
      if (err) { err.textContent = 'Name is required'; err.classList.add('show'); }
      if (nameInput) nameInput.focus();
      return;
    }
    if (name.length < 2 || name.length > 50) {
      this.goToStep(1);
      if (nameInput) nameInput.classList.add('input-error');
      const err = document.getElementById('setup-name-err');
      if (err) { err.textContent = 'Name must be 2–50 characters'; err.classList.add('show'); }
      if (nameInput) nameInput.focus();
      return;
    }

    const langSelect = document.getElementById('setup-lang');
    const currencySelect = document.getElementById('setup-currency');
    const latInput = document.getElementById('setup-lat');
    const lngInput = document.getElementById('setup-lng');
    const dobInput = document.getElementById('setup-dob');
    const bioInput = document.getElementById('setup-bio');

    if (!latInput || !latInput.value || isNaN(parseFloat(latInput.value)) || !lngInput || !lngInput.value || isNaN(parseFloat(lngInput.value))) {
      Utils.toast('Please detect your location or enter coordinates manually', 'warning');
      const err = document.getElementById('setup-loc-err');
      if (err) { err.textContent = 'Location is required'; err.classList.add('show'); }
      return; // Prevent form submission without location
    }

    this._submitting = true;
    const finishBtn = document.getElementById('setup-finish-btn');
    if (finishBtn) { finishBtn.disabled = true; finishBtn.classList.add('btn-loading'); }

    try {
      const language = langSelect ? langSelect.value : 'en';
      const currency = currencySelect ? currencySelect.value : 'USD';
      const lat = parseFloat(latInput.value);
      const lng = parseFloat(lngInput.value);
      const gender = this.selectedGender || 'male';
      let dob = dobInput ? dobInput.value : '';
      if (dob) {
        const parts = dob.split('-');
        if (parts.length === 3) {
          const y = parseInt(parts[0], 10), m = parseInt(parts[1], 10), d = parseInt(parts[2], 10);
          const maxDay = new Date(y, m, 0).getDate();
          if (d > maxDay) dob = `${y}-${String(m).padStart(2,'0')}-${String(maxDay).padStart(2,'0')}`;
        }
      }
      const bio = bioInput ? bioInput.value.trim() : '';

      const user = {
        id: 'local_' + Date.now(),
        name: name,
        email: 'local@lamim.offline',
        role: 'user',
        gender: gender,
        dob: dob,
        bio: bio,
        avatar: null,
        location: '',
        createdAt: new Date().toISOString()
      };

      const settings = DB.getSettings();
      settings.language = language;
      settings.currency = currency;
      settings.lat = lat;
      settings.lng = lng;

      // Generate a unique virtual card number for this account at creation time
      if (!settings.cardNumber) {
        const grp = () => Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('');
        settings.cardNumber = grp() + grp() + grp() + grp();
      }

      const statusText = document.getElementById('setup-location-status');
      if (statusText && statusText.textContent.startsWith('Detected: ')) {
        settings.locationName = statusText.textContent.replace('Detected: ', '');
      } else {
        settings.locationName = lat.toFixed(2) + ', ' + lng.toFixed(2);
      }

      DB.setUser(user);
      DB.setSettings(settings);

      Utils.toast('Welcome, ' + name + '!', 'success');

      setTimeout(() => {
        App.showDashboard();
        this._submitting = false;
        if (finishBtn) { finishBtn.disabled = false; finishBtn.classList.remove('btn-loading'); }
      }, 400);
    } catch (err) {
      console.error('[Auth] submitSetup error:', err);
      Utils.toast('Something went wrong. Please try again.', 'error');
      this._submitting = false;
      if (finishBtn) { finishBtn.disabled = false; finishBtn.classList.remove('btn-loading'); }
    }
  },

  resetSetup() {
    this.selectedGender = null;
    this._dobReady = false;
    this._submitting = false;
    ['setup-name', 'setup-dob', 'setup-lat', 'setup-lng', 'setup-bio'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    const nameInput = document.getElementById('setup-name');
    if (nameInput) nameInput.classList.remove('input-error');
    const nameErr = document.getElementById('setup-name-err');
    if (nameErr) { nameErr.textContent = ''; nameErr.classList.remove('show'); }
    const locErr = document.getElementById('setup-loc-err');
    if (locErr) { locErr.textContent = ''; locErr.classList.remove('show'); }
    ['setup-gender-male', 'setup-gender-female'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('active');
    });
    this.setLang('en');
    this.setCurrency('USD');
    const finishBtn = document.getElementById('setup-finish-btn');
    if (finishBtn) { finishBtn.disabled = false; finishBtn.classList.remove('btn-loading'); }
    this.goToStep(1);
  },

  bindSetup() {
    if (this._setupBound) return;
    this._setupBound = true;
    const nameInput = document.getElementById('setup-name');
    if (nameInput) {
      nameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); this.submitSetup(); }
      });
      nameInput.addEventListener('input', () => {
        if (nameInput.value.trim()) {
          nameInput.classList.remove('input-error');
          const err = document.getElementById('setup-name-err');
          if (err) err.classList.remove('show');
        }
      });
    }
  },

  logout() {
    const isBn = (localStorage.getItem('lamim_lang') || 'en') === 'bn';
    const title = isBn ? 'লগ আউট' : 'Log Out';
    const msg = isBn
      ? 'লগ আউট করবেন এবং ওয়েলকাম স্ক্রিনে ফিরে যাবেন। আপনার লোকাল ডাটা এই ডিভাইসেই থাকবে।'
      : 'Log out and return to the welcome screen. Your local data stays on this device.';
    Utils.dangerConfirm({
      title,
      message: msg,
      icon: '<svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>',
      color: '#8b5cf6',
      confirmText: isBn ? 'লগ আউট' : 'Log Out',
      onConfirm: () => {
        DB.remove('lamim_user');
        document.body.classList.remove('home-active');
        Utils.toast(isBn ? 'লগ আউট করা হয়েছে' : 'Logged out', 'info');
        this.resetSetup();
        setTimeout(() => App.showPage('setup'), 500);
      }
    });
  }
};


