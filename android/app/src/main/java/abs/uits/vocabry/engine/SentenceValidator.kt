package abs.uits.vocabry.engine

/**
 * Direct port of src/components/Practice/SentenceBuilder.jsx's
 * buildInflectedForms/sentenceUsesWord — checks whether a target word
 * (allowing common English inflections) appears in a submitted sentence.
 */
object SentenceValidator {

    private const val VOWELS = "aeiou"

    private fun buildInflectedForms(stem: String): Set<String> {
        val lower = stem.lowercase()
        val forms = mutableSetOf(
            lower, lower + "s", lower + "es", lower + "d", lower + "ed",
            lower + "ing", lower + "er", lower + "est", lower + "r",
        )

        // Silent-e drop: make -> making
        if (Regex("[^aeiou]e$", RegexOption.IGNORE_CASE).containsMatchIn(lower)) {
            val base = lower.dropLast(1)
            forms.add(base + "ing")
            forms.add(base + "ed")
            forms.add(base + "er")
            forms.add(base + "est")
        }

        // Consonant doubling: stop -> stopping
        if (lower.length >= 3) {
            val c1 = lower[lower.length - 3]
            val v = lower[lower.length - 2]
            val c2 = lower[lower.length - 1]
            if (VOWELS.contains(v) && !VOWELS.contains(c1) && !VOWELS.contains(c2) && !"wxy".contains(c2)) {
                forms.add(lower + c2 + "ing")
                forms.add(lower + c2 + "ed")
                forms.add(lower + c2 + "er")
                forms.add(lower + c2 + "est")
            }
        }

        // y -> i: study -> studies
        if (Regex("[^aeiou]y$", RegexOption.IGNORE_CASE).containsMatchIn(lower)) {
            val base = lower.dropLast(1) + "i"
            forms.add(base + "es")
            forms.add(base + "ed")
            forms.add(base + "er")
            forms.add(base + "est")
        }

        return forms
    }

    /**
     * Multi-word entries (phrases/idioms) fall back to a plain substring
     * check since inflection matching doesn't apply to them.
     */
    fun sentenceUsesWord(sentence: String, word: String): Boolean {
        val stem = word.trim()
        if (stem.isEmpty()) return false

        if (stem.contains(' ')) {
            return sentence.lowercase().contains(stem.lowercase())
        }

        val forms = buildInflectedForms(stem).map { Regex.escape(it) }
        val pattern = Regex("\\b(?:${forms.joinToString("|")})\\b", RegexOption.IGNORE_CASE)
        return pattern.containsMatchIn(sentence)
    }
}
