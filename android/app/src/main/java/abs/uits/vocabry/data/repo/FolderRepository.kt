package abs.uits.vocabry.data.repo

import abs.uits.vocabry.data.model.Folder
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

class FolderRepository(
    private val db: FirebaseDatabase = FirebaseDatabase.getInstance(),
) {
    fun observeFolders(uid: String): Flow<List<Folder>> = callbackFlow {
        if (uid.isBlank()) {
            trySend(emptyList())
            close()
            return@callbackFlow
        }
        val ref = db.reference.child("users").child(uid).child("folders")
        val listener = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                val folders = snapshot.children.mapNotNull { child ->
                    runCatching { Folder.fromSnapshot(child) }.getOrNull()
                }.sortedByDescending { it.createdAt }
                trySend(folders)
            }

            override fun onCancelled(error: DatabaseError) {
                close(error.toException())
            }
        }
        ref.addValueEventListener(listener)
        awaitClose { ref.removeEventListener(listener) }
    }

    suspend fun addFolder(uid: String, name: String, icon: String): String {
        if (uid.isBlank()) return ""
        val newFolderRef = db.reference.child("users").child(uid).child("folders").push()
        val folderKey = newFolderRef.key ?: return ""
        
        val folderData = mapOf(
            "name" to name.ifBlank { "Yangi papka" },
            "icon" to icon.ifBlank { "📁" },
            "createdAt" to Instant.now().toString(),
        )

        val updates = mapOf(
            "users/$uid/folders/$folderKey" to folderData,
            "users/$uid/meta/lastFolderCreatedAt" to ServerValue.TIMESTAMP,
        )

        db.reference.updateChildren(updates).await()

        // Best-effort lifetime counter for the admin panel — see PackRepository.addPack.
        runCatching {
            db.reference.child("users").child(uid).child("meta").child("foldersCreatedTotal")
                .runTransaction(object : Transaction.Handler {
                    override fun doTransaction(currentData: MutableData): Transaction.Result {
                        val current = currentData.getValue(Long::class.java) ?: 0L
                        currentData.value = current + 1
                        return Transaction.success(currentData)
                    }

                    override fun onComplete(error: DatabaseError?, committed: Boolean, snapshot: DataSnapshot?) {}
                })
        }

        return folderKey
    }

    suspend fun updateFolder(uid: String, folderId: String, name: String, icon: String) {
        if (uid.isBlank() || folderId.isBlank()) return
        val updates = mapOf(
            "name" to name,
            "icon" to icon,
        )
        db.reference.child("users").child(uid).child("folders").child(folderId)
            .updateChildren(updates).await()
    }

    suspend fun deleteFolder(uid: String, folderId: String, packIdsToUngroup: List<String>) {
        if (uid.isBlank() || folderId.isBlank()) return
        
        val updates = mutableMapOf<String, Any?>()
        // Ungroup packs in this folder
        packIdsToUngroup.forEach { packId ->
            updates["users/$uid/packs/$packId/folderId"] = null
        }
        // Remove folder node
        updates["users/$uid/folders/$folderId"] = null

        db.reference.updateChildren(updates).await()
    }
}
