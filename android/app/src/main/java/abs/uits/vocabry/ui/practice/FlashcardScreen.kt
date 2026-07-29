package abs.uits.vocabry.ui.practice

import abs.uits.vocabry.data.model.Word
import android.speech.tts.TextToSpeech
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
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
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Close
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
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
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import java.util.Locale

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun FlashcardScreen(
    navController: NavController,
    viewModel: PracticeViewModel,
) {
    val state by viewModel.state.collectAsState()

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
            ttsInstance?.stop()
            ttsInstance?.shutdown()
        }
    }

    val onSpeak: (String) -> Unit = { text ->
        tts?.speak(text, TextToSpeech.QUEUE_FLUSH, null, null)
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    if (state.selectedMode != PracticeMode.MODE_HUB && !state.finished && state.queue.isNotEmpty()) {
                        Text(
                            "${state.currentIndex + 1} / ${state.queue.size}",
                            fontWeight = FontWeight.Bold,
                            fontSize = 18.sp
                        )
                    } else {
                        Text("🎮 Mashq", fontWeight = FontWeight.Bold, fontSize = 20.sp)
                    }
                },
                navigationIcon = {
                    IconButton(
                        onClick = {
                            if (state.selectedMode != PracticeMode.MODE_HUB && !state.finished) {
                                viewModel.resetToHub()
                            } else {
                                navController.popBackStack()
                            }
                        }
                    ) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Orqaga")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.background)
            )
        },
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            when {
                state.loading -> {
                    Box(contentAlignment = Alignment.Center, modifier = Modifier.fillMaxSize()) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            CircularProgressIndicator()
                            Spacer(Modifier.height(12.dp))
                            Text("Yuklanmoqda...")
                        }
                    }
                }

                state.queue.isEmpty() && state.selectedMode != PracticeMode.MODE_HUB -> {
                    Box(contentAlignment = Alignment.Center, modifier = Modifier.fillMaxSize().padding(24.dp)) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text("📦", fontSize = 48.sp)
                            Spacer(Modifier.height(12.dp))
                            Text("Bu bo'limda mashq qilinadigan so'zlar yo'q.", fontWeight = FontWeight.Bold)
                            Spacer(Modifier.height(12.dp))
                            Button(onClick = { navController.popBackStack() }) {
                                Text("Orqaga qaytish")
                            }
                        }
                    }
                }

                state.finished -> {
                    ResultsView(
                        state = state,
                        onSpeak = onSpeak,
                        onReset = { viewModel.resetToHub() }
                    )
                }

                state.selectedMode == PracticeMode.MODE_HUB -> {
                    PracticeHubView(
                        state = state,
                        onSetWordCount = { viewModel.setWordCount(it) },
                        onSelectMode = { viewModel.selectMode(it) }
                    )
                }

                state.selectedMode == PracticeMode.FLASHCARD -> {
                    FlashcardView(
                        state = state,
                        onSpeak = onSpeak,
                        onFlip = { viewModel.flipCard() },
                        onRate = { viewModel.rateFlashcard(it) }
                    )
                }

                state.selectedMode == PracticeMode.QUIZ -> {
                    QuizView(
                        state = state,
                        onSpeak = onSpeak,
                        onSelectOption = { viewModel.submitQuizAnswer(it) },
                        onNext = { viewModel.nextQuestion() }
                    )
                }

                state.selectedMode == PracticeMode.SPELLING -> {
                    SpellingView(
                        state = state,
                        onSpeak = onSpeak,
                        onSubmit = { viewModel.submitSpellingAnswer(it) },
                        onNext = { viewModel.nextQuestion() }
                    )
                }
            }
        }
    }
}

