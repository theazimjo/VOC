// Sicilian and Greek were removed from the app. Packs left over from them (courseId or name)
// stay in the database but must not count anywhere: not in statistics, due words or practice.
const REMOVED_COURSES = ['sicilian-a1', 'greek-a1'];
const REMOVED_NAME = /sitsiliya|sicilian|yunon|greek/i;

export function isRemovedLanguagePack(pack) {
  if (!pack) return false;
  if (pack.courseId && REMOVED_COURSES.includes(pack.courseId)) return true;
  return REMOVED_NAME.test(pack.name || pack.title || '');
}
