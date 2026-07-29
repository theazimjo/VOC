package abs.uits.vocabry.ui.profile

import abs.uits.vocabry.engine.GeminiService
import android.content.Context
import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

class ProfileViewModel : ViewModel() {

    private val _apiKeyText = MutableStateFlow("")
    val apiKeyText: StateFlow<String> = _apiKeyText.asStateFlow()

    fun loadApiKey(context: Context) {
        _apiKeyText.value = GeminiService.getApiKey(context)
    }

    fun setApiKeyText(text: String) {
        _apiKeyText.value = text
    }

    fun saveApiKey(context: Context) {
        GeminiService.setApiKey(context, _apiKeyText.value)
    }
}
