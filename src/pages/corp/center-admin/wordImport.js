// Word import: pasted text, .txt/.csv files and Excel (.xlsx) sheets all end
// up as the same preview rows. Pure helpers (except readWordFile, which
// only reads the file) so every format rule is testable.
//
// A row: { line, word, translation, partOfSpeech, definition, example,
//          topic, error, duplicate }
// Rows with an `error` or marked `duplicate` are shown but never imported.

import { newId, normalizePOS } from './courseEditing';

export const MAX_FILE_BYTES = 2 * 1024 * 1024;
export const MAX_ROWS = 3000;

// Header names people actually use, compared after stripping everything but
// latin letters ("So'z turkumi" → "sozturkumi").
const HEADERS = {
  word: ['word', 'words', 'english', 'inglizcha', 'ingliz', 'soz', 'sozlar', 'term', 'vocabulary'],
  translation: ['translation', 'tarjima', 'tarjimasi', 'uzbek', 'ozbekcha', 'ozbek', 'meaning', 'manosi', 'manoni'],
  partOfSpeech: ['pos', 'partofspeech', 'turkum', 'turkumi', 'sozturkumi', 'type', 'turi'],
  definition: ['definition', 'tarif', 'izoh', 'description'],
  example: ['example', 'examples', 'misol', 'sentence', 'gap'],
  topic: ['topic', 'mavzu', 'unit', 'lesson', 'dars', 'bolim', 'section'],
};
const POSITIONAL = ['word', 'translation', 'partOfSpeech', 'definition', 'example'];

const headerKey = (s) => String(s ?? '').toLowerCase().replace(/[^a-z]/g, '');

// Column index → field when the cells look like a header row, else null.
export function headerColumns(cells) {
  const map = {};
  cells.forEach((cell, i) => {
    const key = headerKey(cell);
    const field = Object.keys(HEADERS).find((f) => HEADERS[f].includes(key));
    if (field && !Object.values(map).includes(field)) map[i] = field;
  });
  const fields = Object.values(map);
  return fields.includes('word') && fields.includes('translation') ? map : null;
}

