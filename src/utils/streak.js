import { ref, runTransaction } from 'firebase/database';
import { db } from '../firebase';
import { rolloverStreak } from './streakRules';

function getLocalDateString() {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const localDate = new Date(d.getTime() - offset * 60 * 1000);
  return localDate.toISOString().split('T')[0]; // YYYY-MM-DD local
}

/**
 * Read-time self-heal: if a day was missed since lastActiveDate without
 * meeting the daily goal, reset the streak count so the UI reflects the
 * break even before the user does any new activity. With `allowance` > 0
 * (Premium: streak freezes per month) missed days are covered by freezes
 * instead, see streakRules.rolloverStreak.
 */
export function checkAndHealStreak(data, allowance = 0) {
  if (!data) return { modified: false, data };
  const next = rolloverStreak(data, getLocalDateString(), allowance);
  const modified = JSON.stringify(next) !== JSON.stringify({ ...data, activityLog: data.activityLog || {}, frozenDays: data.frozenDays || {}, dailyGoal: data.dailyGoal ?? 5 });
  return { modified, data: next };
}

/**
 * Standalone utility to atomically increment points for a user's daily goal.
 */
export async function incrementActivity(userId, amount = 1, allowance = 0) {
  if (!userId) return;
  const streakRef = ref(db, `users/${userId}/streak`);
  let outcome = null; // what this increment did, for the results screen

  await runTransaction(streakRef, (currentData) => {
    const todayStr = getLocalDateString();

    const base = currentData || {
      streakCount: 0,
      lastActiveDate: '',
      todayCount: 0,
      dailyGoal: 5,
      activityLog: {}
    };

    // New day: cover or reset missed days, hand out this month's freezes
    const streak = rolloverStreak(base, todayStr, allowance);

    const before = streak.streakCount || 0;
    const oldTodayCount = streak.todayCount || 0;
    streak.lastActiveDate = todayStr;
    streak.todayCount = oldTodayCount + amount;
    streak.activityLog[todayStr] = streak.todayCount;

    // Duolingo check: Just reached goal today?
    if (streak.todayCount >= streak.dailyGoal && oldTodayCount < streak.dailyGoal) {
      streak.streakCount = (streak.streakCount || 0) + 1;
    }

    outcome = {
      before, after: streak.streakCount || 0, increased: (streak.streakCount || 0) > before,
      todayCount: streak.todayCount, goal: streak.dailyGoal,
    };
    return streak;
  });

  return outcome;
}
