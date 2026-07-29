package abs.uits.vocabry.ui.library.components

import abs.uits.vocabry.data.model.Word
import abs.uits.vocabry.engine.GeminiService
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
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.FilterChip
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
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

/** Mirrors src/utils/helpers.js's partOfSpeechOptions. */
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

@Composable
fun AddWordDialog(
    editingWord: Word? = null,
    onDismiss: () -> Unit,
    onConfirm: (WordFormData) -> Unit,
) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    val currentUser = Firebase.auth.currentUser

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

    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween,
                modifier = Modifier.fillMaxWidth()
            ) {
                Text(if (isEditing) "So'zni tahrirlash" else "Yangi so'z", fontWeight = FontWeight.Bold)
                Surface(
                    shape = RoundedCornerShape(8.dp),
                    color = MaterialTheme.colorScheme.primary.copy(alpha = 0.1f),
                    modifier = Modifier.clickable { handleAiAutofill() }
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                    ) {
                        if (isAiLoading) {
                            CircularProgressIndicator(modifier = Modifier.size(12.dp), strokeWidth = 1.5.dp)
                            Spacer(Modifier.width(4.dp))
                            Text("Qidirilmoqda...", fontSize = 11.sp, color = MaterialTheme.colorScheme.primary)
                        } else {
                            Text("✨ AI Avto-to'ldirish", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.primary)
                        }
                    }
                }
            }
        },
        text = {
            Column(
                modifier = Modifier.verticalScroll(rememberScrollState())
            ) {
                if (aiError != null) {
                    Surface(
                        color = MaterialTheme.colorScheme.errorContainer.copy(alpha = 0.4f),
                        shape = RoundedCornerShape(8.dp),
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(bottom = 8.dp)
                    ) {
                        Text(
                            "⚠️ ${aiError}",
                            color = MaterialTheme.colorScheme.error,
                            fontSize = 12.sp,
                            modifier = Modifier.padding(8.dp)
                        )
                    }
                }

                if (showKeyInput) {
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(MaterialTheme.colorScheme.primary.copy(alpha = 0.08f), RoundedCornerShape(10.dp))
                            .padding(10.dp)
                    ) {
                        Text("🔑 Gemini API Kalitingizni kiriting:", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                        Spacer(Modifier.height(4.dp))
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            OutlinedTextField(
                                value = apiKeyText,
                                onValueChange = { apiKeyText = it },
                                placeholder = { Text("API Key...") },
                                singleLine = true,
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
                                }
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
                    placeholder = { Text("Masalan: Serendipity") },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth(),
                )
                Spacer(Modifier.height(8.dp))
                OutlinedTextField(
                    value = translation,
                    onValueChange = { translation = it },
                    label = { Text("O'zbekcha tarjima *") },
                    placeholder = { Text("Tasodifiy baxt") },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth(),
                )

                Spacer(Modifier.height(10.dp))
                Text("So'z turkumi", style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.SemiBold)
                Spacer(Modifier.height(4.dp))
                LazyRow(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                    items(POS_OPTIONS) { (valKey, label) ->
                        FilterChip(
                            selected = selectedPos == valKey,
                            onClick = { selectedPos = valKey },
                            label = { Text(label) }
                        )
                    }
                }

                Spacer(Modifier.height(10.dp))
                OutlinedTextField(
                    value = definition,
                    onValueChange = { definition = it },
                    label = { Text("Ta'rifi (ixtiyoriy)") },
                    placeholder = { Text("O'zbek tilidagi ta'rifi") },
                    modifier = Modifier.fillMaxWidth(),
                )
                Spacer(Modifier.height(8.dp))
                OutlinedTextField(
                    value = example,
                    onValueChange = { example = it },
                    label = { Text("Misol gap (ixtiyoriy)") },
                    placeholder = { Text("Ushbu so'z qatnashgan gap") },
                    modifier = Modifier.fillMaxWidth(),
                )
                Spacer(Modifier.height(8.dp))
                OutlinedTextField(
                    value = customSentence,
                    onValueChange = { customSentence = it },
                    label = { Text("O'zingiz tuzgan gap (Faol so'zlik uchun)") },
                    placeholder = { Text("So'zni faollashtirish uchun mustaqil gap tuzib kiriting") },
                    modifier = Modifier.fillMaxWidth(),
                )
                Spacer(Modifier.height(8.dp))
                OutlinedTextField(
                    value = notes,
                    onValueChange = { notes = it },
                    label = { Text("Qo'shimcha izoh (ixtiyoriy)") },
                    placeholder = { Text("Sinonim, antonim va h.k.") },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth(),
                )
            }
        },
        confirmButton = {
            TextButton(
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
            ) {
                Text(if (isEditing) "Saqlash" else "Qo'shish")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) { Text("Bekor qilish") }
        },
    )
}
