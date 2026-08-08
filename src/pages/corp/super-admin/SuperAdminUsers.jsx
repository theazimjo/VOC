import { useState, useEffect, useMemo } from 'react';
import { Users, Search, KeyRound, Ban, CheckCircle2, Trash2, ShieldCheck, GraduationCap } from 'lucide-react';
import { getAllCorpUsers, setCorpUserDisabled, deleteCorpUser, sendCorpPasswordReset } from '../../../services/corpService';
import './shared.css';

const ROLE_LABELS = { center_admin: 'Markaz Admin', teacher: "O'qituvchi" };

export default function SuperAdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all'); // all, center_admin, teacher
  const [busyUid, setBusyUid] = useState(null);

  const loadUsers = async () => {
    setLoading(true);
    try {
      setUsers(await getAllCorpUsers());
    } catch (err) {
      console.error('Error loading corp users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    let result = users.filter(u =>
      (u.email || '').toLowerCase().includes(search.toLowerCase()) ||
      (u.teacherName || u.centerName || '').toLowerCase().includes(search.toLowerCase())
    );
    if (roleFilter !== 'all') result = result.filter(u => u.role === roleFilter);
    return result;
  }, [users, search, roleFilter]);

  const handleToggleDisabled = async (u) => {
    setBusyUid(u.uid);
    try {
      await setCorpUserDisabled(u.uid, !u.disabled);
      setUsers(prev => prev.map(x => x.uid === u.uid ? { ...x, disabled: !u.disabled } : x));
    } catch (err) {
      alert('Xatolik: ' + err.message);
    } finally {
      setBusyUid(null);
    }
  };

  const handleResetPassword = async (u) => {
    setBusyUid(u.uid);
    try {
      await sendCorpPasswordReset(u.email);
      alert(`Parolni tiklash havolasi ${u.email} manziliga yuborildi.`);
    } catch (err) {
      alert('Xatolik: ' + err.message);
    } finally {
      setBusyUid(null);
    }
  };

  const handleDelete = async (u) => {
    if (!confirm(`${u.email} akkauntining portalga kirish huquqini butunlay olib tashlamoqchimisiz?`)) return;
    setBusyUid(u.uid);
    try {
      await deleteCorpUser(u.uid);
      setUsers(prev => prev.filter(x => x.uid !== u.uid));
    } catch (err) {
      alert('Xatolik: ' + err.message);
    } finally {
      setBusyUid(null);
    }
  };

  return (
    <div className="super-admin-container">
      <header className="super-admin-header">
        <div className="super-admin-badge"><Users size={16} /> Foydalanuvchilar</div>
        <h1>Barcha Korporativ Foydalanuvchilar</h1>
        <p>Barcha markazlardagi admin va o'qituvchi akkauntlarini boshqarish.</p>

        <div className="super-admin-actions">
          <div className="search-bar-wrap">
            <Search size={18} />
            <input
              type="text"
              placeholder="Email yoki ism bo'yicha qidiruv..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="centers-toolbar">
        <div className="centers-filter-group">
          <span className="centers-filter-label">Rol:</span>
          <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="pack-sort-select">
            <option value="all">Barchasi</option>
            <option value="center_admin">Markaz Adminlari</option>
            <option value="teacher">O'qituvchilar</option>
          </select>
          <span className="centers-found-count">Topildi: {filteredUsers.length}</span>
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner">Yuklanmoqda...</div>
      ) : filteredUsers.length === 0 ? (
        <div className="empty-state">
          <Users size={48} />
          <p>Foydalanuvchilar topilmadi.</p>
        </div>
      ) : (
        <div className="centers-table-card">
          <table className="teachers-table">
            <thead>
              <tr>
                <th>FOYDALANUVCHI</th>
                <th>ROL</th>
                <th>MARKAZ</th>
                <th>STATUS</th>
                <th style={{ width: '150px' }}>AMALLAR</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.uid}>
                  <td>
                    <div className="cell-teacher-info">
                      <div className="t-table-avatar">
                        {u.role === 'center_admin' ? <ShieldCheck size={16} /> : <GraduationCap size={16} />}
                      </div>
                      <div>
                        <div className="t-table-name">{u.teacherName || u.centerName || u.email}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{ROLE_LABELS[u.role] || u.role}</td>
                  <td style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{u.centerName || '—'}</td>
                  <td>
                    <span className={`center-status-badge ${u.disabled ? 'status-suspended' : ''}`}>
                      {u.disabled ? 'bloklangan' : 'faol'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button
                        className="c-icon-btn"
                        title="Parolni tiklash"
                        disabled={busyUid === u.uid}
                        onClick={() => handleResetPassword(u)}
                      >
                        <KeyRound size={15} />
                      </button>
                      <button
                        className="c-icon-btn"
                        title={u.disabled ? 'Faollashtirish' : 'Bloklash'}
                        disabled={busyUid === u.uid}
                        onClick={() => handleToggleDisabled(u)}
                      >
                        {u.disabled ? <CheckCircle2 size={15} /> : <Ban size={15} />}
                      </button>
                      <button
                        className="c-icon-btn c-icon-btn-danger"
                        title="O'chirish"
                        disabled={busyUid === u.uid}
                        onClick={() => handleDelete(u)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
