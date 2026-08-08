import { getDecayedMastery } from '../../../../utils/memoryEngine';
import { corpWordStorageId } from '../../../../utils/helpers';

// Build the list of months (with month → unit → words nesting normalized)
// from a list of pack objects.
export function buildMonthsFromPacks(packs) {
  return (packs || []).flatMap(pack => {
    const packMonths = pack.months && pack.months.length > 0
      ? pack.months
      : pack.units && pack.units.length > 0
        ? [{ id: 'm1', title: '1-Oy', units: pack.units }]
        : pack.words && pack.words.length > 0
          ? [{ id: 'm1', title: '1-Oy', units: [{ id: 'u1', title: '1-Mavzu', words: pack.words }] }]
          : [];
    return packMonths.map(m => ({
      ...m,
      packId: pack.id,
      packTitle: pack.title,
      packLevel: pack.level,
      packLanguage: pack.language || 'en-US'
    }));
  });
}

// Helper to compute word breakdown stats (mastered, learning, new) for a month/pack.
// `avgMasteryPct` (mean decayed mastery across every word) drives the ring
// badge — a binary ">=80% counts as mastered" ratio stays at 0% for a long
// time under this app's spaced-repetition model (passive-recall practice
// modes cap a word's mastery at 65% until it earns an active-recall pass),
// so the ring needs a continuous signal that moves with any real practice.
export function computeMonthWordStats(month, allDbWords) {
  let masteredCount = 0;
  let learningCount = 0;
  let newCount = 0;
  let totalMasterySum = 0;

  const units = month.units || [];
  units.forEach(u => {
    const unitDbStats = allDbWords[corpWordStorageId(month.packId, month.id, u.id)] || {};
    const words = u.words || [];

    words.forEach((w, idx) => {
      const wordKey = w.id || String(idx);
      const dbStat = unitDbStats[wordKey] || {};
      const merged = { ...w, ...dbStat };
      const mastery = getDecayedMastery(merged);
      totalMasterySum += mastery;

      if (mastery >= 80) {
        masteredCount++;
      } else if (mastery > 0 || dbStat.reviewCount > 0 || dbStat.lastReviewed) {
        learningCount++;
      } else {
        newCount++;
      }
    });
  });

  const totalWords = masteredCount + learningCount + newCount;
  const avgMasteryPct = totalWords > 0 ? Math.round(totalMasterySum / totalWords) : 0;
  return { masteredCount, learningCount, newCount, totalWords, avgMasteryPct };
}

// Helper to compute word breakdown stats for a single unit/topic
export function computeUnitWordStats(selectedMonth, unit, allDbWords) {
  let masteredCount = 0;
  let learningCount = 0;
  let newCount = 0;
  let totalMasterySum = 0;

  const unitDbStats = allDbWords[corpWordStorageId(selectedMonth.packId, selectedMonth.id, unit.id)] || {};

  (unit.words || []).forEach((w, idx) => {
    const wordKey = w.id || String(idx);
    const dbStat = unitDbStats[wordKey] || {};
    const merged = { ...w, ...dbStat };
    const mastery = getDecayedMastery(merged);
    totalMasterySum += mastery;

    if (mastery >= 80) {
      masteredCount++;
    } else if (mastery > 0 || dbStat.reviewCount > 0 || dbStat.lastReviewed) {
      learningCount++;
    } else {
      newCount++;
    }
  });

  const totalWords = masteredCount + learningCount + newCount;
  const avgMasteryPct = totalWords > 0 ? Math.round(totalMasterySum / totalWords) : 0;
  return { masteredCount, learningCount, newCount, totalWords, avgMasteryPct };
}
