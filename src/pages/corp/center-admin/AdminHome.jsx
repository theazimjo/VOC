import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity, AlertTriangle, BookOpen, CheckCircle2, ChevronRight, GraduationCap, LayoutDashboard, Layers,
  NotebookPen, RefreshCw, Settings, TrendingUp, UserPlus, Users, Zap,
} from 'lucide-react';
import { formatRelative, latestUnitActivity, studentMastery } from '../super-admin/centerActivity';
import { Page } from '../super-admin/ui';
import { useIsDesktop } from '../super-admin/useIsDesktop';
import { useCenterData } from './CenterDataContext';

const DAY = 24 * 60 * 60 * 1000;
const fmtDay = (ts) => new Date(ts).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

// Center admin home, UITS CRM dashboard layout: KPI cards, this week's
// activity per group, a few secondary numbers, the recent event feed and
// what needs attention. Every number comes from the center node already
// loaded — nothing estimated.
export default function AdminHome() {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const { centerName, loading, reload, activity, teachers, activeGroups, packs, students, teacherById } = useCenterData();
  const [refreshing, setRefreshing] = useState(false);

  const refresh = async () => {
    setRefreshing(true);
    await reload();
    setRefreshing(false);
  };

  const data = useMemo(() => {
    const now = Date.now();
    const idleTeachers = teachers.filter((t) => t.groupsCount === 0);
    const emptyGroups = activeGroups.filter((g) => g.activity.students === 0);
    const quietGroups = activeGroups.filter((g) => g.activity.students > 0 && (!g.activity.lastActivity || now - g.activity.lastActivity > 14 * DAY));

    const masteries = students.map((st) => studentMastery(st)).filter((m) => m != null);
    const avgMastery = masteries.length ? Math.round(masteries.reduce((a, b) => a + b, 0) / masteries.length) : null;

    // Real events, newest first: homework given, students joining, practice.
    const events = [];
    activeGroups.forEach((g) => {
      const teacher = teacherById[g.teacherId]?.name || "O'qituvchisiz";
      Object.values(g.homeworkList || {}).forEach((hw) => {
        const t = Date.parse(hw.assignedAt || '');
        if (t) events.push({ t, kind: 'hw', title: `Vazifa berildi: ${hw.name || 'vazifa'}`, sub: `${g.name} · ${teacher}`, to: `/corp/admin/groups/${g.id}` });
      });
      Object.values(g.students || {}).forEach((st) => {
        const joined = Date.parse(st.joinedAt || '');
        if (joined) events.push({ t: joined, kind: 'join', title: `${st.name || "O'quvchi"} guruhga qo'shildi`, sub: g.name, to: `/corp/admin/groups/${g.id}` });
        const practiced = latestUnitActivity(st);
        if (practiced) events.push({ t: practiced, kind: 'practice', title: `${st.name || "O'quvchi"} mashq qildi`, sub: g.name, to: `/corp/admin/groups/${g.id}` });
      });
    });
    teachers.forEach((t) => {
      const created = Date.parse(t.createdAt || '');
      if (created) events.push({ t: created, kind: 'teacher', title: `Yangi o'qituvchi: ${t.name}`, sub: `${t.groupsCount} ta guruh`, to: `/corp/admin/teachers/${t.id}` });
    });
    events.sort((a, b) => b.t - a.t);

    const attention = [
      ...idleTeachers.map((t) => ({ key: `t-${t.id}`, title: t.name, sub: 'Hali guruh ochmagan', to: `/corp/admin/teachers/${t.id}` })),
      ...emptyGroups.map((g) => ({ key: `e-${g.id}`, title: g.name, sub: "Guruhda o'quvchi yo'q", to: `/corp/admin/groups/${g.id}` })),
      ...quietGroups.map((g) => ({ key: `q-${g.id}`, title: g.name, sub: "2 haftadan beri mashq yo'q", to: `/corp/admin/groups/${g.id}` })),
    ];

    const bars = [...activeGroups]
      .filter((g) => g.activity.students > 0)
      .sort((a, b) => b.activity.activeWeek / b.activity.students - a.activity.activeWeek / a.activity.students)
      .slice(0, 8);

    return { idleTeachers, emptyGroups, avgMastery, events: events.slice(0, 10), attention, bars };
  }, [teachers, activeGroups, students, teacherById]);

  const pct = activity.students ? Math.round((activity.activeWeek / activity.students) * 100) : 0;

  const kpis = [
    {
      label: "O'qituvchilar", value: activity.teachers, icon: <GraduationCap size={17} />, to: '/corp/admin/teachers',
      sub: data.idleTeachers.length ? `${data.idleTeachers.length} tasi guruh ochmagan` : 'Hammasida guruh bor', good: !data.idleTeachers.length,
    },
    {
      label: 'Faol guruhlar', value: activity.groups, icon: <Layers size={17} />, to: '/corp/admin/groups',
      sub: data.emptyGroups.length ? `${data.emptyGroups.length} tasi bo'sh` : "Hammasida o'quvchi bor", good: !data.emptyGroups.length,
    },
    {
      label: "O'quvchilar", value: activity.students, icon: <Users size={17} />, to: '/corp/admin/students',
      sub: `${activity.groups} ta guruhda`, good: activity.students > 0,
    },
    {
      label: 'Bu hafta faol', value: activity.students ? `${pct}%` : '—', icon: <Zap size={17} />, to: '/corp/admin/students',
      sub: `${activity.activeWeek} / ${activity.students} o'quvchi mashq qildi`, good: pct >= 50,
    },
  ];

  const minis = [
    { label: 'Kurslar', value: packs.length, sub: `${packs.filter((p) => p.groupsCount).length} tasi ishlatilmoqda`, icon: <BookOpen size={14} />, to: '/corp/admin/courses' },
    { label: "O'rtacha o'zlashtirish", value: data.avgMastery == null ? '—' : `${data.avgMastery}%`, sub: "Mashq qilgan o'quvchilar", icon: <TrendingUp size={14} />, to: '/corp/admin/students' },
    { label: 'Bu hafta vazifa', value: activity.homeworkWeek, sub: `Jami ${activity.homeworkTotal} ta`, icon: <NotebookPen size={14} />, to: '/corp/admin/groups' },
    { label: 'Oxirgi faollik', value: activity.lastActivity ? formatRelative(activity.lastActivity) : '—', sub: "Markaz bo'yicha", icon: <Activity size={14} /> },
  ];

  const feedIcon = { hw: <NotebookPen size={15} />, join: <UserPlus size={15} />, practice: <Zap size={15} />, teacher: <GraduationCap size={15} /> };

  return (
    <Page
      icon={<LayoutDashboard />}
      title="Bosh panel"
      subtitle={`${centerName} · bugungi holat`}
      action={
        <>
          <button type="button" className="ca-tool-btn" onClick={refresh} disabled={refreshing || loading}>
            <RefreshCw size={13} className={refreshing ? 'ca-spin' : ''} /> Yangilash
          </button>
          {!isDesktop && (
            <button type="button" className="sa-icon-btn is-gray" onClick={() => navigate('/corp/admin/settings')} aria-label="Sozlamalar">
              <Settings size={17} />
            </button>
          )}
        </>
      }
    >
      <section className="ca-block">
        <h2 className="ca-section-label">Asosiy ko'rsatkichlar</h2>
        <div className="ca-kpis">
          {kpis.map((k) => (
            <button key={k.label} type="button" className="ca-kpi" onClick={() => navigate(k.to)}>
              <div className="ca-kpi-top">
                <div>
                  <span className="ca-kpi-label">{k.label}</span>
                  <span className="ca-kpi-value">{loading ? '–' : k.value}</span>
                </div>
                <span className="ca-icon-box">{k.icon}</span>
              </div>
              <div className="ca-kpi-foot">
                <span className={`ca-kpi-dot ${k.good ? 'is-good' : 'is-warn'}`}>
                  {k.good ? <CheckCircle2 size={10} strokeWidth={3} /> : <AlertTriangle size={10} strokeWidth={3} />}
                </span>
                {loading ? 'Yuklanmoqda...' : k.sub}
              </div>
            </button>
          ))}
        </div>
      </section>

      <div className="ca-row-2-1 ca-block">
        <section className="ca-card">
          <div className="ca-card-head">
            <div>
              <h3 className="ca-card-title"><Layers size={15} /> Guruhlar faolligi</h3>
              <span className="ca-card-sub">Bu hafta mashq qilgan o'quvchilar ulushi</span>
            </div>
            <span className="ca-tag">{activity.groups} ta guruh</span>
          </div>
          {data.bars.length === 0 ? (
            <span className="ca-empty">O'quvchili guruh hali yo'q.</span>
          ) : (
            <div className="ca-bars">
              {data.bars.map((g) => {
                const share = Math.round((g.activity.activeWeek / g.activity.students) * 100);
                return (
                  <button key={g.id} type="button" className="ca-bar" onClick={() => navigate(`/corp/admin/groups/${g.id}`)}>
                    <span className="ca-bar-name">
                      {g.name}
                      <small>{teacherById[g.teacherId]?.name || "O'qituvchisiz"}</small>
                    </span>
                    <span className="ca-bar-track"><span className={`ca-bar-fill ${share < 40 ? 'is-low' : ''}`} style={{ transform: `scaleX(${Math.max(share, 2) / 100})`, display: 'block' }} /></span>
                    <span className="ca-bar-value">{g.activity.activeWeek}/{g.activity.students}</span>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        <div className="ca-minis">
          {minis.map((m) => {
            const Tag = m.to ? 'button' : 'div';
            return (
              <Tag
                key={m.label}
                type={m.to ? 'button' : undefined}
                className={`ca-mini ${m.to ? 'ca-kpi' : ''}`}
                style={{ padding: 14 }}
                onClick={m.to ? () => navigate(m.to) : undefined}
              >
                <span className="ca-icon-box is-sm">{m.icon}</span>
                <span className="ca-mini-label">{m.label}</span>
                <span className="ca-mini-value">{loading ? '–' : m.value}</span>
                <span className="ca-mini-sub">{m.sub}</span>
              </Tag>
            );
          })}
        </div>
      </div>

      <div className="ca-row-2-1">
        <section className="ca-card">
          <div className="ca-card-head">
            <div>
              <h3 className="ca-card-title"><Activity size={15} /> So'nggi harakatlar</h3>
              <span className="ca-card-sub">Vazifalar, yangi o'quvchilar va mashqlar</span>
            </div>
            <span className="ca-tag">Oxirgi {data.events.length} ta</span>
          </div>
          {data.events.length === 0 ? (
            <span className="ca-empty">Hali harakat yo'q. O'qituvchilar guruh ochib, vazifa bergach shu yerda ko'rinadi.</span>
          ) : (
            <div className="ca-feed">
              {data.events.map((e, i) => (
                <button key={`${e.kind}-${e.t}-${i}`} type="button" className="ca-feed-item" onClick={() => navigate(e.to)}>
                  <span className="ca-icon-box">{feedIcon[e.kind]}</span>
                  <span className="ca-feed-text">
                    <span className="ca-feed-title">{e.title}</span>
                    <span className="ca-feed-sub">{e.sub}</span>
                  </span>
                  <span className="ca-tag">{fmtDay(e.t)}</span>
                  <ChevronRight size={15} className="sa-row-chevron" />
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="ca-card">
          <div className="ca-card-head">
            <div>
              <h3 className="ca-card-title"><AlertTriangle size={15} /> E'tibor bering</h3>
              <span className="ca-card-sub">Tuzatish mumkin bo'lgan holatlar</span>
            </div>
            <span className="ca-tag">{data.attention.length}</span>
          </div>
          {data.attention.length === 0 ? (
            <span className="ca-empty">Hammasi joyida — bo'sh yoki sust guruh yo'q.</span>
          ) : (
            <div className="ca-feed">
              {data.attention.slice(0, 8).map((a) => (
                <button key={a.key} type="button" className="ca-feed-item" onClick={() => navigate(a.to)}>
                  <span className="ca-feed-text">
                    <span className="ca-feed-title">{a.title}</span>
                    <span className="ca-feed-sub">{a.sub}</span>
                  </span>
                  <ChevronRight size={15} className="sa-row-chevron" />
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </Page>
  );
}
