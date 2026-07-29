package abs.uits.vocabry.ui.library

import abs.uits.vocabry.data.model.Folder
import abs.uits.vocabry.data.model.MarketPack
import abs.uits.vocabry.data.model.Pack
import abs.uits.vocabry.ui.components.BottomNavBar
import abs.uits.vocabry.ui.library.components.FolderFormDialog
import abs.uits.vocabry.ui.library.components.PackFormDialog
import abs.uits.vocabry.ui.theme.IOSBorderDark
import abs.uits.vocabry.ui.theme.IOSCardDark
import abs.uits.vocabry.ui.theme.IOSSegmentedTrack
import abs.uits.vocabry.ui.theme.IOSSystemBlue
import abs.uits.vocabry.ui.theme.IOSSystemGray
import abs.uits.vocabry.ui.theme.IOSTextWhite
import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.combinedClickable
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
import androidx.compose.foundation.lazy.grid.GridItemSpan
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.MoreVert
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Divider
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Snackbar
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
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
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LibraryScreen(
    navController: NavController,
    viewModel: LibraryViewModel,
) {
    val packs by viewModel.packs.collectAsState()
    val folders by viewModel.folders.collectAsState()
    val activeTab by viewModel.activeTab.collectAsState()
    val openFolderId by viewModel.openFolderId.collectAsState()

    val installingPackId by viewModel.installingPackId.collectAsState()
    val updatingPackId by viewModel.updatingPackId.collectAsState()
    val justInstalledIds by viewModel.justInstalledIds.collectAsState()
    val error by viewModel.error.collectAsState()

    var showPackForm by remember { mutableStateOf(false) }
    var editingPack by remember { mutableStateOf<Pack?>(null) }

    var showFolderForm by remember { mutableStateOf(false) }
    var editingFolder by remember { mutableStateOf<Folder?>(null) }

    val openFolder = openFolderId?.let { id -> folders.find { it.id == id } }

    val snackbarHostState = remember { SnackbarHostState() }
    LaunchedEffect(error) {
        if (error != null) {
            snackbarHostState.showSnackbar(error!!)
            viewModel.clearError()
        }
    }

    Scaffold(
        snackbarHost = {
            SnackbarHost(snackbarHostState) { data ->
                Snackbar(snackbarData = data, containerColor = MaterialTheme.colorScheme.errorContainer, contentColor = MaterialTheme.colorScheme.onErrorContainer)
            }
        },
        topBar = {
            TopAppBar(
                title = {
                    Text(
                        "📚 Kutubxona",
                        fontWeight = FontWeight.ExtraBold,
                        fontSize = 26.sp
                    )
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.background
                )
            )
        },
        bottomBar = { BottomNavBar(navController) },
        floatingActionButton = {
            if (activeTab == LibraryTab.MY_PACKS) {
                FloatingActionButton(
                    onClick = {
                        editingPack = null
                        showPackForm = true
                    },
                    containerColor = IOSSystemBlue,
                    contentColor = Color.White,
                    shape = CircleShape,
                    modifier = Modifier.size(56.dp)
                ) {
                    Icon(Icons.Filled.Add, contentDescription = "Yangi to'plam", modifier = Modifier.size(28.dp))
                }
            }
        },
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(horizontal = 16.dp)
            ) {
                MyPacksContent(
                    packs = packs,
                    folders = folders,
                    openFolder = openFolder,
                    getPackMastery = { viewModel.getPackMastery(it) },
                    onOpenFolder = { viewModel.openFolder(it) },
                    onCloseFolder = { viewModel.closeFolder() },
                    onPackClick = { navController.navigate("pack/${it.id}") },
                    onPackEdit = {
                        editingPack = it
                        showPackForm = true
                    },
                    onFolderAdd = {
                        editingFolder = null
                        showFolderForm = true
                    },
                    onFolderEdit = {
                        editingFolder = it
                        showFolderForm = true
                    }
                )
            }
        }
    }

    // Dialogs
    if (showPackForm || editingPack != null) {
        PackFormDialog(
            pack = editingPack,
            folders = folders,
            defaultFolderId = openFolderId,
            onDismiss = {
                showPackForm = false
                editingPack = null
            },
            onSave = { name, description, color, icon, level, folderId ->
                if (editingPack != null) {
                    viewModel.updatePack(editingPack!!.id, name, description, color, icon, level, folderId) {
                        showPackForm = false
                        editingPack = null
                    }
                } else {
                    viewModel.addPack(name, description, color, icon, level, folderId) {
                        showPackForm = false
                    }
                }
            },
            onDelete = editingPack?.let { packToDelete ->
                {
                    viewModel.deletePack(packToDelete.id) {
                        showPackForm = false
                        editingPack = null
                    }
                }
            }
        )
    }

    if (showFolderForm || editingFolder != null) {
        FolderFormDialog(
            folder = editingFolder,
            onDismiss = {
                showFolderForm = false
                editingFolder = null
            },
            onSave = { name, icon ->
                if (editingFolder != null) {
                    viewModel.updateFolder(editingFolder!!.id, name, icon) {
                        showFolderForm = false
                        editingFolder = null
                    }
                } else {
                    viewModel.addFolder(name, icon) {
                        showFolderForm = false
                    }
                }
            },
            onDelete = editingFolder?.let { folderToDelete ->
                {
                    viewModel.deleteFolder(folderToDelete.id) {
                        showFolderForm = false
                        editingFolder = null
                    }
                }
            }
        )
    }
}

