package abs.uits.vocabry.ui.library

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import abs.uits.vocabry.data.model.Pack
import abs.uits.vocabry.data.repo.PackRepository
import com.google.firebase.auth.FirebaseAuth
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

private val PACK_ICONS = listOf("📦", "📘", "🎯", "🚀", "🌟", "🍎", "💼", "🎨")

class LibraryViewModel(
    private val uid: String = FirebaseAuth.getInstance().currentUser?.uid.orEmpty(),
    private val repo: PackRepository = PackRepository(),
) : ViewModel() {

    val packs: StateFlow<List<Pack>> = repo.observePacks(uid)
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())

    fun addPack(name: String, description: String, onDone: (String) -> Unit) {
        if (name.isBlank()) return
        viewModelScope.launch {
            val icon = PACK_ICONS.random()
            val id = repo.addPack(uid, name.trim(), description.trim(), "#7C3AED", icon, "beginner")
            onDone(id)
        }
    }
}
