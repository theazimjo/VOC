import { predictRecall, isDue } from '@voc/memory-engine';

// Learner-facing word status, the same cut-offs the rest of the app uses
// ("at risk" = predicted recall below the 75% scheduling target).
//   new     never reviewed
//   weak    below 75%   (being forgotten, review soon)
//   medium  75-85%
//   strong  85% and up
export const STRONG_AT = 0.85;
export const MEDIUM_AT = 0.75;

/**
 * @param {Object} memory  an entry of useMemoryExperiment's memoryMap
 * @param {number} userRate  learner's overall recall rate (computeUserRate)
 * @param {number} [now]
 * @returns {{ key: 'new'|'weak'|'medium'|'strong', p: number|null, due: boolean }}
 */
export function wordStatus(memory, userRate, now = Date.now()) {
  const reviews = Number(memory?.reviewCount ?? memory?.totalReviews) || 0;
  const due = isDue(memory?.nextReview ?? memory?.nextOptimalReview ?? null, now);
  if (reviews === 0 || !memory?.lastReviewed) return { key: 'new', p: null, due: true };
  const p = predictRecall(memory, { now, userRate });
  const key = p >= STRONG_AT ? 'strong' : p >= MEDIUM_AT ? 'medium' : 'weak';
  return { key, p, due };
}

/** Whole days until the next review: 0 = due now or today, null = no schedule yet. */
export function daysUntilReview(memory, now = Date.now()) {
  const next = memory?.nextReview ?? memory?.nextOptimalReview;
  if (!next) return null;
  const ms = new Date(next).getTime() - now;
  if (!Number.isFinite(ms)) return null;
  return ms <= 0 ? 0 : Math.ceil(ms / 86400000);
}
