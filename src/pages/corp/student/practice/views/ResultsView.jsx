import PracticeResultsView from '../../../../../components/Practice/PracticeResultsView';

export default function ResultsView({ p }) {
  const { handleReset, loadedPack, results, wrongWords } = p;

  return (
    <PracticeResultsView
      results={results}
      wrongWords={wrongWords}
      onReset={handleReset}
      language={loadedPack?.language || 'en-US'}
    />
  );
}
