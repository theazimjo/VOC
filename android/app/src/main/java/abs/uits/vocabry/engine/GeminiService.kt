package abs.uits.vocabry.engine

import android.content.Context
import android.util.Base64
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONArray
import org.json.JSONObject
import java.io.BufferedReader
import java.io.InputStreamReader
import java.io.OutputStreamWriter
import java.net.HttpURLConnection
import java.net.URL

data class WordLookupResult(
    val word: String,
    val translation: String,
    val partOfSpeech: String,
    val definition: String,
    val example: String,
)

data class ExtractedWordItem(
    val id: String,
    val word: String,
    val translation: String,
    val partOfSpeech: String,
    val definition: String,
    val example: String,
    val isDuplicate: Boolean = false,
    val selected: Boolean = true,
)

object GeminiService {

    private const val PREFS_NAME = "gemini_prefs"
    private const val KEY_API_KEY = "gemini_api_key"

    private val MODEL_CANDIDATES = listOf(
        "gemini-2.5-flash",
        "gemini-2.0-flash",
        "gemini-1.5-flash-latest",
        "gemini-1.5-flash",
        "gemini-2.5-pro"
    )

    fun getApiKey(context: Context): String {
        val prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        return prefs.getString(KEY_API_KEY, "") ?: ""
    }

    fun setApiKey(context: Context, key: String) {
        val prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        prefs.edit().putString(KEY_API_KEY, key.trim()).apply()
    }

    private suspend fun callGeminiWithFallback(payload: JSONObject, apiKey: String): JSONObject = withContext(Dispatchers.IO) {
        var lastErrorMsg = ""

        for (model in MODEL_CANDIDATES) {
            val urlString = "https://generativelanguage.googleapis.com/v1beta/models/$model:generateContent?key=$apiKey"
            var conn: HttpURLConnection? = null

            try {
                val url = URL(urlString)
                conn = (url.openConnection() as HttpURLConnection).apply {
                    requestMethod = "POST"
                    setRequestProperty("Content-Type", "application/json; charset=UTF-8")
                    doOutput = true
                    connectTimeout = 15000
                    readTimeout = 20000
                }

                OutputStreamWriter(conn.outputStream, "UTF-8").use { writer ->
                    writer.write(payload.toString())
                    writer.flush()
                }

                val responseCode = conn.responseCode
                if (responseCode in 200..299) {
                    val reader = BufferedReader(InputStreamReader(conn.inputStream, "UTF-8"))
                    val sb = StringBuilder()
                    var line: String?
                    while (reader.readLine().also { line = it } != null) {
                        sb.append(line)
                    }
                    reader.close()
                    return@withContext JSONObject(sb.toString())
                }

                val errorStream = conn.errorStream ?: conn.inputStream
                val errorReader = BufferedReader(InputStreamReader(errorStream, "UTF-8"))
                val errSb = StringBuilder()
                var errLine: String?
                while (errorReader.readLine().also { errLine = it } != null) {
                    errSb.append(errLine)
                }
                errorReader.close()
                lastErrorMsg = "[$model] HTTP $responseCode: ${errSb.toString()}"

                if (responseCode == 404) {
                    // Try next model candidate
                    continue
                }

                throw Exception(lastErrorMsg)
            } catch (e: Exception) {
                if (e.message?.contains("404") == true) {
                    continue
                }
                if (model == MODEL_CANDIDATES.last()) {
                    throw e
                }
            } finally {
                conn?.disconnect()
            }
        }

        throw Exception("Gemini API so'rovi amalga oshmadi: $lastErrorMsg")
    }

    suspend fun lookupWordWithAI(context: Context, query: String): WordLookupResult? = withContext(Dispatchers.IO) {
        val apiKey = getApiKey(context)
        if (apiKey.isBlank()) throw Exception("Gemini API Kaliti kiritilmagan. Iltimos, kalitni kiriting.")

        val prompt = """Task: Vocabulary lookup for "${query.trim()}".
Detect language (EN or UZ). Return concise JSON object ONLY without markdown:
{"w":"English word/phrase","tr":"Uzbek translation","pos":"noun|verb|adjective|adverb|preposition|conjunction|pronoun|interjection|phrase|idiom","def":"Short Uzbek definition","ex":"Short English example sentence"}""".trimIndent()

        val payload = JSONObject().apply {
            put("contents", JSONArray().apply {
                put(JSONObject().apply {
                    put("parts", JSONArray().apply {
                        put(JSONObject().apply { put("text", prompt) })
                    })
                })
            })
            put("generationConfig", JSONObject().apply {
                put("temperature", 0.1)
                put("maxOutputTokens", 256)
                put("responseMimeType", "application/json")
            })
        }

        val jsonResponse = callGeminiWithFallback(payload, apiKey)
        val text = jsonResponse.optJSONArray("candidates")
            ?.optJSONObject(0)
            ?.optJSONObject("content")
            ?.optJSONArray("parts")
            ?.optJSONObject(0)
            ?.optString("text") ?: return@withContext null

        val cleanJson = text.replace("```json", "").replace("```", "").trim()
        val parsed = JSONObject(cleanJson)

        WordLookupResult(
            word = parsed.optString("w", query),
            translation = parsed.optString("tr", ""),
            partOfSpeech = parsed.optString("pos", "noun").lowercase(),
            definition = parsed.optString("def", ""),
            example = parsed.optString("ex", "")
        )
    }

