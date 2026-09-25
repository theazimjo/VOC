import { Outlet, useOutletContext } from 'react-router-dom';
import SuperAdminSidebar from './SuperAdminSidebar';
import SuperAdminBottomNav from './SuperAdminBottomNav';
import './CorpAdminLayout.css';
import '../../pages/corp/super-admin/sa.css';

// Mirrors CorpAdminLayout: reads the identity CorpProtectedRoute resolved
// and handed down via <Outlet context={identity} />, then passes the
// super admin's email down to the sidebar for the account footer.
export default function SuperAdminLayout() {
  const identity = useOutletContext();

  return (
    <div className="corp-admin-layout sa-layout">
      {/* Super Admin Sidebar (desktop only) */}
      <SuperAdminSidebar email={identity?.email || ''} />

      <main className="corp-admin-main-pane">
        <Outlet />
      </main>

      {/* Super Admin Bottom Navigation (mobile only) */}
      <SuperAdminBottomNav />
    </div>
  );
}
