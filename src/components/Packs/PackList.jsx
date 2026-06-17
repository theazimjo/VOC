import PackCard from './PackCard';

export default function PackList({ packs, onEditPack }) {
  return (
    <div className="grid-cards">
      {packs.map(pack => (
        <PackCard key={pack.id} pack={pack} onLongPress={() => onEditPack(pack)} />
      ))}
    </div>
  );
}
