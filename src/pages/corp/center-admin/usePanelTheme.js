import { useSyncExternalStore } from 'react';

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
