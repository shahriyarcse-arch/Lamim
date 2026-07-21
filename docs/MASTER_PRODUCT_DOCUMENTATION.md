# MASTER PRODUCT DOCUMENTATION — Lamim

> **Version:** 4.0.0 (Codename: "Sovereign")  
> **Build:** v153  
> **Type:** Offline-First Progressive Web Application (PWA)  
> **Stack:** Vanilla JavaScript, IndexedDB, Service Worker, SVG Charts  
> **Repository:** https://github.com/shahriyarcse-arch/Lamim  
> **Deployment:** Vercel (https://vercel.com)

---

# TABLE OF CONTENTS

1. [PRODUCT OVERVIEW](#1-product-overview)
2. [TECHNICAL ARCHITECTURE](#2-technical-architecture)
3. [DESIGN SYSTEM](#3-design-system)
4. [COMPLETE FEATURE DOCUMENTATION](#4-complete-feature-documentation)
5. [PAGE-BY-PAGE DOCUMENTATION](#5-page-by-page-documentation)
6. [SECTION-BY-SECTION DOCUMENTATION](#6-section-by-section-documentation)
7. [COMPONENT DOCUMENTATION](#7-component-documentation)
8. [USER FLOW](#8-user-flow)
9. [MARKETING KNOWLEDGE](#9-marketing-knowledge)
10. [LANDING PAGE KNOWLEDGE](#10-landing-page-knowledge)
11. [IMPROVEMENT ANALYSIS](#11-improvement-analysis)

---

# 1. PRODUCT OVERVIEW

## 1.1 Product Name

**Lamim** — Islamic Lifestyle Tracker

## 1.2 Product Vision

To become the definitive digital companion for Muslims worldwide who seek to integrate their spiritual, physical, and financial lives into a single private, offline-first experience — where no data ever leaves the device.

## 1.3 Purpose

Lamim solves the fragmentation problem faced by practicing Muslims: salah tracking in one app, dhikr in another, finance in a third, gym in a fourth, with all of them uploading data to unknown servers. Lamim unifies 9 core life dimensions (Salah, Dhikr, Nafl, Habit Reformation, Finance, Gym, Career, Analysis, Goals) into one cohesive dashboard that works fully offline, syncs nothing to the cloud, and requires no account creation.

## 1.4 Mission

To empower every Muslim to track, improve, and celebrate their spiritual journey with complete privacy, zero data leakage, and world-class user experience — regardless of internet connectivity.

## 1.5 Why This Application Exists

- Existing Islamic apps are fragmented (separate apps for salah, dhikr, finance)
- Most Islamic apps sync data to cloud servers, violating privacy expectations
- No single app covers the complete Islamic lifestyle (spiritual + physical + financial)
- Existing solutions require internet connectivity and account registration
- Muslim users need accurate prayer times calculated locally, not fetched from servers
- Gap in the market for a premium-quality, design-forward Islamic app

## 1.6 What Problem It Solves

| Problem | Lamim Solution |
|---------|---------------|
| Fragmented Islamic tools | Single unified dashboard with 9 integrated modules |
| Privacy concerns with cloud sync | Zero cloud, 100% offline, IndexedDB local storage |
| Prayer time dependency on internet | Client-side sun-angle calculation (Muslim World League) |
| No spiritual progress tracking | Spiritual Health Score (SHS) with 7 tiers |
| Habit relapse tracking | Mujahid "Habit Forge" with streak counters and badges |
| Islamic finance management | Halal finance tracker with 220+ categories, vaults |
| Cross-device data loss | JSON backup/export, service worker caching |
| No offline Quran integration | 6000+ verse dataset lazy-loaded for daily inspiration |

## 1.7 Target Audience

- Practicing Muslims aged 16–50
- Privacy-conscious individuals
- Muslims who pray 5 times daily and want to track consistency
- People trying to quit bad habits (Islamic framework)
- Muslims managing halal finances
- Individuals tracking gym, diet, sleep in an Islamic context
- Students and professionals tracking career/study goals
- Bengali-speaking Muslims (full Bengali UI support)
- Tech-savvy Muslims who appreciate premium design

## 1.8 Expected Users

- **Daily active users:** Muslims who pray 5 times and want streak tracking
- **Habit reformers:** Muslims trying to quit bad habits with Islamic accountability
- **Finance trackers:** Those managing halal wealth with savings vaults
- **Students:** Tracking study hours and career progress
- **Privacy advocates:** Users who refuse cloud-synced apps
- **Offline users:** People in areas with unreliable internet

## 1.9 Real-World Use Cases

- Track 5 daily prayers with congregation/alone/qaza status
- Count dhikr (tasbeeh) with 10 preset phrases and custom additions
- Log voluntary (nafl) prayers including Sunnah, Tahajjud, Witr
- Quit smoking/porn/bad habits with streak tracking
- Manage monthly budget with 220+ halal expense categories
- Track gym workouts, sets, reps, and personal records
- Log daily study sessions and career goals
- View spiritual health score with radar analysis
- Export monthly PDF reports for all modules
- Receive prayer time notifications (offline)

## 1.10 Competitive Advantages

- **100% offline**: Works without internet — prayer times calculated locally
- **Zero cloud sync**: No accounts, no servers, no data leakage
- **All-in-one**: 9 modules in a single app vs. 9 separate apps
- **Premium design**: Glassmorphism dark theme, bento grid layout, smooth animations
- **Spiritual Health Score (SHS)**: Unique composite scoring across all dimensions
- **Multiple calculators**: Prayer times, Hijri date, Zakat, currency conversion
- **PDF export**: Professional monthly reports for every module
- **Full Bengali localization**: Complete Bengali UI with numeral translation
- **Accessibility**: WCAG-compatible skip links, focus traps, ARIA labels, keyboard nav

## 1.11 Unique Selling Points (USP)

1. **"Your entire deen in one place — offline, private, beautiful."**
2. Spiritual Health Score (SHS) — a single number representing spiritual wellness
3. Zero data ever leaves your device (no accounts, no cloud, no trackers)
4. Prayer times calculated client-side (no API calls for prayer times)
  5. 220+ Islamic finance categories across 13 sections
  6. 7-tier spiritual ranking system (Ghafil → Musafir → Murid → Mujahid → Mukhlis → Muttaqi → Muhsin)
  7. Habit Forge with 14 badge milestones (up to 5000 days)
8. Breathing exercise integrated for stress/relapse recovery
9. Bengali language support with numeral translation
10. Service worker caching with auto-update and cache-busting

---

# 2. TECHNICAL ARCHITECTURE

## 2.1 Folder Structure

```
Lamim/
├── index.html                 # Landing page entry point (self-contained, inline CSS)
├── vercel.json                # Vercel deployment config (rewrites, headers)
├── sitemap.xml                # SEO sitemap
├── robots.txt                 # SEO robots
├── README.md                  # Project readme
├── .env                       # Environment variables
├── .gitignore                 # Git ignore rules
│
├── app/                       # PWA Application (complete, untouched)
│   ├── index.html             # App shell (SPA, all pages/mods in one HTML)
│   ├── manifest.json          # PWA manifest (93 lines, 5 shortcuts)
│   ├── sw.js                  # Service worker (lamim-v153, cache strategies)
│   ├── 404.html               # Custom 404 page
│   │
│   ├── assets/                # App icons (6 files)
│   │   ├── icon.svg
│   │   ├── icon-32x32.png
│   │   ├── icon-180x180.png
│   │   ├── icon-192x192.png
│   │   ├── icon-512x512.png
│   │   └── icon-maskable-512x512.png
│   │
│   ├── css/                   # 39 CSS files (modular, versioned)
│   │   ├── variables.css      # Design tokens (colors, spacing, typography)
│   │   ├── base.css           # Reset and base styles
│   │   ├── components.css     # Reusable component styles
│   │   ├── animations.css     # Keyframe animations
│   │   ├── responsive.css     # Responsive breakpoints
│   │   ├── ui-system.css      # UI system (buttons, inputs, toggles)
│   │   ├── auth.css           # Setup/auth wizard styles
│   │   ├── splash.css         # Splash screen styles
│   │   ├── home.css           # Home dashboard styles
│   │   ├── salah.css          # Salah tracker styles
│   │   ├── dhikr-*.css        # Dhikr module styles (base, session, cards, modal)
│   │   ├── goals.css          # Nafl goals styles
│   │   ├── gym.css            # Gym tracker styles
│   │   ├── career.css         # Career builder styles
│   │   ├── finance*.css       # Finance module styles (main, redesign, modal)
│   │   ├── mujahid.css        # Mujahid habit forge styles
│   │   ├── analysis*.css      # Analysis module styles (main, intelligence, hub)
│   │   ├── profile*.css       # Profile styles (main, premium)
│   │   ├── glass-panel.css    # Glassmorphism panel styles
│   │   ├── health-bars.css    # Health/progress bar styles
│   │   ├── activity-log.css   # Activity log styles
│   │   ├── stats-row.css      # Stats row styles
│   │   ├── mini-badges.css    # Badge system styles
│   │   ├── animation-engine.css # Engine for advanced animations
│   │   ├── breathing-modal.css # Breathing exercise modal
│   │   ├── complete-cinematic-quote-effects.css # Quote effects
│   │   ├── home-dashboard-extra.css # Extra home dashboard styles
│   │   ├── mobile-optimizations.css # Mobile-specific fixes
│   │   ├── print-styles.css   # Print/PDF export styles
│   │   └── light-mode-patch.css # Light mode overrides
│   │
│   ├── js/                    # 18 JavaScript files (load order matters)
│   │   ├── lang.js            # Bengali translations (342 entries + auto-translator)
│   │   ├── utils.js           # Utilities (prayer times, hijri, toast, confetti, a11y)
│   │   ├── db.js              # IndexedDB wrapper (cache, migrate, all CRUD)
│   │   ├── auth.js            # Setup wizard (4-step onboarding)
│   │   ├── app.js             # Main app router, init, navigation
│   │   ├── charts.js          # Pure SVG charts (ring, sparkline, line)
│   │   ├── salah.js           # Salah tracker module
│   │   ├── home.js            # Home dashboard module
│   │   ├── dhikr.js           # Dhikr counter module
│   │   ├── goals.js           # Nafl goals module
│   │   ├── gym.js             # Gym/diet tracker module
│   │   ├── career.js          # Career builder module
│   │   ├── finance.js         # Islamic finance module
│   │   ├── mujahid.js         # Habit forge module
│   │   ├── analysis.js        # Spiritual analysis module
│   │   ├── profile.js         # User profile/settings module
│   │   ├── prayer-notifier.js # Prayer notification scheduler
│   │   └── verses.json        # ~3.6MB Quran verse dataset (6000+ verses)
│   │
│   └── (no additional files)
│
├── landing/                   # Landing page (self-contained)
│   ├── index.html             # Meta-only landing page (109 lines)
│   ├── assets/                # Landing icons (7 files)
│   ├── css/                   # Landing styles (theme.css, layout.css, animations.css)
│   │
│
├── docs/                      # Project documentation
│   ├── MASTER_PRODUCT_DOCUMENTATION.md  # This file
│   ├── DOCUMENTATION.md       # Legacy documentation
│   ├── PROJECT_AUDIT.md       # Project audit report
│   ├── LANDING_PAGE_PLAN.md   # Landing page plan
│   └── LANDING_PAGE_SUMMARY.md # Landing page summary
│
├── scripts/                   # Python utilities
│   ├── ai.py                  # AI-related utility
│   └── fetch_quran.py         # Quran verse fetching script
│
└── .agents/                   # Agent configuration
    └── skills/                # Agent skill definitions
```

## 2.2 Framework

**None.** The entire application is built with **vanilla JavaScript** (no React, Vue, Angular, or any framework). The architecture follows a **singleton module pattern** where each feature is a global object with `init()`, `destroy()`, `render()`, and `onDataUpdated()` methods. The main app (`app.js`) acts as a **simple router** that manages section visibility and lifecycle.

## 2.3 Libraries & Packages

| Library | Usage | Loading Method |
|---------|-------|---------------|
| Chart.js | Finance module chart visualizations | Dynamic CDN load (`cdn.jsdelivr.net/npm/chart.js`) |
| Google Fonts (3 families) | Typography | `<link>` in HTML head |
| No other external dependencies | — | — |

**Google Fonts loaded:**
- **Plus Jakarta Sans** (300–800): Primary UI font
- **Outfit** (300–800): Headings and display text
- **Amiri** (400, 700, italic): Arabic text (Quranic verses, Arabic phrases)

## 2.4 Routing

Lamim is a **Single Page Application (SPA)** with hash-free routing:

- **Sections**: Navigation via `App.navigateTo(sectionId)` which shows/hides `.section-panel` elements
- **URL params**: `?section=salah` for deep-linking (used by PWA shortcuts)
- **History API**: `history.pushState()` and `popstate` listener for Android hardware back button support
- **Pages**: Two "pages" managed by `App.showPage()` — `page-setup` (onboarding) and `page-dashboard` (main app)
- **Scroll restoration**: Manual via `history.scrollRestoration = 'manual'`

## 2.5 State Management

There is no centralized state management library. State is managed through:

1. **IndexedDB** (primary): All persistent data stored in `lamim_db` / `keyvalue` store
2. **localStorage** (secondary): Language preference and settings also stored in localStorage for immediate access
3. **In-memory cache** (in `db.js`): All DB reads/writes go through a `_cache` object for speed
4. **Module-scoped variables**: Each module holds its own state (e.g., `Salah.selectedDate`, `Dhikr.count`, `Mujahid.habits[]`)
5. **Custom events**: `lamim:data-updated` dispatched on data changes, routed only to active section
6. **`DB.getSettings()`**: Single settings object with `{ theme, notifications, jumuahMode, language, currency, lat, lng, locationName }`

## 2.6 Data Flow

```
User Action → Module Handler → DB.set*(data)
    → DB._cache update
    → DB._asyncWrite (IndexedDB)
    → dispatchEvent('lamim:data-updated')
    → App.routeDataUpdate()
    → Active module.onDataUpdated()
    → Module re-render
```

**Key principle**: Data changes always persist immediately. The active section re-renders in-place (updating textContent/classList rather than replacing innerHTML).

## 2.7 API Layer

**External APIs called** (all have abort timeouts, fail gracefully offline):

| API | Endpoint | Used By | Purpose |
|-----|----------|---------|---------|
| IP Geolocation | `https://ipapi.co/json/` | auth.js, profile.js | Fallback location detection |
| Reverse Geocode | `https://api.bigdatacloud.net/data/reverse-geocode-client` | utils.js | Lat/lng → city name |
| Exchange Rate | `https://open.er-api.com/v6/latest/USD` | finance.js | USD → BDT conversion |
| Chart.js | `https://cdn.jsdelivr.net/npm/chart.js` | finance.js | Finance charts (dynamically loaded) |

**No API keys required** for any of these services.

## 2.8 Services

- **Prayer Time Calculator**: Pure client-side sun-angle calculation in `Utils.calcPrayerTimes()`
- **Hijri Date Converter**: Client-side calculation in `Utils.toHijri()` with `hijriOffset` for correction
- **IP Geolocation**: Fallback location detection when GPS unavailable
- **Reverse Geocoding**: City name lookup from coordinates
- **Currency Exchange**: Live rate fetching for USD/BDT conversion

## 2.9 Utilities (utils.js)

| Function | Description |
|----------|-------------|
| `todayStr()` | Today's date string with 3AM offset (Islamic day starts at Fajr) |
| `dateStr(d)` | Format date to `YYYY-MM-DD` |
| `formatTime(d)` | Locale time string |
| `escapeHTML(str)` | XSS-safe HTML escaping |
| `formatDate(d, opts)` | Locale date formatting |
| `toHijri(d)` | Hijri date calculation with adjustable offset |
| `calcPrayerTimes()` | Sun-angle based prayer times (MWL method) |
| `getNextPrayer(times)` | Next prayer lookup |
| `countdownTo(target)` | Countdown timer string `HH:MM:SS` |
| `autoUpdateLocationOnTravel()` | Background location update (30km threshold, 15min throttle) |
| `_haversineKm()` | Distance calculation for travel detection |
| `reverseGeocode(lat, lng, cb)` | City name from coordinates (cached) |
| `uid()` | Unique ID generator |
| `toast(msg, type, duration)` | Toast notification system |
| `confetti()` | 60-particle confetti celebration |
| `salahScore(salahData)` | Prayer completion score (0-100) |
| `getQuote()` | Quranic verse cycling for daily inspiration |
| `ensureVerses()` | Lazy-loads 6000+ verse dataset |
| `initA11y()` | Accessibility: modal focus traps, ARIA labels, keyboard nav |
| `confirm(title, msg, onConfirm)` | Confirmation dialog |
| `dangerConfirm(opts)` | Themed destructive confirmation |
| `debounce(fn, wait)` | Debounce utility |
| `loadScript(url)` | Dynamic script loader |
| `safeRun(fn, context)` | Error boundary wrapper |

## 2.10 Hooks / Lifecycle

Each module implements a standard lifecycle:

| Method | Purpose |
|--------|---------|
| `init()` | Called when section becomes active; renders UI, sets up state |
| `onDataUpdated()` | Called when data changes (debounced); updates in-place |
| `destroy()` | Called when leaving section; clears intervals, removes listeners |

## 2.11 Build Process

**No build step.** The application is pure HTML/CSS/JS. Development workflow:

1. Edit files directly in `app/` directory
2. Increment version parameter in HTML (`?v=N`) for cache busting
3. Deploy to Vercel (or any static host) — `vercel.json` handles routing
4. Service worker auto-detects new version on next load

## 2.12 PWA Setup

**manifest.json** key properties:
- `display: standalone` — full-screen PWA experience
- `orientation: portrait-primary` — phone-optimized
- `background_color: #020408` — matches dark theme
- `start_url: /index.html` — app entry point
- `scope: /` — app scope
- **5 shortcuts**: Salah, Dhikr, Finance, Goals, Analysis (direct section navigation)

## 2.13 Service Worker (sw.js)

**Version:** lamim-v153

**Install Strategy:** 
1. Cache core shell ( `./`, `./index.html`, `./manifest.json` )
2. Parse index.html for all local CSS/JS files
3. Cache all referenced assets (best-effort with `Promise.allSettled`)
4. `skipWaiting()` for immediate activation

**Activate Strategy:**
1. Delete all old caches (version-specific)
2. `self.clients.claim()`
3. Notify all tabs of new version (`SW_UPDATED` message)

**Fetch Strategy (3 tiers):**
- **Navigation (HTML)**: Network-first (always latest HTML), fallback to cache
- **Local assets (JS/CSS/images/verses.json)**: Cache-first (instant load), fetch on miss
- **External assets (fonts, CDN)**: Stale-while-revalidate

**Update System:** Auto cache-buster via `?v=` params; `SW_UPDATED` message triggers cache clear + reload

## 2.14 Caching Strategy

- IndexedDB (`lamim_db`): User data persistence (salah, dhikr, finance, etc.)
- Cache API (`lamim-v153`): Static assets (JS, CSS, fonts, verses.json)
- localStorage: Settings, language, notification state, FX rate cache
- Memory cache (`DB._cache`): All IndexedDB data cached in-memory for fast reads

## 2.15 Performance Strategy

- **GPU-accelerated animations**: Only `transform` and `opacity` animated (no layout triggers)
- **Lazy loading**: `verses.json` (3.6MB) fetched post-startup with 8s timeout
- **Dynamic script loading**: Chart.js loaded on-demand only when finance chart is rendered
- **In-place DOM updates**: Modules update `textContent`/`classList` rather than replacing HTML
- **Debounced renders**: Data update handlers debounced at 200-300ms
- **Scroll-based animation pause**: Aurora background paused during scroll
- **Reduced motion support**: `prefers-reduced-motion: reduce` disables all animations
- **Cache-first SW**: All static assets served instantly from cache on repeat visits
- **Stale-while-revalidate**: External fonts served from cache, updated in background

---

# 3. DESIGN SYSTEM

## 3.1 Color Palette

### Dark Mode ("Obsidian Midnight")

**Background:**
| Token | Value |
|-------|-------|
| `--color-bg-primary` | `#020408` |
| `--color-bg-secondary` | `#060b13` |
| `--color-bg-tertiary` | `#0c1322` |
| `--color-bg-elevated` | `#172033` |

**Accents (7-color system):**
| Token | Value | Usage |
|-------|-------|-------|
| Purple | `#a78bfa` | Primary actions, active borders |
| Gold | `#f0c456` | Spiritual scores, milestones |
| Teal | `#2dd4bf` | Dhikr, health metrics |
| Blue | `#38bdf8` | Salah, time displays |
| Orange | `#fb923c` | Streaks, gym |
| Green | `#34d399` | Success, finance |
| Red | `#f87171` | Danger, missed prayers |

**Prayer Status Colors:**
- Jama'at: `#3fb950` (congregation)
- Alone: `#58a6ff` (individual)
- Qaza: `#d29922` (made up later)
- Missed: `#f85149` (not prayed)

**Text:**
- Primary: `#ffffff`
- Secondary: `#cbd5e1`
- Muted: `#94a3b8`
- Inverse: `#020617`

### Light Mode Overrides
- Background: `#F1F5F9` (slate 100)
- Surface: `#FFFFFF`
- Text primary: `#0B1423`
- Accents shift to deeper tones (e.g., purple: `#6366f1`)

## 3.2 Typography

**Font Families:**
- Primary: `'Outfit', 'Plus Jakarta Sans', system-ui sans-serif`
- Arabic: `'Amiri', 'Traditional Arabic', serif`

**Type Scale:**
| Token | Size | Usage |
|-------|------|-------|
| `--text-xs` | 10px (0.625rem) | Captions |
| `--text-sm` | 12px (0.75rem) | Labels |
| `--text-base` | 14px (0.875rem) | Body text |
| `--text-md` | 16px (1rem) | Larger body |
| `--text-lg` | 18px (1.125rem) | Subheadings |
| `--text-xl` | 20px (1.25rem) | Small headings |
| `--text-2xl` | 24px (1.5rem) | H5 |
| `--text-3xl` | 30px (1.875rem) | H4 |
| `--text-4xl` | 36px (2.25rem) | H3 |
| `--text-5xl` | 48px (3rem) | H2 |

**Font Weights:** 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold)

## 3.3 Spacing System (8px grid)

`--space-1` (4px) → `--space-20` (80px) in 4px/8px increments.

## 3.4 Border Radius

- Small: 6px (`--radius-sm`)
- Medium: 12px (`--radius-md`)
- Large: 16px (`--radius-lg`)
- XL: 24px (`--radius-xl`)
- 2XL: 32px (`--radius-2xl`)
- Full: 9999px (pills)

## 3.5 Shadows

- Standard: layered box-shadows with `rgba(0,0,0,0.3-0.6)`
- Glow: colored 0 0 20px variants (gold, blue, green, red)
- Premium: `0 12px 40px rgba(0,0,0,0.5)` with inset highlight

## 3.6 Glassmorphism

The dominant design language: `backdrop-filter: blur(16-24px)` with `rgba(255,255,255,0.02-0.05)` backgrounds and `1px rgba(255,255,255,0.06)` borders.

## 3.7 Icons

- All icons are **inline SVGs** (no icon font or external icon library)
- Each SVG is individually defined in HTML/JS with appropriate `viewBox`, `stroke`, `fill`
- ~100+ unique SVG icons across the entire app
- Icons are colored via `stroke="currentColor"` / `fill="currentColor"` for theme adaptation

## 3.8 Motion & Animation

**Transition System:**
| Token | Duration | Easing |
|-------|----------|--------|
| Fast | 150ms | `cubic-bezier(0.4,0,0.2,1)` |
| Base | 250ms | `cubic-bezier(0.4,0,0.2,1)` |
| Slow | 400ms | `cubic-bezier(0.4,0,0.2,1)` |
| Bounce | 350ms | `cubic-bezier(0.34,1.56,0.64,1)` |

**Keyframe Animations (40+ total):**
- Entrance: `fadeIn`, `fadeInUp`, `fadeInDown`, `scaleIn`, `modalPop`
- Attention: `pulse`, `pulseSoft`, `countBounce`, `shimmer`, `shimmerText`
- Decorative: `floatUp`, `confettiFall`, `orbGlow`, `flameFlicker`
- Navigation: `slideInLeft`, `navItemSlideIn`
- Functional: `progressFill`, `ringFill`, `dash`, `toastSlideIn`
- Theme: `gradientShift`, `glossyText`

**Animation Principles:**
- Only `transform` and `opacity` animated (GPU-composited)
- Entrance animations staggered (0.04-0.05s delays)
- `prefers-reduced-motion: reduce` disables all animations
- Scroll-aware animation pausing (aurora paused during scroll)

## 3.9 Grid System

- **App shell**: Sidebar (260px) + main content (flex: 1) + bottom nav (mobile)
- **Bento grid**: Multi-column card layout on home dashboard
- **Responsive breakpoints**: 480px, 768px, 1024px, 1440px
- **Grid classes**: `.grid-2`, `.grid-3`, `.grid-4`, `.grid-auto` (responsive collapse)

## 3.10 Z-Index Scale

| Level | Token | Value |
|-------|-------|-------|
| Base | `--z-base` | 1 |
| Dropdown | `--z-dropdown` | 100 |
| Sidebar | `--z-sidebar` | 200 |
| Overlay | `--z-overlay` | 300 |
| Modal | `--z-modal` | 20000 |
| Toast | `--z-toast` | 30000 |
| Splash | `--z-splash` | 99999 |

---

# 4. COMPLETE FEATURE DOCUMENTATION

> For EACH feature: name, purpose, why it exists, where users access it, how users interact, complete user flow, internal logic, UI behavior, business logic, validation, edge cases, error handling, loading/empty/success/failure states, animations, responsive behavior, accessibility, dependencies.

## 4.1 Onboarding / Setup Wizard

### Feature Name
4-Step Offline Registration Wizard

### Purpose
Collect essential user information (name, gender, date of birth, location) to personalize the entire app experience. No internet required.

### Why It Exists
The app needs basic profile data to calculate prayer times (location), display appropriate greetings (gender, name), and personalize spiritual tracking.

### Where Users Access It
First visit only. Automatically shown on app launch when no user record exists in IndexedDB.

### User Interaction Flow
1. **Step 1 — Name**: User enters their name (2-50 chars). Shows a hand wave icon. "What should we call you?" Continue button.
2. **Step 2 — Gender**: Two large selectable cards (Male/Female) with SVG icons. "Who are you?" Back/Continue buttons.
3. **Step 3 — Date of Birth**: Custom drum-picker with 3 scrollable columns (Day/Month/Year). Optional field. Back/Continue buttons.
4. **Step 4 — Location**: Auto-detect button (GPS) with radar animation. Manual lat/lng input fields. Back and "Start Journey" button.

### Internal Logic
- Each step is a div in a horizontal scroll container (translateX by -25% per step)
- Progress dots at top show current step (4 dots)
- Step 3 uses a custom drum/scroll picker built with CSS scroll-snap
- Step 4 on "Start Journey" validates all fields, generates user ID (`local_` + timestamp), virtual email (`local@lamim.offline`), and random 16-digit card number
- Saves to `DB.setUser()` and `DB.setSettings()`
- Redirects to dashboard via `App.showDashboard()`

### Business Logic
- Name: Required, 2-50 characters
- Gender: Required, stored as `'male'` or `'female'`
- DOB: Optional, defaults to 2000-01-01
- Location: Required (GPS or manual). Falls back to IP geolocation if GPS fails
- Virtual card number generated once at setup (4 groups of 4 digits)
- All data stored locally only

### Validation
- Name cannot be empty (shows inline error `.field-error`)
- Gender must be selected (toast warning if not)
- Lat/lng must be valid floats
- DOB day clamped to actual month max days (Feb 30 → Feb 28/29)

### Edge Cases
- **Offline**: IP geolocation fails → manual entry mode
- **GPS denied**: Falls back to IP API, then manual entry
- **Popup blocker**: N/A (no popups in setup)
- **Double submit**: Guarded by `_submitting` flag

### Error Handling
- GPS timeout (6s) → IP fallback (8s) → manual entry warning
- JSON settings parse failure → falls back to light theme
- Geolocation unavailable → toast warning + manual entry

### Animations
- Step transitions: horizontal slide (25% per step via translateX)
- Content elements: stagger `anim-target` fade-in with 0.08s delays
- Progress dots: active state toggled per step
- Location radar icon: rotating animation during detection
- Gender cards: active state highlight

### Responsive Behavior
- Full-screen centered layout on all sizes
- Cards stack vertically on mobile
- DOB drum picker scales down on small screens

### Accessibility
- Skip link to main content
- ARIA labels on gender cards, location button
- Keyboard: Enter triggers Continue, name field auto-focused
- Focus management on step transitions

## 4.2 Home Dashboard

### Feature Name
Spiritual Home Dashboard

### Purpose
Central hub showing an overview of the user's spiritual state: greeting, next prayer countdown, spirit score, today's salah timeline, dhikr count, streak, and daily Quranic verse.

### Where Users Access It
Default section on app launch / tap Home icon in sidebar or bottom nav.

### User Interaction Flow
1. App launches → splash screen (1.8s) → dashboard loads
2. Home shows: personalized greeting ("Good Morning, Name"), current date, Hijri date
3. Spirit orb (tappable → navigates to Analysis)
4. Next prayer countdown card (auto-updates every second)
5. Today's Dhikr total + Prayer streak cards
6. Today's Salah timeline (5 nodes, colored by status)
7. Verse of the Day (rotates every minute, crossfade animation)

### Internal Logic
- Greeting time-of-day detection: <12=Morning, <18=Afternoon, else Evening
- Spirit score read from `DB.getUser().spirit_score`
- Prayer times calculated via `Utils.calcPrayerTimes()`
- Next prayer determined via `Utils.getNextPrayer()`
- Countdown ticks every 1 second via setInterval
- Salah timeline reuses cached DOM (avoids reflow)
- Quote cycles by minutes-since-epoch, uses 6000+ verse dataset (lazy-loaded)
- Quote crossfade: hides old text (500ms) → swaps → shows new

### Business Logic
- Prayer countdown auto-re-checks when timer reaches 0
- Sunrise/sunset-based prayer time detection
- Quote only animates if text actually changed
- Aurora background pauses during scroll for performance

### Validation
- All DOM elements null-guarded
- Falls back gracefully if `DB.getUser()` returns null

### Edge Cases
- No user (shouldn't happen post-setup): greeting falls back to time-of-day
- No prayer times: next prayer card stays hidden
- Same quote between renders: no animation triggered
- Midnight rollover: app-level reload (in app.js)

### Animations
- Aurora background: slow-rotating gradient blobs (paused during scroll)
- Quote crossfade: 500ms opacity transition
- Spirit score: displays with cinematic number styling
- Timeline nodes: colored by prayer status
- Bento cards: glass effect with hover lift

### Responsive
- Bento grid: single column on mobile, multi-column on desktop
- Sidebar hidden on mobile (bottom nav visible)
- Topbar shows on mobile only

### Accessibility
- Skip link to main content
- Spirit orb has `role="button"` and `aria-label`
- Aurora backgrounds have `aria-hidden="true"`
- Dynamic greeting updates

## 4.3 Salah Tracker

### Feature Name
5 Daily Prayer Tracker

### Purpose
Track the 5 obligatory (fardh) prayers with congregation status, weekly/monthly calendar heatmap, streak tracking, and PDF export.

### Where Users Access It
Sidebar / Bottom nav → "Salah Tracker" section

### User Interaction Flow
1. Prayer time pills shown at top (Fajr → Isha, next prayer highlighted)
2. Location notice if using default Dhaka coordinates
3. Stats row: prayers completed, perfect streak, consistent streak, points, score
4. 5 prayer cards: each shows prayer name, time, status selector
5. Select status: Jama'at (10pts), Alone (7pts), Qaza (3pts), Missed (0pts)
6. Once selected, card locks with icon, color, points display
7. Calendar heatmap at bottom (color-coded by day completeness)
8. Monthly PDF export button

### Prayer Status Options
- **Jama'at** (congregation): Green, 10 points, "Successful" result
- **Alone** (individual): Blue, 7 points, "Successful" result
- **Qaza** (made up later): Amber, 3 points, "Qaza" result
- **Missed**: Red, 0 points, "Unsuccessful" result

### Calendar Color Coding
| Color | Meaning | Condition |
|-------|---------|-----------|
| Emerald green | All 5 prayed | Score >= 70% |
| Sky blue | 3-4 prayed | Partial |
| Warm amber | 1-2 prayed | Low |
| Soft rose | None prayed | 0 with activity |
| Glass | Today no activity | No data yet |
| 50% opacity | Future dates | Not yet accessible |

### Internal Logic
- Date navigation (prev/next day), today button
- Friday shows "Jumu'ah" label for Dhuhr when Jumu'ah mode enabled
- Future dates locked (cannot edit)
- All-5 celebration: confetti + toast on 5th prayer logged
- Calendar tooltip shows per-prayer status on hover (desktop) / tap (mobile)
- PDF export generates A4 report with stats, calendar, Quranic footer

### Business Logic
- Points: Jama'at=10, Alone=7, Qaza=3, Missed=0
- Perfect streak: consecutive days with 5/5 prayers
- Consistent streak: consecutive days with >=4/5 prayers
- Streak cache invalidated on new salah save
- Today counts even if incomplete (doesn't break streak)
- Calendar cached by month (only updates cells if same month)

### Validation
- Future dates: interaction disabled
- Invalid status values: safely fallback to gray defaults

### Error Handling
- Popup blocker for PDF: shows error toast
- Missing calendar cells: tooltip hides gracefully
- Invalid date navigation: next button disabled

### Edge Cases
- Jumu'ah on Friday without Jumu'ah mode: shows "Dhuhr" label
- Past dates with no data: renders empty cards
- Same-month calendar view: only updates cells (no re-render)
- Midnight rollover handled app-wide

### Dependencies
- `DB` (getSalah, setSalah, getSalahStreak)
- `Utils` (prayer times, scores, toast, confetti, formatDate)
- `UI` (showSettingsModal for reset)

## 4.4 Dhikr Counter

### Feature Name
Tasbeeh Counter with Presets

### Purpose
Digital misbaha (prayer beads) for counting dhikr with 10 preset phrases, custom presets, session history, 33-bead visualization, and haptic feedback.

### Where Users Access It
Sidebar / Bottom nav → "Dhikr Counter" section

### User Interaction Flow
1. Hadith marquee scrolls at top
2. Large tap circle in center (shows current count)
3. Tap to increment, side buttons for undo and reset
4. 10 preset dhikr cards below (horizontally scrollable)
5. Active preset highlighted, tap to switch
6. Bead visualization: 33 circles light up progressively
7. Session history below: shows today's entries per preset
8. History modal: full historical data with streak calculation
9. "+" card to create custom dhikr

### 10 Built-in Presets
| # | Arabic | Transliteration | Meaning | Category |
|---|--------|----------------|---------|----------|
| 1 | سُبْحَانَ اللَّهِ | SubhanAllah | Glory be to Allah | General |
| 2 | الْحَمْدُ لِلَّهِ | Alhamdulillah | Praise be to Allah | General |
| 3 | اللَّهُ أَكْبَرُ | Allahu Akbar | Allah is the Greatest | General |
| 4 | لَا إِلَٰهَ إِلَّا اللَّهُ | La ilaha illallah | There is no god but Allah | General |
| 5 | أَسْتَغْفِرُ اللَّهَ | Astaghfirullah | I seek forgiveness of Allah | Morning |
| 6 | صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ | Allahumma Salli | Send blessings upon the Prophet | General |
| 7 | حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ | Hasbunallah | Allah is Sufficient for us | Morning |
| 8 | يَا حَيُّ يَا قَيُّومُ | Ya Hayyu Ya Qayyum | O Ever-Living, O Sustainer | Evening |
| 9 | سُبْحَانَ اللَّهِ وَبِحَمْدِهِ | SubhanAllahi Wabihamdihi | Glory and praise be to Allah | After prayer |
| 10 | لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ | La Hawla Wala Quwwata | There is no power except with Allah | General |

### Internal Logic
- Tap → increment count → save to DB → update bead display → vibrate (25ms)
- Count per preset stored in `lamim_dhikr_<date>` keyed by preset ID
- Bead display: `count % 33` beads lit (1 loop = 33 beads)
- 3AM rollover: counts reset daily (3AM offset)
- History: aggregates all `lamim_dhikr_*` keys from DB

### Business Logic
- Count persisted immediately on each tap
- Undo: decrement (minimum 0)
- Reset: confirmation modal → zero all counts for today
- Custom presets: max 60 chars name, stored in `lamim_dhikr_presets`
- Streak: consecutive days with any dhikr activity

### Validation
- Custom dhikr name required (toast if empty)
- Custom target minimum 1
- Preset grid shows only pal cards

### Animations
- Tap ripple: scale animation on ripple element
- Count number: brief scale(1.1) on increment
- Beads: staggered entrance animation (0.015s per bead)
- Hadith marquee: auto-scroll
- Haptic feedback: `navigator.vibrate(25)`
- Session count update: scale 1.1 for 100ms

### Accessibility
- Space bar to tap (keyboard support)
- ARIA labels on all buttons
- Toast announcements for actions

## 4.5 Nafl Salah Tracker

### Feature Name
Voluntary Prayer Tracker (Nafl / Sunnah / Tahajjud / Witr)

### Purpose
Track voluntary prayers: 5 Sunnah Mu'akkadah rakat, Tahajjud (night prayer), and Witr prayer. Goal-based motivation system.

### Where Users Access It
Sidebar / Bottom nav → "Nafl Salah" section

### User Interaction Flow
1. Hero banner: moon icon, completion progress bar, summary
2. "Sunnah Mu'akkadah" section: 5 cards (Fajr, Dhuhr B, Dhuhr A, Maghrib, Isha)
3. Each card: rakat count, icon, Prayed/Missed buttons (locks on selection)
4. "Night Prayers" section: Tahajjud card + Witr card
5. Tahajjud: rakat grid [2,4,6,8,10,12] + custom + Missed
6. Witr: Prayed/Missed toggle
7. Date navigation (prev/next day)
8. History button: opens 30-day history modal with stats

### 5 Sunnah Mu'akkadah
| Prayer | Rakat | Icon | Glow |
|--------|-------|------|------|
| Fajr (Sunnah) | 2 | Dawn | Orange |
| Dhuhr (Sunnah before) | 4 | Sun | Gold |
| Dhuhr (Sunnah after) | 2 | Sun | Gold |
| Maghrib (Sunnah after) | 2 | Sunset | Purple |
| Isha (Sunnah after) | 2 | Moon | Blue |

### Internal Logic
- Date-sensitive: cannot navigate to future dates
- Statuses lock once set (no overwrite)
- Points: Sunnah = 2pts each, Tahajjud = 3pts, Witr = 2pts (max 15pts/day)
- History: 30-day scroll with total rakat, streak, completion %
- Progress bar: done deeds / total possible deeds (7 max)

### Validation
- Future dates: blocked with toast
- Already-set status: cannot change (silent guard)
- Custom rakat: must be positive integer

### Edge Cases
- No history: shows "No history recorded yet."
- All empty on past date: auto-marks as missed in history view
- High tahajjud rakat (>12): allowed via custom input

## 4.6 Mujahid — Habit Forge

### Feature Name
Bad Habit Tracker / "Habit Forge"

### Purpose
Track bad habits the user wants to quit (e.g., smoking, pornography, anger). Features streak tracking, badge milestones, relapse logging, motivational quotes, and a breathing exercise.

### Where Users Access It
Sidebar / Bottom nav → "Mujahid" section

### User Interaction Flow
1. **Empty state**: "The Forge of Resolve" hero with "Initiate First Habit" CTA
2. **Active state**: 
   - "Warrior Spirit Power" scorecard (total combined clean days)
   - Individual habit cards with live timer (days/hours/minutes/seconds)
   - Relapse button per habit
   - Spirit bars showing progress to next badge
3. **Add habit**: Modal with 14 preset habits + custom habit with icon/color picker
4. **Relapse**: Modal with reason textarea → logs relapse, resets start date, shows undo toast
5. **History**: Modal showing relapse timeline per habit
6. **Breathing exercise**: Full-screen guided breathing (Inhale 8s → Hold 16s → Exhale 20s)
7. **Tools**: Settings modal with badge guide

### 14 Badge Milestones
| Days | Name | Color |
|------|------|-------|
| 0 | Seedling | Gray |
| 1 | Sprout | Green |
| 7 | Sapling | Teal |
| 21 | Young Tree | Blue |
| 30 | Sturdy Tree | Purple |
| 60 | Iron Will | Gold |
| 90 | Unshaken | Red |
| 150 | Fortress | Indigo |
| 240 | Ascended | Violet |
| 365 | Legendary | Rainbow |
| 500 | Divine | White-gold |
| 750 | Eternal | Celestial |
| 1000 | Immortal | Cosmic |
| 3000 | Transcendent | Radiant |
| 5000 | Ultimate | Prismatic |

### 14 Preset Habits
Pornography, Masturbation, Smoking, Vaping, Alcohol, Drugs, Gambling, Lying, Gossip, Anger, Procrastination, Overeating, Caffeine, Social Media Addiction

### Internal Logic
- Streak = full days since `startDate` (floor of time diff)
- Live counter updates every 500ms (days/hours/minutes/seconds)
- Quote rotation every 30 seconds (deterministic, seeded by habit ID)
- Badge advancement: auto-detected on counter tick → toast notification
- Relapse: records event with reason, resets `startDate` to now, saves previous state for undo
- Longest streak auto-tracked
- Combined spirit score = sum of all habits' current streaks

### Validation
- Habit label required (non-empty after trim)
- Double-forge guard (400ms debounce)
- Relapse reason: HTML-escaped, defaults to "No reason provided"

### Animations
- Live timer: updates every 500ms
- Spirit bars: width transitions
- Quote fade: opacity crossfade every 30s
- Breathing exercise: orb scale animation (8s/16s/20s phases)
- Badge progress: animated fills
- Card entrance: `anim-fade-in` + `anim-scale-up`

### Edge Cases
- Future start date: returns zeros
- Missing fields auto-migrated on load
- Emoji icons auto-upgraded to SVGs
- Custom color outside palette dynamically injected

## 4.7 Islamic Finance Tracker

### Feature Name
Halal Finance Manager

### Purpose
Track income, expenses, and savings with 220+ categorized halal expense categories, savings vaults, dual-currency support (USD/BDT), and Chart.js visualizations.

### Where Users Access It
Sidebar / Bottom nav → "Islamic Finance" section

### User Interaction Flow
1. **Overview**: Month selector, summary card (balance, income, expenses)
2. **Quick Add**: "Deposit" (income) and "Spend" (expense) buttons
3. **Chart**: Daily or monthly spending chart (Chart.js line chart)
4. **Activity list**: Recent transactions grouped by date
5. **Savings vaults**: Goal-based savings with progress bars
6. **Full history**: Searchable/filterable transaction log
7. **Settings**: Exchange rate display, clear/export options

### 220+ Categories (13 Sections)
Finance, Food & Dining, Transportation, Housing & Utilities, Healthcare, Education, Family & Personal, Entertainment, Shopping, Charity & Religious (Zakat/Sadaqah), Business & Professional, Travel, Other

Each category has: `id`, `name`, `icon` (emoji), `color` (hex), `section`.

### Currency System
- All amounts stored in **USD** (base currency)
- Display toggle: USD or BDT (Bangladeshi Taka)
- Live exchange rate fetched from `open.er-api.com` (polled every 60s)
- Rate cached in localStorage as fallback

### Vault System
- Create named savings goals with target amount
- Deposit money into vaults (deducted from available balance)
- Vault deposits recorded as expenses (type "transfer")
- Auto-completion detection when saved >= target
- Smart icon selection based on vault name (phone, laptop, car, hajj, etc.)

### Business Logic
- Balance = total(income) - total(expenses)
- Monthly trend compares current month vs previous month
- Opening/closing balance: cumulative all-time
- Insufficient funds: blocks expense/vault deposit
- Vault deposit capped by remaining target
- Currency toggle re-renders all monetary values
- Card number: auto-generated 16-digit "LAMIM XXXX XXXX XXXX XXXX"

### Data Structures
- **Expense**: `{ id, description, amount (USD), category, date, vaultId? }`
- **Income**: `{ id, description, amount (USD), date }`
- **Vault**: `{ id, name, target (USD), saved (USD) }`

### External Dependencies
- Chart.js (loaded dynamically from CDN)
- `open.er-api.com` (exchange rate, 10s abort timeout)

### Validation
- Expense amount must be > 0
- Income must have source description and positive amount
- Cannot exceed balance for expenses/vault deposits
- Future months cannot be navigated to
- Vault name required, target must be positive

### Edge Cases
- Empty month: shows "No records for this month"
- Overdrawn balance: shows "Overdrawn" label
- 8+ transactions: shows "View History" button
- 4+ vaults: shows "Manage Vaults" button
- Completed vault: shows "Achieved" badge
- Vault delete also removes associated transfers
- Chart.js unavailable offline: handles gracefully

## 4.8 Gym Tracker

### Feature Name
Gym & Diet Tracker (Performance OS)

### Purpose
Log workouts, track sleep, monitor diet/nutrition, log water intake, compute readiness score, and track body metrics. All in an Islamic lifestyle context.

### Where Users Access It
Sidebar / Bottom nav → "Gym Tracker" section

### User Interaction Flow
1. "PERFORMANCE OS" hero with motivational copy and quick-links
2. **Workout Logger**: Exercise name, sets/reps/weight inputs, log button
3. Exercise list with PR detection, delete per exercise
4. **Diet & Nutrition**: Meal list, "Add Meal" button with type selector
5. **Sleep & Recovery**: Bedtime/Wake sliders (range inputs), quality pills (Restless/Light/Deep)
6. Sleep stats: duration, recovery score, goal gap, bedtime display
7. **Hydration**: Water glass visualization, quick-add buttons (100ml/250ml/500ml/-250ml)
8. Body metrics: weight, body fat, 14-day trend chart
9. Readiness score: composite ring chart + 7-day sparkline

### Readiness Score Formula
`recovery * 0.40 + waterPct * 0.25 + nutritionPct * 0.20 + workoutScore * 0.15`

### Sleep Scoring
- Ideal duration: 7-9h (base 85 points)
- Quality modifier: Deep +15, Light +0, Restless -15
- Final score clamped 0-100

### Data Storage
- **Gym data**: `{ exercises[], sleep{ time, quality }, diet{ meals[], macros }, water{ amount, goal } }`
- **Body metrics**: `{ entries[{ date, weight, bodyFat }] }` (max 90 entries)
- **Personal Records (PRs)**: Auto-detected when weight exceeds previous max per exercise

### Validation
- Exercise name required
- Sets/reps default to 3/10 if empty
- Meal description required

### Edge Cases
- Empty exercise list shows SVG empty state
- Sleep not logged: shows "PENDING" badge
- Body metrics empty: shows "Log your weight to see the trend"
- PR detection: `isPR` badge on new records

## 4.9 Career Builder

### Feature Name
Study & Career Progress Tracker (Career OS)

### Purpose
Track daily study sessions, checklist goals, skill progress across categories, with timer, heatmap, achievements, and multi-level charts.

### Where Users Access It
Sidebar / Bottom nav → "Career Builder" section

### User Interaction Flow
1. "CAREER OS" hero with focus score ring + 7-day sparkline
2. **Daily Goals**: Checklist with add/toggle/delete, suggested goals chips
3. **Study Log**: Focus topic input, category chips, duration, notes, timer (start/stop/log)
4. **Progress**: Weekly/Monthly/Yearly tabs with bar charts
5. **Skills**: Category bars showing hours (Novice → Practitioner → Specialist → Expert)
6. **Heatmap**: 16-week (112-day) activity heatmap, clickable cells to jump to date
7. **Achievements**: Unlockable badges (First Session, 7-Day Streak, 10h Club, 50h Expert)

### Focus Score Formula
`min(100, studyMinutes/120) * 0.60 + goalCompletionPct * 0.40`

### Skill Ranking
| Hours | Rank |
|-------|------|
| < 5h | Novice |
| 5-15h | Practitioner |
| 15-50h | Specialist |
| 50h+ | Expert |

### 5 Categories
Coding, Reading, Language, Business, General (each with custom icon and label translation)

### Study Timer
- Start/Stop with elapsed display (HH:MM:SS)
- Accumulates across sessions (capped at 24h per session)
- RequestAnimationFrame-based display (updates every 250ms)
- Timer state persisted in DB

### Achievements (4)
| Key | Label | Threshold |
|-----|-------|-----------|
| firstSession | First Session | > 0 min studied |
| streak7 | 7-Day Streak | 7 consecutive days |
| hours10 | 10h Club | 600 total minutes |
| hours50 | 50h Expert | 3000 total minutes |

### Validation
- Checklist text: non-empty, max 120 chars, case-insensitive duplicate check
- Study topic required for save
- Future date navigation blocked

### Edge Cases
- Empty checklist: SVG empty state
- Legacy checklist migration: string → object format
- Zero study time days: empty heatmap cells
- `_migrateChecklist()` handles undefined/null items
- Timer shows `--:--` when zero elapsed

## 4.10 Spiritual Analysis

### Feature Name
Spiritual Health Score (SHS) Dashboard

### Purpose
Compute and visualize a composite spirituality score (0-100) from 5 dimensions: Salah, Nafl, Dhikr, Mujahid (habit struggle), and Consistency. 7-tier ranking system.

### Where Users Access It
Sidebar / Bottom nav → "Analysis" section

### User Interaction Flow
1. Month selector (backward only)
2. Main score display (large aura ring with gradient)
3. Rating badge with description
4. Radar chart (5-axis SVG): Salah, Nafl, Dhikr, Mujahid, Spirit
5. Weekly trend bar chart (clickable bars to select dates)
6. 5 breakdown cards with scores and progress bars
7. PDF export button for monthly report

### SHS Scoring Formula

| Dimension | Max Points | Calculation |
|-----------|-----------|-------------|
| Salah | 50 | `salahScore.pct * 50` (from Utils.salahScore) |
| Nafl | 15 | Sunnah rakat (capped 12, 8pts) + Tahajjud active (4pts) + Witr done (3pts) |
| Dhikr | 15 | `min(15, totalDhikr/2100 * 15)`; Level: `min(7, floor(totalDhikr/300))` |
| Mujahid | 10 | Successful habits / active habits for that date |
| Consistency | 10 | Step function: >=90 total → 10, >=80 → 8, >=70 → 6, etc. |

**Total**: `min(100, rawTotal + consistencyBonus)`

### 7 Ranking Tiers
| Score | Rank | Color | Description |
|-------|------|-------|-------------|
| >= 90 | Muhsin (مُحْسِن) | Gold | Excellence in worship |
| >= 80 | Muttaqi (مُتَّقِي) | Purple | God-consciousness |
| >= 65 | Mukhlis (مُخْلِص) | Green | Sincere devotion |
| >= 50 | Mujahid (مُجَاهِد) | Blue | Striving |
| >= 30 | Murid (مُرِيد) | Amber | Willing |
| >= 15 | Musafir (مُسَافِر) | Red | Traveler |
| < 15 | Ghafil (غَافِل) | Red | Heedless |

### Radar Chart
- 5-axis SVG polygon with concentric grid rings
- Gradient fill with pulsing opacity animation
- Vertex circles with staggered pulse
- Axis labels with drop-shadow glow

### Validation
- Score components clamped to max values
- Safe division (guarded by `if (activeHabitsForDay > 0)`)
- Month navigation cannot go forward

### Edge Cases
- No habits: Mujahid score = 0
- Empty month: defaults to today
- Inactive bars (<10 score): rendered at minimum height
- PDF handles months with no data

## 4.11 Profile & Settings

### Feature Name
User Profile & App Settings

### Purpose
View/edit profile, configure all app settings, manage data (import/export), theme toggle, language selection, danger zone (logout, delete, factory reset).

### Where Users Access It
Sidebar / Bottom nav → "Profile" section

### Settings Groups
1. **Personal Information**: Name, Gender, Bio, Date of Birth
2. **Prayer Settings**: Jumu'ah mode toggle, Notification toggle
3. **App Settings**: Language (EN/BN), Currency (USD/BDT), Theme (Dark/Light), Location
4. **About**: App version, changelog, device info
5. **Danger Zone**: Logout (keep data), Delete Account, Factory Reset

### Theme Toggle
- Light/Dark with CSS custom property swap
- 320ms transition animation on toggle
- Persisted in settings

### Language (Bilingual)
- English / Bengali (Bangla) full support
- 342 translation entries in `lang.js`
- Auto-translator MutationObserver for dynamic content
- Bengali numeral translation (e.g., ১২৩ instead of 123)
- Translation function: `window.t('key')` for JS, `data-i18n` attribute for HTML
- Number localization: `window.n(123)` returns Bengali numerals

### Avatar Management
- Upload image (max 10MB, image/*)
- Client-side compression: Canvas resize to 320px, JPEG 0.8 quality
- Stored as data URL in IndexedDB
- Fallback: generated initials

### Data Management
- **Export**: All `lamim_*` keys → JSON download (`lamim_backup_YYYY-MM-DD.json`)
- **Import**: File upload → parse → write to DB
- **Factory Reset**: Clears DB, unregisters SW, deletes caches, reloads
- **Delete Account**: Removes user data only (preserves other data)

### Version Modal
- App version: "4.0.0", Codename: "Sovereign"
- Changelog for last 3 releases
- Device info: created date, data entries count, storage, distribution (PWA vs installed)

### Validation
- Name: 2-50 chars
- Bio: max 150 chars
- DOB: valid date, not future, max 120 years ago
- Avatar: image type, max 10MB

## 4.12 Prayer Notifications

### Feature Name
Offline Prayer Time Notifications

### Purpose
Send browser/system notifications when each prayer time arrives. Works fully offline (prayer times calculated client-side).

### Where Users Access It
Enabled via Profile → Prayer Settings → Prayer Notifications toggle

### Internal Logic
1. Checks `Notification.permission === 'granted'` (requests permission on toggle)
2. 30-second polling interval checking prayer times
3. 30-minute catch-up window for backgrounded tabs
4. Deduplication: in-memory + localStorage `lamim_notified`
5. Daily reset: cleared on new local date (3AM offset)
6. Service Worker API preferred (background notification support)
7. Fallback to `new Notification()` if SW not ready

### Notification Content
- Prayer emoji (e.g., 🌅 for Fajr)
- Prayer name in selected language
- Dua: "Come to prayer, come to success."
- Vibration pattern: `[200, 100, 200, 100, 200]`
- `requireInteraction: true` (notification persists until dismissed)

### Edge Cases
- New local day: all sent notifications cleared
- Permission denied: toggle shows blocked message
- Backgrounded >30min: prayers in that window caught up
- Service Worker not ready: falls back to standard Notification API
- localStorage disabled: in-memory deduplication still works

---

# 5. PAGE-BY-PAGE DOCUMENTATION

## 5.1 Splash Screen

### Route
Appears on app startup (no route — it's the boot screen).

### Purpose
Brand intro while IndexedDB initializes. Shows animated logo, app name, tagline, and loading bar.

### Duration
1.8 seconds minimum, 8-second safety fallback.

### Sections
1. Aurora background (3 animated gradient blobs)
2. Floating particles (8 particles with randomized CSS custom properties)
3. Logo icon (SVG crescent + star with glow filter + spinning rings)
4. App name ("Lamim" in bold)
5. Tagline ("Your Islamic Lifestyle Companion")
6. Loading bar (gradient fill animation)

### Business Logic
- If DB init completes: hide splash → show dashboard (if user exists) or setup (if new)
- Safety fallback at 8s forces navigation regardless of DB state

### Animations
- Logo: scale-up, rotate-in with bounce
- Loading bar: progress fill animation
- Aurora blobs: slow-rotating gradient shapes
- Particles: random float-up with varying speeds/sizes

## 5.2 Installation Banner

### Route
Appears on top of dashboard when PWA installation is available.

### Purpose
Prompt users to install the PWA to their home screen.

### Sections
1. App icon (192x192)
2. Title: "Install Lamim"
3. Subtitle: "Add to your home screen for quick, offline access"
4. Install button (triggers `beforeinstallprompt`)
5. Dismiss button (hides banner for session)

### Business Logic
- Listens for `beforeinstallprompt` event
- Stores deferred prompt, shows banner
- Install click: triggers `prompt()`, hides on choice
- Dismiss: hides banner permanently for session

## 5.3 Onboarding/Setup Page

### Route
`page-setup` — shown on first launch only.

### Layout
Full-screen centered card with animated background.

### 4 Steps (Sections)
**Step 1 — Name**: Hand icon, title, name input (2-50 chars), Continue button
**Step 2 — Gender**: Two gender cards (Male/Female) with SVGs, Back/Continue
**Step 3 — DOB**: Custom drum picker (3 columns), Back/Continue
**Step 4 — Location**: GPS detect button with radar animation, lat/lng inputs, Back/"Start Journey"

## 5.4 Dashboard — Home

### Route
`section-home` — default section after login.

### Layout
Bento grid layout inside `.home-container`. Aurora background behind.

### Sections/Bento Items
1. **Hero Card** (full width): Greeting, date, Hijri date, spirit orb (tappable → Analysis)
2. **Next Prayer Card** (full width): Prayer name, time, countdown (updates every second)
3. **Dhikr Insight** (half): Today's total dhikr count
4. **Streak Insight** (half): Current perfect streak
5. **Salah Timeline** (full): 5 prayer nodes with status colors
6. **Verse of the Day** (full): Quranic verse with Arabic + translation (rotates every minute)

## 5.5 Dashboard — Salah Tracker

### Route
`section-salah`

### Layout
Section header with title, reset button, date navigation. Followed by prayer times, stats, cards, calendar.

### Sections
1. Prayer times row (5 pills with time + next indicator)
2. Location notice (shown when using default Dhaka coordinates)
3. Stats row (prayed count, perfect streak, consistent streak, points, score)
4. 5 prayer cards (Fajr/Dhuhr/Asr/Maghrib/Isha) with status selectors
5. Monthly calendar heatmap with color legend
6. Calendar tooltip (shows per-prayer breakdown on hover/tap)

## 5.6 Dashboard — Dhikr Counter

### Route
`section-dhikr`

### Layout
Centered counter with surrounding controls.

### Sections
1. Hadith marquee (auto-scrolling)
2. Tap area: large button with count display + undo/reset side buttons
3. Bead visualization (33-bead grid)
4. Current dhikr info (name, meaning)
5. Horizontal preset row (10 presets + add custom)
6. Session log card (today's entries per preset)
7. History button (opens history modal)

## 5.7 Dashboard — Nafl Salah

### Route
`section-nafl`

### Layout
Full-width with sectioned cards.

### Sections
1. Hero banner (moon icon, progress bar, completion count)
2. Sunnah Mu'akkadah grid (5 cards)
3. Night Prayers: Tahajjud card + Witr card
4. History button (modal with 30-day summary)

## 5.8 Dashboard — Analysis

### Route
`section-analysis`

### Layout
Content dynamically rendered by Analysis module.

### Sections
1. Month selector
2. Score aura (large circle with gradient, animated)
3. Rating badge (rank name, color, description)
4. Radar chart (5-axis SVG)
5. Weekly trend bar chart (clickable)
6. 5 breakdown cards (Salah/Nafl/Dhikr/Mujahid/Spirit)

## 5.9 Dashboard — Gym Tracker

### Route
`section-gym`

### Layout
Custom gym-style layout with hero card and sections.

### Sections
1. Performance OS hero (motivational copy, quick-link buttons)
2. Workout Logger (exercise input, sets/reps/weight, exercise list, PR detection)
3. Diet & Nutrition (meal list, add meal modal with type selector)
4. Sleep & Recovery (bedtime/wake sliders, quality pills, sleep stats grid)
5. Hydration (water glass visualization, quick-add buttons)
6. Body metrics (weight, body fat, 14-day trend chart)

## 5.10 Dashboard — Career Builder

### Route
`section-career`

### Layout
Career OS layout with cards.

### Sections
1. Career OS hero (focus score ring + sparkline)
2. Daily Goals checklist (add/toggle/delete, suggested goals)
3. Study Log (topic, category chips, duration, notes, timer)
4. Progress tabs (Weekly/Monthly/Yearly bar charts)
5. Skill Progress (category hours bars with rankings)
6. 16-week Heatmap (clickable cells)
7. Achievements (unlocked/locked badges)

## 5.11 Dashboard — Mujahid

### Route
`section-mujahid`

### Layout
Section with habit cards list.

### Sections
1. Warrior Spirit Score card (total clean days + spirit bars)
2. Habit cards list (each with timer, badge, relapse button)
3. Empty state ("Forge of Resolve" hero)
4. Breathing exercise (full-screen modal)

## 5.12 Dashboard — Finance

### Route
`section-finance`

### Layout
Custom finance layout with sections.

### Sections
1. Month selector + currency toggle (USD/BDT)
2. Summary card (balance, income, expenses, card number)
3. Quick-add buttons (Deposit / Spend)
4. Spending chart (Chart.js line chart, daily/monthly toggle)
5. Activity list (grouped by date)
6. Savings vaults (goal cards with progress bars)
7. Zakat hub (coming soon)

## 5.13 Dashboard — Profile

### Route
`section-profile`

### Layout
Settings-group layout.

### Sections
1. Profile hero (avatar, name, bio, gender, join date, stat badges)
2. Personal Information (name, gender, bio, DOB)
3. Prayer Settings (Jumu'ah mode, notifications)
4. App Settings (language, currency, location, theme)
5. About (version, changelog, device info)
6. Danger Zone (logout, delete account, factory reset)

## 5.14 Modals (Global)

### Toast Container
Fixed top-right, `--z-toast`. Auto-dismisses with slide animation. Types: success, error, info, warning.

### Confirmation Modal
Centered card with icon, title, message, Cancel/Proceed buttons. Dismisses on overlay click.

### Danger Confirmation Modal
Themed red variant of confirmation for destructive actions (logout, delete, reset). Dynamic color theming.

### Profile Edit Modal
Single-input modal for editing profile fields. Character counter for name/bio. Keyboard: Enter to save, Escape to cancel.

### Version/About Modal
App info with version ("4.0.0 Sovereign"), changelog, device details. "Done" button.

### Section Settings Modal
Generic modal for section-specific settings/reset confirmations. Dynamic icon/color theming.

---

# 6. SECTION-BY-SECTION DOCUMENTATION

This section documents all reusable section patterns across the 13 dashboard panels, modals, splash screen, and setup wizard.

## 6.1 Section Header Pattern

Every dashboard section has a consistent header:

```html
<div class="section-header">
  <h2 class="section-title">
    <span class="icon"><!-- SVG icon with accent color --></span>
    Section Name
  </h2>
  <div class="flex gap-2">
    <!-- Action buttons: reset, settings, history -->
  </div>
</div>
```

- **Glass background**: `--color-surface-card` with `backdrop-filter: blur(20px)`
- **Border radius**: 20px
- **Title**: gradient brand text with shimmer animation
- **Icon**: 28px with accent color (gold for salah, teal for dhikr, purple for nafl, etc.)

## 6.2 Bento Card Pattern (Home)

```html
<div class="bento-item bento-full glass-card">
  <!-- Content -->
</div>
```

- **Glass effect**: `rgba(12, 19, 34, 0.45)` background, `backdrop-filter: blur(16px)`
- **Border**: `1px solid rgba(255,255,255,0.06)`
- **Border radius**: 24px (`--radius-xl`)
- **Hover**: border becomes purple, shadow increases
- **Variants**: `bento-full` (full width), `bento-half` (50%), `bento-row` (flex container)

## 6.3 Stat Card Pattern

```html
<div class="insight-box-modern">
  <span class="insight-icon"><!-- SVG --></span>
  <div class="insight-data">
    <span class="insight-value cinematic-num">0</span>
    <span class="insight-label">Label</span>
  </div>
</div>
```

- **Icon**: colored circle background (10% opacity of accent color)
- **Value**: `--text-4xl`, `--fw-extrabold`, `cinematic-num` class
- **Label**: `--text-sm`, muted text
- **Hover**: lift + glow shadow

## 6.4 Prayer Card Pattern (Salah Tracker)

- Prayer name + time at top
- Status selector: 4 buttons (Jama'at/Alone/Qaza/Missed) with icons + point values
- Selected state: lock icon, status color, points badge
- Future date: locked placeholder with 50% opacity
- Gradient background per prayer: Fajr (orange), Dhuhr (gold), Asr (blue), Maghrib (purple), Isha (indigo)

## 6.5 Habit Card Pattern (Mujahid)

- Quote area (rotating motivational quote with CSS effects)
- Top actions: history button, delete button
- Habit label pill (accent color)
- Badge display (current milestone emoji + name)
- Live timer: X days, HH:MM:SS (updates every 500ms)
- Spirit bar with progress percentage
- Relapse button (red, with confirmation)
- Mini badge progression row

## 6.6 Glass Card Pattern (Modal)

```css
.glass-card {
  background: var(--color-surface-card);
  border: 1px solid var(--color-border);
  border-radius: var(--card-radius, 24px);
  backdrop-filter: blur(16px) saturate(140%);
  transition: border-color var(--transition-base), box-shadow var(--transition-base);
}
```

## 6.7 Bottom Navigation Pattern

- Fixed at bottom (12px + safe area)
- Border radius: 20px
- Glass background: `rgba(6,11,19,0.65)` with `backdrop-filter: blur(14px)`
- 10 items: Home, Salah, Dhikr, Nafl, Mujahid, Finance, Analysis, Gym, Career, Profile
- Each item has unique active color with glow shadow
- Only visible on mobile (<=1024px)

## 6.8 Sidebar Pattern

- Fixed left, full height, 260px wide
- Glass background with `blur(16px) saturate(140%)`
- Logo at top (icon + text)
- 9 nav items with staggered slide-in animation
- Active item: purple left border + tinted background
- Logout at bottom
- Collapses off-screen on mobile (<=1024px), `.open` toggles with overlay
- Close on overlay click or navigation

## 6.9 Goal Card Pattern (Nafl / Goals)

```html
<div class="goal-card ${completed ? 'completed' : ''}">
  <div class="goal-header">
    <span class="goal-title">Goal Name</span>
    <span class="goal-category">Category</span>
  </div>
  <div class="goal-progress-wrap">
    <div class="goal-progress-bar" style="width: X%"></div>
  </div>
  <div class="goal-footer">
    <span class="goal-deadline">Deadline</span>
    <span class="priority-dot priority-high"></span>
  </div>
</div>
```

- **Glass background**: `--color-surface-card` with `backdrop-filter: blur(16px)`
- **Border radius**: 16px (`--radius-lg`)
- **Hover**: lift + purple glow
- **Completed**: green border + tinted background
- **Priority indicator**: colored dot (high/medium/low)
- **Used in**: `#section-goals`, `#section-nafl`

## 6.10 Career Builder (CB) Card Pattern

```html
<div class="cb-card">
  <div class="cb-card-head">
    <span class="cb-card-title-ico"><!-- SVG --></span>
    <h3 class="cb-card-title">Card Title</h3>
  </div>
  <!-- Content -->
</div>
```

- **Hero card** (`.cb-hero-card`): Gradient background with animated ring/score, glow effects
- **Content card** (`.cb-card`): Indigo accent top-border gradient, `cbRise` entrance animation
- **Stat tiles** (`.cb-stat-tile`): Four metrics in a horizontal strip
- **Design tokens**: `--cb-primary` (indigo), `--cb-accent` (purple)
- **Used in**: `#section-career`

## 6.11 Gym (GH) Card Pattern

```html
<div class="gh-card">
  <div class="gh-card-head">
    <span class="gh-card-title-ico"><!-- SVG --></span>
    <h3 class="gh-card-title">Card Title</h3>
  </div>
  <!-- Content -->
</div>
```

- **Hero card** (`.gh-hero-card`): Cyan/lime glassmorphism with backdrop blur and hover lift
- **Content card** (`.gh-card`): Cyan border glow on hover, colored title icons per module (workout/sleep/water/body/diet)
- **Stat tiles** (`.gh-stat-tile-new`): 2-column grid with icon badges
- **Design tokens**: `--gh-*` (cyan/teal palette), `ghRise` entrance animation
- **Used in**: `#section-gym`

## 6.12 Finance Card Pattern

```html
<div class="finance-premium-card">
  <!-- Content -->
</div>
```

- **Premium card** (`.finance-premium-card`): Clean border-based surface (no glow), subtle glass effect
- **Balance card** (`.card-main-balance`): Dark premium header with balance amount + trend indicator
- **Stat cards** (`.fin-stat-card`): Income/expense in 2-column row with colored icons
- **Vault cards** (`.vault-card`): Savings goals with circular progress and target label
- **Action grid** (`.fin-action-grid`): 2-column quick-action buttons (Deposit/Spend)
- **Used in**: `#section-finance`

## 6.13 Analysis Card Pattern

```html
<div class="analysis-card">
  <div class="analysis-card-header">
    <h3 class="analysis-card-title">Metric</h3>
    <span class="analysis-card-meta">Details</span>
  </div>
  <!-- Chart or content -->
</div>
```

- **Analysis card** (`.analysis-card`): Large glassmorphic card in 2-column grid for charts and data
- **Stat pills** (`.analysis-stat-pill`): Key metrics in 3-column row with uppercase labels, ± color coding
- **Tabs** (`.analysis-tab`): Timeframe switching (weekly/monthly)
- **Premium variant**: `.analysis-card-p` with enhanced visual style in hub view
- **Used in**: `#section-analysis`

## 6.14 Settings Group Pattern (Profile)

```html
<div class="settings-group">
  <!-- Section title -->
  <div class="settings-item" role="button" tabindex="0">
    <div class="settings-item-left">
      <span class="settings-item-icon"><!-- SVG --></span>
      <span class="settings-item-label">Setting Name</span>
    </div>
    <div class="settings-item-right">
      <span class="settings-item-value">Value</span>
      <svg><!-- chevron --></svg>
    </div>
  </div>
</div>
```

- **Settings group**: Glassmorphic container with titled sections
- **Settings items**: Clickable rows with icon, label, right-chevron/value
- **Selection cards**: `.pref-card` (language), `.curr-card` (currency), `.gender-card` — all use checkmark indicator
- **Bio preset chips** (`.bio-preset-chip`): Quick-select chips for bio field
- **Used in**: `#section-profile`, Setup Wizard (`#page-setup`)

---

# 7. COMPONENT DOCUMENTATION

## 7.1 Button System

### Button Variants
| Class | Background | Text | Border | Usage |
|-------|-----------|------|--------|-------|
| `.btn` | Transparent | Var text | — | Base class |
| `.btn-primary` | Purple gradient | White | — | Primary CTA |
| `.btn-secondary` | Surface nested | Var text | Yes | Secondary action |
| `.btn-ghost` | Transparent | Secondary | — | Subtle action |
| `.btn-gold` | Gold gradient | Dark text | — | Premium CTA |
| `.btn-danger` | Red tint | Red text | Yes | Destructive |
| `.btn-sm` | Smaller padding | Smaller text | — | Compact |
| `.btn-icon` | 40x40px | Icon | — | Icon-only |
| `.btn-full` | Width 100% | — | — | Full width |

### Button States
- **Default**: Gradient/surface bg
- **Hover**: Slight brightness increase, `translateY(-2px)` lift
- **Active**: `scale(0.97)` press
- **Disabled**: `opacity: 0.5`, no pointer events
- **Loading**: `.btn-loading` class (spinner + text hidden)

## 7.2 Input System

### Input Variants
| Class | Usage |
|-------|-------|
| `.input` | Default text/number input |
| `.premium-input` | Elevated input with glow |
| `.input-group` | Wrapper with label + input + error |
| `.input-label` | 13px label text |
| `.input-error` | Red border + red focus ring |
| `.input-icon` | Absolute-positioned icon inside input |

### Input States
- **Default**: `--color-bg-secondary` bg, `1px` border
- **Focus**: `--color-accent-primary` border, `3px` purple focus ring
- **Error**: Red border, red ring, `.field-error` message below
- **Disabled**: `opacity: 0.5`
- **Readonly**: Normal appearance, no interaction

## 7.3 Card System

### Card Variants
| Class | Usage |
|-------|-------|
| `.card` | Default glass card |
| `.card-glass` | Stronger glass (blur 24px) |
| `.glass-card` | Full glassmorphism card |
| `.gh-card` | Gym/Career style card |
| `.cb-card` | Career builder card |
| `.gh-hero-card` | Gym/Career hero card |

### Card Sub-elements
- `.card-header`: Flex row, title + actions
- `.card-title`: `--text-lg`, bold
- `.card-body`: Content area
- `.card-footer`: Bottom actions

## 7.4 Badge System

### Badge Variants
| Class | Color |
|-------|-------|
| `.badge-purple` | Purple |
| `.badge-gold` | Gold |
| `.badge-green` | Green |
| `.badge-red` | Red |
| `.badge-blue` | Blue |
| `.gh-badge` | Gym (dynamic color) |

### Badge States
- **Active**: Full color
- **Pending**: Amber outline
- **Completed**: Green solid
- **Locked**: Gray outline

## 7.5 Toggle Switch

- 48x26px track, rounded
- 18x18px sliding thumb
- Active state: purple track
- CSS transition on thumb position
- Used for: Theme, Notifications, Jumu'ah mode, Language, Currency

## 7.6 Progress Bar

- 8px height, rounded
- `--color-bg-tertiary` track
- Gradient fill (purple → blue typically)
- Width transition: 0.8s cubic-bezier
- Used in: SHS breakdown, vault savings, habit spirit bars, readiness score

## 7.7 Toast Notification

- Fixed top-right stack
- Auto-dismiss 3s
- Types: success (green), error (red), info (blue), warning (amber)
- Slide-in/out animation (300ms)
- Icon + message layout
- `--z-toast`: 30000

## 7.8 Modal System

- `.modal-overlay`: fixed full-screen, dark overlay
- `.modal`: centered card with scale-in animation
- Header: title + close button (X)
- Body: content area
- Footer: action buttons
- Dismiss on overlay click (configurable)
- Focus trap when open (a11y)

## 7.9 Avatar

- 40px circle
- Image or generated initials fallback
- Hover: slight scale
- Click: navigate to profile
- Used in: Topbar (home + section)

## 7.10 Ring Chart (SVG)

- Custom SVG component (not Chart.js)
- `Charts.ring()`: renders ring
- `Charts.animateRing()`: animates to target
- Circular progress with gradient
- 1s cubic-bezier transition
- Used for: Readiness score, Focus score, SHS score

## 7.11 Sparkline (SVG)

- Mini line chart (SVG)
- Cubic bezier interpolation
- Responsive width
- Used for: 7-day trends (readiness, focus)

## 7.12 Line Chart (SVG)

- Basic line chart with gradient fill
- Last-point dot highlight
- Used for: Body weight trend, career progress

## 7.13 Drum Picker (Custom)

- 3 scrollable columns (day, month, year)
- CSS scroll-snap alignment
- Selection bar indicator
- Labels below each column
- Used in: Setup wizard step 3 (DOB)

## 7.14 Bead Display (Dhikr)

- 33-bead grid
- Lit/unlit state via CSS class
- Staggered entrance animation
- Overflow: count % 33 beads lit per loop

## 7.15 Quality Pill (Sleep)

- Toggle-style pill buttons
- States: restless, light, deep
- Active: filled with accent color
- Hover: slight scale
- Touch: 36px min height

## 7.16 Timer Display (Career/Mujahid)

- Live-updating time counter
- HH:MM:SS or DD:HH:MM format
- Updates via requestAnimationFrame or setInterval
- Used for: Study timer, habit streak timer

---

# 8. USER FLOW

## 8.1 First Visit Flow

```
App Launch → Splash Screen (1.8s) → No user found → Setup Wizard
  → Step 1: Enter name [validation: 2-50 chars]
  → Step 2: Select gender [validation: must select]
  → Step 3: Enter DOB (optional, drum picker) [validation: clamp to month max]
  → Step 4: Detect location (GPS → IP → manual) [validation: valid lat/lng]
  → "Start Journey" → User created → Dashboard (Home)
```

## 8.2 Returning User Flow

```
App Launch → Splash Screen (1.8s) → User found → Dashboard (Home)
  → Home Dashboard loads:
    - Greeting displayed with name
    - Prayer times calculated
    - Next prayer countdown starts
    - Spirit score displayed
    - Today's timeline rendered
    - Daily verse displayed
  [Background: DB cache loads, SW registered, location checked]
```

## 8.3 Daily Salah Tracking Flow

```
Navigate to Salah Tracker → View prayer times → Tap prayer card
  → Select status: Jama'at / Alone / Qaza / Missed
  → Card locks with result → Points awarded
  [If all 5 done: confetti + celebration toast]
  → Calendar updates with color coding
  → Streak recalculates
  → Spirit score refreshes (2s debounce)
```

## 8.4 Dhikr Session Flow

```
Navigate to Dhikr Counter → Select preset (or use current)
  → Tap large button (or press Space) → Count increments
  → Bead visualization updates → Haptic feedback (25ms vibrate)
  → Count saved to DB immediately
  → Session history updates in-place
  → Optional: View history modal for aggregated stats
```

## 8.5 Habit Forge (Mujahid) Flow

```
Navigate to Mujahid → "Initiate First Habit" (if empty)
  → Select from 14 presets OR type custom name
  → Pick icon + color → Set start date → "Forge Tracker"
  → Habit card appears with live timer
  → Daily: view progress, check badge status
  → If slip: tap "Relapse" → enter reason → confirm
  → Streak resets, relapse logged, undo available
  → Breathing exercise for calm/reflection
```

## 8.6 Finance Management Flow

```
Navigate to Finance → View monthly summary
  → "Deposit": enter amount + source → income logged
  → "Spend": enter amount + search/select category (220+) → expense logged
  → Balance updates automatically
  → Chart updates with new data
  → Vault: create savings goal → deposit regularly
  → Currency toggle: switch USD/BDT
  → Export: monthly PDF statement
```

## 8.7 Navigation / Decision Points

- **Home → Analysis**: Tap spirit orb
- **Home → Salah**: Tap salah timeline, or use bottom nav/sidebar
- **Salah → PDF export**: Tap export button in calendar header
- **Dhikr → History modal**: Tap history button in session log
- **Mujahid → Breathing**: Tap tools button → breathing exercise
- **Mujahid → Badge guide**: Tap tools button → badge guide
- **Finance → Category search**: Type in search field when adding expense
- **Finance → Full history**: Tap "View History" in activity list
- **Career → Date navigation**: Tap heatmap cell to jump to date
- **Career → Daily log**: Tap checklist item to toggle done

## 8.8 Error Recovery

- **IndexedDB failure**: Falls back to localStorage
- **GPS failure**: Falls back to IP geolocation → manual entry
- **Offline**: All features work (offline banner shown)
- **Service worker update**: Auto-refresh with cache clear
- **Network fetch failure**: Silent catch (app functions offline)
- **PDF popup blocked**: Error toast with guidance
- **Chart.js load failure**: Graceful fallback ("Chart unavailable offline")

## 8.9 Success Paths

- **All 5 salah logged**: Confetti 🎉 + toast "MashaAllah!"
- **Goal completed**: Confetti burst at click position
- **Habit forged**: Toast "Habit forged!" 
- **Relapse undone**: Toast with shield emoji
- **Day marked clean**: Toast with celebration
- **Badge earned (Mujahid)**: Toast with new badge name
- **Vault completed**: Toast with savings milestone
- **Data exported**: Download triggered
- **Theme toggled**: Smooth transition animation

## 8.10 Empty States

- **No salah data**: Empty cards with "Select a status" prompts
- **No dhikr today**: Empty session log with "Start dhikr to see entries here"
- **No habits (Mujahid)**: "Forge of Resolve" hero with "Initiate First Habit" CTA
- **No transactions (Finance)**: "No records for this month" + CTA to add
- **No vaults**: "Secure your future" empty state
- **No checklist items**: SVG icon + "Add your first goal"
- **No study logs**: Empty timer display
- **No gym exercises**: SVG icon + "No exercises logged today"
- **No body metrics**: "Log your weight to see the trend"

---

# 9. MARKETING KNOWLEDGE

## 9.1 Product Summary

**Lamim** is a premium offline-first Islamic lifestyle PWA that unifies salah tracking, dhikr counting, habit reformation, halal finance management, gym/diet tracking, career/study building, and spiritual health analysis into a single private dashboard — with zero cloud sync, no accounts, and complete privacy.

## 9.2 Elevator Pitch

> "Lamim is the only Islamic lifestyle app that works completely offline with zero cloud sync. Track your salah, dhikr, habits, finances, gym, and career — all in one beautiful, private dashboard. No accounts. No servers. No data leakage."

## 9.3 Short Description

All-in-one Islamic lifestyle tracker: Salah, Dhikr, Habits, Finance, Gym, Career. 100% offline. Zero cloud. Complete privacy. Beautiful glassmorphism design.

## 9.4 Long Description

Lamim is a comprehensive Islamic lifestyle companion that replaces 9 separate apps with one unified, offline-first experience. It tracks the 5 daily prayers with congregation status, voluntary prayers, dhikr with 10 presets, bad habits with a 5000-day badge system, halal finances with 220+ categories and savings vaults, gym workouts with sleep/diet/hydration tracking, and career/study goals with a Pomodoro timer and heatmap. The Spiritual Health Score (SHS) combines all dimensions into a single 0-100 score with 7 ranking tiers. Every feature works fully offline with zero data ever leaving the device. Built with vanilla JavaScript, IndexedDB, and a premium glassmorphism dark theme.

## 9.5 Hero Heading Ideas

- "Your Complete Islamic Lifestyle Dashboard"
- "Track Your Deen. Protect Your Privacy."
- "One App. Zero Cloud. Complete Peace of Mind."
- "The Islamic Companion That Respects Your Privacy"
- "Your Spiritual Journey, Beautifully Tracked"
- "9 Islamic Tools. 1 Dashboard. Zero Compromise."
- "Salah, Dhikr, Habits, Finance — All Offline, All Private."

## 9.6 Hero Subheading Ideas

- "Premium offline-first PWA for the modern Muslim"
- "No accounts. No servers. No data ever leaves you."
- "Track your spiritual, physical, and financial life — privately."
- "All your Islamic tracking needs in one beautiful, private dashboard."
- "Built for the privacy-conscious Muslim who demands quality."

## 9.7 Feature Highlights

- **Salah Tracker**: 5 daily prayers with congregation status, 3-week heatmap, streak tracking, PDF export
- **Dhikr Counter**: 10 presets, 33-bead visualization, haptic feedback, custom dhikr creation
- **Mujahid (Habit Forge)**: Quit bad habits with 14 milestones, 5000-day badges, live timer, breathing exercise
- **Islamic Finance**: 220+ halal categories, USD/BDT dual currency, savings vaults, Chart.js analytics
- **Spiritual Health Score**: Composite 0-100 score, 7 ranks, 5-dimension radar chart, monthly trend
- **Gym Tracker**: Workout logging, sleep tracking, diet/nutrition, hydration, readiness scoring
- **Career Builder**: Study timer, checklist goals, heatmap, achievements, skill progression
- **Nafl Tracker**: Sunnah, Tahajjud, Witr tracking with points system
- **Complete Privacy**: Offline-first, IndexedDB, zero cloud sync, no accounts

## 9.8 Benefit Highlights

| Feature | Benefit |
|---------|---------|
| 100% Offline | Works in airplane mode, no internet needed |
| Zero Cloud | No data ever leaves your device |
| No Account | Start using immediately, no signup |
| All-in-One | 9 tools in 1 app, not 9 separate apps |
| Premium Design | Beautiful glassmorphism dark theme |
| Bengali Support | Full Bengali UI + numeral translation |
| Prayer Times | Calculated locally, no API calls |
| PDF Export | Monthly reports for every module |
| Free | No cost, no in-app purchases |
| PWA | Install to home screen, works like native |

## 9.9 Value Propositions

1. **Privacy**: "Your spiritual data belongs to you. Always."
2. **Convenience**: "Everything in one place. Beautifully designed."
3. **Offline**: "Works in the mosque, on the subway, in airplane mode."
4. **Free**: "Premium quality, zero cost, no strings attached."
5. **Islamic**: "Built by Muslims, for Muslims, with authentic Islamic values."

## 9.10 Emotional Selling Points

- **Peace of mind**: Knowing your data never leaves your device
- **Spiritual motivation**: Watching your SHS grow over days and months
- **Pride**: Seeing your salah streak reach 30, 60, 100+ days
- **Hope**: Starting a habit forge journey and watching badges unlock
- **Control**: Managing your halal finances with beautiful clarity
- **Community**: "Crafted for the Ummah" — built for the global Muslim community

## 9.11 Trust Factors

- Open source (GitHub)
- Zero cloud infrastructure (no servers to hack)
- No account required (no email, no password)
- IndexedDB storage (standard browser database)
- 100% client-side code
- No tracking, no analytics, no cookies
- Service worker caching (privacy-preserving)
- Data export/import (user control)

## 9.12 Why Choose Us

- Only all-in-one Islamic lifestyle app with complete offline support
- Only Islamic app with zero cloud sync (not even optional)
- Most comprehensive finance tracker (220+ halal categories)
- Only app with composite Spiritual Health Score (SHS)
- Premium design quality unmatched in Islamic app space
- Full Bengali localization with numeral support
- No other app combines salah + dhikr + habits + finance + gym + career

## 9.13 FAQ Suggestions

1. **Is Lamim really free?** Yes, completely free with no ads, no in-app purchases.
2. **Does Lamim need internet?** No, it works fully offline. Prayer times are calculated on your device.
3. **Where is my data stored?** Only on your device, in IndexedDB. Nothing is uploaded anywhere.
4. **Can I lose my data?** You can export a JSON backup anytime. Service worker also caches assets.
5. **Is there a mobile app?** It's a PWA — install it to your home screen. Works like a native app.
6. **Does it have Arabic or Bengali?** Yes, full Bengali support. English is default.
7. **How accurate are prayer times?** Uses Muslim World League method, sun-angle calculation. Adjustable Hijri offset.
8. **Can I sync between devices?** No, by design. You can export/import your data manually.
9. **How is the Spiritual Health Score calculated?** Salah (50%) + Nafl (15%) + Dhikr (15%) + Mujahid (10%) + Consistency (10%).
10. **What are the 7 spiritual ranks?** Ghafil, Musafir, Murid, Mujahid, Mukhlis, Muttaqi, Muhsin.

## 9.14 CTA Suggestions

- "Start Your Journey"
- "Install Lamim — It's Free"
- "Launch the App"
- "Try Lamim Offline"
- "Begin Tracking Your Deen"
- "Add to Home Screen"
- "Get Lamim"
- "Start for Free"
- "Explore the Dashboard"
- "Take Control of Your Spirituality"

---

# 10. LANDING PAGE KNOWLEDGE

## 10.1 Current Landing Page Structure

The landing page at root `index.html` is a self-contained HTML file with inline CSS (no external dependencies). It features:

1. **Sticky Navbar**: Logo + 5 nav links (Features, Security, Demo, Testimonials, Install)
2. **Cinematic Hero**: Full-viewport splash with gradient text, badge cluster (Premium PWA, Zero Cloud, Privacy First), primary CTA "Install Now" + secondary "View Demo", stats grid (220+ Categories, 6 Modules, 100% Privacy, 0ms Read)
3. **Security & Privacy Section**: Privacy dashboard card + 3 benefit cards (Local-First, Zero Data Leakage, IndexedDB Engine)
4. **Feature Showcase**: 6 cards with progress bars (Salah 92%, Dhikr 88%, Finance 85%, SHS 95%, Privacy 100%)
5. **Interactive Demo**: Live-feel dashboard emulator (static HTML/CSS simulation)
6. **Testimonials**: 3 user quotes (UAE, Malaysia, UK)
7. **Install Section**: iOS (3 steps) + Android (3 steps) + "Launch Lamim" CTAs
8. **Footer**: Brand + Features + Technology + Company columns

## 10.2 Landing Page Design Tokens

Variables defined in the landing page CSS (matching app design system):
- Same color palette as app (dark mode)
- Same typography (Inter, Outfit, Amiri)
- Same spacing system (8px grid)
- Same glassmorphism pattern
- Same animation principle (transform/opacity only)
- Fluid responsive typography via `clamp()`

## 10.3 What Should Be Showcased (Priority Order)

1. **Salah Tracker** (primary feature, most used)
2. **Spiritual Health Score** (unique differentiator)
3. **Zero Cloud / Privacy** (key selling point)
4. **All-in-One Integration** (9 modules visualized)
5. **Offline-First** (works without internet)
6. **Premium Design** (glassmorphism, animations)
7. **Bengali Support** (large market differentiator)
8. **PDF Export** (professional reporting)
9. **Mujahid Habit Forge** (unique Islamic habit tracker)
10. **Islamic Finance** (220+ halal categories)

## 10.4 Recommended Storytelling Flow

1. **Hero**: Problem (fragmented Islamic apps) + Solution (all-in-one Lamim)
2. **Privacy First**: Address #1 concern immediately
3. **Feature Showcase**: What it does (detailed but scannable)
4. **Interactive Demo**: Prove it works (live simulation)
5. **Social Proof**: Trust (testimonials)
6. **Install**: Low-friction action

## 10.5 Animation Opportunities for Landing

- **Hero**: Animated aurora background, floating particles, gradient text shimmer
- **Feature cards**: Entrance on scroll (staggered), hover lift
- **Demo**: Pulsing "Live" indicator, animated prayer timeline
- **Stats**: Counting animation (0 → actual value)
- **Install**: Step indicators with progress animation
- **Scroll-triggered**: Fade-in/slide-up reveals using Intersection Observer

## 10.6 Interactive Demo Suggestions

- Live prayer time countdown
- Clickable dhikr counter
- Spirit score ring animation
- Month calendar navigation demo
- Finance chart sample interaction

## 10.7 Statistics to Highlight

- 9 integrated modules (biggest in market)
- 220+ finance categories
- 14 habit milestones (up to 5000 days)
- 6000+ Quran verses for daily inspiration
- 7 spiritual ranking tiers (Ghafil → Muhsin)
- 10 built-in dhikr presets
- 39 CSS files | 18 JS modules
- 100% offline capability
- 0 servers, 0 cloud costs

## 10.8 Testimonial Placeholders

Current testimonials cover:
- **Ahmed Y., UAE** (Engineer): Praises Salah heatmap + privacy
- **Fatima N., Malaysia** (Researcher): Mentions SHS, finance, offline
- **Omar K., UK** (Product Manager): Highlights design quality, privacy, 3AM rollover

---

# 11. IMPROVEMENT ANALYSIS

## 11.1 UX Problems

| Issue | Severity | Location | Suggested Fix |
|-------|----------|----------|---------------|
| No undo for salah status selection | Medium | Salah Tracker | Allow status change within 5 seconds with undo toast |
| Calendar tooltip persists on mobile | Medium | Salah Tracker | Auto-dismiss on scroll or tap outside |
| No confirmation on dhikr preset switch | Low | Dhikr Counter | Toast warning if count > 0 before switching |
| No "edit goal" for existing goals | Low | Goals (Nafl) | Inline edit toggle on goal cards |
| Finance category search not fuzzy | Medium | Finance | Implement substring/partial matching |
| Breathing exercise can't be paused | Low | Mujahid | Add pause/resume button |
| No bulk delete for transactions | Medium | Finance | Multi-select with batch delete |
| Study timer lacks lap/split feature | Low | Career | Add lap recording |
| No drag-to-reorder habits | Low | Mujahid | Implement drag-and-drop reordering |

## 11.2 UI Problems

| Issue | Severity | Location | Suggested Fix |
|-------|----------|----------|---------------|
| Some cards lack consistent spacing | Low | Multiple | Audit and standardize card padding |
| Bottom nav text truncates on small screens | Medium | Global | Use shorter labels or icons-only mode |
| Modal close buttons inconsistently positioned | Low | Multiple | Standardize close button position |
| Light mode contrast could be stronger | Medium | Global | Increase text contrast in light mode |
| Loading states missing on some sections | Low | Multiple | Add skeleton loading screens |
| Missing "scroll to top" FAB | Low | Global | Add floating scroll-to-top button |
| Prayer cards could show time remaining | Medium | Salah | Add countdown under each prayer time |

## 11.3 Code Smells

| Issue | Severity | Location | Suggested Fix |
|-------|----------|----------|---------------|
| Global namespace pollution (all modules are window.*) | Medium | All JS | Use ES modules or IIFE pattern |
| Inline event handlers in HTML (onclick attributes) | Medium | index.html | Use addEventListener with delegation |
| Duplicated SVG icons across HTML and JS | Low | Multiple | Centralize icon definitions |
| Hardcoded version strings in app.js + sw.js | Low | app.js, sw.js | Automate version bumping |
| Magic numbers in prayer time calculation | Low | utils.js | Extract constants with descriptive names |
| Long functions (>200 lines in finance.js) | Medium | finance.js | Break into smaller functions |
| Direct DOM manipulation mixed with business logic | Medium | All modules | Separate rendering from logic |
| No TypeScript or JSDoc types | Medium | All JS | Add JSDoc type annotations |

## 11.4 Missing Features

| Feature | Priority | Rationale |
|---------|----------|-----------|
| Ramadan-specific mode (fasting tracker, iftar times) | High | Core Islamic need |
| Qibla direction compass | High | Essential for prayer |
| Zakat calculator | Medium | Already partially planned (Zakat hub) |
| Community features (anonymous streaks?) | Low | Privacy-first, so optional only |
| Dark mode auto-schedule (sunset-based) | Low | User experience polish |
| Audio recitations (Quran, adhan) | Medium | Islamic app staple |
| Weekly email/data digest | Low | Would require server (against offline-first) |
| Sync between devices (encrypted, opt-in) | Low | User request, but design philosophy opposes |
| More languages (Urdu, Indonesian, Turkish) | Medium | Large Muslim populations |
| Wudu/gusl checklist | Low | Niche but appreciated |

## 11.5 Accessibility Issues

| Issue | Severity | Location | Suggested Fix |
|-------|----------|----------|---------------|
| Some icons lack aria-label | Medium | Multiple | Audit all icon-only buttons |
| Color-only indicators (prayer status) | Medium | Salah | Add text labels alongside colors |
| Focus indicators weak on some elements | Low | Global | Strengthen focus-visible outlines |
| Dynamic content updates not announced | Medium | Multiple | Add aria-live regions |
| Touch targets too small (<44px) in some places | Medium | Mobile | Increase min touch target size |
| Skip link may be hidden by other elements | Low | HTML | Ensure z-index stacking order |
| Some SVG icons miss role="img" | Low | Multiple | Add appropriate ARIA roles |

## 11.6 Performance Issues

| Issue | Severity | Location | Suggested Fix |
|-------|----------|----------|---------------|
| verses.json (3.6MB) loaded on every page | Medium | utils.js | Cache in IndexedDB, not just SW |
| All 39 CSS files loaded on first visit | Medium | index.html | Dynamic CSS loading per section |
| No image optimization (data URL avatars) | Low | profile.js | Consider IndexedDB blob storage |
| Chart.js full library loaded for one chart | Low | finance.js | Consider lighter alternative |
| Prayer times recalculated on every render | Low | Multiple | Improve caching strategy |
| Service worker caches all assets eagerly | Medium | sw.js | Consider lazy caching for large assets |

## 11.7 SEO Issues

| Issue | Severity | Location | Suggested Fix |
|-------|----------|----------|---------------|
| App pages not indexed (SPA, no SSR) | High | app/index.html | Add prerender or static fallback pages |
| No structured data for app features | Medium | app/index.html | Extend existing JSON-LD |
| No sitemap for app pages | Low | app/ | Add routes to sitemap.xml |
| Missing meta descriptions on section pages | Low | app/ | Dynamic meta via JS |
| No canonical URLs for section routes | Low | app/ | Add link rel=canonical |

## 11.8 Mobile Issues

| Issue | Severity | Location | Suggested Fix |
|-------|----------|----------|---------------|
| Some grids don't collapse on small screens | Low | Multiple | Audit all grid-breakpoint behavior |
| Dashboard sections don't swipe between | Medium | Global | Add swipe gesture navigation |
| Bottom nav items hard to tap on very small screens | Medium | Global | Reduce item count or use scrollable nav |
| No haptic feedback on Android (except dhikr) | Low | Multiple | Add vibrate on key interactions |
| iOS safe area not consistently applied | Low | Multiple | Audit env(safe-area-inset-*) usage |

## 11.9 Desktop Issues

| Issue | Severity | Location | Suggested Fix |
|-------|----------|----------|---------------|
| No keyboard shortcuts (except Space for dhikr) | Low | Global | Add keyboard nav (hjkl, / to search) |
| Window too wide shows sparse content | Low | CSS | Better max-width handling |
| No resize handling for sidebar | Low | CSS | Make sidebar collapsible on desktop |

## 11.10 Visual Improvements

| Improvement | Priority | Rationale |
|------------|----------|-----------|
| Micro-interactions on button clicks | Medium | Polish (ripple effect) |
| Page transitions between sections | Medium | Smoother navigation feel |
| Skeleton loading screens | Medium | Perceived performance |
| Animated illustrations (Lottie/Rive) | Low | Premium feel |
| Improved empty states with illustrations | Medium | Better UX than SVGs |
| Gradient border animations on cards | Low | Visual flair |
| Confetti on more achievements | Low | Celebration feedback |
| Reduced motion query for vestibular disorders | Medium | Accessibility |

## 11.11 Suggested Enhancements

| Enhancement | Effort | Impact | Priority |
|-------------|--------|--------|----------|
| Ramadan mode (fasting + iftar tracker) | Medium | High | High |
| Qibla compass (device orientation API) | Medium | High | High |
| Zakat calculator | Low | Medium | Medium |
| More languages (Urdu, Indonesian) | Medium | Medium | Medium |
| Undo for salah status | Low | Medium | Low |
| Swipe navigation between sections | Medium | Medium | Low |
| Quran browser (surah list + verse display) | High | High | Medium |
| Dark/light auto-schedule | Low | Low | Low |
| Data sync (encrypted, opt-in) | High | Medium | Low |
| Weekly summary widget | Low | Medium | Low |
| Prayer time widget for home screen | Medium | Medium | Medium |
| Apple Watch companion | High | Low | Future |
| Desktop PWA optimizations | Medium | Medium | Low |
| Year-in-review feature | Medium | High | Medium |

---

*Document generated from complete codebase analysis. Every detail in this document is derived directly from the source code, CSS, configuration, and assets of the Lamim application.*

*Last updated: July 2026*
