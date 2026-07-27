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
      // 1. Fetch all packs
      const packsSnap = await get(ref(db, `users/${user.uid}/packs`));
      const packs = [];
      if (packsSnap.exists()) {
        packsSnap.forEach(s => packs.push({ id: s.key, ...s.val() }));
      }

      // 2. Fetch all words across packs
      const flat = [];
      for (const pack of packs) {
        const wordsSnap = await get(ref(db, `users/${user.uid}/words/${pack.id}`));
        if (wordsSnap.exists()) {
          wordsSnap.forEach(ws => {
            flat.push({
              id: ws.key,
              packId: pack.id,
              packName: pack.name || pack.title || 'To\'plam',
              ...ws.val(),
            });
          });
        }
      }
      setAllWords(flat);

      // 3. Enroll any new words into the experiment
      if (flat.length > 0) {
        await enrollWords(user.uid, flat);
      }

      // 4. Load memory states and due words
      const [memories, due, s] = await Promise.all([
        getAllWordMemories(user.uid),
        getWordsDueForReview(user.uid),
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

      // Enrich due words with word data, sorted by urgency:
      // lowest P(Recall) first → most-forgotten words reviewed first
      const now = Date.now();
      const enrichedDue = due
        .map(m => ({
          ...m,
          wordData: wordLookup[m.wordId] || null,
        }))
        .filter(m => m.wordData !== null)
        .sort((a, b) => {
          const daysSinceA = a.lastReview ? (now - new Date(a.lastReview).getTime()) / 86400000 : 999;
          const daysSinceB = b.lastReview ? (now - new Date(b.lastReview).getTime()) / 86400000 : 999;
          const pA = Math.exp(-daysSinceA / (a.stability || 1));
          const pB = Math.exp(-daysSinceB / (b.stability || 1));
          return pA - pB; // ascending: most forgotten first
        });

      setDueWords(enrichedDue);
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
