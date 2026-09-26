import { useCallback, useState } from 'react';

const KEY = 'voc_corp_sidebar_collapsed';

// Shared collapsed state for the corp sidebars, remembered across reloads.
// The main pane follows it via CSS (:has(.corp-admin-sidebar.collapsed)).
export function useSidebarCollapsed() {
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem(KEY) === '1'; } catch { return false; }
  });
  const toggle = useCallback(() => {
    setCollapsed((c) => {
      try { localStorage.setItem(KEY, c ? '0' : '1'); } catch { /* private mode */ }
      return !c;
    });
  }, []);
  return [collapsed, toggle];
}
