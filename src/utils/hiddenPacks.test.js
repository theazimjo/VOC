import { describe, it, expect } from 'vitest';
import { isRemovedLanguagePack } from './hiddenPacks';

describe('isRemovedLanguagePack', () => {
  it('flags the removed Sicilian and Greek packs by course id or name', () => {
    expect(isRemovedLanguagePack({ courseId: 'sicilian-a1' })).toBe(true);
    expect(isRemovedLanguagePack({ courseId: 'greek-a1', name: 'x' })).toBe(true);
    expect(isRemovedLanguagePack({ name: 'Sitsiliya tili A1' })).toBe(true);
    expect(isRemovedLanguagePack({ name: 'Yunon tili' })).toBe(true);
  });
  it('keeps every other pack', () => {
    expect(isRemovedLanguagePack({ name: 'Essential 3000 · Part 1', courseId: 'essential-3000' })).toBe(false);
    expect(isRemovedLanguagePack({ name: 'Science', courseId: 'science' })).toBe(false);
    expect(isRemovedLanguagePack(null)).toBe(false);
  });
});
