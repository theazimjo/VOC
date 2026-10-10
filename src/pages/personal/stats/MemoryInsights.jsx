import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Share2, X, Search, ShieldCheck, Clock, Target, Repeat, CheckCircle2, XCircle, ArrowRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { diagnoseForgetting, getConfusionPairsForWord } from '@voc/memory-engine';
import { useAuth } from '../../../contexts/AuthContext';
import { getConfusionPairs } from '../../../experiment/experimentDB';
import { renderReportCard, shareReportImage } from '../../../utils/shareCard';
import { useLanguage } from '../../../contexts/LanguageContext';
import {
  vocabCurve, wordCurve, whatIf, stabilityBuckets, accuracyByWeek, accuracyByTimeOfDay, rankWords, TARGET_RECALL,
  speedByWeek, wordSpeeds, posAccuracy, weeklyReport,
} from '../../../utils/memoryInsights';
import './MemoryInsights.css';

const DAY = 86400000;
const LOCALE = { uz: 'uz-UZ', ru: 'ru-RU', en: 'en-US' };

const COPY = {
  uz: {
    retention: 'Xotira va unutish', retentionSub: "Takrorlamasangiz, so'z boyligingiz vaqt o'tishi bilan qanday unutilishi",
    now: 'Hozir eslash ehtimoli', atRisk: (n) => `${n} ta so'z xavf ostida (75% dan past)`, noRisk: "Xavf ostidagi so'z yo'q",
    after: (d, p) => `${d} kundan keyin: ${p}%`, noCurve: "Takrorlangan so'zlar hali yo'q. Mashq qilgandan keyin bu yerda egri chiziq paydo bo'ladi.",
    target: 'Takrorlash chegarasi', daysShort: 'kun',
    strength: 'Xotira mustahkamligi', strengthSub: "So'zlar qancha vaqt esda turishi (kun hisobida). O'ng tomon yaxshiroq.",
    b: { d1: '<1', d3: '1–3', d7: '3–7', d14: '1–2 hafta', d30: '2–4 hafta', more: '1 oy+' },
    accuracy: "Takrorlash aniqligi", accuracySub: "To'g'ri javoblar ulushi, haftalar bo'yicha", accNone: "Hali yetarli ma'lumot yo'q",
    bestTime: 'Eng yaxshi vaqt', bestTimeSub: "Qaysi vaqtda yaxshiroq eslaysiz", night: 'Tun', morning: 'Ertalab', afternoon: 'Kunduzi', evening: 'Kechqurun',
    bestHint: (name, p) => `Eng aniq javoblar: ${name} (${p}%).`,
    explorer: "Har bir so'zning xotirasi", explorerSub: "So'zni bosing: unutish egri chizig'i va tafsilotlar ochiladi",
    tabRisk: 'Xavf ostida', tabStrong: 'Mustahkam', tabHard: 'Qiyin', search: "So'z yoki tarjima", more: "Yana ko'rsatish", none: "So'z topilmadi",
    tier: { new: 'Yangi', weak: 'Zaif', medium: "O'rtacha", good: 'Yaxshi', strong: 'Kuchli' },
    sheetRecall: "Hozir eslash ehtimoli", curveTitle: "Unutish egri chizig'i", today: 'Bugun', review: 'Takrorlash vaqti', correctDot: "To'g'ri", wrongDot: 'Xato',
    stStability: 'Mustahkamlik', stReviews: 'Takrorlashlar', stAccuracy: "To'g'ri javoblar", stWrong: 'Xatolar', stSpeed: "O'rtacha javob", stNext: 'Keyingi takrorlash',
    days: (n) => `${n} kun`, sec: (n) => `${n} s`, nextNow: 'Hozir', nextIn: (n) => `${n} kundan keyin`, nextNone: "Belgilanmagan",
    whatIf: 'Qachon takrorlash yaxshi?', whatIfSub: (h) => `${h} kundan keyin necha foiz eslaysiz`, strengthTo: (a, b) => `mustahkamlik ${a} → ${b} kun`, whatNone: 'Takrorlamasangiz', whatDay: (d) => `${d} kundan keyin takrorlasangiz`,
    history: 'Takrorlashlar tarixi', historyNone: 'Tarix saqlanmagan', gap: (n) => `${n} kun oralig'i`,
    d0: "Bu so'z hali mashq qilinmagan.", dDue: "Eslash ehtimoli 75% dan pastga tushgan. Hozir takrorlash tavsiya etiladi.", dOk: (n) => `Xotira hali mustahkam. Keyingi takrorlash ${n} kundan keyin.`, dHard: "Bu so'zda ko'p xato qilingan: yozib mashq qilish yordam beradi.",
    close: 'Yopish',
    prevWeek: "o'tgan hafta", share: 'Ulashish', sharing: 'Tayyorlanmoqda...', streakDays: 'kun ketma-ket', footer: 'vocabry.uz · so\'z o\'rganish', shareText: (n, a) => `Bu hafta Vocabry'da ${n} ta so'z takrorladim${a != null ? `, aniqlik ${a}%` : ''}. vocabry.uz`,
    weekly: 'Haftalik hisobot', weeklySub: "Bu hafta o'tgan hafta bilan solishtirilgan", wReviews: 'Takrorlashlar', wAccuracy: 'Aniqlik', wSpeed: 'Javob tezligi', wAdded: "Yangi so'zlar",
    speed: 'Javob tezligi', speedSub: "Javob qancha tez bo'lsa, so'z shuncha ravon esda turadi (soniyada)", speedNone: "Hali yetarli ma'lumot yo'q", fastest: "Eng tez eslanadigan", slowest: "Eng sekin eslanadigan",
    speedFaster: (p) => `Javoblaringiz o'tgan haftadan ${p}% tezlashdi.`, speedSlower: (p) => `Javoblaringiz o'tgan haftadan ${p}% sekinlashdi.`,
    pos: "So'z turlari bo'yicha", posSub: "Qaysi turdagi so'zlarni yaxshiroq eslaysiz (to'g'ri javoblar ulushi)", posWords: (n) => `${n} ta so'z`,
    posBest: (a, p) => `Eng kuchli: ${a} (${p}%).`, posWeak: (a, p) => `Eng zaif: ${a} (${p}%).`,
    posNames: { noun: 'Ot', verb: "Fe'l", adjective: 'Sifat', adverb: 'Ravish', preposition: 'Predlog', pronoun: 'Olmosh', conjunction: "Bog'lovchi", interjection: 'Undov', phrase: 'Ibora', article: 'Artikl', other: 'Boshqa' },
    conf: 'Adashtiradigan juftliklar', confSub: "Bir-birini almashtirib yuboradigan so'zlar", times: (n) => `${n} marta`, confTip: "Ularni yonma-yon, birga takrorlash eng yaxshi yordam beradi.", confNone: "Hali adashgan juftlik yo'q. Ular mashq paytida o'zi aniqlanadi.",
    why: 'Nega unutdingiz?', whySub: 'Taxminiy sabablar (aniq xulosa emas)',
    whyLabels: { confusion: "So'zlarni adashtirish", interval: "Takrorlash oralig'i uzun", confidence: 'Ishonch past', exposure: "Kam ko'rilgan" },
    whyAdvice: { confusion: (p) => (p ? `"${p}" bilan yonma-yon takrorlang.` : "O'xshash so'zlar bilan birga takrorlang."), interval: "Tez-tez takrorlang, yozib mashq qiling.", confidence: "Jumlalar va misollar ichida o'rganing.", exposure: "Ko'proq mashq qiling: xotira hali shakllanmagan." },
  },
  ru: {
    retention: 'Память и забывание', retentionSub: 'Как будет забываться ваш словарь со временем, если не повторять',
    now: 'Вероятность вспомнить сейчас', atRisk: (n) => `${n} слов под угрозой (ниже 75%)`, noRisk: 'Слов под угрозой нет',
    after: (d, p) => `Через ${d} дн.: ${p}%`, noCurve: 'Повторённых слов пока нет. После тренировок здесь появится кривая.',
    target: 'Порог повторения', daysShort: 'дн.',
    strength: 'Прочность памяти', strengthSub: 'Как долго слова держатся в памяти (в днях). Правее — лучше.',
    b: { d1: '<1', d3: '1–3', d7: '3–7', d14: '1–2 нед.', d30: '2–4 нед.', more: '1 мес.+' },
    accuracy: 'Точность повторений', accuracySub: 'Доля верных ответов по неделям', accNone: 'Пока мало данных',
    bestTime: 'Лучшее время', bestTimeSub: 'В какое время вы помните лучше', night: 'Ночь', morning: 'Утро', afternoon: 'День', evening: 'Вечер',
    bestHint: (name, p) => `Самые точные ответы: ${name} (${p}%).`,
    explorer: 'Память по каждому слову', explorerSub: 'Нажмите на слово: откроется кривая забывания и детали',
    tabRisk: 'Под угрозой', tabStrong: 'Прочные', tabHard: 'Трудные', search: 'Слово или перевод', more: 'Показать ещё', none: 'Слова не найдены',
    tier: { new: 'Новое', weak: 'Слабая', medium: 'Средняя', good: 'Хорошая', strong: 'Сильная' },
    sheetRecall: 'Вероятность вспомнить сейчас', curveTitle: 'Кривая забывания', today: 'Сегодня', review: 'Время повторить', correctDot: 'Верно', wrongDot: 'Ошибка',
    stStability: 'Прочность', stReviews: 'Повторений', stAccuracy: 'Верных ответов', stWrong: 'Ошибок', stSpeed: 'Средний ответ', stNext: 'Следующее повторение',
    days: (n) => `${n} дн.`, sec: (n) => `${n} с`, nextNow: 'Сейчас', nextIn: (n) => `Через ${n} дн.`, nextNone: 'Не назначено',
    whatIf: 'Когда лучше повторить?', whatIfSub: (h) => `Сколько вы будете помнить через ${h} дн.`, strengthTo: (a, b) => `прочность ${a} → ${b} дн.`, whatNone: 'Если не повторять', whatDay: (d) => `Если повторить через ${d} дн.`,
    history: 'История повторений', historyNone: 'История не сохранена', gap: (n) => `интервал ${n} дн.`,
    d0: 'Это слово ещё не тренировали.', dDue: 'Вероятность вспомнить упала ниже 75%. Рекомендуем повторить сейчас.', dOk: (n) => `Память пока крепкая. Следующее повторение через ${n} дн.`, dHard: 'В этом слове много ошибок: поможет письменная тренировка.',
    close: 'Закрыть',
    prevWeek: 'прошлая неделя', share: 'Поделиться', sharing: 'Готовим...', streakDays: 'дней подряд', footer: 'vocabry.uz · учим слова', shareText: (n, a) => `На этой неделе я повторил(а) слов в Vocabry: ${n}${a != null ? `, точность ${a}%` : ''}. vocabry.uz`,
    weekly: 'Недельный отчёт', weeklySub: 'Эта неделя в сравнении с прошлой', wReviews: 'Повторения', wAccuracy: 'Точность', wSpeed: 'Скорость ответа', wAdded: 'Новые слова',
    speed: 'Скорость ответа', speedSub: 'Чем быстрее ответ, тем увереннее слово в памяти (в секундах)', speedNone: 'Пока мало данных', fastest: 'Быстрее всего вспоминаются', slowest: 'Медленнее всего вспоминаются',
    speedFaster: (p) => `Вы отвечаете на ${p}% быстрее, чем на прошлой неделе.`, speedSlower: (p) => `Вы отвечаете на ${p}% медленнее, чем на прошлой неделе.`,
    pos: 'По частям речи', posSub: 'Какие слова вы помните лучше (доля верных ответов)', posWords: (n) => `${n} слов`,
    posBest: (a, p) => `Сильнее всего: ${a} (${p}%).`, posWeak: (a, p) => `Слабее всего: ${a} (${p}%).`,
    posNames: { noun: 'Существительное', verb: 'Глагол', adjective: 'Прилагательное', adverb: 'Наречие', preposition: 'Предлог', pronoun: 'Местоимение', conjunction: 'Союз', interjection: 'Междометие', phrase: 'Выражение', article: 'Артикль', other: 'Другое' },
    conf: 'Путаемые пары', confSub: 'Слова, которые вы принимаете одно за другое', times: (n) => `${n} раз`, confTip: 'Лучше всего помогает повторять их вместе, рядом.', confNone: 'Путаемых пар пока нет. Они определяются во время тренировок.',
    why: 'Почему забыли?', whySub: 'Вероятные причины (не точный вывод)',
    whyLabels: { confusion: 'Путаница слов', interval: 'Слишком большой интервал', confidence: 'Низкая уверенность', exposure: 'Мало повторений' },
    whyAdvice: { confusion: (p) => (p ? `Повторяйте вместе с «${p}».` : 'Повторяйте вместе с похожими словами.'), interval: 'Повторяйте чаще и тренируйте письмом.', confidence: 'Учите в предложениях и примерах.', exposure: 'Больше практики: память ещё не сформировалась.' },
  },
  en: {
    retention: 'Memory and forgetting', retentionSub: 'How your vocabulary fades over time if nothing is reviewed',
    now: 'Chance to recall right now', atRisk: (n) => `${n} words at risk (below 75%)`, noRisk: 'No words at risk',
    after: (d, p) => `In ${d} days: ${p}%`, noCurve: 'No reviewed words yet. The curve appears once you practice.',
    target: 'Review threshold', daysShort: 'd',
    strength: 'Memory strength', strengthSub: 'How long words stay in memory (in days). Further right is better.',
    b: { d1: '<1', d3: '1–3', d7: '3–7', d14: '1–2 wk', d30: '2–4 wk', more: '1 mo+' },
    accuracy: 'Review accuracy', accuracySub: 'Share of correct answers, by week', accNone: 'Not enough data yet',
    bestTime: 'Best time', bestTimeSub: 'When you remember best', night: 'Night', morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening',
    bestHint: (name, p) => `Most accurate answers: ${name} (${p}%).`,
    explorer: 'Memory of every word', explorerSub: 'Tap a word to see its forgetting curve and details',
    tabRisk: 'At risk', tabStrong: 'Strongest', tabHard: 'Hard', search: 'Word or translation', more: 'Show more', none: 'No words found',
    tier: { new: 'New', weak: 'Weak', medium: 'Medium', good: 'Good', strong: 'Strong' },
    sheetRecall: 'Chance to recall right now', curveTitle: 'Forgetting curve', today: 'Today', review: 'Review time', correctDot: 'Correct', wrongDot: 'Wrong',
    stStability: 'Strength', stReviews: 'Reviews', stAccuracy: 'Correct answers', stWrong: 'Mistakes', stSpeed: 'Average answer', stNext: 'Next review',
    days: (n) => `${n} d`, sec: (n) => `${n} s`, nextNow: 'Now', nextIn: (n) => `In ${n} days`, nextNone: 'Not scheduled',
    whatIf: 'When is the best time to review?', whatIfSub: (h) => `How much you will remember in ${h} days`, strengthTo: (a, b) => `strength ${a} → ${b} d`, whatNone: 'If not reviewed', whatDay: (d) => `If reviewed in ${d} days`,
    history: 'Review history', historyNone: 'No history saved', gap: (n) => `${n} day gap`,
    d0: 'This word has not been practiced yet.', dDue: 'Recall chance has dropped below 75%. Reviewing now is recommended.', dOk: (n) => `Memory is still solid. Next review in ${n} days.`, dHard: 'This word has many mistakes: typing practice helps.',
    close: 'Close',
    prevWeek: 'last week', share: 'Share', sharing: 'Preparing...', streakDays: 'day streak', footer: 'vocabry.uz · learn words', shareText: (n, a) => `This week I reviewed ${n} words on Vocabry${a != null ? `, ${a}% accuracy` : ''}. vocabry.uz`,
    weekly: 'Weekly report', weeklySub: 'This week compared with last week', wReviews: 'Reviews', wAccuracy: 'Accuracy', wSpeed: 'Answer speed', wAdded: 'New words',
    speed: 'Answer speed', speedSub: 'The faster you answer, the more fluent the word (in seconds)', speedNone: 'Not enough data yet', fastest: 'Recalled fastest', slowest: 'Recalled slowest',
    speedFaster: (p) => `You answer ${p}% faster than last week.`, speedSlower: (p) => `You answer ${p}% slower than last week.`,
    pos: 'By word type', posSub: 'Which kinds of words you remember best (share of correct answers)', posWords: (n) => `${n} words`,
    posBest: (a, p) => `Strongest: ${a} (${p}%).`, posWeak: (a, p) => `Weakest: ${a} (${p}%).`,
    posNames: { noun: 'Noun', verb: 'Verb', adjective: 'Adjective', adverb: 'Adverb', preposition: 'Preposition', pronoun: 'Pronoun', conjunction: 'Conjunction', interjection: 'Interjection', phrase: 'Phrase', article: 'Article', other: 'Other' },
    conf: 'Words you mix up', confSub: 'Pairs of words you keep swapping', times: (n) => `${n} times`, confTip: 'Reviewing them side by side helps the most.', confNone: 'No mixed-up pairs yet. They are detected while you practice.',
    why: 'Why did you forget?', whySub: 'Likely reasons (not a definite answer)',
    whyLabels: { confusion: 'Mixing up words', interval: 'Review gap too long', confidence: 'Low confidence', exposure: 'Seen too few times' },
    whyAdvice: { confusion: (p) => (p ? `Review it side by side with "${p}".` : 'Review it together with similar words.'), interval: 'Review more often and practice by typing.', confidence: 'Learn it inside sentences and examples.', exposure: 'Practice more: the memory has not formed yet.' },
  },
};

