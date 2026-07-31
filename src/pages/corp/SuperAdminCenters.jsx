import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Building2, Plus, ShieldCheck, CheckCircle2, Search,
  Pencil, Trash2, KeyRound, PauseCircle, PlayCircle, Eye,
  Download, LayoutGrid, Table as TableIcon
} from 'lucide-react';
import {
  getAllCenters, createCenter, createCenterAdminAccount, updateCenter,
  setCenterStatus, deleteCenter, sendCorpPasswordReset, getCenterStats
} from '../../services/corpService';
import CredentialsModal from '../../components/corp/CredentialsModal';
import CenterDetailModal from '../../components/corp/CenterDetailModal';
import './SuperAdminDashboard.css';

const EMPTY_FORM = { name: '', adminEmail: '', phone: '' };

export default function SuperAdminCenters() {
  const [centers, setCenters] = useState([]);
  const [statsById, setStatsById] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all, active, suspended
  const [viewMode, setViewMode] = useState('grid'); // grid, table

  const [showModal, setShowModal] = useState(false);
  const [editingCenter, setEditingCenter] = useState(null); // center object or null (create mode)
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  const [credentials, setCredentials] = useState(null);
  const [detailCenter, setDetailCenter] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const loadCenters = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllCenters();
      setCenters(data);

      const statsEntries = await Promise.all(
        data.map(async (c) => {
          try {
            const s = await getCenterStats(c.id);
            return [c.id, s];
          } catch {
            return [c.id, null];
          }
        })
      );
      setStatsById(Object.fromEntries(statsEntries));
    } catch (err) {
      console.error('Error loading centers:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCenters();
  }, [loadCenters]);

  const openCreateModal = () => {
    setEditingCenter(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEditModal = (center) => {
    setEditingCenter(center);
    setForm({ name: center.name, adminEmail: center.adminEmail, phone: center.phone || '' });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSubmitting(true);
    try {
      if (editingCenter) {
        await updateCenter(editingCenter.id, { name: form.name.trim(), phone: form.phone.trim() });
        setShowModal(false);
        await loadCenters();
      } else {
        if (!form.adminEmail.trim()) return;
        const newCenter = await createCenter(form);
        setShowModal(false);
        const { tempPassword } = await createCenterAdminAccount(newCenter);
        setCredentials({ email: newCenter.adminEmail, tempPassword });
        await loadCenters();
      }
      setForm(EMPTY_FORM);
    } catch (err) {
      alert('Xatolik yuz berdi: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (center) => {
    const nextStatus = center.status === 'suspended' ? 'active' : 'suspended';
    setBusyId(center.id);
    try {
      await setCenterStatus(center.id, nextStatus);
      setCenters(prev => prev.map(c => c.id === center.id ? { ...c, status: nextStatus } : c));
    } catch (err) {
      alert('Holatni o\'zgartirishda xatolik: ' + err.message);
    } finally {
      setBusyId(null);
    }
  };

  const handleResetPassword = async (center) => {
    if (!center.adminEmail) return;
    setBusyId(center.id);
    try {
      await sendCorpPasswordReset(center.adminEmail);
      alert(`Parolni tiklash havolasi ${center.adminEmail} manziliga yuborildi.`);
    } catch (err) {
      alert('Xatolik yuz berdi: ' + err.message);
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (center) => {
    if (!window.confirm(`"${center.name}" markazini butunlay o'chirmoqchimisiz? Bu amalni orqaga qaytarib bo'lmaydi — barcha o'qituvchilar, guruhlar va packlar o'chib ketadi.`)) {
      return;
    }
    setBusyId(center.id);
    try {
      await deleteCenter(center.id);
      setCenters(prev => prev.filter(c => c.id !== center.id));
    } catch (err) {
      alert('O\'chirishda xatolik: ' + err.message);
    } finally {
      setBusyId(null);
    }
  };

  const filteredCenters = useMemo(() => {
    let result = centers.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.adminEmail || '').toLowerCase().includes(search.toLowerCase())
    );
    if (statusFilter === 'active') result = result.filter(c => c.status !== 'suspended');
    if (statusFilter === 'suspended') result = result.filter(c => c.status === 'suspended');
    return result;
  }, [centers, search, statusFilter]);

  const handleExportCSV = () => {
    const headers = ['Nomi', 'Admin Email', 'Telefon', 'Status', 'Yaratilgan', 'O\'qituvchilar', 'Guruhlar', 'O\'quvchilar'];
    const rows = filteredCenters.map(c => {
      const s = statsById[c.id];
      return [
        c.name, c.adminEmail || '', c.phone || '', c.status === 'suspended' ? 'to\'xtatilgan' : 'faol',
        c.createdAt ? new Date(c.createdAt).toLocaleDateString('uz-UZ') : '',
        s?.teachersCount ?? '', s?.groupsCount ?? '', s?.studentsCount ?? ''
      ];
    });
    const csv = [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'markazlar.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="super-admin-container">
      {/* Header Banner */}
      <header className="super-admin-header">
        <div className="super-admin-badge">
          <ShieldCheck size={16} /> Super Admin Panel
        </div>
        <h1>Platforma O'quv Markazlari Boshqaruvi</h1>
        <p>Barcha hamkor o'quv markazlarini ro'yxatga olish va ularning faolligini nazorat qilish.</p>

        <div className="super-admin-actions">
          <div className="search-bar-wrap">
            <Search size={18} />
            <input
              type="text"
              placeholder="Markaz nomi yoki email bo'yicha qidiruv..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="btn-create-center" onClick={openCreateModal}>
            <Plus size={18} /> Yangi Markaz Qo'shish
          </button>
        </div>
      </header>

      {/* Filters + view toggle + export */}
      <div className="centers-toolbar">
        <div className="centers-filter-group">
          <span className="centers-filter-label">Filter:</span>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="pack-sort-select">
            <option value="all">Barcha Statuslar</option>
            <option value="active">Faol</option>
            <option value="suspended">To'xtatilgan</option>
          </select>
          <span className="centers-found-count">Topildi: {filteredCenters.length}</span>
        </div>

        <div className="centers-toolbar-actions">
          <div className="view-toggle-group">
            <button className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')} title="Grid">
              <LayoutGrid size={16} />
            </button>
            <button className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')} title="Jadval">
              <TableIcon size={16} />
            </button>
          </div>
          <button className="btn-export" onClick={handleExportCSV}>
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Center List */}
      {loading ? (
        <div className="loading-spinner">Markazlar yuklanmoqda...</div>
      ) : filteredCenters.length === 0 ? (
        <div className="empty-state">
          <Building2 size={48} />
          <p>Hozircha o'quv markazlari yo'q.</p>
          <button className="btn-create-center" onClick={openCreateModal}>
            <Plus size={16} /> Birinchi Markazni Qo'shish
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="centers-grid">
          {filteredCenters.map((center) => {
            const stats = statsById[center.id];
            const suspended = center.status === 'suspended';
            return (
              <div key={center.id} className={`center-card ${suspended ? 'is-suspended' : ''}`}>
                <div className="center-card-head">
                  <div className="center-avatar">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h3>{center.name}</h3>
                    <span className={`center-status-badge ${suspended ? 'status-suspended' : ''}`}>
                      <CheckCircle2 size={12} /> {suspended ? 'to\'xtatilgan' : 'faol'}
                    </span>
                  </div>
                </div>

                <div className="center-card-info">
                  <p><strong>Admin Email:</strong> {center.adminEmail || 'Kiritilmagan'}</p>
                  <p><strong>Telefon:</strong> {center.phone || 'Kiritilmagan'}</p>
                  {stats && (
                    <p><strong>Statistika:</strong> {stats.teachersCount} o'qituvchi • {stats.groupsCount} guruh • {stats.studentsCount} o'quvchi</p>
                  )}
                </div>

                <div className="center-card-actions">
                  <button className="c-icon-btn" title="Batafsil" onClick={() => setDetailCenter(center)}>
                    <Eye size={16} />
                  </button>
                  <button className="c-icon-btn" title="Tahrirlash" onClick={() => openEditModal(center)}>
                    <Pencil size={16} />
                  </button>
                  <button
                    className="c-icon-btn"
                    title={suspended ? 'Faollashtirish' : 'To\'xtatish'}
                    disabled={busyId === center.id}
                    onClick={() => handleToggleStatus(center)}
                  >
                    {suspended ? <PlayCircle size={16} /> : <PauseCircle size={16} />}
                  </button>
                  <button
                    className="c-icon-btn"
                    title="Parolni tiklash havolasini yuborish"
                    disabled={busyId === center.id}
                    onClick={() => handleResetPassword(center)}
                  >
                    <KeyRound size={16} />
                  </button>
                  <button
                    className="c-icon-btn c-icon-btn-danger"
                    title="O'chirish"
                    disabled={busyId === center.id}
                    onClick={() => handleDelete(center)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="centers-table-card">
          <table className="teachers-table">
            <thead>
              <tr>
                <th>MARKAZ</th>
                <th>ADMIN</th>
                <th>STATUS</th>
                <th>STATISTIKA</th>
                <th>YARATILGAN</th>
                <th style={{ width: '160px' }}>AMALLAR</th>
              </tr>
            </thead>
            <tbody>
              {filteredCenters.map((center) => {
                const stats = statsById[center.id];
                const suspended = center.status === 'suspended';
                return (
                  <tr key={center.id}>
                    <td>
                      <div className="cell-teacher-info">
                        <div className="t-table-avatar"><Building2 size={16} /></div>
                        <span className="t-table-name">{center.name}</span>
                      </div>
                    </td>
                    <td style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{center.adminEmail || '—'}</td>
                    <td>
                      <span className={`center-status-badge ${suspended ? 'status-suspended' : ''}`}>
                        {suspended ? 'to\'xtatilgan' : 'faol'}
                      </span>
                    </td>
                    <td style={{ color: '#94a3b8', fontSize: '0.82rem' }}>
                      {stats ? `${stats.teachersCount} o'q. • ${stats.groupsCount} gr. • ${stats.studentsCount} o'quv.` : '—'}
                    </td>
                    <td style={{ color: '#94a3b8', fontSize: '0.82rem' }}>
                      {center.createdAt ? new Date(center.createdAt).toLocaleDateString('uz-UZ') : '—'}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button className="c-icon-btn" title="Batafsil" onClick={() => setDetailCenter(center)}><Eye size={15} /></button>
                        <button className="c-icon-btn" title="Tahrirlash" onClick={() => openEditModal(center)}><Pencil size={15} /></button>
                        <button className="c-icon-btn" disabled={busyId === center.id} onClick={() => handleToggleStatus(center)}>
                          {suspended ? <PlayCircle size={15} /> : <PauseCircle size={15} />}
                        </button>
                        <button className="c-icon-btn c-icon-btn-danger" disabled={busyId === center.id} onClick={() => handleDelete(center)}><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>{editingCenter ? 'Markazni Tahrirlash' : 'Yangi O\'quv Markazi Qo\'shish'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>O'quv Markazi Nomi</label>
                <input
                  type="text"
                  required
                  placeholder="masalan: Cambridge Learning Center"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Admin Emaili {editingCenter && '(o\'zgartirib bo\'lmaydi)'}</label>
                <input
                  type="email"
                  required
                  disabled={Boolean(editingCenter)}
                  placeholder="admin@markaz.uz"
                  value={form.adminEmail}
                  onChange={e => setForm({ ...form, adminEmail: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Telefon raqam</label>
                <input
                  type="text"
                  placeholder="+998 90 123 45 67"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Bekor qilish</button>
                <button type="submit" className="btn-primary" disabled={submitting}>
                  {submitting ? 'Saqlanmoqda...' : (editingCenter ? 'Saqlash' : 'Markazni Yaratish')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {credentials && (
        <CredentialsModal
          title="Markaz Admini Yaratildi"
          email={credentials.email}
          tempPassword={credentials.tempPassword}
          onClose={() => setCredentials(null)}
        />
      )}

      {detailCenter && (
        <CenterDetailModal center={detailCenter} onClose={() => setDetailCenter(null)} />
      )}
    </div>
  );
}
