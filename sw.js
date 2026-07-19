const CACHE_NAME = 'lamim-v148';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Install: Cache core assets & skip waiting immediately
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: Cleanup ALL old caches & claim clients immediately
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((k) => k !== CACHE_NAME && caches.delete(k)));
    }).then(() => {
      // Notify ALL open tabs that a new version is active
      return self.clients.matchAll({ type: 'window' }).then(clients => {
        clients.forEach(client => client.postMessage({ type: 'SW_UPDATED', version: CACHE_NAME }));
      });
    })
  );
  self.clients.claim();
});

// Fetch: Smart Strategy
// - Navigation (HTML): Network-First (always get latest)
// - Assets (JS/CSS/etc): Stale-While-Revalidate (fast + auto-update)
self.addEventListener('fetch', (e) => {
  // Only handle HTTP/HTTPS requests (ignores chrome-extension://, data:, etc.)
  if (!e.request.url.startsWith('http')) return;

  // Skip external database, dynamic API, and Google API calls to prevent stale data
  const skipUrls = [
    'api.bigdatacloud.net',
    'ipapi.co',
    'open.er-api.com',
    'googleapis.com'
  ];
  if (skipUrls.some(url => e.request.url.includes(url))) return;

  // NAVIGATION REQUESTS (HTML pages) → Network-First
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request, { cache: 'no-cache' })
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, copy));
          return res;
        })
        .catch(() => caches.match(e.request).then((cached) => cached || caches.match('./index.html'))) // Fallback to cache or index.html if offline
    );
    return;
  }

  // LOCAL ASSETS (JS, CSS, images, verses.json) → CACHE-FIRST
  // Served instantly from cache on repeat launches. Assets carry a `?v=` cache-buster
  // in their URL, so new deploys automatically fetch fresh copies (cache miss on new URL).
  // verses.json (3.7 MB) is included here, so it is downloaded only ONCE, then instant.
  const isLocalAsset = e.request.url.startsWith(self.location.origin);
  if (isLocalAsset) {
    e.respondWith(
      caches.match(e.request).then((cached) => {
        if (cached) return cached;
        return fetch(e.request, { cache: 'no-cache' })
          .then((res) => {
            if (res && res.ok) {
              const copy = res.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(e.request, copy));
            }
            return res;
          })
          .catch(() => new Response('Offline – resource unavailable', { status: 503, statusText: 'Service Unavailable' }));
      })
    );
    return;
  }

  // EXTERNAL STATIC ASSETS (fonts, CDN icons, etc.) → Stale-While-Revalidate
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const networkFetch = fetch(e.request).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, copy));
        }
        return res;
      }).catch(() => new Response('Offline', { status: 503, statusText: 'Service Unavailable' }));

      return cached || networkFetch;
    })
  );
});
