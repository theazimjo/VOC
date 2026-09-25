import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Users } from 'lucide-react';
import { getAllPlatformUsers, getAllCenters } from '../../../services/corpService';
import { formatRelative } from './centerActivity';
import { EmptyState, LoadingRows, Page, Row, SearchField, Section, Segmented, Stat, StatusDot } from './ui';
import { useToast } from './useToast';
import { useIsDesktop } from './useIsDesktop';

const DAY = 24 * 60 * 60 * 1000;

const FILTERS = [
  { value: 'all', label: 'Hammasi' },
  { value: 'personal', label: 'Shaxsiy' },
  { value: 'group', label: 'Guruhda' },
  { value: 'staff', label: 'Xodimlar' },
];

const KIND_LABEL = {
  center_admin: 'Markaz admini',
  teacher: "O'qituvchi",
  group: "Guruh o'quvchisi",
  personal: 'Shaxsiy',
};

const KIND_TONE = { center_admin: 'blue', teacher: 'purple', group: 'green', personal: 'gray' };

function kindOf(u) {
  if (u.corpRole) return u.corpRole;
  if (u.memberships.length > 0) return 'group';
  return 'personal';
}

// How recently the account was used — the signal that matters most.
function recency(lastSeen, now = Date.now()) {
  const t = lastSeen ? Date.parse(lastSeen) : 0;
  if (!t) return { tone: 'gray', label: 'Kirmagan' };
  const diff = now - t;
  if (diff < DAY) return { tone: 'green', label: 'Bugun' };
  if (diff < 7 * DAY) return { tone: 'green', label: 'Shu hafta' };
  if (diff < 30 * DAY) return { tone: 'orange', label: 'Shu oy' };
  return { tone: 'gray', label: 'Nofaol' };
}

