package abs.uits.vocabry.ui.components

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.List
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
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

    NavigationBar(
        containerColor = MaterialTheme.colorScheme.surface,
        tonalElevation = 8.dp,
        modifier = Modifier.shadow(12.dp)
    ) {
        // Tab 1: Kutubxona
        NavigationBarItem(
            selected = currentRoute?.hierarchy?.any { it.route == "library" } == true,
            onClick = {
                navController.navigate("library") {
                    popUpTo("library") { inclusive = true }
                }
            },
            icon = { Icon(Icons.Filled.List, contentDescription = "Kutubxona") },
            label = {
                Text(
                    "Kutubxona",
                    fontSize = 11.sp,
                    fontWeight = if (currentRoute?.hierarchy?.any { it.route == "library" } == true) FontWeight.Bold else FontWeight.Medium
                )
            },
            colors = NavigationBarItemDefaults.colors(
                selectedIconColor = MaterialTheme.colorScheme.primary,
                selectedTextColor = MaterialTheme.colorScheme.primary,
                indicatorColor = MaterialTheme.colorScheme.primaryContainer,
                unselectedIconColor = MaterialTheme.colorScheme.onSurfaceVariant,
                unselectedTextColor = MaterialTheme.colorScheme.onSurfaceVariant
            )
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
            },
            colors = NavigationBarItemDefaults.colors(
                selectedIconColor = MaterialTheme.colorScheme.primary,
                selectedTextColor = MaterialTheme.colorScheme.primary,
                indicatorColor = MaterialTheme.colorScheme.primaryContainer,
                unselectedIconColor = MaterialTheme.colorScheme.onSurfaceVariant,
                unselectedTextColor = MaterialTheme.colorScheme.onSurfaceVariant
            )
        )

        // Tab 3: Grammatika
        NavigationBarItem(
            selected = currentRoute?.hierarchy?.any { it.route == "grammar" } == true,
            onClick = {
                navController.navigate("grammar") {
                    popUpTo("library")
                }
            },
            icon = { Text("📖", fontSize = 18.sp) },
            label = {
                Text(
                    "Grammatika",
                    fontSize = 11.sp,
                    fontWeight = if (currentRoute?.hierarchy?.any { it.route == "grammar" } == true) FontWeight.Bold else FontWeight.Medium
                )
            },
            colors = NavigationBarItemDefaults.colors(
                selectedIconColor = MaterialTheme.colorScheme.primary,
                selectedTextColor = MaterialTheme.colorScheme.primary,
                indicatorColor = MaterialTheme.colorScheme.primaryContainer,
                unselectedIconColor = MaterialTheme.colorScheme.onSurfaceVariant,
                unselectedTextColor = MaterialTheme.colorScheme.onSurfaceVariant
            )
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
            },
            colors = NavigationBarItemDefaults.colors(
                selectedIconColor = MaterialTheme.colorScheme.primary,
                selectedTextColor = MaterialTheme.colorScheme.primary,
                indicatorColor = MaterialTheme.colorScheme.primaryContainer,
                unselectedIconColor = MaterialTheme.colorScheme.onSurfaceVariant,
                unselectedTextColor = MaterialTheme.colorScheme.onSurfaceVariant
            )
        )
    }
}
