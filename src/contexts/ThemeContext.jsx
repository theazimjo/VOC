import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = [
  { id: 'ios', name: 'iOS Style', desc: 'Minimalistik, yumshoq oyna va nafis o\'tishlar' },
  { id: 'android', name: 'Android Material', desc: 'Material You dizayn tili va organik shakllar' },
  { id: 'god-of-war', name: 'God of War', desc: 'Runa toshlari, olov va qon rangli qadimiy mavzu' },
  { id: 'halo', name: 'Halo Space', desc: 'Yorqin gologrammalar, futuristik harbiy interfeys' },
  { id: 'cyberpunk', name: 'Cyberpunk 2077', desc: 'Neon ranglar, raqamli yomg\'ir va glitch effektlari' },
  { id: 'kingdom-come', name: 'Kingdom Come', desc: 'O\'rta asrlar pergamenti, oltin va barglar' },
  { id: 'resident-evil', name: 'Resident Evil', desc: 'Zombi virusi sporasi, biohazard va qorong\'u atmosfera' }
];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('voc-theme') || 'ios');
  const [particlesEnabled, setParticlesEnabled] = useState(() => {
    const saved = localStorage.getItem('voc-particles');
    return saved !== null ? saved === 'true' : true;
  });
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('voc-font-size') || 'normal'); // small, normal, large
  const [audioEnabled, setAudioEnabled] = useState(() => {
    const saved = localStorage.getItem('voc-audio');
    return saved !== null ? saved === 'true' : true;
  });
  const [performanceMode, setPerformanceMode] = useState(false); // If FPS drops, disable particles

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('voc-theme', theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-font-size', fontSize);
    localStorage.setItem('voc-font-size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('voc-particles', particlesEnabled);
  }, [particlesEnabled]);

  useEffect(() => {
    localStorage.setItem('voc-audio', audioEnabled);
  }, [audioEnabled]);

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      particlesEnabled,
      setParticlesEnabled,
      fontSize,
      setFontSize,
      audioEnabled,
      setAudioEnabled,
      performanceMode,
      setPerformanceMode,
      themes
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
