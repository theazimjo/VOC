import IosSpinner from './IosSpinner';

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  background: 'var(--bg-primary)',
};

// One shared full-page loading state for every auth/route/data gate
// (ProtectedRoute, CorpProtectedRoute, lazy route chunks, Layout's
// group-mode resolution, StudentLayout's pack fetch) so a login that
// passes through several of these gates in sequence reads as a single
// steady loading screen instead of different-looking spinners flickering
// one after another.
export default function FullScreenLoader() {
  return (
    <div style={style}>
      <IosSpinner size={32} />
    </div>
  );
}
