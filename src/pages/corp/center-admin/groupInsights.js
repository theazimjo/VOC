// Numbers for the center admin's group page. Everything comes from the
// group node already loaded (students' denormalized progress, homework)
// plus the nightly per-group points in centers/{id}/masteryHistory.

import { latestUnitActivity, studentMastery } from '../super-admin/centerActivity';
import { aggregatePackProgress, getGroupPackEntries, getHomeworkCompletion, getPackUnits } from '../teacher/utils';
import { masteryTrend } from './dashboardData';

const DAY = 86400000;

// The group's line from the center history: history[day].groups[groupId].
export function groupTrend(history, groupId, today, todayKey, days = 30, en = false) {
  const own = {};
  Object.entries(history || {}).forEach(([day, p]) => {
    const g = p?.groups?.[groupId];
    if (g) own[day] = g;
  });
  return masteryTrend(own, today, todayKey, days, en);
}

// One row per student with what the page shows about them.
export function studentRows(group, homework, now = Date.now(), fallbackName = "O'quvchi") {
  return Object.entries(group?.students || {}).map(([uid, st]) => {
    const last = latestUnitActivity(st) || null;
    const done = homework.filter((hw) => getHomeworkCompletion(st, hw).allDone).length;
    return {
      uid,
      st,
      name: st.name || fallbackName,
      email: st.email || '',
      joinedAt: st.joinedAt || null,
      mastery: studentMastery(st),
      last,
      activeWeek: Boolean(last && now - last <= 7 * DAY),
      homeworkDone: done,
    };
  });
}

// Per course → per topic: average mastery of the students who started it.
export function topicStats(group, packById) {
  const students = Object.values(group?.students || {});
  return getGroupPackEntries(group)
    .map(({ packId }) => {
      const pack = packById?.[packId];
      if (!pack) return null;
      const aggs = students.map((st) => aggregatePackProgress((st.progress || {})[packId]));
      const topics = getPackUnits(pack).map((u) => {
        const values = aggs.map((a) => a.units[u.unitKey]).filter(Boolean).map((us) => us.masteryPercent || 0);
        return {
          key: u.unitKey,
          title: u.title,
          words: u.totalWords,
          started: values.length,
          total: students.length,
          avg: values.length ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : null,
          mastered: values.filter((v) => v >= 80).length,
        };
      });
      return { id: packId, title: pack.title, topics };
    })
    .filter(Boolean);
}

// Homework, newest first, with how many students finished / started it
// and who is where (`students`: [{ uid, name, state: done|started|none }]).
export function homeworkStats(group, rows) {
  const list = Object.entries(group?.homeworkList || {})
    .map(([id, hw]) => ({ id, ...hw }))
    .sort((a, b) => (Date.parse(b.assignedAt || '') || 0) - (Date.parse(a.assignedAt || '') || 0));
  const items = list.map((hw) => {
    let done = 0;
    let started = 0;
    const students = rows.map((r) => {
      const c = getHomeworkCompletion(r.st, hw);
      let state = 'none';
      if (c.allDone) { done += 1; state = 'done'; } else if (c.itemStats.some((s) => s.started)) { started += 1; state = 'started'; }
      return { uid: r.uid, name: r.name, state, doneCount: c.doneCount };
    });
    return { ...hw, topics: (hw.items || []).length, done, started, total: rows.length, students };
  });
  const slots = list.length * rows.length;
  const doneSlots = items.reduce((sum, h) => sum + h.done, 0);
  return { items, rate: slots ? Math.round((doneSlots / slots) * 100) : null };
}

// A student's state in plain words for the list: tone + label + why.
export function studentStatus(row, now = Date.now()) {
  if (!row.last) return { tone: 'gray', label: 'Boshlamagan', note: 'Hali mashq qilmagan' };
  const days = Math.floor((now - row.last) / DAY);
  if (days > 7) return { tone: 'orange', label: 'Sust', note: `${days} kundan beri mashq qilmagan` };
  if (row.mastery != null && row.mastery < 40) return { tone: 'orange', label: 'Qiynalyapti', note: `O'zlashtirish past: ${row.mastery}%` };
  return { tone: 'green', label: 'Faol', note: days === 0 ? 'Bugun mashq qildi' : `${days} kun oldin mashq qildi` };
}

// English equivalent of studentStatus, for the center admin panel only
// (see formatRelativeEn in centerActivity.js for the same pattern/reason —
// a separate function per panel so neither's copy can drift by accident).
export function studentStatusEn(row, now = Date.now()) {
  if (!row.last) return { tone: 'gray', label: 'Not started', note: 'No practice yet' };
  const days = Math.floor((now - row.last) / DAY);
  if (days > 7) return { tone: 'orange', label: 'Quiet', note: `No practice in ${days} days` };
  if (row.mastery != null && row.mastery < 40) return { tone: 'orange', label: 'Struggling', note: `Low mastery: ${row.mastery}%` };
  return { tone: 'green', label: 'Active', note: days === 0 ? 'Practiced today' : `Practiced ${days} day${days > 1 ? 's' : ''} ago` };
}
