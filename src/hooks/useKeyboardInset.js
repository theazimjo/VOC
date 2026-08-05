import { useEffect, useState } from 'react';

/**
 * Tracks how many pixels the on-screen mobile keyboard currently covers at
 * the bottom of the screen, via the VisualViewport API.
 *
 * `position: fixed` elements are pinned to the *layout* viewport, which does
 * NOT shrink when a mobile keyboard opens — only the *visual* viewport does.
 * That leaves fixed bottom bars (e.g. a practice mode's "Tekshirish" button)
 * rendered underneath the keyboard until it's dismissed. Feeding this value
 * into a `translateY(-inset)` on the fixed element keeps it visible above
 * the keyboard instead.
 *
 * Returns 0 (safe no-op) when VisualViewport isn't supported.
 */
export function useKeyboardInset() {
  const [inset, setInset] = useState(0);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const update = () => {
      const covered = window.innerHeight - vv.height - vv.offsetTop;
      setInset(Math.max(0, Math.round(covered)));
    };

    update();
    vv.addEventListener('resize', update);
    vv.addEventListener('scroll', update);
    return () => {
      vv.removeEventListener('resize', update);
      vv.removeEventListener('scroll', update);
    };
  }, []);

  return inset;
}
