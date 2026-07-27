package abs.uits.vocabry.ui.library

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import abs.uits.vocabry.data.model.Word
import abs.uits.vocabry.data.repo.WordRepository
import com.google.firebase.auth.FirebaseAuth
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

class PackDetailViewModel(
    private val packId: String,
    private val uid: String = FirebaseAuth.getInstance().currentUser?.uid.orEmpty(),
    private val repo: WordRepository = WordRepository(),
) : ViewModel() {

    val words: StateFlow<List<Word>> = repo.observeWordsForPack(uid, packId)
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    fun addWord(word: String, translation: String, definition: String, example: String) {
        if (word.isBlank() || translation.isBlank()) return
        viewModelScope.launch {
            repo.addWord(uid, packId, word.trim(), translation.trim(), definition.trim(), example.trim())
        }
    }

    fun deleteWord(wordId: String) {
        viewModelScope.launch {
            repo.deleteWord(uid, packId, wordId)
        }
    }
}
