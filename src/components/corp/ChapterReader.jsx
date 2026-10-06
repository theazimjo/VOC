import { Fragment, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import './ChapterReader.css';

// Full-screen reader for a library book's chapter (Science, Health). The text
// is not stored with the course: the unit keeps `reading: { book, topic }`
// and the text is loaded from the app's own data files when it is opened
// (they are big, so each is a separate chunk loaded on demand).

const LOADERS = {
  science: () => import('../../data/scienceChapterText').then((m) => m.scienceChapterText),
  health: () => import('../../data/healthChapterText').then((m) => m.healthChapterText),
};

export const canRead = (reading) => Boolean(reading && LOADERS[reading.book]);

// "{{carry out}}" marks a vocabulary phrase in the text.
function Inline({ text }) {
  return String(text).split(/(\{\{.+?\}\})/g).map((part, i) => (
    /^\{\{.+\}\}$/.test(part)
      ? <mark key={i} className="cr-term">{part.slice(2, -2)}</mark>
      : <Fragment key={i}>{part}</Fragment>
  ));
}

// Consecutive summary / review blocks read as one bullet list.
function groupBlocks(blocks) {
  const out = [];
  blocks.forEach((b) => {
    const last = out[out.length - 1];
    if ((b.type === 'summary' || b.type === 'review') && last && last.type === b.type) last.items.push(b.text);
    else if (b.type === 'summary' || b.type === 'review') out.push({ type: b.type, items: [b.text] });
    else out.push(b);
  });
  return out;
}

function Block({ block, labels }) {
  switch (block.type) {
    case 'heading':
      return <h3 className="cr-heading">{block.text}</h3>;
    case 'p':
      return <p className="cr-p"><Inline text={block.text} /></p>;
    case 'activity':
      return <aside className="cr-box is-activity"><b>{labels.activity}</b><p><Inline text={block.text} /></p></aside>;
    case 'sidebar':
      return <aside className="cr-box"><p><Inline text={block.text} /></p></aside>;
    case 'summary':
    case 'review':
      return (
        <aside className="cr-box is-summary">
          <b>{block.type === 'summary' ? labels.summary : labels.review}</b>
          <ul>{block.items.map((t, i) => <li key={i}><Inline text={t} /></li>)}</ul>
        </aside>
      );
    case 'image-group':
      return (
        <div className="cr-images">
          {(block.images || []).map((img, i) => (
            <figure key={i}>
              <img src={img.src} alt={img.caption || ''} loading="lazy" />
              {img.caption && <figcaption>{img.caption}</figcaption>}
            </figure>
          ))}
        </div>
      );
    default:
      return null;
  }
}

export default function ChapterReader({ reading, onClose, labels }) {
  const [chapter, setChapter] = useState(undefined); // undefined = loading, null = not found
  const [page, setPage] = useState(0);

  useEffect(() => {
    let alive = true;
    setChapter(undefined);
    setPage(0);
    const load = LOADERS[reading?.book];
    if (!load) { setChapter(null); return undefined; }
    load().then((all) => { if (alive) setChapter(all[reading.topic] || null); }).catch(() => { if (alive) setChapter(null); });
    return () => { alive = false; };
  }, [reading?.book, reading?.topic]); // eslint-disable-line react-hooks/exhaustive-deps

  const pages = useMemo(() => chapter?.pages || [], [chapter]);
  const last = pages.length - 1;
  const go = (n) => setPage((p) => Math.min(Math.max(p + n, 0), last));

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') setPage((p) => Math.min(p + 1, Math.max(last, 0)));
      else if (e.key === 'ArrowLeft') setPage((p) => Math.max(p - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prevOverflow; window.removeEventListener('keydown', onKey); };
  }, [onClose, last]);

  useEffect(() => { document.querySelector('.cr-scroll')?.scrollTo({ top: 0 }); }, [page]);

  return createPortal(
    <div className="cr-root" role="dialog" aria-modal="true" aria-label={chapter?.title || reading?.topic}>
      <header className="cr-head">
        <div className="cr-head-text">
          <span className="cr-kicker">{reading?.topic}</span>
          <h2 className="cr-title">{chapter?.title || reading?.topic}</h2>
        </div>
        <button type="button" className="cr-close" onClick={onClose} aria-label={labels.close}><X size={18} /></button>
      </header>

      <div className="cr-scroll">
        <div className="cr-page">
          {chapter === undefined && <p className="cr-state">{labels.loading}</p>}
          {chapter === null && <p className="cr-state">{labels.missing}</p>}
          {chapter && groupBlocks(pages[page] || []).map((b, i) => <Block key={`${page}-${i}`} block={b} labels={labels} />)}
        </div>
      </div>

      {chapter && pages.length > 0 && (
        <footer className="cr-foot">
          <button type="button" className="cr-nav" onClick={() => go(-1)} disabled={page === 0}>
            <ChevronLeft size={18} /> <span>{labels.prev}</span>
          </button>
          <span className="cr-count">{page + 1} / {pages.length}</span>
          <button type="button" className="cr-nav is-next" onClick={() => go(1)} disabled={page === last}>
            <span>{labels.next}</span> <ChevronRight size={18} />
          </button>
        </footer>
      )}
    </div>,
    document.body,
  );
}
