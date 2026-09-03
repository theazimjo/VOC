import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { grammarPathSections } from '../../data/grammarPathData';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { loadPathProgress, subscribePathProgress } from '../../utils/grammarPathProgress';
import './GrammarPath.css';

function buildNodes(sections, progress) {
  const nodes = [];
  let sectionUnlocked = true;

  sections.forEach((section) => {
    let lessonUnlockCursor = sectionUnlocked;
    let allLessonsDone = true;

    section.lessons.forEach((lesson, i) => {
      const lessonCompleted = !!progress.completedLessons[lesson.id];
      const practiceCompleted = !!progress.completedPractices[lesson.id];
      const practiceData = progress.completedPractices[lesson.id];

      const isUnlocked = sectionUnlocked && lessonUnlockCursor;
      const isLocked = !isUnlocked;

      const isBothDone = lessonCompleted && practiceCompleted;
      if (!isBothDone) allLessonsDone = false;

      // Next lesson unlocks ONLY after THIS lesson's PRACTICE is completed!
      lessonUnlockCursor = practiceCompleted;

      nodes.push({
        kind: 'hub',
        sectionId: section.id,
        sectionTitle: section.title,
        sectionTitleRu: section.titleRu,
        id: lesson.id,
        title: lesson.title,
        titleRu: lesson.titleRu,
        icon: lesson.icon,
        orderInSection: i + 1,
        lessonCompleted,
        practiceCompleted,
        practiceScore: practiceData?.score || 0,
        practiceTotal: practiceData?.total || 0,
        isCompleted: isBothDone,
        isNext: isUnlocked && !isBothDone,
        isLocked,
      });
    });

    const reviewCompleted = !!progress.completedReviews[section.id];
    const reviewUnlocked = sectionUnlocked && allLessonsDone;

    nodes.push({
      kind: 'review',
      sectionId: section.id,
      sectionTitle: section.title,
      sectionTitleRu: section.titleRu,
      id: section.id,
      title: section.review.title,
      titleRu: section.review.titleRu,
      icon: '🏆',
      orderInSection: section.lessons.length + 1,
      isCompleted: reviewCompleted,
      isNext: reviewUnlocked && !reviewCompleted,
      isLocked: !reviewUnlocked,
    });

    sectionUnlocked = reviewCompleted;
  });

  return nodes;
}

