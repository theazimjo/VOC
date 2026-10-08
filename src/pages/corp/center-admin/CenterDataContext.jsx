import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ensureIrregularVerbsPack, getCenter } from '../../../services/corpService';
import { IRREGULAR_VERBS_PACK_ID } from '../../../data/irregularVerbsId';
import { computeCenterActivity, computeGroupActivity } from '../super-admin/centerActivity';

// The whole center node (teachers, groups with their students, packs) is
// one read the center admin is allowed to do,
// so every admin page shares it from here instead of each tab re-fetching.
// Lives in CorpAdminLayout, so switching pages doesn't reload anything.

const CenterDataContext = createContext(null);

function toList(obj) {
  return Object.entries(obj || {}).map(([id, v]) => ({ id, ...v }));
}

function nameFromEmail(email) {
  if (!email) return 'Admin';
  return email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function CenterDataProvider({ centerId, fallbackName, children }) {
  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    try {
      // Seed the shared system pack first so the read below already has it.
      await ensureIrregularVerbsPack(centerId).catch((err) => console.error('Irregular verbs pack:', err));
      setCenter(await getCenter(centerId));
      setError(null);
    } catch (err) {
      console.error('Error loading center:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [centerId]);

  useEffect(() => { reload(); }, [reload]);

  // Local patch after a successful write, so the UI updates without a
  // full re-read. `fn` receives the current center node.
  const patch = useCallback((fn) => setCenter((c) => (c ? fn(c) : c)), []);

  const value = useMemo(() => {
    const groups = toList(center?.groups).map((g) => ({ ...g, activity: computeGroupActivity(g) }));
    const activeGroups = groups.filter((g) => g.status !== 'archived');
    const teachers = toList(center?.teachers).map((t) => {
      const own = activeGroups.filter((g) => g.teacherId === t.id);
      return {
        ...t,
        groupsCount: own.length,
        studentsCount: own.reduce((sum, g) => sum + g.activity.students, 0),
        activeWeek: own.reduce((sum, g) => sum + g.activity.activeWeek, 0),
        lastActivity: Math.max(0, ...own.map((g) => g.activity.lastActivity || 0)) || null,
      };
    });

    // Admins who exist only as a corpUsers/{uid} role mapping, with no
    // centers/{id}/teachers/{} record of their own: the center's original
    // admin (adminUid/adminEmail, set once at center creation) and any
    // co-admins invited via inviteCenterAdmin (recorded under coAdmins so
    // they're discoverable at all — corpUsers/{uid} is only readable by
    // that uid itself). A teacher promoted to admin via changeTeacherRole
    // is NOT in this list — they already have a normal teacher record.
    const admins = [];
    if (center?.adminUid) admins.push({ uid: center.adminUid, email: center?.adminEmail || '', kind: 'primary' });
    toList(center?.coAdmins).forEach((c) => {
      if (c.uid && c.uid !== center?.adminUid) admins.push({ uid: c.uid, email: c.email || '', invitedAt: c.invitedAt || null, kind: 'co' });
    });

    // Keyed by id so `teacherById[group.teacherId]` resolves a class's
    // owner whether that id is a real teachers/{} push-key or an admin's
    // uid — a class's `teacherId` is just a foreign key to whoever runs it
    // (see ClassesTab.jsx), and an admin can own classes the same way a
    // teacher does.
    const teacherById = Object.fromEntries(teachers.map((t) => [t.id, t]));
    admins.forEach((a) => {
      const own = activeGroups.filter((g) => g.teacherId === a.uid);
      teacherById[a.uid] = {
        id: a.uid,
        uid: a.uid,
        name: nameFromEmail(a.email),
        email: a.email,
        isAdmin: true,
        groupsCount: own.length,
        studentsCount: own.reduce((sum, g) => sum + g.activity.students, 0),
        activeWeek: own.reduce((sum, g) => sum + g.activity.activeWeek, 0),
        lastActivity: Math.max(0, ...own.map((g) => g.activity.lastActivity || 0)) || null,
      };
    });

    // Packs a teacher created privately (ownerUid set) stay out of the
    // admin's course library.
    const packs = toList(center?.customPacks)
      .filter((p) => !p.ownerUid)
      .map((p) => {
        const used = activeGroups.filter((g) => (g.assignedPacks || []).includes(p.id));
        return {
          ...p,
          isSystem: p.id === IRREGULAR_VERBS_PACK_ID,
          // Older packs never stored sectionsCount — count their topics.
          sectionsCount: p.sectionsCount || (p.months || []).reduce((n, m) => n + (m.units || []).length, 0),
          wordsCount: p.wordCount || (p.words ? p.words.length : 0),
          groupsCount: used.length,
          studentsCount: used.reduce((sum, g) => sum + g.activity.students, 0),
        };
      });

    // Every student of every active group, tagged with group + teacher.
    const students = activeGroups.flatMap((g) => toList(g.students).map((st) => ({
      ...st,
      uid: st.id,
      groupId: g.id,
      groupName: g.name,
      teacherName: teacherById[g.teacherId]?.name || '—',
    })));

    return {
      centerId,
      center,
      centerName: center?.name || fallbackName || "O'quv markazi",
      loading,
      error,
      reload,
      patch,
      teachers,
      teacherById,
      admins,
      groups,
      activeGroups,
      packs,
      students,
      activity: computeCenterActivity(center ? { groups, teachersCount: teachers.length } : null),
    };
  }, [center, centerId, error, fallbackName, loading, patch, reload]);

  return <CenterDataContext.Provider value={value}>{children}</CenterDataContext.Provider>;
}

export function useCenterData() {
  const ctx = useContext(CenterDataContext);
  if (!ctx) throw new Error('useCenterData must be used inside CenterDataProvider');
  return ctx;
}
