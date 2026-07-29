package abs.uits.vocabry.data.model

import com.google.firebase.database.DataSnapshot

/** Mirrors `users/{uid}/folders/{folderId}` (src/contexts/PacksContext.jsx). */
data class Folder(
    val id: String = "",
    val name: String = "",
    val icon: String = "📁",
    val createdAt: String = "",
) {
    companion object {
        fun fromSnapshot(snapshot: DataSnapshot): Folder {
            return Folder(
                id = snapshot.key ?: "",
                name = snapshot.child("name").getValue(String::class.java) ?: "",
                icon = snapshot.child("icon").getValue(String::class.java) ?: "📁",
                createdAt = snapshot.child("createdAt").getValue(String::class.java) ?: "",
            )
        }
    }

    fun toMap(): Map<String, Any?> = mapOf(
        "name" to name,
        "icon" to icon,
        "createdAt" to createdAt,
    )
}
