import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { usePacks } from '../hooks/usePacks';
import { useWords } from '../hooks/useWords';
import { speakWord } from '../utils/helpers';
import './StoryPage.css';

// ─── READING STORIES DATA ───────────────────────────────────────────────────
const CLASSIC_STORIES = [
  {
    id: 'samarkand',
    title: 'The Golden Samarkand',
    difficulty: 'Beginner',
    difficultyColor: '#10B981',
    readTime: '2 min',
    icon: '🕌',
    description: 'Ancient city walls, majestic blue tiles and historical wonders under the golden Uzbek sun.',
    paragraphs: [
      [
        { text: 'Amir lived in the ' },
        { text: 'ancient', highlight: true, id: 'ancient', translation: 'qadimiy, qadimgi', pos: 'adjective', definition: 'Belonging to the very distant past and no longer in existence.' },
        { text: ' city of Samarkand. Every day, he walked through the ' },
        { text: 'majestic', highlight: true, id: 'majestic', translation: 'guzal, muhtasham, ulug\'vor', pos: 'adjective', definition: 'Having or showing impressive beauty or dignity.' },
        { text: ' Registan Square.' }
      ],
      [
        { text: 'The blue ' },
        { text: 'tiles', highlight: true, id: 'tiles', translation: 'koshinlar, koshin taxtachalari', pos: 'noun', definition: 'Thin rectangular slabs of baked clay used for covering roofs, walls, or floors.' },
        { text: ' on the walls ' },
        { text: 'sparkled', highlight: true, id: 'sparkled', translation: 'yarqiradi, porladi', pos: 'verb', definition: 'Shined brightly with flashes of light.' },
        { text: ' under the warm sun. He loved to ' },
        { text: 'study', highlight: true, id: 'study', translation: 'o\'rganish, o\'qish', pos: 'verb', definition: 'Devote time and attention to acquiring knowledge on an academic subject.' },
        { text: ' history and dream about the future.' }
      ]
    ]
  },
  {
    id: 'cyberpunk',
    title: 'The Cyberpunk Hack',
    difficulty: 'Intermediate',
    difficultyColor: '#6366F1',
    readTime: '3 min',
    icon: '💻',
    description: 'A silent anomaly in the central database of Neo-Tashkent. Can Elena solve it?',
    paragraphs: [
      [
        { text: 'Elena was a silent programmer in the ' },
        { text: 'neon-drenched', highlight: true, id: 'neon-drenched', translation: 'neon chiroqlar bilan qoplangan', pos: 'adjective', definition: 'Heavily illuminated by bright neon light signs.' },
        { text: ' streets of Neo-Tashkent. One rainy evening, she detected a strange ' },
        { text: 'anomaly', highlight: true, id: 'anomaly', translation: 'g\'ayritabiiylik, anomaliya', pos: 'noun', definition: 'Something that deviates from what is standard, normal, or expected.' },
        { text: ' in the central database.' }
      ],
      [
        { text: 'Someone was trying to ' },
        { text: 'alter', highlight: true, id: 'alter', translation: 'o\'zgartirish, o\'zgartirmoq', pos: 'verb', definition: 'Change or cause to change in character or composition, typically in a comparatively small but significant way.' },
        { text: ' the historical ' },
        { text: 'archives', highlight: true, id: 'archives', translation: 'arxivlar', pos: 'noun', definition: 'A collection of historical documents or records providing information about a place, institution, or group.' },
        { text: ' .' }
      ],
      [
        { text: 'She decided to ' },
        { text: 'investigate', highlight: true, id: 'investigate', translation: 'tekshirish, tekshirib ko\'rmoq', pos: 'verb', definition: 'Carry out a systematic or formal inquiry to discover and examine the facts of an incident.' },
        { text: ' before the corporation noticed her ' },
        { text: 'presence', highlight: true, id: 'presence', translation: 'borligi, ishtiroki', pos: 'noun', definition: 'The state or fact of existing, occurring, or being present in a place or thing.' },
        { text: '.' }
      ]
    ]
  },
  {
    id: 'eco-warrior',
    title: 'The Eco-Warrior',
    difficulty: 'Advanced',
    difficultyColor: '#EF4444',
    readTime: '4 min',
    icon: '🌱',
    description: 'Unprecedented drought and the battle to restore ecological balance to arid lands.',
    paragraphs: [
      [
        { text: 'Global temperatures were rising at an ' },
        { text: 'unprecedented', highlight: true, id: 'unprecedented', translation: 'misli ko\'rilmagan', pos: 'adjective', definition: 'Never done or known before.' },
        { text: ' rate. Scientists warned that urgent ' },
        { text: 'mitigation', highlight: true, id: 'mitigation', translation: 'yumshatish, xavfni kamaytirish', pos: 'noun', definition: 'The action of reducing the severity, seriousness, or painfulness of something.' },
        { text: ' was required to prevent ecological collapse.' }
      ],
      [
        { text: 'Sophia dedicated her life to ' },
        { text: 'cultivating', highlight: true, id: 'cultivating', translation: 'etishtirish, o\'stirish', pos: 'verb', definition: 'Prepare and use (land) for crops or gardening; grow plants.' },
        { text: ' ' },
        { text: 'drought-resistant', highlight: true, id: 'drought-resistant', translation: 'qurg\'oqchilikka chidamli', pos: 'adjective', definition: 'Able to survive or grow with very little water or rain.' },
        { text: ' crops.' }
      ],
      [
        { text: 'Her research was ' },
        { text: 'pivotal', highlight: true, id: 'pivotal', translation: 'muhim, asosiy, hal qiluvchi', pos: 'adjective', definition: 'Of crucial importance in relation to the development or success of something else.' },
        { text: ' in restoring the ' },
        { text: 'arid', highlight: true, id: 'arid', translation: 'qurg\'oqchil, suvsiz', pos: 'adjective', definition: 'Having little or no rain; too dry or barren to support vegetation.' },
        { text: ' lands.' }
      ]
    ]
  }
];

