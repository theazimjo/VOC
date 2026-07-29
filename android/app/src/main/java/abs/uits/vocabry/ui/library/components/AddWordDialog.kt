package abs.uits.vocabry.ui.library.components

import abs.uits.vocabry.data.model.Word
import abs.uits.vocabry.engine.GeminiService
import abs.uits.vocabry.ui.theme.IOSBorderDark
import abs.uits.vocabry.ui.theme.IOSCardDark
import abs.uits.vocabry.ui.theme.IOSSegmentedTrack
import abs.uits.vocabry.ui.theme.IOSSystemBlue
import abs.uits.vocabry.ui.theme.IOSSystemGray
import abs.uits.vocabry.ui.theme.IOSTextWhite
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase
import kotlinx.coroutines.launch

private val POS_OPTIONS = listOf(
    "noun" to "Ot (Noun)",
    "verb" to "Fe'l (Verb)",
    "adjective" to "Sifat (Adjective)",
    "adverb" to "Ravish (Adverb)",
    "preposition" to "Preposition",
    "conjunction" to "Conjunction",
    "pronoun" to "Olmosh (Pronoun)",
    "interjection" to "Interjection",
    "phrase" to "Ibora (Phrase)",
    "idiom" to "Idiom",
)

data class WordFormData(
    val word: String,
    val translation: String,
    val definition: String,
    val example: String,
    val customSentence: String,
    val notes: String,
    val partOfSpeech: String,
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AddWordDialog(
    editingWord: Word? = null,
    onDismiss: () -> Unit,
    onConfirm: (WordFormData) -> Unit,
) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    val currentUser = Firebase.auth.currentUser
    val sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true)

    var word by remember { mutableStateOf(editingWord?.word.orEmpty()) }
    var translation by remember { mutableStateOf(editingWord?.translation.orEmpty()) }
    var definition by remember { mutableStateOf(editingWord?.definition.orEmpty()) }
    var example by remember { mutableStateOf(editingWord?.example.orEmpty()) }
    var customSentence by remember { mutableStateOf(editingWord?.customSentence.orEmpty()) }
    var notes by remember { mutableStateOf(editingWord?.notes.orEmpty()) }
    var selectedPos by remember { mutableStateOf(editingWord?.partOfSpeech?.ifEmpty { "noun" } ?: "noun") }

    var isAiLoading by remember { mutableStateOf(false) }
    var aiError by remember { mutableStateOf<String?>(null) }
    var showKeyInput by remember { mutableStateOf(false) }
    var apiKeyText by remember { mutableStateOf(GeminiService.getApiKey(context)) }

    val isEditing = editingWord != null
    var showMore by remember { mutableStateOf(isEditing && (editingWord.definition.isNotBlank() || editingWord.example.isNotBlank() || editingWord.notes.isNotBlank() || editingWord.customSentence.isNotBlank())) }

    val textFieldColors = OutlinedTextFieldDefaults.colors(
        focusedBorderColor = IOSSystemBlue,
        unfocusedBorderColor = IOSBorderDark,
        focusedLabelColor = IOSSystemBlue,
        unfocusedLabelColor = IOSSystemGray,
        focusedTextColor = IOSTextWhite,
        unfocusedTextColor = IOSTextWhite,
        focusedContainerColor = IOSSegmentedTrack,
        unfocusedContainerColor = IOSSegmentedTrack
    )

    fun handleAiAutofill() {
        val userEmail = currentUser?.email?.lowercase().orEmpty()
        if (userEmail != "azimjonxolmirzayev30@gmail.com") {
            aiError = "🔒 AI Avto-to'ldirish tez orada taqdim etiladi! (Coming soon)"
            return
        }

        if (GeminiService.getApiKey(context).isBlank()) {
            showKeyInput = true
            aiError = "🔑 Gemini API Kaliti kiritilmagan. Iltimos, kalitni kiriting."
            return
        }

        val q = word.ifBlank { translation }
        if (q.isBlank() || isAiLoading) return

        isAiLoading = true
        aiError = null

        scope.launch {
            try {
                val res = GeminiService.lookupWordWithAI(context, q)
                if (res != null) {
                    word = res.word.ifBlank { word }
                    translation = res.translation.ifBlank { translation }
                    selectedPos = res.partOfSpeech.ifBlank { selectedPos }
                    definition = res.definition.ifBlank { definition }
                    example = res.example.ifBlank { example }
                    showMore = true
                } else {
                    aiError = "So'z ma'lumoti topilmadi."
                }
            } catch (e: Exception) {
                if (e.message?.contains("API Kaliti") == true) {
                    showKeyInput = true
                }
                aiError = e.message ?: "AI so'rovida xatolik yuz berdi"
            } finally {
                isAiLoading = false
            }
        }
    }

    ModalBottomSheet(
        onDismissRequest = onDismiss,
        sheetState = sheetState,
        containerColor = IOSCardDark,
        contentColor = IOSTextWhite
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp, vertical = 8.dp)
                .verticalScroll(rememberScrollState())
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween,
                modifier = Modifier.fillMaxWidth()
            ) {
                Text(
                    text = if (isEditing) "So'zni tahrirlash" else "Yangi so'z",
                    fontWeight = FontWeight.ExtraBold,
                    fontSize = 20.sp,
                    color = IOSTextWhite
                )
                Surface(
                    shape = RoundedCornerShape(8.dp),
                    color = IOSSystemBlue.copy(alpha = 0.15f),
                    modifier = Modifier.clickable { handleAiAutofill() }
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
                    ) {
                        if (isAiLoading) {
                            CircularProgressIndicator(modifier = Modifier.size(12.dp), strokeWidth = 1.5.dp, color = IOSSystemBlue)
                            Spacer(Modifier.width(4.dp))
                            Text("Qidirilmoqda...", fontSize = 11.sp, color = IOSSystemBlue)
                        } else {
                            Text("✨ AI Avto-to'ldirish", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = IOSSystemBlue)
                        }
                    }
                }
            }

            Spacer(Modifier.height(12.dp))

            if (aiError != null) {
                Surface(
                    color = Color(0xFF3B1215),
                    shape = RoundedCornerShape(8.dp),
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(bottom = 8.dp)
                ) {
                    Text(
                        "⚠️ ${aiError}",
                        color = Color(0xFFFF6B6B),
                        fontSize = 12.sp,
                        modifier = Modifier.padding(8.dp)
                    )
                }
            }

            if (showKeyInput) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(IOSSegmentedTrack, RoundedCornerShape(10.dp))
                        .padding(10.dp)
                ) {
                    Text("🔑 Gemini API Kalitingizni kiriting:", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = IOSTextWhite)
                    Spacer(Modifier.height(4.dp))
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        OutlinedTextField(
                            value = apiKeyText,
                            onValueChange = { apiKeyText = it },
                            placeholder = { Text("API Key...", color = IOSSystemGray) },
                            singleLine = true,
                            colors = textFieldColors,
                            modifier = Modifier.weight(1f)
                        )
                        Spacer(Modifier.width(6.dp))
                        Button(
                            onClick = {
                                if (apiKeyText.isNotBlank()) {
                                    GeminiService.setApiKey(context, apiKeyText)
                                    showKeyInput = false
                                    aiError = null
                                    handleAiAutofill()
                                }
                            },
                            colors = ButtonDefaults.buttonColors(containerColor = IOSSystemBlue, contentColor = Color.White)
                        ) {
                            Text("Saqlash", fontSize = 12.sp)
                        }
                    }
                }
                Spacer(Modifier.height(8.dp))
            }

            OutlinedTextField(
                value = word,
                onValueChange = { word = it },
                label = { Text("Inglizcha so'z *") },
                placeholder = { Text("Masalan: Serendipity", color = IOSSystemGray) },
                singleLine = true,
                colors = textFieldColors,
                modifier = Modifier.fillMaxWidth(),
            )
            Spacer(Modifier.height(8.dp))
            OutlinedTextField(
                value = translation,
                onValueChange = { translation = it },
                label = { Text("O'zbekcha tarjima *") },
                placeholder = { Text("Tasodifiy baxt", color = IOSSystemGray) },
                singleLine = true,
                colors = textFieldColors,
                modifier = Modifier.fillMaxWidth(),
            )

            TextButton(
                onClick = { showMore = !showMore },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = 4.dp)
            ) {
                Text(
                    if (showMore) "🔼 Kamroq variantlar" else "⚙️ Ko'proq variantlar (Ta'rif, misol va so'z turkumi)",
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    color = IOSSystemBlue
                )
            }

            if (showMore) {
                Spacer(Modifier.height(4.dp))
                Text("So'z turkumi", style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.SemiBold, color = IOSSystemGray)
                Spacer(Modifier.height(4.dp))
                LazyRow(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    items(POS_OPTIONS) { (valKey, label) ->
                        FilterChip(
                            selected = selectedPos == valKey,
                            onClick = { selectedPos = valKey },
                            label = { Text(label) },
                            colors = FilterChipDefaults.filterChipColors(
                                selectedContainerColor = IOSSystemBlue,
                                selectedLabelColor = Color.White,
                                containerColor = IOSSegmentedTrack,
                                labelColor = IOSTextWhite
                            )
                        )
                    }
                }

                Spacer(Modifier.height(10.dp))
                OutlinedTextField(
                    value = definition,
                    onValueChange = { definition = it },
                    label = { Text("Ta'rifi (ixtiyoriy)") },
                    placeholder = { Text("O'zbek tilidagi ta'rifi", color = IOSSystemGray) },
                    colors = textFieldColors,
                    modifier = Modifier.fillMaxWidth(),
                )
                Spacer(Modifier.height(8.dp))
                OutlinedTextField(
                    value = example,
                    onValueChange = { example = it },
                    label = { Text("Misol gap (ixtiyoriy)") },
                    placeholder = { Text("Ushbu so'z qatnashgan gap", color = IOSSystemGray) },
                    colors = textFieldColors,
                    modifier = Modifier.fillMaxWidth(),
                )
                Spacer(Modifier.height(8.dp))
                OutlinedTextField(
                    value = customSentence,
                    onValueChange = { customSentence = it },
                    label = { Text("O'zingiz tuzgan gap (Faol so'zlik uchun)") },
                    placeholder = { Text("So'zni faollashtirish uchun mustaqil gap tuzib kiriting", color = IOSSystemGray) },
                    colors = textFieldColors,
                    modifier = Modifier.fillMaxWidth(),
                )
                Spacer(Modifier.height(8.dp))
                OutlinedTextField(
                    value = notes,
                    onValueChange = { notes = it },
                    label = { Text("Qo'shimcha izoh (ixtiyoriy)") },
                    placeholder = { Text("Sinonim, antonim va h.k.", color = IOSSystemGray) },
                    singleLine = true,
                    colors = textFieldColors,
                    modifier = Modifier.fillMaxWidth(),
                )
            }

            Spacer(Modifier.height(16.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.End
            ) {
                TextButton(onClick = onDismiss) {
                    Text("Bekor qilish", color = IOSSystemGray)
                }
                Spacer(Modifier.width(8.dp))
                Button(
                    onClick = {
                        onConfirm(
                            WordFormData(
                                word = word,
                                translation = translation,
                                definition = definition,
                                example = example,
                                customSentence = customSentence,
                                notes = notes,
                                partOfSpeech = selectedPos,
                            )
                        )
                    },
                    enabled = word.isNotBlank() && translation.isNotBlank(),
                    colors = ButtonDefaults.buttonColors(containerColor = IOSSystemBlue, contentColor = Color.White)
                ) {
                    Text(if (isEditing) "Saqlash" else "Qo'shish")
                }
            }

            Spacer(Modifier.height(24.dp))
        }
    }
}
