import { useEffect, useMemo } from 'react';
import { Navigate, Outlet, useOutletContext } from 'react-router-dom';
import { markTeacherAccepted } from '../../services/corpService';
import TeacherSidebar from './TeacherSidebar';
import TeacherTopbar from './TeacherTopbar';
import TeacherBottomNav from './TeacherBottomNav';
import { TeacherDataProvider } from '../../pages/corp/teacher/TeacherDataContext';
import { PageStyleContext, PanelLanguageContext, SheetPlacementContext } from '../../pages/corp/super-admin/ui';
import './CorpAdminLayout.css';
import '../../pages/corp/super-admin/sa.css';
import '../../pages/corp/center-admin/theme.css';
import '../../pages/corp/center-admin/uits.css';
import '../../pages/corp/center-admin/vocabry.css';

// The same shell as the center admin panel (CorpAdminLayout): sidebar,
// topbar, always-light theme, centered sheets. `is-center-admin` is the
// class every center-admin look hangs off (theme.css / uits.css), so the
// teacher panel carries it too. Both panels are English (PanelLanguageContext).
export default function TeacherLayout() {
  const identity = useOutletContext();

  const value = useMemo(() => (identity?.centerId ? {
    centerId: identity.centerId,
    centerName: identity.centerName || 'Learning center',
    teacherId: identity.teacherId || identity.uid,
    teacherName: identity.teacherName || identity.name || 'Teacher',
    email: identity.email || '',
    phone: identity.phone || '',
  } : null), [identity]);

  useEffect(() => {
    if (value?.centerId && identity?.teacherId) markTeacherAccepted(value.centerId, identity.teacherId);
  }, [value, identity?.teacherId]);

  // No placeholder centerId (see CorpAdminLayout) — writes against a made-up
  // id would create a nameless ghost center.
  if (!value) return <Navigate to="/corp" replace />;

  return (
    <TeacherDataProvider identity={value}>
      <SheetPlacementContext.Provider value="center">
      <PageStyleContext.Provider value="toolbar">
      <PanelLanguageContext.Provider value="en">
      <div className="corp-admin-layout sa-layout ca-theme is-center-admin is-teacher-panel">
        <TeacherSidebar />

        <main className="corp-admin-main-pane">
          <TeacherTopbar />
          <Outlet context={value} />
        </main>

        <TeacherBottomNav />
      </div>
      </PanelLanguageContext.Provider>
      </PageStyleContext.Provider>
      </SheetPlacementContext.Provider>
    </TeacherDataProvider>
  );
}
