import { createContext, useContext } from 'react';

// The practice screens put their button labels in capitals (a Duolingo-style
// look). Screens that want normal-case buttons - the student panel - wrap the
// practice in <PracticeCaps.Provider value={false}>.
export const PracticeCaps = createContext(true);

// Some translations are stored in capitals already ("KEEP LEARNING"); in
// normal-case mode those are turned into "Keep learning".
const sentenceCase = (s) => (s === s.toUpperCase() && s !== s.toLowerCase() ? s.charAt(0) + s.slice(1).toLowerCase() : s);

export function usePracticeCase() {
  const caps = useContext(PracticeCaps);
  return (label) => {
    if (typeof label !== 'string') return label;
    return caps ? label.toUpperCase() : sentenceCase(label);
  };
}
