import { Outlet, useOutletContext } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import './CorpAdminLayout.css';

export default function TeacherLayout() {
  const identity = useOutletContext();

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
      {/* Teacher Sidebar */}
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
    </div>
  );
}
