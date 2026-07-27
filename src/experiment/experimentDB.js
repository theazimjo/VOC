/**
 * 🗄️ Experiment Database Layer
 *
 * Memory Lab reviews are written straight onto the same word record every
 * other part of the app reads — `users/{uid}/words/{packId}/{wordId}` — via
 * applyReview() from spacedRepetition.js (the same engine PracticePage,
 * CardsMode and MixedPractice use). This used to write to an isolated
 * `users/{uid}/experiment/words/{wordId}` tree instead, so Memory Lab
 * sessions never showed up in Dashboard/Packs/Stats and vice versa.
 *
 * A `recallHistory` array (last 50 events) is kept on the word record
 * itself — extra telemetry (confidence, response time, retrieval type,
 * predicted-recall-at-review-time) that MemoryInsights' forgetting-curve
 * view and the per-cluster self-calibration need, but that the rest of the
 * app doesn't read.
 */

import { ref, update, get, runTransaction } from 'firebase/database';
import { db } from '../firebase';
import { applyReview } from '../utils/spacedRepetition';
import { computeRecallProbability } from '../utils/memoryEngine';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const wordRef = (userId, packId, wordId) =>
  ref(db, `users/${userId}/words/${packId}/${wordId}`);

/** Normalize an English word into a safe, stable Realtime Database key. */
function normalizeWordKey(text) {
  const key = (text || '').trim().toLowerCase().replace(/[^a-z]/g, '');
  return key || 'unknown';
}

const globalWordStatsRef = (wordText) => ref(db, `globalWordStats/${normalizeWordKey(wordText)}`);

// ─── Write operations ─────────────────────────────────────────────────────────

/**
 * Save a review event: updates the real word's progress fields
 * (mastery/interval/reviewCount/nextReview/lastReviewed/stability) and
 * appends to its recallHistory.
 *
 * @param {string}  userId
 * @param {string}  packId
 * @param {string}  wordId
 * @param {Object}  currentWord - current word record (from usePacks().allWords)
 * @param {Object}  reviewData
 * @param {boolean} reviewData.isCorrect
 * @param {number}  reviewData.confidence    - 1–5
 * @param {number}  reviewData.responseTime  - seconds
 * @param {'active_recall'|'passive_recall'} [reviewData.retrievalType='passive_recall']
 * @param {number}  [reviewData.clusterMultiplier=1.0] - from computeClusterCalibration
 * @param {string}  [reviewData.wordText] - the English word, used to update population-level stats
 * @returns {Promise<Object>} - updated word progress fields (merged with wordId/packId)
 */
export async function saveReviewEvent(userId, packId, wordId, currentWord, reviewData) {
  const {
    isCorrect,
    confidence,
    responseTime,
    retrievalType = 'passive_recall',
    clusterMultiplier = 1.0,
    wordText = '',
  } = reviewData;

  const lastRev = currentWord.lastReviewed ?? null;
  const seedStability = typeof currentWord.stability === 'number'
    ? currentWord.stability
    : (currentWord.interval > 0 ? currentWord.interval : 1.0);
  const daysSince = lastRev ? (Date.now() - new Date(lastRev).getTime()) / (86400 * 1000) : 0;

  // Predicted recall probability right before this review — stored so future
  // reviews can self-calibrate the model (see computeClusterCalibration).
  const predictedP = lastRev ? computeRecallProbability(seedStability, daysSince) : null;

  const updatedFields = applyReview(currentWord, {
    isCorrect,
    confidence,
    responseTimeSec: responseTime,
    retrievalType,
    clusterMultiplier,
  });

  const newEntry = {
    t: Math.round(daysSince * 100) / 100,
    result: isCorrect,
    responseTime: Math.round(responseTime * 10) / 10,
    confidence,
    ts: updatedFields.lastReviewed,
    retrievalType,
    ...(predictedP !== null ? { predictedP: Math.round(predictedP * 1000) / 1000 } : {}),
  };
  const newHistory = [...(currentWord.recallHistory || []), newEntry].slice(-50);

  const updated = { ...updatedFields, recallHistory: newHistory };

  await update(wordRef(userId, packId, wordId), updated);

  // Best-effort: contribute this outcome to the population-level word-difficulty index.
  if (wordText) {
    updateGlobalWordStats(wordText, isCorrect).catch(err =>
      console.warn('[MemoryExperiment] global stats update failed:', err)
    );
  }

  return { wordId, packId, ...updated };
}

// ─── Population-level word difficulty (cold-start prior) ─────────────────────

/**
 * Increment the population-level counters for a word after a review.
 * Uses a transaction so concurrent reviewers don't clobber each other.
 *
 * @param {string} wordText
 * @param {boolean} isCorrect
 */
export async function updateGlobalWordStats(wordText, isCorrect) {
  if (!wordText) return;
  await runTransaction(globalWordStatsRef(wordText), (curr) => {
    const c = curr || { totalReviews: 0, totalCorrect: 0 };
    return {
      totalReviews: (c.totalReviews || 0) + 1,
      totalCorrect: (c.totalCorrect || 0) + (isCorrect ? 1 : 0),
    };
  });
}

// ─── Confusion pairs ───────────────────────────────────────────────────────

const confusionPairKey = (idA, idB) => [idA, idB].sort().join('__');

/**
 * Record (or increment) a confusion pair — evidence that the user typed an
 * answer close to a *different* word's correct answer.
 *
 * @param {string} userId
 * @param {string} wordIdA
 * @param {string} wordIdB
 * @param {Object} [meta] - optional {wordA, wordB, translationA, translationB} for display without extra lookups
 */
export async function recordConfusionPair(userId, wordIdA, wordIdB, meta = {}) {
  if (!userId || !wordIdA || !wordIdB || wordIdA === wordIdB) return;
  const key = confusionPairKey(wordIdA, wordIdB);
  const pairRef = ref(db, `users/${userId}/experiment/confusionPairs/${key}`);
  await runTransaction(pairRef, (curr) => {
    const c = curr || { wordIdA, wordIdB, count: 0, ...meta };
    return { ...c, ...meta, count: (c.count || 0) + 1, lastSeen: new Date().toISOString() };
  });
}

/**
 * Get all recorded confusion pairs for a user, sorted by frequency.
 *
 * @param {string} userId
 * @returns {Promise<Array<Object>>}
 */
export async function getConfusionPairs(userId) {
  const snap = await get(ref(db, `users/${userId}/experiment/confusionPairs`));
  if (!snap.exists()) return [];
  const results = [];
  snap.forEach(child => results.push({ key: child.key, ...child.val() }));
  return results.sort((a, b) => (b.count || 0) - (a.count || 0));
}
