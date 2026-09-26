import { Link, useLocation } from 'react-router-dom';
import './RoleSwitcher.css';

// DEV ONLY: a small "Rollar" shortcut on every page back to /dev/roles.
export default function DevRolesPill() {
  const { pathname } = useLocation();
  if (pathname === '/dev/roles') return null;
  return <Link to="/dev/roles" className="rs-pill">Rollar</Link>;
}
