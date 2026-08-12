import { Outlet, useOutletContext } from 'react-router-dom';
import TeacherSidebar from '../../components/corp/TeacherSidebar';
import TeacherBottomNav from '../../components/corp/TeacherBottomNav';
import '../../components/corp/CorpAdminLayout.css';

// Independent-teacher counterpart of components/corp/TeacherLayout.jsx —
// same shell, no centerId (there is none for an independent teacher).
// Reuses TeacherSidebar/TeacherBottomNav via their basePath prop rather than
// duplicating them.
export default function IndependentTeacherLayout() {
  const identity = useOutletContext();

  const uid = identity?.uid;
  const teacherName = identity?.teacherName || identity?.name || 'Teacher';
  const email = identity?.email || '';
  const phone = identity?.phone || '';

  const contextValue = { uid, teacherName, email, phone };

  return (
    <div className="corp-admin-layout">
      <TeacherSidebar
        centerName="Independent"
        teacherName={teacherName}
        email={email}
        phone={phone}
        basePath="/teacher"
      />

      <main className="corp-admin-main-pane">
        <Outlet context={contextValue} />
      </main>

      <TeacherBottomNav basePath="/teacher" />
    </div>
  );
}
