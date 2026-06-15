import { useState, useEffect, useCallback } from 'react';
import { ref, set, push, update, remove, get, onValue } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

export function useWords(collectionType, collectionId) {
  const { user } = useAuth();
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  // Build the words reference path in RTDB
  const getWordsRef = useCallback(() => {
    if (!user || !collectionType || !collectionId) return null;
    return ref(db, `users/${user.uid}/${collectionType}/${collectionId}/words`);
  }, [user, collectionType, collectionId]);

  // Get reference to the parent document (book or pack) in RTDB
  const getParentRef = useCallback(() => {
    if (!user || !collectionType || !collectionId) return null;
    return ref(db, `users/${user.uid}/${collectionType}/${collectionId}`);
  }, [user, collectionType, collectionId]);

  // Real-time listener for words
  useEffect(() => {
    if (!user || !collectionType || !collectionId) {
      setWords([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const wordsRef = getWordsRef();

    const unsubscribe = onValue(
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
        setWords(wordsData);
        setLoading(false);
      },
      (error) => {
        console.error('Error listening to words from RTDB:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, collectionType, collectionId, getWordsRef]);

  // Add a new word with SM-2 initial data
  const addWord = useCallback(
    async (data) => {
      const wordsRef = getWordsRef();
      const parentRef = getParentRef();
      if (!wordsRef || !parentRef) return null;

      const newWordRef = push(wordsRef);
      const wordData = {
        word: data.word || '',
        translation: data.translation || '',
        definition: data.definition || '',
        example: data.example || '',
        notes: data.notes || '',
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

      // Update parent wordCount
      try {
        const parentSnap = await get(parentRef);
        if (parentSnap.exists()) {
          const currentData = parentSnap.val();
          const wordsObj = currentData.words || {};
          const currentCount = Object.keys(wordsObj).length;
          await update(parentRef, { wordCount: currentCount });
        }
      } catch (err) {
        console.warn("Failed to update parent wordCount:", err);
      }

      return newWordRef.key;
    },
    [getWordsRef, getParentRef]
  );

  // Update a word (partial update)
  const updateWord = useCallback(
    async (wordId, data) => {
      if (!user || !collectionType || !collectionId) return;

      const wordRef = ref(db, `users/${user.uid}/${collectionType}/${collectionId}/words/${wordId}`);
      await update(wordRef, data);
    },
    [user, collectionType, collectionId]
  );

  // Delete a word
  const deleteWord = useCallback(
    async (wordId) => {
      const parentRef = getParentRef();
      if (!user || !collectionType || !collectionId || !parentRef) return;

      const wordRef = ref(db, `users/${user.uid}/${collectionType}/${collectionId}/words/${wordId}`);
      await remove(wordRef);

      // Update parent wordCount
      try {
        const parentSnap = await get(parentRef);
        if (parentSnap.exists()) {
          const currentData = parentSnap.val();
          const wordsObj = currentData.words || {};
          const currentCount = Object.keys(wordsObj).length;
          await update(parentRef, { wordCount: currentCount });
        }
      } catch (err) {
        console.warn("Failed to update parent wordCount after delete:", err);
      }
    },
    [user, collectionType, collectionId, getParentRef]
  );

  // Get a single word by ID
  const getWord = useCallback(
    async (wordId) => {
      if (!user || !collectionType || !collectionId) return null;

      const wordRef = ref(db, `users/${user.uid}/${collectionType}/${collectionId}/words/${wordId}`);
      const snap = await get(wordRef);

      if (snap.exists()) {
        return { id: snap.key, ...snap.val() };
      }
      return null;
    },
    [user, collectionType, collectionId]
  );

  return { words, loading, addWord, updateWord, deleteWord, getWord };
}

