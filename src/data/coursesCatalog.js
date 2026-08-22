// Ready-made courses offered from the navbar's "Add" modal. Each entry maps
// a stable `id` (persisted on the personal pack as `courseId` once started)
// to the static months/units/words data that powers the course's Dashboard/
// Lesson/Vocabulary pages at /course/:packId.
//
// Empty for now — the course *section* (sidebar, dashboard, lesson,
// vocabulary, navbar switcher entry) is built, but no ready-made word
// content is wired in yet.
export const AVAILABLE_COURSES = [];

export function getCourseCatalog(courseId) {
  if (!courseId) return null;
  return AVAILABLE_COURSES.find((c) => c.id === courseId) || null;
}
