import { describe, it, expect } from 'vitest';
import {
  vocabCurve, wordMemory, wordCurve, whatIf, stabilityBuckets, accuracyByWeek, accuracyByTimeOfDay, rankWords, strengthTier,
} from './memoryInsights';

const NOW = new Date(2026, 9, 14, 15, 0).getTime();
const DAY = 86400000;
const iso = (offsetDays) => new Date(NOW + offsetDays * DAY).toISOString();

const fresh = { id: 'a', word: 'a' };
const reviewed = (daysAgo, stability, extra = {}) => ({
  id: `r${daysAgo}`, word: 'w', lastReviewed: iso(-daysAgo), stability, reviewCount: 3, correctCount: 2, ...extra,
});

describe('memoryInsights', () => {
  it('has no vocabulary curve until something was reviewed', () => {
    expect(vocabCurve([fresh], NOW)).toBeNull();
  });

  it('predicts recall that only goes down when nothing is reviewed', () => {
    const c = vocabCurve([reviewed(1, 4), reviewed(10, 2)], NOW);
    expect(c.reviewed).toBe(2);
    const ps = c.points.map((p) => p.p);
    for (let i = 1; i < ps.length; i += 1) expect(ps[i]).toBeLessThanOrEqual(ps[i - 1] + 1e-9);
    expect(c.points[0].day).toBe(0);
  });

  it('describes one word', () => {
    const w = reviewed(2, 12, {
      nextReview: iso(3), wrongCount: 1,
      recallHistory: [{ ts: iso(-9), result: true, responseTime: 3 }, { ts: iso(-2), result: false, responseTime: 5 }],
    });
    const m = wordMemory(w, NOW);
    expect(m.tier).toBe('good');
    expect(m.daysToReview).toBe(3);
    expect(m.wrong).toBe(1);
    expect(m.history).toHaveLength(2);
    expect(m.avgResponse).toBe(4);
    expect(m.recall).toBeCloseTo(Math.exp(-2 / 12), 5);
    expect(wordMemory(fresh, NOW).hasReview).toBe(false);
  });

  it('draws a curve from the last review to 30 days ahead', () => {
    const pts = wordCurve(reviewed(2, 5), NOW);
    expect(pts[0].t).toBe(NOW - 2 * DAY);
    expect(pts[pts.length - 1].t).toBe(NOW + 30 * DAY);
    expect(pts[0].p).toBe(1); // right after a review you remember it
    expect(wordCurve(fresh, NOW)).toEqual([]);
  });

  it('shows that reviewing sooner keeps more in memory', () => {
    const r = whatIf(reviewed(1, 3));
    expect(r.map((x) => x.day)).toEqual([1, 3, 7, 14]);
    expect(r[0].withReview).toBeGreaterThan(r[0].without);
  });

  it('groups words by memory strength', () => {
    const b = stabilityBuckets([reviewed(1, 0.5), reviewed(1, 2), reviewed(1, 2.5), reviewed(1, 40), fresh]);
    expect(Object.fromEntries(b.map((x) => [x.key, x.count]))).toMatchObject({ d1: 1, d3: 2, more: 1 });
    expect(strengthTier(3, true)).toBe('weak');
    expect(strengthTier(3, false)).toBe('new');
  });

  it('computes accuracy by week and by time of day from review history', () => {
    const at = (days, hour) => { const d = new Date(NOW + days * DAY); d.setHours(hour, 0, 0, 0); return d.toISOString(); };
    const words = [{ recallHistory: [{ ts: at(0, 9), result: true }, { ts: at(0, 10), result: false }, { ts: at(-8, 20), result: true }] }];
    const weeks = accuracyByWeek(words, 3, NOW);
    expect(weeks[2].total).toBe(2);
    expect(weeks[2].rate).toBe(50);
    expect(weeks[1].total).toBe(1);
    const slots = accuracyByTimeOfDay(words);
    expect(slots.find((s) => s.key === 'morning').total).toBe(2);
    expect(slots.find((s) => s.key === 'evening').rate).toBe(100);
    expect(slots.find((s) => s.key === 'night').rate).toBeNull();
  });

  it('ranks words by risk or by strength', () => {
    const words = [reviewed(30, 2, { id: 'old' }), reviewed(0, 30, { id: 'strong' })];
    expect(rankWords(words, 'risk', NOW).rows[0].word.id).toBe('old');
    expect(rankWords(words, 'strong', NOW).rows[0].word.id).toBe('strong');
  });
});
