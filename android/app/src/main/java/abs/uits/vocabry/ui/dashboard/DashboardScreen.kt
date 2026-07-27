package abs.uits.vocabry.ui.dashboard

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import abs.uits.vocabry.ui.components.BottomNavBar
import abs.uits.vocabry.ui.components.StatCard

@Composable
fun DashboardScreen(
    navController: NavController,
    viewModel: DashboardViewModel,
) {
    val state by viewModel.uiState.collectAsState()

    Scaffold(bottomBar = { BottomNavBar(navController) }) { padding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
        ) {
            item {
                Text("🔥 Ketma-ketlik: ${state.streak.streakCount} kun", style = MaterialTheme.typography.titleMedium)
                Text("Bugungi maqsad: ${state.streak.todayCount}/${state.streak.dailyGoal}", style = MaterialTheme.typography.bodySmall)
            }

            item {
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    StatCard(state.totalWords.toString(), "Jami so'z", MaterialTheme.colorScheme.primary, Modifier.weight(1f))
                    StatCard(state.masteredWords.toString(), "O'zlashtirilgan", Color(0xFF34D399), Modifier.weight(1f))
                    StatCard(state.dueCount.toString(), "Takrorlash", Color(0xFFF59E0B), Modifier.weight(1f))
                }
            }

            item {
                Card(modifier = Modifier.fillMaxWidth()) {
                    Column(Modifier.padding(16.dp)) {
                        Text("O'zlashtirish darajasi: ${state.masteryPercent}%")
                        Spacer(Modifier.height(8.dp))
                        LinearProgressIndicator(
                            progress = { state.masteryPercent / 100f },
                            modifier = Modifier.fillMaxWidth(),
                        )
                    }
                }
            }

            if (state.dueCount > 0) {
                item {
                    Button(
                        onClick = { navController.navigate("practice_due") },
                        modifier = Modifier.fillMaxWidth(),
                    ) {
                        Text("Takrorlashni boshlash (${state.dueCount} ta so'z)")
                    }
                }
            }

            item {
                Text("Bugun takrorlang", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
            }

            items(state.dueWords) { info ->
                val color = when {
                    info.recallPct < 50 -> Color(0xFFF87171)
                    info.recallPct < 75 -> Color(0xFFF59E0B)
                    else -> Color(0xFF34D399)
                }
                Card(modifier = Modifier.fillMaxWidth()) {
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(12.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                    ) {
                        Column {
                            Text(info.word.word, fontWeight = FontWeight.Bold)
                            Text(info.word.translation, style = MaterialTheme.typography.bodySmall)
                        }
                        Text("${info.recallPct}%", color = color, fontWeight = FontWeight.Bold)
                    }
                }
            }
        }
    }
}
