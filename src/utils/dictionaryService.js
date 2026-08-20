/**
 * Free, keyless online dictionary/translation lookup (no AI).
 * - Google Translate's public web endpoint (the same one translate.google.com's
 *   own page calls, no API key) is the primary translator - it's real neural
 *   machine translation, not a fuzzy database lookup, so it actually
 *   understands context instead of matching against crowd-submitted phrase
 *   fragments. It's unofficial and occasionally returns a transient error, so
 *   MyMemory (a free translation-memory database) is kept as a fallback.
 * - dictionaryapi.dev: free English dictionary database, used for part of speech,
 *   definition and an example sentence — only reliable for English words, so
 *   it's skipped for non-English pack languages.
 * - Wiktionary's REST API (CORS-open, no key required) is used as a fallback
 *   dictionary source when dictionaryapi.dev has no entry for a word. Cambridge
 *   Dictionary doesn't expose a free, CORS-accessible API a browser can call
 *   directly, so it can't be wired in the same way.
 */

const GOOGLE_TRANSLATE_ENDPOINT = 'https://translate.googleapis.com/translate_a/single';
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

// Google Translate's actual NMT engine, via the same keyless endpoint the
// translate.google.com page itself calls. Real context-aware translation
// instead of MyMemory's exact-phrase-fragment matching, so it correctly
// handles domain-specific words (e.g. biology "cell"/"host") that MyMemory's
// crowd-sourced database often confuses with unrelated everyday phrases.
async function translateViaGoogle(query, fromLang, toLang) {
  const url = `${GOOGLE_TRANSLATE_ENDPOINT}?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) return '';
  const data = await res.json();
  const segments = data?.[0];
  if (!Array.isArray(segments) || segments.length === 0) return '';
  const translated = segments.map(seg => seg?.[0] || '').join('').trim();
  return decodeHTMLEntities(translated);
}

// MyMemory fallback for when Google Translate's unofficial endpoint errors
// or is unreachable. Its translation-memory database contains stale "echo"
// entries where the translation is literally identical to the source word
// (e.g. querying "cat" into Russian can return the untranslated match "cat"
// instead of "кошка", even though a correct entry exists lower in the list).
// Re-picking blindly by quality score caused a worse regression (it once
// replaced the correct Latin-script "bank" -> "bank" with a Cyrillic
// "bank" -> "Банк", wrong for this app's Latin-script Uzbek content) - so the
// fix here is narrow: among exact-segment matches, prefer a non-echo
// translation over an echo one, but only pick from real candidates - if
// every candidate is an echo, it's most likely a genuine loanword (e.g.
// "bank"), so it's kept rather than discarded.
async function translateViaMyMemory(query, fromLang, toLang) {
  const normalizedQuery = query.trim().toLowerCase();
  const url = `${MYMEMORY_ENDPOINT}?q=${encodeURIComponent(normalizedQuery)}&langpair=${fromLang}|${toLang}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Tarjima bazasiga ulanib bo'lmadi");
  const data = await res.json();

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

async function translateWord(query, fromLang, toLang) {
  const trimmed = query.trim();
  if (!trimmed) return '';
  if (fromLang === toLang) return decodeHTMLEntities(trimmed);

  // Lowercased for consistency (Google's engine is far less case-sensitive
  // than MyMemory, but normalizing here keeps behavior predictable and
  // sidesteps an occasional server-side quirk on Google's end where certain
  // capitalized single words - e.g. "Apple" with sl=en explicit - 500 while
  // the lowercase form works fine).
  const normalized = trimmed.toLowerCase();

  try {
    const googleResult = await translateViaGoogle(normalized, fromLang, toLang);
    if (googleResult) return googleResult;
  } catch {
    // fall through to MyMemory
  }

  try {
    return await translateViaMyMemory(normalized, fromLang, toLang);
  } catch {
    return '';
  }
}

function normalizeForComparison(s) {
  return (s || '').trim().toLowerCase().replace(/['’‘`]/g, "'");
}

// Queries Google Translate AND MyMemory (a second, independently-sourced
// dictionary) for the word being added/edited, rather than trusting a single
// engine. When both agree, there's real confidence in the result. When they
// don't, no free source can say which one (if either) is right - a rare
// technical term can trip up both engines the same way (both have been seen
// to mistranslate "tentacle" the same wrong way) - so instead of silently
// picking one, the disagreement itself is surfaced back to the caller as
// `alternate`, so the person adding the word can glance at both and judge.
async function translateWordWithCrossCheck(query, fromLang, toLang) {
  const trimmed = query.trim();
  if (!trimmed) return { translation: '', alternate: '' };
  if (fromLang === toLang) return { translation: decodeHTMLEntities(trimmed), alternate: '' };

  const normalized = trimmed.toLowerCase();
  const [googleOutcome, myMemoryOutcome] = await Promise.allSettled([
    translateViaGoogle(normalized, fromLang, toLang),
    translateViaMyMemory(normalized, fromLang, toLang)
  ]);

  const google = googleOutcome.status === 'fulfilled' ? googleOutcome.value : '';
  const myMemory = myMemoryOutcome.status === 'fulfilled' ? myMemoryOutcome.value : '';

  const translation = google || myMemory;
  const other = google ? myMemory : '';
  const agree = !other || normalizeForComparison(other) === normalizeForComparison(translation);

  return {
    translation: decodeHTMLEntities(translation),
    alternate: agree ? '' : decodeHTMLEntities(other)
  };
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

const MAX_WORD_MEANINGS = 6;

// dictionaryapi.dev groups senses by part of speech, each with its own list
// of definitions (e.g. "bank" -> noun: "a financial institution", noun: "the
// land alongside a river", verb: "to tilt during a turn"...). The rest of
// this file only ever reads meanings[0].definitions[0], throwing away every
// other sense - this walks the full structure instead, falling back to
// Wiktionary's entries (same shape) when dictionaryapi.dev has nothing.
async function collectRawSenses(word) {
  const senses = [];
  try {
    const res = await fetch(`${FREE_DICTIONARY_ENDPOINT}/${encodeURIComponent(word)}`);
    if (res.ok) {
      const data = await res.json();
      const entry = Array.isArray(data) ? data[0] : null;
      for (const meaning of entry?.meanings || []) {
        for (const d of meaning.definitions || []) {
          if (!d.definition) continue;
          senses.push({
            partOfSpeech: (meaning.partOfSpeech || '').toLowerCase(),
            definitionRaw: d.definition,
            example: d.example || ''
          });
        }
      }
    }
  } catch {
    // fall through to Wiktionary below
  }

  if (senses.length === 0) {
    try {
      const res = await fetch(`${WIKTIONARY_DEFINITION_ENDPOINT}/${encodeURIComponent(word)}`);
      if (res.ok) {
        const data = await res.json();
        for (const entry of data?.en || []) {
          for (const d of entry.definitions || []) {
            const def = stripHtmlTags(d.definition);
            if (!def) continue;
            senses.push({
              partOfSpeech: (entry.partOfSpeech || '').toLowerCase(),
              definitionRaw: def,
              example: stripHtmlTags(d.parsedExamples?.[0]?.example || '')
            });
          }
        }
      }
    } catch {
      // no meanings available from either source
    }
  }

  return senses;
}

/**
 * Every distinct sense of a word dictionaryapi.dev (or Wiktionary as
 * fallback) knows about, translated into targetLangCode - lets the caller
 * offer "this word also means..." (e.g. "bank" the riverbank vs "bank" the
 * financial institution) instead of only ever surfacing the first sense.
 * Only meaningful for English source words (dictionaryapi.dev is English-only,
 * same limitation fetchEnglishDictionaryInfo already has) - returns [] otherwise.
 * Returns an array of { partOfSpeech, definition, example }, deduplicated by
 * translated definition text and capped at MAX_WORD_MEANINGS.
 */
export async function fetchWordMeanings(word, wordLangCode = 'en', targetLangCode = 'uz') {
  const trimmed = (word || '').trim();
  if (!trimmed || wordLangCode !== 'en') return [];

  const rawSenses = await collectRawSenses(trimmed);
  if (rawSenses.length === 0) return [];

  const translated = await Promise.all(rawSenses.map(async s => {
    let definition = s.definitionRaw;
    if (targetLangCode && targetLangCode !== 'en') {
      try {
        const t = await translateWord(s.definitionRaw, 'en', targetLangCode);
        if (t) definition = t;
      } catch {
        // keep the English definition as fallback
      }
    }
    return {
      partOfSpeech: s.partOfSpeech,
      definition: decodeHTMLEntities(definition),
      example: decodeHTMLEntities(s.example)
    };
  }));

  const seen = new Set();
  const deduped = translated.filter(m => {
    const key = m.definition.trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return deduped.slice(0, MAX_WORD_MEANINGS);
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
 * Returns { word, translation, alternateTranslation, alternateWord, partOfSpeech, definition, example }
 * or null if nothing was found. alternateTranslation/alternateWord are only set when Google
 * Translate and MyMemory disagree on the result, as a cross-check hint - empty otherwise.
 */
export async function lookupWordFromDictionary(query, direction, wordLangCode = 'en', targetLangCode = 'uz') {
  const trimmed = (query || '').trim();
  if (!trimmed) return null;

  if (direction === 'word2translation') {
    const [translationResult, dictInfo] = await Promise.all([
      translateWordWithCrossCheck(trimmed, wordLangCode, targetLangCode),
      wordLangCode === 'en' ? fetchEnglishDictionaryInfo(trimmed, targetLangCode) : Promise.resolve(null)
    ]);
    if (!translationResult.translation && !dictInfo) return null;
    return {
      word: decodeHTMLEntities(trimmed),
      translation: translationResult.translation,
      alternateTranslation: translationResult.alternate,
      partOfSpeech: decodeHTMLEntities(dictInfo?.partOfSpeech || ''),
      definition: decodeHTMLEntities(dictInfo?.definition || ''),
      example: decodeHTMLEntities(dictInfo?.example || '')
    };
  }

  const wordResult = await translateWordWithCrossCheck(trimmed, targetLangCode, wordLangCode);
  if (!wordResult.translation) return null;
  const dictInfo = wordLangCode === 'en' ? await fetchEnglishDictionaryInfo(wordResult.translation, targetLangCode) : null;
  return {
    word: wordResult.translation,
    alternateWord: wordResult.alternate,
    translation: decodeHTMLEntities(trimmed),
    partOfSpeech: decodeHTMLEntities(dictInfo?.partOfSpeech || ''),
    definition: decodeHTMLEntities(dictInfo?.definition || ''),
    example: decodeHTMLEntities(dictInfo?.example || '')
  };
}
