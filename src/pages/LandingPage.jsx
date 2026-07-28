import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Sparkles,
  Zap,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Layers,
  BarChart3,
  ChevronRight,
  Star,
  Check,
  X,
  Volume2,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './LandingPage.css';

// ─── Live Simulator for Hero (Hidden on Mobile via CSS) ──────────────────────
function HeroSimulator() {
  const [step, setStep] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [stability, setStability] = useState(5.4);
  const [lastAction, setLastAction] = useState(null);

  const demoWords = [
    { word: 'Meticulous', phonetic: '/məˈtɪkjələs/', translation: 'Har bir detalga nihoyatda sinchiklovchi', level: 'C1' },
    { word: 'Eloquent', phonetic: '/ˈeləkwənt/', translation: 'Notiq, fikrini ravon va go\'zal bayon etuvchi', level: 'C1' },
    { word: 'Resilient', phonetic: '/rɪˈzɪliənt/', translation: 'Qiyinchiliklarga va buhronlarga moslashuvchan', level: 'B2' },
  ];

  const currentWord = demoWords[step % demoWords.length];

  const handleAction = (isCorrect) => {
    setLastAction(isCorrect);
    setFlipped(true);
    if (isCorrect) {
      setStability(s => Math.min(30, Math.round((s * 1.5) * 10) / 10));
    } else {
      setStability(s => Math.max(1.0, Math.round((s * 0.5) * 10) / 10));
    }
  };

  const handleNext = () => {
    setFlipped(false);
    setLastAction(null);
    setStep(s => s + 1);
  };

  const pathD = useMemo(() => {
    const width = 300;
    const height = 75;
    const pts = [];
    for (let i = 0; i <= 30; i++) {
      const t = (i / 30) * 30;
      const p = Math.exp(-t / stability);
      const x = (t / 30) * width;
      const y = height - p * height;
      pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return pts.join(' ');
  }, [stability]);

  return (
    <div className="landing-hero-widget">
      <div className="widget-header">
        <div className="widget-engine-tag">
          <span className="widget-pulse-dot" />
          <span>VOC AI MEMORY ENGINE</span>
        </div>
        <div className="widget-stability-badge">
          <Brain size={14} />
          <span>S = {stability}d</span>
        </div>
      </div>

      <div className="widget-card-body">
        <div className="widget-card-meta">
          <span className="widget-level-tag">{currentWord.level}</span>
          <span className="widget-phonetic"><Volume2 size={13} /> {currentWord.phonetic}</span>
        </div>

        <div className="widget-word">{currentWord.word}</div>

        <AnimatePresence mode="wait">
          {flipped ? (
            <motion.div
              key="translation"
              className="widget-translation"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {currentWord.translation}
            </motion.div>
          ) : (
            <div key="placeholder" className="widget-placeholder">
              <span>Ma'nosini ko'rish uchun bosing</span>
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="widget-actions">
        {!flipped ? (
          <button className="widget-btn-reveal" onClick={() => setFlipped(true)}>
            Tarjimasini ko'rish
          </button>
        ) : lastAction === null ? (
          <div className="widget-btn-group">
            <button className="widget-btn-fail" onClick={() => handleAction(false)}>
              <XCircle size={16} /> Unutdim (-50% S)
            </button>
            <button className="widget-btn-success" onClick={() => handleAction(true)}>
              <CheckCircle2 size={16} /> Esladim (+50% S)
            </button>
          </div>
        ) : (
          <button className="widget-btn-next" onClick={handleNext}>
            Keyingi so'zga o'tish <ArrowRight size={16} />
          </button>
        )}
      </div>

      <div className="widget-graph-container">
        <div className="widget-graph-info">
          <span>Unutish egri chizig'i dinamikasi</span>
          <span className="widget-optimal-lbl">Optimal takrorlash: ~{Math.round(stability * 0.75)} kundan keyin</span>
        </div>
        <div className="widget-svg-wrap">
          <svg viewBox="0 0 300 75" width="100%" height={60} style={{ overflow: 'visible' }}>
            <path d={pathD} fill="none" stroke="var(--accent-1)" strokeWidth={2.5} strokeLinecap="round" />
            <line x1={0} y1={18.75} x2={300} y2={18.75} stroke="#34d399" strokeWidth={1} strokeDasharray="3 3" opacity={0.6} />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── FAQ Accordion Item ───────────────────────────────────────────────────────
function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`landing-faq-item ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
      <div className="landing-faq-question">
        <span>{question}</span>
        <ChevronDown size={18} className={`landing-faq-arrow ${open ? 'rotated' : ''}`} />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="landing-faq-answer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Landing Page Component ─────────────────────────────────────────────
export default function LandingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('voc'); // 'voc' | 'anki' | 'duo'

  const tableRows = [
    {
      feature: 'Individual Unutish Egri Chizig\'i (P = e⁻ᵗ/ˢ)',
      vocFull: 'Aniq hisoblanadi (Shaxsiy S)',
      anki: 'Bir xil formulada qotgan',
      duo: 'Umuman yo\'q',
    },
    {
      feature: 'Semantik & Kontekstual Transfer (S₀ Bonus)',
      vocFull: 'Avtomatik mavzuli bonuslar',
      anki: 'Har bir so\'z alohida',
      duo: 'Yo\'q',
    },
    {
      feature: 'Cheksiz Aqlli Yodlash Navbati (Smart Queue)',
      vocFull: 'Uzluksiz aqlli navbat',
      anki: 'Kunlik limitda to\'xtaydi',
      duo: 'Cheklangan',
    },
    {
      feature: '30 Kunlik Unutish Grafiklari',
      vocFull: 'Real-vaqt SVG grafik',
      anki: 'Murakkab jadval',
      duo: 'Yo\'q',
    },
    {
      feature: 'Javob Tezligi va Ishonch Tahlili',
      vocFull: 'Mikro-soniya o\'lchovi',
      vocMob: 'Tezlik AI',
      anki: 'Faqat 4 ta tugma',
      duo: 'Yo\'q',
    },
  ];

  return (
    <div className="landing-root">
      {/* Background ambient glows */}
      <div className="landing-ambient-glow glow-1" />
      <div className="landing-ambient-glow glow-2" />

      {/* Navigation */}
      <nav className="landing-navbar">
        <div className="landing-nav-container">
          <div className="landing-brand" onClick={() => navigate('/')}>
            <div className="landing-brand-icon">
              <GraduationCap size={24} strokeWidth={2.4} />
            </div>
            <span className="landing-brand-name">VOC</span>
            <span className="landing-brand-tag">MEMORY LAB</span>
          </div>

          <div className="landing-nav-right">
            {user ? (
              <Link to="/" className="landing-nav-btn-main">
                Dashboard <ArrowRight size={16} />
              </Link>
            ) : (
              <>
                <Link to="/login" className="landing-nav-link">Kirish</Link>
                <Link to="/register" className="landing-nav-btn-main">
                  Boshlash <ChevronRight size={16} />
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero-section">
        <div className="landing-hero-container">
          <div className="landing-hero-left">
            <div className="landing-hero-badge">
              <Sparkles size={14} />
              Individual Memory Dynamics & Context-Aware AI
            </div>

            <h1 className="landing-main-title">
              Har Bir So'zni O'z Miyangizning <span className="landing-gradient-span">Xotira Tezligiga</span> Moslab Yodlang
            </h1>

            <p className="landing-main-desc">
              An'anaviy eskirgan (Anki / SM-2) dasturlardan farqli o'laroq, VOC har bir so'z bo'yicha sizning shaxsiy unutish egri chizig'ingiz va semantik klasterlaringizni o'rganib boradi.
            </p>

            <div className="landing-hero-buttons">
              {user ? (
                <Link to="/experiment" className="landing-hero-btn-primary">
                  <Brain size={20} /> Memory Lab'ni Ishga Tushirish
                </Link>
              ) : (
                <>
                  <Link to="/register" className="landing-hero-btn-primary">
                    Hoziroq Bepul Boshlang <ArrowRight size={18} />
                  </Link>
                  <Link to="/login" className="landing-hero-btn-secondary">
                    Tizimga Kirish
                  </Link>
                </>
              )}
            </div>

            <div className="landing-hero-proof">
              <div className="landing-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <span>100% Shaxsiy AI · Ebbinghaus Forgetting Model · Context Transfer</span>
            </div>
          </div>

          <div className="landing-hero-right">
            <HeroSimulator />
          </div>
        </div>
      </section>

      {/* Comparison Section (Desktop Table + Mobile Interactive Tab Switcher) */}
      <section className="landing-comparison-section">
        <div className="landing-container">
          <div className="landing-heading-center">
            <span className="landing-sub-tag">TAQQOSLASH</span>
            <h2>Nima uchun VOC boshqa dasturlardan mutlaqo farq qiladi?</h2>
            <p>An'anaviy SM-2 algoritmi (Anki) va VOC Memory Lab o'rtasidagi farq</p>
          </div>

          {/* Desktop Table View */}
          <div className="landing-desktop-table-wrap">
            <div className="landing-table-card">
              <table className="landing-table">
                <thead>
                  <tr>
                    <th className="col-feat">Xususiyat</th>
                    <th className="col-voc">VOC 🧪</th>
                    <th className="col-anki">Anki</th>
                    <th className="col-duo">Duolingo</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, idx) => (
                    <tr key={idx}>
                      <td className="col-feat">
                        <div className="feat-title">{row.feature}</div>
                      </td>
                      <td className="col-voc">
                        <span className="badge-voc">
                          <Check size={14} /> <span>{row.vocFull}</span>
                        </span>
                      </td>
                      <td className="col-anki">
                        <span className="badge-other">
                          <X size={14} /> <span>{row.anki}</span>
                        </span>
                      </td>
                      <td className="col-duo">
                        <span className="badge-other">
                          <X size={14} /> <span>{row.duo}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Interactive Tab Switcher View */}
          <div className="landing-mobile-tab-view">
            <div className="m-tab-switcher">
              <button
                className={`m-tab-btn ${activeTab === 'voc' ? 'active' : ''}`}
                onClick={() => setActiveTab('voc')}
              >
                🧪 VOC Lab
              </button>
              <button
                className={`m-tab-btn ${activeTab === 'anki' ? 'active' : ''}`}
                onClick={() => setActiveTab('anki')}
              >
                Anki (SM-2)
              </button>
              <button
                className={`m-tab-btn ${activeTab === 'duo' ? 'active' : ''}`}
                onClick={() => setActiveTab('duo')}
              >
                Duolingo
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'voc' && (
                <motion.div
                  key="voc-card"
                  className="m-tab-card m-voc-card"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="m-tab-card-header">
                    <div className="m-tab-badge">🏆 1-O'RIN — EKSPERIMENTAL AI</div>
                    <h3>VOC Memory Lab</h3>
                    <p>Har bir so'z uchun shaxsiy unutish egri chizig'ingizni o'rganadi</p>
                  </div>

                  <div className="m-tab-list">
                    {tableRows.map((row, idx) => (
                      <div key={idx} className="m-tab-item">
                        <div className="m-item-title">{row.feature}</div>
                        <div className="m-item-val voc-val">
                          <Check size={14} /> {row.vocFull}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'anki' && (
                <motion.div
                  key="anki-card"
                  className="m-tab-card m-other-card"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="m-tab-card-header">
                    <div className="m-tab-badge legacy">ESKIRGAN ALGORITM</div>
                    <h3>Anki (SM-2)</h3>
                    <p>Barcha foydalanuvchilar va so'zlar uchun bir xil qotgan vaqt oralig'i</p>
                  </div>

                  <div className="m-tab-list">
                    {tableRows.map((row, idx) => (
                      <div key={idx} className="m-tab-item">
                        <div className="m-item-title">{row.feature}</div>
                        <div className="m-item-val other-val">
                          <X size={14} /> {row.anki}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'duo' && (
                <motion.div
                  key="duo-card"
                  className="m-tab-card m-other-card"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="m-tab-card-header">
                    <div className="m-tab-badge legacy">UNUTISH EGRI CHIZIG'I YO'Q</div>
                    <h3>Duolingo</h3>
                    <p>Faqat o'yinlashtirilgan takrorlash, shaxsiy xotira dinamikasi o'lchanmaydi</p>
                  </div>

                  <div className="m-tab-list">
                    {tableRows.map((row, idx) => (
                      <div key={idx} className="m-tab-item">
                        <div className="m-item-title">{row.feature}</div>
                        <div className="m-item-val other-val">
                          <X size={14} /> {row.duo}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="landing-features-section">
        <div className="landing-container">
          <div className="landing-heading-center">
            <span className="landing-sub-tag">TEXNOLOGIYA</span>
            <h2>Xotirangizni Maksimal Mustahkamlovchi 4 Ustun</h2>
          </div>

          <div className="landing-grid-4">
            <div className="landing-card-3d">
              <div className="landing-card-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
                <Brain size={26} />
              </div>
              <h3>Individual Memory Dynamics</h3>
              <p>Har bir so'z uchun uning shaxsiy barqarorlik ko'rsatkichi (S) va esda qolish darajasi (P) o'lchanadi.</p>
            </div>

            <div className="landing-card-3d">
              <div className="landing-card-icon" style={{ background: 'rgba(52, 211, 153, 0.15)', color: '#34d399' }}>
                <Zap size={26} />
              </div>
              <h3>Context-Aware AI Transfer</h3>
              <p>Fe'llar, Hayvonlar yoki IT so'zlarida tajribangiz oshgach, o'sha mavzudagi yangi so'zlarga boshlang'ich bonus beriladi.</p>
            </div>

            <div className="landing-card-3d">
              <div className="landing-card-icon" style={{ background: 'rgba(251, 191, 36, 0.15)', color: '#fbbf24' }}>
                <Layers size={26} />
              </div>
              <h3>Dynamic Smart Queue</h3>
              <p>Mashqni boshlaganingizda, unutilish arafasidagi va eng muhim so'zlar avtomatik navbatning boshiga chiqadi.</p>
            </div>

            <div className="landing-card-3d">
              <div className="landing-card-icon" style={{ background: 'rgba(248, 113, 113, 0.15)', color: '#f87171' }}>
                <BarChart3 size={26} />
              </div>
              <h3>30 Kunlik Unutish Grafiklari</h3>
              <p>Insights bo'limida har bir so'zingiz va umumiy xotirangizning real-vaqt rejimida chiziladigan egri chizig'i.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section className="landing-faq-section">
        <div className="landing-container">
          <div className="landing-heading-center">
            <span className="landing-sub-tag">SAVOL-JAVOBLAR</span>
            <h2>Tez-tez beriladigan savollar</h2>
          </div>

          <div className="landing-faq-list">
            <FaqItem
              question="Ebbinghaus unutish egri chizig'i algoritmi nima?"
              answer="Nemis ruhiyatshunosi Hermann Ebbinghaus inson miyasi yangi axborotni vaqt o'tishi bilan exponensial tarzda ko'rinishda unutishini (P = e⁻ᵗ/ˢ) isbotlagan. VOC ushbu matematik modelni har bir so'zingiz va shaxsiy javob berish tezligingizga avtomatik moslashtiradi."
            />
            <FaqItem
              question="Lug'atdagi so'zlar tugab qolsa, mashq to'xtaydimi?"
              answer="Yo'q! VOC doimiy Yodlash Navbatiga ega. Barcha so'zlar takrorlab bo'linganda ham, tizim ularning nisbiy eslab qolish ehtimolini solishtirib, eng ko'p e'tibor talab qiluvchi so'zlardan boshlab uzluksiz berib ketaveradi."
            />
            <FaqItem
              question="Semantik Klaster (Context-Aware Transfer) qanday foyda beradi?"
              answer="Agar siz muayyan bir guruhdagi (masalan, Hayvonlar yoki Fe'llar) so'zlarni a'lo darajada o'rgansangiz, tizim shu guruhdagi yangi qo'shilgan so'zlarga boshlang'ich barqarorlik (S₀) bonusi beradi. Natijada siz 2-3 baravar kamroq takrorlash bilan tezroq o'rganasiz."
            />
            <FaqItem
              question="Tizimdan foydalanish bepulmi?"
              answer="Ha, VOC Memory Lab barcha foydalanuvchilar uchun mutlaqo bepul va ochiq."
            />
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="landing-cta-banner">
        <div className="landing-cta-box">
          <h2>Xotirangiz Sinovini Bugun Boshlang</h2>
          <p>O'z miyangizning unutish egri chizig'ini o'rganing va so'zlarni 3 barobar tezroq yodlang.</p>
          <div className="landing-cta-box-btns">
            {user ? (
              <Link to="/experiment" className="landing-hero-btn-primary">
                Memory Lab'ga o'tish 🚀
              </Link>
            ) : (
              <Link to="/register" className="landing-hero-btn-primary">
                Bepul Ro'yxatdan O'tish <ArrowRight size={18} />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-container landing-footer-flex">
          <div className="landing-brand">
            <GraduationCap size={20} />
            <span className="landing-brand-name">VOC</span>
          </div>
          <p>© 2026 VOC — Individual Memory Lab. Barcha huquqlar himoyalangan.</p>
          <div className="landing-footer-links">
            <Link to="/login">Kirish</Link>
            <Link to="/register">Ro'yxatdan o'tish</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
