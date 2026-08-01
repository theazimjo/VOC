import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { useGroupMode } from '../../hooks/useGroupMode';
import { getGroup, getCenterCustomPacks } from '../../services/corpService';
import StudentSidebar from './StudentSidebar';
import StudentBottomNav from './StudentBottomNav';
import Navbar from '../Layout/Navbar';
import './CorpAdminLayout.css';

export default function StudentLayout() {
  const { user } = useAuth();
  const { loading: groupModeLoading, appMode, membership } = useGroupMode();

  const [group, setGroup] = useState(null);
  const [assignedPacks, setAssignedPacks] = useState([]);
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
        const [freshGroup, centerPacks, centerNameSnap] = await Promise.all([
          getGroup(membership.centerId, membership.groupId),
          getCenterCustomPacks(membership.centerId),
          get(ref(db, `centers/${membership.centerId}/name`))
        ]);
        if (cancelled) return;

        setGroup(freshGroup);
        const assignedIds = new Set(freshGroup?.assignedPacks || []);
        setAssignedPacks(centerPacks.filter(p => assignedIds.has(p.id)));
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

  // Complete separation: if individual mode, redirect away from corp student layout
  if (!groupModeLoading && appMode === 'individual') {
    return <Navigate to="/" replace />;
  }

  if (groupModeLoading || loading) {
    return (
      <div className="corp-admin-layout" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0b0b0f' }}>
        <div style={{ color: '#c084fc', fontSize: '1rem', fontWeight: 600 }}>Yuklanmoqda...</div>
      </div>
    );
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
    student,
    learnedPacksCount,
    progressPct,
  };

  return (
    <div className="corp-admin-layout">
      {/* Student Sidebar */}
      <StudentSidebar />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
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
