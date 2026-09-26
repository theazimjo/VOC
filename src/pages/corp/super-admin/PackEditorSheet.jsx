import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { createCustomPack, updateCustomPack } from '../../../services/corpService';
import { speechLanguages } from '../../../utils/helpers';
import { BEGINNER_ENGLISH_PACK } from '../../../data/beginnerEnglishCoursePack';
import { Button, Field, Row, Section, Sheet } from './ui';

// Create a word pack (blank, or — for center admins — the ready-made
// Beginner course) or rename one. Pass `ownerUid` for a teacher's private
// pack. onSaved(pack, { openAfter }) — openAfter is true for a new pack.
export default function PackEditorSheet({ open, pack, centerId, ownerUid = null, allowPreset = false, onClose, onSaved }) {
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

  // One tap: the full Beginner (A1) course — 3 months, 15 topics, 332 words.
  const seedBeginner = () => run(async () => {
    const { title, level, description, months } = BEGINNER_ENGLISH_PACK;
    const created = await createCustomPack(centerId, { title, level, description });
    const units = months.flatMap((m) => m.units);
    const words = units.flatMap((u) => u.words);
    const updates = { months, units, words, sectionsCount: units.length, wordCount: words.length };
    await updateCustomPack(centerId, created.id, updates);
    onSaved({ ...created, ...updates }, { openAfter: true });
  });

  return (
    <Sheet open={open} onClose={() => !saving && onClose()} title={pack ? 'Tahrirlash' : allowPreset ? 'Yangi kurs' : "Yangi to'plam"}>
      {!pack && allowPreset && (
        <Section footer="3 oy, 15 mavzu, 332 so'z — darhol guruhlarga berish mumkin.">
          <Row icon={<Sparkles size={16} />} iconTone="orange" title="Tayyor Beginner (A1) kursi" onClick={seedBeginner} disabled={saving} />
        </Section>
      )}
      <form onSubmit={submit}>
        <Field label="Nomi">
          <input className="sa-input" required autoFocus={Boolean(pack)} placeholder="Masalan: Beginner — 1-oy" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </Field>
        <Field label="Tavsif (ixtiyoriy)">
          <textarea className="sa-textarea" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </Field>
        <Field label="So'zlar tili" hint="Talaffuz uchun.">
          <select className="sa-select" value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })}>
            {speechLanguages.map((l) => <option key={l.code} value={l.code}>{l.flag} {l.label}</option>)}
          </select>
        </Field>
        {error && <p className="sa-flow-error">{error}</p>}
        <Button type="submit" block disabled={saving || !form.title.trim()}>
          {saving ? 'Saqlanmoqda...' : pack ? 'Saqlash' : allowPreset ? "Bo'sh kurs yaratish" : 'Yaratish'}
        </Button>
      </form>
    </Sheet>
  );
}
