import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { ref, get, update, onValue } from 'firebase/database';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { useGroupMode } from '../../hooks/useGroupMode';
import { getGroup, getCenterCustomPacks } from '../../services/corpService';
import { getIndependentGroup, getIndependentCustomPacks } from '../../services/independentTeacherService';
import StudentSidebar from './StudentSidebar';
import StudentBottomNav from './StudentBottomNav';
import Navbar from '../Layout/Navbar';
import FullScreenLoader from '../common/FullScreenLoader';
import './CorpAdminLayout.css';

export default function StudentLayout() {
  const { user } = useAuth();
  const { loading: groupModeLoading, appMode, membership } = useGroupMode();

  const [group, setGroup] = useState(null);
  const [assignedPacks, setAssignedPacks] = useState([]);
  const [additionalPacks, setAdditionalPacks] = useState([]);
  const [requiredPacks, setRequiredPacks] = useState([]);
  const [homeworkList, setHomeworkList] = useState([]);
  const [wordTarget, setWordTarget] = useState(null);
  const [centerName, setCenterName] = useState('O\'quv Markazi');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (groupModeLoading) return;
    if (!membership) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    async function loadGroupPacks() {
      setLoading(true);
      try {
        const [freshGroup, centerPacks, centerNameSnap] = membership.independent
          ? await Promise.all([
              getIndependentGroup(membership.teacherUid, membership.groupId),
              getIndependentCustomPacks(membership.teacherUid),
              get(ref(db, `independentTeachers/${membership.teacherUid}/profile/teacherName`)),
            ])
          : await Promise.all([
              getGroup(membership.centerId, membership.groupId),
              getCenterCustomPacks(membership.centerId),
              get(ref(db, `centers/${membership.centerId}/name`)),
            ]);
        if (!freshGroup) {
          // Group was deleted by teacher! Clean up stale membership
          const updates = {};
          updates[`users/${user.uid}/groupMemberships/${membership.groupId}`] = null;
          updates[`users/${user.uid}/groupMembership`] = null;

          const allMembershipsSnap = await get(ref(db, `users/${user.uid}/groupMemberships`));
          let nextMembership = null;
          if (allMembershipsSnap.exists()) {
            const remaining = Object.values(allMembershipsSnap.val()).filter(m => m.groupId !== membership.groupId);
            if (remaining.length > 0) {
              nextMembership = remaining[0];
            }
          }

          if (nextMembership) {
            updates[`users/${user.uid}/groupMembership`] = nextMembership;
          } else {
            updates[`users/${user.uid}/profile/appMode`] = 'individual';
          }

          await update(ref(db), updates);
          if (!cancelled) setLoading(false);
          return;
        }

        setGroup(freshGroup);
        const assignedIds = new Set(freshGroup?.assignedPacks || []);
        const additionalIds = new Set(freshGroup?.additionalPacks || []);
        const requiredIds = new Set(freshGroup?.requiredPacks || []);
        setAssignedPacks(centerPacks.filter(p => assignedIds.has(p.id)));
        setAdditionalPacks(centerPacks.filter(p => additionalIds.has(p.id)));
        setRequiredPacks(centerPacks.filter(p => requiredIds.has(p.id)));
        if (centerNameSnap.exists()) {
          setCenterName(centerNameSnap.val());
        }
      } catch (err) {
        console.error('Error loading student packs:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadGroupPacks();
    return () => { cancelled = true; };
  }, [membership, groupModeLoading]);

  // Live-subscribed separately from the rest of the group (a one-time read
  // above) so a teacher adding a new homework assignment shows up
  // immediately in an already-open student session instead of only after a
  // reload. Every assignment ever given is kept (never overwritten), oldest
  // first — see corpService.addGroupHomework.
  useEffect(() => {
    if (!membership) return;
    const homeworkPath = membership.independent
      ? `independentTeachers/${membership.teacherUid}/groups/${membership.groupId}/homeworkList`
      : `centers/${membership.centerId}/groups/${membership.groupId}/homeworkList`;
    const homeworkRef = ref(db, homeworkPath);
    const unsub = onValue(homeworkRef, (snap) => {
      if (!snap.exists()) {
        setHomeworkList([]);
        return;
      }
      const val = snap.val();
      const list = Object.keys(val)
        .map(key => ({ id: key, ...val[key] }))
        .sort((a, b) => (a.assignedAt || '').localeCompare(b.assignedAt || ''));
      setHomeworkList(list);
    }, (err) => {
      console.error('Error listening to group homework:', err);
    });
    return unsub;
  }, [membership]);

  // The student's personal word-learning target, stored on their own
  // account (users/{uid}/profile/wordTarget) rather than nested under a
  // specific group's student record — so it (and the "learned" count it's
  // measured against) persists across group switches instead of resetting.
  useEffect(() => {
    if (!user) return;
    const targetRef = ref(db, `users/${user.uid}/profile/wordTarget`);
    const unsub = onValue(targetRef, (snap) => {
      setWordTarget(snap.exists() ? snap.val() : null);
    }, (err) => {
      console.error('Error listening to word target:', err);
    });
    return unsub;
  }, [user]);

  // Complete separation: if individual mode, redirect away from corp student layout
  if (!groupModeLoading && appMode === 'individual') {
    return <Navigate to="/" replace />;
  }

  if (groupModeLoading || loading) {
    return <FullScreenLoader />;
  }

  const student = group?.students?.[user.uid];
  const learnedPacksCount = Object.keys(student?.progress || {}).length;
  const progressPct = assignedPacks.length > 0
    ? Math.round((learnedPacksCount / assignedPacks.length) * 100)
    : 0;

  const contextValue = {
    user,
    membership: { ...membership, centerName },
    group,
    assignedPacks,
    additionalPacks,
    requiredPacks,
    homeworkList,
    wordTarget,
    student,
    learnedPacksCount,
    progressPct,
  };

  return (
    <div className="corp-admin-layout">
      {/* Student Sidebar */}
      <StudentSidebar />

      {/* Main Content Area */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
        <Navbar sidebarCollapsed={false} onHamburgerClick={() => {}} appMode="group" />
        
        {/* Main Content Pane */}
        <main className="corp-admin-main-pane" style={{ flex: 1, paddingTop: 'var(--navbar-height)' }}>
          <Outlet context={contextValue} />
        </main>
      </div>

      {/* Student Bottom Navigation (Mobile Only) */}
      <StudentBottomNav />
    </div>
  );
}
