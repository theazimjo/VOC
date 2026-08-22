import { useLayoutEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, BookOpen, GraduationCap } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import '../../../components/Layout/PersonalBottomNav.css';

function isItemActive(pathname, item) {
  if (item.end) return pathname === item.to;
  return pathname === item.to || pathname.startsWith(`${item.to}/`);
}

// Mobile counterpart to CourseSidebar — the personal Sidebar is off-canvas
// below 1024px with no way to reopen it (see BottomNav for the same split),
// so course mode needs its own bottom nav too, same as StudentBottomNav
// does for group mode.
export default function CourseBottomNav({ packId }) {
  const location = useLocation();
  const { t } = useLanguage();
  const NAV_ITEMS = [
    { to: `/course/${packId}`, icon: LayoutDashboard, label: t('course.tabDashboard'), end: true },
    { to: `/course/${packId}/lesson`, icon: BookOpen, label: t('course.tabLesson'), end: false },
    { to: `/course/${packId}/vocabulary`, icon: GraduationCap, label: t('course.tabVocabulary'), end: false },
  ];
  const itemRefs = useRef([]);
  const [pillRect, setPillRect] = useState(null);

  const activeIndex = Math.max(
    0,
    NAV_ITEMS.findIndex((item) => isItemActive(location.pathname, item))
  );

  useLayoutEffect(() => {
    const el = itemRefs.current[activeIndex];
    if (!el) return;
    setPillRect({ left: el.offsetLeft, width: el.offsetWidth });
  }, [activeIndex]);

  useLayoutEffect(() => {
    const handleResize = () => {
      const el = itemRefs.current[activeIndex];
      if (el) setPillRect({ left: el.offsetLeft, width: el.offsetWidth });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeIndex]);

  return (
    <nav className="personal-bottom-nav">
      {pillRect && (
        <motion.div
          className="personal-bottom-nav-pill"
          initial={false}
          animate={{ x: pillRect.left }}
          transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
          style={{ width: pillRect.width }}
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
            className={({ isActive }) => `personal-bottom-nav-link ${isActive ? 'active' : ''}`}
          >
            <span className="personal-bottom-nav-icon">
              <IconComponent size={20} strokeWidth={2.2} />
            </span>
            <span className="personal-bottom-nav-label">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
