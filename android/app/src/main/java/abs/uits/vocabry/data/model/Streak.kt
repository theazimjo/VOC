package abs.uits.vocabry.data.model

import com.google.firebase.database.DataSnapshot

/** Mirrors `users/{uid}/streak` (src/hooks/useStreak.js, src/utils/streak.js). */
data class Streak(
    val streakCount: Int = 0,
    val lastActiveDate: String? = null, // YYYY-MM-DD, local
    val todayCount: Int = 0,
    val dailyGoal: Int = 5,
    val activityLog: Map<String, Int> = emptyMap(),
) {
    companion object {
        fun fromSnapshot(snapshot: DataSnapshot): Streak {
            val log = mutableMapOf<String, Int>()
            snapshot.child("activityLog").children.forEach { child ->
                val date = child.key ?: return@forEach
                val count = child.getValue(Double::class.java)?.toInt() ?: 0
                log[date] = count
            }
            return Streak(
                streakCount = snapshot.child("streakCount").getValue(Double::class.java)?.toInt() ?: 0,
                lastActiveDate = snapshot.child("lastActiveDate").getValue(String::class.java),
                todayCount = snapshot.child("todayCount").getValue(Double::class.java)?.toInt() ?: 0,
                dailyGoal = snapshot.child("dailyGoal").getValue(Double::class.java)?.toInt() ?: 5,
                activityLog = log,
            )
        }
    }

    fun toMap(): Map<String, Any?> = mapOf(
        "streakCount" to streakCount,
        "lastActiveDate" to lastActiveDate,
        "todayCount" to todayCount,
        "dailyGoal" to dailyGoal,
        "activityLog" to activityLog,
    )
}