const pct = (p) => Math.round(p * 100);
const tone = (p) => (p >= 0.85 ? 'good' : p >= TARGET_RECALL ? 'ok' : 'bad');

// ---- charts ---------------------------------------------------------------------------------
function VocabCurve({ points, c }) {
  const W = 320; const H = 150; const L = 30; const R = 8; const T = 10; const B = 24;
  const x = (d) => L + (d / 30) * (W - L - R);
  const y = (p) => T + (1 - p) * (H - T - B);
  const line = points.map((pt, i) => `${i ? 'L' : 'M'}${x(pt.day).toFixed(1)} ${y(pt.p).toFixed(1)}`).join(' ');
  const area = `${line} L${x(30)} ${y(0)} L${x(0)} ${y(0)} Z`;
  return (
    <svg className="mi-chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={c.retention}>
      <defs>
        <linearGradient id="mi-vc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--accent-1)" stopOpacity=".3" /><stop offset="1" stopColor="var(--accent-1)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.5, 1].map((g) => (
        <g key={g}>
          <line x1={L} x2={W - R} y1={y(g)} y2={y(g)} className="mi-grid" />
          <text x={L - 6} y={y(g) + 3} className="mi-axis" textAnchor="end">{Math.round(g * 100)}</text>
        </g>
      ))}
      <line x1={L} x2={W - R} y1={y(TARGET_RECALL)} y2={y(TARGET_RECALL)} className="mi-target" />
      <path d={area} fill="url(#mi-vc)" />
      <path d={line} className="mi-line" fill="none" />
      {[0, 7, 14, 30].map((d) => <text key={d} x={x(d)} y={H - 6} className="mi-axis" textAnchor="middle">{d === 0 ? c.today : `${d}${c.daysShort}`}</text>)}
    </svg>
  );
}