@Composable
private fun PracticeHubView(
    state: PracticeUiState,
    onSetWordCount: (Int) -> Unit,
    onSelectMode: (PracticeMode) -> Unit,
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
            .verticalScroll(rememberScrollState())
    ) {
        // Word Count selector bar
        Surface(
            shape = RoundedCornerShape(12.dp),
            color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(12.dp)) {
                Text(
                    "🔢 So'zlar soni:",
                    style = MaterialTheme.typography.bodySmall,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                Spacer(Modifier.height(8.dp))
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    listOf(5 to "5 ta", 10 to "10 ta", 20 to "20 ta", 0 to "Barchasi").forEach { (count, label) ->
                        val isSelected = state.wordCountLimit == count
                        Surface(
                            onClick = { onSetWordCount(count) },
                            shape = RoundedCornerShape(8.dp),
                            color = if (isSelected) MaterialTheme.colorScheme.primary else Color.Transparent,
                            modifier = Modifier.weight(1f)
                        ) {
                            Text(
                                label,
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Bold,
                                textAlign = TextAlign.Center,
                                color = if (isSelected) Color.White else MaterialTheme.colorScheme.onSurfaceVariant,
                                modifier = Modifier.padding(vertical = 8.dp)
                            )
                        }
                    }
                }
            }
        }

        Spacer(Modifier.height(18.dp))

        Text(
            "🎮 Mashq rejimini tanlang",
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.ExtraBold
        )
        Text(
            "O'zingizga qulay usulda so'zlarni xotirangizga muhrlang",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        Spacer(Modifier.height(14.dp))

        // Mode Cards
        ModeCardItem(
            icon = "🧠",
            title = "Aqlli Kartochkalar",
            desc = "Kartochkalarni ag'darib, har bir so'z uchun unutish egri chizig'i asosida hisoblangan vaqtda takrorlang",
            badge = "Tavsiya etiladi 🌟",
            color = Color(0xFF2563EB),
            onClick = { onSelectMode(PracticeMode.FLASHCARD) }
        )

        Spacer(Modifier.height(12.dp))

        ModeCardItem(
            icon = "📝",
            title = "Test",
            desc = "To'rtta variantdan to'g'ri tarjimani tezkorlik bilan tanlang",
            badge = "Tezkor ⚡",
            color = Color(0xFFD97706),
            onClick = { onSelectMode(PracticeMode.QUIZ) }
        )

        Spacer(Modifier.height(12.dp))

        ModeCardItem(
            icon = "✍️",
            title = "Imlo Mashqi",
            desc = "Eshitish va xotiradan so'zlarni to'g'ri yozishni mashq qiling",
            badge = "Yozuv ✍️",
            color = Color(0xFF7C3AED),
            onClick = { onSelectMode(PracticeMode.SPELLING) }
        )
    }
}

@Composable
private fun ModeCardItem(
    icon: String,
    title: String,
    desc: String,
    badge: String,
    color: Color,
    onClick: () -> Unit,
) {
    Card(
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.45f)),
        elevation = CardDefaults.cardElevation(defaultElevation = 0.dp),
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() }
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Box(
                contentAlignment = Alignment.Center,
                modifier = Modifier
                    .size(50.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(color.copy(alpha = 0.15f))
            ) {
                Text(icon, fontSize = 24.sp)
            }

            Spacer(Modifier.width(14.dp))

            Column(modifier = Modifier.weight(1f)) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text(title, fontWeight = FontWeight.ExtraBold, fontSize = 16.sp)
                    Surface(
                        shape = RoundedCornerShape(6.dp),
                        color = color.copy(alpha = 0.15f)
                    ) {
                        Text(
                            badge,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold,
                            color = color,
                            modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                        )
                    }
                }
                Spacer(Modifier.height(4.dp))
                Text(
                    desc,
                    fontSize = 12.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    lineHeight = 16.sp
                )
            }
        }
    }
}

