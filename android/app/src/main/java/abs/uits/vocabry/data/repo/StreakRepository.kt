package abs.uits.vocabry.data.repo

import abs.uits.vocabry.data.model.Streak
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.MutableData
import com.google.firebase.database.Transaction
import com.google.firebase.database.ValueEventListener
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import java.time.LocalDate
import java.time.format.DateTimeFormatter

/**
 * Equivalent port of src/hooks/useStreak.js + src/utils/streak.js's daily
 * streak/goal tracking at `users/{uid}/streak`. Self-heals a broken streak
 * (missed day, or yesterday's goal not met -> reset to 0) and increments
 * `streakCount` the first time `todayCount` crosses `dailyGoal` on a given
 * day, all inside one Firebase transaction (the web version does the same
 * heal-then-increment atomically inside `incrementActivity`'s transaction).
 */
class StreakRepository(
    private val db: FirebaseDatabase = FirebaseDatabase.getInstance(),
) {
    private val dateFmt = DateTimeFormatter.ISO_LOCAL_DATE

    fun observeStreak(uid: String): Flow<Streak> = callbackFlow {
        val ref = db.reference.child("users").child(uid).child("streak")
        val listener = object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                trySend(Streak.fromSnapshot(snapshot))
            }

            override fun onCancelled(error: DatabaseError) {
                close(error.toException())
            }
        }
        ref.addValueEventListener(listener)
        awaitClose { ref.removeEventListener(listener) }
    }

    fun incrementActivity(uid: String, amount: Int = 1) {
        val today = LocalDate.now()
        val todayStr = today.format(dateFmt)
        val yesterdayStr = today.minusDays(1).format(dateFmt)

        val ref = db.reference.child("users").child(uid).child("streak")
        ref.runTransaction(object : Transaction.Handler {
            override fun doTransaction(currentData: MutableData): Transaction.Result {
                val streakCount = currentData.child("streakCount").getValue(Long::class.java)?.toInt() ?: 0
                val lastActiveDate = currentData.child("lastActiveDate").getValue(String::class.java)
                val todayCount = currentData.child("todayCount").getValue(Long::class.java)?.toInt() ?: 0
                val dailyGoal = currentData.child("dailyGoal").getValue(Long::class.java)?.toInt()?.takeIf { it > 0 } ?: 5
                val activityLog = mutableMapOf<String, Int>()
                currentData.child("activityLog").children.forEach { child ->
                    val date = child.key ?: return@forEach
                    activityLog[date] = child.getValue(Long::class.java)?.toInt() ?: 0
                }

                val newStreakCount: Int
                val newTodayCount: Int
                val newLastActiveDate: String

                if (lastActiveDate == todayStr) {
                    newTodayCount = todayCount + amount
                    val crossedGoal = todayCount < dailyGoal && newTodayCount >= dailyGoal
                    newStreakCount = streakCount + if (crossedGoal) 1 else 0
                    newLastActiveDate = todayStr
                } else {
                    val metYesterday = lastActiveDate == yesterdayStr && (activityLog[lastActiveDate] ?: 0) >= dailyGoal
                    val baseStreak = if (metYesterday) streakCount else 0
                    val crossedGoal = amount >= dailyGoal
                    newTodayCount = amount
                    newStreakCount = baseStreak + if (crossedGoal) 1 else 0
                    newLastActiveDate = todayStr
                }
                activityLog[todayStr] = newTodayCount

                currentData.value = mapOf(
                    "streakCount" to newStreakCount,
                    "lastActiveDate" to newLastActiveDate,
                    "todayCount" to newTodayCount,
                    "dailyGoal" to dailyGoal,
                    "activityLog" to activityLog,
                )
                return Transaction.success(currentData)
            }

            override fun onComplete(error: DatabaseError?, committed: Boolean, snapshot: DataSnapshot?) {}
        })
    }

    suspend fun setDailyGoal(uid: String, goal: Int) {
        db.reference.child("users").child(uid).child("streak").child("dailyGoal").setValue(goal)
    }
}
