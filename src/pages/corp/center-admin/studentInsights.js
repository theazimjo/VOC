// Numbers for the admin's student page, from api/student-account.js
// "details" + the course data the admin already has. Pure, so testable.

const DAY = 86400000;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// GitHub-style practice calendar: `weeks` columns of Monday→Sunday, the
// last column being the current week (`todayKey`, YYYY-MM-DD in the
// student's time zone). Days after today are `future` (drawn empty).
// `level` 0–4 is relative to the daily goal: 0 none · 1 some · 2 half ·
// 3 goal · 4 double. `months` labels the column where each month starts.
export function activityCalendar(days, todayKey, dailyGoal = 5, weeks = 26) {
  const goal = dailyGoal > 0 ? dailyGoal : 5;
  const today = Date.parse(`${todayKey}T00:00:00Z`);
  const weekday = (new Date(today).getUTCDay() + 6) % 7; // Monday = 0
  const start = today - (weekday + (weeks - 1) * 7) * DAY;

  const columns = [];
  const months = [];
  let active = 0;
  let total = 0;
  for (let w = 0; w < weeks; w += 1) {
    const column = [];
    for (let d = 0; d < 7; d += 1) {
      const t = start + (w * 7 + d) * DAY;
      const key = new Date(t).toISOString().slice(0, 10);
      const future = t > today;
      const count = future ? 0 : Number(days?.[key]) || 0;
      let level = 0;
      if (count >= goal * 2) level = 4;
      else if (count >= goal) level = 3;
      else if (count >= goal / 2) level = 2;
      else if (count > 0) level = 1;
      if (count > 0) { active += 1; total += count; }
      column.push({ key, count, level, future });
    }
    const month = new Date(start + w * 7 * DAY).getUTCMonth();
    const prev = w === 0 ? null : new Date(start + (w - 1) * 7 * DAY).getUTCMonth();
    if (month !== prev) months.push({ column: w, label: MONTHS[month] });
    columns.push(column);
  }
  // A label squeezed into the first column or two just collides with the next.
  if (months.length > 1 && months[1].column - months[0].column < 3) months.shift();
  return { columns, months, active, total };
}

// wordId → { word, translation, topic } for every course of the group.
export function wordIndex(packs) {
  const index = {};
  (packs || []).forEach((pack) => {
    const months = pack?.months?.length ? pack.months : [{ units: pack?.units || [{ title: '', words: pack?.words || [] }] }];
    months.forEach((m) => (m.units || []).forEach((u) => (u.words || []).forEach((w) => {
      if (w?.id) index[`${pack.id}/${w.id}`] = { word: w.word, translation: w.translation, topic: u.title || '' };
    })));
  });
  return index;
}

// Totals over the per-word records the API returns ({ packId: [summary] }).
export function wordStats(words, now = Date.now()) {
  let practiced = 0;
  let strong = 0;
  let due = 0;
  let correct = 0;
  let answered = 0;
  Object.values(words || {}).forEach((list) => (list || []).forEach((w) => {
    if (w.reviewCount > 0) practiced += 1;
    if ((w.mastery || 0) >= 80) strong += 1;
    if (w.reviewCount > 0 && w.nextReview && Date.parse(w.nextReview) <= now) due += 1;
    correct += w.correct || 0;
    answered += w.answered || 0;
  }));
  return { practiced, strong, due, accuracy: answered ? Math.round((correct / answered) * 100) : null, answered };
}

// The words the student gets wrong most, with their text from the course.
export function hardWords(words, index, limit = 8) {
  const list = [];
  Object.entries(words || {}).forEach(([packId, items]) => (items || []).forEach((w) => {
    if (!(w.wrongCount > 0)) return;
    const info = index[`${packId}/${w.id}`];
    if (!info) return; // word removed from the course since
    list.push({
      ...info,
      key: `${packId}/${w.id}`,
      wrongCount: w.wrongCount,
      accuracy: w.answered ? Math.round((w.correct / w.answered) * 100) : null,
      mastery: w.mastery,
    });
  }));
  return list
    .sort((a, b) => b.wrongCount - a.wrongCount || (a.accuracy ?? 101) - (b.accuracy ?? 101))
    .slice(0, limit);
}

const PROVIDERS = { 'google.com': 'Google', password: 'Password', phone: 'Phone', 'apple.com': 'Apple' };
export const providerLabel = (providers) => (providers || []).map((p) => PROVIDERS[p] || p).join(', ') || '—';
