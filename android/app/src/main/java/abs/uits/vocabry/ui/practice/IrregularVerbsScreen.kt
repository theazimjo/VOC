package abs.uits.vocabry.ui.practice

import abs.uits.vocabry.util.Feedback
import android.speech.tts.TextToSpeech
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
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
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import java.util.Locale

/**
 * Separate dedicated flow for the Irregular Verbs pack, mirroring
 * IrregularVerbsTrainer.jsx — study cards (cover-before-recall V1/V2/V3),
 * then 3 randomized question-type practice rounds, distinct from the
 * generic 7-mode Practice Hub in FlashcardScreen.kt.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun IrregularVerbsScreen(
    navController: NavController,
    viewModel: IrregularVerbsViewModel,
) {
    val state by viewModel.state.collectAsState()
    val context = LocalContext.current

    var tts by remember { mutableStateOf<TextToSpeech?>(null) }
    DisposableEffect(context) {
        var instance: TextToSpeech? = null
        instance = TextToSpeech(context) { status ->
            if (status == TextToSpeech.SUCCESS) {
                instance?.language = Locale.US
                instance?.setSpeechRate(0.8f)
            }
        }
        tts = instance
        onDispose {
            instance?.stop()
            instance?.shutdown()
        }
    }

    fun speakVerbs(v1: String, v2: String, v3: String) {
        val clean = { s: String -> s.replace("/", " or ") }
        tts?.speak("${clean(v1)}, ${clean(v2)}, ${clean(v3)}", TextToSpeech.QUEUE_FLUSH, null, null)
    }

    LaunchedEffect(Unit) {
        viewModel.feedbackEvents.collect { sound ->
            Feedback.playSound(sound)
            Feedback.triggerVibration(context, sound)
        }
    }
    LaunchedEffect(Unit) {
        viewModel.speakEvents.collect { (v1, v2, v3) -> speakVerbs(v1, v2, v3) }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        if (state.subStep == TrainerSubStep.STUDY) "Fe'llarni O'rganish" else "Amaliyot",
                        fontWeight = FontWeight.Bold
                    )
                },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Orqaga")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.background)
            )
        }
    ) { padding ->
        Box(modifier = Modifier.fillMaxSize().padding(padding)) {
            when {
                state.loading -> {
                    Box(contentAlignment = Alignment.Center, modifier = Modifier.fillMaxSize()) {
                        CircularProgressIndicator()
                    }
                }
                state.sessionVerbs.isEmpty() -> {
                    Box(contentAlignment = Alignment.Center, modifier = Modifier.fillMaxSize().padding(24.dp)) {
                        Text("Noto'g'ri fe'llar topilmadi.", fontWeight = FontWeight.Bold)
                    }
                }
                state.finished -> {
                    IrregularResultsView(state = state, onSpeak = ::speakVerbs, onDone = { navController.popBackStack() })
                }
                state.subStep == TrainerSubStep.STUDY -> {
                    StudyPhaseView(
                        state = state,
                        onReveal = { viewModel.revealStudyCard() },
                        onSpeak = ::speakVerbs,
                        onPrev = { viewModel.prevStudyCard() },
                        onNext = { viewModel.nextStudyCard() },
                        onExit = { navController.popBackStack() },
                    )
                }
                else -> {
                    PracticePhaseView(
                        state = state,
                        onTableInput = { f, v -> viewModel.updateTableInput(f, v) },
                        onTableSubmit = { viewModel.submitTable() },
                        onOrderClick = { viewModel.clickOrderButton(it) },
                        onOrderSkip = { viewModel.skipOrderReveal() },
                        onChoiceClick = { viewModel.clickChoice(it) },
                        onNext = { viewModel.nextQuestion() },
                    )
                }
            }
        }
    }
}

@Composable
private fun highlightedSentence(sentence: String, forms: List<String>): AnnotatedString {
    data class Range(val start: Int, val end: Int)
    val ranges = mutableListOf<Range>()
    for (form in forms) {
        if (form.isEmpty()) continue
        val regex = Regex("\\b${Regex.escape(form)}\\b", RegexOption.IGNORE_CASE)
        for (m in regex.findAll(sentence)) {
            val r = Range(m.range.first, m.range.last + 1)
            if (ranges.none { it.start < r.end && r.start < it.end }) ranges.add(r)
        }
    }
    ranges.sortBy { it.start }
    return buildAnnotatedString {
        var pos = 0
        for (r in ranges) {
            if (r.start > pos) append(sentence.substring(pos, r.start))
            withStyle(SpanStyle(fontWeight = FontWeight.ExtraBold)) {
                append(sentence.substring(r.start, r.end))
            }
            pos = r.end
        }
        if (pos < sentence.length) append(sentence.substring(pos))
    }
}

@Composable
private fun StudyPhaseView(
    state: IrregularVerbsUiState,
    onReveal: () -> Unit,
    onSpeak: (String, String, String) -> Unit,
    onPrev: () -> Unit,
    onNext: () -> Unit,
    onExit: () -> Unit,
) {
    val verb = state.studyVerb ?: return

    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Row(horizontalArrangement = Arrangement.SpaceBetween, modifier = Modifier.fillMaxWidth()) {
            Text("Fe'llarni O'rganish", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.onSurfaceVariant)
            Text("${state.studyIndex + 1} / ${state.sessionVerbs.size}", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.onSurfaceVariant)
        }

        Spacer(Modifier.height(16.dp))

        Card(
            shape = RoundedCornerShape(18.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f)),
            modifier = Modifier.fillMaxWidth().weight(1f)
        ) {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(20.dp)
                    .verticalScroll(rememberScrollState()),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Text(verb.word.translation, fontSize = 24.sp, fontWeight = FontWeight.ExtraBold, textAlign = androidx.compose.ui.text.style.TextAlign.Center)
                Spacer(Modifier.height(20.dp))

                if (!state.studyRevealed) {
                    OutlinedButton(onClick = onReveal, shape = RoundedCornerShape(10.dp)) {
                        Text("👁 Shakllarni eslab ko'ring, so'ng bosing")
                    }
                } else {
                    Column(modifier = Modifier.fillMaxWidth()) {
                        StudyRow("Infinitive", verb.v1)
                        StudyRow("Past Simple", verb.v2)
                        StudyRow("Past Participle", verb.v3)
                    }

                    if (verb.word.example.isNotBlank()) {
                        Spacer(Modifier.height(16.dp))
                        Text("Misol uchun", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        Spacer(Modifier.height(6.dp))
                        val forms = remember(verb) { abs.uits.vocabry.engine.IrregularVerbParser.highlightableForms(verb) }
                        verb.word.example.split("/").map { it.trim() }.forEach { s ->
                            Text(
                                highlightedSentence(s, forms),
                                fontSize = 13.sp,
                                modifier = Modifier.padding(vertical = 3.dp),
                                textAlign = androidx.compose.ui.text.style.TextAlign.Center
                            )
                        }
                    }

                    Spacer(Modifier.height(14.dp))
                    OutlinedButton(onClick = { onSpeak(verb.v1, verb.v2, verb.v3) }, shape = RoundedCornerShape(10.dp)) {
                        Text("🔊 Ovozli eshitish")
                    }
                }
            }
        }

        Spacer(Modifier.height(16.dp))

        Row(horizontalArrangement = Arrangement.spacedBy(10.dp), modifier = Modifier.fillMaxWidth()) {
            OutlinedButton(
                onClick = { if (state.studyIndex == 0) onExit() else onPrev() },
                modifier = Modifier.weight(1f),
                shape = RoundedCornerShape(10.dp)
            ) {
                Text(if (state.studyIndex == 0) "Chiqish" else "Orqaga")
            }
            Button(
                onClick = onNext,
                modifier = Modifier.weight(1f),
                shape = RoundedCornerShape(10.dp)
            ) {
                Text(if (state.studyIndex + 1 == state.sessionVerbs.size) "Boshlash" else "Keyingisi")
            }
        }
    }
}

@Composable
private fun StudyRow(label: String, value: String) {
    Row(
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp)
    ) {
        Text(label, fontSize = 13.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
        Text(value, fontSize = 15.sp, fontWeight = FontWeight.Bold)
    }
}

@Composable
private fun PracticePhaseView(
    state: IrregularVerbsUiState,
    onTableInput: (String, String) -> Unit,
    onTableSubmit: () -> Unit,
    onOrderClick: (Int) -> Unit,
    onOrderSkip: () -> Unit,
    onChoiceClick: (Int) -> Unit,
    onNext: () -> Unit,
) {
    val verb = state.currentVerb ?: return

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
            .verticalScroll(rememberScrollState())
    ) {
        Row(horizontalArrangement = Arrangement.SpaceBetween, modifier = Modifier.fillMaxWidth()) {
            Text("Amaliyot", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.onSurfaceVariant)
            Text("${state.currentIndex + 1} / ${state.sessionVerbs.size}", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.onSurfaceVariant)
        }

        Spacer(Modifier.height(16.dp))

        when (state.qType) {
            0 -> TableFillQuestion(state, verb.word.translation, onTableInput)
            1 -> ShuffledOrderQuestion(state, verb.word.translation, onOrderClick)
            2 -> state.sentenceQuestion?.let { SentenceChoiceQuestion(it, state, onChoiceClick) }
        }

        if (state.checked) {
            Spacer(Modifier.height(16.dp))
            Surface(
                shape = RoundedCornerShape(14.dp),
                color = MaterialTheme.colorScheme.primary.copy(alpha = 0.08f),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(14.dp), horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("To'g'ri Javob", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.onSurfaceVariant)
                    Spacer(Modifier.height(6.dp))
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(verb.v1, fontWeight = FontWeight.Bold, fontSize = 15.sp)
                        Text(" → ", color = MaterialTheme.colorScheme.onSurfaceVariant)
                        Text(verb.v2, fontWeight = FontWeight.Bold, fontSize = 15.sp)
                        Text(" → ", color = MaterialTheme.colorScheme.onSurfaceVariant)
                        Text(verb.v3, fontWeight = FontWeight.Bold, fontSize = 15.sp)
                    }
                    if (verb.word.example.isNotBlank()) {
                        Spacer(Modifier.height(6.dp))
                        Text(verb.word.example, fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant, textAlign = androidx.compose.ui.text.style.TextAlign.Center)
                    }
                }
            }
        }

        Spacer(Modifier.height(16.dp))

        if (!state.checked) {
            when (state.qType) {
                0 -> Button(onClick = onTableSubmit, shape = RoundedCornerShape(10.dp), modifier = Modifier.fillMaxWidth()) {
                    Text("Tekshirish", fontWeight = FontWeight.Bold)
                }
                1 -> TextButton(onClick = onOrderSkip, modifier = Modifier.fillMaxWidth()) {
                    Text("Javobni Ko'rish")
                }
            }
        } else {
            Button(
                onClick = onNext,
                colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF10B981)),
                shape = RoundedCornerShape(10.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Text(if (state.currentIndex + 1 == state.sessionVerbs.size) "Natija" else "Davom Etish", fontWeight = FontWeight.Bold)
            }
        }
    }
}

@Composable
private fun TableFillQuestion(
    state: IrregularVerbsUiState,
    translation: String,
    onInput: (String, String) -> Unit,
) {
    Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.fillMaxWidth()) {
        Text(translation, fontSize = 22.sp, fontWeight = FontWeight.ExtraBold, textAlign = androidx.compose.ui.text.style.TextAlign.Center)
        Spacer(Modifier.height(6.dp))
        Text("Qolgan shakllarini to'ldiring", fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
        Spacer(Modifier.height(16.dp))

        Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.fillMaxWidth()) {
            TableCell("V1", state.tableV1, state.tablePrefillType == 1, state.checked, state.tableV1Correct, "Infinitive", Modifier.weight(1f)) { onInput("v1", it) }
            TableCell("V2", state.tableV2, state.tablePrefillType == 2, state.checked, state.tableV2Correct, "Past", Modifier.weight(1f)) { onInput("v2", it) }
            TableCell("V3", state.tableV3, state.tablePrefillType == 3, state.checked, state.tableV3Correct, "Participle", Modifier.weight(1f)) { onInput("v3", it) }
        }
    }
}

@Composable
private fun TableCell(
    label: String,
    value: String,
    prefilled: Boolean,
    checked: Boolean,
    isCorrect: Boolean,
    placeholder: String,
    modifier: Modifier = Modifier,
    onChange: (String) -> Unit,
) {
    Column(modifier = modifier) {
        Text(label, fontSize = 11.sp, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.onSurfaceVariant)
        Spacer(Modifier.height(4.dp))
        OutlinedTextField(
            value = value,
            onValueChange = { if (!prefilled && !checked) onChange(it) },
            enabled = !prefilled && !checked,
            placeholder = { Text(placeholder, fontSize = 11.sp) },
            textStyle = androidx.compose.ui.text.TextStyle(fontSize = 13.sp),
            singleLine = true,
            modifier = Modifier.fillMaxWidth()
        )
        if (checked && !isCorrect) {
            Text("✗", color = Color(0xFFEF4444), fontSize = 12.sp)
        } else if (checked && isCorrect && !prefilled) {
            Text("✓", color = Color(0xFF10B981), fontSize = 12.sp)
        }
    }
}

@Composable
private fun ShuffledOrderQuestion(
    state: IrregularVerbsUiState,
    translation: String,
    onClick: (Int) -> Unit,
) {
    val verb = state.currentVerb ?: return
    Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.fillMaxWidth()) {
        Text(translation, fontSize = 22.sp, fontWeight = FontWeight.ExtraBold, textAlign = androidx.compose.ui.text.style.TextAlign.Center)
        Spacer(Modifier.height(6.dp))
        Text("Tartib bilan bosing: V1 → V2 → V3", fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
        Spacer(Modifier.height(16.dp))

        state.orderButtons.forEachIndexed { idx, btn ->
            val bg = if (btn.clicked) Color(0xFF10B981).copy(alpha = 0.15f) else MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.4f)
            Surface(
                onClick = { if (!btn.clicked && !state.checked) onClick(idx) },
                shape = RoundedCornerShape(10.dp),
                color = bg,
                modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp)
            ) {
                Row(
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.fillMaxWidth().padding(14.dp)
                ) {
                    Text(btn.text, fontWeight = FontWeight.SemiBold, fontSize = 15.sp)
                    if (btn.clicked) {
                        Surface(shape = RoundedCornerShape(6.dp), color = Color(0xFF10B981).copy(alpha = 0.2f)) {
                            Text("V${btn.clickedIndex + 1}", fontSize = 11.sp, fontWeight = FontWeight.Bold, modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp))
                        }
                    }
                }
            }
        }

        Spacer(Modifier.height(10.dp))
        Row(horizontalArrangement = Arrangement.Center, verticalAlignment = Alignment.CenterVertically) {
            SeqDot(if (state.orderStep >= 1 || state.checked) verb.v1 else "V1", state.orderStep >= 1 || state.checked)
            Text(" → ", color = MaterialTheme.colorScheme.onSurfaceVariant)
            SeqDot(if (state.orderStep >= 2 || state.checked) verb.v2 else "V2", state.orderStep >= 2 || state.checked)
            Text(" → ", color = MaterialTheme.colorScheme.onSurfaceVariant)
            SeqDot(if (state.checked) verb.v3 else "V3", state.checked)
        }
    }
}

@Composable
private fun SeqDot(text: String, active: Boolean) {
    Text(
        text,
        fontSize = 12.sp,
        fontWeight = if (active) FontWeight.Bold else FontWeight.Normal,
        color = if (active) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onSurfaceVariant
    )
}

@Composable
private fun SentenceChoiceQuestion(
    q: abs.uits.vocabry.engine.SentenceQuestionData,
    state: IrregularVerbsUiState,
    onClick: (Int) -> Unit,
) {
    Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.fillMaxWidth()) {
        Text(
            buildAnnotatedString {
                append(q.questionTextBeforeBlank)
                withStyle(SpanStyle(fontWeight = FontWeight.ExtraBold)) { append("_______") }
                append(q.questionTextAfterBlank)
            },
            fontSize = 16.sp,
            textAlign = androidx.compose.ui.text.style.TextAlign.Center
        )
        Spacer(Modifier.height(6.dp))
        Text("Mos tushuvchi fe'lni tanlang", fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
        Spacer(Modifier.height(16.dp))

        Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.fillMaxWidth()) {
            q.choices.forEachIndexed { idx, choice ->
                val isSelected = state.selectedChoice == idx
                val isCorrect = idx == q.correctIndex
                val bg = when {
                    state.checked && isCorrect -> Color(0xFF10B981).copy(alpha = 0.2f)
                    state.checked && isSelected -> Color(0xFFEF4444).copy(alpha = 0.2f)
                    else -> MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.4f)
                }
                Surface(
                    onClick = { if (!state.checked) onClick(idx) },
                    shape = RoundedCornerShape(10.dp),
                    color = bg,
                    modifier = Modifier.weight(1f)
                ) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally, modifier = Modifier.padding(vertical = 14.dp)) {
                        Text(choice.label, fontSize = 10.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                        Text(choice.text, fontWeight = FontWeight.Bold, fontSize = 14.sp)
                    }
                }
            }
        }
    }
}

@Composable
private fun IrregularResultsView(
    state: IrregularVerbsUiState,
    onSpeak: (String, String, String) -> Unit,
    onDone: () -> Unit,
) {
    val total = state.correctCount + state.incorrectCount
    val ratio = if (total > 0) state.correctCount.toFloat() / total else 0f
    val (tierIcon, tierLabel, tierColor) = when {
        ratio >= 0.8f -> Triple("🏆", "Ajoyib!", Color(0xFFF59E0B))
        ratio >= 0.5f -> Triple("👍", "Yaxshi!", Color(0xFF2563EB))
        else -> Triple("🏋️", "Davom eting!", Color(0xFF10B981))
    }

    Column(
        modifier = Modifier.fillMaxSize().padding(16.dp).verticalScroll(rememberScrollState()),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Spacer(Modifier.height(16.dp))
        Box(
            contentAlignment = Alignment.Center,
            modifier = Modifier.size(72.dp).background(tierColor.copy(alpha = 0.15f), CircleShape)
        ) { Text(tierIcon, fontSize = 36.sp) }
        Spacer(Modifier.height(12.dp))
        Text(tierLabel, fontSize = 24.sp, fontWeight = FontWeight.ExtraBold)
        Text("Fe'llar mashqi yakunlandi", fontSize = 13.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)

        Spacer(Modifier.height(20.dp))
        Card(shape = RoundedCornerShape(16.dp), colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f)), modifier = Modifier.fillMaxWidth()) {
            Row(horizontalArrangement = Arrangement.SpaceEvenly, modifier = Modifier.fillMaxWidth().padding(16.dp)) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("$total", fontSize = 20.sp, fontWeight = FontWeight.Bold, color = Color(0xFF2563EB))
                    Text("Jami fe'llar", fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("${state.correctCount}", fontSize = 20.sp, fontWeight = FontWeight.Bold, color = Color(0xFF10B981))
                    Text("To'g'ri", fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("${state.incorrectCount}", fontSize = 20.sp, fontWeight = FontWeight.Bold, color = Color(0xFFEF4444))
                    Text("Noto'g'ri", fontSize = 11.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
        }

        if (state.wrongVerbs.isNotEmpty()) {
            Spacer(Modifier.height(20.dp))
            Surface(shape = RoundedCornerShape(14.dp), color = Color(0xFFEF4444).copy(alpha = 0.08f), modifier = Modifier.fillMaxWidth()) {
                Column(modifier = Modifier.padding(14.dp)) {
                    Text("📉 Takrorlash tavsiya etiladi", fontWeight = FontWeight.Bold, fontSize = 14.sp, color = Color(0xFFEF4444))
                    Spacer(Modifier.height(10.dp))
                    state.wrongVerbs.distinctBy { it.word.id }.forEach { verb ->
                        Row(
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp)
                        ) {
                            Column {
                                Text("${verb.v1} → ${verb.v2} → ${verb.v3}", fontWeight = FontWeight.Bold, fontSize = 13.sp)
                                Text(verb.word.translation, fontSize = 12.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
                            }
                            IconButton(onClick = { onSpeak(verb.v1, verb.v2, verb.v3) }) { Text("🔊", fontSize = 16.sp) }
                        }
                    }
                }
            }
        }

        Spacer(Modifier.height(24.dp))
        Button(onClick = onDone, shape = RoundedCornerShape(10.dp), modifier = Modifier.fillMaxWidth()) {
            Text("Kutubxonaga qaytish", fontWeight = FontWeight.Bold)
        }
    }
}
