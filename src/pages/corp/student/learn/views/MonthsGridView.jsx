import { NotebookPen } from 'lucide-react';
import SatPackCard from '../../../../../components/corp/SatPackCard';
import { computeMonthWordStats, computeUnitWordStats } from '../utils';
import './MonthsGridView.css';

export default function MonthsGridView({ p }) {
  const { activeTab, additionalMonths, allDbWords, allMonths, combinedMonths, homeworkList, navigate } = p;

  const renderHomeworkGrid = () => {
    const assignments = homeworkList || [];
    if (assignments.length === 0) {
      return (
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <h3>No homework yet</h3>
          <p>Your teacher hasn't assigned any homework to this group yet.</p>
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
                    {hw.assignedAt
                      ? new Date(hw.assignedAt).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })
                      : (hw.name || 'Homework')}
                  </h2>
                  <span className="hw-tab-date">
                    {resolvedItems.length} {resolvedItems.length === 1 ? 'topic' : 'topics'} assigned
                  </span>
                </div>
                <span className="hw-tab-done-badge">{doneCount}/{resolvedItems.length}</span>
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
                      wordLabel="words"
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
              title={m.title}
              subtitle={`${m.packTitle} (${m.packLevel})`}
              setCount={(m.units || []).length}
              setLabel="sets"
              wordCount={stats.totalWords}
              wordLabel="words"
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
              {activeTab === 'asosiy' && renderMonthsGrid(
                allMonths, '📦', "No sets found",
                "No study plan has been assigned to you yet."
              )}
              {activeTab === 'qoshimcha' && renderMonthsGrid(
                additionalMonths, '✨', "No additional materials",
                "No additional materials assigned by teacher yet."
              )}
              {activeTab === 'homework' && renderHomeworkGrid()}
            </>
  );
}
