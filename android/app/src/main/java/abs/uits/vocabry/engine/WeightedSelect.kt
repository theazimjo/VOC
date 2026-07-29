package abs.uits.vocabry.engine

import abs.uits.vocabry.data.model.Word
import java.time.Instant
import kotlin.math.max
import kotlin.math.min

/**
 * Direct port of src/utils/helpers.js's weightedSelectWords — harder/less-known
 * words appear more often in a practice session than well-known ones.
 *
 * Weight = masteryWeight(0..6) + stabilityWeight(0..3) + overdueBonus(0|2) + wrongCount*3.
 * Weighted sampling without replacement; if count >= words.size, every word
 * is included but the order is still weighted (hardest first).
 */
object WeightedSelect {

    fun weightedSelectWords(words: List<Word>, count: Int): List<Word> {
        if (words.isEmpty()) return emptyList()

        val now = Instant.now().toEpochMilli()
        val weighted = words.map { w ->
            val mastery = w.mastery
            val stability = w.stability ?: 1.0
            val nextReviewMs = w.nextReview?.let { runCatching { Instant.parse(it).toEpochMilli() }.getOrNull() } ?: 0L
            val isOverdue = nextReviewMs > 0 && nextReviewMs <= now
            val wrongCount = w.wrongCount

            val masteryWeight = ((100 - mastery) / 100.0) * 6
            val weight = masteryWeight +
                max(0.0, 3 - min(stability, 3.0)) +
                (if (isOverdue) 2.0 else 0.0) +
                (wrongCount * 3.0)

            WeightedWord(w, weight)
        }.toMutableList()

        val total = if (count <= 0) words.size else min(count, words.size)
        val selected = mutableListOf<Word>()

        while (selected.size < total && weighted.isNotEmpty()) {
            val totalWeight = weighted.sumOf { it.weight }
            if (totalWeight <= 0) {
                val idx = weighted.indices.random()
                selected.add(weighted[idx].word)
                weighted.removeAt(idx)
                continue
            }

            var rand = Math.random() * totalWeight
            var chosenIdx = weighted.size - 1
            for (i in weighted.indices) {
                rand -= weighted[i].weight
                if (rand <= 0) {
                    chosenIdx = i
                    break
                }
            }
            selected.add(weighted[chosenIdx].word)
            weighted.removeAt(chosenIdx)
        }

        return selected
    }

    private data class WeightedWord(val word: Word, val weight: Double)
}
