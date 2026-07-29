package abs.uits.vocabry.ui.profile

import abs.uits.vocabry.ui.auth.AuthViewModel
import abs.uits.vocabry.ui.components.BottomNavBar
import abs.uits.vocabry.ui.components.StatCard
import abs.uits.vocabry.ui.dashboard.DashboardViewModel
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProfileScreen(
    navController: NavController,
    authViewModel: AuthViewModel,
    dashboardViewModel: DashboardViewModel,
    profileViewModel: ProfileViewModel
) {
    val context = LocalContext.current
    val currentUser = Firebase.auth.currentUser
    val dashState by dashboardViewModel.uiState.collectAsState()
    val apiKeyText by profileViewModel.apiKeyText.collectAsState()

    var savedMessage by remember { mutableStateOf<String?>(null) }

    LaunchedEffect(Unit) {
        profileViewModel.loadApiKey(context)
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("👤 Mening Profilim", fontWeight = FontWeight.ExtraBold, fontSize = 20.sp) },
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
            verticalArrangement = Arrangement.spacedBy(14.dp)
        ) {
            // User Info Banner Card
            item {
                Card(
                    shape = RoundedCornerShape(16.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                    modifier = Modifier
                        .fillMaxWidth()
                        .border(
                            width = 1.dp,
                            color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.12f),
                            shape = RoundedCornerShape(16.dp)
                        )
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(18.dp)
                    ) {
                        Box(
                            contentAlignment = Alignment.Center,
                            modifier = Modifier
                                .size(56.dp)
                                .clip(CircleShape)
                                .background(MaterialTheme.colorScheme.primary)
                        ) {
                            Text(
                                currentUser?.email?.take(1)?.uppercase() ?: "U",
                                fontSize = 24.sp,
                                fontWeight = FontWeight.ExtraBold,
                                color = MaterialTheme.colorScheme.onPrimary
                            )
                        }

                        Spacer(Modifier.width(14.dp))

                        Column {
                            Text(
                                currentUser?.email?.substringBefore("@") ?: "Foydalanuvchi",
                                fontWeight = FontWeight.ExtraBold,
                                fontSize = 18.sp
                            )
                            Spacer(Modifier.height(2.dp))
                            Text(
                                currentUser?.email ?: "email@domain.com",
                                fontSize = 12.sp,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                    }
                }
            }

            // Quick Stats Grid
            item {
                Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                    StatCard(dashState.totalWords.toString(), "Jami so'z", modifier = Modifier.weight(1f))
                    StatCard(dashState.masteredWords.toString(), "O'zlashtirilgan", modifier = Modifier.weight(1f))
                    StatCard("${dashState.masteryPercent}%", "O'zlashtirish", modifier = Modifier.weight(1f))
                }
            }

            // Gemini API Key Settings Card
            item {
                Card(
                    shape = RoundedCornerShape(14.dp),
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                    modifier = Modifier
                        .fillMaxWidth()
                        .border(
                            width = 1.dp,
                            color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.12f),
                            shape = RoundedCornerShape(14.dp)
                        )
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Text(
                            "🔑 Gemini AI API Kaliti",
                            fontWeight = FontWeight.ExtraBold,
                            fontSize = 15.sp
                        )
                        Spacer(Modifier.height(4.dp))
                        Text(
                            "So'zlarga ta'rif va tarjimalarni avto-to'ldirish uchun Google AI Studio API kalitingiz:",
                            fontSize = 12.sp,
                            color = MaterialTheme.colorScheme.onSurfaceVariant
                        )
                        Spacer(Modifier.height(10.dp))

                        Row(verticalAlignment = Alignment.CenterVertically) {
                            OutlinedTextField(
                                value = apiKeyText,
                                onValueChange = { profileViewModel.setApiKeyText(it) },
                                placeholder = { Text("API Key...") },
                                singleLine = true,
                                modifier = Modifier.weight(1f)
                            )
                            Spacer(Modifier.width(8.dp))
                            Button(
                                onClick = {
                                    profileViewModel.saveApiKey(context)
                                    savedMessage = "✅ Kalit saqlandi!"
                                },
                                shape = RoundedCornerShape(10.dp)
                            ) {
                                Text("Saqlash", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                            }
                        }

                        if (savedMessage != null) {
                            Spacer(Modifier.height(6.dp))
                            Text(
                                savedMessage!!,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold,
                                color = MaterialTheme.colorScheme.primary
                            )
                        }
                    }
                }
            }

            // Sign Out CTA
            item {
                Spacer(Modifier.height(8.dp))
                OutlinedButton(
                    onClick = { authViewModel.logout() },
                    shape = RoundedCornerShape(12.dp),
                    colors = ButtonDefaults.outlinedButtonColors(contentColor = MaterialTheme.colorScheme.error),
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(48.dp)
                ) {
                    Text("🔴 Hisobdan chiqish (Sign Out)", fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}
