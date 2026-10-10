import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame, Target, TrendingUp, TrendingDown, Brain, Trophy, BookOpen, Gauge, Lock, Lightbulb } from 'lucide-react';
import { usePacks } from '../../hooks/usePacks';
import { useGrammarStats } from '../../hooks/useGrammarStats';
import { useStreak } from '../../hooks/useStreak';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useStudentPlan } from '../../hooks/usePlan';
import { hasFeature } from '../../utils/plans';
import { grammarTopicCounts } from '../../data/grammarTopicCounts';
import { getDueWords } from '@voc/memory-engine';
import {
  dayKey, lastDays, weekCompare, activeDays, reviewForecast, stageCounts, weeklyGrowth, sourceRanking,
} from '../../utils/statsAnalytics';
import IosSpinner from '../../components/common/IosSpinner';
import ActivityHeatmap from '../../components/Stats/ActivityHeatmap';
import { PremiumModal } from '../../components/Plan/PlanBadge';
import './StatsPage.css';

const LOCALE = { uz: 'uz-UZ', ru: 'ru-RU', en: 'en-US' };
const LEECH_THRESHOLD = 3;

const COPY = {
  uz: {
    title: 'Statistika', loading: 'Yuklanmoqda...',
    goalToday: 'Bugungi maqsad', ofGoal: (n, g) => `${n} / ${g}`, goalDone: 'Maqsad bajarildi', goalLeft: (n) => `Yana ${n} ta qoldi`,
    streak: 'Ketma-ket kun', days: 'kun',
    words: "Jami so'zlar", mastered: "O'zlashtirilgan", due: 'Takrorlash kerak', avg: "O'rtacha daraja",
    activity: 'Faollik', last7: "So'nggi 7 kun", vsPrev: "o'tgan haftaga nisbatan", thisWeek: 'Bu hafta', activeDays30: (n) => `30 kunda ${n} kun faol`,
    heatmap: 'Faollik xaritasi',
    stages: "So'zlar bosqichlari", stageNew: 'Yangi', stageLearning: "O'rganilmoqda", stageReviewing: 'Takrorlanmoqda', stageMastered: "O'zlashtirilgan",
    forecast: 'Takrorlash prognozi', forecastSub: 'Kelgusi 7 kunda takrorlanadigan so\'zlar', today: 'Bugun', overdueNote: "Bugungi ustunda muddati o'tganlar ham bor",
    growth: "Yangi so'zlar", growthSub: "Haftalar bo'yicha (so'nggi 8 hafta)", perWeek: (n) => `${n} ta`,
    insights: 'Tahlil',
    insDue: (n) => `Hozir ${n} ta so'z takrorlashga tayyor. Ularni bugun takrorlash eslab qolishni saqlaydi.`,
    insDueNone: "Hozircha takrorlash kerak bo'lgan so'z yo'q. Yangi so'zlar qo'shish uchun yaxshi payt.",
    insWeekUp: (p) => `Bu hafta o'tgan haftaga qaraganda ${p}% faolroqsiz. Shunday davom eting.`,
    insWeekDown: (p) => `Bu hafta faollik o'tgan haftadan ${p}% past. Kuniga bir necha so'z ham yetarli.`,
    insWeekFlat: "Faollik o'tgan hafta bilan bir xil darajada.",
    insWeak: (name, avg) => `Eng zaif manba: "${name}" (o'rtacha ${avg}%). Unga ko'proq vaqt ajrating.`,
    insBusiest: (d) => `Eng faol kuningiz: ${d}.`,
    insLeech: (n) => `${n} ta qiyin so'z bor. Ularni alohida mashq qilish samaraliroq.`,
    hard: "Qiyin so'zlar", hardDesc: (n) => `Bu so'zlarda ${n} martadan ko'p xato qilingan`, hardWrong: (n) => `${n}x xato`, hardPractice: "Qiyin so'zlarni mashq qilish",
    sources: "Manbalar bo'yicha", wordsN: (n) => `${n} ta so'z`,
    grammar: 'Grammatika', attempts: 'Urinishlar', topics: 'Mavzular', accuracy: "To'g'rilik", levelBeginner: 'Boshlang\'ich', levelIntermediate: "O'rta", levelAdvanced: 'Yuqori',
    grammarEmpty: 'Grammatika testlari hali topshirilmagan.',
    empty: "Hali ma'lumot yo'q", emptyText: "So'zlar qo'shganingizda yoki mashq qilganingizda statistika shu yerda paydo bo'ladi.",
    premium: 'Premium', lockText: "Bu bo'lim Premium'da ochiladi", lockBtn: "Premium haqida",
  },
  ru: {
    title: 'Статистика', loading: 'Загрузка...',
    goalToday: 'Цель на сегодня', ofGoal: (n, g) => `${n} / ${g}`, goalDone: 'Цель выполнена', goalLeft: (n) => `Осталось ${n}`,
    streak: 'Дней подряд', days: 'дн.',
    words: 'Всего слов', mastered: 'Выучено', due: 'К повторению', avg: 'Средний уровень',
    activity: 'Активность', last7: 'Последние 7 дней', vsPrev: 'к прошлой неделе', thisWeek: 'Эта неделя', activeDays30: (n) => `Активен ${n} дн. из 30`,
    heatmap: 'Карта активности',
    stages: 'Стадии слов', stageNew: 'Новые', stageLearning: 'Изучаются', stageReviewing: 'Повторяются', stageMastered: 'Выучены',
    forecast: 'Прогноз повторений', forecastSub: 'Слова к повторению в ближайшие 7 дней', today: 'Сегодня', overdueNote: 'В столбце «Сегодня» есть и просроченные',
    growth: 'Новые слова', growthSub: 'По неделям (последние 8 недель)', perWeek: (n) => `${n}`,
    insights: 'Анализ',
    insDue: (n) => `Сейчас готовы к повторению ${n} слов. Повторите их сегодня, чтобы не забыть.`,
    insDueNone: 'Сейчас повторять нечего. Хорошее время добавить новые слова.',
    insWeekUp: (p) => `На этой неделе вы активнее прошлой на ${p}%. Так держать.`,
    insWeekDown: (p) => `Активность на ${p}% ниже прошлой недели. Даже несколько слов в день помогают.`,
    insWeekFlat: 'Активность на уровне прошлой недели.',
    insWeak: (name, avg) => `Слабее всего источник «${name}» (в среднем ${avg}%). Уделите ему больше времени.`,
    insBusiest: (d) => `Самый активный день: ${d}.`,
    insLeech: (n) => `Трудных слов: ${n}. Их лучше тренировать отдельно.`,
    hard: 'Трудные слова', hardDesc: (n) => `В этих словах больше ${n} ошибок`, hardWrong: (n) => `${n} ош.`, hardPractice: 'Тренировать трудные слова',
    sources: 'По источникам', wordsN: (n) => `${n} слов`,
    grammar: 'Грамматика', attempts: 'Попытки', topics: 'Темы', accuracy: 'Точность', levelBeginner: 'Начальный', levelIntermediate: 'Средний', levelAdvanced: 'Продвинутый',
    grammarEmpty: 'Тесты по грамматике ещё не пройдены.',
    empty: 'Пока нет данных', emptyText: 'Статистика появится здесь, когда вы добавите слова или начнёте тренироваться.',
    premium: 'Premium', lockText: 'Этот раздел открыт в Premium', lockBtn: 'О Premium',
  },
  en: {
    title: 'Statistics', loading: 'Loading...',
    goalToday: "Today's goal", ofGoal: (n, g) => `${n} / ${g}`, goalDone: 'Goal reached', goalLeft: (n) => `${n} to go`,
    streak: 'Day streak', days: 'days',
    words: 'Total words', mastered: 'Mastered', due: 'Due to review', avg: 'Average level',
    activity: 'Activity', last7: 'Last 7 days', vsPrev: 'vs last week', thisWeek: 'This week', activeDays30: (n) => `Active ${n} of the last 30 days`,
    heatmap: 'Activity map',
    stages: 'Word stages', stageNew: 'New', stageLearning: 'Learning', stageReviewing: 'Reviewing', stageMastered: 'Mastered',
    forecast: 'Review forecast', forecastSub: 'Words coming due in the next 7 days', today: 'Today', overdueNote: 'Today also includes overdue words',
    growth: 'New words', growthSub: 'Per week (last 8 weeks)', perWeek: (n) => `${n}`,
    insights: 'Insights',
    insDue: (n) => `${n} words are ready to review right now. Reviewing them today keeps them fresh.`,
    insDueNone: 'Nothing is due right now. A good moment to add new words.',
    insWeekUp: (p) => `You are ${p}% more active than last week. Keep it up.`,
    insWeekDown: (p) => `Activity is ${p}% below last week. Even a few words a day help.`,
    insWeekFlat: 'Activity is on par with last week.',
    insWeak: (name, avg) => `Weakest source: "${name}" (${avg}% on average). Give it more time.`,
    insBusiest: (d) => `Your busiest day: ${d}.`,
    insLeech: (n) => `${n} hard words. Drilling them on their own works best.`,
    hard: 'Hard words', hardDesc: (n) => `Missed more than ${n} times`, hardWrong: (n) => `${n}x wrong`, hardPractice: 'Practice hard words',
    sources: 'By source', wordsN: (n) => `${n} words`,
    grammar: 'Grammar', attempts: 'Attempts', topics: 'Topics', accuracy: 'Accuracy', levelBeginner: 'Beginner', levelIntermediate: 'Intermediate', levelAdvanced: 'Advanced',
    grammarEmpty: 'No grammar tests taken yet.',
    empty: 'No data yet', emptyText: 'Your statistics will show up here once you add words or start practicing.',
    premium: 'Premium', lockText: 'This section is part of Premium', lockBtn: 'About Premium',
  },
};

