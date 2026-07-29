package abs.uits.vocabry.ui.library.components

import androidx.compose.runtime.Composable

@Composable
fun AddPackDialog(
    onDismiss: () -> Unit,
    onConfirm: (name: String, description: String) -> Unit,
) {
    PackFormDialog(
        pack = null,
        folders = emptyList(),
        onDismiss = onDismiss,
        onSave = { name, description, _, _, _, _ ->
            onConfirm(name, description)
        }
    )
}
