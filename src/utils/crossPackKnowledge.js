// A word installed from a new pack may already be known from a different
// pack — same word text AND same translation, i.e. the same sense. In that
// case the new copy should start pre-leveled instead of at zero, so the
// user isn't asked to relearn something they already know just because it
// showed up in another pack's word list.
//
// A different sense of the same word (e.g. "book" meaning "kitob" vs.
// "book" meaning "band qilish") has a different translation, so it's left
// to start fresh, exactly as if it were a brand-new word — this is the
// whole reason the match requires translation equality, not just word text.
export function findKnownSnapshot(wordData, allWords) {
  const text = (wordData.word || '').trim().toLowerCase();
  const sense = (wordData.translation || '').trim().toLowerCase();
  if (!text || !sense || !allWords || allWords.length === 0) return null;

  let best = null;
  for (const w of allWords) {
    if ((w.word || '').trim().toLowerCase() !== text) continue;
    if ((w.translation || '').trim().toLowerCase() !== sense) continue;
    if (!w.mastery) continue;
    if (!best || w.mastery > best.mastery) best = w;
  }
  if (!best) return null;

  return {
    mastery: best.mastery,
    interval: best.interval || 0,
    reviewCount: best.reviewCount || 0,
    nextReview: best.nextReview || null,
    lastReviewed: best.lastReviewed || null,
    stability: best.stability,
    activeRecallPasses: best.activeRecallPasses || 0,
    confirmedModes: Array.isArray(best.confirmedModes) ? best.confirmedModes : [],
  };
}
