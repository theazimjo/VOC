package abs.uits.vocabry.ui.library

import abs.uits.vocabry.data.model.Word
import abs.uits.vocabry.ui.library.components.AddWordDialog
import android.speech.tts.TextToSpeech
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
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
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

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PackDetailScreen(
    navController: NavController,
    packId: String,
    viewModel: PackDetailViewModel,
) {
    val words by viewModel.words.collectAsState()
    val pack by viewModel.pack.collectAsState()

    var showWordForm by remember { mutableStateOf(false) }
    var editingWord by remember { mutableStateOf<Word?>(null) }
    var wordToDeleteId by remember { mutableStateOf<String?>(null) }

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

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    TextButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Orqaga", modifier = Modifier.size(18.dp))
                        Spacer(Modifier.width(4.dp))
                        Text("← Kutubxona", fontWeight = FontWeight.Bold)
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.background)
            )
        },
        floatingActionButton = {
            if (!isReadOnly) {
                FloatingActionButton(
                    onClick = {
                        editingWord = null
                        showWordForm = true
                    },
                    containerColor = accentColor,
                    contentColor = Color.White,
                    shape = CircleShape
                ) {
                    Icon(Icons.Filled.Add, contentDescription = "So'z qo'shish")
                }
            }
        },
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            // Pack Header Banner (Web parity)
            Surface(
                color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.35f),
                modifier = Modifier
                    .fillMaxWidth()
                    .border(
                        width = 0.dp,
                        color = Color.Transparent
                    )
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

                    Spacer(Modifier.height(14.dp))

                    // Action buttons (Cards Mode & Mashq qilish)
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(10.dp),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        OutlinedButton(
                            onClick = { navController.navigate("practice_pack/$packId") },
                            modifier = Modifier.weight(1f),
                            shape = RoundedCornerShape(10.dp)
                        ) {
                            Text("🃏 Cards Mode", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                        }

                        Button(
                            onClick = { navController.navigate("practice_pack/$packId") },
                            modifier = Modifier.weight(1f),
                            colors = ButtonDefaults.buttonColors(containerColor = accentColor, contentColor = Color.White),
                            shape = RoundedCornerShape(10.dp)
                        ) {
                            Text("🎮 Mashq qilish", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                        }
                    }
                }
            }

            Spacer(Modifier.height(12.dp))

            // Words List
            if (words.isEmpty()) {
                Box(
                    contentAlignment = Alignment.Center,
                    modifier = Modifier
                        .fillMaxSize()
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
            } else {
                LazyColumn(
                    verticalArrangement = Arrangement.spacedBy(10.dp),
                    contentPadding = PaddingValues(start = 16.dp, end = 16.dp, bottom = 80.dp),
                    modifier = Modifier.fillMaxSize()
                ) {
                    items(words, key = { it.id }) { word ->
                        WordCardItem(
                            word = word,
                            readOnly = isReadOnly,
                            onSpeak = { text ->
                                tts?.speak(text, TextToSpeech.QUEUE_FLUSH, null, null)
                            },
                            onEdit = {
                                editingWord = word
                                showWordForm = true
                            },
                            onDelete = {
                                wordToDeleteId = word.id
                            }
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
            onConfirm = { w, tr, def, ex, pos ->
                if (editingWord != null) {
                    viewModel.updateWord(editingWord!!.id, w, tr, def, ex, pos)
                } else {
                    viewModel.addWord(w, tr, def, ex, pos)
                }
                showWordForm = false
                editingWord = null
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
        "phrase" -> "Ibora"
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

                // Optional definition or example
                if (word.definition.isNotBlank() || word.example.isNotBlank()) {
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
