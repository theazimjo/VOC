import { Link, useOutletContext } from 'react-router-dom';
import { useWords } from '../../../hooks/useWords';
import { useLanguage } from '../../../contexts/LanguageContext';
import WordList from '../../../components/Words/WordList';

// Study/browse view of the course's words — editing stays on the pack's own
// /packs/:packId page (same underlying data), reached via the link below.
export default function CourseVocabulary() {
  const { pack } = useOutletContext();
  const { t } = useLanguage();
  const { words, loading } = useWords('packs', pack.id);

  return (
    <div className="course-vocabulary">
      <Link to={`/packs/${pack.id}`} className="course-manage-link">
        {t('course.manageWords')}
      </Link>
      <WordList words={words} loading={loading} readOnly language={pack.language || 'en-US'} />
    </div>
  );
}
