/**
 * 🔤 Text Similarity Utilities
 *
 * Used for confusion-pair detection: when a user types a wrong answer that
 * closely resembles a *different* word's correct answer, that's evidence of
 * semantic/orthographic interference between the two words.
 */

/**
 * Classic Levenshtein edit distance between two strings (case-insensitive).
 *
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
export function levenshteinDistance(a, b) {
  const s = (a || '').trim().toLowerCase();
  const t = (b || '').trim().toLowerCase();
  const m = s.length;
  const n = t.length;
  if (m === 0) return n;
  if (n === 0) return m;

  let prevRow = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const currRow = [i];
    for (let j = 1; j <= n; j++) {
      const cost = s[i - 1] === t[j - 1] ? 0 : 1;
      currRow[j] = Math.min(
        prevRow[j] + 1,      // deletion
        currRow[j - 1] + 1,  // insertion
        prevRow[j - 1] + cost // substitution
      );
    }
    prevRow = currRow;
  }
  return prevRow[n];
}

/**
 * Normalized similarity ratio in [0, 1] — 1.0 means identical strings.
 *
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
export function similarityRatio(a, b) {
  const s = (a || '').trim().toLowerCase();
  const t = (b || '').trim().toLowerCase();
  const maxLen = Math.max(s.length, t.length);
  if (maxLen === 0) return 1;
  return 1 - levenshteinDistance(s, t) / maxLen;
}

/**
 * Find the closest *other* word whose given field the typed text could be
 * confused with — evidence of interference between two words (e.g. typing
 * "though" when the correct answer was "although").
 *
 * Shared by every practice mode that wants to feed the Confusion Network,
 * not just Memory Lab — pass whichever field (word or translation) matches
 * what the user was actually typing.
 *
 * @param {string} typedText
 * @param {Array<Object>} candidates - full word list to compare against
 * @param {Object} options
 * @param {string} [options.excludeId] - the word being answered, never matched against itself
 * @param {(candidate: Object) => string} options.getField - extracts the comparable text from a candidate
 * @param {number} [options.threshold=0.6] - minimum similarity ratio to count as a confusion
 * @returns {{ id: string, ratio: number, candidate: Object } | null}
 */
export function findConfusableMatch(typedText, candidates, options = {}) {
  const { excludeId, getField, threshold = 0.6 } = options;
  if (!typedText || !typedText.trim() || !Array.isArray(candidates) || !getField) return null;

  let best = null;
  for (const candidate of candidates) {
    if (!candidate || candidate.id === excludeId) continue;
    const fieldValue = getField(candidate);
    if (!fieldValue) continue;

    const ratio = similarityRatio(typedText, fieldValue);
    if (ratio >= threshold && (!best || ratio > best.ratio)) {
      best = { id: candidate.id, ratio, candidate };
    }
  }
  return best;
}
