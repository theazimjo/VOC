import { describe, it, expect } from 'vitest';
import { STAGE, wordStage, accuracyOf, newWordsFor, planSmartSession, recallOf, FORGOTTEN_BELOW } from './practicePath';

const NOW = Date.UTC(2026, 9, 8, 12);
const ago = (days) => new Date(NOW - days * 86400000).toISOString();

const fresh = (i) => ({ id: `w${i}`, word: `word${i}`, translation: `t${i}` });
const seen = (i, over = {}) => ({ ...fresh(i), reviewCount: 1, correctCount: 1, quality: 4, activeRecallPasses: 0, lastReviewed: ago(0.1), ...over });
const active = (i, over = {}) => seen(i, { reviewCount: 3, correctCount: 3, activeRecallPasses: 1, stability: 8, ...over });
const learned = (i, over = {}) => seen(i, { reviewCount: 8, correctCount: 8, activeRecallPasses: 3, quality: 5, stability: 60, lastReviewed: ago(1), ...over });
const faded = (i, over = {}) => seen(i, { reviewCount: 2, correctCount: 1, quality: 3, lastReviewed: ago(90), stability: 1, ...over });

const topic = (n) => Array.from({ length: n }, (_, i) => fresh(i + 1));
const modes = (plan) => plan.parts.map((p) => `${p.kind}:${p.mode}:${p.words.length}`);

describe('wordStage', () => {
  it('walks new -> seen -> active -> learned', () => {
    expect(wordStage(fresh(1), { now: NOW })).toBe(STAGE.NEW);
    expect(wordStage(seen(1), { now: NOW })).toBe(STAGE.SEEN);
    expect(wordStage(active(1), { now: NOW })).toBe(STAGE.ACTIVE);
    expect(wordStage(learned(1), { now: NOW })).toBe(STAGE.LEARNED);
  });

  it('a learned word that has faded goes back to active', () => {
    const w = learned(1, { lastReviewed: ago(400), stability: 2 });
    expect(wordStage(w, { now: NOW })).toBe(STAGE.ACTIVE);
  });

  it('typing it wrong last time keeps it out of learned', () => {
    expect(wordStage(learned(1, { quality: 1 }), { now: NOW })).toBe(STAGE.ACTIVE);
  });
});

describe('newWordsFor', () => {
  it('starts with 5, then 3', () => {
    expect(newWordsFor({ introduced: 0, accuracy: null, inPlay: 0 })).toBe(5);
    expect(newWordsFor({ introduced: 5, accuracy: null, inPlay: 0 })).toBe(3);
  });
  it('adapts to accuracy', () => {
    expect(newWordsFor({ introduced: 5, accuracy: 0.95, inPlay: 0 })).toBe(5);
    expect(newWordsFor({ introduced: 5, accuracy: 0.55, inPlay: 0 })).toBe(2);
    expect(newWordsFor({ introduced: 5, accuracy: 0.3, inPlay: 0 })).toBe(0);
  });
  it('pauses new words while too many are still in play', () => {
    expect(newWordsFor({ introduced: 10, accuracy: 0.9, inPlay: 10 })).toBe(0);
    expect(newWordsFor({ introduced: 8, accuracy: 0.9, inPlay: 8 })).toBe(2);
  });
});

describe('accuracyOf', () => {
  it('is null until there is enough history', () => {
    expect(accuracyOf([fresh(1), seen(2)])).toBeNull();
  });
  it('is the share of right answers', () => {
    expect(accuracyOf([seen(1, { reviewCount: 6, correctCount: 5 }), seen(2, { reviewCount: 6, correctCount: 1 })])).toBeCloseTo(0.5);
  });
});

