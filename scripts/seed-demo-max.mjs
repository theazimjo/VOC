// Creates (or refreshes) "Max", a fully filled personal-mode demo account for
// store screenshots: three word packs from Essential 3000, most words learned,
// a month of daily activity, a few words due today and a word target.
//
//   node scripts/seed-demo-max.mjs <path to bundled essential3000 module>
//
// Login: max@voc-demo.uz; the password is written to .env.local as
// VITE_DEMO_MAX_PASSWORD (gitignored) and printed. Needs FIREBASE_SERVICE_ACCOUNT
// in .env.local. Safe to re-run: the account is reused and its data replaced.

import fs from 'node:fs';
import crypto from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { cert, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getDatabase } from 'firebase-admin/database';

const DATABASE_URL = 'https://ai-chat-703e7-default-rtdb.firebaseio.com';
const EMAIL = 'max@voc-demo.uz';
const NAME = 'Max';

const { essential3000Months } = await import(pathToFileURL(process.argv[2]).href);

const env = fs.readFileSync('.env.local', 'utf8').split(/\r?\n/);
const sa = JSON.parse(env.find((l) => l.startsWith('FIREBASE_SERVICE_ACCOUNT=')).slice('FIREBASE_SERVICE_ACCOUNT='.length));
sa.private_key = sa.private_key.replace(/\n/g, '\n');
const app = initializeApp({ credential: cert(sa), databaseURL: DATABASE_URL });
const auth = getAuth(app);
const db = getDatabase(app);

const ALPHABET = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const pwd = Array.from(crypto.randomBytes(10), (b) => ALPHABET[b % ALPHABET.length]).join('');
let uid;
try {
  const u = await auth.getUserByEmail(EMAIL);
  uid = u.uid;
  await auth.updateUser(uid, { password: pwd, displayName: NAME, disabled: false });
} catch (e) {
  if (e.code !== 'auth/user-not-found') throw e;
  uid = (await auth.createUser({ email: EMAIL, password: pwd, displayName: NAME, emailVerified: true })).uid;
}

// deterministic randomness so a re-run gives the same picture
let seed = 7;
const rnd = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
const pick = (a, b) => a + rnd() * (b - a);

const DAY = 86400000;
const now = Date.now();
const units = essential3000Months[0].units;
const PACKS = [
  { name: 'Essential 3000 · Part 1', icon: '🌱', color: '#34C759', level: 'beginner', lessons: units.slice(0, 6) },
  { name: 'Essential 3000 · Part 2', icon: '📘', color: '#007AFF', level: 'intermediate', lessons: units.slice(6, 12) },
  { name: 'Essential 3000 · Part 3', icon: '🚀', color: '#AF52DE', level: 'intermediate', lessons: units.slice(12, 18) },
];
// how far each pack is: share of words that are learned / in progress / new
const PROGRESS = [[0.99, 0.01], [0.95, 0.05], [0.86, 0.12]];

