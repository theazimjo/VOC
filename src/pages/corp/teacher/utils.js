export const GROUP_LEVEL_OPTIONS = [
  'Beginner', 'Elementary', 'Pre-Intermediate', 'Intermediate', 'Upper-Intermediate',
  'Advanced', 'Pre-IELTS', 'IELTS', 'CEFR B1', 'CEFR B2', 'CEFR C1',
];

// All packs assigned to a group across its three categories, deduplicated,
// each tagged with the category it's assigned under (a pack could in theory
// appear in more than one category — first match wins for the badge).
export function getGroupPackEntries(group) {
  if (!group) return [];
  const categories = [
    { key: 'assignedPacks', label: 'Main' },
    { key: 'requiredPacks', label: 'Required' },
    { key: 'additionalPacks', label: "Extra" },
  ];
  const seen = new Map();
  categories.forEach(({ key, label }) => {
    (group[key] || []).forEach(packId => {
      if (!seen.has(packId)) seen.set(packId, { packId, category: label });
    });
  });
  return [...seen.values()];
}

// Flatten a pack's months → units into a flat list of topics, each tagged
// with the same `${monthId}_${unitId}` key CorpPractice/StudentCorpLearn
// write progress under — this is what lets the teacher see "3-mavzu: 0%"
// instead of only a whole-pack %. Same months||units||words fallback used
// everywhere else in the corp module for legacy flat-shape packs.
export function getPackUnits(pack) {
  if (!pack) return [];
  const months = pack.months && pack.months.length > 0
    ? pack.months
    : pack.units && pack.units.length > 0
      ? [{ id: 'm1', title: 'Month 1', units: pack.units }]
      : pack.words && pack.words.length > 0
        ? [{ id: 'm1', title: 'Month 1', units: [{ id: 'u1', title: 'Topic 1', words: pack.words }] }]
        : [];

  const units = [];
  months.forEach(month => {
    (month.units || []).forEach(unit => {
      units.push({
        unitKey: `${month.id}_${unit.id}`,
        monthId: month.id,
        unitId: unit.id,
        title: unit.title,
        monthTitle: month.title,
        totalWords: (unit.words || []).length,
      });
    });
  });
  return units;
}

// Every topic a teacher can hand out as homework: every unit of every pack
// assigned to the group under Main or Extra (never Required — that
// category's gone). Topics already given in a past assignment (`usedKeys`,
// built from the group's whole homeworkList) are still included — just
// flagged `used: true` — so the picker can show them greyed out instead of
// hiding them outright; the teacher can see at a glance what's already been
// covered. Each candidate carries everything a homework item needs to both
// render on its own (packTitle/unitTitle/totalWords) and link straight into
// the exact same topic a student would reach by browsing normally
// (packId/monthId/unitId) — homework never copies a topic's words, it just
// points at one that's already there.
export function getHomeworkCandidates(group, customPacks, usedKeys = new Set()) {
  if (!group) return [];
  const packIds = [...new Set([...(group.assignedPacks || []), ...(group.additionalPacks || [])])];
  const candidates = [];
  packIds.forEach(packId => {
    const pack = customPacks.find(cp => cp.id === packId);
    if (!pack) return;
    getPackUnits(pack).forEach(unit => {
      if (unit.totalWords === 0) return;
      const key = `${packId}_${unit.monthId}_${unit.unitId}`;
      candidates.push({
        packId,
        monthId: unit.monthId,
        unitId: unit.unitId,
        packTitle: pack.title,
        unitTitle: unit.title,
        totalWords: unit.totalWords,
        used: usedKeys.has(key),
      });
    });
  });
  return candidates;
}

// Flat set of "packId_monthId_unitId" keys already given across every past
// homework assignment for this group.
export function getUsedHomeworkKeys(homeworkList) {
  const keys = new Set();
  (homeworkList || []).forEach(hw => {
    (hw.items || []).forEach(item => {
      keys.add(`${item.packId}_${item.monthId}_${item.unitId}`);
    });
  });
  return keys;
}