export default function GrammarPath() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const isRu = language === 'ru';
  const [progress, setProgress] = useState(() => loadPathProgress());

  useEffect(() => {
    if (user?.uid) {
      const unsubscribe = subscribePathProgress(user.uid, (remoteProgress) => {
        if (remoteProgress) {
          setProgress(remoteProgress);
        }
      });
      return () => unsubscribe();
    }
  }, [user]);

  const nodes = useMemo(() => buildNodes(grammarPathSections, progress), [progress]);
  const completedCount = nodes.filter((n) => n.isCompleted).length;
  const progressPct = nodes.length > 0 ? Math.round((completedCount / nodes.length) * 100) : 0;

  let lastSection = null;

  return (
    <div className="gp-page">
      {/* Header Bar */}
      <div className="gp-header">
        <button className="gp-back" onClick={() => navigate('/grammar')}>{t('grammar.back')}</button>
        <div className="gp-header-info">
          <span className="gp-header-icon">🧗</span>
          <h1 className="gp-header-title">{t('grammar.pathTitle')}</h1>
        </div>
        <div className="gp-header-progress">{completedCount} / {nodes.length}</div>
      </div>

      <p className="gp-header-desc">{t('grammar.pathDesc')}</p>

      {/* Progress Card */}
      <div className="gp-progress-card">
        <div className="gp-progress-info">
          <span className="gp-progress-label">{t('grammar.pathOverallProgress')}</span>
          <span className="gp-progress-pct">{progressPct}%</span>
        </div>
        <div className="gp-progress-bar-track">
          <div className="gp-progress-bar-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Timeline List */}
      <div className="gp-timeline-list">
        {nodes.map((node, i) => {
          let sectionBanner = null;
          if (node.sectionId !== lastSection) {
            sectionBanner = isRu && node.sectionTitleRu ? node.sectionTitleRu : node.sectionTitle;
            lastSection = node.sectionId;
          }

          // ─── SECTION REVIEW NODE ─────────────────────────────────────────
          if (node.kind === 'review') {
            const reviewTitle = isRu && node.titleRu ? node.titleRu : node.title;
            const reviewCls = node.isCompleted ? 'completed' : node.isLocked ? 'locked' : 'active';

            return (
              <div key={`review-${node.id}`} className="gp-timeline-item">
                {sectionBanner && (
                  <div className="gp-unit-header">
                    <span className="gp-unit-chip">📌 {sectionBanner}</span>
                  </div>
                )}

                <div className="gp-timeline-row">
                  <div className="gp-timeline-col">
                    <div className={`gp-timeline-badge review-badge ${reviewCls}`}>
                      {node.isCompleted ? '✓' : node.isLocked ? '🔒' : '🏆'}
                    </div>
                    {i < nodes.length - 1 && <div className={`gp-timeline-line ${node.isCompleted ? 'completed' : ''}`} />}
                  </div>

                  <motion.div
                    className={`gp-clean-card review ${reviewCls}`}
                    onClick={() => !node.isLocked && navigate(`/grammar/path/review/${node.sectionId}`)}
                    whileHover={!node.isLocked ? { y: -2 } : {}}
                    whileTap={!node.isLocked ? { scale: 0.99 } : {}}
                  >
                    <div className="gp-clean-main">
                      <div className="gp-clean-meta">
                        <span className="gp-card-tag review-tag">{t('grammar.pathReviewBadge')}</span>
                      </div>
                      <h3 className="gp-clean-title">{reviewTitle}</h3>
                      <p className="gp-clean-subtitle">
                        {node.isCompleted
                          ? t('grammar.pathLessonPassed')
                          : node.isLocked
                          ? (isRu ? 'Заблокировано — пройдите все уроки' : 'Qulflangan — barcha darslarni o\'ting')
                          : (isRu ? 'Итоговый тест по разделу' : 'Bo\'lim bo\'yicha yakuniy test')}
                      </p>
                    </div>
                    <div className="gp-clean-arrow">
                      {node.isCompleted ? '✓' : node.isLocked ? '🔒' : '→'}
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          }

          // ─── LESSON NODE (Single Primary Action Flow) ──────────────────────
          const lessonTitle = isRu && node.titleRu ? node.titleRu : node.title;

          // Determine current phase
          let phase = 'locked';
          if (!node.isLocked) {
            if (node.isCompleted) phase = 'completed';
            else if (node.lessonCompleted) phase = 'practice';
            else phase = 'teach';
          }

          return (
            <div key={`lesson-${node.id}`} className="gp-timeline-item">
              {sectionBanner && (
                <div className="gp-unit-header">
                  <span className="gp-unit-chip">📌 {sectionBanner}</span>
                </div>
              )}

              <div className="gp-timeline-row">
                <div className="gp-timeline-col">
                  <div className={`gp-timeline-badge ${phase}`}>
                    {phase === 'completed' ? '✓' : phase === 'locked' ? '🔒' : node.icon}
                  </div>
                  {i < nodes.length - 1 && (
                    <div className={`gp-timeline-line ${phase === 'completed' ? 'completed' : ''}`} />
                  )}
                </div>

                <div className={`gp-clean-card ${phase}`}>
                  {/* Card Header & Title */}
                  <div className="gp-clean-header">
                    <div className="gp-clean-meta">
                      <span className="gp-card-tag">{t('grammar.pathLessonN', { n: node.orderInSection })}</span>
                      <span className={`gp-status-badge ${phase}`}>
                        {phase === 'completed' && (isRu ? 'Пройдено ✓' : 'Barchasi o\'tildi ✓')}
                        {phase === 'practice' && (isRu ? 'Теория усвоена ✓' : 'Teoriya o\'tildi ✓')}
                        {phase === 'teach' && (isRu ? 'Доступен' : 'Boshlashga tayyor')}
                        {phase === 'locked' && (isRu ? 'Заблокировано 🔒' : 'Qulflangan 🔒')}
                      </span>
                    </div>
                    <h3 className="gp-clean-title">{lessonTitle}</h3>
                  </div>

                  {/* Subtitle & Step Context */}
                  <p className="gp-clean-subtitle">
                    {phase === 'teach' && (isRu ? 'Шаг 1 из 2: Изучение правила' : '1-qadam: Qoidani o\'rganish')}
                    {phase === 'practice' && (isRu ? 'Шаг 2 из 2: Практическое задание по теме' : '2-qadam: Mavzuga doir amaliy mashq')}
                    {phase === 'completed' && (isRu ? `Отличная работа! Natija: ${node.practiceScore}/${node.practiceTotal}` : `Ajoyib natija! Natija: ${node.practiceScore}/${node.practiceTotal}`)}
                    {phase === 'locked' && (isRu ? 'Пройдите предыдущий урок для разблокировки' : 'Ochish uchun oldingi darsni yakunlang')}
                  </p>

                  {/* SINGLE INTUITIVE ACTION BUTTON (No cluttered dual buttons!) */}
                  {!node.isLocked && (
                    <div className="gp-clean-actions">
                      {phase === 'teach' && (
                        <button
                          type="button"
                          className="gp-primary-btn teach-btn"
                          onClick={() => navigate(`/grammar/path/lesson/${node.id}`)}
                        >
                          📖 {isRu ? 'Изучить теорию' : 'Darsni o\'rganish'} →
                        </button>
                      )}

                      {phase === 'practice' && (
                        <div className="gp-action-group">
                          <button
                            type="button"
                            className="gp-primary-btn practice-btn"
                            onClick={() => navigate(`/grammar/path/practice/${node.id}`)}
                          >
                            🎯 {isRu ? 'Начать практику' : 'Mashqni bajarish'} →
                          </button>
                          <button
                            type="button"
                            className="gp-sub-btn"
                            onClick={() => navigate(`/grammar/path/lesson/${node.id}`)}
                            title={isRu ? 'Повторить правило' : 'Qoidani qayta ko\'rish'}
                          >
                            📖 {isRu ? 'Правило' : 'Qoida'}
                          </button>
                        </div>
                      )}

                      {phase === 'completed' && (
                        <div className="gp-action-group">
                          <button
                            type="button"
                            className="gp-ghost-btn"
                            onClick={() => navigate(`/grammar/path/lesson/${node.id}`)}
                          >
                            📖 {isRu ? 'Теория' : 'Teoriya'}
                          </button>
                          <button
                            type="button"
                            className="gp-ghost-btn"
                            onClick={() => navigate(`/grammar/path/practice/${node.id}`)}
                          >
                            🎯 {isRu ? 'Практика' : 'Mashq'}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
