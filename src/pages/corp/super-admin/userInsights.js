// Everything the super admin's user page shows about one learner, worked out
// from the raw account node (users/{uid}). Pure, so it can be tested.
import { getDecayedMastery } from '@voc/memory-engine';

const DAY = 24 * 60 * 60 * 1000;
const LEARNED_AT = 80;

/** How the person signs in: an e-mail, or the phone/username behind a made-up address. */
export function signInLabel(email) {
  const e = String(email || '');
  let m = /^(?:student|teacher)_(\d+)@markaz\.uz$/.exec(e);
  if (m) return { kind: 'phone', value: `+${m[1]}` };
  m = /^u_(.+)@markaz\.uz$/.exec(e);
  if (m) return { kind: 'username', value: m[1] };
  return e ? { kind: 'email', value: e } : null;
}

const dayKey = (ts) => new Date(ts).toISOString().slice(0, 10);

export function userInsights(raw, now = Date.now()) {
  const u = raw || {};
  const packs = u.packs || {};
  const groups = Object.values(u.groupMemberships || {});
  const perDay = {};
  const recent = [];
  let total = 0;
  let learned = 0;
  let started = 0;
  let due = 0;
  let masterySum = 0;
  let reviews = 0;
  let lastReview = 0;
  const bySource = [];

  Object.entries(u.words || {}).forEach(([storageId, list]) => {
    if (!list || typeof list !== 'object') return;
    const pack = packs[storageId];
    const src = { id: storageId, name: pack?.name || null, icon: pack?.icon || null, personal: Boolean(pack), words: 0, learned: 0, masterySum: 0 };
    Object.entries(list).forEach(([wordId, w]) => {
      if (!w || typeof w !== 'object') return;
      total += 1;
      src.words += 1;
      const mastery = getDecayedMastery(w, now);
      masterySum += mastery;
      src.masterySum += mastery;
      if (mastery >= LEARNED_AT) { learned += 1; src.learned += 1; }
      if ((w.reviewCount || 0) > 0) started += 1;
      if (w.nextReview && Date.parse(w.nextReview) <= now && (w.reviewCount || 0) > 0) due += 1;
      const history = Array.isArray(w.recallHistory) ? w.recallHistory : Object.values(w.recallHistory || {});
      reviews += Math.max(history.length, w.reviewCount || 0);
      history.forEach((h) => {
        const t = h?.ts ? Date.parse(h.ts) : NaN;
        if (Number.isFinite(t)) perDay[dayKey(t)] = (perDay[dayKey(t)] || 0) + 1;
      });
      const last = w.lastReviewed ? Date.parse(w.lastReviewed) : 0;
      if (last > lastReview) lastReview = last;
      if (last) recent.push({ id: `${storageId}/${wordId}`, word: w.word || '', translation: w.translation || '', mastery, last, source: src.name });
    });
    bySource.push(src);
  });

  // last 12 weeks, oldest first, for a small activity grid
  const days = [];
  for (let i = 83; i >= 0; i -= 1) {
    const key = dayKey(now - i * DAY);
    days.push({ key, count: perDay[key] || 0 });
  }

  recent.sort((a, b) => b.last - a.last);

  return {
    total,
    learned,
    started,
    fresh: total - started,
    due,
    avgMastery: total ? Math.round(masterySum / total) : null,
    reviews,
    lastReview: lastReview || null,
    activeDays30: days.slice(-30).filter((d) => d.count > 0).length,
    days,
    recent: recent.slice(0, 15),
    sources: bySource
      .map((s) => ({ ...s, mastery: s.words ? Math.round(s.masterySum / s.words) : 0 }))
      .sort((a, b) => b.words - a.words),
    groups,
    appMode: u.profile?.appMode || (groups.length ? 'group' : 'individual'),
    language: u.profile?.language || null,
    wordTarget: u.profile?.wordTarget ?? null,
  };
}
