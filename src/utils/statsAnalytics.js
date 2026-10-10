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

// Reviews coming due in each of the next `n` days. Anything already overdue lands on today,
// and so do words that were never reviewed (the Dashboard counts them as due too, so the
// numbers agree).
export function reviewForecast(words, n = 7, now = Date.now()) {
  const today = startOfDay(now).getTime();
  const out = Array.from({ length: n }, (_, i) => ({ day: new Date(today + i * DAY), count: 0 }));
  words.forEach((w) => {
    if (!w.nextReview) { out[0].count += 1; return; }
    const t = new Date(w.nextReview).getTime();
    if (!Number.isFinite(t)) { out[0].count += 1; return; }
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
