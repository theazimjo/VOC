import { describe, it, expect } from 'vitest';
import { levenshteinDistance, similarityRatio, findConfusableMatch } from './textSimilarity';

describe('levenshteinDistance', () => {
  it('is 0 for identical strings', () => {
    expect(levenshteinDistance('hello', 'hello')).toBe(0);
  });

  it('is case-insensitive', () => {
    expect(levenshteinDistance('Hello', 'hello')).toBe(0);
  });

  it('ignores surrounding whitespace', () => {
    expect(levenshteinDistance('  hello  ', 'hello')).toBe(0);
  });

  it('counts a single substitution as distance 1', () => {
    expect(levenshteinDistance('cat', 'bat')).toBe(1);
  });

  it('counts a single insertion/deletion as distance 1', () => {
    expect(levenshteinDistance('cat', 'cats')).toBe(1);
  });

  it('equals the length of the other string when one is empty', () => {
    expect(levenshteinDistance('', 'abc')).toBe(3);
    expect(levenshteinDistance('abc', '')).toBe(3);
  });
});

describe('similarityRatio', () => {
  it('is 1.0 for identical strings', () => {
    expect(similarityRatio('affect', 'affect')).toBe(1);
  });

  it('is 1.0 for two empty strings', () => {
    expect(similarityRatio('', '')).toBe(1);
  });

  it('is lower for confusable near-miss word pairs than for unrelated words', () => {
    // "affect" vs "effect" is a classic confusion pair — much closer than
    // "affect" vs a totally unrelated word.
    const confusable = similarityRatio('affect', 'effect');
    const unrelated = similarityRatio('affect', 'giraffe');
    expect(confusable).toBeGreaterThan(unrelated);
  });

  it('stays within [0, 1]', () => {
    const ratio = similarityRatio('completely', 'different');
    expect(ratio).toBeGreaterThanOrEqual(0);
    expect(ratio).toBeLessThanOrEqual(1);
  });
});

describe('findConfusableMatch', () => {
  const candidates = [
    { id: 'w1', word: 'although', translation: "garchi, biroq" },
    { id: 'w2', word: 'though', translation: "garchi" },
    { id: 'w3', word: 'giraffe', translation: 'jirafa' },
  ];

  it('finds a close match above the threshold', () => {
    const match = findConfusableMatch('garch', candidates, {
      excludeId: 'w1',
      getField: (c) => c.translation,
      threshold: 0.6,
    });
    expect(match?.id).toBe('w2');
  });

  it('never matches the excluded (current) word itself, even on an exact match', () => {
    // "garchi" is an exact match for w2's own translation, but w2 is excluded
    // (it's the word being answered) — w1's translation still clears a lower
    // threshold, so the match should fall through to w1, never w2.
    const match = findConfusableMatch('garchi', candidates, {
      excludeId: 'w2',
      getField: (c) => c.translation,
      threshold: 0.45,
    });
    expect(match?.id).toBe('w1');
  });

  it('returns null when nothing clears the threshold', () => {
    const match = findConfusableMatch('xyz', candidates, {
      excludeId: 'w1',
      getField: (c) => c.translation,
      threshold: 0.6,
    });
    expect(match).toBeNull();
  });

  it('returns null for empty typed text', () => {
    const match = findConfusableMatch('', candidates, {
      excludeId: 'w1',
      getField: (c) => c.translation,
    });
    expect(match).toBeNull();
  });

  it('picks the single best match when multiple candidates clear the threshold', () => {
    const closeCandidates = [
      { id: 'a', word: 'affect' },
      { id: 'b', word: 'effect' },
      { id: 'c', word: 'affect' }, // identical spelling, different id
    ];
    const match = findConfusableMatch('affect', closeCandidates, {
      excludeId: 'x',
      getField: (c) => c.word,
      threshold: 0.5,
    });
    expect(match.ratio).toBe(1);
    expect(['a', 'c']).toContain(match.id);
  });
});
