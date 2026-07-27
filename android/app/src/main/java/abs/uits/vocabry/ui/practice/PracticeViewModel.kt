package abs.uits.vocabry.ui.practice

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import abs.uits.vocabry.data.model.Word
import abs.uits.vocabry.data.repo.StreakRepository
import abs.uits.vocabry.data.repo.WordRepository
import abs.uits.vocabry.engine.SpacedRepetition
import com.google.firebase.auth.FirebaseAuth
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch

sealed class PracticeSource {
    data object Due : PracticeSource()
    data class Pack(val packId: String) : PracticeSource()
}

data class PracticeUiState(
    val loading: Boolean = true,
    val queue: List<Word> = emptyList(),
    val currentIndex: Int = 0,
    val isFlipped: Boolean = false,
    val correctCount: Int = 0,
    val incorrectCount: Int = 0,
    val finished: Boolean = false,
) {
    val currentWord: Word? get() = queue.getOrNull(currentIndex)
}

private const val SESSION_SIZE = 20

class PracticeViewModel(
    private val source: PracticeSource,
    private val uid: String = FirebaseAuth.getInstance().currentUser?.uid.orEmpty(),
    private val wordRepo: WordRepository = WordRepository(),
    private val streakRepo: StreakRepository = StreakRepository(),
) : ViewModel() {

    private val _state = MutableStateFlow(PracticeUiState())
    val state: StateFlow<PracticeUiState> = _state.asStateFlow()

    private var cardStartMs: Long = System.currentTimeMillis()

    init {
        viewModelScope.launch {
            val all = when (source) {
                is PracticeSource.Due -> {
                    val words = wordRepo.observeAllWords(uid).first()
                    SpacedRepetition.getDueWords(words)
                }
                is PracticeSource.Pack -> wordRepo.observeWordsForPack(uid, source.packId).first()
            }
            val queue = all.shuffled().take(SESSION_SIZE)
            cardStartMs = System.currentTimeMillis()
            _state.value = PracticeUiState(loading = false, queue = queue)
        }
    }

    fun flipCard() {
        _state.value = _state.value.copy(isFlipped = !_state.value.isFlipped)
    }

    fun rate(response: String) {
        val current = _state.value.currentWord ?: return
        val quality = SpacedRepetition.responseToQuality(response)
        val responseTimeSec = (System.currentTimeMillis() - cardStartMs) / 1000.0
        val isCorrect = response != "again"

        viewModelScope.launch {
            wordRepo.submitReview(uid, current, quality, responseTimeSec)
        }

        val s = _state.value
        val nextIndex = s.currentIndex + 1
        val correct = s.correctCount + if (isCorrect) 1 else 0
        val incorrect = s.incorrectCount + if (isCorrect) 0 else 1

        if (nextIndex >= s.queue.size) {
            viewModelScope.launch { streakRepo.incrementActivity(uid, s.queue.size) }
            _state.value = s.copy(correctCount = correct, incorrectCount = incorrect, finished = true)
        } else {
            cardStartMs = System.currentTimeMillis()
            _state.value = s.copy(
                currentIndex = nextIndex,
                isFlipped = false,
                correctCount = correct,
                incorrectCount = incorrect,
            )
        }
    }
}
