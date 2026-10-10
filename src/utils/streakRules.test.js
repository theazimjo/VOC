import { describe, it, expect } from 'vitest';
import { shiftDay, missedDays, rolloverStreak, FREEZES_PER_MONTH } from './streakRules';

const base = (over = {}) => ({ streakCount: 5, lastActiveDate: '2026-10-12', todayCount: 6, dailyGoal: 5, activityLog: { '2026-10-12': 6 }, ...over });

describe('streak rules', () => {
  it('moves dates across month ends', () => {
    expect(shiftDay('2026-10-31', 1)).toBe('2026-11-01');
    expect(shiftDay('2026-03-01', -1)).toBe('2026-02-28');
  });

  it('finds the days that broke the chain', () => {
    expect(missedDays(base(), '2026-10-13')).toEqual([]);
    expect(missedDays(base(), '2026-10-14')).toEqual(['2026-10-13']);
    expect(missedDays(base({ activityLog: { '2026-10-12': 2 } }), '2026-10-13')).toEqual(['2026-10-12']);
    expect(missedDays(base(), '2026-10-12')).toEqual([]);
  });

  it('keeps a streak the old way when nothing is missed', () => {
    const r = rolloverStreak(base(), '2026-10-13', 0);
    expect(r.streakCount).toBe(5);
    expect(r.todayCount).toBe(0);
    expect(r.lastActiveDate).toBe('2026-10-13');
  });

  it('resets without a freeze', () => {
    expect(rolloverStreak(base(), '2026-10-14', 0).streakCount).toBe(0);
  });

  it('spends a freeze to keep the streak and marks the day', () => {
    const r = rolloverStreak(base(), '2026-10-14', FREEZES_PER_MONTH);
    expect(r.streakCount).toBe(5);
    expect(r.freezes).toBe(FREEZES_PER_MONTH - 1);
    expect(r.frozenDays['2026-10-13']).toBe(true);
    expect(r.freezeMonth).toBe('2026-10');
  });

  it('does not cover more days than there are freezes', () => {
    const r = rolloverStreak(base(), '2026-10-16', 2); // missed 13, 14, 15
    expect(r.streakCount).toBe(0);
    expect(r.freezes).toBe(2); // not spent on a lost streak
  });

  it('covers a short gap with several freezes', () => {
    const r = rolloverStreak(base(), '2026-10-15', 2); // missed 13, 14
    expect(r.streakCount).toBe(5);
    expect(r.freezes).toBe(0);
  });

  it('hands out new freezes each month but never stacks them', () => {
    const a = rolloverStreak(base({ freezes: 1, freezeMonth: '2026-09' }), '2026-10-13', 2);
    expect(a.freezes).toBe(2);
    const b = rolloverStreak(base({ freezes: 1, freezeMonth: '2026-10' }), '2026-10-13', 2);
    expect(b.freezes).toBe(1);
  });

  it('does nothing for a streak that is already zero', () => {
    const r = rolloverStreak(base({ streakCount: 0, freezes: 2, freezeMonth: '2026-10' }), '2026-10-14', 2);
    expect(r.streakCount).toBe(0);
    expect(r.freezes).toBe(2);
  });
});
