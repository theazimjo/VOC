import { describe, it, expect } from 'vitest';
import { CHAPTER_TEXT_KEYS } from './chapterTextKeys';
import { scienceChapterText } from './scienceChapterText';
import { healthChapterText } from './healthChapterText';
import { essential3000ChapterText } from './essential3000ChapterText';

describe('chapterTextKeys', () => {
  it('lists exactly the topics that have a chapter text', () => {
    const real = new Set([
      ...Object.keys(scienceChapterText),
      ...Object.keys(healthChapterText),
      ...Object.keys(essential3000ChapterText),
    ]);
    expect([...CHAPTER_TEXT_KEYS].sort()).toEqual([...real].sort());
  });
});
