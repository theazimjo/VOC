import { useEffect, useSyncExternalStore } from 'react';

// Light/dark for the center admin + teacher panels, remembered per device.
const KEY = 'voc_panel_theme';
const listeners = new Set();

function read() {
  try { return localStorage.getItem(KEY) === 'dark' ? 'dark' : 'light'; } catch { return 'light'; }
}

export function setPanelTheme(theme) {
  try { localStorage.setItem(KEY, theme); } catch { /* private mode */ }
  listeners.forEach((l) => l());
}

const subscribe = (cb) => { listeners.add(cb); return () => listeners.delete(cb); };

export function usePanelTheme() {
  return useSyncExternalStore(subscribe, read, () => 'light');
}

// The staff panels (center admin, teacher, super admin) only have their own light
// and dark look. The app-wide theme a person picked for learning (white, black or
// sepia) must not leak into them, so while a panel is open the page's data-theme
// follows the panel (data-panel tells ThemeContext to keep out), and the person's
// own choice comes back when they leave it.
export function useApplyPanelTheme(theme) {
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-panel', '');
    root.setAttribute('data-theme', theme === 'dark' ? 'android' : 'ios');
    return () => {
      root.removeAttribute('data-panel');
      let own = 'ios';
      try { own = localStorage.getItem('voc-theme') || 'ios'; } catch { /* storage blocked */ }
      root.setAttribute('data-theme', own);
    };
  }, [theme]);
}