const displayName = (u) => u.name || u.email || 'Nomsiz foydalanuvchi';
const initialOf = (u) => displayName(u).charAt(0).toUpperCase();
const lastSeenText = (u) => (u.lastSeen ? formatRelative(Date.parse(u.lastSeen)) : '—');
const fmtDate = (iso) => (iso ? new Date(iso).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' }) : '—');

export default function SuperAdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [centerNames, setCenterNames] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [toastNode, showToast] = useToast();
  const isDesktop = useIsDesktop();

  useEffect(() => {
    Promise.all([getAllPlatformUsers(), getAllCenters().catch(() => [])])
      .then(([list, centers]) => {
        setUsers(list);
        setCenterNames(Object.fromEntries(centers.map((c) => [c.id, c.name || c.id])));
      })
      .catch((err) => {
        console.error('Error loading users:', err);
        showToast("Foydalanuvchilarni yuklab bo'lmadi", 'error');
      })
      .finally(() => setLoading(false));
  }, [showToast]);

  const totals = useMemo(() => {
    const now = Date.now();
    const within = (iso, ms) => iso && now - Date.parse(iso) < ms;
    return {
      all: users.length,
      today: users.filter((u) => within(u.lastSeen, DAY)).length,
      week: users.filter((u) => within(u.lastSeen, 7 * DAY)).length,
      newMonth: users.filter((u) => within(u.createdAt, 30 * DAY)).length,
    };
  }, [users]);

  const placeById = useMemo(() => {
    const out = {};
    users.forEach((u) => {
      if (u.corpRole) {
        out[u.uid] = u.corpCenterName || '';
        return;
      }
      if (u.memberships.length === 0) {
        out[u.uid] = '';
        return;
      }
      const m = u.activeMembership || u.memberships[0];
      const extra = u.memberships.length > 1 ? ` +${u.memberships.length - 1}` : '';
      out[u.uid] = [centerNames[m.centerId], m.groupName].filter(Boolean).join(' · ') + extra;
    });
    return out;
  }, [users, centerNames]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users
      .filter((u) => {
        const k = kindOf(u);
        if (filter === 'staff') return k === 'center_admin' || k === 'teacher';
        if (filter === 'group') return k === 'group';
        if (filter === 'personal') return k === 'personal';
        return true;
      })
      .filter((u) => !q
        || displayName(u).toLowerCase().includes(q)
        || (u.email || '').toLowerCase().includes(q)
        || (placeById[u.uid] || '').toLowerCase().includes(q))
      .sort((a, b) => (Date.parse(b.lastSeen || '') || 0) - (Date.parse(a.lastSeen || '') || 0));
  }, [users, search, filter, placeById]);

  return (
    <Page title="Foydalanuvchilar" subtitle="Platformadagi barcha hisoblar — shaxsiy, guruhdagi o'quvchilar va markaz xodimlari.">
      <div className="sa-stats">
        <Stat value={loading ? '–' : totals.all} label="Jami" />
        <Stat value={loading ? '–' : totals.today} label="Bugun faol" tone="green" />
        <Stat value={loading ? '–' : totals.week} label="7 kunda faol" tone="green" />
        <Stat value={loading ? '–' : totals.newMonth} label="30 kunda yangi" tone="blue" />
      </div>

      <div className={`sa-toolbar ${isDesktop ? 'is-inline' : ''}`}>
        <SearchField value={search} onChange={setSearch} placeholder="Ism, email yoki markaz" />
        <Segmented label="Turi" options={FILTERS} value={filter} onChange={setFilter} />
      </div>

      {loading ? (
        <LoadingRows count={8} />
      ) : visible.length === 0 ? (
        <div className="sa-group">
          <EmptyState icon={<Users size={40} />} title="Hech kim topilmadi" text="Qidiruv yoki filtrni o'zgartirib ko'ring." />
        </div>
      ) : isDesktop ? (
        <div className="sa-table" style={{ '--sa-cols': 'minmax(240px, 2fr) 150px minmax(180px, 1.5fr) 90px 150px 130px 20px' }}>
          <div className="sa-table-head">
            <span>Foydalanuvchi</span>
            <span>Turi</span>
            <span>Markaz / guruh</span>
            <span className="num">So'zlar</span>
            <span>Oxirgi kirish</span>
            <span>Holat</span>
            <span />
          </div>
          {visible.map((u) => {
            const k = kindOf(u);
            const r = recency(u.lastSeen);
            return (
              <button type="button" key={u.uid} className="sa-table-row" onClick={() => navigate(`/corp/super-admin/users/${u.uid}`)}>
                <span className="sa-cell-main">
                  <span className={`sa-row-icon tone-${u.disabled ? 'gray' : KIND_TONE[k]}`}>{initialOf(u)}</span>
                  <span className="sa-cell-text">
                    <span className="sa-cell-title">{displayName(u)}</span>
                    {u.email && u.email !== displayName(u) && <span className="sa-cell-sub">{u.email}</span>}
                  </span>
                </span>
                <span className="muted">{KIND_LABEL[k]}</span>
                <span className="muted sa-cell-sub" style={{ fontSize: 15 }}>{placeById[u.uid] || '—'}</span>
                <span className="num">{u.wordCount}</span>
                <span className="muted">{lastSeenText(u)}</span>
                <span className="sa-cell-status">
                  <StatusDot tone={u.disabled ? 'red' : r.tone} />
                  {u.disabled ? 'Bloklangan' : r.label}
                </span>
                <ChevronRight size={17} className="sa-cell-chevron" />
              </button>
            );
          })}
        </div>
      ) : (
        <div className="sa-group">
          {visible.map((u) => {
            const k = kindOf(u);
            return (
              <Row
                key={u.uid}
                icon={initialOf(u)}
                iconTone={u.disabled ? 'gray' : KIND_TONE[k]}
                title={displayName(u)}
                subtitle={[KIND_LABEL[k], placeById[u.uid]].filter(Boolean).join(' · ')}
                accessory={<StatusDot tone={u.disabled ? 'red' : recency(u.lastSeen).tone} />}
                onClick={() => navigate(`/corp/super-admin/users/${u.uid}`)}
              />
            );
          })}
        </div>
      )}

      {toastNode}
    </Page>
  );
}
