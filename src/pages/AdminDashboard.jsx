/**
 * 🛡️ AdminDashboard — faqat azimjonxolmirzayev30@gmail.com uchun
 * Route: /admin
 */

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import {
  Users, Activity, BookOpen, Clock, TrendingUp,
  ArrowLeft, RefreshCw, Shield, Zap, Award,
  ChevronDown, ChevronUp, Search, AlertTriangle
} from 'lucide-react';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import './AdminDashboard.css';

const ADMIN_EMAIL = 'azimjonxolmirzayev30@gmail.com';

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

function StatCard({ icon, value, label, color, sub }) {
  return (
    <motion.div
      className="adm-stat-card"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className={`adm-stat-icon adm-color-${color}`}>{icon}</div>
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

function UserRow({ userData, index }) {
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
  // Lifetime creations far above what currently exists means a lot of
  // create+delete cycling — worth a second look, not proof of abuse.
  const packChurn = packsCreatedTotal - packCount;
  const folderChurn = foldersCreatedTotal - folderCount;
  const looksSuspicious = packChurn > 30 || folderChurn > 30;

  return (
    <motion.div
      className="adm-user-row"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
    >
      <div className="adm-user-main" onClick={() => setExpanded(e => !e)}>
        {/* Avatar */}
        <div className="adm-user-avatar">
          {profile?.photoURL ? (
            <img src={profile.photoURL} alt="" />
          ) : (
            <span>{(profile?.displayName || profile?.email || '?')[0].toUpperCase()}</span>
          )}
          <div className={`adm-activity-dot ${activityClass}`} />
        </div>

        {/* Identity */}
        <div className="adm-user-identity">
          <div className="adm-user-name">
            {profile?.displayName || 'Nomsiz'}
            {looksSuspicious && (
              <AlertTriangle size={13} className="adm-suspicious-flag" title="Ko'p create+delete tsikli — tekshirib ko'ring" />
            )}
          </div>
          <div className="adm-user-email">{profile?.email || '—'}</div>
        </div>

        {/* Quick stats */}
        <div className="adm-user-quick">
          <div className="adm-quick-item" title="So'zlar">
            <BookOpen size={13} />
            <span>{wordCount}</span>
          </div>
          <div className="adm-quick-item" title="To'plamlar">
            <Award size={13} />
            <span>{packCount}</span>
          </div>
          <div className="adm-quick-item" title="Sessiyalar">
            <Zap size={13} />
            <span>{sessionCount}</span>
          </div>
          {streak > 0 && (
            <div className="adm-quick-item streak" title="Streak">
              🔥 <span>{streak}</span>
            </div>
          )}
        </div>

        {/* Last seen */}
        <div className={`adm-last-seen ${activityClass}`}>{timeAgo(lastSeen)}</div>

        {/* Expand */}
        <div className="adm-expand-btn">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <motion.div
          className="adm-user-detail"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="adm-detail-grid">
            <div className="adm-detail-item">
              <div className="adm-detail-label">Ro'yxatdan o'tgan</div>
              <div className="adm-detail-value">{formatDate(profile?.createdAt)}</div>
            </div>
            <div className="adm-detail-item">
              <div className="adm-detail-label">Oxirgi ko'rilgan</div>
              <div className="adm-detail-value">{formatDate(lastSeen)}</div>
            </div>
            <div className="adm-detail-item">
              <div className="adm-detail-label">Jami sessiyalar</div>
              <div className="adm-detail-value">{sessionCount} marta</div>
            </div>
            <div className="adm-detail-item">
              <div className="adm-detail-label">To'plamlar</div>
              <div className="adm-detail-value">{packCount} ta</div>
            </div>
            <div className="adm-detail-item">
              <div className="adm-detail-label">Jami so'zlar</div>
              <div className="adm-detail-value">{wordCount} ta</div>
            </div>
            <div className="adm-detail-item">
              <div className="adm-detail-label">Streak</div>
              <div className="adm-detail-value">{streak} kun 🔥</div>
            </div>
            <div className={`adm-detail-item ${packChurn > 30 ? 'adm-detail-item--warn' : ''}`}>
              <div className="adm-detail-label">Umrbod yaratilgan to'plamlar</div>
              <div className="adm-detail-value">{packsCreatedTotal} ta (hozir {packCount} ta bor)</div>
            </div>
            <div className={`adm-detail-item ${folderChurn > 30 ? 'adm-detail-item--warn' : ''}`}>
              <div className="adm-detail-label">Umrbod yaratilgan papkalar</div>
              <div className="adm-detail-value">{foldersCreatedTotal} ta (hozir {folderCount} ta bor)</div>
            </div>
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

  // Guard: only admin
  useEffect(() => {
    if (!user) return;
    if (user.email !== ADMIN_EMAIL) {
      navigate('/');
    }
  }, [user, navigate]);

  const fetchData = useCallback(async () => {
    if (!user || user.email !== ADMIN_EMAIL) return;
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

  if (!user || user.email !== ADMIN_EMAIL) return null;

  // ── Compute global stats ─────────────────────────────────────

  const totalUsers = users.length;
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
      {/* Header */}
      <div className="adm-header">
        <div className="adm-header-left">
          <button className="adm-back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={20} />
          </button>
          <div className="adm-title-group">
            <div className="adm-title">
              <Shield size={20} />
              Admin Panel
            </div>
            <div className="adm-subtitle">VOC — Foydalanuvchilar boshqaruvi</div>
          </div>
        </div>
        <div className="adm-header-right">
          {lastRefresh && (
            <div className="adm-refresh-time">
              <Clock size={13} />
              {lastRefresh.toLocaleTimeString('uz-UZ')}
            </div>
          )}
          <button
            className={`adm-refresh-btn ${loading ? 'spinning' : ''}`}
            onClick={fetchData}
            disabled={loading}
          >
            <RefreshCw size={16} />
            Yangilash
          </button>
        </div>
      </div>

      <div className="adm-content">

        {/* Global stats */}
        <div className="adm-stats-grid">
          <StatCard
            icon={<Users size={22} />}
            value={totalUsers}
            label="Jami foydalanuvchilar"
            color="blue"
            sub={`${active7d} ta oxirgi 7 kunda faol`}
          />
          <StatCard
            icon={<Activity size={22} />}
            value={active7d}
            label="Haftalik faollar"
            color="green"
            sub={`${active30d} ta oylik faol`}
          />
          <StatCard
            icon={<Zap size={22} />}
            value={totalSessions}
            label="Jami sessiyalar"
            color="purple"
            sub={`O'rtacha ${avgSessions} ta/foydalanuvchi`}
          />
          <StatCard
            icon={<BookOpen size={22} />}
            value={totalWords}
            label="Jami so'zlar"
            color="orange"
            sub={`${totalPacks} ta to'plam`}
          />
        </div>

        {/* Activity breakdown */}
        <div className="adm-activity-bar">
          <div className="adm-activity-title">
            <TrendingUp size={16} />
            Faollik holati
          </div>
          <div className="adm-activity-items">
            <div className="adm-activity-item">
              <div className="adm-dot active-today" />
              <span>Bugun faol: <strong>{users.filter(u => isActiveInDays(u.activity?.lastSeen, 1)).length}</strong></span>
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
              <span>Faolsiz: <strong>{totalUsers - active30d}</strong></span>
            </div>
          </div>
        </div>

        {/* Users table */}
        <div className="adm-users-section">
          <div className="adm-users-toolbar">
            <div className="adm-search-wrap">
              <Search size={15} className="adm-search-icon" />
              <input
                className="adm-search"
                type="text"
                placeholder="Ism yoki email bo'yicha qidirish..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
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
                <UserRow key={u.uid} userData={u} index={i} />
              ))}
            </div>
          )}

          <div className="adm-users-footer">
            {filtered.length} ta natija · Jami {totalUsers} foydalanuvchi
          </div>
        </div>

      </div>
    </div>
  );
}
