/**
 * 🪝 useMemoryExperiment — React Hook
 *
 * Manages the full experiment lifecycle:
 *   - Loads user's packs and aggregates all words
 *   - Fetches which words are due for review
 *   - Handles session flow (start → review → save → next)
 *   - Exposes stats and per-word memory data
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import {
  getWordsDueForReview,
  getAllWordMemories,
  saveReviewEvent,
  enrollWords,
  getExperimentStats,
} from './experimentDB';
import { computeRecallProbability } from './memoryEngine';

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useMemoryExperiment() {
  const { user } = useAuth();

  // ── State ──────────────────────────────────────────────────────
  const [allWords, setAllWords] = useState([]);          // flat list of {id, word, translation, packId, packName}
  const [dueWords, setDueWords] = useState([]);          // words due for review
  const [memoryMap, setMemoryMap] = useState({});        // wordId → memory state
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Session state ──────────────────────────────────────────────
  const [session, setSession] = useState(null);          // null | { queue, index, results }
  const sessionTimerRef = useRef(null);

  // ── Load all data ──────────────────────────────────────────────
  const loadData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch all packs for metadata lookup
      const packsSnap = await get(ref(db, `users/${user.uid}/packs`));
      const packById = {};
      if (packsSnap.exists()) {
        packsSnap.forEach(s => { packById[s.key] = s.val(); });
      }

      // 2. Fetch all words across all packs/schemas in users/{uid}/words
      const allWordsSnap = await get(ref(db, `users/${user.uid}/words`));
      const flat = [];
      if (allWordsSnap.exists()) {
        allWordsSnap.forEach(snap => {
          const key = snap.key;
          const val = snap.val();
          if (val && typeof val === 'object') {
            if (val.word && val.translation) {
              // Direct single word entry
              flat.push({
                id: key,
                packId: val.packId || 'default',
                packName: packById[val.packId]?.name || 'Kutubxona',
                ...val,
              });
            } else {
              // Pack folder containing word entries
              const pack = packById[key];
              Object.entries(val).forEach(([wId, wVal]) => {
                if (wVal && typeof wVal === 'object' && wVal.word) {
                  flat.push({
                    id: wId,
                    packId: key,
                    packName: pack?.name || pack?.title || 'Kutubxona',
                    ...wVal,
                  });
                }
              });
            }
          }
        });
      }
      setAllWords(flat);

      // 3. Enroll any new words into the experiment
      if (flat.length > 0) {
        await enrollWords(user.uid, flat);
      }

      // 4. Load memory states and stats
      const [memories, s] = await Promise.all([
        getAllWordMemories(user.uid),
        getExperimentStats(user.uid),
      ]);

      // Build memoryMap: wordId → memory state enriched with word data
      const map = {};
      const wordLookup = {};
      flat.forEach(w => { wordLookup[w.id] = w; });

      memories.forEach(m => {
        map[m.wordId] = {
          ...m,
          wordData: wordLookup[m.wordId] || null,
        };
      });
      setMemoryMap(map);

      // 5. Build prioritized queue of ALL enrolled words
      // Sorting criteria (Individual Memory Dynamics):
      //   1. Unreviewed words first (never reviewed)
      //   2. Words past their optimal review date (isDue)
      //   3. Lowest recall probability P(t) = e^(-t/S) first
      const now = Date.now();
      const enrolledQueue = Object.values(map)
        .filter(m => m.wordData !== null)
        .sort((a, b) => {
          // Never reviewed words go to top
          if (!a.lastReview && b.lastReview) return -1;
          if (a.lastReview && !b.lastReview) return 1;

          // Due words go next
          const aDue = !a.nextOptimalReview || new Date(a.nextOptimalReview) <= now;
          const bDue = !b.nextOptimalReview || new Date(b.nextOptimalReview) <= now;
          if (aDue && !bDue) return -1;
          if (!aDue && bDue) return 1;

          // Probability P(t) = e^(-t/S) ascending (most forgotten first)
          const daysSinceA = a.lastReview ? (now - new Date(a.lastReview).getTime()) / 86400000 : 999;
          const daysSinceB = b.lastReview ? (now - new Date(b.lastReview).getTime()) / 86400000 : 999;
          const pA = Math.exp(-daysSinceA / (a.stability || 1));
          const pB = Math.exp(-daysSinceB / (b.stability || 1));
          return pA - pB;
        });

      setDueWords(enrolledQueue);
      setStats(s);
    } catch (err) {
      console.error('[MemoryExperiment] loadData error:', err);
      setError(err.message || 'Ma\'lumotlarni yuklashda xatolik');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // ── Session management ─────────────────────────────────────────

  /**
   * Start a review session with the given list of word memory entries.
   * If `words` is omitted, uses the full due list.
   */
  const startSession = useCallback((words = null) => {
    const queue = (words || dueWords).filter(w => w.wordData);
    if (queue.length === 0) return;

    setSession({
      queue,
      index: 0,
      results: [],
      startedAt: Date.now(),
    });
  }, [dueWords]);

  /**
   * Submit the result of the current word's review.
   *
   * @param {boolean} isCorrect
   * @param {number}  confidence  1–5
   * @param {number}  responseTime seconds
   * @returns {Promise<{done:boolean, updatedMemory:Object}>}
   */
  const submitReview = useCallback(async (isCorrect, confidence, responseTime) => {
    if (!session || !user) return { done: true };

    const current = session.queue[session.index];
    const wordId = current.wordId;

    // Save to Firebase
    const updatedMemory = await saveReviewEvent(user.uid, wordId, {
      isCorrect,
      confidence,
      responseTime,
    });

    // Update local memory map
    setMemoryMap(prev => ({
      ...prev,
      [wordId]: { ...updatedMemory, wordData: current.wordData },
    }));

    const result = {
      wordId,
      word: current.wordData?.word,
      translation: current.wordData?.translation,
      isCorrect,
      confidence,
      responseTime,
      newStability: updatedMemory.stability,
    };

    const newResults = [...session.results, result];
    const nextIndex = session.index + 1;
    const done = nextIndex >= session.queue.length;

    if (done) {
      setSession(prev => ({ ...prev, results: newResults, index: nextIndex, finished: true }));
      // Refresh stats
      getExperimentStats(user.uid).then(setStats);
    } else {
      setSession(prev => ({ ...prev, results: newResults, index: nextIndex }));
    }

    return { done, updatedMemory };
  }, [session, user]);

  /**
   * Skip the current word (no review recorded).
   */
  const skipWord = useCallback(() => {
    if (!session) return;
    const nextIndex = session.index + 1;
    const done = nextIndex >= session.queue.length;
    setSession(prev => ({ ...prev, index: nextIndex, finished: done }));
  }, [session]);

  /** End the session and return to the lab. */
  const endSession = useCallback(() => {
    setSession(null);
    loadData(); // refresh
  }, [loadData]);

  // ── Current session word ───────────────────────────────────────
  const currentSessionWord = session && !session.finished
    ? session.queue[session.index] || null
    : null;

  // ── Convenience: recall probability for a word right now ───────
  const getRecallNow = useCallback((wordId) => {
    const mem = memoryMap[wordId];
    if (!mem || !mem.lastReview) return null;
    const daysSince = (Date.now() - new Date(mem.lastReview).getTime()) / (86400 * 1000);
    return computeRecallProbability(mem.stability, daysSince);
  }, [memoryMap]);

  return {
    // Data
    allWords,
    dueWords,
    memoryMap,
    stats,
    loading,
    error,
    // Session
    session,
    currentSessionWord,
    startSession,
    submitReview,
    skipWord,
    endSession,
    // Helpers
    getRecallNow,
    refresh: loadData,
  };
}