describe('planSmartSession', () => {
  it('first press: the first 5 words as Flashcards', () => {
    const plan = planSmartSession({ unitWords: topic(36), now: NOW });
    expect(modes(plan)).toEqual(['new:flashcard:5']);
    expect(plan.parts[0].words.map((w) => w.id)).toEqual(['w1', 'w2', 'w3', 'w4', 'w5']);
  });

  it('second press: the same words are typed (Spelling)', () => {
    const words = topic(36).map((w, i) => (i < 5 ? seen(i + 1) : w));
    const plan = planSmartSession({ unitWords: words, now: NOW });
    expect(modes(plan)[0]).toBe('new:flashcard:3'); // 3 new ones are added too
    expect(modes(plan)).toContain('practice:spelling:5');
  });

  it('after typing once, a different exercise is used', () => {
    const words = topic(36).map((w, i) => (i < 5 ? active(i + 1) : w));
    const plan = planSmartSession({ unitWords: words, now: NOW });
    const practice = plan.parts.find((p) => p.kind === 'practice');
    expect(['quiz', 'match', 'spelling']).toContain(practice.mode);
    expect(practice.words).toHaveLength(5);
  });

  it('learned words leave the session: 3 new words + the rest keep being typed', () => {
    const words = topic(36).map((w, i) => (i < 5 ? learned(i + 1, { correctCount: 6 }) : i < 8 ? seen(i + 1) : w));
    const plan = planSmartSession({ unitWords: words, now: NOW });
    expect(modes(plan)).toEqual(['new:flashcard:3', 'practice:spelling:3']);
    const typedIds = plan.parts[1].words.map((w) => w.id);
    expect(typedIds).toEqual(['w6', 'w7', 'w8']);
  });

  it('new words wait while the backlog is full', () => {
    const words = topic(30).map((w, i) => (i < 10 ? seen(i + 1) : w));
    const plan = planSmartSession({ unitWords: words, now: NOW });
    expect(plan.parts.some((p) => p.kind === 'new')).toBe(false);
    expect(plan.parts.some((p) => p.mode === 'spelling')).toBe(true);
  });

  it('a strong learner is given more new words at once', () => {
    const words = topic(36).map((w, i) => (i < 5 ? learned(i + 1) : w));
    expect(modes(planSmartSession({ unitWords: words, now: NOW }))[0]).toBe('new:flashcard:5');
  });

  it('a learner who keeps getting words wrong gets no new ones', () => {
    const struggling = topic(20).map((w, i) => (i < 4 ? active(i + 1, { reviewCount: 6, correctCount: 2 }) : w));
    const plan = planSmartSession({ unitWords: struggling, now: NOW });
    expect(plan.parts.some((p) => p.kind === 'new')).toBe(false);
  });

  it('a short part is topped up to what the exercise needs, else it falls back to Flashcards', () => {
    const two = [seen(1), seen(2), learned(3), learned(4)];
    expect(modes(planSmartSession({ unitWords: two, now: NOW }))).toEqual(['practice:spelling:3']);
    const tiny = [seen(1), seen(2)];
    expect(modes(planSmartSession({ unitWords: tiny, now: NOW }))).toEqual(['practice:flashcard:2']);
  });

  it('brings back faded words from earlier assignments first', () => {
    const earlier = { storageId: 'p_m1_u1', title: 'Family', words: [faded(21), faded(22), faded(23), learned(24)] };
    const words = topic(10);
    const plan = planSmartSession({ unitWords: words, otherTopics: [earlier], now: NOW });
    expect(plan.parts[0].kind).toBe('review');
    const reviewed = plan.parts.filter((p) => p.kind === 'review').flatMap((p) => p.words);
    expect(reviewed.map((w) => w.__origId).sort()).toEqual(['w21', 'w22', 'w23']);
    expect(reviewed.map((w) => w.id)).toContain('p_m1_u1::w21');
    // each carries where its progress is stored
    expect(reviewed.every((w) => w.__storageId === 'p_m1_u1')).toBe(true);
    expect(plan.parts.at(-1).kind).toBe('new');
    expect(recallOf(faded(21), { now: NOW })).toBeLessThan(FORGOTTEN_BELOW);
  });

  it('leaves earlier topics alone when nothing is fading', () => {
    const earlier = { storageId: 'p_m1_u1', title: 'Family', words: [learned(21), learned(22)] };
    const plan = planSmartSession({ unitWords: topic(10), otherTopics: [earlier], now: NOW });
    expect(plan.parts.some((p) => p.kind === 'review')).toBe(false);
  });

  it('a finished topic still gets a short refresh of its weakest words', () => {
    const done = Array.from({ length: 6 }, (_, i) => learned(i + 1));
    const plan = planSmartSession({ unitWords: done, now: NOW });
    expect(plan.parts).toHaveLength(1);
    expect(plan.parts[0].mode).toBe('spelling');
  });
});
