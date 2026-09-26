import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle2, Settings, Users } from 'lucide-react';
import { formatRelative, HEALTH_LABEL } from '../super-admin/centerActivity';
import { EmptyState, LoadingRows, Page, Row, Section, Stat, StatusDot } from '../super-admin/ui';
import { useIsDesktop } from '../super-admin/useIsDesktop';
import { useCenterData } from './CenterDataContext';

const DAY = 24 * 60 * 60 * 1000;
const HEALTH_TONE = { active: 'green', quiet: 'orange', new: 'gray' };

// Center admin home: how is the center doing this week, and what needs a
// hand. Everything else (lists, settings) is one tap away.
export default function AdminHome() {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const { centerName, loading, activity, teachers, activeGroups, packs, teacherById } = useCenterData();

  // Real, fixable problems only — each row links to where it gets fixed.
  const attention = useMemo(() => {
    const now = Date.now();
    const items = [];
    teachers.filter((t) => t.groupsCount === 0).forEach((t) => items.push({
      key: `idle-${t.id}`, icon: (t.name || '?').charAt(0).toUpperCase(), tone: 'purple',
      title: t.name, subtitle: "Hali guruh ochmagan", to: `/corp/admin/teachers/${t.id}`,
    }));
    activeGroups.filter((g) => g.activity.students === 0).forEach((g) => items.push({
      key: `empty-${g.id}`, icon: <Users size={16} />, tone: 'gray',
      title: g.name || 'Guruh', subtitle: `Hali o'quvchi yo'q · ${teacherById[g.teacherId]?.name || "o'qituvchisiz"}`,
      to: `/corp/admin/groups/${g.id}`,
    }));
    activeGroups
      .filter((g) => g.activity.students > 0 && (!g.activity.lastActivity || now - g.activity.lastActivity > 14 * DAY))
      .forEach((g) => items.push({
        key: `quiet-${g.id}`, icon: <Users size={16} />, tone: 'orange',
        title: g.name || 'Guruh',
        subtitle: `2 haftadan beri mashq yo'q · ${teacherById[g.teacherId]?.name || "o'qituvchisiz"}`,
        to: `/corp/admin/groups/${g.id}`,
      }));
    return items;
  }, [teachers, activeGroups, teacherById]);

  const topGroups = useMemo(
    () => [...activeGroups].sort((a, b) => (b.activity.lastActivity || 0) - (a.activity.lastActivity || 0)).slice(0, 6),
    [activeGroups],
  );

  const settingsBtn = (
    <button type="button" className="sa-icon-btn" style={{ background: 'var(--sa-fill)', color: 'var(--sa-label)' }} onClick={() => navigate('/corp/admin/settings')} aria-label="Sozlamalar">
      <Settings size={18} />
    </button>
  );

  if (loading) {
    return (
      <Page title={centerName} subtitle=" " action={settingsBtn}>
        <div className="sa-stats">
          <Stat value="–" label="O'qituvchi" />
          <Stat value="–" label="Faol guruh" />
          <Stat value="–" label="O'quvchi" />
          <Stat value="–" label="Bu hafta mashq qildi" />
        </div>
        <Section title="Guruhlar"><LoadingRows count={4} /></Section>
      </Page>
    );
  }

  const pct = activity.students ? Math.round((activity.activeWeek / activity.students) * 100) : 0;

  return (
    <Page
      title={centerName}
      subtitle={
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <StatusDot tone={HEALTH_TONE[activity.health]} />
          {HEALTH_LABEL[activity.health]} · oxirgi faollik {formatRelative(activity.lastActivity)}
        </span>
      }
      action={settingsBtn}
    >
      <div className="sa-stats">
        <Stat value={activity.teachers} label="O'qituvchi" />
        <Stat value={activity.groups} label="Faol guruh" />
        <Stat value={activity.students} label="O'quvchi" />
        <Stat value={activity.students ? `${pct}%` : '—'} label="Bu hafta mashq qildi" tone="green" />
      </div>

      <div className="sa-columns">
        <div>
          <Section
            title="Guruhlar"
            action={activeGroups.length > 0 && <button type="button" className="sa-link-btn" onClick={() => navigate('/corp/admin/groups')}>Barchasi</button>}
          >
            {topGroups.length === 0 ? (
              <EmptyState
                icon={<Users size={40} />}
                title="Hali guruh yo'q"
                text="O'qituvchi qo'shing — u o'z panelida guruh ochadi va o'quvchilarni QR orqali qo'shadi."
              />
            ) : topGroups.map((g) => (
              <Row
                key={g.id}
                icon={<Users size={16} />}
                iconTone="green"
                title={g.name || 'Guruh'}
                subtitle={`${teacherById[g.teacherId]?.name || "O'qituvchisiz"} · ${g.activity.students} o'quvchi`}
                detail={g.activity.students ? `${g.activity.activeWeek}/${g.activity.students} faol` : null}
                onClick={() => navigate(`/corp/admin/groups/${g.id}`)}
              />
            ))}
          </Section>
        </div>

        <div>
          <Section title="E'tibor bering" footer={attention.length === 0 ? null : "Har birini bosib tuzatish mumkin."}>
            {attention.length === 0 ? (
              <Row icon={<CheckCircle2 size={16} />} iconTone="green" title="Hammasi joyida" subtitle="Bo'sh yoki sust guruh yo'q." />
            ) : attention.slice(0, 8).map((a) => (
              <Row key={a.key} icon={a.icon} iconTone={a.tone} title={a.title} subtitle={a.subtitle} onClick={() => navigate(a.to)} />
            ))}
          </Section>

          <Section title="Kurslar">
            <Row
              icon={<BookOpen size={16} />}
              iconTone="blue"
              title={`${packs.length} ta kurs`}
              subtitle={`${packs.filter((p) => p.groupsCount > 0).length} tasi guruhlarda ishlatilmoqda`}
              onClick={() => navigate('/corp/admin/courses')}
            />
          </Section>

          {!isDesktop && (
            <Section>
              <Row icon={<Settings size={16} />} iconTone="gray" title="Sozlamalar" onClick={() => navigate('/corp/admin/settings')} />
            </Section>
          )}
        </div>
      </div>
    </Page>
  );
}
