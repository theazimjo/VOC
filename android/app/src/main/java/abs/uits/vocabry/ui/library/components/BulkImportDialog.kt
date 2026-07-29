package abs.uits.vocabry.ui.library.components

import abs.uits.vocabry.data.model.MarketWord
import abs.uits.vocabry.data.model.Word
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ContentCopy
import androidx.compose.material3.Icon
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.LinearProgressIndicator
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
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.platform.LocalClipboardManager
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.launch
import org.json.JSONArray

/** Mirrors src/components/Words/BulkImportForm.jsx's sample JSON. */
private const val SAMPLE_JSON = """[
  {
    "word": "Apple",
    "translation": "Olma",
    "partOfSpeech": "noun",
    "definition": "A round fruit with red or green skin",
    "example": "I ate an apple."
  },
  {
    "word": "Beautiful",
    "translation": "Chiroyli",
    "partOfSpeech": "adjective"
  }
]"""

// Keep in sync with the words/$packId cap enforced server-side in database.rules.json.
private const val MAX_WORDS_PER_IMPORT = 500

private fun parseWords(jsonText: String): Result<List<MarketWord>> {
    return runCatching {
        val parsed = try {
            JSONArray(jsonText)
        } catch (e: Exception) {
            throw IllegalArgumentException("Noto'g'ri JSON formati! Qavslar, qo'shtirnoqlar yoki vergullarni tekshiring.")
        }

        if (parsed.length() > MAX_WORDS_PER_IMPORT) {
            throw IllegalArgumentException(
                "Bir martada faqat $MAX_WORDS_PER_IMPORT tagacha so'z qo'shish mumkin (siz ${parsed.length()} ta kiritdingiz). Ro'yxatni bir necha qismga bo'lib yuboring."
            )
        }

        (0 until parsed.length()).map { i ->
            val item = parsed.getJSONObject(i)
            val word = item.optString("word", "")
            val translation = item.optString("translation", "")
            if (word.isBlank() || translation.isBlank()) {
                throw IllegalArgumentException("${i + 1}-so'zda 'word' yoki 'translation' maydoni yetishmayapti.")
            }
            MarketWord(
                word = word.take(300),
                translation = translation.take(300),
                partOfSpeech = item.optString("partOfSpeech", "noun").ifBlank { "noun" },
                definition = item.optString("definition", "").take(3000),
                example = item.optString("example", "").take(3000),
                notes = item.optString("notes", "").take(2000),
            )
        }
    }
}

