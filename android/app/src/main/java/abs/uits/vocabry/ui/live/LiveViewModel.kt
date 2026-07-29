package abs.uits.vocabry.ui.live

import abs.uits.vocabry.engine.GeminiService
import abs.uits.vocabry.engine.LiveChatMessage
import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class LiveViewModel : ViewModel() {

    private val _messages = MutableStateFlow<List<LiveChatMessage>>(
        listOf(
            LiveChatMessage(
                sender = "ai",
                text = "Hello! 👋 I'm your VOC AI Live Tutor. How can I help you practice your English vocabulary today?"
            )
        )
    )
    val messages: StateFlow<List<LiveChatMessage>> = _messages.asStateFlow()

    private val _inputText = MutableStateFlow("")
    val inputText: StateFlow<String> = _inputText.asStateFlow()

    private val _isAiThinking = MutableStateFlow(false)
    val isAiThinking: StateFlow<Boolean> = _isAiThinking.asStateFlow()

    private val _errorMsg = MutableStateFlow<String?>(null)
    val errorMsg: StateFlow<String?> = _errorMsg.asStateFlow()

    fun setInputText(text: String) {
        _inputText.value = text
    }

    fun sendMessage(context: Context, text: String = _inputText.value) {
        val trimmed = text.trim()
        if (trimmed.isBlank() || _isAiThinking.value) return

        val userMsg = LiveChatMessage(sender = "user", text = trimmed)
        val currentList = _messages.value + userMsg
        _messages.value = currentList
        _inputText.value = ""
        _errorMsg.value = null
        _isAiThinking.value = true

        viewModelScope.launch {
            try {
                val aiReplyText = GeminiService.sendLiveChatMessage(context, currentList, trimmed)
                val aiMsg = LiveChatMessage(sender = "ai", text = aiReplyText)
                _messages.value = _messages.value + aiMsg
            } catch (e: Exception) {
                _errorMsg.value = e.message ?: "Javob olishda xatolik yuz berdi"
            } finally {
                _isAiThinking.value = false
            }
        }
    }

    fun clearHistory() {
        _messages.value = listOf(
            LiveChatMessage(
                sender = "ai",
                text = "Suhbat tarixi tozalandi. Keling, ingliz tilini o'rganishni davom ettiramiz! 😊"
            )
        )
        _errorMsg.value = null
    }
}
