import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useSiteLanguage } from '../../utils/useSiteLanguage';
import { POSTS, getPost, pickLang } from './posts';
import './Blog.css';

const LANGS = ['uz', 'ru', 'en'];

const UI = {
  uz: { langLabel: 'Til', title: 'Blog', sub: "Xotira, o'rganish va VOC ortidagi ishlar haqida.", read: "O'qish", back: 'Blog', home: 'Bosh sahifa', minutes: (n) => `${n} daqiqa`, start: 'Bepul boshlash', ctaTitle: "Birinchi so'zingizni bugun qo'shing.", months: ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'], date: (d, m, y) => `${d}-${m}, ${y}`, notice: null },
  ru: { langLabel: 'Язык', title: 'Блог', sub: 'О памяти, обучении и о том, что стоит за VOC.', read: 'Читать', back: 'Блог', home: 'На главную', minutes: (n) => `${n} мин`, start: 'Начать бесплатно', ctaTitle: 'Добавьте первое слово сегодня.', months: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'], date: (d, m, y) => `${d} ${m} ${y}`, notice: 'Статьи пока доступны на узбекском и английском языках.' },
  en: { langLabel: 'Language', title: 'Blog', sub: 'On memory, learning and the work behind VOC.', read: 'Read', back: 'Blog', home: 'Home', minutes: (n) => `${n} min read`, start: 'Start free', ctaTitle: 'Add your first word today.', months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], date: (d, m, y) => `${m} ${d}, ${y}`, notice: null },
};

function formatDate(iso, ui) {
  const [y, m, d] = iso.split('-').map(Number);
  return ui.date(d, ui.months[m - 1], y);
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

function Shell({ ui, lang, setLanguage, children }) {
  return (
    <div className="bl-page">
      <header className="bl-top">
        <Link to="/welcome" className="bl-brand" aria-label="VOCABRY">
          <img src="/logo.png" alt="" width="34" height="34" />
          <span>VOCABRY</span>
        </Link>
        <div className="bl-top-end">
          <div className="bl-lang" role="group" aria-label={ui.langLabel}>
            {LANGS.map((code) => (
              <button key={code} type="button" className={lang === code ? 'is-on' : ''} aria-pressed={lang === code} onClick={() => setLanguage(code)}>
                {code.toUpperCase()}
              </button>
            ))}
          </div>
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

function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2>{block.text}</h2>;
    case 'ul':
      return <ul>{block.items.map((it) => <li key={it}>{it}</li>)}</ul>;
    case 'quote':
      return <blockquote>{block.text}</blockquote>;
    case 'bars':
      return (
        <figure className="bl-bars">
          <figcaption>{block.title}</figcaption>
          {block.rows.map((r) => (
            <div key={r.label} className="bl-bar-row">
              <div className="bl-bar-label"><span>{r.label}</span><strong>{r.value.toFixed(2)}</strong></div>
              <div className="bl-bar-track"><span className={`bl-bar-fill bl-bar-fill--${r.tone || 'base'}`} style={{ width: `${r.value * 100}%` }} /></div>
            </div>
          ))}
          {block.note && <p className="bl-bars-note">{block.note}</p>}
        </figure>
      );
    default:
      return <p>{block.text}</p>;
  }
}

export function BlogIndex() {
  const { lang, setLanguage } = useSiteLanguage();
  const ui = UI[lang];
  useDocumentMeta(`${ui.title} — VOCABRY`, ui.sub);

  return (
    <Shell ui={ui} lang={lang} setLanguage={setLanguage}>
      <main className="bl-main">
        <h1 className="bl-h1">{ui.title}</h1>
        <p className="bl-sub">{ui.sub}</p>
        {ui.notice && <p className="bl-notice">{ui.notice}</p>}
        <ul className="bl-list">
          {POSTS.map((post) => {
            const c = pickLang(post, lang);
            return (
              <li key={post.slug}>
                <Link to={`/blog/${post.slug}`} className="bl-item">
                  <span className="bl-meta">{formatDate(post.date, ui)} · {ui.minutes(post.minutes)}</span>
                  <span className="bl-item-title">{c.title}</span>
                  <span className="bl-item-excerpt">{c.excerpt}</span>
                  <span className="bl-item-more">{ui.read}<ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" /></span>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </Shell>
  );
}

export function BlogPost() {
  const { slug } = useParams();
  const { lang, setLanguage } = useSiteLanguage();
  const ui = UI[lang];
  const post = getPost(slug);
  const c = post ? pickLang(post, lang) : null;
  useDocumentMeta(c ? `${c.title} — VOCABRY` : `${ui.title} — VOCABRY`, c?.excerpt);

  if (!post) {
    return (
      <Shell ui={ui} lang={lang} setLanguage={setLanguage}>
        <main className="bl-main">
          <h1 className="bl-h1">404</h1>
          <Link to="/blog" className="bl-back"><ArrowLeft size={15} strokeWidth={2.2} aria-hidden="true" />{ui.back}</Link>
        </main>
      </Shell>
    );
  }

  return (
    <Shell ui={ui} lang={lang} setLanguage={setLanguage}>
      <article className="bl-main bl-article">
        <Link to="/blog" className="bl-back"><ArrowLeft size={15} strokeWidth={2.2} aria-hidden="true" />{ui.back}</Link>
        <p className="bl-meta">{formatDate(post.date, ui)} · {ui.minutes(post.minutes)}</p>
        <h1 className="bl-h1">{c.title}</h1>
        {ui.notice && !post[lang] && <p className="bl-notice">{ui.notice}</p>}
        <div className="bl-body">
          {c.body.map((block, i) => <Block key={i} block={block} />)}
        </div>
        <div className="bl-cta">
          <h2>{ui.ctaTitle}</h2>
          <Link to="/register" className="bl-btn">{ui.start}<ArrowRight size={18} strokeWidth={2.4} aria-hidden="true" /></Link>
        </div>
      </article>
    </Shell>
  );
}