function WordChart({ word, mem, now, c, locale }) {
  const W = 320; const H = 170; const L = 30; const R = 8; const T = 10; const B = 34;
  const curve = useMemo(() => wordCurve(word, now), [word, now]);
  const firstTs = mem.history.length ? mem.history[0].ts : mem.last;
  const t0 = Math.max(Math.min(firstTs, mem.last), now - 45 * DAY);
  const t1 = now + 30 * DAY;
  const x = (t) => L + ((t - t0) / (t1 - t0)) * (W - L - R);
  const y = (p) => T + (1 - p) * (H - T - B);
  const pts = curve.filter((q) => q.t >= t0);
  const line = pts.map((q, i) => `${i ? 'L' : 'M'}${x(q.t).toFixed(1)} ${y(q.p).toFixed(1)}`).join(' ');
  const events = mem.history.filter((h) => h.ts >= t0);
  const fmt = (t) => new Date(t).toLocaleDateString(locale, { day: 'numeric', month: 'short' });
  const showNext = mem.nextMs && mem.nextMs >= t0 && mem.nextMs <= t1;
  return (
    <svg className="mi-chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={c.curveTitle}>
      {[0, 0.5, 1].map((g) => (
        <g key={g}>
          <line x1={L} x2={W - R} y1={y(g)} y2={y(g)} className="mi-grid" />
          <text x={L - 6} y={y(g) + 3} className="mi-axis" textAnchor="end">{Math.round(g * 100)}</text>
        </g>
      ))}
      <line x1={L} x2={W - R} y1={y(TARGET_RECALL)} y2={y(TARGET_RECALL)} className="mi-target" />
      <line x1={x(now)} x2={x(now)} y1={T} y2={H - B} className="mi-today" />
      <path d={line} className="mi-line" fill="none" />
      {showNext && <circle cx={x(mem.nextMs)} cy={y(TARGET_RECALL)} r="4.5" className="mi-next" />}
      {mem.recall != null && <circle cx={x(now)} cy={y(mem.recall)} r="5" className="mi-now" />}
      {events.map((h, i) => <circle key={i} cx={x(h.ts)} cy={H - B + 12} r="4" className={h.result ? 'mi-ev-ok' : 'mi-ev-bad'} />)}
      <text x={x(t0)} y={H - 4} className="mi-axis" textAnchor="start">{fmt(t0)}</text>
      <text x={x(now)} y={H - 4} className="mi-axis" textAnchor="middle">{c.today}</text>
      <text x={x(t1)} y={H - 4} className="mi-axis" textAnchor="end">{fmt(t1)}</text>
    </svg>
  );
}

