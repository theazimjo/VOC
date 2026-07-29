package abs.uits.vocabry.ui.practice

import abs.uits.vocabry.data.repo.StreakRepository
import abs.uits.vocabry.data.repo.WordRepository
import abs.uits.vocabry.engine.IrregularVerbParser
import abs.uits.vocabry.engine.SentenceQuestionData
import abs.uits.vocabry.engine.VerbForms
import abs.uits.vocabry.engine.WeightedSelect
import abs.uits.vocabry.util.FeedbackSound
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.firebase.auth.FirebaseAuth
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.launch
import kotlin.random.Random

enum class TrainerSubStep { STUDY, PRACTICE }

data class OrderButtonState(val id: String, val text: String, val clicked: Boolean = false, val clickedIndex: Int = -1)

data class IrregularVerbsUiState(
    val loading: Boolean = true,
    val sessionVerbs: List<VerbForms> = emptyList(),
    val subStep: TrainerSubStep = TrainerSubStep.STUDY,
    val studyIndex: Int = 0,
    val studyRevealed: Boolean = false,
    val currentIndex: Int = 0,
    val qType: Int = 0,
    val checked: Boolean = false,
    val correctCount: Int = 0,
    val incorrectCount: Int = 0,
    val wrongVerbs: List<VerbForms> = emptyList(),
    val finished: Boolean = false,
    // Type 0: table fill-in
    val tableV1: String = "",
    val tableV2: String = "",
    val tableV3: String = "",
    val tableV1Correct: Boolean = true,
    val tableV2Correct: Boolean = true,
    val tableV3Correct: Boolean = true,
    val tablePrefillType: Int = 0, // 0=none, 1=V1, 2=V2, 3=V3
    // Type 1: shuffled order
    val orderButtons: List<OrderButtonState> = emptyList(),
    val orderStep: Int = 0,
    val orderFailed: Boolean = false,
    // Type 2: sentence context choice
    val sentenceQuestion: SentenceQuestionData? = null,
    val selectedChoice: Int? = null,
) {
    val currentVerb: VerbForms? get() = sessionVerbs.getOrNull(currentIndex)
    val studyVerb: VerbForms? get() = sessionVerbs.getOrNull(studyIndex)
}

