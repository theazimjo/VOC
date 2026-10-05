import { describe, it, expect } from 'vitest';
import { importable, parseWordCells, parseWordText, splitQuoted } from './wordImport';

const pick = (rows) => rows.map((r) => [r.word, r.translation]);

describe('parseWordText', () => {
  it('reads one word per line with any common separator', () => {
    const rows = parseWordText('cat - mushuk\ndog: it\nbird | qush\nfish\tbaliq\nsun = quyosh\nmoon; oy\nstar, yulduz');
    expect(pick(rows)).toEqual([
      ['cat', 'mushuk'], ['dog', 'it'], ['bird', 'qush'], ['fish', 'baliq'], ['sun', 'quyosh'], ['moon', 'oy'], ['star', 'yulduz'],
    ]);
  });

  it('keeps hyphenated words whole', () => {
    expect(pick(parseWordText('ice-cream - muzqaymoq\nT-shirt, futbolka'))).toEqual([['ice-cream', 'muzqaymoq'], ['T-shirt', 'futbolka']]);
  });

  it('keeps commas inside a translation', () => {
    expect(pick(parseWordText('mother, ona, onajon'))).toEqual([['mother', 'ona, onajon']]);
  });

  it('reads full comma entries with part of speech, definition and example', () => {
    const [r] = parseWordText('run, yugurmoq, verb, tez harakat, I run every day.');
    expect(r).toMatchObject({ word: 'run', translation: 'yugurmoq', partOfSpeech: 'verb', definition: 'tez harakat', example: 'I run every day.' });
  });

  it('keeps dots inside examples, but splits "a, b. c, d" lists', () => {
    expect(parseWordText('run\tyugurmoq\tverb\t\tI run. You run.')[0].example).toBe('I run. You run.');
    expect(pick(parseWordText('Apple, Olma. Book, Kitob. Run, Yugurmoq'))).toEqual([['Apple', 'Olma'], ['Book', 'Kitob'], ['Run', 'Yugurmoq']]);
  });

  it('strips numbering and bullets, skips a header line', () => {
    expect(pick(parseWordText("So'z - Tarjima\n1. apple - olma\n2) pen - ruchka\n• cup - piyola"))).toEqual([
      ['apple', 'olma'], ['pen', 'ruchka'], ['cup', 'piyola'],
    ]);
  });

  it('guesses verbs from Uzbek infinitives, otherwise noun', () => {
    const rows = parseWordText('go - bormoq\nbook - kitob\nsee - ko\'rmoq, qaramoq');
    expect(rows.map((r) => r.partOfSpeech)).toEqual(['verb', 'noun', 'verb']);
  });

  it('does not take nouns ending in -moq for verbs', () => {
    expect(parseWordText('finger - barmoq\nice-cream - muzqaymoq').map((r) => r.partOfSpeech)).toEqual(['noun', 'noun']);
  });

  it('reports bad lines with their line number and marks repeats', () => {
    const rows = parseWordText('apple - olma\n\nhello\napple - olma');
    expect(rows[1]).toMatchObject({ line: 3, error: "Tarjima yo'q" });
    expect(rows[2]).toMatchObject({ line: 4, duplicate: true });
    expect(importable(rows)).toHaveLength(1);
  });
});

describe('parseWordCells', () => {
  it('uses header names to find columns in any order', () => {
    const rows = parseWordCells([
      ['Tarjima', "So'z", 'Mavzu', 'Misol'],
      ['olma', 'apple', 'Food', 'An apple a day.'],
      ['', '', '', ''],
      ['ot', 'horse', 'Animals', ''],
    ]);
    expect(rows.map((r) => [r.word, r.translation, r.topic, r.line])).toEqual([
      ['apple', 'olma', 'Food', 2],
      ['horse', 'ot', 'Animals', 4],
    ]);
    expect(rows[0].example).toBe('An apple a day.');
  });

  it('falls back to positional columns and the sheet name as topic', () => {
    const rows = parseWordCells([['go', 'bormoq', 'fe\'l'], [12, "o'n ikki"]], 'Sheet A');
    expect(rows[0]).toMatchObject({ word: 'go', translation: 'bormoq', partOfSpeech: 'verb', topic: 'Sheet A' });
    expect(rows[1]).toMatchObject({ word: '12', translation: "o'n ikki" });
  });
});

