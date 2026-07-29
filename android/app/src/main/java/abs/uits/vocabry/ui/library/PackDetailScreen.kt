package abs.uits.vocabry.ui.library

import abs.uits.vocabry.data.market.IrregularVerbGroups
import abs.uits.vocabry.data.model.MarketWord
import abs.uits.vocabry.data.model.Word
import abs.uits.vocabry.ui.library.components.AddWordDialog
import abs.uits.vocabry.ui.library.components.BulkImportDialog
import abs.uits.vocabry.ui.library.components.PhotoWordExtractorDialog
import abs.uits.vocabry.ui.library.components.WordFormData
import androidx.compose.runtime.rememberCoroutineScope
import kotlinx.coroutines.launch
import android.speech.tts.TextToSpeech
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExtendedFloatingActionButton
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Snackbar
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import java.util.Locale

@OptIn(ExperimentalMaterial3Api::class, ExperimentalFoundationApi::class)
@Composable
fun PackDetailScreen(
    navController: NavController,
    packId: String,
    viewModel: PackDetailViewModel,
) {
    val words by viewModel.words.collectAsState()
    val displayedWords by viewModel.displayedWords.collectAsState()
    val pack by viewModel.pack.collectAsState()
    val searchQuery by viewModel.searchQuery.collectAsState()
    val sortBy by viewModel.sortBy.collectAsState()
    val isIrregularVerbs by viewModel.isIrregularVerbs.collectAsState()
    val newWordsAddedCount by viewModel.newWordsAddedCount.collectAsState()

    val scope = rememberCoroutineScope()

    var showWordForm by remember { mutableStateOf(false) }
    var showBulkImportForm by remember { mutableStateOf(false) }
    var showPhotoExtractorForm by remember { mutableStateOf(false) }
    var editingWord by remember { mutableStateOf<Word?>(null) }
    var wordToDeleteId by remember { mutableStateOf<String?>(null) }
    var pendingNewWord by remember { mutableStateOf<WordFormData?>(null) }
    var speedDialOpen by remember { mutableStateOf(false) }

    // Web defaults the sort control to grouped-by-verb-pattern for the
    // Irregular Verbs pack specifically (WordList.jsx: groupFn ? 'group' : 'date-desc').
    LaunchedEffect(isIrregularVerbs) {
        if (isIrregularVerbs) viewModel.setSortBy(WordSort.GROUP)
    }

    val snackbarHostState = remember { SnackbarHostState() }
    LaunchedEffect(newWordsAddedCount) {
        val count = newWordsAddedCount
        if (count != null) {
            snackbarHostState.showSnackbar("✨ $count ta yangi so'z qo'shildi!")
            viewModel.clearNewWordsAddedCount()
        }
    }

    // TTS Setup
    val context = LocalContext.current
    var tts by remember { mutableStateOf<TextToSpeech?>(null) }

    DisposableEffect(context) {
        var ttsInstance: TextToSpeech? = null
        ttsInstance = TextToSpeech(context) { status ->
            if (status == TextToSpeech.SUCCESS) {
                ttsInstance?.language = Locale.US
            }
        }
        tts = ttsInstance
        onDispose {
            ttsInstance.stop()
            ttsInstance.shutdown()
        }
    }

    val accentColor = try {
        Color(android.graphics.Color.parseColor(pack?.color ?: "#7C3AED"))
    } catch (e: Exception) {
        MaterialTheme.colorScheme.primary
    }

    val isReadOnly = pack?.name == "Irregular Verbs"

    fun submitNewWord(data: WordFormData) {
        viewModel.addWord(data.word, data.translation, data.definition, data.example, data.partOfSpeech, data.notes, data.customSentence)
        showWordForm = false
    }

    Scaffold(
        snackbarHost = { SnackbarHost(snackbarHostState) },
        topBar = {
            TopAppBar(
                title = {
                    TextButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Orqaga", modifier = Modifier.size(18.dp))
                        Spacer(Modifier.width(4.dp))
                        Text("Kutubxona", fontWeight = FontWeight.Bold)
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.background)
            )
        },
        floatingActionButton = {
            if (!isReadOnly) {
                SpeedDialFab(
                    open = speedDialOpen,
                    onToggle = { speedDialOpen = !speedDialOpen },
                    accentColor = accentColor,
                    onAddWord = {
                        editingWord = null
                        showWordForm = true
                        speedDialOpen = false
                    },
                    onImportJson = {
                        showBulkImportForm = true
                        speedDialOpen = false
                    },
                    onExtractPhoto = {
                        showPhotoExtractorForm = true
                        speedDialOpen = false
                    }
                )
            }
        },
    ) { padding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding),
            contentPadding = PaddingValues(bottom = 100.dp)
        ) {
            // Pack Header Banner (Web parity - Header Info)
            item {
                Surface(
                    color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.35f),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Box(
                                contentAlignment = Alignment.Center,
                                modifier = Modifier
                                    .size(52.dp)
                                    .clip(RoundedCornerShape(12.dp))
                                    .background(accentColor.copy(alpha = 0.15f))
                                    .border(1.dp, accentColor.copy(alpha = 0.3f), RoundedCornerShape(12.dp))
                            ) {
                                Text(pack?.icon?.ifEmpty { "📦" } ?: "📦", fontSize = 26.sp)
                            }

                            Spacer(Modifier.width(14.dp))

                            Column(modifier = Modifier.weight(1f)) {
                                Text(
                                    pack?.name.orEmpty().ifEmpty { "To'plam" },
                                    fontWeight = FontWeight.ExtraBold,
                                    style = MaterialTheme.typography.titleLarge
                                )
                                if (!pack?.description.isNullOrBlank()) {
                                    Text(
                                        pack?.description.orEmpty(),
                                        style = MaterialTheme.typography.bodySmall,
                                        color = MaterialTheme.colorScheme.onSurfaceVariant
                                    )
                                }
                                Spacer(Modifier.height(4.dp))
                                Surface(
                                    shape = RoundedCornerShape(6.dp),
                                    color = accentColor.copy(alpha = 0.15f)
                                ) {
                                    Text(
                                        "📝 ${words.size} ta so'z",
                                        fontSize = 11.sp,
                                        fontWeight = FontWeight.Bold,
                                        color = accentColor,
                                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp)
                                    )
                                }
                            }
                        }
                    }
                }
            }

            // STICKY HEADER: Action buttons (Mashq qilish) - stays pinned at top when scrolling!
            stickyHeader {
                Surface(
                    color = MaterialTheme.colorScheme.background,
                    shadowElevation = 4.dp,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Box(modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)) {
                        if (isReadOnly) {
                            Row(
                                horizontalArrangement = Arrangement.spacedBy(10.dp),
                                modifier = Modifier.fillMaxWidth()
                            ) {
                                OutlinedButton(
                                    onClick = { navController.navigate("irregular_verbs/$packId/study") },
                                    modifier = Modifier.weight(1f),
                                    shape = RoundedCornerShape(10.dp)
                                ) {
                                    Text("🃏 Flashkart", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                                }

                                Button(
                                    onClick = { navController.navigate("irregular_verbs/$packId/practice") },
                                    modifier = Modifier.weight(1f),
                                    colors = ButtonDefaults.buttonColors(containerColor = accentColor, contentColor = Color.White),
                                    shape = RoundedCornerShape(10.dp)
                                ) {
                                    Text("⚡ Mashq qilish", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                                }
                            }
                        } else {
                            Button(
                                onClick = { navController.navigate("practice_pack/$packId") },
                                modifier = Modifier.fillMaxWidth(),
                                colors = ButtonDefaults.buttonColors(containerColor = accentColor, contentColor = Color.White),
                                shape = RoundedCornerShape(10.dp)
                            ) {
                                Text("🎮 Mashq qilish", fontSize = 14.sp, fontWeight = FontWeight.Bold)
                            }
                        }
                    }
                }
            }

            // Search + sort controls (WordList.jsx parity)
            if (words.isNotEmpty()) {
                item {
                    Column(modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp)) {
                        OutlinedTextField(
                            value = searchQuery,
                            onValueChange = { viewModel.setSearchQuery(it) },
                            placeholder = { Text("So'z yoki tarjima bo'yicha qidirish...") },
                            leadingIcon = { Icon(Icons.Filled.Search, contentDescription = null) },
                            singleLine = true,
                            modifier = Modifier.fillMaxWidth()
                        )
                        Spacer(Modifier.height(8.dp))
                        WordSortDropdown(
                            sortBy = sortBy,
                            showGroupOption = isIrregularVerbs,
                            onSelect = { viewModel.setSortBy(it) }
                        )
                        Spacer(Modifier.height(4.dp))
                    }
                }
            }

            // Empty states or Word Cards List
            if (words.isEmpty()) {
                item {
                    Box(
                        contentAlignment = Alignment.Center,
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(32.dp)
                    ) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text("📝", fontSize = 48.sp)
                            Spacer(Modifier.height(8.dp))
                            Text(
                                "Bu to'plamda hali so'zlar yo'q",
                                fontWeight = FontWeight.Bold,
                                style = MaterialTheme.typography.titleMedium
                            )
                            Text(
                                "Pastdagi + tugmasini bosib yangi so'z qo'shing.",
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                    }
                }
            } else if (displayedWords.isEmpty()) {
                item {
                    Box(
                        contentAlignment = Alignment.Center,
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(32.dp)
                    ) {
                        Text(
                            "Qidiruv bo'yicha so'z topilmadi.",
                            style = MaterialTheme.typography.bodyMedium,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                }
            } else {
                var lastGroupId: Int? = null
                items(displayedWords, key = { it.id }) { word ->
                    Box(modifier = Modifier.padding(horizontal = 16.dp, vertical = 5.dp)) {
                        if (sortBy == WordSort.GROUP && isIrregularVerbs) {
                            val group = IrregularVerbGroups.getGroup(word.word)
                            if (group.id != lastGroupId) {
                                lastGroupId = group.id
                                Column {
                                    WordGroupHeader(title = group.title, pattern = group.pattern)
                                    Spacer(Modifier.height(6.dp))
                                    WordCardItem(
                                        word = word,
                                        readOnly = isReadOnly,
                                        onSpeak = { text -> tts?.speak(text, TextToSpeech.QUEUE_FLUSH, null, null) },
                                        onEdit = { editingWord = word; showWordForm = true },
                                        onDelete = { wordToDeleteId = word.id }
                                    )
                                }
                                return@items
                            }
                        }
                        WordCardItem(
                            word = word,
                            readOnly = isReadOnly,
                            onSpeak = { text -> tts?.speak(text, TextToSpeech.QUEUE_FLUSH, null, null) },
                            onEdit = { editingWord = word; showWordForm = true },
                            onDelete = { wordToDeleteId = word.id }
                        )
                    }
                }
            }
        }
    }

    // Dialogs
    if (showWordForm || editingWord != null) {
        AddWordDialog(
            editingWord = editingWord,
            onDismiss = {
                showWordForm = false
                editingWord = null
            },
            onConfirm = { data ->
                if (editingWord != null) {
                    viewModel.updateWord(editingWord!!.id, data.word, data.translation, data.definition, data.example, data.partOfSpeech, data.notes, data.customSentence)
                    showWordForm = false
                    editingWord = null
                } else if (viewModel.isDuplicateWord(data.word)) {
                    pendingNewWord = data
                } else {
                    submitNewWord(data)
                }
            }
        )
    }

    if (pendingNewWord != null) {
        AlertDialog(
            onDismissRequest = { pendingNewWord = null },
            title = { Text("So'z allaqachon mavjud") },
            text = { Text("\"${pendingNewWord?.word}\" so'zi ushbu to'plamda allaqachon mavjud. Baribir qo'shishni xohlaysizmi?") },
            confirmButton = {
                TextButton(onClick = {
                    val data = pendingNewWord!!
                    pendingNewWord = null
                    submitNewWord(data)
                }) { Text("Qo'shish") }
            },
            dismissButton = {
                TextButton(onClick = { pendingNewWord = null }) { Text("Bekor qilish") }
            }
        )
    }

    if (showBulkImportForm) {
        BulkImportDialog(
            existingWords = words,
            onDismiss = { showBulkImportForm = false },
            onImport = { newWords, onProgress ->
                scope.launch {
                    viewModel.bulkAddWords(newWords, onProgress)
                }
            }
        )
    }

    if (showPhotoExtractorForm) {
        PhotoWordExtractorDialog(
            isOpen = showPhotoExtractorForm,
            onDismiss = { showPhotoExtractorForm = false },
            existingWords = words.map { it.word },
            onImport = { newWords ->
                val convertedWords = newWords.map { data ->
                    MarketWord(
                        word = data.word,
                        translation = data.translation,
                        definition = data.definition,
                        example = data.example,
                        partOfSpeech = data.partOfSpeech
                    )
                }
                scope.launch {
                    viewModel.bulkAddWords(convertedWords) { _, _ -> }
                }
            }
        )
    }

    if (wordToDeleteId != null) {
        AlertDialog(
            onDismissRequest = { wordToDeleteId = null },
            title = { Text("So'zni o'chirish") },
            text = { Text("Rostdan ham ushbu so'zni o'chirmoqchimisiz?") },
            confirmButton = {
                TextButton(
                    onClick = {
                        wordToDeleteId?.let { viewModel.deleteWord(it) }
                        wordToDeleteId = null
                    }
                ) {
                    Text("O'chirish", color = MaterialTheme.colorScheme.error)
                }
            },
            dismissButton = {
                TextButton(onClick = { wordToDeleteId = null }) {
                    Text("Bekor qilish")
                }
            }
        )
    }
}

