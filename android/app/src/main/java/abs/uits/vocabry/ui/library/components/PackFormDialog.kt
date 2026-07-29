package abs.uits.vocabry.ui.library.components

import abs.uits.vocabry.data.model.Folder
import abs.uits.vocabry.data.model.Pack
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.ExposedDropdownMenuDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PackFormDialog(
    pack: Pack? = null,
    folders: List<Folder> = emptyList(),
    defaultFolderId: String? = null,
    onDismiss: () -> Unit,
    onSave: (
        name: String,
        description: String,
        color: String,
        icon: String,
        level: String,
        folderId: String?
    ) -> Unit,
    onDelete: (() -> Unit)? = null,
) {
    var name by remember { mutableStateOf(pack?.name.orEmpty()) }
    var selectedFolderId by remember { mutableStateOf(pack?.folderId ?: defaultFolderId) }
    var folderMenuExpanded by remember { mutableStateOf(false) }

    val isEditing = pack != null
    val isLocked = isEditing && pack?.marketPackId != null

    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Text(if (isEditing) "To'plamni tahrirlash" else "Yangi to'plam")
        },
        text = {
            Column(
                modifier = Modifier.verticalScroll(rememberScrollState())
            ) {
                if (isLocked) {
                    Surface(
                        shape = RoundedCornerShape(8.dp),
                        color = Color(0xFF14B8A6).copy(alpha = 0.1f),
                        border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFF14B8A6).copy(alpha = 0.3f)),
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(bottom = 12.dp)
                    ) {
                        Text(
                            "ℹ️ Ushbu tayyor to'plamning nomi va ikonkasini o'zgartirib bo'lmaydi. Uni faqat o'chirishingiz mumkin.",
                            fontSize = 12.sp,
                            color = Color(0xFF0D9488),
                            modifier = Modifier.padding(10.dp)
                        )
                    }
                }

                OutlinedTextField(
                    value = name,
                    onValueChange = { if (!isLocked) name = it },
                    label = { Text("To'plam nomi *") },
                    placeholder = { Text("Masalan: IELTS Vocabulary") },
                    singleLine = true,
                    enabled = !isLocked,
                    modifier = Modifier.fillMaxWidth(),
                )

                if (folders.isNotEmpty()) {
                    Spacer(Modifier.height(12.dp))
                    Text("Papka", style = MaterialTheme.typography.bodySmall, fontWeight = FontWeight.SemiBold)
                    Spacer(Modifier.height(4.dp))

                    ExposedDropdownMenuBox(
                        expanded = folderMenuExpanded,
                        onExpandedChange = { folderMenuExpanded = !folderMenuExpanded }
                    ) {
                        val currentFolderName = folders.find { it.id == selectedFolderId }?.let { "${it.icon} ${it.name}" } ?: "Asosiy ro'yxat"
                        OutlinedTextField(
                            value = currentFolderName,
                            onValueChange = {},
                            readOnly = true,
                            trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = folderMenuExpanded) },
                            modifier = Modifier
                                .menuAnchor()
                                .fillMaxWidth()
                        )
                        ExposedDropdownMenu(
                            expanded = folderMenuExpanded,
                            onDismissRequest = { folderMenuExpanded = false }
                        ) {
                            DropdownMenuItem(
                                text = { Text("Asosiy ro'yxat") },
                                onClick = {
                                    selectedFolderId = null
                                    folderMenuExpanded = false
                                }
                            )
                            folders.forEach { f ->
                                DropdownMenuItem(
                                    text = { Text("${f.icon} ${f.name}") },
                                    onClick = {
                                        selectedFolderId = f.id
                                        folderMenuExpanded = false
                                    }
                                )
                            }
                        }
                    }
                }
            }
        },
        confirmButton = {
            TextButton(
                onClick = {
                    onSave(
                        name.trim(),
                        pack?.description.orEmpty(),
                        pack?.color.orEmpty(),
                        pack?.icon.orEmpty(),
                        pack?.level.orEmpty().ifEmpty { "beginner" },
                        selectedFolderId
                    )
                },
                enabled = name.isNotBlank()
            ) {
                Text(if (isEditing) "Saqlash" else "Yaratish")
            }
        },
        dismissButton = {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                if (isEditing && onDelete != null) {
                    TextButton(onClick = onDelete) {
                        Text("🗑 O'chirish", color = MaterialTheme.colorScheme.error)
                    }
                }
                TextButton(onClick = onDismiss) {
                    Text("Bekor qilish")
                }
            }
        }
    )
}
