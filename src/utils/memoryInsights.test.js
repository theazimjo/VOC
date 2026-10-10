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

import { speedByWeek, wordSpeeds, posAccuracy, weeklyReport } from './memoryInsights';

describe('speed, word types and weekly report', () => {
  const at = (days) => new Date(NOW + days * DAY).toISOString();
  it('averages answer time per week and ignores junk times', () => {
    const words = [{ recallHistory: [{ ts: at(0), responseTime: 2 }, { ts: at(0), responseTime: 4 }, { ts: at(0), responseTime: 999 }, { ts: at(-8), responseTime: 6 }] }];
    const w = speedByWeek(words, 3, NOW);
    expect(w[2].avg).toBe(3);
    expect(w[1].avg).toBe(6);
    expect(w[0].avg).toBeNull();
  });

  it('finds the fastest and slowest words', () => {
    const mk = (id, ts) => ({ id, recallHistory: ts.map((t) => ({ ts: at(0), responseTime: t })) });
    const r = wordSpeeds([mk('a', [1, 1]), mk('b', [9, 9]), mk('c', [3]), mk('d', [5, 5])]);
    expect(r.fastest[0].word.id).toBe('a');
    expect(r.slowest[0].word.id).toBe('b');
    expect(r.fastest.concat(r.slowest).some((x) => x.word.id === 'c')).toBe(false);
  });

  it('groups accuracy by part of speech and drops tiny groups', () => {
    const w = (pos, correct) => ({ lastReviewed: at(-1), partOfSpeech: pos, reviewCount: 4, correctCount: correct, stability: 5 });
    const r = posAccuracy([w('noun', 4), w('noun', 4), w('noun', 4), w('verb', 2), w('verb', 2), w('verb', 2), w('adverb', 1)]);
    expect(r.map((x) => x.key)).toEqual(['noun', 'verb']);
    expect(r[0].accuracy).toBe(100);
    expect(r[1].accuracy).toBe(50);
  });

  it('compares this week with the last in the weekly report', () => {
    const words = [{ addedAt: at(0), recallHistory: [{ ts: at(0), result: true, responseTime: 2 }, { ts: at(-8), result: false, responseTime: 4 }] }];
    const r = weeklyReport(words, NOW);
    expect(r.reviews).toEqual({ prev: 1, cur: 1 });
    expect(r.accuracy).toEqual({ prev: 0, cur: 100 });
    expect(r.speed).toEqual({ prev: 4, cur: 2 });
    expect(r.added.cur).toBe(1);
  });
});
