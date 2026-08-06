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

/**
 * Sleep-dependent consolidation bonus — reviews separated by at least one
 * overnight gap (a local calendar-day boundary) get a stability boost, since
 * sleep-based memory consolidation is well documented in the literature and
 * is not modelled by fixed-interval schedulers like SM-2.
 */
const SLEEP_BONUS = 0.15;

/**
 * Retrieval-type bonus (testing/generation effect). Actively producing the
 * answer from memory (typing it) is a "desirable difficulty" that strengthens
 * the memory trace more than passively self-judging a shown answer.
 */
const RETRIEVAL_TYPE_BONUS = { active_recall: 0.15, passive_recall: 0 };

/** Bounds for the per-cluster self-calibration multiplier (see computeClusterCalibration). */
const CALIBRATION_MIN = 0.7;
const CALIBRATION_MAX = 1.4;

/**
 * Minimum sample size before a calibration is trusted over the neutral
 * default. Lowered from 8 now that the topic catalog (semanticClassifier.js)
 * has grown from 5 to 15 clusters — more clusters means fewer reviews land
 * in each one, so calibration needs to kick in on a smaller sample or it
 * would rarely reach trust for most users' pack sizes.
 */
const MIN_CALIBRATION_SAMPLES = 5;

/** A word must have been seen at least this many times before active recall is even offered — you cannot retrieve a trace that was never formed. */
const AUTO_TYPED_MIN_REVIEWS = 1;

/** Stability below this (days) counts as "weak" — a prime target for the testing effect. */
const AUTO_TYPED_WEAK_STABILITY = 5;

/** Fraction of already-strong words that are still sampled into active recall, so the app collects unbiased comparison data instead of only ever testing weak words. */
const AUTO_TYPED_RANDOM_SAMPLE_RATE = 0.18;

/**
 * Automatically infers user confidence (1–5) based on response speed (seconds).
 *
 * @param {number} responseTimeSec
 * @param {boolean} isCorrect
 * @returns {number} confidence 1..5
 */
export function inferConfidenceFromSpeed(responseTimeSec, isCorrect) {
  if (!isCorrect) return 1;
  if (responseTimeSec < 2.5) return 5;
  if (responseTimeSec < 5.0) return 4;
  if (responseTimeSec < 8.0) return 3;
  return 2;
}

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
 * A word's stored `mastery` is a snapshot taken at the moment of its last
 * review — it never moves on its own, so a word left untouched after
 * hitting 100% would stay frozen at 100% forever, even as the underlying
 * memory trace decays. This scales that snapshot by the current
 * retrievability (same forgetting curve as computeRecallProbability) so
 * "mastered" reflects what the learner can actually recall *right now*,
 * decaying back down the longer a word goes unreviewed and snapping back
 * up on the next successful review.
 *
 * @param {Object} word
 * @param {number} [word.mastery]
 * @param {number} [word.stability]
 * @param {string} [word.lastReviewed] - ISO date
 * @param {number} [now] - injectable for tests
 * @returns {number} decayed mastery, 0-100
 */
