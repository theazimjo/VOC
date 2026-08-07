import { useState, useEffect, useMemo } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { getDecayedMastery } from '../utils/memoryEngine';

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
  const [allDbWords, setAllDbWords] = useState({});

  useEffect(() => {
    if (!uid) {
      setAllDbWords({});
      return;
    }
    const unsub = onValue(ref(db, `users/${uid}/words`), (snap) => {
      setAllDbWords(snap.exists() ? snap.val() : {});
    }, (err) => {
      console.error('Error fetching account word progress:', err);
    });
    return unsub;
  }, [uid]);

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
