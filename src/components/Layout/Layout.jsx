import { useState, useCallback } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import StudentSidebar from '../corp/StudentSidebar';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import { useDailyReminder } from '../../hooks/useDailyReminder';
import { useAppBadge } from '../../hooks/useAppBadge';
import { useGroupMode } from '../../hooks/useGroupMode';
import FullScreenLoader from '../common/FullScreenLoader';
import './Layout.css';

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { loading: groupModeLoading, appMode } = useGroupMode();

  useDailyReminder();
  useAppBadge();

  const handleToggleSidebar = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  const handleHamburgerClick = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const handleMobileClose = useCallback(() => {
    setMobileOpen(false);
  }, []);

  // Redirection rules to separate the modes completely
  if (!groupModeLoading) {
    if (appMode === 'group' && location.pathname === '/') {
      return <Navigate to="/corp/student" replace />;
    }
    if (appMode === 'individual' && location.pathname === '/corp/student') {
      return <Navigate to="/" replace />;
    }
  } else if (location.pathname === '/') {
    // '/' is the only route whose real destination depends on appMode
    // (individual Dashboard vs. a redirect to /corp/student) — wait for it
    // to resolve instead of briefly rendering the individual dashboard.
    return <FullScreenLoader />;
  }

  // Check if we are in grammar test mode or actively running a complex test
  const segments = location.pathname.split('/').filter(Boolean);
  const isTestMode = (segments.length === 4 && segments[0] === 'grammar') ||
                     (segments[0] === 'grammar-test' && segments[1] === 'run');

  return (
    <div className={`layout ${isTestMode ? 'layout--test-mode' : ''}`}>
      {!isTestMode && (
        appMode === 'group' ? (
          <StudentSidebar />
        ) : (
          <Sidebar
            collapsed={collapsed}
            onToggle={handleToggleSidebar}
            mobileOpen={mobileOpen}
            onMobileClose={handleMobileClose}
          />
        )
      )}

      {!isTestMode && (
        <Navbar
          sidebarCollapsed={collapsed}
          onHamburgerClick={handleHamburgerClick}
          appMode={appMode}
        />
      )}

      <main
        className={`layout-content ${
          isTestMode 
            ? 'layout-content--test-mode' 
            : (appMode === 'group' ? 'layout-content--expanded' : (collapsed ? 'layout-content--collapsed' : 'layout-content--expanded'))
        }`}
      >
        <Outlet />
      </main>

      {!isTestMode && <BottomNav />}
    </div>
  );
}

