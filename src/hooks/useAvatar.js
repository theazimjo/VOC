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
    try { return localStorage.getItem(cacheKey) || null; } catch { return null; }
  });

  const [avatarError, setAvatarError] = useState(!photoURL);

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
        setAvatarSrc(cached);
        setAvatarError(false);
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
        // CORS tainted canvas — fall back to direct URL this session only
        setAvatarSrc(photoURL);
        setAvatarError(false);
      }
    };
    img.onerror = () => {
      if (cancelled) return;
      setAvatarSrc(null);
      setAvatarError(true);
    };
    img.src = photoURL;

    return () => { cancelled = true; };
  }, [photoURL, cacheKey]);

  return { avatarSrc, avatarError };
}
