import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Minus, Check, CheckCircle2, Sun, Moon, BookOpen, Lightbulb, HelpCircle, Eye, EyeOff, Mic, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ref, onValue, set } from 'firebase/database';
import { db } from '../../firebase';
import { usePacks } from '../../hooks/usePacks';
import { useWords } from '../../hooks/useWords';
import { useLanguage } from '../../contexts/LanguageContext';
import { scienceChapterText } from '../../data/scienceChapterText';
import { healthChapterText } from '../../data/healthChapterText';
import { formatPageRange, getTopicPageRangeInfo } from '../../utils/chapterPageRanges';
import { toShortLangCode } from '../../utils/dictionaryService';
import { useSpeechRecognitionTracker } from '../../hooks/useSpeechRecognitionTracker';
import VoiceReadAlongBar from '../../components/Read/VoiceReadAlongBar';
import WordTapPopover from '../../components/Words/WordTapPopover';
import IosSpinner from '../../components/common/IosSpinner';
import './ReadPage.css';

const chapterTextByTopic = { ...scienceChapterText, ...healthChapterText };

function getBlockWordCount(text) {
  if (!text) return 0;
  let count = 0;
  const segments = text.split(/(\{\{[^}]+\}\})/);
  segments.forEach(segment => {
    const phraseMatch = segment.match(/^\{\{([^}]+)\}\}$/);
    if (phraseMatch) {
      count++;
    } else {
      const matches = segment.match(/[A-Za-z']+/g);
      if (matches) count += matches.length;
    }
  });
  return count;
}

// Activity/sidebar text is authored as one long string (e.g. "Materials: ...
// Procedure: A. Fold a paper towel... B. Place four seeds..."), which reads
// as a wall of text. Break it into its own line wherever a new lettered
// step ("A. "), numbered sub-question ("1. "), or named section
// ("Materials:", "Procedure:", "Conclusion:", "Using science ideas:")
// starts right after the end of the previous sentence.
const CALLOUT_LINE_BREAK_RE = /(?<=[.?:])\s+(?=(?:[A-Z]\.\s|[0-9]+\.\s|Materials:|Procedure:|Conclusion:|Using science ideas:))/;
const CALLOUT_STEP_RE = /^(?:[A-Z]\.\s|[0-9]+\.\s)/;

function splitCalloutLines(text) {
  if (!text) return [];
  return text.split(CALLOUT_LINE_BREAK_RE).map(s => s.trim()).filter(Boolean);
}

function WordTokens({
  text,
  onWordTap,
  knownWords,
  startIndex = 0,
  activeWordIndex = -1,
  passedWordIndices = new Set(),
  errorWordIndices = new Set(),
  selectedWordIdx = null,
  onWordClickIndex
}) {
  const segments = text.split(/(\{\{[^}]+\}\})/);
  let currentWordIdx = startIndex;

  return segments.map((segment, segIdx) => {
    const phraseMatch = segment.match(/^\{\{([^}]+)\}\}$/);
    if (phraseMatch) {
      const phrase = phraseMatch[1];
      const known = knownWords.has(phrase.toLowerCase());
      const wordIdx = currentWordIdx++;
      const isPassed = passedWordIndices.has(wordIdx);
      const isActive = activeWordIndex === wordIdx;
      const isError = errorWordIndices.has(wordIdx);
      const isSelected = selectedWordIdx === wordIdx;

      return (
        <span
          key={segIdx}
          className={`read-word read-phrase ${known ? 'read-known' : ''} ${isPassed ? 'read-spoken-passed' : ''} ${isActive ? 'read-spoken-active' : ''} ${isError ? 'read-spoken-error' : ''} ${isSelected ? 'read-selected' : ''}`}
          onClick={(e) => {
            const sel = window.getSelection();
            const selText = sel ? sel.toString().trim() : '';
            if (selText && selText.length > 0 && selText.toLowerCase() !== phrase.toLowerCase()) {
              return;
            }
            if (onWordClickIndex) onWordClickIndex(wordIdx);
            onWordTap(phrase, e.currentTarget, wordIdx, text);
          }}
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
        const wordIdx = currentWordIdx++;
        const isPassed = passedWordIndices.has(wordIdx);
        const isActive = activeWordIndex === wordIdx;
        const isError = errorWordIndices.has(wordIdx);
        const isSelected = selectedWordIdx === wordIdx;

        return (
          <span
            key={`${segIdx}-${i}`}
            className={`read-word ${known ? 'read-known' : ''} ${isPassed ? 'read-spoken-passed' : ''} ${isActive ? 'read-spoken-active' : ''} ${isError ? 'read-spoken-error' : ''} ${isSelected ? 'read-selected' : ''}`}
            onClick={(e) => {
              const sel = window.getSelection();
              const selText = sel ? sel.toString().trim() : '';
              if (selText && selText.length > 0 && selText.toLowerCase() !== clean.toLowerCase()) {
                return;
              }
              if (onWordClickIndex) onWordClickIndex(wordIdx);
              onWordTap(clean, e.currentTarget, wordIdx, text);
            }}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  });
}

function ReviewItem({ item, t }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="read-review-item">
      <div className="read-review-prompt">
        <span className="read-review-index">{item.num ? `${item.num}.` : ''}</span>
        <span>{item.prompt}</span>
      </div>
      {item.answer && (
        <button
          type="button"
          className="read-review-toggle"
          onClick={() => setRevealed(r => !r)}
        >
          {revealed ? <EyeOff size={14} /> : <Eye size={14} />}
          {revealed ? t('read.hideAnswer') : t('read.showAnswer')}
        </button>
      )}
      {item.answer && revealed && (
        <div className="read-review-answer">{item.answer}</div>
      )}
    </div>
  );
}

