package abs.uits.vocabry.ui.practice

import abs.uits.vocabry.data.model.Word
import abs.uits.vocabry.data.repo.PackRepository
import abs.uits.vocabry.data.repo.StreakRepository
import abs.uits.vocabry.data.repo.WordRepository
import abs.uits.vocabry.engine.SpacedRepetition
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
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

enum class PracticeMode {
    MODE_HUB, FLASHCARD, QUIZ, SPELLING
}

data class PracticeUiState(
    val loading: Boolean = true,
    val allSourceWords: List<Word> = emptyList(),
    val queue: List<Word> = emptyList(),
    val currentIndex: Int = 0,
    val selectedMode: PracticeMode = PracticeMode.MODE_HUB,
    val wordCountLimit: Int = 10,
    val isFlipped: Boolean = false,
    val correctCount: Int = 0,
    val incorrectCount: Int = 0,
    val wrongWords: List<Word> = emptyList(),
    val finished: Boolean = false,
    // Quiz state
    val quizOptions: List<String> = emptyList(),
    val quizSelectedOption: String? = null,
    val quizAnswered: Boolean = false,
    // Spelling state
    val spellingInput: String = "",
    val spellingAnswered: Boolean = false,
    val spellingIsCorrect: Boolean = false,
) {
    val currentWord: Word? get() = queue.getOrNull(currentIndex)
}

