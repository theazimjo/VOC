import { useAuth } from '../../contexts/AuthContext';
import { useStudentPlan } from '../../hooks/usePlan';
import './PlanBadge.css';

// A small gem-set crown, drawn here so it keeps its detail at 14px.
function Crown({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="plan-crown-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7A4A00" />
          <stop offset="1" stopColor="#4A2E00" />
        </linearGradient>
      </defs>
      <path d="M3 8.5l4.6 4 4.4-7.2 4.4 7.2 4.6-4-1.9 10.2H4.9L3 8.5z" fill="url(#plan-crown-g)" />
      <rect x="5" y="19.6" width="14" height="2" rx="1" fill="#4A2E00" />
      <circle cx="12" cy="13.6" r="1.5" fill="#FFE27A" />
      <circle cx="7.8" cy="15.2" r="1" fill="#FFE27A" opacity=".85" />
      <circle cx="16.2" cy="15.2" r="1" fill="#FFE27A" opacity=".85" />
    </svg>
  );
}

// Gold "Premium" pill with a crown; only shown for learners on Plus.
export default function PlanBadge({ compact = false }) {
  const { user } = useAuth();
  const { planId, loaded } = useStudentPlan(user?.uid);
  if (!user || !loaded || planId !== 'plus') return null;
  return (
    <span className={`plan-badge${compact ? ' is-compact' : ''}`} title="Premium">
      <Crown size={compact ? 15 : 14} />
      {!compact && 'PREMIUM'}
    </span>
  );
}
