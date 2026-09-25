import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Building2, Check, ChevronRight, Copy, Plus, Send, TriangleAlert } from 'lucide-react';
import { getAllCenters, createCenter, createCenterAdminAccount, getCenterStats } from '../../../services/corpService';
import { computeCenterActivity, formatRelative, HEALTH_LABEL } from './centerActivity';
import { Button, EmptyState, Field, LoadingRows, Page, Row, SearchField, Segmented, Sheet, StatusDot } from './ui';
import { useToast } from './useToast';
import { useIsDesktop } from './useIsDesktop';

const EMPTY_FORM = { name: '', adminEmail: '', phone: '' };
const HEALTH_TONE = { active: 'green', quiet: 'orange', new: 'gray' };
const FILTERS = [
  { value: 'all', label: 'Hammasi' },
  { value: 'active', label: 'Faol' },
  { value: 'suspended', label: "To'xtatilgan" },
];

const centerName = (c) => c?.name || `Nomsiz markaz (${c?.id})`;
const initial = (c) => (c?.name ? c.name.charAt(0).toUpperCase() : '?');

function buildWelcomeMessage({ name, email, tempPassword }) {
  return [
    `Assalomu alaykum! "${name}" uchun VOC platformasida hisob ochildi.`,
    '',
    `Kirish: ${window.location.origin}/login`,
    `Login: ${email}`,
    `Vaqtinchalik parol: ${tempPassword}`,
    '',
    "Kirgandan so'ng o'qituvchilaringizni qo'shishingiz mumkin.",
  ].join('\n');
}

