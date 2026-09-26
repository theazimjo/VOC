import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Building2, Check, GraduationCap, Presentation, Shield, User } from 'lucide-react';
import { auth } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { useCorpRole, clearCorpIdentityCache, SUPER_ADMINS } from '../../hooks/useCorpRole';
import { setActiveProfile } from '../../utils/activeProfile';
import '../corp/super-admin/sa.css';
import './RoleSwitcher.css';

// DEV ONLY (registered in App.jsx behind import.meta.env.DEV, so it never
// ships): one page to jump between every role while building. Demo
// accounts come from scripts/seed-demo-center.mjs, which also writes their
// passwords to .env.local as VITE_DEMO_*_PASSWORD. Super admin / personal
// use your own Google account.

const ROLES = [
  {
    key: 'super', title: 'Super admin', text: 'Markazlar, foydalanuvchilar, e\'lonlar.',
    icon: Shield, tone: 'purple', path: '/corp/super-admin', profile: 'personal', google: true,
  },
  {
    key: 'personal', title: "Shaxsiy o'quvchi", text: "B2C ilova: so'zlar, grammatika, mashqlar.",
    icon: User, tone: 'blue', path: '/', profile: 'personal', google: true,
  },
  {
    key: 'admin', title: 'Markaz admini', text: "VOC Demo markaz: o'qituvchilar, guruhlar, kurslar.",
    icon: Building2, tone: 'orange', path: '/corp/admin', profile: 'personal',
    email: 'demo.admin@voc-demo.uz', password: import.meta.env.VITE_DEMO_ADMIN_PASSWORD,
  },
  {
    key: 'teacher', title: "O'qituvchi", text: 'Demo guruh: vazifa berish, natijalar.',
    icon: Presentation, tone: 'green', path: '/corp/teacher', profile: 'teacher',
    email: 'teacher_998000000001@markaz.uz', login: '+998000000001', password: import.meta.env.VITE_DEMO_TEACHER_PASSWORD,
  },
  {
    key: 'student', title: "Guruh o'quvchisi", text: "Guruh rejimi: vazifalar, mavzular, mashq.",
    icon: GraduationCap, tone: 'red', path: '/', profile: 'personal',
    email: 'demo.student@voc-demo.uz', password: import.meta.env.VITE_DEMO_STUDENT_PASSWORD,
  },
];

export default function RoleSwitcher() {
  const navigate = useNavigate();
  const { user, loginWithGoogle } = useAuth();
  const { identity } = useCorpRole();
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState('');

  const isSuperAdmin = Boolean(user?.email && SUPER_ADMINS.includes(user.email.toLowerCase()));
  const currentKey = (() => {
    if (!user) return null;
    const match = ROLES.find((r) => r.email && r.email === user.email);
    if (match) return match.key;
    if (isSuperAdmin) return 'super';
    return identity ? null : 'personal';
  })();

  const open = async (role) => {
    setBusy(role.key);
    setError('');
    try {
      const already = role.google ? (role.key === 'super' ? isSuperAdmin : user && !ROLES.some((r) => r.email === user.email)) : user?.email === role.email;
      if (!already) {
        if (user) await signOut(auth);
        if (role.google) {
          await loginWithGoogle();
        } else {
          if (!role.password) throw new Error('Parol yo\'q: `node scripts/seed-demo-center.mjs` ni ishga tushiring va dev serverni qayta yoqing.');
          await signInWithEmailAndPassword(auth, role.email, role.password);
        }
      }
      setActiveProfile(role.profile);
      clearCorpIdentityCache(auth.currentUser?.uid);
      navigate(role.path);
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') setError(err.message);
      setBusy(null);
    }
  };

  return (
    <div className="sa-layout rs-page">
      <div className="rs-inner">
        <header className="rs-head">
          <span className="rs-badge">DEV</span>
          <h1 className="sa-large-title">Rollar</h1>
          <p className="sa-page-subtitle">
            {user ? <>Hozir: <strong>{user.email}</strong></> : 'Hech kim kirmagan'}
          </p>
        </header>

        {error && <p className="sa-flow-error">{error}</p>}

        <div className="rs-grid">
          {ROLES.map((role) => {
            const Icon = role.icon;
            const current = currentKey === role.key;
            return (
              <button
                key={role.key}
                type="button"
                className={`rs-card ${current ? 'is-current' : ''}`}
                onClick={() => open(role)}
                disabled={Boolean(busy)}
              >
                <span className={`sa-row-icon tone-${role.tone} rs-icon`}><Icon size={20} /></span>
                <span className="rs-title">{role.title}</span>
                <span className="rs-text">{role.text}</span>
                <span className="rs-login">
                  {busy === role.key ? 'Kirilmoqda...' : role.google ? 'Google hisobingiz' : (role.login || role.email)}
                </span>
                {current && <span className="rs-current"><Check size={13} strokeWidth={3} /> Hozirgi</span>}
              </button>
            );
          })}
        </div>

        <p className="rs-foot">
          Faqat <code>npm run dev</code> da mavjud. Demo ma'lumotni tiklash: <code>node scripts/seed-demo-center.mjs</code>
        </p>
      </div>
    </div>
  );
}
