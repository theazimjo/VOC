package abs.uits.vocabry.data.repo

import abs.uits.vocabry.data.model.MarketWord
import abs.uits.vocabry.data.model.RecallEvent
import abs.uits.vocabry.data.model.Word
import abs.uits.vocabry.engine.MemoryEngine
import abs.uits.vocabry.engine.SemanticClassifier
import abs.uits.vocabry.engine.SpacedRepetition
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.MutableData
import com.google.firebase.database.Transaction
import com.google.firebase.database.ValueEventListener
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.tasks.await
import java.time.Instant
import kotlin.math.max
import kotlin.math.min
import kotlin.math.round

/**
 * Mirrors src/hooks/useWords.js (per-pack CRUD) and
 * src/contexts/PacksContext.jsx's flat `users/{uid}/words` listener (used
 * for cross-pack views like the Dashboard).
 */
class WordRepository(
    private val db: FirebaseDatabase = FirebaseDatabase.getInstance(),
) {
    /** All words across all packs — mirrors PacksContext.jsx's `allWords`. */
    fun observeAllWords(uid: String): Flow<List<Word>> = callbackFlow {
        val ref = db.reference.child("users").child(uid).child("words")
        val listener = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val words = mutableListOf<Word>()
                snapshot.children.forEach { packSnap ->
                    val packId = packSnap.key ?: return@forEach
                    packSnap.children.forEach { wordSnap ->
                        runCatching { words.add(Word.fromSnapshot(wordSnap, packId)) }
                    }
                }
                trySend(words)
            }

            override fun onCancelled(error: DatabaseError) {
                close(error.toException())
            }
        }
        ref.addValueEventListener(listener)
        awaitClose { ref.removeEventListener(listener) }
    }


    suspend fun addWord(
        uid: String,
        packId: String,
        word: String,
        translation: String,
        definition: String = "",
        example: String = "",
        partOfSpeech: String = "noun",
        notes: String = "",
        customSentence: String = "",
    ) {
        val ref = db.reference.child("users").child(uid).child("words").child(packId).push()
        val newWord = Word(
            word = word,
            translation = translation,
            definition = definition,
            example = example,
            partOfSpeech = partOfSpeech,
            notes = notes,
            customSentence = customSentence,
            addedAt = Instant.now().toString(),
        )
        ref.setValue(newWord.toMap()).await()

        // Keep the pack's wordCount counter in sync (src/hooks/useWords.js).
        val countRef = db.reference.child("users").child(uid).child("packs").child(packId).child("wordCount")
        countRef.runTransaction(object : Transaction.Handler {
            override fun doTransaction(currentData: MutableData): Transaction.Result {
                val current = currentData.getValue(Long::class.java) ?: 0L
                currentData.value = current + 1
                return Transaction.success(currentData)
            }

            override fun onComplete(error: DatabaseError?, committed: Boolean, snapshot: DataSnapshot?) {}
        })
    }

    suspend fun updateWord(
        uid: String,
        packId: String,
        wordId: String,
        word: String,
        translation: String,
        definition: String = "",
        example: String = "",
        partOfSpeech: String = "noun",
        notes: String = "",
        customSentence: String = "",
    ) {
        val updates = mapOf(
            "word" to word,
            "translation" to translation,
            "definition" to definition,
            "example" to example,
            "partOfSpeech" to partOfSpeech,
            "notes" to notes,
            "customSentence" to customSentence,
        )
        db.reference.child("users").child(uid).child("words").child(packId).child(wordId)
            .updateChildren(updates).await()
    }

    /**
     * Batch word import, mirrors src/hooks/useWords.js's bulkAddWords: writes
     * in chunks of 25 (one RTDB multi-path update per chunk, reporting
     * progress after each) and bumps the pack's wordCount exactly once at the end.
     */
    suspend fun bulkAddWords(
        uid: String,
        packId: String,
        words: List<MarketWord>,
        onProgress: ((added: Int, total: Int) -> Unit)? = null,
    ) {
        if (words.isEmpty()) return
        val wordsRef = db.reference.child("users").child(uid).child("words").child(packId)
        val total = words.size
        val batchSize = 25
        var addedCount = 0
        var index = 0
        while (index < total) {
            val chunk = words.subList(index, minOf(index + batchSize, total))
            val updates = mutableMapOf<String, Any?>()
            chunk.forEach { w ->
                val newRef = wordsRef.push()
                val key = newRef.key ?: return@forEach
                updates[key] = Word(
                    word = w.word,
                    translation = w.translation,
                    definition = w.definition,
                    example = w.example,
                    partOfSpeech = w.partOfSpeech.ifBlank { "noun" },
                    notes = w.notes,
                    addedAt = Instant.now().toString(),
                ).toMap()
            }
            wordsRef.updateChildren(updates).await()
            addedCount += chunk.size
            onProgress?.invoke(addedCount, total)
            index += batchSize
        }

        val countRef = db.reference.child("users").child(uid).child("packs").child(packId).child("wordCount")
        countRef.runTransaction(object : Transaction.Handler {
            override fun doTransaction(currentData: MutableData): Transaction.Result {
                val current = currentData.getValue(Long::class.java) ?: 0L
                currentData.value = current + total
                return Transaction.success(currentData)
            }

            override fun onComplete(error: DatabaseError?, committed: Boolean, snapshot: DataSnapshot?) {}
        })
    }

    suspend fun deleteWord(uid: String, packId: String, wordId: String) {
        db.reference.child("users").child(uid).child("words").child(packId).child(wordId).removeValue().await()

        val countRef = db.reference.child("users").child(uid).child("packs").child(packId).child("wordCount")
        countRef.runTransaction(object : Transaction.Handler {
            override fun doTransaction(currentData: MutableData): Transaction.Result {
                val current = currentData.getValue(Long::class.java) ?: 0L
                currentData.value = maxOf(0L, current - 1)
                return Transaction.success(currentData)
            }

            override fun onComplete(error: DatabaseError?, committed: Boolean, snapshot: DataSnapshot?) {}
        })
    }

    /**
     * Persists the outcome of one review: runs [SpacedRepetition.calculateNextReview]
     * and writes the result back, plus the same bookkeeping
     * src/experiment/experimentDB.js's saveReviewEvent + PracticePage.jsx's
     * handleUpdateWord do —
     *  - wrongCount (isCorrect, i.e. quality >= 3 -> decay, else +1)
     *  - a recallHistory entry (last 50 kept) carrying the recall probability
     *    predicted just before this review, so future reviews can self-calibrate
     *  - a per-cluster calibration multiplier derived from [allWords]' history
     *    in the same semantic cluster as this word (see [SemanticClassifier])
     *
     * @param packName the current pack's display name, used by [SemanticClassifier]
     *   to prefer a user-named pack over automatic POS/topic clustering
     * @param allWords the full word corpus (all packs), used to gather this
     *   word's cluster history — pass an empty list to skip calibration
     *   (falls back to a neutral 1.0 multiplier)
     */
    suspend fun submitReview(
        uid: String,
        word: Word,
        quality: Int,
        responseTimeSec: Double,
        retrievalType: String = "passive_recall",
        packName: String = "",
        allWords: List<Word> = emptyList(),
    ) {
        val cluster = SemanticClassifier.classifyWord(word.word, word.translation, packName)
        val clusterHistory = allWords
            .asSequence()
            .filter { SemanticClassifier.classifyWord(it.word, it.translation, packName).key == cluster.key }
            .flatMap { it.recallHistory.asSequence() }
            .toList()
        val clusterMultiplier = MemoryEngine.computeClusterCalibration(clusterHistory)

        val result = SpacedRepetition.calculateNextReview(
            quality,
            word,
            retrievalType = retrievalType,
            responseTimeSec = responseTimeSec,
            clusterMultiplier = clusterMultiplier,
        )
        val isCorrect = quality >= 3
        val newWrongCount = if (isCorrect) max(0, word.wrongCount - 1) else word.wrongCount + 1

        val lastRev = word.lastReviewed
        val seedStability = word.stability
            ?: (if (word.interval > 0) word.interval else MemoryEngine.computeInitialStability())
        val daysSince = if (lastRev != null) {
            val diffMs = Instant.now().toEpochMilli() - Instant.parse(lastRev).toEpochMilli()
            max(0.0, diffMs / (24.0 * 60 * 60 * 1000))
        } else {
            0.0
        }
        val predictedP = if (lastRev != null) MemoryEngine.computeRecallProbability(seedStability, daysSince) else null
        val confidence = max(1, min(5, if (quality == 0) 1 else quality))

        val newEntry = RecallEvent(
            t = round(daysSince * 100) / 100,
            result = isCorrect,
            responseTime = round(responseTimeSec * 10) / 10,
            confidence = confidence,
            ts = result.lastReviewed,
            retrievalType = retrievalType,
            predictedP = predictedP?.let { round(it * 1000) / 1000 },
        )
        val newHistory = (word.recallHistory + newEntry).takeLast(50)

        val updates = mapOf(
            "interval" to result.interval,
            "nextReview" to result.nextReview,
            "reviewCount" to result.reviewCount,
            "mastery" to result.mastery,
            "lastReviewed" to result.lastReviewed,
            "stability" to result.stability,
            "wrongCount" to newWrongCount,
            "recallHistory" to newHistory.map { it.toMap() },
        )

        db.reference.child("users").child(uid).child("words").child(word.packId).child(word.id)
            .updateChildren(updates).await()
    }

    /**
     * Record (or increment) a confusion pair — evidence that the user typed an
     * answer close to a *different* word's correct answer. Mirrors
     * src/experiment/experimentDB.js's recordConfusionPair, feeding the same
     * Confusion Network Memory Lab reads regardless of which practice mode
     * detected the mix-up.
     */
    suspend fun recordConfusionPair(uid: String, wordIdA: String, wordIdB: String, meta: Map<String, Any?> = emptyMap()) {
        if (uid.isBlank() || wordIdA.isBlank() || wordIdB.isBlank() || wordIdA == wordIdB) return
        val key = listOf(wordIdA, wordIdB).sorted().joinToString("__")
        val pairRef = db.reference.child("users").child(uid).child("experiment").child("confusionPairs").child(key)
        pairRef.runTransaction(object : Transaction.Handler {
            override fun doTransaction(currentData: MutableData): Transaction.Result {
                @Suppress("UNCHECKED_CAST")
                val current = currentData.value as? Map<String, Any?>
                val count = (current?.get("count") as? Long) ?: 0L
                val merged = mutableMapOf<String, Any?>(
                    "wordIdA" to wordIdA,
                    "wordIdB" to wordIdB,
                )
                current?.let { merged.putAll(it) }
                merged.putAll(meta)
                merged["count"] = count + 1
                merged["lastSeen"] = Instant.now().toString()
                currentData.value = merged
                return Transaction.success(currentData)
            }

            override fun onComplete(error: DatabaseError?, committed: Boolean, snapshot: DataSnapshot?) {}
        })
    }
}
