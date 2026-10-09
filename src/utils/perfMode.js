// "Lite" rendering for phones and tablets. Blur, glass and endless decorative
// animation are cheap on a desktop GPU but are what makes scrolling and page
// changes stutter on a mid-range phone, so on touch-first devices (and for anyone
// who asks the system to reduce motion) they are switched off - see perf-lite.css.
// A computer keeps the full look. Force either way with
// localStorage 'voc-perf' = 'lite' | 'full'.
export function applyPerfMode() {
  let mode = 'full';
  try {
    const forced = localStorage.getItem('voc-perf');
    if (forced === 'lite' || forced === 'full') mode = forced;
    else {
      const touchFirst = window.matchMedia('(pointer: coarse)').matches;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const smallScreen = window.matchMedia('(max-width: 820px)').matches && 'ontouchstart' in window;
      if (touchFirst || reduce || smallScreen) mode = 'lite';
    }
  } catch { /* storage or matchMedia unavailable: keep the full look */ }
  document.documentElement.dataset.perf = mode;
  return mode;
}
