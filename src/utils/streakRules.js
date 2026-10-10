// Pure streak rules (no Firebase) so they can be tested. A streak counts a day once the daily goal
// is reached. Premium learners get streak freezes: when days are missed, a freeze keeps the streak
// alive instead of resetting it to zero.

export const FREEZES_PER_MONTH = 2;
const MAX_GAP_DAYS = 31; // a longer break is never covered

// 'YYYY-MM-DD' (local) + n days
export function shiftDay(dateStr, n) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(y, m - 1, d + n);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
}

// Days that broke the chain: the last active day if it fell short of the goal, and every
// day after it up to yesterday. Empty when the streak is intact.
export function missedDays(streak, todayStr) {
  const last = streak.lastActiveDate;
  if (!last || last >= todayStr) return [];
  const goal = streak.dailyGoal ?? 5;
  const log = streak.activityLog || {};
  const out = [];
  if ((log[last] || 0) < goal) out.push(last);
  let d = shiftDay(last, 1);
  let guard = 0;
  while (d < todayStr && guard < 400) {
    if ((log[d] || 0) < goal) out.push(d);
    d = shiftDay(d, 1);
    guard += 1;
  }
  return out;
}

// Start of a new day: hand out this month's freezes, then either cover the missed days with
// freezes or reset the streak. `allowance` is the freezes per month the learner's plan gives (0 = none).
export function rolloverStreak(data, todayStr, allowance = 0) {
  const s = { ...data, activityLog: { ...(data.activityLog || {}) }, frozenDays: { ...(data.frozenDays || {}) } };
  if (s.dailyGoal === undefined) s.dailyGoal = 5;

  const month = todayStr.slice(0, 7);
  if (allowance > 0 && s.freezeMonth !== month) {
    s.freezes = allowance;
    s.freezeMonth = month;
  }

  if (!s.lastActiveDate || s.lastActiveDate === todayStr) return s;

  const missed = missedDays(s, todayStr);
  if (missed.length > 0) {
    const have = Number(s.freezes) || 0;
    if (s.streakCount > 0 && missed.length <= have && missed.length <= MAX_GAP_DAYS) {
      s.freezes = have - missed.length;
      missed.forEach((d) => { s.frozenDays[d] = true; });
      s.lastFreezeUsed = todayStr;
    } else {
      s.streakCount = 0;
    }
  }

  s.todayCount = 0;
  s.lastActiveDate = todayStr;
  return s;
}
