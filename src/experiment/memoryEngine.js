/**
 * 🧠 Individual Memory Dynamics Engine
 *
 * Model: P(t) = e^(−t / S)
 *
 *   P(t) — recall probability at time t after last review
 *   t     — days since last review
 *   S     — memory stability (days); unique per user×word pair
 *
 * Unlike SM-2 which schedules reviews at fixed intervals,
 * this engine tracks the *shape* of each person's forgetting curve
 * and learns their individual memory characteristics over time.
 */

// ─── Constants ───────────────────────────────────────────────────────────────

/** Default stability for a brand-new word (1 day = forgets quickly) */
const INITIAL_STABILITY = 1.0;

/** Target recall probability for scheduling the next review (75%) */
const TARGET_RECALL = 0.75;

/** Stability growth multiplier base on a successful review */
const STABILITY_GROWTH_BASE = 0.35;

/** Stability decay factor on a failed review */
const STABILITY_DECAY = 0.5;

/** Fast response threshold (seconds) — boosts confidence bonus */
const FAST_RESPONSE_SEC = 2.5;

/** Slow response threshold (seconds) — reduces confidence bonus */
const SLOW_RESPONSE_SEC = 7.0;

// ─── Core functions ──────────────────────────────────────────────────────────

/**
 * Compute P(Recall) using the exponential forgetting curve.
 *
 * @param {number} stability  - S value in days
 * @param {number} daysSince  - days elapsed since last review
 * @returns {number}           - probability in [0, 1]
 */
export function computeRecallProbability(stability, daysSince) {
  if (daysSince <= 0) return 1.0;
  if (stability <= 0) return 0.0;
  return Math.exp(-daysSince / stability);
}

/**
 * Update stability after a review event.
 *
 * Algorithm (simplified DSR — Difficulty, Stability, Retrievability):
 *   - Correct:   S_new = S_old × (1 + α × confidence_bonus)
 *   - Incorrect: S_new = S_old × STABILITY_DECAY
 *
 * α depends on:
 *   - confidence rating (1–5)
 *   - response time (fast boosts, slow penalises)
 *
 * @param {number} currentS        - current stability (days)
 * @param {boolean} isCorrect      - whether recall was successful
 * @param {number} confidence      - user's self-rating 1–5
 * @param {number} responseTimeSec - seconds to answer
 * @param {number} daysSince       - days since last review (for retrievability)
 * @returns {number}                - new stability (days)
 */
export function updateStability(
  currentS,
  isCorrect,
  confidence = 3,
  responseTimeSec = 4,
  daysSince = 0
) {
  const S = Math.max(currentS, 0.1);

  if (!isCorrect) {
    // Failed recall — stability decays significantly
    return Math.max(S * STABILITY_DECAY, 0.1);
  }

  // ── Confidence bonus (0.0 → 1.0) ──────────────────────────────
  // confidence 1 → -0.4, 3 → 0.0, 5 → +0.4
  const confBonus = ((confidence - 3) / 2) * 0.4;

  // ── Response time bonus ────────────────────────────────────────
  let timeBonus = 0;
  if (responseTimeSec < FAST_RESPONSE_SEC) timeBonus = 0.2;
  else if (responseTimeSec > SLOW_RESPONSE_SEC) timeBonus = -0.1;

  // ── Retrievability factor ──────────────────────────────────────
  // Reviewing when memory is already weak → bigger stability gain
  const retrievability = computeRecallProbability(S, daysSince);
  const retrievabilityBonus = (1 - retrievability) * 0.3; // 0 → 0.3

  // ── Total growth factor ────────────────────────────────────────
  const alpha = Math.max(
    0.05,
    STABILITY_GROWTH_BASE + confBonus + timeBonus + retrievabilityBonus
  );

  const S_new = S * (1 + alpha);
  return Math.round(S_new * 100) / 100;
}

/**
 * Calculate the optimal next review date.
 *
 * Solves: P(t) = TARGET_RECALL → t = −S × ln(TARGET_RECALL)
 *
 * @param {number} stability - S in days
 * @param {number} [targetRecall=TARGET_RECALL]
 * @returns {Date} - UTC date of the optimal next review
 */
export function getOptimalReviewDate(stability, targetRecall = TARGET_RECALL) {
  const t = -stability * Math.log(targetRecall); // days until target recall
  const ms = t * 24 * 60 * 60 * 1000;
  return new Date(Date.now() + ms);
}

/**
 * Compute recall probability at several future checkpoints.
 * Useful for rendering the forgetting curve graph.
 *
 * @param {number} stability
 * @returns {Array<{label:string, days:number, probability:number}>}
 */
export function getForgettingCurvePoints(stability) {
  const checkpoints = [
    { label: 'Hozir', days: 0 },
    { label: '1 kun', days: 1 },
    { label: '3 kun', days: 3 },
    { label: '7 kun', days: 7 },
    { label: '14 kun', days: 14 },
    { label: '30 kun', days: 30 },
  ];
  return checkpoints.map(cp => ({
    ...cp,
    probability: computeRecallProbability(stability, cp.days),
  }));
}

