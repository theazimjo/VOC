import { useState, useEffect } from "react";

const CACHE_KEY_PREFIX = "avatar_cache_";

/**
 * useAvatar(photoURL)
 *
 * Caches the user profile photo as a base64 data URL in localStorage.
 * On subsequent page loads the cached blob is served locally, avoiding
 * repeated hits to Google image CDN (which rate-limits with 429).
 *
 * Returns: { avatarSrc, avatarError }
 *   avatarSrc   - data URL (cached) or null
 *   avatarError - true when loading failed; caller should show initials
 */
export function useAvatar(photoURL) {
  const cacheKey = CACHE_KEY_PREFIX + (photoURL || "");

  const [avatarSrc, setAvatarSrc] = useState(() => {
    if (!photoURL) return null;
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        if (cached === 'tainted') return photoURL;
        if (cached === 'error') return null;
        return cached;
      }
    } catch {
      return null;
    }
    return null;
  });

  const [avatarError, setAvatarError] = useState(() => {
    if (!photoURL) return true;
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached === 'error') return true;
    } catch { /* ignore */ }
    return false;
  });

  useEffect(() => {
    if (!photoURL) {
      setAvatarSrc(null);
      setAvatarError(true);
      return;
    }

    // Serve from cache immediately if available
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        if (cached === 'tainted') {
          setAvatarSrc(photoURL);
          setAvatarError(false);
        } else if (cached === 'error') {
          setAvatarSrc(null);
          setAvatarError(true);
        } else {
          setAvatarSrc(cached);
          setAvatarError(false);
        }
        return;
      }
    } catch { /* ignore */ }

    // Fetch and convert to base64 so we never hit the remote URL again
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (cancelled) return;
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || 96;
        canvas.height = img.naturalHeight || 96;
        canvas.getContext("2d").drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png");
        try { localStorage.setItem(cacheKey, dataURL); } catch { /* storage full */ }
        setAvatarSrc(dataURL);
        setAvatarError(false);
      } catch {
        // CORS tainted canvas — save 'tainted' state so we don't try to draw on canvas again
        try { localStorage.setItem(cacheKey, 'tainted'); } catch { /* ignore */ }
        setAvatarSrc(photoURL);
        setAvatarError(false);
      }
    };
    img.onerror = () => {
      if (cancelled) return;
      // The CORS-mode request failed — this can happen even for URLs that would
      // serve the image fine to a plain non-CORS <img> tag (inconsistent CORS
      // headers from the CDN). Retry without crossOrigin before giving up, since
      // caching 'error' here would permanently blacklist an otherwise-working avatar.
      const plainImg = new Image();
      plainImg.onload = () => {
        if (cancelled) return;
        try { localStorage.setItem(cacheKey, 'tainted'); } catch { /* ignore */ }
        setAvatarSrc(photoURL);
        setAvatarError(false);
      };
      plainImg.onerror = () => {
        if (cancelled) return;
        // Save 'error' state so we don't make requests to broken URL again
        try { localStorage.setItem(cacheKey, 'error'); } catch { /* ignore */ }
        setAvatarSrc(null);
        setAvatarError(true);
      };
      plainImg.src = photoURL;
    };
    img.src = photoURL;

    return () => { cancelled = true; };
  }, [photoURL, cacheKey]);

  return { avatarSrc, avatarError };
}
