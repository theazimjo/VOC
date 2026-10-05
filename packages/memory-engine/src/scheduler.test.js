import { describe, it, expect } from 'vitest';
import {
  calculateNextReview,
  applyReview,
  getDueWords,
  getMasteryLevel,
  responseToQuality,
  initWordProgress,
  stabilityToMastery,
} from './scheduler.js';

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

    it('does not lift the ceiling after a single active-recall pass — one angle is not "every angle"', () => {
      let word = { activeRecallPasses: 0 };
      for (let i = 0; i < 10; i++) {
        word = applyReview(word, { isCorrect: true, confidence: 5, retrievalType: 'passive_recall' });
      }
      const cappedMastery = word.mastery;

      word = applyReview(word, { isCorrect: true, confidence: 5, retrievalType: 'active_recall', mode: 'spelling' });
      expect(word.activeRecallPasses).toBe(1);
      expect(word.confirmedModes).toEqual(['spelling']);

      for (let i = 0; i < 10; i++) {
        word = applyReview(word, { isCorrect: true, confidence: 5, retrievalType: 'passive_recall' });
      }
      expect(word.mastery).toBeLessThanOrEqual(cappedMastery + 1); // still ceiling-bound (rounding tolerance)
    });

    it('lets mastery climb past the passive ceiling once confirmed from two distinct active-recall angles', () => {
      let word = { activeRecallPasses: 0 };
      for (let i = 0; i < 10; i++) {
        word = applyReview(word, { isCorrect: true, confidence: 5, retrievalType: 'passive_recall' });
      }
      const cappedMastery = word.mastery;

      word = applyReview(word, { isCorrect: true, confidence: 5, retrievalType: 'active_recall', mode: 'spelling' });
      word = applyReview(word, { isCorrect: true, confidence: 5, retrievalType: 'active_recall', mode: 'sentence' });
      expect(word.confirmedModes.sort()).toEqual(['sentence', 'spelling']);

      for (let i = 0; i < 10; i++) {
        word = applyReview(word, { isCorrect: true, confidence: 5, retrievalType: 'passive_recall' });
      }
      expect(word.mastery).toBeGreaterThan(cappedMastery);
    });

    it('does not double-count repeated passes from the same mode toward confirmedModes', () => {
      let word = { activeRecallPasses: 0 };
      word = applyReview(word, { isCorrect: true, confidence: 5, retrievalType: 'active_recall', mode: 'spelling' });
      word = applyReview(word, { isCorrect: true, confidence: 5, retrievalType: 'active_recall', mode: 'spelling' });
      expect(word.confirmedModes).toEqual(['spelling']);
    });

    it('never lowers a legacy word\'s existing stability just because confirmedModes is untracked', () => {
      const legacyWord = { stability: 40, reviewCount: 5 };
      const result = applyReview(legacyWord, { isCorrect: true, confidence: 5, retrievalType: 'passive_recall' });
      expect(result.stability).toBeGreaterThanOrEqual(40);
    });
  });

  describe('review interval cap', () => {
    it('never schedules a next review more than 70 days out, however high stability climbs', () => {
      let word = { stability: 1 };
      for (let i = 0; i < 40; i++) {
        word = applyReview(word, {
          isCorrect: true,
          confidence: 5,
          retrievalType: 'active_recall',
          mode: i % 2 === 0 ? 'spelling' : 'sentence',
        });
      }
      const daysUntilNext = (new Date(word.nextReview) - Date.now()) / 86400000;
      expect(daysUntilNext).toBeLessThanOrEqual(70.5);
    });

    it('self-heals a legacy word whose stored stability predates the cap', () => {
      const corruptedWord = { stability: 7767, reviewCount: 40, lastReviewed: new Date().toISOString() };
      const result = applyReview(corruptedWord, { isCorrect: true, confidence: 5, retrievalType: 'passive_recall' });
      const daysUntilNext = (new Date(result.nextReview) - Date.now()) / 86400000;
      expect(daysUntilNext).toBeLessThanOrEqual(70.5);
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

describe('mastery confirmation requires distinct active-recall modes', () => {
  const passive = (w) => applyReview(w, { isCorrect: true, confidence: 5, retrievalType: 'passive_recall' });
  const active = (w, mode) => applyReview(w, { isCorrect: true, confidence: 5, retrievalType: 'active_recall', mode });

  it('does not unlock mastery past the passive ceiling by repeating the same drill', () => {
    let w = initWordProgress();
    for (let i = 0; i < 12; i++) w = passive(w);
    const capped = w.mastery;
    for (let i = 0; i < 6; i++) w = active(w, 'spelling');
    expect(w.confirmedModes).toEqual(['spelling']);
    expect(w.mastery).toBeLessThanOrEqual(Math.max(capped, 65));
  });

  it('unlocks it once two different drills are passed', () => {
    let w = initWordProgress();
    for (let i = 0; i < 12; i++) w = passive(w);
    w = active(w, 'spelling');
    w = active(w, 'sentence');
    for (let i = 0; i < 4; i++) w = active(w, 'spelling');
    expect(w.mastery).toBeGreaterThan(65);
  });

  it('keeps the old 2-active-passes rule for legacy records without confirmedModes', () => {
    const legacy = { stability: 30, reviewCount: 9, activeRecallPasses: 2 };
    const r = applyReview(legacy, { isCorrect: true, confidence: 5, retrievalType: 'passive_recall' });
    expect(r.stability).toBeGreaterThan(30);
  });
});

describe('stabilityToMastery stays distinguishable for strong words', () => {
  it('is monotonic, continuous at the 65% passive ceiling, and 100% only at the stability cap', () => {
    const values = [0, 2, 6, 12.5, 12.7, 20, 40, 80, 160, 243.33].map(stabilityToMastery);
    for (let i = 1; i < values.length; i++) expect(values[i]).toBeGreaterThanOrEqual(values[i - 1]);
    expect(stabilityToMastery(12.6)).toBe(65);
    expect(stabilityToMastery(40)).toBeLessThan(90);
    expect(stabilityToMastery(120)).toBeLessThan(100);
    expect(stabilityToMastery(243.33)).toBe(100);
  });

  it('keeps S=40 and S=243 visibly different (used to both read ~100%)', () => {
    expect(stabilityToMastery(243.33) - stabilityToMastery(40)).toBeGreaterThanOrEqual(10);
  });
});

describe('applyReview persists and uses per-word difficulty', () => {
  it('stores difficulty, raising it on a lapse', () => {
    const r = applyReview({ difficulty: 0.5, stability: 5 }, { isCorrect: false });
    expect(r.difficulty).toBeGreaterThan(0.5);
  });

  it('grows a hard word less than an easy one from the same state', () => {
    const base = { stability: 5, reviewCount: 3, confirmedModes: ['a', 'b'] };
    const hard = applyReview({ ...base, difficulty: 0.9 }, { isCorrect: true, confidence: 4, retrievalType: 'active_recall', mode: 'a' });
    const easy = applyReview({ ...base, difficulty: 0.1 }, { isCorrect: true, confidence: 4, retrievalType: 'active_recall', mode: 'a' });
    expect(easy.stability).toBeGreaterThan(hard.stability);
  });

  it('initWordProgress starts neutral', () => {
    expect(initWordProgress().difficulty).toBe(0.5);
  });
});
