/* =============================================
   LAMIM — PRAYER NOTIFICATION SCHEDULER
   Checks every 30s and fires notifications
   at prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha)
   ============================================= */

const PrayerNotifier = {
  _notified: null,          // Map of prayerKey -> true (today's sent notifications)
  _intervalId: null,
  _checkInterval: 30000,    // Check every 30 seconds
  _catchUpWindow: 30 * 60 * 1000, // Catch up on prayers missed up to 30 min ago (tab throttled)

  init() {
    if (this._intervalId) return;
    
    const settings = DB.getSettings();
    if (!settings.notifications) return;
    
    // Only start if permission is already granted — NEVER auto-prompt here
    if (!('Notification' in window) || Notification.permission !== 'granted') {
      return;
    }

    // Load today's already-sent notifications from localStorage, reset on new local day
    let notified = {};
    try { notified = JSON.parse(localStorage.getItem('lamim_notified') || '{}'); } catch (e) { notified = {}; }
    const lastDate = localStorage.getItem('lamim_notified_date') || '';
    if (lastDate !== Utils.todayStr()) {
      notified = {};
      localStorage.removeItem('lamim_notified');
    }
    this._notified = notified;

    // Start the checker loop
    this._intervalId = setInterval(() => this.check(), this._checkInterval);
    
    // Also check immediately
    setTimeout(() => this.check(), 2000);
    
  },

  stop() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  },

  restart() {
    this.stop();
    this._notified = null;
    this.init();
  },

  check() {
    const settings = DB.getSettings();
    if (!settings.notifications) return;
    if (!('Notification' in window) || Notification.permission !== 'granted') return;

    const times = Utils.calcPrayerTimes();
    if (!times || times.length === 0) return;

    const now = new Date();
    const todayStr = Utils.todayStr();

    // Roll over to a new local day: clear sent notifications
    if (localStorage.getItem('lamim_notified_date') !== todayStr) {
      this._notified = {};
      localStorage.removeItem('lamim_notified');
      localStorage.setItem('lamim_notified_date', todayStr);
    }

    // Notify for any prayer whose time has just started OR was missed while the
    // tab was throttled/backgrounded (within the catch-up window)
    for (const prayer of times) {
      const diff = now.getTime() - prayer.time.getTime();

      if (diff >= 0 && diff < this._catchUpWindow) {
        const prayerKey = `${todayStr}_${prayer.name}`;

        if (!this._notified[prayerKey]) {
          this._notified[prayerKey] = true;
          try {
            localStorage.setItem('lamim_notified', JSON.stringify(this._notified));
            localStorage.setItem('lamim_notified_date', todayStr);
          } catch (e) { /* storage full / disabled — in-memory dedupe still works */ }

          this.sendNotification(prayer);
          return;
        }
      }
    }
  },

  sendNotification(prayer) {
    const prayerNames = {
      fajr: { en: 'Fajr', bn: 'ফজর', emoji: '🌅' },
      dhuhr: { en: 'Dhuhr', bn: 'যোহর', emoji: '☀️' },
      asr: { en: 'Asr', bn: 'আসর', emoji: '🌤️' },
      maghrib: { en: 'Maghrib', bn: 'মাগরিব', emoji: '🌅' },
      isha: { en: 'Isha', bn: 'এশা', emoji: '🌙' }
    };

    const info = prayerNames[prayer.name] || { en: prayer.name, bn: prayer.name, emoji: '🕌' };
    const lang = localStorage.getItem('lamim_lang') || 'en';
    const isBn = lang === 'bn';

    const title = isBn 
      ? `${info.emoji} ${info.bn} এর সময় হয়েছে!`
      : `${info.emoji} Time for ${info.en}!`;
    
    const body = isBn
      ? `এখনই সালাত আদায় করুন। আল্লাহ আপনাকে কবুল করুন।`
      : `Pray now. May Allah accept your prayer.`;

    try {
      // Try Service Worker notification first (works in background)
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.ready.then(reg => {
          reg.showNotification(title, {
            body: body,
            icon: './icons/icon-192.png',
            badge: './icons/icon-72.png',
            tag: `prayer-${prayer.name}`,
            renotify: true,
            vibrate: [200, 100, 200, 100, 200],
            requireInteraction: true,
            data: { prayer: prayer.name }
          });
        });
      } else {
        // Fallback to regular Notification API
        new Notification(title, {
          body: body,
          icon: './icons/icon-192.png',
          tag: `prayer-${prayer.name}`,
          requireInteraction: true
        });
      }

    } catch (e) {
      console.error('[PrayerNotifier] Failed to send notification:', e);
    }
  }
};


