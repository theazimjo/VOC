import { ref, set, get, update, push, remove, runTransaction } from 'firebase/database';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { db, auth } from '../firebase';
import { getSecondaryAuth } from '../firebaseSecondary';
import { IRREGULAR_VERBS_PACK_ID, IRREGULAR_VERBS_CORP_PACK } from '../data/irregularVerbsCorpPack';

// Helper to generate unique 6-digit join PIN
function generateJoinCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Helper to generate a temporary password shown once to the creator, who
// shares it with the new center admin / teacher out of band.
function generateTempPassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let pass = '';
  for (let i = 0; i < 10; i++) {
    pass += chars[Math.floor(Math.random() * chars.length)];
  }
  return pass;
}

/**
 * Create a Firebase Auth account for a corp role (center_admin or teacher)
 * without disturbing the current (creator's) session, and register the
 * role mapping under corpUsers/{uid} so CorpProtectedRoute can authorize them.
 */
async function createCorpAccount(email, roleRecord, customPassword = null) {
  const secondaryAuth = getSecondaryAuth();
  const password = customPassword || generateTempPassword();

  let cred;
  try {
    cred = await createUserWithEmailAndPassword(secondaryAuth, email, password);
  } catch (err) {
    if (err.code === 'auth/email-already-in-use') {
      throw new Error('This phone number / user is already registered.', { cause: err });
    }
    throw err;
  }

  const uid = cred.user.uid;
  await signOut(secondaryAuth);

  await set(ref(db, `corpUsers/${uid}`), {
    email,
    ...roleRecord,
    createdAt: new Date().toISOString(),
  });

  return { uid, email, tempPassword: password };
}

/**
 * Look up a logged-in user's corp role (center_admin / teacher) by uid.
 * Returns null if the uid has no corp role (e.g. an individual learner).
 */
export async function getCorpRole(uid) {
  const snap = await get(ref(db, `corpUsers/${uid}`));
  return snap.exists() ? snap.val() : null;
}

/**
 * Super Admin: every account on the platform (users/*), merged with its
 * corpUsers role if it has one. Reads the whole users tree — fine at the
 * current scale (tens to low hundreds of accounts); needs a summary index
 * before it grows into the thousands.
 */
export async function getAllPlatformUsers() {
  const [usersSnap, corpSnap] = await Promise.all([
    get(ref(db, 'users')),
    get(ref(db, 'corpUsers')),
  ]);
  const corp = corpSnap.exists() ? corpSnap.val() : {};
  const users = usersSnap.exists() ? usersSnap.val() : {};
  const uids = new Set([...Object.keys(users), ...Object.keys(corp)]);

  return [...uids].map((uid) => {
    const u = users[uid] || {};
    const c = corp[uid] || null;
    const profile = u.profile || {};
    const wordCount = Object.values(u.words || {}).reduce(
      (sum, pack) => sum + (pack && typeof pack === 'object' ? Object.keys(pack).length : 0), 0,
    );
    const memberships = Object.values(u.groupMemberships || {});
    return {
      uid,
      name: profile.displayName || c?.teacherName || c?.name || '',
      email: profile.email || c?.email || '',
      phone: c?.phone || profile.phone || '',
      createdAt: profile.createdAt || c?.createdAt || null,
      lastSeen: u.activity?.lastSeen || null,
      sessions: u.activity?.sessionCount || 0,
      streak: u.streak?.streakCount || 0,
      wordCount,
      packCount: Object.keys(u.packs || {}).length,
      corpRole: c?.role || null, // 'center_admin' | 'teacher' | null
      corpCenterName: c?.centerName || '',
      disabled: Boolean(c?.disabled),
      memberships, // [{ centerId, groupId, groupName, ... }]
      activeMembership: u.groupMembership || null,
    };
  });
}

/**
 * Super Admin: Enable/disable a center_admin or teacher's portal access
 * without deleting their record — resolveCorpIdentity() checks this flag
 * the same way it already checks a suspended center.
 */
export async function setCorpUserDisabled(uid, disabled) {
  await update(ref(db, `corpUsers/${uid}`), { disabled });
}

/**
 * Super Admin: Permanently remove a corp user's role mapping, revoking
 * their portal access (their Firebase Auth account itself isn't deletable
 * client-side — same trade-off as deleteCenter/removeTeacherFromCenter).
 */
export async function deleteCorpUser(uid) {
  await update(ref(db), { [`corpUsers/${uid}`]: null });
}

/**
 * Super Admin: Create a new Learning Center
 */