// Center list + "new center" flow. Everything about one center (groups,
// teachers, edit, suspend, delete) lives on its own page:
// SuperAdminCenterDetail at /corp/super-admin/centers/:centerId.
export default function SuperAdminCenters() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [centers, setCenters] = useState([]);
  const [statsById, setStatsById] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [welcome, setWelcome] = useState(null);
  const [copied, setCopied] = useState(false);
  const [toastNode, showToast] = useToast();
  const isDesktop = useIsDesktop();

  const loadCenters = useCallback(async () => {
    try {
      const data = await getAllCenters();
      setCenters(data);
      const entries = await Promise.all(data.map(async (c) => {
        try {
          return [c.id, await getCenterStats(c.id)];
        } catch {
          return [c.id, null];
        }
      }));
      setStatsById(Object.fromEntries(entries));
    } catch (err) {
      console.error('Error loading centers:', err);
      showToast("Markazlarni yuklab bo'lmadi", 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => { loadCenters(); }, [loadCenters]);

  // ?new=1 (from the overview's "+") opens the create sheet; ?open=<id>
  // (older links) goes to the center's page.
  useEffect(() => {
    const open = searchParams.get('open');
    if (open) {
      navigate(`/corp/super-admin/centers/${encodeURIComponent(open)}`, { replace: true });
      return;
    }
    if (searchParams.get('new')) {
      setForm(EMPTY_FORM);
      setFormOpen(true);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams, navigate]);

  // Message handed back by the detail page after deleting a center.
  useEffect(() => {
    if (location.state?.toast) {
      showToast(location.state.toast);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location, navigate, showToast]);

  const activityById = useMemo(() => {
    const out = {};
    centers.forEach((c) => { out[c.id] = computeCenterActivity(statsById[c.id]); });
    return out;
  }, [centers, statsById]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return centers
      .filter((c) => !q || (c.name || '').toLowerCase().includes(q) || (c.adminEmail || '').toLowerCase().includes(q))
      .filter((c) => filter === 'all' || (filter === 'suspended' ? c.status === 'suspended' : c.status !== 'suspended'))
      .sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  }, [centers, search, filter]);

  const openCenter = (c) => navigate(`/corp/super-admin/centers/${encodeURIComponent(c.id)}`);
  const openCreate = () => {
    setForm(EMPTY_FORM);
    setFormOpen(true);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const adminEmail = form.adminEmail.trim();
    if (!name || !adminEmail) return;
    setSubmitting(true);
    try {
      const newCenter = await createCenter({ ...form, name, adminEmail });
      const { tempPassword } = await createCenterAdminAccount(newCenter);
      setFormOpen(false);
      setCopied(false);
      setWelcome({ name, email: adminEmail, tempPassword });
      loadCenters();
    } catch (err) {
      showToast(`Xatolik: ${err.message}`, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const welcomeText = welcome ? buildWelcomeMessage(welcome) : '';

  const copyWelcome = async () => {
    try {
      await navigator.clipboard.writeText(welcomeText);
      setCopied(true);
    } catch {
      showToast("Nusxalab bo'lmadi — matnni belgilab oling", 'error');
    }
  };

  const shareWelcome = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text: welcomeText });
        return;
      } catch {
        /* dismissed — fall through to Telegram */
      }
    }
    window.open(`https://t.me/share/url?url=${encodeURIComponent(`${window.location.origin}/login`)}&text=${encodeURIComponent(welcomeText)}`, '_blank', 'noopener');
  };

  return (
    <Page
      title="Markazlar"
      subtitle={loading ? ' ' : `${centers.length} ta o'quv markazi`}
      action={
        <button type="button" className="sa-icon-btn" onClick={openCreate} aria-label="Yangi markaz">
          <Plus size={20} strokeWidth={2.6} />
        </button>
      }
    >
      <div className={`sa-toolbar ${isDesktop ? 'is-inline' : ''}`}>
        <SearchField value={search} onChange={setSearch} placeholder="Markaz yoki email" />
        <Segmented label="Holat" options={FILTERS} value={filter} onChange={setFilter} />
      </div>

      {loading ? (
        <LoadingRows count={5} />
      ) : visible.length === 0 ? (
        <div className="sa-group">
          {centers.length === 0 ? (
            <EmptyState
              icon={<Building2 size={40} />}
              title="Hali markaz yo'q"
              text="Birinchi o'quv markazini qo'shing — admin uchun kirish ma'lumotlari tayyorlanadi."
              action={<Button onClick={openCreate}>Markaz qo'shish</Button>}
            />
          ) : (
            <EmptyState title="Hech narsa topilmadi" text="Qidiruv yoki filtrni o'zgartirib ko'ring." />
          )}
        </div>
      ) : isDesktop ? (
        <div className="sa-table" style={{ '--sa-cols': 'minmax(260px, 2.4fr) 90px 100px 130px minmax(130px, 1fr) 150px 20px' }}>
          <div className="sa-table-head">
            <span>Markaz</span>
            <span className="num">Guruh</span>
            <span className="num">O'quvchi</span>
            <span className="num">Bu hafta faol</span>
            <span>Oxirgi faollik</span>
            <span>Holat</span>
            <span />
          </div>
          {visible.map((c) => {
            const a = activityById[c.id];
            const isSuspended = c.status === 'suspended';
            return (
              <button type="button" key={c.id} className="sa-table-row" onClick={() => openCenter(c)}>
                <span className="sa-cell-main">
                  <span className={`sa-row-icon tone-${isSuspended ? 'gray' : 'blue'}`}>{initial(c)}</span>
                  <span className="sa-cell-text">
                    <span className="sa-cell-title">{centerName(c)}</span>
                    <span className="sa-cell-sub">{c.adminEmail || '—'}</span>
                  </span>
                </span>
                <span className="num">{a.groups}</span>
                <span className="num">{a.students}</span>
                <span className="num">{a.students ? `${a.activeWeek} / ${a.students}` : '—'}</span>
                <span className="muted">{formatRelative(a.lastActivity)}</span>
                <span className="sa-cell-status">
                  <StatusDot tone={isSuspended ? 'red' : HEALTH_TONE[a.health]} />
                  {isSuspended ? "To'xtatilgan" : HEALTH_LABEL[a.health]}
                </span>
                <ChevronRight size={17} className="sa-cell-chevron" />
              </button>
            );
          })}
        </div>
      ) : (
        <div className="sa-group">
          {visible.map((c) => {
            const a = activityById[c.id];
            const isSuspended = c.status === 'suspended';
            return (
              <Row
                key={c.id}
                icon={initial(c)}
                iconTone={isSuspended ? 'gray' : 'blue'}
                title={centerName(c)}
                subtitle={isSuspended
                  ? "To'xtatilgan"
                  : `${a.groups} guruh · ${a.students} o'quvchi · ${formatRelative(a.lastActivity)}`}
                accessory={!isSuspended && <StatusDot tone={HEALTH_TONE[a.health]} />}
                onClick={() => openCenter(c)}
              />
            );
          })}
        </div>
      )}

      {/* ── New center ── */}
      <Sheet open={formOpen} onClose={() => !submitting && setFormOpen(false)} title="Yangi markaz">
        <form onSubmit={handleCreate}>
          <Field label="Markaz nomi">
            <input
              className="sa-input"
              required
              autoFocus
              placeholder="Masalan: Cambridge Learning Center"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Field>
          <Field label="Admin emaili" hint="Shu email bilan markaz admini uchun hisob ochiladi.">
            <input
              className="sa-input"
              type="email"
              required
              placeholder="admin@markaz.uz"
              value={form.adminEmail}
              onChange={(e) => setForm({ ...form, adminEmail: e.target.value })}
            />
          </Field>
          <Field label="Telefon">
            <input
              className="sa-input"
              type="tel"
              placeholder="+998 90 123 45 67"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </Field>
          <Button type="submit" block disabled={submitting}>
            {submitting ? 'Yaratilmoqda...' : 'Markazni yaratish'}
          </Button>
        </form>
      </Sheet>

      {/* ── Credentials to hand over ── */}
      <Sheet open={Boolean(welcome)} onClose={() => setWelcome(null)} title="Markaz tayyor">
        {welcome && (
          <>
            <div className="sa-warning">
              <TriangleAlert size={18} style={{ flexShrink: 0 }} />
              <span>Parol faqat hozir ko'rinadi. Xabarni markaz adminiga yuboring.</span>
            </div>
            <p className="sa-message">{welcomeText}</p>
            <div className="sa-actions-stack">
              <Button onClick={shareWelcome}><Send size={18} /> Telegram orqali yuborish</Button>
              <Button variant="tinted" onClick={copyWelcome}>
                {copied ? <Check size={18} /> : <Copy size={18} />} {copied ? 'Nusxalandi' : 'Nusxalash'}
              </Button>
              <Button variant="plain" onClick={() => setWelcome(null)}>Tayyor</Button>
            </div>
          </>
        )}
      </Sheet>

      {toastNode}
    </Page>
  );
}