@Composable
private fun FlashcardView(
    state: PracticeUiState,
    onSpeak: (String) -> Unit,
    onFlip: () -> Unit,
    onRate: (String) -> Unit,
) {
    val word = state.currentWord ?: return

    val posAbbr = when (word.partOfSpeech.lowercase()) {
        "verb" -> "v."
        "adjective" -> "adj."
        "adverb" -> "adv."
        "preposition" -> "prep."
        "conjunction" -> "conj."
        "pronoun" -> "pron."
        "interjection" -> "int."
        "phrase" -> "phr."
        "idiom" -> "idiom"
        else -> "n."
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Progress bar
        LinearProgressIndicator(
            progress = { (state.currentIndex + 1).toFloat() / state.queue.size },
            modifier = Modifier
                .fillMaxWidth()
                .height(6.dp)
                .clip(RoundedCornerShape(3.dp)),
            strokeCap = StrokeCap.Round
        )

        Spacer(Modifier.height(24.dp))

        // Main Card
        Card(
            shape = RoundedCornerShape(20.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.6f)),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f)
                .clickable { onFlip() }
        ) {
            Box(
                contentAlignment = Alignment.Center,
                modifier = Modifier
                    .fillMaxSize()
                    .padding(24.dp)
            ) {
                // POS Badge on top right corner
                Surface(
                    shape = RoundedCornerShape(6.dp),
                    color = MaterialTheme.colorScheme.secondaryContainer.copy(alpha = 0.8f),
                    modifier = Modifier
                        .align(Alignment.TopEnd)
                ) {
                    Text(
                        posAbbr,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        modifier = Modifier.padding(horizontal = 7.dp, vertical = 2.dp)
                    )
                }

                if (!state.isFlipped) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            Text(
                                word.word,
                                fontSize = 32.sp,
                                fontWeight = FontWeight.ExtraBold,
                                color = MaterialTheme.colorScheme.onSurface
                            )
                            Spacer(Modifier.width(8.dp))
                            Box(
                                contentAlignment = Alignment.Center,
                                modifier = Modifier
                                    .size(36.dp)
                                    .clip(CircleShape)
                                    .background(MaterialTheme.colorScheme.primary.copy(alpha = 0.15f))
                                    .clickable { onSpeak(word.word) }
                            ) {
                                Text("🔊", fontSize = 18.sp)
                            }
                        }
                        Spacer(Modifier.height(18.dp))
                        Text(
                            "Javobni ko'rish uchun bosing 🔄",
                            fontSize = 13.sp,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
                } else {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text(
                            word.translation,
                            fontSize = 28.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = MaterialTheme.colorScheme.primary,
                            textAlign = TextAlign.Center
                        )

                        if (word.definition.isNotBlank()) {
                            Spacer(Modifier.height(14.dp))
                            Text(
                                "Def: ${word.definition}",
                                fontSize = 14.sp,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                                textAlign = TextAlign.Center
                            )
                        }

                        if (word.example.isNotBlank()) {
                            Spacer(Modifier.height(10.dp))
                            Text(
                                "\"${word.example}\"",
                                fontSize = 14.sp,
                                fontStyle = FontStyle.Italic,
                                color = MaterialTheme.colorScheme.onSurfaceVariant.copy(alpha = 0.8f),
                                textAlign = TextAlign.Center
                            )
                        }
                    }
                }
            }
        }

        Spacer(Modifier.height(20.dp))

        // Web parity Judgement buttons (visible only when flipped): ✗ Bilmadim & ✓ Bildim
        if (state.isFlipped) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Button(
                    onClick = { onRate("again") },
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFFEF4444)),
                    shape = RoundedCornerShape(12.dp),
                    modifier = Modifier
                        .weight(1f)
                        .height(48.dp)
                ) {
                    Text("✗ Bilmadim", fontSize = 15.sp, fontWeight = FontWeight.ExtraBold)
                }

                Button(
                    onClick = { onRate("good") },
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF10B981)),
                    shape = RoundedCornerShape(12.dp),
                    modifier = Modifier
                        .weight(1f)
                        .height(48.dp)
                ) {
                    Text("✓ Bildim", fontSize = 15.sp, fontWeight = FontWeight.ExtraBold)
                }
            }
        } else {
            OutlinedButton(
                onClick = onFlip,
                shape = RoundedCornerShape(12.dp),
                modifier = Modifier
                    .fillMaxWidth()
                    .height(48.dp)
            ) {
                Text("Ag'darish (Flip)", fontWeight = FontWeight.Bold)
            }
        }
    }
}

