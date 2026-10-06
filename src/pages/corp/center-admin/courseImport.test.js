import { describe, expect, it } from 'vitest';
import { applyImportedRows, parseCourseText } from './wordImport';
import { moveUnit } from './courseEditing';

describe('parseCourseText', () => {
  it('starts a topic at a heading and files the words under it', () => {
    const rows = parseCourseText('# Family\nmother - ona\nfather - ota\n## Food\napple - olma');
    expect(rows.map((r) => [r.topic, r.word])).toEqual([['Family', 'mother'], ['Family', 'father'], ['Food', 'apple']]);
    expect(rows[2].line).toBe(5);
  });
  it('understands "Topic: X" lines and leaves earlier words topic-less', () => {
    const rows = parseCourseText('hello - salom\nTopic: Travel\nbus - avtobus');
    expect(rows.map((r) => r.topic)).toEqual(['', 'Travel']);
  });
  it('only flags a repeat inside the same topic', () => {
    const rows = parseCourseText('# A\ncat - mushuk - noun - A cat.\n# B\ncat - mushuk - noun - A cat.\ncat - mushuk - noun - A cat.');
    expect(rows.map((r) => !!r.duplicate)).toEqual([false, false, true]);
  });
});

describe('applyImportedRows', () => {
  const row = (topic, word) => ({ topic, word, translation: 't', partOfSpeech: 'noun', definition: '', example: '' });
  it('creates the month and topics, falling back for topic-less rows', () => {
    const r = applyImportedRows([], [row('Family', 'mother'), row('', 'hello')], 'Imported');
    expect(r.months).toHaveLength(1);
    expect(r.months[0].units.map((u) => u.title)).toEqual(['Family', 'Imported']);
    expect([r.addedTopics, r.added, r.updated]).toEqual([2, 2, 0]);
  });
  it('merges into an existing topic regardless of case', () => {
    const months = [{ id: 'm1', title: 'M', units: [{ id: 'u1', title: 'Family', words: [{ id: 'w1', word: 'mother', translation: 'old' }] }] }];
    const r = applyImportedRows(months, [row('family', 'mother'), row('family', 'father')], 'Imported');
    expect(r.months[0].units).toHaveLength(1);
    expect(r.months[0].units[0].words).toHaveLength(2);
    expect([r.addedTopics, r.added, r.updated]).toEqual([0, 1, 1]);
  });
});

describe('moveUnit', () => {
  const months = [{ id: 'm', units: [{ id: 'a' }, { id: 'b' }, { id: 'c' }] }];
  it('swaps with the neighbour and stops at the ends', () => {
    expect(moveUnit(months, 'm', 'b', -1)[0].units.map((u) => u.id)).toEqual(['b', 'a', 'c']);
    expect(moveUnit(months, 'm', 'a', -1)[0].units.map((u) => u.id)).toEqual(['a', 'b', 'c']);
    expect(moveUnit(months, 'm', 'c', 1)[0].units.map((u) => u.id)).toEqual(['a', 'b', 'c']);
  });
});

describe('example is required', () => {
  it('flags a word without an example sentence', () => {
    const [row] = parseCourseText('# A\ncat - mushuk');
    expect(row.error).toBe("Misol yo'q");
  });
});
