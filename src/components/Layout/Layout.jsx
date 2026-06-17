import { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import ParticleCanvas from '../Particles/ParticleCanvas';
import './Layout.css';

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggleSidebar = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  const handleHamburgerClick = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const handleMobileClose = useCallback(() => {
    setMobileOpen(false);
  }, []);

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

