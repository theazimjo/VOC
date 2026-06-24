const STATIC_CACHE_NAME = 'voc-static-v2';
const DYNAMIC_CACHE_NAME = 'voc-dynamic-v2';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/icons.svg'
];

// Install event: cache static shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching app shell...');
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate event: clean up outdated caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== STATIC_CACHE_NAME && key !== DYNAMIC_CACHE_NAME) {
            console.log('[Service Worker] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event: caching strategies
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Skip non-GET requests, Firebase WebSocket, or external APIs (like Auth/DB sync)
  if (event.request.method !== 'GET' || 
      requestUrl.protocol === 'chrome-extension:' ||
      event.request.url.includes('firebaseio.com') ||
      event.request.url.includes('identitytoolkit.googleapis.com')) {
    return;
  }

  // Strategy for navigation requests (HTML pages) -> Network-first with HTML fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache the latest page index
          return caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
            cache.put('/', response.clone());
            return response;
          });
        })
        .catch(() => {
          // If offline, return the cached app shell index
          return caches.match('/').then((response) => {
            return response || caches.match('/index.html');
          });
        })
    );
    return;
  }

  // Strategy for local static assets (JS, CSS, images, SVGs) -> Cache-first
  const isLocalStatic = requestUrl.origin === self.location.origin && 
    (requestUrl.pathname.includes('/assets/') || 
     requestUrl.pathname.endsWith('.js') || 
     requestUrl.pathname.endsWith('.css') || 
     requestUrl.pathname.endsWith('.svg') || 
     requestUrl.pathname.endsWith('.png'));

  if (isLocalStatic) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          // Fetch in background to update cache (Stale-While-Revalidate)
          fetch(event.request).then((networkResponse) => {
            if (networkResponse.status === 200) {
              caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse);
              });
            }
          }).catch(() => {/* Ignore background fetch failures */});
          
          return cachedResponse;
        }

        return fetch(event.request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          return caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // Default: Network with Cache Fallback for other GET requests
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
