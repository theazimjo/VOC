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
