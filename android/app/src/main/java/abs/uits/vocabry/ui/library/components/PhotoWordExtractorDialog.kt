package abs.uits.vocabry.ui.library.components

import abs.uits.vocabry.engine.ExtractedWordItem
import abs.uits.vocabry.engine.GeminiService
import abs.uits.vocabry.ui.theme.WarningAmber
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.util.Base64
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.CameraAlt
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Lock
import androidx.compose.material.icons.filled.PhotoLibrary
import androidx.compose.material.icons.filled.RocketLaunch
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Checkbox
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
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
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase
import kotlinx.coroutines.launch
import java.io.ByteArrayOutputStream
import java.io.InputStream

@Composable
fun PhotoWordExtractorDialog(
    isOpen: Boolean,
    onDismiss: () -> Unit,
    onImport: (List<WordFormData>) -> Unit,
    existingWords: List<String> = emptyList(),
) {
    if (!isOpen) return

    val context = LocalContext.current
    val scope = rememberCoroutineScope()

    val currentUser = Firebase.auth.currentUser
    val isAllowedUser = currentUser?.email?.lowercase() == "azimjonxolmirzayev30@gmail.com"

    var selectedBitmap by remember { mutableStateOf<Bitmap?>(null) }
    var base64Image by remember { mutableStateOf<String?>(null) }
    var isProcessing by remember { mutableStateOf(false) }
    var extractedItems by remember { mutableStateOf<List<ExtractedWordItem>>(emptyList()) }
    var errorMsg by remember { mutableStateOf<String?>(null) }
    var showKeyInput by remember { mutableStateOf(GeminiService.getApiKey(context).isBlank()) }
    var apiKeyText by remember { mutableStateOf(GeminiService.getApiKey(context)) }

    // Launcher for Gallery Image Picker
    val galleryLauncher = rememberLauncherForActivityResult(ActivityResultContracts.GetContent()) { uri ->
        uri?.let {
            try {
                val inputStream: InputStream? = context.contentResolver.openInputStream(uri)
                val bmp = BitmapFactory.decodeStream(inputStream)
                inputStream?.close()

                if (bmp != null) {
                    selectedBitmap = bmp
                    val baos = ByteArrayOutputStream()
                    bmp.compress(Bitmap.CompressFormat.JPEG, 85, baos)
                    val bytes = baos.toByteArray()
                    base64Image = Base64.encodeToString(bytes, Base64.DEFAULT)
                    errorMsg = null
                }
            } catch (e: Exception) {
                errorMsg = "Rasmni o'qishda xatolik yuz berdi"
            }
        }
    }

    // Launcher for Camera Snapshot
    val cameraLauncher = rememberLauncherForActivityResult(ActivityResultContracts.TakePicturePreview()) { bmp ->
        if (bmp != null) {
            selectedBitmap = bmp
            val baos = ByteArrayOutputStream()
            bmp.compress(Bitmap.CompressFormat.JPEG, 85, baos)
            val bytes = baos.toByteArray()
            base64Image = Base64.encodeToString(bytes, Base64.DEFAULT)
            errorMsg = null
        }
    }

    fun startExtraction() {
        val b64 = base64Image
        if (b64.isNullOrBlank() || isProcessing) return

        val key = GeminiService.getApiKey(context)
        if (key.isBlank()) {
            showKeyInput = true
            errorMsg = "Gemini API Kaliti kiritilmagan. Iltimos, kalitni kiriting."
            return
        }

        isProcessing = true
        errorMsg = null

        scope.launch {
            try {
                val items = GeminiService.extractWordsFromImageAI(context, b64, "image/jpeg", existingWords)
                if (items.isEmpty()) {
                    errorMsg = "Rasmdan so'zlar ajratib bo'lmadi. Iltimos, boshqa aniqroq rasm tanlang."
                } else {
                    extractedItems = items
                }
            } catch (e: Exception) {
                errorMsg = e.message ?: "AI tahlilida xatolik yuz berdi"
                if (e.message?.contains("API Kaliti") == true) {
                    showKeyInput = true
                }
            } finally {
                isProcessing = false
            }
        }
    }

    val selectedCount = extractedItems.count { it.selected }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Filled.CameraAlt, contentDescription = null)
                Spacer(Modifier.width(8.dp))
                Text(
                    "Rasmdan so'zlar ajratish (AI OCR)",
                    fontWeight = FontWeight.Bold,
                    fontSize = 17.sp
                )
            }
        },
        text = {
            Column(modifier = Modifier.fillMaxWidth()) {
                if (!isAllowedUser) {
                    // Coming Soon Card for non-allowed emails
                    Box(
                        contentAlignment = Alignment.Center,
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 24.dp)
                    ) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Icon(Icons.Filled.Lock, contentDescription = null, modifier = Modifier.size(48.dp), tint = MaterialTheme.colorScheme.onSurfaceVariant)
                            Spacer(Modifier.height(8.dp))
                            Text(
                                "Rasmdan so'z ajratish (AI OCR)",
                                fontWeight = FontWeight.Bold,
                                style = MaterialTheme.typography.titleMedium
                            )
                            Spacer(Modifier.height(4.dp))
                            Text(
                                "Ushbu AI imkoniyati hozirda sinov jarayonida. Tez orada barcha foydalanuvchilar uchun ishga tushiriladi!",
                                style = MaterialTheme.typography.bodySmall,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                                modifier = Modifier.padding(horizontal = 16.dp)
                            )
                            Spacer(Modifier.height(10.dp))
                            Surface(
                                shape = MaterialTheme.shapes.large,
                                color = MaterialTheme.colorScheme.primary.copy(alpha = 0.15f)
                            ) {
                                Row(
                                    verticalAlignment = Alignment.CenterVertically,
                                    modifier = Modifier.padding(horizontal = 12.dp, vertical = 4.dp)
                                ) {
                                    Icon(Icons.Filled.RocketLaunch, contentDescription = null, modifier = Modifier.size(14.dp), tint = MaterialTheme.colorScheme.primary)
                                    Spacer(Modifier.width(4.dp))
                                    Text(
                                        "Coming soon",
                                        fontWeight = FontWeight.Bold,
                                        fontSize = 12.sp,
                                        color = MaterialTheme.colorScheme.primary
                                    )
                                }
                            }
                        }
                    }
                } else {
                    if (errorMsg != null) {
                        Surface(
                            color = MaterialTheme.colorScheme.errorContainer.copy(alpha = 0.4f),
                            shape = MaterialTheme.shapes.small,
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(bottom = 8.dp)
                        ) {
                            Row(modifier = Modifier.padding(8.dp), verticalAlignment = Alignment.CenterVertically) {
                                Icon(Icons.Filled.Warning, contentDescription = null, modifier = Modifier.size(14.dp), tint = MaterialTheme.colorScheme.error)
                                Spacer(Modifier.width(6.dp))
                                Text(
                                    errorMsg.orEmpty(),
                                    color = MaterialTheme.colorScheme.error,
                                    fontSize = 12.sp
                                )
                            }
                        }
                    }

                    if (showKeyInput) {
                        Column(
                            modifier = Modifier
                                .fillMaxWidth()
                                .background(MaterialTheme.colorScheme.primary.copy(alpha = 0.08f), MaterialTheme.shapes.small)
                                .padding(10.dp)
                        ) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Icon(Icons.Filled.Lock, contentDescription = null, modifier = Modifier.size(14.dp))
                                Spacer(Modifier.width(6.dp))
                                Text("Gemini API Kalitingizni kiriting:", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                            }
                            Spacer(Modifier.height(4.dp))
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                OutlinedTextField(
                                    value = apiKeyText,
                                    onValueChange = { apiKeyText = it },
                                    placeholder = { Text("API Studio Key...") },
                                    singleLine = true,
                                    modifier = Modifier.weight(1f)
                                )
                                Spacer(Modifier.width(6.dp))
                                Button(
                                    onClick = {
                                        if (apiKeyText.isNotBlank()) {
                                            GeminiService.setApiKey(context, apiKeyText)
                                            showKeyInput = false
                                            errorMsg = null
                                            if (base64Image != null) startExtraction()
                                        }
                                    }
                                ) {
                                    Text("Saqlash", fontSize = 12.sp)
                                }
                            }
                        }
                        Spacer(Modifier.height(8.dp))
                    }

                    if (extractedItems.isEmpty()) {
                        // Choice 1: Gallery & Camera Pickers
                        Row(
                            horizontalArrangement = Arrangement.spacedBy(10.dp),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Box(
                                contentAlignment = Alignment.Center,
                                modifier = Modifier
                                    .weight(1f)
                                    .height(100.dp)
                                    .clip(MaterialTheme.shapes.medium)
                                    .background(MaterialTheme.colorScheme.primary.copy(alpha = 0.08f))
                                    .border(1.dp, MaterialTheme.colorScheme.primary.copy(alpha = 0.3f), MaterialTheme.shapes.medium)
                                    .clickable { galleryLauncher.launch("image/*") }
                            ) {
                                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                    Icon(Icons.Filled.PhotoLibrary, contentDescription = null, tint = MaterialTheme.colorScheme.primary)
                                    Text("Galereyadan", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                                }
                            }

                            Box(
                                contentAlignment = Alignment.Center,
                                modifier = Modifier
                                    .weight(1f)
                                    .height(100.dp)
                                    .clip(MaterialTheme.shapes.medium)
                                    .background(MaterialTheme.colorScheme.tertiary.copy(alpha = 0.08f))
                                    .border(1.dp, MaterialTheme.colorScheme.tertiary.copy(alpha = 0.3f), MaterialTheme.shapes.medium)
                                    .clickable { cameraLauncher.launch(null) }
                            ) {
                                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                    Icon(Icons.Filled.CameraAlt, contentDescription = null, tint = MaterialTheme.colorScheme.tertiary)
                                    Text("Rasmga olish", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                                }
                            }
                        }

                        if (base64Image != null) {
                            Spacer(Modifier.height(12.dp))
                            Button(
                                onClick = { startExtraction() },
                                enabled = !isProcessing,
                                modifier = Modifier.fillMaxWidth()
                            ) {
                                if (isProcessing) {
                                    CircularProgressIndicator(modifier = Modifier.size(16.dp), color = Color.White, strokeWidth = 2.dp)
                                    Spacer(Modifier.width(8.dp))
                                    Text("AI tahlil qilmoqda...")
                                } else {
                                    Icon(Icons.Filled.AutoAwesome, contentDescription = null, modifier = Modifier.size(18.dp))
                                    Spacer(Modifier.width(6.dp))
                                    Text("Rasmdagi so'zlarni tahlil qilish")
                                }
                            }
                        }
                    } else {
                        // Choice 2: Extracted Items Review List
                        Text(
                            "Topilgan: ${extractedItems.size} ta | Tanlangan: ${selectedCount} ta",
                            fontSize = 12.sp,
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.primary
                        )
                        Spacer(Modifier.height(6.dp))

                        LazyColumn(
                            modifier = Modifier
                                .fillMaxWidth()
                                .heightIn(max = 280.dp),
                            verticalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            items(extractedItems, key = { it.id }) { item ->
                                Card(
                                    shape = MaterialTheme.shapes.small,
                                    colors = CardDefaults.cardColors(
                                        containerColor = if (item.selected) MaterialTheme.colorScheme.primary.copy(alpha = 0.08f)
                                        else MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.4f)
                                    )
                                ) {
                                    Row(
                                        verticalAlignment = Alignment.CenterVertically,
                                        modifier = Modifier
                                            .fillMaxWidth()
                                            .padding(8.dp)
                                    ) {
                                        Checkbox(
                                            checked = item.selected,
                                            onCheckedChange = { chk ->
                                                extractedItems = extractedItems.map { if (it.id == item.id) it.copy(selected = chk) else it }
                                            }
                                        )

                                        Column(modifier = Modifier.weight(1f)) {
                                            Row(verticalAlignment = Alignment.CenterVertically) {
                                                OutlinedTextField(
                                                    value = item.word,
                                                    onValueChange = { newW ->
                                                        extractedItems = extractedItems.map { if (it.id == item.id) it.copy(word = newW) else it }
                                                    },
                                                    singleLine = true,
                                                    modifier = Modifier.weight(1f)
                                                )
                                                Spacer(Modifier.width(4.dp))
                                                Icon(Icons.AutoMirrored.Filled.ArrowForward, contentDescription = null, modifier = Modifier.size(14.dp))
                                                Spacer(Modifier.width(4.dp))
                                                OutlinedTextField(
                                                    value = item.translation,
                                                    onValueChange = { newTr ->
                                                        extractedItems = extractedItems.map { if (it.id == item.id) it.copy(translation = newTr) else it }
                                                    },
                                                    singleLine = true,
                                                    modifier = Modifier.weight(1f)
                                                )
                                            }

                                            if (item.isDuplicate) {
                                                Text(
                                                    "To'plamda mavjud (O'tkazib yuboriladi)",
                                                    fontSize = 10.sp,
                                                    color = WarningAmber,
                                                    fontWeight = FontWeight.Bold,
                                                    modifier = Modifier.padding(top = 2.dp)
                                                )
                                            }
                                        }

                                        IconButton(
                                            onClick = {
                                                extractedItems = extractedItems.filter { it.id != item.id }
                                            }
                                        ) {
                                            Icon(Icons.Filled.Delete, contentDescription = "O'chirish", tint = MaterialTheme.colorScheme.error)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        confirmButton = {
            if (isAllowedUser && extractedItems.isNotEmpty()) {
                Button(
                    onClick = {
                        val valid = extractedItems.filter { it.selected && it.word.isNotBlank() && it.translation.isNotBlank() }
                            .map {
                                WordFormData(
                                    word = it.word,
                                    translation = it.translation,
                                    definition = it.definition,
                                    example = it.example,
                                    customSentence = "",
                                    notes = "",
                                    partOfSpeech = it.partOfSpeech
                                )
                            }
                        if (valid.isNotEmpty()) {
                            onImport(valid)
                            onDismiss()
                        }
                    },
                    enabled = selectedCount > 0
                ) {
                    Icon(Icons.Filled.AutoAwesome, contentDescription = null, modifier = Modifier.size(18.dp))
                    Spacer(Modifier.width(6.dp))
                    Text("${selectedCount} ta so'zni saqlash")
                }
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Yopish")
            }
        }
    )
}
