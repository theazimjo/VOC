// Pure data helpers for the course editor (months → units → words). Kept
// out of the component so the import parser and merge rules are testable.

export const POS_OPTIONS = [
  { value: 'noun', label: 'Ot' },
  { value: 'verb', label: "Fe'l" },
  { value: 'adjective', label: 'Sifat' },
  { value: 'adverb', label: 'Ravish' },
  { value: 'phrase', label: 'Ibora' },
  { value: 'preposition', label: 'Predlog' },
  { value: 'other', label: 'Boshqa' },
];

export const POS_LABEL = Object.fromEntries(POS_OPTIONS.map((o) => [o.value, o.label]));

// English versions, for the center admin panel (see CourseEditor.jsx's `en`
// prop) — the teacher panel keeps POS_OPTIONS/POS_LABEL above.
export const POS_OPTIONS_EN = [
  { value: 'noun', label: 'Noun' },
  { value: 'verb', label: 'Verb' },
  { value: 'adjective', label: 'Adjective' },
  { value: 'adverb', label: 'Adverb' },
  { value: 'phrase', label: 'Phrase' },
  { value: 'preposition', label: 'Preposition' },
  { value: 'other', label: 'Other' },
];

export const POS_LABEL_EN = Object.fromEntries(POS_OPTIONS_EN.map((o) => [o.value, o.label]));

// Older packs stored a flat `units` or `words` list — show them as one month.
export function monthsOf(course, en = false) {
  if (course?.months?.length) return course.months;
  if (course?.units?.length) return [{ id: 'm1', title: en ? 'Month 1' : '1-oy', units: course.units }];
  if (course?.words?.length) return [{ id: 'm1', title: en ? 'Month 1' : '1-oy', units: [{ id: 'u1', title: en ? 'Topic 1' : '1-mavzu', words: course.words }] }];
  return [];
}

// What gets written back: the tree plus the flat copies and counts the rest
// of the app reads.
export function courseUpdates(months) {
  const units = months.flatMap((m) => m.units || []);
  const words = units.flatMap((u) => u.words || []);
  return { months, units, words, sectionsCount: units.length, wordCount: words.length };
}

export function courseTotals(months) {
  const units = months.flatMap((m) => m.units || []);
  return {
    months: months.length,
    units: units.length,
    words: units.reduce((sum, u) => sum + (u.words || []).length, 0),
  };
}