    suspend fun extractWordsFromImageAI(
        context: Context,
        imageBase64: String,
        mimeType: String = "image/jpeg",
        existingWords: List<String> = emptyList()
    ): List<ExtractedWordItem> = withContext(Dispatchers.IO) {
        val apiKey = getApiKey(context)
        if (apiKey.isBlank()) throw Exception("Gemini API Kaliti kiritilmagan. Iltimos, kalitni kiriting.")

        val cleanBase64 = imageBase64.replace(Regex("^data:image/[a-zA-Z0-9+.-]+;base64,"), "")
        val existingKeys = existingWords.take(100).joinToString(", ")

        val prompt = """Task: Read all English or Uzbek vocabulary words/phrases from this image.
Correct any OCR misread letters/typos.
Rules:
1. EXCLUDE basic stop words (e.g. a, an, the, is, are, am, to, of, in, on, and, or, hello, hi, bye, yes, no).
2. EXCLUDE words already in this pack: [$existingKeys]
3. Return a JSON array ONLY with items containing:
   - w: English word/phrase
   - tr: Uzbek translation
   - pos: part of speech (noun|verb|adjective|adverb|preposition|conjunction|pronoun|interjection|phrase|idiom)
   - def: Short Uzbek definition (So'zning o'zbek tilidagi ta'rifi)
   - ex: Short English example sentence

Example JSON format:
[{"w":"apple","tr":"olma","pos":"noun","def":"Qizil yoki yashil yumaloq meva","ex":"I ate an apple."}]""".trimIndent()

        val payload = JSONObject().apply {
            put("contents", JSONArray().apply {
                put(JSONObject().apply {
                    put("parts", JSONArray().apply {
                        put(JSONObject().apply { put("text", prompt) })
                        put(JSONObject().apply {
                            put("inline_data", JSONObject().apply {
                                put("mime_type", mimeType)
                                put("data", cleanBase64)
                            })
                        })
                    })
                })
            })
            put("generationConfig", JSONObject().apply {
                put("temperature", 0.2)
                put("maxOutputTokens", 2000)
                put("responseMimeType", "application/json")
            })
        }

        val jsonResponse = callGeminiWithFallback(payload, apiKey)
        val text = jsonResponse.optJSONArray("candidates")
            ?.optJSONObject(0)
            ?.optJSONObject("content")
            ?.optJSONArray("parts")
            ?.optJSONObject(0)
            ?.optString("text") ?: return@withContext emptyList()

        val cleanJson = text.replace("```json", "").replace("```", "").trim()
        val resultList = mutableListOf<ExtractedWordItem>()

        val existingSet = existingWords.map { it.lowercase() }.toSet()

        if (cleanJson.startsWith("[")) {
            val arr = JSONArray(cleanJson)
            for (i in 0 until arr.length()) {
                val item = arr.optJSONObject(i) ?: continue
                val w = item.optString("w", item.optString("word", ""))
                if (w.isBlank()) continue

                val cleanKey = w.trim().lowercase()
                val isDup = existingSet.contains(cleanKey)

                resultList.add(
                    ExtractedWordItem(
                        id = "ext_${System.currentTimeMillis()}_$i",
                        word = w.trim(),
                        translation = item.optString("tr", item.optString("translation", "")).trim(),
                        partOfSpeech = item.optString("pos", item.optString("partOfSpeech", "noun")).lowercase(),
                        definition = item.optString("def", item.optString("definition", "")).trim(),
                        example = item.optString("ex", item.optString("example", "")).trim(),
                        isDuplicate = isDup,
                        selected = !isDup
                    )
                )
            }
        }

        resultList
    }
}
