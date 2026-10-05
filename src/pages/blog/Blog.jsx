import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Link2 } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { pickLang } from './posts';
import { useBlogPosts } from './useBlogPosts';
import { parseMarkdown } from './markdown';
import Markdown from './BlogMarkdown';
import Illustration from './illustrations';
import './Blog.css';

// The blog is written in English only, whatever language the rest of the site uses.
const LANG = 'en';

const UI = {
  en: { langLabel: 'Language', title: 'Blog', sub: 'On memory, learning and the work behind VOC.', read: 'Read', back: 'Blog', home: 'Home', minutes: (n) => `${n} min read`, byline: 'The VOC team', start: 'Start free', ctaTitle: 'Add your first word today.', toc: 'On this page', copy: 'Copy link', copied: 'Copied', next: 'Next post', latest: 'New', all: 'All posts', empty: 'No posts yet.', months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], date: (d, m, y) => `${m} ${d}, ${y}`, notice: 'This post is not available in this language yet.' },
};

function formatDate(iso, ui) {
  const [y, m, d] = String(iso).split('-').map(Number);
  return ui.date(d, ui.months[m - 1] || '', y);
}

function useDocumentMeta(title, description) {
  useEffect(() => {
    const prevTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute('content');
    document.title = title;
    if (meta && description) meta.setAttribute('content', description);
    return () => {
      document.title = prevTitle;
      if (meta && prevDesc != null) meta.setAttribute('content', prevDesc);
    };
  }, [title, description]);
}

/** Post cover: an https image URL, or one of the built-in illustrations. */
export function Cover({ post, lang }) {
  const c = pickLang(post, lang);
  if (/^https:\/\//i.test(post.cover || '')) {
    return <img className="bl-cover-img" src={post.cover} alt={c.title} loading="lazy" />;
  }
  return <Illustration name={post.cover || 'board'} lang={lang} />;
}

function Shell({ ui, children }) {
  return (
    <div className="bl-page" lang="en">
      <header className="bl-top">
        <Link to="/welcome" className="bl-brand" aria-label="VOCABRY">
          <img src="/logo.png" alt="" width="34" height="34" />
          <span>VOCABRY</span>
        </Link>
        <nav className="bl-nav" aria-label="Blog">
          <Link to="/blog">{ui.title}</Link>
          <Link to="/welcome">{ui.home}</Link>
        </nav>
        <div className="bl-top-end">
          <Link to="/register" className="bl-btn bl-btn--sm">{ui.start}</Link>
        </div>
      </header>
      {children}
      <footer className="bl-footer">
        <Link to="/welcome" className="bl-back"><ArrowLeft size={15} strokeWidth={2.2} aria-hidden="true" />{ui.home}</Link>
        <span>&copy; {new Date().getFullYear()} VOCABRY</span>
      </footer>
    </div>
  );
}

function ReadingProgress({ targetRef }) {
  const barRef = useRef(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = targetRef.current;
      const bar = barRef.current;
      if (!el || !bar) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.6;
      const done = Math.min(1, Math.max(0, (-rect.top + window.innerHeight * 0.2) / Math.max(1, total)));
      bar.style.transform = `scaleX(${done})`;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [targetRef]);
  return <div className="bl-progress" aria-hidden="true"><span ref={barRef} /></div>;
}

