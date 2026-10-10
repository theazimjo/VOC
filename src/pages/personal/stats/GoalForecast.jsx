import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Flag } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { goalForecast } from '../../../utils/statsAnalytics';

const LOCALE = { uz: 'uz-UZ', ru: 'ru-RU', en: 'en-US' };
const STORE = 'voc-goal-target';

const COPY = {
  uz: {
    title: 'Maqsad prognozi', sub: "Hozirgi tempingiz bilan maqsadga qachon yetishingiz",
    all: (n) => `Barcha so'zlarim (${n})`, custom: "Boshqa son...", started: (a, b) => `${a} / ${b} ta so'z boshlandi`,
    pace: (n) => `Tempingiz: haftasiga ${n} ta yangi so'z (so'nggi 4 hafta)`, noPace: "Hali tempni hisoblab bo'lmaydi: so'nggi 4 haftada yangi so'z boshlanmagan.",
    done: "Maqsadga yetdingiz! Yangi so'zlar qo'shib, maqsadni oshiring.",
    now: 'Hozirgi temp', plus2: "Kuniga +2 so'z", plus5: "Kuniga +5 so'z", never: '–', weeks: (n) => `${n} hafta`, inWeeks: (n) => (n < 1 ? '1 haftadan kam' : `~${Math.round(n)} hafta`),
    hint: "Tezroq: kuniga bir necha yangi so'z qo'shing va mashq qiling.",
  },
  ru: {
    title: 'Прогноз цели', sub: 'Когда вы достигнете цели в текущем темпе',
    all: (n) => `Все мои слова (${n})`, custom: 'Другое число...', started: (a, b) => `Начато слов: ${a} / ${b}`,
    pace: (n) => `Ваш темп: ${n} новых слов в неделю (последние 4 недели)`, noPace: 'Темп пока не посчитать: за 4 недели не начато новых слов.',
    done: 'Цель достигнута! Добавьте новые слова и поднимите планку.',
    now: 'Текущий темп', plus2: '+2 слова в день', plus5: '+5 слов в день', never: '–', weeks: (n) => `${n} нед.`, inWeeks: (n) => (n < 1 ? 'меньше недели' : `~${Math.round(n)} нед.`),
    hint: 'Быстрее: добавляйте несколько новых слов в день и тренируйтесь.',
  },
  en: {
    title: 'Goal forecast', sub: 'When you will reach your goal at your current pace',
    all: (n) => `All my words (${n})`, custom: 'Other number...', started: (a, b) => `${a} / ${b} words started`,
    pace: (n) => `Your pace: ${n} new words a week (last 4 weeks)`, noPace: 'Pace cannot be measured yet: no new words were started in the last 4 weeks.',
    done: 'Goal reached! Add new words and raise the bar.',
    now: 'Current pace', plus2: '+2 words a day', plus5: '+5 words a day', never: '–', weeks: (n) => `${n} wk`, inWeeks: (n) => (n < 1 ? 'under a week' : `~${Math.round(n)} wk`),
    hint: 'To go faster: add a few new words a day and practice them.',
  },
};

function readTarget() {
  try {
    const raw = localStorage.getItem(STORE);
    if (!raw || raw === 'all') return 'all';
    const n = parseInt(raw, 10);
    return Number.isFinite(n) && n > 0 ? n : 'all';
  } catch { return 'all'; }
}

export default function GoalForecast({ words, tag }) {
  const { language } = useLanguage();
  const c = COPY[language] || COPY.en;
  const locale = LOCALE[language] || LOCALE.en;
  const [target, setTargetState] = useState(readTarget);
  const [draft, setDraft] = useState(() => (readTarget() === 'all' ? '' : String(readTarget())));
  const total = words.length;
  const targetNum = target === 'all' ? total : target;
  const f = useMemo(() => goalForecast(words, targetNum), [words, targetNum]);

  const save = (value) => {
    setTargetState(value);
    try { localStorage.setItem(STORE, String(value)); } catch { /* storage unavailable */ }
  };
  const pct = f.target > 0 ? Math.min(100, Math.round((f.started / f.target) * 100)) : 0;
  const fmtDate = (t) => new Date(t).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
  const labels = { now: c.now, plus2: c.plus2, plus5: c.plus5 };

  return (
    <section className="sp-card">
      <div className="sp-head"><div><h2>{c.title}</h2><p>{c.sub}</p></div>{tag}</div>

      <div className="mi-tabs mi-goal-tabs" role="tablist">
        <button type="button" role="tab" aria-selected={target === 'all'} className={target === 'all' ? 'is-on' : ''} onClick={() => { save('all'); setDraft(''); }}>{c.all(total)}</button>
        <label className={`mi-goal-custom${target !== 'all' ? ' is-on' : ''}`}>
          <input
            type="number" inputMode="numeric" min="1" placeholder={c.custom} value={draft}
            onChange={(e) => { setDraft(e.target.value); const n = parseInt(e.target.value, 10); if (n > 0) save(n); }}
          />
        </label>
      </div>

      <div className="mi-goal-progress">
        <div className="mi-goal-row"><span><Flag size={15} /> {c.started(f.started, f.target)}</span><b>{pct}%</b></div>
        <span className="mi-bar"><motion.i initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.7 }} /></span>
      </div>

      {f.remaining === 0 ? (
        <p className="mi-advice">{c.done}</p>
      ) : (
        <>
          <p className="sp-foot mi-goal-pace">{f.pace > 0 ? c.pace(f.pace) : c.noPace}</p>
          <div className="mi-scen">
            {f.scenarios.map((s) => (
              <div key={s.key} className={`mi-scen-card${s.key === 'now' ? ' is-main' : ''}`}>
                <span className="mi-scen-label">{labels[s.key]}</span>
                <strong>{s.date ? c.inWeeks(s.weeks) : c.never}</strong>
                <small>{s.date ? fmtDate(s.date) : ''}</small>
              </div>
            ))}
          </div>
          <p className="sp-foot">{c.hint}</p>
        </>
      )}
    </section>
  );
}
