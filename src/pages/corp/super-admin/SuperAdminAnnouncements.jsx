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
  info: { label: 'Info', icon: Info, tone: 'blue' },
  warning: { label: 'Warning', icon: TriangleAlert, tone: 'orange' },
  critical: { label: 'Critical', icon: OctagonAlert, tone: 'red' },
};
const TARGET_LABEL = { all: 'Everyone', center_admin: 'Center admins', teacher: 'Teachers' };

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
      showToast("Couldn't load the announcements", 'error');
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
      showToast(editingId ? 'Saved' : 'Announcement sent');
      load();
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
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
      showToast(`Error: ${err.message}`, 'error');
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
      showToast('Announcement deleted');
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Page
      title="Announcements"
      subtitle="Active announcements show up in the center admin and teacher panels."
      action={
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" className="sa-sheet-close" style={{ width: 36, height: 36 }} onClick={() => navigate('/corp/super-admin/settings')} aria-label="Back to settings">
            <ChevronLeft size={18} strokeWidth={2.6} />
          </button>
          <button type="button" className="sa-icon-btn" onClick={openCreate} aria-label="New announcement">
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
            title="No announcements yet"
            text="Create an announcement to tell people about an update or maintenance."
            action={<Button onClick={openCreate}>Create announcement</Button>}
          />
        </div>
      ) : (
        <Section footer="Tap an announcement to edit or hide it.">
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
                detail={<span style={{ fontSize: 15 }}>{a.isActive ? 'Active' : 'Hidden'}</span>}
                onClick={() => openEdit(a)}
              />
            );
          })}
        </Section>
      )}

      <Sheet open={formOpen} onClose={() => !submitting && setFormOpen(false)} title={editingId ? 'Edit announcement' : 'New announcement'}>
        <form onSubmit={handleSubmit}>
          <Field label="Title">
            <input className="sa-input" required autoFocus value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. A new feature" />
          </Field>
          <Field label="Message">
            <textarea className="sa-textarea" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </Field>
          <Field label="Type">
            <Segmented
              label="Type"
              value={form.type}
              onChange={(type) => setForm({ ...form, type })}
              options={Object.entries(TYPE).map(([value, { label }]) => ({ value, label }))}
            />
          </Field>
          <Field label="Audience">
            <Segmented
              label="Audience"
              value={form.target}
              onChange={(target) => setForm({ ...form, target })}
              options={Object.entries(TARGET_LABEL).map(([value, label]) => ({ value, label }))}
            />
          </Field>
          {editing && (
            <div className="sa-group" style={{ marginBottom: 16 }}>
              <Row
                title="Show"
                subtitle={editing.isActive ? 'Visible in the panels' : 'Hidden right now'}
                accessory={<Toggle checked={Boolean(editing.isActive)} onChange={(next) => handleToggle(editing, next)} label="Show" />}
              />
            </div>
          )}
          <Button type="submit" block disabled={submitting}>
            {submitting ? 'Saving...' : editingId ? 'Save' : 'Send'}
          </Button>
          {editingId && (
            <Button variant="plain" tone="red" block style={{ marginTop: 8, color: 'var(--sa-red)' }} onClick={() => setConfirmDelete(true)}>
              Delete announcement
            </Button>
          )}
        </form>
      </Sheet>

      <ConfirmSheet
        open={confirmDelete}
        title="Delete this announcement?"
        message={editing ? `"${editing.title}" will be deleted for good.` : undefined}
        confirmLabel="Delete"
        danger
        busy={submitting}
        onConfirm={handleDelete}
        onCancel={() => !submitting && setConfirmDelete(false)}
      />

      {toastNode}
    </Page>
  );
}
