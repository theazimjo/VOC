import { useState, useEffect, useMemo } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { getDecayedMastery } from '../utils/memoryEngine';

// Flattens assigned/additional/required packs down to individual words,
// keyed the same way the rest of the corp student area writes progress
// (`${packId}_${monthId}_${unitId}` -> per-word stats), so "target" reflects
// the full set of words assigned to this group, not just one category.
function flattenAllWords(...packGroups) {
  const words = [];
  packGroups.flat().forEach(pack => {
    const packMonths = pack.months && pack.months.length > 0
      ? pack.months
      : pack.units && pack.units.length > 0
        ? [{ id: 'm1', units: pack.units }]
        : pack.words && pack.words.length > 0
          ? [{ id: 'm1', units: [{ id: 'u1', words: pack.words }] }]
          : [];

    packMonths.forEach(month => {
      (month.units || []).forEach(unit => {
        const sourceId = `${pack.id}_${month.id}_${unit.id}`;
        (unit.words || []).forEach((w, idx) => {
          words.push({ ...w, sourceId, dbWordId: w.id || String(idx) });
        });
      });
    });
  });
  return words;
}

/**
 * Real, word-level progress for a corp student's assigned curriculum —
 * the same computation the dashboard's "Target Words" card uses, shared
 * here so any other screen (e.g. the profile page) shows the identical
 * numbers instead of a different, coarser metric like "packs started".
 *
 * @param {string} uid
 * @param {Object[]} assignedPacks
 * @param {Object[]} requiredPacks
 * @param {Object[]} additionalPacks
 * @returns {{ words: Object[], groupTotalWords: number, learnedWords: number }}
 */
export function useGroupWordProgress(uid, assignedPacks, requiredPacks, additionalPacks) {
  const [allDbWords, setAllDbWords] = useState({});

  useEffect(() => {
    if (!uid) {
      setAllDbWords({});
      return;
    }
    const unsub = onValue(ref(db, `users/${uid}/words`), (snap) => {
      setAllDbWords(snap.exists() ? snap.val() : {});
    }, (err) => {
      console.error('Error fetching corporate word progress:', err);
    });
    return unsub;
  }, [uid]);

  const baseWords = useMemo(
    () => flattenAllWords(assignedPacks || [], requiredPacks || [], additionalPacks || []),
    [assignedPacks, requiredPacks, additionalPacks]
  );

  const words = useMemo(() => {
    return baseWords.map(w => {
      const dbStat = (allDbWords[w.sourceId] || {})[w.dbWordId] || {};
      const merged = { mastery: 0, stability: 1.0, ...w, ...dbStat };
      return { ...merged, mastery: getDecayedMastery(merged) };
    });
  }, [baseWords, allDbWords]);

  const groupTotalWords = words.length;
  const learnedWords = useMemo(() => words.filter(w => (w.mastery || 0) >= 80).length, [words]);

  return { words, groupTotalWords, learnedWords };
}
