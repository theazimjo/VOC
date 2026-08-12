import { Navigate, Outlet, useOutletContext } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import TeacherBottomNav from './TeacherBottomNav';
import './CorpAdminLayout.css';

export default function TeacherLayout() {
  const identity = useOutletContext();

  // Independent teachers have no centerId — this layout (and everything
  // under it) is center-scoped, so send them to their own dashboard instead
  // of falling through to the 'demo_center_1' placeholder below.
  if (identity?.independent) {
    return <Navigate to="/teacher" replace />;
  }

  const centerId = identity?.centerId || 'demo_center_1';
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
