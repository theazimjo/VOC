import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  BookOpen, Repeat, CalendarDays, TrendingUp, CheckCircle2,
  Users, ClipboardList, LineChart, ArrowRight, Menu, X,
} from 'lucide-react';
import { useState } from 'react';
import VocLogo from '../../components/common/VocLogo';
import bgVideo from '../../assets/VOCABRY.mp4';
import './LandingPage.css';

// Extends the existing iOS-liquid-glass dark system from LoginPage.css
// (off-black background, #0a84ff accent, backdrop-blur cards) rather than
// introducing a separate visual language for the one page a visitor sees
// before they ever reach that login screen.

const heroWords = [
  { word: 'achieve', translation: 'erishmoq', mastery: 88 },
  { word: 'consistent', translation: 'izchil', mastery: 64 },
  { word: 'fluent', translation: 'ravon', mastery: 45 },
];

const features = [
  {
    icon: TrendingUp,
    title: 'Spaced repetition',
    body: "Words resurface right before you'd forget them, not on a fixed daily list.",
    size: 'lg',
  },
  {
    icon: BookOpen,
    title: 'Grammar practice',
    body: 'Structured lessons and exercises from beginner rules to native-level nuance.',
    size: 'sm',
  },
  {
    icon: Repeat,
    title: 'Mixed practice modes',
    body: "Flashcards, quizzes, and recall drills that target whatever you're weakest on.",
    size: 'sm',
  },
  {
    icon: CalendarDays,
    title: 'Progress tracking',
    body: 'A daily activity calendar shows exactly where your streak stands.',
    size: 'sm',
  },
];

const steps = [
  { icon: BookOpen, label: 'Learn', body: 'Add words from grammar lessons or your own list.' },
  { icon: Repeat, label: 'Review', body: "Practice resurfaces each word right when you're about to forget it." },
  { icon: CheckCircle2, label: 'Master', body: "Track mastery per word until it's permanent." },
];

const roster = [
  { name: 'Max', color: '#0A84FF', progress: 82 },
  { name: 'Chloe', color: '#30D158', progress: 67 },
  { name: 'Sarah', color: '#AF52DE', progress: 91 },
];

const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

