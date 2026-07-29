package abs.uits.vocabry.ui.theme

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.MenuBook
import androidx.compose.material.icons.filled.Article
import androidx.compose.material.icons.filled.Fastfood
import androidx.compose.material.icons.filled.FitnessCenter
import androidx.compose.material.icons.filled.Flight
import androidx.compose.material.icons.filled.Folder
import androidx.compose.material.icons.filled.FolderOpen
import androidx.compose.material.icons.filled.Inventory2
import androidx.compose.material.icons.filled.Label
import androidx.compose.material.icons.filled.Lightbulb
import androidx.compose.material.icons.filled.Movie
import androidx.compose.material.icons.filled.MusicNote
import androidx.compose.material.icons.filled.Palette
import androidx.compose.material.icons.filled.Public
import androidx.compose.material.icons.filled.RocketLaunch
import androidx.compose.material.icons.filled.School
import androidx.compose.material.icons.filled.Science
import androidx.compose.material.icons.filled.SportsEsports
import androidx.compose.material.icons.filled.SportsSoccer
import androidx.compose.material.icons.filled.Star
import androidx.compose.material.icons.filled.TrackChanges
import androidx.compose.material.icons.filled.Work
import androidx.compose.ui.graphics.vector.ImageVector

/**
 * Pack.icon / Folder.icon are emoji strings persisted in Firebase and shared
 * with the web app (see PackFormDialog.kt's PACK_ICONS / FolderFormDialog.kt's
 * FOLDER_ICONS — "Mirrors src/utils/helpers.js"). Changing what's *stored*
 * would break how the web app renders those same packs/folders, so this map
 * only changes how Android *displays* the existing emoji value — as a real
 * Material icon instead of the raw glyph. Unmapped/legacy emoji fall back to
 * a generic icon.
 */
private val PACK_AND_FOLDER_ICON_MAP: Map<String, ImageVector> = mapOf(
    "📦" to Icons.Filled.Inventory2,
    "🎯" to Icons.Filled.TrackChanges,
    "💼" to Icons.Filled.Work,
    "🌍" to Icons.Filled.Public,
    "🎓" to Icons.Filled.School,
    "💡" to Icons.Filled.Lightbulb,
    "🔬" to Icons.Filled.Science,
    "🎨" to Icons.Filled.Palette,
    "🏋️" to Icons.Filled.FitnessCenter,
    "✈️" to Icons.Filled.Flight,
    "🍔" to Icons.Filled.Fastfood,
    "🎮" to Icons.Filled.SportsEsports,
    "📰" to Icons.Filled.Article,
    "🎬" to Icons.Filled.Movie,
    "🎵" to Icons.Filled.MusicNote,
    "⚽" to Icons.Filled.SportsSoccer,
    "📁" to Icons.Filled.Folder,
    "📂" to Icons.Filled.FolderOpen,
    "📚" to Icons.AutoMirrored.Filled.MenuBook,
    "🌟" to Icons.Filled.Star,
    "🚀" to Icons.Filled.RocketLaunch,
    "🏷️" to Icons.Filled.Label,
)

private val FALLBACK_ICON: ImageVector = Icons.Filled.Folder

/** Resolve a persisted pack/folder emoji value to its Material icon for display. */
fun iconForPackOrFolder(emoji: String): ImageVector =
    PACK_AND_FOLDER_ICON_MAP[emoji] ?: FALLBACK_ICON
