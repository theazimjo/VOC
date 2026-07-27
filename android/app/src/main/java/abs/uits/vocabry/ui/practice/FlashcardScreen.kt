package abs.uits.vocabry.ui.practice

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.Card
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun FlashcardScreen(
    navController: NavController,
    viewModel: PracticeViewModel,
) {
    val state by viewModel.state.collectAsState()

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    if (!state.finished && state.queue.isNotEmpty()) {
                        Text("${state.currentIndex + 1} / ${state.queue.size}")
                    } else {
                        Text("Mashq")
                    }
                },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(Icons.Filled.ArrowBack, contentDescription = "Orqaga")
                    }
                },
            )
        },
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
        ) {
            when {
                state.loading -> CircularProgressIndicator()
                state.queue.isEmpty() -> Text("Bu bo'limda mashq qilinadigan so'zlar yo'q.")
                state.finished -> ResultsView(state)
                else -> FlashcardView(state, onFlip = viewModel::flipCard, onRate = viewModel::rate)
            }
        }
    }
}

@Composable
private fun FlashcardView(
    state: PracticeUiState,
    onFlip: () -> Unit,
    onRate: (String) -> Unit,
) {
    val word = state.currentWord ?: return

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .height(280.dp)
            .clickable { onFlip() },
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
        ) {
            if (!state.isFlipped) {
                Text(word.word, style = MaterialTheme.typography.headlineMedium, fontWeight = FontWeight.Bold)
                Spacer(Modifier.height(12.dp))
                Text("Javobni ko'rish uchun bosing", style = MaterialTheme.typography.bodySmall)
            } else {
                Text(word.translation, style = MaterialTheme.typography.headlineSmall, color = MaterialTheme.colorScheme.primary)
                if (word.definition.isNotBlank()) {
                    Spacer(Modifier.height(8.dp))
                    Text(word.definition, style = MaterialTheme.typography.bodySmall)
                }
                if (word.example.isNotBlank()) {
                    Spacer(Modifier.height(8.dp))
                    Text("\"${word.example}\"", style = MaterialTheme.typography.bodySmall)
                }
            }
        }
    }

    Spacer(Modifier.height(24.dp))

    if (state.isFlipped) {
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.fillMaxWidth()) {
            OutlinedButton(onClick = { onRate("again") }, modifier = Modifier.weight(1f)) { Text("Bilmadim") }
            OutlinedButton(onClick = { onRate("hard") }, modifier = Modifier.weight(1f)) { Text("Qiyin") }
            OutlinedButton(onClick = { onRate("good") }, modifier = Modifier.weight(1f)) { Text("Yaxshi") }
            OutlinedButton(onClick = { onRate("easy") }, modifier = Modifier.weight(1f)) { Text("Oson") }
        }
    }
}

@Composable
private fun ResultsView(state: PracticeUiState) {
    val total = state.correctCount + state.incorrectCount
    val pct = if (total > 0) (state.correctCount * 100) / total else 0

    Text("Sessiya yakunlandi!", style = MaterialTheme.typography.headlineSmall)
    Spacer(Modifier.height(12.dp))
    Text("$pct% to'g'ri javob", style = MaterialTheme.typography.titleLarge)
    Spacer(Modifier.height(8.dp))
    Text("✓ ${state.correctCount} to'g'ri   ✗ ${state.incorrectCount} xato")
}
