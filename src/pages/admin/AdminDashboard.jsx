/**
 * 🛡️ AdminDashboard — faqat azimjonxolmirzayev30@gmail.com uchun
 * Route: /admin
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ref, get, update } from 'firebase/database';
import { sendPasswordResetEmail } from 'firebase/auth';
import {
  Users, Activity, BookOpen, TrendingUp,
  Zap, Award, ChevronDown, ChevronUp, Search, AlertTriangle,
  KeyRound, Mail, CheckCircle2, X, Lock, Flame, Layers
} from 'lucide-react';
import { db, auth } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import './AdminDashboard.css';

const ADMIN_EMAILS = ['azimjon29042006@gmail.com', 'azimjonxolmirzayev30@gmail.com'];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function timeAgo(isoString) {
  if (!isoString) return '—';
  const diff = (Date.now() - new Date(isoString).getTime()) / 1000;
  if (diff < 60) return 'Hozirgina';
  if (diff < 3600) return `${Math.floor(diff / 60)} daqiqa oldin`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} soat oldin`;
  if (diff < 86400 * 7) return `${Math.floor(diff / 86400)} kun oldin`;
  return new Date(isoString).toLocaleDateString('uz-UZ');
}

function formatDate(isoString) {
  if (!isoString) return '—';
  return new Date(isoString).toLocaleDateString('uz-UZ', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
}

function isActiveInDays(isoString, days) {
  if (!isoString) return false;
  return (Date.now() - new Date(isoString).getTime()) < days * 86400 * 1000;
}

function getActivityColor(isoString) {
  if (!isoString) return 'inactive';
  const diff = (Date.now() - new Date(isoString).getTime()) / (86400 * 1000);
  if (diff < 1) return 'active-today';
  if (diff < 7) return 'active-week';
  if (diff < 30) return 'active-month';
  return 'inactive';
}

// ─── Stats Card ──────────────────────────────────────────────────────────────

function StatCard({ icon, value, label, color, sub, trend }) {
  return (
    <motion.div
      className={`adm-stat-card adm-stat-card--${color}`}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
    >
      <div className="adm-stat-top">
        <div className={`adm-stat-icon adm-color-${color}`}>{icon}</div>
        {trend && <span className="adm-stat-badge">{trend}</span>}
      </div>
      <div className="adm-stat-val">{value}</div>
      <div className="adm-stat-label">{label}</div>
      {sub && <div className="adm-stat-sub">{sub}</div>}
    </motion.div>
  );
}

// ─── Activity Heatmap ─────────────────────────────────────────────────────────

function ActivityHeatmap({ activityLog = {} }) {
  const DAYS = 70;
  const today = new Date();
  const cells = [];
  for (let i = DAYS - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    const count = activityLog[key] || 0;
    cells.push({ date: key, count, dayOfWeek: d.getDay() });
  }

  const maxCount = Math.max(...cells.map(c => c.count), 1);
  const totalActiveDays = cells.filter(c => c.count > 0).length;
  const totalWords = cells.reduce((s, c) => s + c.count, 0);
  const avgPerActiveDay = totalActiveDays > 0 ? (totalWords / totalActiveDays).toFixed(1) : 0;

  const getHeat = (count) => {
    if (count === 0) return 'adm-heat-0';
    const r = count / maxCount;
    if (r < 0.25) return 'adm-heat-1';
    if (r < 0.5)  return 'adm-heat-2';
    if (r < 0.75) return 'adm-heat-3';
    return 'adm-heat-4';
  };

  const DAY_LABELS = ['Ya','Du','Se','Ch','Pa','Ju','Sh'];
  const firstDayOfWeek = cells[0]?.dayOfWeek ?? 0;
  const paddedCells = [...Array(firstDayOfWeek).fill(null), ...cells];

  return (
    <div className="adm-heatmap-section">
      <div className="adm-heatmap-header">
        <span className="adm-heatmap-title">📅 Kunlik faollik (oxirgi 10 hafta)</span>
        <div className="adm-heatmap-summary">
          <span>{totalActiveDays} faol kun</span>
          <span>·</span>
          <span>{totalWords} so'z</span>
          <span>·</span>
          <span>O'rtacha {avgPerActiveDay} ta/kun</span>
        </div>
      </div>
      <div className="adm-heatmap-wrap">
        <div className="adm-heatmap-days">
          {DAY_LABELS.map(d => <div key={d} className="adm-heatmap-day-label">{d}</div>)}
        </div>
        <div className="adm-heatmap-grid">
          {paddedCells.map((cell, i) => (
            <div
              key={i}
              className={`adm-heat-cell ${cell ? getHeat(cell.count) : 'adm-heat-pad'}`}
              title={cell ? `${cell.date}: ${cell.count} so'z` : ''}
            />
          ))}
        </div>
      </div>
      <div className="adm-heatmap-legend">
        <span>Kam</span>
        {['adm-heat-0','adm-heat-1','adm-heat-2','adm-heat-3','adm-heat-4'].map(cls => (
          <div key={cls} className={`adm-heat-cell-sm ${cls}`} />
        ))}
        <span>Ko'p</span>
      </div>
    </div>
  );
}

// ─── User Row ─────────────────────────────────────────────────────────────────

function UserRow({ userData, index, onResetPassword }) {
  const [expanded, setExpanded] = useState(false);
  const { profile, activity, packs = {}, words = {}, meta = {} } = userData;

  const packCount = Object.keys(packs).length;
  const wordCount = Object.values(words).reduce((total, packWords) => {
    return total + (typeof packWords === 'object' ? Object.keys(packWords).length : 0);
  }, 0);
  const sessionCount = activity?.sessionCount || 0;
  const lastSeen = activity?.lastSeen;
  const activityClass = getActivityColor(lastSeen);
  const streak = userData.streak?.streakCount || 0;

  const folderCount = Object.keys(userData.folders || {}).length;
  const packsCreatedTotal = meta.packsCreatedTotal || 0;
  const foldersCreatedTotal = meta.foldersCreatedTotal || 0;

  const packChurn = packsCreatedTotal - packCount;
  const folderChurn = foldersCreatedTotal - folderCount;
  const looksSuspicious = packChurn > 30 || folderChurn > 30;

  return (
    <motion.div
      className="adm-user-row"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.3) }}
    >
      <div className="adm-user-main" onClick={() => setExpanded(e => !e)}>
        {/* Avatar */}
        <div className="adm-user-avatar">
          {profile?.photoURL ? (
            <img src={profile.photoURL} alt="" />
          ) : (
            <span>{(profile?.displayName || profile?.email || '?')[0].toUpperCase()}</span>
          )}
          <div className={`adm-activity-dot ${activityClass}`} title={activityClass} />
        </div>

        {/* Identity */}
        <div className="adm-user-identity">
          <div className="adm-user-name">
            <span>{profile?.displayName || 'Nomsiz'}</span>
            {looksSuspicious && (
              <AlertTriangle size={14} className="adm-suspicious-flag" title="Ko'p create+delete tsikli — tekshirib ko'ring" />
            )}
          </div>
          <div className="adm-user-email">{profile?.email || '—'}</div>
        </div>

        {/* Quick stats pills */}
        <div className="adm-user-quick">
          <div className="adm-quick-chip" title="So'zlar">
            <BookOpen size={13} />
            <span>{wordCount}</span>
          </div>
          <div className="adm-quick-chip" title="To'plamlar">
            <Layers size={13} />
            <span>{packCount}</span>
          </div>
          <div className="adm-quick-chip" title="Sessiyalar">
            <Zap size={13} />
            <span>{sessionCount}</span>
          </div>
          {streak > 0 && (
            <div className="adm-quick-chip streak" title="Streak">
              <Flame size={13} />
              <span>{streak}d</span>
            </div>
          )}
        </div>

        {/* Actions & Last seen */}
        <div className="adm-user-actions" onClick={e => e.stopPropagation()}>
          <button
            type="button"
            className="adm-reset-pwd-btn"
            title="Parolni tiklash / yangilash"
            onClick={() => onResetPassword(userData)}
          >
            <KeyRound size={13} />
            <span>Parolni tiklash</span>
          </button>
          <div className={`adm-last-seen-badge ${activityClass}`}>
            {timeAgo(lastSeen)}
          </div>
        </div>

        {/* Expand Toggle */}
        <div className="adm-expand-btn">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      {/* Expanded Detail Panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="adm-user-detail"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="adm-detail-grid">
              <div className="adm-detail-card">
                <div className="adm-detail-label">Ro'yxatdan o'tgan</div>
                <div className="adm-detail-value">{formatDate(profile?.createdAt)}</div>
              </div>
              <div className="adm-detail-card">
                <div className="adm-detail-label">Oxirgi ko'rilgan</div>
                <div className="adm-detail-value">{formatDate(lastSeen)}</div>
              </div>
              <div className="adm-detail-card">
                <div className="adm-detail-label">Jami sessiyalar</div>
                <div className="adm-detail-value">{sessionCount} marta</div>
              </div>
              <div className="adm-detail-card">
                <div className="adm-detail-label">To'plamlar</div>
                <div className="adm-detail-value">{packCount} ta</div>
              </div>
              <div className="adm-detail-card">
                <div className="adm-detail-label">Jami so'zlar</div>
                <div className="adm-detail-value">{wordCount} ta</div>
              </div>
              <div className="adm-detail-card">
                <div className="adm-detail-label">Streak</div>
                <div className="adm-detail-value">{streak} kun 🔥</div>
              </div>
              <div className={`adm-detail-card ${packChurn > 30 ? 'adm-detail-card--warn' : ''}`}>
                <div className="adm-detail-label">Umrbod yaratilgan to'plamlar</div>
                <div className="adm-detail-value">{packsCreatedTotal} ta (hozir {packCount} ta bor)</div>
              </div>
              <div className={`adm-detail-card ${folderChurn > 30 ? 'adm-detail-card--warn' : ''}`}>
                <div className="adm-detail-label">Umrbod yaratilgan papkalar</div>
                <div className="adm-detail-value">{foldersCreatedTotal} ta (hozir {folderCount} ta bor)</div>
              </div>
            </div>

            <div style={{ marginTop: '12px' }}>
              <button
                type="button"
                className="adm-reset-pwd-btn adm-reset-pwd-btn--large"
                onClick={() => onResetPassword(userData)}
              >
                <KeyRound size={15} />
                Ushbu foydalanuvchining parolini tiklash
              </button>
            </div>

            {/* Activity Heatmap */}
            <ActivityHeatmap activityLog={userData.streak?.activityLog} />

            {/* Pack breakdown */}
            {packCount > 0 && (
              <div className="adm-pack-list">
                {Object.entries(packs).map(([packId, pack]) => {
                  const pWords = words[packId] ? Object.keys(words[packId]).length : 0;
                  return (
                    <div key={packId} className="adm-pack-chip">
                      <span>{pack.name || pack.title || 'To\'plam'}</span>
                      <span className="adm-pack-count">{pWords} so'z</span>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Admin Dashboard ─────────────────────────────────────────────────────

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('lastSeen'); // lastSeen | words | sessions | created

  // Password reset modal states
  const [resetPasswordUser, setResetPasswordUser] = useState(null);
  const [customPassword, setCustomPassword] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg, isError = false) => {
    setToastMsg({ msg, isError });
    setTimeout(() => setToastMsg(null), 4000);
  };

  // Guard: only admin
  useEffect(() => {
    if (!user) return;
    if (!ADMIN_EMAILS.includes(user.email)) {
      navigate('/');
    }
  }, [user, navigate]);

  const fetchData = useCallback(async () => {
    if (!user || !ADMIN_EMAILS.includes(user.email)) return;
    setLoading(true);
    setError(null);
    try {
      const snap = await get(ref(db, 'users'));
      if (!snap.exists()) {
        setUsers([]);
        return;
      }
      const list = [];
      snap.forEach(child => {
        list.push({ uid: child.key, ...child.val() });
      });
      setUsers(list);
      setLastRefresh(new Date());
    } catch (err) {
      console.error('[Admin] fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSendResetEmail = async () => {
    if (!resetPasswordUser?.profile?.email) {
      showToast("Foydalanuvchi email manzili topilmadi.", true);
      return;
    }
    setActionLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetPasswordUser.profile.email);
      showToast(`Parolni tiklash havolasi ${resetPasswordUser.profile.email} manziliga yuborildi!`);
      setResetPasswordUser(null);
    } catch (err) {
      console.error("Password reset email error:", err);
      showToast(`Xatolik: ${err.message}`, true);
    } finally {
      setActionLoading(false);
    }
  };

  const handleSetCustomPassword = async (e) => {
    e.preventDefault();
    const newPwd = customPassword.trim();
    if (!newPwd) {
      showToast("Iltimos, yangi parol kiriting.", true);
      return;
    }
    if (newPwd.length < 6) {
      showToast("Parol kamida 6 ta belgidan iborat bo'lishi kerak.", true);
      return;
    }

    setActionLoading(true);
    let rtdbUpdated = false;

    const userEmail = resetPasswordUser.profile?.email || resetPasswordUser.email || '';
    const cleanKey = userEmail.toLowerCase().trim().replace(/[.#$\[\]]/g, '_');

    try {
      const updates = {};
      updates[`users/${resetPasswordUser.uid}/tempPassword`] = newPwd;
      updates[`users/${resetPasswordUser.uid}/profile/tempPassword`] = newPwd;
      updates[`users/${resetPasswordUser.uid}/profile/password`] = newPwd;
      updates[`users/${resetPasswordUser.uid}/profile/passwordUpdatedAt`] = new Date().toISOString();

      if (cleanKey) {
        updates[`userPasswordOverrides/${cleanKey}`] = {
          uid: resetPasswordUser.uid,
          password: newPwd,
          email: userEmail,
          updatedAt: new Date().toISOString()
        };
      }

      await update(ref(db), updates);
      rtdbUpdated = true;
    } catch (err) {
      console.warn("RTDB password update warning:", err);
    }

    if (userEmail && userEmail.includes('@')) {
      sendPasswordResetEmail(auth, userEmail).catch(() => {});
    }

    if (rtdbUpdated) {
      const userLabel = resetPasswordUser.profile?.displayName || userEmail || 'Foydalanuvchi';
      showToast(`✅ ${userLabel} uchun yangi parol (${newPwd}) o'rnatildi! Foydalanuvchi endi darhol kirishi mumkin.`);
      setResetPasswordUser(null);
      setCustomPassword('');
      fetchData();
    } else {
      showToast("Xatolik: Yangi parol saqlanmadi.", true);
    }
    setActionLoading(false);
  };

  if (!user || !ADMIN_EMAILS.includes(user.email)) return null;

  // ── Compute global stats ─────────────────────────────────────

  const totalUsers = users.length;
  const activeTodayCount = users.filter(u => isActiveInDays(u.activity?.lastSeen, 1)).length;
  const active7d = users.filter(u => isActiveInDays(u.activity?.lastSeen, 7)).length;
  const active30d = users.filter(u => isActiveInDays(u.activity?.lastSeen, 30)).length;
  const totalSessions = users.reduce((s, u) => s + (u.activity?.sessionCount || 0), 0);
  const totalWords = users.reduce((s, u) => {
    return s + Object.values(u.words || {}).reduce((wt, pw) => {
      return wt + (typeof pw === 'object' ? Object.keys(pw).length : 0);
    }, 0);
  }, 0);
  const totalPacks = users.reduce((s, u) => s + Object.keys(u.packs || {}).length, 0);
  const avgSessions = totalUsers > 0 ? (totalSessions / totalUsers).toFixed(1) : '—';
  const inactiveCount = totalUsers - active30d;

  // ── Filter + sort ────────────────────────────────────────────

  const getWordCount = (u) => Object.values(u.words || {}).reduce((t, pw) => {
    return t + (typeof pw === 'object' ? Object.keys(pw).length : 0);
  }, 0);

  const filtered = users
    .filter(u => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        (u.profile?.displayName || '').toLowerCase().includes(q) ||
        (u.profile?.email || '').toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'lastSeen') {
        return new Date(b.activity?.lastSeen || 0) - new Date(a.activity?.lastSeen || 0);
      }
      if (sortBy === 'words') return getWordCount(b) - getWordCount(a);
      if (sortBy === 'sessions') return (b.activity?.sessionCount || 0) - (a.activity?.sessionCount || 0);
      if (sortBy === 'created') {
        return new Date(b.profile?.createdAt || 0) - new Date(a.profile?.createdAt || 0);
      }
      return 0;
    });

  return (
    <div className="adm-page">
      {/* Decorative ambient background glows */}
      <div className="adm-glow-bg adm-glow-bg-1" />
      <div className="adm-glow-bg adm-glow-bg-2" />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            className={`adm-toast ${toastMsg.isError ? 'adm-toast--error' : ''}`}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
          >
            {toastMsg.isError ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />}
            <span>{toastMsg.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>



      <main className="adm-content">
        {/* Global stats */}
        <div className="adm-stats-grid">
          <StatCard
            icon={<Users size={20} />}
            value={totalUsers}
            label="Jami foydalanuvchilar"
            color="blue"
            trend={`${active7d} ta 7 kunda faol`}
            sub="Umumiy ro'yxatdan o'tganlar"
          />
          <StatCard
            icon={<Activity size={20} />}
            value={active7d}
            label="Haftalik faollar"
            color="green"
            trend={`${activeTodayCount} bugun`}
            sub={`${active30d} ta oylik faol`}
          />
          <StatCard
            icon={<Zap size={20} />}
            value={totalSessions}
            label="Jami sessiyalar"
            color="purple"
            sub={`O'rtacha ${avgSessions} ta/foydalanuvchi`}
          />
          <StatCard
            icon={<BookOpen size={20} />}
            value={totalWords}
            label="Jami so'zlar"
            color="orange"
            sub={`${totalPacks} ta to'plam`}
          />
        </div>

        {/* Activity breakdown */}
        <div className="adm-activity-bar">
          <div className="adm-activity-top-row">
            <div className="adm-activity-title">
              <TrendingUp size={16} />
              <span>Faollik holati bo'yicha taqsimot</span>
            </div>
            <div className="adm-activity-items">
              <div className="adm-activity-item">
                <div className="adm-dot active-today" />
                <span>Bugun faol: <strong>{activeTodayCount}</strong></span>
              </div>
              <div className="adm-activity-item">
                <div className="adm-dot active-week" />
                <span>7 kun: <strong>{active7d}</strong></span>
              </div>
              <div className="adm-activity-item">
                <div className="adm-dot active-month" />
                <span>30 kun: <strong>{active30d}</strong></span>
              </div>
              <div className="adm-activity-item">
                <div className="adm-dot inactive" />
                <span>Faolsiz: <strong>{inactiveCount}</strong></span>
              </div>
            </div>
          </div>

          {/* Visual Activity Proportion Bar */}
          {totalUsers > 0 && (
            <div className="adm-activity-progress-track">
              <div
                className="adm-activity-progress-fill fill-today"
                style={{ width: `${(activeTodayCount / totalUsers) * 100}%` }}
                title={`Bugun faol: ${activeTodayCount}`}
              />
              <div
                className="adm-activity-progress-fill fill-week"
                style={{ width: `${((active7d - activeTodayCount) / totalUsers) * 100}%` }}
                title={`7 kunda faol: ${active7d}`}
              />
              <div
                className="adm-activity-progress-fill fill-month"
                style={{ width: `${((active30d - active7d) / totalUsers) * 100}%` }}
                title={`30 kunda faol: ${active30d}`}
              />
              <div
                className="adm-activity-progress-fill fill-inactive"
                style={{ width: `${(inactiveCount / totalUsers) * 100}%` }}
                title={`Faolsiz: ${inactiveCount}`}
              />
            </div>
          )}
        </div>

        {/* Users table section */}
        <div className="adm-users-section">
          <div className="adm-users-toolbar">
            <div className="adm-search-wrap">
              <Search size={16} className="adm-search-icon" />
              <input
                className="adm-search"
                type="text"
                placeholder="Ism yoki email bo'yicha qidirish..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button className="adm-search-clear" onClick={() => setSearch('')}>
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="adm-sort-tabs">
              {[
                { key: 'lastSeen', label: 'Faollik' },
                { key: 'sessions', label: 'Sessiyalar' },
                { key: 'words', label: "So'zlar" },
                { key: 'created', label: "Ro'yxat" },
              ].map(s => (
                <button
                  key={s.key}
                  className={`adm-sort-tab ${sortBy === s.key ? 'active' : ''}`}
                  onClick={() => setSortBy(s.key)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="adm-users-header">
            <span>Foydalanuvchi</span>
            <span className="adm-col-stats">So'z / To'plam / Sessiya</span>
            <span className="adm-col-seen">Oxirgi faollik</span>
            <span />
          </div>

          {loading ? (
            <div className="adm-loading">
              <div className="adm-spinner" />
              <span>Ma'lumotlar yuklanmoqda...</span>
            </div>
          ) : error ? (
            <div className="adm-error">
              <span>⚠️ {error}</span>
              <button onClick={fetchData}>Qayta urinish</button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="adm-empty">
              <Users size={36} />
              <p>{search ? 'Hech narsa topilmadi' : 'Foydalanuvchilar yo\'q'}</p>
            </div>
          ) : (
            <div className="adm-users-list">
              {filtered.map((u, i) => (
                <UserRow
                  key={u.uid}
                  userData={u}
                  index={i}
                  onResetPassword={(targetUser) => {
                    setResetPasswordUser(targetUser);
                    setCustomPassword('');
                  }}
                />
              ))}
            </div>
          )}

          <div className="adm-users-footer">
            <span>{filtered.length} ta natija ko'rsatilmoqda</span>
            <span>Jami {totalUsers} foydalanuvchi</span>
          </div>
        </div>
      </main>

      {/* Password Reset Modal */}
      <AnimatePresence>
        {resetPasswordUser && (
          <div className="adm-modal-overlay" onClick={() => setResetPasswordUser(null)}>
            <motion.div
              className="adm-modal"
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="adm-modal-header">
                <div className="adm-modal-title">
                  <KeyRound size={20} className="adm-icon-accent" />
                  <span>Parolni Tiklash / Yangi Parol O'rnatish</span>
                </div>
                <button
                  type="button"
                  className="adm-modal-close"
                  onClick={() => setResetPasswordUser(null)}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="adm-modal-body">
                <div className="adm-user-info-box">
                  <div className="adm-user-avatar-sm">
                    {(resetPasswordUser.profile?.displayName || resetPasswordUser.profile?.email || '?')[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="adm-user-info-name">
                      {resetPasswordUser.profile?.displayName || 'Nomsiz foydalanuvchi'}
                    </div>
                    <div className="adm-user-info-email">
                      {resetPasswordUser.profile?.email || 'Email kiritilmagan'}
                    </div>
                  </div>
                </div>

                {/* Option 1: Direct Custom Password Setting */}
                <form onSubmit={handleSetCustomPassword} className="adm-pwd-form">
                  <label className="adm-pwd-label">
                    <Lock size={15} />
                    <span>Yangi Parol Belgilash (Email ochish shart emas):</span>
                  </label>
                  <div className="adm-pwd-hint">
                    Admin sifatida kiritgan yangi parolingiz saqlanadi. Foydalanuvchi darhol ushbu parol bilan tizimga kirishi mumkin.
                  </div>
                  <input
                    type="text"
                    className="adm-pwd-input"
                    placeholder="Masalan: 123456 yoki yangi parol..."
                    value={customPassword}
                    onChange={e => setCustomPassword(e.target.value)}
                    disabled={actionLoading}
                  />
                  <button
                    type="submit"
                    className="adm-pwd-submit-btn"
                    disabled={actionLoading || !customPassword.trim()}
                  >
                    {actionLoading ? 'Saqlanmoqda...' : 'Yangi Parolni Saqlash va Foydalanuvchiga Berish'}
                  </button>
                </form>

                <div className="adm-modal-divider">
                  <span>YOKI</span>
                </div>

                {/* Option 2: Send Reset Link via Email */}
                <button
                  type="button"
                  className="adm-pwd-email-btn"
                  onClick={handleSendResetEmail}
                  disabled={actionLoading || !resetPasswordUser.profile?.email}
                >
                  <Mail size={16} />
                  <span>Email ga parolni tiklash havolasini yuborish</span>
                </button>
              </div>

              <div className="adm-modal-footer">
                <button
                  type="button"
                  className="adm-modal-cancel-btn"
                  onClick={() => setResetPasswordUser(null)}
                >
                  Yopish
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
