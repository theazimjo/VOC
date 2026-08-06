// Tracks whether the logged-in individual user has switched into "group
// mode" from their Profile page (see ProfilePage.jsx) — a real VOC account
// that has joined a corp learning-center group via PIN. Distinct from the
// corp staff identity in useCorpRole.js: this is about an individual
// learner's own account, not a center_admin/teacher login.
//
// Implementation lives in GroupModeContext so every consumer shares one
// resolved subscription instead of each re-fetching it independently.
export { useGroupMode } from '../contexts/GroupModeContext';
