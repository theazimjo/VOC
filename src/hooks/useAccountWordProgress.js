import { useMemo } from 'react';
import { getDecayedMastery } from '@voc/memory-engine';
import { usePacks } from './usePacks';

const EMPTY = {};

/**
 * Every word this student has ever practiced, anywhere — any corp group,
 * any center, individual mode too — read straight from their own flat
 * users/{uid}/words tree. Deliberately account-wide, not scoped to
 * whatever the current group happens to assign: that's what used to make
 * "Target Words" reset back toward 0 on every group switch. This count
 * only ever grows.
 *
 * @param {string} uid
 * @returns {{ words: Object[], totalWords: number, learnedWords: number }}
 */
export function useAccountWordProgress(uid) {
  // The words tree is already subscribed once for the whole app (PacksContext);
  // reading it from there avoids a second listener and a second full parse.
  const { wordsByPack } = usePacks();
  const allDbWords = uid ? wordsByPack : EMPTY;

  const words = useMemo(() => {
    const flat = [];
    Object.keys(allDbWords).forEach(sourceId => {
      const wordsForSource = allDbWords[sourceId] || {};
      Object.keys(wordsForSource).forEach(dbWordId => {
        const dbStat = wordsForSource[dbWordId] || {};
        const merged = { mastery: 0, stability: 1.0, sourceId, dbWordId, ...dbStat };
        flat.push({ ...merged, mastery: getDecayedMastery(merged) });
      });
    });
    return flat;
  }, [allDbWords]);

  const totalWords = words.length;
  const learnedWords = useMemo(() => words.filter(w => (w.mastery || 0) >= 80).length, [words]);

  return { words, totalWords, learnedWords };
}
