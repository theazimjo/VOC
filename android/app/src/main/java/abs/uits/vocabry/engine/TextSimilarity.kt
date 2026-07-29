package abs.uits.vocabry.engine

/**
 * Direct port of src/experiment/textSimilarity.js — used for confusion-pair
 * detection: when a user types a wrong answer that closely resembles a
 * *different* word's correct answer, that's evidence of interference
 * between the two words.
 */
object TextSimilarity {

    fun levenshteinDistance(a: String, b: String): Int {
        val s = a.trim().lowercase()
        val t = b.trim().lowercase()
        val m = s.length
        val n = t.length
        if (m == 0) return n
        if (n == 0) return m

        var prevRow = IntArray(n + 1) { it }
        for (i in 1..m) {
            val currRow = IntArray(n + 1)
            currRow[0] = i
            for (j in 1..n) {
                val cost = if (s[i - 1] == t[j - 1]) 0 else 1
                currRow[j] = minOf(
                    prevRow[j] + 1,
                    currRow[j - 1] + 1,
                    prevRow[j - 1] + cost,
                )
            }
            prevRow = currRow
        }
        return prevRow[n]
    }

    /** Normalized similarity ratio in [0, 1] — 1.0 means identical strings. */
    fun similarityRatio(a: String, b: String): Double {
        val s = a.trim().lowercase()
        val t = b.trim().lowercase()
        val maxLen = maxOf(s.length, t.length)
        if (maxLen == 0) return 1.0
        return 1.0 - levenshteinDistance(s, t).toDouble() / maxLen
    }

    data class ConfusableMatch<T>(val id: String, val ratio: Double, val candidate: T)

    /**
     * Find the closest *other* candidate whose extracted field the typed text
     * could be confused with.
     *
     * @param excludeId the word being answered, never matched against itself
     * @param getId extracts a candidate's id
     * @param getField extracts the comparable text from a candidate
     * @param threshold minimum similarity ratio to count as a confusion
     */
    fun <T> findConfusableMatch(
        typedText: String,
        candidates: List<T>,
        excludeId: String?,
        threshold: Double = 0.6,
        getId: (T) -> String,
        getField: (T) -> String,
    ): ConfusableMatch<T>? {
        if (typedText.isBlank()) return null

        var best: ConfusableMatch<T>? = null
        for (candidate in candidates) {
            val id = getId(candidate)
            if (id == excludeId) continue
            val fieldValue = getField(candidate)
            if (fieldValue.isBlank()) continue

            val ratio = similarityRatio(typedText, fieldValue)
            if (ratio >= threshold && (best == null || ratio > best.ratio)) {
                best = ConfusableMatch(id, ratio, candidate)
            }
        }
        return best
    }
}
