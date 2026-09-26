// Creates (or refreshes) a demo learning center for looking around every
// role without juggling real accounts:
//   center admin  demo.admin@voc-demo.uz        → /corp/admin
//   teacher       +998 00 000 00 01 (phone)      → /corp/teacher
//   student       demo.student@voc-demo.uz      → group mode (/corp/student)
// with one group, one small word pack, one homework and some progress.
//
//   node scripts/seed-demo-center.mjs
//
// Safe to re-run: accounts are reused (passwords reset), the center is
// found by its fixed id. Logins + passwords go to demo-accounts.local.txt
// and, as VITE_DEMO_*_PASSWORD, to .env.local for the dev-only /dev/roles
// page (both gitignored) — never printed. Needs FIREBASE_SERVICE_ACCOUNT in
// .env.local.

import fs from 'node:fs';
import crypto from 'node:crypto';
import { cert, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getDatabase } from 'firebase-admin/database';

const DATABASE_URL = 'https://ai-chat-703e7-default-rtdb.firebaseio.com';
const CENTER_ID = 'demo_voc_center';
const GROUP_ID = 'demo_voc_group';
const TEACHER_ID = 'demo_voc_teacher';
const PACK_ID = 'demo_voc_pack';
const OUT_FILE = 'demo-accounts.local.txt';

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

const ALPHABET = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const password = () => Array.from(crypto.randomBytes(10), (b) => ALPHABET[b % ALPHABET.length]).join('');

// Set KEY=value in .env.local, replacing an existing line, keeping the rest.
function setEnvLocal(values) {
  const lines = fs.existsSync('.env.local') ? fs.readFileSync('.env.local', 'utf8').split(/\r?\n/) : [];
  const keep = lines.filter((l) => l && !Object.keys(values).some((k) => l.startsWith(`${k}=`)));
  fs.writeFileSync('.env.local', [...keep, ...Object.entries(values).map(([k, v]) => `${k}=${v}`), ''].join('\n'));
}


const app = initializeApp({ credential: cert(loadServiceAccount()), databaseURL: DATABASE_URL });
const auth = getAuth(app);
const db = getDatabase(app);

// Reuse by email, otherwise create; always set a fresh password.
async function upsertUser(email, displayName) {
  const pwd = password();
  try {
    const existing = await auth.getUserByEmail(email);
    await auth.updateUser(existing.uid, { password: pwd, displayName, disabled: false });
    return { uid: existing.uid, password: pwd };
  } catch (err) {
    if (err.code !== 'auth/user-not-found') throw err;
    const created = await auth.createUser({ email, password: pwd, displayName, emailVerified: true });
    return { uid: created.uid, password: pwd };
  }
}

const now = new Date();
const iso = (daysAgo = 0) => new Date(now.getTime() - daysAgo * 86400000).toISOString();

const words = (list) => list.map(([word, translation], i) => ({ id: `w${i + 1}`, word, translation }));
const months = [{
  id: 'm1',
  title: '1-oy',
  units: [
    { id: 'u1', title: 'Family', words: words([['mother', 'ona'], ['father', 'ota'], ['sister', 'opa-singil'], ['brother', 'aka-uka'], ['grandmother', 'buvi']]) },
    { id: 'u2', title: 'Colors', words: words([['red', 'qizil'], ['blue', "ko'k"], ['green', 'yashil'], ['yellow', 'sariq'], ['white', 'oq']]) },
    { id: 'u3', title: 'Food', words: words([['bread', 'non'], ['water', 'suv'], ['apple', 'olma'], ['milk', 'sut'], ['meat', "go'sht"]]) },
  ],
}];
const units = months[0].units;
const allWords = units.flatMap((u) => u.words);

