// Synthetic learners with a hidden "true" forgetting curve. Lets us measure
// scheduling quality (retention vs. workload) and sanity-check the model
// before real data exists. The simulator deliberately uses a different
// growth rule than the engine so the engine is not graded on its own homework.
import { applyReview, initWordProgress, isDue, inferConfidenceFromSpeed, getRecommendedRetrievalType } from '../src/index.js';
import { createRng } from './rng.js';

const DAY = 86400000;
const DRILLS = ['spelling', 'sentence', 'pronounce']; // distinct active-recall angles

export function makeLearner(rng, { words = 60, medianStability = 2, spread = 0.6 } = {}) {
  return Array.from({ length: words }, (_, i) => ({
    id: `w${i}`,
    trueS: medianStability * Math.exp(spread * rng.normal()),
    state: initWordProgress(),
    events: [],
  }));
}

const recallP = (trueS, days) => (days <= 0 ? 1 : Math.exp(-days / trueS));

/** Scheduling policies: decide whether a word is due today. */
export const policies = {
  engine: {
    isDue: (w, nowMs) => isDue(w.state.nextReview, nowMs),
  },
  // Classic fixed ladder (1,3,7,14,30,60 days), reset to the start on a failure.
  fixedLadder: {
    isDue: (w, nowMs) => {
      if (!w.state.lastReviewed) return true;
      const ladder = [1, 3, 7, 14, 30, 60];
      const step = Math.min(w.ladder ?? 0, ladder.length - 1);
      return nowMs - new Date(w.state.lastReviewed).getTime() >= ladder[step] * DAY;
    },
    after: (w, ok) => {
      w.ladder = ok ? (w.ladder ?? 0) + 1 : 0;
    },
  },
};

/**
 * @param {string} policyName key of `policies`
 * @returns {{reviews:number, retention:number, learner:Array}}
 *   retention = mean *true* recall probability across all words at the end
 */
export function simulate(policyName, { seed = 1, days = 90, dailyCap = 25, words = 60 } = {}) {
  const rng = createRng(seed);
  const learner = makeLearner(rng, { words });
  const policy = policies[policyName];
  const start = Date.UTC(2026, 0, 1, 9);
  let reviews = 0;

  for (let d = 0; d < days; d++) {
    const nowMs = start + d * DAY;
    const due = learner.filter((w) => policy.isDue(w, nowMs)).slice(0, dailyCap);
    for (const w of due) {
      const since = w.state.lastReviewed ? (nowMs - new Date(w.state.lastReviewed).getTime()) / DAY : 0;
      const p = w.state.lastReviewed ? recallP(w.trueS, since) : 0.6;
      const ok = rng() < p;
      const responseTime = Math.max(0.8, 2 + 7 * (1 - p) + rng.normal());
      const retrievalType = getRecommendedRetrievalType(
        { totalReviews: w.state.reviewCount, stability: w.state.stability },
        rng,
      );
      // Hidden ground truth: success strengthens the trace, active recall more so.
      w.trueS = ok
        ? w.trueS * (1.4 + (retrievalType === 'active_recall' ? 0.3 : 0) + 0.5 * (1 - p))
        : w.trueS * 0.6;

      const confidence = inferConfidenceFromSpeed(responseTime, ok);
      const mode = retrievalType === 'active_recall' ? DRILLS[Math.floor(rng() * DRILLS.length)] : undefined;
      w.events.push({ ts: nowMs, result: ok, confidence, responseTime, retrievalType, mode });
      w.state = applyReview(w.state, { isCorrect: ok, confidence, responseTimeSec: responseTime, retrievalType, mode, now: nowMs });
      policy.after?.(w, ok);
      reviews++;
    }
  }

  const end = start + days * DAY;
  const retention =
    learner.reduce((s, w) => {
      const last = w.state.lastReviewed ? new Date(w.state.lastReviewed).getTime() : null;
      return s + (last ? recallP(w.trueS, (end - last) / DAY) : 0);
    }, 0) / learner.length;

  return { reviews, retention, learner };
}
