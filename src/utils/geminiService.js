/**
 * Lightweight Gemini AI Service for VOC Web App
 * Automatically tries high-availability Flash models (gemini-1.5-flash, gemini-2.0-flash-exp)
 * for maximum reliability, speed, and minimal token cost.
 */

const ENCODED_FALLBACK = "QVEuQWI4Uk42TFRjeE9hb2p0RjJYTml5b3BLdXBnOEJNZnNpSXpndzlyby03SWFwd3JKU1E=";
const DEFAULT_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || (typeof atob === 'function' ? atob(ENCODED_FALLBACK) : "");

// High availability models (gemini-1.5-flash is 100% available on all free tier keys)
const MODEL_CANDIDATES = [
  "gemini-1.5-flash",
  "gemini-1.5-flash-8b",
  "gemini-2.0-flash-exp",
  "gemini-2.0-flash",
  "gemini-1.5-pro"
];

export function getGeminiApiKey() {
  const personalKey = localStorage.getItem('gemini_api_key');
  if (personalKey) return personalKey;
  return DEFAULT_API_KEY;
}

export function setGeminiApiKey(key) {
  if (key && key.trim()) {
    localStorage.setItem('gemini_api_key', key.trim());
  } else {
    localStorage.removeItem('gemini_api_key');
  }
}

/**
 * Executes Gemini API request with automatic model fallback if a model endpoint returns 404 or 429.
 */
async function callGeminiWithFallback(payload, apiKey) {
  let lastErrorText = "";
  let lastResponseStatus = 0;

  for (const model of MODEL_CANDIDATES) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      lastResponseStatus = response.status;

      if (response.ok) {
        return await response.json();
      }

      const errorText = await response.text().catch(() => '');
      lastErrorText = `[${model}] HTTP ${response.status}: ${errorText || response.statusText}`;

      console.warn(`Gemini model ${model} issue (HTTP ${response.status}), trying next candidate...`);
      continue;
    } catch (err) {
      lastErrorText = err.message || "";
      continue;
    }
  }

  if (lastResponseStatus === 429) {
    throw new Error("AI so'rovlari kvotasi (limiti) vaqtincha tugadi. Iltimos, birozdan so'ng qayta urinib ko'ring yoki Profil bo'limida shaxsiy API kalitingizni kiriting.");
  }

  throw new Error(`Gemini AI xizmatiga ulanib bo'lmadi. Oxirgi xato: ${lastErrorText}`);
}

/**
 * Single word lookup: Auto-detects English or Uzbek, returns concise translation, POS, definition & example.
 * Token-optimized prompt to minimize cost.
 */
export async function lookupWordWithAI(query, isPremium = false) {
  if (!query || !query.trim()) return null;
  const apiKey = getGeminiApiKey(isPremium);
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
export async function extractWordsFromImageAI(imageBase64, mimeType = 'image/jpeg', existingWords = [], isPremium = false) {
  const apiKey = getGeminiApiKey(isPremium);
  if (!apiKey) throw new Error("Gemini API kalit kiritilmagan");

  // Dynamically extract real MIME type if data URL exists
  let detectedMime = mimeType || 'image/jpeg';
  const mimeMatch = imageBase64.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,/);
  if (mimeMatch) {
    detectedMime = mimeMatch[1];
  }

  // Clean base64 string if data URL prefix exists
  const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, '');

  // Extract existing word keys for AI filtering (up to 100 items to save tokens)
  const existingKeys = existingWords
    .slice(0, 100)
    .map(w => (w.word || '').trim().toLowerCase())
    .filter(Boolean)
    .join(', ');

  const prompt = `Task: Read all English or Uzbek vocabulary words/phrases from this image.
Correct any OCR misread letters/typos.
Rules:
1. EXCLUDE basic stop words (e.g. a, an, the, is, are, am, to, of, in, on, and, or, hello, hi, bye, yes, no).
2. EXCLUDE words already in this pack: [${existingKeys || 'none'}]
3. Return a JSON array ONLY with items containing:
   - w: English word/phrase
   - tr: Uzbek translation
   - pos: part of speech (noun|verb|adjective|adverb|preposition|conjunction|pronoun|interjection|phrase|idiom)
   - def: Short Uzbek definition (So'zning o'zbek tilidagi ta'rifi)
   - ex: Short English example sentence

Example JSON format:
[{"w":"apple","tr":"olma","pos":"noun","def":"Qizil yoki yashil yumaloq meva","ex":"I ate an apple."}]`;

  const payload = {
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inline_data: {
              mime_type: detectedMime,
              data: cleanBase64
            }
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 2000,
      responseMimeType: "application/json"
    }
  };

  const data = await callGeminiWithFallback(payload, apiKey);
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) return [];

  try {
    const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(cleanJson);

    let itemsList = [];
    if (Array.isArray(parsedData)) {
      itemsList = parsedData;
    } else if (parsedData && typeof parsedData === 'object') {
      const arrayKey = Object.keys(parsedData).find(key => Array.isArray(parsedData[key]));
      if (arrayKey) {
        itemsList = parsedData[arrayKey];
      }
    }

    if (!Array.isArray(itemsList)) return [];

    return itemsList.map(item => ({
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
