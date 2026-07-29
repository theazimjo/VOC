package abs.uits.vocabry.engine

import abs.uits.vocabry.data.model.Word

/**
 * Direct port of IrregularVerbsTrainer.jsx's verb-form extraction and
 * sentence-context parsing. Real Firebase word records never persist an
 * explicit v1/v2/v3 column (see WordRepository/experimentDB notes) — forms
 * are recovered from `definition` ("V1 - V2 - V3") or, the path that
 * actually works for market-installed data, `notes` ("V2 | V3", with
 * V1 = the word itself).
 */
data class VerbForms(val word: Word, val v1: String, val v2: String, val v3: String, val requeued: Boolean = false)

data class SentenceChoice(val label: String, val text: String)
data class SentenceQuestionData(val questionTextBeforeBlank: String, val questionTextAfterBlank: String, val choices: List<SentenceChoice>, val correctIndex: Int)

object IrregularVerbParser {

    fun extractVerbForms(words: List<Word>): List<VerbForms> {
        return words.mapNotNull { w ->
            var v1: String? = null
            var v2: String? = null
            var v3: String? = null

            if (w.definition.isNotBlank()) {
                val parts = w.definition.split("-").map { it.trim() }
                if (parts.size == 3) {
                    v1 = parts[0]; v2 = parts[1]; v3 = parts[2]
                }
            }

            if ((v1.isNullOrBlank() || v2.isNullOrBlank() || v3.isNullOrBlank()) && w.notes.isNotBlank() && w.word.isNotBlank()) {
                val parts = w.notes.split("|").map { it.trim() }
                if (parts.size == 2) {
                    v1 = w.word; v2 = parts[0]; v3 = parts[1]
                }
            }

            if (v1.isNullOrBlank() || v2.isNullOrBlank() || v3.isNullOrBlank()) null
            else VerbForms(w, v1, v2, v3)
        }
    }

    fun isCorrectMatch(userInput: String, correctOption: String): Boolean {
        val cleaned = userInput.trim().lowercase()
        val targets = correctOption.lowercase().split("/").map { it.trim() }
        return targets.contains(cleaned)
    }

    /** All V1/V2/V3 slash-alternatives, trimmed, longest-first (avoids partial-substring highlight bugs). */
    fun highlightableForms(verb: VerbForms): List<String> {
        return (verb.v1.split("/") + verb.v2.split("/") + verb.v3.split("/"))
            .map { it.trim() }
            .filter { it.isNotEmpty() }
            .sortedByDescending { it.length }
    }

    /**
     * Parses the verb's `example` field (candidate sentences split on '/')
     * looking for a form-in-context to blank out and quiz on. Checks V2/V3
     * first ("to make it a good tense test"), then V1.
     */
    fun parseSentenceQuestion(verb: VerbForms): SentenceQuestionData? {
        if (verb.word.example.isBlank()) return null
        val sentences = verb.word.example.split("/").map { it.trim() }

        for (sentence in sentences) {
            val cleanSentence = sentence.replace(Regex("[.,/#!$%^&*;:{}=\\-_`~()?]"), "")
            val wordsInSentence = cleanSentence.lowercase().split(Regex("\\s+"))

            val orderCheck = listOf(
                "v2" to verb.v2.lowercase(),
                "v3" to verb.v3.lowercase(),
                "v1" to verb.v1.lowercase(),
            )

            for ((key, valStr) in orderCheck) {
                val targets = valStr.split("/").map { it.trim() }
                for (t in targets) {
                    if (t.isNotEmpty() && wordsInSentence.contains(t)) {
                        val regex = Regex("\\b${Regex.escape(t)}\\b", RegexOption.IGNORE_CASE)
                        val match = regex.find(sentence) ?: continue
                        val before = sentence.substring(0, match.range.first)
                        val after = sentence.substring(match.range.last + 1)

                        val choices = listOf(
                            SentenceChoice("V1", verb.v1),
                            SentenceChoice("V2", verb.v2),
                            SentenceChoice("V3", verb.v3),
                        ).shuffled()
                        val correctIndex = choices.indexOfFirst { it.label.lowercase() == key }

                        return SentenceQuestionData(before, after, choices, correctIndex)
                    }
                }
            }
        }
        return null
    }
}
