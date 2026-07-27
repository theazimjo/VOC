/**
 * 🪝 useMemoryExperiment — React Hook
 *
 * Manages the full experiment lifecycle. Word data and progress come from
 * usePacks() — the same live source Dashboard/PackDetail/StatsPage read —
 * so a Memory Lab session updates the exact same word record the rest of
 * the app displays, instead of a shadow copy nobody else sees.
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usePacks } from '../hooks/usePacks';
import {
  saveReviewEvent,
  recordConfusionPair,
  getConfusionPairs,
} from './experimentDB';
import { computeRecallProbability, computeClusterCalibration, estimateDifficulty } from '../utils/memoryEngine';
import { classifyWord } from './semanticClassifier';

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useMemoryExperiment() {
  const { user } = useAuth();
  const { allWords: packWords, allWordsLoading } = usePacks();

  const [confusionPairs, setConfusionPairs] = useState([]);
  const [confusionLoading, setConfusionLoading] = useState(true);

  // ── Session state ──────────────────────────────────────────────
  const [session, setSession] = useState(null);          // null | { queue, index, results }

  // ── Confusion pairs (Memory-Lab-only metadata, not part of any word record) ──
  useEffect(() => {
    if (!user) {
      setConfusionPairs([]);
      setConfusionLoading(false);
      return;
    }
    let cancelled = false;
    setConfusionLoading(true);
    getConfusionPairs(user.uid).then((pairs) => {
      if (!cancelled) {
        setConfusionPairs(pairs);
        setConfusionLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [user]);

  // ── Build memory map from the real, shared word records ─────────
  // Includes both canonical field names (reviewCount/lastReviewed/nextReview)
  // and the legacy experiment names (totalReviews/lastReview/nextOptimalReview)
  // as aliases, since memoryEngine.js's generic helpers and the Lab/Insights
  // UI were written against the latter.
  const memoryMap = useMemo(() => {
    const map = {};
    packWords.forEach((w) => {
      const recallHistory = w.recallHistory || [];
      const reviewCount = w.reviewCount || 0;
      const lastReviewed = w.lastReviewed || null;
      const nextReview = w.nextReview || null;

      map[w.id] = {
        wordId: w.id,
        packId: w.packId,
        stability: typeof w.stability === 'number' ? w.stability : 1.0,
        mastery: w.mastery || 0,
        interval: w.interval || 0,
        reviewCount,
        totalReviews: reviewCount,
        lastReviewed,
        lastReview: lastReviewed,
        nextReview,
        nextOptimalReview: nextReview,
        recallHistory,
        difficulty: estimateDifficulty(recallHistory),
        wordData: { word: w.word, translation: w.translation, packName: w.source },
      };
    });
    return map;
  }, [packWords]);

  const allWords = useMemo(
    () => packWords.map((w) => ({
      id: w.id, word: w.word, translation: w.translation, packId: w.packId, packName: w.source,
    })),
    [packWords]
  );

  // ── Prioritized queue of ALL words (Individual Memory Dynamics) ─
  // Sorting criteria:
  //   1. Unreviewed words first (never reviewed)
  //   2. Words past their optimal review date (isDue)
  //   3. Lowest recall probability P(t) = e^(-t/S) first
  const dueWords = useMemo(() => {
    const now = Date.now();
    return Object.values(memoryMap).sort((a, b) => {
      if (!a.lastReviewed && b.lastReviewed) return -1;
      if (a.lastReviewed && !b.lastReviewed) return 1;

      const aDue = !a.nextReview || new Date(a.nextReview) <= now;
      const bDue = !b.nextReview || new Date(b.nextReview) <= now;
      if (aDue && !bDue) return -1;
      if (!aDue && bDue) return 1;

      const daysSinceA = a.lastReviewed ? (now - new Date(a.lastReviewed).getTime()) / 86400000 : 999;
      const daysSinceB = b.lastReviewed ? (now - new Date(b.lastReviewed).getTime()) / 86400000 : 999;
      const pA = Math.exp(-daysSinceA / (a.stability || 1));
      const pB = Math.exp(-daysSinceB / (b.stability || 1));
      return pA - pB;
    });
  }, [memoryMap]);

  const stats = useMemo(() => {
    const all = Object.values(memoryMap);
    if (all.length === 0) {
      return { totalWords: 0, dueCount: 0, avgStability: 0, avgDifficulty: 0, totalReviews: 0 };
    }
    const now = Date.now();
    const due = all.filter((w) => !w.nextReview || new Date(w.nextReview) <= now);
    const avgStability = all.reduce((s, w) => s + (w.stability || 1), 0) / all.length;
    const avgDifficulty = all.reduce((s, w) => s + (w.difficulty || 0.5), 0) / all.length;
    const totalReviews = all.reduce((s, w) => s + (w.reviewCount || 0), 0);
    return {
      totalWords: all.length,
      dueCount: due.length,
      avgStability: Math.round(avgStability * 10) / 10,
      avgDifficulty: Math.round(avgDifficulty * 100) / 100,
      totalReviews,
    };
  }, [memoryMap]);

  const loading = allWordsLoading || confusionLoading;

  // ── Session management ─────────────────────────────────────────

  /**
   * Start a review session with the given list of word memory entries.
   * If `words` is omitted, uses the full due list.
   */
  const startSession = useCallback((words = null) => {
    const queue = (words || dueWords).filter((w) => w.wordData);
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
   * @param {'active_recall'|'passive_recall'} [retrievalType='passive_recall'] - typed answer vs self-judged
   * @returns {Promise<{done:boolean, updatedMemory:Object}>}
   */
  const submitReview = useCallback(async (isCorrect, confidence, responseTime, retrievalType = 'passive_recall') => {
    if (!session || !user) return { done: true };

    const current = session.queue[session.index];
    const wordId = current.wordId;
    const packId = current.packId;
    const wordData = current.wordData;

    // Self-calibrate this word's semantic cluster: compare this user's past
    // predicted-vs-actual outcomes for the cluster to nudge growth up/down.
    const { key: clusterKey } = classifyWord(wordData?.word, wordData?.translation, wordData?.packName);
    const clusterHistory = [];
    Object.values(memoryMap).forEach((m) => {
      if (!m.wordData) return;
      const mKey = classifyWord(m.wordData.word, m.wordData.translation, m.wordData.packName).key;
      if (mKey === clusterKey) clusterHistory.push(...(m.recallHistory || []));
    });
    const clusterMultiplier = computeClusterCalibration(clusterHistory);

    // Save directly onto the real word record
    const updatedMemory = await saveReviewEvent(user.uid, packId, wordId, current, {
      isCorrect,
      confidence,
      responseTime,
      retrievalType,
      clusterMultiplier,
      wordText: wordData?.word,
    });

    const result = {
      wordId,
      word: wordData?.word,
      translation: wordData?.translation,
      isCorrect,
      confidence,
      responseTime,
      newStability: updatedMemory.stability,
    };

    const newResults = [...session.results, result];
    const nextIndex = session.index + 1;
    const done = nextIndex >= session.queue.length;

    setSession((prev) => ({ ...prev, results: newResults, index: nextIndex, finished: done }));

    return { done, updatedMemory };
  }, [session, user, memoryMap]);

  /**
   * Skip the current word (no review recorded).
   */
  const skipWord = useCallback(() => {
    if (!session) return;
    const nextIndex = session.index + 1;
    const done = nextIndex >= session.queue.length;
    setSession((prev) => ({ ...prev, index: nextIndex, finished: done }));
  }, [session]);

  /** End the session and return to the lab. */
  const endSession = useCallback(() => {
    setSession(null);
  }, []);

  /**
   * Report that the user typed an answer close to a *different* word's
   * correct answer — evidence of confusion/interference between the two.
   */
  const reportConfusion = useCallback(async (wordIdA, wordIdB, meta = {}) => {
    if (!user) return;
    await recordConfusionPair(user.uid, wordIdA, wordIdB, meta);
    const pairs = await getConfusionPairs(user.uid);
    setConfusionPairs(pairs);
  }, [user]);

  // ── Current session word ───────────────────────────────────────
  const currentSessionWord = session && !session.finished
    ? session.queue[session.index] || null
    : null;

  // ── Convenience: recall probability for a word right now ───────
  const getRecallNow = useCallback((wordId) => {
    const mem = memoryMap[wordId];
    if (!mem || !mem.lastReviewed) return null;
    const daysSince = (Date.now() - new Date(mem.lastReviewed).getTime()) / (86400 * 1000);
    return computeRecallProbability(mem.stability, daysSince);
  }, [memoryMap]);

  return {
    // Data
    allWords,
    dueWords,
    memoryMap,
    stats,
    confusionPairs,
    loading,
    error: null,
    // Session
    session,
    currentSessionWord,
    startSession,
    submitReview,
    skipWord,
    endSession,
    // Helpers
    getRecallNow,
    reportConfusion,
    refresh: () => {},
  };
}
