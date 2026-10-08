import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadGrammarLevel, loadAllGrammarLevels, getLoadedGrammar } from '../../data/grammarLevels';
import { findGrammarTopic } from '../../utils/grammarHelpers';
import FullScreenLoader from '../../components/common/FullScreenLoader';

// Holds a grammar topic page back until the level it belongs to has loaded,
// so the page itself can keep reading topics synchronously.
export default function GrammarLevelGate({ children }) {
  const { level = 'beginner', topicId } = useParams();
  const [ready, setReady] = useState(() => !!getLoadedGrammar()[level]);

  useEffect(() => {
    let cancelled = false;
    setReady(!!getLoadedGrammar()[level]);
    loadGrammarLevel(level)
      // a topic opened under the wrong level is still found, as before
      .then(() => (findGrammarTopic(level, topicId) ? null : loadAllGrammarLevels()))
      .then(() => { if (!cancelled) setReady(true); });
    return () => { cancelled = true; };
  }, [level, topicId]);

  return ready ? children : <FullScreenLoader />;
}
