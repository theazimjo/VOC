import { Suspense } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import FullScreenLoader from '../common/FullScreenLoader';
import { lazyWithRetry } from '../../utils/lazyWithRetry';

// Lazy: only a logged-out visitor hitting "/" ever needs this chunk, so it
// shouldn't add weight to the bundle every authenticated user already pays
// for just by having ProtectedRoute (itself eagerly imported) on the page.
const LandingPage = lazyWithRetry(() => import('../../pages/marketing/LandingPage'));

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <FullScreenLoader />;
  }

  if (!user) {
    // "/" is the one protected path a logged-out visitor can land on
    // directly (shared links, bookmarks, first visit) — show the public
    // landing page there instead of bouncing straight to the login form.
    // Every other protected route keeps the old straight-to-login redirect.
    if (location.pathname === '/') {
      return (
        <Suspense fallback={<FullScreenLoader />}>
          <LandingPage />
        </Suspense>
      );
    }
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
