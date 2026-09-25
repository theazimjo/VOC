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

export function formatRelative(ts, now = Date.now()) {
  if (!ts) return "hali faollik yo'q";
  const diff = now - ts;
  if (diff < 60 * 60 * 1000) return 'hozirgina';
  if (diff < DAY) return `${Math.floor(diff / (60 * 60 * 1000))} soat oldin`;
  const days = Math.floor(diff / DAY);
  if (days === 1) return 'kecha';
  if (days < 30) return `${days} kun oldin`;
  return new Date(ts).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short' });
}

export const HEALTH_LABEL = {
  active: 'Faol',
  quiet: 'Sustlashgan',
  new: 'Boshlanmagan',
};
