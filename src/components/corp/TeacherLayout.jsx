import { Navigate, Outlet, useOutletContext } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import TeacherBottomNav from './TeacherBottomNav';
import './CorpAdminLayout.css';

export default function TeacherLayout() {
  const identity = useOutletContext();

  // No placeholder centerId (see CorpAdminLayout) — writes against a made-up
  // id would create a nameless ghost center.
  if (!identity?.centerId) return <Navigate to="/corp" replace />;

  const centerId = identity.centerId;
  const centerName = identity?.centerName || 'O\'quv Markazi';
  const teacherId = identity?.teacherId || identity?.uid || 'demo_teacher_1';
  const teacherName = identity?.teacherName || identity?.name || 'O\'qituvchi';
  const email = identity?.email || '';
  const phone = identity?.phone || '';

  const contextValue = {
    centerId,
    centerName,
    teacherId,
    teacherName,
    email,
    phone
  };

  return (
    <div className="corp-admin-layout">
      {/* Teacher Sidebar (desktop only) */}
      <TeacherSidebar
        centerName={centerName}
        teacherName={teacherName}
        email={email}
        phone={phone}
      />

      {/* Main Content Pane */}
      <main className="corp-admin-main-pane">
        <Outlet context={contextValue} />
      </main>

      {/* Teacher Bottom Navigation (mobile only) */}
      <TeacherBottomNav />
    </div>
  );
}
