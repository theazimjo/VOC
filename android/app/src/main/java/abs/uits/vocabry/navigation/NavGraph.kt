package abs.uits.vocabry.navigation

import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.lifecycle.viewmodel.viewModelFactory
import androidx.lifecycle.viewmodel.initializer
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import abs.uits.vocabry.ui.auth.AuthViewModel
import abs.uits.vocabry.ui.auth.LoginScreen
import abs.uits.vocabry.ui.auth.RegisterScreen
import abs.uits.vocabry.ui.dashboard.DashboardScreen
import abs.uits.vocabry.ui.dashboard.DashboardViewModel
import abs.uits.vocabry.ui.library.LibraryScreen
import abs.uits.vocabry.ui.library.LibraryViewModel
import abs.uits.vocabry.ui.library.PackDetailScreen
import abs.uits.vocabry.ui.library.PackDetailViewModel
import abs.uits.vocabry.ui.live.LiveScreen
import abs.uits.vocabry.ui.live.LiveViewModel
import abs.uits.vocabry.ui.practice.FlashcardScreen
import abs.uits.vocabry.ui.practice.IrregularVerbsScreen
import abs.uits.vocabry.ui.practice.IrregularVerbsViewModel
import abs.uits.vocabry.ui.practice.PracticeSource
import abs.uits.vocabry.ui.practice.PracticeViewModel
import abs.uits.vocabry.ui.practice.TrainerSubStep

@Composable
fun VocabryNavGraph() {
    val navController: NavHostController = rememberNavController()
    val authViewModel: AuthViewModel = viewModel(
        factory = viewModelFactory { initializer { AuthViewModel() } },
    )
    val user by authViewModel.user.collectAsState()

    NavHost(
        navController = navController,
        startDestination = if (user != null) "dashboard" else "login",
    ) {
        composable("login") {
            LoginScreen(
                viewModel = authViewModel,
                onNavigateToRegister = { navController.navigate("register") },
            )
        }
        composable("register") {
            RegisterScreen(
                viewModel = authViewModel,
                onNavigateToLogin = { navController.popBackStack() },
            )
        }
        composable("dashboard") {
            val vm: DashboardViewModel = viewModel(
                factory = viewModelFactory { initializer { DashboardViewModel() } },
            )
            DashboardScreen(navController, vm)
        }
        composable("library") {
            val vm: LibraryViewModel = viewModel(
                factory = viewModelFactory { initializer { LibraryViewModel() } },
            )
            LibraryScreen(navController, vm)
        }
        composable("live") {
            val vm: LiveViewModel = viewModel(
                factory = viewModelFactory { initializer { LiveViewModel() } },
            )
            LiveScreen(navController, vm)
        }
        composable(
            "pack/{packId}",
            arguments = listOf(navArgument("packId") { type = NavType.StringType }),
        ) { backStackEntry ->
            val packId = backStackEntry.arguments?.getString("packId") ?: return@composable
            val vm: PackDetailViewModel = viewModel(
                factory = viewModelFactory { initializer { PackDetailViewModel(packId) } },
            )
            PackDetailScreen(navController, packId, vm)
        }
        composable("practice_due") {
            val vm: PracticeViewModel = viewModel(
                factory = viewModelFactory { initializer { PracticeViewModel(PracticeSource.Due) } },
            )
            FlashcardScreen(navController, vm)
        }
        composable(
            "practice_pack/{packId}",
            arguments = listOf(navArgument("packId") { type = NavType.StringType }),
        ) { backStackEntry ->
            val packId = backStackEntry.arguments?.getString("packId") ?: return@composable
            val vm: PracticeViewModel = viewModel(
                factory = viewModelFactory { initializer { PracticeViewModel(PracticeSource.Pack(packId)) } },
            )
            FlashcardScreen(navController, vm)
        }
        composable(
            "irregular_verbs/{packId}/{subStep}",
            arguments = listOf(
                navArgument("packId") { type = NavType.StringType },
                navArgument("subStep") { type = NavType.StringType },
            ),
        ) { backStackEntry ->
            val packId = backStackEntry.arguments?.getString("packId") ?: return@composable
            val subStepArg = backStackEntry.arguments?.getString("subStep") ?: "study"
            val subStep = if (subStepArg == "practice") TrainerSubStep.PRACTICE else TrainerSubStep.STUDY
            val vm: IrregularVerbsViewModel = viewModel(
                factory = viewModelFactory { initializer { IrregularVerbsViewModel(packId, subStep) } },
            )
            IrregularVerbsScreen(navController, vm)
        }
    }
}
