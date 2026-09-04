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
      initial="initial"
      whileHover="hover"
      whileTap="tap"
    >
      <motion.div 
        className="voc-logo-img-wrap" 
        title="VOCABRY"
        variants={{
          initial: { scale: 1, rotate: 0, y: 0 },
          hover: { scale: 1.15, rotate: -8, y: -2 },
          tap: { scale: 0.94, rotate: 0, y: 0 }
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      >
        <img src="/logo.png" alt="VOCABRY" className="voc-logo-img" />
      </motion.div>
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div 
            className="voc-logo-text-group"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <motion.span 
              className="voc-logo-title"
              variants={{
                initial: { x: 0 },
                hover: { x: 5 },
                tap: { x: 0 }
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            >
              VOCABRY
            </motion.span>
            {subTitle && <span className="voc-logo-subtitle">{subTitle}</span>}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