@Composable
private fun QuizView(
    state: PracticeUiState,
    onSpeak: (String) -> Unit,
    onSelectOption: (String) -> Unit,
    onNext: () -> Unit,
) {
    val current = state.currentWord ?: return

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
            .verticalScroll(rememberScrollState())
    ) {
        LinearProgressIndicator(
            progress = { (state.currentIndex + 1).toFloat() / state.queue.size },
            modifier = Modifier
                .fillMaxWidth()
                .height(6.dp)
                .clip(RoundedCornerShape(3.dp)),
            strokeCap = StrokeCap.Round
        )

        Spacer(Modifier.height(20.dp))

        // Question Card
        Card(
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f)),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(20.dp)
            ) {
                Text(
                    "So'zni tarjimasini toping",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                Spacer(Modifier.height(8.dp))
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(
                        current.word,
                        fontSize = 28.sp,
                        fontWeight = FontWeight.ExtraBold
                    )
                    Spacer(Modifier.width(8.dp))
                    Box(
                        contentAlignment = Alignment.Center,
                        modifier = Modifier
                            .size(36.dp)
                            .clip(CircleShape)
                            .background(MaterialTheme.colorScheme.primary.copy(alpha = 0.15f))
                            .clickable { onSpeak(current.word) }
                    ) {
                        Text("🔊", fontSize = 18.sp)
                    }
                }
                if (current.definition.isNotBlank()) {
                    Spacer(Modifier.height(6.dp))
                    Text(
                        current.definition,
                        fontSize = 12.sp,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
        }

        Spacer(Modifier.height(20.dp))

        // Options A, B, C, D
        val letters = listOf("A", "B", "C", "D")
        state.quizOptions.forEachIndexed { idx, opt ->
            val letter = letters.getOrElse(idx) { "" }
            val isSelected = state.quizSelectedOption == opt
            val isCorrectOption = opt.equals(current.translation.trim(), ignoreCase = true)

            val optionColor = when {
                !state.quizAnswered -> MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.45f)
                isCorrectOption -> Color(0xFF10B981).copy(alpha = 0.2f)
                isSelected && !isCorrectOption -> Color(0xFFEF4444).copy(alpha = 0.2f)
                else -> MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.25f)
            }

            val borderColor = when {
                !state.quizAnswered -> Color.Transparent
                isCorrectOption -> Color(0xFF10B981)
                isSelected && !isCorrectOption -> Color(0xFFEF4444)
                else -> Color.Transparent
            }

            Surface(
                onClick = { if (!state.quizAnswered) onSelectOption(opt) },
                shape = RoundedCornerShape(12.dp),
                color = optionColor,
                border = androidx.compose.foundation.BorderStroke(1.dp, borderColor),
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp)
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.padding(14.dp)
                ) {
                    Surface(
                        shape = RoundedCornerShape(6.dp),
                        color = MaterialTheme.colorScheme.primary.copy(alpha = 0.15f)
                    ) {
                        Text(
                            letter,
                            fontWeight = FontWeight.Bold,
                            fontSize = 12.sp,
                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                        )
                    }

                    Spacer(Modifier.width(12.dp))

                    Text(
                        opt,
                        fontWeight = FontWeight.SemiBold,
                        fontSize = 15.sp,
                        modifier = Modifier.weight(1f)
                    )

                    if (state.quizAnswered) {
                        if (isCorrectOption) {
                            Icon(Icons.Filled.Check, contentDescription = "To'g'ri", tint = Color(0xFF10B981))
                        } else if (isSelected) {
                            Icon(Icons.Filled.Close, contentDescription = "Noto'g'ri", tint = Color(0xFFEF4444))
                        }
                    }
                }
            }
        }

        Spacer(Modifier.height(20.dp))

        if (state.quizAnswered) {
            Button(
                onClick = onNext,
                shape = RoundedCornerShape(10.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Keyingisi →", fontWeight = FontWeight.Bold)
            }
        }
    }
}

@Composable
private fun SpellingView(
    state: PracticeUiState,
    onSpeak: (String) -> Unit,
    onSubmit: (String) -> Unit,
    onNext: () -> Unit,
) {
    val current = state.currentWord ?: return
    var input by remember(current.id) { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
            .verticalScroll(rememberScrollState())
    ) {
        LinearProgressIndicator(
            progress = { (state.currentIndex + 1).toFloat() / state.queue.size },
            modifier = Modifier
                .fillMaxWidth()
                .height(6.dp)
                .clip(RoundedCornerShape(3.dp)),
            strokeCap = StrokeCap.Round
        )

        Spacer(Modifier.height(24.dp))

        Card(
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f)),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(24.dp)
            ) {
                Text(
                    "So'zning inglizcha yozilishini kiriting",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                Spacer(Modifier.height(10.dp))
                Text(
                    current.translation,
                    fontSize = 28.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = MaterialTheme.colorScheme.primary,
                    textAlign = TextAlign.Center
                )

                if (current.definition.isNotBlank()) {
                    Spacer(Modifier.height(8.dp))
                    Text(
                        current.definition,
                        fontSize = 13.sp,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        textAlign = TextAlign.Center
                    )
                }

                Spacer(Modifier.height(12.dp))
                IconButton(onClick = { onSpeak(current.word) }) {
                    Text("🔊", fontSize = 24.sp)
                }
            }
        }

        Spacer(Modifier.height(20.dp))

        OutlinedTextField(
            value = input,
            onValueChange = { if (!state.spellingAnswered) input = it },
            label = { Text("Inglizcha so'z...") },
            singleLine = true,
            enabled = !state.spellingAnswered,
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(Modifier.height(16.dp))

        if (!state.spellingAnswered) {
            Button(
                onClick = { onSubmit(input) },
                enabled = input.isNotBlank(),
                shape = RoundedCornerShape(10.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Tekshirish", fontWeight = FontWeight.Bold)
            }
        } else {
            Surface(
                shape = RoundedCornerShape(10.dp),
                color = if (state.spellingIsCorrect) Color(0xFF10B981).copy(alpha = 0.15f) else Color(0xFFEF4444).copy(alpha = 0.15f),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Text(
                        if (state.spellingIsCorrect) "✨ Barakalla! To'g'ri yozdingiz!" else "❌ Noto'g'ri. To'g'ri yozilishi: ${current.word}",
                        fontWeight = FontWeight.Bold,
                        fontSize = 14.sp,
                        color = if (state.spellingIsCorrect) Color(0xFF10B981) else Color(0xFFEF4444)
                    )
                }
            }

            Spacer(Modifier.height(14.dp))

            Button(
                onClick = onNext,
                shape = RoundedCornerShape(10.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Keyingisi →", fontWeight = FontWeight.Bold)
            }
        }
    }
}

