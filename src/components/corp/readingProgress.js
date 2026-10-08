// Where the reader stopped in a chapter, so reopening it continues there and
// the topic page can say "Continue · page 5 of 24" without loading the text.
const key = (reading) => `voc-read:${reading?.book}:${reading?.topic}`;

export function getReadingProgress(reading) {
  try {
    const raw = JSON.parse(localStorage.getItem(key(reading)) || 'null');
    if (raw && Number.isInteger(raw.page) && Number.isInteger(raw.total) && raw.total > 0) return raw;
  } catch { /* unreadable: start from the beginning */ }
  return null;
}

export function saveReadingProgress(reading, page, total) {
  try { localStorage.setItem(key(reading), JSON.stringify({ page, total })); } catch { /* storage full or blocked */ }
}

const SIZE_KEY = 'voc-reader-size';
export const READER_SIZES = [0.9, 1, 1.12, 1.26, 1.42];

export function getReaderSize() {
  try {
    const n = Number(localStorage.getItem(SIZE_KEY));
    return Number.isInteger(n) && n >= 0 && n < READER_SIZES.length ? n : 1;
  } catch { return 1; }
}

export function saveReaderSize(n) {
  try { localStorage.setItem(SIZE_KEY, String(n)); } catch { /* storage blocked */ }
}
