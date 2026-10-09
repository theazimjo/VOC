// Offline layer for the Realtime Database. The app imports 'firebase/database';
// vite.config.js points that name at this file, which re-exports everything from
// the real SDK and replaces the functions the app uses so that it keeps working
// without a connection:
//
//   reads    every value the server sends is also kept on the device (IndexedDB).
//            A listener that has nothing from the server yet is answered from
//            that copy (instant start, and the only source when offline); the
//            real data takes over the moment it arrives.
//   writes   set / update / remove / push are applied to the device copy at once
//            and stored in an outbox until the server confirms them, so they
//            survive a closed tab or restart and go out when the connection is back.
//
// Nothing in the app had to change. Without IndexedDB it all degrades to the
// plain online SDK.

import * as real from '@firebase/database';
import { getApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Tree, getIn, isPrefix, joinPath, splitPath, expandUpdate } from './tree';
import { storage } from './storage';
import { setOfflineStatus } from './status';

export * from '@firebase/database';

const tree = new Tree();
const dirty = new Set();
const listeners = new Set(); // listeners that can be answered from the device copy
const childShared = new Map(); // path -> state shared by the child listeners on it

let connected = null; // null = not known yet
let everConnected = false;
const startedAt = Date.now();
let currentUid = null;
let pending = 0;
let initPromise = null;
let flushTimer = null;

// ───────────────────────── helpers ─────────────────────────

// "No connection": the browser says so, or the database connection dropped, or it has
// not come up for a few seconds after start (it always reports "not connected" first).
const isOffline = () => (typeof navigator !== 'undefined' && navigator.onLine === false)
  || (connected === false && (everConnected || Date.now() - startedAt > 4000));

function refSegs(query) {
  try {
    if (query?._queryParams && typeof query._queryParams.loadsAllData === 'function' && !query._queryParams.loadsAllData()) return null;
    const url = new URL(query.toString());
    const segs = url.pathname.split('/').filter(Boolean).map((s) => decodeURIComponent(s));
    if (segs[0] === '.info') return null;
    return segs;
  } catch {
    return null;
  }
}

function markDirty(paths) {
  if (!paths || paths.length === 0) return;
  paths.forEach((p) => dirty.add(p));
  if (!flushTimer) flushTimer = setTimeout(flush, 2500);
}

async function flush() {
  flushTimer = null;
  if (dirty.size === 0) return;
  const puts = [];
  const deletes = [];
  dirty.forEach((path) => {
    const e = tree.entries.get(path);
    if (e) puts.push({ path, segs: e.segs, value: e.value });
    else deletes.push(path);
  });
  dirty.clear();
  await storage.saveEntries(puts, deletes);
}

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush(); });
  window.addEventListener('pagehide', () => { flush(); });
}

function publishStatus() {
  setOfflineStatus({ online: !isOffline(), pending });
}

// ───────────────────────── snapshots ─────────────────────────

const keyOrder = (a, b) => {
  const an = /^(0|[1-9]\d*)$/.test(a) && Number(a) < 2147483648;
  const bn = /^(0|[1-9]\d*)$/.test(b) && Number(b) < 2147483648;
  if (an && bn) return Number(a) - Number(b);
  if (an) return -1;
  if (bn) return 1;
  return a < b ? -1 : a > b ? 1 : 0;
};

// Stands in for a DataSnapshot when the answer comes from the device copy.
class CachedSnapshot {
  constructor(ref, segs, value) {
    this._ref = ref;
    this._segs = segs;
    this._value = value === undefined ? null : value;
  }

  get key() { return this._segs.length ? this._segs[this._segs.length - 1] : null; }

  get ref() { return this._ref; }

  get size() { return this.numChildren(); }

  val() { return this._value; }

  exportVal() { return this._value; }

  toJSON() { return this._value; }

  exists() { return this._value !== null; }

  getPriority() { return null; }

  child(path) {
    const rel = splitPath(path);
    const v = getIn(this._value, rel);
    const snap = new CachedSnapshot(null, [...this._segs, ...rel], v === undefined ? null : v);
    Object.defineProperty(snap, 'ref', { get: () => real.child(this._ref, path) });
    return snap;
  }

  hasChild(path) { return getIn(this._value, splitPath(path)) != null; }

  hasChildren() { return this._value !== null && typeof this._value === 'object' && Object.keys(this._value).length > 0; }

