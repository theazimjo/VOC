package abs.uits.vocabry.ui.practice

import abs.uits.vocabry.data.model.Word
import abs.uits.vocabry.util.Feedback
import abs.uits.vocabry.util.FeedbackSound
import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Bundle
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer
import android.speech.tts.TextToSpeech
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
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
import androidx.compose.material3.AlertDialog
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
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.core.content.ContextCompat
import androidx.navigation.NavController
import java.util.Locale

private val MODE_ICONS = mapOf(
    PracticeMode.FLASHCARD to "🧠",
    PracticeMode.QUIZ to "📝",
    PracticeMode.SPELLING to "✍️",
    PracticeMode.MATCH to "🔀",
    PracticeMode.SENTENCE to "📓",
    PracticeMode.PRONOUNCE to "🎙️",
)

private val MODE_TITLES = mapOf(
    PracticeMode.FLASHCARD to "Aqlli Kartochkalar",
    PracticeMode.QUIZ to "Test",
    PracticeMode.SPELLING to "Imlo Mashqi",
    PracticeMode.MATCH to "Moslashtirish",
    PracticeMode.SENTENCE to "Jumla Tuzish",
    PracticeMode.PRONOUNCE to "Talaffuz",
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun FlashcardScreen(
    navController: NavController,
    viewModel: PracticeViewModel,
) {
    val state by viewModel.state.collectAsState()
    val context = LocalContext.current
    var showExitConfirm by remember { mutableStateOf(false) }

    // TTS Setup
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

    // Autoplay pronunciation ~350ms after each card mounts (web parity),
    // for every sequential mode.
    LaunchedEffect(state.currentWord?.id, state.selectedMode, state.introVisible) {
        val word = state.currentWord
        if (word != null && !state.introVisible && state.selectedMode in setOf(
                PracticeMode.FLASHCARD, PracticeMode.QUIZ, PracticeMode.SENTENCE, PracticeMode.PRONOUNCE
            )
        ) {
            kotlinx.coroutines.delay(350)
            onSpeak(word.word)
        }
    }

    // Sound/vibration feedback
    LaunchedEffect(Unit) {
        viewModel.feedbackEvents.collect { sound ->
            Feedback.playSound(sound)
            Feedback.triggerVibration(context, sound)
        }
    }

    val isMidSession = state.selectedMode != PracticeMode.MODE_HUB && !state.finished && !state.introVisible

    fun handleBack() {
        if (isMidSession) {
            showExitConfirm = true
        } else if (state.selectedMode != PracticeMode.MODE_HUB) {
            viewModel.resetToHub()
        } else {
            navController.popBackStack()
        }
    }

    Scaffold(
        topBar = {
            Column {
                TopAppBar(
                    title = {
                        if (state.selectedMode != PracticeMode.MODE_HUB && !state.finished && !state.introVisible && state.queue.isNotEmpty()) {
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
                        IconButton(onClick = { handleBack() }) {
                            Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Orqaga")
                        }
                    },
                    colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.background)
                )
                // Header progress bar (web's practice-header-progress-fill), shown for
                // sequential modes only — Match keeps its own internal progress UI.
                if (state.selectedMode != PracticeMode.MODE_HUB && state.selectedMode != PracticeMode.MATCH &&
                    !state.finished && !state.introVisible && state.queue.isNotEmpty()
                ) {
                    LinearProgressIndicator(
                        progress = { (state.currentIndex + 1).toFloat() / state.queue.size },
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(3.dp),
                        strokeCap = StrokeCap.Round
                    )
                }
            }
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

                state.introVisible -> {
                    IntroSplashView(mode = state.introMode)
                }

                state.selectedMode != PracticeMode.MODE_HUB && state.queue.isEmpty() && !state.finished -> {
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
                        onSkip = { viewModel.skipSpelling() },
                        onNext = { viewModel.nextQuestion() }
                    )
                }

                state.selectedMode == PracticeMode.MATCH -> {
                    MatchView(
                        state = state,
                        onSelectLeft = { viewModel.selectMatchLeft(it) },
                        onSelectRight = { viewModel.selectMatchRight(it) },
                    )
                }

                state.selectedMode == PracticeMode.SENTENCE -> {
                    SentenceView(
                        state = state,
                        onSpeak = onSpeak,
                        onSubmit = { viewModel.submitSentenceAnswer(it) },
                        onSkip = { viewModel.skipSentence() },
                        onNext = { viewModel.nextQuestion() }
                    )
                }

                state.selectedMode == PracticeMode.PRONOUNCE -> {
                    PronounceView(
                        state = state,
                        onResult = { viewModel.submitPronounceResult(it) },
                        onSkip = { viewModel.skipPronounce() },
                        onNext = { viewModel.nextQuestion() }
                    )
                }
            }
        }
    }

    if (showExitConfirm) {
        AlertDialog(
            onDismissRequest = { showExitConfirm = false },
            title = { Text("Mashqni tark etish") },
            text = { Text("Rostdan ham mashqni tark etmoqchimisiz? Hozirgi natijalaringiz saqlanmaydi.") },
            confirmButton = {
                TextButton(onClick = {
                    showExitConfirm = false
                    viewModel.resetToHub()
                }) { Text("Chiqish", color = MaterialTheme.colorScheme.error) }
            },
            dismissButton = {
                TextButton(onClick = { showExitConfirm = false }) { Text("Davom etish") }
            }
        )
    }
}