@Composable
fun LibrarySegmentedTabs(
    activeTab: LibraryTab,
    packsCount: Int,
    marketCount: Int,
    onTabSelected: (LibraryTab) -> Unit,
) {
    Surface(
        shape = RoundedCornerShape(12.dp),
        color = IOSSegmentedTrack,
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp)
    ) {
        Row(
            modifier = Modifier.padding(3.dp),
            horizontalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            val librarySelected = activeTab == LibraryTab.MY_PACKS
            Surface(
                onClick = { onTabSelected(LibraryTab.MY_PACKS) },
                shape = RoundedCornerShape(9.dp),
                color = if (librarySelected) Color(0xFF3A3A3C) else Color.Transparent,
                modifier = Modifier.weight(1f)
            ) {
                Row(
                    horizontalArrangement = Arrangement.Center,
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.padding(vertical = 10.dp, horizontal = 8.dp)
                ) {
                    Text(
                        "🏠 Mening to'plamlarim",
                        fontWeight = if (librarySelected) FontWeight.Bold else FontWeight.Medium,
                        fontSize = 13.sp,
                        color = IOSTextWhite
                    )
                    if (packsCount > 0) {
                        Spacer(Modifier.width(6.dp))
                        Surface(
                            shape = CircleShape,
                            color = Color(0xFF48484A),
                        ) {
                            Text(
                                packsCount.toString(),
                                fontSize = 10.sp,
                                fontWeight = FontWeight.ExtraBold,
                                modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp),
                                color = IOSTextWhite
                            )
                        }
                    }
                }
            }

            val marketSelected = activeTab == LibraryTab.MARKET
            Surface(
                onClick = { onTabSelected(LibraryTab.MARKET) },
                shape = RoundedCornerShape(9.dp),
                color = if (marketSelected) Color(0xFF3A3A3C) else Color.Transparent,
                modifier = Modifier.weight(1f)
            ) {
                Row(
                    horizontalArrangement = Arrangement.Center,
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.padding(vertical = 10.dp, horizontal = 8.dp)
                ) {
                    Text(
                        "🛒 Market",
                        fontWeight = if (marketSelected) FontWeight.Bold else FontWeight.Medium,
                        fontSize = 13.sp,
                        color = if (marketSelected) IOSTextWhite else IOSSystemGray
                    )
                    Spacer(Modifier.width(6.dp))
                    Surface(
                        shape = CircleShape,
                        color = Color(0xFF48484A),
                    ) {
                        Text(
                            marketCount.toString(),
                            fontSize = 10.sp,
                            fontWeight = FontWeight.ExtraBold,
                            modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp),
                            color = IOSTextWhite
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun MyPacksContent(
    packs: List<Pack>,
    folders: List<Folder>,
    openFolder: Folder?,
    getPackMastery: (String) -> Int?,
    onOpenFolder: (String) -> Unit,
    onCloseFolder: () -> Unit,
    onPackClick: (Pack) -> Unit,
    onPackEdit: (Pack) -> Unit,
    onFolderAdd: () -> Unit,
    onFolderEdit: (Folder) -> Unit,
) {
    if (openFolder != null) {
        val folderPacks = packs.filter { it.folderId == openFolder.id }

        Column(modifier = Modifier.fillMaxSize()) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 12.dp)
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    TextButton(onClick = onCloseFolder) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Orqaga", modifier = Modifier.size(18.dp))
                        Spacer(Modifier.width(4.dp))
                        Text("Orqaga", fontWeight = FontWeight.SemiBold)
                    }
                    Spacer(Modifier.width(4.dp))
                    Text(
                        "${openFolder.icon} ${openFolder.name}",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis
                    )
                }
                IconButton(onClick = { onFolderEdit(openFolder) }) {
                    Icon(Icons.Filled.MoreVert, contentDescription = "Papkani tahrirlash")
                }
            }

            if (folderPacks.isEmpty()) {
                Box(
                    contentAlignment = Alignment.Center,
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(32.dp)
                ) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text("📦", fontSize = 48.sp)
                        Spacer(Modifier.height(8.dp))
                        Text(
                            "Bu papka hali bo'sh",
                            fontWeight = FontWeight.Bold,
                            style = MaterialTheme.typography.titleMedium
                        )
                        Text(
                            "Pastdagi + tugmasi bilan shu papkaga to'plam qo'shing.",
                            style = MaterialTheme.typography.bodySmall,
                            color = IOSSystemGray
                        )
                    }
                }
            } else {
                LazyVerticalGrid(
                    columns = GridCells.Fixed(2),
                    horizontalArrangement = Arrangement.spacedBy(10.dp),
                    verticalArrangement = Arrangement.spacedBy(10.dp),
                    contentPadding = PaddingValues(bottom = 80.dp),
                    modifier = Modifier.fillMaxSize()
                ) {
                    items(folderPacks) { pack ->
                        PackCardItem(
                            pack = pack,
                            masteryPercent = getPackMastery(pack.id),
                            onClick = { onPackClick(pack) },
                            onLongClick = { onPackEdit(pack) }
                        )
                    }
                }
            }
        }
    } else {
        val topLevelPacks = packs.filter { it.folderId == null }

        if (folders.isEmpty() && topLevelPacks.isEmpty()) {
            Box(
                contentAlignment = Alignment.Center,
                modifier = Modifier
                    .fillMaxSize()
                    .padding(32.dp)
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("📦", fontSize = 54.sp)
                    Spacer(Modifier.height(12.dp))
                    Text(
                        "To'plamlar topilmadi",
                        fontWeight = FontWeight.Bold,
                        style = MaterialTheme.typography.titleLarge
                    )
                    Spacer(Modifier.height(4.dp))
                    Text(
                        "Mavzular bo'yicha so'z to'plamlari yarating yoki ularni Marketdan yuklab oling.",
                        style = MaterialTheme.typography.bodyMedium,
                        color = IOSSystemGray
                    )
                }
            }
        } else {
            LazyVerticalGrid(
                columns = GridCells.Fixed(2),
                horizontalArrangement = Arrangement.spacedBy(10.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp),
                contentPadding = PaddingValues(bottom = 80.dp),
                modifier = Modifier.fillMaxSize()
            ) {
                // Right-aligned + Yangi papka header button
                item(span = { GridItemSpan(2) }) {
                    Row(
                        horizontalArrangement = Arrangement.End,
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        TextButton(
                            onClick = onFolderAdd,
                            contentPadding = PaddingValues(horizontal = 8.dp, vertical = 2.dp)
                        ) {
                            Text("+ Yangi papka", fontWeight = FontWeight.Bold, color = IOSSystemGray)
                        }
                    }
                }

                // Folders section
                items(folders) { folder ->
                    val packCount = packs.count { it.folderId == folder.id }
                    FolderCardItem(
                        folder = folder,
                        packCount = packCount,
                        onClick = { onOpenFolder(folder.id) },
                        onLongClick = { onFolderEdit(folder) }
                    )
                }

                // Top-level packs section
                items(topLevelPacks) { pack ->
                    PackCardItem(
                        pack = pack,
                        masteryPercent = getPackMastery(pack.id),
                        onClick = { onPackClick(pack) },
                        onLongClick = { onPackEdit(pack) }
                    )
                }
            }
        }
    }
}