export function getDecayedMastery(word = {}, now = Date.now()) {
  const storedMastery = typeof word.mastery === 'number' ? word.mastery : 0;
  if (storedMastery <= 0 || !word.lastReviewed) return storedMastery;

  const stability = typeof word.stability === 'number' && word.stability > 0 ? word.stability : 1.0;
  const daysSince = (now - new Date(word.lastReviewed).getTime()) / (24 * 60 * 60 * 1000);
  const retrievability = computeRecallProbability(stability, daysSince);

  return Math.round(storedMastery * retrievability);
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
 *   - overnight sleep consolidation (options.hadOvernightGap)
 *   - retrieval type — active production vs passive self-judgement (options.retrievalType)
 *   - per-cluster self-calibration multiplier (options.clusterMultiplier)
 *
 * @param {number} currentS        - current stability (days)
 * @param {boolean} isCorrect      - whether recall was successful
 * @param {number} confidence      - user's self-rating 1–5
 * @param {number} responseTimeSec - seconds to answer
 * @param {number} daysSince       - days since last review (for retrievability)
 * @param {Object} [options]
 * @param {boolean} [options.hadOvernightGap=false]      - at least one local-midnight boundary crossed since last review
 * @param {'active_recall'|'passive_recall'} [options.retrievalType='passive_recall']
 * @param {number} [options.clusterMultiplier=1.0]       - output of computeClusterCalibration for this word's cluster
 * @returns {number}                - new stability (days)
 */
export function updateStability(
  currentS,
  isCorrect,
  confidence = 3,
  responseTimeSec = 4,
  daysSince = 0,
  options = {}
) {
  const {
    hadOvernightGap = false,
    retrievalType = 'passive_recall',
    clusterMultiplier = 1.0,
  } = options;

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

  // ── Sleep-dependent consolidation bonus ─────────────────────────
  const sleepBonus = hadOvernightGap ? SLEEP_BONUS : 0;

  // ── Testing/generation effect bonus ─────────────────────────────
  const retrievalBonus = RETRIEVAL_TYPE_BONUS[retrievalType] ?? 0;

  // ── Total growth factor ────────────────────────────────────────
  const rawAlpha = Math.max(
    0.05,
    STABILITY_GROWTH_BASE + confBonus + timeBonus + retrievabilityBonus + sleepBonus + retrievalBonus
  );

  // ── Per-cluster self-calibration ────────────────────────────────
  // Nudges growth up/down based on how well past predictions in this
  // semantic cluster matched this user's actual outcomes.
  const boundedMultiplier = Math.max(CALIBRATION_MIN, Math.min(CALIBRATION_MAX, clusterMultiplier || 1.0));
  const alpha = rawAlpha * boundedMultiplier;

  const S_new = S * (1 + alpha);
  return Math.round(S_new * 100) / 100;
}

/**
 * Self-calibrate the growth rate for a semantic cluster by comparing this
 * user's *predicted* recall probability (stored per review as `predictedP`)
 * against what *actually* happened.
 *
 * If actual accuracy in the cluster consistently exceeds what the model
 * predicted, the user is retaining that kind of word better than modelled —
 * so future growth in that cluster is nudged up (and vice-versa). This is
 * what makes the engine adapt per user × per semantic cluster instead of
 * using one fixed global formula for everybody.
 *
 * @param {Array<{predictedP:number, result:boolean}>} historyEntries - review events from all words in one cluster
 * @returns {number} multiplier in [CALIBRATION_MIN, CALIBRATION_MAX], 1.0 = no adjustment yet
 */
export function computeClusterCalibration(historyEntries) {
  const withP = (historyEntries || []).filter(e => typeof e.predictedP === 'number');
  if (withP.length < MIN_CALIBRATION_SAMPLES) return 1.0;

  const avgPredicted = withP.reduce((sum, e) => sum + e.predictedP, 0) / withP.length;
  const actualAccuracy = withP.filter(e => e.result).length / withP.length;
  if (avgPredicted <= 0.02) return 1.0;

  const ratio = actualAccuracy / avgPredicted;
  return Math.round(Math.max(CALIBRATION_MIN, Math.min(CALIBRATION_MAX, ratio)) * 100) / 100;
}

/**
 * Decide, automatically and per word, whether this review should be an
 * active-recall (typed) trial or a passive self-judged one — so the user
 * never has to manually flip a mode switch.
 *
 * Rules:
 *   - Never-before-seen words (totalReviews = 0) → always passive. There is
 *     no memory trace yet to retrieve, so "typing it from memory" is
 *     meaningless and just wastes the user's time.
 *   - Weak words the user has already been exposed to at least once →
 *     active recall, since the testing effect helps most while a trace is
 *     still forming.
 *   - Strong/well-known words → mostly passive (faster), but a small random
 *     fraction is still sampled into active recall so the app accumulates
 *     unbiased data on whether typing actually helps — a user who
 *     self-selects into typing only when confident would bias that
 *     comparison.
 *
 * @param {{totalReviews?:number, stability?:number}} memory
 * @returns {'active_recall'|'passive_recall'}
 */
export function getRecommendedRetrievalType(memory) {
  const totalReviews = Number(memory?.totalReviews) || 0;
  if (totalReviews < AUTO_TYPED_MIN_REVIEWS) return 'passive_recall';

  const stability = Number(memory?.stability) || INITIAL_STABILITY;
  if (stability < AUTO_TYPED_WEAK_STABILITY) return 'active_recall';

  return Math.random() < AUTO_TYPED_RANDOM_SAMPLE_RATE ? 'active_recall' : 'passive_recall';
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
 * Future Memory Simulator — "what will I forget, and what changes if I
 * review sooner?" Composes updateStability + computeRecallProbability to
 * project retention at a fixed horizon under two scenarios: no further
 * review, versus one hypothetical successful review on a given future day.
 *
 * The hypothetical review assumes typical/neutral conditions (correct,
 * confidence 3, average response time, no sleep/retrieval-type bonus) —
 * this is a projection under average conditions, not a guarantee.
 *
 * @param {number} stability - current stability (days)
 * @param {number} reviewDay - the future day (from now) the hypothetical review happens
 * @param {number} [horizonDays=30] - how far out to project retention
 * @returns {{ withoutReview: number, withReview: number, newStabilityAfterReview: number }}
 */
export function simulateReviewScenarios(stability, reviewDay, horizonDays = 30) {
  const safeStability = Math.max(stability, 0.1);
  const withoutReview = computeRecallProbability(safeStability, horizonDays);

  // A review at or beyond the horizon (or in the past) can't affect
  // retention *at* the horizon under this model — nothing to project.
  if (reviewDay >= horizonDays || reviewDay <= 0) {
    return { withoutReview, withReview: withoutReview, newStabilityAfterReview: safeStability };
  }

  const newStabilityAfterReview = updateStability(safeStability, true, 3, 4, reviewDay, {});
  const daysAfterReview = horizonDays - reviewDay;
  const withReview = computeRecallProbability(newStabilityAfterReview, daysAfterReview);

  return { withoutReview, withReview, newStabilityAfterReview };
}

/**
 * Convenience wrapper: simulate several candidate review days at once, e.g.
 * for a row of "review on day 1 / 3 / 7 / 14" comparison buttons in the UI.
 *
 * @param {number} stability
 * @param {Array<number>} [reviewDays=[1, 3, 7, 14]]
 * @param {number} [horizonDays=30]
 * @returns {Array<{ reviewDay: number, withoutReview: number, withReview: number, newStabilityAfterReview: number }>}
 */
export function simulateReviewDayOptions(stability, reviewDays = [1, 3, 7, 14], horizonDays = 30) {
  return reviewDays.map((reviewDay) => ({
    reviewDay,
    ...simulateReviewScenarios(stability, reviewDay, horizonDays),
  }));
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
 * Formula: S_0 = INITIAL_STABILITY × (1 + 2.5 × categoryMastery) × globalAdjustment
 *
 * @param {number} categoryMastery - category mastery score in [0, 1]
 * @param {number} [globalAdjustment=1.0] - population-level word-difficulty multiplier
 * @returns {number} - initial stability in days
 */
export function computeInitialStability(categoryMastery = 0, globalAdjustment = 1.0) {
  const boost = Math.max(0, Math.min(1.0, categoryMastery));
  const s0 = INITIAL_STABILITY * (1 + 2.5 * boost) * (globalAdjustment || 1.0);
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
  if (stability >= 20) return { label: "Kuchli xotira", color: '#34d399', icon: '💪' };
  if (stability >= 10) return { label: "Yaxshi", color: '#60a5fa', icon: '⭐' };
  if (stability >= 5)  return { label: "O'rtacha", color: '#f59e0b', icon: '📈' };
  return { label: "Zaif xotira", color: '#f87171', icon: '🌱' };
}

/**
 * Explain in plain Uzbek why the engine is (or isn't) surfacing this word
 * for review right now — makes the scheduling decision transparent instead
 * of a black box.
 *
 * @param {number} stability
 * @param {string|null} lastReview - ISO date string
 * @param {string|null} nextOptimalReview - ISO date string
 * @returns {string}
 */
export function explainSchedulingDecision(stability, lastReview, nextOptimalReview) {
  if (!lastReview) {
    return "Bu so'z hali birinchi marta ko'rilmagan — shuning uchun navbatning boshida turibdi.";
  }

  const daysSince = (Date.now() - new Date(lastReview).getTime()) / (86400 * 1000);
  const p = computeRecallProbability(stability, daysSince);
  const pct = Math.round(p * 100);
  const targetPct = Math.round(TARGET_RECALL * 100);

  if (p <= TARGET_RECALL) {
    return `Eslab qolish ehtimoli hozir ${pct}% ga tushdi (maqsad chegara: ${targetPct}%) — shuning uchun aynan hozir takrorlash tavsiya qilinmoqda.`;
  }

  const daysUntil = nextOptimalReview
    ? Math.max(0, Math.round((new Date(nextOptimalReview) - Date.now()) / (86400 * 1000)))
    : null;

  return `Eslab qolish ehtimoli hali ${pct}% — yetarlicha yuqori.` +
    (daysUntil !== null ? ` Keyingi optimal takrorlash ${daysUntil} kundan keyin.` : '');
}

/**
 * Shared "Memory Twin" retention aggregate — the one piece of math that used
 * to be copy-pasted separately into Dashboard, PackDetail, and
 * StudentCorpLearn (and had already drifted out of sync once). Every
 * per-word retention/at-risk stat shown anywhere in the app should come from
 * here so they can't diverge again.
 *
 * @param {Array<Object>} words - word records with {stability, lastReviewed}
 * @returns {{ retentionPercent: number, atRisk: number, reviewedCount: number }}
 */
export function computeRetentionStats(words) {
  const reviewed = (words || []).filter(w => w.lastReviewed);
  if (reviewed.length === 0) {
    return { retentionPercent: 0, atRisk: 0, reviewedCount: 0 };
  }

  const now = Date.now();
  let totalP = 0;
  let atRisk = 0;
  reviewed.forEach(w => {
    const stability = typeof w.stability === 'number' ? w.stability : 1.0;
    const daysSince = (now - new Date(w.lastReviewed).getTime()) / (24 * 60 * 60 * 1000);
    const p = computeRecallProbability(stability, daysSince);
    totalP += p;
    if (p < 0.5) atRisk++;
  });

  return {
    retentionPercent: Math.round((totalP / reviewed.length) * 100),
    atRisk,
    reviewedCount: reviewed.length,
  };
}

/**
 * Recommend which PracticeHub mode actually serves a word list right now,
 * driven by the same per-word signals the rest of the engine already tracks
 * (review history, active-recall confirmation, current retrievability)
 * instead of a hardcoded "Tavsiya etiladi" badge that never changes.
 *
 * - Mostly-unseen pack → Flashcard (nothing to test yet, build first exposure).
 * - Several words already passed passively but never confirmed via typing/
 *   speaking (see the UNCONFIRMED_MASTERY_CEILING gate in spacedRepetition.js)
 *   → Imlo Mashqi (spelling), since that's what actually lifts the ceiling.
 * - Several words whose current recall probability has dropped below 50%
 *   → back to Flashcard for quick reinforcement.
 * - Otherwise → no strong recommendation (null).
 *
 * @param {Array<Object>} words
 * @returns {{ modeId: string, reason: 'new'|'confirm'|'reinforce', count: number } | null}
 */
export function recommendPracticeMode(words) {
  if (!words || words.length === 0) return null;
  const threshold = Math.max(3, Math.ceil(words.length * 0.3));

  const unseen = words.filter(w => !((w.reviewCount || 0) > 0));
  if (unseen.length === words.length || unseen.length >= threshold) {
    return { modeId: 'flashcard', reason: 'new', count: unseen.length };
  }

  const needsConfirmation = words.filter(
    w => (w.reviewCount || 0) > 0 && !((w.activeRecallPasses || 0) > 0)
  );
  if (needsConfirmation.length >= threshold) {
    return { modeId: 'spelling', reason: 'confirm', count: needsConfirmation.length };
  }

  const { atRisk } = computeRetentionStats(words);
  if (atRisk >= threshold) {
    return { modeId: 'flashcard', reason: 'reinforce', count: atRisk };
  }

  return null;
}