@Composable
private fun IntroSplashView(mode: PracticeMode?) {
    Box(contentAlignment = Alignment.Center, modifier = Modifier.fillMaxSize()) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Text(mode?.let { MODE_ICONS[it] } ?: "🎮", fontSize = 56.sp)
            Spacer(Modifier.height(16.dp))
            Text(
                mode?.let { MODE_TITLES[it] } ?: "Mashq",
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.ExtraBold
            )
            Spacer(Modifier.height(20.dp))
            CircularProgressIndicator()
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

        ModeCardItem("🧠", "Aqlli Kartochkalar", "Kartochkalarni ag'darib, har bir so'z uchun unutish egri chizig'i asosida hisoblangan vaqtda takrorlang", "Tavsiya etiladi 🌟", Color(0xFF2563EB)) { onSelectMode(PracticeMode.FLASHCARD) }
        Spacer(Modifier.height(12.dp))
        ModeCardItem("📝", "Test", "To'rtta variantdan to'g'ri tarjimani tezkorlik bilan tanlang", "Tezkor ⚡", Color(0xFFD97706)) { onSelectMode(PracticeMode.QUIZ) }
        Spacer(Modifier.height(12.dp))
        ModeCardItem("✍️", "Imlo Mashqi", "Eshitish va xotiradan so'zlarni to'g'ri yozishni mashq qiling", "Yozuv ✍️", Color(0xFF7C3AED)) { onSelectMode(PracticeMode.SPELLING) }
        Spacer(Modifier.height(12.dp))
        ModeCardItem("🔀", "Moslashtirish", "So'z va tarjimasini juftlab toping — vaqt va xatolar hisoblanadi", "O'yin 🎲", Color(0xFF0EA5E9)) { onSelectMode(PracticeMode.MATCH) }
        Spacer(Modifier.height(12.dp))
        ModeCardItem("📓", "Jumla Tuzish", "So'zni ishlatib mustaqil inglizcha jumla yozing", "Faol so'zlik ✨", Color(0xFF059669)) { onSelectMode(PracticeMode.SENTENCE) }
        Spacer(Modifier.height(12.dp))
        ModeCardItem("🎙️", "Talaffuz", "So'zni ovoz chiqarib talaffuz qiling, tizim eshitib tekshiradi", "Nutq 🎤", Color(0xFFDB2777)) { onSelectMode(PracticeMode.PRONOUNCE) }
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
                    Column(
                        horizontalAlignment = Alignment.CenterHorizontally,
                        modifier = Modifier.verticalScroll(rememberScrollState())
                    ) {
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

                        if (word.customSentence.isNotBlank()) {
                            Spacer(Modifier.height(10.dp))
                            Text(
                                "✎ ${word.customSentence}",
                                fontSize = 13.sp,
                                fontStyle = FontStyle.Italic,
                                color = MaterialTheme.colorScheme.primary.copy(alpha = 0.85f),
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
                Row(
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text(
                        "So'zni tarjimasini toping",
                        fontSize = 12.sp,
                        fontWeight = FontWeight.Bold,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    val timerColor = when {
                        state.quizTimeLeft <= 4 -> Color(0xFFEF4444)
                        state.quizTimeLeft <= 8 -> Color(0xFFF59E0B)
                        else -> MaterialTheme.colorScheme.onSurfaceVariant
                    }
                    Text("${state.quizTimeLeft}s", fontSize = 13.sp, fontWeight = FontWeight.Bold, color = timerColor)
                }
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

                Spacer(Modifier.height(10.dp))
                val timerBarColor = when {
                    state.quizTimeLeft <= 4 -> Color(0xFFEF4444)
                    state.quizTimeLeft <= 8 -> Color(0xFFF59E0B)
                    else -> MaterialTheme.colorScheme.primary
                }
                LinearProgressIndicator(
                    progress = { state.quizTimeLeft / 15f },
                    color = timerBarColor,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(4.dp)
                        .clip(RoundedCornerShape(2.dp))
                )
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

        Spacer(Modifier.height(12.dp))

        if (state.quizAnswered) {
            if (state.quizTimedOut) {
                Text(
                    "Vaqt tugadi! Javob: ${current.translation}",
                    color = Color(0xFFEF4444),
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(bottom = 8.dp)
                )
            }
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
    onSkip: () -> Unit,
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

                Spacer(Modifier.height(10.dp))
                Text(
                    "Aralashtirilgan harflar:",
                    fontSize = 11.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                Text(
                    state.spellingScrambled,
                    fontSize = 15.sp,
                    fontWeight = FontWeight.SemiBold,
                    letterSpacing = 2.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )

                Spacer(Modifier.height(10.dp))
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
            Spacer(Modifier.height(8.dp))
            TextButton(onClick = onSkip, modifier = Modifier.fillMaxWidth()) {
                Text("Bilmadim (o'tkazib yuborish)")
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
private fun SentenceView(
    state: PracticeUiState,
    onSpeak: (String) -> Unit,
    onSubmit: (String) -> Unit,
    onSkip: () -> Unit,
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
                    "Ushbu ma'noni ifodalovchi so'zni ishlatib jumla tuzing",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    textAlign = TextAlign.Center
                )
                Spacer(Modifier.height(10.dp))
                Text(
                    current.translation,
                    fontSize = 26.sp,
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
            }
        }

        Spacer(Modifier.height(20.dp))

        OutlinedTextField(
            value = input,
            onValueChange = { if (!state.sentenceAnswered) input = it },
            label = { Text("Inglizcha jumla yozing...") },
            enabled = !state.sentenceAnswered,
            minLines = 3,
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(Modifier.height(16.dp))

        if (!state.sentenceAnswered) {
            Button(
                onClick = { onSubmit(input) },
                enabled = input.isNotBlank(),
                shape = RoundedCornerShape(10.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Tekshirish ✓", fontWeight = FontWeight.Bold)
            }
            Spacer(Modifier.height(8.dp))
            TextButton(onClick = onSkip, modifier = Modifier.fillMaxWidth()) {
                Text("Bilmadim (o'tkazib yuborish)")
            }
        } else {
            val feedbackText = if (state.sentenceIsCorrect) {
                if (state.sentenceIsTooShort) "So'z to'g'ri ishlatildi, lekin jumlani uzunroq yozing" else "Ajoyib! So'z to'g'ri ishlatildi"
            } else {
                "So'z jumlada ishlatilmadi"
            }
            Surface(
                shape = RoundedCornerShape(10.dp),
                color = if (state.sentenceIsCorrect) Color(0xFF10B981).copy(alpha = 0.15f) else Color(0xFFEF4444).copy(alpha = 0.15f),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Text(
                        feedbackText,
                        fontWeight = FontWeight.Bold,
                        fontSize = 14.sp,
                        color = if (state.sentenceIsCorrect) Color(0xFF10B981) else Color(0xFFEF4444)
                    )
                    Spacer(Modifier.height(6.dp))
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(current.word, fontWeight = FontWeight.Bold, fontSize = 15.sp)
                        IconButton(onClick = { onSpeak(current.word) }, modifier = Modifier.size(28.dp)) {
                            Text("🔊", fontSize = 14.sp)
                        }
                    }
                    if (current.example.isNotBlank()) {
                        Text(
                            "\"${current.example}\"",
                            fontSize = 12.sp,
                            fontStyle = FontStyle.Italic,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                    }
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
private fun PronounceView(
    state: PracticeUiState,
    onResult: (Boolean) -> Unit,
    onSkip: () -> Unit,
    onNext: () -> Unit,
) {
    val current = state.currentWord ?: return
    val context = LocalContext.current

    val unsupported = remember { !SpeechRecognizer.isRecognitionAvailable(context) }
    var listening by remember { mutableStateOf(false) }
    var hasPermission by remember {
        mutableStateOf(ContextCompat.checkSelfPermission(context, Manifest.permission.RECORD_AUDIO) == PackageManager.PERMISSION_GRANTED)
    }

    val recognizer = remember(unsupported) { if (!unsupported) SpeechRecognizer.createSpeechRecognizer(context) else null }
    DisposableEffect(recognizer) {
        onDispose { recognizer?.destroy() }
    }

    fun normalize(s: String) = s.lowercase().filter { it.isLetterOrDigit() }

    fun startListening() {
        val r = recognizer ?: return
        listening = true
        r.setRecognitionListener(object : RecognitionListener {
            override fun onResults(results: Bundle) {
                listening = false
                val matches = results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
                val said = matches?.firstOrNull().orEmpty()
                onResult(normalize(said) == normalize(current.word))
            }

            override fun onError(error: Int) {
                listening = false
            }

            override fun onReadyForSpeech(params: Bundle?) {}
            override fun onBeginningOfSpeech() {}
            override fun onRmsChanged(rmsdB: Float) {}
            override fun onBufferReceived(buffer: ByteArray?) {}
            override fun onEndOfSpeech() {}
            override fun onPartialResults(partialResults: Bundle?) {}
            override fun onEvent(eventType: Int, params: Bundle?) {}
        })
        val intent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
            putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
            putExtra(RecognizerIntent.EXTRA_LANGUAGE, "en-US")
        }
        r.startListening(intent)
    }

    val permissionLauncher = rememberLauncherForActivityResult(ActivityResultContracts.RequestPermission()) { granted ->
        hasPermission = granted
        if (granted) startListening()
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
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
                    "So'zni ovoz chiqarib talaffuz qiling",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                Spacer(Modifier.height(10.dp))
                Text(
                    current.word,
                    fontSize = 30.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = MaterialTheme.colorScheme.primary
                )
                Spacer(Modifier.height(6.dp))
                Text(current.translation, fontSize = 15.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        }

        Spacer(Modifier.height(28.dp))

        if (unsupported) {
            Text(
                "Ushbu qurilmada ovozni tanish qo'llab-quvvatlanmaydi.",
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                textAlign = TextAlign.Center
            )
        } else if (!state.pronounceAnswered) {
            Box(
                contentAlignment = Alignment.Center,
                modifier = Modifier
                    .size(84.dp)
                    .clip(CircleShape)
                    .background(if (listening) Color(0xFFEF4444).copy(alpha = 0.2f) else MaterialTheme.colorScheme.primary.copy(alpha = 0.15f))
                    .clickable {
                        if (!hasPermission) {
                            permissionLauncher.launch(Manifest.permission.RECORD_AUDIO)
                        } else {
                            startListening()
                        }
                    }
            ) {
                Text("🎙️", fontSize = 32.sp)
            }
            Spacer(Modifier.height(10.dp))
            Text(
                if (listening) "Tinglanmoqda..." else "Boshlash uchun bosing",
                fontSize = 13.sp,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
        }

        Spacer(Modifier.height(20.dp))

        if (!state.pronounceAnswered) {
            TextButton(onClick = onSkip) { Text("O'tkazib yuborish") }
        } else {
            Surface(
                shape = RoundedCornerShape(10.dp),
                color = if (state.pronounceIsCorrect) Color(0xFF10B981).copy(alpha = 0.15f) else Color(0xFFEF4444).copy(alpha = 0.15f),
                modifier = Modifier.fillMaxWidth()
            ) {
                Text(
                    if (state.pronounceIsCorrect) "✨ To'g'ri talaffuz!" else "❌ Qayta urinib ko'ring",
                    fontWeight = FontWeight.Bold,
                    color = if (state.pronounceIsCorrect) Color(0xFF10B981) else Color(0xFFEF4444),
                    modifier = Modifier.padding(14.dp)
                )
            }
            Spacer(Modifier.height(14.dp))
            Button(onClick = onNext, shape = RoundedCornerShape(10.dp), modifier = Modifier.fillMaxWidth()) {
                Text("Keyingisi →", fontWeight = FontWeight.Bold)
            }
        }
    }
}

@Composable
private fun MatchView(
    state: PracticeUiState,
    onSelectLeft: (String) -> Unit,
    onSelectRight: (String) -> Unit,
) {
    val m = state.matchState
    val remaining = m.leftItems.size - m.matchedIds.size

    fun formatTime(s: Int) = "${s / 60}:${(s % 60).toString().padStart(2, '0')}"

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Row(
            horizontalArrangement = Arrangement.SpaceEvenly,
            modifier = Modifier.fillMaxWidth()
        ) {
            MatchStatPill("Vaqt", formatTime(m.elapsedSec))
            MatchStatPill("Qoldi", "$remaining")
            MatchStatPill("Xato", "${m.mistakes}")
        }

        Spacer(Modifier.height(16.dp))

        Row(horizontalArrangement = Arrangement.spacedBy(10.dp), modifier = Modifier.fillMaxSize()) {
            LazyColumn(modifier = Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                item { Text("Inglizcha", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.onSurfaceVariant) }
                items(m.leftItems, key = { it.wordId }) { tile ->
                    MatchTileItem(
                        text = tile.text,
                        selected = m.selectedLeftId == tile.wordId,
                        matched = m.matchedIds.contains(tile.wordId),
                        error = m.errorLeftId == tile.wordId,
                        enabled = !m.matchedIds.contains(tile.wordId) && m.errorLeftId == null,
                        onClick = { onSelectLeft(tile.wordId) }
                    )
                }
            }
            LazyColumn(modifier = Modifier.weight(1f), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                item { Text("Tarjima", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.onSurfaceVariant) }
                items(m.rightItems, key = { it.wordId }) { tile ->
                    MatchTileItem(
                        text = tile.text,
                        selected = m.selectedRightId == tile.wordId,
                        matched = m.matchedIds.contains(tile.wordId),
                        error = m.errorRightId == tile.wordId,
                        enabled = !m.matchedIds.contains(tile.wordId) && m.errorRightId == null,
                        onClick = { onSelectRight(tile.wordId) }
                    )
                }
            }
        }
    }
}

@Composable
private fun MatchStatPill(label: String, value: String) {
    Surface(shape = RoundedCornerShape(8.dp), color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f)) {
        Row(modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)) {
            Text("$label: ", fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
            Text(value, fontSize = 12.sp, fontWeight = FontWeight.Bold)
        }
    }
}

@Composable
private fun MatchTileItem(
    text: String,
    selected: Boolean,
    matched: Boolean,
    error: Boolean,
    enabled: Boolean,
    onClick: () -> Unit,
) {
    val bg = when {
        matched -> Color(0xFF10B981).copy(alpha = 0.15f)
        error -> Color(0xFFEF4444).copy(alpha = 0.2f)
        selected -> MaterialTheme.colorScheme.primary.copy(alpha = 0.15f)
        else -> MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.4f)
    }
    val borderColor = when {
        matched -> Color(0xFF10B981)
        error -> Color(0xFFEF4444)
        selected -> MaterialTheme.colorScheme.primary
        else -> Color.Transparent
    }
    Surface(
        onClick = { if (enabled) onClick() },
        shape = RoundedCornerShape(10.dp),
        color = bg,
        border = androidx.compose.foundation.BorderStroke(1.dp, borderColor),
        modifier = Modifier.fillMaxWidth()
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween,
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 12.dp, vertical = 12.dp)
        ) {
            Text(text, fontSize = 13.sp, fontWeight = FontWeight.SemiBold, modifier = Modifier.weight(1f), overflow = TextOverflow.Ellipsis, maxLines = 1)
            if (matched) {
                Icon(Icons.Filled.Check, contentDescription = null, tint = Color(0xFF10B981), modifier = Modifier.size(14.dp))
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
    val total = state.correctCount + state.incorrectCount
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
