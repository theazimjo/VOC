package abs.uits.vocabry.data.repo

import abs.uits.vocabry.data.model.Pack
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ValueEventListener
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.tasks.await
import java.time.Instant

/** Mirrors src/contexts/PacksContext.jsx's pack metadata listener + addPack. */
class PackRepository(
    private val db: FirebaseDatabase = FirebaseDatabase.getInstance(),
) {
    fun observePacks(uid: String): Flow<List<Pack>> = callbackFlow {
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

    suspend fun addPack(uid: String, name: String, description: String, color: String, icon: String, level: String): String {
        val ref = db.reference.child("users").child(uid).child("packs").push()
        val pack = Pack(
            name = name,
            description = description,
            color = color,
            icon = icon,
            level = level,
            createdAt = Instant.now().toString(),
            wordCount = 0,
        )
        ref.setValue(pack.toMap()).await()
        return ref.key ?: ""
    }
}
