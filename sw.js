const CACHE_NAME = 'lamim-v51';
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
  // Skip Supabase/external API calls
  if (e.request.url.includes('supabase.co')) return;
  if (e.request.url.includes('googleapis.com')) return;

  // NAVIGATION REQUESTS (HTML pages) → Network-First
  // This ensures users ALWAYS get the latest HTML on every visit
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, copy));
          return res;
        })
        .catch(() => caches.match(e.request)) // Fallback to cache if offline
    );
    return;
  }

  // ALL OTHER REQUESTS (JS, CSS, images) → Stale-While-Revalidate
  // Serve cached version instantly, fetch fresh copy in background
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const networkFetch = fetch(e.request).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, copy));
        }
        return res;
      }).catch(() => null);

      return cached || networkFetch;
    })
  );
});
