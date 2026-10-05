import { useLanguage } from '../contexts/LanguageContext';

/**
 * Language for the public pages (landing, login, register). The audience is
 * Uzbek-speaking, so show UZ until the visitor has actually chosen a language
 * (the app-wide default is English). UZ, RU and EN are written for these
 * pages; anything else falls back to UZ.
 */
export function useSiteLanguage() {
  const { language, setLanguage } = useLanguage();
  let hasChosen = false;
  try { hasChosen = !!localStorage.getItem('voc-language'); } catch { /* storage blocked */ }
  const lang = hasChosen && (language === 'en' || language === 'ru') ? language : 'uz';
  return { lang, setLanguage };
}
