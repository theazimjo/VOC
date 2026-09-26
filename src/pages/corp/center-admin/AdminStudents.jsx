import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, GraduationCap } from 'lucide-react';
import { formatRelative, latestUnitActivity, studentMastery } from '../super-admin/centerActivity';
import { EmptyState, LoadingRows, Page, Row, SearchField, Segmented, StatusDot } from '../super-admin/ui';
import { useIsDesktop } from '../super-admin/useIsDesktop';
import { useCenterData } from './CenterDataContext';

const DAY = 24 * 60 * 60 * 1000;
const FILTERS = [
  { value: 'all', label: 'Hammasi' },
  { value: 'active', label: 'Bu hafta faol' },
  { value: 'quiet', label: 'Sust' },
];

function activityTone(ts) {
  if (!ts) return 'gray';
  return Date.now() - ts <= 7 * DAY ? 'green' : 'orange';
}

// Every student in every active group. Students join by QR / group code,
// so there's nothing to add here — this page is for spotting who stopped
// practicing.
export default function AdminStudents() {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const { loading, students } = useCenterData();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const rows = useMemo(
    () => students.map((st) => ({ ...st, last: latestUnitActivity(st) || null, mastery: studentMastery(st) })),
    [students],
  );

  const q = search.trim().toLowerCase();
  const visible = useMemo(() => {
    const now = Date.now();
    return rows
      .filter((st) => {
        const recent = st.last && now - st.last <= 7 * DAY;
        if (filter === 'active') return recent;
        if (filter === 'quiet') return !recent;
        return true;
      })
      .filter((st) => !q || [st.name, st.email, st.groupName, st.teacherName].some((v) => (v || '').toLowerCase().includes(q)))
      .sort((a, b) => (filter === 'quiet' ? (a.last || 0) - (b.last || 0) : (b.last || 0) - (a.last || 0)));
  }, [rows, filter, q]);

  const uniqueCount = new Set(rows.map((st) => st.uid)).size;
  const openGroup = (st) => navigate(`/corp/admin/groups/${st.groupId}`);

  return (
    <Page title="O'quvchilar" subtitle={loading ? ' ' : `${uniqueCount} ta o'quvchi`}>
      <div className={`sa-toolbar ${isDesktop ? 'is-inline' : ''}`}>
        <SearchField value={search} onChange={setSearch} placeholder="Ism, guruh yoki o'qituvchi" />
        <Segmented label="O'quvchi faolligi" options={FILTERS} value={filter} onChange={setFilter} />
      </div>

      {loading ? (
        <LoadingRows count={6} />
      ) : visible.length === 0 ? (
        <div className="sa-group">
          {rows.length === 0 ? (
            <EmptyState
              icon={<GraduationCap size={40} />}
              title="Hali o'quvchi yo'q"
              text="O'quvchilar o'qituvchi bergan QR yoki guruh kodi orqali qo'shiladi."
            />
          ) : (
            <EmptyState title="Hech kim topilmadi" text="Qidiruv yoki filtrni o'zgartirib ko'ring." />
          )}
        </div>
      ) : isDesktop ? (
        <div className="sa-table" style={{ '--sa-cols': 'minmax(220px, 2fr) minmax(150px, 1.2fr) minmax(150px, 1.2fr) 120px minmax(140px, 1fr) 20px' }}>
          <div className="sa-table-head">
            <span>O'quvchi</span>
            <span>Guruh</span>
            <span>O'qituvchi</span>
            <span className="num">O'zlashtirish</span>
            <span>Oxirgi mashq</span>
            <span />
          </div>
          {visible.map((st) => (
            <button type="button" key={`${st.groupId}_${st.uid}`} className="sa-table-row" onClick={() => openGroup(st)}>
              <span className="sa-cell-main">
                <span className="sa-row-icon tone-green">{(st.name || '?').charAt(0).toUpperCase()}</span>
                <span className="sa-cell-text">
                  <span className="sa-cell-title">{st.name || "O'quvchi"}</span>
                  <span className="sa-cell-sub">{st.email || '—'}</span>
                </span>
              </span>
              <span className="muted">{st.groupName || '—'}</span>
              <span className="muted">{st.teacherName}</span>
              <span className="num">{st.mastery == null ? '—' : `${st.mastery}%`}</span>
              <span className="sa-cell-status">
                <StatusDot tone={activityTone(st.last)} />
                {st.last ? formatRelative(st.last) : 'Mashq qilmagan'}
              </span>
              <ChevronRight size={17} className="sa-cell-chevron" />
            </button>
          ))}
        </div>
      ) : (
        <div className="sa-group">
          {visible.map((st) => (
            <Row
              key={`${st.groupId}_${st.uid}`}
              icon={(st.name || '?').charAt(0).toUpperCase()}
              iconTone="green"
              title={st.name || "O'quvchi"}
              subtitle={[st.groupName, st.mastery == null ? null : `${st.mastery}%`, st.last ? formatRelative(st.last) : 'mashq qilmagan'].filter(Boolean).join(' · ')}
              accessory={<StatusDot tone={activityTone(st.last)} />}
              onClick={() => openGroup(st)}
            />
          ))}
        </div>
      )}
    </Page>
  );
}
