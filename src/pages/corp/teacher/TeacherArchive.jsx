import { useNavigate } from 'react-router-dom';
import { Archive } from 'lucide-react';
import { EmptyState, LoadingRows, Page, Row, Section } from '../super-admin/ui';
import { useTeacherData } from './TeacherDataContext';

// Archived groups keep their students and results; opening one shows the
// usual group page, where the gear holds "Arxivdan tiklash".
export default function TeacherArchive() {
  const navigate = useNavigate();
  const { loading, archivedGroups } = useTeacherData();

  return (
    <Page title="Arxiv" back={{ label: 'Guruhlarim', onClick: () => navigate('/corp/teacher') }}>
      {loading ? <LoadingRows count={3} /> : archivedGroups.length === 0 ? (
        <div className="sa-group">
          <EmptyState icon={<Archive size={40} />} title="Arxiv bo'sh" text="Kursi tugagan guruhni sozlamalaridan arxivlasangiz, shu yerga tushadi." />
        </div>
      ) : (
        <Section footer="Guruhni ochib, sozlamalardan tiklash mumkin. O'quvchilar va natijalar saqlangan.">
          {archivedGroups.map((g) => (
            <Row
              key={g.id}
              icon={<Archive size={16} />}
              iconTone="gray"
              title={g.name || 'Guruh'}
              subtitle={`${g.activity.students} o'quvchi · ${g.homework.length} vazifa`}
              onClick={() => navigate(`/corp/teacher/group/${g.id}`)}
            />
          ))}
        </Section>
      )}
    </Page>
  );
}
