# ⚡ VOC — Adaptive Vocabulary, Grammar & IELTS Mastery Platform

> **VOC** is a full-featured, intelligent language learning platform engineered for English learners. Powered by an adaptive cognitive memory model, VOC elevates vocabulary acquisition, solidifies English grammar, and prepares learners for high-stakes exams like IELTS. Built with React 19, Tailwind CSS v4, and Firebase, VOC runs seamlessly as a Progressive Web App (PWA) and as a native Android application via Capacitor.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Realtime_DB_%26_Auth-FFCA28?logo=firebase&logoColor=black)
![Capacitor](https://img.shields.io/badge/Capacitor-Android-119EFF?logo=capacitor&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-Tested-6E9F18?logo=vitest&logoColor=white)

---

### 📊 Live Usage Metrics
* **40+ Active Learners**
* **2,600+ Mastered Words**

---

## 🧠 Why VOC is Different: The Memory Engine

Traditional spaced repetition systems (SRS) like SuperMemo SM-2 or standard Leitner boxes rely on fixed mathematical intervals. VOC features an in-house cognitive retention architecture called the **Individual Memory Dynamics Engine** (`src/utils/memoryEngine.js`).

At its core, memory retention probability $P(t)$ after $t$ days is modeled as:

$$P(t) = e^{-\frac{t}{S}}$$

Where **$S$** represents individual **Memory Stability**, dynamically computed and updated per user, per word.

```
       Memory Retention Curve over Time
  100% | *
       |   *
   P(t)|     *  <- Standard Decay
       |       * . . . . . . . -> Extended Stability (S) after active review
    0% +---------------------------------> Time (t in days)
```

### Key Dynamics & Multi-Factor Inputs:
* **Response Latency Tuning**: Rapid answers signal high implicit confidence, dynamically boosting stability.
* **Retrieval Effect Calibration**: Active recall (typing/spelling) provides significantly higher memory consolidation than passive self-assessment.
* **Overnight Sleep Consolidation**: Applies a cognitive stabilization bonus when reviews span across sleep cycles.
* **Semantic Cluster Self-Calibration**: Automatically groups vocabulary into semantic domains (e.g., technology, emotions, verbs) and adjusts stability predictions based on topical accuracy trends.

> *"Duolingo tells you what to study. Anki tells you when to review. VOC learns how your brain retains and forgets."*

---

## 🗺️ Memory Twin — Product Roadmap & Research State

VOC's long-term vision is to evolve from a spaced-repetition algorithm into a user's **Memory Twin** — a digital counterpart of their cognitive retention profile that understands *why* a word was forgotten, *which terms* trigger confusion, and *which learning modalities* yield optimal results.

### 🟢 Production (Active in App)

| Component | Architecture / File Location | Description |
| :--- | :--- | :--- |
| **Individual Memory Dynamics Engine** | `memoryEngine.js` (`updateStability`, `computeRecallProbability`) | $P(t) = e^{-t/S}$ retention decay modeling with per-user $\times$ per-word stability scores. |
| **Future Memory Simulator** | `memoryEngine.js` $\rightarrow$ `MemoryInsights.jsx` | Interactive forecasting comparing retention projections over 30 days under different review schedules (0, 1, 3, 7, 14 days). |
| **Forgetting Autopsy** | `forgettingAutopsy.js` $\rightarrow$ `MemoryInsights.jsx` | Diagnostic engine that analyzes decay signals (interval, latency, confusions) upon recall failure and suggests optimal remedial practice types. |
| **Confusion Network** | `textSimilarity.js` + `reportConfusion` $\rightarrow$ `MemoryInsights.jsx` | Phonetic and orthographic similarity matching that identifies paired words prone to mutual confusion during spelling and practice modes. |
| **Semantic Clustering** | `semanticClassifier.js` + `computeClusterCalibration` | Automated taxonomy grouping with dynamic cluster-level accuracy calibration. |
| **Scheduling Transparency** | `explainSchedulingDecision` | Plain-English explanations detailing *why* specific words are scheduled for review at any moment. |
| **Retrieval Type Weighting** | `applyReview` (`retrievalType`) | Differentiates active retrieval (typing) vs. passive recognition for calibrated stability gains. |

### 🟡 Near-Term Pipeline (Infrastructure Ready)

| Feature | Gap / Next Step | Effort & Feasibility |
| :--- | :--- | :--- |
| **Automated Intervention Engine** | Connect Forgetting Autopsy diagnostics directly to active game mode routing. | **Low**: Practice modes exist; requires navigation link binding. |
| **Cross-Mode Confusion Detection** | Expand spelling confusion detection across Quiz, Flashcards, and Sentence Builder modes. | **Low**: Uses shared `findConfusableMatch` utility across remaining game engines. |

### 🔮 Future Research (Long-Term Exploration)

| Feature | Objective | Requirements |
| :--- | :--- | :--- |
| **Memory Fingerprint** | Modality-specific retention profiling (Visual vs. Auditory vs. Contextual). | Requires fine-grained modality tracking across all game types. |
| **Linguistic Memory Genome** | Native language interference research (L1 transfer error patterns). | Requires longitudinal datasets and linguistic corpus analysis. |
| **Knowledge Graph** | Semantic association graph mapping word distance and relationships. | Requires curated lexical database integration (e.g., WordNet API). |
| **Historical Memory Replay** | 90-day time-series snapshot playback of retention evolution. | Requires daily state snapshots database persistence. |

---

## ✨ Core Features

### 📚 Vocabulary Boost Engine
* **Custom Pack Management**: Create, customize, export, and manage personal word packs.
* **Marketplace Integration**: One-click installation of curated packs (Irregular Verbs, Phrasal Verbs, Academic Word List, IELTS Essentials) with automatic sync updates.
* **7 Interactive Practice Modes**:
  1. 🎴 **Smart Flashcards** — Interactive cards with audio pronunciation and confidence scoring.
  2. ✍️ **Spelling Trainer** — Active orthographic recall with instant feedback & confusion tracking.
  3. 🧩 **Match Pairs** — High-speed visual association game.
  4. ❓ **Multiple Choice Quiz** — Distractor-driven recall under pressure.
  5. 🎙️ **Speech Pronunciation** — Real-time Web Speech API speech-to-text evaluation.
  6. 📝 **Sentence Builder** — Contextual word ordering and syntax practice.
  7. ⚡ **Irregular Verbs Trainer** — Dedicated 3-form verb conjugate trainer.
* **Leech Word Detection**: Automatic identification of persistently failed words for focused intervention.

### 📖 Grammar & IELTS Mastery
* **34 Structured Topics**: 22 Beginner and 12 Intermediate units featuring concise rule explanations, usage examples, and common pitfalls.
* **6 Exercise Types per Topic**: Multiple choice, fill-in-the-blanks, sentence assembly, error identification, sentence transformation, and dialogue completion.
* **Full IELTS Practice Tests**: Timed examination environment, real-time timer, open-ended writing response evaluation, and granular band performance reports.

### 🧬 Memory Lab (Research & Insights)
* Visualized retention curves, stability distributions, and real-time confusion pair networks.
* Detailed analytical breakdown of personal learning speed, retention decay rates, and optimal review windows.

### 🏆 Gamification & Progress Tracking
* **Daily Streaks**: Habit tracking with visual streak counters and protection mechanics.
* **Activity Heatmap**: GitHub-style visual contribution grid tracking daily study volume.
* **Milestone Achievements**: Unlockable badges for vocabulary growth, mastery milestones, and practice streaks.
* **Comprehensive Analytics**: Interactive charts powered by Recharts detailing total words, active review queue, mastery ratio, and learning velocity.

### 🛠 Platform & Security
* **Firebase Authentication**: Email/Password and Google OAuth login.
* **Admin Dashboard (`/admin`)**: Operational view for monitoring platform activity and manually scoring open-ended IELTS writing submissions.
* **PWA & Mobile**: Offline capability, installable app shell, daily browser notifications, and Android APK deployment via Capacitor.

---

## 🏗 Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Frontend Framework** | React 19, React Router 7, Vite 8 |
| **Styling & Motion** | Tailwind CSS v4, Framer Motion |
| **State & Context** | React Context (AuthContext, PacksContext, ThemeContext) |
| **Data & Auth** | Firebase (Realtime Database & Authentication) |
| **Mobile Runtime** | Capacitor (Android) |
| **Testing** | Vitest, Testing Library (React & Jest DOM), JSDOM |
| **Code Quality** | ESLint 10 with React Hooks & Refresh plugins |
| **Charts & Icons** | Recharts, Lucide React |

---

## 📂 Project Structure

```
VOC/
├── android/              # Capacitor Android native project files
├── public/               # Static assets, icons, manifest, service worker
├── src/
│   ├── components/       # Reusable UI modules (Auth, Practice, Words, Layout, Common)
│   ├── contexts/         # Global state providers (Auth, Packs, Theme)
│   ├── data/             # Static datasets (Grammar rules, Market packs, IELTS tests)
│   ├── experiment/       # Memory Lab — research components & confusion analysis
│   ├── hooks/            # Firebase custom hooks (useWords, usePacks, useStreak, etc.)
│   ├── pages/            # Top-level route views (Dashboard, Library, Practice, Admin, etc.)
│   ├── utils/            # Core logic (memoryEngine, spacedRepetition, achievements, etc.)
│   └── main.jsx          # Application entry point
├── database.rules.json   # Firebase Realtime Database security rules
├── firestore.rules       # Firestore security rules
├── vite.config.js        # Vite & Vitest configuration
└── vercel.json           # Vercel SPA routing & headers deployment config
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** $\ge 18.0.0$
* **npm** $\ge 9.0.0$

### 1. Clone & Install
```bash
git clone https://github.com/your-username/voc.git
cd voc
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory with your Firebase setup credentials:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🧪 Testing & Code Quality

VOC includes unit tests covering pure algorithmic logic (Memory Engine, Spaced Repetition scheduling, Text Similarity matching, and Achievement calculators).

```bash
# Run all unit tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run linter
npm run lint
```

---

## 📱 Build & Deployment

### Web Deployment (Vercel)
The project includes a ready-to-use `vercel.json` configured for SPA client-side routing and cache controls for PWA assets.
```bash
npm run build
npm run preview
```

### Firebase Rules Deployment
Security rules enforce strict user-level data isolation. Deploy updated rules using Firebase CLI:
```bash
firebase deploy --only database
```

### Native Android Build (Capacitor)
```bash
# Build Vite web production assets
npm run build

# Sync web assets to Capacitor Android wrapper
npx cap sync android

# Open Android Studio to compile APK / App Bundle
npx cap open android
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more details.

