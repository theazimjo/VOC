import { useMemo } from 'react';
import { NotebookPen, Users } from 'lucide-react';
import { getHomeworkCompletion } from '../teacher/utils';
import { computeGroupActivity, formatRelative, latestUnitActivity, studentMastery } from './centerActivity';
import { EmptyState, LoadingRows, Page, Row, Section, Stat, StatusDot } from './ui';
import { useIsDesktop } from './useIsDesktop';

const DAY = 24 * 60 * 60 * 1000;
const fmtDate = (iso) => (iso ? new Date(iso).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long' }) : '—');

function recencyTone(ts, now = Date.now()) {
  if (!ts) return 'gray';
  if (now - ts <= 7 * DAY) return 'green';
  if (now - ts <= 30 * DAY) return 'orange';
  return 'gray';
}

// Read-only group page shared by the super admin and the center admin:
// students with mastery / homework / last practice, plus homework list.
export default function GroupDetailView({ group, teacher, back, loading }) {
  const isDesktop = useIsDesktop();
  const homework = useMemo(
    () => Object.entries(group?.homeworkList || {})
      .map(([id, hw]) => ({ id, ...hw }))
      .sort((a, b) => (Date.parse(b.assignedAt || '') || 0) - (Date.parse(a.assignedAt || '') || 0)),
    [group],
  );
  const students = useMemo(
    () => Object.entries(group?.students || {})
      .map(([uid, st]) => {
        const doneHomework = homework.filter((hw) => getHomeworkCompletion(st, hw).allDone).length;
        return { uid, ...st, last: latestUnitActivity(st) || null, mastery: studentMastery(st), doneHomework };
      })
      .sort((a, b) => (b.last || 0) - (a.last || 0)),
    [group, homework],
  );
  const activity = useMemo(() => computeGroupActivity(group), [group]);

  if (loading) {
    return <Page title=" " back={back}><LoadingRows count={6} /></Page>;
  }

  if (!group) {
    return (
      <Page title="Guruh topilmadi" back={back}>
        <div className="sa-group"><EmptyState icon={<Users size={40} />} title="Bu guruh yo'q" text="U o'chirilgan bo'lishi mumkin." /></div>
      </Page>
    );
  }

  return (
    <Page
      back={back}
      title={group.name || 'Guruh'}
      subtitle={[group.level, teacher?.name ? `O'qituvchi: ${teacher.name}` : null, group.status === 'archived' ? 'Arxivda' : null].filter(Boolean).join(' · ')}
    >
      <div className="sa-stats">
        <Stat value={activity.students} label="O'quvchi" />
        <Stat value={activity.activeWeek} label="Bu hafta mashq qildi" tone="green" />
        <Stat value={activity.homework} label="Berilgan vazifa" tone="blue" />
        <Stat value={formatRelative(activity.lastActivity)} label="Oxirgi faollik" />
      </div>

      <div className="sa-columns">
        <div>
          <Section title={`O'quvchilar (${students.length})`}>
            {students.length === 0 ? (
              <Row title="Hali hech kim qo'shilmagan" subtitle="O'quvchilar guruh kodi yoki QR orqali qo'shiladi." />
            ) : isDesktop ? (
              <div className="sa-table is-flat" style={{ '--sa-cols': 'minmax(200px, 2fr) 110px 110px 150px 18px' }}>
                <div className="sa-table-head">
                  <span>O'quvchi</span>
                  <span className="num">O'zlashtirish</span>
                  <span className="num">Vazifalar</span>
                  <span>Oxirgi mashq</span>
                  <span />
                </div>
                {students.map((st) => (
                  <div key={st.uid} className="sa-table-row" style={{ cursor: 'default' }}>
                    <span className="sa-cell-main">
                      <span className="sa-row-icon tone-green">{(st.name || '?').charAt(0).toUpperCase()}</span>
                      <span className="sa-cell-text">
                        <span className="sa-cell-title">{st.name || "O'quvchi"}</span>
                        <span className="sa-cell-sub">{st.email || `Qo'shilgan: ${fmtDate(st.joinedAt)}`}</span>
                      </span>
                    </span>
                    <span className="num">{st.mastery == null ? '—' : `${st.mastery}%`}</span>
                    <span className="num">{homework.length ? `${st.doneHomework} / ${homework.length}` : '—'}</span>
                    <span className="sa-cell-status">
                      <StatusDot tone={recencyTone(st.last)} />
                      {st.last ? formatRelative(st.last) : 'Mashq qilmagan'}
                    </span>
                    <span />
                  </div>
                ))}
              </div>
            ) : (
              students.map((st) => (
                <Row
                  key={st.uid}
                  icon={(st.name || '?').charAt(0).toUpperCase()}
                  iconTone="green"
                  title={st.name || "O'quvchi"}
                  subtitle={[
                    st.mastery == null ? null : `${st.mastery}%`,
                    homework.length ? `vazifa ${st.doneHomework}/${homework.length}` : null,
                    st.last ? formatRelative(st.last) : 'mashq qilmagan',
                  ].filter(Boolean).join(' · ')}
                  accessory={<StatusDot tone={recencyTone(st.last)} />}
                />
              ))
            )}
          </Section>
        </div>

        <div>
          <Section title="Guruh">
            <Row title="Kod" detail={group.code || '—'} />
            <Row title="Daraja" detail={group.level || '—'} />
            <Row title="O'qituvchi" detail={teacher?.name || '—'} />
            <Row title="Ochilgan" detail={fmtDate(group.createdAt)} />
          </Section>

          <Section title={`Vazifalar (${homework.length})`}>
            {homework.length === 0 ? (
              <Row title="Hali vazifa berilmagan" />
            ) : homework.slice(0, 8).map((hw) => {
              const done = students.filter((st) => getHomeworkCompletion(st, hw).allDone).length;
              return (
                <Row
                  key={hw.id}
                  icon={<NotebookPen size={16} />}
                  iconTone="blue"
                  title={hw.name || 'Vazifa'}
                  subtitle={`${(hw.items || []).length} ta mavzu · ${fmtDate(hw.assignedAt)}`}
                  detail={`${done}/${students.length}`}
                />
              );
            })}
          </Section>
        </div>
      </div>
    </Page>
  );
}
