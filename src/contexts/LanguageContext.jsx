import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { ref, update, get } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from './AuthContext';
import { translations, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../i18n/translations';

const LanguageContext = createContext();

const STORAGE_KEY = 'voc-language';

function isSupported(code) {
  return SUPPORTED_LANGUAGES.some((l) => l.code === code);
}

function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

function interpolate(str, vars) {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, key) => (vars[key] !== undefined ? vars[key] : `{${key}}`));
}

export function LanguageProvider({ children }) {
  const { user } = useAuth();
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return isSupported(saved) ? saved : DEFAULT_LANGUAGE;
  });
  // Pulls the account's saved language once per signed-in uid — a later
  // local change (setLanguage) must not be clobbered by a stale refetch.
  const syncedUidRef = useRef(null);

  useEffect(() => {
    if (!user?.uid || syncedUidRef.current === user.uid) return;
    syncedUidRef.current = user.uid;
    get(ref(db, `users/${user.uid}/profile/language`))
      .then((snap) => {
        const remote = snap.val();
        if (isSupported(remote)) {
          setLanguageState(remote);
          localStorage.setItem(STORAGE_KEY, remote);
        }
      })
      .catch(() => {});
  }, [user?.uid]);

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const setLanguage = useCallback((lang) => {
    if (!isSupported(lang)) return;
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    if (user?.uid) {
      update(ref(db, `users/${user.uid}/profile`), { language: lang }).catch(() => {});
    }
  }, [user?.uid]);

  const t = useCallback((key, vars) => {
    const dict = translations[language] || translations[DEFAULT_LANGUAGE];
    const value = getByPath(dict, key) ?? getByPath(translations[DEFAULT_LANGUAGE], key) ?? key;
    if (typeof value === 'string') return interpolate(value, vars);
    return value;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
