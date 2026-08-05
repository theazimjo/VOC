package abs.uits.vocabry.data.model

import com.google.firebase.database.DataSnapshot

/** Mirrors `users/{uid}/packs/{packId}` (src/contexts/PacksContext.jsx). */
data class Pack(
    val id: String = "",
    val name: String = "",
    val description: String = "",
    val color: String = "#7C3AED",
    val icon: String = "📦",
    val level: String = "beginner",
    val createdAt: String = "",
    val wordCount: Int = 0,
    val folderId: String? = null,
    val marketPackId: String? = null,
    val language: String = "en-US",
) {
    companion object {
        fun fromSnapshot(snapshot: DataSnapshot): Pack {
            return Pack(
                id = snapshot.key ?: "",
                name = snapshot.child("name").getValue(String::class.java) ?: "",
                description = snapshot.child("description").getValue(String::class.java) ?: "",
                color = snapshot.child("color").getValue(String::class.java) ?: "#7C3AED",
                icon = snapshot.child("icon").getValue(String::class.java) ?: "📦",
                level = snapshot.child("level").getValue(String::class.java) ?: "beginner",
                createdAt = snapshot.child("createdAt").getValue(String::class.java) ?: "",
                wordCount = snapshot.child("wordCount").getValue(Double::class.java)?.toInt() ?: 0,
                folderId = snapshot.child("folderId").getValue(String::class.java),
                marketPackId = snapshot.child("marketPackId").getValue(String::class.java),
                language = snapshot.child("language").getValue(String::class.java) ?: "en-US",
            )
        }
    }

    fun toMap(): Map<String, Any?> = buildMap {
        put("name", name)
        put("description", description)
        put("color", color)
        put("icon", icon)
        put("level", level)
        put("createdAt", createdAt)
        put("wordCount", wordCount)
        folderId?.let { put("folderId", it) }
        marketPackId?.let { put("marketPackId", it) }
        put("language", language)
    }
}
