import { describe, it, expect } from 'vitest';
import { Tree, setIn, getIn, resolveValue, expandUpdate, splitPath } from './tree';

const S = splitPath;

describe('setIn', () => {
  it('copies only the path and leaves the original untouched', () => {
    const a = { x: { y: 1 }, z: { k: 2 } };
    const b = setIn(a, S('x/y'), 5);
    expect(a.x.y).toBe(1);
    expect(b.x.y).toBe(5);
    expect(b.z).toBe(a.z);
  });
  it('deletes with null and drops objects that become empty', () => {
    expect(setIn({ a: { b: 1 } }, S('a/b'), null)).toBeNull();
    expect(setIn({ a: { b: 1 }, c: 2 }, S('a/b'), null)).toEqual({ c: 2 });
  });
  it('creates missing parents', () => {
    expect(setIn(null, S('a/b/c'), 1)).toEqual({ a: { b: { c: 1 } } });
  });
  it('keeps an array an array when an element is set', () => {
    expect(setIn([1, 2], S('1'), 9)).toEqual([1, 9]);
  });
});

describe('resolveValue', () => {
  it('resolves server timestamps and increments', () => {
    expect(resolveValue({ '.sv': 'timestamp' }, undefined, 123)).toBe(123);
    expect(resolveValue({ n: { '.sv': { increment: 2 } } }, { n: 3 })).toEqual({ n: 5 });
  });
  it('drops nulls inside written objects', () => {
    expect(resolveValue({ a: 1, b: null })).toEqual({ a: 1 });
  });
});

describe('Tree', () => {
  const make = () => {
    const t = new Tree();
    t.record(S('users/u1/packs'), { p1: { name: 'A' } });
    t.record(S('users/u1/words/p1'), { w1: { word: 'cat', mastery: 10 } });
    return t;
  };

  it('looks values up through a covering entry', () => {
    const t = make();
    expect(t.lookup(S('users/u1/packs/p1/name'))).toEqual({ found: true, value: 'A' });
    expect(t.lookup(S('users/u1/packs/p9'))).toEqual({ found: true, value: null });
    expect(t.lookup(S('users/u2')).found).toBe(false);
  });

  it('a wider snapshot swallows narrower ones', () => {
    const t = make();
    t.record(S('users/u1'), { packs: {}, words: {} });
    expect(t.entries.size).toBe(1);
    expect(t.lookup(S('users/u1/words')).value).toEqual({});
  });

  it('a narrower snapshot patches the covering one', () => {
    const t = new Tree();
    t.record(S('users/u1'), { profile: { name: 'x' } });
    t.record(S('users/u1/packs'), { p: 1 });
    expect(t.lookup(S('users/u1')).value).toEqual({ profile: { name: 'x' }, packs: { p: 1 } });
  });

  it('applies a local multi-path update to every entry it touches', () => {
    const t = make();
    const changed = t.applyWrites(expandUpdate(S('users/u1'), {
      'words/p1/w1/mastery': 50,
      'words/p1/w2': { word: 'dog' },
      'packs/p1/wordCount': { '.sv': { increment: 1 } },
    }));
    expect(changed.sort()).toEqual(['users/u1/packs', 'users/u1/words/p1']);
    expect(t.lookup(S('users/u1/words/p1/w1/mastery')).value).toBe(50);
    expect(t.lookup(S('users/u1/words/p1/w2/word')).value).toBe('dog');
    expect(t.lookup(S('users/u1/packs/p1/wordCount')).value).toBe(1);
  });

  it('a write above an entry replaces what is inside it', () => {
    const t = make();
    t.applyWrites([{ segs: S('users/u1/words'), value: { p1: { w9: { word: 'bird' } } } }]);
    expect(t.lookup(S('users/u1/words/p1')).value).toEqual({ w9: { word: 'bird' } });
    t.applyWrites([{ segs: S('users/u1/words'), value: null }]);
    expect(t.lookup(S('users/u1/words/p1')).value).toBeNull();
  });

  it('lists children from a covering entry or from child entries', () => {
    const t = make();
    expect([...t.lookupChildren(S('users/u1/words')).children.keys()]).toEqual(['p1']);
    t.record(S('users/u1/words/p2'), { a: { word: 'x' } });
    expect([...t.lookupChildren(S('users/u1/words')).children.keys()].sort()).toEqual(['p1', 'p2']);
    expect(getIn(t.lookup(S('users/u1/words/p2')).value, ['a', 'word'])).toBe('x');
  });
});
