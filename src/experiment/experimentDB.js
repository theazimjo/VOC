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

import { ref, get, set, update, push, child, runTransaction } from 'firebase/database';
import { db } from '../firebase';
import {
  initWordMemory,
  updateStability,
  getOptimalReviewDate,
  estimateDifficulty,
  isDue,
  computeCategoryMastery,
  computeRecallProbability,
  computeGlobalDifficultyAdjustment,
} from './memoryEngine';
import { classifyWord } from './semanticClassifier';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const experimentRef = (userId) =>
  ref(db, `users/${userId}/experiment/words`);

const wordRef = (userId, wordId) =>
  ref(db, `users/${userId}/experiment/words/${wordId}`);

/** Normalize an English word into a safe, stable Realtime Database key. */
function normalizeWordKey(text) {
  const key = (text || '').trim().toLowerCase().replace(/[^a-z]/g, '');
  return key || 'unknown';
}

const globalWordStatsRef = (wordText) => ref(db, `globalWordStats/${normalizeWordKey(wordText)}`);

/**
 * Skip the global-stats lookup for very large enroll batches (e.g. bulk
 * import) to avoid firing hundreds of individual reads at once.
 */
const MAX_GLOBAL_LOOKUP_BATCH = 100;

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
 * @param {'active_recall'|'passive_recall'} [reviewData.retrievalType='passive_recall']
 * @param {number}  [reviewData.clusterMultiplier=1.0] - from computeClusterCalibration
 * @param {string}  [reviewData.wordText] - the English word, used to update population-level stats
 * @returns {Promise<Object>} - updated memory state
 */
export async function saveReviewEvent(userId, wordId, reviewData) {
  const {
    isCorrect,
    confidence,
    responseTime,
    retrievalType = 'passive_recall',
    clusterMultiplier = 1.0,
    wordText = '',
  } = reviewData;

  // Fetch current state (or init if new)
  const current = await getWordMemory(userId, wordId);

  // Days since last review
  const daysSince = current.lastReview
    ? (Date.now() - new Date(current.lastReview).getTime()) / (86400 * 1000)
    : 0;

  // Predicted recall probability right before this review — stored so future
  // reviews can self-calibrate the model (see computeClusterCalibration).
  const predictedP = current.lastReview
    ? computeRecallProbability(current.stability, daysSince)
    : null;

  // Sleep-dependent consolidation: did at least one local calendar day pass?
  const hadOvernightGap = !!current.lastReview &&
    new Date(current.lastReview).toDateString() !== new Date().toDateString();

  // Compute new stability
  const newStability = updateStability(
    current.stability,
    isCorrect,
    confidence,
    responseTime,
    daysSince,
    { hadOvernightGap, retrievalType, clusterMultiplier }
  );

  // Build new history entry (keep last 50 events max)
  const newEntry = {
    t: Math.round(daysSince * 100) / 100,
    result: isCorrect,
    responseTime: Math.round(responseTime * 10) / 10,
    confidence,
    ts: new Date().toISOString(),
    retrievalType,
    ...(predictedP !== null ? { predictedP: Math.round(predictedP * 1000) / 1000 } : {}),
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

  // Best-effort: contribute this outcome to the population-level word-difficulty index.
  if (wordText) {
    updateGlobalWordStats(wordText, isCorrect).catch(err =>
      console.warn('[MemoryExperiment] global stats update failed:', err)
    );
  }

  return { wordId, ...updated };
}

// ─── Population-level word difficulty (cold-start prior) ─────────────────────

/**
 * Fetch aggregate cross-user statistics for a word (accuracy across everyone
 * who has reviewed it), used to give brand-new words a smarter starting
 * stability instead of always assuming "average difficulty".
 *
 * @param {string} wordText
 * @returns {Promise<{totalReviews:number, totalCorrect:number}|null>}
 */
export async function getGlobalWordStats(wordText) {
  if (!wordText) return null;
  const snap = await get(globalWordStatsRef(wordText));
  return snap.exists() ? snap.val() : null;
}

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

/**
 * Enroll a batch of words into the experiment (creates initial state).
 * Calculates semantic category mastery per semantic cluster so newly added words in
 * mastered topics/POS categories get context-aware initial stability boosts!
 *
 * @param {string}   userId
 * @param {Array<{id:string, word?:string, translation?:string, packName?:string}>} words
 * @returns {Promise<number>} - number of newly enrolled words
 */
export async function enrollWords(userId, words) {
  const snap = await get(experimentRef(userId));
  const existing = snap.exists() ? snap.val() : {};

  // Group existing word memories by semantic cluster key
  const clusterMemoriesMap = {};
  Object.entries(existing).forEach(([wId, mVal]) => {
    const matched = words.find(w => w.id === wId);
    const { key } = classifyWord(matched?.word || '', matched?.translation || '', matched?.packName || '');
    if (!clusterMemoriesMap[key]) clusterMemoriesMap[key] = [];
    clusterMemoriesMap[key].push({ wordId: wId, ...mVal });
  });

  // Calculate mastery score per semantic cluster
  const clusterMasteryMap = {};
  Object.entries(clusterMemoriesMap).forEach(([key, mList]) => {
    const { mastery } = computeCategoryMastery(mList);
    clusterMasteryMap[key] = mastery;
  });

  const newWords = words.filter(w => !existing[w.id]);

  // Look up population-level difficulty stats for the newly enrolled words
  // (cold-start prior). Skipped for very large batches to avoid a read storm.
  let globalStatsMap = {};
  if (newWords.length > 0 && newWords.length <= MAX_GLOBAL_LOOKUP_BATCH) {
    const statsResults = await Promise.all(
      newWords.map(w => getGlobalWordStats(w.word || ''))
    );
    newWords.forEach((w, i) => { globalStatsMap[w.id] = statsResults[i]; });
  }

  const updates = {};
  let enrolled = 0;

  for (const word of newWords) {
    const { key } = classifyWord(word.word || '', word.translation || '', word.packName || '');
    const categoryMastery = clusterMasteryMap[key] || 0;
    const globalAdjustment = computeGlobalDifficultyAdjustment(globalStatsMap[word.id]);
    updates[word.id] = initWordMemory(categoryMastery, globalAdjustment);
    enrolled++;
  }

  if (enrolled > 0) {
    await update(experimentRef(userId), updates);
  }

  return enrolled;
}
