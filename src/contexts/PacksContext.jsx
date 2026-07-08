import { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ref, set, push, update, remove, get, onValue } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from './AuthContext';
import { migratePackWordsIfNeeded } from '../utils/wordsMigration';

const PacksContext = createContext(null);

export function PacksProvider({ children }) {
  const { user } = useAuth();
  const [packs, setPacks] = useState(() => {
    if (typeof window !== 'undefined' && user) {
      const cached = localStorage.getItem(`voc-cache-packs-${user.uid}`);
      return cached ? JSON.parse(cached) : [];
    }
    return [];
  });
  const [loading, setLoading] = useState(true);
  const [wordsByPack, setWordsByPack] = useState({});
  const [wordsLoading, setWordsLoading] = useState(true);
  const migratedRef = useRef(new Set());

  // Single real-time listener for pack metadata (name/icon/wordCount), shared
  // across the whole app. Word contents are intentionally NOT read here —
  // they live at users/{uid}/words/{packId} so editing a pack's words never
  // re-triggers this listener, and vice versa.
  useEffect(() => {
    migratedRef.current = new Set();

    if (!user) {
      setPacks([]);
      setLoading(false);
      return;
    }

    const cached = localStorage.getItem(`voc-cache-packs-${user.uid}`);
    if (cached) {
      setPacks(JSON.parse(cached));
      setLoading(false);
    } else {
      setLoading(true);
    }

    const packsRef = ref(db, `users/${user.uid}/packs`);

    const unsubscribe = onValue(
      packsRef,
      (snapshot) => {
        const packsData = [];
        snapshot.forEach((childSnap) => {
          const val = childSnap.val();
          if (val && typeof val === 'object') {
            packsData.push({
              id: childSnap.key,
              ...val,
              wordCount: val.wordCount || 0
            });

            // Background, one-time-per-session migration of any pack still
            // using the legacy nested-words schema. Idempotent and cheap
            // once migrated — never blocks rendering.
            if (!migratedRef.current.has(childSnap.key)) {
              migratedRef.current.add(childSnap.key);
              migratePackWordsIfNeeded(user.uid, childSnap.key).catch((err) => {
                console.warn('Pack words migration failed for', childSnap.key, err);
              });
            }
          }
        });

        packsData.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

        localStorage.setItem(`voc-cache-packs-${user.uid}`, JSON.stringify(packsData));

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

  // Single real-time listener for ALL words across ALL packs, shared across
  // the whole app. Only components that actually need word-level data
  // (Dashboard stats, StatsPage, MixedPractice pool) read from this —
  // pack list/summary views never touch it.
  useEffect(() => {
    if (!user) {
      setWordsByPack({});
      setWordsLoading(false);
      return;
    }

    setWordsLoading(true);
    const wordsRef = ref(db, `users/${user.uid}/words`);

    const unsubscribe = onValue(
      wordsRef,
      (snapshot) => {
        setWordsByPack(snapshot.val() || {});
        setWordsLoading(false);
      },
      (error) => {
        console.error('Error listening to words from RTDB:', error);
        setWordsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const allWords = useMemo(() => {
    const packById = {};
    packs.forEach((p) => { packById[p.id] = p; });

    const flat = [];
    Object.keys(wordsByPack).forEach((packId) => {
      const pack = packById[packId];
      const wordsObj = wordsByPack[packId] || {};
      Object.keys(wordsObj).forEach((wordId) => {
        flat.push({
          id: wordId,
          ...wordsObj[wordId],
          packId,
          source: pack?.name || 'Kutubxona',
          sourceIcon: pack?.icon || '📦',
          sourceType: 'packs'
        });
      });
    });
    return flat;
  }, [packs, wordsByPack]);

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

  const updatePack = useCallback(
    async (packId, data) => {
      if (!user) return;

      const packRef = ref(db, `users/${user.uid}/packs/${packId}`);
      await update(packRef, data);
    },
    [user]
  );

  const deletePack = useCallback(
    async (packId) => {
      if (!user) return;

      const packRef = ref(db, `users/${user.uid}/packs/${packId}`);
      await remove(packRef);

      const packWordsRef = ref(db, `users/${user.uid}/words/${packId}`);
      await remove(packWordsRef);
    },
    [user]
  );

  const getPack = useCallback(
    async (packId) => {
      if (!user) return null;

      const packRef = ref(db, `users/${user.uid}/packs/${packId}`);
      const snap = await get(packRef);

      if (snap.exists()) {
        const val = snap.val();
        return {
          id: snap.key,
          ...val,
          wordCount: val.wordCount || 0
        };
      }
      return null;
    },
    [user]
  );

  const value = {
    packs,
    loading,
    addPack,
    updatePack,
    deletePack,
    getPack,
    allWords,
    allWordsLoading: wordsLoading
  };

  return <PacksContext.Provider value={value}>{children}</PacksContext.Provider>;
}

export function usePacks() {
  const ctx = useContext(PacksContext);
  if (!ctx) {
    throw new Error('usePacks must be used within a PacksProvider');
  }
  return ctx;
}
