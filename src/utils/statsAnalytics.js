// Pure helpers behind the Statistics page: everything is derived from the learner's
// words (mastery, nextReview, addedAt, wrongCount) and the streak's daily activityLog.

const DAY = 86400000;

export function dayKey(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

// The last `n` days (oldest first), each with its activity count.
export function lastDays(activityLog = {}, n = 7, now = Date.now()) {
  const today = startOfDay(now);
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (n - 1 - i));
    const date = dayKey(d);
    return { date, day: d, count: Number(activityLog[date]) || 0, isToday: i === n - 1 };
  });
}

// Activity of the last 7 days against the 7 before them.
export function weekCompare(activityLog = {}, now = Date.now()) {
  const days = lastDays(activityLog, 14, now);
  const prev = days.slice(0, 7).reduce((s, d) => s + d.count, 0);
  const cur = days.slice(7).reduce((s, d) => s + d.count, 0);
  const change = prev > 0 ? Math.round(((cur - prev) / prev) * 100) : null;
  return { cur, prev, change };
}

export function activeDays(activityLog = {}, n = 30, now = Date.now()) {
  return lastDays(activityLog, n, now).filter((d) => d.count > 0).length;
}

// Reviews coming due in each of the next `n` days. Anything already overdue lands on today.
// Words that were never reviewed have no schedule: they are new words, not reviews.
export function reviewForecast(words, n = 7, now = Date.now()) {
  const today = startOfDay(now).getTime();
  const out = Array.from({ length: n }, (_, i) => ({ day: new Date(today + i * DAY), count: 0 }));
  words.forEach((w) => {
    if (!w.nextReview) return;
    const t = new Date(w.nextReview).getTime();
    if (!Number.isFinite(t)) return;
    const idx = Math.max(0, Math.floor((startOfDay(t).getTime() - today) / DAY));
    if (idx < n) out[idx].count += 1;
  });
  return out;
}

// Where every word is on its way to being learned.
export function stageCounts(words) {
  const out = { new: 0, learning: 0, reviewing: 0, mastered: 0 };
  words.forEach((w) => {
    const m = w.mastery || 0;
    if (m >= 80) out.mastered += 1;
    else if (m >= 40) out.reviewing += 1;
    else if (m > 0 || w.lastReviewed || (w.reviewCount || 0) > 0) out.learning += 1;
    else out.new += 1;
  });
  return out;
}

// Words added per week for the last `n` weeks (oldest first, weeks start on Monday).
export function weeklyGrowth(words, n = 8, now = Date.now()) {
  const today = startOfDay(now);
  const mondayOffset = (today.getDay() + 6) % 7;
  const thisMonday = new Date(today);
  thisMonday.setDate(today.getDate() - mondayOffset);
  const weeks = Array.from({ length: n }, (_, i) => {
    const d = new Date(thisMonday);
    d.setDate(thisMonday.getDate() - (n - 1 - i) * 7);
    return { start: d, count: 0 };
  });
  const first = weeks[0].start.getTime();
  words.forEach((w) => {
    const t = new Date(w.addedAt).getTime();
    if (!Number.isFinite(t) || t < first) return;
    const idx = Math.min(n - 1, Math.floor((startOfDay(t).getTime() - first) / (7 * DAY)));
    weeks[idx].count += 1;
  });
  return weeks;
}

// Sources (packs) with their word count and average mastery, biggest first.
export function sourceRanking(words) {
  const map = {};
  words.forEach((w) => {
    const key = w.source || '-';
    if (!map[key]) map[key] = { name: key, icon: w.sourceIcon, count: 0, sum: 0 };
    map[key].count += 1;
    map[key].sum += w.mastery || 0;
  });
  return Object.values(map)
    .map((s) => ({ name: s.name, icon: s.icon, count: s.count, avg: Math.round(s.sum / s.count) }))
    .sort((a, b) => b.count - a.count);
}

// ---- Activity -------------------------------------------------------------------------
// The streak's activityLog only records finished practice sessions. Every review also stamps the
// word's `lastReviewed`, so a day counts as active when either source says so (the larger of the
// two numbers wins). That way study done anywhere in the app shows up on the map.
export function activityByDay(words, activityLog = {}) {
  const reviewed = {};
  words.forEach((w) => {
    if (!w.lastReviewed) return;
    const t = new Date(w.lastReviewed).getTime();
    if (!Number.isFinite(t)) return;
    const k = dayKey(t);
    reviewed[k] = (reviewed[k] || 0) + 1;
  });
  const out = { ...reviewed };
  Object.entries(activityLog || {}).forEach(([k, v]) => {
    const n = Number(v) || 0;
    if (n > (out[k] || 0)) out[k] = n;
  });
  return out;
}

