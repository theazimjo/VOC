import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronLeft, ChevronRight, Minus, Plus, X } from 'lucide-react';
import { READER_SIZES, getReaderSize, getReadingProgress, saveReaderSize, saveReadingProgress } from './readingProgress';
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
  const [size, setSize] = useState(getReaderSize);
  const touchRef = useRef(null);

  useEffect(() => {
    let alive = true;
    setChapter(undefined);
    setPage(0);
    const load = LOADERS[reading?.book];
    if (!load) { setChapter(null); return undefined; }
    load().then((all) => {
      if (!alive) return;
      const found = all[reading.topic] || null;
      setChapter(found);
      // pick up where the reader stopped last time
      const saved = getReadingProgress(reading);
      if (found && saved) setPage(Math.min(saved.page, Math.max((found.pages || []).length - 1, 0)));
    }).catch(() => { if (alive) setChapter(null); });
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

  // remember the page (and the page count, for the topic page's "Continue")
  useEffect(() => {
    if (chapter && pages.length > 0) saveReadingProgress(reading, page, pages.length);
  }, [chapter, pages.length, page]); // eslint-disable-line react-hooks/exhaustive-deps

  const bump = (d) => setSize((n) => {
    const next = Math.min(Math.max(n + d, 0), READER_SIZES.length - 1);
    saveReaderSize(next);
    return next;
  });

  // swipe to turn the page on touch screens
  const onTouchStart = (e) => { const t = e.touches[0]; touchRef.current = { x: t.clientX, y: t.clientY }; };
  const onTouchEnd = (e) => {
    const start = touchRef.current;
    touchRef.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.6) go(dx < 0 ? 1 : -1);
  };

  return createPortal(
    <div className="cr-root" role="dialog" aria-modal="true" aria-label={chapter?.title || reading?.topic}>
      <header className="cr-head">
        <div className="cr-head-text">
          <span className="cr-kicker">{reading?.topic}</span>
          <h2 className="cr-title">{chapter?.title || reading?.topic}</h2>
        </div>
        <div className="cr-tools">
          <button type="button" className="cr-tool" onClick={() => bump(-1)} disabled={size === 0} aria-label={labels.smaller || 'Smaller text'}><Minus size={15} /><span aria-hidden="true">A</span></button>
          <button type="button" className="cr-tool is-big" onClick={() => bump(1)} disabled={size === READER_SIZES.length - 1} aria-label={labels.larger || 'Larger text'}><Plus size={15} /><span aria-hidden="true">A</span></button>
          <button type="button" className="cr-close" onClick={onClose} aria-label={labels.close}><X size={18} /></button>
        </div>
      </header>
      {chapter && pages.length > 1 && (
        <div className="cr-progress" role="progressbar" aria-valuemin={1} aria-valuemax={pages.length} aria-valuenow={page + 1}>
          <span style={{ width: `${((page + 1) / pages.length) * 100}%` }} />
        </div>
      )}

      <div className="cr-scroll" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={{ '--cr-scale': READER_SIZES[size] }}>
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
          {page === last ? (
            <button type="button" className="cr-nav is-next" onClick={onClose}>
              <span>{labels.done || 'Done'}</span> <Check size={18} />
            </button>
          ) : (
            <button type="button" className="cr-nav is-next" onClick={() => go(1)}>
              <span>{labels.next}</span> <ChevronRight size={18} />
            </button>
          )}
        </footer>
      )}
    </div>,
    document.body,
  );
}