// Split one line on a single-character separator, honouring "quoted, cells".
export function splitQuoted(line, sep) {
  const out = [];
  let cur = '';
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (quoted) {
      if (ch === '"' && line[i + 1] === '"') { cur += '"'; i += 1; } else if (ch === '"') quoted = false;
      else cur += ch;
    } else if (ch === '"' && !cur.trim()) {
      quoted = true;
      cur = '';
    } else if (ch === sep) {
      out.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

// Byte-order mark some editors (and our template) put at the file start.
const BOM = String.fromCharCode(0xfeff);
const stripBom = (s) => (s.startsWith(BOM) ? s.slice(1) : s);

const hasSeparator = (line) => {
  const parts = splitLine(line);
  return Boolean(parts.comma) || parts.length > 1;
};

// Lists pasted from an AI chat come dressed up: "1. **apple** – olma",
// "| apple | olma |" tables, "### Family" headings, "Here are 20 words:".
// → { text, skip } where `skip` marks decoration that isn't an entry.
function cleanLine(raw) {
  let line = stripBom(String(raw || '')).trim();
  if (!line) return { text: '', skip: true };
  if (/^(```|~~~)/.test(line)) return { text: '', skip: true }; // code fence
  if (/^\|?[\s:|-]+\|?$/.test(line) && line.includes('-')) return { text: '', skip: true }; // table rule
  if (/^([-*_]\s*){3,}$/.test(line)) return { text: '', skip: true }; // horizontal rule

  const heading = /^#{1,6}\s/.test(line);
  const allBold = /^(\*\*|__)[^*_]+(\*\*|__):?$/.test(line);
  line = line
    .replace(/^#{1,6}\s+/, '')
    .replace(/\*\*|__|`/g, '')
    .trim();
  if (line.startsWith('|') && line.endsWith('|')) line = line.slice(1, -1).trim();

  // Numbering and bullets — only when what's left still reads as an
  // entry, so "10 - o'n" (the word "10") survives.
  const bare = line.replace(/^(\(?\d{1,4}\s*[.):]|\d{1,4}\s+[-–—]|[-•*·–—▪►✓✔])\s+/, '').trim();
  if (bare !== line && (hasSeparator(bare) || !hasSeparator(line))) line = bare;

  // A title or a sentence around the list: "Mana 20 ta so'z:", "Good luck!",
  // "### Family", "Here are some useful words".
  const words = (t) => t.trim().split(/\s+/).length;
  // An entry never ends with ":". One ending in "!"/"?" has a real separator
  // ("How are you? - Qalaysan?"); a comma alone there is just a sentence
  // ("Umid qilamanki, bu foydali bo'ladi!").
  const exclaim = /[!?]$/.test(line) && (() => {
    const parts = splitLine(line.replace(/[!?]+$/, ''));
    return Boolean(parts.comma) || parts.length < 2;
  })();
  const trailing = /:$/.test(line) || exclaim;
  if (trailing || (!hasSeparator(line) && (heading || allBold || words(line) >= 4))) {
    return { text: line, skip: true };
  }
  return { text: line, skip: false };
}

// Word/translation separators in the order they are trusted. " - " needs
// spaces so "ice-cream" or "T-shirt" stay one word.
// Lookarounds keep an empty field ("verb - - I run") from eating the dash.
const SPACED = [/(?<=\s)[-–—](?=\s)/, /(?<=\s)(?:=|→|=>|->)(?=\s)/];

// "|" never shows up in a word, translation or sentence, so it wins over
// " - " (the AI prompt asks for it: "run | yugurmoq | … | I run - fast.").
function splitLine(line) {
  if (line.includes('\t')) return splitQuoted(line, '\t');
  if (line.includes('|')) return splitQuoted(line, '|');
  for (const re of SPACED) if (re.test(line)) return line.split(re).map((s) => s.trim());
  if (line.includes(';')) return splitQuoted(line, ';');
  if (line.includes(',')) return { comma: splitQuoted(line, ',') };
  if (line.includes(':')) return line.split(/\s*:\s*/);
  if ((line.match(/-/g) || []).length === 1) return line.split('-').map((s) => s.trim());
  return [line];
}

// Guess a part of speech only where it is safe: Uzbek infinitives (-moq,
// -mak) are verbs, minus the common nouns that merely end that way.
// Everything else stays a noun, as before.
const MOQ_NOUNS = /(barmoq|qaymoq|qarmoq|chaqmoq|yamoq|so['‘’ʻ]?qmoq|tamoq|qo['‘’ʻ]?rmoq|kemak|ko['‘’ʻ]?mak)$/;
function guessPOS(translation) {
  const first = String(translation || '').split(/[,/;]/)[0].trim().toLowerCase();
  return /(moq|mak)$/.test(first) && !MOQ_NOUNS.test(first) ? 'verb' : 'noun';
}

function splitPosSuffix(text) {
  const m = text.match(/^(.+?)\s*\(([^()]{1,20})\)$/);
  const pos = m && normalizePOS(m[2]);
  return pos ? [m[1].trim(), pos] : [text, null];
}

function fieldsToRow(parts) {
  let fields;
  if (parts.comma) {
    // Commas also appear inside translations ("ona, onajon"): only treat the
    // rest as columns when the third one is a part of speech, or there are
    // clearly columns (4+).
    const c = parts.comma;
    if (c.length >= 4 || (c.length === 3 && normalizePOS(c[2]))) fields = c;
    else fields = [c[0], c.slice(1).join(', ')];
  } else {
    fields = parts;
  }
  const [rawWord = '', rawTranslation = '', third = '', fourth = '', ...rest] = fields.map((s) => (s || '').trim());
  // "apple (noun)", "run (v.)", "olma (ot)" — a part of speech in brackets.
  const [word, wordPos] = splitPosSuffix(rawWord);
  const [translation, trPos] = splitPosSuffix(rawTranslation);
  const pos = normalizePOS(third);
  const row = {
    word,
    translation: translation.replace(/\.$/, '').trim(),
    partOfSpeech: pos || wordPos || trPos || guessPOS(translation),
    definition: pos || !third ? fourth : third,
    example: (pos || !third ? rest : [fourth, ...rest]).filter(Boolean).join(', '),
  };
  // One extra field after the word/translation (and part of speech) that
  // reads like a sentence is the example, not a definition:
  // "run - yugurmoq - verb - I run every day."
  if (!row.example && /[.!?]$/.test(row.definition)) {
    row.example = row.definition;
    row.definition = '';
  }
  return row;
}

function withError(row, en = false) {
  let error = null;
  if (!row.word) error = en ? 'No word' : "So'z yo'q";
  else if (!row.translation) error = en ? 'No translation' : "Tarjima yo'q";
  else if (row.word.length > 80) error = en ? "Too long — word and translation weren't separated" : "Juda uzun — so'z va tarjima ajratilmagan";
  return { ...row, error };
}

// A "|" list whose line breaks got lost on the way (an AI reply pasted as
// one paragraph): "… | Hello, how are you today?greet | salomlashmoq | …".
// 1. A sentence end glued to a word that is followed by "|" starts a new
//    entry: "today?greet |" → "today?" / "greet |".
// 2. Still too many fields for one entry (word | translation | pos | def |
//    example = 5)? With 4n+1 fields it is n entries whose example and next
//    word share a field — cut that field after its last ". " / "? " / "! ".
function expandGlued(line) {
  if (!line.includes('|')) return [line];
  const pieces = line.split(/(?<=[.!?])(?=[^\s|.!?][^|.!?]{0,40}\|)/);
  return pieces.flatMap((piece) => {
    const fields = piece.split('|');
    if (fields.length <= 5 || (fields.length - 1) % 4 !== 0) return [piece];
    const entries = [];
    let current = [fields[0]];
    for (let i = 1; i < fields.length; i += 1) {
      if (i % 4 === 0 && i < fields.length - 1) {
        const m = fields[i].match(/^(.*[.!?])\s+(\S.*)$/);
        if (!m) return [piece];
        current.push(m[1]);
        entries.push(current.join('|'));
        current = [m[2]];
      } else {
        current.push(fields[i]);
      }
    }
    entries.push(current.join('|'));
    return entries;
  });
}

// "Apple, Olma. Book, Kitob" on one line — only split when every piece is a
// plain "word, translation" pair, so example sentences with dots survive.
function expandDotted(line) {
  const pieces = line.split(/\.\s+(?=[^,.]+,)/);
  if (pieces.length < 2) return [line];
  const pairs = pieces.every((p) => splitQuoted(p, ',').length === 2);
  return pairs ? pieces : [line];
}

// Pasted text or a .txt file: one word per line.
export function parseWordText(text, en = false) {
  const rows = [];
  let headerSkipped = false;
  String(text || '').split(/\r\n|\r|\n/).forEach((raw, i) => {
    const { text: line, skip } = cleanLine(raw);
    if (skip || !line || /^sep=.$/i.test(line)) return;
    expandGlued(line).flatMap(expandDotted).forEach((entry) => {
      const parts = splitLine(entry.trim());
      if (!headerSkipped && !rows.length && headerColumns(parts.comma || parts)) {
        headerSkipped = true;
        return;
      }
      rows.push(withError({ line: i + 1, ...fieldsToRow(parts), topic: '' }, en));
    });
  });
  return markDuplicates(rows.slice(0, MAX_ROWS));
}

// Spreadsheet cells (Excel sheet or CSV): a header row picks the columns,
// otherwise columns are word, translation, part of speech, definition, example.
export function parseWordCells(cells, sheetTopic = '', en = false) {
  const table = (cells || []).map((r) => (r || []).map((c) => (c == null ? '' : String(c).trim())));
  const first = table.findIndex((r) => r.some(Boolean));
  if (first === -1) return [];
  const header = headerColumns(table[first]);
  const columns = header || Object.fromEntries(POSITIONAL.map((f, i) => [i, f]));
  const rows = [];
  table.slice(header ? first + 1 : first).forEach((cellsOfRow, i) => {
    if (!cellsOfRow.some(Boolean)) return;
    const row = { word: '', translation: '', partOfSpeech: '', definition: '', example: '', topic: '' };
    Object.entries(columns).forEach(([idx, field]) => { row[field] = cellsOfRow[idx] || ''; });
    const pos = normalizePOS(row.partOfSpeech);
    rows.push(withError({
      line: (header ? first + 2 : first + 1) + i,
      word: row.word,
      translation: row.translation,
      partOfSpeech: pos || (row.partOfSpeech ? 'other' : guessPOS(row.translation)),
      definition: row.definition,
      example: row.example,
      topic: row.topic || sheetTopic,
    }, en));
  });
  return rows.slice(0, MAX_ROWS);
}

// Later repeats of the same word (in the same topic) are shown, not imported.
export function markDuplicates(rows) {
  const seen = new Set();
  return rows.map((r) => {
    if (r.error) return r;
    const key = `${r.topic.toLowerCase()}\u0000${r.word.toLowerCase()}`;
    const duplicate = seen.has(key);
    seen.add(key);
    return { ...r, duplicate };
  });
}

export const importable = (rows) => rows.filter((r) => !r.error && !r.duplicate);

export const toWord = (r) => ({
  id: newId('w'),
  word: r.word,
  translation: r.translation,
  partOfSpeech: r.partOfSpeech || 'noun',
  definition: r.definition || '',
  example: r.example || '',
});

const extOf = (name) => (String(name).toLowerCase().match(/\.([a-z0-9]+)$/) || [])[1] || '';

// Text files saved by old Windows editors aren't UTF-8; cp1251 also covers
// Cyrillic Uzbek and the curly apostrophes of cp1252.
function decodeText(buffer) {
  const utf8 = new TextDecoder('utf-8').decode(buffer);
  if (!utf8.includes(String.fromCharCode(0xfffd))) return utf8;
  try { return new TextDecoder('windows-1251').decode(buffer); } catch { return utf8; }
}

function detectCsvSeparator(text) {
  const sepLine = text.match(/^sep=(.)/i);
  if (sepLine) return sepLine[1];
  const firstLine = text.split(/\r?\n/).find((l) => l.trim()) || '';
  return ['\t', ';', ','].map((s) => [s, firstLine.split(s).length]).sort((a, b) => b[1] - a[1])[0][0];
}

// → { rows, topics: string[] } or throws an Error with a message in the
// caller's language (`en`: center admin only — teacher panel stays Uzbek,
// same per-panel-flag pattern as the rest of this module).
export async function readWordFile(file, en = false) {
  const ext = extOf(file.name);
  if (file.size > MAX_FILE_BYTES) throw new Error(en ? "File too large (max 2 MB)." : 'Fayl juda katta (2 MB dan oshmasin).');

  if (ext === 'xls') throw new Error(en ? 'Old .xls format. In Excel, use "Save As" → .xlsx and save again.' : "Eski .xls format. Excel'da «Saqlash» → .xlsx qilib qayta saqlang.");
  if (ext === 'xlsx') {
    const { default: readXlsxFile } = await import('read-excel-file/browser');
    let sheets;
    try {
      sheets = await readXlsxFile(file);
    } catch {
      throw new Error(en ? "Couldn't read the Excel file. Check that it isn't corrupted." : "Excel faylni o'qib bo'lmadi. Fayl buzilmaganini tekshiring.");
    }
    const filled = sheets.filter((s) => (s.data || []).some((r) => r.some((c) => c != null && String(c).trim())));
    const useSheetNames = filled.length > 1;
    const rows = markDuplicates(filled.flatMap((s) => parseWordCells(s.data, useSheetNames ? s.sheet : '', en)).slice(0, MAX_ROWS));
    return { rows, topics: topicsOf(rows) };
  }

  if (ext === 'txt' || ext === 'csv' || ext === 'tsv') {
    const text = stripBom(decodeText(await file.arrayBuffer()));
    if (ext === 'txt') {
      const rows = parseWordText(text, en);
      return { rows, topics: [] };
    }
    const sep = ext === 'tsv' ? '\t' : detectCsvSeparator(text);
    const cells = text.split(/\r\n|\r|\n/).filter((l) => !/^sep=.$/i.test(l.trim())).map((l) => splitQuoted(l, sep));
    const rows = markDuplicates(parseWordCells(cells, '', en));
    return { rows, topics: topicsOf(rows) };
  }

  throw new Error(en ? 'Excel (.xlsx) or text (.txt, .csv) files only.' : 'Faqat Excel (.xlsx) yoki matn (.txt, .csv) fayl.');
}

function topicsOf(rows) {
  const seen = new Map();
  rows.forEach((r) => { if (r.topic && !seen.has(r.topic.toLowerCase())) seen.set(r.topic.toLowerCase(), r.topic); });
  return [...seen.values()];
}
