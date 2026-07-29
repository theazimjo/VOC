package abs.uits.vocabry.ui.components

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.List
import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import androidx.navigation.NavDestination.Companion.hierarchy
import androidx.navigation.compose.currentBackStackEntryAsState

@Composable
fun BottomNavBar(navController: NavController) {
    val backStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = backStackEntry?.destination

    NavigationBar {
        NavigationBarItem(
            selected = currentRoute?.hierarchy?.any { it.route == "dashboard" } == true,
            onClick = {
                navController.navigate("dashboard") {
                    popUpTo("dashboard") { inclusive = true }
                }
            },
            icon = { Icon(Icons.Filled.Home, contentDescription = "Dashboard") },
            label = { Text("Bosh sahifa") },
        )
        NavigationBarItem(
            selected = currentRoute?.hierarchy?.any { it.route == "library" } == true,
            onClick = {
                navController.navigate("library") {
                    popUpTo("dashboard")
                }
            },
            icon = { Icon(Icons.Filled.List, contentDescription = "Kutubxona") },
            label = { Text("Kutubxona") },
        )
    }
}
