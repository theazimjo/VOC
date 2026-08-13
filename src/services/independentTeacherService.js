// Sibling service to corpService.js for independent (centerless) teachers —
// a personal account that became a teacher without joining any learning
// center. Deliberately duplicated rather than branching centerId-or-not
// into every corpService function: these are short, self-contained
// get/set/push calls against one RTDB path each, so cloning them against
// `independentTeachers/{uid}/...` is far lower-risk than adding a null-check
// branch to ~15 already-working center-scoped functions. Every function here
// mirrors its corpService counterpart's shape/return value exactly, so the
// existing corp/teacher tab components (which only ever see data through the
// `p` prop bundle, never call a service directly) work unmodified when an
// independent-teacher dashboard wires its handlers to these instead.
import { ref, set, get, update, push, remove } from 'firebase/database';
import { db } from '../firebase';
import { IRREGULAR_VERBS_PACK_ID, IRREGULAR_VERBS_CORP_PACK } from '../data/irregularVerbsCorpPack';

function generateJoinCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Turn the already-signed-in personal account into an independent teacher —
 * writes independentTeachers/{uid}/profile (no secondary-auth new-account
 * creation, unlike corpService's createTeacher/createCorpAccount) since this
 * reuses the caller's existing login. Deliberately does NOT touch
 * corpUsers/{uid} at all: keeping independent status off that table is what
 * lets an account be independent AND a center-joined teacher (via
 * corpService.approveTeacherRequest, which still uses corpUsers/{uid}) at the
 * same time — see getTeacherAffiliations() in corpService.js, which reads
 * both tables to report an account's full set of affiliations.
 */
export async function becomeIndependentTeacher(uid, profile) {
  const [independentSnap, corpSnap] = await Promise.all([
    get(ref(db, `independentTeachers/${uid}/profile`)),
    get(ref(db, `corpUsers/${uid}`)),
  ]);
  if (independentSnap.exists()) {
    throw new Error("You're already an independent tutor.");
  }
  if (corpSnap.exists() && corpSnap.val().role && corpSnap.val().role !== 'teacher') {
    throw new Error('This account already has an admin role.');
  }

  const payload = {
    teacherName: profile.name,
    email: profile.email || '',
    phone: profile.phone || '',
    createdAt: new Date().toISOString(),
  };
  await set(ref(db, `independentTeachers/${uid}/profile`), payload);
  return { role: 'teacher', independent: true, centerId: null, centerName: null, teacherId: uid, ...payload };
}

/** Teacher: self-update name/phone on their own independent-teacher profile. */
export async function updateIndependentTeacherProfile(uid, { name, phone }) {
  await update(ref(db, `independentTeachers/${uid}/profile`), {
    teacherName: name,
    phone: phone || '',
  });
  return { success: true };
}

/**
 * Mirrors corpService.ensureIrregularVerbsPack — same self-healing seed of
 * the canonical Irregular Verbs pack, rooted at this teacher's own packs
 * instead of a center's.
 */
export async function ensureIndependentIrregularVerbsPack(uid) {
  const packRef = ref(db, `independentTeachers/${uid}/customPacks/${IRREGULAR_VERBS_PACK_ID}`);
  const snap = await get(packRef);

  if (snap.exists()) {
    const existing = snap.val();
    await update(packRef, {
      months: IRREGULAR_VERBS_CORP_PACK.months,
      wordCount: IRREGULAR_VERBS_CORP_PACK.wordCount,
    });
    return { id: IRREGULAR_VERBS_PACK_ID, ...existing, months: IRREGULAR_VERBS_CORP_PACK.months, wordCount: IRREGULAR_VERBS_CORP_PACK.wordCount };
  }

  const payload = {
    ...IRREGULAR_VERBS_CORP_PACK,
    teacherUid: uid,
    createdAt: new Date().toISOString(),
    createdBy: 'System',
  };
  await set(packRef, payload);
  return payload;
}

/** Teacher: create one of their own groups. */
export async function createIndependentGroup(uid, groupData) {
  const groupsRef = push(ref(db, `independentTeachers/${uid}/groups`));
  const groupId = groupsRef.key;
  let code = generateJoinCode();

  let codeRef = ref(db, `independentGroupCodes/${code}`);
  let codeSnap = await get(codeRef);
  let attempts = 0;
  while (codeSnap.exists() && attempts < 10) {
    code = generateJoinCode();
    codeRef = ref(db, `independentGroupCodes/${code}`);
    codeSnap = await get(codeRef);
    attempts++;
  }

  const payload = {
    id: groupId,
    teacherUid: uid,
    name: groupData.name,
    level: groupData.level || 'Beginner',
    code,
    assignedPacks: groupData.assignedPacks || [],
    additionalPacks: groupData.additionalPacks || [],
    requiredPacks: groupData.requiredPacks || [],
    createdAt: new Date().toISOString(),
    studentsCount: 0,
  };

  await set(groupsRef, payload);
  await set(ref(db, `independentGroupCodes/${code}`), {
    teacherUid: uid,
    groupId,
    code,
    name: groupData.name,
  });

  return payload;
}

/** Student: fetch a single group by id — mirrors corpService.getGroup. */
export async function getIndependentGroup(teacherUid, groupId) {
  const snap = await get(ref(db, `independentTeachers/${teacherUid}/groups/${groupId}`));
  return snap.exists() ? { id: groupId, ...snap.val() } : null;
}

export async function getIndependentGroups(uid) {
  const snap = await get(ref(db, `independentTeachers/${uid}/groups`));
  if (!snap.exists()) return [];
  const val = snap.val();
  return Object.keys(val).map(key => ({ id: key, ...val[key] }));
}

export async function updateIndependentGroupStatus(uid, groupId, status) {
  await update(ref(db, `independentTeachers/${uid}/groups/${groupId}`), {
    status,
    updatedAt: new Date().toISOString(),
  });
  return true;
}

export async function updateIndependentGroupDetails(uid, groupId, updates) {
  const groupRef = ref(db, `independentTeachers/${uid}/groups/${groupId}`);
  await update(groupRef, { ...updates, updatedAt: new Date().toISOString() });
  if (updates.name) {
    const snap = await get(groupRef);
    if (snap.exists() && snap.val().code) {
      await update(ref(db, `independentGroupCodes/${snap.val().code}`), { name: updates.name });
    }
  }
  return true;
}

export async function deleteIndependentGroup(uid, groupId) {
  const groupRef = ref(db, `independentTeachers/${uid}/groups/${groupId}`);
  const snap = await get(groupRef);
  if (!snap.exists()) return false;
  const group = snap.val();

  const updates = { [`independentTeachers/${uid}/groups/${groupId}`]: null };
  if (group.code) updates[`independentGroupCodes/${group.code}`] = null;
  if (group.students) {
    Object.keys(group.students).forEach(studentUid => {
      updates[`users/${studentUid}/groupMemberships/${groupId}`] = null;
    });
  }

  await update(ref(db), updates);
  return true;
}

export async function assignPackToIndependentGroup(uid, groupId, packId, listKey = 'assignedPacks') {
  const groupRef = ref(db, `independentTeachers/${uid}/groups/${groupId}`);
  const snap = await get(groupRef);
  if (!snap.exists()) throw new Error('Group not found');

  const group = snap.val();
  const currentPacks = group[listKey] || [];
  if (!currentPacks.includes(packId)) {
    currentPacks.push(packId);
    await update(groupRef, { [listKey]: currentPacks });
  }
  return currentPacks;
}

export async function removePackFromIndependentGroup(uid, groupId, packId, listKey = 'assignedPacks') {
  const groupRef = ref(db, `independentTeachers/${uid}/groups/${groupId}`);
  const snap = await get(groupRef);
  if (!snap.exists()) throw new Error('Group not found');

  const group = snap.val();
  const updatedPacks = (group[listKey] || []).filter(id => id !== packId);
  await update(groupRef, { [listKey]: updatedPacks });
  return updatedPacks;
}

/**
 * Student: join an independent teacher's group by code, using their own
 * personal account — mirrors corpService.joinGroupAsUser exactly (same
 * users/{uid}/groupMembership + groupMemberships + appMode writes) so the
 * app-wide GroupModeContext picks it up the same way. The membership record
 * carries `independent: true` and no `centerId` so any downstream code that
 * branches on `membership.centerId` degrades safely instead of erroring.
 */
export async function joinIndependentGroupByCode(code, uid, profile) {
  const codeSnap = await get(ref(db, `independentGroupCodes/${code}`));
  if (!codeSnap.exists()) {
    throw new Error('Invalid group code!');
  }

  const { teacherUid, groupId } = codeSnap.val();
  const groupRef = ref(db, `independentTeachers/${teacherUid}/groups/${groupId}`);
  const groupSnap = await get(groupRef);
  if (!groupSnap.exists()) {
    throw new Error('Group not found!');
  }

  const group = groupSnap.val();
  const existingSnap = await get(ref(db, `independentTeachers/${teacherUid}/groups/${groupId}/students/${uid}`));

  const studentPayload = existingSnap.exists()
    ? existingSnap.val()
    : {
        id: uid,
        name: profile.name,
        email: profile.email || '',
        joinedAt: new Date().toISOString(),
        progress: {},
      };

  await set(ref(db, `independentTeachers/${teacherUid}/groups/${groupId}/students/${uid}`), studentPayload);

  if (!existingSnap.exists()) {
    const studentsSnap = await get(ref(db, `independentTeachers/${teacherUid}/groups/${groupId}/students`));
    const count = studentsSnap.exists() ? Object.keys(studentsSnap.val()).length : 1;
    await update(groupRef, { studentsCount: count });
  }

  const membership = {
    independent: true,
    centerId: null,
    teacherUid,
    groupId,
    groupName: group.name,
    groupCode: code,
    joinedAt: studentPayload.joinedAt,
    level: group.level || 'General',
  };
  await set(ref(db, `users/${uid}/groupMembership`), membership);
  await set(ref(db, `users/${uid}/groupMemberships/${groupId}`), membership);
  await set(ref(db, `users/${uid}/profile/appMode`), 'group');

  return { group: { id: groupId, ...group }, teacherUid, student: studentPayload, membership };
}

/**
 * Student: update their own display name / avatar color on their group
 * record — mirrors corpService.updateStudentProfile.
 */
export async function updateIndependentStudentProfile(teacherUid, groupId, studentId, updates) {
  const studentRef = ref(db, `independentTeachers/${teacherUid}/groups/${groupId}/students/${studentId}`);
  await update(studentRef, updates);
}

/** Student: save practice results for one unit — mirrors corpService.updateStudentUnitProgress. */
export async function updateIndependentStudentUnitProgress(teacherUid, groupId, studentId, packId, unitKey, stats) {
  const unitRef = ref(db, `independentTeachers/${teacherUid}/groups/${groupId}/students/${studentId}/progress/${packId}/units/${unitKey}`);
  await update(unitRef, {
    wordsLearned: stats.wordsLearned || 0,
    totalWords: stats.totalWords || 0,
    masteryPercent: stats.masteryPercent || 0,
    retentionPercent: stats.retentionPercent || 0,
    atRiskCount: stats.atRiskCount || 0,
    lastActivity: new Date().toISOString(),
  });
}

export async function getIndependentGroupStudents(uid, groupId) {
  const snap = await get(ref(db, `independentTeachers/${uid}/groups/${groupId}/students`));
  if (!snap.exists()) return [];
  const val = snap.val();
  return Object.keys(val).map(key => ({ id: key, ...val[key] }));
}

export async function removeIndependentStudentFromGroup(uid, groupId, studentId) {
  const groupRef = ref(db, `independentTeachers/${uid}/groups/${groupId}`);
  const snap = await get(groupRef);
  const currentCount = snap.exists() ? (snap.val().studentsCount || 0) : 0;

  await remove(ref(db, `independentTeachers/${uid}/groups/${groupId}/students/${studentId}`));
  await update(groupRef, { studentsCount: Math.max(0, currentCount - 1) });
  return true;
}

export async function getIndependentGroupHomeworkList(uid, groupId) {
  const snap = await get(ref(db, `independentTeachers/${uid}/groups/${groupId}/homeworkList`));
  if (!snap.exists()) return [];
  const val = snap.val();
  return Object.keys(val)
    .map(key => ({ id: key, ...val[key] }))
    .sort((a, b) => (a.assignedAt || '').localeCompare(b.assignedAt || ''));
}

export async function addIndependentGroupHomework(uid, groupId, items) {
  const newRef = push(ref(db, `independentTeachers/${uid}/groups/${groupId}/homeworkList`));
  const now = new Date();
  const titles = items.map(i => i.unitTitle).filter(Boolean);
  const dateLabel = now.toLocaleDateString(undefined, { day: 'numeric', month: 'long' });
  const name = titles.length > 0
    ? `${dateLabel} — ${titles.slice(0, 3).join(', ')}${titles.length > 3 ? ` +${titles.length - 3}` : ''}`
    : dateLabel;
  const payload = { name, items, assignedAt: now.toISOString() };
  await set(newRef, payload);
  return { id: newRef.key, ...payload };
}

export async function getIndependentCustomPacks(uid) {
  const snap = await get(ref(db, `independentTeachers/${uid}/customPacks`));
  if (!snap.exists()) return [];
  const val = snap.val();
  return Object.keys(val).map(key => ({ id: key, ...val[key] }));
}

export async function createIndependentCustomPack(uid, packData) {
  const packsRef = push(ref(db, `independentTeachers/${uid}/customPacks`));
  const packId = packsRef.key;

  const payload = {
    id: packId,
    teacherUid: uid,
    title: packData.title,
    level: packData.level || 'Elementary',
    description: packData.description || '',
    language: packData.language || 'en-US',
    words: packData.words || [],
    wordCount: (packData.words || []).length,
    createdAt: new Date().toISOString(),
    createdBy: packData.createdBy || 'Teacher',
  };

  await set(packsRef, payload);
  return payload;
}

export async function duplicateIndependentCustomPack(uid, pack) {
  return createIndependentCustomPack(uid, {
    title: `${pack.title} (Nusxa)`,
    level: pack.level,
    description: pack.description,
    words: pack.words || [],
    createdBy: pack.createdBy,
  });
}

export async function deleteIndependentCustomPack(uid, packId) {
  await update(ref(db), { [`independentTeachers/${uid}/customPacks/${packId}`]: null });
}

export async function updateIndependentCustomPack(uid, packId, updates) {
  const payload = { ...updates };
  if (updates.words) payload.wordCount = updates.words.length;
  await update(ref(db, `independentTeachers/${uid}/customPacks/${packId}`), payload);
}