/**
 * Estimate overall word difficulty based on review history.
 * Returns a value in [0, 1] where 1 = very difficult.
 *
 * @param {Array<{result:boolean}>} history - array of review events
 * @returns {number}
 */
export function estimateDifficulty(history) {
  if (!history || history.length === 0) return 0.5;
  const recentN = Math.min(history.length, 10);
  const recent = history.slice(-recentN);
  const failures = recent.filter(h => !h.result).length;
  return Math.round((failures / recentN) * 100) / 100;
}

/**
 * Determine whether a word is due for review right now.
 *
 * @param {string|null} nextOptimalReview - ISO date string
 * @returns {boolean}
 */
export function isDue(nextOptimalReview) {
  if (!nextOptimalReview) return true;
  return new Date(nextOptimalReview) <= new Date();
}

/**
 * Initialize fresh memory state for a new word entry with optional category context.
 *
 * @param {number} [categoryMastery=0]
 * @returns {Object}
 */
export function initWordMemory(categoryMastery = 0) {
  const initialS = computeInitialStability(categoryMastery);
  return {
    stability: initialS,
    difficulty: Math.max(0.1, 0.5 - categoryMastery * 0.3),
    totalReviews: 0,
    lastReview: null,
    nextOptimalReview: null, // null = never reviewed → due immediately
    recallHistory: [],
    contextBoost: Math.round(categoryMastery * 100),
  };
}

/**
 * Compute semantic category / pack mastery score M_cat ∈ [0, 1].
 *
 * M_cat is derived from:
 *   - Average stability of existing words in the category (S_cat)
 *   - Historical accuracy rate across all reviews in the category (R_cat)
 *
 * @param {Array<Object>} packMemories - list of word memory objects in this pack
 * @returns {{ mastery: number, avgStability: number, accuracyRate: number }}
 */
export function computeCategoryMastery(packMemories) {
  if (!packMemories || packMemories.length === 0) {
    return { mastery: 0, avgStability: INITIAL_STABILITY, accuracyRate: 0.5 };
  }

  const reviewed = packMemories.filter(m => (Number(m.totalReviews) || 0) > 0);
  if (reviewed.length === 0) {
    return { mastery: 0, avgStability: INITIAL_STABILITY, accuracyRate: 0.5 };
  }

  const avgS = reviewed.reduce((sum, m) => sum + (Number(m.stability) || INITIAL_STABILITY), 0) / reviewed.length;
  const stabilityFactor = Math.min(1.0, avgS / 15);

  let totalReviews = 0;
  let correctReviews = 0;
  reviewed.forEach(m => {
    (m.recallHistory || []).forEach(h => {
      totalReviews++;
      if (h.result) correctReviews++;
    });
  });
  const accuracyRate = totalReviews > 0 ? correctReviews / totalReviews : 0.5;

  const mastery = Math.round((0.6 * stabilityFactor + 0.4 * accuracyRate) * 100) / 100;

  return {
    mastery: isNaN(mastery) ? 0 : mastery,
    avgStability: isNaN(avgS) ? 1.0 : Math.round(avgS * 10) / 10,
    accuracyRate: isNaN(accuracyRate) ? 0.5 : Math.round(accuracyRate * 100) / 100,
  };
}

/**
 * Compute context-aware initial stability (S_0) for a newly enrolled word
 * based on the user's category/pack mastery score.
 *
 * Formula: S_0 = INITIAL_STABILITY × (1 + 2.5 × categoryMastery)
 *
 * @param {number} categoryMastery - category mastery score in [0, 1]
 * @returns {number} - initial stability in days
 */
export function computeInitialStability(categoryMastery = 0) {
  const boost = Math.max(0, Math.min(1.0, categoryMastery));
  const s0 = INITIAL_STABILITY * (1 + 2.5 * boost);
  return Math.round(s0 * 100) / 100;
}

/**
 * Compute a human-readable memory health label.
 *
 * @param {number} stability
 * @param {string|null} nextOptimalReview
 * @returns {{ label:string, color:string, icon:string }}
 */
export function getMemoryHealth(stability, nextOptimalReview) {
  if (!nextOptimalReview) return { label: "Yangi", color: '#8b8fa8', icon: '🆕' };
  const daysUntil = (new Date(nextOptimalReview) - Date.now()) / (86400 * 1000);
  if (stability >= 20) return { label: "Kuchli xotira", color: '#34d399', icon: '💪' };
  if (stability >= 10) return { label: "Yaxshi", color: '#60a5fa', icon: '⭐' };
  if (stability >= 5)  return { label: "O'rtacha", color: '#f59e0b', icon: '📈' };
  return { label: "Zaif xotira", color: '#f87171', icon: '🌱' };
}
