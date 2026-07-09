import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useStreak } from './useStreak';

function getLocalDateString() {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  return new Date(d.getTime() - offset * 60000).toISOString().split('T')[0];
}

/**
 * Client-side daily practice reminder. There is no push server behind this
 * app, so this only fires while the app is open (foreground or a background
 * tab) — it checks on load, every minute, and on tab-visibility changes.
 * It is not a true background push notification.
 */
export function useDailyReminder() {
  const { user } = useAuth();
  const { reminderEnabled, reminderTime } = useTheme();
  const { streak } = useStreak();

  useEffect(() => {
    if (!user || !reminderEnabled) return;
    if (typeof Notification === 'undefined') return;

    const check = () => {
      if (Notification.permission !== 'granted') return;

      const [h, m] = reminderTime.split(':').map(Number);
      const now = new Date();
      const nowMinutes = now.getHours() * 60 + now.getMinutes();
      if (nowMinutes < h * 60 + m) return;

      const shownKey = `voc-reminder-shown-${getLocalDateString()}`;
      if (localStorage.getItem(shownKey)) return;

      const todayCount = streak?.todayCount || 0;
      const dailyGoal = streak?.dailyGoal || 5;
      if (todayCount >= dailyGoal) return;

      localStorage.setItem(shownKey, 'true');

      const title = 'VOC — bugungi mashqni unutmang!';
      const body = `Bugungi maqsadga ${dailyGoal - todayCount} ta so'z qoldi. Streak'ingizni saqlab qoling!`;
      const options = { body, icon: '/favicon.svg', tag: 'voc-daily-reminder' };

      if (navigator.serviceWorker?.controller) {
        navigator.serviceWorker.ready
          .then((reg) => reg.showNotification(title, options))
          .catch(() => new Notification(title, options));
      } else {
        new Notification(title, options);
      }
    };

    check();
    const interval = setInterval(check, 60000);
    document.addEventListener('visibilitychange', check);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', check);
    };
  }, [user, reminderEnabled, reminderTime, streak]);
}
