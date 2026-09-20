import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FolderInput, X, Plus } from 'lucide-react';
import { ref, push, update, runTransaction } from 'firebase/database';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { playSound } from '../../utils/feedback';
import './MoveWordsModal.css';

export default function MoveWordsModal({
  isOpen,
  onClose,
  selectedWordIds = [],
  sourcePackId,
  sourceWords = [],
  packs = [],
  updatePack,
  onSuccess
}) {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [targetPackId, setTargetPackId] = useState(sourcePackId || '');
  const [targetChapter, setTargetChapter] = useState('');
  const [newChapterName, setNewChapterName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available packs (excluding system packs like Irregular Verbs)
  const availablePacks = useMemo(() => {
    return packs.filter(p => p.name !== 'Irregular Verbs');
  }, [packs]);

  // Selected target pack object
  const targetPack = useMemo(() => {
    return availablePacks.find(p => p.id === targetPackId) || null;
  }, [availablePacks, targetPackId]);

  // Target pack existing chapters
  const targetChapters = useMemo(() => {
    if (!targetPack) return [];
    return targetPack.chapters || [];
  }, [targetPack]);

  if (!isOpen) return null;

  const count = selectedWordIds.length;
  const isNewChapter = targetChapter === '__NEW__';
  const isFormInvalid = isNewChapter && !newChapterName.trim();

  const handleMove = async () => {
    if (!user || count === 0 || isSubmitting || isFormInvalid) return;

    const finalChapter = isNewChapter ? newChapterName.trim() : targetChapter;
    const wordsToMove = sourceWords.filter(w => selectedWordIds.includes(w.id));

    if (wordsToMove.length === 0) return;

    setIsSubmitting(true);

    try {
      const isSamePack = targetPackId === sourcePackId;

      if (isSamePack) {
        // Move within same pack (update topic/chapter of selected words)
        const updates = {};
        wordsToMove.forEach(w => {
          updates[`users/${user.uid}/words/${sourcePackId}/${w.id}/topic`] = finalChapter;
        });
        await update(ref(db), updates);

        // Update pack chapters list if new chapter added
        if (finalChapter && !targetChapters.includes(finalChapter) && updatePack) {
          const nextChapters = [...targetChapters, finalChapter];
          await updatePack(sourcePackId, { chapters: nextChapters });
        }
      } else {
        // Move across different packs
        const rootUpdates = {};

        wordsToMove.forEach(w => {
          const newWordKey = push(ref(db, `users/${user.uid}/words/${targetPackId}`)).key;
          const wordCopy = {
            word: w.word || '',
            translation: w.translation || '',
            definition: w.definition || '',
            example: w.example || '',
            notes: w.notes || '',
            customSentence: w.customSentence || '',
            partOfSpeech: w.partOfSpeech || 'noun',
            synonyms: w.synonyms || '',
            collocations: w.collocations || '',
            nounForm: w.nounForm || '',
            verbForm: w.verbForm || '',
            adjectiveForm: w.adjectiveForm || '',
            adverbForm: w.adverbForm || '',
            article: w.article || '',
            topic: finalChapter,
            addedAt: w.addedAt || new Date().toISOString(),
            mastery: w.mastery || 0,
            interval: w.interval || 0,
            reviewCount: w.reviewCount || 0,
            nextReview: w.nextReview || null,
            lastReviewed: w.lastReviewed || null
          };

          rootUpdates[`users/${user.uid}/words/${targetPackId}/${newWordKey}`] = wordCopy;
          rootUpdates[`users/${user.uid}/words/${sourcePackId}/${w.id}`] = null;
        });

        await update(ref(db), rootUpdates);

        // Update word counts for both packs
        try {
          await runTransaction(
            ref(db, `users/${user.uid}/packs/${sourcePackId}/wordCount`),
            c => Math.max(0, (c || 0) - wordsToMove.length)
          );
          await runTransaction(
            ref(db, `users/${user.uid}/packs/${targetPackId}/wordCount`),
            c => (c || 0) + wordsToMove.length
          );
        } catch (cntErr) {
          console.warn("Failed to sync wordCount after move:", cntErr);
        }

        // Update target pack chapters list if new chapter added
        if (finalChapter && !targetChapters.includes(finalChapter) && updatePack) {
          const nextChapters = [...targetChapters, finalChapter];
          await updatePack(targetPackId, { chapters: nextChapters });
        }
      }

      playSound('correct');

      if (onSuccess) {
        onSuccess(wordsToMove.length);
      }
      onClose();
    } catch (err) {
      console.error("Error moving words:", err);
      alert("Failed to move words. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="move-words-modal-overlay" onClick={onClose}>
      <motion.div
        className="move-words-modal-card"
        initial={{ opacity: 0, scale: 0.92, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 10 }}
        transition={{ duration: 0.2 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="move-words-modal-header">
          <div className="move-words-icon">
            <FolderInput size={22} />
          </div>
          <div className="move-words-title-area">
            <h3>{t('wordList.moveTitle')}</h3>
            <p>{t('wordList.moveSubtitle', { count })}</p>
          </div>
          <button type="button" className="move-words-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="move-words-modal-body">
          {/* Target Pack Select */}
          <div className="move-words-field">
            <label>{t('wordList.selectTargetPack')}</label>
            <select
              className="select move-words-select"
              value={targetPackId}
              onChange={e => {
                setTargetPackId(e.target.value);
                setTargetChapter('');
                setNewChapterName('');
              }}
            >
              {availablePacks.map(p => (
                <option key={p.id} value={p.id}>
                  {p.icon || '📦'} {p.name} ({p.wordCount || 0}){p.id === sourcePackId ? ` • (${t('wordList.currentPack')})` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Target Chapter Select */}
          <div className="move-words-field">
            <label>{t('wordList.selectTargetChapter')}</label>
            <select
              className="select move-words-select"
              value={targetChapter}
              onChange={e => setTargetChapter(e.target.value)}
            >
              <option value="">{t('wordList.noChapterOption')}</option>
              {targetChapters.map(ch => (
                <option key={ch} value={ch}>
                  📖 {ch}
                </option>
              ))}
              <option value="__NEW__">{t('wordList.newChapterOption')}</option>
            </select>
          </div>

          {/* New Chapter Input if __NEW__ chosen */}
          {isNewChapter && (
            <motion.div
              className="move-words-field"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.15 }}
            >
              <div className="move-words-new-chapter-row">
                <Plus size={16} className="move-words-plus-icon" />
                <input
                  type="text"
                  className="input move-words-input"
                  placeholder={t('wordList.newChapterPlaceholder')}
                  value={newChapterName}
                  onChange={e => setNewChapterName(e.target.value)}
                  maxLength={120}
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </div>

        <div className="move-words-modal-actions">
          <button
            type="button"
            className="move-words-btn cancel"
            onClick={onClose}
            disabled={isSubmitting}
          >
            {t('wordCard.cancel')}
          </button>

          <button
            type="button"
            className="move-words-btn submit"
            onClick={handleMove}
            disabled={isSubmitting || isFormInvalid}
          >
            {isSubmitting ? (
              <span>{t('wordList.moving')}</span>
            ) : (
              <>
                <FolderInput size={16} />
                <span>{t('wordList.moveBtn')}</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
