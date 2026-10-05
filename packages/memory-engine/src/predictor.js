/**
 * Calibrated recall predictor.
 *
 * Replaces "P = e^(-t/S)" as the *prediction* of whether a learner will
 * recall a word right now. It was fitted on real review logs (see
 * eval/fit.js): on held-out users the pure forgetting-curve prediction was
 * worse than always guessing the average recall rate (log-loss 0.53 vs 0.29),
 * because real recall barely depends on elapsed time (most reviews are
 * repeats inside one practice session, and answers are often passive or
 * multiple-choice), while a word's own track record predicts it strongly.
 *
 * Logistic model over a handful of causal features:
 *   userRate  how often this learner recalls words overall (smoothed)
 *   wordRate  this word's own record, shrunk toward the learner's rate
 *   logGapH   log(1 + hours since the previous review of the word)
 *   logIdx    log(1 + number of earlier reviews of the word)
 *   active    this review is typed/spoken production, not passive recognition
 *   prevConf  confidence (1-5) reported on the previous review
 *
 * Pure and dependency-free (no engine imports) so engine.js, scheduler.js,
 * the app and the fitter can all share it. Weights live in
 * predictor-params.js, which `npm run fit:memory` regenerates.
 */

import { DEFAULT_PREDICTOR_PARAMS } from './predictor-params.js';

const DAY = 86400000;

/** Recall rate observed on a word's first-ever review in the training data. */
export const FIRST_EXPOSURE_RATE = 0.75;

/** Prior learner-level recall rate, used until a learner has history of their own. */
export const PRIOR_USER_RATE = 0.88;

/** Pseudo-counts that shrink noisy early estimates toward their prior. */
const USER_PRIOR_STRENGTH = 5;
const WORD_PRIOR_STRENGTH = 2;

export const FEATURE_NAMES = ['userRate', 'wordRate', 'logGapH', 'logIdx', 'active', 'prevConf'];

const clampP = (p) => Math.min(0.999, Math.max(0.001, p));
const logit = (p) => Math.log(clampP(p) / (1 - clampP(p)));
const sigmoid = (z) => 1 / (1 + Math.exp(-z));

/**
 * Number of correct reviews recorded for a word. Prefers the stored
 * `correctCount`; legacy records fall back to their recallHistory rate (scaled
 * to reviewCount, since history keeps only the last 50 events), and finally to
 * the prior rate.
 */
export function resolveCorrectCount(word = {}) {
  if (typeof word.correctCount === 'number') return Math.max(0, word.correctCount);
  const reviews = Number(word.reviewCount) || 0;
  const history = Array.isArray(word.recallHistory) ? word.recallHistory : [];
  if (history.length > 0) {
    const rate = history.filter((h) => h && h.result).length / history.length;
    return Math.round(rate * reviews);
  }
  return Math.round(reviews * PRIOR_USER_RATE);
}

/** Confidence reported on the word's last review (1-5); legacy records fall back to the last history entry, then 3. */
export function resolveLastConfidence(word = {}) {
  if (typeof word.lastConfidence === 'number') return word.lastConfidence;
  const history = Array.isArray(word.recallHistory) ? word.recallHistory : [];
  const last = history[history.length - 1];
  return typeof last?.confidence === 'number' ? last.confidence : 3;
}

/** A learner's overall recall rate from their word records, shrunk toward PRIOR_USER_RATE. */
export function computeUserRate(words = []) {
  let n = 0;
  let ok = 0;
  for (const w of words) {
    n += Number(w?.reviewCount) || 0;
    ok += resolveCorrectCount(w);
  }
  return (ok + PRIOR_USER_RATE * USER_PRIOR_STRENGTH) / (n + USER_PRIOR_STRENGTH);
}

/**
 * Feature vector (order = FEATURE_NAMES). Shared by the runtime predictor and
 * the fitter so training and serving cannot drift apart.
 *
 * @param {Object} ctx
 * @param {number} ctx.n          earlier reviews of this word
 * @param {number} ctx.ok         of those, how many were correct
 * @param {number} ctx.userRate   learner's overall (smoothed) recall rate
 * @param {number} ctx.gapDays    days since the previous review of this word
 * @param {number} ctx.active     1 if this review is active recall, else 0
 * @param {number} ctx.prevConf   confidence on the previous review (1-5)
 */
export function buildFeatures({ n, ok, userRate, gapDays, active, prevConf }) {
  const wordRate = (ok + userRate * WORD_PRIOR_STRENGTH) / (n + WORD_PRIOR_STRENGTH);
  return [
    logit(userRate),
    logit(wordRate),
    Math.log(1 + Math.max(0, gapDays) * 24),
    Math.log(1 + n),
    active ? 1 : 0,
    prevConf,
  ];
}

/** Apply a fitted parameter set ({bias, weights, mu, sd}) to a feature vector. */
export function predictFromFeatures(x, params = DEFAULT_PREDICTOR_PARAMS) {
  let z = params.bias;
  for (let j = 0; j < x.length; j++) z += params.weights[j] * ((x[j] - params.mu[j]) / params.sd[j]);
  return sigmoid(z);
}

/**
 * Probability this learner recalls this word if reviewed now.
 *
 * @param {Object} word  word progress record
 * @param {Object} [ctx]
 * @param {number} [ctx.now=Date.now()]
 * @param {number} [ctx.userRate=PRIOR_USER_RATE]  see computeUserRate
 * @param {'active_recall'|'passive_recall'} [ctx.retrievalType='passive_recall']
 * @param {Object} [ctx.params=DEFAULT_PREDICTOR_PARAMS]
 * @returns {number} probability in (0, 1)
 */
export function predictRecall(word = {}, ctx = {}) {
  const { now = Date.now(), userRate = PRIOR_USER_RATE, retrievalType = 'passive_recall', params = DEFAULT_PREDICTOR_PARAMS } = ctx;
  // A record with a lastReviewed but no reviewCount was reviewed at least once.
  const n = Number(word.reviewCount) || (word.lastReviewed ? 1 : 0);
  if (n === 0) return FIRST_EXPOSURE_RATE;

  const last = word.lastReviewed ? new Date(word.lastReviewed).getTime() : null;
  const gapDays = last && Number.isFinite(last) ? Math.max(0, (now - last) / DAY) : 0;

  return predictFromFeatures(
    buildFeatures({
      n,
      ok: Math.min(n, resolveCorrectCount(word)),
      userRate,
      gapDays,
      active: retrievalType === 'active_recall' ? 1 : 0,
      prevConf: resolveLastConfidence(word),
    }),
    params,
  );
}
