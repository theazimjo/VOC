package abs.uits.vocabry.data.repo

import abs.uits.vocabry.data.model.Word
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
     * and writes the result back, plus the same wrongCount bookkeeping
     * PracticePage.jsx's handleUpdateWord does (quality < 4 -> +1, else decay -1).
     */
    suspend fun submitReview(uid: String, word: Word, quality: Int, responseTimeSec: Double) {
        val result = SpacedRepetition.calculateNextReview(quality, word, responseTimeSec = responseTimeSec)
        val newWrongCount = if (quality < 4) word.wrongCount + 1 else maxOf(0, word.wrongCount - 1)

        val updates = mapOf(
            "interval" to result.interval,
            "nextReview" to result.nextReview,
            "reviewCount" to result.reviewCount,
            "mastery" to result.mastery,
            "lastReviewed" to result.lastReviewed,
            "stability" to result.stability,
            "wrongCount" to newWrongCount,
        )

        db.reference.child("users").child(uid).child("words").child(word.packId).child(word.id)
            .updateChildren(updates).await()
    }
}