class IrregularVerbsViewModel(
    private val packId: String,
    initialSubStep: TrainerSubStep,
    private val uid: String = FirebaseAuth.getInstance().currentUser?.uid.orEmpty(),
    private val wordRepo: WordRepository = WordRepository(),
    private val streakRepo: StreakRepository = StreakRepository(),
) : ViewModel() {

    private val _state = MutableStateFlow(IrregularVerbsUiState(subStep = initialSubStep))
    val state: StateFlow<IrregularVerbsUiState> = _state.asStateFlow()

    private val _feedbackEvents = MutableSharedFlow<FeedbackSound>(extraBufferCapacity = 1)
    val feedbackEvents: SharedFlow<FeedbackSound> = _feedbackEvents.asSharedFlow()

    /** (v1, v2, v3) to speak as one utterance — matches speakVerbs(). */
    private val _speakEvents = MutableSharedFlow<Triple<String, String, String>>(extraBufferCapacity = 1)
    val speakEvents: SharedFlow<Triple<String, String, String>> = _speakEvents.asSharedFlow()

    private var questionStartMs: Long = System.currentTimeMillis()
    private var wordCorpus: List<abs.uits.vocabry.data.model.Word> = emptyList()

    init {
        viewModelScope.launch {
            wordCorpus = wordRepo.observeAllWords(uid).first()
            val packWords = wordCorpus.filter { it.packId == packId }
            val pool = IrregularVerbParser.extractVerbForms(packWords)
            val session = WeightedSelect.weightedSelectWords(pool.map { it.word }, minOf(10, pool.size))
                .mapNotNull { w -> pool.find { it.word.id == w.id } }
            _state.value = _state.value.copy(loading = false, sessionVerbs = session)
            if (_state.value.subStep == TrainerSubStep.PRACTICE) setupQuestion()
        }
    }

    // ─── Study phase ────────────────────────────────────────────────────────

    fun nextStudyCard(): Boolean {
        val s = _state.value
        return if (s.studyIndex + 1 < s.sessionVerbs.size) {
            _state.value = s.copy(studyIndex = s.studyIndex + 1, studyRevealed = false)
            true
        } else {
            _state.value = s.copy(subStep = TrainerSubStep.PRACTICE)
            setupQuestion()
            true
        }
    }

    fun prevStudyCard() {
        val s = _state.value
        if (s.studyIndex > 0) {
            _state.value = s.copy(studyIndex = s.studyIndex - 1, studyRevealed = false)
        }
    }

    fun revealStudyCard() {
        _state.value = _state.value.copy(studyRevealed = true)
    }

    // ─── Practice phase ─────────────────────────────────────────────────────

    private fun setupQuestion() {
        val verb = _state.value.currentVerb ?: return
        questionStartMs = System.currentTimeMillis()

        val parsedSentence = IrregularVerbParser.parseSentenceQuestion(verb)
        var chosenType = Random.nextInt(3)
        if (chosenType == 2 && parsedSentence == null) {
            chosenType = if (Random.nextBoolean()) 0 else 1
        }

        when (chosenType) {
            0 -> {
                val prefill = Random.nextInt(4)
                _state.value = _state.value.copy(
                    checked = false,
                    qType = 0,
                    tablePrefillType = prefill,
                    tableV1 = if (prefill == 1) verb.v1 else "",
                    tableV2 = if (prefill == 2) verb.v2 else "",
                    tableV3 = if (prefill == 3) verb.v3 else "",
                    tableV1Correct = true,
                    tableV2Correct = true,
                    tableV3Correct = true,
                )
            }
            1 -> {
                val buttons = listOf(
                    OrderButtonState("v1", verb.v1),
                    OrderButtonState("v2", verb.v2),
                    OrderButtonState("v3", verb.v3),
                ).shuffled()
                _state.value = _state.value.copy(
                    checked = false,
                    qType = 1,
                    orderButtons = buttons,
                    orderStep = 0,
                    orderFailed = false,
                )
            }
            else -> {
                _state.value = _state.value.copy(
                    checked = false,
                    qType = 2,
                    sentenceQuestion = parsedSentence,
                    selectedChoice = null,
                )
            }
        }
    }

    fun updateTableInput(field: String, value: String) {
        if (_state.value.checked) return
        _state.value = when (field) {
            "v1" -> _state.value.copy(tableV1 = value)
            "v2" -> _state.value.copy(tableV2 = value)
            else -> _state.value.copy(tableV3 = value)
        }
    }

    fun submitTable() {
        val s = _state.value
        val verb = s.currentVerb ?: return
        if (s.checked) return

        val v1Correct = IrregularVerbParser.isCorrectMatch(s.tableV1, verb.v1)
        val v2Correct = IrregularVerbParser.isCorrectMatch(s.tableV2, verb.v2)
        val v3Correct = IrregularVerbParser.isCorrectMatch(s.tableV3, verb.v3)
        val allCorrect = v1Correct && v2Correct && v3Correct

        _state.value = s.copy(checked = true, tableV1Correct = v1Correct, tableV2Correct = v2Correct, tableV3Correct = v3Correct)
        processResult(allCorrect)
    }

    fun clickOrderButton(index: Int) {
        val s = _state.value
        val verb = s.currentVerb ?: return
        if (s.checked) return
        val btn = s.orderButtons.getOrNull(index) ?: return
        if (btn.clicked) return

        val expectedForms = listOf(verb.v1, verb.v2, verb.v3)
        val expected = expectedForms[s.orderStep]
        val isCorrectChoice = IrregularVerbParser.isCorrectMatch(btn.text, expected)

        if (isCorrectChoice) {
            val updated = s.orderButtons.toMutableList()
            updated[index] = btn.copy(clicked = true, clickedIndex = s.orderStep)
            if (s.orderStep == 2) {
                _state.value = s.copy(orderButtons = updated, checked = true)
                processResult(!s.orderFailed)
            } else {
                _state.value = s.copy(orderButtons = updated, orderStep = s.orderStep + 1)
            }
        } else {
            _feedbackEvents.tryEmit(FeedbackSound.WRONG)
            _state.value = s.copy(orderFailed = true)
        }
    }

    fun skipOrderReveal() {
        if (_state.value.checked) return
        _state.value = _state.value.copy(checked = true)
        processResult(false)
    }

    fun clickChoice(index: Int) {
        val s = _state.value
        val q = s.sentenceQuestion ?: return
        if (s.checked) return
        _state.value = s.copy(selectedChoice = index, checked = true)
        processResult(index == q.correctIndex)
    }

    private fun processResult(isCorrect: Boolean) {
        val s = _state.value
        val verb = s.currentVerb ?: return
        val responseTimeSec = (System.currentTimeMillis() - questionStartMs) / 1000.0
        val quality = if (isCorrect) 5 else 1

        _feedbackEvents.tryEmit(if (isCorrect) FeedbackSound.CORRECT else FeedbackSound.WRONG)

        var sessionVerbs = s.sessionVerbs
        // Requeue a missed verb ~4 positions ahead, synchronously — never gated
        // behind the Firebase round-trip (see IrregularVerbsTrainer.jsx's comment:
        // awaiting first could land the splice at a stale index on a slow connection).
        if (!isCorrect && !verb.requeued) {
            val reinsertAt = minOf(sessionVerbs.size, s.currentIndex + 4)
            sessionVerbs = sessionVerbs.toMutableList().apply {
                add(reinsertAt, verb.copy(requeued = true))
            }
        }

        _state.value = _state.value.copy(
            sessionVerbs = sessionVerbs,
            correctCount = s.correctCount + if (isCorrect) 1 else 0,
            incorrectCount = s.incorrectCount + if (isCorrect) 0 else 1,
            wrongVerbs = if (!isCorrect) s.wrongVerbs + verb else s.wrongVerbs,
        )

        viewModelScope.launch {
            wordRepo.submitReview(
                uid, verb.word, quality, responseTimeSec,
                retrievalType = "active_recall", packName = "Irregular Verbs", allWords = wordCorpus,
            )
        }

        _speakEvents.tryEmit(Triple(verb.v1, verb.v2, verb.v3))
    }

    fun nextQuestion() {
        val s = _state.value
        if (s.currentIndex + 1 >= s.sessionVerbs.size) {
            viewModelScope.launch { streakRepo.incrementActivity(uid, s.sessionVerbs.size) }
            _feedbackEvents.tryEmit(FeedbackSound.VICTORY)
            _state.value = s.copy(finished = true)
        } else {
            _state.value = s.copy(currentIndex = s.currentIndex + 1)
            setupQuestion()
        }
    }
}