export async function createCenter(centerData) {
  const centersRef = ref(db, 'centers');
  const newCenterRef = push(centersRef);
  const centerId = newCenterRef.key;
  
  const payload = {
    id: centerId,
    name: centerData.name || 'Yangi O\'quv Markazi',
    adminEmail: centerData.adminEmail || '',
    phone: centerData.phone || '',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await set(newCenterRef, payload);
  return payload;
}

/**
 * Super Admin: Create the login account for a center's admin and link it
 * to the center record. Returns credentials to show once so the super
 * admin can hand them to the center admin.
 */
export async function createCenterAdminAccount(center) {
  const { uid, email, tempPassword } = await createCorpAccount(center.adminEmail, {
    role: 'center_admin',
    centerId: center.id,
    centerName: center.name,
  });

  await update(ref(db, `centers/${center.id}`), { adminUid: uid });

  return { email, tempPassword };
}

/**
 * Get a single center's own document (used by the center admin's own
 * dashboard/settings, as opposed to getCenterStats which is the super
 * admin's aggregate view).
 */
export async function getCenter(centerId) {
  const snap = await get(ref(db, `centers/${centerId}`));
  return snap.exists() ? { id: centerId, ...snap.val() } : null;
}

/**
 * Super Admin: Get all Learning Centers
 */
export async function getAllCenters() {
  const centersRef = ref(db, 'centers');
  const snapshot = await get(centersRef);
  if (!snapshot.exists()) return [];
  const val = snapshot.val();
  return Object.keys(val).map(key => ({ id: key, ...val[key] }));
}

/**
 * Super Admin: Edit a center's own fields (name/phone/status).
 * Deliberately excludes adminEmail — changing it here wouldn't change the
 * linked Firebase Auth account's email, so it would desync corpUsers/auth.
 */
export async function updateCenter(centerId, updates) {
  await update(ref(db, `centers/${centerId}`), {
    ...updates,
    updatedAt: new Date().toISOString(),
  });
}

export async function setCenterStatus(centerId, status) {
  return updateCenter(centerId, { status });
}

/**
 * All groups belonging to a center, regardless of teacher — used for
 * per-teacher stats (group/student counts), the group-assignment modal, and
 * center-wide aggregates.
 */
export async function getCenterGroups(centerId) {
  const snap = await get(ref(db, `centers/${centerId}/groups`));
  if (!snap.exists()) return [];
  const val = snap.val();
  return Object.keys(val).map(key => ({ id: key, ...val[key] }));
}

/**
 * Super Admin: Aggregate stats for one center (teachers/groups/students/packs)
 * plus the teacher list, used by the center detail view.
 */
export async function getCenterStats(centerId) {
  const [teachers, packs, groups] = await Promise.all([
    getCenterTeachers(centerId),
    getCenterCustomPacks(centerId),
    getCenterGroups(centerId),
  ]);

  const studentsCount = groups.reduce((sum, g) => sum + (g.studentsCount || 0), 0);

  return {
    teachers,
    groups,
    packsCount: packs.length,
    teachersCount: teachers.length,
    groupsCount: groups.length,
    studentsCount,
  };
}

/**
 * Super Admin: Send a Firebase password-reset email to a center admin or
 * teacher whose temp password was lost. Works without knowing their current
 * password or signing in as them.
 */
export async function sendCorpPasswordReset(email) {
  await sendPasswordResetEmail(getSecondaryAuth(), email);
}

/**
 * Super Admin: what deleting a center would touch — shown in the delete flow
 * before anything happens.
 */
export async function getCenterDeletionPreview(centerId) {
  const snap = await get(ref(db, `centers/${centerId}`));
  if (!snap.exists()) return null;
  const center = snap.val();
  const groups = Object.values(center.groups || {});
  const studentUids = new Set();
  groups.forEach((g) => Object.keys(g.students || {}).forEach((uid) => studentUids.add(uid)));
  return {
    name: center.name || centerId,
    teachers: Object.keys(center.teachers || {}).length,
    groups: groups.length,
    students: studentUids.size,
    packs: Object.keys(center.customPacks || {}).length,
  };
}

/**
 * Super Admin: delete a center.
 *
 * Removed: the center node (groups, packs, homework, progress under it), its
 * admin's and teachers' corpUsers roles (their personal VOC accounts stay),
 * and the group / teacher join codes.
 *
 * Kept: every student account and everything in users/{uid} — words,
 * streaks, personal packs. Students are only taken out of this center's
 * groups: the memberships are removed, the active group switches to another
 * group they're still in, or the app drops back to individual mode.
 *
 * One multi-path update, so it either all happens or none of it does.
 */
export async function deleteCenter(centerId) {
  const snap = await get(ref(db, `centers/${centerId}`));
  if (!snap.exists()) return;
  const center = snap.val();
  const groupIds = new Set(Object.keys(center.groups || {}));

  const updates = { [`centers/${centerId}`]: null };

  if (center.adminUid) updates[`corpUsers/${center.adminUid}`] = null;
  Object.values(center.teachers || {}).forEach((t) => {
    if (t.uid) updates[`corpUsers/${t.uid}`] = null;
  });

  Object.values(center.groups || {}).forEach((g) => {
    if (g.code) updates[`groupCodes/${g.code}`] = null;
  });
  if (center.teacherJoinCode) updates[`teacherJoinCodes/${center.teacherJoinCode}`] = null;

  const studentUids = new Set();
  Object.values(center.groups || {}).forEach((g) => {
    Object.keys(g.students || {}).forEach((uid) => studentUids.add(uid));
  });

  await Promise.all([...studentUids].map(async (uid) => {
    const [allSnap, activeSnap] = await Promise.all([
      get(ref(db, `users/${uid}/groupMemberships`)),
      get(ref(db, `users/${uid}/groupMembership`)),
    ]);
    const all = allSnap.exists() ? allSnap.val() : {};
    const remaining = [];
    Object.entries(all).forEach(([gid, m]) => {
      if (groupIds.has(gid) || m?.centerId === centerId) {
        updates[`users/${uid}/groupMemberships/${gid}`] = null;
      } else {
        remaining.push(m);
      }
    });

    const active = activeSnap.exists() ? activeSnap.val() : null;
    if (active && (active.centerId === centerId || groupIds.has(active.groupId))) {
      if (remaining.length > 0) {
        updates[`users/${uid}/groupMembership`] = remaining[0];
      } else {
        updates[`users/${uid}/groupMembership`] = null;
        updates[`users/${uid}/profile/appMode`] = 'individual';
      }
    }
  }));

  await update(ref(db), updates);
}

/**
 * Center Admin: Remove a teacher from the center. Deletes their teacher
 * record and their corpUsers role mapping (which is what actually revokes
 * portal access — see resolveCorpIdentity), same "can't delete the Firebase
 * Auth account client-side" trade-off as deleteCenter.
 */
export async function removeTeacherFromCenter(centerId, teacherId, uid) {
  const updates = { [`centers/${centerId}/teachers/${teacherId}`]: null };
  if (uid) updates[`corpUsers/${uid}`] = null;
  await update(ref(db), updates);
}

/**
 * Center Admin: All students across every group in the center, each tagged
 * with the group(s) they belong to (a student can be in more than one).
 */
export async function getCenterStudents(centerId) {
  const groups = await getCenterGroups(centerId);
  const byId = new Map();

  groups.forEach((group) => {
    Object.entries(group.students || {}).forEach(([studentId, student]) => {
      const groupTag = { groupId: group.id, groupName: group.name };
      if (byId.has(studentId)) {
        byId.get(studentId).groups.push(groupTag);
      } else {
        byId.set(studentId, { id: studentId, ...student, groups: [groupTag] });
      }
    });
  });

  return Array.from(byId.values());
}

/**
 * Center Admin: Get Teachers of a Center
 */
export async function getCenterTeachers(centerId) {
  const teachersRef = ref(db, `centers/${centerId}/teachers`);
  const snapshot = await get(teachersRef);
  if (!snapshot.exists()) return [];
  const val = snapshot.val();
  return Object.keys(val).map(key => ({ id: key, ...val[key] }));
}

/**
 * Center Admin: Create a teacher account directly. Mirrors
 * createCenterAdminAccount's secondary-auth pattern so the admin's own
 * session is untouched.
 */
export async function createTeacher(centerId, centerName, teacherForm) {
  const { name, phone, password, email: rawEmail, subject } = teacherForm;

  const cleanPhone = (phone || '').replace(/\D/g, '') || Date.now().toString();
  const email = rawEmail || `teacher_${cleanPhone}@markaz.uz`;

  const teacherRef = push(ref(db, `centers/${centerId}/teachers`));
  const teacherId = teacherRef.key;

  const { uid, tempPassword } = await createCorpAccount(email, {
    role: 'teacher',
    centerId,
    centerName: centerName || '',
    teacherId,
    teacherName: name,
    phone: phone || '',
  }, password);

  const teacherPayload = {
    id: teacherId,
    uid,
    centerId,
    name,
    email,
    phone: phone || '',
    subject: subject || 'Ingliz tili',
    status: 'active',
    createdAt: new Date().toISOString(),
  };

  await set(teacherRef, teacherPayload);

  return { id: teacherId, uid, name, email, tempPassword };
}

/**
 * Teacher: self-update name/phone on their own record. Requires the
 * database.rules.json addition granting `teachers/$teacherId` and
 * `corpUsers/$uid` self-write for these two fields only.
 */
export async function updateTeacherProfile(centerId, teacherId, uid, { name, phone }) {
  const updates = {};
  updates[`centers/${centerId}/teachers/${teacherId}/name`] = name;
  updates[`centers/${centerId}/teachers/${teacherId}/phone`] = phone || '';
  if (uid) {
    updates[`corpUsers/${uid}/teacherName`] = name;
    updates[`corpUsers/${uid}/phone`] = phone || '';
  }
  await update(ref(db), updates);
  return { success: true };
}

// All packs — center-wide and teacher-private alike — live in the same
// centers/{centerId}/customPacks collection, so a group's assignedPacks can
// point at either kind and student practice (which resolves pack content via
// getCenterCustomPacks, unmodified) keeps working with zero special-casing.
// Privacy for a teacher-private pack (ownerUid set) is enforced two ways:
// (1) database.rules.json only lets center_admin or that exact ownerUid
// write it, so other teachers can't edit/delete a colleague's private pack;
// (2) the admin dashboard and other teachers' pack lists filter it out
// client-side (see CenterAdminDashboard.jsx / TeacherDashboard.jsx). Note
// this is UI-level hiding, not airtight DB-level secrecy — `centers` is
// already publicly readable for unrelated reasons (students join with no
// account), an accepted trade-off for this internal-tool scale.

/**
 * Center Admin / Teacher: Create a Custom Word Pack. Pass `ownerUid` to tag
 * it as a private pack owned by that teacher instead of a center-wide one.
 */
export async function createCustomPack(centerId, packData, ownerUid = null) {
  const packsRef = push(ref(db, `centers/${centerId}/customPacks`));
  const packId = packsRef.key;

  const payload = {
    id: packId,
    centerId,
    title: packData.title,
    level: packData.level || 'Elementary',
    description: packData.description || '',
    language: packData.language || 'en-US',
    words: packData.words || [], // Array of { word, translation, definition, example }
    wordCount: (packData.words || []).length,
    createdAt: new Date().toISOString(),
    createdBy: packData.createdBy || 'Center Admin',
    ...(ownerUid ? { ownerUid } : {}),
  };

  await set(packsRef, payload);
  return payload;
}

/**
 * Center Admin / Teacher: Duplicate an existing custom pack (same words,
 * title suffixed) — a quick starting point for a variant pack. Duplicating
 * always produces a private copy owned by `ownerUid` when given one, even
 * if the source was a shared center pack.
 */
export async function duplicateCustomPack(centerId, pack, ownerUid = null) {
  const copy = await createCustomPack(centerId, {
    title: `${pack.title} (Nusxa)`,
    level: pack.level,
    description: pack.description,
    language: pack.language,
    words: pack.words || [],
    createdBy: pack.createdBy,
  }, ownerUid);
  // Month / topic structure too — without it the copy collapses into one
  // flat word list.
  if (!pack.months?.length && !pack.units?.length) return copy;
  const structure = {
    months: pack.months || [],
    units: pack.units || [],
    sectionsCount: pack.sectionsCount || (pack.units || []).length,
  };
  await update(ref(db, `centers/${centerId}/customPacks/${copy.id}`), structure);
  return { ...copy, ...structure };
}

/**
 * Center Admin / Teacher: Delete a custom pack. Does not touch groups that
 * already have it in their assignedPacks list (same orphan-reference
 * trade-off the reference app has for its own course deletes).
 */
export async function deleteCustomPack(centerId, packId) {
  if (packId === IRREGULAR_VERBS_PACK_ID) {
    throw new Error("Irregular Verbs pack is a system pack and cannot be deleted.");
  }
  await update(ref(db), { [`centers/${centerId}/customPacks/${packId}`]: null });
}

/**
 * Center Admin / Teacher: Update a custom pack's title/level/description
 * and/or its word list in place (keeps the same id, so groups that already
 * have it in assignedPacks keep pointing at the updated content).
 */
export async function updateCustomPack(centerId, packId, updates) {
  const payload = { ...updates };
  if (updates.words) {
    payload.wordCount = updates.words.length;
  }
  await update(ref(db, `centers/${centerId}/customPacks/${packId}`), payload);
}

/**
 * Get a single Group by id (used to refresh assignedPacks/studentsCount)
 */
export async function getGroup(centerId, groupId) {
  const snap = await get(ref(db, `centers/${centerId}/groups/${groupId}`));
  return snap.exists() ? { id: groupId, ...snap.val() } : null;
}

/**
 * Get Custom Word Packs of a Center
 */
export async function getCenterCustomPacks(centerId) {
  const packsRef = ref(db, `centers/${centerId}/customPacks`);
  const snapshot = await get(packsRef);
  if (!snapshot.exists()) return [];
  const val = snapshot.val();
  return Object.keys(val).map(key => ({ id: key, ...val[key] }));
}

/**
 * Make sure this center has the canonical, system-wide Irregular Verbs pack
 * available to assign to groups (typically under "Qo'shimcha"). It's seeded
 * under the same fixed key (IRREGULAR_VERBS_PACK_ID) in every center rather
 * than a random push() id, specifically so that a student's per-verb mastery
 * — stored via corpWordStorageId() — lands in one shared record regardless
 * of which center/group/topic they practiced it through.
 *
 * The set/unit breakdown (`months`) and word count always self-heal to the
 * current IRREGULAR_VERBS_CORP_PACK on every call — it's static code-defined
 * content, not something a teacher edits, so a center that seeded an older
 * copy (e.g. before sets were renamed) picks up the rename automatically
 * instead of staying stuck on whatever was written the first time. Title/
 * description/level are only set on first creation, so an admin's own edits
 * to those (via CustomPackEditor) are left alone on later calls.
 */
export async function ensureIrregularVerbsPack(centerId) {
  const packRef = ref(db, `centers/${centerId}/customPacks/${IRREGULAR_VERBS_PACK_ID}`);
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
    centerId,
    createdAt: new Date().toISOString(),
    createdBy: 'System',
  };
  await set(packRef, payload);
  return payload;
}

