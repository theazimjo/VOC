import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Lightbulb, Mic } from 'lucide-react';
import { useWords } from '../../../../hooks/useWords';
import { useLanguage } from '../../../../contexts/LanguageContext';
import { scienceChapterText } from '../../../../data/scienceChapterText';
import { toShortLangCode } from '../../../../utils/dictionaryService';
import { useSpeechRecognitionTracker } from '../../../../hooks/useSpeechRecognitionTracker';
import VoiceReadAlongBar from '../../../../components/Read/VoiceReadAlongBar';
import WordTapPopover from '../../../../components/Words/WordTapPopover';

const ALOUD_PASS_RATIO = 0.9;

function buildPageWords(page) {
  const list = [];
  (page || []).forEach((block) => {
    if (!block.text) return;
    const segments = block.text.split(/(\{\{[^}]+\}\})/);
    segments.forEach((segment) => {
      const phraseMatch = segment.match(/^\{\{([^}]+)\}\}$/);
      if (phraseMatch) {
        list.push(phraseMatch[1]);
      } else {
        const matches = segment.match(/[A-Za-z']+/g);
        if (matches) list.push(...matches);
      }
    });
  });
  return list;
}

function getBlockWordCount(text) {
  if (!text) return 0;
  let count = 0;
  text.split(/(\{\{[^}]+\}\})/).forEach((segment) => {
    if (/^\{\{[^}]+\}\}$/.test(segment)) {
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
  return text.split(CALLOUT_LINE_BREAK_RE).map((s) => s.trim()).filter(Boolean);
}

function WordTokens({ text, onWordTap, knownWords, startIndex = 0, activeWordIndex = -1, passedWordIndices, selectedWordIdx = null }) {
  const segments = text.split(/(\{\{[^}]+\}\})/);
  let idx = startIndex;

  return segments.map((segment, segIdx) => {
    const phraseMatch = segment.match(/^\{\{([^}]+)\}\}$/);
    if (phraseMatch) {
      const phrase = phraseMatch[1];
      const known = knownWords.has(phrase.toLowerCase());
      const wordIdx = idx++;
      const isPassed = passedWordIndices.has(wordIdx);
      const isActive = activeWordIndex === wordIdx;
      const isSelected = selectedWordIdx === wordIdx;
      return (
        <span
          key={segIdx}
          className={`science-word science-phrase ${known ? 'science-known' : ''} ${isPassed ? 'science-spoken-passed' : ''} ${isActive ? 'science-spoken-active' : ''} ${isSelected ? 'read-selected' : ''}`}
          onClick={(e) => {
            const sel = window.getSelection();
            const selText = sel ? sel.toString().trim() : '';
            if (selText && selText.length > 0 && selText.toLowerCase() !== phrase.toLowerCase()) {
              return;
            }
            onWordTap(phrase, e.currentTarget, wordIdx);
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
        const wordIdx = idx++;
        const isPassed = passedWordIndices.has(wordIdx);
        const isActive = activeWordIndex === wordIdx;
        const isSelected = selectedWordIdx === wordIdx;
        return (
          <span
            key={`${segIdx}-${i}`}
            className={`science-word ${known ? 'science-known' : ''} ${isPassed ? 'science-spoken-passed' : ''} ${isActive ? 'science-spoken-active' : ''} ${isSelected ? 'read-selected' : ''}`}
            onClick={(e) => {
              const sel = window.getSelection();
              const selText = sel ? sel.toString().trim() : '';
              if (selText && selText.length > 0 && selText.toLowerCase() !== clean.toLowerCase()) {
                return;
              }
              onWordTap(clean, e.currentTarget, wordIdx);
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

function ScienceBlock({ block, startIndex, onWordTap, knownWords, recentWords, activeWordIndex, passedWordIndices, selectedWordIdx, isOnlyBlock }) {
  if (block.type === 'image-group') {
    const isSolo = block.images.length === 1;
    const isPageHero = isSolo && isOnlyBlock;
    const groupClassName = [
      'science-image-group',
      isSolo && 'science-image-group--solo',
      isPageHero && 'science-image-group--page',
    ].filter(Boolean).join(' ');
    return (
      <div className={groupClassName}>
        {block.images.map((img, i) => (
          <figure className="science-image-item" key={i}>
            <img src={img.src} alt={img.caption || ''} loading="lazy" />
            {img.caption && <figcaption>{img.caption}</figcaption>}
          </figure>
        ))}
      </div>
    );
  }

  if (block.type === 'heading') {
    return <h3 className="science-block-heading">{block.text}</h3>;
  }

  if (block.type === 'activity' || block.type === 'sidebar') {
    const calloutLines = splitCalloutLines(block.text);
    let lineStart = startIndex;
    return (
      <div className="science-callout">
        <div className="science-callout-icon"><Lightbulb size={18} /></div>
        <div className="science-callout-body">
          {calloutLines.map((line, lineIdx) => {
            const lineStartIndex = lineStart;
            lineStart += getBlockWordCount(line);
            const isStep = CALLOUT_STEP_RE.test(line);
            return (
              <p
                className={`science-callout-line${isStep ? ' science-callout-step' : ''}`}
                key={lineIdx}
              >
                <WordTokens
                  text={line}
                  onWordTap={onWordTap}
                  knownWords={knownWords}
                  recentWords={recentWords}
                  startIndex={lineStartIndex}
                  activeWordIndex={activeWordIndex}
                  passedWordIndices={passedWordIndices}
                  selectedWordIdx={selectedWordIdx}
                />
              </p>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <p className="science-block-p">
      <WordTokens
        text={block.text}
        onWordTap={onWordTap}
        knownWords={knownWords}
        recentWords={recentWords}
        startIndex={startIndex}
        activeWordIndex={activeWordIndex}
        passedWordIndices={passedWordIndices}
        selectedWordIdx={selectedWordIdx}
      />
    </p>
  );
}

// Renders one batch's pages one at a time: the batch's first 2 pages are
// silent reading (Next always enabled), the rest require reading aloud into
// the mic — Next stays disabled until useSpeechRecognitionTracker reports
// ~90% of the page's words as spoken (same threshold ReadPage's Speak Mode
// uses to mark a page complete).
export default function ScienceReadingPages({ pack, topic, batch, onDone }) {
  const { t } = useLanguage();
  const { words, addWord, updateWord } = useWords('packs', pack.id);
  const [subIndex, setSubIndex] = useState(0);
  const [tapState, setTapState] = useState(null);
  const [selectedWordIdx, setSelectedWordIdx] = useState(null);

  const recentStorageKey = `readRecentLookups:${pack?.id || 'science'}`;
  const [recentWords, setRecentWords] = useState(() => {
    try {
      const saved = localStorage.getItem(recentStorageKey);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const chapter = scienceChapterText[topic];
  const pageIdx = batch.pageIndices[subIndex];
  const page = useMemo(() => chapter?.pages[pageIdx] || [], [chapter, pageIdx]);
  const isAloudPage = batch.aloudPageIndices.includes(pageIdx);

  const pageWords = useMemo(() => buildPageWords(page), [page]);
  const knownWords = useMemo(
    () => new Set(words.filter((w) => w.topic === topic).map((w) => (w.word || '').trim().toLowerCase())),
    [words, topic]
  );
  const wordLangCode = toShortLangCode(pack?.language || 'en-US');

  const {
    isSupported,
    isListening,
    activeWordIndex,
    passedWordIndices,
    wpm,
    accuracy,
    error: speechError,
    toggleListening,
    stopListening,
    resetTracker,
  } = useSpeechRecognitionTracker({
    pageWords,
    langCode: pack?.language || 'en-US',
    enabled: isAloudPage,
  });

  const aloudThresholdReached =
    pageWords.length === 0 ||
    passedWordIndices.size >= Math.ceil(pageWords.length * ALOUD_PASS_RATIO) ||
    activeWordIndex >= pageWords.length - 1;

  // If the browser doesn't support speech recognition at all, don't trap
  // the user on a page they have no way to complete.
  const isPageReadyForNext = !isAloudPage || !isSupported || aloudThresholdReached;

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

  const handleWordTap = useCallback((word, el, wordIdx, contextSentence) => {
    const cleanWord = (word || '').trim().toLowerCase();
    setSelectedWordIdx(wordIdx ?? null);
    setTapState({ word, anchorRect: el.getBoundingClientRect(), contextSentence });
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
      });
    } else {
      await addWord({
        word,
        translation,
        topic,
        partOfSpeech: partOfSpeech || 'noun',
        definition: definition || '',
        example: example || '',
        notes: '',
      });
    }
  }, [addWord, updateWord, topic]);

  const isLastSubPage = subIndex === batch.pageIndices.length - 1;

  const handleNext = () => {
    if (isLastSubPage) {
      onDone();
      return;
    }
    setSubIndex((i) => i + 1);
  };

  let wordOffset = 0;

  return (
    <div className="science-reading-view">
      <div className="science-page-dots">
        {batch.pageIndices.map((p, i) => (
          <span
            key={p}
            className={`science-page-dot ${batch.aloudPageIndices.includes(p) ? 'aloud' : 'silent'} ${i === subIndex ? 'active' : i < subIndex ? 'read' : ''}`}
          />
        ))}
      </div>

      <div className="science-page-mode-hint">
        {isAloudPage ? (
          <span className="science-mode-badge science-mode-aloud"><Mic size={13} /> {t('course.scienceAloudHint')}</span>
        ) : (
          <span className="science-mode-badge science-mode-silent">{t('course.scienceSilentHint')}</span>
        )}
      </div>

      {isAloudPage && isSupported && (
        <VoiceReadAlongBar
          isListening={isListening}
          onToggleListening={toggleListening}
          onReset={resetTracker}
          onClose={stopListening}
          passedCount={passedWordIndices.size}
          totalWords={pageWords.length}
          wpm={wpm}
          accuracy={accuracy}
          isSupported={isSupported}
          error={speechError}
          t={t}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={pageIdx}
          className="science-page-body"
          lang={wordLangCode}
          onMouseUp={handleSelectionEnd}
          onTouchEnd={handleSelectionEnd}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.2 }}
        >
          {page.map((block, i) => {
            const start = wordOffset;
            if (block.text) wordOffset += getBlockWordCount(block.text);
            return (
              <ScienceBlock
                key={i}
                block={block}
                startIndex={start}
                onWordTap={handleWordTap}
                knownWords={knownWords}
                recentWords={recentWords}
                activeWordIndex={activeWordIndex}
                passedWordIndices={passedWordIndices}
                selectedWordIdx={selectedWordIdx}
                isOnlyBlock={page.length === 1}
              />
            );
          })}
        </motion.div>
      </AnimatePresence>

      <div className="science-page-footer">
        <span className="science-page-label">{subIndex + 1} / {batch.pageIndices.length}</span>
        <button
          type="button"
          className="course-lesson-practice-btn"
          onClick={handleNext}
          disabled={!isPageReadyForNext}
        >
          {isLastSubPage ? t('course.scienceContinueToTest') : t('read.nextPage')} <ChevronRight size={15} />
        </button>
      </div>

      <AnimatePresence>
        {tapState && (
          <WordTapPopover
            key={tapState.word}
            word={tapState.word}
            anchorRect={tapState.anchorRect}
            packId={pack.id}
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
    </div>
  );
}