// ─── INTENSIVE DIALOGUES DATA ────────────────────────────────────────────────
const INTENSIVE_STORIES = [
  {
    id: 'first-date',
    title: 'The Coffee Date',
    difficulty: 'Beginner',
    difficultyColor: '#10B981',
    readTime: '2 min',
    icon: '☕',
    description: 'A friendly and warm conversation between Alex and Emily at a cozy local cafe.',
    characters: {
      A: { name: 'Alex', avatar: '👨‍💼', gender: 'male', pitch: 0.85, rate: 0.95 },
      B: { name: 'Emily', avatar: '👩‍💼', gender: 'female', pitch: 1.25, rate: 1.05 }
    },
    lines: [
      {
        speaker: 'A',
        text: 'Hi Emily! Thanks for meeting me today. This cafe is incredibly ',
        words: [
          { text: 'cozy', highlight: true, id: 'cozy', translation: 'shinam, issiq', pos: 'adjective', definition: 'Giving a feeling of comfort, warmth, and relaxation.' },
          { text: '.' }
        ]
      },
      {
        speaker: 'B',
        text: 'Hi Alex! I agree. I love the warm ',
        words: [
          { text: 'atmosphere', highlight: true, id: 'atmosphere', translation: 'muhit, atmosfera', pos: 'noun', definition: 'The pervading tone or mood of a place, situation, or work of art.' },
          { text: ' here. Have you been here before?' }
        ]
      },
      {
        speaker: 'A',
        text: 'Actually, yes. I ',
        words: [
          { text: 'frequently', highlight: true, id: 'frequently', translation: 'tez-tez, tezda', pos: 'adverb', definition: 'Regularly or habitually; often.' },
          { text: ' come here to read books or study.' }
        ]
      },
      {
        speaker: 'B',
        text: 'That is wonderful. What is your favorite book?',
        words: []
      },
      {
        speaker: 'A',
        text: 'I am absolutely ',
        words: [
          { text: 'obsessed', highlight: true, id: 'obsessed', translation: 'mukkasidan ketgan, berilib ketgan', pos: 'adjective', definition: 'Unable to stop thinking about something in a way that is extreme.' },
          { text: ' with adventure novels. They spark my ' },
          { text: 'imagination', highlight: true, id: 'imagination', translation: 'tasavvur, xayol', pos: 'noun', definition: 'The faculty or action of forming new ideas, or images or concepts of external objects not present to the senses.' },
          { text: '.' }
        ]
      },
      {
        speaker: 'B',
        text: 'Wow! We have so much in common. I ',
        words: [
          { text: 'adore', highlight: true, id: 'adore', translation: 'yaxshi ko\'rmoq, hurmat qilmoq', pos: 'verb', definition: 'Love and respect someone or something deeply.' },
          { text: ' adventure stories too!' }
        ]
      }
    ]
  },
  {
    id: 'job-interview',
    title: 'The Job Interview',
    difficulty: 'Intermediate',
    difficultyColor: '#6366F1',
    readTime: '3 min',
    icon: '👔',
    description: 'Sarah interviews with Mr. Davies for a software engineer role at a tech startup.',
    characters: {
      A: { name: 'Mr. Davies', avatar: '👴', gender: 'male', pitch: 0.75, rate: 0.9 },
      B: { name: 'Sarah', avatar: '👩', gender: 'female', pitch: 1.1, rate: 1.0 }
    },
    lines: [
      {
        speaker: 'A',
        text: 'Welcome Sarah. Please take a seat. I have reviewed your ',
        words: [
          { text: 'impressive', highlight: true, id: 'impressive', translation: 'ta\'sirli, ajoyib', pos: 'adjective', definition: 'Evoking admiration through size, quality, or skill; grand, imposing, or awesome.' },
          { text: ' resume.' }
        ]
      },
      {
        speaker: 'B',
        text: 'Thank you, Mr. Davies. It is a ',
        words: [
          { text: 'privilege', highlight: true, id: 'privilege', translation: 'imtiyoz, sharaf', pos: 'noun', definition: 'A special right, advantage, or exceptional honor granted to a person.' },
          { text: ' to interview with your company today.' }
        ]
      },
      {
        speaker: 'A',
        text: 'Let\'s start. Can you describe a ',
        words: [
          { text: 'challenging', highlight: true, id: 'challenging', translation: 'qiyin, jiddiy, sinovli', pos: 'adjective', definition: 'Testing one\'s abilities; demanding and stimulating.' },
          { text: ' project you successfully managed?' }
        ]
      },
      {
        speaker: 'B',
        text: 'Certainly. In my previous role, I led a team to ',
        words: [
          { text: 'resolve', highlight: true, id: 'resolve', translation: 'hal qilmoq, tuzatmoq', pos: 'verb', definition: 'Settle or find a solution to a problem, dispute, or contentious matter.' },
          { text: ' a critical database issue under a tight deadline.' }
        ]
      },
      {
        speaker: 'A',
        text: 'Excellent. Problem-solving skills are ',
        words: [
          { text: 'essential', highlight: true, id: 'essential', translation: 'muhim, zaruriy, asosiy', pos: 'adjective', definition: 'Absolutely necessary; extremely important.' },
          { text: ' for this position.' }
        ]
      }
    ]
  }
];

