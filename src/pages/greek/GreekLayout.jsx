import { useState, useEffect, useCallback } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { usePacks } from '../../hooks/usePacks';
import Navbar from '../../components/Layout/Navbar';
import GreekSidebar from './GreekSidebar';
import GreekBottomNav from './GreekBottomNav';
import IosSpinner from '../../components/common/IosSpinner';
import '../personal/course/CourseLayout.css';
import './GreekLayout.css';

// Root of the standalone Greek track — same structural pattern as
// CourseLayout (its own fixed sidebar + the shared Navbar instead of the
// personal Sidebar/BottomNav), but with entirely bespoke Dashboard/
// Alphabet/Vocabulary/Grammar pages underneath instead of the generic
// Course* components. Deliberately isolated: nothing here is read by, or
// shared with, any other course/pack track.
export default function GreekLayout() {
  const { packId } = useParams();
  const navigate = useNavigate();
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
        <p>Kurs topilmadi.</p>
        <button className="btn btn-primary" onClick={() => navigate('/library')}>
          Orqaga
        </button>
      </div>
    );
  }

  return (
    <div className="layout layout--personal greek-track">
      <GreekSidebar
        pack={pack}
        collapsed={false}
        mobileOpen={mobileOpen}
        onMobileClose={handleMobileClose}
      />

      <Navbar sidebarCollapsed={false} onHamburgerClick={handleHamburgerClick} />

      <main className="layout-content layout-content--expanded">
        <Outlet context={{ pack }} />
      </main>

      <GreekBottomNav packId={packId} />
    </div>
  );
}
