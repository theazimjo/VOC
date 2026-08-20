import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { usePacks } from '../../hooks/usePacks';
import { useWords } from '../../hooks/useWords';
import { scienceChapterText } from '../../data/scienceChapterText';
import { speechLanguages } from '../../utils/helpers';
import { toShortLangCode } from '../../utils/dictionaryService';
import WordTapPopover from '../../components/Words/WordTapPopover';
import IosSpinner from '../../components/common/IosSpinner';
import './ReadPage.css';

function splitSentences(text) {
  return text.split(/(?<=[.!?])\s+/).filter(Boolean);
}

// Google Translate's own "listen" endpoint (translate.google.com uses it
// itself, no API key) - real Google TTS voices, noticeably clearer than the
// browser's built-in speechSynthesis voices, which vary wildly in quality
// by OS. It's a plain audio URL (not fetch/XHR), so no CORS is needed to
// play it via an <audio> element - only reading its raw bytes would require
// CORS, and playback doesn't do that. It caps out around ~200 characters
// per request, so longer sentences are chunked first.
const GOOGLE_TTS_ENDPOINT = 'https://translate.google.com/translate_tts';
const TTS_MAX_CHARS = 190;

function chunkForTTS(text) {
  if (text.length <= TTS_MAX_CHARS) return [text];
  const chunks = [];
  let remaining = text.trim();
  while (remaining.length > TTS_MAX_CHARS) {
    const window = remaining.slice(0, TTS_MAX_CHARS);
    const clauseBoundary = Math.max(window.lastIndexOf(', '), window.lastIndexOf('; '));
    let splitAt = clauseBoundary > 40 ? clauseBoundary + 1 : window.lastIndexOf(' ');
    if (splitAt <= 0) splitAt = TTS_MAX_CHARS;
    chunks.push(remaining.slice(0, splitAt).trim());
    remaining = remaining.slice(splitAt).trim();
  }
  if (remaining) chunks.push(remaining);
  return chunks;
}

// Resolves once playback finishes, rejects if Google's endpoint can't be
// reached/played (network error, autoplay block, etc.) so the caller can
// fall back to the browser's own voice for that one chunk.
function playGoogleTTS(text, lang, audioRef) {
  return new Promise((resolve, reject) => {
    const url = `${GOOGLE_TTS_ENDPOINT}?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${lang}&client=tw-ob`;
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.onended = () => resolve();
    audio.onerror = () => reject(new Error('google-tts-failed'));
    audio.play().catch(() => reject(new Error('google-tts-play-blocked')));
  });
}

function playBrowserTTS(text, lang, voiceLangPrefix) {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) { resolve(); return; }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.startsWith(voiceLangPrefix));
    if (voice) utterance.voice = voice;
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    window.speechSynthesis.speak(utterance);
  });
}

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
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(null);
  const speechCancelledRef = useRef(false);
  const currentAudioRef = useRef(null);

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

  useEffect(() => {
    return () => {
      speechCancelledRef.current = true;
      if (currentAudioRef.current) currentAudioRef.current.pause();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  // Stop any speech in progress whenever the page changes.
  useEffect(() => {
    speechCancelledRef.current = true;
    if (currentAudioRef.current) currentAudioRef.current.pause();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setActiveSentenceIndex(null);
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

  // Flattened list of every sentence on the current page (for read-aloud
  // chaining and for matching against the rendered sentence spans' indices).
  const pageSentences = useMemo(() => {
    const list = [];
    page.forEach((block, blockIdx) => {
      splitSentences(block.text).forEach((sentence) => {
        list.push({ blockIdx, text: sentence });
      });
    });
    return list;
  }, [page]);

  const wordLangCode = toShortLangCode(pack?.language || 'en-US');
  const speechLangMeta = speechLanguages.find(l => l.code === (pack?.language || 'en-US'));

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

  const stopSpeaking = () => {
    speechCancelledRef.current = true;
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setActiveSentenceIndex(null);
  };

  const startSpeaking = async () => {
    if (pageSentences.length === 0) return;
    speechCancelledRef.current = false;
    setIsSpeaking(true);

    const lang = speechLangMeta?.code || 'en-US';

    for (let i = 0; i < pageSentences.length; i++) {
      if (speechCancelledRef.current) break;
      setActiveSentenceIndex(i);
      const chunks = chunkForTTS(pageSentences[i].text);
      for (const chunk of chunks) {
        if (speechCancelledRef.current) break;
        try {
          await playGoogleTTS(chunk, wordLangCode, currentAudioRef);
        } catch {
          if (speechCancelledRef.current) break;
          await playBrowserTTS(chunk, lang, wordLangCode);
        }
      }
    }

    if (!speechCancelledRef.current) {
      setIsSpeaking(false);
      setActiveSentenceIndex(null);
    }
  };

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

  let sentenceCursor = -1;

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
        <button
          className={`read-speak-btn ${isSpeaking ? 'active' : ''}`}
          onClick={isSpeaking ? stopSpeaking : startSpeaking}
          aria-label="Read aloud"
        >
          {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </header>

      <div className="read-body">
        {page.map((block, blockIdx) => {
          const sentences = splitSentences(block.text);
          return (
            <div className={`read-block read-block-${block.type}`} key={blockIdx}>
              {sentences.map((sentence, sIdx) => {
                sentenceCursor += 1;
                const globalIdx = sentenceCursor;
                return (
                  <span
                    key={sIdx}
                    className={`read-sentence ${activeSentenceIndex === globalIdx ? 'active' : ''}`}
                  >
                    <WordTokens text={sentence} onWordTap={handleWordTap} knownWords={knownWords} />{' '}
                  </span>
                );
              })}
            </div>
          );
        })}
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
