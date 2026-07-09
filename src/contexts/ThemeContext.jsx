import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = [
  { id: 'ios', name: 'Yorug\' rejim', desc: 'Oq fon, sistem havorang va yashil urg\'u ranglari' },
  { id: 'android', name: 'Tungi rejim', desc: 'Qora fon, sistem havorang va yashil urg\'u ranglari' }
];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('voc-theme') || 'ios';
    return ['ios', 'android'].includes(saved) ? saved : 'ios';
  });
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
