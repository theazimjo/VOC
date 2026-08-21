import { useLayoutEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, BookOpen, GraduationCap, FlaskConical } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import './PersonalBottomNav.css';

function isItemActive(pathname, item) {
  if (item.end) return pathname === item.to;
  return pathname === item.to || pathname.startsWith(`${item.to}/`);
}

export default function BottomNav() {
  const location = useLocation();
  const { t } = useLanguage();
  const NAV_ITEMS = [
    { to: '/', icon: LayoutDashboard, label: t('nav.dashboard'), end: true },
    { to: '/library', icon: BookOpen, label: t('nav.library'), end: false },
    { to: '/grammar', icon: GraduationCap, label: t('nav.grammar'), end: false },
    { to: '/experiment', icon: FlaskConical, label: t('nav.lab'), end: false },
  ];
  const itemRefs = useRef([]);
  // Measured in real pixels from the rendered tabs, not guessed via CSS
  // percentages — a percentage of the bar's own padded width doesn't land
  // on a tab's actual bounds.
  const [pillRect, setPillRect] = useState(null);

  const isInsidePackOrTopic =
    location.pathname.includes('/packs/') ||
    location.pathname.includes('/practice/');

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
            className={({ isActive }) =>
              `personal-bottom-nav-link ${isActive ? 'active' : ''}`
            }
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
