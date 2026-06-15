import PackCard from './PackCard';

export default function PackList({ packs }) {
  return (
    <div className="grid-cards">
      {packs.map(pack => (
        <PackCard key={pack.id} pack={pack} />
      ))}
    </div>
  );
}
