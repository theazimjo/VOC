import { Navigate, Outlet } from 'react-router-dom';
import { useCorpRole } from '../../hooks/useCorpRole';
import FullScreenLoader from '../common/FullScreenLoader';

// Gates a /corp/* sub-route to a specific set of roles (super_admin,
// center_admin, teacher). Unlike the individual app's ProtectedRoute, an
// unauthenticated or wrong-role visitor is sent to /corp/login, never
// granted access via a demo/fallback identity.
export default function CorpProtectedRoute({ allowedRoles }) {
  const { loading, identity } = useCorpRole();

  if (loading) {
    return <FullScreenLoader />;
  }

  if (!identity || !allowedRoles.includes(identity.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet context={identity} />;
}
