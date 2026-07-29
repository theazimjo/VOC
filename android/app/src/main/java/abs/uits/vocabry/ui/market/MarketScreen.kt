package abs.uits.vocabry.ui.market

import abs.uits.vocabry.ui.components.BottomNavBar
import abs.uits.vocabry.ui.library.LibraryViewModel
import abs.uits.vocabry.ui.library.MarketContent
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MarketScreen(
    navController: NavController,
    viewModel: LibraryViewModel
) {
    val installingPackId by viewModel.installingPackId.collectAsState()
    val updatingPackId by viewModel.updatingPackId.collectAsState()
    val justInstalledIds by viewModel.justInstalledIds.collectAsState()

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("🛒 So'zlik Marketi", fontWeight = FontWeight.ExtraBold, fontSize = 20.sp) },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = MaterialTheme.colorScheme.background)
            )
        },
        bottomBar = { BottomNavBar(navController) }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(horizontal = 16.dp, vertical = 8.dp)
            ) {
                MarketContent(
                    marketPacks = viewModel.marketPacks,
                    installingPackId = installingPackId,
                    updatingPackId = updatingPackId,
                    justInstalledIds = justInstalledIds,
                    findInstalledPack = { viewModel.findInstalledPack(it) },
                    getMissingWords = { mp, ip -> viewModel.getMissingMarketWords(mp, ip) },
                    onInstall = { viewModel.installMarketPack(it) },
                    onUpdate = { mp, ip, mw -> viewModel.updateMarketPack(mp, ip, mw) }
                )
            }
        }
    }
}
