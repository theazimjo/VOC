import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ensureIrregularVerbsPack, getCenter } from '../../../services/corpService';
import { IRREGULAR_VERBS_PACK_ID } from '../../../data/irregularVerbsCorpPack';
import { computeCenterActivity, computeGroupActivity } from '../super-admin/centerActivity';

// The whole center node (teachers, groups with their students, packs) is
// one read the center admin is allowed to do,
// so every admin page shares it from here instead of each tab re-fetching.
// Lives in CorpAdminLayout, so switching pages doesn't reload anything.

const CenterDataContext = createContext(null);

function toList(obj) {
  return Object.entries(obj || {}).map(([id, v]) => ({ id, ...v }));
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
    const teacherById = Object.fromEntries(teachers.map((t) => [t.id, t]));

    // Packs a teacher created privately (ownerUid set) stay out of the
    // admin's course library.
    const packs = toList(center?.customPacks)
      .filter((p) => !p.ownerUid)
      .map((p) => {
        const used = activeGroups.filter((g) => (g.assignedPacks || []).includes(p.id));
        return {
          ...p,
          isSystem: p.id === IRREGULAR_VERBS_PACK_ID,
          sectionsCount: p.sectionsCount || 0,
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