@Composable
fun BulkImportDialog(
    existingWords: List<Word>,
    onDismiss: () -> Unit,
    onImport: suspend (List<MarketWord>, onProgress: (added: Int, total: Int) -> Unit) -> Unit,
) {
    var jsonText by remember { mutableStateOf("") }
    var error by remember { mutableStateOf<String?>(null) }
    var pendingDuplicateConfirm by remember { mutableStateOf<Pair<List<MarketWord>, Int>?>(null) }
    var isImporting by remember { mutableStateOf(false) }
    var progress by remember { mutableStateOf<Pair<Int, Int>?>(null) }
    val clipboard = LocalClipboardManager.current
    val scope = rememberCoroutineScope()

    fun startImport(words: List<MarketWord>) {
        isImporting = true
        progress = 0 to words.size
        scope.launch {
            onImport(words) { added, total -> progress = added to total }
            isImporting = false
            progress = null
            jsonText = ""
            onDismiss()
        }
    }

    fun handleSubmit() {
        error = null
        if (jsonText.isBlank()) {
            error = "Iltimos, JSON ma'lumotni kiriting."
            return
        }
        val parsedResult = parseWords(jsonText)
        val parsed = parsedResult.getOrElse {
            error = it.message ?: "Noto'g'ri JSON formati."
            return
        }

        val existingSet = existingWords.map { it.word.trim().lowercase() }.toSet()
        val seenInBatch = mutableSetOf<String>()
        val uniqueWords = mutableListOf<MarketWord>()
        var duplicateCount = 0
        for (w in parsed) {
            val key = w.word.trim().lowercase()
            if (key.isNotEmpty() && (existingSet.contains(key) || seenInBatch.contains(key))) {
                duplicateCount++
                continue
            }
            if (key.isNotEmpty()) seenInBatch.add(key)
            uniqueWords.add(w)
        }

        if (uniqueWords.isEmpty()) {
            error = "Qo'shiladigan yangi so'z topilmadi — ro'yxatdagi barcha so'zlar allaqachon mavjud."
            return
        }

        if (duplicateCount > 0) {
            pendingDuplicateConfirm = uniqueWords to duplicateCount
        } else {
            startImport(uniqueWords)
        }
    }

    AlertDialog(
        onDismissRequest = { if (!isImporting) onDismiss() },
        title = { Text("JSON orqali ko'p so'z qo'shish") },
        text = {
            Column(modifier = Modifier.verticalScroll(rememberScrollState())) {
                if (isImporting && progress != null) {
                    val (added, total) = progress!!
                    Column(modifier = Modifier.padding(bottom = 12.dp)) {
                        Row(verticalAlignment = androidx.compose.ui.Alignment.CenterVertically) {
                            CircularProgressIndicator(modifier = Modifier.height(16.dp).width(16.dp), strokeWidth = 2.dp)
                            Spacer(Modifier.width(8.dp))
                            Text("So'zlar qo'shilmoqda...", fontWeight = androidx.compose.ui.text.font.FontWeight.Bold)
                        }
                        Spacer(Modifier.height(6.dp))
                        LinearProgressIndicator(
                            progress = { if (total > 0) added / total.toFloat() else 0f },
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(6.dp)
                                .clip(RoundedCornerShape(3.dp))
                        )
                        Spacer(Modifier.height(4.dp))
                        Text("Qo'shildi: $added / $total", fontSize = 12.sp)
                    }
                } else {
                    Text(
                        "Quyidagi namuna asosida JSON formatida so'zlarni kiriting. word va translation maydonlari majburiy.",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    Spacer(Modifier.height(8.dp))

                    Surface(
                        shape = RoundedCornerShape(8.dp),
                        color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Column(modifier = Modifier.padding(10.dp)) {
                            Row(
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = androidx.compose.ui.Alignment.CenterVertically,
                                modifier = Modifier.fillMaxWidth()
                            ) {
                                Text("Namuna formati", fontSize = 11.sp, fontWeight = androidx.compose.ui.text.font.FontWeight.SemiBold)
                                TextButton(onClick = { clipboard.setText(AnnotatedString(SAMPLE_JSON)) }) {
                                    Icon(Icons.Filled.ContentCopy, contentDescription = null, modifier = Modifier.size(14.dp))
                                    Spacer(Modifier.width(4.dp))
                                    Text("Nusxalash", fontSize = 11.sp)
                                }
                            }
                            Text(SAMPLE_JSON, fontFamily = FontFamily.Monospace, fontSize = 11.sp)
                        }
                    }

                    Spacer(Modifier.height(10.dp))

                    if (pendingDuplicateConfirm != null) {
                        val (unique, dupCount) = pendingDuplicateConfirm!!
                        Surface(
                            shape = RoundedCornerShape(8.dp),
                            color = MaterialTheme.colorScheme.errorContainer.copy(alpha = 0.4f),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Column(modifier = Modifier.padding(10.dp)) {
                                Text(
                                    "$dupCount ta so'z takroriy bo'lgani uchun o'tkazib yuboriladi. ${unique.size} ta yangi so'z qo'shiladi. Davom etasizmi?",
                                    fontSize = 12.sp
                                )
                                Spacer(Modifier.height(8.dp))
                                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                                    TextButton(onClick = { pendingDuplicateConfirm = null }) { Text("Bekor qilish") }
                                    TextButton(onClick = {
                                        pendingDuplicateConfirm = null
                                        startImport(unique)
                                    }) { Text("Davom etish") }
                                }
                            }
                        }
                    } else {
                        OutlinedTextField(
                            value = jsonText,
                            onValueChange = { jsonText = it },
                            placeholder = { Text("JSON formatidagi ro'yxatni bu yerga joylashtiring...") },
                            textStyle = androidx.compose.ui.text.TextStyle(fontFamily = FontFamily.Monospace, fontSize = 12.sp),
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(160.dp),
                        )
                    }

                    if (error != null) {
                        Spacer(Modifier.height(8.dp))
                        Text(error!!, color = MaterialTheme.colorScheme.error, fontSize = 12.sp)
                    }
                }
            }
        },
        confirmButton = {
            if (pendingDuplicateConfirm == null) {
                TextButton(onClick = { handleSubmit() }, enabled = !isImporting) {
                    Text(if (isImporting) "Yuklanmoqda..." else "Qo'shish")
                }
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss, enabled = !isImporting) {
                Text("Bekor qilish")
            }
        }
    )
}