  numChildren() { return this.hasChildren() ? Object.keys(this._value).length : 0; }

  forEach(action) {
    if (!this.hasChildren()) return false;
    const keys = Object.keys(this._value).sort(keyOrder);
    for (let i = 0; i < keys.length; i += 1) {
      if (action(this.child(keys[i])) === true) return true;
    }
    return false;
  }
}

// A real snapshot whose val() is computed once: we need the value for the device
// copy and the app asks for it again.
function memoSnapshot(snap) {
  const out = Object.create(snap);
  let cached;
  let done = false;
  out.val = () => {
    if (!done) { cached = snap.val(); done = true; }
    return cached;
  };
  return out;
}

// ───────────────────────── startup ─────────────────────────

async function handleUser(user) {
  const uid = user?.uid || null;
  if (uid === currentUid) return false;
  currentUid = uid;
  if (!uid) {
    // signed out: the next person on this device must not see this copy
    tree.clear();
    dirty.clear();
    await storage.clearEntries();
    return true;
  }
  const owner = await storage.getMeta('uid');
  if (owner && owner !== uid) {
    tree.clear();
    await storage.clearEntries();
    await storage.clearOutbox();
  } else if (!tree.entries.size) {
    tree.load(await storage.loadEntries());
  }
  await storage.setMeta('uid', uid);
  return true;
}

async function replayOutbox() {
  const items = await storage.loadOutbox();
  const mine = items.filter((it) => it.uid === currentUid).sort((a, b) => a.id - b.id);
  const stale = items.filter((it) => it.uid !== currentUid);
  await Promise.all(stale.map((it) => storage.deleteOutbox(it.id)));
  if (!mine.length) return;
  const db = real.getDatabase(getApp());
  pending += mine.length;
  publishStatus();
  mine.forEach((it) => {
    const r = real.ref(db, it.path);
    const op = it.kind === 'update' ? real.update(r, it.value) : it.kind === 'remove' ? real.remove(r) : real.set(r, it.value);
    op.then(() => storage.deleteOutbox(it.id), (err) => {
      console.warn('[offline] dropped a queued write the server refused:', it.path, err?.message);
      return storage.deleteOutbox(it.id);
    }).finally(() => { pending = Math.max(0, pending - 1); publishStatus(); });
  });
}

function init() {
  if (initPromise) return initPromise;
  initPromise = (async () => {
    let auth;
    let db;
    try {
      const app = getApp();
      auth = getAuth(app);
      db = real.getDatabase(app);
    } catch {
      return;
    }
    real.onValue(real.ref(db, '.info/connected'), (snap) => {
      connected = snap.val() === true;
      if (connected) everConnected = true;
      publishStatus();
    });
    if (typeof window !== 'undefined') {
      window.addEventListener('online', publishStatus);
      window.addEventListener('offline', publishStatus);
    }
    try { await auth.authStateReady(); } catch { /* old SDK: carry on */ }
    await handleUser(auth.currentUser);
    onAuthStateChanged(auth, (u) => { handleUser(u).then((changed) => { if (changed && u) replayOutbox(); }); });
    if (auth.currentUser) await replayOutbox();
    publishStatus();
  })().catch((err) => console.warn('[offline] could not start:', err));
  return initPromise;
}

// ───────────────────────── local write notifications ─────────────────────────

function notifyLocalWrites(writes) {
  listeners.forEach((l) => {
    if (writes.some((w) => isPrefix(w.segs, l.segs) || isPrefix(l.segs, w.segs))) l.emit();
  });
}

// ───────────────────────── reads ─────────────────────────

function normalizeListenArgs(a3, a4) {
  if (typeof a3 === 'function') return { cancel: a3, opts: a4 };
  return { cancel: undefined, opts: a3 && typeof a3 === 'object' ? a3 : a4 };
}

const realArgs = (cancel, opts) => (opts ? (cancel ? [cancel, opts] : [opts]) : cancel ? [cancel] : []);

