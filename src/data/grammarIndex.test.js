import { describe, it, expect } from 'vitest';
import { grammarIndex } from './grammarIndex';
import { grammarData } from './grammarData';
import { grammarSnippet } from './grammarSnippet';

describe('grammarIndex', () => {
  it('matches the grammar data (run scripts/gen-grammar-index.mjs if this fails)', () => {
    Object.entries(grammarData).forEach(([level, data]) => {
      const idx = grammarIndex[level];
      expect(idx, level).toBeTruthy();
      expect(idx.topics.map((t) => t.id), level).toEqual(data.topics.map((t) => t.id));
      data.topics.forEach((t, i) => {
        expect(idx.topics[i].title).toBe(t.title);
        expect(idx.topics[i].icon).toBe(t.icon);
        expect(idx.topics[i].tag).toBe(t.tag);
        expect(idx.topics[i].snippet).toBe(grammarSnippet(t));
      });
    });
  });
});
