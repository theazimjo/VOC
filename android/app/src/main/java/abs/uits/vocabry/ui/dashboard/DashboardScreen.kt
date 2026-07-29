package abs.uits.vocabry.ui.dashboard

import abs.uits.vocabry.ui.components.BottomNavBar
import abs.uits.vocabry.ui.components.StatCard
import androidx.compose.foundation.border
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
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DashboardScreen(
    navController: NavController,
    viewModel: DashboardViewModel,
) {
    val state by viewModel.uiState.collectAsState()

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("VOCABRY", fontWeight = FontWeight.ExtraBold, letterSpacing = 1.sp) },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.background)
            )
        },
        bottomBar = { BottomNavBar(navController) }
    ) { padding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp),
        ) {
            // Classic Streak & Goal Header Card
            item {
                Card(
                    shape = RoundedCornerShape(14.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.primary),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(18.dp)) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween,
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Column {
                                Text(
                                    "🔥 Ketma-ketlik: ${state.streak.streakCount} kun",
                                    color = MaterialTheme.colorScheme.onPrimary,
                                    fontSize = 18.sp,
                                    fontWeight = FontWeight.ExtraBold
                                )
                                Spacer(Modifier.height(4.dp))
                                Text(
                                    "Bugungi maqsad: ${state.streak.todayCount}/${state.streak.dailyGoal} ta so'z",
                                    color = MaterialTheme.colorScheme.onPrimary.copy(alpha = 0.8f),
                                    fontSize = 13.sp
                                )
                            }
                            Surface(
                                shape = RoundedCornerShape(8.dp),
                                color = MaterialTheme.colorScheme.onPrimary.copy(alpha = 0.15f)
                            ) {
                                Text(
                                    "⚡ Active",
                                    color = MaterialTheme.colorScheme.onPrimary,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 11.sp,
                                    modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp)
                                )
                            }
                        }

                        Spacer(Modifier.height(14.dp))

                        val streakProgress = if (state.streak.dailyGoal > 0) {
                            (state.streak.todayCount.toFloat() / state.streak.dailyGoal).coerceIn(0f, 1f)
                        } else 0f

                        LinearProgressIndicator(
                            progress = { streakProgress },
                            color = MaterialTheme.colorScheme.onPrimary,
                            trackColor = MaterialTheme.colorScheme.onPrimary.copy(alpha = 0.25f),
                            strokeCap = StrokeCap.Round,
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(5.dp)
                                .clip(RoundedCornerShape(3.dp))
                        )
                    }
                }
            }

            // Quick Stats Grid
            item {
                Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                    StatCard(state.totalWords.toString(), "Jami so'z", modifier = Modifier.weight(1f))
                    StatCard(state.masteredWords.toString(), "O'zlashtirilgan", modifier = Modifier.weight(1f))
                    StatCard(state.dueCount.toString(), "Takrorlash", modifier = Modifier.weight(1f))
                }
            }

            // Mastery Percent Progress Card
            item {
                Card(
                    shape = RoundedCornerShape(12.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                    modifier = Modifier
                        .fillMaxWidth()
                        .border(
                            width = 1.dp,
                            color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.12f),
                            shape = RoundedCornerShape(12.dp)
                        )
                ) {
                    Column(Modifier.padding(16.dp)) {
                        Row(
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Text(
                                "🧠 O'zlashtirish darajasi",
                                fontWeight = FontWeight.Bold,
                                fontSize = 14.sp
                            )
                            Text(
                                "${state.masteryPercent}%",
                                fontWeight = FontWeight.ExtraBold,
                                fontSize = 16.sp,
                                color = MaterialTheme.colorScheme.primary
                            )
                        }
                        Spacer(Modifier.height(10.dp))
                        LinearProgressIndicator(
                            progress = { state.masteryPercent / 100f },
                            color = MaterialTheme.colorScheme.primary,
                            trackColor = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.12f),
                            strokeCap = StrokeCap.Round,
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(6.dp)
                                .clip(RoundedCornerShape(3.dp))
                        )
                    }
                }
            }

            // Practice CTA Button
            if (state.dueCount > 0) {
                item {
                    Button(
                        onClick = { navController.navigate("practice_due") },
                        shape = RoundedCornerShape(12.dp),
                        colors = ButtonDefaults.buttonColors(
                            containerColor = MaterialTheme.colorScheme.primary,
                            contentColor = MaterialTheme.colorScheme.onPrimary
                        ),
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(50.dp)
                    ) {
                        Text(
                            "⚡ Takrorlashni boshlash (${state.dueCount} ta so'z)",
                            fontSize = 15.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }

            // Due words header & items
            if (state.dueWords.isNotEmpty()) {
                item {
                    Text(
                        "📌 Bugun takrorlanishi kerak bo'lganlar",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold
                    )
                }

                items(state.dueWords) { info ->
                    Card(
                        shape = RoundedCornerShape(12.dp),
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                        modifier = Modifier
                            .fillMaxWidth()
                            .border(
                                width = 1.dp,
                                color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.1f),
                                shape = RoundedCornerShape(12.dp)
                            )
                    ) {
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(14.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Column {
                                Text(info.word.word, fontWeight = FontWeight.ExtraBold, fontSize = 15.sp)
                                Spacer(Modifier.height(2.dp))
                                Text(
                                    info.word.translation,
                                    fontSize = 12.sp,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                            }
                            Surface(
                                shape = RoundedCornerShape(6.dp),
                                color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.08f)
                            ) {
                                Text(
                                    "${info.recallPct}%",
                                    color = MaterialTheme.colorScheme.onSurface,
                                    fontWeight = FontWeight.ExtraBold,
                                    fontSize = 12.sp,
                                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}
