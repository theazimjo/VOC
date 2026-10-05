import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const MONO = "ui-monospace, 'SF Mono', Menlo, monospace";
const CHART = {
  line: '#0a84ff',
  tick: { fontSize: 10, fill: '#71717a', fontFamily: MONO },
  tooltip: { borderRadius: 4, border: '1px solid var(--sa-separator)', background: 'var(--sa-surface)', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', padding: 10 },
  tooltipLabel: { fontSize: 11, fontWeight: 700, color: 'var(--sa-label)', fontFamily: MONO, marginBottom: 6, textTransform: 'uppercase' },
  tooltipItem: { fontSize: 12, fontWeight: 700, fontFamily: MONO, padding: '2px 0' },
};

// Day-by-day average mastery (points from masteryTrend / groupTrend).
// `en` (center admin only — teacher panel stays Uzbek) switches the
// tooltip text; the chart-point `label`s themselves already come in the
// right language from masteryTrend/groupTrend's own `en` flag.
export default function MasteryTrendChart({ data, id = 'caMastery', compact = false, en = false }) {
  return (
    <div className={`ca-chart ${compact ? 'is-compact' : ''}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 24, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART.line} stopOpacity={0.22} />
              <stop offset="95%" stopColor={CHART.line} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" axisLine={false} tickLine={false} tick={CHART.tick} dy={8} minTickGap={16} />
          <YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tickFormatter={(v) => `${v}%`} axisLine={false} tickLine={false} tick={CHART.tick} width={44} />
          <Tooltip
            cursor={{ stroke: 'var(--sa-separator)' }}
            contentStyle={CHART.tooltip}
            labelStyle={CHART.tooltipLabel}
            itemStyle={CHART.tooltipItem}
            labelFormatter={(label, items) => `${label}${items?.[0]?.payload?.live ? (en ? ' · today' : ' · bugun') : ''}`}
            formatter={(v, _n, item) => [`${v}% · ${item.payload.practiced}/${item.payload.total} ${en ? 'students' : "o'quvchi"}`, en ? 'Average' : "O'rtacha"]}
          />
          <Area
            type="monotone"
            dataKey="avg"
            stroke={CHART.line}
            strokeWidth={2}
            fill={`url(#${id})`}
            dot={data.length < 8 ? { r: 3, fill: CHART.line, strokeWidth: 0 } : false}
            activeDot={{ r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
