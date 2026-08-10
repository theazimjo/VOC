/**
 * Free, keyless online dictionary/translation lookup (no AI).
 * - MyMemory: free translation-memory database, used for en<->uz word translation.
 * - dictionaryapi.dev: free English dictionary database, used for part of speech,
 *   definition and an example sentence for the English word.
 */

const MYMEMORY_ENDPOINT = 'https://api.mymemory.translated.net/get';
const FREE_DICTIONARY_ENDPOINT = 'https://api.dictionaryapi.dev/api/v2/entries/en';

async function translateWord(query, fromLang, toLang) {
  const url = `${MYMEMORY_ENDPOINT}?q=${encodeURIComponent(query)}&langpair=${fromLang}|${toLang}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Tarjima bazasiga ulanib bo'lmadi");
  const data = await res.json();
  const translated = data?.responseData?.translatedText || '';
  if (!translated || /invalid|no translation|not available/i.test(translated)) return '';
  return translated;
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
      partOfSpeech: meaning?.partOfSpeech || '',
      definition: uzDefinition || definitionEntry.definition || '',
      example: definitionEntry.example || ''
    };
  } catch {
    return null;
  }
}

/**
 * Looks up a word from the free online database.
 * direction: 'en2uz' (query is the English word) or 'uz2en' (query is the Uzbek translation).
 * Returns { word, translation, partOfSpeech, definition, example } or null if nothing was found.
 */
export async function lookupWordFromDictionary(query, direction) {
  const trimmed = (query || '').trim();
  if (!trimmed) return null;

  if (direction === 'en2uz') {
    const [translation, dictInfo] = await Promise.all([
      translateWord(trimmed, 'en', 'uz'),
      fetchEnglishDictionaryInfo(trimmed)
    ]);
    if (!translation && !dictInfo) return null;
    return {
      word: trimmed,
      translation,
      partOfSpeech: dictInfo?.partOfSpeech || '',
      definition: dictInfo?.definition || '',
      example: dictInfo?.example || ''
    };
  }

  const englishWord = await translateWord(trimmed, 'uz', 'en');
  if (!englishWord) return null;
  const dictInfo = await fetchEnglishDictionaryInfo(englishWord);
  return {
    word: englishWord,
    translation: trimmed,
    partOfSpeech: dictInfo?.partOfSpeech || '',
    definition: dictInfo?.definition || '',
    example: dictInfo?.example || ''
  };
}
