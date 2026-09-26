import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Plus, Users } from 'lucide-react';
import { createTeacher } from '../../../services/corpService';
import { formatRelative } from '../super-admin/centerActivity';
import { Button, EmptyState, Field, LoadingRows, Page, Row, SearchField, Sheet, StatusDot } from '../super-admin/ui';
import { MIN_PASSWORD, PasswordInput, generatePassword } from '../super-admin/SetPasswordSheet';
import ShareCredentials, { credentialsMessage } from '../super-admin/ShareCredentials';
import { useIsDesktop } from '../super-admin/useIsDesktop';
import { useCenterData } from './CenterDataContext';

const DAY = 24 * 60 * 60 * 1000;

function activityTone(ts) {
  if (!ts) return 'gray';
  return Date.now() - ts <= 7 * DAY ? 'green' : 'orange';
}

export default function AdminTeachers() {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const { centerId, centerName, loading, teachers, patch } = useCenterData();

  const [search, setSearch] = useState('');
  const [addOpen, setAddOpen] = useState(false);

  const q = search.trim().toLowerCase();
  const visible = useMemo(
    () => teachers
      .filter((t) => !q || [t.name, t.phone, t.email].some((v) => (v || '').toLowerCase().includes(q)))
      .sort((a, b) => b.studentsCount - a.studentsCount || (a.name || '').localeCompare(b.name || '')),
    [teachers, q],
  );

  const open = (t) => navigate(`/corp/admin/teachers/${t.id}`);

  return (
    <Page
      icon={<Users />}
      title="O'qituvchilar"
      subtitle={loading ? ' ' : `${teachers.length} ta o'qituvchi`}
      action={
        <button type="button" className="sa-icon-btn" onClick={() => setAddOpen(true)} aria-label="O'qituvchi qo'shish">
          <Plus size={20} strokeWidth={2.6} />
        </button>
      }
    >
      {teachers.length > 4 && (
        <div className="sa-toolbar">
          <SearchField value={search} onChange={setSearch} placeholder="Ism yoki telefon" />
        </div>
      )}

      {loading ? (
        <LoadingRows count={4} />
      ) : visible.length === 0 ? (
        <div className="sa-group">
          {teachers.length === 0 ? (
            <EmptyState
              icon={<Users size={40} />}
              title="Hali o'qituvchi yo'q"
              text="O'qituvchi qo'shing — unga login va parol tayyorlanadi, siz uni Telegram orqali yuborasiz."
              action={<Button onClick={() => setAddOpen(true)}>O'qituvchi qo'shish</Button>}
            />
          ) : (
            <EmptyState title="Hech narsa topilmadi" text="Qidiruvni o'zgartirib ko'ring." />
          )}
        </div>
      ) : isDesktop ? (
        <div className="sa-table" style={{ '--sa-cols': 'minmax(240px, 2.2fr) 90px 100px 130px minmax(150px, 1fr) 20px' }}>
          <div className="sa-table-head">
            <span>O'qituvchi</span>
            <span className="num">Guruh</span>
            <span className="num">O'quvchi</span>
            <span className="num">Bu hafta faol</span>
            <span>Oxirgi faollik</span>
            <span />
          </div>
          {visible.map((t) => (
            <button type="button" key={t.id} className="sa-table-row" onClick={() => open(t)}>
              <span className="sa-cell-main">
                <span className="sa-row-icon tone-purple">{(t.name || '?').charAt(0).toUpperCase()}</span>
                <span className="sa-cell-text">
                  <span className="sa-cell-title">{t.name || "O'qituvchi"}</span>
                  <span className="sa-cell-sub">{t.phone || t.email || '—'}</span>
                </span>
              </span>
              <span className="num">{t.groupsCount}</span>
              <span className="num">{t.studentsCount}</span>
              <span className="num">{t.studentsCount ? `${t.activeWeek} / ${t.studentsCount}` : '—'}</span>
              <span className="sa-cell-status">
                <StatusDot tone={activityTone(t.lastActivity)} />
                {formatRelative(t.lastActivity)}
              </span>
              <ChevronRight size={17} className="sa-cell-chevron" />
            </button>
          ))}
        </div>
      ) : (
        <div className="sa-group">
          {visible.map((t) => (
            <Row
              key={t.id}
              icon={(t.name || '?').charAt(0).toUpperCase()}
              iconTone="purple"
              title={t.name || "O'qituvchi"}
              subtitle={`${t.groupsCount} guruh · ${t.studentsCount} o'quvchi · ${formatRelative(t.lastActivity)}`}
              onClick={() => open(t)}
            />
          ))}
        </div>
      )}

      <AddTeacherSheet
        open={addOpen}
        onClose={() => setAddOpen(false)}
        centerId={centerId}
        centerName={centerName}
        onCreated={(teacher) => patch((c) => ({ ...c, teachers: { ...(c.teachers || {}), [teacher.id]: teacher } }))}
      />
    </Page>
  );
}

function AddTeacherSheet({ open, onClose, centerId, centerName, onCreated }) {
  const [form, setForm] = useState({ name: '', phone: '', password: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [created, setCreated] = useState(null); // { name, login, password }

  // Fresh form (and a fresh generated password) every time the sheet opens.
  useEffect(() => {
    if (!open) return;
    setForm({ name: '', phone: '', password: generatePassword() });
    setError('');
    setCreated(null);
  }, [open]);

  const phoneDigits = form.phone.replace(/\D/g, '');
  const valid = form.name.trim() && phoneDigits.length >= 9 && form.password.length >= MIN_PASSWORD;

  const submit = async (e) => {
    e.preventDefault();
    if (!valid) return;
    setSaving(true);
    setError('');
    try {
      const teacher = await createTeacher(centerId, centerName, {
        name: form.name.trim(),
        phone: form.phone.trim(),
        password: form.password,
      });
      onCreated({
        id: teacher.id,
        uid: teacher.uid,
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: teacher.email,
        status: 'active',
        createdAt: new Date().toISOString(),
      });
      setCreated({ name: form.name.trim(), login: form.phone.trim(), password: form.password });
    } catch (err) {
      setError(err.message.includes('already registered')
        ? "Bu telefon raqam bilan hisob allaqachon bor."
        : err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Sheet open={open} onClose={() => !saving && onClose()} title={created ? "O'qituvchi qo'shildi" : "Yangi o'qituvchi"}>
      {created ? (
        <ShareCredentials
          message={credentialsMessage({ label: created.name, login: created.login, password: created.password })}
          onDone={onClose}
        />
      ) : (
        <form onSubmit={submit} autoComplete="off">
          <Field label="Ism familiya">
            <input className="sa-input" required autoFocus placeholder="Abdulla Qodirov" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="Telefon raqam" hint="O'qituvchi shu raqam bilan tizimga kiradi.">
            <input className="sa-input" type="tel" required placeholder="+998 90 123 45 67" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </Field>
          <Field label="Parol" hint={`Kamida ${MIN_PASSWORD} ta belgi. Keyin o'zgartirish mumkin.`}>
            <PasswordInput value={form.password} onChange={(password) => setForm({ ...form, password })} />
          </Field>
          {error && <p className="sa-flow-error">{error}</p>}
          <Button type="submit" block disabled={saving || !valid}>{saving ? 'Qo\'shilmoqda...' : "Qo'shish"}</Button>
        </form>
      )}
    </Sheet>
  );
}
