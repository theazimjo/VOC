import { useState, useEffect, useCallback } from 'react';
import { ref, set, push, update, remove, get, onValue } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

export function usePacks() {
  const { user } = useAuth();
  const [packs, setPacks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Real-time listener for packs
  useEffect(() => {
    if (!user) {
      setPacks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const packsRef = ref(db, `users/${user.uid}/packs`);

    const unsubscribe = onValue(
      packsRef,
      (snapshot) => {
        const packsData = [];
        snapshot.forEach((childSnap) => {
          const val = childSnap.val();
          if (val && typeof val === 'object') {
            const wordsObj = val.words || {};
            const calculatedWordCount = Object.keys(wordsObj).length;

            packsData.push({
              id: childSnap.key,
              ...val,
              wordCount: calculatedWordCount
            });
          }
        });

        // Sort by createdAt desc
        packsData.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        setPacks(packsData);
        setLoading(false);
      },
      (error) => {
        console.error('Error listening to packs from RTDB:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // Add a new pack
  const addPack = useCallback(
    async (data) => {
      if (!user) return null;

      const packsRef = ref(db, `users/${user.uid}/packs`);
      const newPackRef = push(packsRef);
      const packData = {
        name: data.name || '',
        description: data.description || '',
        color: data.color || '#7C3AED',
        icon: data.icon || '📦',
        level: data.level || 'beginner',
        createdAt: new Date().toISOString(),
        wordCount: 0
      };

      await set(newPackRef, packData);
      return newPackRef.key;
    },
    [user]
  );

  // Update an existing pack
  const updatePack = useCallback(
    async (packId, data) => {
      if (!user) return;

      const packRef = ref(db, `users/${user.uid}/packs/${packId}`);
      await update(packRef, data);
    },
    [user]
  );

  // Delete a pack (deleting the pack node automatically deletes its nested words)
  const deletePack = useCallback(
    async (packId) => {
      if (!user) return;

      const packRef = ref(db, `users/${user.uid}/packs/${packId}`);
      await remove(packRef);
    },
    [user]
  );

  // Get a single pack by ID
  const getPack = useCallback(
    async (packId) => {
      if (!user) return null;

      const packRef = ref(db, `users/${user.uid}/packs/${packId}`);
      const snap = await get(packRef);

      if (snap.exists()) {
        const val = snap.val();
        const wordsObj = val.words || {};
        return {
          id: snap.key,
          ...val,
          wordCount: Object.keys(wordsObj).length
        };
      }
      return null;
    },
    [user]
  );

  return { packs, loading, addPack, updatePack, deletePack, getPack };
}

