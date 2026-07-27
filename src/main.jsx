import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Register Service Worker for offline PWA support — production only. In dev,
// the SW's cache-first strategy for .js files fights Vite's HMR: a stale
// cached chunk served alongside a freshly recompiled one can load two copies
// of React, which surfaces as "Invalid hook call" errors that have nothing
// to do with the component actually reporting them. If a SW from an earlier
// `npm run dev` session is still controlling this page, unregister it so
// dev mode self-heals without the user having to clear storage by hand.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    // updateViaCache: 'none' tells the browser to never serve sw.js (or its
    // imports) from the HTTP cache — without this, browsers only re-check
    // for a new service worker once every ~24h, so deploys can silently
    // never reach installed users.
    navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' })
      .then((reg) => {
        console.log('[Service Worker] Registered successfully:', reg.scope);

        // Check for updates automatically
        reg.onupdatefound = () => {
          const installingWorker = reg.installing;
          if (installingWorker == null) return;

          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New update installed. sw.js calls skipWaiting()/clients.claim(),
              // so this will shortly trigger 'controllerchange' below, which
              // does the actual reload — don't reload here too, or we double-fire.
              console.log('[Service Worker] New update installed, activating...');
            }
          };
        };

        // Passive checks (on load, on visibility) aren't enough on their
        // own — actively ask the browser to re-check for a new sw.js
        // whenever the app is opened or resumed from the background.
        reg.update();
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') {
            reg.update();
          }
        });
      })
      .catch((err) => {
        console.error('[Service Worker] Registration failed:', err);
      });
  });

  // Handle case where controller change occurs
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      refreshing = true;
      window.location.reload();
    }
  });
} else if ('serviceWorker' in navigator && import.meta.env.DEV) {
  navigator.serviceWorker.getRegistrations().then((regs) => {
    regs.forEach((reg) => reg.unregister());
  });
  if ('caches' in window) {
    caches.keys().then((keys) => keys.forEach((key) => caches.delete(key)));
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
