// IndexedDB behind the offline layer. Three stores:
//   entries  the offline copy of what the database sent us   { path, segs, value }
//   outbox   writes made here that the server has not acknowledged yet
//   meta     small facts (whose data this is)
// Everything degrades to "nothing is stored" when IndexedDB is unavailable
// (private mode, old WebView, tests): the app then simply behaves online-only.

const DB_NAME = 'voc-offline';
const DB_VERSION = 1;

let dbPromise = null;

function open() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve) => {
    try {
      if (typeof indexedDB === 'undefined') { resolve(null); return; }
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains('entries')) db.createObjectStore('entries', { keyPath: 'path' });
        if (!db.objectStoreNames.contains('outbox')) db.createObjectStore('outbox', { keyPath: 'id', autoIncrement: true });
        if (!db.objectStoreNames.contains('meta')) db.createObjectStore('meta', { keyPath: 'k' });
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
      req.onblocked = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
  return dbPromise;
}

function run(store, mode, fn) {
  return open().then((db) => {
    if (!db) return undefined;
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(store, mode);
        const result = fn(tx.objectStore(store));
        tx.oncomplete = () => resolve(result && 'result' in result ? result.result : undefined);
        tx.onerror = () => resolve(undefined);
        tx.onabort = () => resolve(undefined);
      } catch {
        resolve(undefined);
      }
    });
  });
}

export const storage = {
  available: () => open().then(Boolean),

  loadEntries: () => run('entries', 'readonly', (s) => s.getAll()).then((r) => r || []),
  saveEntries: (puts, deletes) => run('entries', 'readwrite', (s) => {
    puts.forEach((e) => s.put(e));
    deletes.forEach((k) => s.delete(k));
  }),
  clearEntries: () => run('entries', 'readwrite', (s) => s.clear()),

  loadOutbox: () => run('outbox', 'readonly', (s) => s.getAll()).then((r) => r || []),
  addOutbox: (item) => run('outbox', 'readwrite', (s) => s.add(item)),
  deleteOutbox: (id) => run('outbox', 'readwrite', (s) => s.delete(id)),
  clearOutbox: () => run('outbox', 'readwrite', (s) => s.clear()),

  getMeta: (k) => run('meta', 'readonly', (s) => s.get(k)).then((r) => (r ? r.v : undefined)),
  setMeta: (k, v) => run('meta', 'readwrite', (s) => s.put({ k, v })),
};
