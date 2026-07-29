import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SpeedDialFAB.css';

export default function SpeedDialFAB({ onAddWord, onImportJson }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close speed dial when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="speed-dial-container" ref={containerRef}>
      <AnimatePresence>
        {isOpen && (
          <div className="speed-dial-actions">
            {/* Action 1: JSON Import */}
            <motion.button
              className="speed-dial-action"
              onClick={() => {
                onImportJson();
                setIsOpen(false);
              }}
              initial={{ opacity: 0, y: 15, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.8 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              title="JSON Import"
            >
              <span className="speed-dial-action-label">JSON Import</span>
              <span className="speed-dial-action-icon">📥</span>
            </motion.button>

            {/* Action 2: So'z qo'shish */}
            <motion.button
              className="speed-dial-action"
              onClick={() => {
                onAddWord();
                setIsOpen(false);
              }}
              initial={{ opacity: 0, y: 15, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              title="So'z qo'shish"
            >
              <span className="speed-dial-action-label">So'z qo'shish</span>
              <span className="speed-dial-action-icon">📝</span>
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Main trigger button */}
      <motion.button
        className={`speed-dial-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        title="Amallar"
      >
        <span className="speed-dial-trigger-icon">+</span>
      </motion.button>
    </div>
  );
}
