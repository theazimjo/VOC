import { useEffect } from 'react';
import { usePacks } from './usePacks';

/**
 * Shows the count of due-for-review words on the installed PWA's app icon
 * via the Badging API. Unsupported browsers (most desktop browsers, iOS
 * Safari outside of an installed PWA) silently no-op.
 */
export function useAppBadge() {
  const { allWords, allWordsLoading } = usePacks();

  useEffect(() => {
    if (allWordsLoading) return;
    if (!('setAppBadge' in navigator)) return;

    const now = new Date();
    const dueCount = allWords.filter(w => !w.nextReview || new Date(w.nextReview) <= now).length;

    if (dueCount > 0) {
      navigator.setAppBadge(dueCount).catch(() => {});
    } else {
      navigator.clearAppBadge().catch(() => {});
    }
  }, [allWords, allWordsLoading]);
}
