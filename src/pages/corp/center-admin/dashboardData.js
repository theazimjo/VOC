export const MASTERY_BUCKETS = [
  { key: 'none', label: 'Boshlamagan', color: '#71717a' },
  { key: 'b0', label: '0–20%', min: 0, max: 20, color: '#ff3b30' },
  { key: 'b20', label: '20–40%', min: 20, max: 40, color: '#ff9500' },
  { key: 'b40', label: '40–60%', min: 40, max: 60, color: '#ffcc00' },
  { key: 'b60', label: '60–80%', min: 60, max: 80, color: '#30b0c7' },
  { key: 'b80', label: '80–100%', min: 80, max: 101, color: '#34c759' },
];

// English labels for the center admin panel (teacher panel keeps
// MASTERY_BUCKETS above) — same keys/ranges/colors, just the label text.
export const MASTERY_BUCKETS_EN = MASTERY_BUCKETS.map((b) => ({
  ...b,
  label: b.key === 'none' ? 'Not started' : b.label,
}));

// How many students sit in each mastery range. `masteries` is one value per
// student: a 0–100 number, or null when they haven't practiced yet. Pass
// `en: true` for English bucket labels (center admin only).
//   { buckets: [{ key, label, color, count }], average, practiced, total }
export function masteryDistribution(masteries, en = false) {
  const buckets = (en ? MASTERY_BUCKETS_EN : MASTERY_BUCKETS).map((b) => ({ ...b, count: 0 }));
  const values = [];
  (masteries || []).forEach((m) => {
    if (m == null) {
      buckets[0].count += 1;
      return;
    }
    const v = Math.max(0, Math.min(100, m));
    values.push(v);
    buckets.find((b) => b.max != null && v >= b.min && v < b.max).count += 1;
  });
  return {
    buckets,
    average: values.length ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : null,
    practiced: values.length,
    total: (masteries || []).length,
  };
}

// Day-by-day average mastery for the chart: the nightly points saved under
// centers/{id}/masteryHistory plus today's live value (which replaces
// tonight's point until it's written). Oldest first, last `days` days.
//   history: { 'YYYY-MM-DD': { avg, practiced, total } }
//   → [{ day, label: '26-sen', avg, practiced, total, live? }]
// Pass `en: true` for English chart-point labels (center admin only).
export function masteryTrend(history, today, todayKey, days = 30, en = false) {
  const points = Object.entries(history || {})
    .filter(([day, p]) => day !== todayKey && p && p.avg != null)
    .map(([day, p]) => ({ day, avg: p.avg, practiced: p.practiced || 0, total: p.total || 0 }));
  if (today && today.avg != null) points.push({ day: todayKey, avg: today.avg, practiced: today.practiced, total: today.total, live: true });
  return points
    .sort((a, b) => a.day.localeCompare(b.day))
    .slice(-days)
    .map((p) => {
      const [y, m, d] = p.day.split('-').map(Number);
      const label = new Date(y, m - 1, d).toLocaleDateString(en ? 'en-US' : 'uz-UZ', { day: 'numeric', month: 'short' }).replace(/\.$/, '');
      return { ...p, label };
    });
}
