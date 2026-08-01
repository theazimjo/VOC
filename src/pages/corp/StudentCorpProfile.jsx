import { useMemo } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { ArrowRightLeft, LogOut, ChevronRight, BookOpen, Users, Star, Mail, Flame, Trophy, Zap } from 'lucide-react';
import { setAppMode } from '../../services/corpService';
import { useAuth } from '../../contexts/AuthContext';
import { useStreak } from '../../hooks/useStreak';
import './StudentCorpSettings.css';
import './StudentCorpProfile.css';

export default function StudentCorpProfile() {
  const { user, membership, student, assignedPacks, learnedPacksCount, progressPct } = useOutletContext();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { streak } = useStreak();

  const handleReturnToIndividual = async () => {
    if (user) await setAppMode(user.uid, 'individual');
    navigate('/');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const displayName = student?.name || user.displayName || "O'quvchi";
  const initial = displayName[0].toUpperCase();

  const streakCount = streak?.streakCount ?? 0;
  const todayCount = streak?.todayCount ?? 0;
  const dailyGoal = streak?.dailyGoal ?? 5;
  const todayPct = Math.min(100, Math.round((todayCount / dailyGoal) * 100));

  // Build last 7 days activity
  const weekActivity = useMemo(() => {
    const log = streak?.activityLog || {};
    const goal = streak?.dailyGoal ?? 5;
    const days = [];
    const labels = ['Du', 'Se', 'Ch', 'Pa', 'Sh', 'Ya', 'Ya'];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const offset = d.getTimezoneOffset();
      const local = new Date(d.getTime() - offset * 60000);
      const key = local.toISOString().split('T')[0];
      const count = log[key] ?? 0;
      const dayName = labels[local.getDay() === 0 ? 6 : local.getDay() - 1];
      days.push({ key, dayName, count, goal, isToday: i === 0 });
    }
    return days;
  }, [streak]);

  // Circumference of the SVG circle for daily progress ring
  const RADIUS = 28;
  const CIRC = 2 * Math.PI * RADIUS;
  const offset = CIRC - (todayPct / 100) * CIRC;

  return (
    <div className="ios-settings-container">

      {/* ── Avatar Header ────────────────────── */}
      <div className="corp-profile-header">
        <div className="corp-profile-avatar">{initial}</div>
        <div>
          <div className="corp-profile-name">{displayName}</div>
          <div className="corp-profile-email">
            <Mail size={13} /> {user.email}
          </div>
        </div>
      </div>

      {/* ── STREAK BANNER ─────────────────────── */}
      <div className="corp-streak-banner">
        <div className="corp-streak-main">
          <span className="corp-streak-fire">🔥</span>
          <div>
            <div className="corp-streak-count">{streakCount} kun</div>
            <div className="corp-streak-label">Uzluksiz mashq</div>
          </div>
        </div>
        {/* Daily progress ring */}
        <div className="corp-daily-ring-wrap">
          <svg width="72" height="72">
            <circle cx="36" cy="36" r={RADIUS} strokeWidth="6" stroke="#2c2c2e" fill="none" />
            <circle
              cx="36" cy="36" r={RADIUS}
              strokeWidth="6"
              stroke={todayPct >= 100 ? '#34c759' : '#0a84ff'}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={offset}
              transform="rotate(-90 36 36)"
              style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.4,0,0.2,1)' }}
            />
            <text x="36" y="40" textAnchor="middle" fontSize="13" fontWeight="700"
              fill={todayPct >= 100 ? '#34c759' : '#fff'}>
              {todayPct}%
            </text>
          </svg>
          <div className="corp-daily-ring-label">Bugungi</div>
        </div>
      </div>

      {/* ── WEEKLY ACTIVITY BAR CHART ─────────── */}
      <div className="ios-settings-header" style={{ marginTop: '28px' }}>Haftalik faollik</div>
      <div className="corp-week-chart">
        {weekActivity.map(day => {
          const barH = day.goal > 0 ? Math.min(100, Math.round((day.count / day.goal) * 100)) : 0;
          const done = day.count >= day.goal && day.goal > 0;
          return (
            <div key={day.key} className="corp-week-day">
              <div className="corp-week-bar-track">
                <div
                  className={`corp-week-bar-fill ${done ? 'done' : ''}`}
                  style={{ height: `${Math.max(4, barH)}%` }}
                />
              </div>
              <div className={`corp-week-day-label ${day.isToday ? 'today' : ''}`}>{day.dayName}</div>
            </div>
          );
        })}
      </div>

      {/* ── STATS GRID ───────────────────────── */}
      <div className="corp-stats-grid">
        {[
          { icon: <Flame size={18} />, label: 'Streak rekord', value: `${streakCount} kun`, color: '#ff9500' },
          { icon: <Zap size={18} />, label: 'Bugungi maqsad', value: `${todayCount}/${dailyGoal}`, color: '#0a84ff' },
          { icon: <BookOpen size={18} />, label: 'Paketlar', value: assignedPacks?.length ?? 0, color: '#5856d6' },
          { icon: <Star size={18} />, label: 'Bajarildi', value: learnedPacksCount ?? 0, color: '#ff2d55' },
          { icon: <Trophy size={18} />, label: 'Jarayon', value: `${progressPct ?? 0}%`, color: '#34c759' },
          { icon: <Users size={18} />, label: 'Guruh', value: membership.groupName?.split(' ')[0] || '—', color: '#af52de' },
        ].map((s) => (
          <div key={s.label} className="corp-stat-card">
            <div className="corp-stat-icon" style={{ color: s.color }}>{s.icon}</div>
            <div className="corp-stat-value">{s.value}</div>
            <div className="corp-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Group Info ───────────────────────── */}
      <div className="ios-settings-header">Guruh ma'lumotlari</div>
      <div className="ios-settings-section">
        <div className="ios-settings-row">
          <div className="ios-settings-left">
            <div className="ios-icon-box" style={{ background: '#5856d6' }}>
              <Users size={16} strokeWidth={2.2} />
            </div>
            <span className="ios-row-title">Guruh nomi</span>
          </div>
          <span className="ios-detail-text">{membership.groupName}</span>
        </div>


        {membership.centerName && (
          <div className="ios-settings-row">
            <div className="ios-settings-left">
              <div className="ios-icon-box" style={{ background: '#34c759' }}>
                <BookOpen size={16} strokeWidth={2.2} />
              </div>
              <span className="ios-row-title">O'quv markazi</span>
            </div>
            <span className="ios-detail-text">{membership.centerName}</span>
          </div>
        )}
      </div>

      {/* ── Actions ──────────────────────────── */}
      <div className="ios-settings-header">Akkaunt</div>
      <div className="ios-settings-section">
        <div
          className="ios-settings-row"
          style={{ cursor: 'pointer' }}
          onClick={handleReturnToIndividual}
        >
          <div className="ios-settings-left">
            <div className="ios-icon-box" style={{ background: '#0a84ff' }}>
              <ArrowRightLeft size={16} strokeWidth={2.2} />
            </div>
            <span className="ios-row-title">Individual rejimga o'tish</span>
          </div>
          <ChevronRight size={14} className="ios-chevron" />
        </div>
      </div>

      <div className="ios-settings-section" style={{ marginTop: '8px' }}>
        <div
          className="ios-settings-row"
          style={{ cursor: 'pointer' }}
          onClick={handleLogout}
        >
          <div className="ios-settings-left">
            <div className="ios-icon-box" style={{ background: '#ff3b30' }}>
              <LogOut size={16} strokeWidth={2.2} />
            </div>
            <span className="ios-row-title" style={{ color: '#ff3b30' }}>Hisobdan chiqish</span>
          </div>
        </div>
      </div>

      <div className="ios-settings-footer" style={{ textAlign: 'center', marginTop: '16px' }}>
        VOC Corp Edition · {membership.groupName}
      </div>
    </div>
  );
}
