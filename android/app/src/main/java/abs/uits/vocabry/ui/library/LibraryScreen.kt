package abs.uits.vocabry.ui.library

import abs.uits.vocabry.data.model.Folder
import abs.uits.vocabry.data.model.Pack
import abs.uits.vocabry.data.model.SPEECH_LANGUAGES
import abs.uits.vocabry.ui.components.BottomNavBar
import abs.uits.vocabry.ui.library.components.FolderFormDialog
import abs.uits.vocabry.ui.library.components.PackFormDialog
import abs.uits.vocabry.ui.theme.iconForPackOrFolder
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.background
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
import androidx.compose.foundation.layout.heightIn
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
import androidx.compose.material.icons.automirrored.filled.MenuBook
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material.icons.filled.Folder
import androidx.compose.material.icons.filled.MoreVert
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
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
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController

/**
 * Mirrors src/pages/LibraryPage.jsx + PackCard.jsx/FolderCard.jsx: folders and
 * packs share one card design in a single 2-column grid (web's `grid-cards`),
 * not a separate carousel + list. Sort order matches PacksContext.jsx
 * (createdAt desc, applied by PackRepository/FolderRepository already) —
 * no Android-only re-sorting here.
 */
@OptIn(ExperimentalMaterial3Api::class, ExperimentalFoundationApi::class)
@Composable
fun LibraryScreen(
    navController: NavController,
    viewModel: LibraryViewModel,
) {
    val packs by viewModel.packs.collectAsState()
    val folders by viewModel.folders.collectAsState()
    val openFolderId by viewModel.openFolderId.collectAsState()
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
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Surface(
                            shape = RoundedCornerShape(8.dp),
                            color = MaterialTheme.colorScheme.primaryContainer,
                            modifier = Modifier.size(34.dp)
                        ) {
                            Box(contentAlignment = Alignment.Center) {
                                Icon(
                                    Icons.AutoMirrored.Filled.MenuBook,
                                    contentDescription = null,
                                    tint = MaterialTheme.colorScheme.onPrimaryContainer,
                                    modifier = Modifier.size(18.dp)
                                )
                            }
                        }
                        Spacer(Modifier.width(10.dp))
                        Text(
                            "Library",
                            fontWeight = FontWeight.ExtraBold,
                            fontSize = 24.sp,
                            color = MaterialTheme.colorScheme.onBackground
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.background
                )
            )
        },
        bottomBar = { BottomNavBar(navController) },
        floatingActionButton = {
            FloatingActionButton(
                onClick = {
                    editingPack = null
                    showPackForm = true
                },
                containerColor = MaterialTheme.colorScheme.primary,
                contentColor = Color.White,
                shape = CircleShape,
                modifier = Modifier.size(56.dp)
            ) {
                Icon(Icons.Filled.Add, contentDescription = "Yangi to'plam", modifier = Modifier.size(28.dp))
            }
        },
    ) { padding ->
        val displayPacks = if (openFolder != null) {
            packs.filter { it.folderId == openFolder.id }
        } else {
            packs.filter { it.folderId == null }
        }
        val isEmpty = displayPacks.isEmpty() && (openFolder != null || folders.isEmpty())

        LazyVerticalGrid(
            columns = GridCells.Fixed(2),
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            contentPadding = PaddingValues(top = 12.dp, bottom = 80.dp)
        ) {
            if (openFolder != null) {
                // Folder detail header: back arrow, folder title, edit trigger — mirrors
                // .library-folder-detail-header.
                item(span = { GridItemSpan(maxLineSpan) }) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            TextButton(onClick = { viewModel.closeFolder() }) {
                                Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Orqaga", modifier = Modifier.size(18.dp))
                                Spacer(Modifier.width(4.dp))
                                Text("Orqaga", fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.primary)
                            }
                            Spacer(Modifier.width(4.dp))
                            Icon(
                                iconForPackOrFolder(openFolder.icon),
                                contentDescription = null,
                                modifier = Modifier.size(20.dp),
                                tint = MaterialTheme.colorScheme.onSurface
                            )
                            Spacer(Modifier.width(6.dp))
                            Text(
                                openFolder.name,
                                fontSize = 18.sp,
                                fontWeight = FontWeight.ExtraBold,
                                color = MaterialTheme.colorScheme.onSurface
                            )
                        }
                        IconButton(onClick = { editingFolder = openFolder; showFolderForm = true }) {
                            Icon(Icons.Filled.MoreVert, contentDescription = "Papkani tahrirlash", tint = MaterialTheme.colorScheme.onSurfaceVariant)
                        }
                    }
                }
            } else {
                // "+ Yangi papka" row above the grid — mirrors .library-folders-row-header.
                item(span = { GridItemSpan(maxLineSpan) }) {
                    Row(horizontalArrangement = Arrangement.End, modifier = Modifier.fillMaxWidth()) {
                        TextButton(onClick = { editingFolder = null; showFolderForm = true }) {
                            Text("+ Yangi papka", fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.primary)
                        }
                    }
                }

                items(folders) { folder ->
                    val packCount = packs.count { it.folderId == folder.id }
                    LibraryFolderCard(
                        folder = folder,
                        packCount = packCount,
                        onClick = { viewModel.openFolder(folder.id) },
                        onLongClick = { editingFolder = folder; showFolderForm = true }
                    )
                }
            }

            if (isEmpty) {
                item(span = { GridItemSpan(maxLineSpan) }) {
                    Box(
                        contentAlignment = Alignment.Center,
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 40.dp)
                    ) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text("📦", fontSize = 32.sp)
                            Spacer(Modifier.height(8.dp))
                            Text(
                                if (openFolder != null) "Bu papka hali bo'sh" else "To'plamlar topilmadi",
                                fontWeight = FontWeight.Bold,
                                fontSize = 14.sp,
                                color = MaterialTheme.colorScheme.onSurface
                            )
                            Text(
                                "Pastdagi + tugmasi bilan to'plam qo'shing.",
                                fontSize = 12.sp,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                    }
                }
            } else {
                items(displayPacks) { pack ->
                    LibraryPackCard(
                        pack = pack,
                        masteryPercent = viewModel.getPackMastery(pack.id),
                        onClick = { navController.navigate("pack/${pack.id}") },
                        onLongClick = { editingPack = pack; showPackForm = true }
                    )
                }
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
            onSave = { name, description, color, icon, level, folderId, language ->
                if (editingPack != null) {
                    viewModel.updatePack(editingPack!!.id, name, description, color, icon, level, folderId, language) {
                        showPackForm = false
                        editingPack = null
                    }
                } else {
                    viewModel.addPack(name, description, color, icon, level, folderId, language) {
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

/**
 * Shared grid-card shell for both folders and packs — mirrors the single
 * `.pack-card` class the web reuses for both (PackCard.jsx/FolderCard.jsx):
 * icon top-left, count/menu top-right, title+description in the middle,
 * a divider-topped footer slot at the bottom.
 */
@OptIn(ExperimentalFoundationApi::class)
@Composable
private fun LibraryGridCard(
    icon: ImageVector,
    topRight: @Composable () -> Unit,
    title: String,
    description: String,
    onClick: () -> Unit,
    onLongClick: () -> Unit,
    footer: @Composable () -> Unit,
) {
    Card(
        shape = RoundedCornerShape(20.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        elevation = CardDefaults.cardElevation(defaultElevation = 0.dp),
        border = BorderStroke(1.dp, MaterialTheme.colorScheme.surfaceVariant),
        modifier = Modifier
            .fillMaxWidth()
            .heightIn(min = 170.dp)
            .combinedClickable(onClick = onClick, onLongClick = onLongClick)
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp)
        ) {
            Row(
                verticalAlignment = Alignment.Top,
                horizontalArrangement = Arrangement.SpaceBetween,
                modifier = Modifier.fillMaxWidth()
            ) {
                Box(
                    contentAlignment = Alignment.Center,
                    modifier = Modifier
                        .size(48.dp)
                        .clip(RoundedCornerShape(14.dp))
                        .background(MaterialTheme.colorScheme.primaryContainer)
                ) {
                    Icon(icon, contentDescription = null, tint = MaterialTheme.colorScheme.onPrimaryContainer, modifier = Modifier.size(24.dp))
                }
                topRight()
            }

            Spacer(Modifier.height(10.dp))

            Column(modifier = Modifier.weight(1f)) {
                Text(
                    title,
                    fontWeight = FontWeight.Bold,
                    fontSize = 15.sp,
                    color = MaterialTheme.colorScheme.onSurface,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
                if (description.isNotBlank()) {
                    Spacer(Modifier.height(2.dp))
                    Text(
                        description,
                        fontSize = 12.sp,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        maxLines = 2,
                        overflow = TextOverflow.Ellipsis,
                        lineHeight = 15.sp
                    )
                }
            }

            Spacer(Modifier.height(10.dp))
            HorizontalDivider(color = MaterialTheme.colorScheme.surfaceVariant)
            Spacer(Modifier.height(8.dp))
            footer()
        }
    }
}

@Composable
private fun LibraryFolderCard(
    folder: Folder,
    packCount: Int,
    onClick: () -> Unit,
    onLongClick: () -> Unit,
) {
    LibraryGridCard(
        icon = iconForPackOrFolder(folder.icon),
        topRight = {
            Text("$packCount ta to'plam", fontSize = 11.sp, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurfaceVariant)
        },
        title = folder.name,
        description = "Papka — bir mavzudagi to'plamlar shu yerda",
        onClick = onClick,
        onLongClick = onLongClick,
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween,
            modifier = Modifier.fillMaxWidth()
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Filled.Folder, contentDescription = null, modifier = Modifier.size(14.dp), tint = MaterialTheme.colorScheme.onSurfaceVariant)
                Spacer(Modifier.width(4.dp))
                Text("Papkani ochish", fontSize = 12.sp, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
            Text("→", fontSize = 16.sp, color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
    }
}

@Composable
private fun LibraryPackCard(
    pack: Pack,
    masteryPercent: Int?,
    onClick: () -> Unit,
    onLongClick: () -> Unit,
) {
    val accent = runCatching { Color(android.graphics.Color.parseColor(pack.color)) }
        .getOrDefault(MaterialTheme.colorScheme.primary)

    LibraryGridCard(
        icon = iconForPackOrFolder(pack.icon),
        topRight = {
            Row(verticalAlignment = Alignment.CenterVertically) {
                if (pack.language.isNotBlank() && pack.language != "en-US") {
                    val flag = SPEECH_LANGUAGES.find { it.code == pack.language }?.flag
                    if (flag != null) {
                        Text(flag, fontSize = 13.sp)
                        Spacer(Modifier.width(4.dp))
                    }
                }
                Text("${pack.wordCount} ta so'z", fontSize = 11.sp, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        },
        title = pack.name,
        description = pack.description,
        onClick = onClick,
        onLongClick = onLongClick,
    ) {
        if (masteryPercent != null) {
            Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.fillMaxWidth()) {
                LinearProgressIndicator(
                    progress = { masteryPercent / 100f },
                    color = accent,
                    trackColor = MaterialTheme.colorScheme.surfaceVariant,
                    modifier = Modifier
                        .weight(1f)
                        .height(5.dp)
                        .clip(RoundedCornerShape(50)),
                )
                Spacer(Modifier.width(8.dp))
                Text(
                    "$masteryPercent%",
                    fontSize = 10.sp,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        } else {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Filled.AutoAwesome, contentDescription = null, modifier = Modifier.size(14.dp), tint = MaterialTheme.colorScheme.onSurfaceVariant)
                Spacer(Modifier.width(4.dp))
                Text("Yangi to'plam", fontSize = 12.sp, fontWeight = FontWeight.SemiBold, color = MaterialTheme.colorScheme.onSurfaceVariant)
            }
        }
    }
}
