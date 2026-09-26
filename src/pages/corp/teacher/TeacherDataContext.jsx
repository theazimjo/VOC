import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { auth } from '../../../firebase';
import { ensureIrregularVerbsPack, getActiveAnnouncementsForRole, getCenter } from '../../../services/corpService';
import { IRREGULAR_VERBS_PACK_ID } from '../../../data/irregularVerbsCorpPack';
import { computeGroupActivity, latestUnitActivity, studentMastery } from '../super-admin/centerActivity';
import { getHomeworkCompletion } from './utils';

// A teacher may read their whole center node, so one read gives every
// group with its students and homework plus the pack library — instead of
// one request per opened group (and per group again on the old Statistics
// tab). Provided by TeacherLayout, so moving between pages never refetches.

const TeacherDataContext = createContext(null);

function toList(obj) {
  return Object.entries(obj || {}).map(([id, v]) => ({ id, ...v }));
}

function byDateAsc(a, b) {
  return (Date.parse(a.assignedAt || '') || 0) - (Date.parse(b.assignedAt || '') || 0);
}

export function TeacherDataProvider({ identity, children }) {
  const { centerId, teacherId } = identity;
  const [center, setCenter] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    try {
      await ensureIrregularVerbsPack(centerId).catch((err) => console.error('Irregular verbs pack:', err));
      setCenter(await getCenter(centerId));
      setError(null);
    } catch (err) {
      console.error('Error loading teacher data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [centerId]);

  useEffect(() => { reload(); }, [reload]);

  useEffect(() => {
    getActiveAnnouncementsForRole('teacher')
      .then((list) => setAnnouncements(list || []))
      .catch((err) => console.error('Error loading announcements:', err));
  }, []);

  // Local patch after a successful write; `fn` gets the current center node.
  const patch = useCallback((fn) => setCenter((c) => (c ? fn(c) : c)), []);
  const patchGroup = useCallback((groupId, fn) => patch((c) => ({
    ...c,
    groups: { ...c.groups, [groupId]: fn(c.groups?.[groupId] || {}) },
  })), [patch]);

  const value = useMemo(() => {
    const myUid = auth.currentUser?.uid;

    // Center-wide packs plus this teacher's own private ones; the shared
    // Irregular Verbs pack always first.
    const packs = toList(center?.customPacks)
      .filter((p) => !p.ownerUid || p.ownerUid === myUid)
      .map((p) => ({
        ...p,
        scope: p.ownerUid ? 'own' : 'center',
        isSystem: p.id === IRREGULAR_VERBS_PACK_ID || Boolean(p.isIrregularVerbs),
        wordsCount: p.wordCount || (p.words ? p.words.length : 0),
      }))
      .sort((a, b) => b.isSystem - a.isSystem || (Date.parse(b.createdAt || '') || 0) - (Date.parse(a.createdAt || '') || 0));

    const groups = toList(center?.groups)
      .filter((g) => g.teacherId === teacherId)
      .map((g) => {
        const students = toList(g.students).map((st) => ({
          ...st,
          uid: st.id,
          last: latestUnitActivity(st) || null,
          mastery: studentMastery(st),
        }));
        const homework = toList(g.homeworkList).sort(byDateAsc);
        const latestHw = homework[homework.length - 1] || null;
        return {
          ...g,
          students,
          homework,
          latestHw,
          latestHwDone: latestHw ? students.filter((st) => getHomeworkCompletion(st, latestHw).allDone).length : 0,
          packIds: [...new Set([...(g.assignedPacks || []), ...(g.additionalPacks || [])])],
          activity: computeGroupActivity(g),
        };
      })
      .sort((a, b) => (b.activity.lastActivity || 0) - (a.activity.lastActivity || 0)
        || (Date.parse(b.createdAt || '') || 0) - (Date.parse(a.createdAt || '') || 0));

    const activeGroups = groups.filter((g) => g.status !== 'archived');

    return {
      ...identity,
      center,
      loading,
      error,
      reload,
      patch,
      patchGroup,
      packs,
      packById: Object.fromEntries(packs.map((p) => [p.id, p])),
      groups,
      activeGroups,
      archivedGroups: groups.filter((g) => g.status === 'archived'),
      otherTeachers: toList(center?.teachers).filter((t) => t.id !== teacherId),
      announcements,
      totals: {
        groups: activeGroups.length,
        students: activeGroups.reduce((sum, g) => sum + g.activity.students, 0),
        activeWeek: activeGroups.reduce((sum, g) => sum + g.activity.activeWeek, 0),
      },
    };
  }, [announcements, center, error, identity, loading, patch, patchGroup, reload, teacherId]);

  return <TeacherDataContext.Provider value={value}>{children}</TeacherDataContext.Provider>;
}

export function useTeacherData() {
  const ctx = useContext(TeacherDataContext);
  if (!ctx) throw new Error('useTeacherData must be used inside TeacherDataProvider');
  return ctx;
}
