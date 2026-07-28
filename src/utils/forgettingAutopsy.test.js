import { describe, it, expect } from 'vitest';
import { getConfusionPairsForWord, diagnoseForgetting } from './forgettingAutopsy';

describe('getConfusionPairsForWord', () => {
  const allPairs = [
    { wordIdA: 'w1', wordIdB: 'w2', wordA: 'although', wordB: 'though', translationA: 'garchi', translationB: 'garchi', count: 3 },
    { wordIdA: 'w3', wordIdB: 'w1', wordA: 'affect', wordB: 'although', translationA: 'ta\'sir', translationB: 'garchi', count: 1 },
    { wordIdA: 'w4', wordIdB: 'w5', wordA: 'borrow', wordB: 'lend', translationA: 'qarz olmoq', translationB: 'qarz bermoq', count: 5 },
  ];

  it('finds pairs regardless of which side the word is on', () => {
    const pairs = getConfusionPairsForWord('w1', allPairs);
    expect(pairs).toHaveLength(2);
  });

  it('normalizes to always expose the *other* word as partnerWord', () => {
    const pairs = getConfusionPairsForWord('w1', allPairs);
    const withThough = pairs.find((p) => p.partnerWord === 'though');
    const withAffect = pairs.find((p) => p.partnerWord === 'affect');
    expect(withThough).toBeTruthy();
    expect(withAffect).toBeTruthy();
  });

  it('sorts by confusion count descending', () => {
    const pairs = getConfusionPairsForWord('w1', allPairs);
    expect(pairs[0].count).toBeGreaterThanOrEqual(pairs[1].count);
  });

  it('returns an empty array for a word with no recorded pairs', () => {
    expect(getConfusionPairsForWord('w5', [{ wordIdA: 'w1', wordIdB: 'w2', count: 1 }])).toEqual([]);
  });
});

describe('diagnoseForgetting', () => {
  it('reports no data when the word has never been failed', () => {
    const memory = { recallHistory: [{ result: true, confidence: 5 }], totalReviews: 3 };
    const result = diagnoseForgetting(memory, []);
    expect(result.hasEnoughData).toBe(false);
    expect(result.factors).toEqual([]);
    expect(result.recommendation).toBeNull();
  });

  it('points to confusion as the primary cause when a strong confusion pair exists', () => {
    const memory = {
      recallHistory: [
        { result: true, confidence: 4, predictedP: 0.9 },
        { result: false, confidence: 4, predictedP: 0.85 }, // failed despite high predicted recall — not an interval problem
      ],
      totalReviews: 5,
    };
    const confusionPairs = [{ partnerWord: 'though', count: 4 }];
    const result = diagnoseForgetting(memory, confusionPairs);
    expect(result.hasEnoughData).toBe(true);
    expect(result.primaryCause).toBe('confusion');
    expect(result.recommendation.type).toBe('contrastive');
  });

  it('points to long interval as the primary cause when the failure was fully expected by timing', () => {
    const memory = {
      recallHistory: [
        { result: false, confidence: 3, predictedP: 0.05 }, // model already predicted near-certain forgetting
      ],
      totalReviews: 5,
    };
    const result = diagnoseForgetting(memory, []);
    expect(result.primaryCause).toBe('interval');
  });

  it('points to weak exposure as the primary cause for a barely-seen word', () => {
    const memory = {
      recallHistory: [{ result: false, confidence: 3, predictedP: 0.6 }],
      totalReviews: 1,
    };
    const result = diagnoseForgetting(memory, []);
    expect(result.primaryCause).toBe('exposure');
  });

  it('normalizes factor weights to sum to 1', () => {
    const memory = {
      recallHistory: [
        { result: false, confidence: 2, predictedP: 0.3 },
        { result: true, confidence: 4, predictedP: 0.8 },
      ],
      totalReviews: 6,
    };
    const result = diagnoseForgetting(memory, [{ partnerWord: 'though', count: 2 }]);
    const totalWeight = result.factors.reduce((s, f) => s + f.weight, 0);
    expect(totalWeight).toBeCloseTo(1, 5);
  });

  it('always returns exactly four ranked factors when there is enough data', () => {
    const memory = { recallHistory: [{ result: false, confidence: 3, predictedP: 0.5 }], totalReviews: 4 };
    const result = diagnoseForgetting(memory, []);
    expect(result.factors).toHaveLength(4);
    // sorted descending by weight
    for (let i = 1; i < result.factors.length; i++) {
      expect(result.factors[i - 1].weight).toBeGreaterThanOrEqual(result.factors[i].weight);
    }
  });
});
