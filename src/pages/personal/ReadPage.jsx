import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePacks } from '../../hooks/usePacks';
import { useWords } from '../../hooks/useWords';
import { scienceChapterText } from '../../data/scienceChapterText';
import { toShortLangCode } from '../../utils/dictionaryService';
import WordTapPopover from '../../components/Words/WordTapPopover';
import IosSpinner from '../../components/common/IosSpinner';
import './ReadPage.css';

// Chapter text can mark a multi-word expression (e.g. a phrasal verb like
// "carry out") as `{{carry out}}` so it reads as one tappable unit instead
// of "carry" and "out" being translated separately - neither word alone
// carries the combined meaning.
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
  const [searchParams] = useSearchParams();
  const topic = searchParams.get('topic') || '';

  const { getPack } = usePacks();
  const { words, addWord, updateWord } = useWords('packs', packId);

  const [pack, setPack] = useState(null);
  const [packLoading, setPackLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [tapState, setTapState] = useState(null); // { word, anchorRect } | null

  useEffect(() => {
    const fetchPack = async () => {
      setPackLoading(true);
      const p = await getPack(packId);
      if (p) setPack(p);
      else navigate('/library?tab=packs');
      setPackLoading(false);
    };
    fetchPack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packId]);

  const chapter = scienceChapterText[topic];

  const progressKey = `readProgress:${packId}:${topic}`;
  useEffect(() => {
    if (!chapter) return;
    try {
      const saved = localStorage.getItem(progressKey);
      const savedIndex = saved !== null ? parseInt(saved, 10) : 0;
      if (Number.isFinite(savedIndex) && savedIndex >= 0 && savedIndex < chapter.pages.length) {
        setPageIndex(savedIndex);
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic]);

  useEffect(() => {
    if (!chapter) return;
    try {
      localStorage.setItem(progressKey, String(pageIndex));
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex]);

  const page = useMemo(() => chapter?.pages[pageIndex] || [], [chapter, pageIndex]);

  // Words already saved under this chapter, so the reading text can
  // underline them - a quick visual cue for which words you've already
  // added, without having to tap each one to check.
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
        <span>Loading...</span>
      </div>
    );
  }

  if (!pack || !chapter) {
    return (
      <div className="read-page-missing">
        <p>Bu bob uchun o'qish matni hali mavjud emas.</p>
        <button className="btn btn-primary" onClick={() => navigate(`/packs/${packId}`)}>
          ← Orqaga
        </button>
      </div>
    );
  }

  const totalPages = chapter.pages.length;
  const isLastPage = pageIndex >= totalPages - 1;
  const isFirstPage = pageIndex <= 0;

  return (
    <motion.div className="read-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <header className="read-header">
        <button
          className="read-back-btn"
          onClick={() => navigate(`/packs/${packId}?topic=${encodeURIComponent(topic)}`)}
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="read-header-text">
          <h1>{chapter.title}</h1>
          <p>Page {pageIndex + 1} / {totalPages}</p>
        </div>
      </header>

      <div className="read-body">
        {page.map((block, blockIdx) => (
          <div className={`read-block read-block-${block.type}`} key={blockIdx}>
            <WordTokens text={block.text} onWordTap={handleWordTap} knownWords={knownWords} />
          </div>
        ))}
      </div>

      <footer className="read-footer">
        <button
          className="read-nav-btn"
          onClick={() => setPageIndex(i => Math.max(0, i - 1))}
          disabled={isFirstPage}
        >
          <ChevronLeft size={18} /> Prev
        </button>
        {isLastPage ? (
          <button className="read-finish-btn" onClick={() => navigate(`/packs/${packId}?topic=${encodeURIComponent(topic)}`)}>
            Bob tugadi — Bobga qaytish
          </button>
        ) : (
          <button
            className="read-nav-btn"
            onClick={() => setPageIndex(i => Math.min(totalPages - 1, i + 1))}
          >
            Next <ChevronRight size={18} />
          </button>
        )}
      </footer>

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
    </motion.div>
  );
}
