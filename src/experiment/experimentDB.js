/**
 * 🗄️ Experiment Database Layer
 *
 * All data lives under `experiment/{userId}/words/{wordId}` in Firebase
 * Realtime Database — completely separate from the main `users/` path.
 *
 * Schema per word entry:
 * {
 *   stability:          number,   // S in days
 *   difficulty:         number,   // 0–1
 *   totalReviews:       number,
 *   lastReview:         string,   // ISO date
 *   nextOptimalReview:  string,   // ISO date
 *   recallHistory: [
 *     {
 *       t:            number,   // days since previous review
 *       result:       boolean,  // correct?
 *       responseTime: number,   // seconds to answer
 *       confidence:   number,   // 1–5
 *       ts:           string,   // ISO timestamp of the review
 *     },
 *     …
 *   ]
 * }
 */

import { ref, get, set, update, push, child } from 'firebase/database';
import { db } from '../firebase';
import {
  initWordMemory,
  updateStability,
  getOptimalReviewDate,
  estimateDifficulty,
  isDue,
} from './memoryEngine';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const experimentRef = (userId) =>
  ref(db, `users/${userId}/experiment/words`);

const wordRef = (userId, wordId) =>
  ref(db, `users/${userId}/experiment/words/${wordId}`);

// ─── Read operations ─────────────────────────────────────────────────────────

/**
 * Get memory state for a single word.
 * If the word has never been enrolled, returns freshly initialized state.
 *
 * @param {string} userId
 * @param {string} wordId
 * @returns {Promise<Object>}
 */
export async function getWordMemory(userId, wordId) {
  const snap = await get(wordRef(userId, wordId));
  if (!snap.exists()) return { ...initWordMemory(), wordId };
  return { wordId, ...snap.val(), recallHistory: snap.val().recallHistory || [] };
}

/**
 * Get all word memory states for a user.
 *
 * @param {string} userId
 * @returns {Promise<Array<Object>>}
 */
export async function getAllWordMemories(userId) {
  const snap = await get(experimentRef(userId));
  if (!snap.exists()) return [];

  const results = [];
  snap.forEach(child => {
    results.push({ wordId: child.key, ...child.val(), recallHistory: child.val().recallHistory || [] });
  });
  return results;
}

/**
 * Get words that are due for review right now.
 *
 * @param {string} userId
 * @returns {Promise<Array<Object>>}
 */
export async function getWordsDueForReview(userId) {
  const all = await getAllWordMemories(userId);
  return all.filter(w => isDue(w.nextOptimalReview));
}

/**
 * Get summary stats for the experiment dashboard.
 *
 * @param {string} userId
 * @returns {Promise<Object>}
 */
export async function getExperimentStats(userId) {
  const all = await getAllWordMemories(userId);
  if (all.length === 0) {
    return { totalWords: 0, dueCount: 0, avgStability: 0, avgDifficulty: 0, totalReviews: 0 };
  }

  const due = all.filter(w => isDue(w.nextOptimalReview));
  const avgStability = all.reduce((s, w) => s + (w.stability || 1), 0) / all.length;
  const avgDifficulty = all.reduce((s, w) => s + (w.difficulty || 0.5), 0) / all.length;
  const totalReviews = all.reduce((s, w) => s + (w.totalReviews || 0), 0);

  return {
    totalWords: all.length,
    dueCount: due.length,
    avgStability: Math.round(avgStability * 10) / 10,
    avgDifficulty: Math.round(avgDifficulty * 100) / 100,
    totalReviews,
  };
}

// ─── Write operations ─────────────────────────────────────────────────────────

/**
 * Save a review event and update the word's memory state.
 *
 * @param {string}  userId
 * @param {string}  wordId
 * @param {Object}  reviewData
 * @param {boolean} reviewData.isCorrect
 * @param {number}  reviewData.confidence    - 1–5
 * @param {number}  reviewData.responseTime  - seconds
 * @returns {Promise<Object>} - updated memory state
 */
export async function saveReviewEvent(userId, wordId, reviewData) {
  const { isCorrect, confidence, responseTime } = reviewData;

  // Fetch current state (or init if new)
  const current = await getWordMemory(userId, wordId);

  // Days since last review
  const daysSince = current.lastReview
    ? (Date.now() - new Date(current.lastReview).getTime()) / (86400 * 1000)
    : 0;

  // Compute new stability
  const newStability = updateStability(
    current.stability,
    isCorrect,
    confidence,
    responseTime,
    daysSince
  );

  // Build new history entry (keep last 50 events max)
  const newEntry = {
    t: Math.round(daysSince * 100) / 100,
    result: isCorrect,
    responseTime: Math.round(responseTime * 10) / 10,
    confidence,
    ts: new Date().toISOString(),
  };
  const newHistory = [...(current.recallHistory || []), newEntry].slice(-50);

  // Updated memory state
  const updated = {
    stability: newStability,
    difficulty: estimateDifficulty(newHistory),
    totalReviews: (current.totalReviews || 0) + 1,
    lastReview: new Date().toISOString(),
    nextOptimalReview: getOptimalReviewDate(newStability).toISOString(),
    recallHistory: newHistory,
  };

  await set(wordRef(userId, wordId), updated);
  return { wordId, ...updated };
}

/**
 * Enroll a batch of words into the experiment (creates initial state).
 * Words that already have an entry are skipped.
 *
 * @param {string}   userId
 * @param {Array<{id:string}>} words
 * @returns {Promise<number>} - number of newly enrolled words
 */
export async function enrollWords(userId, words) {
  const snap = await get(experimentRef(userId));
  const existing = snap.exists() ? Object.keys(snap.val()) : [];

  let enrolled = 0;
  for (const word of words) {
    if (!existing.includes(word.id)) {
      await set(wordRef(userId, word.id), initWordMemory());
      enrolled++;
    }
  }
  return enrolled;
}
