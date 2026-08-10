/**
 * 🔬 Forgetting Autopsy
 *
 * "Don't just treat forgetting. Investigate it."
 *
 * Given a word's own review history (already collected by the memory engine
 * — see memoryEngine.js / experimentDB.js) and any confusion pairs recorded
 * against it, ranks the *likely* contributing factors behind its most recent
 * failed recall, and suggests a matching intervention.
 *
 * Important framing note: these are heuristic, relative-influence estimates
 * derived from a handful of signals already on the word record — NOT a
 * statistically validated causal model. They are surfaced to users as
 * "estimated" / "possible cause", never as asserted fact. Do not change this
 * function to output percentages framed as statistical confidence without
 * also updating every caller's copy accordingly.
 */

/** Pairs a word has been confused with, normalized to always expose "the other word". */
export function getConfusionPairsForWord(wordId, allConfusionPairs = []) {
  if (!wordId || !Array.isArray(allConfusionPairs)) return [];

  return allConfusionPairs
    .filter((p) => p && (p.wordIdA === wordId || p.wordIdB === wordId))
    .map((p) => {
      const isA = p.wordIdA === wordId;
      return {
        ...p,
        partnerId: isA ? p.wordIdB : p.wordIdA,
        partnerWord: isA ? p.wordB : p.wordA,
        partnerTranslation: isA ? p.translationB : p.translationA,
      };
    })
    .sort((a, b) => (b.count || 0) - (a.count || 0));
}

const RECOMMENDATIONS = {
  confusion: (detail) => ({
    type: 'contrastive',
    label: 'Contrastive Review',
    description: detail?.partnerWord
      ? `Practice "${detail.word}" alongside "${detail.partnerWord}" — seeing both side by side helps the brain lock in the difference.`
      : "Practice this word alongside similar-looking or similar-sounding words.",
  }),
  interval: () => ({
    type: 'active_recall',
    label: "More active recall",
    description: "The review gap for this word seems too long — try reviewing it more frequently, especially by typing it (active recall).",
  }),
  confidence: () => ({
    type: 'context_example',
    label: "Reinforce with examples",
    description: "Re-learn this word inside full sentences and examples rather than in isolation — context creates deeper memory traces.",
  }),
  exposure: () => ({
    type: 'active_recall',
    label: "More practice needed",
    description: "This word has been seen only a few times — the memory trace hasn't formed yet. Keep practicing.",
  }),
};

/**
 * Diagnose the likely factors behind a word's most recent forgetting event.
 *
 * @param {Object} memory - word memory record: { recallHistory, totalReviews }
 * @param {Array<Object>} [confusionPairsForWord] - output of getConfusionPairsForWord for this word
 * @returns {{
 *   hasEnoughData: boolean,
 *   factors: Array<{key:string, label:string, weight:number, detail:Object}>,
 *   primaryCause: string|null,
 *   recommendation: Object|null,
 * }}
 */
export function diagnoseForgetting(memory, confusionPairsForWord = []) {
  const history = Array.isArray(memory?.recallHistory) ? memory.recallHistory : [];
  const totalReviews = Number(memory?.totalReviews) || history.length;
  const failures = history.filter((h) => h && h.result === false);
  const lastFailure = failures[failures.length - 1] || null;

  if (!lastFailure) {
    return { hasEnoughData: false, factors: [], primaryCause: null, recommendation: null };
  }

  // 1. Long review interval — the model's own predicted recall probability
  // right before this failure. Low predictedP means the gap was already
  // long enough that forgetting was expected from timing alone.
  const predictedPAtFailure = typeof lastFailure.predictedP === 'number' ? lastFailure.predictedP : null;
  const intervalScore = predictedPAtFailure !== null ? Math.max(0, 1 - predictedPAtFailure) : 0.3;

  // 2. Confusion interference — evidence this word gets mixed up with another.
  const topConfusion = confusionPairsForWord[0] || null;
  const confusionScore = topConfusion ? Math.min(1, (topConfusion.count || 1) / 4) : 0;

  // 3. Weak encoding — consistently low self-rated confidence historically.
  const confidences = history.map((h) => h.confidence).filter((c) => typeof c === 'number');
  const avgConfidence = confidences.length > 0
    ? confidences.reduce((s, c) => s + c, 0) / confidences.length
    : 3;
  const confidenceScore = Math.max(0, (3 - avgConfidence) / 2);

  // 4. Weak exposure — too few reviews for a trace to have formed yet.
  const exposureScore = totalReviews <= 1 ? 1 : totalReviews <= 3 ? 0.5 : 0;

  const rawFactors = [
    {
      key: 'confusion',
      label: "Word confusion",
      score: confusionScore,
      detail: { word: memory?.wordData?.word, partnerWord: topConfusion?.partnerWord, count: topConfusion?.count },
    },
    {
      key: 'interval',
      label: "Long review gap",
      score: intervalScore,
      detail: { predictedP: predictedPAtFailure },
    },
    {
      key: 'confidence',
      label: "Weak confidence",
      score: confidenceScore,
      detail: { avgConfidence: Math.round(avgConfidence * 10) / 10 },
    },
    {
      key: 'exposure',
      label: "Seen too few times",
      score: exposureScore,
      detail: { totalReviews },
    },
  ];

  const totalScore = rawFactors.reduce((s, f) => s + f.score, 0);
  const factors = rawFactors
    .map((f) => ({ ...f, weight: totalScore > 0 ? f.score / totalScore : 0.25 }))
    .sort((a, b) => b.weight - a.weight);

  const primaryCause = factors[0];

  return {
    hasEnoughData: true,
    factors,
    primaryCause: primaryCause.key,
    recommendation: RECOMMENDATIONS[primaryCause.key](primaryCause.detail),
  };
}