export function onValue(query, callback, a3, a4) {
  const { cancel, opts } = normalizeListenArgs(a3, a4);
  const segs = refSegs(query);
  if (!segs) return real.onValue(query, callback, ...realArgs(cancel, opts));

  const state = { realFired: false, stopped: false, last: undefined };
  const entry = { segs, emit: null };
  entry.emit = () => {
    if (state.stopped || state.realFired) return;
    const r = tree.lookupAssembled(segs);
    if (!r.found || state.last === r.value) return;
    state.last = r.value;
    callback(new CachedSnapshot(query, segs, r.value));
  };

  const off = real.onValue(query, (snap) => {
    state.realFired = true;
    const s = memoSnapshot(snap);
    markDirty(tree.record(segs, s.val()));
    callback(s);
  }, ...realArgs(cancel, opts));

  listeners.add(entry);
  init().then(() => {
    if (state.stopped) return;
    if (opts?.onlyOnce) {
      // a one-shot read: use the copy only when the server is clearly not answering
      setTimeout(() => {
        if (state.stopped || state.realFired) return;
        const r = tree.lookupAssembled(segs);
        if (!r.found) return;
        state.stopped = true;
        listeners.delete(entry);
        off();
        callback(new CachedSnapshot(query, segs, r.value));
      }, isOffline() ? 0 : 2500);
      return;
    }
    entry.emit();
  });

  return () => { state.stopped = true; listeners.delete(entry); off(); };
}

export function get(query) {
  const segs = refSegs(query);
  if (!segs) return real.get(query);
  return init().then(() => new Promise((resolve, reject) => {
    const fromCopy = () => {
      const r = tree.lookupAssembled(segs);
      return r.found ? new CachedSnapshot(query, segs, r.value) : null;
    };
    if (isOffline()) {
      const c = fromCopy();
      if (c) { resolve(c); return; }
    }
    let settled = false;
    // While the connection is still coming up (app start), a copy we already have
    // answers after a short wait instead of holding the screen; the server's answer
    // still lands in the copy for the next read.
    const timer = setTimeout(() => {
      if (settled) return;
      const c = fromCopy();
      if (c) { settled = true; resolve(c); }
    }, connected === true ? 3000 : 1200);
    real.get(query).then((snap) => {
      clearTimeout(timer);
      const s = memoSnapshot(snap);
      markDirty(tree.record(segs, s.val()));
      if (!settled) { settled = true; resolve(s); }
    }, (err) => {
      clearTimeout(timer);
      if (settled) return;
      settled = true;
      const c = fromCopy();
      if (c) resolve(c); else reject(err);
    });
  }));
}

// Child listeners share one record per path: whether the server has spoken yet,
// which children it has confirmed, and who wants to hear about removals.
function sharedFor(path) {
  let s = childShared.get(path);
  if (!s) {
    s = { realFired: false, realSeen: new Set(), syntheticKeys: new Set(), removedCallbacks: new Set(), timer: null };
    childShared.set(path, s);
  }
  return s;
}

function scheduleReconcile(shared, segs, query) {
  clearTimeout(shared.timer);
  // the server's first burst of children is over: whatever the device copy showed
  // that the server did not send is gone
  shared.timer = setTimeout(() => {
    shared.syntheticKeys.forEach((key) => {
      if (shared.realSeen.has(key)) return;
      const childSegs = [...segs, key];
      const last = tree.lookup(childSegs).value;
      markDirty(tree.record(childSegs, null));
      shared.removedCallbacks.forEach((cb) => cb(new CachedSnapshot(real.child(query, key), childSegs, last)));
    });
    shared.syntheticKeys.clear();
  }, 2000);
}

