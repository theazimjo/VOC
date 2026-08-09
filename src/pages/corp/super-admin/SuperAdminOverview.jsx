import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Users, GraduationCap, TrendingUp, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getAllCenters, getCenterStats } from '../../../services/corpService';
import './shared.css';

export default function SuperAdminOverview() {
  const navigate = useNavigate();
  const [centers, setCenters] = useState([]);
  const [statsById, setStatsById] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getAllCenters();
        setCenters(data);
        const entries = await Promise.all(
          data.map(async (c) => {
            try {
              return [c.id, await getCenterStats(c.id)];
            } catch {
              return [c.id, null];
            }
          })
        );
        setStatsById(Object.fromEntries(entries));
      } catch (err) {
        console.error('Error loading super admin overview:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const globalStats = useMemo(() => {
    return Object.values(statsById).reduce((acc, s) => {
      if (!s) return acc;
      acc.teachers += s.teachersCount;
      acc.students += s.studentsCount;
      return acc;
    }, { teachers: 0, students: 0 });
  }, [statsById]);

  const activeCenters = centers.filter(c => c.status !== 'suspended').length;

  const chartData = useMemo(() => {
    const sorted = [...centers].sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
    const monthsMap = new Map();
    sorted.forEach((c) => {
      if (!c.createdAt) return;
      const key = new Date(c.createdAt).toLocaleString('default', { month: 'short' });
      monthsMap.set(key, (monthsMap.get(key) || 0) + 1);
    });
    let cumulative = 0;
    const chart = Array.from(monthsMap.entries()).map(([name, count]) => {
      cumulative += count;
      return { name, markazlar: cumulative };
    });
    if (chart.length === 0 && centers.length > 0) {
      chart.push({ name: 'Jami', markazlar: centers.length });
    }
    return chart;
  }, [centers]);

  const recentCenters = useMemo(() => {
    return [...centers]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 5);
  }, [centers]);

  if (loading) {
    return <div className="loading-spinner">Ma'lumotlar yuklanmoqda...</div>;
  }

  return (
    <div className="super-admin-container">
      <header className="super-admin-header">
        <div className="super-admin-badge"><TrendingUp size={16} /> Platforma Statistikasi</div>
        <h1>Boshqaruv Paneli</h1>
        <p>Markazlar va foydalanuvchilar holatining umumiy ko'rinishi.</p>
      </header>

      <div className="super-admin-stats">
        <div className="stat-card">
          <div className="stat-icon icon-blue"><Building2 size={24} /></div>
          <div>
            <h3>{centers.length}</h3>
            <p>Jami O'quv Markazlar</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon icon-green"><Activity size={24} /></div>
          <div>
            <h3>{activeCenters}</h3>
            <p>Aktiv Markazlar</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon icon-purple"><GraduationCap size={24} /></div>
          <div>
            <h3>{globalStats.teachers}</h3>
            <p>Jami O'qituvchilar</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon icon-blue"><Users size={24} /></div>
          <div>
            <h3>{globalStats.students}</h3>
            <p>Jami O'quvchilar</p>
          </div>
        </div>
      </div>

      <div className="overview-widgets-grid">
        <div className="overview-chart-card">
          <h2><TrendingUp size={18} /> Markazlar O'sishi</h2>
          <div style={{ height: 280, marginTop: '1rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorCenters" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Area type="monotone" dataKey="markazlar" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorCenters)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="overview-side-card">
          <h2><Activity size={18} /> So'nggi Markazlar</h2>
          <div className="overview-recent-list">
            {recentCenters.map(center => (
              <div key={center.id} className="overview-recent-row" onClick={() => navigate('/corp/super-admin/centers')}>
                <div className="overview-recent-icon"><Building2 size={18} /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p className="name">{center.name}</p>
                  <p className="meta">{center.createdAt ? new Date(center.createdAt).toLocaleDateString('uz-UZ') : "Sana yo'q"}</p>
                </div>
                <span className={`center-status-badge ${center.status === 'suspended' ? 'status-suspended' : ''}`}>
                  {center.status === 'suspended' ? "to'xtatilgan" : 'faol'}
                </span>
              </div>
            ))}
            {recentCenters.length === 0 && (
              <p style={{ textAlign: 'center', color: 'var(--pg-text-muted)', padding: '2rem 0' }}>Hozircha markazlar yo'q</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
