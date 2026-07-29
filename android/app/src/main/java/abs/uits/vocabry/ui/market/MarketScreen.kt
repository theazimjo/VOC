package abs.uits.vocabry.ui.market

import abs.uits.vocabry.data.model.MarketPack
import abs.uits.vocabry.data.model.Pack
import abs.uits.vocabry.ui.components.BottomNavBar
import abs.uits.vocabry.ui.library.LibraryViewModel
import abs.uits.vocabry.ui.theme.BorderBlueLight
import abs.uits.vocabry.ui.theme.CardWhite
import abs.uits.vocabry.ui.theme.MutedBlueGrayText
import abs.uits.vocabry.ui.theme.RoyalBluePrimary
import abs.uits.vocabry.ui.theme.RoyalNavyText
import abs.uits.vocabry.ui.theme.SearchBgBlue
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
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
                title = {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Icon(Icons.Filled.ShoppingCart, contentDescription = null, tint = RoyalNavyText)
                        Spacer(Modifier.width(8.dp))
                        Text("So'zlik Marketi", fontWeight = FontWeight.ExtraBold, fontSize = 20.sp, color = RoyalNavyText)
                    }
                },
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

@Composable
fun MarketContent(
    marketPacks: List<MarketPack>,
    installingPackId: String?,
    updatingPackId: String?,
    justInstalledIds: Set<String>,
    findInstalledPack: (MarketPack) -> Pack?,
    getMissingWords: (MarketPack, Pack?) -> List<abs.uits.vocabry.data.model.MarketWord>,
    onInstall: (MarketPack) -> Unit,
    onUpdate: (MarketPack, Pack, List<abs.uits.vocabry.data.model.MarketWord>) -> Unit,
) {
    LazyVerticalGrid(
        columns = GridCells.Fixed(1),
        verticalArrangement = Arrangement.spacedBy(14.dp),
        contentPadding = PaddingValues(bottom = 80.dp),
        modifier = Modifier.fillMaxSize()
    ) {
        items(marketPacks) { pack ->
            val installedPack = findInstalledPack(pack)
            val isInstalled = installedPack != null || justInstalledIds.contains(pack.id)
            val isInstalling = installingPackId == pack.id
            val isUpdating = updatingPackId == pack.id
            val missingWords = getMissingWords(pack, installedPack)
            val hasUpdate = isInstalled && installedPack != null && missingWords.isNotEmpty()

            MarketPackCardItem(
                marketPack = pack,
                isInstalled = isInstalled,
                isInstalling = isInstalling,
                isUpdating = isUpdating,
                hasUpdate = hasUpdate,
                missingWordsCount = missingWords.size,
                onAction = {
                    if (hasUpdate && installedPack != null) {
                        onUpdate(pack, installedPack, missingWords)
                    } else if (!isInstalled) {
                        onInstall(pack)
                    }
                }
            )
        }
    }
}

@Composable
fun MarketPackCardItem(
    marketPack: MarketPack,
    isInstalled: Boolean,
    isInstalling: Boolean,
    isUpdating: Boolean,
    hasUpdate: Boolean,
    missingWordsCount: Int,
    onAction: () -> Unit,
) {
    Card(
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = CardWhite),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp),
        modifier = Modifier
            .fillMaxWidth()
            .border(1.dp, BorderBlueLight, RoundedCornerShape(16.dp))
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween,
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        contentAlignment = Alignment.Center,
                        modifier = Modifier
                            .size(46.dp)
                            .clip(RoundedCornerShape(12.dp))
                            .background(SearchBgBlue)
                    ) {
                        Text(marketPack.icon, fontSize = 24.sp)
                    }
                    Spacer(Modifier.width(12.dp))
                    Column {
                        Text(
                            marketPack.name,
                            fontWeight = FontWeight.Bold,
                            style = MaterialTheme.typography.titleMedium,
                            color = RoyalNavyText
                        )
                        Spacer(Modifier.height(2.dp))
                        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            Surface(
                                shape = RoundedCornerShape(4.dp),
                                color = SearchBgBlue
                            ) {
                                Text(
                                    marketPack.category,
                                    fontSize = 10.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = RoyalNavyText,
                                    modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                                )
                            }
                            Surface(
                                shape = RoundedCornerShape(4.dp),
                                color = Color(0xFFAF52DE).copy(alpha = 0.15f)
                            ) {
                                Text(
                                    marketPack.level,
                                    fontSize = 10.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = Color(0xFFAF52DE),
                                    modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                                )
                            }
                        }
                    }
                }
            }

            Spacer(Modifier.height(10.dp))

            Text(
                marketPack.description,
                style = MaterialTheme.typography.bodyMedium,
                color = MutedBlueGrayText,
                maxLines = 3,
                overflow = TextOverflow.Ellipsis
            )

            Spacer(Modifier.height(14.dp))

            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween,
                modifier = Modifier.fillMaxWidth()
            ) {
                Text(
                    "📊 ${marketPack.words.size} ta so'z",
                    style = MaterialTheme.typography.bodySmall,
                    fontWeight = FontWeight.Bold,
                    color = MutedBlueGrayText
                )

                val warningColor = Color(0xFFFF9F0A)
                Button(
                    onClick = onAction,
                    enabled = !isInstalling && !isUpdating && (!isInstalled || hasUpdate),
                    colors = if (hasUpdate) {
                        ButtonDefaults.buttonColors(containerColor = warningColor, contentColor = Color.White)
                    } else if (isInstalled) {
                        ButtonDefaults.buttonColors(containerColor = SearchBgBlue, contentColor = MutedBlueGrayText)
                    } else {
                        ButtonDefaults.buttonColors(containerColor = RoyalBluePrimary, contentColor = Color.White)
                    },
                    shape = RoundedCornerShape(10.dp),
                    contentPadding = PaddingValues(horizontal = 14.dp, vertical = 6.dp)
                ) {
                    if (isInstalling) {
                        CircularProgressIndicator(modifier = Modifier.size(16.dp), strokeWidth = 2.dp, color = Color.White)
                        Spacer(Modifier.width(6.dp))
                        Text("O'rnatilmoqda...", fontSize = 12.sp)
                    } else if (isUpdating) {
                        CircularProgressIndicator(modifier = Modifier.size(16.dp), strokeWidth = 2.dp, color = Color.White)
                        Spacer(Modifier.width(6.dp))
                        Text("Yangilanmoqda...", fontSize = 12.sp)
                    } else if (hasUpdate) {
                        Text("Yangilash (+$missingWordsCount) 🔄", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                    } else if (isInstalled) {
                        Text("O'rnatildi ✅", fontSize = 12.sp)
                    } else {
                        Text("Yuklab olish 📥", fontSize = 12.sp, fontWeight = FontWeight.Bold)
                    }
                }
            }
        }
    }
}
