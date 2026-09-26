# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

(PWA, also wrapped as an Android app with Capacitor — the design language stays web/iOS-like, not Material.)

## Users

- **Learners (B2C)** — Uzbek-speaking English learners using their own personal VOC account to build vocabulary and grammar, mostly on phones.
- **Teachers (B2B)** — English teachers at Uzbek learning centers. Use the panel equally on the phone (in class: give homework, see who did it) and on a computer (building courses, reviewing results). Students join their groups by QR / 6-digit code.
- **Center admins (B2B)** — owners/managers of a learning center. Add teachers, watch whether groups are actually practicing, manage the course library.
- **Super admin** — the VOC founders, onboarding centers and managing accounts.

## Product Purpose

An English vocabulary and grammar platform with an adaptive memory engine (per-user × per-word forgetting model). Learning centers are the distribution channel and revenue; the personal app is the core product and keeps learners after their course ends. Success for a center: teachers assign homework in VOC and students practice every week.

## Positioning

One account, two modes: a student's personal VOC account joins a center group and keeps its history when the course ends. The memory engine models how each learner forgets each word, instead of fixed spaced-repetition intervals.

## Operating Context

- Teachers work inside real lessons: phone in hand, 10–25 students, quick checks of who did homework.
- Admins check a handful of numbers weekly: which groups are active, which went quiet.
- Credentials for teachers / center admins are created by an admin and sent over Telegram; there is no email flow.

## Capabilities and Constraints

- Stack: React 19 + Vite, Firebase Realtime Database + Auth, Vercel serverless functions (`api/`), framer-motion, lucide-react.
- Interface language for teachers, admins and students in corp mode is **Uzbek (Latin)**.
- Scope is deliberately narrow (2026-09 cut): English only; no IELTS, movies, games, live battles, independent teachers.
- Database rules: groups are writable only by their own teacher; the center admin reads them.

## Brand Commitments

- Name: VOC. Admin panels follow an Apple / iOS Settings-style system already built in `src/pages/corp/super-admin/ui.jsx` + `sa.css` (the owner asked for Apple design explicitly).
- UI rule from the owner: details open as full pages, not modals; secondary actions (edit, password, delete) live behind one button in a sheet.

## Evidence on Hand

- README.md: 40+ active learners, 2,600+ mastered vocabulary terms. No customer testimonials or center case studies exist — do not invent them.

## Product Principles

1. Fast market entry for learning centers beats feature breadth — simple and obvious over configurable.
2. Show real usage data only; never fabricate trends or metrics.
3. Every screen should answer "what needs my attention now" for the person using it.
4. Destructive actions are hard to do by accident.