/**
 * Teacher: Create a Group
 */
export async function createGroup(centerId, teacherId, groupData) {
  const groupsRef = push(ref(db, `centers/${centerId}/groups`));
  const groupId = groupsRef.key;
  let code = generateJoinCode();

  // Ensure code uniqueness in global lookup table
  let codeRef = ref(db, `groupCodes/${code}`);
  let codeSnap = await get(codeRef);
  let attempts = 0;
  while (codeSnap.exists() && attempts < 10) {
    code = generateJoinCode();
    codeRef = ref(db, `groupCodes/${code}`);
    codeSnap = await get(codeRef);
    attempts++;
  }

  const payload = {
    id: groupId,
    centerId,
    teacherId,
    name: groupData.name, // e.g. "General English - Group A"
    ...(groupData.level ? { level: groupData.level } : {}), // optional, no longer asked for
    code,
    assignedPacks: groupData.assignedPacks || [], // list of pack IDs (default or custom) — "Asosiy"
    additionalPacks: groupData.additionalPacks || [], // "Qo'shimcha" (optional/supplementary) packs
    requiredPacks: groupData.requiredPacks || [], // "Kerakli" (mandatory) packs
    createdAt: new Date().toISOString(),
    studentsCount: 0,
  };

  // Save to center groups and global groupCodes mapping
  await set(groupsRef, payload);
  await set(ref(db, `groupCodes/${code}`), {
    centerId,
    groupId,
    teacherId,
    code,
    name: groupData.name
  });

  return payload;
}

