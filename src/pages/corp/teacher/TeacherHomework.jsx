import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookOpen, CheckCircle2, ChevronRight, CircleDashed, Clock, NotebookPen } from 'lucide-react';
import { EmptyState, LoadingRows, Page, Sheet } from '../super-admin/ui';
import { useIsDesktop } from '../super-admin/useIsDesktop';
import { getHomeworkCompletion, resolveHomeworkItemUnit } from './utils';
import { useTeacherData } from './TeacherDataContext';

const fmtDay = (iso) => (iso ? new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'long' }) : '');
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
  const back = { label: group?.name || 'Group', onClick: () => navigate(`/corp/teacher/group/${groupId}`) };

  const rows = useMemo(() => {
    if (!group || !hw) return [];
    return group.students
      .map((st) => ({ st, ...getHomeworkCompletion(st, hw) }))
      .sort((a, b) => b.doneCount - a.doneCount || (a.st.name || '').localeCompare(b.st.name || ''));
  }, [group, hw]);

  if (loading) return <Page title=" " back={back}><LoadingRows count={5} /></Page>;
  if (!group || !hw) {
    return (
      <Page title="Homework not found" back={back}>
        <div className="sa-group"><EmptyState icon={<NotebookPen size={40} />} title="This homework doesn't exist" /></div>
      </Page>
    );
  }

  const items = hw.items || [];
  const done = rows.filter((r) => r.allDone).length;
  const started = rows.filter((r) => !r.allDone && r.itemStats.some((s) => s.started)).length;
  const notStarted = rows.length - done - started;
  const pct = (n, d) => (d ? Math.round((n / d) * 100) : 0);
  const stateOf = (r) => (r.allDone
    ? { tone: 'green', label: 'Done' }
    : r.itemStats.some((s) => s.started) ? { tone: 'orange', label: 'Started' } : { tone: 'gray', label: 'Not started' });

  const tiles = [
    { key: 'done', label: 'Done', icon: <CheckCircle2 size={17} />, tone: 'green', value: done, suffix: rows.length ? `/ ${rows.length}` : null, bar: pct(done, rows.length), barCls: 'is-good' },
    { key: 'started', label: 'Started', icon: <Clock size={17} />, tone: 'orange', value: started, foot: 'Not finished yet' },
    { key: 'none', label: 'Not started', icon: <CircleDashed size={17} />, tone: 'purple', value: notStarted, foot: notStarted ? 'Worth a reminder' : 'Everyone has started' },
    { key: 'words', label: 'Words', icon: <BookOpen size={17} />, tone: 'blue', value: items.reduce((sum, i) => sum + (i.totalWords || 0), 0), foot: `In ${items.length} ${items.length === 1 ? 'topic' : 'topics'}` },
  ];

  return (
    <Page back={back} title={hw.name || 'Homework'} subtitle={`Assigned ${fmtDay(hw.assignedAt)} · ${items.length} ${items.length === 1 ? 'topic' : 'topics'}`}>
      <div className="ca-dash-tiles">
        {tiles.map((t) => (
          <div key={t.key} className="ca-dash-tile">
            <div className="ca-dash-tile-top">
              <span className={`ca-dash-tile-icon tone-${t.tone}`}>{t.icon}</span>
              <span className="ca-dash-tile-label">{t.label}</span>
            </div>
            <div className="ca-dash-tile-value">
              {t.value}
              {t.suffix && <span className="ca-dash-tile-suffix">{t.suffix}</span>}
            </div>
            {t.bar != null && <div className="ca-dash-bar"><span className={t.barCls} style={{ width: `${t.bar}%` }} /></div>}
            {t.foot && <span className="ca-dash-tile-foot">{t.foot}</span>}
          </div>
        ))}
      </div>

      <div className="ca-hw-columns">
        <section className="ca-card is-faculty-card">
          <div className="faculty-toolbar">
            <div className="faculty-toolbar-left">
              <span className="ca-card-title">Students</span>
              <span className="ca-list-count">{rows.length}</span>
            </div>
            <span className="ca-list-count">A topic counts as done at 80% mastery</span>
          </div>
          {rows.length === 0 ? (
            <div className="ca-panel-empty"><span className="ca-empty">No students in the group yet</span></div>
          ) : (
            <div className="ca-mobile-list">
              {rows.map((r) => {
                const s = stateOf(r);
                return (
                  <button key={r.st.uid} type="button" className="ca-mobile-row" onClick={() => setStudent(r)}>
                    <span className="ca-dash-avatar tone-blue">{(r.st.name || '?').charAt(0).toUpperCase()}</span>
                    <span className="ca-mobile-row-main">
                      <span className="ca-dash-student-name">{r.st.name || 'Student'}</span>
                      <span className="ca-dash-mastery">
                        <span className="ca-dash-bar is-inline"><span className={r.allDone ? 'is-good' : 'is-mid'} style={{ width: `${pct(r.doneCount, r.total)}%` }} /></span>
                        <span className="ca-dash-mastery-val">{r.doneCount}/{r.total}</span>
                      </span>
                    </span>
                    <span className={`ca-pill is-${s.tone}`}>{s.label}</span>
                    <ChevronRight size={16} className="ca-row-chevron" />
                  </button>
                );
              })}
            </div>
          )}
        </section>

        <section className="ca-card is-faculty-card">
          <div className="faculty-toolbar">
            <div className="faculty-toolbar-left">
              <span className="ca-card-title">Topics</span>
              <span className="ca-list-count">{items.length}</span>
            </div>
          </div>
          <div className="ca-mobile-list">
            {items.map((item) => {
              const doneHere = rows.filter((r) => r.itemStats.find((s) => itemKey(s.item) === itemKey(item))?.done).length;
              return (
                <button key={itemKey(item)} type="button" className="ca-mobile-row" onClick={() => setTopic(item)}>
                  <span className="ca-course-icon"><BookOpen size={16} /></span>
                  <span className="ca-mobile-row-main">
                    <span className="ca-dash-student-name">{item.unitTitle}</span>
                    <span className="faculty-email-sub">{item.packTitle} · {item.totalWords} words</span>
                  </span>
                  <span className="ca-dash-mastery-val">{doneHere}/{rows.length}</span>
                  <ChevronRight size={16} className="ca-row-chevron" />
                </button>
              );
            })}
          </div>
        </section>
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
    <Sheet open={Boolean(item)} onClose={onClose} title={shown?.unitTitle || 'Topic'} wide={wide}>
      {shown && (
        <>
          <p className="ca-imp-target">{shown.packTitle} · <b>{words.length} words</b></p>
          {words.length === 0 ? (
            <EmptyState title="Topic not found" text="The pack may have been changed or deleted." />
          ) : (
            <div className="ca-wordlist">
              {words.map((w, i) => (
                <div key={w.id || i} className="ca-wordlist-row">
                  <span className="ca-wordlist-num">{i + 1}</span>
                  <span className="ca-wordlist-word">{w.word}</span>
                  <span className="ca-wordlist-tr">{w.translation}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </Sheet>
  );
}

function StudentProgressSheet({ row, onClose }) {
  const shown = useLast(row);
  return (
    <Sheet open={Boolean(row)} onClose={onClose} title={shown?.st.name || 'Student'}>
      {shown && (
        <>
          <p className="ca-imp-target"><b>{shown.doneCount}/{shown.total}</b> topics done</p>
          <div className="ca-st-pack">
            <div className="ca-st-topics">
              {shown.itemStats.map(({ item, masteryPercent, done, started }) => (
                <div key={itemKey(item)} className="ca-st-topic" title={item.packTitle}>
                  <span className="ca-st-topic-name">{item.unitTitle}</span>
                  <span className="ca-dash-bar"><span className={done ? 'is-good' : 'is-mid'} style={{ width: `${started ? masteryPercent : 0}%` }} /></span>
                  <span className={`ca-st-topic-val ${started ? '' : 'ca-muted'}`}>{started ? `${masteryPercent}%` : '—'}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </Sheet>
  );
}
