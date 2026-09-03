import { auth, db } from '../firebase';
import { ref, onValue, update } from 'firebase/database';

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
      const entry = { score, total, date: Date.now() };
      progress.completedLessons[lessonId] = entry;
      localStorage.setItem(PATH_PROGRESS_KEY, JSON.stringify(progress));

      // Sync to Firebase Realtime Database
      const user = auth.currentUser;
      if (user) {
        const progressRef = ref(db, `users/${user.uid}/grammar/path_progress/completedLessons`);
        update(progressRef, { [lessonId]: entry }).catch(console.error);
      }
    }
  } catch (err) {
    console.error('Error saving lesson progress:', err);
  }
}

export function savePracticeComplete(lessonId, score, total) {
  try {
    const progress = loadPathProgress();
    const prev = progress.completedPractices[lessonId];
    if (!prev || score > prev.score) {
      const entry = { score, total, date: Date.now() };
      progress.completedPractices[lessonId] = entry;
      localStorage.setItem(PATH_PROGRESS_KEY, JSON.stringify(progress));

      // Sync to Firebase Realtime Database
      const user = auth.currentUser;
      if (user) {
        const progressRef = ref(db, `users/${user.uid}/grammar/path_progress/completedPractices`);
        update(progressRef, { [lessonId]: entry }).catch(console.error);
      }
    }
  } catch (err) {
    console.error('Error saving practice progress:', err);
  }
}

export function saveReviewComplete(sectionId, score, total) {
  try {
    const progress = loadPathProgress();
    const prev = progress.completedReviews[sectionId];
    if (!prev || score > prev.score) {
      const entry = { score, total, date: Date.now() };
      progress.completedReviews[sectionId] = entry;
      localStorage.setItem(PATH_PROGRESS_KEY, JSON.stringify(progress));

      // Sync to Firebase Realtime Database
      const user = auth.currentUser;
      if (user) {
        const progressRef = ref(db, `users/${user.uid}/grammar/path_progress/completedReviews`);
        update(progressRef, { [sectionId]: entry }).catch(console.error);
      }
    }
  } catch (err) {
    console.error('Error saving review progress:', err);
  }
}

export function subscribePathProgress(uid, callback) {
  if (!uid) return () => {};
  const progressRef = ref(db, `users/${uid}/grammar/path_progress`);
  return onValue(
    progressRef,
    (snapshot) => {
      const remoteData = snapshot.val() || {};
      const localData = loadPathProgress();

      const merged = {
        completedLessons: { ...localData.completedLessons, ...(remoteData.completedLessons || {}) },
        completedPractices: { ...localData.completedPractices, ...(remoteData.completedPractices || {}) },
        completedReviews: { ...localData.completedReviews, ...(remoteData.completedReviews || {}) },
      };

      try {
        localStorage.setItem(PATH_PROGRESS_KEY, JSON.stringify(merged));
      } catch (e) {
        console.error(e);
      }

      if (callback) callback(merged);
    },
    (err) => {
      console.error('Error fetching Firebase path progress:', err);
    }
  );
}
