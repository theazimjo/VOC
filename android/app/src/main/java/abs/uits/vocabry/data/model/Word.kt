package abs.uits.vocabry.data.model

import com.google.firebase.database.DataSnapshot

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
    )
}
