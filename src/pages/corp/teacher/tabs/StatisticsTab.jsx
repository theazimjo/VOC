import { BarChart3, BookOpen, TrendingUp, Users } from 'lucide-react';
import './StatisticsTab.css';

export default function StatisticsTab({ p }) {
  const {
    activeGroups, allGroupsStats, allGroupsStudents, customPacks,
    loadingAllStats, overallAvgPercent, totalStudents,
  } = p;

  return (
        <>
          <div className="premium-glass" style={{ padding: '1rem 1.1rem', borderRadius: '20px', marginBottom: '1rem' }}>
            <span
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '3px 10px', borderRadius: '20px', marginBottom: '6px',
                background: 'rgba(56, 189, 248, 0.16)', color: '#7dd3fc', fontSize: '0.76rem', fontWeight: 700,
              }}
            >
              <BarChart3 size={13} /> Stats
            </span>
            <h1 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800, color: 'var(--pg-text)' }}>Results & Statistics</h1>
            <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: 'var(--pg-text-secondary)' }}>
              Vocabulary mastery trends across your groups and students.
            </p>
          </div>

          <div className="stat-cards-grid" style={{ marginBottom: '1rem' }}>
            <div className="group-stat-card">
              <div className="group-stat-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={16} color="#6366f1" /> Total Groups
              </div>
              <div className="group-stat-value">{activeGroups.length}</div>
            </div>

            <div className="group-stat-card">
              <div className="group-stat-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={16} color="var(--success)" /> Total Students
              </div>
              <div className="group-stat-value">{totalStudents}</div>
            </div>

            <div className="group-stat-card">
              <div className="group-stat-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={16} color="#a855f7" /> Custom Packs
              </div>
              <div className="group-stat-value">{customPacks.length}</div>
            </div>

            <div className="group-stat-card">
              <div className="group-stat-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={16} color="#38bdf8" /> Avg. Mastery
              </div>
              <div className="group-stat-value" style={{ color: '#4ade80' }}>
                {loadingAllStats ? '…' : `${overallAvgPercent}%`}
              </div>
            </div>
          </div>

          {allGroupsStats.length > 0 && (
            <div className="teachers-table-card" style={{ marginBottom: '1rem', padding: '1rem 1.1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <h3 style={{ margin: 0, color: 'var(--pg-text)', fontSize: '0.94rem', fontWeight: 700 }}>
                  Average Mastery by Group
                </h3>
                <span style={{ fontSize: '0.72rem', color: 'var(--pg-text-muted)' }}>Lowest first</span>
              </div>

              {/* Scrollable ranked list instead of a bar chart — a chart with
                  30-50 bars stops being readable, this scales to any group
                  count without the page (or the chart) blowing up. */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '320px', overflowY: 'auto', paddingRight: '2px' }}>
                {[...allGroupsStats]
                  .sort((a, b) => a.avgPercent - b.avgPercent)
                  .map(({ group: g, avgPercent }) => {
                    const tier = avgPercent >= 70 ? 'good' : avgPercent >= 40 ? 'mid' : 'low';
                    const barColor = tier === 'good' ? '#4ade80' : tier === 'mid' ? '#fbbf24' : '#f87171';
                    return (
                      <div
                        key={g.id}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '10px',
                          padding: '8px 10px', borderRadius: '12px',
                          background: 'var(--pg-surface)', border: '1px solid var(--pg-hairline)',
                        }}
                      >
                        <span
                          style={{
                            flex: '0 0 auto', minWidth: 0, maxWidth: '38%',
                            fontSize: '0.82rem', fontWeight: 600, color: 'var(--pg-text)',
                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                          }}
                          title={g.name}
                        >
                          {g.name}
                        </span>
                        <div style={{ flex: 1, height: '6px', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                          <div style={{ width: `${avgPercent}%`, height: '100%', borderRadius: '999px', background: barColor }} />
                        </div>
                        <span style={{ flexShrink: 0, width: '38px', textAlign: 'right', fontSize: '0.8rem', fontWeight: 700, color: barColor }}>
                          {avgPercent}%
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          <div className="teachers-table-card">
            <h3 style={{ padding: '1rem 1.1rem', margin: 0, color: 'var(--pg-text)', borderBottom: '1px solid rgba(255,255,255,0.1)', fontSize: '0.94rem', fontWeight: 700 }}>
              Group Statistics
            </h3>

            {allGroupsStats.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--pg-text-muted)' }}>No groups yet</div>
            ) : (
              <>
                {/* Desktop: table. A 6-column table has no good mobile
                    layout — horizontal scroll reads as broken on a phone —
                    so ≤768px swaps to the stacked cards below instead. */}
                <div className="teachers-table-wrap" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                  <table className="teachers-table">
                    <thead>
                      <tr>
                        <th>GROUP</th>
                        <th>LEVEL</th>
                        <th>STUDENTS</th>
                        <th>PACKS</th>
                        <th>MASTERY</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allGroupsStats.map(({ group: g, packEntries, avgPercent }) => (
                        <tr key={g.id}>
                          <td style={{ fontWeight: 600, color: 'var(--pg-text)' }}>{g.name}</td>
                          <td><span className="group-level-badge">{g.level}</span></td>
                          <td>{g.studentsCount || 0} students</td>
                          <td>{packEntries.length} packs</td>
                          <td>{loadingAllStats && !(g.id in allGroupsStudents) ? '…' : `${avgPercent}%`}</td>
                          <td><span className="teacher-status-pill active">• Active</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile: stacked cards, same data. */}
                <div className="teachers-mobile-list" style={{ display: 'none', flexDirection: 'column', gap: '8px', padding: '1rem 1.1rem' }}>
                  {allGroupsStats.map(({ group: g, packEntries, avgPercent }) => (
                    <div
                      key={g.id}
                      style={{
                        display: 'flex', flexDirection: 'column', gap: '8px',
                        padding: '10px 12px', borderRadius: '14px',
                        background: 'var(--pg-surface)', border: '1px solid var(--pg-hairline)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                        <strong style={{ fontSize: '0.9rem', color: 'var(--pg-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {g.name}
                        </strong>
                        <span className="teacher-status-pill active" style={{ flexShrink: 0 }}>• Active</span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--pg-text-secondary)' }}>
                        <span className="group-level-badge">{g.level}</span>
                        <span>{g.studentsCount || 0} students</span>
                        <span>{packEntries.length} packs</span>
                        <span style={{ marginLeft: 'auto', fontWeight: 700, color: 'var(--pg-text)' }}>
                          {loadingAllStats && !(g.id in allGroupsStudents) ? '…' : `${avgPercent}% mastery`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
  );
}
