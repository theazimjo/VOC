package abs.uits.vocabry.ui.library

import abs.uits.vocabry.data.model.Pack
import abs.uits.vocabry.data.model.Word
import abs.uits.vocabry.data.repo.PackRepository
import abs.uits.vocabry.data.repo.WordRepository
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.firebase.auth.FirebaseAuth
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

class PackDetailViewModel(
    private val packId: String,
    private val uid: String = FirebaseAuth.getInstance().currentUser?.uid.orEmpty(),
    private val wordRepo: WordRepository = WordRepository(),
    private val packRepo: PackRepository = PackRepository(),
) : ViewModel() {

    val words: StateFlow<List<Word>> = wordRepo.observeWordsForPack(uid, packId)
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    val pack: StateFlow<Pack?> = packRepo.observePacks(uid)
        .map { packs -> packs.find { it.id == packId } }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), null)

    fun addWord(
        word: String,
        translation: String,
        definition: String = "",
        example: String = "",
        partOfSpeech: String = "noun"
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
                partOfSpeech = partOfSpeech
            )
        }
    }

    fun updateWord(
        wordId: String,
        word: String,
        translation: String,
        definition: String = "",
        example: String = "",
        partOfSpeech: String = "noun"
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
                partOfSpeech = partOfSpeech
            )
        }
    }

    fun deleteWord(wordId: String) {
        if (wordId.isBlank()) return
        viewModelScope.launch {
            wordRepo.deleteWord(uid, packId, wordId)
        }
    }
}
