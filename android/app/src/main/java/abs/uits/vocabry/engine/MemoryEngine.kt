package abs.uits.vocabry.engine

import abs.uits.vocabry.data.model.RecallEvent
import java.time.Instant
import kotlin.math.exp
import kotlin.math.ln
import kotlin.math.max
import kotlin.math.min
import kotlin.math.round

/**
 * Individual Memory Dynamics Engine — direct port of
 * src/experiment/memoryEngine.js, kept numerically identical so a word
 * reviewed on web and on Android schedules the same way.
 *
 * Model: P(t) = e^(-t/S)
 *   P(t) — recall probability at time t after last review
 *   t    — days since last review
 *   S    — memory stability (days); unique per user x word
 *
 * Only the functions the main practice flow actually uses are ported here
 * (no per-cluster calibration / confusion pairs / explainability — those are
 * unused by the web app's default Flashcard flow too, see spacedRepetition.js).
 */
object MemoryEngine {

    const val INITIAL_STABILITY = 1.0
    const val TARGET_RECALL = 0.75
    private const val STABILITY_GROWTH_BASE = 0.35
    private const val STABILITY_DECAY = 0.5
    private const val FAST_RESPONSE_SEC = 2.5
    private const val SLOW_RESPONSE_SEC = 7.0
    private const val SLEEP_BONUS = 0.15
    private const val ACTIVE_RECALL_BONUS = 0.15
    private const val CALIBRATION_MIN = 0.7
    private const val CALIBRATION_MAX = 1.4
    private const val MIN_CALIBRATION_SAMPLES = 8

    /** Automatically infer confidence (1-5) from response speed. */
    fun inferConfidenceFromSpeed(responseTimeSec: Double, isCorrect: Boolean): Int {
        if (!isCorrect) return 1
        if (responseTimeSec < 2.5) return 5
        if (responseTimeSec < 5.0) return 4
        if (responseTimeSec < 8.0) return 3
        return 2
    }

    /** P(Recall) via the exponential forgetting curve. */
    fun computeRecallProbability(stability: Double, daysSince: Double): Double {
        if (daysSince <= 0) return 1.0
        if (stability <= 0) return 0.0
        return exp(-daysSince / stability)
    }

    /**
     * Update stability after a review event.
     *   Correct:   S_new = S_old x (1 + alpha)
     *   Incorrect: S_new = S_old x STABILITY_DECAY
     */
    fun updateStability(
        currentS: Double,
        isCorrect: Boolean,
        confidence: Int = 3,
        responseTimeSec: Double = 4.0,
        daysSince: Double = 0.0,
        hadOvernightGap: Boolean = false,
        retrievalType: String = "passive_recall",
        clusterMultiplier: Double = 1.0,
    ): Double {
        val s = max(currentS, 0.1)

        if (!isCorrect) {
            return max(s * STABILITY_DECAY, 0.1)
        }

        val confBonus = ((confidence - 3) / 2.0) * 0.4

        val timeBonus = when {
            responseTimeSec < FAST_RESPONSE_SEC -> 0.2
            responseTimeSec > SLOW_RESPONSE_SEC -> -0.1
            else -> 0.0
        }

        val retrievability = computeRecallProbability(s, daysSince)
        val retrievabilityBonus = (1 - retrievability) * 0.3

        val sleepBonus = if (hadOvernightGap) SLEEP_BONUS else 0.0
        val retrievalBonus = if (retrievalType == "active_recall") ACTIVE_RECALL_BONUS else 0.0

        val rawAlpha = max(
            0.05,
            STABILITY_GROWTH_BASE + confBonus + timeBonus + retrievabilityBonus + sleepBonus + retrievalBonus
        )

        val boundedMultiplier = max(CALIBRATION_MIN, min(CALIBRATION_MAX, clusterMultiplier))
        val alpha = rawAlpha * boundedMultiplier

        val sNew = s * (1 + alpha)
        return round(sNew * 100) / 100
    }

    /**
     * Self-calibrate the growth rate for a semantic cluster by comparing this
     * user's *predicted* recall probability (stored per review as `predictedP`)
     * against what *actually* happened. Direct port of
     * memoryEngine.js#computeClusterCalibration.
     *
     * @param historyEntries review events from all words in one cluster
     * @return multiplier in [CALIBRATION_MIN, CALIBRATION_MAX]; 1.0 = no adjustment yet
     */
    fun computeClusterCalibration(historyEntries: List<RecallEvent>): Double {
        val withP = historyEntries.filter { it.predictedP != null }
        if (withP.size < MIN_CALIBRATION_SAMPLES) return 1.0

        val avgPredicted = withP.sumOf { it.predictedP ?: 0.0 } / withP.size
        val actualAccuracy = withP.count { it.result }.toDouble() / withP.size
        if (avgPredicted <= 0.02) return 1.0

        val ratio = actualAccuracy / avgPredicted
        return round(max(CALIBRATION_MIN, min(CALIBRATION_MAX, ratio)) * 100) / 100
    }

    /** Solve P(t) = targetRecall -> t = -S * ln(targetRecall); returns the ISO-8601 instant. */
    fun getOptimalReviewDate(stability: Double, targetRecall: Double = TARGET_RECALL): String {
        val t = -stability * ln(targetRecall) // days until target recall
        val ms = (t * 24 * 60 * 60 * 1000).toLong()
        return Instant.now().plusMillis(ms).toString()
    }

    /** S0 = INITIAL_STABILITY x (1 + 2.5 x categoryMastery) x globalAdjustment. */
    fun computeInitialStability(categoryMastery: Double = 0.0, globalAdjustment: Double = 1.0): Double {
        val boost = max(0.0, min(1.0, categoryMastery))
        val s0 = INITIAL_STABILITY * (1 + 2.5 * boost) * globalAdjustment
        return round(s0 * 100) / 100
    }
}