function childListener(kind, query, callback, a3, a4) {
  const realFn = { added: real.onChildAdded, changed: real.onChildChanged, removed: real.onChildRemoved }[kind];
  const { cancel, opts } = normalizeListenArgs(a3, a4);
  const segs = refSegs(query);
  if (!segs) return realFn(query, callback, ...realArgs(cancel, opts));

  const shared = sharedFor(joinPath(segs));
  const state = { stopped: false, emitted: null };
  const entry = { segs, emit: null };

  const childSnap = (key, value) => {
    const snap = new CachedSnapshot(null, [...segs, key], value);
    Object.defineProperty(snap, 'ref', { get: () => real.child(query, key) });
    return snap;
  };

  entry.emit = () => {
    if (state.stopped || shared.realFired) return;
    const { found, children } = tree.lookupChildren(segs);
    if (!found && !state.emitted) return;
    const now = children;
    const before = state.emitted || new Map();
    if (kind === 'added') {
      now.forEach((v, k) => { if (!before.has(k)) { shared.syntheticKeys.add(k); callback(childSnap(k, v), null); } });
    } else if (kind === 'changed') {
      if (state.emitted) now.forEach((v, k) => { if (before.has(k) && before.get(k) !== v) callback(childSnap(k, v), null); });
    } else if (state.emitted) {
      before.forEach((v, k) => { if (!now.has(k)) callback(childSnap(k, v)); });
    }
    state.emitted = new Map(now);
  };

  const off = realFn(query, (snap, prevKey) => {
    const s = memoSnapshot(snap);
    const childSegs = [...segs, snap.key];
    shared.realFired = true;
    if (kind === 'removed') {
      shared.realSeen.delete(snap.key);
      markDirty(tree.record(childSegs, null));
    } else {
      shared.realSeen.add(snap.key);
      markDirty(tree.record(childSegs, s.val()));
    }
    if (kind === 'added') scheduleReconcile(shared, segs, query);
    callback(s, prevKey);
  }, ...realArgs(cancel, opts));

  if (kind === 'removed') shared.removedCallbacks.add(callback);
  listeners.add(entry);
  init().then(() => { if (!state.stopped) entry.emit(); });

  return () => {
    state.stopped = true;
    listeners.delete(entry);
    shared.removedCallbacks.delete(callback);
    off();
  };
}

export const onChildAdded = (query, cb, a3, a4) => childListener('added', query, cb, a3, a4);
export const onChildChanged = (query, cb, a3, a4) => childListener('changed', query, cb, a3, a4);
export const onChildRemoved = (query, cb, a3, a4) => childListener('removed', query, cb, a3, a4);

// ───────────────────────── writes ─────────────────────────

// Applies the write to the device copy, stores it in the outbox and sends it.
// Resolves when the server has confirmed it - or straight away when there is no
// connection, because from then on the outbox guarantees delivery.
function localWrite(kind, ref, value) {
  const segs = refSegs(ref);
  if (!segs) return real[kind](ref, value);
  init();

  const writes = kind === 'update' ? expandUpdate(segs, value) : [{ segs, value: kind === 'remove' ? null : value }];
  markDirty(tree.applyWrites(writes));

  const item = { kind, path: joinPath(segs), value: kind === 'remove' ? null : value, uid: currentUid, ts: Date.now() };
  const stored = currentUid ? storage.addOutbox(item) : Promise.resolve(undefined);
  pending += 1;
  publishStatus();

  const offlineNow = isOffline();
  const sent = real[kind](ref, value);
  const finish = () => { pending = Math.max(0, pending - 1); publishStatus(); };
  const done = sent.then(
    () => { stored.then((id) => { if (id !== undefined) storage.deleteOutbox(id); }); finish(); },
    (err) => { stored.then((id) => { if (id !== undefined) storage.deleteOutbox(id); }); finish(); throw err; },
  );
  done.catch(() => {});

  notifyLocalWrites(writes);

  if (offlineNow || connected !== true) return stored.then(() => undefined);
  return Promise.race([done, new Promise((resolve) => setTimeout(resolve, 4000))]).then(() => undefined);
}

export const set = (ref, value) => localWrite('set', ref, value);
export const update = (ref, values) => localWrite('update', ref, values);
export const remove = (ref) => localWrite('remove', ref);

export function push(ref, value) {
  const generated = real.push(ref); // only makes the key, writes nothing
  if (value === undefined) return generated;
  const plain = real.child(ref, generated.key);
  const written = localWrite('set', plain, value);
  const thenable = real.child(ref, generated.key);
  thenable.then = (onOk, onErr) => written.then(() => plain).then(onOk, onErr);
  thenable.catch = (onErr) => written.catch(onErr);
  return thenable;
}

export async function runTransaction(ref, updater, options) {
  const segs = refSegs(ref);
  if (!segs || !isOffline()) {
    const result = await real.runTransaction(ref, updater, options);
    if (segs && result.committed) markDirty(tree.record(segs, result.snapshot.val()));
    return result;
  }
  // offline: run the update against the device copy and queue the outcome as a plain write
  await init();
  const current = tree.lookup(segs);
  const next = updater(current.found ? current.value : null);
  if (next === undefined) {
    return { committed: false, snapshot: new CachedSnapshot(ref, segs, current.value) };
  }
  await localWrite('set', ref, next);
  return { committed: true, snapshot: new CachedSnapshot(ref, segs, tree.lookup(segs).value) };
}
