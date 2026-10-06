import { describe, expect, it } from 'vitest';
import { parseWordCells, syncGridRows, toWord } from './wordImport';
import { localizeWord } from '../student/learn/utils';

describe('Russian translation', () => {
  it('reads a "Russian" column and keeps it on the word', () => {
    const [row] = parseWordCells([
      ['Word', 'Translation', 'Russian', 'Example'],
      ['apple', 'olma', 'яблоко', 'I eat an apple.'],
    ]);
    expect(row).toMatchObject({ translationRu: 'яблоко', error: null });
    expect(toWord(row)).toMatchObject({ translation: 'olma', translationRu: 'яблоко' });
  });

  it('is optional', () => {
    const [row] = parseWordCells([['Word', 'Translation', 'Example'], ['apple', 'olma', 'I eat an apple.']]);
    expect(row.error).toBeNull();
    expect(toWord(row).translationRu).toBeUndefined();
  });

  it('live sync keeps the Russian text when a word is edited in place', () => {
    const months = [{ id: 'm', units: [{ id: 'u', title: 'A', words: [{ id: 'w1', word: 'cat', translation: 'mushuk', example: 'A cat.' }] }] }];
    const { months: next } = syncGridRows(months, [{ id: 'w1', word: 'cat', translation: 'mushuk', translationRu: 'кошка', partOfSpeech: 'noun', example: 'A cat.' }], [], { unitId: 'u' });
    expect(next[0].units[0].words).toHaveLength(1);
    expect(next[0].units[0].words[0].translationRu).toBe('кошка');
  });

  it('students who picked Russian see it, others and gaps keep Uzbek', () => {
    const w = { word: 'cat', translation: 'mushuk', translationRu: 'кошка' };
    expect(localizeWord(w, 'ru').translation).toBe('кошка');
    expect(localizeWord(w, 'en').translation).toBe('mushuk');
    expect(localizeWord({ word: 'dog', translation: 'it' }, 'ru').translation).toBe('it');
  });
});
