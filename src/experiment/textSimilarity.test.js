import { describe, it, expect } from 'vitest';
import { levenshteinDistance, similarityRatio } from './textSimilarity';

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
