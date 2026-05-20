/* =============================================
   LAMIM — HIJRI DATE CALCULATOR (Umm al-Qura style)
   ============================================= */
const Hijri = {
  // Simple approximation for Hijri date
  getToday() {
    const date = new Date();
    return this.fromDate(date);
  },

  fromDate(date) {
    // This is a common algorithm for Gregorian to Hijri conversion
    let jd = 0;
    if ((date.getFullYear() > 1582) || ((date.getFullYear() == 1582) && (date.getMonth() > 9)) || ((date.getFullYear() == 1582) && (date.getMonth() == 9) && (date.getDate() > 14))) {
      jd = Math.floor((1461 * (date.getFullYear() + 4800 + Math.floor((date.getMonth() - 13) / 12))) / 4) + Math.floor((367 * (date.getMonth() - 1 - 12 * (Math.floor((date.getMonth() - 13) / 12)))) / 12) - Math.floor((3 * (Math.floor((date.getFullYear() + 4900 + Math.floor((date.getMonth() - 13) / 12)) / 100))) / 4) + date.getDate() - 32075;
    } else {
      jd = 367 * date.getFullYear() - Math.floor((7 * (date.getFullYear() + 5001 + Math.floor((date.getMonth() - 8) / 12))) / 4) + Math.floor((275 * date.getMonth()) / 9) + date.getDate() + 1729777;
    }

    let l = jd - 1948440 + 10632;
    let n = Math.floor((l - 1) / 10631);
    l = l - 10631 * n + 354;
    let j = (Math.floor((10985 - l) / 5316)) * (Math.floor((50 * l) / 17719)) + (Math.floor(l / 5670)) * (Math.floor((43 * l) / 15238));
    l = l - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
    
    let m = Math.floor((24 * l) / 709);
    let d = l - Math.floor((709 * m) / 24);
    let y = 30 * n + j - 30;

    return {
      day: d,
      month: m,
      year: y,
      monthName: this.getMonthName(m)
    };
  },

  getMonthName(m) {
    const months = [
      "Muharram", "Safar", "Rabi' al-awwal", "Rabi' al-thani",
      "Jumada al-ula", "Jumada al-akhira", "Rajab", "Sha'ban",
      "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
    ];
    const monthsBn = [
      "মুহররম", "সফর", "রবিউল আউয়াল", "রবিউস সানি",
      "জমাদিউল আউয়াল", "জমাদিউস সানি", "রজব", "শাবান",
      "রমজান", "শাওয়াল", "জিলকদ", "জিলহজ্জ"
    ];
    
    const lang = DB.rawGet('lamim_lang') || 'en';
    return lang === 'bn' ? monthsBn[m - 1] : months[m - 1];
  }
};

window.Hijri = Hijri;