// Longest run of consecutive active days, and the run that is still alive (today or yesterday).
export function streakRuns(byDay, now = Date.now()) {
  const keys = Object.keys(byDay).filter((k) => byDay[k] > 0).sort();
  let longest = 0;
  let run = 0;
  let prev = null;
  keys.forEach((k) => {
    const d = startOfDay(new Date(`${k}T00:00:00`)).getTime();
    run = prev !== null && Math.round((d - prev) / DAY) === 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
    prev = d;
  });
  let current = 0;
  const today = startOfDay(now).getTime();
  const cursor = new Date(today);
  if (!(byDay[dayKey(cursor)] > 0)) cursor.setDate(cursor.getDate() - 1); // today may not be done yet
  while (byDay[dayKey(cursor)] > 0) { current += 1; cursor.setDate(cursor.getDate() - 1); }
  return { longest, current };
}

// Calendar grid for the last `weeks` weeks: columns are weeks (Monday first), 7 days each.
// Days after today are null. `level` runs 0-4 relative to the busiest day.
export function heatmapWeeks(byDay, weeks = 20, now = Date.now(), frozen = {}) {
  const today = startOfDay(now);
  const mondayOffset = (today.getDay() + 6) % 7;
  const start = new Date(today);
  start.setDate(today.getDate() - mondayOffset - (weeks - 1) * 7);
  const max = Math.max(1, ...Object.values(byDay).map((v) => Number(v) || 0));
  return Array.from({ length: weeks }, (_, w) => {
    const days = Array.from({ length: 7 }, (_, d) => {
      const date = new Date(start);
      date.setDate(start.getDate() + w * 7 + d);
      if (date > today) return null;
      const count = Number(byDay[dayKey(date)]) || 0;
      const level = count === 0 ? 0 : Math.min(4, Math.max(1, Math.ceil((count / max) * 4)));
      return { date: dayKey(date), day: date, count, level, frozen: Boolean(frozen[dayKey(date)]), isToday: date.getTime() === today.getTime() };
    });
    return { start: new Date(start.getTime() + w * 7 * DAY), days };
  });
}

// Words whose review time has come, kept apart from words that were never started.
export function dueSplit(words, now = Date.now()) {
  let due = 0;
  let fresh = 0;
  words.forEach((w) => {
    if (!w.nextReview) { fresh += 1; return; }
    const t = new Date(w.nextReview).getTime();
    if (!Number.isFinite(t)) { fresh += 1; return; }
    if (t <= now) due += 1;
  });
  return { due, fresh };
}

// ---- Goal forecast ---------------------------------------------------------------------
// When the learner first met a word: the oldest recorded review, or the single review it has.
function firstSeen(w) {
  const times = (w.recallHistory || []).map((h) => new Date(h?.ts).getTime()).filter(Number.isFinite);
  if (times.length) return Math.min(...times);
  if (w.lastReviewed && (Number(w.reviewCount) || 1) <= 1) {
    const t = new Date(w.lastReviewed).getTime();
    return Number.isFinite(t) ? t : null;
  }
  return null;
}

// How many words were started in the last 4 weeks, and when the target will be reached at that pace
// and at two faster paces (+2 and +5 new words a day). `target` is a number of words.
export function goalForecast(words, target, now = Date.now()) {
  const started = (words || []).filter((w) => w.lastReviewed).length;
  const since = now - 28 * DAY;
  const recent = (words || []).filter((w) => { const t = firstSeen(w); return t != null && t >= since; }).length;
  const pace = Math.round((recent / 4) * 10) / 10; // words a week
  const remaining = Math.max(0, (Number(target) || 0) - started);
  const make = (key, perWeek) => {
    if (remaining === 0) return { key, perWeek, weeks: 0, date: now };
    if (perWeek <= 0) return { key, perWeek, weeks: null, date: null };
    const weeks = remaining / perWeek;
    return weeks > 520 ? { key, perWeek, weeks: null, date: null } : { key, perWeek, weeks, date: now + weeks * 7 * DAY };
  };
  return {
    started, remaining, pace, target: Number(target) || 0,
    scenarios: [make('now', pace), make('plus2', pace + 14), make('plus5', pace + 35)],
  };
}
