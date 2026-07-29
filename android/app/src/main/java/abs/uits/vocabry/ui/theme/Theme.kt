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
    primary = IOSSystemBlue,
    onPrimary = IOSTextWhite,
    primaryContainer = IOSSegmentedTrack,
    onPrimaryContainer = IOSTextWhite,
    secondary = IOSSystemGray,
    onSecondary = IOSTextWhite,
    secondaryContainer = IOSCardDark,
    onSecondaryContainer = IOSTextWhite,
    tertiary = IOSSystemBlue,
    error = IOSSystemRed,
    errorContainer = Color(0xFF450A0A),
    background = IOSSystemBlack,
    onBackground = IOSTextWhite,
    surface = IOSCardDark,
    onSurface = IOSTextWhite,
    surfaceVariant = IOSSegmentedTrack,
    onSurfaceVariant = IOSSystemGray
)

private val LightColorScheme = lightColorScheme(
    primary = IOSSystemBlueLight,
    onPrimary = IOSTextWhite,
    primaryContainer = Color(0xFFE5E5EA),
    onPrimaryContainer = IOSSystemBlack,
    secondary = IOSSystemGray,
    onSecondary = IOSTextWhite,
    secondaryContainer = Color(0xFFF2F2F7),
    onSecondaryContainer = IOSSystemBlack,
    tertiary = IOSSystemBlueLight,
    error = IOSSystemRed,
    errorContainer = Color(0xFFFFE4E6),
    background = Color(0xFFF2F2F7),
    onBackground = IOSSystemBlack,
    surface = IOSTextWhite,
    onSurface = IOSSystemBlack,
    surfaceVariant = Color(0xFFE5E5EA),
    onSurfaceVariant = IOSSystemGray
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