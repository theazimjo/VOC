import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame, Target, TrendingUp, TrendingDown, BookOpen, Lock, Lightbulb, Play, CheckCircle2 } from 'lucide-react';
import { usePacks } from '../../hooks/usePacks';
import { useGrammarStats } from '../../hooks/useGrammarStats';
import { useStreak } from '../../hooks/useStreak';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useStudentPlan } from '../../hooks/usePlan';
import { hasFeature } from '../../utils/plans';
import { grammarTopicCounts } from '../../data/grammarTopicCounts';
import {
  dayKey, lastDays, dueSplit, reviewForecast, stageCounts, weeklyGrowth, sourceRanking, activityByDay, streakRuns, heatmapWeeks,
} from '../../utils/statsAnalytics';
import IosSpinner from '../../components/common/IosSpinner';
import { PremiumModal } from '../../components/Plan/PlanBadge';
import MemoryInsights from './stats/MemoryInsights';
import './StatsPage.css';

const LOCALE = { uz: 'uz-UZ', ru: 'ru-RU', en: 'en-US' };
const LEECH_THRESHOLD = 3;

const COPY = {
  uz: {
    title: 'Statistika', loading: 'Yuklanmoqda...',
    dueTitle: (n) => `${n} ta so'zni takrorlash vaqti keldi`, newLine: (n) => `Yana ${n} ta yangi so'z hali boshlanmagan.`, newTitle: (n) => `${n} ta yangi so'z boshlashni kutyapti`, newStart: "Yangi so'zlarni boshlash", dueSub: "Muddati kelgan so'zlarni takrorlasangiz, ular esdan chiqmaydi.", dueStart: 'Takrorlashni boshlash',
    dueNone: "Hozir takrorlash kerak so'z yo'q", dueNoneSub: "Yangi so'zlar qo'shish yoki mashq qilish uchun yaxshi payt.", dueLibrary: "Kutubxonaga o'tish",
    goalToday: 'Bugungi maqsad', ofGoal: (n, g) => `${n} / ${g}`, goalDone: 'Bajarildi', goalLeft: (n) => `Yana ${n} ta`, goalHint: "Mashq qilingan so'zlar soni",
    streak: 'Ketma-ket kun',
    vocab: "So'z boyligingiz", vocabLine: (total, good) => `${total} ta so'zdan ${good} tasini yaxshi bilasiz`,
    stageNew: 'Yangi', stageNewD: "Hali mashq qilinmagan",
    stageLearning: "O'rganilmoqda", stageLearningD: "Endi eslab qolyapsiz",
    stageReviewing: 'Mustahkamlanmoqda', stageReviewingD: "Ko'pincha eslaysiz",
    stageMastered: 'Yaxshi bilasiz', stageMasteredD: 'Xotirada mustahkam',
    activity: 'Faollik', activitySub: "Har kuni takrorlangan so'zlar soni", weekTotal: (n) => `Bu hafta ${n} ta so'z takrorlandi`, weekNone: "Bu hafta hali mashq qilinmadi", vsPrev: "o'tgan haftaga nisbatan",
    mapTitle: "So'nggi 20 hafta", mapSummary: (days, best) => `${days} kun faol, eng uzun seriya: ${best} kun`, mapDay: (d, n) => (n > 0 ? `${d}: ${n} ta so'z` : `${d}: mashq yo'q`), mapLess: 'Kam', mapMore: "Ko'p",
    forecast: 'Takrorlash prognozi', forecastSub: "Qaysi kuni nechta so'z takrorlashga keladi", today: 'Bugun', overdueNote: "Bugun: muddati o'tib ketgan so'zlar ham shu yerda",
    growth: "Qo'shilgan so'zlar", growthSub: "Haftasiga nechta yangi so'z qo'shdingiz",
    insights: 'Maslahatlar',
    insDue: (n) => `${n} ta so'zning takrorlash vaqti keldi. Bugun takrorlash eslab qolishni saqlaydi.`,
    insNew: (n) => `${n} ta yangi so'z hali mashq qilinmagan. Kuniga bir nechtasini boshlang.`,
    insWeekUp: (p) => `Bu hafta o'tgan haftadan ${p}% faolroqsiz. Shunday davom eting.`,
    insWeekDown: (p) => `Bu hafta faollik o'tgan haftadan ${p}% past. Kuniga bir necha so'z ham yetarli.`,
    insWeak: (name, avg) => `Eng zaif manba: "${name}" (o'rtacha ${avg}%). Unga ko'proq vaqt ajrating.`,
    insBusiest: (d) => `Eng faol kuningiz: ${d}.`,
    insLeech: (n) => `${n} ta qiyin so'z bor. Ularni alohida mashq qilish samaraliroq.`,
    hard: "Qiyin so'zlar", hardDesc: (n) => `Bu so'zlarda ${n} martadan ko'p xato qilingan`, hardWrong: (n) => `${n} xato`, hardPractice: "Qiyin so'zlarni mashq qilish",
    sources: "Packlar bo'yicha", sourcesSub: "Har bir packdagi so'zlarni qanchalik bilasiz", wordsN: (n) => `${n} ta so'z`,
    grammar: 'Grammatika', attempts: 'Urinishlar', topics: 'Mavzular', accuracy: "To'g'rilik", levelBeginner: "Boshlang'ich", levelIntermediate: "O'rta", levelAdvanced: 'Yuqori',
    grammarEmpty: 'Grammatika testlari hali topshirilmagan.',
    empty: "Hali ma'lumot yo'q", emptyText: "So'zlar qo'shganingizda yoki mashq qilganingizda statistika shu yerda paydo bo'ladi.",
    premium: 'Premium', lockText: "Bu bo'lim Premium'da ochiladi", lockBtn: 'Premium haqida',
  },
  ru: {
    title: 'Статистика', loading: 'Загрузка...',
    dueTitle: (n) => `Пора повторить слов: ${n}`, newLine: (n) => `Ещё ${n} новых слов не начато.`, newTitle: (n) => `Новых слов ждут начала: ${n}`, newStart: 'Начать новые слова', dueSub: 'Повторяйте слова вовремя, и они не забудутся.', dueStart: 'Начать повторение',
    dueNone: 'Сейчас повторять нечего', dueNoneSub: 'Хорошее время добавить слова или потренироваться.', dueLibrary: 'В библиотеку',
    goalToday: 'Цель на сегодня', ofGoal: (n, g) => `${n} / ${g}`, goalDone: 'Выполнено', goalLeft: (n) => `Ещё ${n}`, goalHint: 'Количество слов в тренировках',
    streak: 'Дней подряд',
    vocab: 'Ваш словарный запас', vocabLine: (total, good) => `Из ${total} слов вы хорошо знаете ${good}`,
    stageNew: 'Новые', stageNewD: 'Ещё не тренировались',
    stageLearning: 'Изучаются', stageLearningD: 'Начинаете запоминать',
    stageReviewing: 'Закрепляются', stageReviewingD: 'Чаще всего помните',
    stageMastered: 'Знаете хорошо', stageMasteredD: 'Прочно в памяти',
    activity: 'Активность', activitySub: 'Сколько слов повторено по дням', weekTotal: (n) => `На этой неделе повторено слов: ${n}`, weekNone: 'На этой неделе ещё не тренировались', vsPrev: 'к прошлой неделе',
    mapTitle: 'Последние 20 недель', mapSummary: (days, best) => `Активных дней: ${days}, лучшая серия: ${best}`, mapDay: (d, n) => (n > 0 ? `${d}: слов ${n}` : `${d}: без тренировок`), mapLess: 'Меньше', mapMore: 'Больше',
    forecast: 'Прогноз повторений', forecastSub: 'Сколько слов придёт на повторение по дням', today: 'Сегодня', overdueNote: 'В «Сегодня» входят и просроченные слова',
    growth: 'Добавленные слова', growthSub: 'Сколько новых слов вы добавляли каждую неделю',
    insights: 'Советы',
    insDue: (n) => `Пора повторить слов: ${n}. Повторите их сегодня, чтобы не забыть.`,
    insNew: (n) => `Новых слов без тренировок: ${n}. Начинайте по несколько в день.`,
    insWeekUp: (p) => `На этой неделе вы активнее прошлой на ${p}%. Так держать.`,
    insWeekDown: (p) => `Активность на ${p}% ниже прошлой недели. Даже несколько слов в день помогают.`,
    insWeak: (name, avg) => `Слабее всего пак «${name}» (в среднем ${avg}%). Уделите ему больше времени.`,
    insBusiest: (d) => `Самый активный день: ${d}.`,
    insLeech: (n) => `Трудных слов: ${n}. Их лучше тренировать отдельно.`,
    hard: 'Трудные слова', hardDesc: (n) => `В этих словах больше ${n} ошибок`, hardWrong: (n) => `${n} ош.`, hardPractice: 'Тренировать трудные слова',
    sources: 'По пакам', sourcesSub: 'Насколько хорошо вы знаете слова каждого пака', wordsN: (n) => `${n} слов`,
    grammar: 'Грамматика', attempts: 'Попытки', topics: 'Темы', accuracy: 'Точность', levelBeginner: 'Начальный', levelIntermediate: 'Средний', levelAdvanced: 'Продвинутый',
    grammarEmpty: 'Тесты по грамматике ещё не пройдены.',
    empty: 'Пока нет данных', emptyText: 'Статистика появится здесь, когда вы добавите слова или начнёте тренироваться.',
    premium: 'Premium', lockText: 'Этот раздел открыт в Premium', lockBtn: 'О Premium',
  },
  en: {
    title: 'Statistics', loading: 'Loading...',
    dueTitle: (n) => `${n} words are due for review`, newLine: (n) => `${n} more new words have not been started yet.`, newTitle: (n) => `${n} new words are waiting to be started`, newStart: 'Start new words', dueSub: 'Reviewing words when they are due keeps them from fading.', dueStart: 'Start reviewing',
    dueNone: 'Nothing to review right now', dueNoneSub: 'A good moment to add words or practice.', dueLibrary: 'Go to Library',
    goalToday: "Today's goal", ofGoal: (n, g) => `${n} / ${g}`, goalDone: 'Done', goalLeft: (n) => `${n} more`, goalHint: 'Words practiced today',
    streak: 'Day streak',
    vocab: 'Your vocabulary', vocabLine: (total, good) => `You know ${good} of your ${total} words well`,
    stageNew: 'New', stageNewD: 'Not practiced yet',
    stageLearning: 'Learning', stageLearningD: 'Starting to stick',
    stageReviewing: 'Strengthening', stageReviewingD: 'You usually remember',
    stageMastered: 'Know well', stageMasteredD: 'Solid in memory',
    activity: 'Activity', activitySub: 'Words reviewed each day', weekTotal: (n) => `${n} words reviewed this week`, weekNone: 'No practice yet this week', vsPrev: 'vs last week',
    mapTitle: 'Last 20 weeks', mapSummary: (days, best) => `${days} active days, longest streak: ${best}`, mapDay: (d, n) => (n > 0 ? `${d}: ${n} words` : `${d}: no practice`), mapLess: 'Less', mapMore: 'More',
    forecast: 'Review forecast', forecastSub: 'How many words come due on each day', today: 'Today', overdueNote: 'Today also includes overdue words',
    growth: 'Words added', growthSub: 'How many new words you added each week',
    insights: 'Tips',
    insDue: (n) => `${n} words are due for review. Reviewing them today keeps them fresh.`,
    insNew: (n) => `${n} new words have not been practiced yet. Start a few each day.`,
    insWeekUp: (p) => `You are ${p}% more active than last week. Keep it up.`,
    insWeekDown: (p) => `Activity is ${p}% below last week. Even a few words a day help.`,
    insWeak: (name, avg) => `Weakest pack: "${name}" (${avg}% on average). Give it more time.`,
    insBusiest: (d) => `Your busiest day: ${d}.`,
    insLeech: (n) => `${n} hard words. Drilling them on their own works best.`,
    hard: 'Hard words', hardDesc: (n) => `Missed more than ${n} times`, hardWrong: (n) => `${n} misses`, hardPractice: 'Practice hard words',
    sources: 'By pack', sourcesSub: 'How well you know the words of each pack', wordsN: (n) => `${n} words`,
    grammar: 'Grammar', attempts: 'Attempts', topics: 'Topics', accuracy: 'Accuracy', levelBeginner: 'Beginner', levelIntermediate: 'Intermediate', levelAdvanced: 'Advanced',
    grammarEmpty: 'No grammar tests taken yet.',
    empty: 'No data yet', emptyText: 'Your statistics will show up here once you add words or start practicing.',
    premium: 'Premium', lockText: 'This section is part of Premium', lockBtn: 'About Premium',
  },
};

