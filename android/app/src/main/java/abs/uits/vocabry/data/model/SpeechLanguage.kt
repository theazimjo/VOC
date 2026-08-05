package abs.uits.vocabry.data.model

/**
 * Mirrors src/utils/helpers.js's speechLanguages. A pack's `language` is set
 * once per pack and picks which locale/accent its words are spoken in during
 * practice.
 */
data class SpeechLanguage(
    val code: String,
    val label: String,
    val flag: String,
)

val SPEECH_LANGUAGES = listOf(
    SpeechLanguage("en-US", "Ingliz", "🇬🇧"),
    SpeechLanguage("es-ES", "Ispan", "🇪🇸"),
    SpeechLanguage("fr-FR", "Fransuz", "🇫🇷"),
    SpeechLanguage("de-DE", "Nemis", "🇩🇪"),
    SpeechLanguage("it-IT", "Italyan", "🇮🇹"),
    SpeechLanguage("pt-PT", "Portugal", "🇵🇹"),
    SpeechLanguage("ru-RU", "Rus", "🇷🇺"),
    SpeechLanguage("tr-TR", "Turk", "🇹🇷"),
    SpeechLanguage("ar-SA", "Arab", "🇸🇦"),
    SpeechLanguage("zh-CN", "Xitoy", "🇨🇳"),
    SpeechLanguage("ja-JP", "Yapon", "🇯🇵"),
    SpeechLanguage("ko-KR", "Koreys", "🇰🇷"),
    SpeechLanguage("uz-UZ", "O'zbek", "🇺🇿"),
)
