import { describe, it, expect } from 'vitest';
import { courseTotals, courseUpdates, mapUnit, mergeWords, monthsOf, normalizePOS } from './courseEditing';

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
    const incoming = [
      { id: 'n1', word: 'apple', translation: 'Olma!', partOfSpeech: 'noun', definition: "yangi ta'rif", example: 'x' },
      { id: 'n2', word: 'Pear', translation: 'Nok', partOfSpeech: 'noun', definition: '', example: '' },
    ];
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

describe('libraryBookToCourse', () => {
  it('makes one topic per chapter, in order, with editable word ids', async () => {
    const { libraryBookToCourse } = await import('./courseEditing');
    const course = libraryBookToCourse({
      name: 'Science',
      level: 'intermediate',
      words: [
        { word: 'cell', translation: 'hujayra', example: 'A cell.', partOfSpeech: 'noun', topic: 'Ch.01 · Plants' },
        { word: 'root', translation: 'ildiz', example: 'A root.', partOfSpeech: 'noun', topic: 'Ch.01 · Plants' },
        { word: 'atom', translation: 'atom', example: 'An atom.', partOfSpeech: 'noun', topic: 'Ch.02 · Matter' },
      ],
    });
    const units = course.months[0].units;
    expect(course.level).toBe('Intermediate');
    expect(units.map((u) => [u.title, u.words.length])).toEqual([['Ch.01 · Plants', 2], ['Ch.02 · Matter', 1]]);
    expect(units[0].words[0].id).toBeTruthy();
  });
});

describe('libraryBookToCourse Russian', () => {
  it('keeps the Russian translation of a library word', async () => {
    const { libraryBookToCourse } = await import('./courseEditing');
    const course = libraryBookToCourse({ id: 'x', name: 'X', words: [{ word: 'cell', translation: 'hujayra', translationRu: 'клетка', example: 'A cell.', topic: 'T' }] });
    expect(course.months[0].units[0].words[0].translationRu).toBe('клетка');
  });
});

describe('syncCourseWithBook', () => {
  it('adds missing library words and Russian, never overwriting what the center changed', async () => {
    const { syncCourseWithBook } = await import('./courseEditing');
    const book = { id: 'science', name: 'Science', words: [
      { word: 'cell', translation: 'hujayra', translationRu: 'клетка', topic: 'Ch.01' },
      { word: 'root', translation: 'ildiz', translationRu: 'корень', topic: 'Ch.01' },
    ] };
    const months = [{ id: 'm', units: [
      { id: 'u', title: 'Ch.01', words: [{ id: 'w1', word: 'cell', translation: 'MY OWN TRANSLATION' }] },
      { id: 'x', title: 'My own topic', words: [{ id: 'w9', word: 'cell' }] },
    ] }];
    const res = syncCourseWithBook(months, book);
    const words = res.months[0].units[0].words;
    expect(words.find((w) => w.word === 'cell')).toMatchObject({ translation: 'MY OWN TRANSLATION', translationRu: 'клетка' });
    expect(words.find((w) => w.word === 'root')).toMatchObject({ translationRu: 'корень' });
    expect(res).toMatchObject({ added: 1, filled: 1, matched: 1 });
    expect(res.months[0].units[1].words).toEqual([{ id: 'w9', word: 'cell' }]); // other topics untouched
    expect(syncCourseWithBook(res.months, book)).toMatchObject({ added: 0, filled: 0 }); // idempotent
  });
});
