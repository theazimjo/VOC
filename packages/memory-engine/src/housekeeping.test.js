import { describe, it, expect } from 'vitest';
import { ENGINE_VERSION, resolveEngineVersion, migrateWordRecord } from './version.js';
import { answerFormatForMode } from './format.js';
import { createSessionTracker } from './session.js';
import { applyReview, initWordProgress } from './scheduler.js';

describe('engine versioning', () => {
  it('treats records without the field as v1 and new reviews as current', () => {
    expect(resolveEngineVersion({})).toBe(1);
    expect(applyReview({}, { isCorrect: true }).engineVersion).toBe(ENGINE_VERSION);
    expect(initWordProgress().engineVersion).toBe(ENGINE_VERSION);
  });

  it('migrates a legacy record without losing progress or touching the schedule', () => {
    const legacy = {
      interval: 8, reviewCount: 5, mastery: 70,
      lastReviewed: '2026-01-01T00:00:00.000Z', nextReview: '2026-01-09T00:00:00.000Z',
      recallHistory: [{ result: true, confidence: 4 }, { result: true, confidence: 5 }, { result: false, confidence: 2 }],
    };
    const m = migrateWordRecord(legacy);
    expect(m.engineVersion).toBe(ENGINE_VERSION);
    expect(m.stability).toBe(8);
    expect(m.correctCount).toBeGreaterThan(0);
    expect(m.lastConfidence).toBe(2);
    expect(m.difficulty).toBeGreaterThan(0.5);
    for (const k of ['interval', 'reviewCount', 'mastery', 'lastReviewed', 'nextReview']) expect(m[k]).toBe(legacy[k]);
  });

  it('is idempotent and leaves current records untouched', () => {
    const current = applyReview({}, { isCorrect: true });
    expect(migrateWordRecord(current)).toBe(current);
    const once = migrateWordRecord({ interval: 3, reviewCount: 2 });
    expect(migrateWordRecord(once)).toBe(once);
  });
});

describe('answerFormatForMode', () => {
  it('separates guessable choice answers from typed, spoken and self-judged ones', () => {
    expect(answerFormatForMode('quiz')).toBe('choice');
    expect(answerFormatForMode('match')).toBe('choice');
    expect(answerFormatForMode('spelling')).toBe('typed');
    expect(answerFormatForMode('pronounce')).toBe('spoken');
    expect(answerFormatForMode('flashcard')).toBe('self');
  });

  it('falls back on retrieval type for unknown modes', () => {
    expect(answerFormatForMode('mystery', 'active_recall')).toBe('typed');
    expect(answerFormatForMode(null)).toBe('self');
  });
});

describe('session tracker', () => {
  it('shares one id within the idle window and starts a new one after it', () => {
    let n = 0;
    const next = createSessionTracker({ idleMs: 1000, random: () => (++n) / 10 });
    const a = next(0);
    expect(next(500)).toBe(a);
    expect(next(1400)).toBe(a); // gap measured from the last review, not the first
    const b = next(5000);
    expect(b).not.toBe(a);
    expect(next(5100)).toBe(b);
  });

  it('produces short url-safe ids', () => {
    expect(createSessionTracker()(0)).toMatch(/^[0-9a-z]{6}$/);
  });
});
