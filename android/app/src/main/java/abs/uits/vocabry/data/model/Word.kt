package abs.uits.vocabry.data.model

import com.google.firebase.database.DataSnapshot

/**
 * One entry of a word's `recallHistory` — mirrors the objects
 * src/experiment/experimentDB.js's saveReviewEvent appends (last 50 kept).
 * Used by [abs.uits.vocabry.engine.MemoryEngine.computeClusterCalibration]
 * to self-calibrate growth per semantic cluster.
 */
data class RecallEvent(
    val t: Double = 0.0,
    val result: Boolean = false,
    val responseTime: Double = 0.0,
    val confidence: Int = 3,
    val ts: String = "",
    val retrievalType: String = "passive_recall",
    val predictedP: Double? = null,
) {
    companion object {
        fun fromSnapshot(snapshot: DataSnapshot): RecallEvent = RecallEvent(
            t = snapshot.child("t").getValue(Double::class.java) ?: 0.0,
            result = snapshot.child("result").getValue(Boolean::class.java) ?: false,
            responseTime = snapshot.child("responseTime").getValue(Double::class.java) ?: 0.0,
            confidence = snapshot.child("confidence").getValue(Double::class.java)?.toInt() ?: 3,
            ts = snapshot.child("ts").getValue(String::class.java) ?: "",
            retrievalType = snapshot.child("retrievalType").getValue(String::class.java) ?: "passive_recall",
            predictedP = snapshot.child("predictedP").getValue(Double::class.java),
        )
    }

    fun toMap(): Map<String, Any?> = mapOf(
        "t" to t,
        "result" to result,
        "responseTime" to responseTime,
        "confidence" to confidence,
        "ts" to ts,
        "retrievalType" to retrievalType,
        "predictedP" to predictedP,
    )
}

/**
 * Mirrors the word record shape at `users/{uid}/words/{packId}/{wordId}` in
 * the web app (src/hooks/useWords.js, src/pages/PracticePage.jsx). Mapped
 * manually (not via Firebase's reflective POJO binding) so numeric-type
 * coercion between JS-written doubles and Kotlin Int/Double stays predictable,
 * and so brand-new/legacy records missing newer fields (e.g. `stability`)
 * don't throw.
 */
data class Word(
    val id: String = "",
    val packId: String = "",
    val word: String = "",
    val translation: String = "",
    val definition: String = "",
    val example: String = "",
    val notes: String = "",
    val customSentence: String = "",
    val partOfSpeech: String = "noun",
    val addedAt: String = "",
    val mastery: Int = 0,
    val interval: Double = 0.0,
    val reviewCount: Int = 0,
    val nextReview: String? = null,
    val lastReviewed: String? = null,
    val stability: Double? = null,
    val wrongCount: Int = 0,
    val recallHistory: List<RecallEvent> = emptyList(),
) {
    companion object {
        fun fromSnapshot(snapshot: DataSnapshot, packId: String): Word {
            return Word(
                id = snapshot.key ?: "",
                packId = packId,
                word = snapshot.child("word").getValue(String::class.java) ?: "",
                translation = snapshot.child("translation").getValue(String::class.java) ?: "",
                definition = snapshot.child("definition").getValue(String::class.java) ?: "",
                example = snapshot.child("example").getValue(String::class.java) ?: "",
                notes = snapshot.child("notes").getValue(String::class.java) ?: "",
                customSentence = snapshot.child("customSentence").getValue(String::class.java) ?: "",
                partOfSpeech = snapshot.child("partOfSpeech").getValue(String::class.java) ?: "noun",
                addedAt = snapshot.child("addedAt").getValue(String::class.java) ?: "",
                mastery = snapshot.child("mastery").getValue(Double::class.java)?.toInt() ?: 0,
                interval = snapshot.child("interval").getValue(Double::class.java) ?: 0.0,
                reviewCount = snapshot.child("reviewCount").getValue(Double::class.java)?.toInt() ?: 0,
                nextReview = snapshot.child("nextReview").getValue(String::class.java),
                lastReviewed = snapshot.child("lastReviewed").getValue(String::class.java),
                stability = snapshot.child("stability").getValue(Double::class.java),
                wrongCount = snapshot.child("wrongCount").getValue(Double::class.java)?.toInt() ?: 0,
                recallHistory = snapshot.child("recallHistory").children.mapNotNull {
                    runCatching { RecallEvent.fromSnapshot(it) }.getOrNull()
                },
            )
        }
    }

    /** Fields as persisted under `users/{uid}/words/{packId}/{wordId}` — no `id`/`packId`. */
    fun toMap(): Map<String, Any?> = mapOf(
        "word" to word,
        "translation" to translation,
        "definition" to definition,
        "example" to example,
        "notes" to notes,
        "customSentence" to customSentence,
        "partOfSpeech" to partOfSpeech,
        "addedAt" to addedAt,
        "mastery" to mastery,
        "interval" to interval,
        "reviewCount" to reviewCount,
        "nextReview" to nextReview,
        "lastReviewed" to lastReviewed,
        "stability" to stability,
        "wrongCount" to wrongCount,
        "recallHistory" to recallHistory.map { it.toMap() },
    )
}
