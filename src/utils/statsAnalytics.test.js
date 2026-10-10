import { describe, it, expect } from 'vitest';
import { dayKey, lastDays, weekCompare, reviewForecast, stageCounts, weeklyGrowth, sourceRanking } from './statsAnalytics';

const NOW = new Date(2026, 9, 14, 15, 0).getTime(); // Wed 14 Oct 2026

describe('statsAnalytics', () => {
  it('lists the last days with their counts, today last', () => {
    const days = lastDays({ '2026-10-14': 6, '2026-10-12': 2 }, 3, NOW);
    expect(days.map((d) => d.date)).toEqual(['2026-10-12', '2026-10-13', '2026-10-14']);
    expect(days.map((d) => d.count)).toEqual([2, 0, 6]);
    expect(days[2].isToday).toBe(true);
  });

  it('compares this week to the one before', () => {
    const log = { '2026-10-14': 10, '2026-10-10': 10, '2026-10-05': 10 };
    expect(weekCompare(log, NOW)).toEqual({ cur: 20, prev: 10, change: 100 });
    expect(weekCompare({}, NOW).change).toBeNull();
  });

  it('forecasts reviews; overdue and never-reviewed words count as today', () => {
    const words = [
      { nextReview: new Date(2026, 9, 1).toISOString() },
      { nextReview: new Date(2026, 9, 14, 20).toISOString() },
      { nextReview: new Date(2026, 9, 16, 9).toISOString() },
      { nextReview: new Date(2026, 10, 30).toISOString() },
      {},
    ];
    expect(reviewForecast(words, 7, NOW).map((d) => d.count)).toEqual([3, 0, 1, 0, 0, 0, 0]);
  });

  it('sorts words into stages', () => {
    const words = [{ mastery: 0 }, { mastery: 20 }, { mastery: 55 }, { mastery: 90 }, { mastery: 0, reviewCount: 2 }];
    expect(stageCounts(words)).toEqual({ new: 1, learning: 2, reviewing: 1, mastered: 1 });
  });

  it('counts words added per week', () => {
    const words = [{ addedAt: new Date(2026, 9, 13).toISOString() }, { addedAt: new Date(2026, 9, 6).toISOString() }, { addedAt: new Date(2026, 9, 7).toISOString() }, { addedAt: 'bad' }];
    const g = weeklyGrowth(words, 3, NOW);
    expect(g.map((w) => w.count)).toEqual([0, 2, 1]);
  });

  it('ranks sources by size with the average mastery', () => {
    const r = sourceRanking([{ source: 'A', mastery: 10 }, { source: 'A', mastery: 30 }, { source: 'B', mastery: 50 }]);
    expect(r).toEqual([{ name: 'A', icon: undefined, count: 2, avg: 20 }, { name: 'B', icon: undefined, count: 1, avg: 50 }]);
    expect(dayKey(NOW)).toBe('2026-10-14');
  });
});

import { activityByDay, streakRuns, heatmapWeeks } from './statsAnalytics';

describe('activity map helpers', () => {
  it('merges practice log and review stamps, taking the larger number per day', () => {
    const words = [
      { lastReviewed: new Date(2026, 9, 13, 9).toISOString() },
      { lastReviewed: new Date(2026, 9, 13, 18).toISOString() },
      { lastReviewed: new Date(2026, 9, 12).toISOString() },
      { lastReviewed: 'bad' },
    ];
    const m = activityByDay(words, { '2026-10-13': 1, '2026-10-12': 9, '2026-10-01': 4 });
    expect(m).toEqual({ '2026-10-13': 2, '2026-10-12': 9, '2026-10-01': 4 });
  });

  it('finds the longest run and the one still alive', () => {
    const m = { '2026-10-08': 1, '2026-10-09': 2, '2026-10-10': 1, '2026-10-12': 3, '2026-10-13': 1 };
    expect(streakRuns(m, NOW)).toEqual({ longest: 3, current: 2 });
    expect(streakRuns({}, NOW)).toEqual({ longest: 0, current: 0 });
  });

  it('builds weeks Monday to Sunday with future days empty', () => {
    const weeks = heatmapWeeks({ '2026-10-14': 4, '2026-10-13': 1 }, 2, NOW);
    expect(weeks).toHaveLength(2);
    expect(weeks[1].days[2].date).toBe('2026-10-14'); // Wed
    expect(weeks[1].days[2].level).toBe(4);
    expect(weeks[1].days[1].level).toBe(1);
    expect(weeks[1].days[3]).toBeNull(); // Thursday is in the future
    expect(weeks[0].days.every(Boolean)).toBe(true);
  });
});
