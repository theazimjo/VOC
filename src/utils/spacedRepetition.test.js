import { describe, it, expect } from 'vitest';
import {
  calculateNextReview,
  applyReview,
  getDueWords,
  getMasteryLevel,
  responseToQuality,
  initWordProgress,
} from './spacedRepetition';

describe('applyReview', () => {
  it('increments reviewCount from the word record', () => {
    const word = { reviewCount: 4, stability: 5 };
    const result = applyReview(word, { isCorrect: true });
    expect(result.reviewCount).toBe(5);
  });

  it('starts reviewCount at 1 for a brand-new word', () => {
    const result = applyReview({}, { isCorrect: true });
    expect(result.reviewCount).toBe(1);
  });

  it('grows stability/interval on a correct answer', () => {
    const word = { stability: 5, reviewCount: 1 };
    const result = applyReview(word, { isCorrect: true, confidence: 4 });
    expect(result.stability).toBeGreaterThan(5);
    expect(result.interval).toBeGreaterThan(0);
  });

  it('shrinks stability on a wrong answer', () => {
    const word = { stability: 10, reviewCount: 1 };
    const result = applyReview(word, { isCorrect: false });
    expect(result.stability).toBeLessThan(10);
  });

  it('schedules nextReview in the future', () => {
    const result = applyReview({ stability: 5 }, { isCorrect: true });
    expect(new Date(result.nextReview).getTime()).toBeGreaterThan(Date.now());
  });

  it('seeds stability from a legacy interval when stability is absent', () => {
    const legacyWord = { interval: 8, reviewCount: 2 };
    const freshWord = { reviewCount: 2 };
    const legacyResult = applyReview({ ...legacyWord }, { isCorrect: false });
    const freshResult = applyReview({ ...freshWord }, { isCorrect: false });
    // Legacy word's decay should start from its old interval (8), not from
    // a brand-new INITIAL_STABILITY (1) — so it should end up higher.
    expect(legacyResult.stability).toBeGreaterThan(freshResult.stability);
  });

  it('keeps mastery within 0..100', () => {
    const result = applyReview({ stability: 1000 }, { isCorrect: true, retrievalType: 'active_recall' });
    expect(result.mastery).toBeLessThanOrEqual(100);
    expect(result.mastery).toBeGreaterThanOrEqual(0);
  });

  describe('active-recall confirmation gate', () => {
    it('caps mastery well below 100 on passive-only reviews, however many', () => {
      let word = { activeRecallPasses: 0 };
      for (let i = 0; i < 15; i++) {
        word = applyReview(word, { isCorrect: true, confidence: 5, retrievalType: 'passive_recall' });
      }
      expect(word.mastery).toBeLessThan(70);
      expect(word.activeRecallPasses).toBe(0);
    });

    it('lets mastery climb past the passive ceiling after one correct active-recall pass', () => {
      let word = { activeRecallPasses: 0 };
      for (let i = 0; i < 10; i++) {
        word = applyReview(word, { isCorrect: true, confidence: 5, retrievalType: 'passive_recall' });
      }
      const cappedMastery = word.mastery;

      word = applyReview(word, { isCorrect: true, confidence: 5, retrievalType: 'active_recall' });
      expect(word.activeRecallPasses).toBe(1);

      for (let i = 0; i < 10; i++) {
        word = applyReview(word, { isCorrect: true, confidence: 5, retrievalType: 'passive_recall' });
      }
      expect(word.mastery).toBeGreaterThan(cappedMastery);
    });

    it('never lowers a legacy word\'s existing stability just because activeRecallPasses is untracked', () => {
      const legacyWord = { stability: 40, reviewCount: 5 };
      const result = applyReview(legacyWord, { isCorrect: true, confidence: 5, retrievalType: 'passive_recall' });
      expect(result.stability).toBeGreaterThanOrEqual(40);
    });
  });
});

describe('calculateNextReview', () => {
  it('treats quality >= 3 as a correct recall', () => {
    const result = calculateNextReview(4, { stability: 5 });
    expect(result.stability).toBeGreaterThan(5);
  });

  it('treats quality < 3 as an incorrect recall', () => {
    const result = calculateNextReview(1, { stability: 5 });
    expect(result.stability).toBeLessThan(5);
  });

  it('clamps out-of-range quality values into 0..5', () => {
    const tooHigh = calculateNextReview(99, { stability: 5 });
    const capped = calculateNextReview(5, { stability: 5 });
    expect(tooHigh.stability).toBe(capped.stability);
  });
});

describe('getDueWords', () => {
  it('includes words that have never been reviewed', () => {
    const words = [{ id: 1, nextReview: null }];
    expect(getDueWords(words)).toHaveLength(1);
  });

  it('excludes words scheduled in the future', () => {
    const words = [{ id: 1, nextReview: new Date(Date.now() + 86400000).toISOString() }];
    expect(getDueWords(words)).toHaveLength(0);
  });

  it('includes words whose review date has passed', () => {
    const words = [{ id: 1, nextReview: new Date(Date.now() - 86400000).toISOString() }];
    expect(getDueWords(words)).toHaveLength(1);
  });
});

describe('getMasteryLevel', () => {
  it('labels 95 as fully mastered', () => {
    expect(getMasteryLevel(95).label).toBe("O'zlashtirilgan");
  });

  it('labels 0 as brand new', () => {
    expect(getMasteryLevel(0).label).toBe('Yangi');
  });
});

describe('responseToQuality', () => {
  it('maps each named response to its quality score', () => {
    expect(responseToQuality('easy')).toBe(5);
    expect(responseToQuality('good')).toBe(4);
    expect(responseToQuality('hard')).toBe(3);
    expect(responseToQuality('again')).toBe(1);
  });

  it('defaults unknown responses to 3', () => {
    expect(responseToQuality('unknown')).toBe(3);
  });
});

describe('initWordProgress', () => {
  it('starts a new word at zero mastery with no scheduled review', () => {
    const progress = initWordProgress();
    expect(progress.mastery).toBe(0);
    expect(progress.reviewCount).toBe(0);
    expect(progress.nextReview).toBeNull();
  });
});
