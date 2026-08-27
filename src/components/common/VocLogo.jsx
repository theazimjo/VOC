import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './VocLogo.css';

export default function VocLogo({ 
  collapsed = false, 
  size = 'md', // 'sm' | 'md' | 'lg'
  subTitle = null,
  className = '',
  onClick = null
}) {
  return (
    <motion.div 
      className={`voc-logo-brand voc-logo--${size} ${collapsed ? 'collapsed' : ''} ${className}`}
      onClick={onClick}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <div className="voc-logo-img-wrap" title="VOCABRY">
        <img src="/logo.png" alt="VOCABRY" className="voc-logo-img" />
      </div>
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div 
            className="voc-logo-text-group"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <span className="voc-logo-title">VOCABRY</span>
            {subTitle && <span className="voc-logo-subtitle">{subTitle}</span>}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
