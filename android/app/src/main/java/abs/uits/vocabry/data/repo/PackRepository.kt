package abs.uits.vocabry.data.repo

import abs.uits.vocabry.data.model.MarketPack
import abs.uits.vocabry.data.model.MarketWord
import abs.uits.vocabry.data.model.Pack
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.MutableData
import com.google.firebase.database.ServerValue
import com.google.firebase.database.Transaction
import com.google.firebase.database.ValueEventListener
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.tasks.await
import java.time.Instant

/** Mirrors src/contexts/PacksContext.jsx's pack metadata listener + CRUD operations. */
class PackRepository(
    private val db: FirebaseDatabase = FirebaseDatabase.getInstance(),
) {
    fun observePacks(uid: String): Flow<List<Pack>> = callbackFlow {
        if (uid.isBlank()) {
            trySend(emptyList())
            close()
            return@callbackFlow
        }
        val ref = db.reference.child("users").child(uid).child("packs")
        val listener = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val packs = snapshot.children.mapNotNull { child ->
                    runCatching { Pack.fromSnapshot(child) }.getOrNull()
                }.sortedByDescending { it.createdAt }
                trySend(packs)
            }

            override fun onCancelled(error: DatabaseError) {
                close(error.toException())
            }
        }
        ref.addValueEventListener(listener)
        awaitClose { ref.removeEventListener(listener) }
    }

    suspend fun addPack(
        uid: String,
        name: String,
        description: String = "",
        color: String = "#7C3AED",
        icon: String = "📦",
        level: String = "beginner",
        folderId: String? = null,
        marketPackId: String? = null,
        language: String = "en-US",
    ): String {
        if (uid.isBlank()) return ""
        val newPackRef = db.reference.child("users").child(uid).child("packs").push()
        val packKey = newPackRef.key ?: return ""

        val pack = Pack(
            id = packKey,
            name = name.ifBlank { "Yangi to'plam" },
            description = description,
            color = color,
            icon = icon,
            level = level,
            createdAt = Instant.now().toString(),
            wordCount = 0,
            folderId = folderId,
            marketPackId = marketPackId,
            language = language,
        )

        val updates = mapOf(
            "users/$uid/packs/$packKey" to pack.toMap(),
            "users/$uid/meta/lastPackCreatedAt" to ServerValue.TIMESTAMP,
        )

        db.reference.updateChildren(updates).await()

        // Best-effort lifetime counter for the admin panel — a monitoring
        // signal only, not an enforced cap (mirrors PacksContext.jsx's addPack).
        runCatching {
            db.reference.child("users").child(uid).child("meta").child("packsCreatedTotal")
                .runTransaction(object : Transaction.Handler {
                    override fun doTransaction(currentData: MutableData): Transaction.Result {
                        val current = currentData.getValue(Long::class.java) ?: 0L
                        currentData.value = current + 1
                        return Transaction.success(currentData)
                    }

                    override fun onComplete(error: DatabaseError?, committed: Boolean, snapshot: DataSnapshot?) {}
                })
        }

        return packKey
    }

    suspend fun updatePack(
        uid: String,
        packId: String,
        name: String,
        description: String,
        color: String,
        icon: String,
        level: String,
        folderId: String?,
        language: String,
    ) {
        if (uid.isBlank() || packId.isBlank()) return
        val updates = mutableMapOf<String, Any?>(
            "name" to name,
            "description" to description,
            "color" to color,
            "icon" to icon,
            "level" to level,
            "folderId" to folderId,
            "language" to language,
        )
        db.reference.child("users").child(uid).child("packs").child(packId)
            .updateChildren(updates).await()
    }

    suspend fun deletePack(uid: String, packId: String) {
        if (uid.isBlank() || packId.isBlank()) return
        val updates = mapOf(
            "users/$uid/packs/$packId" to null,
            "users/$uid/words/$packId" to null,
        )
        db.reference.updateChildren(updates).await()
    }

    /** Batch installs a market pack to users/{uid}/packs and users/{uid}/words/{packId}. */
    suspend fun installMarketPack(uid: String, marketPack: MarketPack): String {
        if (uid.isBlank()) return ""

        val packKey = addPack(
            uid = uid,
            name = marketPack.name,
            description = marketPack.description,
            color = marketPack.color,
            icon = marketPack.icon,
            level = marketPack.level,
            marketPackId = marketPack.id,
        )

        if (packKey.isBlank()) return ""

        // Prepare words batch update
        val wordUpdates = mutableMapOf<String, Any>()
        marketPack.words.forEach { wordData ->
            val wordRef = db.reference.child("users").child(uid).child("words").child(packKey).push()
            val wordKey = wordRef.key ?: return@forEach
            wordUpdates["users/$uid/words/$packKey/$wordKey"] = mapOf(
                "word" to wordData.word,
                "translation" to wordData.translation,
                "definition" to wordData.definition,
                "example" to wordData.example,
                "partOfSpeech" to wordData.partOfSpeech,
                "notes" to wordData.notes,
                "addedAt" to Instant.now().toString(),
                "mastery" to 0,
                "interval" to 0,
                "reviewCount" to 0,
                "nextReview" to null,
                "lastReviewed" to null,
            )
        }

        // Set word count
        wordUpdates["users/$uid/packs/$packKey/wordCount"] = marketPack.words.size

        db.reference.updateChildren(wordUpdates).await()
        return packKey
    }

    /** Appends missing words to an already installed market pack. */
    suspend fun updateMarketPack(uid: String, installedPackId: String, currentWordCount: Int, missingWords: List<MarketWord>) {
        if (uid.isBlank() || installedPackId.isBlank() || missingWords.isEmpty()) return

        val wordUpdates = mutableMapOf<String, Any>()
        missingWords.forEach { wordData ->
            val wordRef = db.reference.child("users").child(uid).child("words").child(installedPackId).push()
            val wordKey = wordRef.key ?: return@forEach
            wordUpdates["users/$uid/words/$installedPackId/$wordKey"] = mapOf(
                "word" to wordData.word,
                "translation" to wordData.translation,
                "definition" to wordData.definition,
                "example" to wordData.example,
                "partOfSpeech" to wordData.partOfSpeech,
                "notes" to wordData.notes,
                "addedAt" to Instant.now().toString(),
                "mastery" to 0,
                "interval" to 0,
                "reviewCount" to 0,
                "nextReview" to null,
                "lastReviewed" to null,
            )
        }

        wordUpdates["users/$uid/packs/$installedPackId/wordCount"] = currentWordCount + missingWords.size

        db.reference.updateChildren(wordUpdates).await()
    }
}
