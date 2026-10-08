import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ChapterReaderView from '../Read/ChapterReaderView';
import { saveReadingProgress } from './readingProgress';
import './ChapterReader.css';

// Full-screen reader for a library book's chapter (Science, Health) inside the
// panels. The unit keeps only `reading: { book, topic }`; the text is loaded
// from the app's own data files when opened (big, so each is its own chunk).
// The screen itself is the same one the personal app uses (ChapterReaderView):
// tap-a-word meanings, Speak mode, themes, text size, pages marked as read.

const LOADERS = {
  science: () => import('../../data/scienceChapterText').then((m) => m.scienceChapterText),
  health: () => import('../../data/healthChapterText').then((m) => m.healthChapterText),
};

export const canRead = (reading) => Boolean(reading && LOADERS[reading.book]);

export default function ChapterReader({ reading, onClose, words = [] }) {
  const [chapter, setChapter] = useState(undefined); // undefined = loading, null = not found

  useEffect(() => {
    let alive = true;
    const load = LOADERS[reading?.book];
    if (!load) { setChapter(null); return undefined; }
    load().then((all) => { if (alive) setChapter(all[reading.topic] || null); }).catch(() => { if (alive) setChapter(null); });
    return () => { alive = false; };
  }, [reading?.book, reading?.topic]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prevOverflow; };
  }, []);

  return createPortal(
    <div className="cr-root" role="dialog" aria-modal="true" aria-label={reading?.topic}>
      {chapter === undefined ? (
        <p className="cr-state">…</p>
      ) : (
        <ChapterReaderView
          packId={`corp-${reading.book}`}
          topic={reading.topic}
          chapter={chapter}
          words={words}
          onBack={onClose}
          onFinish={onClose}
          onProgress={(page, total) => saveReadingProgress(reading, page, total)}
        />
      )}
    </div>,
    document.body,
  );
}
