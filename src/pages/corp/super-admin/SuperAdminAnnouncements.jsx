import { useState, useEffect } from 'react';
import { Megaphone, Pencil, Trash2, Power, RefreshCw, Info, TriangleAlert, OctagonAlert } from 'lucide-react';
import {
  getAllAnnouncements, createAnnouncement, updateAnnouncement,
  toggleAnnouncementActive, deleteAnnouncement
} from '../../../services/corpService';
import './shared.css';
import './SuperAdminAnnouncements.css';

const EMPTY_FORM = { title: '', message: '', type: 'info', target: 'all' };
const TYPE_ICON = { info: Info, warning: TriangleAlert, critical: OctagonAlert };

export default function SuperAdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [busyId, setBusyId] = useState(null);

  const loadAnnouncements = async () => {
    setLoading(true);
    try {
      setAnnouncements(await getAllAnnouncements());
    } catch (err) {
      console.error('Error loading announcements:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const startEdit = (a) => {
    setForm({ title: a.title, message: a.message, type: a.type, target: a.target });
    setEditingId(a.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.message.trim()) return;
    setSubmitting(true);
    try {
      if (editingId) {
        await updateAnnouncement(editingId, form);
      } else {
        await createAnnouncement(form);
      }
      resetForm();
      await loadAnnouncements();
    } catch (err) {
      alert('Xatolik: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (a) => {
    setBusyId(a.id);
    try {
      await toggleAnnouncementActive(a.id, !a.isActive);
      setAnnouncements(prev => prev.map(x => x.id === a.id ? { ...x, isActive: !a.isActive } : x));
    } catch (err) {
      alert('Xatolik: ' + err.message);
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (a) => {
    if (!confirm(`"${a.title}" e'lonini o'chirmoqchimisiz?`)) return;
    setBusyId(a.id);
    try {
      await deleteAnnouncement(a.id);
      setAnnouncements(prev => prev.filter(x => x.id !== a.id));
      if (editingId === a.id) resetForm();
    } catch (err) {
      alert('Xatolik: ' + err.message);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="super-admin-container">
      <header className="super-admin-header">
        <div className="super-admin-badge"><Megaphone size={16} /> E'lonlar</div>
        <h1>Platforma E'lonlari</h1>
        <p>Markaz adminlari va/yoki o'qituvchilarga ko'rinadigan e'lonlarni boshqarish.</p>
      </header>

      <div className="announcements-layout">
        <div className="announcement-form-card">
          <h2>{editingId ? "E'lonni Tahrirlash" : "Yangi E'lon"}</h2>
          <form onSubmit={handleSubmit} className="settings-form">
            <div className="form-group">
              <label>Sarlavha</label>
              <input type="text" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Xabar</label>
              <textarea rows={4} required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label>Turi</label>
                <select className="pack-sort-select" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                  <option value="info">Info</option>
                  <option value="warning">Ogohlantirish</option>
                  <option value="critical">Kritik</option>
                </select>
              </div>
              <div className="form-group">
                <label>Kimga</label>
                <select className="pack-sort-select" value={form.target} onChange={e => setForm({ ...form, target: e.target.value })}>
                  <option value="all">Barchaga</option>
                  <option value="center_admin">Markaz Adminlariga</option>
                  <option value="teacher">O'qituvchilarga</option>
                </select>
              </div>
            </div>
            <div className="modal-actions" style={{ marginTop: 0 }}>
              {editingId && <button type="button" className="btn-secondary" onClick={resetForm}>Bekor qilish</button>}
              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? 'Saqlanmoqda...' : (editingId ? 'Saqlash' : "E'lon Qilish")}
              </button>
            </div>
          </form>
        </div>

        <div className="announcement-list-card">
          <div className="announcement-list-head">
            <h2>Barcha E'lonlar ({announcements.length})</h2>
            <button className="c-icon-btn" title="Yangilash" onClick={loadAnnouncements}><RefreshCw size={15} /></button>
          </div>

          {loading ? (
            <div className="loading-spinner">Yuklanmoqda...</div>
          ) : announcements.length === 0 ? (
            <div className="empty-state">
              <Megaphone size={40} />
              <p>Hozircha e'lonlar yo'q.</p>
            </div>
          ) : (
            <div className="announcement-list">
              {announcements.map((a) => {
                const Icon = TYPE_ICON[a.type] || Info;
                return (
                  <div key={a.id} className={`announcement-row type-${a.type} ${!a.isActive ? 'inactive' : ''}`}>
                    <div className="announcement-row-icon"><Icon size={18} /></div>
                    <div className="announcement-row-body">
                      <div className="announcement-row-head">
                        <h3>{a.title}</h3>
                        <span className="announcement-target-tag">
                          {a.target === 'all' ? 'Barchaga' : a.target === 'center_admin' ? 'Adminlarga' : "O'qituvchilarga"}
                        </span>
                      </div>
                      <p>{a.message}</p>
                      <span className="announcement-date">
                        {a.createdAt ? new Date(a.createdAt).toLocaleDateString('uz-UZ') : ''}
                        {!a.isActive && ' · nofaol'}
                      </span>
                    </div>
                    <div className="announcement-row-actions">
                      <button className="c-icon-btn" title={a.isActive ? 'Nofaollashtirish' : 'Faollashtirish'} disabled={busyId === a.id} onClick={() => handleToggle(a)}>
                        <Power size={15} />
                      </button>
                      <button className="c-icon-btn" title="Tahrirlash" onClick={() => startEdit(a)}>
                        <Pencil size={15} />
                      </button>
                      <button className="c-icon-btn c-icon-btn-danger" title="O'chirish" disabled={busyId === a.id} onClick={() => handleDelete(a)}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
