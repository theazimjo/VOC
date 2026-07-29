package abs.uits.vocabry.ui.library.components

import abs.uits.vocabry.data.model.Word
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
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

private val POS_OPTIONS = listOf(
    "noun" to "Ot (Noun)",
    "verb" to "Fe'l (Verb)",
    "adjective" to "Sifat (Adj)",
    "adverb" to "Ravish (Adv)",
    "phrase" to "Ibora (Phrase)",
)

@Composable
fun AddWordDialog(
    editingWord: Word? = null,
    onDismiss: () -> Unit,
    onConfirm: (
        word: String,
        translation: String,
        definition: String,
        example: String,
        partOfSpeech: String
    ) -> Unit,
) {
    var word by remember { mutableStateOf(editingWord?.word.orEmpty()) }
    var translation by remember { mutableStateOf(editingWord?.translation.orEmpty()) }
    var definition by remember { mutableStateOf(editingWord?.definition.orEmpty()) }
    var example by remember { mutableStateOf(editingWord?.example.orEmpty()) }
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
                    label = { Text("So'z (inglizcha) *") },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth(),
                )
                Spacer(Modifier.height(8.dp))
                OutlinedTextField(
                    value = translation,
                    onValueChange = { translation = it },
                    label = { Text("Tarjimasi *") },
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
                    label = { Text("Ta'rif (ixtiyoriy)") },
                    modifier = Modifier.fillMaxWidth(),
                )
                Spacer(Modifier.height(8.dp))
                OutlinedTextField(
                    value = example,
                    onValueChange = { example = it },
                    label = { Text("Misol jumla (ixtiyoriy)") },
                    modifier = Modifier.fillMaxWidth(),
                )
            }
        },
        confirmButton = {
            TextButton(
                onClick = { onConfirm(word, translation, definition, example, selectedPos) },
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
