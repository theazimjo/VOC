import { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ref, push, update, remove, get, onValue, serverTimestamp, runTransaction } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from './AuthContext';
import { migratePackWordsIfNeeded } from '../utils/wordsMigration';
import { getDecayedMastery } from '../utils/memoryEngine';

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
  const [folders, setFolders] = useState([]);
  const [foldersLoading, setFoldersLoading] = useState(true);
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

  // Single real-time listener for folders — lightweight grouping metadata only
  // (name/icon/color). Packs opt into a folder via their own `folderId` field;
  // a pack with no folderId (or one pointing at a since-deleted folder) is
  // just rendered at the top level, same as before folders existed.
  useEffect(() => {
    if (!user) {
      setFolders([]);
      setFoldersLoading(false);
      return;
    }

    const foldersRef = ref(db, `users/${user.uid}/folders`);

    const unsubscribe = onValue(
      foldersRef,
      (snapshot) => {
        const foldersData = [];
        snapshot.forEach((childSnap) => {
          const val = childSnap.val();
          if (val && typeof val === 'object') {
            foldersData.push({ id: childSnap.key, ...val });
          }
        });
        foldersData.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        setFolders(foldersData);
        setFoldersLoading(false);
      },
      (error) => {
        console.error('Error listening to folders from RTDB:', error);
        setFoldersLoading(false);
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
        const word = wordsObj[wordId];
        if (!word || typeof word !== 'object' || !word.word || typeof word.word !== 'string' || !word.word.trim()) {
          return;
        }
        flat.push({
          id: wordId,
          ...word,
          mastery: getDecayedMastery(word),
          packId,
          source: pack?.name || 'Kutubxona',
          sourceIcon: pack?.icon || '📦',
          sourceType: 'packs',
          language: pack?.language || 'en-US'
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
        language: data.language || 'en-US',
        // 'default' unless explicitly requested otherwise - existing
        // callers never pass this, so every pre-existing pack-creation
        // path keeps behaving exactly as before.
        type: ['ielts', 'english'].includes(data.type) ? data.type : 'default',
        createdAt: new Date().toISOString(),
        wordCount: 0,
        ...(data.marketPackId ? { marketPackId: data.marketPackId } : {}),
        ...(data.folderId ? { folderId: data.folderId } : {})
      };

      // Written as one atomic multi-path update, alongside a server-clock
      // timestamp, so the security rules can enforce a minimum gap between
      // pack creations (spam/abuse throttling) without needing Cloud
      // Functions — see database.rules.json.
      await update(ref(db, `users/${user.uid}`), {
        [`packs/${newPackRef.key}`]: packData,
        'meta/lastPackCreatedAt': serverTimestamp()
      });

      // Best-effort lifetime counter for the admin panel — a monitoring
      // signal only, not an enforced cap (see chat history: RTDB rules can't
      // atomically tie a counter to a sibling write, so this can't be relied
      // on to block abuse, only to surface it).
      try {
        await runTransaction(ref(db, `users/${user.uid}/meta/packsCreatedTotal`), (count) => (count || 0) + 1);
      } catch (err) {
        console.warn('Failed to bump packsCreatedTotal:', err);
      }

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

  const addFolder = useCallback(
    async (data) => {
      if (!user) return null;

      const foldersRef = ref(db, `users/${user.uid}/folders`);
      const newFolderRef = push(foldersRef);
      // Same atomic-timestamp throttling pattern as addPack — see database.rules.json.
      await update(ref(db, `users/${user.uid}`), {
        [`folders/${newFolderRef.key}`]: {
          name: data.name || '',
          icon: data.icon || '📁',
          createdAt: new Date().toISOString()
        },
        'meta/lastFolderCreatedAt': serverTimestamp()
      });

      // Best-effort lifetime counter for the admin panel — see addPack.
      try {
        await runTransaction(ref(db, `users/${user.uid}/meta/foldersCreatedTotal`), (count) => (count || 0) + 1);
      } catch (err) {
        console.warn('Failed to bump foldersCreatedTotal:', err);
      }

      return newFolderRef.key;
    },
    [user]
  );

  const updateFolder = useCallback(
    async (folderId, data) => {
      if (!user) return;

      const folderRef = ref(db, `users/${user.uid}/folders/${folderId}`);
      await update(folderRef, data);
    },
    [user]
  );

  // Deleting a folder never deletes the packs inside it — they're simply
  // ungrouped back to the top-level list, same as a pack that never had a
  // folder. Only the folder's own metadata node is removed.
  const deleteFolder = useCallback(
    async (folderId) => {
      if (!user) return;

      const packsToUngroup = packs.filter((p) => p.folderId === folderId);
      await Promise.all(
        packsToUngroup.map((p) =>
          update(ref(db, `users/${user.uid}/packs/${p.id}`), { folderId: null })
        )
      );

      const folderRef = ref(db, `users/${user.uid}/folders/${folderId}`);
      await remove(folderRef);
    },
    [user, packs]
  );

  const value = {
    packs,
    loading,
    addPack,
    updatePack,
    deletePack,
    getPack,
    folders,
    foldersLoading,
    addFolder,
    updateFolder,
    deleteFolder,
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
