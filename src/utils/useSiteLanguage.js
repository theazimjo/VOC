import { useLanguage } from '../contexts/LanguageContext';

/**
 * Language for the public pages (landing, login, register). English is the
 * default until the visitor has chosen a language. UZ, RU and EN are written
 * for these pages; anything else falls back to EN.
 */
export function useSiteLanguage() {
  const { language, setLanguage } = useLanguage();
  let hasChosen = false;
  try { hasChosen = !!localStorage.getItem('voc-language'); } catch { /* storage blocked */ }
  const lang = hasChosen && (language === 'uz' || language === 'ru') ? language : 'en';
  return { lang, setLanguage };
}
