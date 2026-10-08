import { Outlet, useOutletContext } from 'react-router-dom';
import SuperAdminSidebar from './SuperAdminSidebar';
import SuperAdminTopbar from './SuperAdminTopbar';
import SuperAdminBottomNav from './SuperAdminBottomNav';
import { PageStyleContext, PanelLanguageContext, SheetPlacementContext } from '../../pages/corp/super-admin/ui';
import { usePanelTheme } from '../../pages/corp/center-admin/usePanelTheme';
import './CorpAdminLayout.css';
import '../../pages/corp/super-admin/sa.css';
import '../../pages/corp/center-admin/theme.css';
import '../../pages/corp/center-admin/uits.css';
import '../../pages/corp/center-admin/vocabry.css';

// The same shell as the center admin panel (CorpAdminLayout): sidebar, topbar,
// the Vocabry theme (ca-theme / is-center-admin, light or dark) and centered
// sheets. The copy is English, like the other panels. CorpProtectedRoute hands the
// identity down through <Outlet context>.
export default function SuperAdminLayout() {
  const identity = useOutletContext();
  const theme = usePanelTheme();

  return (
    <SheetPlacementContext.Provider value="center">
      <PageStyleContext.Provider value="toolbar">
        <PanelLanguageContext.Provider value="en">
        <div className={`corp-admin-layout sa-layout ca-theme is-center-admin${theme === 'dark' ? ' is-dark' : ''}`}>
          <SuperAdminSidebar />

          <main className="corp-admin-main-pane">
            <SuperAdminTopbar email={identity?.email || ''} />
            <Outlet />
          </main>

          <SuperAdminBottomNav />
        </div>
        </PanelLanguageContext.Provider>
      </PageStyleContext.Provider>
    </SheetPlacementContext.Provider>
  );
}
