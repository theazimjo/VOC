import { describe, it, expect } from 'vitest';
import {
  predictRecall,
  buildFeatures,
  predictFromFeatures,
  computeUserRate,
  resolveCorrectCount,
  resolveLastConfidence,
  FEATURE_NAMES,
  FIRST_EXPOSURE_RATE,
  PRIOR_USER_RATE,
} from './predictor.js';
import { DEFAULT_PREDICTOR_PARAMS } from './predictor-params.js';

const NOW = Date.UTC(2026, 5, 1);
const hoursAgo = (h) => new Date(NOW - h * 3600000).toISOString();

describe('predictRecall', () => {
  it('returns the first-exposure rate for a word never reviewed', () => {
    expect(predictRecall({}, { now: NOW })).toBe(FIRST_EXPOSURE_RATE);
  });

  it('always returns a probability strictly inside (0, 1)', () => {
    for (const [n, ok] of [[1, 0], [1, 1], [50, 0], [50, 50], [500, 3]]) {
      const p = predictRecall({ reviewCount: n, correctCount: ok, lastReviewed: hoursAgo(5) }, { now: NOW });
      expect(p).toBeGreaterThan(0);
      expect(p).toBeLessThan(1);
    }
  });

  it("ranks a word's own track record: more past successes -> higher P", () => {
    const base = { reviewCount: 6, lastReviewed: hoursAgo(5), lastConfidence: 3 };
    const weak = predictRecall({ ...base, correctCount: 1 }, { now: NOW });
    const mid = predictRecall({ ...base, correctCount: 4 }, { now: NOW });
    const strong = predictRecall({ ...base, correctCount: 6 }, { now: NOW });
    expect(weak).toBeLessThan(mid);
    expect(mid).toBeLessThan(strong);
  });

  it('is lower for active recall than passive recognition, and for low previous confidence', () => {
    const w = { reviewCount: 6, correctCount: 5, lastReviewed: hoursAgo(5), lastConfidence: 4 };
    expect(predictRecall(w, { now: NOW, retrievalType: 'active_recall' })).toBeLessThan(predictRecall(w, { now: NOW }));
    expect(predictRecall({ ...w, lastConfidence: 1 }, { now: NOW })).toBeLessThan(predictRecall(w, { now: NOW }));
  });

  it('does not collapse toward 0 as time passes (real recall barely decays)', () => {
    const w = { reviewCount: 6, correctCount: 5, lastConfidence: 4 };
    const longAgo = predictRecall({ ...w, lastReviewed: hoursAgo(24 * 60) }, { now: NOW });
    expect(longAgo).toBeGreaterThan(0.6);
  });

  it('treats a legacy record with lastReviewed but no reviewCount as reviewed once', () => {
    expect(predictRecall({ lastReviewed: hoursAgo(2) }, { now: NOW })).not.toBe(FIRST_EXPOSURE_RATE);
  });

  it('is deterministic for the same input', () => {
    const w = { reviewCount: 4, correctCount: 3, lastReviewed: hoursAgo(10) };
    expect(predictRecall(w, { now: NOW })).toBe(predictRecall(w, { now: NOW }));
  });
});

describe('feature parity with the fitter', () => {
  it('builds a vector in FEATURE_NAMES order and matches predictRecall', () => {
    const word = { reviewCount: 5, correctCount: 4, lastReviewed: hoursAgo(12), lastConfidence: 4 };
    const x = buildFeatures({ n: 5, ok: 4, userRate: PRIOR_USER_RATE, gapDays: 0.5, active: 0, prevConf: 4 });
    expect(x).toHaveLength(FEATURE_NAMES.length);
    expect(predictRecall(word, { now: NOW })).toBeCloseTo(predictFromFeatures(x, DEFAULT_PREDICTOR_PARAMS), 10);
  });

  it('ships fitted (non-placeholder) parameters with matching dimensions', () => {
    const p = DEFAULT_PREDICTOR_PARAMS;
    expect(p.meta.placeholder).toBeUndefined();
    for (const key of ['weights', 'mu', 'sd']) expect(p[key]).toHaveLength(FEATURE_NAMES.length);
    expect(p.sd.every((v) => v > 0)).toBe(true);
    expect(p.meta.heldOut.logLoss).toBeLessThan(0.3);
  });
});

describe('legacy resolvers', () => {
  it('resolveCorrectCount prefers the stored count, then history rate, then the prior', () => {
    expect(resolveCorrectCount({ correctCount: 7, reviewCount: 9 })).toBe(7);
    expect(resolveCorrectCount({ reviewCount: 10, recallHistory: [{ result: true }, { result: false }] })).toBe(5);
    expect(resolveCorrectCount({ reviewCount: 10 })).toBe(Math.round(10 * PRIOR_USER_RATE));
  });

  it('resolveLastConfidence falls back to history, then 3', () => {
    expect(resolveLastConfidence({ lastConfidence: 5 })).toBe(5);
    expect(resolveLastConfidence({ recallHistory: [{ confidence: 2 }] })).toBe(2);
    expect(resolveLastConfidence({})).toBe(3);
  });

  it('computeUserRate shrinks toward the prior with little data and tracks real data with a lot', () => {
    expect(computeUserRate([])).toBeCloseTo(PRIOR_USER_RATE, 5);
    expect(computeUserRate([{ reviewCount: 1000, correctCount: 500 }])).toBeCloseTo(0.5, 1);
  });
});