// ---- word sheet -----------------------------------------------------------------------------
function WordSheet({ item, now, c, locale, pairs, onClose }) {
  const { word, mem } = item;
  const partner = useMemo(() => getConfusionPairsForWord(word.id, pairs), [word.id, pairs]);
  const why = useMemo(() => diagnoseForgetting({ recallHistory: word.recallHistory, totalReviews: word.reviewCount, wordData: { word: word.word } }, partner), [word, partner]);
  const horizon = Math.min(30, Math.max(7, Math.round(mem.stability * 5)));
  const options = useMemo(() => (mem.hasReview ? whatIf(word, [1, 3, 7, 14].filter((d) => d < horizon), horizon) : []), [word, mem.hasReview, horizon]);
  const fmt = (t) => new Date(t).toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
  const advice = !mem.hasReview ? c.d0
    : mem.recall < TARGET_RECALL ? c.dDue
      : mem.wrong >= 3 ? c.dHard : c.dOk(Math.max(0, mem.daysToReview ?? 0));
  const next = mem.nextMs == null ? c.nextNone : mem.daysToReview <= 0 ? c.nextNow : c.nextIn(mem.daysToReview);
  return createPortal(
    <div className="mi-back" role="dialog" aria-modal="true" aria-label={word.word} onClick={onClose}>
      <motion.div className="mi-sheet" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.22, ease: 'easeOut' }} onClick={(e) => e.stopPropagation()}>
        <div className="mi-grab" aria-hidden="true" />
        <div className="mi-sheet-head">
          <div className="mi-sheet-title">
            <h3>{word.word}</h3>
            <p>{word.translation}</p>
          </div>
          <span className={`mi-tier tier-${mem.tier}`}>{c.tier[mem.tier]}</span>
          <button type="button" className="mi-close" onClick={onClose} aria-label={c.close}><X size={18} /></button>
        </div>

        {mem.hasReview && (
          <>
            <div className="mi-recall">
              <strong className={`tone-${tone(mem.recall)}`}>{pct(mem.recall)}%</strong>
              <span>{c.sheetRecall}</span>
            </div>
            <h4 className="mi-h">{c.curveTitle}</h4>
            <WordChart word={word} mem={mem} now={now} c={c} locale={locale} />
            <div className="mi-legend">
              <span><i className="lg-line" />{c.curveTitle}</span>
              <span><i className="lg-target" />{c.target}</span>
              <span><i className="lg-ok" />{c.correctDot}</span>
              <span><i className="lg-bad" />{c.wrongDot}</span>
            </div>
          </>
        )}

        <p className="mi-advice">{advice}</p>

        {mem.hasReview && (
          <>
            <div className="mi-tiles">
              <div><ShieldCheck size={16} /><strong>{c.days(Math.round(mem.stability * 10) / 10)}</strong><span>{c.stStability}</span></div>
              <div><Repeat size={16} /><strong>{mem.reviews}</strong><span>{c.stReviews}</span></div>
              <div><CheckCircle2 size={16} /><strong>{mem.accuracy != null ? `${mem.accuracy}%` : '-'}</strong><span>{c.stAccuracy}</span></div>
              <div><XCircle size={16} /><strong>{mem.wrong}</strong><span>{c.stWrong}</span></div>
              <div><Clock size={16} /><strong>{mem.avgResponse != null ? c.sec(mem.avgResponse) : '-'}</strong><span>{c.stSpeed}</span></div>
              <div><Target size={16} /><strong>{next}</strong><span>{c.stNext}</span></div>
            </div>

            <h4 className="mi-h">{c.whatIf}</h4>
            <p className="mi-sub">{c.whatIfSub(horizon)}</p>
            <ul className="mi-whatif">
              <li><span>{c.whatNone}</span><span className="mi-bar"><i style={{ width: `${pct(options[0]?.without ?? 0)}%` }} className="is-none" /></span><b>{pct(options[0]?.without ?? 0)}%</b></li>
              {options.map((o) => (
                <li key={o.day}>
                  <span>{c.whatDay(o.day)}<small className="mi-strength">{c.strengthTo(Math.round(mem.stability * 10) / 10, Math.round(o.newStability * 10) / 10)}</small></span>
                  <span className="mi-bar"><i style={{ width: `${pct(o.withReview)}%` }} /></span><b>{pct(o.withReview)}%</b>
                </li>
              ))}
            </ul>

            {why.hasEnoughData && (
              <>
                <h4 className="mi-h">{c.why}</h4>
                <p className="mi-sub">{c.whySub}</p>
                <ul className="mi-why">
                  {why.factors.filter((f) => f.weight >= 0.15).slice(0, 3).map((f) => (
                    <li key={f.key}>
                      <span>{c.whyLabels[f.key]}</span>
                      <span className="mi-bar"><i style={{ width: `${Math.round(f.weight * 100)}%` }} /></span>
                      <b>{Math.round(f.weight * 100)}%</b>
                    </li>
                  ))}
                </ul>
                {why.primaryCause && (
                  <p className="mi-advice">
                    {typeof c.whyAdvice[why.primaryCause] === 'function' ? c.whyAdvice[why.primaryCause](partner[0]?.partnerWord) : c.whyAdvice[why.primaryCause]}
                  </p>
                )}
              </>
            )}

            <h4 className="mi-h">{c.history}</h4>
            {mem.history.length > 0 ? (
              <ul className="mi-history">
                {[...mem.history].reverse().slice(0, 8).map((h, i) => (
                  <li key={i}>
                    {h.result ? <CheckCircle2 size={16} className="ok" /> : <XCircle size={16} className="bad" />}
                    <span>{fmt(h.ts)}</span>
                    {Number.isFinite(h.gap) && h.gap > 0 && <small>{c.gap(Math.round(h.gap * 10) / 10)}</small>}
                  </li>
                ))}
              </ul>
            ) : <p className="mi-sub">{c.historyNone}</p>}
          </>
        )}
      </motion.div>
    </div>,
    document.body
  );
}

