import { useState, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import ParticleCanvas from '../Particles/ParticleCanvas';
import './Layout.css';

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleToggleSidebar = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  const handleHamburgerClick = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const handleMobileClose = useCallback(() => {
    setMobileOpen(false);
  }, []);

  // Check if we are in grammar test mode or actively running a complex test
  const segments = location.pathname.split('/').filter(Boolean);
  const isTestMode = (segments.length === 4 && segments[0] === 'grammar') || 
                     (segments[0] === 'grammar-test' && segments[1] === 'run') ||
                     (segments[0] === 'ielts-exam');

  if (isTestMode) {
    return (
      <div className="layout layout--test-mode">
        <ParticleCanvas />
        <main className="layout-content layout-content--test-mode">
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <div className="layout">
      <ParticleCanvas />
      
      <Sidebar
        collapsed={collapsed}
        onToggle={handleToggleSidebar}
        mobileOpen={mobileOpen}
        onMobileClose={handleMobileClose}
      />

      <Navbar
        sidebarCollapsed={collapsed}
        onHamburgerClick={handleHamburgerClick}
      />

      <main
        className={`layout-content ${
          collapsed ? 'layout-content--collapsed' : 'layout-content--expanded'
        }`}
      >
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}

