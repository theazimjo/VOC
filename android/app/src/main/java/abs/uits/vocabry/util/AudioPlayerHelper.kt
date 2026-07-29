package abs.uits.vocabry.util

import android.content.Context
import android.media.MediaPlayer
import android.util.Base64
import java.io.File

object AudioPlayerHelper {
    private var mediaPlayer: MediaPlayer? = null

    fun playBase64Audio(context: Context, base64Audio: String?, onComplete: () -> Unit = {}) {
        if (base64Audio.isNullOrBlank()) {
            onComplete()
            return
        }

        try {
            stopAudio()

            val bytes = Base64.decode(base64Audio, Base64.DEFAULT)
            val tempFile = File.createTempFile("gemini_voice_", ".wav", context.cacheDir)
            tempFile.writeBytes(bytes)

            mediaPlayer = MediaPlayer().apply {
                setDataSource(tempFile.absolutePath)
                prepare()
                start()
                setOnCompletionListener {
                    stopAudio()
                    tempFile.delete()
                    onComplete()
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
            stopAudio()
            onComplete()
        }
    }

    fun stopAudio() {
        try {
            mediaPlayer?.stop()
            mediaPlayer?.release()
        } catch (e: Exception) {
            // ignore
        } finally {
            mediaPlayer = null
        }
    }
}
