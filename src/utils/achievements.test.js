import { describe, it, expect } from 'vitest';
import { getAchievementProgress } from './achievements';

describe('getAchievementProgress', () => {
  it('unlocks nothing at zero stats', () => {
    const progress = getAchievementProgress({ totalWords: 0, masteredWords: 0, streakCount: 0 });
    expect(progress.every((a) => !a.unlocked)).toBe(true);
  });

  it('unlocks exactly the word-count badges at or below the current total', () => {
    const progress = getAchievementProgress({ totalWords: 60, masteredWords: 0, streakCount: 0 });
    const wordBadges = progress.filter((a) => a.category === 'words');
    expect(wordBadges.find((a) => a.id === 'words-10').unlocked).toBe(true);
    expect(wordBadges.find((a) => a.id === 'words-50').unlocked).toBe(true);
    expect(wordBadges.find((a) => a.id === 'words-100').unlocked).toBe(false);
  });

  it('unlocks a badge exactly at its threshold', () => {
    const progress = getAchievementProgress({ totalWords: 10, masteredWords: 0, streakCount: 0 });
    expect(progress.find((a) => a.id === 'words-10').unlocked).toBe(true);
  });

  it('tracks streak and mastered badges independently of word count', () => {
    const progress = getAchievementProgress({ totalWords: 0, masteredWords: 100, streakCount: 7 });
    expect(progress.find((a) => a.id === 'mastered-100').unlocked).toBe(true);
    expect(progress.find((a) => a.id === 'streak-7').unlocked).toBe(true);
    expect(progress.find((a) => a.id === 'streak-30').unlocked).toBe(false);
  });

  it('reports current progress toward the next threshold', () => {
    const progress = getAchievementProgress({ totalWords: 30, masteredWords: 0, streakCount: 0 });
    const nextBadge = progress.find((a) => a.id === 'words-50');
    expect(nextBadge.current).toBe(30);
    expect(nextBadge.unlocked).toBe(false);
  });
});
