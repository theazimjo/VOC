import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Check, Sun, Moon, BookOpen, Lightbulb } from 'lucide-react';
import { usePacks } from '../../hooks/usePacks';
import { useWords } from '../../hooks/useWords';
import { useLanguage } from '../../contexts/LanguageContext';
import { scienceChapterText } from '../../data/scienceChapterText';
import { healthChapterText } from '../../data/healthChapterText';
import { toShortLangCode } from '../../utils/dictionaryService';
import WordTapPopover from '../../components/Words/WordTapPopover';
import IosSpinner from '../../components/common/IosSpinner';
import './ReadPage.css';

const chapterTextByTopic = { ...scienceChapterText, ...healthChapterText };

function WordTokens({ text, onWordTap, knownWords }) {
  const segments = text.split(/(\{\{[^}]+\}\})/);
  return segments.map((segment, segIdx) => {
    const phraseMatch = segment.match(/^\{\{([^}]+)\}\}$/);
    if (phraseMatch) {
      const phrase = phraseMatch[1];
      const known = knownWords.has(phrase.toLowerCase());
      return (
        <span
          key={segIdx}
          className={`read-word read-phrase ${known ? 'read-known' : ''}`}
          onClick={(e) => onWordTap(phrase, e.currentTarget)}
        >
          {phrase}
        </span>
      );
    }
    const parts = segment.split(/([A-Za-z']+)/);
    return parts.map((part, i) => {
      if (i % 2 === 1 && part.trim()) {
        const clean = part.replace(/^'+|'+$/g, '');
        const known = knownWords.has(clean.toLowerCase());
        return (
          <span
            key={`${segIdx}-${i}`}
            className={`read-word ${known ? 'read-known' : ''}`}
            onClick={(e) => onWordTap(clean, e.currentTarget)}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  });
}

export default function ReadPage() {
  const { packId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const topic = searchParams.get('topic') || '';

  const { getPack } = usePacks();
  const { words, addWord, updateWord } = useWords('packs', packId);

  const [pack, setPack] = useState(null);
  const [packLoading, setPackLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [tapState, setTapState] = useState(null);
  const [direction, setDirection] = useState(1);

  // Reader Settings: Theme ('light' | 'sepia' | 'dark') and Font Size ('small' | 'medium' | 'large')
  const [readerTheme, setReaderTheme] = useState(() => {
    try {
      return localStorage.getItem('reader_theme') || 'light';
    } catch {
      return 'light';
    }
  });

  const [fontSize, setFontSize] = useState(() => {
    try {
      return localStorage.getItem('reader_fontsize') || 'medium';
    } catch {
      return 'medium';
    }
  });

  const handleThemeChange = (newTheme) => {
    setReaderTheme(newTheme);
    try {
      localStorage.setItem('reader_theme', newTheme);
    } catch {}
  };

  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize);
    try {
      localStorage.setItem('reader_fontsize', newSize);
    } catch {}
  };

  useEffect(() => {
    const fetchPack = async () => {
      setPackLoading(true);
      const p = await getPack(packId);
      if (p) setPack(p);
      else navigate('/library?tab=packs');
      setPackLoading(false);
    };
    fetchPack();
  }, [packId, getPack, navigate]);

  const chapter = chapterTextByTopic[topic];

  const progressKey = `readProgress:${packId}:${topic}`;
  useEffect(() => {
    if (!chapter) return;
    try {
      const saved = localStorage.getItem(progressKey);
      const savedIndex = saved !== null ? parseInt(saved, 10) : 0;
      if (Number.isFinite(savedIndex) && savedIndex >= 0 && savedIndex < chapter.pages.length) {
        setPageIndex(savedIndex);
      }
    } catch {}
  }, [topic, chapter, progressKey]);

  useEffect(() => {
    if (!chapter) return;
    try {
      localStorage.setItem(progressKey, String(pageIndex));
    } catch {}
  }, [pageIndex, chapter, progressKey]);

  const page = useMemo(() => chapter?.pages[pageIndex] || [], [chapter, pageIndex]);

  const knownWords = useMemo(() => {
    return new Set(
      words.filter(w => w.topic === topic).map(w => (w.word || '').trim().toLowerCase())
    );
  }, [words, topic]);

  const wordLangCode = toShortLangCode(pack?.language || 'en-US');

  const handleWordTap = useCallback((word, anchorEl) => {
    if (!word) return;
    setTapState({ word, anchorRect: anchorEl.getBoundingClientRect() });
  }, []);

  const handleAddWord = useCallback(async ({ word, translation, definition, partOfSpeech, example, existingWord }) => {
    if (existingWord) {
      await updateWord(existingWord.id, {
        translation,
        topic,
        ...(definition ? { definition } : {}),
        ...(partOfSpeech ? { partOfSpeech } : {}),
        ...(example ? { example } : {}),
        mastery: 0,
        interval: 0,
        reviewCount: 0,
        nextReview: null,
        lastReviewed: null,
        stability: null
      });
    } else {
      await addWord({
        word,
        translation,
        topic,
        partOfSpeech: partOfSpeech || 'noun',
        definition: definition || '',
        example: example || '',
        notes: ''
      });
    }
  }, [addWord, updateWord, topic]);

  if (packLoading) {
    return (
      <div className="ios-activity-indicator" style={{ marginTop: '100px' }}>
        <IosSpinner />
        <span>{t('read.loading')}</span>
      </div>
    );
  }

  if (!pack || !chapter) {
    return (
      <div className="read-page-missing">
        <p>{t('read.missingText')}</p>
        <button className="btn btn-primary" onClick={() => navigate(`/packs/${packId}`)}>
          {t('read.backBtn')}
        </button>
      </div>
    );
  }

  const totalPages = chapter.pages.length;
  const isLastPage = pageIndex >= totalPages - 1;

  return (
    <div className={`read-page-shell theme-${readerTheme}`}>
      <div className="read-page">
        {/* Top Header */}
        <header className="read-header">
          <div className="read-header-left">
            <button
              className="read-back-btn"
              onClick={() => navigate(`/packs/${packId}?topic=${encodeURIComponent(topic)}`)}
              aria-label="Back"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="read-header-titles">
              <h1 className="read-chapter-title">{chapter.title || t('read.chapterFallback')}</h1>
              <span className="read-chapter-subtitle">{topic}</span>
            </div>
          </div>

          {/* Reader Controls Toolbar */}
          <div className="read-toolbar">
            <div className="read-font-group">
              <button
                type="button"
                className={`read-tool-btn ${fontSize === 'small' ? 'active' : ''}`}
                onClick={() => handleFontSizeChange('small')}
                title={t('read.fontSmaller')}
              >
                A-
              </button>
              <button
                type="button"
                className={`read-tool-btn ${fontSize === 'large' ? 'active' : ''}`}
                onClick={() => handleFontSizeChange('large')}
                title={t('read.fontLarger')}
              >
                A+
              </button>
            </div>

            <div className="read-tool-divider" />

            <div className="read-theme-group">
              <button
                type="button"
                className={`read-theme-btn ${readerTheme === 'light' ? 'active' : ''}`}
                onClick={() => handleThemeChange('light')}
                title={t('read.themeLight')}
              >
                <Sun size={15} />
              </button>
              <button
                type="button"
                className={`read-theme-btn read-theme-btn--sepia ${readerTheme === 'sepia' ? 'active' : ''}`}
                onClick={() => handleThemeChange('sepia')}
                title={t('read.themeSepia')}
              >
                <BookOpen size={15} />
              </button>
              <button
                type="button"
                className={`read-theme-btn ${readerTheme === 'dark' ? 'active' : ''}`}
                onClick={() => handleThemeChange('dark')}
                title={t('read.themeDark')}
              >
                <Moon size={15} />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content Body */}
        <motion.div
          className={`read-body font-size-${fontSize}`}
          key={pageIndex}
          lang={wordLangCode}
          initial={{ opacity: 0, rotateY: direction > 0 ? 12 : -12, x: direction > 0 ? 18 : -18 }}
          animate={{ opacity: 1, rotateY: 0, x: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: direction > 0 ? 'left center' : 'right center' }}
        >
          {page.map((block, blockIdx) => {
            if (block.type === 'image-group') {
              return (
                <div className="read-image-group" key={blockIdx}>
                  {block.images.map((img, imgIdx) => (
                    <figure className="read-image-item" key={imgIdx}>
                      <img src={img.src} alt={img.caption || ''} loading="lazy" />
                      {img.caption && <figcaption>{img.caption}</figcaption>}
                    </figure>
                  ))}
                </div>
              );
            }

            if (block.type === 'sidebar' || block.type === 'activity') {
              return (
                <div className="read-callout-card" key={blockIdx}>
                  <div className="read-callout-icon">
                    <Lightbulb size={20} />
                  </div>
                  <div className="read-callout-content">
                    <h4 className="read-callout-title">
                      {block.type === 'sidebar' ? t('read.didYouKnow') : t('read.readingTip')}
                    </h4>
                    <div className="read-callout-body">
                      <WordTokens text={block.text} onWordTap={handleWordTap} knownWords={knownWords} />
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div className={`read-block read-block-${block.type}`} key={blockIdx}>
                <WordTokens text={block.text} onWordTap={handleWordTap} knownWords={knownWords} />
              </div>
            );
          })}
        </motion.div>

        {/* Reader Footer Progress & Navigation */}
        <footer className="read-footer">
          <div className="read-page-indicator">
            <div className="read-page-badge">{pageIndex + 1}</div>
            <div className="read-page-info">
              <span className="read-page-label">{t('read.pageLabel')}</span>
              <span className="read-page-total">{t('read.ofPages', { total: totalPages })}</span>
            </div>
          </div>

          <div className="read-nav-actions">
            {pageIndex > 0 && (
              <button
                type="button"
                className="read-nav-prev-btn"
                onClick={() => { setDirection(-1); setPageIndex(i => i - 1); }}
                title={t('read.prevPage')}
              >
                <ChevronLeft size={16} /> {t('read.prevPage')}
              </button>
            )}

            {isLastPage ? (
              <button
                type="button"
                className="read-next-chapter-btn"
                onClick={() => navigate(`/packs/${packId}?topic=${encodeURIComponent(topic)}`)}
              >
                <span>{t('read.finishChapter')}</span>
                <Check size={16} />
              </button>
            ) : (
              <button
                type="button"
                className="read-next-chapter-btn"
                onClick={() => { setDirection(1); setPageIndex(i => i + 1); }}
              >
                <span>{t('read.nextPage')}</span>
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </footer>
      </div>

      <AnimatePresence>
        {tapState && (
          <WordTapPopover
            key={tapState.word}
            word={tapState.word}
            anchorRect={tapState.anchorRect}
            packId={packId}
            wordLangCode={wordLangCode}
            wordLocale={pack?.language || 'en-US'}
            currentTopic={topic}
            existingWords={words}
            onAdd={handleAddWord}
            onClose={() => setTapState(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
