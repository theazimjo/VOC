import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmSheet from '../../../components/corp/ConfirmSheet';
import { Button, Field, LoadingRows, Page, Row, Section, Segmented, Toggle } from './ui';
import { parseMarkdown } from '../../blog/markdown';
import BlogMarkdown from '../../blog/BlogMarkdown';
import { deleteBlogPost, EMPTY_POST, listBlogPosts, saveBlogPost, slugFromTitle } from './blogApi';
import { useToast } from './useToast';
import '../../blog/Blog.css';
import './blogEditor.css';

const LANG_OPTIONS = [
  { value: 'uz', label: "O'zbekcha" },
  { value: 'ru', label: 'Русский' },
  { value: 'en', label: 'English' },
];
const COVER_KEYS = [
  ['board', 'Tablo'],
  ['curve', "Unutish egri chizig'i"],
  ['sessions', 'Mashq sessiyalari'],
  ['factors', 'Baho omillari'],
  ['compare', 'Taqqoslash'],
];
const COVER_KEY_SET = new Set(COVER_KEYS.map(([k]) => k));

// Snippets for the toolbar: [label, before, after, placeholder]
const TOOLS = [
  ['Sarlavha', '\n## ', '\n', 'Bo\'lim sarlavhasi'],
  ['Qalin', '**', '**', 'qalin matn'],
  ['Kursiv', '*', '*', 'kursiv matn'],
  ['Ro\'yxat', '\n- ', '\n- \n', 'band'],
  ['Iqtibos', '\n> ', '\n', 'muhim fikr'],
  ['Havola', '[', '](https://)', 'matn'],
  ['Rasm', '\n![', '](https://)\n', 'rasm izohi'],
  ['Grafik', '\n:::bars ', '\nnote: izoh\nBirinchi | 0.50 | base\nIkkinchi | 0.78 | model\n:::\n', 'Grafik sarlavhasi'],
];

