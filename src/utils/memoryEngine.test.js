import { describe, it, expect } from 'vitest';
import {
  computeRecallProbability,
  updateStability,
  getOptimalReviewDate,
  isDue,
  estimateDifficulty,
  computeCategoryMastery,
  computeClusterCalibration,
  getRecommendedRetrievalType,
  computeInitialStability,
  getMemoryHealth,
} from './memoryEngine';

describe('computeRecallProbability', () => {
  it('returns 1.0 when no time has passed', () => {
    expect(computeRecallProbability(10, 0)).toBe(1.0);
  });

  it('returns 0 for a non-positive stability', () => {
    expect(computeRecallProbability(0, 5)).toBe(0);
  });

  it('decays exponentially as days increase', () => {
    const p1 = computeRecallProbability(10, 5);
    const p2 = computeRecallProbability(10, 10);
    expect(p1).toBeGreaterThan(p2);
    expect(p1).toBeGreaterThan(0);
    expect(p1).toBeLessThan(1);
  });

  it('matches the exponential forgetting curve formula P(t) = e^(-t/S)', () => {
    expect(computeRecallProbability(10, 10)).toBeCloseTo(Math.exp(-1), 10);
  });
});

describe('updateStability', () => {
  it('decays stability on a failed recall regardless of other inputs', () => {
    const result = updateStability(10, false, 5, 1, 0);
    expect(result).toBeCloseTo(5, 5); // STABILITY_DECAY = 0.5
  });

  it('never decays below the 0.1 floor even from a tiny stability', () => {
    expect(updateStability(0.1, false)).toBeGreaterThanOrEqual(0.1);
  });

  it('grows stability on a correct recall', () => {
    const result = updateStability(10, true, 3, 4, 0);
    expect(result).toBeGreaterThan(10);
  });

  it('rewards higher confidence with more growth than lower confidence', () => {
    const low = updateStability(10, true, 1, 4, 0);
    const high = updateStability(10, true, 5, 4, 0);
    expect(high).toBeGreaterThan(low);
  });

  it('rewards a fast response more than a slow one', () => {
    const fast = updateStability(10, true, 3, 1, 0);
    const slow = updateStability(10, true, 3, 10, 0);
    expect(fast).toBeGreaterThan(slow);
  });

  it('gives an overnight-gap review more growth than a same-day one', () => {
    const sameDay = updateStability(10, true, 3, 4, 1, { hadOvernightGap: false });
    const overnight = updateStability(10, true, 3, 4, 1, { hadOvernightGap: true });
    expect(overnight).toBeGreaterThan(sameDay);
  });

  it('rewards active recall more than passive recall, all else equal', () => {
    const passive = updateStability(10, true, 3, 4, 0, { retrievalType: 'passive_recall' });
    const active = updateStability(10, true, 3, 4, 0, { retrievalType: 'active_recall' });
    expect(active).toBeGreaterThan(passive);
  });

  it('clamps an out-of-range clusterMultiplier into [0.7, 1.4]', () => {
    const withHugeMultiplier = updateStability(10, true, 3, 4, 0, { clusterMultiplier: 999 });
    const withClampedMultiplier = updateStability(10, true, 3, 4, 0, { clusterMultiplier: 1.4 });
    expect(withHugeMultiplier).toBe(withClampedMultiplier);
  });
});

describe('computeClusterCalibration', () => {
  it('returns the neutral 1.0 multiplier below the minimum sample size', () => {
    const fewSamples = Array.from({ length: 7 }, () => ({ predictedP: 0.5, result: true }));
    expect(computeClusterCalibration(fewSamples)).toBe(1.0);
  });

  it('returns > 1.0 when the user outperforms the model prediction', () => {
    const samples = Array.from({ length: 10 }, () => ({ predictedP: 0.5, result: true }));
    expect(computeClusterCalibration(samples)).toBeGreaterThan(1.0);
  });

  it('returns < 1.0 when the user underperforms the model prediction', () => {
    const samples = Array.from({ length: 10 }, () => ({ predictedP: 0.9, result: false }));
    expect(computeClusterCalibration(samples)).toBeLessThan(1.0);
  });
});