/**
 * Teacher: Get Groups of a Teacher
 */
export async function getTeacherGroups(centerId, teacherId) {
  const groupsRef = ref(db, `centers/${centerId}/groups`);
  const snapshot = await get(groupsRef);
  if (!snapshot.exists()) return [];
  const val = snapshot.val();
  return Object.keys(val)
    .map(key => ({ id: key, ...val[key] }))
    .filter(g => g.teacherId === teacherId);
}

export async function updateGroupStatus(centerId, groupId, status) {
  const groupRef = ref(db, `centers/${centerId}/groups/${groupId}`);
  await update(groupRef, {
    status,
    updatedAt: new Date().toISOString()
  });
  return true;
}

export async function updateGroupDetails(centerId, groupId, updates) {
  const groupRef = ref(db, `centers/${centerId}/groups/${groupId}`);
  await update(groupRef, {
    ...updates,
    updatedAt: new Date().toISOString()
  });
  // Also update the global code mapping name if name is updated
  if (updates.name) {
    const snap = await get(groupRef);
    if (snap.exists() && snap.val().code) {
      const code = snap.val().code;
      await update(ref(db, `groupCodes/${code}`), { name: updates.name });
    }
  }
  return true;
}

/**
 * Teacher: give a group a fresh 6-digit invite code. Students join by
 * looking the code up in the global `groupCodes` index, so the index moves
 * with it: the new code starts resolving and the old one (and its QR) stops,
 * in one atomic write.
 */
