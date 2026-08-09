import { Outlet, useOutletContext } from 'react-router-dom';
import CorpAdminSidebar from './CorpAdminSidebar';
import CorpAdminBottomNav from './CorpAdminBottomNav';
import './CorpAdminLayout.css';

// The corp identity (role/centerId/centerName/email) is resolved once by
// CorpProtectedRoute and handed down via its <Outlet context={identity} />;
// read it here with useOutletContext() rather than re-deriving it, so the
// centerId used for every write below actually matches corpUsers/{uid}.
export default function CorpAdminLayout() {
  const identity = useOutletContext();

  const centerId = identity?.centerId || 'demo_center_1';
  const centerName = identity?.centerName || 'O\'quv Markazi';
  const email = identity?.email || '';

  return (
    <div className="corp-admin-layout">
      {/* Dedicated Center Admin Sidebar (desktop only) */}
      <CorpAdminSidebar centerName={centerName} email={email} />

      {/* Main Content Pane */}
      <main className="corp-admin-main-pane">
        <Outlet context={{ centerId, centerName }} />
      </main>

      {/* Center Admin Bottom Navigation (mobile only) */}
      <CorpAdminBottomNav />
    </div>
  );
}
