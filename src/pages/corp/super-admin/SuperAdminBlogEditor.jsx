import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmSheet from '../../../components/corp/ConfirmSheet';
import { Button, Field, LoadingRows, Page, Row, Section, Toggle } from './ui';
import { parseMarkdown } from '../../blog/markdown';
import BlogMarkdown from '../../blog/BlogMarkdown';
import { deleteBlogPost, EMPTY_POST, listBlogPosts, saveBlogPost, slugFromTitle } from './blogApi';
import { useToast } from './useToast';
import '../../blog/Blog.css';
import './blogEditor.css';

const COVER_KEYS = [
  ['board', 'Dashboard'],
  ['curve', 'Forgetting curve'],
  ['sessions', 'Practice sessions'],
  ['factors', 'Scoring factors'],
  ['compare', 'Comparison'],
];
const COVER_KEY_SET = new Set(COVER_KEYS.map(([k]) => k));

// Snippets for the toolbar: [label, before, after, placeholder]
const TOOLS = [
  ['Heading', '\n## ', '\n', 'Section heading'],
  ['Bold', '**', '**', 'bold text'],
  ['Italic', '*', '*', 'italic text'],
  ['List', '\n- ', '\n- \n', 'item'],
  ['Quote', '\n> ', '\n', 'key idea'],
  ['Link', '[', '](https://)', 'text'],
  ['Image', '\n![', '](https://)\n', 'image caption'],
  ['Chart', '\n:::bars ', '\nnote: caption\nFirst | 0.50 | base\nSecond | 0.78 | model\n:::\n', 'Chart title'],
];

export default function SuperAdminBlogEditor() {
  const { id } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();
  const [post, setPost] = useState(isNew ? EMPTY_POST() : null);
  const lang = 'en'; // the blog is English only
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
        if (!found) { showToast('Post not found', 'error'); navigate('/corp/super-admin/blog', { replace: true }); return; }
        setPost({ ...EMPTY_POST(), ...found, en: { ...EMPTY_POST().en, ...found.en } });
      })
      .catch((err) => showToast(`Couldn't load: ${err.message}`, 'error'));
    return () => { alive = false; };
  }, [id, isNew, navigate, showToast]);

  const block = post?.[lang] || { title: '', excerpt: '', body: '' };
  const parsed = useMemo(() => parseMarkdown(block.body), [block.body]);

  const patch = useCallback((changes) => setPost((p) => ({ ...p, ...changes })), []);
  const patchLang = (changes) => setPost((p) => ({ ...p, [lang]: { ...p[lang], ...changes } }));

  const onTitle = (title) => {
    patchLang({ title });
    // The title of a new post fills the URL, until the slug is edited by hand.
    if (!slugTouched) patch({ slug: slugFromTitle(title) });
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
      showToast(saved.published ? 'Saved and published' : 'Draft saved');
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
      <Page title="Post" back={goBack}>
        <LoadingRows count={4} />
        {toastNode}
      </Page>
    );
  }

  const coverIsKey = COVER_KEY_SET.has(post.cover);

  return (
    <Page
      title={isNew ? 'New post' : (post.en.title || 'Post')}
      back={goBack}
      action={<Button onClick={() => save()} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>}
    >
      <div className="sa-blog-editor">
        <div className="sa-blog-form">
          <Section title="General" footer="The slug sets the post's address: /blog/slug. Lowercase Latin letters, digits and hyphens only.">
            <Row
              title="Published"
              subtitle={post.published ? 'Everyone can see it on the site' : 'A draft for now, only you can see it'}
              accessory={<Toggle checked={post.published} onChange={(published) => patch({ published })} label="Published" />}
            />
          </Section>

          <div className="sa-blog-fields">
            <Field label="Slug">
              <input className="sa-input" value={post.slug} onChange={(e) => { setSlugTouched(true); patch({ slug: e.target.value }); }} placeholder="e.g. memory-secrets" />
            </Field>
            <Field label="Date">
              <input className="sa-input" type="date" value={post.date} onChange={(e) => patch({ date: e.target.value })} />
            </Field>
            <Field label="Cover">
              <select
                className="sa-select"
                value={coverIsKey ? post.cover : 'url'}
                onChange={(e) => patch({ cover: e.target.value === 'url' ? 'https://' : e.target.value })}
              >
                {COVER_KEYS.map(([k, label]) => <option key={k} value={k}>{label}</option>)}
                <option value="url">My own image (link)</option>
              </select>
            </Field>
            {!coverIsKey && (
              <Field label="Image link" hint="Must start with https://">
                <input className="sa-input" value={post.cover} onChange={(e) => patch({ cover: e.target.value })} placeholder="https://..." />
              </Field>
            )}
          </div>

          <p className="sa-blog-lang-note">Posts are written in English.</p>
          <div className="sa-blog-fields">
            <Field label="Title">
              <input className="sa-input" value={block.title} onChange={(e) => onTitle(e.target.value)} />
            </Field>
            <Field label="Summary" hint="Shown in the list and when the link is shared.">
              <textarea className="sa-textarea" rows={2} value={block.excerpt} onChange={(e) => patchLang({ excerpt: e.target.value })} />
            </Field>
          </div>

          <div className="sa-blog-toolbar" role="toolbar" aria-label="Text tools">
            {TOOLS.map((t) => (
              <button key={t[0]} type="button" className="sa-blog-tool" onClick={() => insert(t)}>{t[0]}</button>
            ))}
            <select className="sa-blog-tool sa-blog-figure" value="" onChange={(e) => insertFigure(e.target.value)} aria-label="Add an illustration">
              <option value="">Illustration...</option>
              {COVER_KEYS.map(([k, label]) => <option key={k} value={k}>{label}</option>)}
            </select>
          </div>
          <Field label="Body" hint="Markdown: ## heading, **bold**, - list, > quote, [text](link), :::figure curve">
            <textarea ref={bodyRef} className="sa-textarea sa-blog-body" value={block.body} onChange={(e) => patchLang({ body: e.target.value })} spellCheck />
          </Field>

          {!isNew && (
            <Section>
              <Row title="Delete post" destructive onClick={() => setConfirmDelete(true)} chevron={false} />
            </Section>
          )}
        </div>

        <div className="sa-blog-preview">
          <p className="sa-blog-preview-label">Preview</p>
          <div className="bl-page bl-preview">
            <h1 className="sa-blog-preview-title">{block.title || 'Title'}</h1>
            <div className="bl-body">
              <BlogMarkdown blocks={parsed.blocks} lang={lang} />
            </div>
          </div>
        </div>
      </div>

      <ConfirmSheet
        open={confirmDelete}
        danger
        title="Delete this post?"
        message="This can't be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        busy={saving}
        onConfirm={remove}
        onCancel={() => setConfirmDelete(false)}
      />
      {toastNode}
    </Page>
  );
}
