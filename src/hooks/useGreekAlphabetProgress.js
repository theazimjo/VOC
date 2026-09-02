import { useState, useEffect, useCallback } from 'react';
import { ref, update, onValue } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const EMPTY_PROGRESS = { mastery: {}, quiz: { bestScore: 0, bestTotal: 0, totalAttempts: 0 } };

// Progress for the standalone Greek alphabet track — its own RTDB branch
// (users/{uid}/greek/alphabet), deliberately separate from grammar/pack
// stats so it never mixes with any other course's numbers.
//
// `mastery` is a 0-100 score per letter id, driven entirely by how the
// learner does in GreekLearnFlow's practice rounds (no manual "mark as
// learned" toggle) — a letter id appearing in this map at all means it's
// been introduced; its value is the mastery grid/percentage shown for it.
export function useGreekAlphabetProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState(() => {
    if (typeof window !== 'undefined' && user) {
      const cached = localStorage.getItem(`voc-cache-greek-alphabet-${user.uid}`);
      if (cached) return JSON.parse(cached);
    }
    return EMPTY_PROGRESS;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProgress(EMPTY_PROGRESS);
      setLoading(false);
      return;
    }

    const cacheKey = `voc-cache-greek-alphabet-${user.uid}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setProgress(JSON.parse(cached));
      setLoading(false);
    } else {
      setLoading(true);
    }

    const progressRef = ref(db, `users/${user.uid}/greek/alphabet`);
    const unsubscribe = onValue(
      progressRef,
      (snapshot) => {
        const val = snapshot.val() || {};
        const newProgress = {
          mastery: val.mastery || {},
          quiz: { ...EMPTY_PROGRESS.quiz, ...(val.quiz || {}) },
        };
        localStorage.setItem(cacheKey, JSON.stringify(newProgress));
        setProgress(newProgress);
        setLoading(false);
      },
      (error) => {
        console.error('Error listening to Greek alphabet progress:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // `masteryUpdates`: { [letterId]: number } — the final, already-computed
  // 0-100 values for every letter touched by one GreekLearnFlow session,
  // written in a single call. Deltas are accumulated client-side during the
  // session (see GreekLearnFlow) rather than via per-answer transactions,
  // since it's one continuous local session flushing once at the end.
  const applyMasteryUpdates = useCallback(
    (masteryUpdates) => {
      if (!user || !Object.keys(masteryUpdates).length) return;
      update(ref(db, `users/${user.uid}/greek/alphabet/mastery`), masteryUpdates);
    },
    [user]
  );

  const saveQuizResult = useCallback(
    (score, total) => {
      if (!user) return;
      const current = progress.quiz || EMPTY_PROGRESS.quiz;
      const isNewBest = score > current.bestScore
        || (score === current.bestScore && total < (current.bestTotal || total));
      update(ref(db, `users/${user.uid}/greek/alphabet/quiz`), {
        ...(isNewBest ? { bestScore: score, bestTotal: total } : {}),
        lastScore: score,
        lastTotal: total,
        totalAttempts: (current.totalAttempts || 0) + 1,
        lastPlayedAt: new Date().toISOString(),
      });
    },
    [user, progress.quiz]
  );

  return { progress, loading, applyMasteryUpdates, saveQuizResult };
}
