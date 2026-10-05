// Exports anonymised review logs for the memory engine's evaluation/fitting.
//
//   node scripts/export-memory-data.mjs                 # writes memory-export.local.json + prints a summary
//   node scripts/export-memory-data.mjs --summary-only  # only prints the summary, writes nothing
//   node scripts/export-memory-data.mjs --include-truncated
//
// Reads users/{uid}/words/{packId}/{wordId}/recallHistory (read-only) and
// writes [{ wordId, userId, events: [{ ts, result, confidence, responseTime,
// retrievalType }] }] — the format packages/memory-engine/eval/replay.js
// expects. User and word ids are replaced by salted hashes; no names, emails
// or word text leave the database. Output stays local (*.local is gitignored).
//
// recallHistory keeps only the last 50 events per word, so a word reviewed
// more often than that has lost its beginning and cannot be replayed from a
// fresh state. Those words are dropped unless --include-truncated is given.
//
// Needs FIREBASE_SERVICE_ACCOUNT in .env.local (same as seed-demo-center.mjs).

import fs from 'node:fs';
import crypto from 'node:crypto';
import { cert, initializeApp } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';

const DATABASE_URL = 'https://ai-chat-703e7-default-rtdb.firebaseio.com';
const OUT_FILE = 'memory-export.local.json';

const args = process.argv.slice(2);
const summaryOnly = args.includes('--summary-only');
const includeTruncated = args.includes('--include-truncated');

function loadServiceAccount() {
  let raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw && fs.existsSync('.env.local')) {
    const line = fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).find((l) => l.startsWith('FIREBASE_SERVICE_ACCOUNT='));
    raw = line?.slice('FIREBASE_SERVICE_ACCOUNT='.length);
  }
  if (!raw) throw new Error('FIREBASE_SERVICE_ACCOUNT topilmadi (.env.local).');
  const parsed = JSON.parse(raw);
  parsed.private_key = parsed.private_key.replace(/\\n/g, '\n');
  return parsed;
}

const salt = crypto.randomBytes(16).toString('hex'); // fresh per run, never stored
const anon = (value) => crypto.createHash('sha256').update(salt + value).digest('hex').slice(0, 12);

const DAY = 86400000;
const median = (arr) => {
  if (!arr.length) return 0;
  const s = [...arr].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
};

const credential = cert(loadServiceAccount());
initializeApp({ credential, databaseURL: DATABASE_URL });
const db = getDatabase();

// The whole `users` tree is far too big to download in one read, so list the
// uids with a shallow REST read, then fetch only users/{uid}/words for each.
const { access_token: accessToken } = await credential.getAccessToken();
const shallow = await fetch(`${DATABASE_URL}/users.json?shallow=true`, {
  headers: { Authorization: `Bearer ${accessToken}` },
});
if (!shallow.ok) throw new Error(`shallow users read failed: ${shallow.status}`);
const uids = Object.keys((await shallow.json()) || {});
console.log(`Found ${uids.length} users, reading their words...`);

const users = {};
const CONCURRENCY = 8;
let cursor = 0;
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  while (cursor < uids.length) {
    const uid = uids[cursor++];
    const wordsSnap = await db.ref(`users/${uid}/words`).get();
    users[uid] = { words: wordsSnap.val() || {} };
  }
}));

const words = [];
const perUser = new Map();
let wordsSeen = 0;
let wordsWithHistory = 0;
let truncated = 0;
let minTs = Infinity;
let maxTs = 0;

for (const [uid, user] of Object.entries(users)) {
  for (const [packId, pack] of Object.entries(user?.words || {})) {
    if (!pack || typeof pack !== 'object') continue;
    for (const [wordId, w] of Object.entries(pack)) {
      if (!w || typeof w !== 'object') continue;
      wordsSeen++;
      const history = Array.isArray(w.recallHistory) ? w.recallHistory : Object.values(w.recallHistory || {});
      const events = history
        .filter((h) => h && h.ts && typeof h.result === 'boolean')
        .map((h) => ({
          ts: h.ts,
          result: h.result,
          ...(typeof h.confidence === 'number' ? { confidence: h.confidence } : {}),
          ...(typeof h.responseTime === 'number' ? { responseTime: h.responseTime } : {}),
          ...(h.retrievalType ? { retrievalType: h.retrievalType } : {}),
        }))
        .sort((a, b) => new Date(a.ts) - new Date(b.ts));
      if (!events.length) continue;
      wordsWithHistory++;

      const isTruncated = (w.reviewCount || 0) > events.length;
      if (isTruncated) {
        truncated++;
        if (!includeTruncated) continue;
      }

      const userKey = anon(uid);
      words.push({ userId: userKey, wordId: anon(`${uid}/${packId}/${wordId}`), events });
      const u = perUser.get(userKey) || { events: 0, words: 0, ok: 0 };
      u.words++;
      u.events += events.length;
      u.ok += events.filter((e) => e.result).length;
      perUser.set(userKey, u);
      for (const e of events) {
        const t = new Date(e.ts).getTime();
        if (t < minTs) minTs = t;
        if (t > maxTs) maxTs = t;
      }
    }
  }
}

const totalEvents = words.reduce((s, w) => s + w.events.length, 0);
const replayable = words.reduce((s, w) => s + Math.max(0, w.events.length - 1), 0);
const ok = words.reduce((s, w) => s + w.events.filter((e) => e.result).length, 0);
const userList = [...perUser.values()];

console.log('Memory data summary');
console.log(`  users in database        ${Object.keys(users).length}`);
console.log(`  users with review data   ${perUser.size}`);
console.log(`  word records             ${wordsSeen}`);
console.log(`  words with history       ${wordsWithHistory}  (truncated >50 events: ${truncated}${includeTruncated ? ', included' : ', excluded'})`);
console.log(`  review events            ${totalEvents}`);
console.log(`  replayable predictions   ${replayable}   (events after the first of each word)`);
console.log(`  overall recall rate      ${totalEvents ? ((ok / totalEvents) * 100).toFixed(1) : 'n/a'}%`);
console.log(`  events/user (median)     ${median(userList.map((u) => u.events))}   max ${Math.max(0, ...userList.map((u) => u.events))}`);
if (totalEvents) {
  console.log(`  date range               ${new Date(minTs).toISOString().slice(0, 10)} .. ${new Date(maxTs).toISOString().slice(0, 10)}  (${Math.round((maxTs - minTs) / DAY)} days)`);
}
const verdict = replayable >= 5000 && perUser.size >= 20
  ? 'enough to fit parameters (train/test by user)'
  : replayable >= 1000
    ? 'enough to evaluate/compare models, thin for fitting — treat fitted values with caution'
    : 'too little to fit; collect more reviews before tuning';
console.log(`  verdict                  ${verdict}`);

if (!summaryOnly) {
  fs.writeFileSync(OUT_FILE, JSON.stringify(words));
  console.log(`\nWrote ${words.length} words to ${OUT_FILE} (gitignored).`);
  console.log(`Next: npm run eval:memory -- --data ../../${OUT_FILE}`);
}
process.exit(0);