export default function SuperAdminBlogEditor() {
  const { id } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();
  const [post, setPost] = useState(isNew ? EMPTY_POST() : null);
  const [lang, setLang] = useState('uz');
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [toastNode, showToast] = useToast();
  const bodyRef = useRef(null);

  useEffect(() => {
    if (isNew) return undefined;
    let alive = true;
    listBlogPosts()
      .then((all) => {
        if (!alive) return;
        const found = all.find((p) => p.id === id);
        if (!found) { showToast('Maqola topilmadi', 'error'); navigate('/corp/super-admin/blog', { replace: true }); return; }
        setPost({ ...EMPTY_POST(), ...found, uz: { ...EMPTY_POST().uz, ...found.uz }, ru: { ...EMPTY_POST().ru, ...found.ru }, en: { ...EMPTY_POST().en, ...found.en } });
      })
      .catch((err) => showToast(`Yuklab bo'lmadi: ${err.message}`, 'error'));
    return () => { alive = false; };
  }, [id, isNew, navigate, showToast]);

  const block = post?.[lang] || { title: '', excerpt: '', body: '' };
  const parsed = useMemo(() => parseMarkdown(block.body), [block.body]);

  const patch = useCallback((changes) => setPost((p) => ({ ...p, ...changes })), []);
  const patchLang = (changes) => setPost((p) => ({ ...p, [lang]: { ...p[lang], ...changes } }));

  const onTitle = (title) => {
    patchLang({ title });
    // First Uzbek title of a new post fills the URL, until the slug is edited by hand.
    if (lang === 'uz' && !slugTouched) patch({ slug: slugFromTitle(title) });
  };

  const insert = ([, before, after, placeholder]) => {
    const el = bodyRef.current;
    const text = block.body;
    const start = el ? el.selectionStart : text.length;
    const end = el ? el.selectionEnd : text.length;
    const selected = text.slice(start, end) || placeholder;
    const next = text.slice(0, start) + before + selected + after + text.slice(end);
    patchLang({ body: next });
    requestAnimationFrame(() => {
      if (!el) return;
      el.focus();
      const caret = start + before.length;
      el.setSelectionRange(caret, caret + selected.length);
    });
  };

  const insertFigure = (name) => {
    if (!name) return;
    const el = bodyRef.current;
    const text = block.body;
    const at = el ? el.selectionStart : text.length;
    patchLang({ body: `${text.slice(0, at)}\n\n:::figure ${name}\n\n${text.slice(at)}` });
  };

  const save = async (publishNow) => {
    setSaving(true);
    try {
      const saved = await saveBlogPost({ ...post, ...(publishNow === undefined ? {} : { published: publishNow }) });
      setPost({ ...EMPTY_POST(), ...saved });
      showToast(saved.published ? 'Saqlandi va chop etildi' : 'Qoralama saqlandi');
      if (isNew) navigate(`/corp/super-admin/blog/${saved.id}`, { replace: true });
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    setSaving(true);
    try {
      await deleteBlogPost(post.id);
      navigate('/corp/super-admin/blog', { replace: true });
    } catch (err) {
      showToast(err.message, 'error');
      setSaving(false);
      setConfirmDelete(false);
    }
  };

  const goBack = { label: 'Blog', onClick: () => navigate('/corp/super-admin/blog') };

  if (!post) {
    return (
      <Page title="Maqola" back={goBack}>
        <LoadingRows count={4} />
        {toastNode}
      </Page>
    );
  }

  const coverIsKey = COVER_KEY_SET.has(post.cover);

  return (
    <Page
      title={isNew ? 'Yangi maqola' : (post.uz.title || post.en.title || 'Maqola')}
      back={goBack}
      action={<Button onClick={() => save()} disabled={saving}>{saving ? 'Saqlanmoqda...' : 'Saqlash'}</Button>}
    >
      <div className="sa-blog-editor">
        <div className="sa-blog-form">
          <Section title="Umumiy" footer="Havola maqola manzilini belgilaydi: /blog/havola. Faqat kichik lotin harflar, raqam va chiziqcha.">
            <Row
              title="Chop etilsin"
              subtitle={post.published ? 'Saytda hamma ko\'radi' : 'Hozircha qoralama, faqat siz ko\'rasiz'}
              accessory={<Toggle checked={post.published} onChange={(published) => patch({ published })} label="Chop etilsin" />}
            />
          </Section>

          <div className="sa-blog-fields">
            <Field label="Havola (slug)">
              <input className="sa-input" value={post.slug} onChange={(e) => { setSlugTouched(true); patch({ slug: e.target.value }); }} placeholder="masalan: xotira-sirlari" />
            </Field>
            <Field label="Sana">
              <input className="sa-input" type="date" value={post.date} onChange={(e) => patch({ date: e.target.value })} />
            </Field>
            <Field label="Muqova">
              <select
                className="sa-select"
                value={coverIsKey ? post.cover : 'url'}
                onChange={(e) => patch({ cover: e.target.value === 'url' ? 'https://' : e.target.value })}
              >
                {COVER_KEYS.map(([k, label]) => <option key={k} value={k}>{label}</option>)}
                <option value="url">O'z rasmim (havola)</option>
              </select>
            </Field>
            {!coverIsKey && (
              <Field label="Rasm havolasi" hint="https:// bilan boshlanishi kerak.">
                <input className="sa-input" value={post.cover} onChange={(e) => patch({ cover: e.target.value })} placeholder="https://..." />
              </Field>
            )}
          </div>

          <Segmented label="Til" value={lang} onChange={setLang} options={LANG_OPTIONS} />
          <div className="sa-blog-fields">
            <Field label="Sarlavha">
              <input className="sa-input" value={block.title} onChange={(e) => onTitle(e.target.value)} />
            </Field>
            <Field label="Qisqacha mazmun" hint="Ro'yxatda va havola ulashilganda ko'rinadi.">
              <textarea className="sa-textarea" rows={2} value={block.excerpt} onChange={(e) => patchLang({ excerpt: e.target.value })} />
            </Field>
          </div>

          <div className="sa-blog-toolbar" role="toolbar" aria-label="Matn asboblari">
            {TOOLS.map((t) => (
              <button key={t[0]} type="button" className="sa-blog-tool" onClick={() => insert(t)}>{t[0]}</button>
            ))}
            <select className="sa-blog-tool sa-blog-figure" value="" onChange={(e) => insertFigure(e.target.value)} aria-label="Illyustratsiya qo'shish">
              <option value="">Illyustratsiya...</option>
              {COVER_KEYS.map(([k, label]) => <option key={k} value={k}>{label}</option>)}
            </select>
          </div>
          <Field label="Matn" hint="Markdown: ## sarlavha, **qalin**, - ro'yxat, > iqtibos, [matn](havola), :::figure curve">
            <textarea ref={bodyRef} className="sa-textarea sa-blog-body" value={block.body} onChange={(e) => patchLang({ body: e.target.value })} spellCheck />
          </Field>

          {!isNew && (
            <Section>
              <Row title="Maqolani o'chirish" destructive onClick={() => setConfirmDelete(true)} chevron={false} />
            </Section>
          )}
        </div>

        <div className="sa-blog-preview">
          <p className="sa-blog-preview-label">Ko'rinishi</p>
          <div className="bl-page bl-preview">
            <h1 className="sa-blog-preview-title">{block.title || 'Sarlavha'}</h1>
            <div className="bl-body">
              <BlogMarkdown blocks={parsed.blocks} lang={lang} />
            </div>
          </div>
        </div>
      </div>

      <ConfirmSheet
        open={confirmDelete}
        danger
        title="Maqola o'chirilsinmi?"
        message="Bu amalni qaytarib bo'lmaydi."
        confirmLabel="O'chirish"
        cancelLabel="Bekor qilish"
        busy={saving}
        onConfirm={remove}
        onCancel={() => setConfirmDelete(false)}
      />
      {toastNode}
    </Page>
  );
}
