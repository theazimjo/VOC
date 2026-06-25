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
  const exerciseId = parseInt(exerciseIdStr, 10) || 1;
  
  let pool = [];
  
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
  
  if (!pool || pool.length === 0) pool = topic.questions || [];
  
  // Shuffle and take 20
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(20, shuffled.length));
}

export function getExerciseType(exerciseId) {
  const types = {
    1: { name: 'Ko\'p tanlovli', icon: '🎯', color: '#F59E0B' },
    2: { name: 'Bo\'shliq to\'ldirish', icon: '✏️', color: '#10B981' },
    3: { name: 'Gap yig\'ish', icon: '🔀', color: '#6366F1' },
    4: { name: 'Xato topish', icon: '🔍', color: '#EF4444' },
    5: { name: 'Transformatsiya', icon: '🔄', color: '#8B5CF6' },
    6: { name: 'Muloqot', icon: '💬', color: '#06B6D4' },
  };
  return types[parseInt(exerciseId, 10)] || types[1];
}
