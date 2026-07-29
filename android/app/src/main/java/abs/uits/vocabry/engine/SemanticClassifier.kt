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
        Topic(
            key = "travel",
            name = "Sayohat & Transport",
            icon = "✈️",
            keywords = listOf(
                "travel", "trip", "journey", "airport", "flight", "airplane", "passport", "ticket",
                "hotel", "tourist", "luggage", "visa", "train", "station", "map", "vacation",
                "holiday", "destination", "border", "road", "car", "bus", "taxi",
            ),
            uzbekKeywords = listOf("sayohat", "parvoz", "chipta", "mehmonxona", "sayyoh", "viza", "poyezd", "bekat", "ta'til", "chegara"),
        ),
        Topic(
            key = "emotions",
            name = "His-tuyg'ular",
            icon = "😊",
            keywords = listOf(
                "happy", "sad", "angry", "afraid", "love", "hate", "fear", "joy", "excited",
                "nervous", "worried", "proud", "jealous", "calm", "upset", "surprised",
                "disappointed", "hope", "feeling", "emotion", "anxious", "relieved",
            ),
            uzbekKeywords = listOf("baxtli", "xafa", "jahl", "qo'rquv", "sevgi", "nafrat", "xursand", "hayajon", "tashvish", "umid"),
        ),
        Topic(
            key = "health",
            name = "Sog'liq & Tibbiyot",
            icon = "🩺",
            keywords = listOf(
                "doctor", "hospital", "medicine", "pain", "sick", "disease", "health", "patient",
                "nurse", "treatment", "symptom", "injury", "surgery", "pill", "clinic", "vaccine",
                "fever", "cough", "headache", "body", "heart", "blood",
            ),
            uzbekKeywords = listOf("shifokor", "kasalxona", "dori", "kasallik", "sog'liq", "bemor", "hamshira", "davolash", "jarrohlik", "isitma"),
        ),
        Topic(
            key = "education",
            name = "Ta'lim & O'qish",
            icon = "📚",
            keywords = listOf(
                "school", "teacher", "student", "class", "lesson", "exam", "homework", "university",
                "study", "learn", "education", "grade", "subject", "degree", "course", "lecture",
                "classroom", "knowledge", "textbook", "library",
            ),
            uzbekKeywords = listOf("maktab", "o'qituvchi", "talaba", "dars", "imtihon", "universitet", "o'qish", "ta'lim", "kitob", "bilim"),
        ),
        Topic(
            key = "family",
            name = "Oila & Munosabatlar",
            icon = "👨‍👩‍👧",
            keywords = listOf(
                "family", "mother", "father", "sister", "brother", "parent", "child", "husband",
                "wife", "friend", "relative", "marriage", "wedding", "son", "daughter",
                "grandmother", "grandfather", "relationship", "neighbor", "baby",
            ),
            uzbekKeywords = listOf("oila", "ona", "ota", "opa", "aka", "farzand", "er", "xotin", "do'st", "qarindosh"),
        ),
        Topic(
            key = "clothing",
            name = "Kiyim & Moda",
            icon = "👕",
            keywords = listOf(
                "shirt", "dress", "shoes", "hat", "coat", "jacket", "pants", "clothes", "wear",
                "fashion", "jeans", "skirt", "sock", "glove", "scarf", "belt", "button", "fabric",
                "cotton", "style",
            ),
            uzbekKeywords = listOf("ko'ylak", "kiyim", "poyabzal", "shlyapa", "kurtka", "shim", "moda", "kamar"),
        ),
        Topic(
            key = "sports",
            name = "Sport & Musobaqa",
            icon = "⚽",
            keywords = listOf(
                "sport", "football", "game", "team", "player", "ball", "win", "lose", "race",
                "match", "coach", "exercise", "gym", "swim", "run", "jump", "athlete",
                "competition", "tournament", "score",
            ),
            uzbekKeywords = listOf("sport", "futbol", "o'yin", "jamoa", "o'yinchi", "to'p", "musobaqa", "mashq", "sportchi", "poyga"),
        ),
        Topic(
            key = "weather",
            name = "Ob-havo & Iqlim",
            icon = "⛅",
            keywords = listOf(
                "weather", "rain", "sun", "snow", "wind", "cloud", "storm", "hot", "cold", "warm",
                "cool", "temperature", "climate", "humid", "fog", "thunder", "lightning",
                "forecast", "sunny", "rainy",
            ),
            uzbekKeywords = listOf("ob-havo", "yomg'ir", "quyosh", "qor", "shamol", "bulut", "bo'ron", "issiq", "sovuq", "iqlim"),
        ),
        Topic(
            key = "home",
            name = "Uy & Ro'zg'or",
            icon = "🏠",
            keywords = listOf(
                "house", "home", "room", "kitchen", "table", "chair", "bed", "door", "window",
                "wall", "floor", "roof", "furniture", "garden", "garage", "key", "lamp",
                "curtain", "sofa", "apartment",
            ),
            uzbekKeywords = listOf("uy", "xona", "oshxona", "stol", "stul", "karavot", "eshik", "deraza", "mebel", "kvartira"),
        ),
        Topic(
            key = "money",
            name = "Pul & Xarid",
            icon = "💰",
            keywords = listOf(
                "money", "buy", "sell", "shop", "store", "price", "discount", "pay", "cash",
                "credit", "expensive", "cheap", "purchase", "receipt", "wallet", "coin", "bill",
                "budget", "save", "spend",
            ),
            uzbekKeywords = listOf("pul", "xarid", "do'kon", "narx", "chegirma", "naqd", "qimmat", "arzon", "cheki", "byudjet"),
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
