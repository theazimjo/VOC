package abs.uits.vocabry.util

import android.content.Context
import android.speech.tts.TextToSpeech
import java.util.Locale

/**
 * App-wide singleton TextToSpeech instance.
 *
 * Constructing `TextToSpeech(context) { ... }` binds to the system TTS
 * service — a synchronous Binder IPC call on the calling thread that
 * measured ~500-600ms in practice (logcat: "PerfMonitor binderTransact:
 * time=613ms interface=android.speech.tts.ITextToSpeechService", with
 * "Choreographer: Skipped 30 frames!" right alongside it). PackDetailScreen
 * and FlashcardScreen used to each create their own instance in a
 * DisposableEffect, so every single pack/practice screen visit re-paid that
 * bind cost — the visible stutter on opening a pack. One shared instance
 * pays it once per app process; every screen just calls [speak].
 */
object TtsManager {
    private var tts: TextToSpeech? = null
    private var ready = false
    private val pending = mutableListOf<() -> Unit>()

    fun speak(context: Context, text: String, languageTag: String = "en-US") {
        if (text.isBlank()) return
        val instance = tts
        if (instance == null) {
            pending.add { speak(context, text, languageTag) }
            tts = TextToSpeech(context.applicationContext) { status ->
                ready = status == TextToSpeech.SUCCESS
                if (ready) {
                    val queued = pending.toList()
                    pending.clear()
                    queued.forEach { it() }
                }
            }
            return
        }
        if (!ready) {
            pending.add { speak(context, text, languageTag) }
            return
        }
        instance.language = Locale.forLanguageTag(languageTag)
        instance.speak(text, TextToSpeech.QUEUE_FLUSH, null, null)
    }
}
