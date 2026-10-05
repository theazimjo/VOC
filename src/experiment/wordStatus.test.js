import { describe, it, expect } from 'vitest';
import { wordStatus, daysUntilReview } from './wordStatus';

const NOW = Date.UTC(2026, 5, 1);
const iso = (ms) => new Date(ms).toISOString();

describe('wordStatus', () => {
  it('marks a never-reviewed word as new and due', () => {
    expect(wordStatus({ reviewCount: 0 }, 0.88, NOW)).toEqual({ key: 'new', p: null, due: true });
  });

  it('ranks a strong record above a failing one', () => {
    const base = { reviewCount: 8, lastReviewed: iso(NOW - 3600000), lastConfidence: 4, nextReview: iso(NOW + 86400000) };
    const strong = wordStatus({ ...base, correctCount: 8 }, 0.88, NOW);
    const weak = wordStatus({ ...base, correctCount: 1, lastConfidence: 1 }, 0.88, NOW);
    expect(strong.key).toBe('strong');
    expect(weak.key).toBe('weak');
    expect(strong.p).toBeGreaterThan(weak.p);
  });

  it('reports due when the scheduled review has passed', () => {
    const m = { reviewCount: 3, correctCount: 3, lastReviewed: iso(NOW - 86400000), nextReview: iso(NOW - 1000) };
    expect(wordStatus(m, 0.88, NOW).due).toBe(true);
    expect(wordStatus({ ...m, nextReview: iso(NOW + 86400000) }, 0.88, NOW).due).toBe(false);
  });
});

describe('daysUntilReview', () => {
  it('is null without a schedule, 0 when due, otherwise whole days rounded up', () => {
    expect(daysUntilReview({}, NOW)).toBeNull();
    expect(daysUntilReview({ nextReview: iso(NOW - 5) }, NOW)).toBe(0);
    expect(daysUntilReview({ nextReview: iso(NOW + 3 * 86400000 - 1000) }, NOW)).toBe(3);
    expect(daysUntilReview({ nextReview: iso(NOW + 3600000) }, NOW)).toBe(1);
  });
});
