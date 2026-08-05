package abs.uits.vocabry.ui.library

import abs.uits.vocabry.data.market.IrregularVerbGroups
import abs.uits.vocabry.data.market.MarketData
import abs.uits.vocabry.data.model.MarketWord
import abs.uits.vocabry.data.model.Pack
import abs.uits.vocabry.data.model.Word
import abs.uits.vocabry.data.repo.WordRepository
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.firebase.auth.FirebaseAuth
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.filterNotNull
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

enum class WordSort { GROUP, DATE_DESC, DATE_ASC, ALPHA_ASC, MASTERY_DESC, MASTERY_ASC }

/**
 * `sharedPacks`/`sharedAllWords` are [LibraryViewModel]'s app-wide, eagerly-loaded
 * caches (hoisted once at the NavGraph root, loading from the moment the user
 * enters the app). Deriving from them — instead of this screen opening its own
 * fresh Firebase listener per pack, like it used to — means the data is already
 * resident by the time the user taps into a pack, so it renders instantly with
 * no per-open network wait.
 */
class PackDetailViewModel(
    private val packId: String,
    sharedPacks: StateFlow<List<Pack>>,
    sharedAllWords: StateFlow<List<Word>>,
    private val uid: String = FirebaseAuth.getInstance().currentUser?.uid.orEmpty(),
    private val wordRepo: WordRepository = WordRepository(),
) : ViewModel() {

    val words: StateFlow<List<Word>> = sharedAllWords
        .map { list -> list.filter { it.packId == packId } }
        .stateIn(viewModelScope, SharingStarted.Eagerly, sharedAllWords.value.filter { it.packId == packId })

    val pack: StateFlow<Pack?> = sharedPacks
        .map { list -> list.find { it.id == packId } }
        .stateIn(viewModelScope, SharingStarted.Eagerly, sharedPacks.value.find { it.id == packId })

    val isIrregularVerbs: StateFlow<Boolean> = pack
        .map { it?.name == "Irregular Verbs" }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), false)

    private val _searchQuery = MutableStateFlow("")
    val searchQuery: StateFlow<String> = _searchQuery.asStateFlow()

    private val _sortBy = MutableStateFlow(WordSort.DATE_DESC)
    val sortBy: StateFlow<WordSort> = _sortBy.asStateFlow()

    /** Mirrors WordList.jsx's filteredWords/sortedWords derivation. */
    val displayedWords: StateFlow<List<Word>> = combine(words, _searchQuery, _sortBy, isIrregularVerbs) { list, query, sort, irregular ->
        val filtered = if (query.isBlank()) {
            list
        } else {
            list.filter { it.word.contains(query, ignoreCase = true) || it.translation.contains(query, ignoreCase = true) }
        }
        when (if (sort == WordSort.GROUP && !irregular) WordSort.DATE_DESC else sort) {
            WordSort.GROUP -> filtered.sortedWith(
                compareBy({ IrregularVerbGroups.getGroup(it.word).id }, { it.word.lowercase() })
            )
            WordSort.DATE_DESC -> filtered.sortedByDescending { it.addedAt }
            WordSort.DATE_ASC -> filtered.sortedBy { it.addedAt }
            WordSort.ALPHA_ASC -> filtered.sortedBy { it.word.lowercase() }
            WordSort.MASTERY_DESC -> filtered.sortedByDescending { it.mastery }
            WordSort.MASTERY_ASC -> filtered.sortedBy { it.mastery }
        }
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    private val _newWordsAddedCount = MutableStateFlow<Int?>(null)
    val newWordsAddedCount: StateFlow<Int?> = _newWordsAddedCount.asStateFlow()

    fun clearNewWordsAddedCount() {
        _newWordsAddedCount.value = null
    }

    init {
        // On first open after the Market source pack gained new words, silently
        // add the missing ones to this installed copy (mirrors PackDetail.jsx's
        // market-sync effect). Reads straight off the shared `pack`/`words`
        // above — no separate fetch needed, since that data is already
        // (or very shortly will be) resident from the app-wide eager load.
        viewModelScope.launch {
            val currentPack = pack.filterNotNull().first()
            val sourcePack = MarketData.marketPacks.find { it.id == currentPack.marketPackId }
                ?: MarketData.marketPacks.find { it.name == currentPack.name }
                ?: return@launch

            val currentWords = words.value
            val existing = currentWords.map { it.word.trim().lowercase() }.toSet()
            val missing = sourcePack.words.filter { !existing.contains(it.word.trim().lowercase()) }
            if (missing.isEmpty()) return@launch

            wordRepo.bulkAddWords(uid, packId, missing)
            _newWordsAddedCount.value = missing.size
        }
    }

    fun setSearchQuery(query: String) {
        _searchQuery.value = query
    }

    fun setSortBy(sort: WordSort) {
        _sortBy.value = sort
    }

    /** Mirrors PackDetail.jsx's case-insensitive duplicate check before adding a word. */
    fun isDuplicateWord(word: String): Boolean {
        val trimmed = word.trim().lowercase()
        if (trimmed.isEmpty()) return false
        return words.value.any { it.word.trim().lowercase() == trimmed }
    }

    fun addWord(
        word: String,
        translation: String,
        definition: String = "",
        example: String = "",
        partOfSpeech: String = "noun",
        notes: String = "",
        customSentence: String = "",
    ) {
        if (word.isBlank() || translation.isBlank()) return
        viewModelScope.launch {
            wordRepo.addWord(
                uid = uid,
                packId = packId,
                word = word.trim(),
                translation = translation.trim(),
                definition = definition.trim(),
                example = example.trim(),
                partOfSpeech = partOfSpeech,
                notes = notes.trim(),
                customSentence = customSentence.trim(),
            )
        }
    }

    fun updateWord(
        wordId: String,
        word: String,
        translation: String,
        definition: String = "",
        example: String = "",
        partOfSpeech: String = "noun",
        notes: String = "",
        customSentence: String = "",
    ) {
        if (wordId.isBlank() || word.isBlank() || translation.isBlank()) return
        viewModelScope.launch {
            wordRepo.updateWord(
                uid = uid,
                packId = packId,
                wordId = wordId,
                word = word.trim(),
                translation = translation.trim(),
                definition = definition.trim(),
                example = example.trim(),
                partOfSpeech = partOfSpeech,
                notes = notes.trim(),
                customSentence = customSentence.trim(),
            )
        }
    }

    fun deleteWord(wordId: String) {
        if (wordId.isBlank()) return
        viewModelScope.launch {
            wordRepo.deleteWord(uid, packId, wordId)
        }
    }

    suspend fun bulkAddWords(words: List<MarketWord>, onProgress: (added: Int, total: Int) -> Unit) {
        wordRepo.bulkAddWords(uid, packId, words, onProgress)
    }
}