@Composable
private fun ResultsView(
    state: PracticeUiState,
    onSpeak: (String) -> Unit,
    onReset: () -> Unit,
) {
    val total = state.queue.size
    val correct = state.correctCount
    val incorrect = state.incorrectCount
    val ratio = if (total > 0) correct.toFloat() / total else 0f

    val (tierIcon, tierLabel, tierColor) = when {
        ratio >= 0.8f -> Triple("🏆", "Ajoyib!", Color(0xFFF59E0B))
        ratio >= 0.5f -> Triple("👍", "Yaxshi!", Color(0xFF2563EB))
        else -> Triple("🏋️", "Davom eting!", Color(0xFF10B981))
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
            .verticalScroll(rememberScrollState()),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Spacer(Modifier.height(16.dp))

        Box(
            contentAlignment = Alignment.Center,
            modifier = Modifier
                .size(72.dp)
                .clip(CircleShape)
                .background(tierColor.copy(alpha = 0.15f))
        ) {
            Text(tierIcon, fontSize = 36.sp)
        }

        Spacer(Modifier.height(12.dp))
        Text(tierLabel, fontSize = 24.sp, fontWeight = FontWeight.ExtraBold)
        Text("Mashq yakunlandi", fontSize = 13.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)

        Spacer(Modifier.height(20.dp))

        // Score Statistics Card
        Card(
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f)),
            modifier = Modifier.fillMaxWidth()
        ) {
            Row(
                horizontalArrangement = Arrangement.SpaceEvenly,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp)
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("$total", fontSize = 20.sp, fontWeight = FontWeight.Bold, color = Color(0xFF2563EB))
                    Text("Jami so'zlar", fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }

                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("$correct", fontSize = 20.sp, fontWeight = FontWeight.Bold, color = Color(0xFF10B981))
                    Text("To'g'ri", fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }

                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("$incorrect", fontSize = 20.sp, fontWeight = FontWeight.Bold, color = Color(0xFFEF4444))
                    Text("Noto'g'ri", fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
        }

        Spacer(Modifier.height(20.dp))

        // Mistakes list
        if (state.wrongWords.isNotEmpty()) {
            Surface(
                shape = RoundedCornerShape(14.dp),
                color = Color(0xFFEF4444).copy(alpha = 0.08f),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Text(
                        "📉 Takrorlash tavsiya etiladi (xatolar)",
                        fontWeight = FontWeight.Bold,
                        fontSize = 14.sp,
                        color = Color(0xFFEF4444)
                    )
                    Spacer(Modifier.height(10.dp))
                    state.wrongWords.forEach { word ->
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween,
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(vertical = 4.dp)
                        ) {
                            Column {
                                Text(word.word, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                                Text(word.translation, fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                            }
                            IconButton(onClick = { onSpeak(word.word) }) {
                                Text("🔊", fontSize = 16.sp)
                            }
                        }
                    }
                }
            }
        } else {
            Surface(
                shape = RoundedCornerShape(14.dp),
                color = Color(0xFF10B981).copy(alpha = 0.12f),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.padding(14.dp)
                ) {
                    Text("✨ Mukammal natija! Hech qanday xatolikka yo'l qo'yilmadi.", fontWeight = FontWeight.Bold, fontSize = 13.sp, color = Color(0xFF10B981))
                }
            }
        }

        Spacer(Modifier.height(24.dp))

        Button(
            onClick = onReset,
            shape = RoundedCornerShape(10.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Mashq menyusiga qaytish", fontWeight = FontWeight.Bold)
        }
    }
}
