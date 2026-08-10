import { useLayoutEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, BookOpen, ClipboardList, User } from 'lucide-react';
import './StudentBottomNav.css';

const NAV_ITEMS = [
  { to: '/corp/student', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/corp/student/learn', label: 'Vocabulary', icon: BookOpen, end: false },
  { to: '/corp/student/assessment', label: 'Assessment', icon: ClipboardList, end: false },
  { to: '/corp/student/profile', label: 'Profile', icon: User, end: false },
];

function isItemActive(pathname, item) {
  if (item.end) return pathname === item.to;
  return pathname === item.to || pathname.startsWith(`${item.to}/`);
}

export default function StudentBottomNav() {
  const location = useLocation();
  const itemRefs = useRef([]);
  // Measured in real pixels from the rendered tabs, not guessed via CSS
  // percentages — the bar's own padding sits between its border and the
  // tabs, so a percentage of the bar's width doesn't land on a tab's
  // actual bounds. That mismatch was worst at the first/last tabs (the
  // "corners"): the pill sat visibly off, and its spring's overshoot then
  // carried it past the bar's edge and back on every tap.
  const [pillRect, setPillRect] = useState(null);

  // Hide bottom navigation bar when inside a pack/month/topic or practice mode
  const isInsidePackOrTopic =
    location.pathname.includes('/learn/month/') ||
    location.pathname.includes('/learn/topic/') ||
    location.pathname.includes('/corp/practice/');

  const activeIndex = Math.max(
    0,
    NAV_ITEMS.findIndex((item) => isItemActive(location.pathname, item))
  );

  useLayoutEffect(() => {
    const el = itemRefs.current[activeIndex];
    if (!el) return;
    setPillRect({ left: el.offsetLeft, width: el.offsetWidth });
  }, [activeIndex, isInsidePackOrTopic]);

  useLayoutEffect(() => {
    const handleResize = () => {
      const el = itemRefs.current[activeIndex];
      if (el) setPillRect({ left: el.offsetLeft, width: el.offsetWidth });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeIndex]);

  if (isInsidePackOrTopic) {
    return null;
  }

  return (
    <nav className="corp-bottom-nav">
      {pillRect && (
        <motion.div
          className="corp-bottom-nav-pill"
          initial={false}
          animate={{ left: pillRect.left, width: pillRect.width }}
          transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
        />
      )}
      {NAV_ITEMS.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <NavLink
            key={item.to}
            ref={(el) => { itemRefs.current[index] = el; }}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `corp-bottom-nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="corp-bottom-nav-icon">
              <IconComponent size={20} strokeWidth={2.2} />
            </span>
            <span className="corp-bottom-nav-label">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
