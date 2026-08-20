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
const WIKTIONARY_API_ENDPOINT = 'https://en.wiktionary.org/w/api.php';
const POS_HEADER_RE = /^=+\s*(Noun|Verb|Adjective|Adverb|Preposition|Conjunction|Pronoun|Interjection|Phrase|Idiom|Numeral|Determiner|Article|Proper noun)\s*=+$/gim;
const TRANS_BLOCK_RE = /\{\{trans-top(?:-see)?\|(?:id=[^|}]*\|)?([^\n}]*)\}\}([\s\S]*?)\{\{trans-bottom\}\}/g;

// Google's own "bilingual dictionary" data (the grouped "Noun: book, ...
// Verb: reserve, ..." panel translate.google.com shows) would be the ideal
// source for this, but that sub-feature (dt=bd) isn't CORS-enabled for
// third-party callers - it works via curl/server-side but a real browser
// fetch() is flatly rejected, confirmed live. Wiktionary's translation
// tables end up being the only free, CORS-open, keyless source that ties a
// DIFFERENT TRANSLATION to each sense rather than just an alternate English
// gloss of the same translation.
async function fetchWiktionaryWikitext(page) {
  const url = `${WIKTIONARY_API_ENDPOINT}?action=parse&page=${encodeURIComponent(page)}&prop=wikitext&format=json&origin=*`;
  const res = await fetch(url);
  if (!res.ok) return '';
  const data = await res.json();
  return data?.parse?.wikitext?.['*'] || '';
}

// Level-2 headers ("==English==") mark language sections; level-3+ headers
// ("===Noun===", "===Etymology 1===") are inside them. A naive search for
// the next "\n==" matches those level-3 sub-headings too (they also start
// with two equals signs), cutting the section off after just a few bytes -
// so this matches complete "==Name==" headers specifically and slices
// between the English one and whichever level-2 header comes next.
function extractEnglishSection(wikitext) {
  const langHeaders = [...wikitext.matchAll(/^==([^=\n]+)==$/gm)];
  const idx = langHeaders.findIndex(m => m[1].trim() === 'English');
  if (idx === -1) return '';
  const start = langHeaders[idx].index;
  const end = idx + 1 < langHeaders.length ? langHeaders[idx + 1].index : wikitext.length;
  return wikitext.slice(start, end);
}

function cleanWikiTranslation(raw) {
  return (raw || '').replace(/\[\[|\]\]/g, '').split('|')[0].trim();
}

// Walks every {{trans-top|gloss}}...{{trans-bottom}} block in `text` and
// pulls out the entry for `targetLangCode`, tagging each with whichever
// Noun/Verb/... header most recently preceded it - translation tables live
// under a `===Verb===`/`===Noun===` header, at whatever nesting depth that
// word's etymology sections happen to put it at, so "nearest preceding
// header" is the only reliable way to recover the part of speech.
function extractTranslationsForLang(text, targetLangCode) {
  const headers = [];
  let hm;
  POS_HEADER_RE.lastIndex = 0;
  while ((hm = POS_HEADER_RE.exec(text))) {
    headers.push({ index: hm.index, pos: hm[1].toLowerCase() });
  }

  const langRe = new RegExp('\\{\\{tt?\\+?\\|' + targetLangCode + '\\|([^|}]+)', 'i');
  const results = [];
  let bm;
  TRANS_BLOCK_RE.lastIndex = 0;
  while ((bm = TRANS_BLOCK_RE.exec(text))) {
    const lm = bm[2].match(langRe);
    if (!lm) continue;
    const translation = cleanWikiTranslation(lm[1]);
    if (!translation) continue;
    let pos = '';
    for (const h of headers) {
      if (h.index <= bm.index) pos = h.pos; else break;
    }
    results.push({ partOfSpeech: pos, translation, gloss: bm[1].split('|')[0].trim() });
  }
  return results;
}