const updates = {};
let dueLeft = 16;
const dayHits = {}; // review count per day, to keep every day of the month active
PACKS.forEach((pack, pi) => {
  const packId = `max_pack_${pi + 1}`;
  const words = {};
  let count = 0;
  pack.lessons.forEach((lesson) => lesson.words.forEach((w) => {
    count += 1;
    const r = rnd();
    const [learned, mid] = PROGRESS[pi];
    const state = r < learned ? 'learned' : r < learned + mid ? 'mid' : 'new';
    const base = {
      word: w.word, translation: w.translation, definition: w.definition || '', example: w.example || '',
      partOfSpeech: w.partOfSpeech || 'noun', topic: lesson.title,
      addedAt: new Date(now - pick(20, 34) * DAY).toISOString(),
    };
    if (state === 'new') {
      words[`w${count}`] = { ...base, mastery: 0, interval: 0, reviewCount: 0, nextReview: null, lastReviewed: null };
      return;
    }
    const reviews = state === 'learned' ? 5 + Math.floor(rnd() * 5) : 2 + Math.floor(rnd() * 3);
    const history = [];
    let t = now - pick(22, 30) * DAY;
    const span = (now - pick(0.2, 3) * DAY) - t;
    for (let i = 0; i < reviews; i += 1) {
      // later reviews are more frequent: skew towards the present
      const frac = Math.pow((i + rnd() * 0.6) / reviews, 0.7);
      t = now - pick(0.2, 3) * DAY - (1 - frac) * span;
      const ok = state === 'learned' ? (i === 0 ? rnd() > 0.35 : rnd() > 0.1) : rnd() > 0.35;
      history.push({ t: Math.round(pick(1, 9) * 100) / 100, result: ok, responseTime: Math.round(pick(1.2, 6) * 10) / 10, confidence: ok ? 4 : 2, ts: new Date(t).toISOString(), retrievalType: i % 2 ? 'active_recall' : 'recognition', mode: i % 2 ? 'spelling' : 'quiz' });
      const key = new Date(t).toISOString().slice(0, 10);
      dayHits[key] = (dayHits[key] || 0) + 1;
    }
    history.sort((a, b) => a.ts.localeCompare(b.ts));
    const last = history[history.length - 1];
    const correct = history.filter((h) => h.result).length;
    const stability = state === 'learned' ? pick(30, 90) : pick(1.5, 6);
    let nextReview = new Date(Date.parse(last.ts) + stability * DAY * 0.8).toISOString();
    if (dueLeft > 0 && state === 'mid' && rnd() < 0.2) { nextReview = new Date(now - pick(0.1, 1) * DAY).toISOString(); dueLeft -= 1; }
    words[`w${count}`] = {
      ...base,
      mastery: state === 'learned' ? Math.round(pick(82, 99)) : Math.round(pick(35, 70)),
      interval: Math.round(stability), reviewCount: reviews, correctCount: correct, wrongCount: reviews - correct,
      quality: last.result ? 5 : 2, stability: Math.round(stability * 10) / 10,
      activeRecallPasses: state === 'learned' ? 2 + Math.floor(rnd() * 3) : Math.floor(rnd() * 2),
      confirmedModes: state === 'learned' ? ['spelling', 'pronounce'] : [],
      lastReviewed: last.ts, nextReview, recallHistory: history.slice(-50),
    };
  }));
  updates[`users/${uid}/packs/${packId}`] = {
    name: pack.name, description: 'Essential English words with examples', color: pack.color, icon: pack.icon,
    level: pack.level, language: 'en-US', type: 'default', createdAt: new Date(now - 34 * DAY).toISOString(), wordCount: count,
  };
  updates[`users/${uid}/words/${packId}`] = words;
});

updates[`users/${uid}/profile`] = { displayName: NAME, email: EMAIL, appMode: 'individual', wordTarget: 400 };

// make sure no day of the last month is empty: top up quiet days with a few reviews on one word
const wordPaths = Object.keys(updates).filter((k) => k.includes('/words/'));
for (let d = 0; d < 30; d += 1) {
  const key = new Date(now - d * DAY).toISOString().slice(0, 10);
  if ((dayHits[key] || 0) >= 6) continue;
  const bag = updates[wordPaths[d % wordPaths.length]];
  const ids = Object.keys(bag).filter((id) => bag[id].recallHistory);
  const w = bag[ids[(d * 7) % ids.length]];
  for (let k = 0; k < 8; k += 1) {
    const ts = new Date(now - d * DAY - 3600000 * (k + 1)).toISOString();
    w.recallHistory.unshift({ t: 1, result: rnd() > 0.2, responseTime: 3, confidence: 4, ts, retrievalType: 'recognition', mode: 'quiz' });
  }
  w.recallHistory = w.recallHistory.slice(-50);
}

await db.ref().update(updates);

const lines = env.filter((l) => l && !l.startsWith('VITE_DEMO_MAX_PASSWORD='));
fs.writeFileSync('.env.local', [...lines, `VITE_DEMO_MAX_PASSWORD=${pwd}`, ''].join('\n'));
console.log(JSON.stringify({ uid, email: EMAIL, password: pwd }));
process.exit(0);