/** Three-action speed-dial FAB (Photo OCR + JSON Import + So'z qo'shish). */
@Composable
private fun SpeedDialFab(
    open: Boolean,
    onToggle: () -> Unit,
    accentColor: Color,
    onAddWord: () -> Unit,
    onImportJson: () -> Unit,
    onExtractPhoto: () -> Unit,
) {
    Column(horizontalAlignment = Alignment.End) {
        AnimatedVisibility(visible = open, enter = fadeIn(), exit = fadeOut()) {
            Column(horizontalAlignment = Alignment.End) {
                ExtendedFloatingActionButton(
                    onClick = onExtractPhoto,
                    containerColor = MaterialTheme.colorScheme.surfaceVariant,
                    contentColor = MaterialTheme.colorScheme.onSurfaceVariant,
                    icon = { Text("📸") },
                    text = { Text("Rasmdan so'z qo'shish") }
                )
                Spacer(Modifier.height(10.dp))
                ExtendedFloatingActionButton(
                    onClick = onImportJson,
                    containerColor = MaterialTheme.colorScheme.surfaceVariant,
                    contentColor = MaterialTheme.colorScheme.onSurfaceVariant,
                    icon = { Text("📥") },
                    text = { Text("JSON Import") }
                )
                Spacer(Modifier.height(10.dp))
                ExtendedFloatingActionButton(
                    onClick = onAddWord,
                    containerColor = MaterialTheme.colorScheme.surfaceVariant,
                    contentColor = MaterialTheme.colorScheme.onSurfaceVariant,
                    icon = { Text("📝") },
                    text = { Text("So'z qo'shish") }
                )
                Spacer(Modifier.height(10.dp))
            }
        }

        FloatingActionButton(
            onClick = onToggle,
            containerColor = accentColor,
            contentColor = Color.White,
            shape = CircleShape
        ) {
            Icon(
                if (open) Icons.Filled.Close else Icons.Filled.Add,
                contentDescription = if (open) "Yopish" else "Amallar"
            )
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun WordSortDropdown(
    sortBy: WordSort,
    showGroupOption: Boolean,
    onSelect: (WordSort) -> Unit,
) {
    var expanded by remember { mutableStateOf(false) }
    val options = buildList {
        if (showGroupOption) add(WordSort.GROUP to "Guruh bo'yicha")
        add(WordSort.DATE_DESC to "Eng yangilari oldin")
        add(WordSort.DATE_ASC to "Eng eskilar oldin")
        add(WordSort.ALPHA_ASC to "Alifbo bo'yicha (A-Z)")
        add(WordSort.MASTERY_DESC to "O'zlashtirish (Yuqori-past)")
        add(WordSort.MASTERY_ASC to "O'zlashtirish (Past-yuqori)")
    }
    val currentLabel = options.find { it.first == sortBy }?.second ?: options.first().second

    Box {
        OutlinedButton(onClick = { expanded = true }, modifier = Modifier.fillMaxWidth()) {
            Text(currentLabel, fontSize = 12.sp)
        }
        DropdownMenu(expanded = expanded, onDismissRequest = { expanded = false }) {
            options.forEach { (value, label) ->
                DropdownMenuItem(
                    text = { Text(label) },
                    onClick = {
                        onSelect(value)
                        expanded = false
                    }
                )
            }
        }
    }
}

@Composable
private fun WordGroupHeader(title: String, pattern: String) {
    Row(
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier
            .fillMaxWidth()
            .padding(top = 6.dp, bottom = 2.dp)
    ) {
        Text(title, fontWeight = FontWeight.ExtraBold, fontSize = 13.sp, color = MaterialTheme.colorScheme.primary)
        Text(pattern, fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant, maxLines = 1, overflow = TextOverflow.Ellipsis)
    }
}

@Composable
fun WordCardItem(
    word: Word,
    readOnly: Boolean,
    onSpeak: (String) -> Unit,
    onEdit: () -> Unit,
    onDelete: () -> Unit,
) {
    val posLabel = when (word.partOfSpeech.lowercase()) {
        "verb" -> "Fe'l"
        "adjective" -> "Sifat"
        "adverb" -> "Ravish"
        "preposition" -> "Preposition"
        "conjunction" -> "Conjunction"
        "pronoun" -> "Olmosh"
        "interjection" -> "Interjection"
        "phrase" -> "Ibora"
        "idiom" -> "Idiom"
        else -> "Ot"
    }

    val masteryColor = when {
        word.mastery >= 80 -> Color(0xFF10B981) // green
        word.mastery >= 40 -> Color(0xFFF59E0B) // yellow
        word.mastery > 0 -> Color(0xFFEF4444)  // red
        else -> Color.Gray
    }

    Card(
        shape = RoundedCornerShape(14.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.45f)),
        elevation = CardDefaults.cardElevation(defaultElevation = 0.dp),
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.Top,
            modifier = Modifier
                .fillMaxWidth()
                .padding(14.dp)
        ) {
            Column(modifier = Modifier.weight(1f)) {
                // English word row with speak & POS badge & mastery dot
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(
                        word.word,
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 17.sp,
                        color = MaterialTheme.colorScheme.onSurface
                    )

                    Spacer(Modifier.width(6.dp))

                    Box(
                        contentAlignment = Alignment.Center,
                        modifier = Modifier
                            .size(24.dp)
                            .clip(CircleShape)
                            .background(MaterialTheme.colorScheme.primary.copy(alpha = 0.12f))
                            .clickable { onSpeak(word.word) }
                    ) {
                        Text("🔊", fontSize = 12.sp)
                    }

                    Spacer(Modifier.width(6.dp))

                    Surface(
                        shape = RoundedCornerShape(4.dp),
                        color = MaterialTheme.colorScheme.secondaryContainer.copy(alpha = 0.7f)
                    ) {
                        Text(
                            posLabel,
                            fontSize = 9.sp,
                            fontWeight = FontWeight.Bold,
                            modifier = Modifier.padding(horizontal = 5.dp, vertical = 1.dp)
                        )
                    }

                    Spacer(Modifier.width(6.dp))

                    Box(
                        modifier = Modifier
                            .size(8.dp)
                            .clip(CircleShape)
                            .background(masteryColor)
                    )
                }

                Spacer(Modifier.height(3.dp))

                // Translation
                Text(
                    word.translation,
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Medium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )

                // Optional definition, example, custom sentence, notes
                if (word.definition.isNotBlank() || word.example.isNotBlank() || word.customSentence.isNotBlank() || word.notes.isNotBlank()) {
                    Spacer(Modifier.height(6.dp))
                    Column(verticalArrangement = Arrangement.spacedBy(3.dp)) {
                        if (word.definition.isNotBlank()) {
                            Text(
                                "Def: ${word.definition}",
                                fontSize = 11.sp,
                                color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.8f)
                            )
                        }
                        if (word.example.isNotBlank()) {
                            Row(modifier = Modifier.padding(start = 2.dp)) {
                                Box(
                                    modifier = Modifier
                                        .width(2.dp)
                                        .height(14.dp)
                                        .background(MaterialTheme.colorScheme.primary.copy(alpha = 0.5f))
                                )
                                Spacer(Modifier.width(6.dp))
                                Text(
                                    "\"${word.example}\"",
                                    fontSize = 11.sp,
                                    fontStyle = FontStyle.Italic,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.8f)
                                )
                            }
                        }
                        if (word.customSentence.isNotBlank()) {
                            Text(
                                "Mening gapim: ${word.customSentence}",
                                fontSize = 11.sp,
                                fontStyle = FontStyle.Italic,
                                color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.8f)
                            )
                        }
                        if (word.notes.isNotBlank()) {
                            Text(
                                "Izoh: ${word.notes}",
                                fontSize = 11.sp,
                                color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.8f)
                            )
                        }
                    }
                }
            }

            if (!readOnly) {
                Row {
                    IconButton(
                        onClick = onEdit,
                        modifier = Modifier.size(28.dp)
                    ) {
                        Icon(Icons.Filled.Edit, contentDescription = "Tahrirlash", modifier = Modifier.size(16.dp))
                    }
                    IconButton(
                        onClick = onDelete,
                        modifier = Modifier.size(28.dp)
                    ) {
                        Icon(Icons.Filled.Delete, contentDescription = "O'chirish", modifier = Modifier.size(16.dp), tint = MaterialTheme.colorScheme.error)
                    }
                }
            }
        }
    }
}
