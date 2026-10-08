import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { usePacks } from '../../hooks/usePacks';
import { useWords } from '../../hooks/useWords';
import { useLanguage } from '../../contexts/LanguageContext';
import { scienceChapterText } from '../../data/scienceChapterText';
import { healthChapterText } from '../../data/healthChapterText';
import { essential3000ChapterText } from '../../data/essential3000ChapterText';
import ChapterReaderView from '../../components/Read/ChapterReaderView';
import IosSpinner from '../../components/common/IosSpinner';

const chapterTextByTopic = { ...scienceChapterText, ...healthChapterText, ...essential3000ChapterText };

// /packs/:packId/read?topic=...  - the personal app's reader: the words live in the
// user's own pack, and Back / Finish return to that pack.
export default function ReadPage() {
  const { packId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const topic = searchParams.get('topic') || '';

  const { getPack } = usePacks();
  const { words, addWord, updateWord } = useWords('packs', packId);

  const [pack, setPack] = useState(null);
  const [packLoading, setPackLoading] = useState(true);

  useEffect(() => {
    const fetchPack = async () => {
      setPackLoading(true);
      const p = await getPack(packId);
      if (p) setPack(p);
      else navigate('/library?tab=packs');
      setPackLoading(false);
    };
    fetchPack();
  }, [packId, getPack, navigate]);

  const handleAddWord = useCallback(async ({ word, translation, definition, partOfSpeech, example, existingWord }) => {
    if (existingWord) {
      await updateWord(existingWord.id, {
        translation,
        topic,
        ...(definition ? { definition } : {}),
        ...(partOfSpeech ? { partOfSpeech } : {}),
        ...(example ? { example } : {}),
        mastery: 0,
        interval: 0,
        reviewCount: 0,
        nextReview: null,
        lastReviewed: null,
        stability: null
      });
    } else {
      await addWord({
        word,
        translation,
        topic,
        partOfSpeech: partOfSpeech || 'noun',
        definition: definition || '',
        example: example || '',
        notes: ''
      });
    }
  }, [addWord, updateWord, topic]);

  const backToPack = () => navigate(`/packs/${packId}?topic=${encodeURIComponent(topic)}`);

  if (packLoading) {
    return (
      <div className="ios-activity-indicator" style={{ marginTop: '100px' }}>
        <IosSpinner />
        <span>{t('read.loading')}</span>
      </div>
    );
  }

  if (!pack) return null;

  return (
    <ChapterReaderView
      packId={packId}
      topic={topic}
      chapter={chapterTextByTopic[topic]}
      language={pack.language || 'en-US'}
      words={words}
      onAddWord={handleAddWord}
      onBack={backToPack}
      onFinish={backToPack}
    />
  );
}
