/**
 * Spaced repetition — powered by the Individual Memory Dynamics Engine
 * (see src/experiment/memoryEngine.js): P(t) = e^(−t/S), a per-user,
 * per-word forgetting curve, instead of SM-2's fixed ease-factor formula.
 *
 * This used to be gated behind the "Memory Lab" experiment; it is now the
 * default algorithm for every word in the app.
 *
 * `options.retrievalType` ('active_recall' | 'passive_recall', default
 * passive) lets call sites that genuinely make the user produce the answer
 * from memory — typing a spelling, building a sentence, speaking aloud —
 * get credit for the testing/generation effect. `options.responseTimeSec`
 * lets call sites that track a real timer feed it into the fast/slow
 * response bonus instead of the neutral default.
 *
 * Backward compatibility: existing word records only have
 * {interval, reviewCount, nextReview, mastery, lastReviewed} (no
 * `stability` yet). The first time such a word is reviewed under this
 * engine, stability is seeded from the old `interval` (a reasonable proxy —
 * it already approximated "days until this word is forgotten"), so nobody's
 * progress resets to zero.
 */

import {
  updateStability,
  getOptimalReviewDate,
  computeInitialStability,
} from '../experiment/memoryEngine';

function stabilityToMastery(stability) {
  const pct = 100 * (1 - Math.exp(-Math.max(0, stability) / 12));
  return Math.round(Math.max(0, Math.min(100, pct)));
}

function daysBetween(fromISO, toDate) {
  if (!fromISO) return 0;
  const diffMs = toDate.getTime() - new Date(fromISO).getTime();
  return Math.max(0, diffMs / (24 * 60 * 60 * 1000));
}

function hadOvernightGap(fromISO, toDate) {
  if (!fromISO) return false;
  return new Date(fromISO).toDateString() !== toDate.toDateString();
}

/**
 * @param {number} quality - 0..5 (>=3 counts as a correct recall)
 * @param {Object} word - the word's current progress record
 * @param {Object} [options]
 * @param {'active_recall'|'passive_recall'} [options.retrievalType='passive_recall']
 * @param {number} [options.responseTimeSec=4]
 */
export function calculateNextReview(quality, word = {}, options = {}) {
  const { retrievalType = 'passive_recall', responseTimeSec = 4 } = options;

  quality = Math.max(0, Math.min(5, Math.round(quality)));
  const isCorrect = quality >= 3;
  const confidence = Math.max(1, Math.min(5, quality || 1));

  const revCount = word.reviewCount ?? 0;
  const lastRev = word.lastReviewed ?? null;
  const seedStability = typeof word.stability === 'number'
    ? word.stability
    : (word.interval > 0 ? word.interval : computeInitialStability());

  const now = new Date();
  const daysSince = daysBetween(lastRev, now);
  const overnight = hadOvernightGap(lastRev, now);

  const newStability = updateStability(seedStability, isCorrect, confidence, responseTimeSec, daysSince, {
    hadOvernightGap: overnight,
    retrievalType: retrievalType === 'active_recall' ? 'active_recall' : 'passive_recall',
    clusterMultiplier: 1.0,
  });

  return {
    interval: Math.round(newStability * 10) / 10,
    nextReview: getOptimalReviewDate(newStability).toISOString(),
    reviewCount: revCount + 1,
    mastery: stabilityToMastery(newStability),
    lastReviewed: now.toISOString(),
    quality,
    stability: newStability,
  };
}

/**
 * Get words that are due for review today
 */
export function getDueWords(words) {
  const now = new Date();
  return words.filter(word => {
    if (!word.nextReview) return true;
    return new Date(word.nextReview) <= now;
  });
}

/**
 * Get mastery level label
 */
export function getMasteryLevel(mastery) {
  if (mastery >= 90) return { label: "O'zlashtirilgan", color: 'var(--success)', icon: '🏆' };
  if (mastery >= 70) return { label: "Yaxshi", color: 'var(--accent-3)', icon: '⭐' };
  if (mastery >= 50) return { label: "O'rtacha", color: 'var(--accent-2)', icon: '📈' };
  if (mastery >= 25) return { label: "Boshlanish", color: 'var(--warning)', icon: '🌱' };
  return { label: "Yangi", color: 'var(--text-muted)', icon: '🆕' };
}

/**
 * Map user response to a quality rating.
 * "easy" -> 5, "good" -> 4, "hard" -> 3, "again" -> 1
 */
export function responseToQuality(response) {
  const map = {
    'easy': 5,
    'good': 4,
    'hard': 3,
    'again': 1
  };
  return map[response] ?? 3;
}

/**
 * Initialize progress data for a new word
 */
export function initWordProgress() {
  return {
    mastery: 0,
    interval: 0,
    reviewCount: 0,
    nextReview: null,
    lastReviewed: null,
    stability: computeInitialStability(),
  };
}
