import { useState, useEffect, useCallback } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { usePacks } from '../../../hooks/usePacks';
import { useLanguage } from '../../../contexts/LanguageContext';
import Navbar from '../../../components/Layout/Navbar';
import CourseSidebar from './CourseSidebar';
import CourseBottomNav from './CourseBottomNav';
import IosSpinner from '../../../components/common/IosSpinner';
import './CourseLayout.css';

// A course is its own section — same structural pattern as group mode
// (Layout.jsx swaps in StudentSidebar): a dedicated fixed sidebar + the
// shared Navbar, instead of the personal Sidebar/BottomNav.
export default function CourseLayout() {
  const { packId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { getPack } = usePacks();
  const [pack, setPack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getPack(packId).then((p) => {
      if (cancelled) return;
      setPack(p);
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [packId, getPack]);

  const handleHamburgerClick = useCallback(() => setMobileOpen((v) => !v), []);
  const handleMobileClose = useCallback(() => setMobileOpen(false), []);

  if (loading) {
    return (
      <div className="ios-activity-indicator" style={{ marginTop: '100px' }}>
        <IosSpinner />
      </div>
    );
  }

  if (!pack) {
    return (
      <div className="course-missing">
        <p>{t('course.missing')}</p>
        <button className="btn btn-primary" onClick={() => navigate('/library')}>
          {t('read.backBtn')}
        </button>
      </div>
    );
  }

  return (
    <div className="layout layout--personal">
      <CourseSidebar
        pack={pack}
        collapsed={false}
        mobileOpen={mobileOpen}
        onMobileClose={handleMobileClose}
      />

      <Navbar sidebarCollapsed={false} onHamburgerClick={handleHamburgerClick} />

      <main className="layout-content layout-content--expanded">
        <Outlet context={{ pack }} />
      </main>

      <CourseBottomNav packId={packId} />
    </div>
  );
}
