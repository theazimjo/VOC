import { getAuth } from 'firebase-admin/auth';
import { getDatabase } from 'firebase-admin/database';
import { SUPER_ADMINS, requireAdminApp, requirePost } from './_firebaseAdmin.js';

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

const MIN_PASSWORD = 8;

export default async function handler(req, res) {
  if (!requirePost(req, res)) return;
  const app = requireAdminApp(res, 'set-user-password');
  if (!app) return;

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
