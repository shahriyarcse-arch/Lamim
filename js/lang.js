const Translations = {
  // Navigation & Sections
  'Home': 'হোম',
  'Salah Tracker': 'সালাত ট্র্যাকার',
  'Dhikr Counter': 'যিকির কাউন্টার',
  'Nafl Salah': 'নফল সালাত',
  'Mujahid': 'মুজাহিদ',
  'Islamic Finance': 'ইসলামিক ফাইন্যান্স',
  'Analysis': 'বিশ্লেষণ',
  'Profile': 'প্রোফাইল',
  'Vanguard': 'অগ্রসেনা',
  'Admin Panel': 'অ্যাডমিন প্যানেল',
  
  // Dashboard & Home
  'Today': 'আজ',
  '📋 Today': '📋 আজকে',
  'Habits & Sunnah': 'অভ্যাস ও সুন্নাহ',
  'Knowledge Hub': 'জ্ঞানের হাব',
  'Total Vault Savings': 'মোট ভল্ট সেভিংস',
  'Total Balance': 'মোট ব্যালেন্স',
  
  // Salah
  'Fajr': 'ফজর',
  'Dhuhr': 'যোহর',
  'Asr': 'আসর',
  'Maghrib': 'মাগরিব',
  'Isha': 'এশা',
  'Tahajjud': 'তাহাজ্জুদ',
  'Jummah': 'জুমআ',
  'Reset Today': 'আজকের ডেটা রিসেট',
  'Prayer Settings': 'সালাত সেটিংস',
  
  // Dhikr
  'Dhikr': 'যিকির',
  'Target:': 'লক্ষ্য:',
  'Reset': 'রিসেট',
  'Total Count': 'সর্বমোট গণনা',
  
  // Nafl
  'Nafl Logs': 'নফল লগ',
  
  // Mujahid
  'Active': 'সক্রিয়',
  'Completed': 'সম্পন্ন',
  'Archived': 'আর্কাইভড',
  '➕ New Goal': '➕ নতুন লক্ষ্য',
  'New Goal': 'নতুন লক্ষ্য',
  'Cancel': 'বাতিল',
  'Save Goal': 'সেভ করুন',
  'Title': 'শিরোনাম',
  'Description': 'বিবরণ',
  'Target': 'লক্ষ্যমাত্রা',
  'Unit': 'একক',
  'Category': 'বিভাগ',
  'Priority': 'অগ্রাধিকার',
  'Deadline': 'শেষ সময়',
  'Recurring': 'পুনরাবৃত্তি',
  
  // Finance
  'Add Income': 'আয় যোগ করুন',
  'Add Expense': 'ব্যয় যোগ করুন',
  'Transaction History': 'লেনদেনের ইতিহাস',
  'Vaults': 'ভল্টসমূহ',
  'Amount': 'পরিমাণ',
  
  // Profile & Settings
  'Personal Information': 'ব্যক্তিগত তথ্য',
  'App Settings': 'অ্যাপ সেটিংস',
  'About': 'অ্যাপ সম্পর্কে',
  'Danger Zone': 'বিপজ্জনক জোন',
  'Theme': 'থিম',
  'Dark': 'ডার্ক',
  'Light': 'লাইট',
  'Export Data': 'ডেটা এক্সপোর্ট',
  'Import Data': 'ডেটা ইমপোর্ট',
  'JSON Backup': 'JSON ব্যাকআপ',
  'Export Salah Log': 'সালাত লগ এক্সপোর্ট',
  'Logout': 'লগআউট',
  'Delete Account': 'অ্যাকাউন্ট মুছুন',
  'App Version': 'অ্যাপ ভার্সন',
  'Privacy Policy': 'প্রাইভেসি পলিসি',
  'Prayer Notifications': 'সালাতের নোটিফিকেশন',
  'Calc Method': 'হিসাব পদ্ধতি',
  'Madhab': 'মাযহাব',
  'Name': 'নাম',
  'Email': 'ইমেইল',
  'Location': 'অবস্থান',
  'Not set': 'সেট করা নেই',
  
  // Global
  'Save': 'সেভ করুন',
  'Delete': 'মুছুন',
  'Edit': 'এডিট',
  'Confirm': 'নিশ্চিত করুন',
  'Success': 'সফল',
  'Error': 'ত্রুটি',
  'Language / ভাষা': 'Language / ভাষা',
  'All 5': 'সবগুলো',
  'None': 'একটিও না',
  'Administration Messages': 'প্রশাসনিক বার্তা'
};

window.t = function(key) {
  const lang = localStorage.getItem('lamim_lang') || 'en';
  if (lang === 'bn' && Translations[key]) {
    return Translations[key];
  }
  return key;
};
