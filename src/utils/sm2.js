/**
 * SM-2 Spaced Repetition Algorithm
 * Based on SuperMemo 2 algorithm by Piotr Wozniak
 * 
 * Quality ratings:
 * 0 - Complete blackout
 * 1 - Incorrect, but remembered upon seeing answer
 * 2 - Incorrect, but answer seemed easy to recall
 * 3 - Correct with serious difficulty
 * 4 - Correct with some hesitation
 * 5 - Perfect response
 */

export function calculateNextReview(quality, previousEaseFactor, previousInterval, reviewCount) {
  // Ensure quality is in range 0-5
  quality = Math.max(0, Math.min(5, Math.round(quality)));

  let newEaseFactor = previousEaseFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  
  // Minimum ease factor is 1.3
  if (newEaseFactor < 1.3) newEaseFactor = 1.3;

  let newInterval;
  
  if (quality < 3) {
    // Failed - reset interval
    newInterval = 1;
  } else {
    if (reviewCount === 0) {
      newInterval = 1;
    } else if (reviewCount === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(previousInterval * newEaseFactor);
    }
  }

  const now = new Date();
  const nextReview = new Date(now.getTime() + newInterval * 24 * 60 * 60 * 1000);

  return {
    easeFactor: Math.round(newEaseFactor * 100) / 100,
    interval: newInterval,
    nextReview: nextReview.toISOString(),
    reviewCount: quality < 3 ? 0 : reviewCount + 1,
    mastery: calculateMastery(quality, reviewCount, newEaseFactor),
    lastReviewed: now.toISOString()
  };
}

/**
 * Calculate mastery percentage (0-100) based on review history
 */
export function calculateMastery(quality, reviewCount, easeFactor) {
  if (reviewCount === 0 && quality < 3) return 0;
  
  const qualityScore = (quality / 5) * 40;
  const reviewScore = Math.min(reviewCount / 10, 1) * 30;
  const easeScore = Math.min((easeFactor - 1.3) / (2.5 - 1.3), 1) * 30;
  
  return Math.round(qualityScore + reviewScore + easeScore);
}

/**
 * Get words that are due for review today
 */
export function getDueWords(words) {
  const now = new Date();
  return words.filter(word => {
    if (!word.nextReview) return true;
    return new Date(word.nextReview) <= now;
  });
}

/**
 * Get mastery level label
 */
export function getMasteryLevel(mastery) {
  if (mastery >= 90) return { label: "O'zlashtirilgan", color: 'var(--success)', icon: '🏆' };
  if (mastery >= 70) return { label: "Yaxshi", color: 'var(--accent-3)', icon: '⭐' };
  if (mastery >= 50) return { label: "O'rtacha", color: 'var(--accent-2)', icon: '📈' };
  if (mastery >= 25) return { label: "Boshlanish", color: 'var(--warning)', icon: '🌱' };
  return { label: "Yangi", color: 'var(--text-muted)', icon: '🆕' };
}

/**
 * Map user response to SM-2 quality rating
 * "easy" -> 5, "good" -> 4, "hard" -> 3, "again" -> 1
 */
export function responseToQuality(response) {
  const map = {
    'easy': 5,
    'good': 4,
    'hard': 3,
    'again': 1
  };
  return map[response] ?? 3;
}

/**
 * Initialize SM-2 data for a new word
 */
export function initSM2Data() {
  return {
    mastery: 0,
    easeFactor: 2.5,
    interval: 0,
    reviewCount: 0,
    nextReview: null,
    lastReviewed: null
  };
}
