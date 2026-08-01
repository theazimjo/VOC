import { useState, useEffect, useRef } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { db } from '../../firebase';
import {
  User, Plus, ChevronDown, Check, UserCircle2, Key, BookOpen, Sparkles, CheckCircle2, Play, ChevronRight, ArrowLeft
} from 'lucide-react';
import { switchActiveGroup, joinGroupAsUser, setAppMode } from '../../services/corpService';
import './StudentCorpDashboard.css';

export default function StudentCorpDashboard() {
  const { user, membership, student, assignedPacks } = useOutletContext();
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [memberships, setMemberships] = useState([]);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [joining, setJoining] = useState(false);
  const [joinError, setJoinError] = useState('');

  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(() => {
    setSelectedMonth(null);
  }, [membership]);

  const dropdownRef = useRef(null);

  const startPractice = (pack) => {
    navigate('/corp/practice', {
      state: {
        pack,
        centerId: membership.centerId,
        groupId: membership.groupId,
        studentId: user.uid,
      },
    });
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
        setShowJoinForm(false);
        setPinCode('');
        setJoinError('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch all joined groups reactively
  useEffect(() => {
    if (!user) return;
    const membershipsRef = ref(db, `users/${user.uid}/groupMemberships`);
    const unsub = onValue(membershipsRef, (snap) => {
      if (snap.exists()) {
        setMemberships(Object.values(snap.val()));
      } else {
        setMemberships([]);
      }
    });
    return unsub;
  }, [user]);

  const handleSwitchToIndividual = async () => {
    try {
      await setAppMode(user.uid, 'individual');
      navigate('/');
    } catch (err) {
      console.error('Error switching to individual mode:', err);
    }
  };

  const handleSwitchGroup = async (groupId) => {
    try {
      await switchActiveGroup(user.uid, groupId);
      setShowDropdown(false);
    } catch (err) {
      console.error('Error switching group:', err);
    }
  };

  const handleJoinNewGroup = async (e) => {
    e.preventDefault();
    if (!pinCode.trim() || pinCode.length !== 6) {
      setJoinError('Guruh PIN kodi 6 xonali bo\'lishi kerak!');
      return;
    }
    setJoining(true);
    setJoinError('');
    try {
      await joinGroupAsUser(pinCode.trim(), user.uid, {
        name: user.displayName || user.email,
        email: user.email || ''
      });
      setPinCode('');
      setShowJoinForm(false);
      setShowDropdown(false);
    } catch (err) {
      setJoinError(err.message || 'Ulanishda xatolik yuz berdi.');
    } finally {
      setJoining(false);
    }
  };

  // Helper to get initials / abbreviation of group name or level
  const getGroupBadgeText = (group) => {
    if (!group) return 'G';
    const text = group.level || group.groupName || 'G';
    // Return first 2 letters uppercase
    return text.substring(0, 2).toUpperCase();
  };

  const activeBadgeText = getGroupBadgeText(membership);

  return (
    <div className="student-corp-container" style={{ padding: '2rem' }}>
      {/* Dropdown Container */}
      <div style={{ position: 'relative', width: 'fit-content' }} ref={dropdownRef}>
        
        {/* Trigger Pill */}
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '6px 12px 6px 6px',
            cursor: 'pointer',
            color: '#fff',
            outline: 'none',
            fontSize: '0.88rem',
            fontWeight: 600,
            transition: 'background 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'}
        >
          {/* Active Level Badge */}
          <div style={{
            background: '#22c55e',
            color: '#fff',
            fontSize: '0.78rem',
            fontWeight: 700,
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            letterSpacing: '0.02em'
          }}>
            {activeBadgeText}
          </div>
          <ChevronDown size={14} style={{ color: '#94a3b8', transition: 'transform 0.2s', transform: showDropdown ? 'rotate(180deg)' : 'rotate(0)' }} />
        </button>

        {/* Dropdown Popover */}
        {showDropdown && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 10px)',
              left: 0,
              background: '#16161f',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '1.25rem',
              width: 'max-content',
              maxWidth: '420px',
              zIndex: 1000,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
            }}
          >
            {/* Horizontal Switcher List */}
            <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
              
              {/* 1. Shaxsiy Card */}
              <div 
                onClick={handleSwitchToIndividual}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer', width: '68px' }}
              >
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  background: 'rgba(59, 130, 246, 0.12)',
                  color: '#3b82f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <User size={22} />
                </div>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 500, textAlign: 'center' }}>Shaxsiy</span>
              </div>

              {/* 2. Group Cards */}
              {memberships.map((g) => {
                const isActive = g.groupId === membership.groupId;
                const badge = getGroupBadgeText(g);
                return (
                  <div 
                    key={g.groupId}
                    onClick={() => !isActive && handleSwitchGroup(g.groupId)}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer', width: '68px' }}
                  >
                    <div style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '16px',
                      background: isActive ? '#22c55e' : '#14532d',
                      color: isActive ? '#fff' : '#4ade80',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      transition: 'transform 0.2s',
                      boxShadow: isActive ? '0 0 12px rgba(34, 197, 94, 0.4)' : 'none'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      {badge}
                    </div>
                    <span style={{ fontSize: '0.78rem', color: isActive ? '#fff' : '#94a3b8', fontWeight: isActive ? 600 : 500, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                      {g.groupName}
                    </span>
                  </div>
                );
              })}

              {/* 3. Qo'shish Card */}
              <div 
                onClick={() => { setShowJoinForm(!showJoinForm); setJoinError(''); }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer', width: '68px' }}
              >
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px dashed rgba(255, 255, 255, 0.15)',
                  color: '#3b82f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <Plus size={22} />
                </div>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 500, textAlign: 'center' }}>Qo'shish</span>
              </div>

            </div>

            {/* Inline Add Group PIN Form */}
            {showJoinForm && (
              <form 
                onSubmit={handleJoinNewGroup}
                style={{ 
                  marginTop: '1.25rem', 
                  paddingTop: '1.25rem', 
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 500 }}>Yangi guruh PIN kodini kiriting:</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    value={pinCode}
                    onChange={e => setPinCode(e.target.value.replace(/[^0-9]/g, ''))}
                    style={{
                      background: 'rgba(0, 0, 0, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: '#fff',
                      padding: '8px 12px',
                      fontSize: '0.88rem',
                      outline: 'none',
                      flex: 1,
                      fontFamily: 'monospace',
                      letterSpacing: '2px',
                      textAlign: 'center'
                    }}
                  />
                  <button
                    type="submit"
                    disabled={joining}
                    style={{
                      background: 'linear-gradient(135deg, #a855f7, #6366f1)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {joining ? '...' : "Qo'shish"}
                  </button>
                </div>
                {joinError && (
                  <span style={{ fontSize: '0.75rem', color: '#f87171', marginTop: '4px' }}>{joinError}</span>
                )}
              </form>
            )}

          </div>
        )}
      </div>

      {/* Assigned Word Packs Section */}
      <div className="st-packs-section" style={{ marginTop: '3rem' }}>
        
        {/* LEVEL 1: MONTHS LIST */}
        {!selectedMonth && (() => {
          const allMonths = (assignedPacks || []).flatMap(pack => {
            const packMonths = pack.months && pack.months.length > 0
              ? pack.months
              : pack.units && pack.units.length > 0
                ? [{ id: 'm1', title: '1-Oy', units: pack.units }]
                : pack.words && pack.words.length > 0
                  ? [{ id: 'm1', title: '1-Oy', units: [{ id: 'u1', title: '1-Mavzu', words: pack.words }] }]
                  : [];
            return packMonths.map(m => ({
              ...m,
              packId: pack.id,
              packTitle: pack.title,
              packLevel: pack.level
            }));
          });

          return (
            <>
              <div className="section-title" style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.35rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                  <BookOpen size={22} className="icon-purple" style={{ color: '#c084fc' }} /> Kurs Rejasi (Oylar)
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '0.82rem', marginTop: '0.25rem' }}>O'rganmoqchi bo'lgan oyingizni tanlang.</p>
              </div>

              {allMonths.length === 0 ? (
                <div className="st-empty-state" style={{ background: '#13131c', border: '1px dashed rgba(255,255,255,0.08)', borderRadius: '14px', padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                  <Sparkles size={36} style={{ color: '#c084fc', marginBottom: '1rem' }} />
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>Hozircha sizga hech qanday reja biriktirilmagan. O'qituvchingiz tez orada topshiriq beradi.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {allMonths.map((m, idx) => (
                    <button
                      type="button"
                      key={`${m.packId}_${m.id}`}
                      onClick={() => setSelectedMonth(m)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.04)',
                        borderRadius: '12px',
                        padding: '1rem 1.25rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'background 0.2s, border-color 0.2s',
                        outline: 'none'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)';
                      }}
                    >
                      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#c084fc', width: '32px' }}>{idx + 1}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>{m.title}</div>
                        {assignedPacks.length > 1 && (
                          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>{m.packTitle} ({m.packLevel})</div>
                        )}
                      </div>
                      <span style={{ fontSize: '0.85rem', color: '#94a3b8', marginRight: '1rem' }}>{(m.units || []).length} ta mavzu</span>
                      <ChevronRight size={18} style={{ color: '#64748b' }} />
                    </button>
                  ))}
                </div>
              )}
            </>
          );
        })()}

        {/* LEVEL 2: TOPICS LIST */}
        {selectedMonth && (
          <>
            {/* Back Navigation */}
            <button 
              onClick={() => setSelectedMonth(null)} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px', 
                background: 'none', 
                border: 'none', 
                color: '#c084fc', 
                cursor: 'pointer', 
                marginBottom: '1.5rem', 
                fontSize: '0.88rem',
                fontWeight: 600,
                outline: 'none',
                padding: 0
              }}
            >
              <ArrowLeft size={16} /> Orqaga (Oylar ro'yxatiga)
            </button>

            <div className="section-title" style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                {selectedMonth.title}
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.82rem', marginTop: '0.25rem' }}>Mashq qilishni boshlash uchun mavzuni tanlang.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {(selectedMonth.units || []).length === 0 ? (
                <div style={{ color: '#94a3b8', fontSize: '0.9rem', padding: '1rem 0' }}>Bu oyda mavzular mavjud emas.</div>
              ) : (
                selectedMonth.units.map((u, idx) => {
                  const uniqueUnitId = `${selectedMonth.packId}_${selectedMonth.id}_${u.id}`;
                  const done = Boolean(student?.progress?.[uniqueUnitId]);

                  // Virtual pack builder for practice
                  const virtualPack = {
                    id: uniqueUnitId,
                    title: `${selectedMonth.packTitle} - ${u.title}`,
                    words: u.words || [],
                    level: selectedMonth.packLevel
                  };

                  return (
                    <button
                      type="button"
                      key={u.id}
                      onClick={() => u.words && u.words.length > 0 && startPractice(virtualPack)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.04)',
                        borderRadius: '12px',
                        padding: '1rem 1.25rem',
                        textAlign: 'left',
                        cursor: u.words && u.words.length > 0 ? 'pointer' : 'default',
                        transition: 'background 0.2s, border-color 0.2s',
                        outline: 'none',
                        opacity: u.words && u.words.length > 0 ? 1 : 0.5
                      }}
                      onMouseEnter={e => {
                        if (u.words && u.words.length > 0) {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                        }
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)';
                      }}
                    >
                      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#c084fc', width: '32px' }}>{idx + 1}</span>
                      
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>{u.title}</span>
                        {done && <span style={{ fontSize: '0.72rem', background: 'rgba(74, 222, 128, 0.15)', color: '#4ade80', padding: '2px 8px', borderRadius: '10px', fontWeight: 600 }}>Tugallandi</span>}
                      </div>

                      <span style={{ fontSize: '0.85rem', color: '#94a3b8', marginRight: '1rem' }}>{(u.words || []).length} ta so'z</span>
                      
                      {u.words && u.words.length > 0 ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: done ? 'rgba(255,255,255,0.06)' : 'linear-gradient(135deg, #a855f7, #6366f1)', width: '28px', height: '28px', borderRadius: '8px' }}>
                          <Play size={12} fill="#fff" style={{ color: '#fff', marginLeft: '1px' }} />
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Hozircha bo'sh</span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </>
        )}

      </div>

    </div>
  );
}
