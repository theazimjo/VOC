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
    primary = MonoWhite,
    onPrimary = MonoBlack,
    primaryContainer = MonoDarkCharcoal,
    onPrimaryContainer = MonoWhite,
    secondary = ZincMutedTextDark,
    onSecondary = MonoBlack,
    secondaryContainer = ZincSurfaceDark,
    onSecondaryContainer = MonoWhite,
    tertiary = MonoWhite,
    error = Color(0xFFEF4444),
    errorContainer = Color(0xFF450A0A),
    background = Color(0xFF09090B), // Deep Charcoal Black
    onBackground = MonoWhite,
    surface = Color(0xFF121215),
    onSurface = MonoWhite,
    surfaceVariant = ZincSurfaceDark,
    onSurfaceVariant = ZincMutedTextDark
)

private val LightColorScheme = lightColorScheme(
    primary = MonoBlack,
    onPrimary = MonoWhite,
    primaryContainer = ZincSurfaceLight,
    onPrimaryContainer = MonoBlack,
    secondary = ZincMutedTextLight,
    onSecondary = MonoWhite,
    secondaryContainer = ZincSurfaceLight,
    onSecondaryContainer = MonoBlack,
    tertiary = MonoBlack,
    error = Color(0xFFDC2626),
    errorContainer = Color(0xFFFEE2E2),
    background = MonoWhite,
    onBackground = MonoBlack,
    surface = MonoWhite,
    onSurface = MonoBlack,
    surfaceVariant = ZincSurfaceLight,
    onSurfaceVariant = ZincMutedTextLight
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