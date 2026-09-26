import { getAuth } from 'firebase-admin/auth';
import { getDatabase } from 'firebase-admin/database';
import { requireAdminApp, requirePost } from './_firebaseAdmin.js';

// Moves a teacher's role onto a Google account that already has its own
// VOC account (Firebase can't link a Google login that's already a
// separate user, so we move the role instead of merging logins).
//
//   POST { idToken, googleIdToken } → { ok: true, email }
//
//   idToken        the teacher's current session (the admin-created
//                  phone/password account) — proves they own the role;
//   googleIdToken  a fresh token for the Google account, signed in with
//                  Google just now — proves they own that account.
//
// Afterwards the Google account is the teacher (groups, homework and
// private packs follow it; its own personal words stay), and the old
// phone/password account is deleted.

export default async function handler(req, res) {
  if (!requirePost(req, res)) return;
  const app = requireAdminApp(res, 'merge-teacher-account');
  if (!app) return;

  const auth = getAuth(app);
  const db = getDatabase(app);
  const { idToken, googleIdToken } = req.body || {};

  let from;
  let to;
  try {
    [from, to] = await Promise.all([
      auth.verifyIdToken(String(idToken || '')),
      auth.verifyIdToken(String(googleIdToken || '')),
    ]);
  } catch {
    res.status(401).json({ error: 'Qaytadan tizimga kiring va yana urinib ko\'ring.' });
    return;
  }

  if (from.uid === to.uid) {
    res.status(400).json({ error: 'Bu hisob allaqachon shu Google hisob.' });
    return;
  }
  if (to.firebase?.sign_in_provider !== 'google.com') {
    res.status(400).json({ error: 'Google orqali tasdiqlash kerak.' });
    return;
  }

  const [corpFrom, corpTo] = (await Promise.all([
    db.ref(`corpUsers/${from.uid}`).get(),
    db.ref(`corpUsers/${to.uid}`).get(),
  ])).map((snap) => snap.val());

  if (corpFrom?.role !== 'teacher' || corpFrom.disabled === true || !corpFrom.centerId || !corpFrom.teacherId) {
    res.status(403).json({ error: "Faqat o'qituvchi hisobini ko'chirish mumkin." });
    return;
  }
  if (corpTo) {
    res.status(409).json({ error: "Bu Google hisob allaqachon markaz xodimi. Boshqa Google hisobni tanlang." });
    return;
  }

  const { centerId, teacherId } = corpFrom;
  const teacherPath = `centers/${centerId}/teachers/${teacherId}`;
  const [teacherSnap, packsSnap, googleUser] = await Promise.all([
    db.ref(teacherPath).get(),
    db.ref(`centers/${centerId}/customPacks`).get(),
    auth.getUser(to.uid),
  ]);
  if (teacherSnap.val()?.uid !== from.uid) {
    res.status(409).json({ error: "O'qituvchi yozuvi topilmadi. Markaz adminiga murojaat qiling." });
    return;
  }

  const email = googleUser.email || to.email || '';
  const now = new Date().toISOString();
  const updates = {
    [`corpUsers/${to.uid}`]: { ...corpFrom, email, mergedFrom: from.uid, mergedAt: now },
    [`corpUsers/${from.uid}`]: null,
    [`${teacherPath}/uid`]: to.uid,
    [`${teacherPath}/email`]: email,
    [`${teacherPath}/updatedAt`]: now,
    // The old account was created only for this role — nothing personal
    // to keep there.
    [`users/${from.uid}`]: null,
  };
  Object.entries(packsSnap.val() || {}).forEach(([packId, pack]) => {
    if (pack?.ownerUid === from.uid) updates[`centers/${centerId}/customPacks/${packId}/ownerUid`] = to.uid;
  });

  try {
    await db.ref().update(updates);
  } catch (err) {
    console.error('merge-teacher-account: db update failed', err);
    res.status(500).json({ error: `Ko'chirib bo'lmadi: ${err.message}` });
    return;
  }

  try {
    await auth.deleteUser(from.uid);
  } catch (err) {
    // The role already moved; a leftover empty login is harmless.
    console.error('merge-teacher-account: could not delete old account', err);
  }

  res.status(200).json({ ok: true, email });
}
