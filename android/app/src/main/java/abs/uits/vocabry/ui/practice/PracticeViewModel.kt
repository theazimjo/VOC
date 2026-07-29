package abs.uits.vocabry.ui.practice

import abs.uits.vocabry.data.model.Word
import abs.uits.vocabry.data.repo.PackRepository
import abs.uits.vocabry.data.repo.StreakRepository
import abs.uits.vocabry.data.repo.WordRepository
import abs.uits.vocabry.engine.SentenceValidator
import abs.uits.vocabry.engine.SpacedRepetition
import abs.uits.vocabry.engine.TextSimilarity
import abs.uits.vocabry.engine.WeightedSelect
import abs.uits.vocabry.util.FeedbackSound
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.firebase.auth.FirebaseAuth
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch

sealed class PracticeSource {
    data object Due : PracticeSource()
    data class Pack(val packId: String) : PracticeSource()
}

enum class PracticeMode {
    MODE_HUB, FLASHCARD, QUIZ, SPELLING, MATCH, SENTENCE, PRONOUNCE
}

data class MatchTile(val wordId: String, val text: String)

data class MatchUiState(
    val leftItems: List<MatchTile> = emptyList(),
    val rightItems: List<MatchTile> = emptyList(),
    val selectedLeftId: String? = null,
    val selectedRightId: String? = null,
    val matchedIds: Set<String> = emptySet(),
    val errorLeftId: String? = null,
    val errorRightId: String? = null,
    val erroredWordIds: Set<String> = emptySet(),
    val mistakes: Int = 0,
    val elapsedSec: Int = 0,
)

data class PracticeUiState(
    val loading: Boolean = true,
    val allSourceWords: List<Word> = emptyList(),
    val queue: List<Word> = emptyList(),
    val currentIndex: Int = 0,
    val selectedMode: PracticeMode = PracticeMode.MODE_HUB,
    val wordCountLimit: Int = 10,
    val introVisible: Boolean = false,
    val introMode: PracticeMode? = null,
    val isFlipped: Boolean = false,
    val correctCount: Int = 0,
    val incorrectCount: Int = 0,
    val wrongWords: List<Word> = emptyList(),
    val finished: Boolean = false,
    // Quiz state
    val quizOptions: List<String> = emptyList(),
    val quizSelectedOption: String? = null,
    val quizAnswered: Boolean = false,
    val quizTimeLeft: Int = 15,
    val quizTimedOut: Boolean = false,
    // Spelling state
    val spellingInput: String = "",
    val spellingAnswered: Boolean = false,
    val spellingIsCorrect: Boolean = false,
    val spellingScrambled: String = "",
    // Sentence Builder state
    val sentenceInput: String = "",
    val sentenceAnswered: Boolean = false,
    val sentenceIsCorrect: Boolean = false,
    val sentenceIsTooShort: Boolean = false,
    // Pronounce state
    val pronounceAnswered: Boolean = false,
    val pronounceIsCorrect: Boolean = false,
    // Match state (its own board, not driven by queue/currentIndex)
    val matchState: MatchUiState = MatchUiState(),
) {
    val currentWord: Word? get() = queue.getOrNull(currentIndex)
}

private const val QUIZ_SECONDS = 15
private const val CONFUSION_THRESHOLD = 0.6

