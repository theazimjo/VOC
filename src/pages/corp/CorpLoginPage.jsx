import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, LogIn, KeyRound } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { auth } from '../../firebase';
import { resolveCorpIdentity } from '../../hooks/useCorpRole';
import './CorpLoginPage.css';

function roleToPath(role) {
  if (role === 'super_admin') return '/corp/super-admin';
  if (role === 'center_admin') return '/corp/admin';
  if (role === 'teacher') return '/corp/teacher';
  return null;
}

export default function CorpLoginPage() {
  const { login, logout, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // If already signed in with a corp-eligible account, skip straight in.
  useEffect(() => {
    if (!auth.currentUser) return;
    (async () => {
      const identity = await resolveCorpIdentity(auth.currentUser);
      const path = identity ? roleToPath(identity.role) : null;
      if (path) navigate(path, { replace: true });
    })();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setSubmitting(true);
    try {
      const cred = await login(email.trim(), password);
      const identity = await resolveCorpIdentity(cred.user);
      const path = identity ? roleToPath(identity.role) : null;

      if (!path) {
        setError('Ushbu akkauntda korporativ portalga kirish huquqi yo\'q yoki markaz vaqtincha to\'xtatilgan.');
        await logout();
        return;
      }

      navigate(path, { replace: true });
    } catch {
      setError('Email yoki parol noto\'g\'ri.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setError('Avval email manzilingizni kiriting.');
      return;
    }
    setError('');
    try {
      await resetPassword(email.trim());
      setInfo('Agar bu email ro\'yxatdan o\'tgan bo\'lsa, parolni tiklash havolasi yuborildi.');
    } catch {
      setError('Parolni tiklashda xatolik yuz berdi.');
    }
  };

  return (
    <div className="corp-login-container">
      <div className="corp-login-card">
        <div className="corp-login-icon">
          <Building2 size={28} />
        </div>
        <h1>Korporativ Portal</h1>
        <p>Markaz admin va o'qituvchilar uchun kirish.</p>

        {error && <div className="corp-login-error">{error}</div>}
        {info && <div className="corp-login-info">{info}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="siz@markaz.uz"
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>Parol</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Vaqtinchalik parolingiz"
            />
          </div>

          <button type="submit" className="btn-corp-login" disabled={submitting}>
            <LogIn size={18} /> {submitting ? 'Kirilmoqda...' : 'Kirish'}
          </button>
        </form>

        <button type="button" className="corp-login-forgot" onClick={handleForgotPassword}>
          Parolni unutdingizmi?
        </button>

        <div className="corp-login-hint">
          <KeyRound size={14} />
          <span>Login ma'lumotlarini markaz administratoringizdan oling.</span>
        </div>

        <Link to="/corp/teacher/join" className="corp-login-forgot">
          O'qituvchimisiz? Taklif kodi bilan ro'yxatdan o'ting
        </Link>
      </div>
    </div>
  );
}