async function main() {
  const admin = await upsertUser('demo.admin@voc-demo.uz', 'Demo Admin');
  const teacherEmail = 'teacher_998000000001@markaz.uz'; // phone login: +998 00 000 00 01
  const teacher = await upsertUser(teacherEmail, "Demo O'qituvchi");
  const student = await upsertUser('demo.student@voc-demo.uz', "Demo O'quvchi");

  const code = String(100000 + (crypto.randomBytes(3).readUIntBE(0, 3) % 900000));
  const oldCode = (await db.ref(`centers/${CENTER_ID}/groups/${GROUP_ID}/code`).get()).val();

  const progress = {
    [PACK_ID]: {
      units: {
        m1_u1: { masteryPercent: 92, retentionPercent: 88, wordsLearned: 5, totalWords: 5, atRiskCount: 0, lastActivity: iso(1) },
        m1_u2: { masteryPercent: 45, retentionPercent: 60, wordsLearned: 2, totalWords: 5, atRiskCount: 1, lastActivity: iso(0) },
      },
    },
  };
  const membership = {
    centerId: CENTER_ID, groupId: GROUP_ID, groupName: 'Demo guruh', groupCode: code, joinedAt: iso(10), level: 'General',
  };

  const updates = {
    [`centers/${CENTER_ID}`]: {
      id: CENTER_ID,
      name: 'VOC Demo markaz',
      isDemo: true,
      adminEmail: 'demo.admin@voc-demo.uz',
      adminUid: admin.uid,
      phone: '',
      status: 'active',
      createdAt: iso(30),
      updatedAt: iso(0),
      teachers: {
        [TEACHER_ID]: {
          id: TEACHER_ID, uid: teacher.uid, centerId: CENTER_ID, name: "Demo O'qituvchi",
          email: teacherEmail, phone: '+998000000001', subject: 'Ingliz tili', status: 'active', createdAt: iso(20),
        },
      },
      customPacks: {
        [PACK_ID]: {
          id: PACK_ID, centerId: CENTER_ID, title: 'Demo: Beginner', description: "Ko'rish uchun namunaviy to'plam",
          level: 'Beginner', language: 'en-US', months, units, words: allWords,
          wordCount: allWords.length, sectionsCount: units.length, createdAt: iso(20), createdBy: 'Demo',
        },
      },
      groups: {
        [GROUP_ID]: {
          id: GROUP_ID, centerId: CENTER_ID, teacherId: TEACHER_ID, name: 'Demo guruh', code,
          assignedPacks: [PACK_ID], additionalPacks: [], requiredPacks: [], createdAt: iso(15), studentsCount: 1,
          students: {
            [student.uid]: { id: student.uid, name: "Demo O'quvchi", email: 'demo.student@voc-demo.uz', joinedAt: iso(10), progress },
          },
          homeworkList: {
            demo_hw_1: {
              name: 'Family, Colors',
              assignedAt: iso(2),
              items: units.slice(0, 2).map((u) => ({ packId: PACK_ID, monthId: 'm1', unitId: u.id, packTitle: 'Demo: Beginner', unitTitle: u.title, totalWords: u.words.length })),
            },
          },
        },
      },
    },
    [`groupCodes/${code}`]: { centerId: CENTER_ID, groupId: GROUP_ID, teacherId: TEACHER_ID, code, name: 'Demo guruh' },
    [`corpUsers/${admin.uid}`]: { role: 'center_admin', centerId: CENTER_ID, centerName: 'VOC Demo markaz', email: 'demo.admin@voc-demo.uz', createdAt: iso(30) },
    [`corpUsers/${teacher.uid}`]: {
      role: 'teacher', centerId: CENTER_ID, centerName: 'VOC Demo markaz', teacherId: TEACHER_ID,
      teacherName: "Demo O'qituvchi", phone: '+998000000001', email: teacherEmail, createdAt: iso(20),
    },
    [`users/${student.uid}/profile/displayName`]: "Demo O'quvchi",
    [`users/${student.uid}/profile/email`]: 'demo.student@voc-demo.uz',
    [`users/${student.uid}/profile/appMode`]: 'group',
    [`users/${student.uid}/groupMembership`]: membership,
    [`users/${student.uid}/groupMemberships/${GROUP_ID}`]: membership,
  };
  if (oldCode && oldCode !== code) updates[`groupCodes/${oldCode}`] = null;

  await db.ref().update(updates);

  fs.writeFileSync(OUT_FILE, [
    'VOC demo hisoblar — faqat ko\'rish uchun. Bu fayl git\'ga tushmaydi.',
    `Yaratildi: ${now.toLocaleString('uz-UZ')}`,
    '',
    'MARKAZ ADMINI  →  /corp/admin',
    '  Login: demo.admin@voc-demo.uz',
    `  Parol: ${admin.password}`,
    '',
    "O'QITUVCHI  →  /corp/teacher",
    '  Login: +998000000001   (telefon raqam bilan kiriladi)',
    `  Parol: ${teacher.password}`,
    '',
    "O'QUVCHI (guruhda)  →  /corp/student",
    '  Login: demo.student@voc-demo.uz',
    `  Parol: ${student.password}`,
    '',
    `Guruh kodi: ${code}`,
    '',
    'Super admin va shaxsiy o\'quvchi — o\'z hisobingiz.',
    'Skriptni qayta ishga tushirsangiz, parollar yangilanadi.',
    '',
  ].join('\n'));

  setEnvLocal({
    VITE_DEMO_ADMIN_PASSWORD: admin.password,
    VITE_DEMO_TEACHER_PASSWORD: teacher.password,
    VITE_DEMO_STUDENT_PASSWORD: student.password,
  });

  console.log(`Tayyor: "VOC Demo markaz" (${CENTER_ID}). Loginlar va parollar ${OUT_FILE} faylida.`);
  process.exit(0);
}

main().catch((err) => {
  console.error('Xatolik:', err.message);
  process.exit(1);
});
