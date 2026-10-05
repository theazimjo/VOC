// Replay real (or synthetic) review logs through the engine and collect
// (predicted P, actual outcome) pairs.
//
// Log format: array of words, each with time-ordered events
//   [{ wordId, events: [{ ts: ISO|ms, result: bool, confidence?: 1-5,
//                         responseTime?: sec, retrievalType?: 'active_recall'|'passive_recall',
//                         mode?: string }] }]
// This matches what saveReviewEvent stores in `recallHistory`
// (users/{uid}/words/{packId}/{wordId}/recallHistory).
import { applyReview, initWordProgress, computeRecallProbability, clampStability } from '../src/index.js';

const toMs = (ts) => (typeof ts === 'number' ? ts : new Date(ts).getTime());
const DAY = 86400000;

/**
 * @param {Array} words
 * @param {Object} [opts]
 * @param {(state:Object, ev:Object, nowMs:number) => number} [opts.predict] - override predictor (baselines)
 * @returns {Array<{p:number,y:boolean,wordId:string}>} one sample per non-first review
 */
export function replay(words, { predict } = {}) {
  const samples = [];
  for (const { wordId, events } of words) {
    let state = initWordProgress();
    const sorted = [...events].sort((a, b) => toMs(a.ts) - toMs(b.ts));
    for (const ev of sorted) {
      const now = toMs(ev.ts);
      if (state.lastReviewed) {
        const dt = (now - new Date(state.lastReviewed).getTime()) / DAY;
        const p = predict
          ? predict(state, ev, now)
          : computeRecallProbability(clampStability(state.stability), dt);
        samples.push({ p, y: !!ev.result, wordId });
      }
      state = applyReview(state, {
        isCorrect: !!ev.result,
        confidence: ev.confidence ?? 3,
        responseTimeSec: ev.responseTime ?? 4,
        retrievalType: ev.retrievalType ?? 'passive_recall',
        mode: ev.mode ?? null,
        now,
      });
    }
  }
  return samples;
}

/** Baseline: always predict the dataset's overall recall rate (no per-word model). */
export function constantBaseline(words) {
  let ok = 0;
  let n = 0;
  for (const w of words) {
    w.events.slice(1).forEach((e) => {
      n++;
      ok += e.result ? 1 : 0;
    });
  }
  const rate = n ? ok / n : 0.5;
  return () => rate;
}
