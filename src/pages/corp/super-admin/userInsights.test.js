import { describe, it, expect } from 'vitest';
import { signInLabel, userInsights } from './userInsights';

const NOW = Date.UTC(2026, 9, 9, 12);
const ago = (d) => new Date(NOW - d * 86400000).toISOString();

describe('signInLabel', () => {
  it('turns made-up addresses back into what the person types', () => {
    expect(signInLabel('student_998901234567@markaz.uz')).toEqual({ kind: 'phone', value: '+998901234567' });
    expect(signInLabel('u_ali.01@markaz.uz')).toEqual({ kind: 'username', value: 'ali.01' });
    expect(signInLabel('max@mail.com')).toEqual({ kind: 'email', value: 'max@mail.com' });
    expect(signInLabel('')).toBeNull();
  });
});

describe('userInsights', () => {
  it('counts words, learned words, due words, reviews and active days', () => {
    const raw = {
      profile: { appMode: 'individual', wordTarget: 300 },
      packs: { p1: { name: 'Daily', icon: '📘' } },
      words: {
        p1: {
          a: { word: 'cat', translation: 'mushuk', mastery: 90, stability: 60, lastReviewed: ago(1), nextReview: ago(-5), reviewCount: 3, recallHistory: [{ ts: ago(1), result: true }, { ts: ago(3), result: true }] },
          b: { word: 'dog', translation: 'it', mastery: 40, stability: 2, lastReviewed: ago(2), nextReview: ago(0.5), reviewCount: 1, recallHistory: [{ ts: ago(2), result: false }] },
          c: { word: 'bird', translation: 'qush', mastery: 0, reviewCount: 0 },
        },
        corp_x: { w1: { mastery: 0, reviewCount: 0 } },
      },
    };
    const r = userInsights(raw, NOW);
    expect(r.total).toBe(4);
    expect(r.fresh).toBe(2);
    expect(r.due).toBe(1);
    expect(r.reviews).toBe(4);
    expect(r.activeDays30).toBe(3);
    expect(r.days).toHaveLength(84);
    expect(r.recent.map((w) => w.word)).toEqual(['cat', 'dog']);
    expect(r.sources[0]).toMatchObject({ id: 'p1', name: 'Daily', words: 3, personal: true });
    expect(r.sources[1]).toMatchObject({ id: 'corp_x', personal: false });
    expect(r.wordTarget).toBe(300);
  });
  it('copes with an empty account', () => {
    const r = userInsights({}, NOW);
    expect(r.total).toBe(0);
    expect(r.avgMastery).toBeNull();
    expect(r.recent).toEqual([]);
  });
});