function ReviewBlock({ block, t }) {
  return (
    <div className="read-review-card">
      <div className="read-review-header">
        <div className="read-review-icon">
          <HelpCircle size={20} />
        </div>
        <h3 className="read-review-title">{block.title}</h3>
      </div>
      {block.sections.map((section, sIdx) => (
        <div className="read-review-section" key={sIdx}>
          <h4 className="read-review-section-heading">{section.heading}</h4>
          {section.instructions && (
            <p className="read-review-instructions">{section.instructions}</p>
          )}
          <div className="read-review-items">
            {section.items.map((item, iIdx) => (
              <ReviewItem key={iIdx} item={{ ...item, num: iIdx + 1 }} t={t} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ReadPage() {
  const { packId } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [searchParams] = useSearchParams();
  const topic = searchParams.get('topic') || '';

  const { getPack } = usePacks();
  const { words, addWord, updateWord } = useWords('packs', packId);

  const [pack, setPack] = useState(null);
  const [packLoading, setPackLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(() => {
    // Read saved progress immediately — avoids the 0→restore race condition
    try {
      const key = `readProgress:${packId}:${new URLSearchParams(window.location.search).get('topic') || ''}`;
      const saved = localStorage.getItem(key);
      if (saved !== null) {
        const n = parseInt(saved, 10);
        if (Number.isFinite(n) && n >= 0) return n;
      }
    } catch {}
    return 0;
  });
  const [tapState, setTapState] = useState(null);
  const [selectedWordIdx, setSelectedWordIdx] = useState(null);
  const [direction, setDirection] = useState(1);
  const [activeImageModal, setActiveImageModal] = useState(null);
  const railInnerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeImageModal) {
        setActiveImageModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageModal]);

  const recentStorageKey = `readRecentLookups:${packId}`;
  const [recentWords, setRecentWords] = useState(() => {
    try {
      const saved = localStorage.getItem(recentStorageKey);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

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

  const [railScrollState, setRailScrollState] = useState({ isAtTop: true, isAtBottom: false });

  const handleRailScroll = useCallback(() => {
    const el = railInnerRef.current;
    if (!el) return;
    const isAtTop = el.scrollTop <= 4;
    const isAtBottom = Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight - 4;
    setRailScrollState({ isAtTop, isAtBottom });
  }, []);

  useEffect(() => {
    const el = railInnerRef.current;
    if (!el) return;
    handleRailScroll();
    el.addEventListener('scroll', handleRailScroll);
    window.addEventListener('resize', handleRailScroll);
    return () => {
      el.removeEventListener('scroll', handleRailScroll);
      window.removeEventListener('resize', handleRailScroll);
    };
  }, [handleRailScroll, chapter, pageIndex, packLoading]);

  // Auto-scroll the page rail to center the active page button (works on initial mount, F5 refresh & page switch)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!railInnerRef.current) return;
      const activeBtn = railInnerRef.current.querySelector('.read-pc-page-btn.active');
      if (activeBtn) {
        activeBtn.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
      handleRailScroll();
    }, 120);
    return () => clearTimeout(timer);
  }, [pageIndex, chapter, packLoading, handleRailScroll]);

  // Save current page whenever it changes
  useEffect(() => {
    if (!chapter) return;
    try {
      localStorage.setItem(progressKey, String(pageIndex));
    } catch {}
  }, [pageIndex, chapter, progressKey]);

  const page = useMemo(() => chapter?.pages[pageIndex] || [], [chapter, pageIndex]);

  const [isSpeakMode, setIsSpeakMode] = useState(false);

  const pageWords = useMemo(() => {
    if (!page || !Array.isArray(page)) return [];
    const words = [];
    page.forEach(block => {
      if (block.text) {
        const segments = block.text.split(/(\{\{[^}]+\}\})/);
        segments.forEach(segment => {
          const phraseMatch = segment.match(/^\{\{([^}]+)\}\}$/);
          if (phraseMatch) {
            words.push(phraseMatch[1]);
          } else {
            const matches = segment.match(/[A-Za-z']+/g);
            if (matches) words.push(...matches);
          }
        });
      }
    });
    return words;
  }, [page]);

  const knownWords = useMemo(() => {
    return new Set(
      words.filter(w => w.topic === topic).map(w => (w.word || '').trim().toLowerCase())
    );
  }, [words, topic]);

  const wordLangCode = toShortLangCode(pack?.language || 'en-US');

  const {
    isSupported: isSpeechSupported,
    isListening: isSpeechListening,
    activeWordIndex,
    passedWordIndices,
    errorWordIndices,
    wpm,
    accuracy,
    error: speechError,
    startListening,
    stopListening,
    toggleListening,
    resetTracker,
    setActiveWordIndex
  } = useSpeechRecognitionTracker({
    pageWords,
    langCode: pack?.language || 'en-US',
    enabled: isSpeakMode
  });

  const { user } = useAuth();
  const completedStorageKey = `readCompletedPages:${packId}:${topic}`;

  const [completedPages, setCompletedPages] = useState(() => {
    try {
      const saved = localStorage.getItem(completedStorageKey);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Sync completedPages with Firebase Realtime Database across all devices safely
  useEffect(() => {
    if (!user?.uid || !packId || !topic) return;
    const safeTopic = encodeURIComponent(topic).replace(/\./g, '%2E');
    try {
      const completedRef = ref(db, `users/${user.uid}/completedPages/${packId}/${safeTopic}`);
      const unsub = onValue(completedRef, (snapshot) => {
        if (snapshot.exists()) {
          const arr = snapshot.val();
          if (Array.isArray(arr)) {
            setCompletedPages(new Set(arr));
            try {
              localStorage.setItem(completedStorageKey, JSON.stringify(arr));
            } catch {}
          }
        } else {
          // If Firebase has no record yet, upload existing local storage pages to Firebase
          try {
            const saved = localStorage.getItem(completedStorageKey);
            if (saved) {
              const localArr = JSON.parse(saved);
              if (Array.isArray(localArr) && localArr.length > 0) {
                set(completedRef, localArr).catch(() => {});
              }
            }
          } catch {}
        }
      }, (err) => {
        console.warn('Firebase completedPages listener error:', err);
      });
      return () => unsub();
    } catch (err) {
      console.warn('Firebase ref creation error:', err);
    }
  }, [user?.uid, packId, topic, completedStorageKey]);

  const isCurrentPageCompleted = completedPages.has(pageIndex);

  const togglePageCompleted = useCallback(() => {
    setCompletedPages(prev => {
      const next = new Set(prev);
      if (next.has(pageIndex)) {
        next.delete(pageIndex);
      } else {
        next.add(pageIndex);
      }
      const arr = [...next];
      try {
        localStorage.setItem(completedStorageKey, JSON.stringify(arr));
      } catch {}

      if (user?.uid && packId && topic) {
        try {
          const safeTopic = encodeURIComponent(topic).replace(/\./g, '%2E');
          set(ref(db, `users/${user.uid}/completedPages/${packId}/${safeTopic}`), arr).catch((err) => {
            console.warn('Error syncing completedPages to Firebase:', err);
          });
        } catch (err) {
          console.warn('Firebase set error:', err);
        }
      }

      return next;
    });
  }, [pageIndex, completedStorageKey, user?.uid, packId, topic]);

  // Auto-scroll to currently spoken word
  useEffect(() => {
    if (isSpeakMode && activeWordIndex >= 0) {
      const el = document.querySelector('.read-spoken-active');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [isSpeakMode, activeWordIndex]);

  // Keyboard navigation (<, >, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (!chapter || !chapter.pages) return;
    const totalPages = chapter.pages.length;

    const handleKeyDown = (e) => {
      const tag = e.target?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || e.target?.isContentEditable) return;

      if (e.key === 'ArrowLeft' || e.key === '<' || e.key === ',') {
        setPageIndex(current => {
          if (current > 0) {
            setDirection(-1);
            return current - 1;
          }
          return current;
        });
      } else if (e.key === 'ArrowRight' || e.key === '>' || e.key === '.') {
        setPageIndex(current => {
          if (current < totalPages - 1) {
            setDirection(1);
            return current + 1;
          }
          return current;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [chapter]);

  // Auto-scroll active page button into view in PC left rail
  useEffect(() => {
    const activeBtn = document.querySelector('.read-pc-page-rail .read-pc-page-btn.active');
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [pageIndex]);

  const handleSelectionEnd = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;
    const selectedText = selection.toString().replace(/\s+/g, ' ').trim();
    if (!selectedText || selectedText.length < 2) return;

    try {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      if (rect && rect.width > 0 && rect.height > 0) {
        setSelectedWordIdx(null);
        setTapState({
          word: selectedText,
          anchorRect: rect
        });
      }
    } catch {}
  }, []);

  const handleWordTap = useCallback((word, anchorEl, wordIdx, contextSentence) => {
    if (!word) return;
    const cleanWord = word.trim().toLowerCase();
    setSelectedWordIdx(wordIdx ?? null);
    setTapState({ word, anchorRect: anchorEl.getBoundingClientRect(), contextSentence });

    setRecentWords(prev => {
      if (prev.has(cleanWord)) return prev;
      const next = new Set(prev);
      next.add(cleanWord);
      try {
        localStorage.setItem(recentStorageKey, JSON.stringify([...next]));
      } catch {}
      return next;
    });
  }, [recentStorageKey]);

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

  const topicRange = getTopicPageRangeInfo(topic);
  const currentReadPage = topicRange
    ? Math.min(topicRange.start + pageIndex, topicRange.end)
    : pageIndex + 1;
  const displayTotalPages = topicRange
    ? topicRange.end
    : totalPages;

  let wordOffsetCounter = 0;

  return (
    <div className={`read-page-shell theme-${readerTheme}`}>
      {/* PC Left Side Floating Page Numbers Rail */}
      <div className="read-pc-page-rail">
        <button
          type="button"
          className={`read-pc-rail-scroll-btn top ${railScrollState.isAtTop ? 'disabled' : ''}`}
          onClick={() => {
            if (!railScrollState.isAtTop && railInnerRef.current) {
              railInnerRef.current.scrollBy({ top: -120, behavior: 'smooth' });
            }
          }}
          disabled={railScrollState.isAtTop}
          title={railScrollState.isAtTop ? "Eng tepadasiz" : "Tepaga siljitish"}
          aria-label="Scroll up page list"
        >
          {railScrollState.isAtTop ? <Minus size={11} className="read-pc-rail-line-icon" /> : <ChevronUp size={13} />}
        </button>
        <div className="read-pc-page-rail-inner" ref={railInnerRef}>
          {chapter.pages.map((_, idx) => {
            const pageNum = topicRange ? (topicRange.start + idx) : (idx + 1);
            const isActive = idx === pageIndex;
            const isCompleted = completedPages.has(idx);
            return (
              <button
                key={idx}
                type="button"
                className={`read-pc-page-btn ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => {
                  if (idx !== pageIndex) {
                    setDirection(idx > pageIndex ? 1 : -1);
                    setPageIndex(idx);
                  }
                }}
                title={`Page ${pageNum}${isCompleted ? ' (To\'liq o\'qilgan)' : ''}`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          className={`read-pc-rail-scroll-btn bottom ${railScrollState.isAtBottom ? 'disabled' : ''}`}
          onClick={() => {
            if (!railScrollState.isAtBottom && railInnerRef.current) {
              railInnerRef.current.scrollBy({ top: 120, behavior: 'smooth' });
            }
          }}
          disabled={railScrollState.isAtBottom}
          title={railScrollState.isAtBottom ? "Eng pastdasiz" : "Pastga siljitish"}
          aria-label="Scroll down page list"
        >
          {railScrollState.isAtBottom ? <Minus size={11} className="read-pc-rail-line-icon" /> : <ChevronDown size={13} />}
        </button>
      </div>

      {/* Floating Side Navigation Arrows (Middle height beside text) */}
      <button
        type="button"
        className={`read-side-arrow read-side-arrow-prev ${pageIndex === 0 ? 'disabled' : ''}`}
        onClick={() => {
          if (pageIndex > 0) {
            setDirection(-1);
            setPageIndex(i => i - 1);
          }
        }}
        disabled={pageIndex === 0}
        aria-label={t('read.prevPage')}
        title={t('read.prevPage')}
      >
        <ChevronLeft size={22} strokeWidth={2.4} />
      </button>

      <button
        type="button"
        className="read-side-arrow read-side-arrow-next"
        onClick={() => {
          if (isLastPage) {
            navigate(`/packs/${packId}?topic=${encodeURIComponent(topic)}`);
          } else {
            setDirection(1);
            setPageIndex(i => i + 1);
          }
        }}
        aria-label={isLastPage ? t('read.finishChapter') : t('read.nextPage')}
        title={isLastPage ? t('read.finishChapter') : t('read.nextPage')}
      >
        {isLastPage ? <Check size={22} strokeWidth={2.4} /> : <ChevronRight size={22} strokeWidth={2.4} />}
      </button>

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
              <span className="read-chapter-subtitle">
                {topic}{formatPageRange(topic) ? ` (${formatPageRange(topic)})` : ''}
              </span>
            </div>
          </div>

          {/* Reader Controls Toolbar */}
          <div className="read-toolbar">
            <button
              type="button"
              className={`read-tool-btn read-speak-mode-btn ${isSpeakMode ? 'active' : ''}`}
              onClick={() => {
                const nextMode = !isSpeakMode;
                setIsSpeakMode(nextMode);
                if (nextMode) {
                  startListening();
                } else {
                  stopListening();
                }
              }}
              title={t('read.speakModeTitle')}
            >
              <Mic size={15} />
              <span>Speak</span>
            </button>

            <button
              type="button"
              className={`read-tool-btn read-mark-read-btn ${isCurrentPageCompleted ? 'completed' : ''}`}
              onClick={togglePageCompleted}
              title={isCurrentPageCompleted ? t('read.markAsUnread') : t('read.markAsRead')}
            >
              <CheckCircle2 size={16} />
            </button>

            <div className="read-tool-divider" />

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

        {/* Speak Mode Karaoke Control Bar */}
        <AnimatePresence>
          {isSpeakMode && (
            <VoiceReadAlongBar
              isListening={isSpeechListening}
              onToggleListening={toggleListening}
              onReset={resetTracker}
              onClose={() => {
                stopListening();
                setIsSpeakMode(false);
              }}
              passedCount={passedWordIndices.size}
              totalWords={pageWords.length}
              wpm={wpm}
              accuracy={accuracy}
              isSupported={isSpeechSupported}
              error={speechError}
              t={t}
            />
          )}
        </AnimatePresence>

        {/* Page Content Body */}
        <motion.div
          className={`read-body font-size-${fontSize}`}
          key={pageIndex}
          lang={wordLangCode}
          onMouseUp={handleSelectionEnd}
          onTouchEnd={handleSelectionEnd}
          initial={{ opacity: 0, rotateY: direction > 0 ? 12 : -12, x: direction > 0 ? 18 : -18 }}
          animate={{ opacity: 1, rotateY: 0, x: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: direction > 0 ? 'left center' : 'right center' }}
        >
          {page.map((block, blockIdx) => {
            if (block.type === 'review') {
              return <ReviewBlock block={block} t={t} key={blockIdx} />;
            }

            if (block.type === 'image-group') {
              const isSolo = block.images.length === 1;
              const isPageHero = isSolo && page.length === 1;
              const groupClassName = [
                'read-image-group',
                isSolo && 'read-image-group--solo',
                isPageHero && 'read-image-group--page',
              ].filter(Boolean).join(' ');
              return (
                <div className={groupClassName} key={blockIdx}>
                  {block.images.map((img, imgIdx) => (
                    <figure
                      className="read-image-item read-image-clickable"
                      key={imgIdx}
                      onClick={() => setActiveImageModal({ src: img.src, caption: img.caption })}
                      title="Kattalashtirish uchun bosing"
                    >
                      <img src={img.src} alt={img.caption || ''} loading="lazy" />
                      {img.caption && <figcaption>{img.caption}</figcaption>}
                    </figure>
                  ))}
                </div>
              );
            }

            const currentStartIndex = wordOffsetCounter;
            if (block.text) {
              wordOffsetCounter += getBlockWordCount(block.text);
            }

            if (block.type === 'sidebar' || block.type === 'activity') {
              const calloutLines = splitCalloutLines(block.text);
              let lineStartIndex = currentStartIndex;
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
                      {calloutLines.map((line, lineIdx) => {
                        const lineStart = lineStartIndex;
                        lineStartIndex += getBlockWordCount(line);
                        const isStep = CALLOUT_STEP_RE.test(line);
                        return (
                          <p
                            className={`read-callout-line${isStep ? ' read-callout-step' : ''}`}
                            key={lineIdx}
                          >
                            <WordTokens
                              text={line}
                              onWordTap={handleWordTap}
                              knownWords={knownWords}
                              recentWords={recentWords}
                              startIndex={lineStart}
                              activeWordIndex={activeWordIndex}
                              passedWordIndices={passedWordIndices}
                              errorWordIndices={errorWordIndices}
                              selectedWordIdx={selectedWordIdx}
                              onWordClickIndex={(idx) => {
                                if (isSpeakMode) setActiveWordIndex(idx);
                              }}
                            />
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div className={`read-block read-block-${block.type}`} key={blockIdx}>
                <WordTokens
                  text={block.text}
                  onWordTap={handleWordTap}
                  knownWords={knownWords}
                  recentWords={recentWords}
                  startIndex={currentStartIndex}
                  activeWordIndex={activeWordIndex}
                  passedWordIndices={passedWordIndices}
                  selectedWordIdx={selectedWordIdx}
                  onWordClickIndex={(idx) => {
                    if (isSpeakMode) setActiveWordIndex(idx);
                  }}
                />
              </div>
            );
          })}
        </motion.div>

        {/* Reader Footer Progress & Navigation */}
        <footer className="read-footer">
          <div className="read-footer-nav read-footer-nav-prev">
            <button
              type="button"
              className="read-nav-prev-btn"
              onClick={() => { setDirection(-1); setPageIndex(i => i - 1); }}
              disabled={pageIndex === 0}
              style={{ opacity: pageIndex === 0 ? 0.3 : 1, pointerEvents: pageIndex === 0 ? 'none' : 'auto' }}
              title={t('read.prevPage')}
            >
              <ChevronLeft size={16} /> <span>{t('read.prevPage')}</span>
            </button>
          </div>

          {/* Page Indicator */}
          <div className="read-page-indicator">
            <div className="read-page-badge">{currentReadPage}</div>
            <div className="read-page-info">
              <span className="read-page-label">{t('read.pageLabel')}</span>
              <span className="read-page-total">{t('read.ofPages', { total: displayTotalPages })}</span>
            </div>
          </div>

          <div className="read-footer-nav read-footer-nav-next">
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
            isRecentlyViewed={recentWords.has(tapState.word.trim().toLowerCase())}
            contextSentence={tapState.contextSentence}
            onAdd={handleAddWord}
            onClose={() => {
              setTapState(null);
              setSelectedWordIdx(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Lightbox Image Preview Modal */}
      <AnimatePresence>
        {activeImageModal && (
          <motion.div
            className="read-lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImageModal(null)}
          >
            <motion.div
              className="read-lightbox-card"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="read-lightbox-close-btn"
                onClick={() => setActiveImageModal(null)}
                title="Yopish"
              >
                <X size={20} />
              </button>
              <img
                src={activeImageModal.src}
                alt={activeImageModal.caption || ''}
                className="read-lightbox-img"
              />
              {activeImageModal.caption && (
                <div className="read-lightbox-caption">
                  {activeImageModal.caption}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
