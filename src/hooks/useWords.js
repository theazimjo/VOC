import { useState, useEffect, useCallback } from 'react';
import { ref, set, push, update, remove, get, onValue, runTransaction } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { migratePackWordsIfNeeded } from '../utils/wordsMigration';

export function useWords(collectionType, collectionId) {
  const { user } = useAuth();
  const [words, setWords] = useState(() => {
    if (typeof window !== 'undefined' && user && collectionType && collectionId) {
      const cached = localStorage.getItem(`voc-cache-words-${user.uid}-${collectionType}-${collectionId}`);
      return cached ? JSON.parse(cached) : [];
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
      setWords(JSON.parse(cached));
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

          // Cache data
          localStorage.setItem(cacheKey, JSON.stringify(wordsData));

          setWords(wordsData);
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
        addedAt: new Date().toISOString(),
        mastery: 0,
        easeFactor: 2.5,
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
            addedAt: new Date().toISOString(),
            mastery: 0,
            easeFactor: 2.5,
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
