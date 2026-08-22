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
    },
  },
];

export function getCourseCatalog(courseId) {
  if (!courseId) return null;
  return AVAILABLE_COURSES.find((c) => c.id === courseId) || null;
}
