import { describe, it, expect } from 'vitest';
import { courseTotals, courseUpdates, mapUnit, mergeWords, monthsOf, normalizePOS, parseWordList } from './courseEditing';

const strip = (words) => words.map(({ id, ...w }) => w); // eslint-disable-line no-unused-vars

describe('parseWordList', () => {
  it('reads "word, translation" entries separated by dots', () => {
    expect(strip(parseWordList('Apple, Olma. Book, Kitob. Run, Yugurmoq'))).toEqual([
      { word: 'Apple', translation: 'Olma', partOfSpeech: 'noun', definition: '', example: '' },
      { word: 'Book', translation: 'Kitob', partOfSpeech: 'noun', definition: '', example: '' },
      { word: 'Run', translation: 'Yugurmoq', partOfSpeech: 'noun', definition: '', example: '' },
    ]);
  });

  it('reads full entries with part of speech, definition and example', () => {
    const [w] = parseWordList('Apple, Olma, noun, Qizil meva, I ate an apple.');
    expect(w).toMatchObject({ word: 'Apple', translation: 'Olma', partOfSpeech: 'noun', definition: 'Qizil meva', example: 'I ate an apple' });
  });

  it('treats a non-POS third field as a definition', () => {
    const [w] = parseWordList('Run, Yugurmoq, tez harakat');
    expect(w).toMatchObject({ partOfSpeech: 'other', definition: 'tez harakat' });
  });

  it('accepts new lines, semicolons and other separators', () => {
    expect(parseWordList('cat - mushuk\ndog: it; bird | qush').map((w) => w.translation)).toEqual(['mushuk', 'it', 'qush']);
  });

  it('ignores lines without a translation', () => {
    expect(parseWordList('hello\n\n  ')).toEqual([]);
  });
});

describe('normalizePOS', () => {
  it('understands English and Uzbek names', () => {
    expect(normalizePOS("fe'l")).toBe('verb');
    expect(normalizePOS('Sifat')).toBe('adjective');
    expect(normalizePOS('xyz')).toBeNull();
  });
});

describe('mergeWords', () => {
  it('adds new words and updates existing ones instead of duplicating', () => {
    const existing = [{ id: 'a', word: 'Apple', translation: 'olma', partOfSpeech: 'noun', definition: 'eski', example: '' }];
    const incoming = parseWordList('apple, Olma!, noun, yangi ta\'rif, x. Pear, Nok');
    const { words, added, updated } = mergeWords(existing, incoming);
    expect(added).toBe(1);
    expect(updated).toBe(1);
    expect(words).toHaveLength(2);
    expect(words[0]).toMatchObject({ id: 'a', translation: 'Olma!', definition: "yangi ta'rif" });
  });
});

describe('course structure', () => {
  const months = [
    { id: 'm1', title: '1-oy', units: [{ id: 'u1', title: 'A', words: [{ id: 'w1' }, { id: 'w2' }] }, { id: 'u2', title: 'B', words: [] }] },
    { id: 'm2', title: '2-oy', units: [{ id: 'u3', title: 'C', words: [{ id: 'w3' }] }] },
  ];

  it('flattens units and words with counts', () => {
    const u = courseUpdates(months);
    expect(u.units.map((x) => x.id)).toEqual(['u1', 'u2', 'u3']);
    expect(u.wordCount).toBe(3);
    expect(u.sectionsCount).toBe(3);
    expect(courseTotals(months)).toEqual({ months: 2, units: 3, words: 3 });
  });

  it('updates exactly one unit', () => {
    const next = mapUnit(months, 'm1', 'u2', (u) => ({ ...u, title: 'B2' }));
    expect(next[0].units[1].title).toBe('B2');
    expect(next[0].units[0]).toBe(months[0].units[0]);
    expect(next[1]).toBe(months[1]);
  });

  it('shows legacy flat packs as one month', () => {
    expect(monthsOf({ words: [{ id: 'w' }] })[0].units[0].words).toHaveLength(1);
    expect(monthsOf({ units: [{ id: 'u' }] })[0].units).toHaveLength(1);
    expect(monthsOf({})).toEqual([]);
  });
});
