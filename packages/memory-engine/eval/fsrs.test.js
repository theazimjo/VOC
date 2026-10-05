import { describe, it, expect } from 'vitest';
import { fsrsRetrievability, fsrsPredictions, ratingFromEvent, FSRS6_DEFAULT_PARAMS } from './fsrs.js';

describe('FSRS-6 baseline', () => {
  it('has the 21 reference parameters', () => {
    expect(FSRS6_DEFAULT_PARAMS).toHaveLength(21);
  });

  it('retrievability is 1 at t=0 and exactly 0.9 when t equals stability (definition of S)', () => {
    expect(fsrsRetrievability(0, 5)).toBeCloseTo(1, 10);
    expect(fsrsRetrievability(5, 5)).toBeCloseTo(0.9, 6);
    expect(fsrsRetrievability(50, 5)).toBeLessThan(fsrsRetrievability(5, 5));
  });

  it('maps result + confidence onto ratings 1-4', () => {
    expect(ratingFromEvent({ result: false, confidence: 5 })).toBe(1);
    expect(ratingFromEvent({ result: true, confidence: 2 })).toBe(2);
    expect(ratingFromEvent({ result: true, confidence: 4 })).toBe(3);
    expect(ratingFromEvent({ result: true, confidence: 5 })).toBe(4);
  });

  it('predicts one probability per review after the first, all within (0, 1]', () => {
    const DAY = 86400000;
    const t0 = Date.UTC(2026, 0, 1);
    const events = [0, 1, 3, 7, 20].map((d, i) => ({ ts: t0 + d * DAY, result: i !== 3, confidence: 4 }));
    const p = fsrsPredictions(events);
    expect(p).toHaveLength(4);
    for (const v of p) {
      expect(v).toBeGreaterThan(0);
      expect(v).toBeLessThanOrEqual(1);
    }
  });

  it('a longer gap lowers predicted recall for the same history', () => {
    const DAY = 86400000;
    const t0 = Date.UTC(2026, 0, 1);
    const mk = (gap) => [{ ts: t0, result: true, confidence: 4 }, { ts: t0 + gap * DAY, result: true, confidence: 4 }];
    expect(fsrsPredictions(mk(30))[0]).toBeLessThan(fsrsPredictions(mk(2))[0]);
  });
});
