package abs.uits.vocabry.data.model

import com.google.firebase.database.DataSnapshot

/** Mirrors `users/{uid}/packs/{packId}` (src/contexts/PacksContext.jsx). */
data class Pack(
    val id: String = "",
    val name: String = "",
    val description: String = "",
    val color: String = "#7C3AED",
    val icon: String = "📦", // 📦
    val level: String = "beginner",
    val createdAt: String = "",
    val wordCount: Int = 0,
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
            )
        }
    }

    fun toMap(): Map<String, Any?> = mapOf(
        "name" to name,
        "description" to description,
        "color" to color,
        "icon" to icon,
        "level" to level,
        "createdAt" to createdAt,
        "wordCount" to wordCount,
    )
}
