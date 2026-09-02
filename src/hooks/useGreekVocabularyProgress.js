import { useState, useEffect, useCallback } from 'react';
import { ref, update, onValue } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const EMPTY_PROGRESS = { mastery: {} };

// Progress for the standalone Greek vocabulary track — its own RTDB branch
// (users/{uid}/greek/vocabulary), separate from the alphabet track's
// mastery numbers even though the data shape mirrors
// useGreekAlphabetProgress.js exactly (a word id in `mastery` means
// "introduced"; its 0-100 value is driven by GreekVocabLearnFlow's
// practice rounds, no manual toggle).
export function useGreekVocabularyProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState(() => {
    if (typeof window !== 'undefined' && user) {
      const cached = localStorage.getItem(`voc-cache-greek-vocabulary-${user.uid}`);
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

    const cacheKey = `voc-cache-greek-vocabulary-${user.uid}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setProgress(JSON.parse(cached));
      setLoading(false);
    } else {
      setLoading(true);
    }

    const progressRef = ref(db, `users/${user.uid}/greek/vocabulary`);
    const unsubscribe = onValue(
      progressRef,
      (snapshot) => {
        const val = snapshot.val() || {};
        const newProgress = { mastery: val.mastery || {} };
        localStorage.setItem(cacheKey, JSON.stringify(newProgress));
        setProgress(newProgress);
        setLoading(false);
      },
      (error) => {
        console.error('Error listening to Greek vocabulary progress:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const applyMasteryUpdates = useCallback(
    (masteryUpdates) => {
      if (!user || !Object.keys(masteryUpdates).length) return;
      update(ref(db, `users/${user.uid}/greek/vocabulary/mastery`), masteryUpdates);
    },
    [user]
  );

  return { progress, loading, applyMasteryUpdates };
}
