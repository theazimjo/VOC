/**
 * Spaced repetition — powered by the Individual Memory Dynamics Engine
 * (see src/utils/memoryEngine.js): P(t) = e^(−t/S), a per-user,
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
 * Passive self-judgement alone (flashcard "Bildim", quiz, match) can't push
 * a word past UNCONFIRMED_MASTERY_CEILING — it needs correct active-recall
 * passes from at least MIN_CONFIRMED_MODES *distinct* angles (tracked via
 * `word.confirmedModes`, tagged by the `options.mode` each call site passes
 * — e.g. 'spelling', 'sentence', 'pronounce', 'dictation') before it's
 * trusted enough to graduate toward 100%. Being able to type a word once in
 * one drill isn't the same as actually knowing it — requiring a second,
 * different kind of production catches words the learner has only
 * memorized the shape of for one specific exercise.
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
  clampStability,
  clampNextReview,
} from './memoryEngine';

const MASTERY_TIME_CONSTANT = 12;

function stabilityToMastery(stability) {
  const pct = 100 * (1 - Math.exp(-Math.max(0, stability) / MASTERY_TIME_CONSTANT));
  return Math.round(Math.max(0, Math.min(100, pct)));
}

// A passive self-judgement ("Bildim" on a flashcard, a quiz guess, a match)
// is too easy to game to fully trust on its own — until a word has survived
// correct *active*-recall trials (typing/spelling/speaking it from memory)
// from at least MIN_CONFIRMED_MODES distinct angles, its growth is capped
// so it can plateau around this ceiling but can't cross into "mastered"
// territory purely on passive exposure or a single lucky drill.
const UNCONFIRMED_MASTERY_CEILING = 65; // %
const UNCONFIRMED_STABILITY_CAP =
  -MASTERY_TIME_CONSTANT * Math.log(1 - UNCONFIRMED_MASTERY_CEILING / 100);

// Number of distinct active-recall angles (spelling, sentence-building,
// pronunciation, dictation, ...) a word must have been correctly recalled
// from before it's trusted to grow toward the full review-interval ceiling.
const MIN_CONFIRMED_MODES = 2;

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
 * Core review-application shared by every practice mode in the app
 * (games, Memory Lab). Takes correctness/confidence as independent inputs
 * — the fidelity the underlying engine already supports — rather than
 * collapsing them into a single 0..5 quality score.
 *
 * @param {Object} word - the word's current progress record
 * @param {Object} options
 * @param {boolean} options.isCorrect
 * @param {number} [options.confidence=3] - 1..5
 * @param {number} [options.responseTimeSec=4]
 * @param {'active_recall'|'passive_recall'} [options.retrievalType='passive_recall']
 * @param {number} [options.clusterMultiplier=1.0] - see computeClusterCalibration
 * @param {string} [options.mode] - identifies *which* active-recall drill this was
 *   (e.g. 'spelling', 'sentence', 'pronounce', 'dictation', 'irregular-verbs') so
 *   distinct angles can be tracked toward MIN_CONFIRMED_MODES. Ignored for
 *   passive_recall reviews.
 */
export function applyReview(word = {}, options = {}) {
  const {
    isCorrect,
    confidence = 3,
    responseTimeSec = 4,
    retrievalType = 'passive_recall',
    clusterMultiplier = 1.0,
    mode = null,
  } = options;

  const revCount = word.reviewCount ?? 0;
  const lastRev = word.lastReviewed ?? null;
  const seedStability = clampStability(
    typeof word.stability === 'number'
      ? word.stability
      : (word.interval > 0 ? word.interval : computeInitialStability())
  );

  const now = new Date();
  const daysSince = daysBetween(lastRev, now);
  const overnight = hadOvernightGap(lastRev, now);

  let newStability = updateStability(seedStability, isCorrect, confidence, responseTimeSec, daysSince, {
    hadOvernightGap: overnight,
    retrievalType: retrievalType === 'active_recall' ? 'active_recall' : 'passive_recall',
    clusterMultiplier,
  });

  const activeRecallPasses =
    (word.activeRecallPasses || 0) + (isCorrect && retrievalType === 'active_recall' ? 1 : 0);

  const confirmedModes = Array.isArray(word.confirmedModes) ? [...word.confirmedModes] : [];
  if (isCorrect && retrievalType === 'active_recall') {
    const tag = mode || 'active_recall';
    if (!confirmedModes.includes(tag)) confirmedModes.push(tag);
  }

  if (confirmedModes.length < MIN_CONFIRMED_MODES) {
    // Never lower stability a word already had (e.g. legacy words reviewed
    // before this field existed) — only stop it from growing further past
    // the ceiling until it earns confirmation from enough distinct angles.
    newStability = Math.min(newStability, Math.max(UNCONFIRMED_STABILITY_CAP, seedStability));
  }

  const clampedConfidence = Math.max(1, Math.min(5, Math.round(confidence) || 1));

  return {
    interval: Math.round(newStability * 10) / 10,
    nextReview: getOptimalReviewDate(newStability).toISOString(),
    reviewCount: revCount + 1,
    mastery: stabilityToMastery(newStability),
    lastReviewed: now.toISOString(),
    quality: isCorrect ? clampedConfidence : Math.min(2, clampedConfidence - 1),
    stability: newStability,
    activeRecallPasses,
    confirmedModes,
  };
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

  return applyReview(word, { isCorrect, confidence, responseTimeSec, retrievalType });
}

/**
 * Get words that are due for review today.
 *
 * Clamps each word's `nextReview` before comparing — a legacy record whose
 * stored date was computed from a since-fixed runaway stability (see
 * clampNextReview) would otherwise never come due, silently vanishing from
 * every practice mode for years instead of just this one review's schedule
 * self-healing on its next actual review.
 */
export function getDueWords(words) {
  const now = new Date();
  return words.filter(word => {
    if (!word.nextReview) return true;
    const clamped = clampNextReview(word.lastReviewed, word.nextReview);
    return new Date(clamped) <= now;
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
    activeRecallPasses: 0,
    confirmedModes: [],
  };
}
