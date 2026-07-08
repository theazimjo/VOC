import { lazy } from 'react';

/**
 * Wraps React.lazy() so that a failed chunk fetch (the classic
 * "ChunkLoadError" — happens when a stale cached page tries to load a
 * route bundle that no longer exists after a new deploy) triggers exactly
 * one full page reload instead of leaving the user stuck on a spinner
 * forever. The reload fetches a fresh index.html with correct chunk
 * references, which resolves the mismatch.
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
        window.location.reload();
        // Never resolves — the reload takes over before this matters.
        return new Promise(() => {});
      }
      throw err;
    }
  });
}
