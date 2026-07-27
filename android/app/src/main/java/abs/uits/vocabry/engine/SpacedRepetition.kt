package abs.uits.vocabry.engine

import abs.uits.vocabry.data.model.Word
import java.time.Instant
import java.time.ZoneId
import kotlin.math.exp
import kotlin.math.max
import kotlin.math.min
import kotlin.math.round

/**
 * Port of src/utils/spacedRepetition.js — the same engine that now powers
 * the web app's default Flashcard/practice flow, kept behaviorally
 * identical so a word's schedule doesn't jump around depending on which
 * client last reviewed it.
 */
object SpacedRepetition {

    data class ReviewResult(
        val interval: Double,
        val nextReview: String,
        val reviewCount: Int,
        val mastery: Int,
        val lastReviewed: String,
        val quality: Int,
        val stability: Double,
    )

    private fun stabilityToMastery(stability: Double): Int {
        val pct = 100 * (1 - exp(-max(0.0, stability) / 12))
        return round(max(0.0, min(100.0, pct))).toInt()
    }

    private fun daysBetween(fromISO: String?, now: Instant): Double {
        if (fromISO == null) return 0.0
        val from = Instant.parse(fromISO)
        val diffMs = now.toEpochMilli() - from.toEpochMilli()
        return max(0.0, diffMs / (24.0 * 60 * 60 * 1000))
    }

    private fun hadOvernightGap(fromISO: String?, now: Instant): Boolean {
        if (fromISO == null) return false
        val zone = ZoneId.systemDefault()
        val fromDate = Instant.parse(fromISO).atZone(zone).toLocalDate()
        val nowDate = now.atZone(zone).toLocalDate()
        return fromDate != nowDate
    }

    /**
     * @param quality 0..5 (>=3 counts as a correct recall)
     * @param retrievalType 'active_recall' | 'passive_recall'
     */
    fun calculateNextReview(
        quality: Int,
        word: Word,
        retrievalType: String = "passive_recall",
        responseTimeSec: Double = 4.0,
    ): ReviewResult {
        val q = max(0, min(5, quality))
        val isCorrect = q >= 3
        val confidence = max(1, min(5, if (q == 0) 1 else q))

        val seedStability = word.stability ?: (if (word.interval > 0) word.interval else MemoryEngine.computeInitialStability())

        val now = Instant.now()
        val daysSince = daysBetween(word.lastReviewed, now)
        val overnight = hadOvernightGap(word.lastReviewed, now)

        val newStability = MemoryEngine.updateStability(
            currentS = seedStability,
            isCorrect = isCorrect,
            confidence = confidence,
            responseTimeSec = responseTimeSec,
            daysSince = daysSince,
            hadOvernightGap = overnight,
            retrievalType = retrievalType,
        )

        return ReviewResult(
            interval = round(newStability * 10) / 10,
            nextReview = MemoryEngine.getOptimalReviewDate(newStability),
            reviewCount = word.reviewCount + 1,
            mastery = stabilityToMastery(newStability),
            lastReviewed = now.toString(),
            quality = q,
            stability = newStability,
        )
    }

    fun getDueWords(words: List<Word>): List<Word> {
        val now = Instant.now()
        return words.filter { w ->
            w.nextReview == null || Instant.parse(w.nextReview) <= now
        }
    }

    data class MasteryLevel(val label: String, val icon: String)

    fun getMasteryLevel(mastery: Int): MasteryLevel = when {
        mastery >= 90 -> MasteryLevel("O'zlashtirilgan", "🏆")
        mastery >= 70 -> MasteryLevel("Yaxshi", "⭐")
        mastery >= 50 -> MasteryLevel("O'rtacha", "📈")
        mastery >= 25 -> MasteryLevel("Boshlanish", "🌱")
        else -> MasteryLevel("Yangi", "🆕")
    }

    /** "easy" -> 5, "good" -> 4, "hard" -> 3, "again" -> 1 */
    fun responseToQuality(response: String): Int = when (response) {
        "easy" -> 5
        "good" -> 4
        "hard" -> 3
        "again" -> 1
        else -> 3
    }
}
