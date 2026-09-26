import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Layers, Users } from 'lucide-react';
import { formatRelative } from '../super-admin/centerActivity';
import { EmptyState, LoadingRows, Page, Row, SearchField, Segmented, StatusDot } from '../super-admin/ui';
import { useIsDesktop } from '../super-admin/useIsDesktop';
import { useCenterData } from './CenterDataContext';

const DAY = 24 * 60 * 60 * 1000;
const FILTERS = [
  { value: 'active', label: 'Faol' },
  { value: 'quiet', label: 'Sust' },
  { value: 'archived', label: 'Arxiv' },
];

function activityTone(ts) {
  if (!ts) return 'gray';
  return Date.now() - ts <= 7 * DAY ? 'green' : 'orange';
}

// Groups are opened and run by teachers; the admin watches them here.
export default function AdminGroups() {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const { loading, groups, teacherById } = useCenterData();
  const [filter, setFilter] = useState('active');
  const [search, setSearch] = useState('');

  const q = search.trim().toLowerCase();
  const visible = useMemo(() => {
    const now = Date.now();
    return groups
      .filter((g) => {
        if (filter === 'archived') return g.status === 'archived';
        if (g.status === 'archived') return false;
        if (filter === 'quiet') return !g.activity.lastActivity || now - g.activity.lastActivity > 7 * DAY;
        return true;
      })
      .filter((g) => !q || [g.name, teacherById[g.teacherId]?.name].some((v) => (v || '').toLowerCase().includes(q)))
      .sort((a, b) => (b.activity.lastActivity || 0) - (a.activity.lastActivity || 0));
  }, [groups, filter, q, teacherById]);

  const open = (g) => navigate(`/corp/admin/groups/${g.id}`);
  const teacherName = (g) => teacherById[g.teacherId]?.name || "O'qituvchisiz";

  return (
    <Page icon={<Layers />}
      title="Guruhlar" subtitle={loading ? ' ' : `${groups.filter((g) => g.status !== 'archived').length} ta faol guruh`}>
      <div className={`sa-toolbar ${isDesktop ? 'is-inline' : ''}`}>
        <SearchField value={search} onChange={setSearch} placeholder="Guruh yoki o'qituvchi" />
        <Segmented label="Guruh holati" options={FILTERS} value={filter} onChange={setFilter} />
      </div>

      {loading ? (
        <LoadingRows count={5} />
      ) : visible.length === 0 ? (
        <div className="sa-group">
          {groups.length === 0 ? (
            <EmptyState icon={<Users size={40} />} title="Hali guruh yo'q" text="O'qituvchilar o'z panelida guruh ochadi va o'quvchilarni QR orqali qo'shadi." />
          ) : (
            <EmptyState title="Bu yerda guruh yo'q" text={filter === 'quiet' ? "Barcha guruhlar shu hafta mashq qilgan." : "Qidiruv yoki filtrni o'zgartirib ko'ring."} />
          )}
        </div>
      ) : isDesktop ? (
        <div className="sa-table" style={{ '--sa-cols': 'minmax(220px, 2fr) minmax(160px, 1.2fr) 100px 120px 90px minmax(140px, 1fr) 20px' }}>
          <div className="sa-table-head">
            <span>Guruh</span>
            <span>O'qituvchi</span>
            <span className="num">O'quvchi</span>
            <span className="num">Bu hafta faol</span>
            <span className="num">Vazifa</span>
            <span>Oxirgi faollik</span>
            <span />
          </div>
          {visible.map((g) => (
            <button type="button" key={g.id} className="sa-table-row" onClick={() => open(g)}>
              <span className="sa-cell-main">
                <span className={`sa-row-icon tone-${g.status === 'archived' ? 'gray' : 'green'}`}><Users size={16} /></span>
                <span className="sa-cell-text">
                  <span className="sa-cell-title">{g.name || 'Guruh'}</span>
                  <span className="sa-cell-sub">{g.level || '—'}</span>
                </span>
              </span>
              <span className="muted">{teacherName(g)}</span>
              <span className="num">{g.activity.students}</span>
              <span className="num">{g.activity.students ? `${g.activity.activeWeek} / ${g.activity.students}` : '—'}</span>
              <span className="num">{g.activity.homework}</span>
              <span className="sa-cell-status">
                <StatusDot tone={activityTone(g.activity.lastActivity)} />
                {formatRelative(g.activity.lastActivity)}
              </span>
              <ChevronRight size={17} className="sa-cell-chevron" />
            </button>
          ))}
        </div>
      ) : (
        <div className="sa-group">
          {visible.map((g) => (
            <Row
              key={g.id}
              icon={<Users size={16} />}
              iconTone={g.status === 'archived' ? 'gray' : 'green'}
              title={g.name || 'Guruh'}
              subtitle={`${teacherName(g)} · ${g.activity.students} o'quvchi · ${formatRelative(g.activity.lastActivity)}`}
              onClick={() => open(g)}
            />
          ))}
        </div>
      )}
    </Page>
  );
}