// Resolves one homework item back to its actual unit (with real words),
// straight from customPacks — homework items only ever store the pointer
// (packId/monthId/unitId) plus a display snapshot, never the words
// themselves, so this is the one place that needs the live pack data.
export function resolveHomeworkItemUnit(item, customPacks) {
  const pack = customPacks.find(cp => cp.id === item.packId);
  if (!pack) return null;
  const months = pack.months && pack.months.length > 0
    ? pack.months
    : pack.units && pack.units.length > 0
      ? [{ id: 'm1', units: pack.units }]
      : pack.words && pack.words.length > 0
        ? [{ id: 'm1', units: [{ id: 'u1', words: pack.words }] }]
        : [];
  const month = months.find(m => m.id === item.monthId);
  return month?.units?.find(u => u.id === item.unitId) || null;
}

// Reads a student's progress for one pack, whether it's in the current
// per-unit shape (`progress[packId].units[unitKey] = {...}`, see
// corpService.js: updateStudentUnitProgress) or an older flat snapshot from
// before that change (`progress[packId] = { wordsLearned, masteryPercent, ... }`
// directly) — old records are treated as a single implicit unit so they
// still display instead of silently vanishing.
export function aggregatePackProgress(prog) {
  const empty = { hasData: false, wordsLearned: 0, masteryPercent: 0, retentionPercent: 0, atRiskCount: 0, lastActivity: null, units: {} };
  if (!prog) return empty;

  const unitEntries = prog.units ? Object.entries(prog.units) : (typeof prog.wordsLearned === 'number' ? [['__legacy__', prog]] : []);
  if (unitEntries.length === 0) return empty;

  const values = unitEntries.map(([, u]) => u);
  const wordsLearned = values.reduce((sum, u) => sum + (u.wordsLearned || 0), 0);
  const masteryPercent = Math.round(values.reduce((sum, u) => sum + (u.masteryPercent || 0), 0) / values.length);
  const retentionPercent = Math.round(values.reduce((sum, u) => sum + (u.retentionPercent || 0), 0) / values.length);
  const atRiskCount = values.reduce((sum, u) => sum + (u.atRiskCount || 0), 0);
  const lastActivity = values.map(u => u.lastActivity).filter(Boolean).sort().pop() || null;

  return {
    hasData: true,
    wordsLearned,
    masteryPercent,
    retentionPercent,
    atRiskCount,
    lastActivity,
    units: prog.units || {},
  };
}

// Aggregate completion stats for a group: average % across every
// (student × assigned pack) pair that has real progress data, plus how many
// students have made any progress at all.
export function computeGroupStats(group, students, customPacks) {
  const packEntries = getGroupPackEntries(group);
  let percentSum = 0;
  let percentCount = 0;
  const studentsWithProgress = new Set();

  (students || []).forEach(student => {
    packEntries.forEach(({ packId }) => {
      const pack = customPacks.find(cp => cp.id === packId);
      const totalWords = pack ? (pack.wordCount || (pack.words ? pack.words.length : 0)) : 0;
      const agg = aggregatePackProgress((student.progress || {})[packId]);
      if (agg.hasData && totalWords > 0) {
        percentSum += Math.min(100, Math.round((agg.wordsLearned / totalWords) * 100));
        percentCount += 1;
        studentsWithProgress.add(student.id);
      }
    });
  });

  return {
    packEntries,
    avgPercent: percentCount > 0 ? Math.round(percentSum / percentCount) : 0,
    activeStudentsCount: studentsWithProgress.size,
  };
}

// One student's mastery/retention summary across a group's assigned packs,
// from the masteryPercent/retentionPercent/atRiskCount fields the student's
// own client denormalizes into their progress node (see corpService.js:
// updateStudentUnitProgress) — teachers have no read access to the raw
// per-word data those numbers are computed from.
export function getStudentSummary(student, group) {
  const packEntries = getGroupPackEntries(group);
  const entries = packEntries
    .map(({ packId }) => aggregatePackProgress((student.progress || {})[packId]))
    .filter(a => a.hasData);

  if (entries.length === 0) {
    return { hasData: false, masteryPercent: 0, retentionPercent: 0, atRiskCount: 0, lastActivity: null };
  }

  const masteryPercent = Math.round(entries.reduce((sum, p) => sum + (p.masteryPercent || 0), 0) / entries.length);
  const retentionPercent = Math.round(entries.reduce((sum, p) => sum + (p.retentionPercent || 0), 0) / entries.length);
  const atRiskCount = entries.reduce((sum, p) => sum + (p.atRiskCount || 0), 0);
  const lastActivity = entries
    .map(p => p.lastActivity)
    .filter(Boolean)
    .sort()
    .pop() || null;

  return { hasData: true, masteryPercent, retentionPercent, atRiskCount, lastActivity };
}
