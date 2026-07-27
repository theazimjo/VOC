package abs.uits.vocabry.data.model

/** Mirrors `users/{uid}/profile`, mirrored on every login (src/contexts/AuthContext.jsx). */
data class UserProfile(
    val displayName: String = "",
    val email: String = "",
    val photoURL: String = "",
    val createdAt: String = "",
) {
    fun toMap(): Map<String, Any?> = mapOf(
        "displayName" to displayName,
        "email" to email,
        "photoURL" to photoURL,
        "createdAt" to createdAt,
    )
}
