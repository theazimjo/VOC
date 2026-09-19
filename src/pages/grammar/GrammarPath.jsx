import { useState, useEffect, useMemo, useRef } from 'react';
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
    sectionsTitle: 'Mavzular (Разделы)',
    sectionsNav: 'Содержание курса',
  },
  uz: {
    ready: 'Boshlashga tayyor',
    theoryPassed: 'Qoida o\'rganildi ✓',
    completed: 'Barchasi o\'tildi ✓',
    locked: 'Qulflangan 🔒',
    step1: '1-qadam: Qoidani o\'rganish',
    step2: '2-qadam: Mavzuga doir amaliy mashq',
    doneDesc: (s, t) => `Dars va mashqlar o'tildi! Natija: ${s}/${t}`,
    lockedDesc: 'Ochish uchun oldingi darsni yakunlang',
    learnBtn: '📖 Qoidani o\'rganish →',
    practiceBtn: '🎯 Mashqni bajarish →',
    ruleBtn: '📖 Qoida',
    theoryBtn: '📖 Nazariya',
    practiceBtnShort: '🎯 Mashq',
    reviewLockedDesc: 'Qulflangan — barcha darslarni o\'ting',
    reviewDesc: 'Bo\'lim bo\'yicha yakuniy test',
    sectionsTitle: 'Mavzular mundarijasi',
    sectionsNav: 'Mavzular navigatsiyasi',
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
    sectionsTitle: 'Course Topics',
    sectionsNav: 'Course Navigation',
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

  // Step 1: Flatten all lessons and section reviews in exact chronological order
  sections.forEach((section) => {
    section.lessons.forEach((lesson, i) => {
      const lessonCompleted = !!progress.completedLessons[lesson.id];
      const practiceCompleted = !!progress.completedPractices[lesson.id];
      const practiceData = progress.completedPractices[lesson.id];
      // A lesson node is considered completed ONLY when BOTH theory and practice are completed
      const isBothDone = lessonCompleted && practiceCompleted;

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
        isLocked: true,
        isNext: false,
      });
    });

    const reviewCompleted = !!progress.completedReviews[section.id];
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
      isLocked: true,
      isNext: false,
    });
  });

  // Step 2: Unlocking Logic
  for (let k = 0; k < nodes.length; k++) {
    const node = nodes[k];
    const isFirstLessonOfSection = node.kind === 'hub' && node.orderInSection === 1;
    const isPrevNodeCompleted = k > 0 && nodes[k - 1].isCompleted;

    if (k === 0 || isFirstLessonOfSection || isPrevNodeCompleted) {
      node.isLocked = false;
      node.isNext = !node.isCompleted;
    } else {
      node.isLocked = true;
      node.isNext = false;
    }
  }

  return nodes;
}

