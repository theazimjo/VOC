package abs.uits.vocabry.data.model

data class MarketWord(
    val word: String,
    val translation: String,
    val definition: String = "",
    val example: String = "",
    val partOfSpeech: String = "noun",
    val notes: String = "",
    val v1: String? = null,
    val v2: String? = null,
    val v3: String? = null,
)

data class MarketPack(
    val id: String,
    val name: String,
    val description: String,
    val icon: String,
    val color: String,
    val level: String,
    val category: String,
    val words: List<MarketWord>,
    val isIrregularVerbs: Boolean = false,
)
