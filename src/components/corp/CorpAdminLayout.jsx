import { Navigate, Outlet, useOutletContext } from 'react-router-dom';
import CorpAdminSidebar from './CorpAdminSidebar';
import CorpAdminTopbar from './CorpAdminTopbar';
import CorpAdminBottomNav from './CorpAdminBottomNav';
import { CenterDataProvider } from '../../pages/corp/center-admin/CenterDataContext';
import { PageStyleContext, PanelLanguageContext, SheetPlacementContext } from '../../pages/corp/super-admin/ui';
import './CorpAdminLayout.css';
import '../../pages/corp/super-admin/sa.css';
import '../../pages/corp/center-admin/theme.css';
import '../../pages/corp/center-admin/uits.css';
import '../../pages/corp/center-admin/vocabry.css';

// The corp identity (role/centerId/centerName/email) is resolved once by
// CorpProtectedRoute and handed down via its <Outlet context={identity} />;
// read it here with useOutletContext() rather than re-deriving it, so the
// centerId used for every write below actually matches corpUsers/{uid}.
// Same components as the super admin panel (sa-layout), with the UITS
// CRM colors and corners on top (ca-theme, center-admin/theme.css).
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
      <SheetPlacementContext.Provider value="center">
      <PageStyleContext.Provider value="toolbar">
      <PanelLanguageContext.Provider value="en">
      <div className="corp-admin-layout sa-layout ca-theme is-center-admin">
        <CorpAdminSidebar />

        <main className="corp-admin-main-pane">
          <CorpAdminTopbar centerName={centerName} email={email} />
          <Outlet context={{ centerId, centerName, email }} />
        </main>

        <CorpAdminBottomNav />
      </div>
      </PanelLanguageContext.Provider>
      </PageStyleContext.Provider>
      </SheetPlacementContext.Provider>
    </CenterDataProvider>
  );
}
