import { lazy } from 'react';

/**
 * Wraps React.lazy() so that a failed chunk fetch (the classic
 * "ChunkLoadError" or CSS preload error — happens when a stale cached page tries
 * to load a route bundle that no longer exists after a new deploy) triggers
 * a cache cleanup and page reload.
 */
export function lazyWithRetry(importFn) {
  return lazy(async () => {
    const storageKey = 'voc-chunk-reload-attempted';
    try {
      const mod = await importFn();
      // Successful load — clear the guard so future failures can retry.
      sessionStorage.removeItem(storageKey);
      return mod;
    } catch (err) {
      const alreadyReloaded = sessionStorage.getItem(storageKey);
      if (!alreadyReloaded) {
        sessionStorage.setItem(storageKey, '1');
        if ('caches' in window) {
          try {
            const keys = await caches.keys();
            await Promise.all(keys.map((key) => caches.delete(key)));
          } catch {
            // Ignore cache clear error
          }
        }
        window.location.reload();
        // Never resolves — the reload takes over before this matters.
        return new Promise(() => {});
      }
      throw err;
    }
  });
}

