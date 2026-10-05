import { useMemo } from 'react';
import { masterySnapshot, tashkentDay } from '../super-admin/centerActivity';
import { masteryDistribution } from './dashboardData';
import { groupTrend, homeworkStats, studentRows, studentStatus, studentStatusEn, topicStats } from './groupInsights';

export const fmtLongDay = (iso) => (iso ? new Date(iso).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' }) : '—');
// English equivalent, for the center admin panel (see groupInsights.js's
// studentStatusEn for the same per-panel-function pattern).
export const fmtLongDayEn = (iso) => (iso ? new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : '—');
export const masteryTone = (m) => (m == null ? '' : m >= 80 ? 'is-good' : m >= 40 ? 'is-mid' : 'is-low');

// Everything the tabs need, computed once. `en: true` (center admin only —
// the teacher panel stays Uzbek) switches the status labels/notes and the
// student-name fallback to English; the numbers themselves don't change.
export function useGroupInsights(group, center, { withTrend = false, en = false } = {}) {
  const homeworkList = useMemo(() => Object.values(group?.homeworkList || {}), [group]);
  const rows = useMemo(
    () => (group ? studentRows(group, homeworkList, Date.now(), en ? 'Student' : "O'quvchi").map((r) => ({ ...r, status: en ? studentStatusEn(r) : studentStatus(r) })) : []),
    [group, homeworkList, en],
  );
  const hw = useMemo(() => (group ? homeworkStats(group, rows) : { items: [], rate: null }), [group, rows]);
  const courses = useMemo(() => (group ? topicStats(group, center?.customPacks) : []), [group, center]);
  const dist = useMemo(() => masteryDistribution(rows.map((r) => r.mastery), en), [rows, en]);
  const today = useMemo(() => (group ? masterySnapshot([{ ...group, status: undefined }]) : null), [group]);
  const trend = useMemo(
    () => (group && withTrend ? groupTrend(center?.masteryHistory, group.id, today, tashkentDay(), 30, en) : []),
    [center, group, today, withTrend, en],
  );
  const weakest = courses.flatMap((c) => c.topics).filter((t) => t.avg != null).sort((a, b) => a.avg - b.avg)[0] || null;
  return {
    rows,
    hw,
    courses,
    dist,
    trend,
    weakest,
    total: rows.length,
    activeWeek: rows.filter((r) => r.activeWeek).length,
    lastActivity: Math.max(0, ...rows.map((r) => r.last || 0)) || null,
  };
}
