import { describe, it, expect } from 'vitest';
import { shuffleArray, weightedSelectWords, filterWordsForMode, formatDate } from './helpers';

describe('shuffleArray', () => {
  it('does not mutate the original array', () => {
    const original = [1, 2, 3, 4, 5];
    const copy = [...original];
    shuffleArray(original);
    expect(original).toEqual(copy);
  });

  it('keeps the same elements, just reordered', () => {
    const original = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(original);
    expect(shuffled.length).toBe(original.length);
    expect([...shuffled].sort()).toEqual([...original].sort());
  });

  it('handles an empty array', () => {
    expect(shuffleArray([])).toEqual([]);
  });
});

describe('weightedSelectWords', () => {
  it('returns an empty array for no words', () => {
    expect(weightedSelectWords([], 5)).toEqual([]);
    expect(weightedSelectWords(null, 5)).toEqual([]);
  });

  it('returns exactly `count` words without duplicates', () => {
    const words = Array.from({ length: 10 }, (_, i) => ({ id: i, mastery: 50 }));
    const selected = weightedSelectWords(words, 4);
    expect(selected).toHaveLength(4);
    const ids = selected.map((w) => w.id);
    expect(new Set(ids).size).toBe(4);
  });

  it('returns every word exactly once when count >= words.length', () => {
    const words = Array.from({ length: 5 }, (_, i) => ({ id: i, mastery: 50 }));
    const selected = weightedSelectWords(words, 10);
    expect(selected).toHaveLength(5);
    expect(new Set(selected.map((w) => w.id)).size).toBe(5);
  });

  it('never picks a word not in the input list', () => {
    const words = Array.from({ length: 6 }, (_, i) => ({ id: i, mastery: 0 }));
    const selected = weightedSelectWords(words, 3);
    selected.forEach((w) => expect(words).toContain(w));
  });
});

describe('filterWordsForMode', () => {
  const mixed = [
    { id: 1, reviewCount: 0 },
    { id: 2, reviewCount: 3 },
    { id: 3, reviewCount: 0 },
    { id: 4, reviewCount: 1 },
  ];

  it('leaves the pool untouched for recognition-based modes', () => {
    expect(filterWordsForMode(mixed, 'flashcard')).toEqual(mixed);
    expect(filterWordsForMode(mixed, 'quiz')).toEqual(mixed);
    expect(filterWordsForMode(mixed, 'match')).toEqual(mixed);
    expect(filterWordsForMode(mixed, 'pronounce')).toEqual(mixed);
  });

  it('drops never-reviewed words for spelling and sentence modes when enough reviewed words exist', () => {
    const pool = [
      { id: 1, reviewCount: 0 },
      { id: 2, reviewCount: 3 },
      { id: 3, reviewCount: 0 },
      { id: 4, reviewCount: 1 },
      { id: 5, reviewCount: 2 },
    ];
    const spelling = filterWordsForMode(pool, 'spelling');
    expect(spelling.map(w => w.id)).toEqual([2, 4, 5]);

    const sentence = filterWordsForMode(pool, 'sentence');
    expect(sentence.map(w => w.id)).toEqual([2, 4, 5]);
  });

  it('returns reviewed words for spelling and sentence modes', () => {
    const pool = [
      { id: 1, reviewCount: 0 },
      { id: 2, reviewCount: 3 },
      { id: 3, reviewCount: 0 },
    ];
    expect(filterWordsForMode(pool, 'spelling')).toEqual([{ id: 2, reviewCount: 3 }]);
  });
});

describe('formatDate', () => {
  it('returns an empty string for a falsy date', () => {
    expect(formatDate(null)).toBe('');
    expect(formatDate('')).toBe('');
  });

  it("labels today's date as 'Bugun'", () => {
    expect(formatDate(new Date().toISOString())).toBe('Bugun');
  });

  it("labels yesterday's date as 'Kecha'", () => {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    expect(formatDate(yesterday.toISOString())).toBe('Kecha');
  });

  it('labels a date from a few days ago in days', () => {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    expect(formatDate(threeDaysAgo.toISOString())).toBe('3 kun oldin');
  });
});