// Common words' translation tables get moved to a "Word/translations"
// subpage to keep the main entry readable - {{see translation subpage}} is
// the marker left behind pointing there.
async function fetchWiktionaryTranslations(word, targetLangCode) {
  const mainText = extractEnglishSection(await fetchWiktionaryWikitext(word));
  if (!mainText) return [];

  let results = extractTranslationsForLang(mainText, targetLangCode);

  if (mainText.includes('see translation subpage')) {
    const subText = await fetchWiktionaryWikitext(`${word}/translations`);
    if (subText) {
      results = results.concat(extractTranslationsForLang(subText, targetLangCode));
    }
  }

  const seen = new Set();
  return results.filter(r => {
    const key = `${r.partOfSpeech}:${r.translation.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// dictionaryapi.dev returns an ARRAY of top-level entries, one per etymology
// - "book" has three: entry[0] is the noun (14 definitions), entry[1] and
// entry[2] are two separate verb etymologies ("to reserve" vs "to record").
// Reading only data[0] (as fetchEnglishDictionaryInfo above does, for a
// single definition) silently drops every sense outside the first etymology
// - here, with every sense needed, this walks every entry and every
// part-of-speech group inside each, falling back to Wiktionary's definition
// endpoint (same nested shape) when dictionaryapi.dev has nothing.
async function collectEnglishSenses(word) {
  const senses = [];
  try {
    const res = await fetch(`${FREE_DICTIONARY_ENDPOINT}/${encodeURIComponent(word)}`);
    if (res.ok) {
      const data = await res.json();
      for (const entry of Array.isArray(data) ? data : []) {
        for (const meaning of entry?.meanings || []) {
          for (const d of meaning.definitions || []) {
            if (!d.definition) continue;
            senses.push({ partOfSpeech: (meaning.partOfSpeech || '').toLowerCase(), definitionRaw: d.definition });
          }
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
            senses.push({ partOfSpeech: (entry.partOfSpeech || '').toLowerCase(), definitionRaw: def });
          }
        }
      }
    } catch {
      // no senses available from either source
    }
  }

  return senses;
}

// Dictionary definitions run a full sentence long ("A collection of sheets
// of paper bound together to hinge at one edge, containing printed or
// written material, pictures, etc.") - translating the whole thing produces
// a paragraph, useless as a stand-in "translation" value. Keeps just the
// core clause (up to the first comma/semicolon/parenthetical) and caps it at
// a handful of words, so the machine-translated fallback stays short like a
// real word/phrase translation instead of a run-on sentence.
function shortenForTranslation(text) {
  const core = (text || '').split(/[(;–—]/)[0].split(',')[0].trim();
  const words = core.split(/\s+/).filter(Boolean);
  return words.slice(0, 6).join(' ');
}

/**
 * Every distinct sense of a word - and, crucially, the DIFFERENT TRANSLATION
 * that sense actually takes (e.g. "book" the noun -> "kitob" vs "book" the
 * verb, "to reserve" -> "band qilmoq") - not just alternate English glosses
 * of the same translation. Wiktionary's per-sense translation tables are the
 * precise source (a real dictionary entry, not a machine guess) but very
 * sparsely populated for less-documented target languages (Uzbek included -
 * a word with 75 distinct English senses can have exactly one with an actual
 * Uzbek translation on file), so senses Wiktionary has nothing for fall back
 * to machine-translating that sense's own short dictionary definition -
 * still a real, distinctly-sensed answer, just not a curated one.
 * Only meaningful for English source words (same limitation
 * fetchEnglishDictionaryInfo already has) - returns [] otherwise. Returns an
 * array of { partOfSpeech, translation, definition }, capped at MAX_WORD_MEANINGS.
 */
function withTimeout(promise, ms, fallbackValue) {
  return Promise.race([
    promise,
    new Promise(resolve => setTimeout(() => resolve(fallbackValue), ms))
  ]);
}

// A word's noun sense alone can carry a dozen+ definitions, all listed
// before any other part of speech - slicing the raw list to the cap would
// only ever keep noun senses and never reach the verb ones (e.g. "book" the
// verb, "to reserve", sits behind 14 noun definitions). Round-robins across
// part-of-speech groups instead so the capped set stays varied.
function diversifyByPartOfSpeech(senses, cap) {
  const queues = new Map();
  for (const s of senses) {
    const key = s.partOfSpeech || '';
    if (!queues.has(key)) queues.set(key, []);
    queues.get(key).push(s);
  }
  const groups = [...queues.values()];
  const result = [];
  let i = 0;
  while (result.length < cap && groups.some(q => q.length > 0)) {
    const q = groups[i % groups.length];
    if (q.length > 0) result.push(q.shift());
    i++;
  }
  return result;
}

export async function fetchWordMeanings(word, wordLangCode = 'en', targetLangCode = 'uz') {
  const trimmed = (word || '').trim();
  if (!trimmed || !targetLangCode || wordLangCode !== 'en' || wordLangCode === targetLangCode) return [];

  const lower = trimmed.toLowerCase();
  const [rawSenses, wiktTranslations] = await Promise.all([
    collectEnglishSenses(lower).catch(() => []),
    fetchWiktionaryTranslations(lower, targetLangCode).catch(() => [])
  ]);
  if (rawSenses.length === 0 && wiktTranslations.length === 0) return [];

  const wiktByPos = {};
  for (const w of wiktTranslations) {
    (wiktByPos[w.partOfSpeech] ||= []).push(w);
  }
  const usedWikt = new Set();

  // Bounded up front so a word with dozens of dictionary senses (a couple of
  // wiktionary translation tables ran past 70) never queues up more than a
  // handful of fallback machine-translation calls.
  const senses = diversifyByPartOfSpeech(
    rawSenses.length > 0 ? rawSenses : wiktTranslations.map(w => ({ partOfSpeech: w.partOfSpeech, definitionRaw: w.gloss })),
    MAX_WORD_MEANINGS
  );

  // Claiming exact Wiktionary matches is synchronous (no network calls), so
  // it stays a simple sequential pass. Only the senses left without one need
  // a network round trip, and those all fire in parallel below - run
  // sequentially, translating 5-6 senses one at a time each with its own
  // Google/MyMemory round trip, was slow enough to stall the page for tens
  // of seconds. A per-call timeout keeps one slow/hanging request from
  // blocking the rest indefinitely.
  const withExact = senses.map(sense => {
    const exact = (wiktByPos[sense.partOfSpeech] || []).find(w => !usedWikt.has(w));
    if (exact) usedWikt.add(exact);
    return { sense, exact };
  });

  const translations = await Promise.all(withExact.map(({ sense, exact }) => {
    if (exact) return Promise.resolve(exact.translation);
    return withTimeout(
      translateWord(shortenForTranslation(sense.definitionRaw), 'en', targetLangCode).catch(() => ''),
      4000,
      ''
    );
  }));

  const seenKeys = new Set();
  const result = [];
  withExact.forEach(({ sense, exact }, i) => {
    const translation = translations[i];
    if (!translation) return;
    const key = `${sense.partOfSpeech}:${translation.trim().toLowerCase()}`;
    if (seenKeys.has(key)) return;
    seenKeys.add(key);
    result.push({
      partOfSpeech: sense.partOfSpeech,
      translation: decodeHTMLEntities(translation),
      definition: decodeHTMLEntities(sense.definitionRaw || exact?.gloss || '')
    });
  });

  // Wiktionary senses finer-grained than dictionaryapi.dev's groupings never
  // get claimed by the pass above - append the leftovers too, up to the cap.
  for (const w of wiktTranslations) {
    if (result.length >= MAX_WORD_MEANINGS) break;
    if (usedWikt.has(w)) continue;
    const key = `${w.partOfSpeech}:${w.translation.trim().toLowerCase()}`;
    if (seenKeys.has(key)) continue;
    seenKeys.add(key);
    result.push({ partOfSpeech: w.partOfSpeech, translation: w.translation, definition: decodeHTMLEntities(w.gloss || '') });
  }

  return result.slice(0, MAX_WORD_MEANINGS);
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
