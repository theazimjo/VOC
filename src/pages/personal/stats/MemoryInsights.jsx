import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X, Search, ShieldCheck, Clock, Target, Repeat, CheckCircle2, XCircle } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import {
  vocabCurve, wordCurve, whatIf, stabilityBuckets, accuracyByWeek, accuracyByTimeOfDay, rankWords, TARGET_RECALL,
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
    whatIf: 'Qachon takrorlash yaxshi?', whatIfSub: "30 kundan keyin necha foiz eslaysiz", whatNone: 'Takrorlamasangiz', whatDay: (d) => `${d} kundan keyin takrorlasangiz`,
    history: 'Takrorlashlar tarixi', historyNone: 'Tarix saqlanmagan', gap: (n) => `${n} kun oralig'i`,
    d0: "Bu so'z hali mashq qilinmagan.", dDue: "Eslash ehtimoli 75% dan pastga tushgan. Hozir takrorlash tavsiya etiladi.", dOk: (n) => `Xotira hali mustahkam. Keyingi takrorlash ${n} kundan keyin.`, dHard: "Bu so'zda ko'p xato qilingan: yozib mashq qilish yordam beradi.",
    close: 'Yopish',
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
    whatIf: 'Когда лучше повторить?', whatIfSub: 'Сколько вы будете помнить через 30 дней', whatNone: 'Если не повторять', whatDay: (d) => `Если повторить через ${d} дн.`,
    history: 'История повторений', historyNone: 'История не сохранена', gap: (n) => `интервал ${n} дн.`,
    d0: 'Это слово ещё не тренировали.', dDue: 'Вероятность вспомнить упала ниже 75%. Рекомендуем повторить сейчас.', dOk: (n) => `Память пока крепкая. Следующее повторение через ${n} дн.`, dHard: 'В этом слове много ошибок: поможет письменная тренировка.',
    close: 'Закрыть',
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
    whatIf: 'When is the best time to review?', whatIfSub: 'How much you will remember in 30 days', whatNone: 'If not reviewed', whatDay: (d) => `If reviewed in ${d} days`,
    history: 'Review history', historyNone: 'No history saved', gap: (n) => `${n} day gap`,
    d0: 'This word has not been practiced yet.', dDue: 'Recall chance has dropped below 75%. Reviewing now is recommended.', dOk: (n) => `Memory is still solid. Next review in ${n} days.`, dHard: 'This word has many mistakes: typing practice helps.',
    close: 'Close',
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
function WordSheet({ item, now, c, locale, onClose }) {
  const { word, mem } = item;
  const options = useMemo(() => (mem.hasReview ? whatIf(word) : []), [word, mem.hasReview]);
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
            <p className="mi-sub">{c.whatIfSub}</p>
            <ul className="mi-whatif">
              <li><span>{c.whatNone}</span><span className="mi-bar"><i style={{ width: `${pct(options[0]?.without ?? 0)}%` }} className="is-none" /></span><b>{pct(options[0]?.without ?? 0)}%</b></li>
              {options.map((o) => (
                <li key={o.day}><span>{c.whatDay(o.day)}</span><span className="mi-bar"><i style={{ width: `${pct(o.withReview)}%` }} /></span><b>{pct(o.withReview)}%</b></li>
              ))}
            </ul>

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
export default function MemoryInsights({ words, tag }) {
  const { language } = useLanguage();
  const c = COPY[language] || COPY.en;
  const locale = LOCALE[language] || LOCALE.en;
  const now = useMemo(() => Date.now(), []);
  const [tab, setTab] = useState('risk');
  const [query, setQuery] = useState('');
  const [shown, setShown] = useState(20);
  const [open, setOpen] = useState(null);

  const curve = useMemo(() => vocabCurve(words, now), [words, now]);
  const buckets = useMemo(() => stabilityBuckets(words), [words]);
  const weeks = useMemo(() => accuracyByWeek(words, 8, now), [words, now]);
  const slots = useMemo(() => accuracyByTimeOfDay(words), [words]);
  const ranked = useMemo(() => rankWords(words, tab, now), [words, tab, now]);

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
              <li key={r.word.id}>
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

      {open && <WordSheet item={open} now={now} c={c} locale={locale} onClose={() => setOpen(null)} />}
    </>
  );
}
