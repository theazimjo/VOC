import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { grammarPathSections } from '../../data/grammarPathData';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { loadPathProgress, subscribePathProgress } from '../../utils/grammarPathProgress';
import './GrammarPath.css';

const TXT = {
  ru: {
    ready: 'Доступен',
    theoryPassed: 'Теория усвоена ✓',
    completed: 'Пройдено ✓',
    locked: 'Заблокировано 🔒',
    step1: 'Шаг 1 из 2: Изучение правила',
    step2: 'Шаг 2 из 2: Практическое задание по теме',
    doneDesc: (s, t) => `Урок и практика успешно пройдены! Результат: ${s}/${t}`,
    lockedDesc: 'Пройдите предыдущий урок для разблокировки',
    learnBtn: '📖 Изучить теорию →',
    practiceBtn: '🎯 Начать практику →',
    ruleBtn: '📖 Правило',
    theoryBtn: '📖 Теория',
    practiceBtnShort: '🎯 Практика',
    reviewLockedDesc: 'Заблокировано — пройдите все уроки',
    reviewDesc: 'Итоговый тест по разделу',
  },
  uz: {
    ready: 'Boshlashga tayyor',
    theoryPassed: 'Teoriya o\'tildi ✓',
    completed: 'Barchasi o\'tildi ✓',
    locked: 'Qulflangan 🔒',
    step1: '1-qadam: Qoidani o\'rganish',
    step2: '2-qadam: Mavzuga doir amaliy mashq',
    doneDesc: (s, t) => `Dars va mashqlar o'tildi! Natija: ${s}/${t}`,
    lockedDesc: 'Ochish uchun oldingi darsni yakunlang',
    learnBtn: '📖 Darsni o\'rganish →',
    practiceBtn: '🎯 Mashqni bajarish →',
    ruleBtn: '📖 Qoida',
    theoryBtn: '📖 Teoriya',
    practiceBtnShort: '🎯 Mashq',
    reviewLockedDesc: 'Qulflangan — barcha darslarni o\'ting',
    reviewDesc: 'Bo\'lim bo\'yicha yakuniy test',
  },
  en: {
    ready: 'Ready to start',
    theoryPassed: 'Theory passed ✓',
    completed: 'Completed ✓',
    locked: 'Locked 🔒',
    step1: 'Step 1 of 2: Learn the rule',
    step2: 'Step 2 of 2: Topic practice quiz',
    doneDesc: (s, t) => `Lesson and practice completed! Score: ${s}/${t}`,
    lockedDesc: 'Pass the previous lesson to unlock',
    learnBtn: '📖 Start Lesson →',
    practiceBtn: '🎯 Start Practice →',
    ruleBtn: '📖 Rule',
    theoryBtn: '📖 Theory',
    practiceBtnShort: '🎯 Practice',
    reviewLockedDesc: 'Locked — complete all section lessons first',
    reviewDesc: 'Final section checkpoint exam',
  },
};

function getNodeTitle(node, lang) {
  if (lang === 'ru' && node.titleRu) return node.titleRu;
  if (lang === 'en') {
    if (node.titleEn) return node.titleEn;
    if (node.title && node.title.includes('—')) {
      return node.title.split('—')[0].trim();
    }
  }
  return node.title;
}

function getSectionTitle(node, lang) {
  if (lang === 'ru' && node.sectionTitleRu) return node.sectionTitleRu;
  if (lang === 'en' && node.sectionTitleEn) return node.sectionTitleEn;
  return node.sectionTitle;
}

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
        sectionTitleEn: section.titleEn,
        id: lesson.id,
        title: lesson.title,
        titleRu: lesson.titleRu,
        titleEn: lesson.titleEn,
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
      sectionTitleEn: section.titleEn,
      id: section.id,
      title: section.review.title,
      titleRu: section.review.titleRu,
      titleEn: section.review.titleEn,
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

  const lang = language === 'ru' ? 'ru' : language === 'en' ? 'en' : 'uz';
  const labels = TXT[lang];

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
            sectionBanner = getSectionTitle(node, lang);
            lastSection = node.sectionId;
          }

          // ─── SECTION REVIEW NODE ─────────────────────────────────────────
          if (node.kind === 'review') {
            const reviewTitle = getNodeTitle(node, lang);
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
                          ? labels.reviewLockedDesc
                          : labels.reviewDesc}
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
          const lessonTitle = getNodeTitle(node, lang);

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
                        {phase === 'completed' && labels.completed}
                        {phase === 'practice' && labels.theoryPassed}
                        {phase === 'teach' && labels.ready}
                        {phase === 'locked' && labels.locked}
                      </span>
                    </div>
                    <h3 className="gp-clean-title">{lessonTitle}</h3>
                  </div>

                  {/* Subtitle & Step Context */}
                  <p className="gp-clean-subtitle">
                    {phase === 'teach' && labels.step1}
                    {phase === 'practice' && labels.step2}
                    {phase === 'completed' && labels.doneDesc(node.practiceScore, node.practiceTotal)}
                    {phase === 'locked' && labels.lockedDesc}
                  </p>

                  {/* SINGLE INTUITIVE ACTION BUTTON */}
                  {!node.isLocked && (
                    <div className="gp-clean-actions">
                      {phase === 'teach' && (
                        <button
                          type="button"
                          className="gp-primary-btn teach-btn"
                          onClick={() => navigate(`/grammar/path/lesson/${node.id}`)}
                        >
                          {labels.learnBtn}
                        </button>
                      )}

                      {phase === 'practice' && (
                        <div className="gp-action-group">
                          <button
                            type="button"
                            className="gp-primary-btn practice-btn"
                            onClick={() => navigate(`/grammar/path/practice/${node.id}`)}
                          >
                            {labels.practiceBtn}
                          </button>
                          <button
                            type="button"
                            className="gp-sub-btn"
                            onClick={() => navigate(`/grammar/path/lesson/${node.id}`)}
                          >
                            {labels.ruleBtn}
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
                            {labels.theoryBtn}
                          </button>
                          <button
                            type="button"
                            className="gp-ghost-btn"
                            onClick={() => navigate(`/grammar/path/practice/${node.id}`)}
                          >
                            {labels.practiceBtnShort}
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
