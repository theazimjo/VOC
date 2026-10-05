/**
 * Engine versioning for stored word records.
 *
 * Bump ENGINE_VERSION whenever a change alters what a stored field *means*
 * (a new formula for `stability`, a new `difficulty` scale, ...), and add the
 * upgrade step to migrateWordRecord(). Records without the field are v1 (the
 * original stability-only engine).
 *
 *   v1  stability / interval / mastery only
 *   v2  + difficulty, correctCount, lastConfidence (calibrated predictor);
 *       stability growth has saturation and difficulty scaling
 */
import { resolveStability, resolveDifficulty } from './engine.js';
import { resolveCorrectCount, resolveLastConfidence } from './predictor.js';

export const ENGINE_VERSION = 2;

export function resolveEngineVersion(word = {}) {
  return typeof word.engineVersion === 'number' ? word.engineVersion : 1;
}

/**
 * Upgrade a stored word record to the current engine version without
 * discarding any progress: every derived field is filled by the same
 * resolver the engine already uses for legacy records. Pure; returns a new
 * object and never touches the review schedule (`nextReview`, `lastReviewed`).
 */
export function migrateWordRecord(word = {}) {
  if (resolveEngineVersion(word) >= ENGINE_VERSION) return word;
  return {
    ...word,
    stability: resolveStability(word),
    difficulty: resolveDifficulty(word),
    correctCount: resolveCorrectCount(word),
    lastConfidence: resolveLastConfidence(word),
    engineVersion: ENGINE_VERSION,
  };
}