class PracticeViewModel(
    private val source: PracticeSource,
    private val uid: String = FirebaseAuth.getInstance().currentUser?.uid.orEmpty(),
    private val wordRepo: WordRepository = WordRepository(),
    private val streakRepo: StreakRepository = StreakRepository(),
    private val packRepo: PackRepository = PackRepository(),
) : ViewModel() {

    private val _state = MutableStateFlow(PracticeUiState())
    val state: StateFlow<PracticeUiState> = _state.asStateFlow()

    private val _feedbackEvents = MutableSharedFlow<FeedbackSound>(extraBufferCapacity = 1)
    val feedbackEvents: SharedFlow<FeedbackSound> = _feedbackEvents.asSharedFlow()

    private var cardStartMs: Long = System.currentTimeMillis()
    private var matchAttemptStartMs: Long = System.currentTimeMillis()
    private var matchLiveWords: MutableMap<String, Word> = mutableMapOf()
    private var quizTimerJob: Job? = null
    private var matchTimerJob: Job? = null

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
            _state.value = _state.value.copy(loading = false, allSourceWords = all)
        }
    }

    private fun prepareQueue(words: List<Word>, limit: Int): List<Word> {
        if (words.isEmpty()) return emptyList()
        return WeightedSelect.weightedSelectWords(words, limit)
    }

    fun setWordCount(limit: Int) {
        _state.value = _state.value.copy(wordCountLimit = limit)
    }

    /** Shows the 3.2s mode-intro splash (web parity), then begins the session. */
    fun selectMode(mode: PracticeMode) {
        _state.value = _state.value.copy(introVisible = true, introMode = mode)
        viewModelScope.launch {
            delay(3200)
            beginMode(mode)
        }
    }

    private fun beginMode(mode: PracticeMode) {
        quizTimerJob?.cancel()
        matchTimerJob?.cancel()
        cardStartMs = System.currentTimeMillis()
        val queue = prepareQueue(_state.value.allSourceWords, _state.value.wordCountLimit)
        _state.value = _state.value.copy(
            introVisible = false,
            introMode = null,
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
            quizTimeLeft = QUIZ_SECONDS,
            quizTimedOut = false,
            spellingAnswered = false,
            spellingInput = "",
            spellingScrambled = if (queue.isNotEmpty()) scrambleWord(queue[0].word) else "",
            sentenceInput = "",
            sentenceAnswered = false,
            sentenceIsCorrect = false,
            sentenceIsTooShort = false,
            pronounceAnswered = false,
            pronounceIsCorrect = false,
            matchState = MatchUiState(),
        )
        when (mode) {
            PracticeMode.QUIZ -> {
                if (queue.isNotEmpty()) generateQuizOptions(queue[0])
                startQuizTimer()
            }
            PracticeMode.MATCH -> startMatch(queue)
            else -> {}
        }
    }

    private fun scrambleWord(word: String): String =
        word.toList().shuffled().joinToString(" ")

    private fun generateQuizOptions(current: Word) {
        val correct = current.translation
        val otherTranslations = _state.value.allSourceWords
            .filter { it.id != current.id && !it.translation.equals(correct, ignoreCase = true) }
            .map { it.translation }
            .distinct()
            .shuffled()
            .take(3)
            .toMutableList()
        while (otherTranslations.size < 3) otherTranslations.add("Variant ${otherTranslations.size + 1}")

        _state.value = _state.value.copy(
            quizOptions = (listOf(correct) + otherTranslations).shuffled(),
            quizSelectedOption = null,
            quizAnswered = false
        )
    }

    private fun startQuizTimer() {
        quizTimerJob?.cancel()
        _state.value = _state.value.copy(quizTimeLeft = QUIZ_SECONDS, quizTimedOut = false)
        quizTimerJob = viewModelScope.launch {
            while (true) {
                delay(1000)
                val s = _state.value
                if (s.quizAnswered || s.selectedMode != PracticeMode.QUIZ) return@launch
                val next = s.quizTimeLeft - 1
                if (next <= 0) {
                    handleQuizTimeout()
                    return@launch
                }
                _state.value = s.copy(quizTimeLeft = next)
            }
        }
    }

    private fun handleQuizTimeout() {
        val current = _state.value.currentWord ?: return
        val responseTimeSec = (System.currentTimeMillis() - cardStartMs) / 1000.0
        viewModelScope.launch {
            wordRepo.submitReview(
                uid, current, quality = 1, responseTimeSec = responseTimeSec,
                retrievalType = "passive_recall", packName = sourcePackName, allWords = wordCorpus,
            )
        }
        _feedbackEvents.tryEmit(FeedbackSound.WRONG)
        _state.value = _state.value.copy(quizAnswered = true, quizTimedOut = true, quizTimeLeft = 0)
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

        _feedbackEvents.tryEmit(if (isCorrect) FeedbackSound.CORRECT else FeedbackSound.WRONG)
        recordResult(current, isCorrect)
    }

    fun submitQuizAnswer(selectedOption: String) {
        val current = _state.value.currentWord ?: return
        if (_state.value.quizAnswered) return
        quizTimerJob?.cancel()

        val isCorrect = selectedOption.equals(current.translation.trim(), ignoreCase = true)
        val responseTimeSec = (System.currentTimeMillis() - cardStartMs) / 1000.0
        val quality = if (isCorrect) 4 else 1

        viewModelScope.launch {
            wordRepo.submitReview(
                uid, current, quality, responseTimeSec,
                retrievalType = "passive_recall", packName = sourcePackName, allWords = wordCorpus,
            )
        }

        _feedbackEvents.tryEmit(if (isCorrect) FeedbackSound.CORRECT else FeedbackSound.WRONG)
        _state.value = _state.value.copy(quizSelectedOption = selectedOption, quizAnswered = true)
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
        if (!isCorrect) detectConfusion(input, current, getField = { it.word })

        _feedbackEvents.tryEmit(if (isCorrect) FeedbackSound.CORRECT else FeedbackSound.WRONG)
        _state.value = _state.value.copy(spellingInput = input, spellingAnswered = true, spellingIsCorrect = isCorrect)
    }

    fun skipSpelling() {
        val current = _state.value.currentWord ?: return
        if (_state.value.spellingAnswered) return
        val responseTimeSec = (System.currentTimeMillis() - cardStartMs) / 1000.0
        viewModelScope.launch {
            wordRepo.submitReview(
                uid, current, quality = 1, responseTimeSec = responseTimeSec,
                retrievalType = "active_recall", packName = sourcePackName, allWords = wordCorpus,
            )
        }
        _feedbackEvents.tryEmit(FeedbackSound.WRONG)
        _state.value = _state.value.copy(spellingInput = current.word, spellingAnswered = true, spellingIsCorrect = false)
    }

    fun submitSentenceAnswer(input: String) {
        val current = _state.value.currentWord ?: return
        if (_state.value.sentenceAnswered || input.isBlank()) return

        val responseTimeSec = (System.currentTimeMillis() - cardStartMs) / 1000.0
        val usesWord = SentenceValidator.sentenceUsesWord(input, current.word)
        val wordCount = input.trim().split(Regex("\\s+")).size
        val tooShort = usesWord && wordCount < 3
        val quality = if (usesWord) 5 else 1

        viewModelScope.launch {
            wordRepo.submitReview(
                uid, current, quality, responseTimeSec,
                retrievalType = "active_recall", packName = sourcePackName, allWords = wordCorpus,
            )
        }

        _feedbackEvents.tryEmit(if (usesWord) FeedbackSound.CORRECT else FeedbackSound.WRONG)
        _state.value = _state.value.copy(
            sentenceInput = input,
            sentenceAnswered = true,
            sentenceIsCorrect = usesWord,
            sentenceIsTooShort = tooShort,
        )
    }

    fun skipSentence() {
        val current = _state.value.currentWord ?: return
        if (_state.value.sentenceAnswered) return
        val responseTimeSec = (System.currentTimeMillis() - cardStartMs) / 1000.0
        viewModelScope.launch {
            wordRepo.submitReview(
                uid, current, quality = 1, responseTimeSec = responseTimeSec,
                retrievalType = "active_recall", packName = sourcePackName, allWords = wordCorpus,
            )
        }
        _feedbackEvents.tryEmit(FeedbackSound.WRONG)
        _state.value = _state.value.copy(sentenceAnswered = true, sentenceIsCorrect = false, sentenceIsTooShort = false)
    }

    /** Called by the Compose layer after on-device speech recognition resolves. */
    fun submitPronounceResult(isCorrect: Boolean) {
        val current = _state.value.currentWord ?: return
        if (_state.value.pronounceAnswered) return
        val responseTimeSec = (System.currentTimeMillis() - cardStartMs) / 1000.0
        val quality = if (isCorrect) 5 else 1
        viewModelScope.launch {
            wordRepo.submitReview(
                uid, current, quality, responseTimeSec,
                retrievalType = "active_recall", packName = sourcePackName, allWords = wordCorpus,
            )
        }
        _feedbackEvents.tryEmit(if (isCorrect) FeedbackSound.CORRECT else FeedbackSound.WRONG)
        _state.value = _state.value.copy(pronounceAnswered = true, pronounceIsCorrect = isCorrect)
    }

    fun skipPronounce() {
        val current = _state.value.currentWord ?: return
        if (_state.value.pronounceAnswered) return
        val responseTimeSec = (System.currentTimeMillis() - cardStartMs) / 1000.0
        viewModelScope.launch {
            wordRepo.submitReview(
                uid, current, quality = 1, responseTimeSec = responseTimeSec,
                retrievalType = "active_recall", packName = sourcePackName, allWords = wordCorpus,
            )
        }
        _state.value = _state.value.copy(pronounceAnswered = true, pronounceIsCorrect = false)
    }

    /** A wrong answer that closely matches a *different* word feeds the Confusion Network. */
    private fun detectConfusion(typedText: String, current: Word, getField: (Word) -> String) {
        val match = TextSimilarity.findConfusableMatch(
            typedText = typedText,
            candidates = wordCorpus,
            excludeId = current.id,
            threshold = CONFUSION_THRESHOLD,
            getId = { it.id },
            getField = getField,
        ) ?: return
        viewModelScope.launch {
            wordRepo.recordConfusionPair(
                uid, current.id, match.id,
                meta = mapOf(
                    "wordA" to current.word,
                    "wordB" to match.candidate.word,
                    "translationA" to current.translation,
                    "translationB" to match.candidate.translation,
                )
            )
        }
    }

    fun nextQuestion() {
        val s = _state.value
        val lastWord = s.currentWord
        val isCorrect = when (s.selectedMode) {
            PracticeMode.QUIZ -> s.quizSelectedOption.equals(lastWord?.translation?.trim(), ignoreCase = true)
            PracticeMode.SPELLING -> s.spellingIsCorrect
            PracticeMode.SENTENCE -> s.sentenceIsCorrect
            PracticeMode.PRONOUNCE -> s.pronounceIsCorrect
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
            quizTimerJob?.cancel()
            viewModelScope.launch { streakRepo.incrementActivity(uid, s.queue.size) }
            _feedbackEvents.tryEmit(FeedbackSound.VICTORY)
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
                spellingInput = "",
                spellingScrambled = scrambleWord(s.queue[nextIndex].word),
                sentenceInput = "",
                sentenceAnswered = false,
                sentenceIsCorrect = false,
                sentenceIsTooShort = false,
                pronounceAnswered = false,
                pronounceIsCorrect = false,
            )
            if (s.selectedMode == PracticeMode.QUIZ) {
                generateQuizOptions(s.queue[nextIndex])
                startQuizTimer()
            }
        }
    }

    // ─── Match mode ─────────────────────────────────────────────────────────

    private fun startMatch(queue: List<Word>) {
        val playWords = queue.take(8)
        matchLiveWords = playWords.associateBy { it.id }.toMutableMap()
        val left = playWords.map { MatchTile(it.id, it.word) }.shuffled()
        val right = playWords.map { MatchTile(it.id, it.translation) }.shuffled()
        _state.value = _state.value.copy(matchState = MatchUiState(leftItems = left, rightItems = right))
        matchAttemptStartMs = System.currentTimeMillis()

        matchTimerJob?.cancel()
        matchTimerJob = viewModelScope.launch {
            while (true) {
                delay(1000)
                if (_state.value.selectedMode != PracticeMode.MATCH || _state.value.finished) return@launch
                val m = _state.value.matchState
                _state.value = _state.value.copy(matchState = m.copy(elapsedSec = m.elapsedSec + 1))
            }
        }
    }

    fun selectMatchLeft(id: String) {
        val m = _state.value.matchState
        if (m.matchedIds.contains(id) || m.errorLeftId != null) return
        _state.value = _state.value.copy(matchState = m.copy(selectedLeftId = id))
        checkMatchPair()
    }

    fun selectMatchRight(id: String) {
        val m = _state.value.matchState
        if (m.matchedIds.contains(id) || m.errorRightId != null) return
        _state.value = _state.value.copy(matchState = m.copy(selectedRightId = id))
        checkMatchPair()
    }

    private fun checkMatchPair() {
        val m = _state.value.matchState
        val left = m.selectedLeftId
        val right = m.selectedRightId
        if (left == null || right == null) return

        val responseTimeSec = (System.currentTimeMillis() - matchAttemptStartMs) / 1000.0
        val word = matchLiveWords[left]

        if (left == right) {
            val newMatched = m.matchedIds + left
            _state.value = _state.value.copy(matchState = m.copy(matchedIds = newMatched, selectedLeftId = null, selectedRightId = null))
            _feedbackEvents.tryEmit(FeedbackSound.CORRECT)
            matchAttemptStartMs = System.currentTimeMillis()

            if (word != null) {
                viewModelScope.launch {
                    wordRepo.submitReview(
                        uid, word, quality = 4, responseTimeSec = responseTimeSec,
                        retrievalType = "passive_recall", packName = sourcePackName, allWords = wordCorpus,
                    )
                }
            }

            if (newMatched.size == m.leftItems.size) {
                viewModelScope.launch {
                    delay(800)
                    finishMatch()
                }
            }
        } else {
            _feedbackEvents.tryEmit(FeedbackSound.WRONG)
            _state.value = _state.value.copy(
                matchState = m.copy(
                    errorLeftId = left,
                    errorRightId = right,
                    mistakes = m.mistakes + 1,
                    erroredWordIds = m.erroredWordIds + left,
                )
            )
            if (word != null) {
                viewModelScope.launch {
                    wordRepo.submitReview(
                        uid, word, quality = 1, responseTimeSec = responseTimeSec,
                        retrievalType = "passive_recall", packName = sourcePackName, allWords = wordCorpus,
                    )
                }
            }
            viewModelScope.launch {
                delay(600)
                val cur = _state.value.matchState
                _state.value = _state.value.copy(
                    matchState = cur.copy(selectedLeftId = null, selectedRightId = null, errorLeftId = null, errorRightId = null)
                )
                matchAttemptStartMs = System.currentTimeMillis()
            }
        }
    }

    private fun finishMatch() {
        matchTimerJob?.cancel()
        val m = _state.value.matchState
        val total = m.leftItems.size
        val incorrect = m.erroredWordIds.size
        val correct = (total - incorrect).coerceAtLeast(0)
        viewModelScope.launch { streakRepo.incrementActivity(uid, total) }
        _feedbackEvents.tryEmit(FeedbackSound.VICTORY)
        _state.value = _state.value.copy(correctCount = correct, incorrectCount = incorrect, finished = true)
    }

    fun resetToHub() {
        quizTimerJob?.cancel()
        matchTimerJob?.cancel()
        _state.value = _state.value.copy(
            selectedMode = PracticeMode.MODE_HUB,
            introVisible = false,
            introMode = null,
            queue = emptyList(),
            currentIndex = 0,
            isFlipped = false,
            correctCount = 0,
            incorrectCount = 0,
            wrongWords = emptyList(),
            finished = false,
            quizAnswered = false,
            quizSelectedOption = null,
            spellingAnswered = false,
            spellingInput = "",
            sentenceAnswered = false,
            sentenceInput = "",
            pronounceAnswered = false,
            matchState = MatchUiState(),
        )
    }
}
