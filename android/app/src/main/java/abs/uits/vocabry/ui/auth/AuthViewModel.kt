package abs.uits.vocabry.ui.auth

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import abs.uits.vocabry.data.repo.AuthRepository
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.firebase.auth.FirebaseUser
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import kotlinx.coroutines.flow.SharingStarted

/** Uzbek error-message mapping mirroring LoginPage.jsx's getFirebaseErrorMessage. */
fun firebaseErrorToUzbek(message: String?): String {
    val m = message.orEmpty()
    return when {
        "user-not-found" in m -> "Bunday foydalanuvchi topilmadi."
        "wrong-password" in m || "invalid-credential" in m -> "Email yoki parol noto'g'ri."
        "email-already-in-use" in m -> "Bu email allaqachon ro'yxatdan o'tgan."
        "weak-password" in m -> "Parol juda oddiy. Kamida 6ta belgidan foydalaning."
        "invalid-email" in m -> "Email manzili noto'g'ri."
        "network" in m -> "Internet aloqasi yo'q. Qayta urinib ko'ring."
        else -> "Xatolik yuz berdi. Qayta urinib ko'ring."
    }
}

class AuthViewModel(
    private val repo: AuthRepository = AuthRepository(),
) : ViewModel() {

    val user: StateFlow<FirebaseUser?> = repo.authState()
        .stateIn(viewModelScope, SharingStarted.Eagerly, repo.currentUser)

    private val _loading = MutableStateFlow(false)
    val loading: StateFlow<Boolean> = _loading.asStateFlow()

    private val _error = MutableStateFlow<String?>(null)
    val error: StateFlow<String?> = _error.asStateFlow()

    fun clearError() { _error.value = null }

    fun login(email: String, password: String) = runAuthAction {
        repo.login(email.trim(), password)
    }

    fun register(name: String, email: String, password: String) = runAuthAction {
        repo.register(email.trim(), password, name.trim())
    }

    fun signInWithGoogle(account: GoogleSignInAccount) = runAuthAction {
        repo.signInWithGoogle(account)
    }

    fun logout() = repo.logout()

    private fun runAuthAction(block: suspend () -> Unit) {
        _error.value = null
        _loading.value = true
        viewModelScope.launch {
            try {
                block()
            } catch (e: Exception) {
                _error.value = firebaseErrorToUzbek(e.message)
            } finally {
                _loading.value = false
            }
        }
    }
}
