import { getAuth } from 'firebase-admin/auth';
import { getDatabase } from 'firebase-admin/database';
import { SUPER_ADMINS, requireAdminApp, requirePost } from './_firebaseAdmin.js';

// A center admin's view of one of their students.
//
//   POST { idToken, studentId, action: 'details' }
//     → { account, activity, streak, words, groupIds }
//   POST { idToken, studentId, action: 'set-password', password }
//     → { ok: true, email }
//
// Who may call it: a center admin, only for a student who is in one (or
// several) of their own center's groups. Staff accounts (anyone with a corpUsers role)
// and super admins are never touched through here, even if they joined a
// group — set-user-password.js covers staff.
//
// The student's own node (users/{uid}) is private to them, so the extra
// details are read with the Admin SDK — and limited to what the center is
// entitled to: sign-in info, practice activity, and word progress for the
// courses the student's groups in this center use. Personal packs, books etc. are never returned.
// Every password change is logged under centers/{id}/studentPasswordResets.

const MIN_PASSWORD = 8;
const ACTIVITY_DAYS = 26 * 7 + 7; // the half-year calendar, plus a week of slack

const toList = (v) => (Array.isArray(v) ? v : Object.values(v || {}));

function packIdsOf(groups) {
  return [...new Set(groups.flatMap((g) => [
    ...toList(g.assignedPacks),
    ...toList(g.requiredPacks),
    ...toList(g.additionalPacks),
  ]).filter((id) => typeof id === 'string' && id))];
}

// Recent days of the streak activity log (YYYY-MM-DD → words practiced).
// Keys are the student's local dates, so compare as strings against a
// cutoff with a day of slack rather than rebuilding them in server time.
export function recentActivity(log, now = Date.now()) {
  const cutoff = new Date(now - (ACTIVITY_DAYS + 1) * 86400000).toISOString().slice(0, 10);
  const out = {};
  Object.entries(log || {}).forEach(([key, count]) => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(key) && key >= cutoff && Number(count) > 0) out[key] = Number(count);
  });
  return out;
}

// Per-word progress without the raw review history.
function wordSummary(id, w) {
  const history = toList(w?.recallHistory);
  const correct = history.filter((h) => h?.result === true).length;
  return {
    id,
    mastery: typeof w?.mastery === 'number' ? w.mastery : null,
    reviewCount: w?.reviewCount || 0,
    wrongCount: w?.wrongCount || 0,
    correct,
    answered: history.length,
    lastReviewed: w?.lastReviewed || null,
    nextReview: w?.nextReview || null,
  };
}

export default async function handler(req, res) {
  if (!requirePost(req, res)) return;
  const app = requireAdminApp(res, 'student-account');
  if (!app) return;

  const { idToken, studentId, action, password } = req.body || {};
  if (!studentId || typeof studentId !== 'string' || /[.#$[\]/]/.test(studentId)) {
    res.status(400).json({ error: "O'quvchi ko'rsatilmagan." });
    return;
  }
  if (action !== 'details' && action !== 'set-password') {
    res.status(400).json({ error: "Noma'lum amal." });
    return;
  }
  if (action === 'set-password' && (typeof password !== 'string' || password.length < MIN_PASSWORD)) {
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
  const callerCorp = (await db.ref(`corpUsers/${caller.uid}`).get()).val();
  if (callerCorp?.role !== 'center_admin' || callerCorp.disabled === true || !callerCorp.centerId) {
    res.status(403).json({ error: 'Faqat markaz admini uchun.' });
    return;
  }
  const centerId = callerCorp.centerId;

  const allGroups = (await db.ref(`centers/${centerId}/groups`).get()).val() || {};
  const groups = Object.entries(allGroups)
    .filter(([, g]) => g?.students?.[studentId])
    .map(([id, g]) => ({ id, ...g }));
  if (!groups.length) {
    res.status(404).json({ error: "Bu o'quvchi markazingiz guruhida yo'q." });
    return;
  }

  let target;
  try {
    target = await auth.getUser(studentId);
  } catch {
    res.status(404).json({ error: "O'quvchi hisobi topilmadi." });
    return;
  }
  const targetCorp = (await db.ref(`corpUsers/${studentId}`).get()).val();
  const isStaff = Boolean(targetCorp?.role) || Boolean(target.email && SUPER_ADMINS.includes(target.email.toLowerCase()));

  if (action === 'set-password') {
    if (isStaff) {
      res.status(403).json({ error: "Bu hisob xodimga tegishli — parolini bu yerdan o'zgartirib bo'lmaydi." });
      return;
    }
    if (!target.email) {
      res.status(400).json({ error: "Bu hisobda email yo'q — parol bilan kira olmaydi." });
      return;
    }
    try {
      await auth.updateUser(studentId, { password });
      await db.ref(`centers/${centerId}/studentPasswordResets`).push({
        uid: studentId,
        groupIds: groups.map((g) => g.id),
        by: caller.uid,
        byEmail: caller.email || '',
        at: new Date().toISOString(),
      });
    } catch (err) {
      console.error('student-account: password update failed', err);
      res.status(500).json({ error: `Parolni o'zgartirib bo'lmadi: ${err.message}` });
      return;
    }
    res.status(200).json({ ok: true, email: target.email });
    return;
  }

  // details
  const [activity, streak, words] = await Promise.all([
    db.ref(`users/${studentId}/activity`).get().then((s) => s.val()),
    db.ref(`users/${studentId}/streak`).get().then((s) => s.val()),
    Promise.all(packIdsOf(groups).map(async (packId) => {
      const val = (await db.ref(`users/${studentId}/words/${packId}`).get()).val() || {};
      return [packId, Object.entries(val).map(([id, w]) => wordSummary(id, w))];
    })).then(Object.fromEntries),
  ]);

  const providers = (target.providerData || []).map((p) => p.providerId);
  res.status(200).json({
    account: {
      email: target.email || '',
      emailVerified: Boolean(target.emailVerified),
      disabled: Boolean(target.disabled),
      providers,
      hasPassword: providers.includes('password'),
      createdAt: target.metadata?.creationTime || null,
      lastSignInAt: target.metadata?.lastSignInTime || null,
      lastActiveAt: target.metadata?.lastRefreshTime || null,
      isStaff,
    },
    activity: {
      lastSeen: activity?.lastSeen || null,
      sessionCount: activity?.sessionCount || 0,
    },
    streak: {
      current: streak?.streakCount || 0,
      lastActiveDate: streak?.lastActiveDate || null,
      dailyGoal: streak?.dailyGoal || 0,
      days: recentActivity(streak?.activityLog),
    },
    words,
    groupIds: groups.map((g) => g.id),
  });
}