export default function StoryPage() {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const { packs, loading: packsLoading, addPack } = usePacks();
  const [activeTab, setActiveTab] = useState('classic'); // 'classic' or 'intensive'
  
  const activeStory = storyId 
    ? (CLASSIC_STORIES.find(s => s.id === storyId) || INTENSIVE_STORIES.find(s => s.id === storyId))
    : null;

  useEffect(() => {
    if (activeStory) {
      const isClassic = CLASSIC_STORIES.some(s => s.id === activeStory.id);
      setActiveTab(isClassic ? 'classic' : 'intensive');
    }
  }, [activeStory]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [popoverPos, setPopoverPos] = useState({ x: 0, y: 0 });
  const [selectedPackId, setSelectedPackId] = useState('');
  const [showAddToPack, setShowAddToPack] = useState(false);
  const [toast, setToast] = useState(null);
  const [fontSize, setFontSize] = useState(1.05); // rem
  const popoverRef = useRef(null);

  // Intensive Dialogue specific state
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(false);
  const chatEndRef = useRef(null);

  // Hook to handle adding words to a dynamic collectionId
  const [activePackIdForHook, setActivePackIdForHook] = useState(null);
  const { addWord } = useWords('packs', activePackIdForHook || 'dummy');

  useEffect(() => {
    if (packs.length > 0 && !selectedPackId) {
      setSelectedPackId(packs[0].id);
    }
  }, [packs, selectedPackId]);

  // Handle click outside popover to close it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setSelectedWord(null);
        setShowAddToPack(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-scroll to bottom of chat bubbles
  useEffect(() => {
    if (activeTab === 'intensive' && activeStory) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentLineIndex, activeStory, activeTab]);

  // Stop synthesis when leaving story
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeStory]);

  const handleWordClick = (wordObj, e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const popoverWidth = 262;
    const estimatedPopoverHeight = 210;
    const HEADER_HEIGHT = 60; // story header

    let x = rect.left + rect.width / 2 - popoverWidth / 2;
    x = Math.max(8, Math.min(x, window.innerWidth - popoverWidth - 8));

    // Show above word if enough space, otherwise below
    const spaceAbove = rect.top - HEADER_HEIGHT;
    const showAbove = spaceAbove >= estimatedPopoverHeight + 12;
    const y = showAbove ? rect.top - 8 : rect.bottom + 8;

    setPopoverPos({ x, y, showAbove });
    setSelectedWord(wordObj);
    setShowAddToPack(false);
    speakWord(wordObj.id);
  };

  const handleAddToPack = async (targetId) => {
    if (!selectedWord) return;

    let targetPackId = targetId;

    if (!targetPackId) {
      // Default to "Hikoyalarim" pack
      const existingStoryPack = packs.find(p => p.name.toLowerCase() === 'hikoyalarim');
      if (existingStoryPack) {
        targetPackId = existingStoryPack.id;
      } else {
        // Create the "Hikoyalarim" pack automatically
        try {
          const newPackId = await addPack({
            name: 'Hikoyalarim',
            description: 'Hikoyalardan olingan so\'zlar',
            color: 'var(--accent-gradient)',
            icon: '✨',
            level: 'beginner'
          });
          targetPackId = newPackId;
          setSelectedPackId(newPackId);
        } catch (err) {
          showToast('To\'plam yaratib bo\'lmadi');
          return;
        }
      }
    }

    if (!targetPackId) {
      showToast('Iltimos, to\'plam tanlang');
      return;
    }

    try {
      setActivePackIdForHook(targetPackId);
      
      // Delay slightly to allow hook reference state change
      setTimeout(async () => {
        await addWord({
          word: selectedWord.id,
          translation: selectedWord.translation,
          definition: selectedWord.definition || '',
          partOfSpeech: selectedWord.pos || 'noun',
          example: `Used in story: "${selectedWord.id}"`
        });
        showToast(`"${selectedWord.id}" to'plamga qo'shildi! 🚀`);
        setSelectedWord(null);
        setShowAddToPack(false);
      }, 50);

    } catch (err) {
      showToast('So\'z qo\'shishda xatolik yuz berdi');
    }
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  // ─── INTENSIVE PLAYER LOGIC ────────────────────────────────────────────────
  const speakLine = (line) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const charInfo = activeStory.characters[line.speaker];
    
    // Build full text line
    let fullText = line.text;
    if (line.words) {
      fullText = line.text + line.words.map(w => w.text).join('');
    }

    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = 'en-US';
    utterance.pitch = charInfo.pitch || 1.0;
    utterance.rate = charInfo.rate || 0.95;

    // Load available voices
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      let selectedVoice = null;
      if (charInfo.gender === 'female') {
        selectedVoice = voices.find(v => v.lang.startsWith('en') && (
          v.name.toLowerCase().includes('female') || 
          v.name.toLowerCase().includes('zira') || 
          v.name.toLowerCase().includes('samantha') || 
          v.name.toLowerCase().includes('hazel')
        ));
      } else {
        selectedVoice = voices.find(v => v.lang.startsWith('en') && (
          v.name.toLowerCase().includes('male') || 
          v.name.toLowerCase().includes('david') || 
          v.name.toLowerCase().includes('mark') || 
          v.name.toLowerCase().includes('george')
        ));
      }
      
      if (!selectedVoice) {
        selectedVoice = voices.find(v => v.lang.startsWith('en'));
      }
      if (selectedVoice) utterance.voice = selectedVoice;
    }

    utterance.onend = () => {
      // Delay slightly for natural conversational pausing
      if (isPlayingRef.current) {
        setTimeout(() => {
          handleNextLine();
        }, 800);
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleNextLine = () => {
    setCurrentLineIndex((prev) => {
      const next = prev + 1;
      if (next < activeStory.lines.length) {
        speakLine(activeStory.lines[next]);
        return next;
      } else {
        setIsPlaying(false);
        isPlayingRef.current = false;
        return prev;
      }
    });
  };

  const handlePrevLine = () => {
    setCurrentLineIndex((prev) => {
      const next = Math.max(0, prev - 1);
      speakLine(activeStory.lines[next]);
      return next;
    });
  };

  const togglePlay = () => {
    if (!activeStory) return;

    if (isPlaying) {
      setIsPlaying(false);
      isPlayingRef.current = false;
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } else {
      setIsPlaying(true);
      isPlayingRef.current = true;
      
      const nextIndex = currentLineIndex + 1 >= activeStory.lines.length ? 0 : currentLineIndex + 1;
      setCurrentLineIndex(nextIndex);
      speakLine(activeStory.lines[nextIndex]);
    }
  };

  const handleResetIntensive = () => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    setCurrentLineIndex(-1);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className={`story-page-container ${activeStory ? 'story-active-mode' : ''}`}>
      {toast && <div className="story-toast-notification">{toast}</div>}

      <AnimatePresence mode="wait">
        {!activeStory ? (
          /* STORIES LIST VIEW */
          <motion.div
            key="list"
            className="stories-list-wrapper"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            <div className="page-header">
              <div>
                <h1>✨ Hikoyalar (Stories)</h1>
                <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Matndagi so'zlarni bosib tarjimasini bilib oling va kutubxonangizga qo'shing.
                </p>
              </div>
            </div>

            {/* Premium segmented control for active mode switcher */}
            <div className="stories-tabs-wrapper">
              <div className="stories-tabs">
                <button
                  className={`story-tab-btn ${activeTab === 'classic' ? 'active' : ''}`}
                  onClick={() => setActiveTab('classic')}
                >
                  📖 O'qish hikoyalari
                </button>
                <button
                  className={`story-tab-btn ${activeTab === 'intensive' ? 'active' : ''}`}
                  onClick={() => setActiveTab('intensive')}
                >
                  💬 Intensiv suhbatlar
                </button>
              </div>
            </div>

            <div className="stories-grid">
              {(activeTab === 'classic' ? CLASSIC_STORIES : INTENSIVE_STORIES).map((story) => (
                <div
                  key={story.id}
                  className="story-card"
                  onClick={() => {
                    navigate(`/stories/${story.id}`);
                    setSelectedWord(null);
                    if (activeTab === 'intensive') {
                      setCurrentLineIndex(-1);
                      setIsPlaying(false);
                      isPlayingRef.current = false;
                    }
                  }}
                >
                  <div className="story-card-icon">{story.icon}</div>
                  <div className="story-card-content">
                    <div className="story-card-meta">
                      <span className="story-difficulty" style={{ backgroundColor: `${story.difficultyColor}15`, color: story.difficultyColor }}>
                        {story.difficulty}
                      </span>
                      <span className="story-readtime">⏱ {story.readTime}</span>
                    </div>
                    <h3 className="story-card-title">{story.title}</h3>
                    <p className="story-card-desc">{story.description}</p>
                    <button className="story-card-btn">
                      {activeTab === 'classic' ? "O'qishni boshlash →" : "Suhbatni tinglash →"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : activeStory && 'paragraphs' in activeStory ? (
          /* CLASSIC STORY READING VIEW */
          <motion.div
            key="reading-classic"
            className="story-reading-wrapper classic-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Unified Chat-Style Header */}
            <div className="story-chat-header">
              <button
                className="clean-back-arrow"
                onClick={() => {
                  navigate('/stories');
                  setSelectedWord(null);
                }}
                title="Hikoyalarga qaytish"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
              </button>
              <div className="story-header-info">
                <div className="story-header-title">{activeStory.title}</div>
                <div className="story-header-status">
                  📖 {activeStory.difficulty} • {activeStory.readTime}
                </div>
              </div>
              <div className="font-controls">
                <button className="font-control-btn" onClick={() => setFontSize(prev => Math.max(0.85, prev - 0.1))} title="Shriftni kichraytirish">—</button>
                <button className="font-control-btn" onClick={() => setFontSize(prev => Math.min(1.5, prev + 0.1))} title="Shriftni kattalashtirish">+</button>
              </div>
            </div>

            <div className="story-text-container" style={{ fontSize: `${fontSize}rem` }}>
              {activeStory.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="story-paragraph">
                  {p.map((segment, sIdx) => {
                    if (segment.highlight) {
                      const isActive = selectedWord && selectedWord.id === segment.id;
                      return (
                        <span key={sIdx} className="story-word-span-wrapper">
                          <button
                            className={`story-highlight-word ${selectedWord?.id === segment.id ? 'active' : ''}`}
                            onClick={(e) => handleWordClick(segment, e)}
                          >
                            {segment.text}
                          </button>
                        </span>
                      );
                    }
                    return <span key={sIdx}>{segment.text}</span>;
                  })}
                </p>
              ))}
            </div>

            <div className="story-classic-footer">
              <span className="story-classic-progress">Matnni to'liq o'qib chiqing</span>
              <button className="btn btn-primary compact" onClick={() => { navigate('/stories'); setSelectedWord(null); }}>Tugatish</button>
            </div>
          </motion.div>
        ) : (
          /* INTENSIVE DIALOGUE SCREEN */
          <motion.div
            key="reading-intensive"
            className="story-reading-wrapper intensive-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Unified Chat Header */}
            <div className="story-chat-header">
              <button
                className="clean-back-arrow"
                onClick={() => {
                  navigate('/stories');
                  setSelectedWord(null);
                  handleResetIntensive();
                }}
                title="Hikoyalarga qaytish"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
              </button>

              {activeStory.characters && (
                <div className="story-header-avatar-collage">
                  {Object.values(activeStory.characters).map((c, i) => (
                    <div key={i} className={`collage-avatar avatar-${i}`}>{c.avatar}</div>
                  ))}
                </div>
              )}

              <div className="story-header-info">
                <div className="story-header-title">{activeStory.title}</div>
                <div className="story-header-status">
                  {isPlaying ? (
                    <span className="chat-online-pulse">Suhbat ijro etilmoqda...</span>
                  ) : (
                    "Suhbat muloqoti"
                  )}
                </div>
              </div>

              <button className="btn-reset-intensive" onClick={handleResetIntensive} title="Suhbatni boshidan boshlash">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
              </button>
            </div>

            {/* Chat bubble screen area */}
            <div className="story-chat-container">
              {activeStory.lines.map((line, idx) => {
                const isSpeakerA = line.speaker === 'A';
                const charInfo = activeStory.characters[line.speaker];
                const isVisible = idx <= currentLineIndex;
                const isCurrentlySpeaking = idx === currentLineIndex && isPlaying;

                if (!isVisible) return null;

                return (
                  <motion.div
                    key={idx}
                    className={`chat-bubble-row ${isSpeakerA ? 'speaker-a' : 'speaker-b'} ${isCurrentlySpeaking ? 'speaking' : ''}`}
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="chat-avatar">{charInfo.avatar}</div>
                    <div className="chat-bubble-content">
                      <div className="chat-sender-name">{charInfo.name}</div>
                      <div className="chat-bubble">
                        <span>{line.text}</span>
                        {line.words && line.words.map((segment, sIdx) => {
                          if (segment.highlight) {
                            const isActive = selectedWord && selectedWord.id === segment.id;
                            return (
                              <span key={sIdx} className="story-word-span-wrapper">
                                <button
                                  className={`story-highlight-word ${selectedWord?.id === segment.id ? 'active' : ''}`}
                                  onClick={(e) => handleWordClick(segment, e)}
                                >
                                  {segment.text}
                                </button>
                              </span>
                            );
                          }
                          return <span key={sIdx}>{segment.text}</span>;
                        })}

                        {isCurrentlySpeaking && (
                          <div className="speaking-wave">
                            <span className="wave-bar"></span>
                            <span className="wave-bar"></span>
                            <span className="wave-bar"></span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              {currentLineIndex === -1 && (
                <div className="chat-intro-placeholder">
                  <p>Suhbatni eshitish uchun pastdagi tugmani bosing. Qahramonlar ovozli ohang bilan muloqot qiladilar.</p>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Integrated Chat-Style Input/Player Bar */}
            <div className="story-chat-input-bar">
              <button 
                className="chat-control-btn prev-btn" 
                onClick={handlePrevLine} 
                disabled={currentLineIndex <= 0}
                title="Oldingi gap"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                </svg>
              </button>
              
              <div className="chat-input-mock">
                <div className="chat-input-status-dot-wrapper">
                  <span className={`chat-input-status-dot ${isPlaying ? 'playing' : ''}`}></span>
                </div>
                <div className="chat-input-text">
                  {currentLineIndex === -1 ? (
                    <span className="chat-input-placeholder">Muloqotni boshlash...</span>
                  ) : (
                    <span className="chat-input-val">
                      {activeStory.lines[currentLineIndex].text}
                      {activeStory.lines[currentLineIndex].words?.map(w => w.text).join('')}
                    </span>
                  )}
                </div>
                <button 
                  className={`chat-input-send-btn ${isPlaying ? 'playing' : ''}`}
                  onClick={togglePlay}
                  title={isPlaying ? "Pauza" : "Ijro etish"}
                >
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>
              </div>

              <button 
                className="chat-control-btn next-btn" 
                onClick={handleNextLine} 
                disabled={currentLineIndex >= activeStory.lines.length - 1}
                title="Keyingi gap"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M16 6h2v12h-2zm-10.5 12l8.5-6-8.5-6z"/>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global fixed popover — rendered outside scroll containers to prevent clipping */}
      {selectedWord && (
        <div
          className="story-word-popover story-word-popover--fixed"
          ref={popoverRef}
          style={{
            position: 'fixed',
            left: popoverPos.x,
            top: popoverPos.y,
            transform: popoverPos.showAbove ? 'translateY(-100%)' : 'translateY(0)',
            zIndex: 99999,
          }}
          onClick={e => e.stopPropagation()}
        >
          <div className="popover-header-row">
            <span className="popover-word">{selectedWord.id}</span>
            <span className="popover-pos">[{selectedWord.pos}]</span>
            <button className="popover-speak-btn" onClick={(e) => { e.stopPropagation(); speakWord(selectedWord.id); }} title="Talaffuz">🔊</button>
          </div>
          <div className="popover-translation"><strong>Tarjimasi:</strong> {selectedWord.translation}</div>
          {selectedWord.definition && <div className="popover-definition"><em>{selectedWord.definition}</em></div>}
          <div className="popover-actions">
            {!showAddToPack ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button className="popover-add-btn" onClick={(e) => { e.stopPropagation(); handleAddToPack(); }}>➕ "Hikoyalarim"ga qo'shish</button>
                <button className="popover-secondary-btn" onClick={(e) => { e.stopPropagation(); setShowAddToPack(true); }}>Boshqa to'plamni tanlash</button>
              </div>
            ) : (
              <div className="popover-pack-selector-row" onClick={e => e.stopPropagation()}>
                <select className="popover-select" value={selectedPackId} onChange={(e) => setSelectedPackId(e.target.value)}>
                  {packs.map(pack => <option key={pack.id} value={pack.id}>{pack.icon} {pack.name}</option>)}
                </select>
                <button className="popover-confirm-btn" onClick={() => handleAddToPack(selectedPackId)}>Qo'shish</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
