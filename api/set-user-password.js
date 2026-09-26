import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getDatabase } from 'firebase-admin/database';

// Sets a new login password for a center admin or teacher.
//
//   POST { idToken, uid?, email?, password } → { ok: true, email }
//
// Who may call it:
//   - super admin: any center admin or teacher;
//   - center admin: only teachers of their own center.
//
// Changing someone else's Firebase Auth password is only possible with the
// Admin SDK, so this has to run server-side. It only touches accounts that
// hold a corpUsers role (center_admin / teacher) — never a student's.
//
// Required env var (Vercel → Settings → Environment Variables, and
// .env.local for `npm run dev`), either one:
//   FIREBASE_SERVICE_ACCOUNT          the service-account JSON, on one line
//   FIREBASE_SERVICE_ACCOUNT_BASE64   the same JSON, base64-encoded
// Get it from Firebase console → Project settings → Service accounts →
// "Generate new private key".

// Must match SUPER_ADMINS in src/hooks/useCorpRole.js.
const SUPER_ADMINS = ['azimjon29042006@gmail.com', 'azimjonxolmirzayev30@gmail.com'];
const DATABASE_URL = 'https://ai-chat-703e7-default-rtdb.firebaseio.com';
const MIN_PASSWORD = 8;

function loadServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT
    || (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64
      ? Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf8')
      : '');
  if (!raw) return null;
  const parsed = JSON.parse(raw);
  // Keys pasted through some dashboards arrive with literal "\n".
  if (parsed.private_key) parsed.private_key = parsed.private_key.replace(/\\n/g, '\n');
  return parsed;
}

function adminApp() {
  if (getApps().length) return getApps()[0];
  const account = loadServiceAccount();
  if (!account) return null;
  return initializeApp({ credential: cert(account), databaseURL: DATABASE_URL });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  let app;
  try {
    app = adminApp();
  } catch (err) {
    console.error('set-user-password: bad service account', err);
    res.status(500).json({ error: "FIREBASE_SERVICE_ACCOUNT noto'g'ri formatda." });
    return;
  }
  if (!app) {
    res.status(500).json({ error: 'Server sozlanmagan: FIREBASE_SERVICE_ACCOUNT kerak.' });
    return;
  }

  const { idToken, uid, email, password } = req.body || {};
  if (typeof password !== 'string' || password.length < MIN_PASSWORD) {
    res.status(400).json({ error: `Parol kamida ${MIN_PASSWORD} ta belgidan iborat bo'lishi kerak.` });
    return;
  }

  const auth = getAuth(app);
  let caller;
  try {
    caller = await auth.verifyIdToken(String(idToken || ''));
  } catch {
    res.status(401).json({ error: 'Qaytadan tizimga kiring.' });
    return;
  }
  const db = getDatabase(app);
  const isSuperAdmin = Boolean(caller.email && SUPER_ADMINS.includes(caller.email.toLowerCase()));
  let callerCorp = null;
  if (!isSuperAdmin) {
    callerCorp = (await db.ref(`corpUsers/${caller.uid}`).get()).val();
    if (callerCorp?.role !== 'center_admin' || callerCorp.disabled === true || !callerCorp.centerId) {
      res.status(403).json({ error: 'Faqat super admin yoki markaz admini uchun.' });
      return;
    }
  }

  let target;
  try {
    target = uid ? await auth.getUser(String(uid)) : await auth.getUserByEmail(String(email || ''));
  } catch {
    res.status(404).json({ error: 'Bu hisob topilmadi.' });
    return;
  }

  const targetCorp = (await db.ref(`corpUsers/${target.uid}`).get()).val();
  const role = targetCorp?.role;
  if (role !== 'center_admin' && role !== 'teacher') {
    res.status(403).json({ error: "Faqat markaz admini yoki o'qituvchi parolini o'zgartirish mumkin." });
    return;
  }
  if (!isSuperAdmin && (role !== 'teacher' || targetCorp.centerId !== callerCorp.centerId)) {
    res.status(403).json({ error: "Faqat o'z markazingiz o'qituvchisining parolini o'zgartira olasiz." });
    return;
  }

  try {
    await auth.updateUser(target.uid, { password });
    // Old flows kept plaintext copies of temp passwords here — drop them.
    await db.ref(`corpUsers/${target.uid}/tempPassword`).remove();
  } catch (err) {
    console.error('set-user-password: update failed', err);
    res.status(500).json({ error: `Parolni o'zgartirib bo'lmadi: ${err.message}` });
    return;
  }

  res.status(200).json({ ok: true, email: target.email || '' });
}
