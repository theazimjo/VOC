// Shared mastery-delta constants/helper for both Greek sub-tracks
// (alphabet and vocabulary) — kept identical on purpose so "how fast you
// master something" feels consistent across the whole Greek section.
export const MASTERY_CORRECT_DELTA = 18;
export const MASTERY_WRONG_DELTA = -10;

export function clampMastery(n) {
  return Math.max(0, Math.min(100, n));
}