function Toc({ headings, title }) {
  const [active, setActive] = useState(headings[0]?.id);
  const reduce = useReducedMotion();
  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter(Boolean);
    if (!els.length || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: '-15% 0px -70% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;
  return (
    <nav className="bl-toc" aria-label={title}>
      <p>{title}</p>
      <ul>
        {headings.filter((h) => h.level === 2).map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={active === h.id ? 'is-active' : ''}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(h.id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function CopyLink({ ui }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch { /* clipboard blocked */ }
  };
  return (
    <button type="button" className="bl-copy" onClick={copy}>
      {done ? <Check size={16} strokeWidth={2.4} aria-hidden="true" /> : <Link2 size={16} strokeWidth={2.4} aria-hidden="true" />}
      {done ? ui.copied : ui.copy}
    </button>
  );
}

export function BlogIndex() {
  const lang = LANG;
  const ui = UI.en;
  const { posts } = useBlogPosts();
  useDocumentMeta(`${ui.title} — VOCABRY`, ui.sub);

  const [featured, ...rest] = posts;
  const fc = featured ? pickLang(featured, lang) : null;

  return (
    <Shell ui={ui}>
      <main className="bl-main">
        <header className="bl-head">
          <h1 className="bl-h1">{ui.title}</h1>
          <p className="bl-sub">{ui.sub}</p>
        </header>

        {!featured && <p className="bl-sub">{ui.empty}</p>}

        {featured && (
          <Link to={`/blog/${featured.slug}`} className="bl-feature">
            <div className="bl-feature-copy">
              <span className="bl-chip">{ui.latest}</span>
              <span className="bl-meta">{formatDate(featured.date, ui)} · {ui.minutes(featured.minutes || 1)}</span>
              <span className="bl-feature-title">{fc.title}</span>
              <span className="bl-feature-excerpt">{fc.excerpt}</span>
              <span className="bl-more">{ui.read}<ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" /></span>
            </div>
            <div className="bl-feature-cover"><Cover post={featured} lang={lang} /></div>
          </Link>
        )}

        {rest.length > 0 && (
          <section aria-label={ui.all} className="bl-rest">
            <h2 className="bl-rest-title">{ui.all}</h2>
            <ul className="bl-list">
              {rest.map((post) => {
                const c = pickLang(post, lang);
                return (
                  <li key={post.slug}>
                    <Link to={`/blog/${post.slug}`} className="bl-row">
                      <div className="bl-row-cover"><Cover post={post} lang={lang} /></div>
                      <div className="bl-row-copy">
                        <span className="bl-meta">{formatDate(post.date, ui)} · {ui.minutes(post.minutes || 1)}</span>
                        <span className="bl-row-title">{c.title}</span>
                        <span className="bl-row-excerpt">{c.excerpt}</span>
                        <span className="bl-more">{ui.read}<ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" /></span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </main>
    </Shell>
  );
}

export function BlogPost() {
  const { slug } = useParams();
  const lang = LANG;
  const ui = UI.en;
  const { posts, loading } = useBlogPosts();
  const post = posts.find((p) => p.slug === slug) || null;
  const c = post ? pickLang(post, lang) : null;
  const parsed = useMemo(() => parseMarkdown(c?.body || ''), [c?.body]);
  const articleRef = useRef(null);
  useDocumentMeta(c ? `${c.title} — VOCABRY` : `${ui.title} — VOCABRY`, c?.excerpt);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!post) {
    return (
      <Shell ui={ui}>
        <main className="bl-main">
          <h1 className="bl-h1">{loading ? '…' : '404'}</h1>
          <Link to="/blog" className="bl-back"><ArrowLeft size={15} strokeWidth={2.2} aria-hidden="true" />{ui.back}</Link>
        </main>
      </Shell>
    );
  }

  const idx = posts.findIndex((p) => p.slug === slug);
  const next = posts[idx + 1] || posts[0];
  const nextPost = next && next.slug !== slug ? next : null;
  const nc = nextPost ? pickLang(nextPost, lang) : null;

  return (
    <Shell ui={ui}>
      <ReadingProgress targetRef={articleRef} />
      <article className="bl-article" ref={articleRef}>
        <header className="bl-article-head">
          <Link to="/blog" className="bl-back"><ArrowLeft size={15} strokeWidth={2.2} aria-hidden="true" />{ui.back}</Link>
          <p className="bl-meta">{formatDate(post.date, ui)} · {ui.minutes(post.minutes || 1)} · {ui.byline}</p>
          <h1 className="bl-h1">{c.title}</h1>
          {c.excerpt && <p className="bl-lede">{c.excerpt}</p>}
        </header>

        <div className="bl-article-cover"><Cover post={post} lang={lang} /></div>

        <div className="bl-article-grid">
          <div className="bl-body">
            <Markdown blocks={parsed.blocks} lang={lang} />
            <div className="bl-share"><CopyLink ui={ui} /></div>
          </div>
          <aside className="bl-aside"><Toc headings={parsed.headings} title={ui.toc} /></aside>
        </div>

        {nextPost && (
          <Link to={`/blog/${nextPost.slug}`} className="bl-next">
            <span className="bl-meta">{ui.next}</span>
            <span className="bl-next-title">{nc.title}</span>
            <span className="bl-more">{ui.read}<ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" /></span>
          </Link>
        )}

        <div className="bl-cta">
          <h2>{ui.ctaTitle}</h2>
          <Link to="/register" className="bl-btn">{ui.start}<ArrowRight size={18} strokeWidth={2.4} aria-hidden="true" /></Link>
        </div>
      </article>
    </Shell>
  );
}
