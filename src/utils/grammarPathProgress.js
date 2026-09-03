const PATH_PROGRESS_KEY = 'grammar_path_progress';
const PASS_RATIO = 0.6;

export function loadPathProgress() {
  try {
    const raw = localStorage.getItem(PATH_PROGRESS_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return {
      completedLessons: parsed?.completedLessons || {},
      completedPractices: parsed?.completedPractices || {},
      completedReviews: parsed?.completedReviews || {},
    };
  } catch {
    return { completedLessons: {}, completedPractices: {}, completedReviews: {} };
  }
}

export function isPassed(score, total) {
  return total > 0 && score / total >= PASS_RATIO;
}

export function saveLessonComplete(lessonId, score, total) {
  try {
    const progress = loadPathProgress();
    const prev = progress.completedLessons[lessonId];
    if (!prev || score > prev.score) {
      progress.completedLessons[lessonId] = { score, total, date: Date.now() };
      localStorage.setItem(PATH_PROGRESS_KEY, JSON.stringify(progress));
    }
  } catch {
    // localStorage unavailable — path progress persistence is optional.
  }
}

export function savePracticeComplete(lessonId, score, total) {
  try {
    const progress = loadPathProgress();
    const prev = progress.completedPractices[lessonId];
    if (!prev || score > prev.score) {
      progress.completedPractices[lessonId] = { score, total, date: Date.now() };
      localStorage.setItem(PATH_PROGRESS_KEY, JSON.stringify(progress));
    }
  } catch {
    // localStorage unavailable
  }
}

export function saveReviewComplete(sectionId, score, total) {
  try {
    const progress = loadPathProgress();
    const prev = progress.completedReviews[sectionId];
    if (!prev || score > prev.score) {
      progress.completedReviews[sectionId] = { score, total, date: Date.now() };
      localStorage.setItem(PATH_PROGRESS_KEY, JSON.stringify(progress));
    }
  } catch {
    // localStorage unavailable — path progress persistence is optional.
  }
}
