package abs.uits.vocabry.ui.library

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Card
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import abs.uits.vocabry.ui.components.BottomNavBar
import abs.uits.vocabry.ui.library.components.AddPackDialog

@Composable
fun LibraryScreen(
    navController: NavController,
    viewModel: LibraryViewModel,
) {
    val packs by viewModel.packs.collectAsState()
    var showAddDialog by remember { mutableStateOf(false) }

    Scaffold(
        bottomBar = { BottomNavBar(navController) },
        floatingActionButton = {
            FloatingActionButton(onClick = { showAddDialog = true }) {
                Icon(Icons.Filled.Add, contentDescription = "Yangi to'plam")
            }
        },
    ) { padding ->
        if (packs.isEmpty()) {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(padding)
                    .padding(24.dp),
            ) {
                Text("Hali to'plamlaringiz yo'q. + tugmasi bilan birinchisini yarating.")
            }
        } else {
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(padding)
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp),
            ) {
                items(packs) { pack ->
                    Card(
                        modifier = Modifier.fillMaxWidth(),
                        onClick = { navController.navigate("pack/${pack.id}") },
                    ) {
                        Column(Modifier.padding(16.dp)) {
                            Text("${pack.icon} ${pack.name}", fontWeight = FontWeight.Bold, style = MaterialTheme.typography.titleMedium)
                            Text("${pack.wordCount} ta so'z", style = MaterialTheme.typography.bodySmall)
                        }
                    }
                }
            }
        }
    }

    if (showAddDialog) {
        AddPackDialog(
            onDismiss = { showAddDialog = false },
            onConfirm = { name, description ->
                viewModel.addPack(name, description) { showAddDialog = false }
            },
        )
    }
}
