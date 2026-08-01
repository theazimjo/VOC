import { useOutletContext } from 'react-router-dom';
import { Settings, Shield, Moon, CheckCircle2 } from 'lucide-react';

export default function StudentCorpSettings() {
  const { membership } = useOutletContext();

  return (
    <div className="student-corp-container" style={{ padding: '2rem', maxWidth: '600px' }}>
      {/* Page Header */}
      <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fff', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Settings size={24} style={{ color: '#c084fc' }} /> Sozlamalar
      </h2>

      {/* Settings Card */}
      <div style={{ background: '#13131c', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.04)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#c084fc', width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Moon size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>Mavzu (Theme)</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Tizim interfeysi rangini sozlash</div>
            </div>
          </div>
          <span style={{ fontSize: '0.82rem', color: '#c084fc', background: 'rgba(192, 132, 252, 0.1)', padding: '4px 10px', borderRadius: '12px', fontWeight: 600 }}>Tungi rejim</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.04)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#c084fc', width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>Ulanish holati</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>O'quv markazi xavfsiz kanali</div>
            </div>
          </div>
          <span style={{ fontSize: '0.82rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
            <CheckCircle2 size={14} /> Xavfsiz
          </span>
        </div>

        <div style={{ padding: '0.5rem 0', fontSize: '0.78rem', color: '#475569', lineHeight: '1.4' }}>
          O'quv markazi: <strong>{membership.centerName}</strong><br />
          Platforma talqini: <strong>v2.4.0 (Corp Edition)</strong>
        </div>
      </div>
    </div>
  );
}