@OptIn(ExperimentalFoundationApi::class)
@Composable
fun FolderCardItem(
    folder: Folder,
    packCount: Int,
    onClick: () -> Unit,
    onLongClick: () -> Unit,
) {
    Card(
        shape = RoundedCornerShape(18.dp),
        colors = CardDefaults.cardColors(containerColor = IOSCardDark),
        elevation = CardDefaults.cardElevation(defaultElevation = 0.dp),
        modifier = Modifier
            .fillMaxWidth()
            .height(185.dp)
            .border(
                width = 1.dp,
                color = IOSBorderDark,
                shape = RoundedCornerShape(18.dp)
            )
            .combinedClickable(
                onClick = onClick,
                onLongClick = onLongClick
            )
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(14.dp),
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            // Top Row
            Row(
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.Top,
                modifier = Modifier.fillMaxWidth()
            ) {
                Box(
                    contentAlignment = Alignment.Center,
                    modifier = Modifier
                        .size(46.dp)
                        .clip(RoundedCornerShape(12.dp))
                        .background(IOSSegmentedTrack)
                ) {
                    Text(folder.icon.ifEmpty { "📁" }, fontSize = 24.sp)
                }
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(
                        "$packCount ta to'plam",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        color = IOSSystemGray
                    )
                    IconButton(
                        onClick = onLongClick,
                        modifier = Modifier.size(24.dp)
                    ) {
                        Icon(Icons.Filled.MoreVert, contentDescription = "Papkani boshqarish", modifier = Modifier.size(16.dp), tint = IOSSystemGray)
                    }
                }
            }

            // Body
            Column {
                Text(
                    folder.name,
                    fontWeight = FontWeight.ExtraBold,
                    fontSize = 16.sp,
                    color = IOSTextWhite,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
                Spacer(Modifier.height(2.dp))
                Text(
                    "Papka — bir mavzudagi to'plamlar shu yerda",
                    fontSize = 11.sp,
                    color = IOSSystemGray,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis
                )
            }

            // Footer
            Column {
                HorizontalDivider(color = IOSBorderDark, thickness = 1.dp)
                Spacer(Modifier.height(8.dp))
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text(
                        "📁 Papkani ochish",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        color = IOSSystemGray
                    )
                    Text(
                        "→",
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold,
                        color = IOSSystemGray
                    )
                }
            }
        }
    }
}

