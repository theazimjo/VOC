import { useMemo } from 'react';
import { motion } from 'framer-motion';
import './ActivityHeatmap.css';

const WEEKDAY_LABELS = ['Du', '', 'Cho', '', 'Ju', '', ''];
const WEEKS = 12;

function getLocalDateString(d) {
  const offset = d.getTimezoneOffset();
  return new Date(d.getTime() - offset * 60000).toISOString().split('T')[0];
}

function buildDays(activityLog, dailyGoal) {
  const today = new Date();
  const totalDays = WEEKS * 7;
  const start = new Date(today);
  start.setDate(start.getDate() - (totalDays - 1));

  // Align the grid so each column is a full Monday-Sunday week.
  const startDay = start.getDay(); // 0=Sun..6=Sat
  const mondayOffset = startDay === 0 ? 6 : startDay - 1;
  start.setDate(start.getDate() - mondayOffset);

  const days = [];
  const cursor = new Date(start);
  while (cursor <= today) {
    const dateStr = getLocalDateString(cursor);
    const count = activityLog[dateStr] || 0;
    let level = 0;
    if (count > 0) {
      if (count >= dailyGoal) level = 3;
      else if (count >= dailyGoal / 2) level = 2;
      else level = 1;
    }
    days.push({ date: dateStr, count, level });
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

export default function ActivityHeatmap({ activityLog = {}, dailyGoal = 5 }) {
  const days = useMemo(() => buildDays(activityLog, dailyGoal), [activityLog, dailyGoal]);
  const activeDaysCount = days.filter(d => d.count > 0).length;

  return (
    <div className="activity-heatmap">
      <div className="activity-heatmap-summary">
        So'nggi {WEEKS} haftada <strong>{activeDaysCount}</strong> kun mashq qilingan
      </div>
      <div className="activity-heatmap-body">
        <div className="activity-heatmap-weekday-labels">
          {WEEKDAY_LABELS.map((label, idx) => (
            <span key={idx}>{label}</span>
          ))}
        </div>
        <div className="activity-heatmap-grid">
          {days.map((day, idx) => (
            <motion.div
              key={day.date}
              className={`activity-heatmap-cell level-${day.level}`}
              title={`${day.date}: ${day.count} ta faoliyat`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.002 }}
            />
          ))}
        </div>
      </div>
      <div className="activity-heatmap-legend">
        <span>Kam</span>
        <span className="activity-heatmap-cell level-0" />
        <span className="activity-heatmap-cell level-1" />
        <span className="activity-heatmap-cell level-2" />
        <span className="activity-heatmap-cell level-3" />
        <span>Ko'p</span>
      </div>
    </div>
  );
}
