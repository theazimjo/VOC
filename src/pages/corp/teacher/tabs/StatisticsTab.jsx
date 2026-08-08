import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3, BookOpen, TrendingUp, Users } from 'lucide-react';

export default function StatisticsTab({ p }) {
  const {
    activeGroups, allGroupsStats, allGroupsStudents, customPacks,
    loadingAllStats, overallAvgPercent, totalStudents,
  } = p;

  return (
        <>
          <header className="teacher-header">
            <div>
              <span className="teacher-badge" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}><BarChart3 size={16} /> Statistika</span>
              <h1>Natijalar va Statistika</h1>
              <p>Guruhlaringiz va o'quvchilaringizning so'z boyligi o'zlashtirish dinamikasi.</p>
            </div>
          </header>

          <div className="stat-cards-grid" style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
            <div className="group-stat-card">
              <div className="group-stat-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={16} color="#6366f1" /> Jami Guruhlar
              </div>
              <div className="group-stat-value">{activeGroups.length} ta</div>
            </div>

            <div className="group-stat-card">
              <div className="group-stat-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={16} color="var(--success)" /> Jami O'quvchilar
              </div>
              <div className="group-stat-value">{totalStudents} ta</div>
            </div>

            <div className="group-stat-card">
              <div className="group-stat-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={16} color="#a855f7" /> Custom Packlar
              </div>
              <div className="group-stat-value">{customPacks.length} ta</div>
            </div>

            <div className="group-stat-card">
              <div className="group-stat-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={16} color="#38bdf8" /> O'rtacha O'zlashtirish
              </div>
              <div className="group-stat-value" style={{ color: '#4ade80' }}>
                {loadingAllStats ? '…' : `${overallAvgPercent}%`}
              </div>
            </div>
          </div>

          {allGroupsStats.length > 0 && (
            <div className="teachers-table-card" style={{ marginBottom: '1.5rem', padding: '1.25rem 1.5rem' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-primary)', fontSize: '1.1rem' }}>
                Guruhlar bo'yicha o'rtacha o'zlashtirish
              </h3>
              <div style={{ height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={allGroupsStats.map(s => ({ name: s.group.name, avgPercent: s.avgPercent }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} unit="%" allowDecimals={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff' }}
                      itemStyle={{ color: '#4ade80' }}
                      formatter={(value) => [`${value}%`, "O'zlashtirish"]}
                    />
                    <Bar dataKey="avgPercent" fill="#0a84ff" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          <div className="teachers-table-card">
            <h3 style={{ padding: '1.25rem 1.5rem', margin: 0, color: 'var(--text-primary)', borderBottom: '1px solid var(--border)', fontSize: '1.1rem' }}>
              Guruhlar Statistikasi
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table className="teachers-table">
                <thead>
                  <tr>
                    <th>GURUH NOMI</th>
                    <th>DARAJA</th>
                    <th>O'QUVCHILAR</th>
                    <th>PACKLAR</th>
                    <th>O'ZLASHTIRISH</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {allGroupsStats.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Hali guruhlar yo'q</td>
                    </tr>
                  ) : (
                    allGroupsStats.map(({ group: g, packEntries, avgPercent }) => (
                      <tr key={g.id}>
                        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{g.name}</td>
                        <td><span className="group-level-badge">{g.level}</span></td>
                        <td>{g.studentsCount || 0} ta o'quvchi</td>
                        <td>{packEntries.length} ta pack</td>
                        <td>{loadingAllStats && !(g.id in allGroupsStudents) ? '…' : `${avgPercent}%`}</td>
                        <td><span className="teacher-status-pill active">• Faol</span></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
  );
}
