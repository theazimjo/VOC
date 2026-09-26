import { useMemo } from 'react';
import { Navigate, Outlet, useOutletContext } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import TeacherBottomNav from './TeacherBottomNav';
import { TeacherDataProvider } from '../../pages/corp/teacher/TeacherDataContext';
import './CorpAdminLayout.css';
import '../../pages/corp/super-admin/sa.css';

// Same Apple-style surface (sa-layout) as the admin panels.
export default function TeacherLayout() {
  const identity = useOutletContext();

  const value = useMemo(() => (identity?.centerId ? {
    centerId: identity.centerId,
    centerName: identity.centerName || "O'quv markazi",
    teacherId: identity.teacherId || identity.uid,
    teacherName: identity.teacherName || identity.name || "O'qituvchi",
    email: identity.email || '',
    phone: identity.phone || '',
  } : null), [identity]);

  // No placeholder centerId (see CorpAdminLayout) — writes against a made-up
  // id would create a nameless ghost center.
  if (!value) return <Navigate to="/corp" replace />;

  return (
    <TeacherDataProvider identity={value}>
      <div className="corp-admin-layout sa-layout">
        <TeacherSidebar centerName={value.centerName} teacherName={value.teacherName} email={value.email} phone={value.phone} />

        <main className="corp-admin-main-pane">
          <Outlet context={value} />
        </main>

        <TeacherBottomNav />
      </div>
    </TeacherDataProvider>
  );
}
