package abs.uits.vocabry.ui.theme

import android.app.Activity
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

private val DarkColorScheme = darkColorScheme(
    primary = Color(0xFF60A5FA),
    onPrimary = Color.Black,
    primaryContainer = Color(0xFF1E3A8A),
    onPrimaryContainer = Color.White,
    secondary = MutedBlueGrayText,
    onSecondary = Color.White,
    secondaryContainer = DarkSurface,
    onSecondaryContainer = Color.White,
    tertiary = RoyalBluePrimary,
    error = Color(0xFFEF4444),
    errorContainer = Color(0xFF450A0A),
    background = DarkBackground,
    onBackground = Color.White,
    surface = DarkSurface,
    onSurface = Color.White,
    surfaceVariant = Color(0xFF27272A),
    onSurfaceVariant = Color(0xFFA1A1AA)
)

private val LightColorScheme = lightColorScheme(
    primary = RoyalBluePrimary,
    onPrimary = Color.White,
    primaryContainer = SearchBgBlue,
    onPrimaryContainer = RoyalNavyText,
    secondary = MutedBlueGrayText,
    onSecondary = Color.White,
    secondaryContainer = FolderCardBlue,
    onSecondaryContainer = RoyalNavyText,
    tertiary = RoyalNavyText,
    error = Color(0xFFDC2626),
    errorContainer = Color(0xFFFEE2E2),
    background = SoftIceBackground,
    onBackground = RoyalNavyText,
    surface = CardWhite,
    onSurface = RoyalNavyText,
    surfaceVariant = SearchBgBlue,
    onSurfaceVariant = MutedBlueGrayText
)

@Composable
fun VocabryTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme
    val view = LocalView.current

    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = colorScheme.background.toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = !darkTheme
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
