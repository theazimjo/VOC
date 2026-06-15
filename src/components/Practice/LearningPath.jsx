import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LearningPath.css';

export default function LearningPath({ words, completedLessons = {}, onSelectLesson, onStartFreePractice }) {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  // Monitor window resize to adjust SVG path coordinates dynamically
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const LESSON_SIZE = 5;
  const lessonsCount = Math.max(Math.ceil(words.length / LESSON_SIZE), 1);
  
  // Sort words by addedAt to keep ordering stable
  const sortedWords = [...words].sort((a, b) => new Date(a.addedAt || 0) - new Date(b.addedAt || 0));

  const lessons = Array.from({ length: lessonsCount }, (_, i) => {
    const startIndex = i * LESSON_SIZE;
    const lessonWords = sortedWords.slice(startIndex, startIndex + LESSON_SIZE);
    
    const lessonId = `lesson_${i + 1}`;
    const isCompleted = completedLessons[lessonId] === true;
    
    // Check if locked
    let isLocked = false;
    if (i > 0) {
      const prevLessonId = `lesson_${i}`;
      isLocked = !completedLessons[prevLessonId];
    }

    // Average mastery
    const avgMastery = lessonWords.length > 0 
      ? Math.round(lessonWords.reduce((s, w) => s + (w.mastery || 0), 0) / lessonWords.length) 
      : 0;

    return {
      index: i + 1,
      id: lessonId,
      words: lessonWords,
      isCompleted,
      isLocked,
      avgMastery,
      isActive: !isLocked && !isCompleted
    };
  });

  const getOffsetClass = (index) => {
    const mod = index % 4;
    if (mod === 1) return 'path-left';
    if (mod === 2 || mod === 0) return 'path-center';
    return 'path-right';
  };

  // Dimensions matching CSS layout
  const nodeSize = isMobile ? 76 : 84;
  const gapSize = 72;
  const stepY = nodeSize + gapSize; // 156 on desktop, 148 on mobile
  const offsetTranslate = isMobile ? 40 : 55;
  const viewBoxWidth = 400;
  const centerX = viewBoxWidth / 2;

  const getXY = (index) => {
    const mod = index % 4;
    let x = centerX;
    if (mod === 1) x = centerX - offsetTranslate;
    else if (mod === 3) x = centerX + offsetTranslate;
    
    const y = (nodeSize / 2) + (index - 1) * stepY;
    return { x, y };
  };

  const svgHeight = (lessons.length - 1) * stepY + nodeSize;

  const generatePathD = () => {
    let dStr = '';
    for (let i = 0; i < lessons.length; i++) {
      const curr = getXY(lessons[i].index);
      if (i === 0) {
        dStr += `M ${curr.x} ${curr.y}`;
      } else {
        const prev = getXY(lessons[i - 1].index);
        const cpY1 = prev.y + (stepY / 2);
        const cpY2 = curr.y - (stepY / 2);
        dStr += ` C ${prev.x} ${cpY1}, ${curr.x} ${cpY2}, ${curr.x} ${curr.y}`;
      }
    }
    return dStr;
  };

  return (
    <div className="learning-path-container animate-fade-in">
      <div className="learning-path-header">
        <h2>🗺️ O'rganish Yo'li</h2>
        <p>So'zlarni bosqichma-bosqich o'rganing va oltin tojga erishing!</p>
        <button className="btn btn-secondary btn-sm" onClick={onStartFreePractice}>
          🔀 Erkin Mashq Rejimi
        </button>
      </div>

      <div className="learning-path-tree">
        {/* Curved winding SVG road connector */}
        {lessons.length > 1 && (
          <svg
            className="path-svg"
            viewBox={`0 0 ${viewBoxWidth} ${svgHeight}`}
            style={{
              position: 'absolute',
              top: '24px', // Matches padding-top of tree
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              maxWidth: `${viewBoxWidth}px`,
              height: `${svgHeight}px`,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            <defs>
              <linearGradient id="path-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--accent-1)" />
                <stop offset="35%" stopColor="var(--accent-2)" />
                <stop offset="70%" stopColor="var(--accent-3)" />
                <stop offset="100%" stopColor="var(--accent-1)" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {/* Outer glowing path */}
            <path
              d={generatePathD()}
              fill="none"
              stroke="url(#path-grad)"
              strokeWidth="12"
              strokeLinecap="round"
              filter="url(#glow)"
              style={{ opacity: 0.4 }}
            />
            {/* Dark contrast separator */}
            <path
              d={generatePathD()}
              fill="none"
              stroke="var(--bg-primary)"
              strokeWidth="14"
              strokeLinecap="round"
            />
            {/* Dashed core path */}
            <path
              d={generatePathD()}
              fill="none"
              stroke="url(#path-grad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="8,8"
            />
          </svg>
        )}

        {lessons.map((lesson) => {
          const offsetClass = getOffsetClass(lesson.index);
          let nodeClass = 'path-node';
          let nodeIcon = '🔒';

          if (lesson.isCompleted) {
            nodeClass += ' completed';
            nodeIcon = '👑';
          } else if (lesson.isLocked) {
            nodeClass += ' locked';
            nodeIcon = '🔒';
          } else {
            nodeClass += ' active animate-pulse';
            nodeIcon = '⭐';
          }

          return (
            <div className={`path-node-wrapper ${offsetClass}`} key={lesson.id}>
              <motion.button
                className={nodeClass}
                whileHover={!lesson.isLocked ? { scale: 1.1, y: -2 } : {}}
                whileTap={!lesson.isLocked ? { scale: 0.95 } : {}}
                onClick={() => !lesson.isLocked && setSelectedLesson(lesson)}
                aria-label={`Dars ${lesson.index}`}
              >
                <span className="node-icon">{nodeIcon}</span>
                <span className="node-badge">{lesson.index}</span>
              </motion.button>

              <AnimatePresence>
                {selectedLesson?.id === lesson.id && (
                  <motion.div
                    className="lesson-tooltip"
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  >
                    <h3>Dars {lesson.index}</h3>
                    <p className="lesson-tooltip-words">
                      {lesson.words.length} ta so'z • O'rtacha o'zlashtirish: <strong>{lesson.avgMastery}%</strong>
                    </p>
                    <div className="lesson-words-preview">
                      {lesson.words.map(w => w.word).join(', ')}
                    </div>
                    <div className="tooltip-actions">
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          onSelectLesson(lesson);
                          setSelectedLesson(null);
                        }}
                      >
                        Boshlash →
                      </button>
                      <button 
                        className="btn btn-ghost btn-sm" 
                        onClick={() => setSelectedLesson(null)}
                      >
                        Yopish
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
