package abs.uits.vocabry.engine

/**
 * Direct port of src/experiment/semanticClassifier.js — groups words into
 * semantic/POS clusters so [MemoryEngine.computeClusterCalibration] can
 * self-calibrate growth per cluster instead of one global formula.
 */
object SemanticClassifier {

    data class WordCluster(val key: String, val name: String, val icon: String)

    private data class Topic(
        val key: String,
        val name: String,
        val icon: String,
        val keywords: List<String>,
        val uzbekKeywords: List<String>,
    )

    private val TOPIC_CLUSTERS = listOf(
        Topic(
            key = "animals",
            name = "Hayvonlar & Tabiat",
            icon = "🦁",
            keywords = listOf(
                "dog", "cat", "bird", "fish", "animal", "horse", "wolf", "lion", "bear", "tiger",
                "elephant", "monkey", "snake", "rabbit", "duck", "cow", "sheep", "pig", "fox",
                "deer", "eagle", "tree", "plant", "flower", "forest", "nature", "river", "sea", "ocean",
            ),
            uzbekKeywords = listOf("it", "mushuk", "qush", "baliq", "hayvon", "ot", "bo'ri", "sher", "ayiq", "daraxt", "tabiat"),
        ),
        Topic(
            key = "tech",
            name = "Texnologiya & IT",
            icon = "💻",
            keywords = listOf(
                "code", "data", "system", "app", "software", "network", "tech", "web", "computer",
                "phone", "screen", "file", "server", "digital", "algorithm", "cloud", "user", "device",
            ),
            uzbekKeywords = listOf("tizim", "dastur", "tarmoq", "raqamli", "kompyuter", "kod", "algoritm"),
        ),
        Topic(
            key = "business",
            name = "Biznes & Moliya",
            icon = "💼",
            keywords = listOf(
                "money", "pay", "bank", "price", "cost", "market", "trade", "business", "company",
                "profit", "sale", "tax", "finance", "boss", "office", "contract", "job", "work", "customer",
            ),
            uzbekKeywords = listOf("pudrat", "pul", "bank", "narx", "bozor", "biznes", "kompaniya", "foyda", "soliq", "ish"),
        ),
        Topic(
            key = "food",
            name = "Taomlar & Ichimliklar",
            icon = "🍎",
            keywords = listOf(
                "apple", "food", "eat", "drink", "water", "bread", "meat", "fruit", "vegetable",
                "milk", "coffee", "tea", "sugar", "salt", "cook", "restaurant", "dinner", "lunch",
            ),
            uzbekKeywords = listOf("olma", "ovqat", "ichimlik", "suv", "non", "go'sht", "meva", "choy", "kofe", "tuz"),
        ),
        Topic(
            key = "time",
            name = "Vaqt & Harakat",
            icon = "⏰",
            keywords = listOf(
                "time", "day", "night", "week", "month", "year", "hour", "minute", "today",
                "tomorrow", "yesterday", "future", "past", "clock", "season", "summer", "winter",
            ),
            uzbekKeywords = listOf("vaqt", "kun", "tungi", "hafta", "oy", "yil", "soat", "bugun", "ertaga", "kecha"),
        ),
    )

    /** Classify a word into a semantic cluster based on English word + Uzbek translation. */
    fun classifyWord(word: String = "", translation: String = "", packName: String = ""): WordCluster {
        val w = word.trim().lowercase()
        val tr = translation.trim().lowercase()
        val pName = packName.trim()

        // 1. If packName is specific (not 'General' or 'Kutubxona'), use user's pack
        if (pName.isNotEmpty() && pName != "Kutubxona" && pName != "General" && pName != "To'plam") {
            return WordCluster(
                key = "pack_${pName.lowercase().replace(Regex("\\s+"), "_")}",
                name = pName,
                icon = "📦",
            )
        }

        // 2. Check Action Verbs (Fe'llar)
        if (
            w.startsWith("to ") ||
            tr.endsWith("moq") ||
            tr.endsWith("ish") ||
            w.endsWith("ize") ||
            w.endsWith("ise") ||
            w.endsWith("ate") ||
            w.endsWith("fy")
        ) {
            return WordCluster("pos_verbs", "Fe'llar (Action Verbs)", "⚡")
        }

        // 3. Check Adjectives (Sifatlar / Tasviriy)
        if (
            w.endsWith("ful") ||
            w.endsWith("able") ||
            w.endsWith("ible") ||
            w.endsWith("ous") ||
            w.endsWith("ive") ||
            w.endsWith("less") ||
            w.endsWith("ic") ||
            w.endsWith("al") ||
            w.endsWith("ent") ||
            w.endsWith("ant") ||
            tr.endsWith("li") ||
            tr.endsWith("siz")
        ) {
            return WordCluster("pos_adjectives", "Sifatlar (Adjectives)", "🎨")
        }

        // 4. Check Adverbs (Ravishlar)
        if (w.endsWith("ly")) {
            return WordCluster("pos_adverbs", "Ravishlar (Adverbs)", "🚀")
        }

        // 5. Check Topic Keywords
        for (topic in TOPIC_CLUSTERS) {
            if (topic.keywords.any { w.contains(it) } || topic.uzbekKeywords.any { tr.contains(it) }) {
                return WordCluster(topic.key, topic.name, topic.icon)
            }
        }

        // 6. Default: Otlar & Tushunchalar (General Nouns)
        return WordCluster("pos_nouns", "Otlar & Tushunchalar", "💎")
    }
}
