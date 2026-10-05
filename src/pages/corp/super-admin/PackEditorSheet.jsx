import { useEffect, useState } from 'react';
import { createCustomPack, updateCustomPack } from '../../../services/corpService';
import { speechLanguages } from '../../../utils/helpers';
import { Button, Field, Sheet } from './ui';

// Create a word pack or rename one. `isCourse` words it as a course (center
// admin) instead of a pack (teacher). Pass `ownerUid` for a teacher's
// private pack. onSaved(pack, { openAfter }) — openAfter is true for a new
// pack. `en` (center admin only — teacher panel stays Uzbek) switches
// every string here, same pattern as SetPasswordSheet.jsx/ClassesTab.jsx.
export default function PackEditorSheet({ open, pack, centerId, ownerUid = null, isCourse = false, onClose, onSaved, en = false }) {
  const [form, setForm] = useState({ title: '', description: '', language: 'en-US' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    setForm({ title: pack?.title || '', description: pack?.description || '', language: pack?.language || 'en-US' });
    setError('');
  }, [open, pack]);

  const run = async (fn) => {
    setSaving(true);
    setError('');
    try {
      await fn();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const data = { title: form.title.trim(), description: form.description.trim(), language: form.language };
    if (!data.title) return;
    run(async () => {
      if (pack) {
        await updateCustomPack(centerId, pack.id, data);
        onSaved({ ...pack, ...data });
      } else {
        onSaved(await createCustomPack(centerId, data, ownerUid), { openAfter: true });
      }
    });
  };

  const title = pack ? (en ? 'Edit' : 'Tahrirlash') : isCourse ? (en ? 'New Course' : 'Yangi kurs') : (en ? 'New Pack' : "Yangi to'plam");
  const submitLabel = saving
    ? (en ? 'Saving...' : 'Saqlanmoqda...')
    : pack ? (en ? 'Save' : 'Saqlash') : isCourse ? (en ? 'Create Course' : 'Kurs yaratish') : (en ? 'Create' : 'Yaratish');

  return (
    <Sheet open={open} onClose={() => !saving && onClose()} title={title} en={en}>
      <form onSubmit={submit}>
        <Field label={en ? 'Name' : 'Nomi'}>
          <input className="sa-input" required autoFocus={Boolean(pack)} placeholder={en ? 'e.g. Beginner — Month 1' : 'Masalan: Beginner — 1-oy'} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </Field>
        <Field label={en ? 'Description (optional)' : 'Tavsif (ixtiyoriy)'}>
          <textarea className="sa-textarea" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </Field>
        <Field label={en ? 'Word Language' : "So'zlar tili"} hint={en ? 'For pronunciation.' : 'Talaffuz uchun.'}>
          <select className="sa-select" value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })}>
            {speechLanguages.map((l) => <option key={l.code} value={l.code}>{l.flag} {l.label}</option>)}
          </select>
        </Field>
        {error && <p className="sa-flow-error">{error}</p>}
        <Button type="submit" block disabled={saving || !form.title.trim()}>
          {submitLabel}
        </Button>
      </form>
    </Sheet>
  );
}
