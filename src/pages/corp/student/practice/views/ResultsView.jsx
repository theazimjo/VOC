import { useStudentT } from '../../../../../hooks/useStudentT';
import PracticeResultsView from '../../../../../components/Practice/PracticeResultsView';

export default function ResultsView({ p }) {
  const { handleReset, loadedPack, results, wrongWords, fromTopic } = p;
  const { t } = useStudentT();

  return (
    <PracticeResultsView
      results={results}
      wrongWords={wrongWords}
      onReset={handleReset}
      actionLabel={fromTopic ? t('practice.backToTopic') : undefined}
      language={loadedPack?.language || 'en-US'}
    />
  );
}
