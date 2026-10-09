import crypto from 'node:crypto';
import { getAuth } from 'firebase-admin/auth';
import { getDatabase } from 'firebase-admin/database';
import { requireAdminApp, requirePost } from './_firebaseAdmin.js';
import { makePassword, validateStudent } from './_studentAccount.js';

// A center admin, or the teacher of a group, creates a student's account: name +
// phone number or username + password, no email needed. The student is put in
// the group straight away and signs in with the phone/username.
//
//   POST { idToken, groupId, name, phone?, username?, password? }
//     -> { uid, login, password, name, groupName }   (password is shown once)
//
// Who may call it: a center admin for any group of their center, a teacher only
// for a group they run. Everything is written with the Admin SDK because a new
// student's own data (users/{uid}) can only be written by that student.

const MIN_PASSWORD = 6;
const MAX_PASSWORD = 64;

export default async function handler(req, res) {
  if (!requirePost(req, res)) return;
  const app = requireAdminApp(res, 'create-student');
  if (!app) return;

  const { idToken, groupId, password: given } = req.body || {};
  if (typeof groupId !== 'string' || !groupId || /[.#$[\]/]/.test(groupId)) {
    res.status(400).json({ error: 'Guruh ko\'rsatilmagan.' });
    return;
  }
  const checked = validateStudent(req.body);
  if (!checked.ok) {
    res.status(400).json({ error: checked.error });
    return;
  }
  if (given !== undefined && given !== '' && (typeof given !== 'string' || given.length < MIN_PASSWORD || given.length > MAX_PASSWORD)) {
    res.status(400).json({ error: `Parol ${MIN_PASSWORD}-${MAX_PASSWORD} ta belgidan iborat bo'lsin.` });
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
  const callerCorp = (await db.ref(`corpUsers/${caller.uid}`).get()).val();
  if (!callerCorp?.centerId || callerCorp.disabled === true || !['center_admin', 'teacher'].includes(callerCorp.role)) {
    res.status(403).json({ error: "Faqat markaz admini yoki ustoz uchun." });
    return;
  }
  const centerId = callerCorp.centerId;

  const groupRef = db.ref(`centers/${centerId}/groups/${groupId}`);
  const group = (await groupRef.get()).val();
  if (!group) {
    res.status(404).json({ error: 'Guruh topilmadi.' });
    return;
  }
  const runsGroup = group.teacherId === callerCorp.teacherId || group.teacherId === caller.uid;
  if (callerCorp.role === 'teacher' && !runsGroup) {
    res.status(403).json({ error: "Bu guruh sizniki emas." });
    return;
  }

  const password = given ? given : makePassword(() => crypto.randomInt(0, 1_000_000) / 1_000_000);

  let user;
  try {
    user = await auth.createUser({ email: checked.email, password, displayName: checked.name, emailVerified: true });
  } catch (err) {
    if (err.code === 'auth/email-already-exists') {
      res.status(409).json({ error: checked.phone ? 'Bu telefon raqami bilan hisob allaqachon bor.' : 'Bu login band, boshqasini tanlang.' });
      return;
    }
    console.error('create-student: createUser failed', err);
    res.status(500).json({ error: "Hisob yaratib bo'lmadi." });
    return;
  }

  const joinedAt = new Date().toISOString();
  const membership = {
    centerId,
    groupId,
    groupName: group.name || '',
    groupCode: group.code || '',
    joinedAt,
    level: group.level || 'General',
  };
  try {
    await db.ref().update({
      [`users/${user.uid}/profile/displayName`]: checked.name,
      [`users/${user.uid}/profile/appMode`]: 'group',
      [`users/${user.uid}/profile/phone`]: checked.phone,
      [`users/${user.uid}/groupMembership`]: membership,
      [`users/${user.uid}/groupMemberships/${groupId}`]: membership,
      [`centers/${centerId}/groups/${groupId}/students/${user.uid}`]: {
        id: user.uid,
        name: checked.name,
        email: checked.login,
        joinedAt,
        progress: {},
        createdBy: caller.uid,
      },
    });
    await groupRef.child('studentsCount').transaction((n) => (n || 0) + 1);
  } catch (err) {
    console.error('create-student: could not put the student in the group', err);
    await auth.deleteUser(user.uid).catch(() => {});
    res.status(500).json({ error: "O'quvchini guruhga qo'shib bo'lmadi." });
    return;
  }

  res.status(200).json({ uid: user.uid, login: checked.login, password, name: checked.name, groupName: group.name || '' });
}