function Reveal({ children, className, delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={revealVariants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

function MasteryRing({ percent, color = '#0a84ff' }) {
  return (
    <div
      className="lp-mastery-ring"
      style={{ background: `conic-gradient(${color} ${percent * 3.6}deg, rgba(255,255,255,0.12) 0deg)` }}
    >
      <span>{percent}%</span>
    </div>
  );
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <div className="lp-page">
      <div className="lp-bg">
        <video className="lp-bg-video" autoPlay muted loop playsInline src={bgVideo} />
        <div className="lp-bg-overlay" />
      </div>

      <header className="lp-nav">
        <VocLogo size="sm" />
        <nav className={`lp-nav-links ${menuOpen ? 'lp-nav-links--open' : ''}`}>
          <a href="#features" onClick={scrollTo('features')}>Features</a>
          <a href="#solutions" onClick={scrollTo('solutions')}>Solutions</a>
          <Link to="/login" className="lp-nav-login" onClick={() => setMenuOpen(false)}>Log in</Link>
          <Link to="/register" className="lp-btn lp-btn--sm" onClick={() => setMenuOpen(false)}>Get Started</Link>
        </nav>
        <button
          type="button"
          className="lp-nav-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <main className="lp-main">
        {/* ---------- Hero ---------- */}
        <section className="lp-hero">
          <motion.div
            className="lp-hero-copy"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1>Learn vocabulary that actually stays with you.</h1>
            <p className="lp-hero-sub">
              Spaced repetition, grammar drills, and progress tracking built around
              how memory really works.
            </p>
            <div className="lp-hero-ctas">
              <Link to="/register" className="lp-btn">
                Get Started <ArrowRight size={16} strokeWidth={2.4} />
              </Link>
              <a href="#features" onClick={scrollTo('features')} className="lp-btn lp-btn--ghost">
                See how it works
              </a>
            </div>
          </motion.div>

          <motion.div
            className="lp-hero-visual"
            initial={reduce ? false : { opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="lp-word-stack">
              {heroWords.map((w, i) => (
                <div className={`lp-word-card lp-word-card--${i}`} key={w.word}>
                  <div className="lp-word-card-text">
                    <span className="lp-word-card-word">{w.word}</span>
                    <span className="lp-word-card-translation">{w.translation}</span>
                  </div>
                  <MasteryRing percent={w.mastery} />
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ---------- Features bento ---------- */}
        <section className="lp-section" id="features">
          <Reveal className="lp-section-head">
            <h2>Everything you need to actually remember it.</h2>
          </Reveal>

          <div className="lp-bento">
            {features.map((f, i) => (
              <Reveal
                key={f.title}
                delay={i * 0.06}
                className={`lp-bento-cell lp-bento-cell--${f.size}`}
              >
                <f.icon size={22} strokeWidth={2} className="lp-bento-icon" />
                <h3>{f.title}</h3>
                <p>{f.body}</p>
                {f.size === 'lg' && (
                  <svg className="lp-sparkline" viewBox="0 0 200 60" preserveAspectRatio="none">
                    <polyline
                      points="0,50 30,42 60,44 90,26 120,30 150,12 180,16 200,4"
                      fill="none"
                      stroke="#0a84ff"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {f.title === 'Progress tracking' && (
                  <div className="lp-heatmap">
                    {Array.from({ length: 21 }).map((_, idx) => (
                      <span key={idx} style={{ opacity: 0.15 + ((idx * 37) % 10) / 11 }} />
                    ))}
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------- How it works ---------- */}
        <section className="lp-section lp-steps-section">
          <Reveal className="lp-section-head">
            <h2>Three habits, one system.</h2>
          </Reveal>

          <div className="lp-steps">
            {steps.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="lp-step">
                <div className="lp-step-icon"><s.icon size={20} strokeWidth={2.2} /></div>
                <div className="lp-step-text">
                  <h3>{s.label}</h3>
                  <p>{s.body}</p>
                </div>
                {i < steps.length - 1 && <div className="lp-step-line" />}
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------- For teachers / learning centers ---------- */}
        <section className="lp-section lp-solutions" id="solutions">
          <Reveal className="lp-solutions-copy">
            <h2>Built for classrooms too.</h2>
            <p>
              Independent tutors and learning centers can run groups, assign
              homework, and watch every student's progress in one place.
            </p>
            <Link to="/register" className="lp-btn">
              Get Started <ArrowRight size={16} strokeWidth={2.4} />
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="lp-roster-card">
            <div className="lp-roster-head">
              <Users size={16} strokeWidth={2.2} />
              <span>Advanced B2 &middot; 12 students</span>
            </div>
            {roster.map((s) => (
              <div className="lp-roster-row" key={s.name}>
                <span className="lp-roster-dot" style={{ background: s.color }} />
                <span className="lp-roster-name">{s.name}</span>
                <div className="lp-roster-bar">
                  <div className="lp-roster-bar-fill" style={{ width: `${s.progress}%` }} />
                </div>
              </div>
            ))}
            <div className="lp-roster-foot">
              <ClipboardList size={14} strokeWidth={2.2} />
              <span>3 homework sets assigned this week</span>
            </div>
          </Reveal>
        </section>

        {/* ---------- CTA banner ---------- */}
        <section className="lp-cta">
          <Reveal className="lp-cta-inner">
            <LineChart size={28} strokeWidth={1.8} className="lp-cta-icon" />
            <h2>Start learning today.</h2>
            <p>Free to get started.</p>
            <Link to="/register" className="lp-btn lp-btn--lg">
              Get Started <ArrowRight size={18} strokeWidth={2.4} />
            </Link>
          </Reveal>
        </section>
      </main>

      <footer className="lp-footer">
        <VocLogo size="sm" />
        <div className="lp-footer-links">
          <Link to="/login">Log in</Link>
          <Link to="/register">Get Started</Link>
        </div>
        <span className="lp-footer-copy">&copy; {new Date().getFullYear()} VOCABRY</span>
      </footer>
    </div>
  );
}
