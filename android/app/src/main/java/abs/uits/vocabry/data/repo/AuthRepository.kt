package abs.uits.vocabry.data.repo

import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.firebase.auth.AuthCredential
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.auth.GoogleAuthProvider
import com.google.firebase.auth.userProfileChangeRequest
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ServerValue
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.tasks.await
import java.time.Instant

/**
 * Mirrors src/contexts/AuthContext.jsx: email/password + Google auth, plus
 * the `users/{uid}/profile` mirror and `users/{uid}/activity` bump that the
 * web app performs on every login.
 */
class AuthRepository(
    private val auth: FirebaseAuth = FirebaseAuth.getInstance(),
    private val db: FirebaseDatabase = FirebaseDatabase.getInstance(),
) {
    val currentUser: FirebaseUser? get() = auth.currentUser

    fun authState(): Flow<FirebaseUser?> = callbackFlow {
        val listener = FirebaseAuth.AuthStateListener { trySend(it.currentUser) }
        auth.addAuthStateListener(listener)
        awaitClose { auth.removeAuthStateListener(listener) }
    }

    suspend fun login(email: String, password: String) {
        auth.signInWithEmailAndPassword(email, password).await()
        onLoginSuccess()
    }

    suspend fun register(email: String, password: String, displayName: String) {
        val result = auth.createUserWithEmailAndPassword(email, password).await()
        result.user?.updateProfile(userProfileChangeRequest { this.displayName = displayName })?.await()
        onLoginSuccess()
    }

    suspend fun signInWithGoogle(account: GoogleSignInAccount) {
        val credential: AuthCredential = GoogleAuthProvider.getCredential(account.idToken, null)
        auth.signInWithCredential(credential).await()
        onLoginSuccess()
    }

    fun logout() {
        auth.signOut()
    }

    private suspend fun onLoginSuccess() {
        val user = auth.currentUser ?: return
        val profile = mapOf(
            "displayName" to (user.displayName ?: ""),
            "email" to (user.email ?: ""),
            "photoURL" to (user.photoUrl?.toString() ?: ""),
            "createdAt" to Instant.now().toString(),
        )
        db.reference.child("users").child(user.uid).child("profile").updateChildren(profile).await()
        db.reference.child("users").child(user.uid).child("activity").updateChildren(
            mapOf(
                "lastSeen" to Instant.now().toString(),
                "sessionCount" to ServerValue.increment(1),
            )
        ).await()
    }
}
