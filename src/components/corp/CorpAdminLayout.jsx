import { Navigate, Outlet, useOutletContext } from 'react-router-dom';
import CorpAdminSidebar from './CorpAdminSidebar';
import CorpAdminBottomNav from './CorpAdminBottomNav';
import './CorpAdminLayout.css';

// The corp identity (role/centerId/centerName/email) is resolved once by
// CorpProtectedRoute and handed down via its <Outlet context={identity} />;
// read it here with useOutletContext() rather than re-deriving it, so the
// centerId used for every write below actually matches corpUsers/{uid}.
export default function CorpAdminLayout() {
  const identity = useOutletContext();

  // Never fall back to a placeholder centerId — writes against a made-up id
  // create a nameless "ghost" center under centers/ (this happened with the
  // old 'demo_center_1' fallback and crashed the super-admin centers list).
  if (!identity?.centerId) return <Navigate to="/corp" replace />;

  const centerId = identity.centerId;
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
