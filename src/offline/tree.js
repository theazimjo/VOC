// Pure helpers for the offline copy of the database: a path-keyed set of JSON
// values that can be read and patched like the Realtime Database does.
// Values are never mutated: a patch copies only the objects along its path, so
// anything already handed to the UI keeps its identity (and its content).

export const splitPath = (path) => String(path || '').split('/').filter(Boolean);
export const joinPath = (segs) => segs.join('/');

export function isPrefix(prefix, segs) {
  if (prefix.length > segs.length) return false;
  for (let i = 0; i < prefix.length; i += 1) if (prefix[i] !== segs[i]) return false;
  return true;
}

export function getIn(value, segs) {
  let cur = value;
  for (let i = 0; i < segs.length; i += 1) {
    if (cur === null || typeof cur !== 'object') return undefined;
    cur = cur[segs[i]];
  }
  return cur;
}

const isIndex = (key, length) => /^\d+$/.test(key) && Number(key) <= length;

// Sets (or, with null/undefined, deletes) the value at `segs`. An object left
// without children disappears, exactly as in the Realtime Database.
export function setIn(value, segs, next) {
  if (segs.length === 0) return next === undefined ? null : next;
  const [head, ...rest] = segs;
  const base = value !== null && typeof value === 'object' ? value : null;
  const child = setIn(base ? base[head] : undefined, rest, next);

  if (Array.isArray(base) && child !== null && isIndex(head, base.length)) {
    const copy = base.slice();
    copy[Number(head)] = child;
    return copy;
  }
  const copy = base ? { ...base } : {};
  if (child === null || child === undefined) delete copy[head];
  else copy[head] = child;
  return Object.keys(copy).length === 0 ? null : copy;
}

// Server placeholders (serverTimestamp(), increment(n)) and nulls inside a
// written value, resolved the way the server would.
export function resolveValue(value, existing, now = Date.now()) {
  if (value === null || value === undefined) return null;
  if (typeof value !== 'object') return value;
  if ('.sv' in value) {
    const sv = value['.sv'];
    if (sv === 'timestamp') return now;
    if (sv && typeof sv === 'object' && 'increment' in sv) return (typeof existing === 'number' ? existing : 0) + Number(sv.increment || 0);
    return null;
  }
  if (Array.isArray(value)) {
    const out = value.map((item, i) => resolveValue(item, getIn(existing, [String(i)]), now));
    return out.every((x) => x === null) ? null : out;
  }
  const out = {};
  Object.keys(value).forEach((k) => {
    const v = resolveValue(value[k], getIn(existing, [k]), now);
    if (v !== null) out[k] = v;
  });
  return Object.keys(out).length === 0 ? null : out;
}

// update(ref, { 'a/b': 1, c: null }) -> [{ segs: [...ref, 'a', 'b'], value: 1 }, ...]
export function expandUpdate(baseSegs, values) {
  return Object.keys(values || {}).map((k) => ({ segs: [...baseSegs, ...splitPath(k)], value: values[k] }));
}

export class Tree {
  constructor() {
    this.entries = new Map(); // joined path -> { segs, value }
  }

  load(list) {
    list.forEach((e) => this.entries.set(joinPath(e.segs), { segs: e.segs, value: e.value }));
  }

  clear() { this.entries.clear(); }

  // The value at `segs` if some stored entry covers it: { found, value }
  lookup(segs) {
    let best = null;
    this.entries.forEach((e) => {
      if (isPrefix(e.segs, segs) && (!best || e.segs.length > best.segs.length)) best = e;
    });
    if (!best) return { found: false, value: null };
    const v = getIn(best.value, segs.slice(best.segs.length));
    return { found: true, value: v === undefined ? null : v };
  }

  // Like lookup(), but when nothing covers `segs` it builds the value from the
  // narrower entries stored underneath it (best effort: what was ever listened to).
  lookupAssembled(segs) {
    const whole = this.lookup(segs);
    if (whole.found) return whole;
    let built = null;
    let any = false;
    this.entries.forEach((e) => {
      if (e.segs.length > segs.length && isPrefix(segs, e.segs) && e.value !== null) {
        built = setIn(built, e.segs.slice(segs.length), e.value);
        any = true;
      }
    });
    return any ? { found: true, value: built } : { found: false, value: null };
  }

  // Direct children of `segs`: { found, children: Map(key -> value) }
  lookupChildren(segs) {
    const whole = this.lookup(segs);
    if (whole.found) {
      const kids = new Map();
      if (whole.value && typeof whole.value === 'object') Object.keys(whole.value).forEach((k) => kids.set(k, whole.value[k]));
      return { found: true, children: kids };
    }
    const kids = new Map();
    this.entries.forEach((e) => {
      if (e.segs.length === segs.length + 1 && isPrefix(segs, e.segs) && e.value !== null) kids.set(e.segs[segs.length], e.value);
    });
    return { found: kids.size > 0, children: kids };
  }

  // A value the server just sent for `segs`. Returns the changed entry paths.
  record(segs, value) {
    const key = joinPath(segs);
    let covering = null;
    this.entries.forEach((e) => {
      if (e.segs.length < segs.length && isPrefix(e.segs, segs) && (!covering || e.segs.length > covering.segs.length)) covering = e;
    });
    if (covering) {
      const next = setIn(covering.value, segs.slice(covering.segs.length), value);
      if (next === covering.value) return [];
      covering.value = next;
      return [joinPath(covering.segs)];
    }
    const changed = [key];
    this.entries.forEach((e, k) => {
      if (e.segs.length > segs.length && isPrefix(segs, e.segs)) { this.entries.delete(k); changed.push(k); }
    });
    const prev = this.entries.get(key);
    if (prev && prev.value === value) return [];
    this.entries.set(key, { segs, value: value === undefined ? null : value });
    return changed;
  }

  // Our own pending writes, applied locally. `writes` = [{ segs, value }].
  // Returns the paths of the entries that changed.
  applyWrites(writes, now = Date.now()) {
    const changed = new Set();
    writes.forEach((w) => {
      this.entries.forEach((e, k) => {
        if (isPrefix(e.segs, w.segs)) {
          const rel = w.segs.slice(e.segs.length);
          const resolved = resolveValue(w.value, getIn(e.value, rel), now);
          const next = setIn(e.value, rel, resolved);
          if (next !== e.value) { e.value = next; changed.add(k); }
        } else if (isPrefix(w.segs, e.segs)) {
          const resolved = resolveValue(w.value, undefined, now);
          const v = getIn(resolved, e.segs.slice(w.segs.length));
          const next = v === undefined ? null : v;
          if (next !== e.value) { e.value = next; changed.add(k); }
        }
      });
    });
    return [...changed];
  }
}