const STAGE_COLORS = { new: 'var(--text-muted)', learning: 'var(--warning)', reviewing: 'var(--accent-1)', mastered: 'var(--success)' };

function Ring({ value, max, size = 72, stroke = 8 }) {
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

function Bars({ items }) {
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <div className="sp-bars">
      {items.map((it, i) => (
        <div className="sp-bar-col" key={i}>
          <span className="sp-bar-val">{it.value > 0 ? it.value : ''}</span>
          <div className="sp-bar-track">
            <motion.div
              className={`sp-bar${it.accent ? ' is-accent' : ''}`}
              initial={{ height: 0 }} animate={{ height: it.value > 0 ? `${(it.value / max) * 100}%` : 0 }}
              transition={{ duration: 0.55, delay: i * 0.04, ease: 'easeOut' }}
            />
          </div>
          <span className="sp-bar-label">{it.label}</span>
        </div>
      ))}
    </div>
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

function ActivityMap({ byDay, c, locale }) {
  const weeks = useMemo(() => heatmapWeeks(byDay, 20), [byDay]);
  const runs = useMemo(() => streakRuns(byDay), [byDay]);
  const activeCount = useMemo(() => weeks.reduce((s, w) => s + w.days.filter((d) => d && d.count > 0).length, 0), [weeks]);
  const [picked, setPicked] = useState(null);
  const fmt = (d) => d.day.toLocaleDateString(locale, { day: 'numeric', month: 'long' });
  // a month label above the first week that starts in a new month
  let lastLabelAt = -10;
  const monthLabels = weeks.map((w, i) => {
    const m = w.start.getMonth();
    const prev = i > 0 ? weeks[i - 1].start.getMonth() : -1;
    if (m === prev || i - lastLabelAt < 4) return '';
    lastLabelAt = i;
    return w.start.toLocaleDateString(locale, { month: 'short' });
  });
  return (
    <div className="sp-map">
      <p className="sp-map-summary">{c.mapSummary(activeCount, runs.longest)}</p>
      <div className="sp-map-scroll">
        <div className="sp-map-months" style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}>
          {monthLabels.map((m, i) => <span key={i}>{m}</span>)}
        </div>
        <div className="sp-map-grid" style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}>
          {weeks.map((w, wi) => (
            <div className="sp-map-week" key={wi}>
              {w.days.map((d, di) => (d ? (
                <button
                  type="button" key={di} title={c.mapDay(fmt(d), d.count)} aria-label={c.mapDay(fmt(d), d.count)}
                  className={`sp-cell level-${d.level}${d.isToday ? ' is-today' : ''}${picked?.date === d.date ? ' is-picked' : ''}`}
                  onClick={() => setPicked(picked?.date === d.date ? null : d)}
                />
              ) : <span key={di} className="sp-cell is-future" />))}
            </div>
          ))}
        </div>
      </div>
      <div className="sp-map-foot">
        <span className="sp-map-picked">{picked ? c.mapDay(fmt(picked), picked.count) : ''}</span>
        <span className="sp-map-legend">
          {c.mapLess}
          {[0, 1, 2, 3, 4].map((l) => <i key={l} className={`sp-cell level-${l}`} />)}
          {c.mapMore}
        </span>
      </div>
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
    const { due: dueNow, fresh: freshCount } = dueSplit(allWords, now);
    const byDay = activityByDay(allWords, log);
    const week = lastDays(byDay, 7, now);
    const prevWeek = lastDays(byDay, 14, now).slice(0, 7);
    const cur = week.reduce((s, d) => s + d.count, 0);
    const prev = prevWeek.reduce((s, d) => s + d.count, 0);
    const change = prev >= 5 ? Math.max(-100, Math.min(300, Math.round(((cur - prev) / prev) * 100))) : null; // tiny bases make percentages meaningless
    const sources = sourceRanking(allWords);
    const leech = allWords.filter((w) => (w.wrongCount || 0) >= LEECH_THRESHOLD).sort((x, y) => (y.wrongCount || 0) - (x.wrongCount || 0));
    const forecast = reviewForecast(allWords, 7, now);
    const growth = weeklyGrowth(allWords, 8, now);
    const busiest = lastDays(byDay, 30, now).reduce((best, d) => (d.count > (best?.count || 0) ? d : best), null);
    return { total, stages, dueNow, freshCount, byDay, week, cur, change, sources, leech, forecast, growth, busiest, today: Math.max(Number(log?.[dayKey(now)]) || 0, byDay[dayKey(now)] || 0) };
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

  const tips = [];
  if (a.dueNow > 0) tips.push(c.insDue(a.dueNow));
  if (a.freshCount > 0) tips.push(c.insNew(a.freshCount));
  if (a.change != null && Math.abs(a.change) > 5) tips.push(a.change > 0 ? c.insWeekUp(a.change) : c.insWeekDown(Math.abs(a.change)));
  const weakest = [...a.sources].filter((s) => s.count >= 5).sort((x, y) => x.avg - y.avg)[0];
  if (weakest && weakest.avg < 70) tips.push(c.insWeak(weakest.name, weakest.avg));
  if (a.busiest?.count > 0) tips.push(c.insBusiest(weekday(a.busiest.day, 'long')));
  if (a.leech.length > 0) tips.push(c.insLeech(a.leech.length));

  const stageItems = [
    ['new', c.stageNew, c.stageNewD], ['learning', c.stageLearning, c.stageLearningD],
    ['reviewing', c.stageReviewing, c.stageReviewingD], ['mastered', c.stageMastered, c.stageMasteredD],
  ].map(([k, label, desc]) => ({ key: k, label, desc, count: a.stages[k], color: STAGE_COLORS[k] }));

  const topics = Object.entries(grammarStats?.topics || {}).filter(([id]) => !id.startsWith('de-')).map(([, t]) => t);
  const grammarAcc = topics.length > 0 ? Math.round(topics.reduce((s, t) => s + (t.bestScore / t.totalQuestions) * 100, 0) / topics.length) : 0;
  const levels = [
    ['beginner', c.levelBeginner], ['intermediate', c.levelIntermediate], ['advanced', c.levelAdvanced],
  ].map(([k, label]) => ({ k, label, total: grammarTopicCounts[k] || 0, done: topics.filter((t) => t.level === k).length })).filter((l) => l.total > 0);

  return (
    <div className="sp-page">
      <h1 className="sp-title">{c.title}</h1>

      {/* What to do today */}
      <section className="sp-card sp-today">
        <div className="sp-today-main">
          {a.dueNow > 0 ? (
            <>
              <h2>{c.dueTitle(a.dueNow)}</h2>
              <p>{c.dueSub}{a.freshCount > 0 ? ` ${c.newLine(a.freshCount)}` : ''}</p>
              <Link to="/mixed-practice?filter=due" className="btn btn-primary sp-cta-inline"><Play size={16} /> {c.dueStart}</Link>
            </>
          ) : a.freshCount > 0 ? (
            <>
              <h2 className="is-done"><CheckCircle2 size={22} /> {c.dueNone}</h2>
              <p>{c.newTitle(a.freshCount)}</p>
              <Link to="/mixed-practice?filter=due" className="btn btn-primary sp-cta-inline"><Play size={16} /> {c.newStart}</Link>
            </>
          ) : (
            <>
              <h2 className="is-done"><CheckCircle2 size={22} /> {c.dueNone}</h2>
              <p>{c.dueNoneSub}</p>
              <Link to="/library" className="btn btn-ghost sp-cta-inline">{c.dueLibrary}</Link>
            </>
          )}
        </div>
        <div className="sp-today-side">
          <div className="sp-goal">
            <div className="sp-ring-wrap">
              <Ring value={a.today} max={dailyGoal} />
              <span className="sp-ring-center"><Target size={18} /></span>
            </div>
            <div className="sp-goal-text">
              <span className="sp-label">{c.goalToday}</span>
              <strong>{c.ofGoal(a.today, dailyGoal)}</strong>
              <span className={`sp-sub${goalDone ? ' is-good' : ''}`}>{goalDone ? c.goalDone : c.goalLeft(dailyGoal - a.today)}</span>
            </div>
          </div>
          <div className="sp-streak">
            <span className="sp-streak-flame"><Flame size={22} /></span>
            <div className="sp-goal-text">
              <strong>{streakCount}</strong>
              <span className="sp-label">{c.streak}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Vocabulary */}
      <section className="sp-card">
        <div className="sp-head"><div><h2>{c.vocab}</h2><p>{c.vocabLine(a.total, a.stages.mastered)}</p></div></div>
        <div className="sp-stack" role="img" aria-label={c.vocab}>
          {stageItems.map((s) => s.count > 0 && (
            <motion.span key={s.key} className="sp-stack-seg" style={{ background: s.color }} initial={{ flexGrow: 0 }} animate={{ flexGrow: s.count }} transition={{ duration: 0.7 }} />
          ))}
        </div>
        <ul className="sp-stages">
          {stageItems.map((s) => (
            <li key={s.key}>
              <span className="sp-dot" style={{ background: s.color }} />
              <span className="sp-stage-text"><strong>{s.label}</strong><small>{s.desc}</small></span>
              <span className="sp-stage-count">{s.count}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Activity */}
      <section className="sp-card">
        <div className="sp-head">
          <div>
            <h2>{c.activity}</h2>
            <p>{a.cur > 0 ? c.weekTotal(a.cur) : c.weekNone}</p>
          </div>
          {a.change != null && (
            <span className={`sp-chip ${a.change >= 0 ? 'is-up' : 'is-down'}`} title={c.vsPrev}>
              {a.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {a.change > 0 ? '+' : ''}{a.change}%{a.change >= 300 ? '+' : ''}
            </span>
          )}
        </div>
        <Bars items={a.week.map((d) => ({ value: d.count, label: weekday(d.day), accent: d.isToday }))} />
        <div className="sp-divider" />
        <div className="sp-head sp-head-tight"><div><h2 className="sp-h-sm">{c.mapTitle}</h2></div></div>
        <ActivityMap byDay={a.byDay} c={c} locale={locale} />
      </section>

      {/* Premium: forecast + growth + tips */}
      <PremiumSection unlocked={unlocked} c={c} onOpen={() => setShowPremium(true)}>
        <div className="sp-premium-group">
          <MemoryInsights words={allWords} tag={<span className="sp-tag">{c.premium}</span>} />

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
            <Bars items={a.growth.map((w, i) => ({ value: w.count, label: w.start.toLocaleDateString(locale, { day: 'numeric', month: 'short' }), accent: i === a.growth.length - 1 }))} />
          </section>

          {tips.length > 0 && (
            <section className="sp-card">
              <div className="sp-head">
                <div><h2>{c.insights}</h2></div>
                <span className="sp-tag">{c.premium}</span>
              </div>
              <ul className="sp-tips">
                {tips.map((t, i) => <li key={i}><span className="sp-tip-icon"><Lightbulb size={16} /></span><span>{t}</span></li>)}
              </ul>
            </section>
          )}
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

      {/* Packs */}
      {a.sources.length > 0 && (
        <section className="sp-card">
          <div className="sp-head"><div><h2>{c.sources}</h2><p>{c.sourcesSub}</p></div></div>
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
