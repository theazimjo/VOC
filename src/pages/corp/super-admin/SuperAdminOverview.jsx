import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Plus } from 'lucide-react';
import { getAllCenters, centerStatsFrom } from '../../../services/corpService';
import { computeCenterActivity, formatRelative } from './centerActivity';
import { EmptyState, LoadingRows, Page, Row, Section, Stat, StatusDot } from './ui';

const HEALTH_TONE = { active: 'green', quiet: 'orange', new: 'gray' };

export default function SuperAdminOverview() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const centers = await getAllCenters();
        const withStats = await Promise.all(
          centers.map(async (c) => {
            try {
              return { center: c, activity: computeCenterActivity(centerStatsFrom(c)) };
            } catch {
              return { center: c, activity: computeCenterActivity(null) };
            }
          })
        );
        if (!cancelled) setRows(withStats);
      } catch (err) {
        console.error('Error loading super admin overview:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const live = rows.filter((r) => r.center.status !== 'suspended');

  const totals = useMemo(() => live.reduce((acc, { activity }) => {
    acc.students += activity.students;
    acc.activeWeek += activity.activeWeek;
    acc.homeworkWeek += activity.homeworkWeek;
    return acc;
  }, { students: 0, activeWeek: 0, homeworkWeek: 0 }), [live]);

  // Centers that were using VOC but went quiet, or never started — the ones
  // worth a phone call this week.
  const needsAttention = live
    .filter(({ activity }) => activity.health !== 'active')
    .sort((a, b) => (a.activity.health === 'quiet' ? -1 : 1) - (b.activity.health === 'quiet' ? -1 : 1));

  const byActivity = [...live].sort((a, b) => b.activity.activeWeek - a.activity.activeWeek || (b.activity.lastActivity || 0) - (a.activity.lastActivity || 0));

  const openCenter = (id) => navigate(`/corp/super-admin/centers/${encodeURIComponent(id)}`);

  return (
    <Page
      title="Overview"
      subtitle="Are the centers really using VOC? At a glance."
      action={
        <button type="button" className="sa-icon-btn" onClick={() => navigate('/corp/super-admin/centers?new=1')} aria-label="New center">
          <Plus size={20} strokeWidth={2.6} />
        </button>
      }
    >
      <div className="sa-stats">
        <Stat value={loading ? '–' : live.length} label="Active centers" />
        <Stat value={loading ? '–' : totals.students} label="Students" />
        <Stat value={loading ? '–' : totals.activeWeek} label="Practiced this week" tone="green" />
        <Stat value={loading ? '–' : totals.homeworkWeek} label="Homework this week" tone="blue" />
      </div>

      {loading ? (
        <LoadingRows count={4} />
      ) : live.length === 0 ? (
        <div className="sa-group">
          <EmptyState
            icon={<Building2 size={40} />}
            title="No centers yet"
            text="Add the first learning center — sign-in details for its admin are prepared for you."
            action={<button type="button" className="sa-btn sa-btn-filled tone-blue" onClick={() => navigate('/corp/super-admin/centers?new=1')}>Add center</button>}
          />
        </div>
      ) : (
        <>
          <div className="sa-columns">
            <div>
              <Section title="Activity" footer="Students who practiced at least once this week.">
                {byActivity.map(({ center, activity }) => (
                  <Row
                    key={center.id}
                    icon={center.name ? center.name.charAt(0).toUpperCase() : '?'}
                    iconTone="blue"
                    title={center.name || `Unnamed center (${center.id})`}
                    subtitle={`${activity.students} ${activity.students === 1 ? 'student' : 'students'} · ${formatRelative(activity.lastActivity)}`}
                    detail={
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <StatusDot tone={HEALTH_TONE[activity.health]} />
                        {activity.activeWeek}/{activity.students}
                      </span>
                    }
                    onClick={() => openCenter(center.id)}
                  />
                ))}
              </Section>
            </div>
            <div>
              {needsAttention.length > 0 && (
                <Section title="Needs attention" footer="Centers where nobody practiced this week, or that have not started yet.">
                  {needsAttention.map(({ center, activity }) => (
                    <Row
                      key={center.id}
                      icon={center.name ? center.name.charAt(0).toUpperCase() : '?'}
                      iconTone={activity.health === 'quiet' ? 'orange' : 'gray'}
                      title={center.name || `Unnamed center (${center.id})`}
                      subtitle={activity.health === 'quiet'
                        ? `Last activity: ${formatRelative(activity.lastActivity)}`
                        : activity.groups === 0 ? 'No groups yet' : 'No students yet'}
                      onClick={() => openCenter(center.id)}
                    />
                  ))}
                </Section>
              )}

              {needsAttention.length === 0 && (
                <Section title="Needs attention">
                  <Row title="All good" subtitle="Every center is active this week." />
                </Section>
              )}
            </div>
          </div>
        </>
      )}
    </Page>
  );
}
