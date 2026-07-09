// Static badge definitions. Unlocked state is derived live from current
// stats (word count / mastered count / streak) rather than stored, so a
// badge always reflects the user's current standing.
export const ACHIEVEMENTS = [
  { id: 'words-10', category: 'words', threshold: 10, icon: 'BookOpen', title: "Boshlang'ich", desc: "10 ta so'z qo'shdingiz" },
  { id: 'words-50', category: 'words', threshold: 50, icon: 'BookOpen', title: "Kutubxonachi", desc: "50 ta so'z qo'shdingiz" },
  { id: 'words-100', category: 'words', threshold: 100, icon: 'BookOpen', title: "Kolleksioner", desc: "100 ta so'z qo'shdingiz" },
  { id: 'words-250', category: 'words', threshold: 250, icon: 'BookOpen', title: "So'z ustasi", desc: "250 ta so'z qo'shdingiz" },
  { id: 'words-500', category: 'words', threshold: 500, icon: 'BookOpen', title: "Lug'atshunos", desc: "500 ta so'z qo'shdingiz" },

  { id: 'mastered-10', category: 'mastered', threshold: 10, icon: 'CheckCircle2', title: "O'zlashtiruvchi", desc: "10 ta so'zni o'zlashtirdingiz" },
  { id: 'mastered-50', category: 'mastered', threshold: 50, icon: 'CheckCircle2', title: "Bilimdon", desc: "50 ta so'zni o'zlashtirdingiz" },
  { id: 'mastered-100', category: 'mastered', threshold: 100, icon: 'Trophy', title: "Chempion", desc: "100 ta so'zni o'zlashtirdingiz" },
  { id: 'mastered-250', category: 'mastered', threshold: 250, icon: 'Trophy', title: "Usta", desc: "250 ta so'zni o'zlashtirdingiz" },

  { id: 'streak-3', category: 'streak', threshold: 3, icon: 'Flame', title: "Qizg'in boshlanish", desc: '3 kunlik seriya' },
  { id: 'streak-7', category: 'streak', threshold: 7, icon: 'Flame', title: 'Bir hafta', desc: '7 kunlik seriya' },
  { id: 'streak-30', category: 'streak', threshold: 30, icon: 'Flame', title: 'Bir oy', desc: '30 kunlik seriya' },
  { id: 'streak-100', category: 'streak', threshold: 100, icon: 'Flame', title: 'Temir intizom', desc: '100 kunlik seriya' }
];

/**
 * Returns each achievement annotated with { unlocked, current, threshold }
 * based on the live stats passed in.
 */
export function getAchievementProgress({ totalWords = 0, masteredWords = 0, streakCount = 0 }) {
  const currentByCategory = {
    words: totalWords,
    mastered: masteredWords,
    streak: streakCount
  };

  return ACHIEVEMENTS.map((a) => {
    const current = currentByCategory[a.category] || 0;
    return { ...a, current, unlocked: current >= a.threshold };
  });
}
