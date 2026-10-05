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
        partOfSpeech: w.partOfSpeech || old.partOfSpeech,
        definition: w.definition || old.definition,
        example: w.example || old.example,
      };
      updated += 1;
    }
  });
  return { words, added, updated };
}