export default function GrammarPath() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const lang = language === 'ru' ? 'ru' : language === 'en' ? 'en' : 'uz';
  const labels = TXT[lang];

  const [progress, setProgress] = useState(() => loadPathProgress());
  const [activeSectionId, setActiveSectionId] = useState(() => grammarPathSections[0]?.id);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

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

  // Compute section statistics for sidebar list
  const sectionStats = useMemo(() => {
    return grammarPathSections.map((sec) => {
      const totalInSec = sec.lessons.length + 1; // lessons + review
      const completedLessons = sec.lessons.filter(
        (l) => progress.completedLessons[l.id] && progress.completedPractices[l.id]
      ).length;
      const reviewCompleted = !!progress.completedReviews[sec.id];
      const completedInSec = completedLessons + (reviewCompleted ? 1 : 0);
      const isCompleted = completedInSec === totalInSec;

      const firstLessonNode = nodes.find((n) => n.id === sec.lessons[0]?.id);
      const isLocked = firstLessonNode ? firstLessonNode.isLocked : true;

      const title = getSectionTitle(
        { sectionTitle: sec.title, sectionTitleRu: sec.titleRu, sectionTitleEn: sec.titleEn },
        lang
      );

      return {
        id: sec.id,
        order: sec.order,
        title,
        totalInSec,
        completedInSec,
        isCompleted,
        isLocked,
      };
    });
  }, [grammarPathSections, progress, nodes, lang]);

  const isSelectingRef = useRef(false);
  const lockTimerRef = useRef(null);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isSelectingRef.current) return;

      const scrollPos = window.scrollY + 200;
      let currentSecId = null;

      for (let i = grammarPathSections.length - 1; i >= 0; i--) {
        const secId = grammarPathSections[i].id;
        const el = document.getElementById(`gp-section-${secId}`);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (top <= scrollPos) {
            currentSecId = secId;
            break;
          }
        }
      }

      if (currentSecId && currentSecId !== activeSectionId) {
        setActiveSectionId(currentSecId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSectionId]);

  // Keep selected topic visible inside sidebar list
  useEffect(() => {
    if (activeSectionId) {
      const activeEl = document.getElementById(`gp-sidebar-item-${activeSectionId}`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'auto', block: 'nearest' });
      }
    }
  }, [activeSectionId]);

  // Auto-scroll to last active or next recommended lesson on mount
  useEffect(() => {
    const lastActiveId = localStorage.getItem('last_active_grammar_node');
    const targetId = lastActiveId || nodes.find((n) => n.isNext || !n.isCompleted)?.id;

    if (targetId) {
      const timer = setTimeout(() => {
        const el = document.getElementById(`gp-node-${targetId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleOpenNode = (path, nodeId) => {
    if (nodeId) {
      localStorage.setItem('last_active_grammar_node', nodeId);
    }
    navigate(path);
  };

  const handleSelectSection = (secId) => {
    setActiveSectionId(secId);
    setMobileDrawerOpen(false);

    isSelectingRef.current = true;
    if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    lockTimerRef.current = setTimeout(() => {
      isSelectingRef.current = false;
    }, 800);

    const el = document.getElementById(`gp-section-${secId}`);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  };

  let lastSection = null;

  return (
    <div className="gp-page">
      <div className="gp-layout-container">
        {/* Sticky Sidebar Nav (Desktop) */}
        <aside className="gp-sidebar">
          <div className="gp-sidebar-header">
            <div className="gp-sidebar-title-box">
              <span className="gp-sidebar-icon">📚</span>
              <h3 className="gp-sidebar-title">{labels.sectionsTitle}</h3>
            </div>
            <span className="gp-sidebar-badge">
              {sectionStats.filter((s) => s.isCompleted).length} / {grammarPathSections.length}
            </span>
          </div>

          <div className="gp-sidebar-list">
            {sectionStats.map((sec) => {
              const isActive = activeSectionId === sec.id;
              const pct = Math.round((sec.completedInSec / sec.totalInSec) * 100);

              return (
                <button
                  key={sec.id}
                  id={`gp-sidebar-item-${sec.id}`}
                  type="button"
                  className={`gp-sidebar-item ${isActive ? 'active' : ''} ${sec.isCompleted ? 'completed' : ''} ${sec.isLocked ? 'locked' : ''}`}
                  onClick={() => handleSelectSection(sec.id)}
                >
                  <div className="gp-sidebar-item-left">
                    <span className={`gp-sidebar-num ${sec.isCompleted ? 'completed' : ''}`}>
                      {sec.isCompleted ? '✓' : sec.order}
                    </span>
                    <div className="gp-sidebar-item-info">
                      <span className="gp-sidebar-item-title">{sec.title}</span>
                      <span className="gp-sidebar-item-progress">
                        {sec.completedInSec}/{sec.totalInSec} • {pct}%
                      </span>
                    </div>
                  </div>
                  {sec.isLocked ? (
                    <span className="gp-sidebar-lock">🔒</span>
                  ) : sec.isCompleted ? (
                    <span className="gp-sidebar-check">✓</span>
                  ) : (
                    <span className="gp-sidebar-arrow">→</span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="gp-main-content">
          {/* Mobile Section Jump Bar */}
          <div className="gp-mobile-nav-bar">
            <button
              type="button"
              className="gp-mobile-nav-btn"
              onClick={() => setMobileDrawerOpen(true)}
            >
              <span className="gp-mobile-nav-left">
                <span className="gp-mobile-nav-icon">🧭</span>
                <span className="gp-mobile-nav-title">
                  {sectionStats.find((s) => s.id === activeSectionId)?.title || labels.sectionsNav}
                </span>
              </span>
              <span className="gp-mobile-nav-badge">
                {sectionStats.find((s) => s.id === activeSectionId)?.completedInSec || 0}/
                {sectionStats.find((s) => s.id === activeSectionId)?.totalInSec || 0} ▼
              </span>
            </button>
          </div>

          {/* Mobile Drawer Overlay */}
          {mobileDrawerOpen && (
            <div className="gp-drawer-overlay" onClick={() => setMobileDrawerOpen(false)}>
              <div className="gp-drawer-content" onClick={(e) => e.stopPropagation()}>
                <div className="gp-drawer-header">
                  <h3>{labels.sectionsNav}</h3>
                  <button
                    type="button"
                    className="gp-drawer-close"
                    onClick={() => setMobileDrawerOpen(false)}
                  >
                    ✕
                  </button>
                </div>
                <div className="gp-drawer-list">
                  {sectionStats.map((sec) => (
                    <button
                      key={sec.id}
                      type="button"
                      className={`gp-drawer-item ${activeSectionId === sec.id ? 'active' : ''} ${sec.isCompleted ? 'completed' : ''}`}
                      onClick={() => handleSelectSection(sec.id)}
                    >
                      <span className="gp-drawer-num">{sec.isCompleted ? '✓' : sec.order}</span>
                      <span className="gp-drawer-title">{sec.title}</span>
                      <span className="gp-drawer-meta">{sec.completedInSec}/{sec.totalInSec}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

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
                  <div key={`review-${node.id}`} id={`gp-node-${node.id}`} className="gp-timeline-item">
                    {sectionBanner && (
                      <div className="gp-unit-header" id={`gp-section-${node.sectionId}`}>
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
                        onClick={() => !node.isLocked && handleOpenNode(`/grammar/path/review/${node.sectionId}`, node.id)}
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

              let phase = 'locked';
              if (!node.isLocked) {
                if (node.isCompleted) phase = 'completed';
                else if (node.lessonCompleted) phase = 'practice';
                else phase = 'teach';
              }

              return (
                <div key={`lesson-${node.id}`} id={`gp-node-${node.id}`} className="gp-timeline-item">
                  {sectionBanner && (
                    <div className="gp-unit-header" id={`gp-section-${node.sectionId}`}>
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
                              onClick={() => handleOpenNode(`/grammar/path/lesson/${node.id}`, node.id)}
                            >
                              {labels.learnBtn}
                            </button>
                          )}

                          {phase === 'practice' && (
                            <div className="gp-action-group">
                              <button
                                type="button"
                                className="gp-primary-btn practice-btn"
                                onClick={() => handleOpenNode(`/grammar/path/practice/${node.id}`, node.id)}
                              >
                                {labels.practiceBtn}
                              </button>
                              <button
                                type="button"
                                className="gp-sub-btn"
                                onClick={() => handleOpenNode(`/grammar/path/lesson/${node.id}`, node.id)}
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
                                onClick={() => handleOpenNode(`/grammar/path/lesson/${node.id}`, node.id)}
                              >
                                {labels.theoryBtn}
                              </button>
                              <button
                                type="button"
                                className="gp-ghost-btn"
                                onClick={() => handleOpenNode(`/grammar/path/practice/${node.id}`, node.id)}
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
        </main>
      </div>
    </div>
  );
}