const STAGE_COLORS = { new: 'var(--text-muted)', learning: 'var(--warning)', reviewing: 'var(--accent-1)', mastered: 'var(--success)' };

function Ring({ value, max, size = 92, stroke = 9 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, max > 0 ? value / max : 0));
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="sp-ring" aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--bg-tertiary)" strokeWidth={stroke} />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--accent-1)" strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c * (1 - pct) }}
        transition={{ duration: 0.9, ease: 'easeOut' }} transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}

function Bars({ items, highlightFirst }) {
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <div className="sp-bars">
      {items.map((it, i) => (
        <div className="sp-bar-col" key={i}>
          <span className="sp-bar-val">{it.value > 0 ? it.value : ''}</span>
          <div className="sp-bar-track">
            <motion.div
              className={`sp-bar${it.accent || (highlightFirst && i === 0) ? ' is-accent' : ''}`}
              initial={{ height: 0 }} animate={{ height: `${(it.value / max) * 100}%` }}
              transition={{ duration: 0.55, delay: i * 0.04, ease: 'easeOut' }}
            />
          </div>
          <span className="sp-bar-label">{it.label}</span>
        </div>
      ))}
    </div>
  );
}

function Spark({ values }) {
  const w = 300; const h = 80; const pad = 6;
  const max = Math.max(...values, 1);
  const pts = values.map((v, i) => [pad + (i * (w - pad * 2)) / Math.max(values.length - 1, 1), h - pad - (v / max) * (h - pad * 2)]);
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)} ${h} L${pts[0][0].toFixed(1)} ${h} Z`;
  return (
    <svg className="sp-spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="sp-spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--accent-1)" stopOpacity="0.28" />
          <stop offset="1" stopColor="var(--accent-1)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#sp-spark-fill)" />
      <path d={line} fill="none" stroke="var(--accent-1)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r={i === pts.length - 1 ? 4 : 2.6} fill="var(--bg-secondary)" stroke="var(--accent-1)" strokeWidth="2" vectorEffect="non-scaling-stroke" />)}
    </svg>
  );
}

// Premium sections: shown as-is for Premium learners, blurred with a lock for everyone else.
function PremiumSection({ unlocked, c, onOpen, children }) {
  if (unlocked) return children;
  return (
    <div className="sp-locked">
      <div className="sp-locked-content" aria-hidden="true">{children}</div>
      <button type="button" className="sp-locked-overlay" onClick={onOpen}>
        <span className="sp-locked-icon"><Lock size={18} /></span>
        <span className="sp-locked-text">{c.lockText}</span>
        <span className="sp-locked-btn">{c.lockBtn}</span>
      </button>
    </div>
  );
}

export default function StatsPage() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const c = COPY[language] || COPY.en;
  const locale = LOCALE[language] || LOCALE.en;
  const { allWords, allWordsLoading: loading } = usePacks();
  const { stats: grammarStats, loading: grammarLoading } = useGrammarStats();
  const { streak } = useStreak();
  const { planId } = useStudentPlan(user?.uid);
  const unlocked = hasFeature(planId, 'insights');
  const [showPremium, setShowPremium] = useState(false);

  const log = streak?.activityLog;
  const dailyGoal = streak?.dailyGoal || 5;

  const a = useMemo(() => {
    const now = Date.now();
    const total = allWords.length;
    const stages = stageCounts(allWords);
    const dueNow = getDueWords(allWords).length;
    const avgMastery = total > 0 ? Math.round(allWords.reduce((s, w) => s + (w.mastery || 0), 0) / total) : 0;
    const week = lastDays(log, 7, now);
    const cmp = weekCompare(log, now);
    const sources = sourceRanking(allWords);
    const leech = allWords.filter((w) => (w.wrongCount || 0) >= LEECH_THRESHOLD).sort((x, y) => (y.wrongCount || 0) - (x.wrongCount || 0));
    const forecast = reviewForecast(allWords, 7, now);
    const growth = weeklyGrowth(allWords, 8, now);
    const busiest = lastDays(log, 30, now).reduce((best, d) => (d.count > (best?.count || 0) ? d : best), null);
    return { total, stages, dueNow, avgMastery, week, cmp, sources, leech, forecast, growth, busiest, today: Number(log?.[dayKey(now)]) || 0 };
  }, [allWords, log]);

  if (loading || grammarLoading) {
    return (
      <div className="sp-page">
        <h1 className="sp-title">{c.title}</h1>
        <div className="ios-activity-indicator" style={{ marginTop: 100 }}><IosSpinner /><span>{c.loading}</span></div>
      </div>
    );
  }

  const history = grammarStats?.history || [];
  if (a.total === 0 && history.length === 0) {
    return (
      <div className="sp-page">
        <h1 className="sp-title">{c.title}</h1>
        <div className="sp-card sp-empty"><BookOpen size={30} /><h3>{c.empty}</h3><p>{c.emptyText}</p></div>
      </div>
    );
  }

  const streakCount = streak?.streakCount || 0;
  const goalDone = a.today >= dailyGoal;
  const weekday = (d, style = 'short') => d.toLocaleDateString(locale, { weekday: style });

  // Written analysis (Premium)
  const tips = [];
  tips.push(a.dueNow > 0 ? c.insDue(a.dueNow) : c.insDueNone);
  if (a.cmp.change != null) tips.push(a.cmp.change > 5 ? c.insWeekUp(a.cmp.change) : a.cmp.change < -5 ? c.insWeekDown(Math.abs(a.cmp.change)) : c.insWeekFlat);
  const weakest = [...a.sources].filter((s) => s.count >= 5).sort((x, y) => x.avg - y.avg)[0];
  if (weakest && weakest.avg < 70) tips.push(c.insWeak(weakest.name, weakest.avg));
  if (a.busiest?.count > 0) tips.push(c.insBusiest(weekday(a.busiest.day, 'long')));
  if (a.leech.length > 0) tips.push(c.insLeech(a.leech.length));

  const stageItems = [
    ['new', c.stageNew], ['learning', c.stageLearning], ['reviewing', c.stageReviewing], ['mastered', c.stageMastered],
  ].map(([k, label]) => ({ key: k, label, count: a.stages[k], color: STAGE_COLORS[k] }));

  const topics = Object.entries(grammarStats?.topics || {}).filter(([id]) => !id.startsWith('de-')).map(([, t]) => t);
  const grammarAcc = topics.length > 0 ? Math.round(topics.reduce((s, t) => s + (t.bestScore / t.totalQuestions) * 100, 0) / topics.length) : 0;
  const levels = [
    ['beginner', c.levelBeginner], ['intermediate', c.levelIntermediate], ['advanced', c.levelAdvanced],
  ].map(([k, label]) => ({ k, label, total: grammarTopicCounts[k] || 0, done: topics.filter((t) => t.level === k).length })).filter((l) => l.total > 0);

  return (
    <div className="sp-page">
      <h1 className="sp-title">{c.title}</h1>

      {/* Today: goal ring + streak */}
      <div className="sp-hero">
        <div className="sp-card sp-goal">
          <div className="sp-ring-wrap">
            <Ring value={a.today} max={dailyGoal} />
            <span className="sp-ring-center"><Target size={22} /></span>
          </div>
          <div className="sp-goal-text">
            <span className="sp-label">{c.goalToday}</span>
            <strong className="sp-big">{c.ofGoal(a.today, dailyGoal)}</strong>
            <span className={`sp-sub${goalDone ? ' is-good' : ''}`}>{goalDone ? c.goalDone : c.goalLeft(dailyGoal - a.today)}</span>
          </div>
        </div>
        <div className="sp-card sp-streak">
          <span className="sp-streak-flame"><Flame size={26} /></span>
          <strong className="sp-big">{streakCount}</strong>
          <span className="sp-label">{c.streak}</span>
        </div>
      </div>

      {/* KPIs */}
      <div className="sp-kpis">
        {[
          [BookOpen, a.total, c.words, 'blue'], [Trophy, a.stages.mastered, c.mastered, 'green'],
          [Brain, a.dueNow, c.due, 'orange'], [Gauge, `${a.avgMastery}%`, c.avg, 'purple'],
        ].map(([Icon, value, label, tone]) => (
          <div className="sp-card sp-kpi" key={label}>
            <span className={`sp-kpi-icon tone-${tone}`}><Icon size={18} /></span>
            <strong className="sp-kpi-value">{value}</strong>
            <span className="sp-kpi-label">{label}</span>
          </div>
        ))}
      </div>

      {/* Activity: 7 days */}
      <section className="sp-card">
        <div className="sp-head">
          <div><h2>{c.activity}</h2><p>{c.last7}</p></div>
          {a.cmp.change != null && (
            <span className={`sp-chip ${a.cmp.change >= 0 ? 'is-up' : 'is-down'}`}>
              {a.cmp.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {a.cmp.change > 0 ? '+' : ''}{a.cmp.change}%
            </span>
          )}
        </div>
        <Bars items={a.week.map((d) => ({ value: d.count, label: weekday(d.day), accent: d.isToday }))} />
        <p className="sp-foot">{c.activeDays30(activeDays(log, 30))}</p>
      </section>

      <section className="sp-card">
        <div className="sp-head"><div><h2>{c.heatmap}</h2></div></div>
        {streak && <ActivityHeatmap activityLog={streak.activityLog} dailyGoal={dailyGoal} />}
      </section>

      {/* Stages */}
      <section className="sp-card">
        <div className="sp-head"><div><h2>{c.stages}</h2></div></div>
        <div className="sp-stack" role="img" aria-label={c.stages}>
          {stageItems.map((s) => s.count > 0 && (
            <motion.span key={s.key} className="sp-stack-seg" style={{ background: s.color }} initial={{ flexGrow: 0 }} animate={{ flexGrow: s.count }} transition={{ duration: 0.7 }} />
          ))}
        </div>
        <div className="sp-legend">
          {stageItems.map((s) => (
            <div className="sp-legend-item" key={s.key}>
              <span className="sp-dot" style={{ background: s.color }} />
              <span className="sp-legend-label">{s.label}</span>
              <strong>{s.count}</strong>
            </div>
          ))}
        </div>
      </section>

      {/* Premium: forecast + growth + analysis */}
      <PremiumSection unlocked={unlocked} c={c} onOpen={() => setShowPremium(true)}>
        <div className="sp-premium-group">
          <section className="sp-card">
            <div className="sp-head">
              <div><h2>{c.forecast}</h2><p>{c.forecastSub}</p></div>
              <span className="sp-tag">{c.premium}</span>
            </div>
            <Bars items={a.forecast.map((d, i) => ({ value: d.count, label: i === 0 ? c.today : weekday(d.day), accent: i === 0 }))} />
            <p className="sp-foot">{c.overdueNote}</p>
          </section>

          <section className="sp-card">
            <div className="sp-head">
              <div><h2>{c.growth}</h2><p>{c.growthSub}</p></div>
              <span className="sp-tag">{c.premium}</span>
            </div>
            <Spark values={a.growth.map((w) => w.count)} />
            <div className="sp-spark-axis">
              <span>{a.growth[0].start.toLocaleDateString(locale, { day: 'numeric', month: 'short' })}</span>
              <span>{c.perWeek(a.growth[a.growth.length - 1].count)}</span>
            </div>
          </section>

          <section className="sp-card">
            <div className="sp-head">
              <div><h2>{c.insights}</h2></div>
              <span className="sp-tag">{c.premium}</span>
            </div>
            <ul className="sp-tips">
              {tips.map((t, i) => <li key={i}><span className="sp-tip-icon"><Lightbulb size={16} /></span><span>{t}</span></li>)}
            </ul>
          </section>
        </div>
      </PremiumSection>

      {/* Hard words */}
      {a.leech.length > 0 && (
        <section className="sp-card">
          <div className="sp-head"><div><h2>{c.hard}</h2><p>{c.hardDesc(LEECH_THRESHOLD)}</p></div></div>
          <ul className="sp-list">
            {a.leech.slice(0, 6).map((w) => (
              <li key={w.id}>
                <span className="sp-list-icon">{w.sourceIcon}</span>
                <span className="sp-list-main"><strong>{w.word}</strong><small>{w.translation}</small></span>
                <span className="sp-pill is-bad">{c.hardWrong(w.wrongCount)}</span>
              </li>
            ))}
          </ul>
          <Link to="/mixed-practice?filter=leech" className="btn btn-primary sp-cta">{c.hardPractice}</Link>
        </section>
      )}

      {/* Sources */}
      {a.sources.length > 0 && (
        <section className="sp-card">
          <div className="sp-head"><div><h2>{c.sources}</h2></div></div>
          <ul className="sp-list">
            {a.sources.slice(0, 8).map((s) => (
              <li key={s.name}>
                <span className="sp-list-icon">{s.icon}</span>
                <span className="sp-list-main">
                  <strong>{s.name}</strong>
                  <small>{c.wordsN(s.count)}</small>
                </span>
                <span className="sp-meter"><span style={{ width: `${s.avg}%` }} /></span>
                <span className="sp-meter-val">{s.avg}%</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Grammar */}
      <section className="sp-card">
        <div className="sp-head"><div><h2>{c.grammar}</h2></div></div>
        {history.length > 0 ? (
          <>
            <div className="sp-mini-kpis">
              <div><strong>{history.length}</strong><span>{c.attempts}</span></div>
              <div><strong>{topics.length}</strong><span>{c.topics}</span></div>
              <div><strong>{grammarAcc}%</strong><span>{c.accuracy}</span></div>
            </div>
            <ul className="sp-levels">
              {levels.map((l) => (
                <li key={l.k}>
                  <div className="sp-level-row"><span>{l.label}</span><span>{l.done} / {l.total}</span></div>
                  <span className="sp-meter is-wide"><span style={{ width: `${(l.done / l.total) * 100}%` }} /></span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="sp-foot">{c.grammarEmpty}</p>
        )}
      </section>

      {showPremium && <PremiumModal onClose={() => setShowPremium(false)} />}
    </div>
  );
}
