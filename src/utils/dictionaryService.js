/**
 * Free, keyless online dictionary/translation lookup (no AI).
 * - MyMemory: free translation-memory database, used for word<->uz translation
 *   across every language the app's packs support.
 * - dictionaryapi.dev: free English dictionary database, used for part of speech,
 *   definition and an example sentence — only reliable for English words, so
 *   it's skipped for non-English pack languages.
 */

const MYMEMORY_ENDPOINT = 'https://api.mymemory.translated.net/get';
const FREE_DICTIONARY_ENDPOINT = 'https://api.dictionaryapi.dev/api/v2/entries/en';

// Matches the locale codes used by `speechLanguages` in utils/helpers.js.
const LOCALE_TO_SHORT_CODE = {
  'en-US': 'en', 'es-ES': 'es', 'fr-FR': 'fr', 'de-DE': 'de', 'it-IT': 'it',
  'pt-PT': 'pt', 'ru-RU': 'ru', 'tr-TR': 'tr', 'ar-SA': 'ar', 'zh-CN': 'zh',
  'ja-JP': 'ja', 'ko-KR': 'ko', 'uz-UZ': 'uz'
};

export function toShortLangCode(localeCode) {
  if (!localeCode) return 'en';
  return LOCALE_TO_SHORT_CODE[localeCode] || localeCode.split('-')[0].toLowerCase();
}

export function decodeHTMLEntities(str) {
  if (!str || typeof str !== 'string') return '';
  try {
    const doc = new DOMParser().parseFromString(str, 'text/html');
    return (doc.body.textContent || str).trim();
  } catch {
    return str
      .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec))
      .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&nbsp;/g, ' ')
      .trim();
  }
}

async function translateWord(query, fromLang, toLang) {
  if (fromLang === toLang) return decodeHTMLEntities(query);
  const url = `${MYMEMORY_ENDPOINT}?q=${encodeURIComponent(query)}&langpair=${fromLang}|${toLang}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Tarjima bazasiga ulanib bo'lmadi");
  const data = await res.json();
  const translated = data?.responseData?.translatedText || '';
  if (!translated || /invalid|no translation|not available/i.test(translated)) return '';
  return decodeHTMLEntities(translated);
}

async function fetchEnglishDictionaryInfo(word) {
  try {
    const res = await fetch(`${FREE_DICTIONARY_ENDPOINT}/${encodeURIComponent(word)}`);
    if (!res.ok) return null;
    const data = await res.json();
    const entry = Array.isArray(data) ? data[0] : null;
    const meaning = entry?.meanings?.[0];
    const definitionEntry = meaning?.definitions?.[0];
    if (!definitionEntry) return null;

    let uzDefinition = '';
    try {
      uzDefinition = await translateWord(definitionEntry.definition, 'en', 'uz');
    } catch {
      uzDefinition = '';
    }

    return {
      partOfSpeech: decodeHTMLEntities(meaning?.partOfSpeech || ''),
      definition: decodeHTMLEntities(uzDefinition || definitionEntry.definition || ''),
      example: decodeHTMLEntities(definitionEntry.example || '')
    };
  } catch {
    return null;
  }
}

/**
 * Looks up a word from the free online database.
 * direction: 'word2translation' (query is in the pack's word language) or
 *            'translation2word' (query is the Uzbek translation).
 * wordLangCode: short language code of the pack's word side (e.g. 'en', 'es', 'fr'; default 'en').
 * Returns { word, translation, partOfSpeech, definition, example } or null if nothing was found.
 */
export async function lookupWordFromDictionary(query, direction, wordLangCode = 'en') {
  const trimmed = (query || '').trim();
  if (!trimmed) return null;

  if (direction === 'word2translation') {
    const [translation, dictInfo] = await Promise.all([
      translateWord(trimmed, wordLangCode, 'uz'),
      wordLangCode === 'en' ? fetchEnglishDictionaryInfo(trimmed) : Promise.resolve(null)
    ]);
    if (!translation && !dictInfo) return null;
    return {
      word: decodeHTMLEntities(trimmed),
      translation: decodeHTMLEntities(translation),
      partOfSpeech: decodeHTMLEntities(dictInfo?.partOfSpeech || ''),
      definition: decodeHTMLEntities(dictInfo?.definition || ''),
      example: decodeHTMLEntities(dictInfo?.example || '')
    };
  }

  const word = await translateWord(trimmed, 'uz', wordLangCode);
  if (!word) return null;
  const dictInfo = wordLangCode === 'en' ? await fetchEnglishDictionaryInfo(word) : null;
  return {
    word: decodeHTMLEntities(word),
    translation: decodeHTMLEntities(trimmed),
    partOfSpeech: decodeHTMLEntities(dictInfo?.partOfSpeech || ''),
    definition: decodeHTMLEntities(dictInfo?.definition || ''),
    example: decodeHTMLEntities(dictInfo?.example || '')
  };
}
