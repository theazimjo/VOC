package abs.uits.vocabry.util

import java.time.Instant
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import java.time.temporal.ChronoUnit

/**
 * Port of src/utils/helpers.js's formatDate — relative-day label for a
 * pack/word's last activity, in Uzbek. Used wherever the web shows
 * "Bugun" / "N kun oldin" and Android needs the same wording.
 */
fun formatRelativeDate(dateStr: String?): String? {
    if (dateStr.isNullOrBlank()) return null
    val date = runCatching { Instant.parse(dateStr) }.getOrNull() ?: return null
    val days = ChronoUnit.DAYS.between(date, Instant.now())

    return when {
        days <= 0 -> "Bugun"
        days == 1L -> "Kecha"
        days < 7 -> "$days kun oldin"
        days < 30 -> "${days / 7} hafta oldin"
        days < 365 -> "${days / 30} oy oldin"
        else -> DateTimeFormatter.ofPattern("dd.MM.yyyy").withZone(ZoneId.systemDefault()).format(date)
    }
}
