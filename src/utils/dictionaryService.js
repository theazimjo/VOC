/**
 * Free, keyless online dictionary/translation lookup (no AI).
 * - MyMemory: free translation-memory database, used for word<->uz translation
 *   across every language the app's packs support.
 * - dictionaryapi.dev: free English dictionary database, used for part of speech,
 *   definition and an example sentence — only reliable for English words, so
 *   it's skipped for non-English pack languages.
 * - Wiktionary's REST API (CORS-open, no key required) is used as a fallback
 *   dictionary source when dictionaryapi.dev has no entry for a word. Cambridge
 *   Dictionary and Google don't expose a free, CORS-accessible API a browser
 *   can call directly, so they can't be wired in the same way.
 */

const MYMEMORY_ENDPOINT = 'https://api.mymemory.translated.net/get';
const FREE_DICTIONARY_ENDPOINT = 'https://api.dictionaryapi.dev/api/v2/entries/en';
const WIKTIONARY_DEFINITION_ENDPOINT = 'https://en.wiktionary.org/api/rest_v1/page/definition';
const CYRILLIC_RE = /[Ѐ-ӿ]/;

function stripHtmlTags(html) {
  if (!html) return '';
  return decodeHTMLEntities(html.replace(/<[^>]*>/g, ''));
}

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

  // MyMemory's translation-memory lookup is an exact-segment match, and it's
  // case-sensitive: "Your" and "your" pull entirely different stored segments
  // (e.g. "Your" resolves to an unrelated "Your Email address" entry while
  // "your" correctly resolves to "sizning"/"your" as a pronoun). Lowercasing
  // before the query avoids landing on those noisy capitalized-sentence-start
  // entries - translation doesn't need to preserve the input's casing anyway.
  const normalizedQuery = query.trim().toLowerCase();
  const url = `${MYMEMORY_ENDPOINT}?q=${encodeURIComponent(normalizedQuery)}&langpair=${fromLang}|${toLang}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Tarjima bazasiga ulanib bo'lmadi");
  const data = await res.json();

  // MyMemory's own top pick (`responseData.translatedText`) is usually
  // right, but its translation-memory database contains stale "echo" entries
  // where the translation is literally identical to the source word (e.g.
  // querying "cat" into Russian can return the untranslated match "cat"
  // instead of "кошка", even though a correct entry exists lower in the
  // list). Re-picking blindly by quality score caused a worse regression
  // (it once replaced the correct Latin-script "bank" -> "bank" with a
  // Cyrillic "bank" -> "Банк", wrong for this app's Latin-script Uzbek
  // content) - so the fix here is narrow and specific: among exact-segment
  // matches, prefer a non-echo translation over an echo one (an untranslated
  // echo is almost never right when the languages differ), but only pick
  // from real candidates - if every candidate is an echo, it's most likely a
  // genuine loanword (e.g. "bank"), so it's kept rather than discarded.
  let candidates = (data?.matches || [])
    .filter(m => (m.segment || '').trim().toLowerCase() === normalizedQuery);

  // This app's Uzbek content is entirely Latin-script - discard Cyrillic
  // candidates when translating into Uzbek so a mixed-script entry in
  // MyMemory's database never gets picked over the app's Latin convention.
  if (toLang === 'uz') {
    candidates = candidates.filter(m => !CYRILLIC_RE.test(m.translation || ''));
  }

  const nonEchoCandidates = candidates.filter(
    m => (m.translation || '').trim().toLowerCase() !== normalizedQuery
  );
  const pool = nonEchoCandidates.length > 0 ? nonEchoCandidates : candidates;
  pool.sort((a, b) => (Number(b.match) || 0) - (Number(a.match) || 0) || (Number(b.quality) || 0) - (Number(a.quality) || 0));

  const translated = pool[0]?.translation || data?.responseData?.translatedText || '';
  if (!translated || /invalid|no translation|not available/i.test(translated)) return '';
  return decodeHTMLEntities(translated);
}

// Wiktionary fallback for when dictionaryapi.dev has no entry for a word -
// Cambridge Dictionary and Google don't offer a free, CORS-open API a
// browser can call, but Wiktionary's REST API does, and is a comparably
// authoritative dictionary source for confirming a word is real English and
// getting its actual meaning.
async function fetchWiktionaryInfo(word) {
  try {
    const res = await fetch(`${WIKTIONARY_DEFINITION_ENDPOINT}/${encodeURIComponent(word)}`);
    if (!res.ok) return null;
    const data = await res.json();
    const enEntries = data?.en;
    if (!enEntries || enEntries.length === 0) return null;
    for (const entry of enEntries) {
      const definitionEntry = (entry.definitions || []).find(d => stripHtmlTags(d.definition));
      if (!definitionEntry) continue;
      return {
        partOfSpeech: (entry.partOfSpeech || '').toLowerCase(),
        definition: stripHtmlTags(definitionEntry.definition),
        example: stripHtmlTags(definitionEntry.parsedExamples?.[0]?.example || '')
      };
    }
    return null;
  } catch {
    return null;
  }
}

// targetLang (default 'uz', the long-standing behavior every other pack type
// relies on) fills the "Definition" field with a translation of the English
// dictionary definition into that language, falling back to the raw English
// text only if the translation call fails. Pass null/'en' to skip translation
// entirely - lookupEnglishDefinition() below does this, since a monolingual
// English pack needs the RAW English definition, never translated.
async function fetchEnglishDictionaryInfo(word, targetLang = 'uz') {
  try {
    let partOfSpeech = '';
    let definitionRaw = '';
    let example = '';

    const res = await fetch(`${FREE_DICTIONARY_ENDPOINT}/${encodeURIComponent(word)}`);
    if (res.ok) {
      const data = await res.json();
      const entry = Array.isArray(data) ? data[0] : null;
      const meaning = entry?.meanings?.[0];
      const definitionEntry = meaning?.definitions?.[0];
      if (definitionEntry) {
        partOfSpeech = meaning?.partOfSpeech || '';
        definitionRaw = definitionEntry.definition || '';
        example = definitionEntry.example || '';
      }
    }

    // dictionaryapi.dev sometimes has no entry (newer/rarer words, or a
    // brief outage) - Wiktionary covers a much larger vocabulary and acts
    // as a genuine cross-check here, not just a last resort.
    if (!definitionRaw) {
      const wikt = await fetchWiktionaryInfo(word);
      if (wikt) {
        partOfSpeech = wikt.partOfSpeech || partOfSpeech;
        definitionRaw = wikt.definition || '';
        example = wikt.example || example;
      }
    }

    if (!definitionRaw) return null;

    let definitionText = definitionRaw;
    if (targetLang && targetLang !== 'en') {
      try {
        const translatedDefinition = await translateWord(definitionRaw, 'en', targetLang);
        if (translatedDefinition) definitionText = translatedDefinition;
      } catch {
        // keep the English definition as fallback
      }
    }

    return {
      partOfSpeech: decodeHTMLEntities(partOfSpeech),
      definition: decodeHTMLEntities(definitionText),
      example: decodeHTMLEntities(example)
    };
  } catch {
    return null;
  }
}

/**
 * English-only lookup that never translates the definition - used by the
 * monolingual English pack type, where seeing the English definition (not a
 * Uzbek gloss of it) is the entire point.
 * Returns { word, partOfSpeech, definition, example } or null.
 */
export async function lookupEnglishDefinition(word) {
  const trimmed = (word || '').trim();
  if (!trimmed) return null;
  const dictInfo = await fetchEnglishDictionaryInfo(trimmed, null);
  if (!dictInfo) return null;
  return { word: decodeHTMLEntities(trimmed), ...dictInfo };
}

/**
 * Looks up a word from the free online database.
 * direction: 'word2translation' (query is in the pack's word language) or
 *            'translation2word' (query is in the translation language).
 * wordLangCode: short language code of the pack's word side (e.g. 'en', 'es', 'fr'; default 'en').
 * targetLangCode: short language code to translate into/from (default 'uz').
 * Returns { word, translation, partOfSpeech, definition, example } or null if nothing was found.
 */
export async function lookupWordFromDictionary(query, direction, wordLangCode = 'en', targetLangCode = 'uz') {
  const trimmed = (query || '').trim();
  if (!trimmed) return null;

  if (direction === 'word2translation') {
    const [translation, dictInfo] = await Promise.all([
      translateWord(trimmed, wordLangCode, targetLangCode),
      wordLangCode === 'en' ? fetchEnglishDictionaryInfo(trimmed, targetLangCode) : Promise.resolve(null)
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

  const word = await translateWord(trimmed, targetLangCode, wordLangCode);
  if (!word) return null;
  const dictInfo = wordLangCode === 'en' ? await fetchEnglishDictionaryInfo(word, targetLangCode) : null;
  return {
    word: decodeHTMLEntities(word),
    translation: decodeHTMLEntities(trimmed),
    partOfSpeech: decodeHTMLEntities(dictInfo?.partOfSpeech || ''),
    definition: decodeHTMLEntities(dictInfo?.definition || ''),
    example: decodeHTMLEntities(dictInfo?.example || '')
  };
}