export const newId = (prefix) => `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

export function mapMonth(months, monthId, fn) {
  return months.map((m) => (m.id === monthId ? fn(m) : m));
}

export function mapUnit(months, monthId, unitId, fn) {
  return mapMonth(months, monthId, (m) => ({
    ...m,
    units: (m.units || []).map((u) => (u.id === unitId ? fn(u) : u)),
  }));
}

export function normalizePOS(str) {
  if (!str) return null;
  const s = str.trim().toLowerCase().replace(/[^a-z'ʻʼ]/g, '');
  if (!s) return null;
  if (s.startsWith('noun') || s.startsWith('ot') || s === 'n') return 'noun';
  if (s.startsWith('verb') || s.startsWith('fe') || s === 'v') return 'verb';
  if (s.startsWith('adj') || s.startsWith('sif') || s === 'a') return 'adjective';
  if (s.startsWith('adv') || s.startsWith('rav')) return 'adverb';
  if (s.startsWith('phr') || s.startsWith('ibo') || s.startsWith('ido')) return 'phrase';
  if (s.startsWith('prep') || s.startsWith('pred')) return 'preposition';
  if (s.startsWith('oth') || s.startsWith('bos') || s.startsWith('etc')) return 'other';
  return null;
}

// Adds new words; a word already in the topic (same spelling, any case) is
// updated with whatever the import provides instead of duplicated.
export function mergeWords(existing, incoming) {
  const words = [...(existing || [])];
  let added = 0;
  let updated = 0;
  incoming.forEach((w) => {
    const idx = words.findIndex((x) => (x.word || '').toLowerCase() === w.word.toLowerCase());
    if (idx === -1) {
      words.push(w);
      added += 1;
    } else {
      const old = words[idx];
      words[idx] = {
        ...old,
        translation: w.translation || old.translation,
        ...((w.translationRu || old.translationRu) ? { translationRu: w.translationRu || old.translationRu } : {}),
        partOfSpeech: w.partOfSpeech || old.partOfSpeech,
        definition: w.definition || old.definition,
        example: w.example || old.example,
      };
      updated += 1;
    }
  });
  return { words, added, updated };
}

// Moves a topic one place up (-1) or down (+1) inside its month.
export function moveUnit(months, monthId, unitId, delta) {
  return mapMonth(months, monthId, (m) => {
    const units = [...(m.units || [])];
    const i = units.findIndex((u) => u.id === unitId);
    const j = i + delta;
    if (i === -1 || j < 0 || j >= units.length) return m;
    [units[i], units[j]] = [units[j], units[i]];
    return { ...m, units };
  });
}

// Books from the system library (marketData packs with a `topic` on each
// word, like Science and Health) become a course of the center: one topic
// per chapter, in book order, every word with its own id so it can be
// edited afterwards like any other course word.
export const LIBRARY_BOOK_IDS = ['science', 'health'];

// Bump when the library books get new words or translations: courses added
// earlier are then brought up to date once (see syncCourseWithBook).
export const LIBRARY_VERSION = 2;

const libraryWord = (w) => ({
  id: newId('w'),
  word: w.word,
  translation: w.translation || '',
  ...(w.translationRu ? { translationRu: w.translationRu } : {}),
  partOfSpeech: normalizePOS(w.partOfSpeech) || 'noun',
  definition: w.definition || '',
  example: w.example || '',
});

export function libraryBookToCourse(book) {
  const byTopic = new Map();
  (book.words || []).forEach((w) => {
    const topic = w.topic || book.name;
    if (!byTopic.has(topic)) byTopic.set(topic, []);
    byTopic.get(topic).push(libraryWord(w));
  });
  // `reading` points at the chapter text bundled with the app (ChapterReader loads it on demand).
  const units = [...byTopic].map(([title, words]) => ({ id: newId('unit'), title, words, reading: { book: book.id, topic: title } }));
  const level = String(book.level || 'intermediate');
  return {
    title: book.name,
    level: level.charAt(0).toUpperCase() + level.slice(1),
    description: '',
    months: [{ id: 'm1', title: '1-oy', units }],
  };
}

// Brings a course that was added from the library earlier up to date: library
// words the course doesn't have yet are added, and words without a Russian
// translation get it. Nothing the center changed is overwritten or removed.
export function syncCourseWithBook(months, book) {
  const byTopic = new Map();
  (book.words || []).forEach((w) => {
    const topic = w.topic || book.name;
    if (!byTopic.has(topic)) byTopic.set(topic, []);
    byTopic.get(topic).push(w);
  });
  let added = 0;
  let filled = 0;
  let matched = 0;
  const next = (months || []).map((m) => ({
    ...m,
    units: (m.units || []).map((u) => {
      const topic = u.reading?.topic || u.title;
      const lib = byTopic.get(topic);
      if (!lib) return u;
      matched += 1;
      const words = [...(u.words || [])];
      lib.forEach((lw) => {
        const i = words.findIndex((w) => (w.word || '').toLowerCase() === lw.word.toLowerCase());
        if (i === -1) {
          words.push(libraryWord(lw));
          added += 1;
        } else if (!words[i].translationRu && lw.translationRu) {
          words[i] = { ...words[i], translationRu: lw.translationRu };
          filled += 1;
        }
      });
      return { ...u, words, reading: u.reading || { book: book.id, topic } };
    }),
  }));
  return { months: next, added, filled, matched };
}
