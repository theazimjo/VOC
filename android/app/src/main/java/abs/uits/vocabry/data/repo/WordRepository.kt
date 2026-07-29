package abs.uits.vocabry.data.repo

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

    /** Words within a single pack — used by PackDetail and Practice. */
    fun observeWordsForPack(uid: String, packId: String): Flow<List<Word>> = callbackFlow {
        val ref = db.reference.child("users").child(uid).child("words").child(packId)
        val listener = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val words = snapshot.children.mapNotNull { child ->
                    runCatching { Word.fromSnapshot(child, packId) }.getOrNull()
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
    ) {
        val ref = db.reference.child("users").child(uid).child("words").child(packId).push()
        val newWord = Word(
            word = word,
            translation = translation,
            definition = definition,
            example = example,
            partOfSpeech = partOfSpeech,
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
    ) {
        val updates = mapOf(
            "word" to word,
            "translation" to translation,
            "definition" to definition,
            "example" to example,
            "partOfSpeech" to partOfSpeech,
        )
        db.reference.child("users").child(uid).child("words").child(packId).child(wordId)
            .updateChildren(updates).await()
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
}