@OptIn(ExperimentalFoundationApi::class)
@Composable
fun PackCardItem(
    pack: Pack,
    masteryPercent: Int?,
    onClick: () -> Unit,
    onLongClick: () -> Unit,
) {
    Card(
        shape = RoundedCornerShape(18.dp),
        colors = CardDefaults.cardColors(containerColor = IOSCardDark),
        elevation = CardDefaults.cardElevation(defaultElevation = 0.dp),
        modifier = Modifier
            .fillMaxWidth()
            .height(185.dp)
            .border(
                width = 1.dp,
                color = IOSBorderDark,
                shape = RoundedCornerShape(18.dp)
            )
            .combinedClickable(
                onClick = onClick,
                onLongClick = onLongClick
            )
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(14.dp),
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            // Top Row
            Row(
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.Top,
                modifier = Modifier.fillMaxWidth()
            ) {
                Box(
                    contentAlignment = Alignment.Center,
                    modifier = Modifier
                        .size(46.dp)
                        .clip(RoundedCornerShape(12.dp))
                        .background(IOSSegmentedTrack)
                ) {
                    Text(pack.icon.ifEmpty { "📦" }, fontSize = 24.sp)
                }
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(
                        "${pack.wordCount} ta so'z",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        color = IOSSystemGray
                    )
                    IconButton(
                        onClick = onLongClick,
                        modifier = Modifier.size(24.dp)
                    ) {
                        Icon(Icons.Filled.MoreVert, contentDescription = "Tahrirlash", modifier = Modifier.size(16.dp), tint = IOSSystemGray)
                    }
                }
            }

            // Body
            Column {
                Text(
                    pack.name,
                    fontWeight = FontWeight.ExtraBold,
                    fontSize = 16.sp,
                    color = IOSTextWhite,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
                if (pack.description.isNotBlank()) {
                    Spacer(Modifier.height(2.dp))
                    Text(
                        pack.description,
                        fontSize = 11.sp,
                        color = IOSSystemGray,
                        maxLines = 2,
                        overflow = TextOverflow.Ellipsis
                    )
                }
            }

            // Footer
            Column {
                HorizontalDivider(color = IOSBorderDark, thickness = 1.dp)
                Spacer(Modifier.height(8.dp))
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    if (masteryPercent != null && masteryPercent > 0) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier.weight(1f)
                        ) {
                            LinearProgressIndicator(
                                progress = { masteryPercent / 100f },
                                modifier = Modifier
                                    .weight(1f)
                                    .height(4.dp)
                                    .clip(CircleShape),
                                color = IOSSystemBlue,
                                trackColor = IOSSegmentedTrack,
                                strokeCap = StrokeCap.Round
                            )
                            Spacer(Modifier.width(6.dp))
                            Text(
                                "$masteryPercent%",
                                fontSize = 10.sp,
                                fontWeight = FontWeight.Bold,
                                color = IOSSystemGray
                            )
                        }
                    } else {
                        Text(
                            "✨ Yangi to'plam",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            color = IOSSystemGray,
                            modifier = Modifier.weight(1f)
                        )
                    }

                    Spacer(Modifier.width(4.dp))
                    Text(
                        "→",
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold,
                        color = IOSSystemGray
                    )
                }
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
        colors = CardDefaults.cardColors(containerColor = IOSCardDark),
        elevation = CardDefaults.cardElevation(defaultElevation = 0.dp),
        modifier = Modifier
            .fillMaxWidth()
            .border(1.dp, IOSBorderDark, RoundedCornerShape(16.dp))
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
                            .background(IOSSegmentedTrack)
                    ) {
                        Text(marketPack.icon, fontSize = 24.sp)
                    }
                    Spacer(Modifier.width(12.dp))
                    Column {
                        Text(
                            marketPack.name,
                            fontWeight = FontWeight.Bold,
                            style = MaterialTheme.typography.titleMedium,
                            color = IOSTextWhite
                        )
                        Spacer(Modifier.height(2.dp))
                        Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                            Surface(
                                shape = RoundedCornerShape(4.dp),
                                color = IOSSegmentedTrack
                            ) {
                                Text(
                                    marketPack.category,
                                    fontSize = 10.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = IOSTextWhite,
                                    modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                                )
                            }
                            Surface(
                                shape = RoundedCornerShape(4.dp),
                                color = Color(0xFFAF52DE).copy(alpha = 0.2f)
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
                color = IOSSystemGray,
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
                    color = IOSSystemGray
                )

                val warningColor = Color(0xFFFF9F0A)
                Button(
                    onClick = onAction,
                    enabled = !isInstalling && !isUpdating && (!isInstalled || hasUpdate),
                    colors = if (hasUpdate) {
                        ButtonDefaults.buttonColors(containerColor = warningColor, contentColor = Color.White)
                    } else if (isInstalled) {
                        ButtonDefaults.buttonColors(containerColor = IOSSegmentedTrack, contentColor = IOSSystemGray)
                    } else {
                        ButtonDefaults.buttonColors(containerColor = IOSSystemBlue, contentColor = Color.White)
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
