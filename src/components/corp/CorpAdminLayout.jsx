import { Navigate, Outlet, useOutletContext } from 'react-router-dom';
import CorpAdminSidebar from './CorpAdminSidebar';
import CorpAdminBottomNav from './CorpAdminBottomNav';
import { CenterDataProvider } from '../../pages/corp/center-admin/CenterDataContext';
import './CorpAdminLayout.css';
import '../../pages/corp/super-admin/sa.css';

// The corp identity (role/centerId/centerName/email) is resolved once by
// CorpProtectedRoute and handed down via its <Outlet context={identity} />;
// read it here with useOutletContext() rather than re-deriving it, so the
// centerId used for every write below actually matches corpUsers/{uid}.
// Same Apple-style surface (sa-layout) as the super admin panel.
export default function CorpAdminLayout() {
  const identity = useOutletContext();

  // Never fall back to a placeholder centerId — writes against a made-up id
  // create a nameless "ghost" center under centers/ (this happened with the
  // old 'demo_center_1' fallback and crashed the super-admin centers list).
  if (!identity?.centerId) return <Navigate to="/corp" replace />;

  const centerId = identity.centerId;
  const centerName = identity?.centerName || "O'quv markazi";
  const email = identity?.email || '';

  return (
    <CenterDataProvider centerId={centerId} fallbackName={centerName}>
      <div className="corp-admin-layout sa-layout">
        <CorpAdminSidebar centerName={centerName} email={email} />

        <main className="corp-admin-main-pane">
          <Outlet context={{ centerId, centerName, email }} />
        </main>

        <CorpAdminBottomNav />
      </div>
    </CenterDataProvider>
  );
}