export async function regenerateGroupCode(centerId, groupId) {
  const snap = await get(ref(db, `centers/${centerId}/groups/${groupId}`));
  if (!snap.exists()) throw new Error('Group not found');
  const group = snap.val();

  let code = generateJoinCode();
  let attempts = 0;
  while ((await get(ref(db, `groupCodes/${code}`))).exists() && attempts < 10) {
    code = generateJoinCode();
    attempts++;
  }

  const updates = {
    [`centers/${centerId}/groups/${groupId}/code`]: code,
    [`centers/${centerId}/groups/${groupId}/updatedAt`]: new Date().toISOString(),
    [`groupCodes/${code}`]: { centerId, groupId, teacherId: group.teacherId, code, name: group.name || '' },
  };
  if (group.code && group.code !== code) updates[`groupCodes/${group.code}`] = null;
  await update(ref(db), updates);
  return code;
}

/**
 * Teacher: hand a group over to another teacher of the same center. The
 * code index carries the owning teacher too (the DB rules check it), so it
 * moves in the same write.
 */
export async function transferGroup(centerId, groupId, newTeacherId) {
  const snap = await get(ref(db, `centers/${centerId}/groups/${groupId}`));
  if (!snap.exists()) throw new Error('Group not found');
  const group = snap.val();
  const updates = {
    [`centers/${centerId}/groups/${groupId}/teacherId`]: newTeacherId,
    [`centers/${centerId}/groups/${groupId}/updatedAt`]: new Date().toISOString(),
  };
  if (group.code) updates[`groupCodes/${group.code}/teacherId`] = newTeacherId;
  await update(ref(db), updates);
}

