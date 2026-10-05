import { useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { studentCorp } from '../i18n/studentCorp';

const LOCALES = { en: 'en-US', ru: 'ru-RU', uz: 'uz-UZ' };

function lookup(dict, key) {
  return key.split('.').reduce((acc, k) => (acc && acc[k] !== undefined ? acc[k] : undefined), dict);
}

// Translator for the corp student panel: t('ov.welcome'), t('ov.subLeft', { n: 3 }).
// Falls back to English, then to the key itself. tn(key, n) picks `key_one`
// for exactly one and `key` otherwise, with {n} filled in.
export function useStudentT() {
  const { language } = useLanguage();
  const lang = studentCorp[language] ? language : 'en';

  const t = useCallback((key, vars) => {
    const value = lookup(studentCorp[lang], key) ?? lookup(studentCorp.en, key) ?? key;
    if (typeof value !== 'string' || !vars) return value;
    return value.replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? vars[k] : `{${k}}`));
  }, [lang]);

  const tn = useCallback((key, n, vars) => t(n === 1 ? `${key}_one` : key, { n, ...vars }), [t]);

  // "{month} {day}, {year}" etc. in the active language; year is optional.
  const fmtDate = useCallback((ts, { withYear = true } = {}) => {
    if (!ts) return '—';
    const d = new Date(ts);
    if (Number.isNaN(d.getTime())) return '—';
    return t(withYear ? 'profile.dateFmt' : 'profile.dateFmtShort', {
      day: d.getDate(), month: lookup(studentCorp[lang], 'profile.months')[d.getMonth()], year: d.getFullYear(),
    });
  }, [t, lang]);

  return { t, tn, fmtDate, lang, locale: LOCALES[lang] };
}
