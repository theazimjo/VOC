import { auth } from '../../../../firebase';
import CustomPackEditor from '../../../../components/corp/CustomPackEditor';

export default function PackEditorModal({ p }) {
  const { centerId, setCustomPacks, setShowPackEditor, showPackEditor } = p;

  return (
      showPackEditor && (
        <CustomPackEditor
          centerId={centerId}
          ownerUid={auth.currentUser?.uid}
          onSaved={(pack) => {
            setCustomPacks(prev => [{ ...pack, scope: 'own' }, ...prev]);
            setShowPackEditor(false);
          }}
          onCancel={() => setShowPackEditor(false)}
        />
      )
  );
}
