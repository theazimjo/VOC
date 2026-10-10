import { ChevronRight, Repeat } from 'lucide-react';
import { useRoleSwitch, ROLE_LABEL } from '../../hooks/useRoleSwitch';

const HINT = {
  personal: 'The app where you learn words yourself',
  student: 'Your groups, as a student',
  teacher: 'Your groups and homework, as a teacher',
  center_admin: 'The center admin panel',
  super_admin: 'The platform panel',
};

// "Switch to …" for a staff panel's settings: every other side of this same
// account (personal learning, the groups it joined, a linked teacher record).
// The choice is remembered, so the app opens there next time.
export default function ModeSwitchCard() {
  const { roles, current, switchTo } = useRoleSwitch();
  const targets = [...new Set([...roles, 'personal'])].filter((r) => r !== current);
  if (!targets.length) return null;
  return (
    <section className="ca-card">
      <div className="ca-card-head">
        <div>
          <h3 className="ca-card-title"><Repeat size={15} /> Switch mode</h3>
          <span className="ca-card-sub">Same account, another part of the app</span>
        </div>
      </div>
      <div className="ca-feed">
        {targets.map((r) => (
          <button key={r} type="button" className="ca-feed-item" onClick={() => switchTo(r)}>
            <span className="ca-icon-box is-sm"><Repeat size={14} /></span>
            <span className="ca-feed-text">
              <span className="ca-feed-title">{r === 'personal' ? 'Personal mode' : `${ROLE_LABEL[r]} ${r === 'student' ? 'mode' : 'panel'}`}</span>
              <span className="ca-feed-sub">{HINT[r]}</span>
            </span>
            <ChevronRight size={16} />
          </button>
        ))}
      </div>
    </section>
  );
}
