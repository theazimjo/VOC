/**
 * Get questions for a specific exercise type.
 * Exercise 1: Multiple Choice (existing questions array)
 * Exercise 2: Fill in the Blanks (fillBlanks array)
 * Exercise 3: Scrambled Sentences (scrambled array)
 * Exercise 4: Error Correction (errorCorrection array)
 * Exercise 5: Sentence Transformation (transform array)
 * Exercise 6: Situational Dialogues (dialogue array)
 */
export function getQuestionsForExercise(topic, exerciseIdStr) {
  if (!topic) return [];
  const exerciseId = parseInt(exerciseIdStr, 10) || 1;
  
  let pool = [];

  // 1. Check if topic has topic.exercises array (newer structured format)
  if (topic.exercises && Array.isArray(topic.exercises) && topic.exercises.length > 0) {
    const exByIdx = topic.exercises[exerciseId - 1];
    if (exByIdx && Array.isArray(exByIdx.questions) && exByIdx.questions.length > 0) {
      pool = exByIdx.questions;
    } else {
      const exObj = topic.exercises.find((e) => {
        if (exerciseId === 1) return e.type === 'multiple-choice' || e.id?.includes('mcq');
        if (exerciseId === 2) return e.type === 'fill-in-blanks' || e.id?.includes('fill') || e.id?.includes('fib');
        if (exerciseId === 3) return e.type === 'scrambled-sentences' || e.id?.includes('scrambled') || e.id?.includes('scram');
        if (exerciseId === 4) return e.type === 'error-correction' || e.id?.includes('error') || e.id?.includes('err');
        if (exerciseId === 5) return e.type === 'sentence-transformation' || e.id?.includes('transform') || e.id?.includes('trans');
        if (exerciseId === 6) return e.type === 'dialogue-completion' || e.id?.includes('dialogue') || e.id?.includes('dia');
        return false;
      });
      if (exObj && Array.isArray(exObj.questions) && exObj.questions.length > 0) {
        pool = exObj.questions;
      }
    }
  }

  // 2. Fallback to direct properties on topic object if pool is still empty
  if (!pool || pool.length === 0) {
    switch (exerciseId) {
      case 1:
        pool = topic.questions || [];
        break;
      case 2:
        pool = topic.fillBlanks || topic.questions || [];
        break;
      case 3:
        pool = topic.scrambled || topic.questions || [];
        break;
      case 4:
        pool = topic.errorCorrection || topic.questions || [];
        break;
      case 5:
        pool = topic.transform || topic.questions || [];
        break;
      case 6:
        pool = topic.dialogue || topic.questions || [];
        break;
      default:
        pool = topic.questions || [];
    }
  }

  if (!pool || pool.length === 0) pool = topic.questions || [];

  // Return up to 20 questions
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(20, shuffled.length));
}

export function getExerciseType(exerciseId, t) {
  const types = {
    1: { name: t ? t('grammar.exType1') : 'Multiple Choice', icon: '🎯', color: '#F59E0B' },
    2: { name: t ? t('grammar.exType2') : 'Fill in the Blanks', icon: '✏️', color: '#10B981' },
    3: { name: t ? t('grammar.exType3') : 'Sentence Building', icon: '🔀', color: '#6366F1' },
    4: { name: t ? t('grammar.exType4') : 'Error Correction', icon: '🔍', color: '#EF4444' },
    5: { name: t ? t('grammar.exType5') : 'Sentence Transformation', icon: '🔄', color: '#8B5CF6' },
    6: { name: t ? t('grammar.exType6') : 'Situational Dialogues', icon: '💬', color: '#06B6D4' },
  };
  return types[parseInt(exerciseId, 10)] || types[1];
}

import { grammarData } from '../data/grammarData.js';

export function findGrammarTopic(level, topicId) {
  if (!topicId) return null;
  const datasets = [grammarData];

  // 1. Try finding in the specified level across datasets
  if (level) {
    for (const ds of datasets) {
      if (ds?.[level]?.topics) {
        const found = ds[level].topics.find((t) => t?.id === topicId);
        if (found) return found;
      }
    }
  }

  // 2. Search across ALL levels in ALL datasets (fallback)
  for (const ds of datasets) {
    if (!ds) continue;
    for (const lvl of Object.keys(ds)) {
      if (ds[lvl]?.topics) {
        const found = ds[lvl].topics.find((t) => t?.id === topicId);
        if (found) return found;
      }
    }
  }

  return null;
}

