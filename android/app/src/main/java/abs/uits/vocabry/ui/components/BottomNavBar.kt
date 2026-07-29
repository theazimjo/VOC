package abs.uits.vocabry.ui.components

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.MenuBook
import androidx.compose.material.icons.filled.List
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import androidx.navigation.NavDestination.Companion.hierarchy
import androidx.navigation.compose.currentBackStackEntryAsState

@Composable
fun BottomNavBar(navController: NavController) {
    val backStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = backStackEntry?.destination

    // Colors are intentionally left at M3 defaults so the bar always follows
    // the app's active color scheme (see ui/theme/Theme.kt) instead of a
    // hardcoded palette that would go stale if the theme changes.
    NavigationBar(
        containerColor = MaterialTheme.colorScheme.surface,
        tonalElevation = 8.dp,
        modifier = Modifier.shadow(12.dp)
    ) {
        // Tab 1: Library
        NavigationBarItem(
            selected = currentRoute?.hierarchy?.any { it.route == "library" } == true,
            onClick = {
                navController.navigate("library") {
                    popUpTo("library") { inclusive = true }
                }
            },
            icon = { Icon(Icons.Filled.List, contentDescription = "Library") },
            label = {
                Text(
                    "Library",
                    fontSize = 11.sp,
                    fontWeight = if (currentRoute?.hierarchy?.any { it.route == "library" } == true) FontWeight.Bold else FontWeight.Medium
                )
            }
        )

        // Tab 2: Market
        NavigationBarItem(
            selected = currentRoute?.hierarchy?.any { it.route == "market" } == true,
            onClick = {
                navController.navigate("market") {
                    popUpTo("library")
                }
            },
            icon = { Icon(Icons.Filled.ShoppingCart, contentDescription = "Market") },
            label = {
                Text(
                    "Market",
                    fontSize = 11.sp,
                    fontWeight = if (currentRoute?.hierarchy?.any { it.route == "market" } == true) FontWeight.Bold else FontWeight.Medium
                )
            }
        )

        // Tab 3: Grammatika
        NavigationBarItem(
            selected = currentRoute?.hierarchy?.any { it.route == "grammar" } == true,
            onClick = {
                navController.navigate("grammar") {
                    popUpTo("library")
                }
            },
            icon = { Icon(Icons.AutoMirrored.Filled.MenuBook, contentDescription = "Grammatika") },
            label = {
                Text(
                    "Grammatika",
                    fontSize = 11.sp,
                    fontWeight = if (currentRoute?.hierarchy?.any { it.route == "grammar" } == true) FontWeight.Bold else FontWeight.Medium
                )
            }
        )

        // Tab 4: Profil
        NavigationBarItem(
            selected = currentRoute?.hierarchy?.any { it.route == "profile" } == true,
            onClick = {
                navController.navigate("profile") {
                    popUpTo("library")
                }
            },
            icon = { Icon(Icons.Filled.Person, contentDescription = "Profil") },
            label = {
                Text(
                    "Profil",
                    fontSize = 11.sp,
                    fontWeight = if (currentRoute?.hierarchy?.any { it.route == "profile" } == true) FontWeight.Bold else FontWeight.Medium
                )
            }
        )
    }
}
