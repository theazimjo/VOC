package abs.uits.vocabry.ui.dashboard

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import abs.uits.vocabry.data.model.Streak
import abs.uits.vocabry.data.model.Word
import abs.uits.vocabry.data.repo.StreakRepository
import abs.uits.vocabry.data.repo.WordRepository
import abs.uits.vocabry.engine.MemoryEngine
import com.google.firebase.auth.FirebaseAuth
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import java.time.Instant

data class DueWordInfo(val word: Word, val recallPct: Int)

data class DashboardUiState(
    val loading: Boolean = true,
    val totalWords: Int = 0,
    val masteredWords: Int = 0,
    val dueCount: Int = 0,
    val masteryPercent: Int = 0,
    val streak: Streak = Streak(),
    val dueWords: List<DueWordInfo> = emptyList(),
)

/** current recall probability P(t) for a word, given its stability and last review. */
fun recallInfoFor(word: Word): Int {
    val stability = word.stability ?: MemoryEngine.INITIAL_STABILITY
    val daysSince = word.lastReviewed?.let { last ->
        (Instant.now().toEpochMilli() - Instant.parse(last).toEpochMilli()) / 86_400_000.0
    } ?: 0.0
    return Math.round(MemoryEngine.computeRecallProbability(stability, daysSince) * 100).toInt()
}

class DashboardViewModel(
    private val uid: String = FirebaseAuth.getInstance().currentUser?.uid.orEmpty(),
    wordRepo: WordRepository = WordRepository(),
    streakRepo: StreakRepository = StreakRepository(),
) : ViewModel() {

    val uiState: StateFlow<DashboardUiState> = combine(
        wordRepo.observeAllWords(uid),
        streakRepo.observeStreak(uid),
    ) { words, streak ->
        val now = Instant.now()
        val due = words.filter { it.nextReview == null || Instant.parse(it.nextReview) <= now }
        val dueInfo = due.map { DueWordInfo(it, recallInfoFor(it)) }.sortedBy { it.recallPct }.take(6)

        DashboardUiState(
            loading = false,
            totalWords = words.size,
            masteredWords = words.count { it.mastery >= 80 },
            dueCount = due.size,
            masteryPercent = if (words.isEmpty()) 0 else words.sumOf { it.mastery } / words.size,
            streak = streak,
            dueWords = dueInfo,
        )
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), DashboardUiState())
}