// ---- cards ----------------------------------------------------------------------------------
export default function MemoryInsights({ words, tag, streakCount = 0 }) {
  const { language } = useLanguage();
  const c = COPY[language] || COPY.en;
  const locale = LOCALE[language] || LOCALE.en;
  const now = useMemo(() => Date.now(), []);
  const [tab, setTab] = useState('risk');
  const [query, setQuery] = useState('');
  const [shown, setShown] = useState(20);
  const [open, setOpen] = useState(null);
  const { user } = useAuth();
  const [pairs, setPairs] = useState([]);
  useEffect(() => {
    if (!user) return;
    getConfusionPairs(user.uid).then(setPairs).catch(() => setPairs([]));
  }, [user]);

  const curve = useMemo(() => vocabCurve(words, now), [words, now]);
  const buckets = useMemo(() => stabilityBuckets(words), [words]);
  const weeks = useMemo(() => accuracyByWeek(words, 8, now), [words, now]);
  const slots = useMemo(() => accuracyByTimeOfDay(words), [words]);
  const ranked = useMemo(() => rankWords(words, tab, now), [words, tab, now]);
  const report = useMemo(() => weeklyReport(words, now), [words, now]);
  const speed = useMemo(() => speedByWeek(words, 8, now), [words, now]);
  const speeds = useMemo(() => wordSpeeds(words), [words]);
  const pos = useMemo(() => posAccuracy(words), [words]);
  const [sharing, setSharing] = useState(false);

  const shareReport = async () => {
    if (sharing) return;
    setSharing(true);
    try {
      const today = new Date(now);
      const monday = new Date(today); monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
      const fmtShort = (d) => d.toLocaleDateString(locale, { day: 'numeric', month: 'short' });
      const delta = (d, fmtv) => {
        if (d.prev == null) return '';
        const diff = d.cur != null ? d.cur - d.prev : 0;
        const arrow = diff === 0 ? '' : diff > 0 ? '▲ ' : '▼ ';
        return `${arrow}${c.prevWeek}: ${fmtv(d.prev)}`;
      };
      const tone = (d, lowerBetter) => (d.cur == null || d.prev == null || d.cur === d.prev ? null : (lowerBetter ? d.cur < d.prev : d.cur > d.prev) ? 'good' : 'bad');
      const items = [
        { label: c.wReviews, value: report.reviews.cur != null ? String(report.reviews.cur) : '-', delta: delta(report.reviews, String), tone: tone(report.reviews, false) },
        { label: c.wAccuracy, value: report.accuracy.cur != null ? `${report.accuracy.cur}%` : '-', delta: delta(report.accuracy, (v) => `${v}%`), tone: tone(report.accuracy, false) },
        { label: c.wSpeed, value: report.speed.cur != null ? c.sec(report.speed.cur) : '-', delta: delta(report.speed, c.sec), tone: tone(report.speed, true) },
        { label: c.wAdded, value: String(report.added.cur), delta: delta(report.added, String), tone: tone(report.added, false) },
      ];
      const blob = await renderReportCard({
        title: c.weekly, range: `${fmtShort(monday)} – ${fmtShort(today)}`, items, streak: streakCount, streakLabel: c.streakDays, footer: c.footer,
      });
      await shareReportImage(blob, { title: c.weekly, text: c.shareText(report.reviews.cur, report.accuracy.cur) });
    } catch (e) {
      console.warn('Share failed', e);
    } finally {
      setSharing(false);
    }
  };

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? ranked.rows.filter((r) => (r.word.word || '').toLowerCase().includes(q) || (r.word.translation || '').toLowerCase().includes(q)) : ranked.rows;
  }, [ranked, query]);

  const maxBucket = Math.max(1, ...buckets.map((b) => b.count));
  const slotLabel = { night: c.night, morning: c.morning, afternoon: c.afternoon, evening: c.evening };
  const bestSlot = [...slots].filter((s) => s.total >= 10 && s.rate != null).sort((a, b) => b.rate - a.rate)[0];
  const hasAccuracy = weeks.some((w) => w.total > 0);

  return (
    <>
      {/* Weekly report */}
      <section className="sp-card">
        <div className="sp-head"><div><h2>{c.weekly}</h2><p>{c.weeklySub}</p></div>{tag}</div>
        <button type="button" className="mi-share" onClick={shareReport} disabled={sharing}><Share2 size={16} /> {sharing ? c.sharing : c.share}</button>
        <div className="mi-report">
          {[
            [c.wReviews, report.reviews, (v) => v, false],
            [c.wAccuracy, report.accuracy, (v) => `${v}%`, false],
            [c.wSpeed, report.speed, (v) => c.sec(v), true],
            [c.wAdded, report.added, (v) => v, false],
          ].map(([label, d, fmtv, lowerIsBetter]) => {
            const has = d.cur != null;
            const diff = has && d.prev != null ? d.cur - d.prev : null;
            const good = diff == null || diff === 0 ? null : lowerIsBetter ? diff < 0 : diff > 0;
            const Icon = diff == null || diff === 0 ? Minus : diff > 0 ? TrendingUp : TrendingDown;
            return (
              <div className="mi-rep" key={label}>
                <span className="mi-rep-label">{label}</span>
                <strong>{has ? fmtv(d.cur) : '-'}</strong>
                <span className={`mi-rep-diff${good === true ? ' is-good' : good === false ? ' is-bad' : ''}`}>
                  <Icon size={13} />{d.prev != null ? fmtv(d.prev) : '-'}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Forgetting curve of the whole vocabulary */}
      <section className="sp-card">
        <div className="sp-head"><div><h2>{c.retention}</h2><p>{c.retentionSub}</p></div>{tag}</div>
        {curve ? (
          <>
            <div className="mi-hero">
              <div>
                <strong className={`mi-big tone-${tone(curve.points[0].p)}`}>{pct(curve.points[0].p)}%</strong>
                <span className="mi-hero-label">{c.now}</span>
              </div>
              <span className={`mi-risk${curve.atRisk === 0 ? ' is-fine' : ''}`}>{curve.atRisk > 0 ? c.atRisk(curve.atRisk) : c.noRisk}</span>
            </div>
            <VocabCurve points={curve.points} c={c} />
            <div className="mi-legend"><span><i className="lg-line" />{c.retention}</span><span><i className="lg-target" />{c.target} 75%</span></div>
            <p className="sp-foot">
              {[7, 14, 30].map((d) => c.after(d, pct(curve.points.find((p) => p.day === d).p))).join(' · ')}
            </p>
          </>
        ) : <p className="sp-foot">{c.noCurve}</p>}
      </section>

      {/* Memory strength distribution */}
      {curve && (
        <section className="sp-card">
          <div className="sp-head"><div><h2>{c.strength}</h2><p>{c.strengthSub}</p></div>{tag}</div>
          <div className="mi-hist">
            {buckets.map((b, i) => (
              <div className="mi-hist-col" key={b.key}>
                <span className="mi-hist-val">{b.count || ''}</span>
                <div className="mi-hist-track">
                  <motion.div className={`mi-hist-bar s${i}`} initial={{ height: 0 }} animate={{ height: `${(b.count / maxBucket) * 100}%` }} transition={{ duration: 0.5, delay: i * 0.05 }} />
                </div>
                <span className="mi-hist-label">{c.b[b.key]}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Accuracy over time and best time of day */}
      <section className="sp-card">
        <div className="sp-head"><div><h2>{c.accuracy}</h2><p>{c.accuracySub}</p></div>{tag}</div>
        {hasAccuracy ? (
          <>
            <div className="sp-bars">
              {weeks.map((w, i) => (
                <div className="sp-bar-col" key={i}>
                  <span className="sp-bar-val">{w.rate != null ? `${w.rate}` : ''}</span>
                  <div className="sp-bar-track">
                    <motion.div className={`sp-bar${i === weeks.length - 1 ? ' is-accent' : ''}`} initial={{ height: 0 }} animate={{ height: `${w.rate ?? 0}%` }} transition={{ duration: 0.5, delay: i * 0.04 }} />
                  </div>
                  <span className="sp-bar-label">{w.start.toLocaleDateString(locale, { day: 'numeric', month: 'short' })}</span>
                </div>
              ))}
            </div>
            {bestSlot && (
              <div className="mi-slots">
                <h4 className="mi-h">{c.bestTime}</h4>
                <div className="mi-slot-row">
                  {slots.map((s) => (
                    <div key={s.key} className={`mi-slot${bestSlot.key === s.key ? ' is-best' : ''}`}>
                      <strong>{s.rate != null ? `${s.rate}%` : '-'}</strong>
                      <span>{slotLabel[s.key]}</span>
                    </div>
                  ))}
                </div>
                <p className="sp-foot">{c.bestHint(slotLabel[bestSlot.key], bestSlot.rate)}</p>
              </div>
            )}
          </>
        ) : <p className="sp-foot">{c.accNone}</p>}
      </section>

      {/* Answer speed */}
      <section className="sp-card">
        <div className="sp-head"><div><h2>{c.speed}</h2><p>{c.speedSub}</p></div>{tag}</div>
        {speed.some((w) => w.avg != null) ? (
          <>
            <div className="sp-bars">
              {speed.map((w, i) => {
                const max = Math.max(...speed.map((x) => x.avg || 0), 1);
                return (
                  <div className="sp-bar-col" key={i}>
                    <span className="sp-bar-val">{w.avg != null ? w.avg : ''}</span>
                    <div className="sp-bar-track">
                      <motion.div className={`sp-bar${i === speed.length - 1 ? ' is-accent' : ''}`} initial={{ height: 0 }} animate={{ height: `${w.avg != null ? (w.avg / max) * 100 : 0}%` }} transition={{ duration: 0.5, delay: i * 0.04 }} />
                    </div>
                    <span className="sp-bar-label">{w.start.toLocaleDateString(locale, { day: 'numeric', month: 'short' })}</span>
                  </div>
                );
              })}
            </div>
            {report.speed.cur != null && report.speed.prev != null && Math.abs(report.speed.cur - report.speed.prev) / report.speed.prev > 0.05 && (
              <p className="sp-foot">
                {report.speed.cur < report.speed.prev
                  ? c.speedFaster(Math.round((1 - report.speed.cur / report.speed.prev) * 100))
                  : c.speedSlower(Math.round((report.speed.cur / report.speed.prev - 1) * 100))}
              </p>
            )}
            {(speeds.fastest.length > 0) && (
              <div className="mi-speeds">
                <div><h4 className="mi-h">{c.fastest}</h4><ul>{speeds.fastest.map((r) => <li key={`${r.word.packId}-${r.word.id}`}><span>{r.word.word}</span><b>{c.sec(r.avg)}</b></li>)}</ul></div>
                <div><h4 className="mi-h">{c.slowest}</h4><ul>{speeds.slowest.map((r) => <li key={`${r.word.packId}-${r.word.id}`}><span>{r.word.word}</span><b>{c.sec(r.avg)}</b></li>)}</ul></div>
              </div>
            )}
          </>
        ) : <p className="sp-foot">{c.speedNone}</p>}
      </section>

      {/* Accuracy by word type */}
      {pos.length > 0 && (
        <section className="sp-card">
          <div className="sp-head"><div><h2>{c.pos}</h2><p>{c.posSub}</p></div>{tag}</div>
          <ul className="mi-pos">
            {pos.map((g) => (
              <li key={g.key}>
                <span className="mi-pos-name"><strong>{c.posNames[g.key] || g.key}</strong><small>{c.posWords(g.words)}</small></span>
                <span className="mi-bar"><i style={{ width: `${g.accuracy}%` }} /></span>
                <b>{g.accuracy}%</b>
              </li>
            ))}
          </ul>
          {pos.length > 1 && <p className="sp-foot">{c.posBest(c.posNames[pos[0].key] || pos[0].key, pos[0].accuracy)} {c.posWeak(c.posNames[pos[pos.length - 1].key] || pos[pos.length - 1].key, pos[pos.length - 1].accuracy)}</p>}
        </section>
      )}

      {/* Confusable pairs */}
      <section className="sp-card">
        <div className="sp-head"><div><h2>{c.conf}</h2><p>{c.confSub}</p></div>{tag}</div>
        {pairs.length > 0 ? (
          <>
            <ul className="mi-pairs">
              {pairs.slice(0, 8).map((p) => (
                <li key={p.key || `${p.wordIdA}-${p.wordIdB}`}>
                  <span className="mi-pair-a">{p.wordA || '?'}</span>
                  <ArrowRight size={14} className="mi-pair-arrow" />
                  <span className="mi-pair-b">{p.wordB || '?'}</span>
                  <span className="mi-pair-n">{c.times(p.count || 1)}</span>
                </li>
              ))}
            </ul>
            <p className="sp-foot">{c.confTip}</p>
          </>
        ) : <p className="sp-foot">{c.confNone}</p>}
      </section>

      {/* Word explorer */}
      <section className="sp-card">
        <div className="sp-head"><div><h2>{c.explorer}</h2><p>{c.explorerSub}</p></div>{tag}</div>
        <div className="mi-tabs" role="tablist">
          {[['risk', c.tabRisk], ['strong', c.tabStrong], ['hard', c.tabHard]].map(([k, label]) => (
            <button key={k} type="button" role="tab" aria-selected={tab === k} className={tab === k ? 'is-on' : ''} onClick={() => { setTab(k); setShown(20); }}>{label}</button>
          ))}
        </div>
        <div className="mi-search"><Search size={16} /><input type="text" value={query} onChange={(e) => { setQuery(e.target.value); setShown(20); }} placeholder={c.search} /></div>
        {rows.length > 0 ? (
          <ul className="mi-words">
            {rows.slice(0, shown).map((r) => (
              <li key={`${r.word.packId}-${r.word.id}`}>
                <button type="button" onClick={() => setOpen(r)}>
                  <span className="mi-w-main"><strong>{r.word.word}</strong><small>{r.word.translation}</small></span>
                  <span className={`mi-tier tier-${r.mem.tier}`}>{c.tier[r.mem.tier]}</span>
                  <span className={`mi-w-pct tone-${tone(r.mem.recall)}`}>{pct(r.mem.recall)}%</span>
                </button>
              </li>
            ))}
          </ul>
        ) : <p className="sp-foot">{c.none}</p>}
        {rows.length > shown && <button type="button" className="mi-more" onClick={() => setShown((n) => n + 20)}>{c.more}</button>}
      </section>

      {open && <WordSheet item={open} now={now} c={c} locale={locale} pairs={pairs} onClose={() => setOpen(null)} />}
    </>
  );
}
