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
