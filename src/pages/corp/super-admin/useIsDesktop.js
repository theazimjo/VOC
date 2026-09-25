import { useEffect, useState } from 'react';

// Wide enough for the list + detail split view (sidebar is 260px on top).
export const DESKTOP_QUERY = '(min-width: 1100px)';

export function useIsDesktop() {
  const get = () => typeof window !== 'undefined' && window.matchMedia(DESKTOP_QUERY).matches;
  const [isDesktop, setIsDesktop] = useState(get);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = (e) => setIsDesktop(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return isDesktop;
}