describe('splitQuoted', () => {
  it('honours quotes and escaped quotes', () => {
    expect(splitQuoted('"a, b",c,"say ""hi"""', ',')).toEqual(['a, b', 'c', 'say "hi"']);
  });
});

it('reads a lone sentence after the part of speech as the example', () => {
  expect(parseWordText('run - yugurmoq - verb - I run every day.')[0]).toMatchObject({ partOfSpeech: 'verb', definition: '', example: 'I run every day.' });
  expect(parseWordText('run - yugurmoq - verb - tez harakat')[0]).toMatchObject({ definition: 'tez harakat', example: '' });
});

it('keeps an empty field between dashes', () => {
  const [r] = parseWordText('nice - chiroyli - adjective - - A nice day.');
  expect(r).toMatchObject({ partOfSpeech: 'adjective', definition: '', example: 'A nice day.' });
});

describe('lists pasted from an AI chat', () => {
  it('drops the chatter, numbering, bold and headings', () => {
    const ai = [
      'Albatta! Mana "Family" mavzusi bo\'yicha so\'zlar:',
      '',
      '### Family',
      '1. **mother** – ona – noun – bolaning onasi – My mother is a doctor.',
      '2) **father** - ota',
      '- brother - aka',
      '* sister → opa',
      '**Food**',
      '10 - o\'n',
      '---',
      'Umid qilamanki, bu foydali bo\'ladi!',
    ].join('\n');
    const rows = parseWordText(ai);
    expect(rows.map((r) => [r.word, r.translation])).toEqual([
      ['mother', 'ona'], ['father', 'ota'], ['brother', 'aka'], ['sister', 'opa'], ['10', "o'n"],
    ]);
    expect(rows[0]).toMatchObject({ partOfSpeech: 'noun', definition: 'bolaning onasi', example: 'My mother is a doctor.' });
    expect(rows.every((r) => !r.error)).toBe(true);
  });

  it('reads a markdown table', () => {
    const table = '| Word | Translation | Part of speech |\n|------|-------------|------|\n| run | yugurmoq | verb |\n| red | qizil | adjective |';
    expect(parseWordText(table).map((r) => [r.word, r.translation, r.partOfSpeech])).toEqual([
      ['run', 'yugurmoq', 'verb'], ['red', 'qizil', 'adjective'],
    ]);
  });

  it('takes a part of speech from brackets and skips a comma intro', () => {
    const rows = parseWordText('Here are 20 useful words about family, with translations:\napple (noun) - olma\nrun (v.) - yugurmoq\nquick - tez (sifat)');
    expect(rows.map((r) => [r.word, r.translation, r.partOfSpeech])).toEqual([
      ['apple', 'olma', 'noun'], ['run', 'yugurmoq', 'verb'], ['quick', 'tez', 'adjective'],
    ]);
  });

  it('keeps questions that are real entries', () => {
    expect(parseWordText('How are you? - Qalaysan?').map((r) => r.word)).toEqual(['How are you?']);
  });
});

describe('the "|" format (AI prompt)', () => {
  it('keeps commas and dashes inside the fields', () => {
    const [r] = parseWordText('run | yugurmoq, chopmoq | verb | tez - juda tez harakatlanmoq | I run every morning, even in winter.');
    expect(r).toMatchObject({
      word: 'run',
      translation: 'yugurmoq, chopmoq',
      partOfSpeech: 'verb',
      definition: 'tez - juda tez harakatlanmoq',
      example: 'I run every morning, even in winter.',
    });
  });

  it('still reads plain " - " lines typed by hand', () => {
    expect(parseWordText('apple - olma\nbook | kitob').map((r) => [r.word, r.translation])).toEqual([['apple', 'olma'], ['book', 'kitob']]);
  });
});
