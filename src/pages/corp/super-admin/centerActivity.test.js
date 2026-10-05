import { describe, it, expect } from 'vitest';
import { masterySnapshot, tashkentDay } from './centerActivity';

const st = (m) => ({ progress: m == null ? {} : { p: { units: { a: { masteryPercent: m } } } } });

describe('masterySnapshot', () => {
  it('averages students who practiced, counts everyone, skips archived groups', () => {
    const groups = [
      { students: { a: st(80), b: st(40), c: st(null) } },
      { status: 'archived', students: { d: st(0) } },
      { students: {} },
    ];
    expect(masterySnapshot(groups)).toEqual({ avg: 60, practiced: 2, total: 3 });
  });

  it('is empty-safe', () => {
    expect(masterySnapshot([])).toEqual({ avg: null, practiced: 0, total: 0 });
  });
});

describe('tashkentDay', () => {
  it('uses Tashkent time (UTC+5)', () => {
    expect(tashkentDay(Date.UTC(2026, 8, 25, 20, 0))).toBe('2026-09-26');
    expect(tashkentDay(Date.UTC(2026, 8, 25, 18, 0))).toBe('2026-09-25');
  });
});
