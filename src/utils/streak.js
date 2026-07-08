import { ref, set, runTransaction } from 'firebase/database';
import { db } from '../firebase';

function getLocalDateString() {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const localDate = new Date(d.getTime() - offset * 60 * 1000);
  return localDate.toISOString().split('T')[0]; // YYYY-MM-DD local
}

function getYesterdayDateString() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const offset = d.getTimezoneOffset();
  const localDate = new Date(d.getTime() - offset * 60 * 1000);
  return localDate.toISOString().split('T')[0];
}

/**
 * Read-time self-heal: if a day was missed since lastActiveDate without
 * meeting the daily goal, reset the streak count so the UI reflects the
 * break even before the user does any new activity.
 */
export function checkAndHealStreak(data) {
  if (!data) return { modified: false, data };

  const todayStr = getLocalDateString();
  const yesterdayStr = getYesterdayDateString();

  const streak = { ...data, activityLog: { ...(data.activityLog || {}) } };
  if (streak.dailyGoal === undefined) streak.dailyGoal = 5;

  if (!streak.lastActiveDate || streak.lastActiveDate === todayStr) {
    return { modified: false, data: streak };
  }

  let modified = false;

  if (streak.lastActiveDate !== yesterdayStr) {
    // Missed at least one full day
    if (streak.streakCount !== 0) {
      streak.streakCount = 0;
      modified = true;
    }
  } else {
    // Last active yesterday — verify the daily goal was actually met
    const yesterdayProgress = streak.activityLog[yesterdayStr] || 0;
    if (yesterdayProgress < streak.dailyGoal && streak.streakCount !== 0) {
      streak.streakCount = 0;
      modified = true;
    }
  }

  return { modified, data: streak };
}

/**
 * Standalone utility to atomically increment points for a user's daily goal.
 */
export async function incrementActivity(userId, amount = 1) {
  if (!userId) return;
  const streakRef = ref(db, `users/${userId}/streak`);

  await runTransaction(streakRef, (currentData) => {
    const todayStr = getLocalDateString();
    
    const streak = currentData || {
      streakCount: 0,
      lastActiveDate: '',
      todayCount: 0,
      dailyGoal: 5,
      activityLog: {}
    };

    if (!streak.activityLog) streak.activityLog = {};
    if (streak.dailyGoal === undefined) streak.dailyGoal = 5;

    // Handle new day transition
    if (streak.lastActiveDate !== todayStr) {
      const yesterdayStr = getYesterdayDateString();
      const lastActiveWasYesterday = streak.lastActiveDate === yesterdayStr;
      const lastActiveWasEmpty = streak.lastActiveDate === '';

      // If last active was yesterday, check if they completed the goal yesterday
      if (lastActiveWasYesterday) {
        const yesterdayProgress = streak.activityLog[yesterdayStr] || 0;
        if (yesterdayProgress < streak.dailyGoal) {
          // Didn't complete goal yesterday, streak broken!
          streak.streakCount = 0;
        }
      } else if (!lastActiveWasEmpty) {
        // Last active was older than yesterday, streak broken!
        streak.streakCount = 0;
      }

      streak.todayCount = 0;
      streak.lastActiveDate = todayStr;
    }

    const oldTodayCount = streak.todayCount;
    streak.todayCount += amount;
    streak.activityLog[todayStr] = streak.todayCount;

    // Duolingo check: Just reached goal today?
    if (streak.todayCount >= streak.dailyGoal && oldTodayCount < streak.dailyGoal) {
      streak.streakCount += 1;
    }

    return streak;
  });
}
