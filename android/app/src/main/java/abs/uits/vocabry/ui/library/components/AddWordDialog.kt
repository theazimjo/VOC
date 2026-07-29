package abs.uits.vocabry.ui.library.components

import abs.uits.vocabry.data.model.Word
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.FilterChip
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

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
    var word by remember { mutableStateOf(editingWord?.word.orEmpty()) }
    var translation by remember { mutableStateOf(editingWord?.translation.orEmpty()) }
    var definition by remember { mutableStateOf(editingWord?.definition.orEmpty()) }
    var example by remember { mutableStateOf(editingWord?.example.orEmpty()) }
    var customSentence by remember { mutableStateOf(editingWord?.customSentence.orEmpty()) }
    var notes by remember { mutableStateOf(editingWord?.notes.orEmpty()) }
    var selectedPos by remember { mutableStateOf(editingWord?.partOfSpeech?.ifEmpty { "noun" } ?: "noun") }

    val isEditing = editingWord != null

    AlertDialog(
        onDismissRequest = onDismiss,
        title = { Text(if (isEditing) "So'zni tahrirlash" else "Yangi so'z") },
        text = {
            Column(
                modifier = Modifier.verticalScroll(rememberScrollState())
            ) {
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
                    placeholder = { Text("Ingliz tilidagi ta'rifi") },
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
