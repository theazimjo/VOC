import { describe, it, expect } from 'vitest';
import { activityCalendar, hardWords, providerLabel, wordIndex, wordStats } from './studentInsights';

describe('activityCalendar', () => {
  // 2026-09-26 is a Saturday.
  it('lays out Monday-first week columns ending with the current week', () => {
    const cal = activityCalendar({ '2026-09-26': 12, '2026-09-25': 5, '2026-09-24': 3, '2026-09-23': 1, '2026-08-01': 50 }, '2026-09-26', 5, 2);
    expect(cal.columns).toHaveLength(2);
    expect(cal.columns[0][0].key).toBe('2026-09-14'); // Monday
    const week = cal.columns[1];
    expect(week.map((c) => c.key)).toEqual(['2026-09-21', '2026-09-22', '2026-09-23', '2026-09-24', '2026-09-25', '2026-09-26', '2026-09-27']);
    expect(week.slice(2, 6).map((c) => c.level)).toEqual([1, 2, 3, 4]);
    expect(week[6]).toMatchObject({ future: true, count: 0 });
    expect(cal).toMatchObject({ active: 4, total: 21 }); // 2026-08-01 is outside
  });

  it('labels the columns where months start', () => {
    const cal = activityCalendar({}, '2026-09-26');
    expect(cal.columns).toHaveLength(26);
    expect(cal.months.map((m) => m.label)).toEqual(['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']);
    expect(cal.months.at(-1).column).toBeGreaterThan(20);
  });
});

const packs = [{
  id: 'p1',
  months: [{ id: 'm1', units: [{ title: 'Family', words: [{ id: 'w1', word: 'mother', translation: 'ona' }, { id: 'w2', word: 'father', translation: 'ota' }] }] }],
}, { id: 'p2', words: [{ id: 'a', word: 'run', translation: 'yugurmoq' }] }];

describe('word helpers', () => {
  const index = wordIndex(packs);
  const words = {
    p1: [
      { id: 'w1', mastery: 90, reviewCount: 5, wrongCount: 1, correct: 4, answered: 5, nextReview: '2020-01-01T00:00:00Z' },
      { id: 'w2', mastery: 30, reviewCount: 3, wrongCount: 3, correct: 1, answered: 4, nextReview: '2999-01-01T00:00:00Z' },
      { id: 'gone', mastery: 10, reviewCount: 1, wrongCount: 9, correct: 0, answered: 1 },
    ],
    p2: [{ id: 'a', mastery: 0, reviewCount: 0, wrongCount: 0, correct: 0, answered: 0 }],
  };

  it('indexes words of new and legacy packs', () => {
    expect(index['p1/w2']).toEqual({ word: 'father', translation: 'ota', topic: 'Family' });
    expect(index['p2/a'].word).toBe('run');
  });

  it('totals practiced, strong, due and accuracy', () => {
    expect(wordStats(words)).toEqual({ practiced: 3, strong: 1, due: 1, accuracy: 50, answered: 10 });
    expect(wordStats({}).accuracy).toBeNull();
  });

  it('ranks hard words and skips removed ones', () => {
    expect(hardWords(words, index).map((w) => [w.word, w.wrongCount, w.accuracy])).toEqual([['father', 3, 25], ['mother', 1, 80]]);
  });

  it('names sign-in providers', () => {
    expect(providerLabel(['google.com', 'password'])).toBe('Google, Password');
    expect(providerLabel([])).toBe('—');
  });
});
