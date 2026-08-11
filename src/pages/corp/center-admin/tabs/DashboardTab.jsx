import { useMemo, useState } from 'react';
import {
  AlertTriangle, ArrowRight, ArrowUpRight, BookOpen, CheckCircle2, ChevronRight,
  GraduationCap, Layers, Search, Users,
} from 'lucide-react';
import { getInitials } from '../utils';
import './DashboardTab.css';

// Bento-grid layout, flat iOS card styling (same tokens as every other
// center-admin tab). Every number on this page is derived from data
// that's already loaded for the Teachers/Courses/Groups tabs — nothing
// invented, no simulated trend lines, no fabricated percentages. There's
// no time-series data source anywhere in this app (no daily snapshots,
// no login/activity events), so instead of faking a growth chart this
// shows a real per-teacher workload breakdown, sortable by an actual
// metric (students or groups).
export default function DashboardTab({ p }) {
  const {
    allCourses, avgStudents, centerName, groups, navigate, teachersWithStats,
    totalCourses, totalTeacherStudents, totalTeachers,
  } = p;

  const [watchlistTab, setWatchlistTab] = useState('teachers');
  const [sortMetric, setSortMetric] = useState('students'); // 'students' | 'groups'
  const [searchQuery, setSearchQuery] = useState('');

  const recentCourses = useMemo(() =>
    [...allCourses].sort((a, b) => b.createdAt - a.createdAt).slice(0, 4),
  [allCourses]);

  // Real, computed problems — same signals the original dashboard used:
  // idle teachers, empty groups, unused courses. Nothing here is a vanity
  // metric; each one is something the admin can actually go fix.
  const idleTeachers = useMemo(() => teachersWithStats.filter(t => t.groupsCount === 0), [teachersWithStats]);
  const emptyGroups = useMemo(() => groups.filter(g => g.status !== 'archived' && (g.studentsCount || 0) === 0), [groups]);
  const unusedCourses = useMemo(() => allCourses.filter(c => c.groupsCount === 0), [allCourses]);
  const attentionCount = idleTeachers.length + emptyGroups.length + unusedCourses.length;

  const topInsight = useMemo(() => {
    if (idleTeachers.length > 0) {
      const t = idleTeachers[0];
      return { text: <><strong>{t.name}</strong> hali birorta guruhga biriktirilmagan</>, cta: "O'qituvchilarni ko'rish", to: '/corp/admin/teachers' };
    }
    if (emptyGroups.length > 0) {
      const g = emptyGroups[0];
      return { text: <><strong>{g.name}</strong> guruhida hali o'quvchi yo'q</>, cta: "Guruhlarni ko'rish", to: '/corp/admin/teachers' };
    }
    if (unusedCourses.length > 0) {
      const c = unusedCourses[0];
      return { text: <><strong>{c.title}</strong> paketi hech qaysi guruhga biriktirilmagan</>, cta: "Packlarni ko'rish", to: '/corp/admin/courses' };
    }
    return null;
  }, [idleTeachers, emptyGroups, unusedCourses]);

  // Watchlist — real top performers ranked by actual student/group count.
  // The search box genuinely filters this list (by name), it's not just
  // decoration.
  const q = searchQuery.trim().toLowerCase();
  const rankedTeachers = useMemo(() =>
    [...teachersWithStats]
      .filter(t => !q || t.name.toLowerCase().includes(q))
      .sort((a, b) => b.studentsCount - a.studentsCount),
  [teachersWithStats, q]);
  const rankedGroups = useMemo(() =>
    [...groups]
      .filter(g => !q || g.name.toLowerCase().includes(q))
      .sort((a, b) => (b.studentsCount || 0) - (a.studentsCount || 0)),
  [groups, q]);

  // Workload — real per-teacher totals, sortable by whichever metric
  // matters. No invented time axis since none of this data is timestamped
  // per-day anywhere.
  const workloadTeachers = useMemo(() => {
    return [...teachersWithStats]
      .sort((a, b) => sortMetric === 'students' ? b.studentsCount - a.studentsCount : b.groupsCount - a.groupsCount)
      .slice(0, 6);
  }, [teachersWithStats, sortMetric]);
  const workloadMax = Math.max(1, ...workloadTeachers.map(t => sortMetric === 'students' ? t.studentsCount : t.groupsCount));

  return (
    <div className="helios-dashboard-container">
      {/* ── Top Bar Header ── */}
      <header className="helios-topbar">
        <div className="helios-welcome-group">
          <h1 className="helios-greeting">
            Xush kelibsiz, <span className="helios-accent-text">{centerName}</span>
          </h1>
          <p className="helios-subtext">Markaz o'qituvchilari, guruhlari va kurslarining umumiy holati</p>
        </div>

        <div className="helios-top-right">
          <div className="helios-search-bar">
            <Search size={18} className="helios-search-icon" />
            <input
              type="text"
              placeholder="O'qituvchi yoki guruh qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="helios-user-profile">
            <div className="helios-avatar">{getInitials(centerName)}</div>
            <div className="helios-user-meta">
              <span className="helios-username">{centerName}</span>
              <span className="helios-user-role">Center Admin</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Top Bento Grid Section ── */}
      <div className="helios-bento-grid">
        {/* Card 1: Total Students / Hero Stat */}
        <div className="helios-card helios-hero-card">
          <div className="helios-card-header">
            <span className="helios-card-title">Jami O'quvchilar Soni</span>
            <span className="helios-badge-chip blue">{groups.length} ta guruhda</span>
          </div>

          <div className="helios-big-stat-val">
            {totalTeacherStudents} <span className="helios-stat-unit">o'quvchi</span>
          </div>

          {/* Real "needs attention" insight, not a fabricated AI claim */}
          <div className={`helios-insight-box ${topInsight ? 'warn' : 'good'}`}>
            {topInsight ? (
              <>
                <div className="helios-insight-content">
                  <div className="helios-insight-chip warn">
                    <AlertTriangle size={13} /> Diqqat talab qiladi{attentionCount > 1 && ` (${attentionCount})`}
                  </div>
                  <p>{topInsight.text}</p>
                </div>
                <button type="button" className="helios-insight-cta-btn" onClick={() => navigate(topInsight.to)}>
                  {topInsight.cta} <ArrowRight size={16} />
                </button>
              </>
            ) : (
              <div className="helios-insight-content">
                <div className="helios-insight-chip good">
                  <CheckCircle2 size={13} /> Hammasi joyida
                </div>
                <p>Diqqat talab qiladigan muammo yo'q — barcha o'qituvchi va guruhlar faol.</p>
              </div>
            )}
          </div>
        </div>

        {/* Card 2: Watchlist / Top Performers */}
        <div className="helios-card helios-watchlist-card">
          <div className="helios-card-header">
            <span className="helios-card-title">Yetakchilar</span>
            <div className="helios-tab-pills">
              <button
                type="button"
                className={`helios-tab-pill ${watchlistTab === 'teachers' ? 'active' : ''}`}
                onClick={() => setWatchlistTab('teachers')}
              >
                O'qituvchilar
              </button>
              <button
                type="button"
                className={`helios-tab-pill ${watchlistTab === 'groups' ? 'active' : ''}`}
                onClick={() => setWatchlistTab('groups')}
              >
                Guruhlar
              </button>
            </div>
          </div>

          <div className="helios-watchlist-list">
            {watchlistTab === 'teachers' && (
              rankedTeachers.length === 0 ? (
                <div className="helios-empty-item">{q ? 'Hech narsa topilmadi' : "O'qituvchilar mavjud emas"}</div>
              ) : (
                rankedTeachers.slice(0, 4).map((t) => (
                  <button type="button" key={t.id} className="helios-watchlist-row" onClick={() => navigate('/corp/admin/teachers')}>
                    <div className="helios-row-left">
                      <div className="helios-mini-avatar">{getInitials(t.name)}</div>
                      <div>
                        <div className="helios-row-title">{t.name}</div>
                        <div className="helios-row-sub">{t.groupsCount} guruh</div>
                      </div>
                    </div>
                    <div className="helios-row-right">
                      <div className="helios-row-val">{t.studentsCount} o'quvchi</div>
                    </div>
                  </button>
                ))
              )
            )}

            {watchlistTab === 'groups' && (
              rankedGroups.length === 0 ? (
                <div className="helios-empty-item">{q ? 'Hech narsa topilmadi' : 'Guruhlar mavjud emas'}</div>
              ) : (
                rankedGroups.slice(0, 4).map((g) => (
                  <button type="button" key={g.id} className="helios-watchlist-row" onClick={() => navigate('/corp/admin/teachers')}>
                    <div className="helios-row-left">
                      <div className="helios-icon-box purple"><BookOpen size={18} /></div>
                      <div>
                        <div className="helios-row-title">{g.name}</div>
                        <div className="helios-row-sub">{g.level || 'Beginner'}</div>
                      </div>
                    </div>
                    <div className="helios-row-right">
                      <div className="helios-row-val">{g.studentsCount || 0} o'quvchi</div>
                      <span className={`helios-status-chip ${g.status === 'archived' ? '' : 'active'}`}>
                        {g.status === 'archived' ? 'Arxiv' : 'Faol'}
                      </span>
                    </div>
                  </button>
                ))
              )
            )}
          </div>
        </div>

        {/* Card 3: Mini Metrics 2x2 Grid */}
        <div className="helios-card helios-metrics-card">
          <div className="helios-card-header">
            <span className="helios-card-title">Markaz Metrikalari</span>
            <button type="button" className="helios-see-all-btn" onClick={() => navigate('/corp/admin/statistics')}>
              Barchasi <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="helios-metrics-grid">
            <button type="button" className="helios-mini-metric-card" onClick={() => navigate('/corp/admin/teachers')}>
              <div className="helios-mm-val">{totalTeachers}</div>
              <div className="helios-mm-footer">
                <GraduationCap size={18} className="helios-mm-icon purple" />
                <span>O'qituvchilar</span>
              </div>
            </button>

            <button type="button" className="helios-mini-metric-card" onClick={() => navigate('/corp/admin/courses')}>
              <div className="helios-mm-val">{totalCourses}</div>
              <div className="helios-mm-footer">
                <BookOpen size={18} className="helios-mm-icon blue" />
                <span>Xususiy Packlar</span>
              </div>
            </button>

            <button type="button" className="helios-mini-metric-card" onClick={() => navigate('/corp/admin/teachers')}>
              <div className="helios-mm-val">{groups.length}</div>
              <div className="helios-mm-footer">
                <Layers size={18} className="helios-mm-icon green" />
                <span>Guruhlar</span>
              </div>
            </button>

            <button type="button" className="helios-mini-metric-card" onClick={() => navigate('/corp/admin/statistics')}>
              <div className="helios-mm-val">{avgStudents}</div>
              <div className="helios-mm-footer">
                <Users size={18} className="helios-mm-icon orange" />
                <span>O'qituvchiga o'rtacha</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ── Middle: Real Per-Teacher Workload Breakdown ── */}
      <div className="helios-card helios-chart-card">
        <div className="helios-chart-header">
          <div>
            <h3 className="helios-chart-title">O'qituvchilar Yuklamasi</h3>
            <p className="helios-chart-sub">Har bir o'qituvchining hozirgi haqiqiy ko'rsatkichlari</p>
          </div>

          <div className="helios-time-toggles">
            <button
              type="button"
              className={`helios-time-btn ${sortMetric === 'students' ? 'active' : ''}`}
              onClick={() => setSortMetric('students')}
            >
              O'quvchilar
            </button>
            <button
              type="button"
              className={`helios-time-btn ${sortMetric === 'groups' ? 'active' : ''}`}
              onClick={() => setSortMetric('groups')}
            >
              Guruhlar
            </button>
          </div>
        </div>

        {workloadTeachers.length === 0 ? (
          <div className="helios-empty-item">Hali o'qituvchi qo'shilmagan</div>
        ) : (
          <div className="helios-bar-list">
            {workloadTeachers.map((t) => {
              const val = sortMetric === 'students' ? t.studentsCount : t.groupsCount;
              const pct = Math.round((val / workloadMax) * 100);
              return (
                <button type="button" key={t.id} className="helios-bar-row" onClick={() => navigate('/corp/admin/teachers')}>
                  <div className="helios-bar-row-head">
                    <span className="helios-bar-name">{t.name}</span>
                    <span className="helios-bar-value">{val} {sortMetric === 'students' ? "o'quvchi" : 'guruh'}</span>
                  </div>
                  <div className="helios-bar-track">
                    <div className="helios-bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Bottom Section: Recent Courses Preview ── */}
      <div className="helios-card helios-recent-courses-card">
        <div className="helios-card-header">
          <span className="helios-card-title">So'nggi Qo'shilgan Packlar</span>
          <button type="button" className="helios-see-all-btn" onClick={() => navigate('/corp/admin/courses')}>
            Barchasi <ArrowRight size={16} />
          </button>
        </div>

        <div className="helios-recent-packs-grid full-width-grid">
          {recentCourses.length === 0 ? (
            <div className="helios-empty-item">Xususiy packlar hali qo'shilmagan</div>
          ) : (
            recentCourses.map((c) => (
              <button type="button" key={c.id} className="helios-pack-item" onClick={() => navigate('/corp/admin/courses')}>
                <div className="helios-pack-icon"><BookOpen size={20} /></div>
                <div className="helios-pack-info">
                  <div className="helios-pack-title">{c.title}</div>
                  <div className="helios-pack-sub">{c.sectionsCount} bo'lim · {c.wordsCount} so'z</div>
                </div>
                <ChevronRight size={18} className="helios-pack-arrow" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
