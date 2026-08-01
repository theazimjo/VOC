import { ref, set, get, update, push } from 'firebase/database';
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { db, auth } from '../firebase';
import { getSecondaryAuth } from '../firebaseSecondary';

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
      throw new Error('Bu telefon raqam / foydalanuvchi allaqachon ro\'yxatdan o\'tgan.', { cause: err });
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
 * Super Admin: List every center_admin/teacher across all centers (used by
 * the Global Users page). Super admins themselves are a hardcoded email
 * allowlist (see SUPER_ADMINS in useCorpRole.js), not corpUsers records, so
 * they don't appear here.
 */
export async function getAllCorpUsers() {
  const snap = await get(ref(db, 'corpUsers'));
  if (!snap.exists()) return [];
  const val = snap.val();
  return Object.keys(val).map(uid => ({ uid, ...val[uid] }));
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
 * Super Admin: Permanently remove a center and everything under it, plus
 * its cross-referenced entries in corpUsers/groupCodes (both live in
 * separate top-level trees and aren't cleaned up by deleting the center
 * node alone). Firebase Auth accounts for the admin/teachers are NOT
 * deleted (no Admin SDK available client-side) — removing their corpUsers
 * entry is what actually revokes their access, since CorpProtectedRoute
 * denies anyone without one.
 */
export async function deleteCenter(centerId) {
  const snap = await get(ref(db, `centers/${centerId}`));
  if (!snap.exists()) return;
  const center = snap.val();

  const updates = { [`centers/${centerId}`]: null };

  if (center.adminUid) {
    updates[`corpUsers/${center.adminUid}`] = null;
  }

  Object.values(center.teachers || {}).forEach((t) => {
    if (t.uid) updates[`corpUsers/${t.uid}`] = null;
  });

  Object.values(center.groups || {}).forEach((g) => {
    if (g.code) updates[`groupCodes/${g.code}`] = null;
  });

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

  return { id: teacherId, name, email, tempPassword };
}

export async function updateTeacherPassword(centerId, teacherId, uid, newPassword) {
  const updates = {};
  updates[`centers/${centerId}/teachers/${teacherId}/tempPassword`] = newPassword;
  if (uid) {
    updates[`corpUsers/${uid}/tempPassword`] = newPassword;
  }
  await update(ref(db), updates);
  return { success: true };
}

/**
 * Center Admin / Teacher: Create Custom Word Pack
 */
export async function createCustomPack(centerId, packData) {
  const packsRef = push(ref(db, `centers/${centerId}/customPacks`));
  const packId = packsRef.key;

  const payload = {
    id: packId,
    centerId,
    title: packData.title,
    level: packData.level || 'Elementary',
    description: packData.description || '',
    words: packData.words || [], // Array of { word, translation, definition, example }
    wordCount: (packData.words || []).length,
    createdAt: new Date().toISOString(),
    createdBy: packData.createdBy || 'Center Admin',
  };

  await set(packsRef, payload);
  return payload;
}

/**
 * Center Admin / Teacher: Duplicate an existing custom pack (same words,
 * title suffixed) — a quick starting point for a variant pack.
 */
export async function duplicateCustomPack(centerId, pack) {
  return createCustomPack(centerId, {
    title: `${pack.title} (Nusxa)`,
    level: pack.level,
    description: pack.description,
    words: pack.words || [],
    createdBy: pack.createdBy,
  });
}

/**
 * Center Admin / Teacher: Delete a custom pack. Does not touch groups that
 * already have it in their assignedPacks list (same orphan-reference
 * trade-off the reference app has for its own course deletes).
 */
export async function deleteCustomPack(centerId, packId) {
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
    level: groupData.level || 'Beginner',
    code,
    assignedPacks: groupData.assignedPacks || [], // list of pack IDs (default or custom)
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

/**
 * Teacher: Transfer Group to another Teacher
 */
export async function transferGroup(centerId, groupId, newTeacherId) {
  const groupRef = ref(db, `centers/${centerId}/groups/${groupId}`);
  await update(groupRef, {
    teacherId: newTeacherId,
    transferredAt: new Date().toISOString()
  });

  // Update global code lookup if needed
  const snapshot = await get(groupRef);
  if (snapshot.exists() && snapshot.val().code) {
    const code = snapshot.val().code;
    await update(ref(db, `groupCodes/${code}`), { teacherId: newTeacherId });
  }

  return true;
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
  
  await update(ref(db), updates);
  return true;
}

/**
 * Teacher: Assign Pack to Group
 */
export async function assignPackToGroup(centerId, groupId, packId) {
  const groupRef = ref(db, `centers/${centerId}/groups/${groupId}`);
  const snap = await get(groupRef);
  if (!snap.exists()) throw new Error('Guruh topilmadi');

  const group = snap.val();
  const currentPacks = group.assignedPacks || [];
  if (!currentPacks.includes(packId)) {
    currentPacks.push(packId);
    await update(groupRef, { assignedPacks: currentPacks });
  }
  return currentPacks;
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
    throw new Error('Kiritilgan guruh kodi noto\'g\'ri!');
  }

  const { centerId, groupId } = codeSnap.val();
  const groupRef = ref(db, `centers/${centerId}/groups/${groupId}`);
  const groupSnap = await get(groupRef);

  if (!groupSnap.exists()) {
    throw new Error('Guruh topilmadi!');
  }

  const group = groupSnap.val();
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
    const studentsRef = ref(db, `centers/${centerId}/groups/${groupId}/students`);
    const allStudsSnap = await get(studentsRef);
    const count = allStudsSnap.exists() ? Object.keys(allStudsSnap.val()).length : 1;
    await update(groupRef, { studentsCount: count });
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
  if (!snap.exists()) throw new Error('Guruh topilmadi');
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
 * Student: Update Learning Progress in a Group
 */
export async function updateStudentGroupProgress(centerId, groupId, studentId, packId, wordsLearnedCount) {
  const progressRef = ref(db, `centers/${centerId}/groups/${groupId}/students/${studentId}/progress/${packId}`);
  await set(progressRef, {
    wordsLearned: wordsLearnedCount,
    lastActivity: new Date().toISOString()
  });
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
