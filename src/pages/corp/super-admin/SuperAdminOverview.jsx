import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Plus } from 'lucide-react';
import { getAllCenters, getCenterStats } from '../../../services/corpService';
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
              return { center: c, activity: computeCenterActivity(await getCenterStats(c.id)) };
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
      title="Bosh sahifa"
      subtitle="Markazlar VOC'dan haqiqatan foydalanyaptimi — bir qarashda."
      action={
        <button type="button" className="sa-icon-btn" onClick={() => navigate('/corp/super-admin/centers?new=1')} aria-label="Yangi markaz">
          <Plus size={20} strokeWidth={2.6} />
        </button>
      }
    >
      <div className="sa-stats">
        <Stat value={loading ? '–' : live.length} label="Faol markaz" />
        <Stat value={loading ? '–' : totals.students} label="O'quvchi" />
        <Stat value={loading ? '–' : totals.activeWeek} label="Shu hafta mashq qildi" tone="green" />
        <Stat value={loading ? '–' : totals.homeworkWeek} label="Shu hafta vazifa" tone="blue" />
      </div>

      {loading ? (
        <LoadingRows count={4} />
      ) : live.length === 0 ? (
        <div className="sa-group">
          <EmptyState
            icon={<Building2 size={40} />}
            title="Hali markaz yo'q"
            text="Birinchi o'quv markazini qo'shing — admin uchun kirish ma'lumotlari tayyorlanadi."
            action={<button type="button" className="sa-btn sa-btn-filled tone-blue" onClick={() => navigate('/corp/super-admin/centers?new=1')}>Markaz qo'shish</button>}
          />
        </div>
      ) : (
        <>
          <div className="sa-columns">
            <div>
              <Section title="Faollik" footer="Shu hafta kamida bitta mashq qilgan o'quvchilar soni.">
                {byActivity.map(({ center, activity }) => (
                  <Row
                    key={center.id}
                    icon={center.name ? center.name.charAt(0).toUpperCase() : '?'}
                    iconTone="blue"
                    title={center.name || `Nomsiz markaz (${center.id})`}
                    subtitle={`${activity.students} o'quvchi · ${formatRelative(activity.lastActivity)}`}
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
                <Section title="E'tibor talab qiladi" footer="Bu hafta hech kim mashq qilmagan yoki hali boshlanmagan markazlar.">
                  {needsAttention.map(({ center, activity }) => (
                    <Row
                      key={center.id}
                      icon={center.name ? center.name.charAt(0).toUpperCase() : '?'}
                      iconTone={activity.health === 'quiet' ? 'orange' : 'gray'}
                      title={center.name || `Nomsiz markaz (${center.id})`}
                      subtitle={activity.health === 'quiet'
                        ? `Oxirgi faollik: ${formatRelative(activity.lastActivity)}`
                        : activity.groups === 0 ? "Hali guruh ochilmagan" : "Hali o'quvchi qo'shilmagan"}
                      onClick={() => openCenter(center.id)}
                    />
                  ))}
                </Section>
              )}

              {needsAttention.length === 0 && (
                <Section title="E'tibor talab qiladi">
                  <Row title="Hammasi joyida" subtitle="Barcha markazlar shu hafta faol." />
                </Section>
              )}
            </div>
          </div>
        </>
      )}
    </Page>
  );
}
