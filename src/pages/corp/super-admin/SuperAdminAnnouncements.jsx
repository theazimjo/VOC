import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Info, Megaphone, OctagonAlert, Plus, TriangleAlert } from 'lucide-react';
import {
  getAllAnnouncements, createAnnouncement, updateAnnouncement,
  toggleAnnouncementActive, deleteAnnouncement,
} from '../../../services/corpService';
import ConfirmSheet from '../../../components/corp/ConfirmSheet';
import { Button, EmptyState, Field, LoadingRows, Page, Row, Section, Segmented, Sheet, Toggle } from './ui';
import { useToast } from './useToast';

const EMPTY_FORM = { title: '', message: '', type: 'info', target: 'all' };
const TYPE = {
  info: { label: 'Xabar', icon: Info, tone: 'blue' },
  warning: { label: 'Ogohlantirish', icon: TriangleAlert, tone: 'orange' },
  critical: { label: 'Muhim', icon: OctagonAlert, tone: 'red' },
};
const TARGET_LABEL = { all: 'Hammaga', center_admin: 'Adminlarga', teacher: "O'qituvchilarga" };

export default function SuperAdminAnnouncements() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [toastNode, showToast] = useToast();

  const load = async () => {
    try {
      setItems(await getAllAnnouncements());
    } catch (err) {
      console.error('Error loading announcements:', err);
      showToast("E'lonlarni yuklab bo'lmadi", 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormOpen(true);
  };

  const openEdit = (a) => {
    setEditingId(a.id);
    setForm({ title: a.title || '', message: a.message || '', type: a.type || 'info', target: a.target || 'all' });
    setFormOpen(true);
  };

  const editing = items.find((a) => a.id === editingId) || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.message.trim()) return;
    setSubmitting(true);
    try {
      const payload = { ...form, title: form.title.trim(), message: form.message.trim() };
      if (editingId) await updateAnnouncement(editingId, payload);
      else await createAnnouncement(payload);
      setFormOpen(false);
      showToast(editingId ? 'Saqlandi' : "E'lon yuborildi");
      load();
    } catch (err) {
      showToast(`Xatolik: ${err.message}`, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (a, next) => {
    setItems((prev) => prev.map((x) => (x.id === a.id ? { ...x, isActive: next } : x)));
    try {
      await toggleAnnouncementActive(a.id, next);
    } catch (err) {
      setItems((prev) => prev.map((x) => (x.id === a.id ? { ...x, isActive: !next } : x)));
      showToast(`Xatolik: ${err.message}`, 'error');
    }
  };

  const handleDelete = async () => {
    if (!editing) return;
    setSubmitting(true);
    try {
      await deleteAnnouncement(editing.id);
      setItems((prev) => prev.filter((x) => x.id !== editing.id));
      setConfirmDelete(false);
      setFormOpen(false);
      showToast("E'lon o'chirildi");
    } catch (err) {
      showToast(`Xatolik: ${err.message}`, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Page
      title="E'lonlar"
      subtitle="Faol e'lonlar markaz adminlari va o'qituvchilar panelida ko'rinadi."
      action={
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" className="sa-sheet-close" style={{ width: 36, height: 36 }} onClick={() => navigate('/corp/super-admin/settings')} aria-label="Sozlamalarga qaytish">
            <ChevronLeft size={18} strokeWidth={2.6} />
          </button>
          <button type="button" className="sa-icon-btn" onClick={openCreate} aria-label="Yangi e'lon">
            <Plus size={20} strokeWidth={2.6} />
          </button>
        </div>
      }
    >
      {loading ? (
        <LoadingRows count={3} />
      ) : items.length === 0 ? (
        <div className="sa-group">
          <EmptyState
            icon={<Megaphone size={40} />}
            title="Hali e'lon yo'q"
            text="Yangilanish yoki texnik ishlar haqida xabar berish uchun e'lon yarating."
            action={<Button onClick={openCreate}>E'lon yaratish</Button>}
          />
        </div>
      ) : (
        <Section footer="E'lonni bosib, uni tahrirlash yoki yashirish mumkin.">
          {items.map((a) => {
            const t = TYPE[a.type] || TYPE.info;
            const Icon = t.icon;
            return (
              <Row
                key={a.id}
                icon={<Icon size={16} />}
                iconTone={a.isActive ? t.tone : 'gray'}
                title={a.title}
                subtitle={<span className="sa-ann-body">{TARGET_LABEL[a.target] || TARGET_LABEL.all} · {a.message}</span>}
                detail={<span style={{ fontSize: 15 }}>{a.isActive ? 'Faol' : 'Yashirin'}</span>}
                onClick={() => openEdit(a)}
              />
            );
          })}
        </Section>
      )}

      <Sheet open={formOpen} onClose={() => !submitting && setFormOpen(false)} title={editingId ? "E'lonni tahrirlash" : "Yangi e'lon"}>
        <form onSubmit={handleSubmit}>
          <Field label="Sarlavha">
            <input className="sa-input" required autoFocus value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Masalan: Yangi imkoniyat" />
          </Field>
          <Field label="Xabar">
            <textarea className="sa-textarea" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </Field>
          <Field label="Turi">
            <Segmented
              label="Turi"
              value={form.type}
              onChange={(type) => setForm({ ...form, type })}
              options={Object.entries(TYPE).map(([value, { label }]) => ({ value, label }))}
            />
          </Field>
          <Field label="Kimga">
            <Segmented
              label="Kimga"
              value={form.target}
              onChange={(target) => setForm({ ...form, target })}
              options={Object.entries(TARGET_LABEL).map(([value, label]) => ({ value, label }))}
            />
          </Field>
          {editing && (
            <div className="sa-group" style={{ marginBottom: 16 }}>
              <Row
                title="Ko'rsatilsin"
                subtitle={editing.isActive ? "Panellarda ko'rinib turibdi" : 'Hozir yashirin'}
                accessory={<Toggle checked={Boolean(editing.isActive)} onChange={(next) => handleToggle(editing, next)} label="Ko'rsatilsin" />}
              />
            </div>
          )}
          <Button type="submit" block disabled={submitting}>
            {submitting ? 'Saqlanmoqda...' : editingId ? 'Saqlash' : 'Yuborish'}
          </Button>
          {editingId && (
            <Button variant="plain" tone="red" block style={{ marginTop: 8, color: 'var(--sa-red)' }} onClick={() => setConfirmDelete(true)}>
              E'lonni o'chirish
            </Button>
          )}
        </form>
      </Sheet>

      <ConfirmSheet
        open={confirmDelete}
        title="E'lonni o'chirasizmi?"
        message={editing ? `"${editing.title}" butunlay o'chiriladi.` : undefined}
        confirmLabel="O'chirish"
        danger
        busy={submitting}
        onConfirm={handleDelete}
        onCancel={() => !submitting && setConfirmDelete(false)}
      />

      {toastNode}
    </Page>
  );
}
