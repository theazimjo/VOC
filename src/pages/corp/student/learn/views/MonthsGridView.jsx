import { NotebookPen } from 'lucide-react';
import SatPackCard from '../../../../../components/corp/SatPackCard';
import { useStudentT } from '../../../../../hooks/useStudentT';
import { computeMonthWordStats, computeUnitWordStats } from '../utils';
import './MonthsGridView.css';

// Dates are written by hand (fmtDate from useStudentT) — Chrome has no
// 'uz' locale data, so toLocaleDateString('uz-UZ') comes out as "2026 M10 4".
// The year is only shown when it isn't the current one.
function shortDate(fmtDate, iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return fmtDate(d, { withYear: d.getFullYear() !== new Date().getFullYear() });
}

// Older auto-names start with a date ("Oct 4 — …", "2026 M10 4 — …");
// the date is shown on its own line, so only the topics are kept.
function hwTitle(hw, t, fmtDate) {
  const name = (hw.name || '').replace(/^[^—]{0,24}\s—\s/, '').trim();
  return name || (hw.assignedAt ? t('words.hwFallbackDated', { date: shortDate(fmtDate, hw.assignedAt) }) : t('words.hwFallbackTitle'));
}

export default function MonthsGridView({ p }) {
  const { t, tn, fmtDate } = useStudentT();
  const { currentTab, additionalMonths, allDbWords, allMonths, combinedMonths, homeworkList, navigate } = p;

  const renderHomeworkGrid = () => {
    const assignments = homeworkList || [];
    if (assignments.length === 0) {
      return (
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <h3>{t('words.hwEmptyTitle')}</h3>
          <p>{t('words.hwEmptyText')}</p>
        </div>
      );
    }

    return (
      <div className="hw-assignments-list">
        {[...assignments].reverse().map((hw) => {
          const resolvedItems = (hw.items || []).map((item) => {
            const month = combinedMonths.find(m => m.packId === item.packId && m.id === item.monthId);
            const unit = month?.units?.find(u => u.id === item.unitId);
            const stats = (month && unit) ? computeUnitWordStats(month, unit, allDbWords) : null;
            const wordCount = unit ? (unit.words || []).length : (item.totalWords || 0);
            const masteryPct = stats?.avgMasteryPct || 0;
            return { item, stats, wordCount, masteryPct, done: masteryPct >= 80 };
          });
          const doneCount = resolvedItems.filter(r => r.done).length;

          return (
            <div key={hw.id} className="hw-outer-card">
              <div className="hw-tab-header">
                <div className="hw-tab-icon">
                  <NotebookPen size={17} strokeWidth={2.2} />
                </div>
                <div className="hw-tab-info">
                  <h2 className="hw-tab-title">
                    {hwTitle(hw, t, fmtDate)}
                  </h2>
                  <span className="hw-tab-date">
                    {[hw.assignedAt ? t('words.assigned', { date: shortDate(fmtDate, hw.assignedAt) }) : null, tn('words.topicsCount', resolvedItems.length)].filter(Boolean).join(' · ')}
                  </span>
                </div>
                <span className={`hw-tab-done-badge ${doneCount === resolvedItems.length ? 'is-done' : ''}`}>{t('words.doneBadge', { done: doneCount, total: resolvedItems.length })}</span>
              </div>

              <div className="grid-cards">
                {resolvedItems.map(({ item, stats, wordCount, masteryPct }) => {
                  const hasWords = wordCount > 0;
                  return (
                    <SatPackCard
                      key={`${item.packId}_${item.monthId}_${item.unitId}`}
                      title={item.unitTitle}
                      subtitle={item.packTitle}
                      wordCount={wordCount}
                      wordLabel={t('words.wordLabel')}
                      masteredCount={stats?.masteredCount || 0}
                      learningCount={stats?.learningCount || 0}
                      newCount={stats?.newCount || 0}
                      masteryPct={masteryPct}
                      onClick={() => hasWords && navigate(`/corp/student/learn/topic/${item.packId}/${item.monthId}/${item.unitId}?from=homework`)}
                      disabled={!hasWords}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderMonthsGrid = (months, emptyIcon, emptyTitle, emptyDesc) => (
    months.length === 0 ? (
      <div className="empty-state">
        <div className="empty-state-icon">{emptyIcon}</div>
        <h3>{emptyTitle}</h3>
        <p>{emptyDesc}</p>
      </div>
    ) : (
      <div className="grid-cards">
        {months.map((m) => {
          const stats = computeMonthWordStats(m, allDbWords);
          return (
            <SatPackCard
              key={`${m.packId}_${m.id}`}
              title={m.packTitle || m.title}
              subtitle={[m.title, m.packLevel].filter(Boolean).join(' · ')}
              setCount={(m.units || []).length}
              setLabel={t('words.topicLabel')}
              wordCount={stats.totalWords}
              wordLabel={t('words.wordLabel')}
              masteredCount={stats.masteredCount}
              learningCount={stats.learningCount}
              newCount={stats.newCount}
              masteryPct={stats.avgMasteryPct}
              onClick={() => navigate(`/corp/student/learn/month/${m.packId}/${m.id}`)}
            />
          );
        })}
      </div>
    )
  );

  return (
    <>
      {currentTab === 'all' && renderMonthsGrid(
        [...allMonths, ...additionalMonths], '📦', t('words.noWordsTitle'),
        t('words.noWordsText')
      )}
      {currentTab === 'homework' && renderHomeworkGrid()}
    </>
  );
}
