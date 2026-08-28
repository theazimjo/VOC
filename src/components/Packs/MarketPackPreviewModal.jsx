import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, ChevronLeft, Download, Check, RefreshCw, Layers } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { essential3000ChapterText } from '../../data/essential3000ChapterText';
import { scienceChapterText } from '../../data/scienceChapterText';
import { healthChapterText } from '../../data/healthChapterText';
import { preIeltsChapterText } from '../../data/preIeltsChapterText';
import './MarketPackPreviewModal.css';

const allChapterText = {
  ...essential3000ChapterText,
  ...scienceChapterText,
  ...healthChapterText,
  ...preIeltsChapterText
};

export default function MarketPackPreviewModal({
  isOpen,
  onClose,
  marketPack,
  installedPack,
  isInstalled,
  hasUpdate,
  missingWords,
  isInstalling,
  isUpdating,
  onInstall,
  onUpdate
}) {
  const { t } = useLanguage();
  const [selectedStoryTopic, setSelectedStoryTopic] = useState(null);

  // Group pack's words by topic/unit
  const unitTopics = useMemo(() => {
    if (!marketPack?.words) return [];
    const map = {};
    marketPack.words.forEach((w) => {
      const topic = w.topic || 'General';
      if (!map[topic]) map[topic] = [];
      map[topic].push(w);
    });
    return Object.entries(map).map(([name, words]) => ({
      name,
      wordsCount: words.length,
      hasStory: Boolean(allChapterText[name])
    }));
  }, [marketPack]);

  if (!isOpen || !marketPack) return null;

  const currentStory = selectedStoryTopic ? allChapterText[selectedStoryTopic] : null;

  return (
    <div className="market-preview-overlay" onClick={onClose}>
      <motion.div
        className="market-preview-card"
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="market-preview-header">
          <div className="market-preview-header-left">
            <div className="market-preview-icon">{marketPack.icon}</div>
            <div className="market-preview-titles">
              <h2>{marketPack.name}</h2>
              <div className="market-preview-badges">
                <span className="market-badge category">{marketPack.category}</span>
                <span className="market-badge level">{marketPack.level}</span>
              </div>
            </div>
          </div>
          <button className="market-preview-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="market-preview-body">
          <p className="market-preview-desc">{marketPack.description}</p>

          <AnimatePresence mode="wait">
            {selectedStoryTopic && currentStory ? (
              /* Story Preview View */
              <motion.div
                key="story-view"
                className="market-preview-story-box"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="market-preview-story-header">
                  <h3 className="market-preview-story-title">
                    📖 {currentStory.title || selectedStoryTopic}
                  </h3>
                  <button
                    className="market-preview-story-back"
                    onClick={() => setSelectedStoryTopic(null)}
                  >
                    <ChevronLeft size={16} /> {t('read.backBtn')}
                  </button>
                </div>
                <div className="market-preview-story-content">
                  {currentStory.pages && currentStory.pages[0] ? (
                    currentStory.pages[0].map((block, idx) => {
                      if (block.type === 'heading') return null;
                      return (
                        <p key={idx} className="market-preview-story-p">
                          {block.text}
                        </p>
                      );
                    })
                  ) : (
                    <p>Story text is not available.</p>
                  )}
                </div>
              </motion.div>
            ) : (
              /* Units / Topics List View */
              <motion.div
                key="unit-list-view"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="market-preview-section-title">
                  <Layers size={14} />
                  <span>Units & Stories ({unitTopics.length})</span>
                </div>

                <div className="market-preview-unit-list">
                  {unitTopics.map((unit) => (
                    <div className="market-preview-unit-card" key={unit.name}>
                      <div className="market-preview-unit-info">
                        <span className="market-preview-unit-name">{unit.name}</span>
                        <span className="market-preview-unit-count">
                          {unit.wordsCount} words
                        </span>
                      </div>
                      {unit.hasStory && (
                        <button
                          className="market-preview-read-btn"
                          onClick={() => setSelectedStoryTopic(unit.name)}
                          title="Preview Reading Story"
                        >
                          <BookOpen size={14} />
                          <span>O'qish</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="market-preview-footer">
          <span className="market-preview-footer-words">
            📊 {marketPack.words.length} words total
          </span>

          <button
            className={`market-install-btn market-preview-action-btn${hasUpdate ? ' has-update' : ''}`}
            disabled={isInstalling || isUpdating || (isInstalled && !hasUpdate)}
            onClick={() => {
              if (hasUpdate) {
                onUpdate(marketPack, installedPack, missingWords);
              } else {
                onInstall(marketPack);
              }
            }}
          >
            {isInstalling ? (
              <>{t('library.installing')}</>
            ) : isUpdating ? (
              <>{t('library.updating')}</>
            ) : hasUpdate ? (
              <>Update (+{missingWords.length}) 🔄</>
            ) : isInstalled ? (
              <>{t('library.installed')}</>
            ) : (
              <>Download 📥</>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
