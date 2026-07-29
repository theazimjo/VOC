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

/** Mirrors src/utils/helpers.js's packIcons. */
val PACK_ICONS = listOf(
    "📦", "🎯", "💼", "🌍", "🎓", "💡", "🔬", "🎨", "🏋️", "✈️", "🍔", "🎮", "📰", "🎬", "🎵", "⚽",
)

/**
 * Solid-color analog of src/utils/helpers.js's bookColors (which are CSS
 * gradients — not renderable as a single [Color] on Android without a
 * Brush). Same palette spirit (one accent hue per pack), different format.
 */
val PACK_COLORS = listOf(
    "#8B5CF6", "#3B82F6", "#14B8A6", "#F43F5E", "#F59E0B", "#22C55E", "#A855F7", "#EC4899",
)

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
    var showDeleteConfirm by remember { mutableStateOf(false) }

    // New packs get a random icon/color, same as web's PackForm.jsx useEffect
    // (packIcons[Math.floor(Math.random() * packIcons.length)] / bookColors[...]).
    val icon = remember(pack) { pack?.icon.orEmpty().ifEmpty { PACK_ICONS.random() } }
    val color = remember(pack) { pack?.color.orEmpty().ifEmpty { PACK_COLORS.random() } }

    val isEditing = pack != null
    // Web only locks name/icon editing for the Irregular Verbs pack specifically
    // (PackForm.jsx: editPack.name === 'Irregular Verbs'), not every market pack.
    val isLocked = isEditing && pack?.name == "Irregular Verbs"

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
                        color,
                        icon,
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
                    TextButton(onClick = { showDeleteConfirm = true }) {
                        Text("🗑 O'chirish", color = MaterialTheme.colorScheme.error)
                    }
                }
                TextButton(onClick = onDismiss) {
                    Text("Bekor qilish")
                }
            }
        }
    )

    if (showDeleteConfirm && onDelete != null) {
        AlertDialog(
            onDismissRequest = { showDeleteConfirm = false },
            title = { Text("To'plamni o'chirish") },
            text = { Text("Rostdan ham bu to'plamni va undagi barcha so'zlarni o'chirmoqchimisiz?") },
            confirmButton = {
                TextButton(onClick = {
                    showDeleteConfirm = false
                    onDelete()
                }) {
                    Text("O'chirish", color = MaterialTheme.colorScheme.error)
                }
            },
            dismissButton = {
                TextButton(onClick = { showDeleteConfirm = false }) {
                    Text("Bekor qilish")
                }
            }
        )
    }
}
