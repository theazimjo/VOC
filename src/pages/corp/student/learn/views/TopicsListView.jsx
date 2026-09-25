import { ChevronLeft, Layers, Type } from 'lucide-react';
import SatPackCard from '../../../../../components/corp/SatPackCard';
import PackHeaderHero from '../../../../../components/corp/PackHeaderHero';
import { computeMonthWordStats, computeUnitWordStats } from '../utils';

export default function TopicsListView({ p }) {
  const { allDbWords, navigate, selectedMonth } = p;

  return (
            <>
              {/* Sleek back button pill */}
              <div className="ios-nav-header">
                <button
                  className="ios-back-btn"
                  onClick={() => navigate('/corp/student/learn')}
                  aria-label="Orqaga"
                  title="Orqaga"
                >
                  <ChevronLeft size={18} strokeWidth={2.5} />
                  <span>Orqaga</span>
                </button>
              </div>

              {/* Hero Banner Header Card */}
              {(() => {
                const monthStats = computeMonthWordStats(selectedMonth, allDbWords);
                return (
                  <PackHeaderHero
                    title={selectedMonth.title}
                    subtitle={selectedMonth.packTitle ? (selectedMonth.packLevel ? `${selectedMonth.packTitle} (${selectedMonth.packLevel})` : selectedMonth.packTitle) : ""}
                    tag={selectedMonth.packLevel || "So'zlar"}
                    metrics={[
                      { icon: <Layers size={16} />, label: 'MAVZULAR', value: (selectedMonth.units || []).length, color: 'blue' },
                      { icon: <Type size={16} />, label: "SO'ZLAR", value: monthStats.totalWords, color: 'purple' },
                    ]}
                    masteredCount={monthStats.masteredCount}
                    masteryPct={monthStats.avgMasteryPct}
                  />
                );
              })()}

              <div className="grid-cards">
                {(selectedMonth.units || []).length === 0 ? (
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', padding: '1rem 0' }}>Bu oyda hali mavzu yo'q.</div>
                ) : (
                  selectedMonth.units.map((u) => {
                    const stats = computeUnitWordStats(selectedMonth, u, allDbWords);
                    const hasWords = (u.words || []).length > 0;

                    return (
                      <SatPackCard
                        key={u.id}
                        title={u.title}
                        subtitle={u.pattern || selectedMonth.title}
                        wordCount={stats.totalWords}
                        wordLabel="so'z"
                        masteredCount={stats.masteredCount}
                        learningCount={stats.learningCount}
                        newCount={stats.newCount}
                        masteryPct={stats.avgMasteryPct}
                        onClick={() => hasWords && navigate(`/corp/student/learn/topic/${selectedMonth.packId}/${selectedMonth.id}/${u.id}`)}
                        disabled={!hasWords}
                      />
                    );
                  })
                )}
              </div>
            </>
  );
}
