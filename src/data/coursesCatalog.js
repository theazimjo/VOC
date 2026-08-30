import { essential3000Months } from './essential3000';
import { sicilianA1Months } from './sicilianCourse';

// Ready-made courses offered from the navbar's "Add" modal. Each entry maps
// a stable `id` (persisted on the personal pack as `courseId` once started)
// to the data that powers the course's Dashboard/Lesson/Vocabulary pages at
// /course/:packId. `data.months` is optional — a course with none just
// shows the empty state on those pages until content is added later.
export const AVAILABLE_COURSES = [
  {
    id: 'essential-3000',
    icon: '📗',
    data: {
      title: 'Essential 3000',
      level: 'Intermediate',
      description: '',
      months: essential3000Months,
    },
  },
  {
    id: 'science',
    icon: '🔬',
    data: {
      title: 'Science',
      level: 'Intermediate',
      description: '',
      // Science doesn't use the months/units stage model — its own
      // ScienceDashboard/ScienceLesson components (branched on
      // pack.courseId in CourseDashboard.jsx/CourseLesson.jsx) read
      // chapters straight from src/data/scienceCourse.js instead.
      months: [],
    },
  },
  {
    id: 'sicilian-a1',
    icon: '🌋',
    data: {
      title: 'Sitsiliya tili A1',
      level: 'Beginner',
      description: "0 dan A1 darajasigacha sitsiliya tili kursi — har hafta so'z boyligi, grammatika, o'qish va tinglash birga o'tiladi.",
      months: sicilianA1Months,
    },
  },
];

export function getCourseCatalog(courseId) {
  if (!courseId) return null;
  return AVAILABLE_COURSES.find((c) => c.id === courseId) || null;
}
