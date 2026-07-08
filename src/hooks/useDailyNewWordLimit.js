import { useState, useMemo, useCallback } from 'react';
import { usePacks } from './usePacks';

const STORAGE_KEY = 'voc_daily_new_word_limit';
export const DEFAULT_DAILY_NEW_WORD_LIMIT = 15;

/**
 * Tracks how many words the user has added today (derived client-side from
 * the already-loaded allWords list — no extra Firebase reads) against a
 * configurable daily goal, so we can gently nudge against cramming too many
 * new words into working memory in one sitting.
 */
export function useDailyNewWordLimit() {
  const { allWords } = usePacks();
  const [limit, setLimitState] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_DAILY_NEW_WORD_LIMIT;
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? parseInt(saved, 10) : DEFAULT_DAILY_NEW_WORD_LIMIT;
  });

  const setLimit = useCallback((value) => {
    setLimitState(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, String(value));
    }
  }, []);

  const todayCount = useMemo(() => {
    const todayStr = new Date().toDateString();
    return allWords.filter(w => w.addedAt && new Date(w.addedAt).toDateString() === todayStr).length;
  }, [allWords]);

  return { limit, setLimit, todayCount, remaining: Math.max(0, limit - todayCount) };
}
