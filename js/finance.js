/* =============================================
   LAMIM — FINANCE MODULE (COMPLETE ENGINE)
   ============================================= */
const Finance = {
  categories: [
    /* --- 220+ MASTER CATEGORIES DATABASE --- */
    { id: 'bazar', name: 'Kacha Bazar', icon: '🥦', color: '#34C759', section: 'Bazar & Food' },
    { id: 'fish', name: 'Fish (Maach)', icon: '🐟', color: '#007AFF', section: 'Bazar & Food' },
    { id: 'meat', name: 'Meat (Goru/Khashi)', icon: '🍖', color: '#FF2D55', section: 'Bazar & Food' },
    { id: 'chicken', name: 'Chicken (Murgi)', icon: '🍗', color: '#FF9500', section: 'Bazar & Food' },
    { id: 'grocery', name: 'Grocery (Mudi)', icon: '🛒', color: '#5856D6', section: 'Bazar & Food' },
    { id: 'rice', name: 'Rice (Chaal)', icon: '🌾', color: '#FFD60A', section: 'Bazar & Food' },
    { id: 'oil', name: 'Oil & Spices', icon: '🌶️', color: '#FF3B30', section: 'Bazar & Food' },
    { id: 'dal', name: 'Dal / Lentils', icon: '🍲', color: '#FFCC00', section: 'Bazar & Food' },
    { id: 'salt_sugar', name: 'Salt & Sugar', icon: '🧂', color: '#8E8E93', section: 'Bazar & Food' },
    { id: 'snacks', name: 'Snacks (Chanachur)', icon: '🥨', color: '#AF52DE', section: 'Bazar & Food' },
    { id: 'tea', name: 'Tea & Biscuits', icon: '☕', color: '#8E8E93', section: 'Bazar & Food' },
    { id: 'sweet', name: 'Sweets (Misti)', icon: '🍭', color: '#FFCC00', section: 'Bazar & Food' },
    { id: 'fruit', name: 'Fruits (Phol)', icon: '🍎', color: '#34C759', section: 'Bazar & Food' },
    { id: 'milk', name: 'Milk & Dairy', icon: '🥛', color: '#5AC8FA', section: 'Bazar & Food' },
    { id: 'yogurt', name: 'Yogurt (Doi)', icon: '🥣', color: '#F1F5F9', section: 'Bazar & Food' },
    { id: 'egg', name: 'Eggs (Dim)', icon: '🥚', color: '#FFD60A', section: 'Bazar & Food' },
    { id: 'bread', name: 'Bread & Bakery', icon: '🍞', color: '#FF9500', section: 'Bazar & Food' },
    { id: 'baby_food', name: 'Baby Food / Cerelac', icon: '🍼', color: '#5AC8FA', section: 'Bazar & Food' },
    { id: 'frozen_food', name: 'Frozen Food', icon: '🧊', color: '#AF52DE', section: 'Bazar & Food' },
    { id: 'baking', name: 'Baking Items', icon: '🧁', color: '#FFD60A', section: 'Bazar & Food' },
    { id: 'water', name: 'Mineral Water', icon: '🥤', color: '#007AFF', section: 'Bazar & Food' },
    { id: 'juice', name: 'Juice / Drinks', icon: '🧃', color: '#FF2D55', section: 'Bazar & Food' },
    { id: 'streetfood', name: 'Street Food', icon: '🥙', color: '#FF3B30', section: 'Bazar & Food' },
    { id: 'fuchka', name: 'Fuchka / Chotpoti', icon: '🥣', color: '#AF52DE', section: 'Bazar & Food' },
    { id: 'restaurant', name: 'Restaurant', icon: '🍱', color: '#FF2D55', section: 'Bazar & Food' },
    { id: 'cafe', name: 'Cafe / Coffee', icon: '☕', color: '#AF52DE', section: 'Bazar & Food' },
    { id: 'fastfood', name: 'Burger / Pizza', icon: '🍔', color: '#FF9500', section: 'Bazar & Food' },
    { id: 'biryani', name: 'Biryani / Tehari', icon: '🍛', color: '#FF3B30', section: 'Bazar & Food' },

    { id: 'rickshaw', name: 'Rickshaw Fare', icon: '🚲', color: '#34C759', section: 'Transport' },
    { id: 'cng', name: 'CNG Fare', icon: '🛺', color: '#007AFF', section: 'Transport' },
    { id: 'bus', name: 'Bus Fare', icon: '🚌', color: '#AF52DE', section: 'Transport' },
    { id: 'uber', name: 'Uber / Pathao', icon: '🚗', color: '#000000', section: 'Transport' },
    { id: 'fuel', name: 'Fuel (Octane/LPG)', icon: '⛽', color: '#FF3B30', section: 'Transport' },
    { id: 'cng_refill', name: 'CNG Refill', icon: '💨', color: '#5AC8FA', section: 'Transport' },
    { id: 'engineoil', name: 'Engine Oil / Lube', icon: '🧴', color: '#FF9500', section: 'Transport' },
    { id: 'carrepair', name: 'Car/Bike Repair', icon: '🔧', color: '#8E8E93', section: 'Transport' },
    { id: 'carwash', name: 'Car Wash', icon: '🚿', color: '#007AFF', section: 'Transport' },
    { id: 'tyre', name: 'Tyres / Parts', icon: '🔘', color: '#333333', section: 'Transport' },
    { id: 'battery', name: 'Car/Bike Battery', icon: '🔋', color: '#FFD60A', section: 'Transport' },
    { id: 'parking', name: 'Parking Fee', icon: '🅿️', color: '#5AC8FA', section: 'Transport' },
    { id: 'toll', name: 'Bridge Toll', icon: '🌉', color: '#5856D6', section: 'Transport' },
    { id: 'fitness', name: 'Vehicle Fitness', icon: '📜', color: '#5856D6', section: 'Transport' },
    { id: 'tax_token', name: 'Tax Token', icon: '🎫', color: '#FF3B30', section: 'Transport' },
    { id: 'route_permit', name: 'Route Permit', icon: '🛣️', color: '#34C759', section: 'Transport' },
    { id: 'driving_license', name: 'Driving License', icon: '🪪', color: '#AF52DE', section: 'Transport' },
    { id: 'launch', name: 'Launch / Steamer', icon: '🚢', color: '#007AFF', section: 'Transport' },
    { id: 'train', name: 'Train Fare', icon: '🚆', color: '#5856D6', section: 'Transport' },
    { id: 'flight', name: 'Flight Ticket', icon: '✈️', color: '#AF52DE', section: 'Transport' },

    { id: 'rent', name: 'House Rent', icon: '🏠', color: '#5856D6', section: 'Household' },
    { id: 'electricity', name: 'Electricity Bill', icon: '⚡', color: '#FFD60A', section: 'Household' },
    { id: 'wasa', name: 'WASA Bill', icon: '💧', color: '#007AFF', section: 'Household' },
    { id: 'gas', name: 'Titas Gas Bill', icon: '🔥', color: '#FF3B30', section: 'Household' },
    { id: 'lp_gas', name: 'LP Gas Cylinder', icon: '⛽', color: '#FF9500', section: 'Household' },
    { id: 'internet', name: 'Broadband', icon: '🌐', color: '#5AC8FA', section: 'Household' },
    { id: 'cabletv', name: 'Cable TV / Dish', icon: '📺', color: '#FF2D55', section: 'Household' },
    { id: 'garbage', name: 'Garbage Bill', icon: '🗑️', color: '#8E8E93', section: 'Household' },
    { id: 'maid', name: 'Maid Salary', icon: '🧹', color: '#AF52DE', section: 'Household' },
    { id: 'guard', name: 'Security Guard', icon: '👮', color: '#34C759', section: 'Household' },
    { id: 'laundry', name: 'Laundry / Ironing', icon: '👕', color: '#5856D6', section: 'Household' },
    { id: 'homerepair', name: 'Home Repair', icon: '🛠️', color: '#FF9500', section: 'Household' },
    { id: 'kitchen', name: 'Kitchenware', icon: '🍳', color: '#FFCC00', section: 'Household' },
    { id: 'cleaning_kit', name: 'Cleaning Kit', icon: '🧽', color: '#34C759', section: 'Household' },
    { id: 'pest_control', name: 'Pest Control', icon: '🦟', color: '#FF3B30', section: 'Household' },
    { id: 'furniture', name: 'Furniture', icon: '🪑', color: '#FF9500', section: 'Household' },
    { id: 'bedding', name: 'Bedding / Curtains', icon: '🛌', color: '#AF52DE', section: 'Household' },
    { id: 'plants', name: 'Plants / Garden', icon: '🪴', color: '#34C759', section: 'Household' },
    { id: 'bulb', name: 'Bulbs / Electrical', icon: '💡', color: '#FFD60A', section: 'Household' },

    { id: 'domain', name: 'Domain Name', icon: '🌐', color: '#007AFF', section: 'Tech & Freelance' },
    { id: 'hosting', name: 'Web Hosting', icon: '🖥️', color: '#5856D6', section: 'Tech & Freelance' },
    { id: 'saas', name: 'SaaS Subscription', icon: '☁️', color: '#AF52DE', section: 'Tech & Freelance' },
    { id: 'creative_cloud', name: 'Adobe / Design', icon: '🎨', color: '#FF2D55', section: 'Tech & Freelance' },
    { id: 'github', name: 'GitHub / Coding', icon: '💻', color: '#000000', section: 'Tech & Freelance' },
    { id: 'chatgpt', name: 'AI / ChatGPT', icon: '🤖', color: '#10A37F', section: 'Tech & Freelance' },
    { id: 'cloud_storage', name: 'Google/iCloud', icon: '☁️', color: '#007AFF', section: 'Tech & Freelance' },
    { id: 'app_store', name: 'App / Play Store', icon: '🏪', color: '#AF52DE', section: 'Tech & Freelance' },
    { id: 'freelance_fee', name: 'Upwork/Fiverr Fee', icon: '💸', color: '#34C759', section: 'Tech & Freelance' },
    { id: 'pc_hardware', name: 'PC Parts / GPU', icon: '📟', color: '#5856D6', section: 'Tech & Freelance' },
    { id: 'keyboard_mouse', name: 'Peripherals', icon: '⌨️', color: '#8E8E93', section: 'Tech & Freelance' },
    { id: 'monitor', name: 'Monitor / Display', icon: '🖥️', color: '#007AFF', section: 'Tech & Freelance' },
    { id: 'coworking', name: 'Coworking Space', icon: '🏢', color: '#FF9500', section: 'Tech & Freelance' },
    { id: 'vpn', name: 'VPN Subscription', icon: '🛡️', color: '#5AC8FA', section: 'Tech & Freelance' },
    { id: 'software_lic', name: 'Software License', icon: '🔑', color: '#FFD60A', section: 'Tech & Freelance' },

    { id: 'wholesale', name: 'Wholesale Stock', icon: '📦', color: '#FF9500', section: 'Business & Office' },
    { id: 'shop_rent', name: 'Shop / Office Rent', icon: '🏢', color: '#5856D6', section: 'Business & Office' },
    { id: 'staff_salary', name: 'Staff Salary', icon: '💵', color: '#34C759', section: 'Business & Office' },
    { id: 'staff_lunch', name: 'Staff Lunch', icon: '🍱', color: '#FF9500', section: 'Business & Office' },
    { id: 'packaging', name: 'Packing Materials', icon: '🛍️', color: '#AF52DE', section: 'Business & Office' },
    { id: 'marketing', name: 'Ads / Marketing', icon: '📢', color: '#007AFF', section: 'Business & Office' },
    { id: 'trade_license', name: 'Trade License', icon: '📜', color: '#FF3B30', section: 'Business & Office' },
    { id: 'business_tax', name: 'VAT / Tax', icon: '📊', color: '#FF3B30', section: 'Business & Office' },
    { id: 'shop_repair', name: 'Shop Maintenance', icon: '🛠️', color: '#8E8E93', section: 'Business & Office' },
    { id: 'delivery_cost', name: 'Delivery / Courier', icon: '🚚', color: '#FF9500', section: 'Business & Office' },
    { id: 'pos_software', name: 'POS / Bill App', icon: '🧾', color: '#5AC8FA', section: 'Business & Office' },
    { id: 'notebooks', name: 'Notebooks / Pens', icon: '🖊️', color: '#5856D6', section: 'Business & Office' },
    { id: 'ink_toner', name: 'Ink / Toner', icon: '🖨️', color: '#8E8E93', section: 'Business & Office' },

    { id: 'doctor', name: 'Doctor Visit', icon: '🩺', color: '#FF2D55', section: 'Medical' },
    { id: 'medicine', name: 'Medicine', icon: '💊', color: '#FF3B30', section: 'Medical' },
    { id: 'diagnostic', name: 'Lab Test', icon: '🔬', color: '#AF52DE', section: 'Medical' },
    { id: 'hospital_bill', name: 'Hospital Bill', icon: '🏥', color: '#FF3B30', section: 'Medical' },
    { id: 'dental', name: 'Dental Care', icon: '🦷', color: '#5AC8FA', section: 'Medical' },
    { id: 'optometry', name: 'Glasses / Eyes', icon: '👓', color: '#5856D6', section: 'Medical' },
    { id: 'physio', name: 'Physiotherapy', icon: '💆', color: '#34C759', section: 'Medical' },
    { id: 'scrubs', name: 'Scrubs / Lab Coat', icon: '🥼', color: '#007AFF', section: 'Medical' },
    { id: 'med_journal', name: 'Medical Journal', icon: '📕', color: '#5856D6', section: 'Medical' },
    { id: 'stethoscope', name: 'Medical Equipment', icon: '🩺', color: '#8E8E93', section: 'Medical' },
    { id: 'med_license', name: 'BMDC / License', icon: '🪪', color: '#34C759', section: 'Medical' },

    { id: 'school_fee', name: 'School Fees', icon: '🏫', color: '#5AC8FA', section: 'Education' },
    { id: 'coaching', name: 'Coaching / Tuition', icon: '👨‍🏫', color: '#AF52DE', section: 'Education' },
    { id: 'books', name: 'Books / Stationery', icon: '📚', color: '#FF9500', section: 'Education' },
    { id: 'photocopy', name: 'Photocopy / Print', icon: '📠', color: '#8E8E93', section: 'Education' },
    { id: 'library', name: 'Library Membership', icon: '📚', color: '#5856D6', section: 'Education' },
    { id: 'project_mat', name: 'Project Materials', icon: '📐', color: '#5856D6', section: 'Education' },
    { id: 'canteen', name: 'Canteen / Tiffin', icon: '🍱', color: '#FFCC00', section: 'Education' },
    { id: 'internship', name: 'Internship Cost', icon: '💼', color: '#34C759', section: 'Education' },
    { id: 'hostel_rent', name: 'Hostel / Mess', icon: '🏠', color: '#5856D6', section: 'Education' },
    { id: 'admission_fee', name: 'Admission Fee', icon: '🎓', color: '#FF9500', section: 'Education' },
    { id: 'exam_fee', name: 'Exam Fee', icon: '📝', color: '#FF2D55', section: 'Education' },

    { id: 'seeds', name: 'Seeds / Saplings', icon: '🌱', color: '#34C759', section: 'Agro & Farming' },
    { id: 'fertilizer', name: 'Fertilizer', icon: '🧪', color: '#FF9500', section: 'Agro & Farming' },
    { id: 'pesticide', name: 'Pesticides', icon: '🧴', color: '#8E8E93', section: 'Agro & Farming' },
    { id: 'irrigation', name: 'Irrigation / Water', icon: '💦', color: '#007AFF', section: 'Agro & Farming' },
    { id: 'feed', name: 'Cattle/Bird Feed', icon: '🌾', color: '#FFD60A', section: 'Agro & Farming' },
    { id: 'vet_visit', name: 'Vet / Animal Med', icon: '🐾', color: '#FF2D55', section: 'Agro & Farming' },
    { id: 'harvest_labor', name: 'Harvest Labor', icon: '🌾', color: '#FF9500', section: 'Agro & Farming' },
    { id: 'farm_tools', name: 'Tool Repair', icon: '🔨', color: '#8E8E93', section: 'Agro & Farming' },

    { id: 'art_supplies', name: 'Art Supplies', icon: '🎨', color: '#FF2D55', section: 'Creative' },
    { id: 'camera_gear', name: 'Camera / Lens', icon: '📷', color: '#000000', section: 'Creative' },
    { id: 'lighting', name: 'Studio Lighting', icon: '💡', color: '#FFD60A', section: 'Creative' },
    { id: 'printing_large', name: 'Canvas / Print', icon: '🖨️', color: '#5856D6', section: 'Creative' },
    { id: 'memory_card', name: 'Memory Cards', icon: '💾', color: '#8E8E93', section: 'Creative' },
    { id: 'gallery_fee', name: 'Gallery / Exhibition', icon: '🖼️', color: '#AF52DE', section: 'Creative' },

    { id: 'zakat', name: 'Zakat Payment', icon: '🕌', color: '#34C759', section: 'Social & Religious' },
    { id: 'sadaqah', name: 'Sadaqah / Charity', icon: '🤲', color: '#5AC8FA', section: 'Social & Religious' },
    { id: 'masjid_don', name: 'Masjid Donation', icon: '🕌', color: '#5856D6', section: 'Social & Religious' },
    { id: 'madrasa_don', name: 'Madrasa Donation', icon: '📖', color: '#FF9500', section: 'Social & Religious' },
    { id: 'qurbani', name: 'Qurbani Expense', icon: '🐐', color: '#FF3B30', section: 'Social & Religious' },
    { id: 'fitra', name: 'Fitra', icon: '🍚', color: '#FFCC00', section: 'Social & Religious' },
    { id: 'wedding_gift', name: 'Wedding Gift', icon: '🎁', color: '#FF2D55', section: 'Social & Religious' },
    { id: 'birthday_gift', name: 'Birthday Gift', icon: '🎂', color: '#FF9500', section: 'Social & Religious' },
    { id: 'relatives', name: 'Family Support', icon: '👪', color: '#5AC8FA', section: 'Social & Religious' },
    { id: 'beggar', name: 'Poor / Beggar', icon: '🙏', color: '#8E8E93', section: 'Social & Religious' },
    { id: 'iftar_party', name: 'Iftar Party', icon: '🍽️', color: '#FF9500', section: 'Social & Religious' },
    { id: 'mezbani', name: 'Mezbani', icon: '🍲', color: '#FF3B30', section: 'Social & Religious' },

    { id: 'recharge', name: 'Mobile Recharge', icon: '📱', color: '#34C759', section: 'Personal & Grooming' },
    { id: 'mobile_data', name: 'Mobile Data', icon: '📶', color: '#007AFF', section: 'Personal & Grooming' },
    { id: 'clothing', name: 'Clothing / Dress', icon: '👕', color: '#FF2D55', section: 'Personal & Grooming' },
    { id: 'shoes', name: 'Shoes / Footwear', icon: '👟', color: '#8E8E93', section: 'Personal & Grooming' },
    { id: 'panjabi', name: 'Panjabi / Lungi', icon: '👔', color: '#5856D6', section: 'Personal & Grooming' },
    { id: 'sharee', name: 'Sharee / Salwar', icon: '👗', color: '#AF52DE', section: 'Personal & Grooming' },
    { id: 'tailoring', name: 'Tailoring Cost', icon: '✂️', color: '#FF3B30', section: 'Personal & Grooming' },
    { id: 'saloon', name: 'Barber / Saloon', icon: '💇', color: '#5AC8FA', section: 'Personal & Grooming' },
    { id: 'parlor', name: 'Beauty Parlor', icon: '💅', color: '#FF2D55', section: 'Personal & Grooming' },
    { id: 'shaving_kit', name: 'Shaving / Deodorant', icon: '🪒', color: '#8E8E93', section: 'Personal & Grooming' },
    { id: 'perfume', name: 'Perfume / Attar', icon: '🌸', color: '#AF52DE', section: 'Personal & Grooming' },
    { id: 'gym', name: 'Gym / Fitness', icon: '🏋️', color: '#34C759', section: 'Personal & Grooming' },
    { id: 'supplements', name: 'Gym Supplements', icon: '💊', color: '#FF9500', section: 'Personal & Grooming' },
    { id: 'pet_food', name: 'Pet Food / Care', icon: '🐾', color: '#FF9500', section: 'Personal & Grooming' },
    { id: 'paan', name: 'Paan / Supari', icon: '🌿', color: '#34C759', section: 'Personal & Grooming' },
    { id: 'smoking', name: 'Tea / Smoking', icon: '🚬', color: '#8E8E93', section: 'Personal & Grooming' },

    { id: 'bank_fee', name: 'Bank Fees / Tax', icon: '🏦', color: '#8E8E93', section: 'Finance & Legal' },
    { id: 'insurance', name: 'Insurance', icon: '🛡️', color: '#5AC8FA', section: 'Finance & Legal' },
    { id: 'loan_inst', name: 'Loan Installment', icon: '💳', color: '#FF2D55', section: 'Finance & Legal' },
    { id: 'gold', name: 'Gold / Jewelry', icon: '🪙', color: '#FFCC00', section: 'Finance & Legal' },
    { id: 'legal_fee', name: 'Lawyer / Legal', icon: '⚖️', color: '#5856D6', section: 'Finance & Legal' },
    { id: 'police_fine', name: 'Police Fine', icon: '🚨', color: '#FF3B30', section: 'Finance & Legal' },
    { id: 'passport', name: 'Passport / Visa', icon: '🛂', color: '#5AC8FA', section: 'Finance & Legal' },

    { id: 'cinema', name: 'Cinema / Movies', icon: '🎬', color: '#FF3B30', section: 'Entertainment' },
    { id: 'games', name: 'Video Games', icon: '🎮', color: '#5856D6', section: 'Entertainment' },
    { id: 'steam_games', name: 'Steam / Epic', icon: '🎮', color: '#000000', section: 'Entertainment' },
    { id: 'tour', name: 'Travel / Tour', icon: '✈️', color: '#34C759', section: 'Entertainment' },
    { id: 'park', name: 'Amusement Park', icon: '🎡', color: '#FF9500', section: 'Entertainment' },
    { id: 'streaming', name: 'Netflix / Spotify', icon: '📺', color: '#007AFF', section: 'Entertainment' },
    { id: 'hobbies', name: 'Hobby / Sports', icon: '🎯', color: '#AF52DE', section: 'Entertainment' },
    { id: 'other', name: 'Other Expense', icon: '📦', color: '#8E8E93', section: 'Other' }
  ],

  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
  chartView: 'daily',
  exchangeRate: 118,
  showAllActivity: false,
  showAllVaults: false,
  historySearch: '',
  historyCategory: 'all',
  vaultSearch: '',

  async init() {
    this.loadData();

    // Efficiency: Pre-index categories into a Map for O(1) lookups
    if (!this.categoryMap) {
      this.categoryMap = new Map();
      this.categories.forEach(cat => this.categoryMap.set(cat.id, cat));
    }

    this.render();
    this.fetchExchangeRate();
    if (this.rateInterval) clearInterval(this.rateInterval);
    this.rateInterval = setInterval(() => {
      if (document.getElementById('section-finance')?.classList.contains('active')) {
        this.fetchExchangeRate();
      }
    }, 60000);

    this._bindGlobalListeners();
  },

  _bindGlobalListeners() {
    if (this._globalHandlers) return;
    this._globalHandlers = [];

    const onThemeChanged = () => {
      if (document.getElementById('section-finance')?.classList.contains('active')) this.render();
    };
    const hidePicker = () => {
      document.querySelectorAll('.fin-date-pop').forEach(p => p.classList.add('hidden'));
      document.querySelectorAll('.fin-date-trigger').forEach(t => t.setAttribute('aria-expanded', 'false'));
    };
    const onOutsideClick = (e) => {
      if (!e.target.closest('.fin-date-trigger') && !e.target.closest('.fin-date-pop')) hidePicker();
    };

    this._addGlobal(window, 'lamim:theme-changed', onThemeChanged);
    this._addGlobal(document, 'click', onOutsideClick, true);
    this._addGlobal(window, 'scroll', hidePicker, true);
    this._addGlobal(window, 'resize', hidePicker);
  },

  _addGlobal(target, type, fn, opts) {
    target.addEventListener(type, fn, opts);
    this._globalHandlers.push({ target, type, fn, opts });
  },

  _removeGlobalListeners() {
    if (!this._globalHandlers) return;
    this._globalHandlers.forEach(h => {
      try { h.target.removeEventListener(h.type, h.fn, h.opts); } catch (e) { /* ignore */ }
    });
    this._globalHandlers = null;
  },

  onDataUpdated() {
    if (!this._debouncedDataUpdate) {
      this._debouncedDataUpdate = Utils.debounce(() => {
        if (document.getElementById('section-finance')?.classList.contains('active')) {
          this.loadData();
          this.render();
        }
      }, 250);
    }
    this._debouncedDataUpdate();
  },

  setChartView(view) {
    if (this.chartView === view) return;
    this.chartView = view;
    const stats = this.getStats(this.currentViewDate);
    document.querySelectorAll('.fin-chart-tabs .fin-chart-tab').forEach(t => t.classList.remove('active'));
    const tabs = document.querySelectorAll('.fin-chart-tabs .fin-chart-tab');
    if (tabs[view === 'daily' ? 0 : 1]) tabs[view === 'daily' ? 0 : 1].classList.add('active');
    const sub = document.querySelector('.fin-section-subtitle');
    if (sub) sub.textContent = view === 'daily'
      ? this.currentViewDate.toLocaleString('default', { month: 'long', year: 'numeric' }) + ' breakdown'
      : 'Monthly overview of ' + this.currentViewDate.getFullYear();
    this.initChart(stats);
  },

  async fetchExchangeRate() {
    // Instant: apply last cached rate immediately (no network wait)
    try {
      const raw = localStorage.getItem('lamim_fx_rate');
      if (raw) {
        const p = JSON.parse(raw);
        if (p && p.rate && p.rate !== this.exchangeRate) {
          this.exchangeRate = p.rate;
          if (document.getElementById('section-finance')?.classList.contains('active')) this.render();
        }
      }
    } catch (e) { /* ignore */ }

    // Background: refresh from network and cache the result
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await res.json();
      if (data && data.rates && data.rates.BDT) {
        const newRate = data.rates.BDT;
        if (newRate !== this.exchangeRate) {
          this.exchangeRate = newRate;
          if (document.getElementById('section-finance')?.classList.contains('active')) this.render();
          // If settings modal is open, refresh its content too
          const modal = document.getElementById('finance-modal-overlay');
          if (modal && modal.classList.contains('show')) {
             // Only refresh if the title matches "Finance Settings" to avoid overriding other modals
             const title = modal.querySelector('.fin-modal-title')?.innerText;
             if (title === 'Finance Settings') this.showToolsModal();
          }
        }
        try { localStorage.setItem('lamim_fx_rate', JSON.stringify({ ts: Date.now(), rate: newRate })); } catch (e) { /* ignore */ }
      }
    } catch (e) {}
  },

  getSymbol() { return DB.getSettings().currency === 'BDT' ? '৳' : '$'; },

  setCurrency(code) {
    const s = DB.getSettings(); s.currency = code; DB.setSettings(s);
    const toggle = document.querySelector('.fin-currency-toggle');
    if (toggle) {
      toggle.querySelectorAll('.fin-currency-btn').forEach(b => b.classList.remove('active'));
      const btns = toggle.querySelectorAll('.fin-currency-btn');
      if (btns[0] && code === 'USD') btns[0].classList.add('active');
      if (btns[1] && code === 'BDT') btns[1].classList.add('active');
      const thumb = toggle.querySelector('.fin-currency-thumb');
      if (thumb) { thumb.classList.add('slide'); thumb.classList.toggle('right', code === 'BDT'); }
      setTimeout(() => this.render(), 340);
    } else {
      this.render();
    }
    Utils.toast(`Switched to ${code}`, 'info');
  },

  formatVal(val) {
    const converted = DB.getSettings().currency === 'BDT' ? val * this.exchangeRate : val;
    return converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  },

  loadData() {
    const stored = DB.getFinance();
    // Card number is tied to the account (settings), generated at account creation.
    let cardNumber = DB.getSettings().cardNumber;
    if (!cardNumber) {
      cardNumber = this.generateCardNumber();
      const s = DB.getSettings();
      s.cardNumber = cardNumber;
      DB.setSettings(s);
    }
    this.data = { 
      expenses: stored.expenses || [], 
      savings: stored.savings || [], 
      income: stored.income || [],
      cardNumber
    };
    this.currentViewDate = new Date();
  },

  generateCardNumber() {
    const grp = () => Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('');
    return grp() + grp() + grp() + grp();
  },

  formatCardNumber() {
    const raw = (this.data.cardNumber || this.generateCardNumber()).replace(/\D/g, '');
    const grouped = raw.replace(/(.{4})(?=.)/g, '$1 ');
    return `LAMIM ${grouped}`;
  },

  saveData() { DB.setFinance(this.data); },

  render() {
    const container = document.getElementById('finance-content');
    if (!container) return;
    const stats = this.getStats(this.currentViewDate);

    container.innerHTML = `
      <div class="finance-container" style="position:relative;">
        <div class="finance-aurora-bg"></div>
        ${this.renderMonthSelector()}
        <div id="fin-summary-card">${this.renderSummary(stats)}</div>
        ${this.renderQuickAdd()}
        
        <div class="fin-chart-header">
          <div>
            <div class="fin-section-title">Spending Analysis</div>
            <div class="fin-section-subtitle">${this.chartView === 'daily' ? this.currentViewDate.toLocaleString('default', { month: 'long', year: 'numeric' }) + ' breakdown' : 'Monthly overview of ' + this.currentViewDate.getFullYear()}</div>
          </div>
          <div class="fin-chart-tabs">
            <button class="fin-chart-tab ${this.chartView === 'daily' ? 'active' : ''}" onclick="Finance.setChartView('daily')">Daily</button>
            <button class="fin-chart-tab ${this.chartView === 'monthly' ? 'active' : ''}" onclick="Finance.setChartView('monthly')">Monthly</button>
          </div>
        </div>
        <div class="fin-chart-container">
          <canvas id="finance-main-chart"></canvas>
        </div>

        <div class="finance-premium-card" id="fin-activity-card">${this.renderExpensesList(this.currentViewDate)}</div>
        <div class="finance-premium-card">${this.renderSavingsSection()}</div>
        
        <!-- Zakat & Sadaqah Hub: Coming Soon -->
        <div class="finance-premium-card" style="text-align: center; padding: 32px 24px; background: linear-gradient(135deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.01) 100%); border: 1px dashed rgba(255, 255, 255, 0.08); border-radius: 20px; position: relative; overflow: hidden; box-shadow: var(--shadow-sm);">
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; z-index: 2; position: relative;">
            <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(212, 163, 89, 0.1); border: 1px solid rgba(212, 163, 89, 0.2); display: flex; align-items: center; justify-content: center; color: var(--color-accent-gold); box-shadow: 0 0 20px rgba(212, 163, 89, 0.15); animation: float 6s ease-in-out infinite;">${this.renderIcon('mosque', 26)}</div>
            <div style="font-weight: 800; font-size: 16px; color: var(--color-text-primary); letter-spacing: 0.5px;">Zakat & Sadaqah Hub</div>
            <div style="font-size: 12px; color: var(--color-text-subtitle); max-width: 320px; line-height: 1.5; font-weight: 500; margin-bottom: 4px;">Comprehensive Zakat calculations, custom assets bookkeeping, live Nisab thresholds, and Sadaqah charity tracking are coming in the next update.</div>
            <div style="font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: var(--color-accent-gold); padding: 4px 14px; background: rgba(212, 163, 89, 0.08); border-radius: 20px; border: 1px solid rgba(212, 163, 89, 0.15);">Coming Soon</div>
          </div>
          <div class="vault-total-gloss"></div>
        </div>
      </div>
    `;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.initChart(stats);
      });
    });
  },

  renderMonthSelector() {
    return `
      <div class="finance-month-navigator">
        <div class="fin-month-control" id="fin-month-control">${this.renderMonthControl()}</div>
        ${this.renderCurrencyToggle()}
      </div>
    `;
  },

  renderMonthControl() {
    const monthStr = this.currentViewDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    const isCurrent = this.currentViewDate.getMonth() === new Date().getMonth() && this.currentViewDate.getFullYear() === new Date().getFullYear();

    return `
      <button onclick="Finance.changeMonth(-1)" class="fin-nav-arrow" aria-label="Previous month">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <div class="fin-month-label">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
        <span>${monthStr}</span>
      </div>
      ${isCurrent ? '' : `<button onclick="Finance.goToCurrentMonth()" class="fin-today-chip">Today</button>`}
      <button onclick="Finance.changeMonth(1)" class="fin-nav-arrow ${isCurrent ? 'hidden' : ''}" aria-label="Next month">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    `;
  },

  renderCurrencyToggle() {
    const settings = DB.getSettings();
    return `
      <div class="fin-currency-toggle">
        <span class="fin-currency-thumb ${settings.currency === 'BDT' ? 'right' : ''}"></span>
        <div class="fin-currency-btn ${settings.currency === 'USD' ? 'active' : ''}" role="button" tabindex="0" onclick="Finance.setCurrency('USD')"><span class="fin-cur-sym">$</span>USD</div>
        <div class="fin-currency-btn ${settings.currency === 'BDT' ? 'active' : ''}" role="button" tabindex="0" onclick="Finance.setCurrency('BDT')"><span class="fin-cur-sym">৳</span>BDT</div>
      </div>
    `;
  },

  updateMonthViews() {
    const stats = this.getStats(this.currentViewDate);
    const mc = document.getElementById('fin-month-control');
    if (mc) mc.innerHTML = this.renderMonthControl();
    const sub = document.querySelector('.fin-section-subtitle');
    if (sub) sub.textContent = this.chartView === 'daily'
      ? this.currentViewDate.toLocaleString('default', { month: 'long', year: 'numeric' }) + ' breakdown'
      : 'Monthly overview of ' + this.currentViewDate.getFullYear();
    const sum = document.getElementById('fin-summary-card');
    if (sum) sum.innerHTML = this.renderSummary(stats);
    const act = document.getElementById('fin-activity-card');
    if (act) act.innerHTML = this.renderExpensesList(this.currentViewDate);
    this.initChart(stats);
  },

  changeMonth(delta) {
    const nextDate = new Date(this.currentViewDate); nextDate.setMonth(nextDate.getMonth() + delta);
    if (nextDate > new Date()) return;
    this.currentViewDate = nextDate; 
    this.showAllActivity = false; // Reset when changing month
    this.updateMonthViews();
  },

  goToCurrentMonth() {
    this.currentViewDate = new Date();
    this.showAllActivity = false;
    this.updateMonthViews();
  },

  renderSummary(stats) {
    const sym = this.getSymbol();
    const m = this.currentViewDate.getMonth(), y = this.currentViewDate.getFullYear();

    // Trend = month-over-month comparison of Income and Spending vs the previous calendar month
    const symFmt = (v) => sym + this.formatVal(Math.abs(v));
    const col = (label, cur, prev, upIsGood) => {
      const change = cur - prev;
      const lbl = `<span class="lbl">${label}</span>`;
      if (Math.abs(change) < 1e-9) {
        return `<div class="trend-col">${lbl}<span class="amt flat">অপরিবর্তিত</span></div>`;
      }
      const isUp = change > 0;
      const good = upIsGood ? isUp : !isUp;
      const cls = good ? 'up' : 'down';
      const word = isUp ? 'বেড়েছে' : 'কমেছে';
      return `<div class="trend-col">${lbl}<span class="amt ${cls}"><span class="ar">${isUp ? '↗' : '↘'}</span> <span class="aw">${word}</span> <span class="av">${symFmt(change)}</span></span></div>`;
    };
    const noPrevData = Math.abs(stats.prevIncome) < 1e-9 && Math.abs(stats.prevExpenses) < 1e-9;
    let trendHtml = '';
    if (noPrevData) {
      trendHtml = `<span class="trend-flat">নতুন মাস শুরু</span>`;
    } else {
      trendHtml = `<div class="trend-box">`
        + col('Income', stats.income, stats.prevIncome, true)
        + `<div class="trend-div"></div>`
        + col('Spending', stats.expenses, stats.prevExpenses, false)
        + `</div>`;
    }

    const catWeights = {};
    this.data.expenses.forEach(e => {
      const d = new Date(e.date);
      if (d.getMonth() === m && d.getFullYear() === y && e.category !== 'transfer') catWeights[e.category] = (catWeights[e.category] || 0) + e.amount;
    });

    const sortedCats = Object.entries(catWeights).sort((a,b) => b[1] - a[1]);
    const catColor = (catId) => { const c = this.categories.find(x => x.id === catId); return c ? c.color : '#8E8E93'; };
    const gCols = [
      sortedCats[0] ? this.getResolvedColor(catColor(sortedCats[0][0])) : this.getResolvedColor('#ff3b30'),
      sortedCats[1] ? this.getResolvedColor(catColor(sortedCats[1][0])) : this.getResolvedColor('#ff9500'),
      this.getResolvedColor('#007aff'), this.getResolvedColor('#af52de')
    ];

    const totalSaved = this.data.savings.reduce((sum, g) => sum + (Number(g.saved) || 0), 0);
    const available = stats.closingBalance;
    const netWorth = available + totalSaved;
    const isNegative = available < 0;

    return `
      <div class="finance-premium-card card-main-balance ${available < 0 ? 'is-negative' : ''}">
        <div class="balance-card-top">
          <div class="balance-card-info">
            <span class="balance-label">${available < 0 ? 'Overdrawn' : 'Available Balance'}</span>
            <div class="balance-value">${sym}${this.formatVal(available)}</div>
            <div class="balance-sub">
              <span>Vault-এ জমা ${sym}${this.formatVal(totalSaved)}</span>
              <span class="sub-dot">•</span>
              <span>Net Worth ${sym}${this.formatVal(netWorth)}</span>
            </div>
          </div>
          <div class="balance-card-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h18v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/><path d="M3 7l2-3h14l2 3"/><circle cx="17" cy="13" r="1.4"/></svg>
          </div>
        </div>
        <div class="balance-meta">
          <div class="trend-section">
            <div class="trend-head">এ মাস বনাম গত মাস</div>
            ${trendHtml}
          </div>
          <div class="card-number-row">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/><path d="M7 14h4"/></svg>
            <span class="card-number">${this.formatCardNumber()}</span>
          </div>
        </div>
      </div>
      <div class="fin-stats-row">
        <div class="fin-stat-card">
          <div class="fin-stat-label">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="color:var(--fin-green)"><path d="M7 17l5-5 5 5M7 12l5-5 5 5"/></svg>
            Income
          </div>
          <div class="fin-stat-value income">+${sym}${this.formatVal(stats.income)}</div>
        </div>
        <div class="fin-stat-card">
          <div class="fin-stat-label">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="color:var(--fin-red)"><path d="M7 7l5 5 5-5M7 12l5 5 5-5"/></svg>
            Expenses
          </div>
          <div class="fin-stat-value expense">-${sym}${this.formatVal(stats.expenses)}</div>
        </div>
      </div>
    `;
  },

  renderQuickAdd() {
    return `
      <div class="fin-action-grid">
        <button class="fin-btn fin-btn-primary" onclick="Finance.showIncomeModal()">
          <div class="fin-btn-icon" style="background:rgba(52, 199, 89, 0.1); color:var(--fin-green)">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          </div>
          Deposit
        </button>
        <button class="fin-btn fin-btn-secondary" onclick="Finance.showExpenseModal()">
          <div class="fin-btn-icon" style="background:rgba(0, 122, 255, 0.1); color:var(--fin-blue)">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
          </div>
          Spend
        </button>
      </div>
    `;
  },

  renderExpensesList(v) {
    const m = v.getMonth(), y = v.getFullYear(), sym = this.getSymbol();
    const exps = this.data.expenses.filter(e => { const d = new Date(e.date); return d.getMonth() === m && d.getFullYear() === y; });
    const incs = this.data.income.filter(e => { const d = new Date(e.date); return d.getMonth() === m && d.getFullYear() === y; });
    
    const allActivity = [...exps.map(e => ({...e, type: 'expense'})), ...incs.map(i => ({...i, type: 'income'}))]
      .sort((a, b) => {
        const dateDiff = new Date(b.date) - new Date(a.date);
        if (dateDiff !== 0) return dateDiff;
        if (b.id && a.id) return b.id.localeCompare(a.id);
        return 0;
      });

    const totalExp = exps.filter(e => e.category !== 'transfer').reduce((s, e) => s + e.amount, 0);

    if (!allActivity.length) return `<div class="fin-section-title">${v.toLocaleString('default',{month:'long'})} Activity</div><p style="text-align:center; opacity:0.3; padding:40px; font-size:14px;">No records for this month</p>`;

    const groups = {};
    allActivity.forEach(e => {
      if (!groups[e.date]) groups[e.date] = [];
      groups[e.date].push(e);
    });

    const sortedDates = Object.keys(groups).sort((a,b) => new Date(b) - new Date(a));

    let count = 0;
    const LIMIT = 8;
    let listHtml = "";
    let hasMore = false;

    for (const date of sortedDates) {
      if (!this.showAllActivity && count >= LIMIT) {
        hasMore = true;
        break;
      }

      const dObj = new Date(date);
      const isToday = date === Utils.todayStr();
      const yesterday = new Date(); yesterday.setDate(yesterday.getDate()-1);
      const isYesterday = date === Utils.dateStr(yesterday);
      
      let label = dObj.toLocaleDateString('default', { day: 'numeric', month: 'short' });
      if (isToday) label = 'Today';
      else if (isYesterday) label = 'Yesterday';

      let itemsHtml = "";
      for (const e of groups[date]) {
        if (!this.showAllActivity && count >= LIMIT) {
          hasMore = true;
          break;
        }
        itemsHtml += this.renderActivityItem(e, count);
        count++;
      }

      if (itemsHtml) {
        listHtml += `
          <div class="transaction-group">
            <div class="transaction-date-label">${label}</div>
            <div class="transaction-list">
              ${itemsHtml}
            </div>
          </div>
        `;
      }
    }

    const scrollActivity = count > 3;
    const showMoreBtn = hasMore || allActivity.length > LIMIT ? `
      <div style="text-align:center; margin: 20px 0;">
        <button class="fin-show-more-btn" onclick="Finance.showFullHistory()">
          View History
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    ` : "";

    return `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
        <div class="fin-section-title" style="margin-bottom:0;">${v.toLocaleString('default',{month:'long'})} Activity</div>
        <button class="fin-delete-btn" style="opacity:1; width:auto; padding:0 12px; height:36px; gap:8px; font-size:12px; color:var(--fin-blue); background:rgba(0,122,255,0.05); border-color:rgba(0,122,255,0.1);" onclick="Finance.exportPDF()">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
          Export Statement
        </button>
      </div>
      <div class="fin-activity-scroll${scrollActivity ? ' has-scroll' : ''}">${listHtml}</div>
      ${showMoreBtn}
      <div class="ledger-summary">
        <div class="ledger-total-label">Monthly Spending</div>
        <div class="ledger-total-value">-${sym}${this.formatVal(totalExp)}</div>
      </div>
    `;
  },

  getResolvedColor(hex) {
    if (document.documentElement.getAttribute('data-theme') !== 'light') return hex;
    const map = {
      '#FF9500': '#B45309', '#007AFF': '#1D4ED8', '#5856D6': '#4338CA', '#AF52DE': '#6D28D9',
      '#FFD60A': '#A16207', '#FF2D55': '#BE123C', '#FF3B30': '#B91C1C', '#5AC8FA': '#0369A1',
      '#34C759': '#047857', '#FFCC00': '#A16207', '#8E8E93': '#4B5563', '#C7C7CC': '#6B7280'
    };
    return map[hex.toUpperCase()] || hex;
  },

  getCategory(id) {
    return this.categoryMap.get(id) || { name: 'Other', icon: '❓', color: '#8E8E93' };
  },

  renderActivityItem(e, index) {
    const isInc = e.type === 'income';
    const c = isInc ? { name: 'Deposit', icon: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>`, color: '#34C759' } : this.getCategory(e.category);
    const sym = this.getSymbol();
    const resolvedColor = this.getResolvedColor(c.color);
    
    return `
      <div class="transaction-item-wrapper" style="position: relative;">
        <div class="transaction-timeline-connector" style="--timeline-dot-color: ${isInc ? '#34C759' : '#FF2D55'};"></div>
        <div class="transaction-item" style="animation-delay: ${index * 0.05}s;">
          <div class="transaction-icon" style="background:${resolvedColor}22; color:${resolvedColor}">${c.icon}</div>
          <div class="transaction-info">
            <div class="transaction-name">${Utils.escapeHTML(isInc ? e.description : c.name)}</div>
            <div class="transaction-meta">${isInc ? 'Deposit' : c.section}</div>
          </div>
          <div style="display:flex; align-items:center; gap:12px; position:relative; z-index:1;">
            <div class="transaction-amount ${isInc ? 'positive' : 'negative'}">${isInc ? '+' : '-'}${sym}${this.formatVal(e.amount)}</div>
            <button class="fin-delete-btn" onclick="Finance.${isInc ? 'deleteIncome' : 'deleteExpense'}('${e.id}')" title="Delete">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  renderSavingsSection() {
    const sym = this.getSymbol();
    const total = this.data.savings.reduce((sum, goal) => sum + (Number(goal.saved) || 0), 0);
    const hasVaults = this.data.savings.length > 0;
    const displayedVaults = Math.min(4, this.data.savings.length);
    const scrollVaults = hasVaults && displayedVaults > 2;

    return `
      <div class="vault-section-head">
        <div class="vault-section-titles">
          <div class="fin-section-title">Vaults</div>
          ${hasVaults ? `
            <div class="vault-total-pill">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              Total Saved: <span>${sym}${this.formatVal(total)}</span>
            </div>
          ` : `
            <div class="fin-section-subtitle">Set a goal & start saving</div>
          `}
        </div>
        <button class="fin-create-vault-btn" onclick="Finance.showSavingsModal()">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          Create New Vault
        </button>
      </div>

      <div class="vault-grid${scrollVaults ? ' vault-grid--scroll' : ''}">
        ${hasVaults ? (() => {
          const LIMIT = 4;
          const reversedVaults = [...this.data.savings].reverse();
          const displayVaults = reversedVaults.slice(0, LIMIT);
          return displayVaults.map(s => this.renderSavingsItem(s)).join('');
        })() : `
          <div class="vault-empty-state" role="button" tabindex="0" onclick="Finance.showSavingsModal()">
            <div class="vault-empty-icon">${this.renderIcon('gem', 32)}</div>
            <div style="font-weight:700; font-size:14px; color:var(--color-text-muted);">Secure your future</div>
            <div style="font-size:12px; color:var(--color-text-muted); opacity:0.6; margin-top:4px;">Tap to create your first savings goal</div>
          </div>
        `}
      </div>

      ${hasVaults && this.data.savings.length > 4 ? `
        <div style="text-align:center; margin: 20px 0;">
          <button class="fin-show-more-btn" onclick="Finance.showVaultsOverlay()">
            Manage Vaults
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      ` : ""}
    `;
  },

  getVaultIcon(name) {
    const n = name.toLowerCase();
    if (n.includes('iphone') || n.includes('phone') || n.includes('mobile')) return 'phone';
    if (n.includes('macbook') || n.includes('laptop')) return 'laptop';
    if (n.includes('watch') || n.includes('iwatch')) return 'watch';
    if (n.includes('game') || n.includes('ps5') || n.includes('xbox') || n.includes('console') || n.includes('gaming')) return 'game';
    if (n.includes('camera') || n.includes('dslr') || n.includes('lens')) return 'camera';
    if (n.includes('car') || n.includes('auto')) return 'car';
    if (n.includes('bike') || n.includes('motorcycle')) return 'bike';
    if (n.includes('cycle') || n.includes('bicycle')) return 'bicycle';
    if (n.includes('hajj') || n.includes('umrah') || n.includes('makkah') || n.includes('mosque') || n.includes('madina') || n.includes('islamic')) return 'mosque';
    if (n.includes('charity') || n.includes('zakat') || n.includes('sadaqah')) return 'charity';
    if (n.includes('house') || n.includes('home') || n.includes('flat') || n.includes('rent')) return 'home';
    if (n.includes('wedding') || n.includes('marriage') || n.includes('nikah')) return 'ring';
    if (n.includes('travel') || n.includes('trip') || n.includes('tour') || n.includes('flight')) return 'plane';
    if (n.includes('food') || n.includes('bazaar') || n.includes('grocery')) return 'cart';
    if (n.includes('gift') || n.includes('birthday')) return 'gift';
    if (n.includes('education') || n.includes('book') || n.includes('course') || n.includes('university')) return 'book';
    if (n.includes('business') || n.includes('office') || n.includes('startup')) return 'briefcase';
    if (n.includes('invest') || n.includes('stock') || n.includes('crypto')) return 'trend';
    if (n.includes('emergency') || n.includes('medical') || n.includes('health')) return 'health';
    return 'gem';
  },

  renderIcon(key, size) {
    const s = size || 22;
    const p = Finance.iconPaths[key] || Finance.iconPaths.gem;
    return `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  },

  iconPaths: {
    phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    laptop: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M2 20h20"/>',
    watch: '<circle cx="12" cy="12" r="6"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>',
    game: '<rect x="2" y="7" width="20" height="11" rx="4"/><path d="M7 11v3M5.5 12.5h3M15.5 11.5h.01M18 13.5h.01"/>',
    camera: '<path d="M3 7h4l2-3h6l2 3h4v13H3z"/><circle cx="12" cy="13" r="4"/>',
    car: '<path d="M5 11l1.5-4h11L19 11M4 11h16v6H4z"/><circle cx="8" cy="17" r="1.5"/><circle cx="16" cy="17" r="1.5"/>',
    bike: '<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-7h5l3 7"/>',
    bicycle: '<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-7h5l3 7M9 10h4"/>',
    mosque: '<path d="M12 2c2 2 3 4 3 6v1a3 3 0 0 1-6 0v-1c0-2 1-4 3-6z"/><path d="M4 21V10l8-5 8 5v11z"/><path d="M9 21v-6h6v6"/>',
    charity: '<path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10z"/>',
    home: '<path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    ring: '<path d="M12 2l3 4-3 3-3-3z"/><path d="M7 9l5 12 5-12"/>',
    plane: '<path d="M21 16l-9-4V5a1.5 1.5 0 0 0-3 0v7l-9 4v2l9-2v4l-2 1v2l4-1 4 1v-2l-2-1v-4l9 2z"/>',
    cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.5 13h11l2-9H6"/>',
    gift: '<rect x="3" y="8" width="18" height="4"/><path d="M5 12v9h14v-9M12 8v13"/><path d="M12 8C9 8 8 4 12 4s3 4 0 4z"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 1 2-2h12"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/>',
    trend: '<path d="M3 17l6-6 4 4 7-7"/><path d="M14 8h7v7"/>',
    health: '<path d="M3 12h4l2-6 4 12 2-6h6"/>',
    gem: '<path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20M9 3l3 6 3-6"/>',
    food: '<path d="M5 3v8a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 0-3 3-3 6s1 5 3 5v7"/>',
    bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    drop: '<path d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z"/>',
    flame: '<path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 1 2 2 2 3 2 0-3-1-5 0-8z"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    tv: '<rect x="3" y="5" width="18" height="13" rx="2"/><path d="M8 21h8M12 18v3"/>',
    wifi: '<path d="M2 8a14 14 0 0 1 20 0M5 12a9 9 0 0 1 14 0M8 16a4 4 0 0 1 8 0"/><circle cx="12" cy="20" r="0.5"/>',
    cloud: '<path d="M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9-2 4 4 0 0 1 1 10z"/>',
    brush: '<path d="M9 11l-4 4a2 2 0 0 0 3 3l4-4M15 5l4 4-7 7-4-4z"/>',
    code: '<path d="M9 8l-5 4 5 4M15 8l5 4-5 4"/>',
    robot: '<rect x="5" y="8" width="14" height="10" rx="2"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/><path d="M12 4v4M9 4h6"/>',
    box: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
    store: '<path d="M4 9l1-4h14l1 4M4 9h16v11H4zM4 9a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0"/>',
    cash: '<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>',
    bag: '<path d="M6 8h12l1 12H5z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    megaphone: '<path d="M4 10v4a1 1 0 0 0 1 1h3l9 4V5l-9 4H5a1 1 0 0 0-1 1z"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    tool: '<path d="M14 7a4 4 0 0 0-5 5l-6 6 3 3 6-6a4 4 0 0 0 5-5l-3 3-3-3z"/>',
    printer: '<rect x="6" y="3" width="12" height="6"/><path d="M6 9v10h12V9M9 14h6"/>',
    stethoscope: '<path d="M5 3v5a4 4 0 0 0 8 0V3M9 16a4 4 0 0 0 8 0v-3M17 11v2a5 5 0 0 1-5 5"/><circle cx="19" cy="13" r="2"/>',
    pill: '<rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(45 12 12)"/><path d="M9 9l6 6"/>',
    microscope: '<path d="M5 21h14M9 3v6a3 3 0 0 0 5 2M14 5l4 4M11 17l4-4"/>',
    hospital: '<path d="M4 21V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v16M12 7v6M9 10h6"/>',
    tooth: '<path d="M12 3c-3 0-5 2-5 5 0 3 1 4 2 7s1 5 3 5 2-3 3-5 2-4 2-7c0-3-2-5-5-5z"/>',
    diploma: '<path d="M4 6h10v9H4zM14 9l6-3-6-3z"/>',
    seedling: '<path d="M12 21v-7M12 14c0-4 4-6 8-6 0 5-4 8-8 6zM12 14c0-3-3-5-7-5 0 4 3 7 7 5z"/>',
    tractor: '<circle cx="6" cy="17" r="3"/><circle cx="17" cy="17" r="2.5"/><path d="M3 17h3l2-6h7v6M9 11h7"/>',
    palette: '<path d="M12 3a9 9 0 1 0 0 18c2 0 2-1.5 2-2.5S13 15 15 15h2a3 3 0 0 0 3-3c0-5-4-9-8-9z"/><circle cx="8" cy="9" r="1"/><circle cx="12" cy="7" r="1"/><circle cx="16" cy="9" r="1"/>',
    users: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M16 6a3 3 0 0 1 0 6M21 20a6 6 0 0 0-5-5"/>',
    mosque2: '<path d="M12 2v3M5 21V10l7-5 7 5v11zM9 21v-6h6v6"/>',
    scissors: '<circle cx="7" cy="7" r="2.5"/><circle cx="7" cy="17" r="2.5"/><path d="M9 8l11 9M9 16L20 7"/>',
    shield: '<path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z"/>',
    key: '<circle cx="8" cy="12" r="4"/><path d="M11 12h9M17 12v3"/>',
    ticket: '<path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2 2 2 0 0 0 0 4 2 2 0 0 1-2 2H6a2 2 0 0 1-2-2 2 2 0 0 0 0-4z"/>',
    film: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 4v16M16 4v16M3 9h5M16 9h5M3 15h5M16 15h5"/>',
    music: '<path d="M9 18V6l10-2v12"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="16" r="2"/>',
    sparkles: '<path d="M12 3l1.5 4L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1z"/>',
    heart: '<path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10z"/>',
    shirt: '<path d="M8 3l4 3 4-3 5 3-2 4-2-1v11H7V9L5 6z"/>',
    lightbulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10c1 1 1 2 1 3h6c0-1 0-2 1-3a6 6 0 0 0-4-10z"/>',
    coffee: '<path d="M4 8h13v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM17 9h2a2 2 0 0 1 0 6h-2M7 3v2M11 3v2"/>',
    wrench: '<path d="M14 7a4 4 0 0 0-5 5l-6 6 3 3 6-6a4 4 0 0 0 5-5l-3 3-3-3z"/>',
    bus: '<rect x="4" y="4" width="16" height="13" rx="2"/><circle cx="8" cy="18" r="1.5"/><circle cx="16" cy="18" r="1.5"/><path d="M4 11h16"/>',
    ship: '<path d="M3 14l2 5h14l2-5M5 14V8h14v6M12 4v4M9 6h6"/>',
    train: '<rect x="5" y="3" width="14" height="14" rx="2"/><path d="M5 11h14M8 21l-2-3M16 21l2-3"/><circle cx="9" cy="14" r="0.5"/><circle cx="15" cy="14" r="0.5"/>',
    bridge: '<path d="M3 21V9a9 9 0 0 1 18 0v12M3 13h18M6 21v-4M18 21v-4M3 9c2 0 3-2 3-2M21 9c-2 0-3-2-3-2"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
    gem2: '<path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20M9 3l3 6 3-6"/>'
  },

  sectionIcons: {
    'Bazar & Food': 'food',
    'Transport': 'car',
    'Household': 'home',
    'Tech & Freelance': 'code',
    'Business & Office': 'briefcase',
    'Medical': 'health',
    'Education': 'book',
    'Agro & Farming': 'seedling',
    'Creative': 'palette',
    'Social & Religious': 'mosque',
    'Personal & Grooming': 'shirt',
    'Finance & Legal': 'cash',
    'Entertainment': 'film',
    'Other': 'sparkles'
  },

  getCatSvg(id, section) {
    const specific = {
      bazar: 'cart', fish: 'food', meat: 'food', chicken: 'food', grocery: 'cart', rice: 'food',
      oil: 'flame', dal: 'food', bread: 'food', fruit: 'food', milk: 'drop', egg: 'food',
      sweet: 'food', tea: 'coffee', snacks: 'food', water: 'drop', juice: 'drop', restaurant: 'food',
      cafe: 'coffee', fastfood: 'food', biryani: 'food', streetfood: 'food',
      rickshaw: 'bicycle', cng: 'bike', bus: 'bus', uber: 'car', fuel: 'bolt', carrepair: 'wrench',
      carwash: 'drop', tyre: 'tool', battery: 'bolt', parking: 'ticket', toll: 'bridge',
      launch: 'ship', train: 'train', flight: 'plane',
      rent: 'home', electricity: 'bolt', wasa: 'drop', gas: 'flame', internet: 'wifi', cabletv: 'tv',
      garbage: 'trash', maid: 'home', guard: 'shield', laundry: 'shirt', homerepair: 'wrench',
      kitchen: 'tool', cleaning_kit: 'sparkles', furniture: 'home', bedding: 'home', plants: 'seedling', bulb: 'lightbulb',
      domain: 'globe', hosting: 'cloud', saas: 'cloud', creative_cloud: 'cloud', github: 'code', chatgpt: 'robot',
      cloud_storage: 'cloud', app_store: 'store', freelance_fee: 'cash', pc_hardware: 'laptop', keyboard_mouse: 'tool',
      monitor: 'laptop', coworking: 'store', vpn: 'shield', software_lic: 'key',
      wholesale: 'box', shop_rent: 'store', staff_salary: 'cash', staff_lunch: 'food', packaging: 'bag',
      marketing: 'megaphone', trade_license: 'ticket', business_tax: 'chart', shop_repair: 'wrench', delivery_cost: 'box',
      pos_software: 'printer', notebooks: 'book', ink_toner: 'printer',
      doctor: 'stethoscope', medicine: 'pill', diagnostic: 'microscope', hospital_bill: 'hospital', dental: 'tooth',
      education_generic: 'book', course: 'book', university: 'book',
      gift: 'gift', zakat: 'charity', sadaqah: 'charity', donation: 'charity', hajj: 'mosque', umrah: 'mosque',
      gym: 'health', sport: 'health', pet: 'heart', salary: 'cash', tax: 'chart', insurance: 'shield',
      subscription: 'cloud', netflix: 'film', music: 'music', game_pass: 'game', movie: 'film',
      travel: 'plane', hotel: 'home', shopping: 'bag', clothing: 'shirt', electronics: 'laptop'
    };
    const key = specific[id] || this.sectionIcons[section] || 'sparkles';
    return this.renderIcon(key, 18);
  },

  renderSavingsItem(g) {
    const p = g.target > 0 ? (g.saved / g.target) * 100 : 0;
    const displayP = Math.floor(p);
    const sym = this.getSymbol();
    const icon = this.renderIcon(this.getVaultIcon(g.name), 22);
    const completed = p >= 100;

    return `
      <div class="vault-card ${completed ? 'completed' : ''}">
        <div class="vault-top-row">
          <div class="vault-icon-box ${completed ? 'is-complete' : ''}">${icon}</div>
          <div class="vault-info">
            <div class="vault-name">${Utils.escapeHTML(g.name)}</div>
            <div class="vault-status">${displayP}% Complete</div>
          </div>
          <div class="vault-pct-badge ${completed ? 'is-complete' : ''}">${displayP}%</div>
        </div>

        <div class="vault-progress-track">
          <div class="vault-progress-fill" style="width:${Math.min(100, p)}%;"></div>
        </div>

        <div class="vault-metrics-row">
          <div class="vault-metric">
            <span class="vault-metric-label">Saved</span>
            <span class="vault-metric-value">${sym}${this.formatVal(g.saved)}</span>
          </div>
          <div class="vault-metric" style="text-align:right;">
            <span class="vault-metric-label">Target</span>
            <span class="vault-metric-value">${sym}${this.formatVal(g.target)}</span>
          </div>
        </div>

        <div class="vault-action-slot">
          <div class="vault-add-btn" role="button" tabindex="0" onclick="event.stopPropagation(); Finance.addToSavings('${g.id}')">
            ${completed
              ? `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
              : `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>`}
            <span>${completed ? 'Achieved' : 'Add'}</span>
          </div>
          <button class="fin-delete-btn" onclick="event.stopPropagation(); Finance.deleteVault('${g.id}')" title="Delete Vault">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/></svg>
          </button>
        </div>
      </div>
    `;
  },

  showExpenseModal() {
    const sym = this.getSymbol();
    this.selectedCategory = 'bazar';
    const now = new Date();
    let defaultDate = this.currentViewDate;
    if (now.getMonth() === this.currentViewDate.getMonth() && now.getFullYear() === this.currentViewDate.getFullYear()) {
      defaultDate = now;
    }
    const dateStr = Utils.dateStr(defaultDate);

    const html = `
      <div class="finance-modal-content fin-deposit-modal fin-spend-modal">
        <button class="fin-modal-close" onclick="Finance.closeModal()" aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        <div class="fin-deposit-hero fin-spend-hero">
          <div class="fin-deposit-icon fin-spend-icon">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M5 12a7 7 0 0 1 14 0"/></svg>
          </div>
          <div class="fin-deposit-label">Log Spending</div>
          <div class="fin-deposit-amount-row">
            <span class="fin-modal-currency" style="color:var(--fin-red);">${sym}</span>
            <input type="number" id="finance-expense-amount" placeholder="0.00" class="fin-modal-amount-input fin-spend-amount" autofocus onkeydown="Finance.advanceFromAmount(event, 'fin-cat-search-input')" onblur="Finance.advanceToField(event, 'fin-cat-search-input')">
          </div>
        </div>

        <div class="fin-field-group">
          <label class="fin-field-label">
            <span style="display:inline-flex; align-items:center; gap:6px;">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><path d="M14 4h7v7M14 14h7v7M3 14h7v7"/></svg>
              Category
            </span>
          </label>
          <div class="fin-modal-search-box">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.4;"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="text" placeholder="Search categories..." oninput="Finance.handleCatSearch(this.value)" class="fin-cat-search-input">
          </div>
          <div class="fin-cat-grid" id="fin-cat-list">
            ${this.renderCategoryGrid('')}
          </div>
        </div>

        <div class="fin-field-group">
          <label class="fin-field-label">
            <span style="display:inline-flex; align-items:center; gap:6px;">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              Date
            </span>
          </label>
          <button type="button" class="fin-date-trigger" id="finance-expense-date-trigger" onclick="Finance.openDatePicker('finance-expense-date')">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            <span id="finance-expense-date-label">${this.formatPickerDate(dateStr)}</span>
            <svg class="fin-date-chev" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <input type="hidden" id="finance-expense-date" value="${dateStr}">
          <div class="fin-date-pop hidden" id="finance-expense-date-pop"></div>
        </div>

        <div class="fin-modal-actions">
          <button class="fin-save-btn expense" onclick="Finance.saveExpense()">Confirm Payment</button>
        </div>
      </div>
    `;
    this.showModal(html);
    setTimeout(() => { const el = document.getElementById('finance-expense-amount'); if (el) el.focus(); }, 60);
  },

  handleCatSearch(val) {
    const container = document.getElementById('fin-cat-list');
    if (container) container.innerHTML = this.renderCategoryGrid(val.toLowerCase());
  },

  renderCategoryGrid(search) {
    const filtered = this.categories.filter(c => 
      c.name.toLowerCase().includes(search) || 
      c.id.includes(search) || 
      c.section.toLowerCase().includes(search)
    );

    let html = '';
    let currentSection = '';

    filtered.forEach(c => {
      if (c.section !== currentSection) {
        currentSection = c.section;
        html += `<div class="fin-cat-section-header">${currentSection.toUpperCase()}</div>`;
      }
      const rc = this.getResolvedColor(c.color); 
      html += `
        <div class="fin-cat-pill ${this.selectedCategory === c.id ? 'active' : ''}" role="button" tabindex="0" onclick="Finance.selectCategory('${c.id}')" id="cat-${c.id}">
          <div class="fin-cat-icon" style="background:${rc}15; color:${rc}">${c.icon}</div>
          <span class="fin-cat-name">${c.name}</span>
        </div>`;
    });

    return html || `<div style="text-align:center; grid-column:1/-1; padding:40px; opacity:0.3; font-size:13px;">No categories found</div>`;
  },

  selectCategory(id) { this.selectedCategory = id; document.querySelectorAll('.fin-cat-pill').forEach(p => p.classList.remove('active')); const a = document.getElementById(`cat-${id}`); if (a) a.classList.add('active'); },
  saveExpense() {
    let a = parseFloat(document.getElementById('finance-expense-amount').value);
    const c = this.selectedCategory, d = document.getElementById('finance-expense-date').value, obj = this.categories.find(o => o.id === c);
    if (isNaN(a) || a <= 0) return Utils.toast('Enter valid amount', 'error');

    // Calculate absolute total balance in USD (base currency)
    const allIncome = this.data.income.reduce((s, o) => s + o.amount, 0);
    const allExpenses = this.data.expenses.reduce((s, o) => s + o.amount, 0);
    const totalBalance = allIncome - allExpenses;

    let amountInBase = a;
    if (DB.getSettings().currency === 'BDT') amountInBase = a / this.exchangeRate;

    // Check if expense exceeds total balance
    if (amountInBase > totalBalance + 0.0001) {
      const sym = this.getSymbol();
      return Utils.toast(`Insufficient balance! Available: ${sym}${this.formatVal(totalBalance)}`, 'error');
    }

    this.data.expenses.push({ id: Utils.uid(), description: obj.name, amount: amountInBase, category: c, date: d });
    this.saveData(); this.closeModal(); this.render();
  },

  showIncomeModal() {
    const sym = this.getSymbol();
    const now = new Date();
    let defaultDate = this.currentViewDate;
    if (now.getMonth() === this.currentViewDate.getMonth() && now.getFullYear() === this.currentViewDate.getFullYear()) {
      defaultDate = now;
    }
    const dateStr = Utils.dateStr(defaultDate);
    const html = `
      <div class="finance-modal-content fin-deposit-modal">
        <button class="fin-modal-close" onclick="Finance.closeModal()" aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        <div class="fin-deposit-hero">
          <div class="fin-deposit-icon">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
          </div>
          <div class="fin-deposit-label">Add Deposit</div>
          <div class="fin-deposit-amount-row">
            <span class="fin-modal-currency">${sym}</span>
            <input type="number" id="finance-income-amount" placeholder="0.00" class="fin-modal-amount-input" autofocus onkeydown="Finance.advanceFromAmount(event, 'finance-income-desc')" onblur="Finance.advanceToField(event, 'finance-income-desc')">
          </div>
        </div>

        <div class="fin-field-group">
          <label class="fin-field-label">Source</label>
          <input type="text" id="finance-income-desc" placeholder="Salary, Gift etc." class="fin-field-input">
        </div>

        <div class="fin-field-group">
          <label class="fin-field-label">
            <span style="display:inline-flex; align-items:center; gap:6px;">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              Date
            </span>
          </label>
          <button type="button" class="fin-date-trigger" id="finance-income-date-trigger" onclick="Finance.openDatePicker('finance-income-date')">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            <span id="finance-income-date-label">${this.formatPickerDate(dateStr)}</span>
            <svg class="fin-date-chev" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <input type="hidden" id="finance-income-date" value="${dateStr}">
          <div class="fin-date-pop hidden" id="finance-income-date-pop"></div>
        </div>

        <div class="fin-modal-actions">
          <button class="fin-cancel-btn" onclick="Finance.closeModal()">Cancel</button>
          <button class="fin-save-btn income" onclick="Finance.saveIncome()">Confirm Deposit</button>
        </div>
      </div>
    `;
    this.showModal(html);
    setTimeout(() => { const el = document.getElementById('finance-income-amount'); if (el) el.focus(); }, 60);
  },

  advanceFromAmount(e, nextTarget) {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const next = typeof nextTarget === 'string' && nextTarget.startsWith('.')
      ? document.querySelector(nextTarget)
      : document.getElementById(nextTarget);
    if (next) next.focus();
  },

  advanceToField(e, nextTarget) {
    const rel = e.relatedTarget;
    if (rel && (rel.closest('.fin-modal-actions') || rel.closest('.fin-date-trigger') || rel.id === nextTarget)) return;
    const next = typeof nextTarget === 'string' && nextTarget.startsWith('.')
      ? document.querySelector(nextTarget)
      : document.getElementById(nextTarget);
    if (next && !rel) {
      setTimeout(() => {
        if (document.activeElement === document.body || !document.activeElement || document.activeElement === e.target) next.focus();
      }, 10);
    }
  },

  saveIncome() { const desc = document.getElementById('finance-income-desc').value; let a = parseFloat(document.getElementById('finance-income-amount').value); const d = document.getElementById('finance-income-date').value; if (!desc || isNaN(a) || a <= 0) return Utils.toast('Fill valid fields','error'); if (DB.getSettings().currency==='BDT') a /= this.exchangeRate; this.data.income.push({ id: Utils.uid(), description: desc, amount: a, date: d }); this.saveData(); this.closeModal(); this.render(); },

  formatPickerDate(iso) {
    if (!iso) return 'Select date';
    const d = new Date(iso + 'T00:00:00');
    if (isNaN(d.getTime())) return 'Select date';
    return d.toLocaleDateString('default', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  },

  openDatePicker(targetId) {
    const pop = document.getElementById(targetId + '-pop');
    if (!pop) return;
    if (!pop.classList.contains('hidden')) { pop.classList.add('hidden'); return; }
    document.querySelectorAll('.fin-date-pop').forEach(p => { if (p.id !== pop.id) p.classList.add('hidden'); });
    this._datePickerTarget = targetId;
    this._datePickerView = new Date((document.getElementById(targetId).value || Utils.todayStr()) + 'T00:00:00');
    this.renderDatePop(targetId);
    pop.classList.remove('hidden');
    const trigger = document.getElementById(targetId + '-trigger');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
  },

  renderDatePop(targetId) {
    const pop = document.getElementById(targetId + '-pop');
    if (!pop) return;
    const view = this._datePickerView || new Date();
    const y = view.getFullYear(), m = view.getMonth();
    const first = new Date(y, m, 1);
    const startDay = first.getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const selVal = document.getElementById(targetId).value;
    const todayStr = Utils.todayStr();
    const monthName = view.toLocaleDateString('default', { month: 'long', year: 'numeric' });

    let cells = '';
    for (let i = 0; i < startDay; i++) cells += '<div class="fin-date-empty"></div>';
    for (let d = 1; d <= daysInMonth; d++) {
      const iso = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const cls = ['fin-date-cell'];
      if (iso === selVal) cls.push('selected');
      if (iso === todayStr) cls.push('today');
      cells += `<div class="${cls.join(' ')}" onclick="Finance.pickDate('${targetId}','${iso}')">${d}</div>`;
    }

    pop.innerHTML = `
      <div class="fin-date-pop-head">
        <button type="button" class="fin-date-nav" onclick="Finance.shiftDatePicker('${targetId}',-1)">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div class="fin-date-pop-title">${monthName}</div>
        <button type="button" class="fin-date-nav" onclick="Finance.shiftDatePicker('${targetId}',1)">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
      <div class="fin-date-grid-head">
        ${['S','M','T','W','T','F','S'].map(w => `<span>${w}</span>`).join('')}
      </div>
      <div class="fin-date-grid">${cells}</div>
      <button type="button" class="fin-date-today" onclick="Finance.pickDate('${targetId}','${todayStr}')">Today</button>
    `;
  },

  shiftDatePicker(targetId, delta) {
    this._datePickerView = new Date(this._datePickerView.getFullYear(), this._datePickerView.getMonth() + delta, 1);
    this.renderDatePop(targetId);
  },

  pickDate(targetId, iso) {
    document.getElementById(targetId).value = iso;
    const label = document.getElementById(targetId + '-label');
    if (label) label.textContent = this.formatPickerDate(iso);
    const pop = document.getElementById(targetId + '-pop');
    if (pop) pop.classList.add('hidden');
    const trigger = document.getElementById(targetId + '-trigger');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  },
  
  deleteExpense(id) {
    const e = this.data.expenses.find(x => x.id === id);
    if (!e) return;
    const sym = this.getSymbol();
    const c = this.getCategory(e.category);
    const html = `
      <div class="finance-modal-content fin-delete-modal fin-delete-record">
        <div class="fin-delete-hero">
          <div class="fin-delete-icon">
            <span class="fin-delete-icon-ring"></span>
            <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6M14 11v6"/></svg>
          </div>
          <div class="fin-delete-title">Delete Record?</div>
          <div class="fin-delete-name">${Utils.escapeHTML(c.name)} &middot; ${sym}${this.formatVal(e.amount)}</div>
        </div>

        <p class="fin-delete-warn">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:4px;"><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></svg>
          This spending record will be removed. You can't undo this!
        </p>

        <div class="fin-modal-actions">
          <button class="fin-cancel-btn" onclick="Finance.closeModal()">Keep It</button>
          <button class="fin-save-btn fin-delete-confirm" onclick="Finance.confirmDeleteExpense('${id}')">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
            Delete
          </button>
        </div>
      </div>
    `;
    this.showModal(html);
  },

  confirmDeleteExpense(id) {
    this.data.expenses = this.data.expenses.filter(e => e.id !== id);
    this.saveData(); this.closeModal(); this.render();
    if (document.getElementById('finance-history-overlay')?.classList.contains('show')) this.renderHistoryItems();
    Utils.toast('Record deleted', 'info');
  },

  deleteIncome(id) {
    const e = this.data.income.find(x => x.id === id);
    if (!e) return;
    const sym = this.getSymbol();
    const html = `
      <div class="finance-modal-content fin-delete-modal fin-delete-record fin-delete-income">
        <div class="fin-delete-hero">
          <div class="fin-delete-icon">
            <span class="fin-delete-icon-ring"></span>
            <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6M14 11v6"/></svg>
          </div>
          <div class="fin-delete-title">Delete Deposit?</div>
          <div class="fin-delete-name">${Utils.escapeHTML(e.description || 'Deposit')} &middot; ${sym}${this.formatVal(e.amount)}</div>
        </div>

        <p class="fin-delete-warn">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:4px;"><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></svg>
          This deposit record will be removed. You can't undo this!
        </p>

        <div class="fin-modal-actions">
          <button class="fin-cancel-btn" onclick="Finance.closeModal()">Keep It</button>
          <button class="fin-save-btn fin-delete-confirm" onclick="Finance.confirmDeleteIncome('${id}')">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
            Delete
          </button>
        </div>
      </div>
    `;
    this.showModal(html);
  },

  confirmDeleteIncome(id) {
    this.data.income = this.data.income.filter(e => e.id !== id);
    this.saveData(); this.closeModal(); this.render();
    if (document.getElementById('finance-history-overlay')?.classList.contains('show')) this.renderHistoryItems();
    Utils.toast('Deposit deleted', 'info');
  },
  deleteVault(id) {
    const g = this.data.savings.find(v => v.id === id);
    if (!g) return;
    const sym = this.getSymbol();
    const p = g.target > 0 ? Math.floor((g.saved / g.target) * 100) : 0;
    const html = `
      <div class="finance-modal-content fin-delete-modal">
        <div class="fin-delete-hero">
          <div class="fin-delete-icon">
            <span class="fin-delete-icon-ring"></span>
            <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6M14 11v6"/></svg>
          </div>
          <div class="fin-delete-title">Remove Vault?</div>
          <div class="fin-delete-name">${Utils.escapeHTML(g.name)}</div>
        </div>

        <div class="fin-delete-info">
          <div class="fin-delete-stat"><span>Saved</span><b style="color:${p >= 100 ? '#FFB020' : 'var(--fin-green)'}">${sym}${this.formatVal(g.saved)}</b></div>
          <div class="fin-delete-stat"><span>Target</span><b>${sym}${this.formatVal(g.target)}</b></div>
          <div class="fin-delete-stat"><span>Progress</span><b>${p}%</b></div>
        </div>

        <p class="fin-delete-warn">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px; margin-right:4px;"><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></svg>
          This vault &amp; all its savings will be gone for good. No take-backs!
        </p>

        <div class="fin-modal-actions">
          <button class="fin-cancel-btn" onclick="Finance.closeModal()">Keep It</button>
          <button class="fin-save-btn fin-delete-confirm" onclick="Finance.confirmDeleteVault('${id}')">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
            Delete Vault
          </button>
        </div>
      </div>
    `;
    this.showModal(html);
  },

  confirmDeleteVault(id) {
    this.data.savings = this.data.savings.filter(v => v.id !== id);
    // Also remove the transfer expenses tied to this vault so net worth stays consistent
    this.data.expenses = this.data.expenses.filter(e => e.vaultId !== id);
    this.saveData(); this.closeModal(); this.render();
    if (document.getElementById('finance-vault-overlay')?.classList.contains('show')) this.renderVaultOverlayItems();
    Utils.toast('Vault removed', 'info');
  },

  showSavingsModal() {
    const sym = this.getSymbol();
    const html = `
      <div class="finance-modal-content fin-deposit-modal fin-vault-create-modal">
        <button class="fin-modal-close" onclick="Finance.closeModal()" aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        <div class="fin-deposit-hero fin-vault-hero">
          <div class="fin-deposit-icon fin-vault-icon">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M19 7V5a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v2"/><path d="M3 7h18v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7Z"/><path d="M12 11v5M9.5 13.5h5"/></svg>
          </div>
          <div class="fin-deposit-label">Create Vault</div>
          <div class="fin-deposit-sub">Set your goal & start saving</div>
          <div class="fin-deposit-amount-row">
            <span class="fin-modal-currency" style="color:var(--fin-green);">${sym}</span>
            <input type="number" id="finance-savings-target" placeholder="0.00" class="fin-modal-amount-input" autofocus onkeydown="Finance.advanceFromAmount(event, 'finance-savings-name')" onblur="Finance.advanceToField(event, 'finance-savings-name')">
          </div>
        </div>

        <div class="fin-field-group">
          <label class="fin-field-label">Vault Name</label>
          <input type="text" id="finance-savings-name" placeholder="e.g. Dream House, iPhone 16, Hajj Fund" class="fin-field-input">
        </div>

        <div class="fin-modal-actions">
          <button class="fin-cancel-btn" onclick="Finance.closeModal()">Cancel</button>
          <button class="fin-save-btn income" style="background:var(--fin-green);" onclick="Finance.saveSavingsGoal()">Create Vault</button>
        </div>
      </div>
    `;
    this.showModal(html);
    setTimeout(() => { const el = document.getElementById('finance-savings-target'); if (el) el.focus(); }, 60);
  },

  saveSavingsGoal() {
    const name = document.getElementById('finance-savings-name').value;
    let target = parseFloat(document.getElementById('finance-savings-target').value);
    if (!name || isNaN(target) || target <= 0) return Utils.toast('Fill valid fields', 'error');
    if (DB.getSettings().currency === 'BDT') target /= this.exchangeRate;
    this.data.savings.push({ id: Utils.uid(), name, target, saved: 0 });
    this.saveData(); this.closeModal(); this.render();
    if (document.getElementById('finance-vault-overlay')?.classList.contains('show')) {
      this.renderVaultOverlayItems();
    }
  },

  addToSavings(id) {
    const sym = this.getSymbol();
    const goal = this.data.savings.find(s => s.id === id);
    if (!goal) return;

    if (goal.saved >= goal.target) {
      return Utils.toast('Goal already achieved!', 'info');
    }

    const mult = DB.getSettings().currency === 'BDT' ? this.exchangeRate : 1;
    const remaining = Math.max(0, (goal.target - goal.saved) * mult);

    const html = `
      <div class="finance-modal-content" style="max-width:400px;">
        <div class="fin-modal-header">
          <div class="fin-modal-title">Deposit to ${Utils.escapeHTML(goal.name)}</div>
          <button class="fin-modal-close" onclick="Finance.closeModal()" aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        
        <p style="font-size:12px; color:var(--color-text-subtitle); margin-bottom:16px; line-height:1.4;">
          Enter the amount you would like to transfer to this savings vault.
          ${remaining > 0 ? `<br><span style="color:var(--fin-green); font-weight:800; display:inline-block; margin-top:4px;">Target Remaining: ${sym}${this.formatVal(goal.target - goal.saved)}</span>` : ''}
        </p>

        <div class="fin-modal-amount-wrap" style="margin-bottom:20px;">
          <div style="display:flex; align-items:center;">
            <span class="fin-modal-currency" style="color:var(--fin-green);">${sym}</span>
            <input type="number" id="vault-deposit-amount" placeholder="0.00" class="fin-modal-amount-input">
          </div>
        </div>

        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:8px; margin-bottom:20px;">
          <button class="fin-chart-tab" style="padding:10px 0; font-size:12px; border-radius:12px; height:auto;" onclick="document.getElementById('vault-deposit-amount').value = 50">+50</button>
          <button class="fin-chart-tab" style="padding:10px 0; font-size:12px; border-radius:12px; height:auto;" onclick="document.getElementById('vault-deposit-amount').value = 100">+100</button>
          <button class="fin-chart-tab" style="padding:10px 0; font-size:12px; border-radius:12px; height:auto;" onclick="document.getElementById('vault-deposit-amount').value = 500">+500</button>
        </div>

        <div class="fin-modal-actions">
          <button class="fin-save-btn" style="background:var(--fin-green); width:100%; height:48px; border-radius:14px; font-weight:800;" onclick="Finance.confirmVaultDeposit('${id}')">Confirm Deposit</button>
        </div>
      </div>
    `;
    this.showModal(html);
    setTimeout(() => { const el = document.getElementById('vault-deposit-amount'); if (el) el.focus(); }, 60);
  },

  confirmVaultDeposit(id) {
    const goal = this.data.savings.find(s => s.id === id);
    if (!goal) return;

    let amount = parseFloat(document.getElementById('vault-deposit-amount').value);
    if (isNaN(amount) || amount <= 0) {
      return Utils.toast('Invalid amount entered', 'error');
    }

    const mult = DB.getSettings().currency === 'BDT' ? this.exchangeRate : 1;
    const remainingInBase = goal.target - goal.saved; // USD base
    
    let amountInBase = amount;
    if (DB.getSettings().currency === 'BDT') amountInBase = amount / this.exchangeRate;

    // Genuine behaviour: cannot deposit more cash than you actually have on hand
    const allIncome = this.data.income.reduce((s, o) => s + o.amount, 0);
    const allExpenses = this.data.expenses.reduce((s, o) => s + o.amount, 0);
    const availCash = allIncome - allExpenses;
    if (amountInBase > availCash + 0.0001) {
      const sym = this.getSymbol();
      return Utils.toast(`Insufficient balance! Available: ${sym}${this.formatVal(availCash)}`, 'error');
    }

    // Strict validation: Prevent depositing more than remaining target (with a 0.01 tolerance for currency conversions)
    if (amountInBase > remainingInBase + 0.0001) {
      const remainingDisplay = remainingInBase * mult;
      const sym = this.getSymbol();
      return Utils.toast(`Cannot exceed remaining target! Needed: ${sym}${this.formatVal(remainingDisplay)}`, 'error');
    }

    const wasComplete = goal.saved >= goal.target;
    goal.saved += amountInBase;

    // FIX: Vault deposit should act as an expense so it reduces available balance
    this.data.expenses.push({ 
      id: Utils.uid(), 
      description: `Vault Deposit: ${goal.name}`, 
      amount: amountInBase, 
      category: 'transfer', 
      vaultId: goal.id,
      date: Utils.todayStr() 
    });

    this.saveData();
    this.closeModal();
    this.render();

    if (document.getElementById('finance-vault-overlay')?.classList.contains('show')) {
      this.renderVaultOverlayItems();
    }

    Utils.toast(`Deposited successfully!`, 'success');
    if (!wasComplete && goal.saved >= goal.target) {
      setTimeout(() => Utils.toast(`Goal "${goal.name}" Completed!`, 'success'), 500);
    }
  },

  toggleActivityLimit() {
    this.showAllActivity = !this.showAllActivity;
    this.render();
  },

  toggleVaultLimit() {
    this.showAllVaults = true;
    this.render();
  },

  showModal(c) { let o = document.getElementById('finance-modal-overlay'); if (!o) { o = document.createElement('div'); o.id = 'finance-modal-overlay'; o.className = 'finance-modal-overlay'; document.body.appendChild(o); } o.innerHTML = c; o.classList.add('show'); o.onclick = (e) => { if(e.target === o) this.closeModal(); }; },
  closeModal() {
    const o = document.getElementById('finance-modal-overlay');
    if (o) o.classList.remove('show');
  },

  showFullHistory() {
    this.historySearch = '';
    this.historyCategory = 'all';
    
    let overlay = document.getElementById('finance-history-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'finance-history-overlay';
      overlay.className = 'fin-history-overlay';
      document.body.appendChild(overlay);
    }

    const monthStr = this.currentViewDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    const categoriesHtml = `<div class="fin-filter-pill ${this.historyCategory === 'all' ? 'active' : ''}" onclick="Finance.setHistoryFilter('all')">All</div>` + 
      this.categories.map(c => `<div class="fin-filter-pill ${this.historyCategory === c.id ? 'active' : ''}" onclick="Finance.setHistoryFilter('${c.id}')">${c.name}</div>`).join('');

    overlay.innerHTML = `
      <div class="fin-history-panel">
        <div class="fin-history-header">
          <div class="fin-history-title">History</div>
          <button class="fin-history-close" onclick="Finance.closeHistory()">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div style="padding: 0 24px 8px; font-size: 13px; color: var(--color-text-muted); font-weight: 700;">${monthStr} Statement</div>
        
        <div class="fin-history-search-wrap">
          <div class="fin-history-search-box">
            <div class="fin-history-search-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            <input type="text" class="fin-history-search-input" placeholder="Search transactions..." oninput="Finance.handleHistorySearch(this.value)">
          </div>
        </div>

        <div class="fin-history-filters">${categoriesHtml}</div>
        
        <div class="fin-history-content" id="fin-history-list">
        </div>
      </div>
    `;

    overlay.classList.add('show');
    overlay.onclick = (e) => { if (e.target === overlay) this.closeHistory(); };
    this.renderHistoryItems();
  },

  closeHistory() {
    const o = document.getElementById('finance-history-overlay');
    if (o) o.classList.remove('show');
  },

  handleHistorySearch(val) {
    this.historySearch = val.toLowerCase();
    this.renderHistoryItems();
  },

  setHistoryFilter(cat) {
    this.historyCategory = cat;
    document.querySelectorAll('.fin-filter-pill').forEach(p => {
      p.classList.toggle('active', p.innerText.toLowerCase() === cat || (cat === 'all' && p.innerText === 'All'));
    });
    this.renderHistoryItems();
    
    const filters = document.querySelector('.fin-history-filters');
    if (filters) {
      const pills = filters.querySelectorAll('.fin-filter-pill');
      pills.forEach(p => p.classList.remove('active'));
      const activePill = Array.from(pills).find(p => 
        (cat === 'all' && p.innerText === 'All') || 
        (this.categories.find(c => c.id === cat)?.name === p.innerText)
      );
      if (activePill) activePill.classList.add('active');
    }
  },

  renderHistoryItems() {
    const container = document.getElementById('fin-history-list');
    if (!container) return;

    const m = this.currentViewDate.getMonth(), y = this.currentViewDate.getFullYear();
    const exps = this.data.expenses.filter(e => {
      const d = new Date(e.date);
      const matchesMonth = d.getMonth() === m && d.getFullYear() === y;
      const matchesSearch = e.description.toLowerCase().includes(this.historySearch);
      const matchesCat = this.historyCategory === 'all' || e.category === this.historyCategory;
      return matchesMonth && matchesSearch && matchesCat;
    }).map(e => ({...e, type: 'expense'}));

    const incs = this.data.income.filter(e => {
      const d = new Date(e.date);
      const matchesMonth = d.getMonth() === m && d.getFullYear() === y;
      const matchesSearch = e.description.toLowerCase().includes(this.historySearch);
      const matchesCat = this.historyCategory === 'all';
      return matchesMonth && matchesSearch && matchesCat;
    }).map(i => ({...i, type: 'income'}));

    let filtered = [...exps, ...incs].sort((a, b) => {
      const dateDiff = new Date(b.date) - new Date(a.date);
      if (dateDiff !== 0) return dateDiff;
      if (b.id && a.id) return b.id.localeCompare(a.id);
      return 0;
    });

    if (filtered.length === 0) {
      container.innerHTML = `<div style="text-align:center; padding:60px 20px; opacity:0.3; font-size:14px;">No transactions found</div>`;
      return;
    }

    const groups = {};
    filtered.forEach(e => {
      if (!groups[e.date]) groups[e.date] = [];
      groups[e.date].push(e);
    });

    const sortedDates = Object.keys(groups).sort((a, b) => new Date(b) - new Date(a));
    let html = "";
    let itemIdx = 0;

    for (const date of sortedDates) {
      const dObj = new Date(date);
      const label = dObj.toLocaleDateString('default', { day: 'numeric', month: 'short', weekday: 'short' });
      
      let itemsHtml = "";
      for (const e of groups[date]) {
        itemsHtml += this.renderActivityItem(e, itemIdx++);
      }

      html += `
        <div class="transaction-group" style="margin-bottom: 24px;">
          <div class="transaction-date-label" style="margin-bottom: 12px; font-size: 11px; opacity: 0.5;">${label}</div>
          <div class="transaction-list">${itemsHtml}</div>
        </div>
      `;
    }

    container.innerHTML = html;
  },

  showVaultsOverlay() {
    this.vaultSearch = '';
    let overlay = document.getElementById('finance-vault-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'finance-vault-overlay';
      overlay.className = 'fin-vault-overlay';
      document.body.appendChild(overlay);
    }

    overlay.innerHTML = `
      <div class="fin-vault-panel">
        <div class="fin-vault-header">
          <div class="fin-vault-title">Vaults</div>
          <button class="fin-vault-close" onclick="Finance.closeVaults()">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div style="padding: 0 24px 16px;">
          <button class="fin-save-btn" style="width:100%; height:48px; border-radius:14px; font-size:14px; font-weight:800;" onclick="Finance.showSavingsModal()">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
            Create New Vault
          </button>
        </div>
        <div class="fin-vault-search-wrap">
          <div class="fin-vault-search-box">
            <div class="fin-vault-search-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            <input type="text" class="fin-vault-search-input" placeholder="Search vaults..." oninput="Finance.handleVaultSearch(this.value)">
          </div>
        </div>
        <div class="fin-vault-content" id="fin-vault-overlay-list">
        </div>
      </div>
    `;

    overlay.classList.add('show');
    overlay.onclick = (e) => { if (e.target === overlay) this.closeVaults(); };
    this.renderVaultOverlayItems();
  },

  closeVaults() {
    const o = document.getElementById('finance-vault-overlay');
    if (o) o.classList.remove('show');
  },

  handleVaultSearch(val) {
    this.vaultSearch = val.toLowerCase();
    this.renderVaultOverlayItems();
  },

  renderVaultOverlayItems() {
    const container = document.getElementById('fin-vault-overlay-list');
    if (!container) return;

    const filtered = [...this.data.savings].reverse().filter(v => v.name.toLowerCase().includes(this.vaultSearch));
    
    if (filtered.length === 0) {
      container.innerHTML = `<div style="text-align:center; padding:60px 20px; opacity:0.3; font-size:14px;">No vaults found</div>`;
      return;
    }

    container.innerHTML = `<div class="vault-overlay-grid">${filtered.map(v => this.renderSavingsItem(v)).join('')}</div>`;
  },
  showToolsModal() {
    const exchangeRateText = this.exchangeRate ? `1 USD = ${this.exchangeRate.toFixed(2)} BDT` : 'Loading rates...';

    const html = `
      <div class="finance-modal-content">
        <div class="fin-modal-header">
          <div class="fin-modal-title">Finance Settings</div>
          <button class="fin-modal-close" onclick="Finance.closeModal()" aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div style="padding: 8px 22px 22px;">
          <div class="fin-settings-section-label">Market</div>
          <div class="fin-exchange-card">
            <div>
              <div class="fin-live-badge">
                <span class="fin-pulse-dot"></span>
                Live Market Rate
              </div>
              <div style="font-size:20px; font-weight:800; color:var(--color-text-primary); margin-top:6px;">${exchangeRateText}</div>
            </div>
          </div>

          <div class="fin-settings-section-label" style="color:var(--fin-red); margin-top:24px;">Danger Zone</div>
          <div style="display:flex; flex-direction:column; gap:12px;">
            <button class="fin-tool-btn" onclick="Finance.resetCurrentMonth()">
              <div class="fin-tool-icon" style="background:rgba(255,149,0,0.12); color:#FF9500;">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/></svg>
              </div>
              <div style="text-align:left;">
                <div style="font-weight:700; font-size:14px;">Clear Current Month</div>
                <div style="font-size:12px; opacity:0.6;">Delete all records for this month only</div>
              </div>
            </button>

            <button class="fin-tool-btn" onclick="Finance.resetAllData()">
              <div class="fin-tool-icon" style="background:rgba(255,59,48,0.12); color:var(--fin-red);">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1v22M5 12h14"/></svg>
              </div>
              <div style="text-align:left;">
                <div style="font-weight:700; font-size:14px; color:var(--fin-red);">Factory Reset (Full Wipe)</div>
                <div style="font-size:12px; opacity:0.6;">Erase all history and all vaults</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    `;
    this.showModal(html);
  },

  resetCurrentMonth() {
    const m = this.currentViewDate.getMonth(), y = this.currentViewDate.getFullYear();
    const monthName = this.currentViewDate.toLocaleString('default', { month: 'long' });
    
    Utils.confirm('Reset Month', `Delete all transactions and records for ${monthName} ${y}?`, () => {
      // Decrement any vault savings that were funded by transfers in this month
      this.data.expenses.forEach(e => {
        if (e.category === 'transfer' && e.vaultId) {
          const d = new Date(e.date);
          if (d.getMonth() === m && d.getFullYear() === y) {
            const v = this.data.savings.find(s => s.id === e.vaultId);
            if (v) v.saved = Math.max(0, (Number(v.saved) || 0) - e.amount);
          }
        }
      });
      this.data.expenses = this.data.expenses.filter(e => { const d = new Date(e.date); return !(d.getMonth() === m && d.getFullYear() === y); });
      this.data.income = this.data.income.filter(i => { const d = new Date(i.date); return !(d.getMonth() === m && d.getFullYear() === y); });
      this.saveData();
      this.closeModal();
      this.render();
      Utils.toast(`${monthName} data cleared`, 'info');
    }, 'warning');
  },

  resetAllData() {
    Utils.confirm('WIPE ALL DATA', 'This will delete ALL transactions, income, and vaults forever across all years. This action is irreversible. Proceed?', () => {
      this.data = { expenses: [], savings: [], income: [] };
      this.saveData();
      this.closeModal();
      this.render();
      Utils.toast('All finance history wiped', 'info');
    }, 'danger');
  },

  exportPDF() {
    const v = this.currentViewDate, sym = this.getSymbol();
    const mStr = v.toLocaleString('default', { month: 'long', year: 'numeric' });
    const exps = this.data.expenses.filter(e => { const d = new Date(e.date); return d.getMonth() === v.getMonth() && d.getFullYear() === v.getFullYear() && e.category !== 'transfer'; });
    const incs = this.data.income.filter(i => { const d = new Date(i.date); return d.getMonth() === v.getMonth() && d.getFullYear() === v.getFullYear(); });
    const total = exps.reduce((s, e) => s + e.amount, 0);
    const stats = this.getStats(v);
    const totalSaved = this.data.savings.reduce((sum, g) => sum + (Number(g.saved) || 0), 0);
    const netWorth = stats.closingBalance + totalSaved;

    // Merge both income and expenses into a unified list, sorted chronologically (newest first)
    const txs = [
      ...exps.map(e => ({ ...e, type: 'expense' })),
      ...incs.map(i => ({ ...i, type: 'income' }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    const win = window.open('', '_blank');
    if (!win) {
      Utils.toast('Please allow popups to export statement', 'error');
      return;
    }
    win.document.write(`
      <html>
        <head>
          <title>LAMIM - Digital Statement</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800;900&display=swap');
            
            @page { margin: 0; }
            body { 
              font-family: 'Outfit', sans-serif; 
              padding: 0; margin: 0; 
              background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #f5f3ff 100%);
              color: #0f172a; 
              min-height: 100vh;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            .container { 
              width: 800px; margin: 0 auto; padding: 60px; position: relative; 
              background: rgba(255, 255, 255, 0.7);
              backdrop-filter: blur(10px);
              min-height: 100vh;
              box-sizing: border-box;
            }

            .cyber-seal {
              position: absolute; top: 40px; right: 60px;
              width: 85px; height: 85px;
              border: 2px dashed #6366f1; border-radius: 50%;
              display: flex; align-items: center; justify-content: center;
              font-size: 10px; font-weight: 900; color: #6366f1;
              text-align: center; transform: rotate(15deg);
              opacity: 0.4;
            }

            .hero { margin-bottom: 50px; }
            .brand-row { display: flex; align-items: center; gap: 12px; margin-bottom: 15px; }
            .brand-logo { width: 32px; height: 32px; background: linear-gradient(45deg, #4f46e5, #06b6d4); border-radius: 10px; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3); }
            .brand-name { font-size: 20px; font-weight: 900; color: #4f46e5; letter-spacing: -1px; }
            
            .report-title { font-size: 52px; font-weight: 900; letter-spacing: -3px; margin: 0; color: #1e1b4b; line-height: 1; }
            .report-date { font-size: 16px; font-weight: 600; color: #6366f1; margin-top: 10px; opacity: 0.8; }

            .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 18px; }
            .networth-line { text-align: center; font-size: 13px; font-weight: 800; color: #475569; background: rgba(99,102,241,0.06); border: 1px solid rgba(99,102,241,0.12); border-radius: 14px; padding: 12px; }
            .stat-card { 
              background: white; padding: 24px; border-radius: 28px; 
              box-shadow: 0 10px 25px rgba(0,0,0,0.03);
              border: 1px solid rgba(255,255,255,0.8);
            }
            .stat-card.dark { background: #1e1b4b; color: white; border: none; box-shadow: 0 20px 40px rgba(30, 27, 75, 0.2); }
            .label { font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #94a3b8; margin-bottom: 10px; display: block; }
            .val { font-size: 28px; font-weight: 900; letter-spacing: -1px; }
            
            .ledger-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 25px; padding: 0 10px; }
            .ledger-title { font-size: 20px; font-weight: 800; color: #1e1b4b; letter-spacing: -0.5px; }
            
            table { width: 100%; border-collapse: separate; border-spacing: 0 12px; margin-top: -12px; }
            th { text-align: left; padding: 10px 20px; font-size: 10px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px; }
            td { 
              padding: 18px 20px; background: white; 
              border-top: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9;
              font-size: 14px;
            }
            td:first-child { border-left: 1px solid #f1f5f9; border-radius: 20px 0 0 20px; }
            td:last-child { border-right: 1px solid #f1f5f9; border-radius: 0 20px 20px 0; }

            .amount { font-weight: 900; font-size: 17px; text-align: right; letter-spacing: -0.5px; }
            .neg { color: #f43f5e; }
            .pos { color: #10b981; }

            .cat-tag { 
              padding: 6px 12px; border-radius: 10px; font-size: 10px; font-weight: 800; 
              background: #f8fafc; color: #64748b; border: 1px solid #f1f5f9; text-transform: uppercase;
            }

            .footer { 
              margin-top: 80px; text-align: center; padding: 50px 0; 
              border-top: 1px solid rgba(0,0,0,0.05);
            }
            .footer-text { font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 3px; }
            
            @media print {
              body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
              .container { width: 100%; box-shadow: none; background: transparent; padding: 40px; }
              .stat-card { border: 1px solid #f1f5f9; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="cyber-seal">CERTIFIED<br>LAMIM<br>LEDGER</div>
            
            <div class="hero">
              <div class="brand-row">
                <div class="brand-logo"></div>
                <div class="brand-name">LAMIM FINTECH</div>
              </div>
              <h1 class="report-title">${mStr}</h1>
              <div class="report-date">Automated Financial Asset Report • ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
            </div>

              <div class="stats-grid">
                <div class="stat-card">
                  <span class="label">Opening Balance</span>
                  <div class="val" style="color: #64748b;">${sym}${this.formatVal(stats.openingBalance)}</div>
                </div>
                <div class="stat-card">
                  <span class="label">Total Income</span>
                  <div class="val pos">+${sym}${this.formatVal(stats.income)}</div>
                </div>
                <div class="stat-card">
                  <span class="label">Monthly Spend</span>
                  <div class="val neg">-${sym}${this.formatVal(total)}</div>
                </div>
                <div class="stat-card dark">
                  <span class="label" style="color:rgba(255,255,255,0.4)">Closing Balance</span>
                  <div class="val">${sym}${this.formatVal(stats.closingBalance)}</div>
                </div>
              </div>
              <div class="networth-line">Vault Savings: ${sym}${this.formatVal(totalSaved)} &nbsp;•&nbsp; Net Worth: ${sym}${this.formatVal(netWorth)}</div>

            <div class="ledger-header">
              <div class="ledger-title">Transaction Ledger</div>
              <div style="font-size:11px; color:#94a3b8; font-weight:800;">DATA SYNCED: ${new Date().toLocaleTimeString()}</div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Timeframe</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th style="text-align:right;">Impact</th>
                </tr>
              </thead>
              <tbody>
                ${txs.map(t => {
                  const isInc = t.type === 'income';
                  const sign = isInc ? '+' : '-';
                  const classColor = isInc ? 'pos' : 'neg';
                  const catText = isInc ? 'INCOME' : t.category;
                  const catBg = isInc ? 'rgba(16, 185, 129, 0.08)' : '#f8fafc';
                  const catColor = isInc ? '#10b981' : '#64748b';
                  const catBorder = isInc ? 'rgba(16, 185, 129, 0.15)' : '#f1f5f9';

                  return `
                    <tr>
                      <td style="color:#6366f1; font-weight:800; font-size:13px;">${new Date(t.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</td>
                      <td style="font-weight:700; color:#1e1b4b; font-size:15px;">${Utils.escapeHTML(t.description)}</td>
                      <td><span class="cat-tag" style="background:${catBg}; color:${catColor}; border:1px solid ${catBorder};">${catText}</span></td>
                      <td class="amount ${classColor}">${sign}${sym}${this.formatVal(t.amount)}</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>

            <div class="footer">
              <div class="footer-text">LAMIM ECOSYSTEM — SECURE FINANCE</div>
              <div style="font-size:10px; color:#cbd5e1; margin-top:12px; font-weight:600;">© 2026 LAMIM. All Financial Data Encrypted Locally.</div>
            </div>
          </div>
          <script>window.onload = () => { setTimeout(() => { window.print(); window.close(); }, 800); }</script>
        </body>
      </html>
    `);
    win.document.close();
  },

  initChart(stats) {
    const canvas = document.getElementById('finance-main-chart');
    if (!canvas) return;
    if (typeof Chart === 'undefined') {
      Utils.loadScript('https://cdn.jsdelivr.net/npm/chart.js')
        .then(() => {
          this.initChart(stats);
        })
        .catch(err => {
          console.error("Failed to load Chart.js from CDN", err);
        });
      return;
    }
    if (this.mainChart) this.mainChart.destroy();

    Chart.defaults.font.family = "'Outfit','Plus Jakarta Sans',system-ui,-apple-system,sans-serif";

    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;
    const containerHeight = container ? container.clientHeight : 240;

    let labels = [], spend = [], income = [];
    const v = this.currentViewDate;
    const m = v.getMonth(), y = v.getFullYear();

    if (this.chartView === 'daily') {
      const daysInMonth = new Date(y, m + 1, 0).getDate();
      spend = new Array(daysInMonth).fill(0);
      income = new Array(daysInMonth).fill(0);
      this.data.expenses.forEach(e => {
        if (e.category === 'transfer') return;
        const d = new Date(e.date);
        if (d.getMonth() === m && d.getFullYear() === y) spend[d.getDate() - 1] += e.amount;
      });
      this.data.income.forEach(e => {
        const d = new Date(e.date);
        if (d.getMonth() === m && d.getFullYear() === y) income[d.getDate() - 1] += e.amount;
      });
      labels = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    } else {
      labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      spend = new Array(12).fill(0);
      income = new Array(12).fill(0);
      this.data.expenses.filter(e => new Date(e.date).getFullYear() === y && e.category !== 'transfer').forEach(e => { spend[new Date(e.date).getMonth()] += e.amount; });
      this.data.income.filter(e => new Date(e.date).getFullYear() === y).forEach(e => { income[new Date(e.date).getMonth()] += e.amount; });
    }

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const sym = this.getSymbol();
    const isDaily = this.chartView === 'daily';

    // Amounts are stored in USD base; formatVal() applies the live exchange rate for BDT display.
    const spendData = spend;
    const incomeData = income;

    // Theme-consistent, clearly distinct colors
    const spendStroke = isDark ? '#16a34a' : '#15803d';
    const spendFill = ctx.createLinearGradient(0, 0, 0, containerHeight);
    spendFill.addColorStop(0, isDark ? 'rgba(22, 163, 74, 0.30)' : 'rgba(21, 128, 61, 0.26)');
    spendFill.addColorStop(0.6, isDark ? 'rgba(22, 163, 74, 0.07)' : 'rgba(21, 128, 61, 0.06)');
    spendFill.addColorStop(1, 'rgba(22, 163, 74, 0.0)');

    const incomeStroke = isDark ? '#f59e0b' : '#D97706';
    const haloColor = isDark ? 'rgba(10,15,28,0.85)' : 'rgba(255,255,255,0.0)';

    const tickColor = isDark ? '#cbd5e1' : '#475569';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(100, 116, 139, 0.14)';

    const pointBase = isDaily ? 3 : 4.5;
    const makePoints = (arr) => arr.map(val => val > 0 ? pointBase : 0);
    const makeHover = (arr) => arr.map(val => val > 0 ? pointBase + 3 : 0);

    // Hover crosshair plugin for an interactive feel
    const crosshair = {
      id: 'crosshair',
      afterDraw(chart) {
        const active = chart.getActiveElements && chart.getActiveElements();
        if (!active || !active.length) return;
        const x = active[0].element.x;
        const { top, bottom } = chart.chartArea;
        const ctx2 = chart.ctx;
        ctx2.save();
        ctx2.beginPath();
        ctx2.moveTo(x, top);
        ctx2.lineTo(x, bottom);
        ctx2.lineWidth = 1.5;
        ctx2.strokeStyle = isDark ? 'rgba(255,255,255,0.22)' : 'rgba(15,23,42,0.18)';
        ctx2.setLineDash([4, 4]);
        ctx2.stroke();
        ctx2.restore();
      }
    };

    const datasets = [
      {
        label: 'Spending',
        data: spendData,
        borderColor: spendStroke,
        tension: 0.4,
        fill: true,
        backgroundColor: spendFill,
        borderWidth: 3.5,
        pointRadius: makePoints(spendData),
        pointHoverRadius: makeHover(spendData),
        pointHitRadius: 16,
        pointBackgroundColor: isDark ? '#0a0f1c' : '#ffffff',
        pointBorderColor: isDark ? '#16a34a' : '#15803d',
        pointBorderWidth: 2.5,
        borderCapStyle: 'round',
        borderJoinStyle: 'round',
        clip: false,
        spanGaps: true,
      },
      {
        label: 'Income',
        data: incomeData,
        borderColor: haloColor,
        borderWidth: 6,
        tension: 0.4,
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 0,
        pointHitRadius: 0,
        borderCapStyle: 'round',
        borderJoinStyle: 'round',
        clip: false,
        isHalo: true,
      },
      {
        label: 'Income',
        data: incomeData,
        borderColor: incomeStroke,
        borderWidth: 4,
        tension: 0.4,
        fill: false,
        pointRadius: makePoints(incomeData),
        pointHoverRadius: makeHover(incomeData),
        pointHitRadius: 16,
        pointBackgroundColor: '#f59e0b',
        pointBorderColor: isDark ? '#0a0f1c' : '#ffffff',
        pointBorderWidth: 2,
        borderCapStyle: 'round',
        borderJoinStyle: 'round',
        clip: false,
        spanGaps: true,
      }
    ];

    this.mainChart = new Chart(ctx, {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: { padding: { top: 12, bottom: 4, left: 8, right: 8 } },
        animation: {
          y: { type: 'number', easing: 'easeOutQuart', duration: 800, from: (c) => (c.chart.scales.y ? c.chart.scales.y.getPixelForValue(0) : 0) }
        },
        interaction: { intersect: false, mode: 'index' },
        onHover: (e, els) => { if (e && e.native) e.native.target.style.cursor = els.length ? 'pointer' : 'default'; },
        plugins: {
          legend: {
            display: true,
            align: 'end',
            labels: {
              boxWidth: 10, boxHeight: 10, usePointStyle: true, pointStyle: 'circle',
              color: tickColor, font: { size: 11, weight: '700', family: "'Outfit', system-ui, sans-serif" },
              padding: 14,
              filter: (item) => !datasets[item.datasetIndex].isHalo
            }
          },
          tooltip: {
            backgroundColor: isDark ? 'rgba(20,20,25,0.96)' : 'rgba(255,255,255,0.98)',
            titleColor: isDark ? '#ffffff' : '#0f172a',
            bodyColor: isDark ? '#e2e8f0' : '#334155',
            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
            borderWidth: 1,
            cornerRadius: 12,
            padding: 12,
            usePointStyle: true,
            filter: (item) => !datasets[item.datasetIndex].isHalo,
            callbacks: {
              title: (items) => isDaily ? `Day ${items[0].label}` : items[0].label,
              label: (item) => ` ${item.dataset.label}: ${sym}${this.formatVal(item.parsed.y)}`,
              footer: (items) => {
                const sp = items.find(i => i.dataset.label === 'Spending');
                const inc = items.find(i => i.dataset.label === 'Income');
                if (!sp || !inc) return '';
                const net = inc.parsed.y - sp.parsed.y;
                const sign = net >= 0 ? '+' : '-';
                return `Net: ${sign}${sym}${this.formatVal(Math.abs(net))}`;
              }
            },
            footerColor: isDark ? '#a7f3d0' : '#059669',
            footerFont: { weight: '800', size: 12 }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: tickColor,
              font: { size: 10, weight: '700' },
              maxRotation: 0,
              minRotation: 0,
              autoSkip: true,
              maxTicksLimit: isDaily ? 10 : 12
            }
          },
          y: {
            position: 'right',
            beginAtZero: true,
            grace: '12%',
            grid: { color: gridColor, drawBorder: false },
            ticks: {
              color: tickColor,
              font: { size: 10, weight: '700' },
              padding: 6,
              callback: (val) => val <= 0 ? '' : sym + this.formatVal(val)
            }
          }
        }
      },
      plugins: [crosshair]
    });
  },

  getStats(v) {
    const m = v.getMonth(), y = v.getFullYear();
    const endOfViewMonth = new Date(y, m + 1, 0, 23, 59, 59); // Last second of the viewed month

    // Monthly View Stats (Specific to this month) — exclude vault transfers so Spending matches the ledger
    const monthlyIncome = this.data.income.filter(o => { const d = new Date(o.date); return d.getMonth() === m && d.getFullYear() === y; }).reduce((s, o) => s + o.amount, 0);
    const monthlyExpenses = this.data.expenses.filter(o => { const d = new Date(o.date); return d.getMonth() === m && d.getFullYear() === y && o.category !== 'transfer'; }).reduce((s, o) => s + o.amount, 0);

    // Previous calendar month stats (for month-over-month comparison)
    const pm = m === 0 ? 11 : m - 1;
    const py = m === 0 ? y - 1 : y;
    const prevIncome = this.data.income.filter(o => { const d = new Date(o.date); return d.getMonth() === pm && d.getFullYear() === py; }).reduce((s, o) => s + o.amount, 0);
    const prevExpenses = this.data.expenses.filter(o => { const d = new Date(o.date); return d.getMonth() === pm && d.getFullYear() === py && o.category !== 'transfer'; }).reduce((s, o) => s + o.amount, 0);

    // Closing Balance of the viewed month (Cumulative up to the end of the viewed month)
    const closingIncome = this.data.income.filter(o => new Date(o.date) <= endOfViewMonth).reduce((s, o) => s + o.amount, 0);
    const closingExpenses = this.data.expenses.filter(o => new Date(o.date) <= endOfViewMonth).reduce((s, o) => s + o.amount, 0);
    
    // Opening Balance of the viewed month (Cumulative up to the start of the viewed month)
    const startOfViewMonth = new Date(y, m, 1, 0, 0, 0);
    const openingIncome = this.data.income.filter(o => new Date(o.date) < startOfViewMonth).reduce((s, o) => s + o.amount, 0);
    const openingExpenses = this.data.expenses.filter(o => new Date(o.date) < startOfViewMonth).reduce((s, o) => s + o.amount, 0);
    const openingBalance = openingIncome - openingExpenses;
    
    return { 
      income: monthlyIncome, 
      expenses: monthlyExpenses, 
      prevIncome: prevIncome,
      prevExpenses: prevExpenses,
      balance: monthlyIncome - monthlyExpenses,
      closingBalance: closingIncome - closingExpenses,
      openingBalance: openingBalance
    };
  },

  destroy() {
    this._removeGlobalListeners();
    if (this._debouncedDataUpdate) {
      this._debouncedDataUpdate.cancel();
      this._debouncedDataUpdate = null;
    }
    if (this.rateInterval) {
      clearInterval(this.rateInterval);
      this.rateInterval = null;
    }
  }
};
window.Finance = Finance;
