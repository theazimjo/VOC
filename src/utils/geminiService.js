/**
 * Lightweight Gemini AI Service for VOC Web App
 * Automatically tries available Flash models (gemini-2.5-flash, gemini-2.0-flash, gemini-1.5-flash-latest)
 * for maximum reliability, speed, and minimal token cost.
 */

const DEFAULT_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

// Model candidates in priority order
const MODEL_CANDIDATES = [
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-1.5-flash-latest",
  "gemini-1.5-flash",
  "gemini-2.5-pro"
];

export function getGeminiApiKey() {
  return localStorage.getItem('gemini_api_key') || DEFAULT_API_KEY;
}

export function setGeminiApiKey(key) {
  if (key && key.trim()) {
    localStorage.setItem('gemini_api_key', key.trim());
  } else {
    localStorage.removeItem('gemini_api_key');
  }
}

/**
 * Executes Gemini API request with automatic model fallback if a model endpoint returns 404.
 */
async function callGeminiWithFallback(payload, apiKey) {
  let lastErrorText = "";

  for (const model of MODEL_CANDIDATES) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        return await response.json();
      }

      const errorText = await response.text().catch(() => '');
      lastErrorText = `[${model}] HTTP ${response.status}: ${errorText || response.statusText}`;

      // If 404 (model not found on API key/version), try next model candidate
      if (response.status === 404) {
        console.warn(`Gemini model ${model} not found (404), trying next model candidate...`);
        continue;
      }

      // If non-404 error (e.g. 400 Bad Request or 403 Invalid Key), throw directly
      throw new Error(lastErrorText);
    } catch (err) {
      if (err.message && err.message.includes('404')) {
        continue;
      }
      throw err;
    }
  }

  throw new Error(`Gemini API so'rovi amalga oshmadi. Oxirgi xato: ${lastErrorText}`);
}

/**
 * Single word lookup: Auto-detects English or Uzbek, returns concise translation, POS, definition & example.
 * Token-optimized prompt to minimize cost.
 */
export async function lookupWordWithAI(query) {
  if (!query || !query.trim()) return null;
  const apiKey = getGeminiApiKey();
  if (!apiKey) throw new Error("Gemini API kalit kiritilmagan");

  const prompt = `Task: Vocabulary lookup for "${query.trim()}".
Detect language (EN or UZ). Return concise JSON object ONLY without markdown:
{"w":"English word/phrase","tr":"Uzbek translation","pos":"noun|verb|adjective|adverb|preposition|conjunction|pronoun|interjection|phrase|idiom","def":"Short Uzbek definition","ex":"Short English example sentence"}`;

  const payload = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      temperature: 0.1,
      maxOutputTokens: 256,
      responseMimeType: "application/json"
    }
  };

  const data = await callGeminiWithFallback(payload, apiKey);
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) return null;

  try {
    const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);
    return {
      word: parsed.w || query,
      translation: parsed.tr || '',
      partOfSpeech: (parsed.pos || 'noun').toLowerCase(),
      definition: parsed.def || '',
      example: parsed.ex || ''
    };
  } catch (err) {
    console.error("JSON parsing error in Gemini response:", err, rawText);
    return null;
  }
}

/**
 * Photo Word Extractor: Extract key vocabulary list from base64 image using Gemini Vision.
 * Automatically performs OCR typo correction, ignores basic stop words (a, an, the, hello, etc.),
 * and excludes words that already exist in the pack.
 */
export async function extractWordsFromImageAI(imageBase64, mimeType = 'image/jpeg', existingWords = []) {
  const apiKey = getGeminiApiKey();
  if (!apiKey) throw new Error("Gemini API kalit kiritilmagan");

  // Clean base64 string if data URL prefix exists
  const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z]+;base64,/, '');

  // Extract existing word keys for AI filtering (up to 150 items to optimize tokens)
  const existingKeys = existingWords
    .slice(0, 150)
    .map(w => (w.word || '').trim().toLowerCase())
    .filter(Boolean)
    .join(', ');

  const prompt = `Task: Read text/vocabulary from photo, correct any OCR typos, and extract ONLY valuable vocabulary.
Rules:
1. Correct misread OCR characters (e.g. blurred or missing letters) to proper English words.
2. EXCLUDE trivial/basic stop words (e.g. a, an, the, is, are, am, to, of, in, on, and, or, hello, hi, bye, yes, no).
3. EXCLUDE words that are already in this user's pack: [${existingKeys || 'none'}]
4. Return ONLY valuable learning vocabulary.
5. Format each item as a JSON object:
   - w: Corrected English word/phrase
   - tr: Uzbek translation
   - pos: part of speech (noun|verb|adjective|adverb|preposition|conjunction|pronoun|interjection|phrase|idiom)
   - def: Short Uzbek definition (So'zning o'zbek tilidagi ta'rifi)
   - ex: Short English example sentence

Return a JSON array ONLY without markdown formatting:
[{"w":"English word","tr":"O'zbekcha tarjima","pos":"noun","def":"O'zbekcha ta'rif","ex":"Example sentence"}]`;

  const payload = {
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inline_data: {
              mime_type: mimeType,
              data: cleanBase64
            }
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 1500,
      responseMimeType: "application/json"
    }
  };

  const data = await callGeminiWithFallback(payload, apiKey);
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) return [];

  try {
    const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedList = JSON.parse(cleanJson);

    if (!Array.isArray(parsedList)) return [];

    return parsedList.map(item => ({
      word: item.w || item.word || '',
      translation: item.tr || item.translation || '',
      partOfSpeech: (item.pos || item.partOfSpeech || 'noun').toLowerCase(),
      definition: item.def || item.definition || '',
      example: item.ex || item.example || ''
    })).filter(w => w.word.trim().length > 0);
  } catch (err) {
    console.error("Failed to parse vision OCR result from Gemini:", err, rawText);
    return [];
  }
}
