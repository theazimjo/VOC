// VOCABRY service worker: the app opens and works without a connection.
//
//   shell     index.html and the small start-up files are cached when the worker
//             installs; the build id (stamped in by the build) makes every deploy
//             a new worker.
//   all code  after the first sign-in the page asks for PRECACHE_ALL: every other
//             file of the build (every page, grammar levels, book texts, ...) is
//             downloaded in the background, once; hashed files are never fetched twice.
//   data      lives in IndexedDB (src/offline), not here.
//
// "/assets/*" files have a content hash in their name and never change, so they
// are served cache-first. Pages are network-first with a short timeout, so a bad
// connection falls back to the cached app instead of a blank wait.

const BUILD_ID = '__BUILD_ID__';
const SHELL_CACHE = `voc-shell-${BUILD_ID}`;
const ASSET_CACHE = 'voc-assets'; // survives deploys: hashed names never collide
const RUNTIME_CACHE = 'voc-runtime-v7';

const SHELL = ['/', '/index.html', '/manifest.json', '/favicon.png', '/favicon.svg', '/logo.png', '/icons.svg'];
const SHELL_MAX_BYTES = 200 * 1024; // start-up and page chunks up to this size are precached at install
const NAVIGATION_TIMEOUT_MS = 4000;
// Responses say 'Vary: Origin'; a page's own module/stylesheet request sends an Origin
// header the install-time fetch did not, which would make every cached file miss.
const MATCH = { ignoreVary: true };

async function readManifest() {
  try {
    const res = await fetch('/precache.json', { cache: 'no-store' });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

// A missing build file can come back as the app's index.html (single-page-app
// fallback). Keeping that under a .js name would break every later load.
const isRealAsset = (res) => res && res.status === 200 && !/text\/html/i.test(res.headers.get('content-type') || '');

async function addIfMissing(cache, url) {
  if (await cache.match(url)) return;
  try {
    const res = await fetch(url);
    if (isRealAsset(res)) await cache.put(url, res);
  } catch { /* offline right now: the next PRECACHE_ALL will try again */ }
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const shell = await caches.open(SHELL_CACHE);
    await Promise.all(SHELL.map((url) => shell.add(url).catch(() => {})));
    const manifest = await readManifest();
    if (manifest) {
      const assets = await caches.open(ASSET_CACHE);
      await Promise.all(manifest.files.filter((f) => f.size <= SHELL_MAX_BYTES).map((f) => addIfMissing(assets, f.url)));
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keep = new Set([SHELL_CACHE, ASSET_CACHE, RUNTIME_CACHE]);
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => !keep.has(k)).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

// The page asks for the rest of the build once someone is signed in and idle.
self.addEventListener('message', (event) => {
  if (event.data?.type !== 'PRECACHE_ALL') return;
  event.waitUntil((async () => {
    const manifest = await readManifest();
    if (!manifest) return;
    const assets = await caches.open(ASSET_CACHE);
    const wanted = new Set(manifest.files.map((f) => f.url));
    for (const file of manifest.files) {
      await addIfMissing(assets, file.url); // one at a time: do not fight the app for bandwidth
    }
    // drop files of older builds
    const cached = await assets.keys();
    await Promise.all(cached.filter((req) => !wanted.has(new URL(req.url).pathname)).map((req) => assets.delete(req)));
    const clients = await self.clients.matchAll();
    clients.forEach((c) => c.postMessage({ type: 'PRECACHE_DONE', id: manifest.id }));
  })());
});

const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

function networkFirstWithTimeout(request, fallbackKeys) {
  return new Promise((resolve) => {
    let settled = false;
    const fallback = async () => {
      for (const key of fallbackKeys) {
        const hit = await caches.match(key, MATCH);
        if (hit) return hit;
      }
      return null;
    };
    const timer = setTimeout(async () => {
      const hit = await fallback();
      if (hit && !settled) { settled = true; resolve(hit); }
    }, NAVIGATION_TIMEOUT_MS);
    fetch(request).then(async (res) => {
      clearTimeout(timer);
      if (res && res.status === 200 && fallbackKeys.length && !/^\/(privacy|blog|api)/.test(new URL(request.url).pathname)) {
        const cache = await caches.open(SHELL_CACHE);
        cache.put('/', res.clone());
      }
      if (!settled) { settled = true; resolve(res); }
    }, async () => {
      clearTimeout(timer);
      if (settled) return;
      settled = true;
      const hit = await fallback();
      resolve(hit || new Response('Offline', { status: 503, statusText: 'Offline' }));
    });
  });
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') return;
  if (url.hostname.endsWith('firebaseio.com') || url.hostname.endsWith('googleapis.com') && !FONT_HOSTS.includes(url.hostname)) return;
  if (url.hostname.endsWith('gstatic.com') && !FONT_HOSTS.includes(url.hostname)) return;
  if (url.origin === self.location.origin && url.pathname.startsWith('/api/')) return;
  if (url.pathname.startsWith('/_vercel/')) return;

  // The app's pages
  if (request.mode === 'navigate') {
    const isApp = !/^\/(privacy|blog)/.test(url.pathname);
    event.respondWith(networkFirstWithTimeout(request, isApp ? ['/', '/index.html'] : []));
    return;
  }

  // Hashed build files: cache-first, they never change
  if (url.origin === self.location.origin && url.pathname.startsWith('/assets/')) {
    event.respondWith((async () => {
      const hit = await caches.match(request, MATCH);
      if (hit) return hit;
      try {
        const res = await fetch(request);
        if (!isRealAsset(res)) return new Response('', { status: 404, statusText: 'Not Found' });
        (await caches.open(ASSET_CACHE)).put(request, res.clone());
        return res;
      } catch {
        return new Response('', { status: 404, statusText: 'Not Found' });
      }
    })());
    return;
  }

  // Fonts: cache-first (they are opaque cross-origin responses, which is fine to keep)
  if (FONT_HOSTS.includes(url.hostname)) {
    event.respondWith((async () => {
      const hit = await caches.match(request, MATCH);
      if (hit) return hit;
      try {
        const res = await fetch(request);
        if (res && (res.status === 200 || res.type === 'opaque')) (await caches.open(RUNTIME_CACHE)).put(request, res.clone());
        return res;
      } catch {
        return new Response('', { status: 404, statusText: 'Not Found' });
      }
    })());
    return;
  }

  // Everything else (icons, manifest, images): serve the copy, refresh it in the background
  event.respondWith((async () => {
    const hit = await caches.match(request, MATCH);
    const refresh = fetch(request).then(async (res) => {
      if (res && res.status === 200) (await caches.open(RUNTIME_CACHE)).put(request, res.clone());
      return res;
    }).catch(() => null);
    if (hit) { refresh.catch(() => {}); return hit; }
    return (await refresh) || new Response('', { status: 504, statusText: 'Gateway Timeout' });
  })());
});
