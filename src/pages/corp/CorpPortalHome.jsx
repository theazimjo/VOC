import { useNavigate } from 'react-router-dom';
import {
  Building2, Shield, Users, GraduationCap,
  UserCircle2, ArrowRight, Sparkles, LogIn
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCorpRole } from '../../hooks/useCorpRole';
import { useGroupMode } from '../../hooks/useGroupMode';
import './CorpPortalHome.css';

export default function CorpPortalHome() {
  const { user } = useAuth();
  const { identity } = useCorpRole();
  const { membership } = useGroupMode();
  const navigate = useNavigate();

  return (
    <div className="corp-home-container">
      <div className="corp-hero">
        <div className="corp-hero-badge">
          <Sparkles size={16} /> VOC Corporate Platforma
        </div>
        <h1>O'quv Markazlari va Guruhlar Tizimi</h1>
        <p>O'quv markazlari, o'qituvchilar va o'quvchilar uchun soddalashtirilgan maxsus ta'lim muhiti.</p>

        <div className="hero-action-cards">
          {membership ? (
            <div className="role-card card-highlight" onClick={() => navigate('/corp/student')}>
              <div className="role-icon purple"><GraduationCap size={28} /></div>
              <h3>Mening Xonam</h3>
              <p>Guruhingiz va sizga biriktirilgan so'zlarni ko'ring.</p>
              <button className="btn-role-action">
                Kirish <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div className="role-card card-highlight" onClick={() => navigate(user ? '/profile' : '/login')}>
              <div className="role-icon purple"><UserCircle2 size={28} /></div>
              <h3>O'quvchimisiz?</h3>
              <p>VOC hisobingiz bilan kiring va Profil sahifasidan o'qituvchingiz bergan guruh kodini kiriting.</p>
              <button className="btn-role-action">
                {user ? 'Profilga o\'tish' : 'Kirish'} <ArrowRight size={16} />
              </button>
            </div>
          )}

          {identity?.role === 'teacher' && (
            <div className="role-card" onClick={() => navigate('/corp/teacher')}>
              <div className="role-icon blue"><Users size={28} /></div>
              <h3>O'qituvchi Paneli</h3>
              <p>Guruhlar yaratish, so'z packlarini biriktirish va o'quvchilarni kuzatish.</p>
              <button className="btn-role-action">
                Kirish <ArrowRight size={16} />
              </button>
            </div>
          )}

          {identity?.role === 'center_admin' && (
            <div className="role-card" onClick={() => navigate('/corp/admin')}>
              <div className="role-icon green"><Building2 size={28} /></div>
              <h3>Markaz Admin</h3>
              <p>Markaz statistikasi, o'qituvchilar va xususiy custom packlarni boshqarish.</p>
              <button className="btn-role-action">
                Kirish <ArrowRight size={16} />
              </button>
            </div>
          )}

          {identity?.role === 'super_admin' && (
            <div className="role-card card-gold" onClick={() => navigate('/corp/super-admin')}>
              <div className="role-icon gold"><Shield size={28} /></div>
              <h3>Super Admin</h3>
              <p>Platformadagi barcha hamkor o'quv markazlarini boshqarish.</p>
              <button className="btn-role-action">
                Boshqaruv <ArrowRight size={16} />
              </button>
            </div>
          )}

          {!identity && (
            <div className="role-card" onClick={() => navigate('/corp/login')}>
              <div className="role-icon blue"><LogIn size={28} /></div>
              <h3>Markaz / O'qituvchi Kirishi</h3>
              <p>Markaz admini yoki o'qituvchi sifatida akkauntingiz bilan kiring.</p>
              <button className="btn-role-action">
                Kirish <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
