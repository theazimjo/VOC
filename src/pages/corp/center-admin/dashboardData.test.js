import { describe, it, expect } from 'vitest';
import { masteryDistribution } from './dashboardData';

describe('masteryDistribution', () => {
  it('puts each student in one range and averages only those who practiced', () => {
    const d = masteryDistribution([null, 0, 19, 20, 55, 79.5, 80, 100, 130]);
    expect(Object.fromEntries(d.buckets.map((b) => [b.key, b.count]))).toEqual({ none: 1, b0: 2, b20: 1, b40: 1, b60: 1, b80: 3 });
    expect(d.practiced).toBe(8);
    expect(d.total).toBe(9);
    expect(d.average).toBe(Math.round((0 + 19 + 20 + 55 + 79.5 + 80 + 100 + 100) / 8));
  });

  it('handles nobody practicing', () => {
    expect(masteryDistribution([null, null])).toMatchObject({ average: null, practiced: 0, total: 2 });
    expect(masteryDistribution([]).average).toBeNull();
  });
});

describe('masteryTrend', () => {
  it('merges saved days with today\'s live value, oldest first', async () => {
    const { masteryTrend } = await import('./dashboardData');
    const history = {
      '2026-09-25': { avg: 52, practiced: 5, total: 8 },
      '2026-09-23': { avg: 40, practiced: 4, total: 8 },
      '2026-09-26': { avg: 1, practiced: 1, total: 1 }, // stale point for today — replaced
      '2026-09-24': { avg: null, practiced: 0, total: 8 }, // nobody practiced — no point
    };
    const t = masteryTrend(history, { avg: 60, practiced: 6, total: 8 }, '2026-09-26');
    expect(t.map((p) => [p.day, p.avg])).toEqual([['2026-09-23', 40], ['2026-09-25', 52], ['2026-09-26', 60]]);
    expect(t.at(-1).live).toBe(true);
    expect(typeof t[0].label).toBe('string');
  });

  it('keeps only the last N days', async () => {
    const { masteryTrend } = await import('./dashboardData');
    const history = Object.fromEntries(Array.from({ length: 40 }, (_, i) => [`2026-08-${String(i % 28 + 1).padStart(2, '0')}`, { avg: i }]));
    expect(masteryTrend(history, null, '2026-09-26', 7)).toHaveLength(7);
  });
});
