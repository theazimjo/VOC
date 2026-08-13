import { useState, useEffect, useCallback } from 'react';
import { ref, set, push, update, remove, get, onValue, runTransaction } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { migratePackWordsIfNeeded } from '../utils/wordsMigration';
import { getDecayedMastery } from '../utils/memoryEngine';

// Cache/DB keep the raw, last-review-time mastery snapshot; consumers of
// this hook should see it decayed toward the word's current retrievability
// instead, so "mastered" doesn't stay frozen at 100% forever if untouched.
function decayWordsMastery(wordsList) {
  return wordsList.map(w => ({ ...w, mastery: getDecayedMastery(w) }));
}

export function useWords(collectionType, collectionId) {
  const { user } = useAuth();
  const [words, setWords] = useState(() => {
    if (typeof window !== 'undefined' && user && collectionType && collectionId) {
      const cached = localStorage.getItem(`voc-cache-words-${user.uid}-${collectionType}-${collectionId}`);
      return cached ? decayWordsMastery(JSON.parse(cached)) : [];
    }
    return [];
  });
  const [loading, setLoading] = useState(true);

  // Words live at a flat top-level path (users/{uid}/words/{packId}),
  // separate from pack metadata, so word-level writes (mastery updates
  // during practice) never touch — and never re-trigger listeners on —
  // the pack list.
  const getWordsRef = useCallback(() => {
    if (!user || !collectionId) return null;
    return ref(db, `users/${user.uid}/words/${collectionId}`);
  }, [user, collectionId]);

  // Reference to just the wordCount leaf on the pack node, so it can be
  // updated without downloading the entire pack.
  const getWordCountRef = useCallback(() => {
    if (!user || !collectionType || !collectionId) return null;
    return ref(db, `users/${user.uid}/${collectionType}/${collectionId}/wordCount`);
  }, [user, collectionType, collectionId]);

  // Real-time listener for words
  useEffect(() => {
    if (!user || !collectionType || !collectionId) {
      setWords([]);
      setLoading(false);
      return;
    }

    // Load from cache first
    const cacheKey = `voc-cache-words-${user.uid}-${collectionType}-${collectionId}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setWords(decayWordsMastery(JSON.parse(cached)));
      setLoading(false);
    } else {
      setLoading(true);
    }

    let unsubscribe = () => {};
    let cancelled = false;

    const start = async () => {
      // One-time, idempotent migration of this pack's legacy nested words
      // (if any) into the new flat location, before subscribing.
      try {
        await migratePackWordsIfNeeded(user.uid, collectionId);
      } catch (err) {
        console.warn('Word migration check failed:', err);
      }
      if (cancelled) return;

      const wordsRef = getWordsRef();

      unsubscribe = onValue(
        wordsRef,
        (snapshot) => {
          const wordsData = [];
          snapshot.forEach((childSnap) => {
            wordsData.push({
              id: childSnap.key,
              ...childSnap.val()
            });
          });

          // Sort by addedAt descending
          wordsData.sort((a, b) => new Date(b.addedAt || 0) - new Date(a.addedAt || 0));

          // Cache the raw (undecayed) data so re-hydration on next load
          // recomputes decay against the fresh current time, not a stale one.
          localStorage.setItem(cacheKey, JSON.stringify(wordsData));

          setWords(decayWordsMastery(wordsData));
          setLoading(false);
        },
        (error) => {
          console.error('Error listening to words from RTDB:', error);
          setLoading(false);
        }
      );
    };

    start();

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [user, collectionType, collectionId, getWordsRef]);

  // Add a new word with SM-2 initial data
  const addWord = useCallback(
    async (data) => {
      const wordsRef = getWordsRef();
      if (!wordsRef) return null;

      const newWordRef = push(wordsRef);
      const wordData = {
        word: data.word || '',
        translation: data.translation || '',
        definition: data.definition || '',
        example: data.example || '',
        notes: data.notes || '',
        customSentence: data.customSentence || '',
        partOfSpeech: data.partOfSpeech || 'noun',
        // IELTS-pack-only fields - always written with a safe '' default so
        // they're harmless no-ops for every default-pack word (see the
        // "IELTS Pack Type" plan).
        synonyms: data.synonyms || '',
        collocations: data.collocations || '',
        nounForm: data.nounForm || '',
        verbForm: data.verbForm || '',
        adjectiveForm: data.adjectiveForm || '',
        adverbForm: data.adverbForm || '',
        article: data.article || '',
        topic: data.topic || '',
        addedAt: new Date().toISOString(),
        mastery: 0,
        interval: 0,
        reviewCount: 0,
        nextReview: null,
        lastReviewed: null
      };

      await set(newWordRef, wordData);

      // Increment wordCount via transaction (touches only the counter leaf,
      // not the whole pack + all its words)
      try {
        const wordCountRef = getWordCountRef();
        if (wordCountRef) {
          await runTransaction(wordCountRef, (count) => (count || 0) + 1);
        }
      } catch (err) {
        console.warn("Failed to update pack wordCount:", err);
      }

      return newWordRef.key;
    },
    [getWordsRef, getWordCountRef]
  );

  // Update a word (partial update)
  const updateWord = useCallback(
    async (wordId, data) => {
      if (!user || !collectionId) return;

      const wordRef = ref(db, `users/${user.uid}/words/${collectionId}/${wordId}`);
      await update(wordRef, data);
    },
    [user, collectionId]
  );

  // Delete a word
  const deleteWord = useCallback(
    async (wordId) => {
      if (!user || !collectionType || !collectionId) return;

      const wordRef = ref(db, `users/${user.uid}/words/${collectionId}/${wordId}`);
      await remove(wordRef);

      // Decrement wordCount via transaction (no full pack re-fetch)
      try {
        const wordCountRef = getWordCountRef();
        if (wordCountRef) {
          await runTransaction(wordCountRef, (count) => Math.max(0, (count || 0) - 1));
        }
      } catch (err) {
        console.warn("Failed to update pack wordCount after delete:", err);
      }
    },
    [user, collectionType, collectionId, getWordCountRef]
  );

  // Get a single word by ID
  const getWord = useCallback(
    async (wordId) => {
      if (!user || !collectionId) return null;

      const wordRef = ref(db, `users/${user.uid}/words/${collectionId}/${wordId}`);
      const snap = await get(wordRef);

      if (snap.exists()) {
        return { id: snap.key, ...snap.val() };
      }
      return null;
    },
    [user, collectionId]
  );

  // Add multiple words in batch chunks (extremely efficient)
  const bulkAddWords = useCallback(
    async (wordsList, onProgress) => {
      const wordsRef = getWordsRef();
      if (!wordsRef || !wordsList || wordsList.length === 0) return;

      const total = wordsList.length;
      const batchSize = 25;

      for (let i = 0; i < total; i += batchSize) {
        const chunk = wordsList.slice(i, i + batchSize);
        const updates = {};

        chunk.forEach(wordData => {
          const newWordRef = push(wordsRef);
          const newWordId = newWordRef.key;

          updates[`${newWordId}`] = {
            word: wordData.word || '',
            translation: wordData.translation || '',
            definition: wordData.definition || '',
            example: wordData.example || '',
            notes: wordData.notes || '',
            partOfSpeech: wordData.partOfSpeech || 'noun',
            synonyms: wordData.synonyms || '',
            collocations: wordData.collocations || '',
            nounForm: wordData.nounForm || '',
            verbForm: wordData.verbForm || '',
            adjectiveForm: wordData.adjectiveForm || '',
            adverbForm: wordData.adverbForm || '',
            article: wordData.article || '',
            topic: wordData.topic || '',
            addedAt: new Date().toISOString(),
            mastery: 0,
            interval: 0,
            reviewCount: 0,
            nextReview: null,
            lastReviewed: null
          };
        });

        // Write batch chunk update to RTDB
        await update(wordsRef, updates);

        const added = Math.min(i + batchSize, total);
        const remaining = total - added;
        if (onProgress) {
          onProgress(added, remaining);
        }

        // Delay to allow UI rendering and smooth progress animation
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      // Increment wordCount via transaction exactly once at the end
      try {
        const wordCountRef = getWordCountRef();
        if (wordCountRef) {
          await runTransaction(wordCountRef, (count) => (count || 0) + total);
        }
      } catch (err) {
        console.warn("Failed to update pack wordCount after bulk import:", err);
      }
    },
    [getWordsRef, getWordCountRef]
  );

  return { words, loading, addWord, updateWord, deleteWord, getWord, bulkAddWords };
}
