import { useState, useEffect, useCallback } from 'react';
import { ref, update, push, get, onValue } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { getDecayedMastery } from '../utils/memoryEngine';

// Word storage for the standalone Greek vocabulary track — same record
// shape and same memory engine (see spacedRepetition.js/memoryEngine.js) as
// the personal word bank, but at its own RTDB path
// (users/{uid}/greek/vocabulary/words), never users/{uid}/words/*. This is
// what keeps it out of the personal Dashboard/Stats/MixedPractice
// aggregates (PacksContext's `allWords` only ever reads users/{uid}/words) —
// same real memory-per-word tracking, zero connection to personal data.
function decayWordsMastery(wordsList) {
  return wordsList.map((w) => ({ ...w, mastery: getDecayedMastery(w) }));
}

export function useGreekVocabWords() {
  const { user } = useAuth();
  const [words, setWords] = useState(() => {
    if (typeof window !== 'undefined' && user) {
      const cached = localStorage.getItem(`voc-cache-greek-vocab-words-${user.uid}`);
      return cached ? decayWordsMastery(JSON.parse(cached)) : [];
    }
    return [];
  });
  const [loading, setLoading] = useState(true);

  const getWordsRef = useCallback(() => {
    if (!user) return null;
    return ref(db, `users/${user.uid}/greek/vocabulary/words`);
  }, [user]);

  useEffect(() => {
    if (!user) {
      setWords([]);
      setLoading(false);
      return;
    }

    const cacheKey = `voc-cache-greek-vocab-words-${user.uid}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setWords(decayWordsMastery(JSON.parse(cached)));
      setLoading(false);
    } else {
      setLoading(true);
    }

    const wordsRef = getWordsRef();
    const unsubscribe = onValue(
      wordsRef,
      (snapshot) => {
        const wordsData = [];
        snapshot.forEach((childSnap) => {
          wordsData.push({ id: childSnap.key, ...childSnap.val() });
        });
        localStorage.setItem(cacheKey, JSON.stringify(wordsData));
        setWords(decayWordsMastery(wordsData));
        setLoading(false);
      },
      (error) => {
        console.error('Error listening to Greek vocabulary words:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, getWordsRef]);

  // Seeds the fixed 37-word curriculum in one shot — used once, the first
  // time this track's word list is empty (see GreekVocabulary.jsx). Same
  // record shape useWords.js's addWord/bulkAddWords write, minus the
  // pack-wordCount bookkeeping (this track has no pack-list UI to keep in
  // sync) so applyReview()'s legacy-word fallbacks behave identically here.
  const bulkAddWords = useCallback(
    async (wordsList) => {
      const wordsRef = getWordsRef();
      if (!wordsRef || !wordsList?.length) return;

      const updates = {};
      wordsList.forEach((wordData) => {
        const newWordRef = push(wordsRef);
        updates[newWordRef.key] = {
          word: wordData.word || '',
          translation: wordData.translation || '',
          notes: wordData.notes || '',
          topic: wordData.topic || '',
          addedAt: new Date().toISOString(),
          mastery: 0,
          interval: 0,
          reviewCount: 0,
          nextReview: null,
          lastReviewed: null,
        };
      });
      await update(wordsRef, updates);
    },
    [getWordsRef]
  );

  const updateWord = useCallback(
    async (wordId, data) => {
      if (!user) return;
      await update(ref(db, `users/${user.uid}/greek/vocabulary/words/${wordId}`), data);
    },
    [user]
  );

  const getWord = useCallback(
    async (wordId) => {
      if (!user) return null;
      const snap = await get(ref(db, `users/${user.uid}/greek/vocabulary/words/${wordId}`));
      return snap.exists() ? { id: snap.key, ...snap.val() } : null;
    },
    [user]
  );

  return { words, loading, bulkAddWords, updateWord, getWord };
}
