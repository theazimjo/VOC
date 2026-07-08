import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Register Service Worker for offline PWA support
if ('serviceWorker' in navigator) {
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
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // New update is ready, force reload immediately to apply changes
                console.log('[Service Worker] New update found and active! Reloading...');
                window.location.reload();
              }
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
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
