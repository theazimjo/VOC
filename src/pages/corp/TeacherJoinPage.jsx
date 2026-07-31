import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, KeyRound, UserPlus } from 'lucide-react';
import { joinAsTeacher } from '../../services/corpService';
import './TeacherJoinPage.css';

export default function TeacherJoinPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Parol kamida 6 belgidan iborat bo\'lishi kerak.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Parollar mos kelmadi.');
      return;
    }

    setSubmitting(true);
    try {
      await joinAsTeacher(code, { name: name.trim(), email: email.trim(), password });
      navigate('/corp/teacher', { replace: true });
    } catch (err) {
      setError(err.message || 'Ro\'yxatdan o\'tishda xatolik yuz berdi.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="teacher-join-container">
      <div className="teacher-join-card">
        <div className="teacher-join-icon">
          <GraduationCap size={28} />
        </div>
        <h1>O'qituvchi Sifatida Qo'shilish</h1>
        <p>Markaz administratoridan olgan taklif kodini kiriting va o'z akkauntingizni yarating.</p>

        {error && <div className="teacher-join-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Taklif kodi</label>
            <input
              type="text"
              required
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="T-4821"
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>F.I.Sh</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Abdulla Qodirov"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="siz@example.com"
            />
          </div>
          <div className="form-group">
            <label>Parol</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Kamida 6 belgi"
            />
          </div>
          <div className="form-group">
            <label>Parolni tasdiqlang</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Parolni qayta kiriting"
            />
          </div>

          <button type="submit" className="btn-teacher-join" disabled={submitting}>
            <UserPlus size={18} /> {submitting ? 'Yaratilmoqda...' : 'Ro\'yxatdan O\'tish'}
          </button>
        </form>

        <div className="teacher-join-hint">
          <KeyRound size={14} />
          <span>Taklif kodingiz yo'qmi? Uni markaz administratoridan so'rang.</span>
        </div>

        <Link to="/corp/login" className="teacher-join-back">Kirish sahifasiga qaytish</Link>
      </div>
    </div>
  );
}