class PracticeViewModel(
    private val source: PracticeSource,
    private val uid: String = FirebaseAuth.getInstance().currentUser?.uid.orEmpty(),
    private val wordRepo: WordRepository = WordRepository(),
    private val streakRepo: StreakRepository = StreakRepository(),
    private val packRepo: PackRepository = PackRepository(),
) : ViewModel() {

    private val _state = MutableStateFlow(PracticeUiState())
    val state: StateFlow<PracticeUiState> = _state.asStateFlow()

    private var cardStartMs: Long = System.currentTimeMillis()

    // Full word corpus (every pack) + this session's pack name, kept for
    // SemanticClassifier/computeClusterCalibration — mirrors PracticePage.jsx
    // building clusterHistory from PacksContext's allWords for every review,
    // not just the words in the current session's queue.
    private var wordCorpus: List<Word> = emptyList()
    private var sourcePackName: String = ""

    init {
        loadWords()
    }

    private fun loadWords() {
        viewModelScope.launch {
            _state.value = _state.value.copy(loading = true)
            val corpus = wordRepo.observeAllWords(uid).first()
            wordCorpus = corpus
            val all = when (source) {
                is PracticeSource.Due -> SpacedRepetition.getDueWords(corpus)
                is PracticeSource.Pack -> corpus.filter { it.packId == source.packId }
            }
            sourcePackName = if (source is PracticeSource.Pack) {
                packRepo.observePacks(uid).first().find { it.id == source.packId }?.name.orEmpty()
            } else {
                ""
            }
            _state.value = _state.value.copy(
                loading = false,
                allSourceWords = all,
                queue = prepareQueue(all, _state.value.wordCountLimit)
            )
        }
    }

    private fun prepareQueue(words: List<Word>, limit: Int): List<Word> {
        if (words.isEmpty()) return emptyList()
        val shuffled = words.shuffled()
        return if (limit > 0 && shuffled.size > limit) shuffled.take(limit) else shuffled
    }

    fun setWordCount(limit: Int) {
        val currentAll = _state.value.allSourceWords
        _state.value = _state.value.copy(
            wordCountLimit = limit,
            queue = prepareQueue(currentAll, limit)
        )
    }

    fun selectMode(mode: PracticeMode) {
        cardStartMs = System.currentTimeMillis()
        val queue = prepareQueue(_state.value.allSourceWords, _state.value.wordCountLimit)
        _state.value = _state.value.copy(
            selectedMode = mode,
            queue = queue,
            currentIndex = 0,
            isFlipped = false,
            correctCount = 0,
            incorrectCount = 0,
            wrongWords = emptyList(),
            finished = false,
            quizAnswered = false,
            quizSelectedOption = null,
            spellingAnswered = false,
            spellingInput = ""
        )
        if (mode == PracticeMode.QUIZ && queue.isNotEmpty()) {
            generateQuizOptions(queue[0])
        }
    }

    private fun generateQuizOptions(current: Word) {
        val correct = current.translation
        val otherTranslations = _state.value.allSourceWords
            .map { it.translation }
            .filter { it.isNotBlank() && !it.equals(correct, ignoreCase = true) }
            .distinct()
            .shuffled()
            .take(3)

        val options = (listOf(correct) + otherTranslations).shuffled()
        _state.value = _state.value.copy(
            quizOptions = options,
            quizSelectedOption = null,
            quizAnswered = false
        )
    }

    fun flipCard() {
        _state.value = _state.value.copy(isFlipped = !_state.value.isFlipped)
    }

    fun rateFlashcard(response: String) {
        val current = _state.value.currentWord ?: return
        val quality = SpacedRepetition.responseToQuality(response)
        val responseTimeSec = (System.currentTimeMillis() - cardStartMs) / 1000.0
        val isCorrect = response != "again"

        viewModelScope.launch {
            wordRepo.submitReview(
                uid, current, quality, responseTimeSec,
                retrievalType = "passive_recall", packName = sourcePackName, allWords = wordCorpus,
            )
        }

        recordResult(current, isCorrect)
    }

    fun submitQuizAnswer(selectedOption: String) {
        val current = _state.value.currentWord ?: return
        if (_state.value.quizAnswered) return

        val isCorrect = selectedOption.equals(current.translation.trim(), ignoreCase = true)
        val responseTimeSec = (System.currentTimeMillis() - cardStartMs) / 1000.0
        val quality = if (isCorrect) 4 else 1

        viewModelScope.launch {
            wordRepo.submitReview(
                uid, current, quality, responseTimeSec,
                retrievalType = "passive_recall", packName = sourcePackName, allWords = wordCorpus,
            )
        }

        _state.value = _state.value.copy(
            quizSelectedOption = selectedOption,
            quizAnswered = true
        )
    }

    fun submitSpellingAnswer(input: String) {
        val current = _state.value.currentWord ?: return
        if (_state.value.spellingAnswered) return

        val cleanInput = input.trim().lowercase()
        val cleanWord = current.word.trim().lowercase()
        val isCorrect = cleanInput == cleanWord
        val responseTimeSec = (System.currentTimeMillis() - cardStartMs) / 1000.0
        val quality = if (isCorrect) 5 else 1

        viewModelScope.launch {
            wordRepo.submitReview(
                uid, current, quality, responseTimeSec,
                retrievalType = "active_recall", packName = sourcePackName, allWords = wordCorpus,
            )
        }

        _state.value = _state.value.copy(
            spellingInput = input,
            spellingAnswered = true,
            spellingIsCorrect = isCorrect
        )
    }

    fun nextQuestion() {
        val s = _state.value
        val lastWord = s.currentWord
        val isCorrect = when (s.selectedMode) {
            PracticeMode.QUIZ -> s.quizSelectedOption.equals(lastWord?.translation?.trim(), ignoreCase = true)
            PracticeMode.SPELLING -> s.spellingIsCorrect
            else -> true
        }

        if (lastWord != null) {
            recordResult(lastWord, isCorrect)
        }
    }

    private fun recordResult(word: Word, isCorrect: Boolean) {
        val s = _state.value
        val nextIndex = s.currentIndex + 1
        val correct = s.correctCount + if (isCorrect) 1 else 0
        val incorrect = s.incorrectCount + if (isCorrect) 0 else 1
        val updatedWrongWords = if (!isCorrect && !s.wrongWords.any { it.id == word.id }) {
            s.wrongWords + word
        } else {
            s.wrongWords
        }

        if (nextIndex >= s.queue.size) {
            viewModelScope.launch { streakRepo.incrementActivity(uid, s.queue.size) }
            _state.value = s.copy(
                correctCount = correct,
                incorrectCount = incorrect,
                wrongWords = updatedWrongWords,
                finished = true
            )
        } else {
            cardStartMs = System.currentTimeMillis()
            _state.value = s.copy(
                currentIndex = nextIndex,
                isFlipped = false,
                correctCount = correct,
                incorrectCount = incorrect,
                wrongWords = updatedWrongWords,
                quizAnswered = false,
                quizSelectedOption = null,
                spellingAnswered = false,
                spellingInput = ""
            )
            if (s.selectedMode == PracticeMode.QUIZ) {
                generateQuizOptions(s.queue[nextIndex])
            }
        }
    }

    fun resetToHub() {
        val queue = prepareQueue(_state.value.allSourceWords, _state.value.wordCountLimit)
        _state.value = _state.value.copy(
            selectedMode = PracticeMode.MODE_HUB,
            queue = queue,
            currentIndex = 0,
            isFlipped = false,
            correctCount = 0,
            incorrectCount = 0,
            wrongWords = emptyList(),
            finished = false,
            quizAnswered = false,
            quizSelectedOption = null,
            spellingAnswered = false,
            spellingInput = ""
        )
    }
}
