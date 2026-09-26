import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookOpen, Check, NotebookPen } from 'lucide-react';
import { EmptyState, LoadingRows, Page, Row, Section, Sheet, Stat } from '../super-admin/ui';
import { useIsDesktop } from '../super-admin/useIsDesktop';
import { getHomeworkCompletion, resolveHomeworkItemUnit } from './utils';
import { useTeacherData } from './TeacherDataContext';

const fmtDay = (iso) => (iso ? new Date(iso).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long' }) : '');
const itemKey = (item) => `${item.packId}_${item.monthId}_${item.unitId}`;

// One assignment: who finished it (a topic counts at 80% mastery), who
// hasn't started, and what the topics contain.
export default function TeacherHomework() {
  const { groupId, hwId } = useParams();
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const { loading, groups, packs } = useTeacherData();
  const [topic, setTopic] = useState(null);
  const [student, setStudent] = useState(null);

  const group = groups.find((g) => g.id === groupId) || null;
  const hw = group?.homework.find((h) => h.id === hwId) || null;
  const back = { label: group?.name || 'Guruh', onClick: () => navigate(`/corp/teacher/group/${groupId}`) };

  const rows = useMemo(() => {
    if (!group || !hw) return [];
    return group.students
      .map((st) => ({ st, ...getHomeworkCompletion(st, hw) }))
      .sort((a, b) => b.doneCount - a.doneCount || (a.st.name || '').localeCompare(b.st.name || ''));
  }, [group, hw]);

  if (loading) return <Page title=" " back={back}><LoadingRows count={5} /></Page>;
  if (!group || !hw) {
    return (
      <Page title="Vazifa topilmadi" back={back}>
        <div className="sa-group"><EmptyState icon={<NotebookPen size={40} />} title="Bu vazifa yo'q" /></div>
      </Page>
    );
  }

  const items = hw.items || [];
  const done = rows.filter((r) => r.allDone).length;
  const started = rows.filter((r) => !r.allDone && r.itemStats.some((s) => s.started)).length;
  const notStarted = rows.length - done - started;

  const studentRow = (r) => (
    <Row
      key={r.st.uid}
      icon={(r.st.name || '?').charAt(0).toUpperCase()}
      iconTone={r.allDone ? 'green' : 'gray'}
      title={r.st.name || "O'quvchi"}
      subtitle={r.allDone ? 'Hammasini bajardi' : r.itemStats.some((s) => s.started) ? 'Boshlagan' : 'Boshlamagan'}
      accessory={r.allDone
        ? <span className="sa-chip tone-green"><Check size={12} strokeWidth={3} /> {r.doneCount}/{r.total}</span>
        : <span className={`sa-chip ${r.doneCount ? 'tone-orange' : ''}`}>{r.doneCount}/{r.total}</span>}
      onClick={() => setStudent(r)}
    />
  );

  return (
    <Page back={back} title={hw.name || 'Vazifa'} subtitle={`${fmtDay(hw.assignedAt)} · ${items.length} ta mavzu`}>
      <div className="sa-stats">
        <Stat value={`${done}/${rows.length}`} label="Bajardi" tone="green" />
        <Stat value={started} label="Boshlagan" tone="orange" />
        <Stat value={notStarted} label="Boshlamagan" />
        <Stat value={items.reduce((sum, i) => sum + (i.totalWords || 0), 0)} label="So'z" />
      </div>

      <div className="sa-columns">
        <div>
          <Section title={`O'quvchilar (${rows.length})`} footer="Mavzu 80% o'zlashtirilganda bajarilgan hisoblanadi.">
            {rows.length === 0 ? <Row title="Guruhda hali o'quvchi yo'q" /> : rows.map(studentRow)}
          </Section>
        </div>
        <div>
          <Section title={`Mavzular (${items.length})`}>
            {items.map((item) => {
              const doneHere = rows.filter((r) => r.itemStats.find((s) => itemKey(s.item) === itemKey(item))?.done).length;
              return (
                <Row
                  key={itemKey(item)}
                  icon={<BookOpen size={16} />}
                  iconTone="blue"
                  title={item.unitTitle}
                  subtitle={`${item.packTitle} · ${item.totalWords} so'z`}
                  detail={`${doneHere}/${rows.length}`}
                  onClick={() => setTopic(item)}
                />
              );
            })}
          </Section>
        </div>
      </div>

      <TopicSheet item={topic} packs={packs} onClose={() => setTopic(null)} wide={isDesktop} />
      <StudentProgressSheet row={student} onClose={() => setStudent(null)} />
    </Page>
  );
}

function useLast(value) {
  const [last, setLast] = useState(value);
  useEffect(() => { if (value) setLast(value); }, [value]);
  return value || last;
}

function TopicSheet({ item, packs, onClose, wide }) {
  const shown = useLast(item);
  const words = shown ? (resolveHomeworkItemUnit(shown, packs)?.words || []) : [];
  return (
    <Sheet open={Boolean(item)} onClose={onClose} title={shown?.unitTitle || 'Mavzu'} wide={wide}>
      {shown && (
        <Section title={`${shown.packTitle} · ${words.length} so'z`}>
          {words.length === 0
            ? <Row title="Bu mavzu topilmadi" subtitle="To'plam o'zgargan yoki o'chirilgan bo'lishi mumkin." />
            : words.map((w, i) => <Row key={w.id || i} title={w.word} detail={w.translation} />)}
        </Section>
      )}
    </Sheet>
  );
}

function StudentProgressSheet({ row, onClose }) {
  const shown = useLast(row);
  return (
    <Sheet open={Boolean(row)} onClose={onClose} title={shown?.st.name || "O'quvchi"}>
      {shown && (
        <Section title={`${shown.doneCount}/${shown.total} mavzu bajarildi`}>
          {shown.itemStats.map(({ item, masteryPercent, done, started }) => (
            <Row
              key={itemKey(item)}
              title={item.unitTitle}
              subtitle={item.packTitle}
              accessory={<span className={`sa-chip ${done ? 'tone-green' : started ? 'tone-orange' : ''}`}>{started ? `${masteryPercent}%` : 'Boshlamagan'}</span>}
            />
          ))}
        </Section>
      )}
    </Sheet>
  );
}
