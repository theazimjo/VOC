// Turns the raw groups returned by getCenterStats() into the few numbers a
// founder actually checks: is this center using VOC, or has it gone quiet?
// Everything comes from data already on the group nodes — students write
// `lastActivity` on every practiced unit (corpService.updateStudentUnitProgress)
// and teachers append to `homeworkList` — so no extra reads are needed.

const DAY = 24 * 60 * 60 * 1000;

export function latestUnitActivity(student) {
  let latest = 0;
  Object.values(student?.progress || {}).forEach((pack) => {
    Object.values(pack?.units || {}).forEach((unit) => {
      const t = unit?.lastActivity ? Date.parse(unit.lastActivity) : 0;
      if (t > latest) latest = t;
    });
    // Legacy flat per-pack snapshot (pre per-unit progress).
    const legacy = pack?.lastActivity ? Date.parse(pack.lastActivity) : 0;
    if (legacy > latest) latest = legacy;
  });
  return latest;
}

export function computeCenterActivity(stats, now = Date.now()) {
  const groups = (stats?.groups || []).filter((g) => g.status !== 'archived');
  let students = 0;
  let activeWeek = 0;
  let homeworkTotal = 0;
  let homeworkWeek = 0;
  let lastActivity = 0;

  groups.forEach((g) => {
    Object.values(g.students || {}).forEach((st) => {
      students += 1;
      const t = latestUnitActivity(st);
      if (t > lastActivity) lastActivity = t;
      if (t && now - t <= 7 * DAY) activeWeek += 1;
    });
    Object.values(g.homeworkList || {}).forEach((hw) => {
      homeworkTotal += 1;
      const t = hw?.assignedAt ? Date.parse(hw.assignedAt) : 0;
      if (t && now - t <= 7 * DAY) homeworkWeek += 1;
      if (t > lastActivity) lastActivity = t;
    });
  });

  let health = 'new';
  if (students > 0 || homeworkTotal > 0) {
    if (lastActivity && now - lastActivity <= 7 * DAY) health = 'active';
    else health = 'quiet';
  }

  return {
    teachers: stats?.teachersCount || 0,
    groups: groups.length,
    students,
    activeWeek,
    homeworkTotal,
    homeworkWeek,
    lastActivity: lastActivity || null,
    health, // 'active' — used this week · 'quiet' — used before, not this week · 'new' — not started yet
  };
}

// Per-group numbers for the center page's groups table.
export function computeGroupActivity(group, now = Date.now()) {
  const students = Object.values(group?.students || {});
  let activeWeek = 0;
  let lastActivity = 0;
  students.forEach((st) => {
    const t = latestUnitActivity(st);
    if (t > lastActivity) lastActivity = t;
    if (t && now - t <= 7 * DAY) activeWeek += 1;
  });
  const homework = Object.values(group?.homeworkList || {});
  homework.forEach((hw) => {
    const t = hw?.assignedAt ? Date.parse(hw.assignedAt) : 0;
    if (t > lastActivity) lastActivity = t;
  });
  return { students: students.length, activeWeek, homework: homework.length, lastActivity: lastActivity || null };
}

// One student's average mastery across every unit they've practiced.
export function studentMastery(student) {
  const values = [];
  Object.values(student?.progress || {}).forEach((pack) => {
    Object.values(pack?.units || {}).forEach((u) => values.push(u?.masteryPercent || 0));
    if (typeof pack?.masteryPercent === 'number' && !pack.units) values.push(pack.masteryPercent);
  });
  if (values.length === 0) return null;
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

// Total seconds a student has spent typing, summed across every unit's
// latest recorded session (see corpService.updateStudentUnitProgress). Pass
// `sinceTs` to only count units last practiced after that time (e.g. "this
// week"). Units saved before this stat existed have no `timeSpentSeconds`
// and simply contribute 0 — not an error, just no data yet.
export function studentTimeSpent(student, { sinceTs } = {}) {
  let seconds = 0;
  Object.values(student?.progress || {}).forEach((pack) => {
    Object.values(pack?.units || {}).forEach((u) => {
      if (!u?.timeSpentSeconds) return;
      if (sinceTs) {
        const t = u.lastActivity ? Date.parse(u.lastActivity) : 0;
        if (t < sinceTs) return;
      }
      seconds += u.timeSpentSeconds;
    });
  });
  return seconds;
}

// Relative time in English, for every staff panel (super admin, center admin, teacher).
export function formatRelativeEn(ts, now = Date.now()) {
  if (!ts) return 'no activity yet';
  const diff = now - ts;
  if (diff < 60 * 60 * 1000) return 'just now';
  if (diff < DAY) {
    const hours = Math.floor(diff / (60 * 60 * 1000));
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  const days = Math.floor(diff / DAY);
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
  return new Date(ts).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
}

export const formatRelative = formatRelativeEn;

export const HEALTH_LABEL = {
  active: 'Active',
  quiet: 'Gone quiet',
  new: 'Not started',
};

// One day's mastery point for a center: the average of every student (in
// active groups) who has practiced, plus how many that is. Written nightly
// by api/cron-mastery-snapshot.js and shown live for "today" on the admin
// dashboard, so both use this one definition.
export function masterySnapshot(groups) {
  let practiced = 0;
  let total = 0;
  let sum = 0;
  (groups || []).forEach((g) => {
    if (g?.status === 'archived') return;
    Object.values(g?.students || {}).forEach((st) => {
      total += 1;
      const m = studentMastery(st);
      if (m != null) {
        practiced += 1;
        sum += m;
      }
    });
  });
  return { avg: practiced ? Math.round(sum / practiced) : null, practiced, total };
}

// Calendar day in Tashkent (the product's market), e.g. "2026-09-26".
export function tashkentDay(ts = Date.now()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tashkent', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(ts));
}
