package abs.uits.vocabry.ui.library

import abs.uits.vocabry.data.market.MarketData
import abs.uits.vocabry.data.model.Folder
import abs.uits.vocabry.data.model.MarketPack
import abs.uits.vocabry.data.model.MarketWord
import abs.uits.vocabry.data.model.Pack
import abs.uits.vocabry.data.model.Word
import abs.uits.vocabry.data.repo.FolderRepository
import abs.uits.vocabry.data.repo.PackRepository
import abs.uits.vocabry.data.repo.WordRepository
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.google.firebase.auth.FirebaseAuth
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

enum class LibraryTab {
    MY_PACKS, MARKET
}

class LibraryViewModel(
    private val uid: String = FirebaseAuth.getInstance().currentUser?.uid.orEmpty(),
    private val packRepo: PackRepository = PackRepository(),
    private val folderRepo: FolderRepository = FolderRepository(),
    private val wordRepo: WordRepository = WordRepository(),
) : ViewModel() {

    // Eagerly (not WhileSubscribed): this ViewModel is created once at the
    // NavGraph root and lives for the whole logged-in session, so these are
    // the app's single shared, always-on cache of packs/folders/words —
    // started the moment the user lands in the app, kept live via Firebase's
    // realtime listener for the rest of the session, and reused by
    // PackDetailViewModel so opening a pack never waits on a fresh fetch.
    // (WhileSubscribed would only start the underlying listener once some
    // Composable actually collects the flow via collectAsState — callers
    // that only read `.value`, like getPackMastery below, never trigger
    // that, so the listener would silently never run.)
    val packs: StateFlow<List<Pack>> = packRepo.observePacks(uid)
        .stateIn(viewModelScope, SharingStarted.Eagerly, emptyList())

    val folders: StateFlow<List<Folder>> = folderRepo.observeFolders(uid)
        .stateIn(viewModelScope, SharingStarted.Eagerly, emptyList())

    val allWords: StateFlow<List<Word>> = wordRepo.observeAllWords(uid)
        .stateIn(viewModelScope, SharingStarted.Eagerly, emptyList())

    val marketPacks: List<MarketPack> = MarketData.marketPacks

    private val _activeTab = MutableStateFlow(LibraryTab.MY_PACKS)
    val activeTab: StateFlow<LibraryTab> = _activeTab.asStateFlow()

    private val _openFolderId = MutableStateFlow<String?>(null)
    val openFolderId: StateFlow<String?> = _openFolderId.asStateFlow()

    private val _installingPackId = MutableStateFlow<String?>(null)
    val installingPackId: StateFlow<String?> = _installingPackId.asStateFlow()

    private val _updatingPackId = MutableStateFlow<String?>(null)
    val updatingPackId: StateFlow<String?> = _updatingPackId.asStateFlow()

    private val _justInstalledIds = MutableStateFlow<Set<String>>(emptySet())
    val justInstalledIds: StateFlow<Set<String>> = _justInstalledIds.asStateFlow()

    private val _error = MutableStateFlow<String?>(null)
    val error: StateFlow<String?> = _error.asStateFlow()

    fun clearError() {
        _error.value = null
    }

    fun setActiveTab(tab: LibraryTab) {
        _activeTab.value = tab
    }

    fun openFolder(folderId: String?) {
        _openFolderId.value = folderId
    }

    fun closeFolder() {
        _openFolderId.value = null
    }

    fun addPack(
        name: String,
        description: String,
        color: String,
        icon: String,
        level: String,
        folderId: String?,
        language: String = "en-US",
        onDone: () -> Unit = {}
    ) {
        if (name.isBlank()) return
        viewModelScope.launch {
            try {
                packRepo.addPack(
                    uid = uid,
                    name = name.trim(),
                    description = description.trim(),
                    color = color,
                    icon = icon,
                    level = level,
                    folderId = folderId ?: _openFolderId.value,
                    language = language,
                )
            } catch (e: Exception) {
                // Firebase only ever reports a generic permission-denied here, whether
                // it's the abuse-throttle (too many packs too fast) or another rule —
                // either way this is the honest, safe message to show (see LibraryPage.jsx).
                _error.value = "To'plamni saqlab bo'lmadi. Juda tez-tez urinayotgan bo'lsangiz, biroz kutib qaytadan urinib ko'ring."
                return@launch
            }
            onDone()
        }
    }

    fun updatePack(
        packId: String,
        name: String,
        description: String,
        color: String,
        icon: String,
        level: String,
        folderId: String?,
        language: String = "en-US",
        onDone: () -> Unit = {}
    ) {
        if (packId.isBlank() || name.isBlank()) return
        viewModelScope.launch {
            try {
                packRepo.updatePack(
                    uid = uid,
                    packId = packId,
                    name = name.trim(),
                    description = description.trim(),
                    color = color,
                    icon = icon,
                    level = level,
                    folderId = folderId,
                    language = language,
                )
            } catch (e: Exception) {
                _error.value = "To'plamni saqlab bo'lmadi. Juda tez-tez urinayotgan bo'lsangiz, biroz kutib qaytadan urinib ko'ring."
                return@launch
            }
            onDone()
        }
    }

    fun deletePack(packId: String, onDone: () -> Unit = {}) {
        if (packId.isBlank()) return
        viewModelScope.launch {
            packRepo.deletePack(uid, packId)
            onDone()
        }
    }

    fun addFolder(name: String, icon: String, onDone: () -> Unit = {}) {
        if (name.isBlank()) return
        viewModelScope.launch {
            try {
                folderRepo.addFolder(uid, name.trim(), icon)
            } catch (e: Exception) {
                _error.value = "Papkani saqlab bo'lmadi. Juda tez-tez urinayotgan bo'lsangiz, biroz kutib qaytadan urinib ko'ring."
                return@launch
            }
            onDone()
        }
    }

    fun updateFolder(folderId: String, name: String, icon: String, onDone: () -> Unit = {}) {
        if (folderId.isBlank() || name.isBlank()) return
        viewModelScope.launch {
            try {
                folderRepo.updateFolder(uid, folderId, name.trim(), icon)
            } catch (e: Exception) {
                _error.value = "Papkani saqlab bo'lmadi. Juda tez-tez urinayotgan bo'lsangiz, biroz kutib qaytadan urinib ko'ring."
                return@launch
            }
            onDone()
        }
    }

    fun deleteFolder(folderId: String, onDone: () -> Unit = {}) {
        if (folderId.isBlank()) return
        viewModelScope.launch {
            val packsToUngroup = packs.value.filter { it.folderId == folderId }.map { it.id }
            folderRepo.deleteFolder(uid, folderId, packsToUngroup)
            if (_openFolderId.value == folderId) {
                _openFolderId.value = null
            }
            onDone()
        }
    }

    fun findInstalledPack(marketPack: MarketPack): Pack? {
        return packs.value.find { it.marketPackId == marketPack.id }
            ?: packs.value.find { it.name.equals(marketPack.name, ignoreCase = true) }
    }

    fun getPackMastery(packId: String): Int? {
        val packWords = allWords.value.filter { it.packId == packId }
        if (packWords.isEmpty()) return null
        val totalMastery = packWords.sumOf { it.mastery }
        return (totalMastery.toDouble() / packWords.size).toInt().coerceIn(0, 100)
    }

    /** Latest `lastReviewed` (falling back to `addedAt`) among a pack's words, for "last studied" display. */
    fun getPackLastActivity(packId: String): String? {
        val packWords = allWords.value.filter { it.packId == packId }
        if (packWords.isEmpty()) return null
        return packWords.mapNotNull { it.lastReviewed ?: it.addedAt.ifBlank { null } }.maxOrNull()
    }

    /** Packs ordered by most recent study activity first, matching the "Oxirgi yodlanayotgan" label. */
    fun sortByRecentActivity(packsToSort: List<Pack>): List<Pack> {
        return packsToSort.sortedByDescending { getPackLastActivity(it.id) ?: it.createdAt }
    }

    fun getMissingMarketWords(marketPack: MarketPack, installedPack: Pack?): List<MarketWord> {
        if (installedPack == null) return marketPack.words
        val existingWords = allWords.value.filter { it.packId == installedPack.id }
        val existingWordSet = existingWords.map { it.word.trim().lowercase() }.toSet()
        return marketPack.words.filter { !existingWordSet.contains(it.word.trim().lowercase()) }
    }

    fun installMarketPack(marketPack: MarketPack) {
        if (uid.isBlank()) return
        _installingPackId.value = marketPack.id
        viewModelScope.launch {
            try {
                packRepo.installMarketPack(uid, marketPack)
                _justInstalledIds.value = _justInstalledIds.value + marketPack.id
            } catch (e: Exception) {
                e.printStackTrace()
            } finally {
                _installingPackId.value = null
            }
        }
    }

    fun updateMarketPack(marketPack: MarketPack, installedPack: Pack, missingWords: List<MarketWord>) {
        if (uid.isBlank() || missingWords.isEmpty()) return
        _updatingPackId.value = marketPack.id
        viewModelScope.launch {
            try {
                packRepo.updateMarketPack(uid, installedPack.id, installedPack.wordCount, missingWords)
            } catch (e: Exception) {
                e.printStackTrace()
            } finally {
                _updatingPackId.value = null
            }
        }
    }
}
