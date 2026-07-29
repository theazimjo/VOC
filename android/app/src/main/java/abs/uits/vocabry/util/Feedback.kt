package abs.uits.vocabry.util

import android.content.Context
import android.media.AudioAttributes
import android.media.AudioFormat
import android.media.AudioTrack
import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import kotlin.math.PI
import kotlin.math.abs
import kotlin.math.min
import kotlin.math.pow
import kotlin.math.sin

/**
 * Port of src/utils/feedback.js's playSound (Web Audio API synth tones) and
 * triggerVibration (navigator.vibrate patterns). Android has no Web Audio
 * equivalent, so tones are synthesized directly as PCM16 mono buffers with
 * the same frequencies/envelopes/durations and played via [AudioTrack].
 */
enum class FeedbackSound { CORRECT, WRONG, VICTORY }

object Feedback {

    /** Mirrors localStorage's voc-audio flag. */
    var audioEnabled: Boolean = true

    private const val SAMPLE_RATE = 44100

    fun playSound(type: FeedbackSound) {
        if (!audioEnabled) return
        runCatching {
            val samples = when (type) {
                FeedbackSound.CORRECT -> correctTone()
                FeedbackSound.WRONG -> wrongTone()
                FeedbackSound.VICTORY -> victoryTone()
            }
            playPcm(samples)
        }
    }

    fun triggerVibration(context: Context, type: FeedbackSound) {
        runCatching {
            val vibrator: Vibrator = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                (context.getSystemService(Context.VIBRATOR_MANAGER_SERVICE) as VibratorManager).defaultVibrator
            } else {
                @Suppress("DEPRECATION")
                context.getSystemService(Context.VIBRATOR_SERVICE) as Vibrator
            }
            val pattern = when (type) {
                FeedbackSound.CORRECT -> longArrayOf(0, 80)
                FeedbackSound.WRONG -> longArrayOf(0, 100, 60, 100)
                FeedbackSound.VICTORY -> longArrayOf(0, 120, 60, 120, 60, 250)
            }
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                vibrator.vibrate(VibrationEffect.createWaveform(pattern, -1))
            } else {
                @Suppress("DEPRECATION")
                vibrator.vibrate(pattern, -1)
            }
        }
    }

    private fun playPcm(samples: ShortArray) {
        val minBuf = AudioTrack.getMinBufferSize(SAMPLE_RATE, AudioFormat.CHANNEL_OUT_MONO, AudioFormat.ENCODING_PCM_16BIT)
        val track = AudioTrack.Builder()
            .setAudioAttributes(
                AudioAttributes.Builder()
                    .setUsage(AudioAttributes.USAGE_GAME)
                    .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                    .build()
            )
            .setAudioFormat(
                AudioFormat.Builder()
                    .setEncoding(AudioFormat.ENCODING_PCM_16BIT)
                    .setSampleRate(SAMPLE_RATE)
                    .setChannelMask(AudioFormat.CHANNEL_OUT_MONO)
                    .build()
            )
            .setBufferSizeInBytes(maxOf(minBuf, samples.size * 2))
            .setTransferMode(AudioTrack.MODE_STATIC)
            .build()
        track.write(samples, 0, samples.size)
        track.setNotificationMarkerPosition(samples.size)
        track.setPlaybackPositionUpdateListener(object : AudioTrack.OnPlaybackPositionUpdateListener {
            override fun onMarkerReached(t: AudioTrack?) {
                t?.release()
            }

            override fun onPeriodicNotification(t: AudioTrack?) {}
        })
        track.play()
    }

    /** Linear ramp 0->peak over [attack]s, then exponential decay to ~0 by [total]s. */
    private fun envelope(t: Double, peak: Double, attack: Double, total: Double): Double {
        if (t < attack) return peak * (t / attack)
        val decayDuration = total - attack
        if (decayDuration <= 0) return peak
        val decayT = (t - attack) / decayDuration
        // exponentialRampToValueAtTime(0.001, ...) analog
        return peak * (0.001 / peak).pow(decayT.coerceIn(0.0, 1.0))
    }

    /** Crisp pleasant synth arpeggio: sine C5->E5->G5, stepped like Web Audio's setValueAtTime. */
    private fun correctTone(): ShortArray {
        val total = 0.45
        val breakpoints = listOf(0.0 to 523.25, 0.06 to 659.25, 0.12 to 783.99)
        return synthesize(total) { t ->
            val freq = breakpoints.last { it.first <= t }.second
            val amp = envelope(t, peak = 0.6, attack = 0.04, total = 0.4)
            amp to freq
        }
    }

    /** Deep warning pitch drop: triangle wave, exponential glide 180Hz -> 90Hz. */
    private fun wrongTone(): ShortArray {
        val total = 0.35
        val rampDuration = 0.25
        return synthesizeTriangle(total) { t ->
            val rampT = min(t, rampDuration) / rampDuration
            val freq = 180.0 * (90.0 / 180.0).pow(rampT)
            val amp = envelope(t, peak = 0.7, attack = 0.05, total = 0.3)
            amp to freq
        }
    }

    /** Triumphant uplifting melody: two oscillators (triangle + sine at 1.5x), 5-note rise. */
    private fun victoryTone(): ShortArray {
        val total = 0.8
        val notes = listOf(261.63, 329.63, 392.00, 523.25, 659.25)
        val stepDuration = 0.08
        val n = (total * SAMPLE_RATE).toInt()
        val out = ShortArray(n)
        var phase1 = 0.0
        var phase2 = 0.0
        for (i in 0 until n) {
            val t = i.toDouble() / SAMPLE_RATE
            val noteIdx = (t / stepDuration).toInt().coerceIn(0, notes.size - 1)
            val freq1 = notes[noteIdx]
            val freq2 = freq1 * 1.5
            phase1 += 2 * PI * freq1 / SAMPLE_RATE
            phase2 += 2 * PI * freq2 / SAMPLE_RATE
            val amp = envelope(t, peak = 0.7, attack = 0.05, total = 0.7)
            val sample = amp * (triangleWave(phase1) * 0.5 + sin(phase2) * 0.5)
            out[i] = (sample.coerceIn(-1.0, 1.0) * Short.MAX_VALUE).toInt().toShort()
        }
        return out
    }

    private fun triangleWave(phase: Double): Double {
        val x = (phase / (2 * PI)) % 1.0
        val xn = if (x < 0) x + 1 else x
        return 4 * abs(xn - 0.5) - 1
    }

    private fun synthesize(totalSec: Double, sampleFn: (t: Double) -> Pair<Double, Double>): ShortArray {
        val n = (totalSec * SAMPLE_RATE).toInt()
        val out = ShortArray(n)
        var phase = 0.0
        for (i in 0 until n) {
            val t = i.toDouble() / SAMPLE_RATE
            val (amp, freq) = sampleFn(t)
            phase += 2 * PI * freq / SAMPLE_RATE
            out[i] = (amp * sin(phase) * Short.MAX_VALUE).toInt().toShort()
        }
        return out
    }

    private fun synthesizeTriangle(totalSec: Double, sampleFn: (t: Double) -> Pair<Double, Double>): ShortArray {
        val n = (totalSec * SAMPLE_RATE).toInt()
        val out = ShortArray(n)
        var phase = 0.0
        for (i in 0 until n) {
            val t = i.toDouble() / SAMPLE_RATE
            val (amp, freq) = sampleFn(t)
            phase += 2 * PI * freq / SAMPLE_RATE
            out[i] = (amp * triangleWave(phase) * Short.MAX_VALUE).toInt().toShort()
        }
        return out
    }
}