export async function deleteGroup(centerId, groupId) {
  const groupRef = ref(db, `centers/${centerId}/groups/${groupId}`);
  const snap = await get(groupRef);
  if (!snap.exists()) return false;
  const group = snap.val();
  
  const updates = {
    [`centers/${centerId}/groups/${groupId}`]: null
  };
  
  if (group.code) {
    updates[`groupCodes/${group.code}`] = null;
  }
  
  // Clean up student membership references if accessible
  if (group.students) {
    Object.keys(group.students).forEach(uid => {
      updates[`users/${uid}/groupMemberships/${groupId}`] = null;
    });
  }

  await update(ref(db), updates);
  return true;
}

/**
 * Teacher: Assign Pack to Group.
 * `listKey` selects which category the pack is assigned under:
 * 'assignedPacks' (Asosiy), 'additionalPacks' (Qo'shimcha) or 'requiredPacks' (Kerakli).
 */
export async function assignPackToGroup(centerId, groupId, packId, listKey = 'assignedPacks') {
  const groupRef = ref(db, `centers/${centerId}/groups/${groupId}`);
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

/**
 * Teacher: Unassign (remove) a Pack from a Group's given category list.
 */
export async function removePackFromGroup(centerId, groupId, packId, listKey = 'assignedPacks') {
  const groupRef = ref(db, `centers/${centerId}/groups/${groupId}`);
  const snap = await get(groupRef);
  if (!snap.exists()) throw new Error('Group not found');

  const group = snap.val();
  const updatedPacks = (group[listKey] || []).filter(id => id !== packId);
  await update(groupRef, { [listKey]: updatedPacks });
  return updatedPacks;
}

/**
 * Student: Join a Group by 6-digit Code (PIN) using their real VOC account.
 * The student's own Firebase uid is the student record's key — this ties
 * RTDB write access to `auth.uid === $studentId` (see database.rules.json),
 * instead of the old anonymous-join model where anyone could write any
 * student node. Also records the membership under the student's own
 * `users/{uid}/groupMembership` so ProfilePage / Layout can read it without
 * needing corp-side read access.
 */
export async function joinGroupAsUser(code, uid, profile) {
  const codeSnap = await get(ref(db, `groupCodes/${code}`));
  if (!codeSnap.exists()) {
    throw new Error('Invalid group code!');
  }

  const { centerId, groupId } = codeSnap.val();
  // A student who hasn't joined yet can't read the group node (only its
  // members can — see database.rules.json), just these few public fields.
  const groupBase = `centers/${centerId}/groups/${groupId}`;
  const [nameSnap, levelSnap] = await Promise.all([
    get(ref(db, `${groupBase}/name`)),
    get(ref(db, `${groupBase}/level`)),
  ]);

  if (!nameSnap.exists()) {
    throw new Error('Group not found!');
  }

  const group = { name: nameSnap.val(), level: levelSnap.exists() ? levelSnap.val() : undefined };
  const existingSnap = await get(ref(db, `centers/${centerId}/groups/${groupId}/students/${uid}`));

  const studentPayload = existingSnap.exists()
    ? existingSnap.val()
    : {
        id: uid,
        name: profile.name,
        email: profile.email || '',
        joinedAt: new Date().toISOString(),
        progress: {},
      };

  await set(ref(db, `centers/${centerId}/groups/${groupId}/students/${uid}`), studentPayload);

  if (!existingSnap.exists()) {
    await runTransaction(ref(db, `${groupBase}/studentsCount`), (n) => (n || 0) + 1);
  }

  const membership = {
    centerId,
    groupId,
    groupName: group.name,
    groupCode: code,
    joinedAt: studentPayload.joinedAt,
    level: group.level || 'General',
  };
  await set(ref(db, `users/${uid}/groupMembership`), membership);
  await set(ref(db, `users/${uid}/groupMemberships/${groupId}`), membership);
  await set(ref(db, `users/${uid}/profile/appMode`), 'group');

  return { group: { id: groupId, ...group }, centerId, student: studentPayload, membership };
}

export async function switchActiveGroup(uid, groupId) {
  const snap = await get(ref(db, `users/${uid}/groupMemberships/${groupId}`));
  if (!snap.exists()) throw new Error('Group not found');
  const membership = snap.val();
  await set(ref(db, `users/${uid}/groupMembership`), membership);
  await set(ref(db, `users/${uid}/profile/appMode`), 'group');
  return membership;
}

export async function getJoinedGroups(uid) {
  const snap = await get(ref(db, `users/${uid}/groupMemberships`));
  if (!snap.exists()) return [];
  const val = snap.val();
  return Object.values(val);
}

/**
 * Switch a logged-in user's app mode without leaving their group
 * (individual <-> group). Group membership itself is untouched.
 */
export async function setAppMode(uid, mode) {
  await set(ref(db, `users/${uid}/profile/appMode`), mode);
}

/**
 * Get Students & Progress of a Group
 */
export async function getGroupStudents(centerId, groupId) {
  const studentsRef = ref(db, `centers/${centerId}/groups/${groupId}/students`);
  const snapshot = await get(studentsRef);
  if (!snapshot.exists()) return [];
  const val = snapshot.val();
  return Object.keys(val).map(key => ({ id: key, ...val[key] }));
}

/**
 * Teacher: Remove a student from one of their groups. Write access comes
 * from the cascading `.write` rule on `groups/$groupId` (owning teacher),
 * which already covers this nested path — no separate rule needed.
 * Note: this can't clean up the student's own `users/{uid}/groupMemberships`
 * pointer (teachers have no write access to another user's account tree),
 * so it's left stale until the student next joins/switches groups.
 */
export async function removeStudentFromGroup(centerId, groupId, studentId) {
  const groupRef = ref(db, `centers/${centerId}/groups/${groupId}`);
  const snap = await get(groupRef);
  const currentCount = snap.exists() ? (snap.val().studentsCount || 0) : 0;

  await remove(ref(db, `centers/${centerId}/groups/${groupId}/students/${studentId}`));
  await update(groupRef, { studentsCount: Math.max(0, currentCount - 1) });
  return true;
}

/**
 * Teacher: Read every homework assignment ever given to a group, oldest
 * first. Each is its own dated batch, never overwritten — a student's
 * "done" status and a teacher's per-assignment stats stay tied to exactly
 * the topics that were handed out that day, and a topic already used in an
 * earlier assignment can be excluded from the next one (see
 * getHomeworkCandidates in TeacherDashboard.jsx). Each item just points at
 * an existing topic (packId/monthId/unitId) already assigned to the group
 * under Asosiy/Qo'shimcha — it's not a copy of that pack's words, so a
 * student's progress there is the exact same record CorpPractice/
 * StudentCorpLearn already read/write (see utils/helpers.corpWordStorageId).
 */
export async function getGroupHomeworkList(centerId, groupId) {
  const snap = await get(ref(db, `centers/${centerId}/groups/${groupId}/homeworkList`));
  if (!snap.exists()) return [];
  const val = snap.val();
  return Object.keys(val)
    .map(key => ({ id: key, ...val[key] }))
    .sort((a, b) => (a.assignedAt || '').localeCompare(b.assignedAt || ''));
}

/**
 * Teacher: Add a new homework assignment — never replaces past ones.
 * `items` is [{ packId, monthId, unitId, packTitle, unitTitle, totalWords }].
 * The name is auto-generated from the assignment date plus the set names in
 * it (e.g. "7-avgust — Set 1, Set 3, Set 5"), so each round reads as what it
 * actually was instead of a generic label.
 */
export async function addGroupHomework(centerId, groupId, items) {
  const newRef = push(ref(db, `centers/${centerId}/groups/${groupId}/homeworkList`));
  const now = new Date();
  const titles = items.map(i => i.unitTitle).filter(Boolean);
  const dateLabel = now.toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long' });
  const name = titles.length > 0
    ? `${dateLabel} — ${titles.slice(0, 3).join(', ')}${titles.length > 3 ? ` +${titles.length - 3}` : ''}`
    : dateLabel;
  const payload = { name, items, assignedAt: now.toISOString() };
  await set(newRef, payload);
  return { id: newRef.key, ...payload };
}

/**
 * Student: Update Learning Progress for one unit within a group's assigned
 * pack. `stats` mirrors the same mastery/retention numbers the student's own
 * "Memory Twin" card computes (see StudentCorpLearn.jsx) so the teacher
 * sees equivalent numbers, since teachers have no read access to a
 * student's raw `users/{uid}/words`.
 *
 * Written per-unit (`progress/{packId}/units/{unitKey}`) rather than one
 * flat per-pack snapshot, so a teacher can see exactly which topics a
 * student has covered ("3-mavzuni yodlab keling" — a teacher needs to check
 * unit 3 specifically, not just an overall pack %). Uses `update()` on just
 * this unit's node so practicing one unit never clobbers another unit's
 * already-recorded progress under the same pack.
 */
export async function updateStudentUnitProgress(centerId, groupId, studentId, packId, unitKey, stats) {
  const unitRef = ref(db, `centers/${centerId}/groups/${groupId}/students/${studentId}/progress/${packId}/units/${unitKey}`);
  await update(unitRef, {
    wordsLearned: stats.wordsLearned || 0,
    totalWords: stats.totalWords || 0,
    masteryPercent: stats.masteryPercent || 0,
    retentionPercent: stats.retentionPercent || 0,
    atRiskCount: stats.atRiskCount || 0,
    lastActivity: new Date().toISOString()
  });
}

/**
 * Student: Set their personal word-learning target. Stored on the
 * student's own account (users/{uid}/profile), not nested under any one
 * group's student record, so switching groups never resets it (or the
 * "learned" count it's measured against — see useAccountWordProgress).
 */
export async function updateStudentWordTarget(uid, wordTarget) {
  await update(ref(db, `users/${uid}/profile`), { wordTarget });
}

/**
 * Student: Update their own display name / avatar color on their group
 * record (the same `centers/{centerId}/groups/{groupId}/students/{uid}`
 * node the teacher's roster reads from).
 */
export async function updateStudentProfile(centerId, groupId, studentId, updates) {
  const studentRef = ref(db, `centers/${centerId}/groups/${groupId}/students/${studentId}`);
  await update(studentRef, updates);
}

/**
 * Super Admin: Create a platform-wide announcement, shown to center admins
 * and/or teachers depending on `target`.
 */
export async function createAnnouncement(data) {
  const annRef = push(ref(db, 'announcements'));
  const payload = {
    id: annRef.key,
    title: data.title,
    message: data.message,
    type: data.type || 'info', // info, warning, critical
    target: data.target || 'all', // all, center_admin, teacher
    isActive: true,
    createdAt: Date.now(),
  };
  await set(annRef, payload);
  return payload;
}

/**
 * Super Admin: All announcements, newest first (management list).
 */
export async function getAllAnnouncements() {
  const snap = await get(ref(db, 'announcements'));
  if (!snap.exists()) return [];
  const val = snap.val();
  return Object.keys(val)
    .map(id => ({ id, ...val[id] }))
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

/**
 * Center Admin / Teacher: Active announcements targeted at their role (or
 * "all"), for a dashboard banner.
 */
export async function getActiveAnnouncementsForRole(role) {
  const all = await getAllAnnouncements();
  return all.filter(a => a.isActive && (a.target === 'all' || a.target === role));
}

export async function updateAnnouncement(id, updates) {
  await update(ref(db, `announcements/${id}`), { ...updates, updatedAt: Date.now() });
}

export async function toggleAnnouncementActive(id, isActive) {
  await update(ref(db, `announcements/${id}`), { isActive, updatedAt: Date.now() });
}

export async function deleteAnnouncement(id) {
  await update(ref(db), { [`announcements/${id}`]: null });
}

/**
 * Super Admin: Platform-wide maintenance mode for the /corp portal only —
 * deliberately does NOT touch the individual-learner app, which stays
 * untouched per this platform's scope. Gated in CorpLayout.jsx.
 */
export async function setMaintenanceMode(enabled) {
  await set(ref(db, 'settings/global/maintenanceMode'), enabled);
  await set(ref(db, 'settings/global/updatedAt'), Date.now());
}
export async function getPlatformUser(uid) {
  const [userSnap, corpSnap] = await Promise.all([
    get(ref(db, `users/${uid}`)),
    get(ref(db, `corpUsers/${uid}`)),
  ]);
  const u = userSnap.exists() ? userSnap.val() : {};
  const c = corpSnap.exists() ? corpSnap.val() : null;
  const profile = u.profile || {};
  const wordCount = Object.values(u.words || {}).reduce(
    (sum, pack) => sum + (pack && typeof pack === 'object' ? Object.keys(pack).length : 0), 0,
  );
  const memberships = Object.values(u.groupMemberships || {});
  return {
    uid,
    name: profile.displayName || c?.teacherName || c?.name || '',
    email: profile.email || c?.email || '',
    phone: c?.phone || profile.phone || '',
    createdAt: profile.createdAt || c?.createdAt || null,
    lastSeen: u.activity?.lastSeen || null,
    sessions: u.activity?.sessionCount || 0,
    streak: u.streak?.streakCount || 0,
    wordCount,
    packCount: Object.keys(u.packs || {}).length,
    corpRole: c?.role || null, // 'center_admin' | 'teacher' | null
    corpCenterName: c?.centerName || '',
    disabled: Boolean(c?.disabled),
    memberships, // [{ centerId, groupId, groupName, ... }]
    activeMembership: u.groupMembership || null,
  };
}
