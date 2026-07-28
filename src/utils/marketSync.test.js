import { describe, it, expect } from 'vitest';
import { findSourceMarketPack, getMissingMarketWords } from './marketSync';

describe('findSourceMarketPack', () => {
  it('returns null for a null pack', () => {
    expect(findSourceMarketPack(null)).toBeNull();
  });

  it('matches by marketPackId when present', () => {
    const found = findSourceMarketPack({ marketPackId: 'irregular-verbs', name: 'Something Else' });
    expect(found?.id).toBe('irregular-verbs');
  });

  it('falls back to matching by name for packs installed before marketPackId existed', () => {
    const found = findSourceMarketPack({ name: 'Phrasal Verbs' });
    expect(found?.id).toBe('phrasal-verbs');
  });

  it('returns undefined when nothing matches', () => {
    expect(findSourceMarketPack({ name: 'Not A Real Pack' })).toBeUndefined();
  });
});

describe('getMissingMarketWords', () => {
  const marketPack = {
    words: [
      { word: 'Be' },
      { word: 'Beat' },
      { word: 'Become' },
    ],
  };

  it('returns all words when nothing is installed yet', () => {
    expect(getMissingMarketWords(marketPack, [])).toHaveLength(3);
  });

  it('excludes words already present, case- and whitespace-insensitively', () => {
    const existing = [{ word: '  be  ' }, { word: 'BEAT' }];
    const missing = getMissingMarketWords(marketPack, existing);
    expect(missing.map((w) => w.word)).toEqual(['Become']);
  });

  it('returns an empty array for a null market pack', () => {
    expect(getMissingMarketWords(null, [])).toEqual([]);
  });

  it('returns nothing missing once every word is already installed', () => {
    const existing = marketPack.words.map((w) => ({ word: w.word }));
    expect(getMissingMarketWords(marketPack, existing)).toHaveLength(0);
  });
});