describe('getRecommendedRetrievalType', () => {
  it('is always passive for a never-before-seen word', () => {
    expect(getRecommendedRetrievalType({ totalReviews: 0, stability: 0.5 })).toBe('passive_recall');
  });

  it('recommends active recall for a weak, previously-seen word', () => {
    expect(getRecommendedRetrievalType({ totalReviews: 2, stability: 1 })).toBe('active_recall');
  });
});

describe('getOptimalReviewDate', () => {
  it('schedules further out for higher stability', () => {
    const soon = getOptimalReviewDate(1);
    const later = getOptimalReviewDate(30);
    expect(later.getTime()).toBeGreaterThan(soon.getTime());
  });

  it('returns a date in the future', () => {
    expect(getOptimalReviewDate(10).getTime()).toBeGreaterThan(Date.now());
  });
});

describe('isDue', () => {
  it('treats a word with no review date as due', () => {
    expect(isDue(null)).toBe(true);
  });

  it('is not due when the review date is in the future', () => {
    expect(isDue(new Date(Date.now() + 86400000).toISOString())).toBe(false);
  });

  it('is due when the review date is in the past', () => {
    expect(isDue(new Date(Date.now() - 86400000).toISOString())).toBe(true);
  });
});

describe('estimateDifficulty', () => {
  it('defaults to 0.5 with no history', () => {
    expect(estimateDifficulty([])).toBe(0.5);
    expect(estimateDifficulty(null)).toBe(0.5);
  });

  it('returns 1 when every recent review failed', () => {
    const history = Array.from({ length: 5 }, () => ({ result: false }));
    expect(estimateDifficulty(history)).toBe(1);
  });

  it('returns 0 when every recent review succeeded', () => {
    const history = Array.from({ length: 5 }, () => ({ result: true }));
    expect(estimateDifficulty(history)).toBe(0);
  });

  it('only looks at the most recent 10 events', () => {
    const history = [
      ...Array.from({ length: 20 }, () => ({ result: false })),
      ...Array.from({ length: 10 }, () => ({ result: true })),
    ];
    expect(estimateDifficulty(history)).toBe(0);
  });
});

describe('computeCategoryMastery', () => {
  it('returns a neutral baseline for an empty pack', () => {
    const result = computeCategoryMastery([]);
    expect(result.mastery).toBe(0);
    expect(result.accuracyRate).toBe(0.5);
  });

  it('scores higher mastery for a pack with high stability and accuracy', () => {
    const strongPack = [
      { totalReviews: 10, stability: 20, recallHistory: [{ result: true }, { result: true }] },
    ];
    const weakPack = [
      { totalReviews: 10, stability: 1, recallHistory: [{ result: false }, { result: false }] },
    ];
    expect(computeCategoryMastery(strongPack).mastery).toBeGreaterThan(
      computeCategoryMastery(weakPack).mastery
    );
  });
});

describe('computeInitialStability', () => {
  it('defaults to the base initial stability with no mastery boost', () => {
    expect(computeInitialStability()).toBe(1.0);
  });

  it('boosts initial stability for words in an already-mastered category', () => {
    expect(computeInitialStability(1.0)).toBeGreaterThan(computeInitialStability(0));
  });

  it('clamps categoryMastery above 1.0', () => {
    expect(computeInitialStability(5)).toBe(computeInitialStability(1));
  });
});

describe('getMemoryHealth', () => {
  it('labels a word with no scheduled review as new', () => {
    expect(getMemoryHealth(10, null).label).toBe('Yangi');
  });

  it('labels high stability as strong memory', () => {
    expect(getMemoryHealth(25, new Date().toISOString()).label).toBe('Kuchli xotira');
  });

  it('labels low stability as weak memory', () => {
    expect(getMemoryHealth(1, new Date().toISOString()).label).toBe('Zaif xotira');
  });
});
