import { useEffect, useState, useSyncExternalStore } from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getOfflineStatus, subscribeOfflineStatus } from './status';
import './OfflineIndicator.css';

const TEXT = {
  en: { offline: 'Offline · changes are saved on this device', offlineWith: 'Offline · {n} waiting to send', syncing: 'Sending {n} change(s)…' },
  uz: { offline: "Internet yo'q · o'zgarishlar qurilmada saqlanadi", offlineWith: "Internet yo'q · {n} ta yuborilishini kutyapti", syncing: "{n} ta o'zgarish yuborilmoqda…" },
  ru: { offline: 'Нет сети · изменения сохраняются на устройстве', offlineWith: 'Нет сети · ждут отправки: {n}', syncing: 'Отправка изменений: {n}…' },
};

// A small pill at the top: shown while there is no connection, and while saved
// changes are being sent. Silent when everything is simply online and in sync.
export default function OfflineIndicator() {
  const { language } = useLanguage();
  const { online, pending } = useSyncExternalStore(subscribeOfflineStatus, getOfflineStatus);
  const [showSyncing, setShowSyncing] = useState(false);

  // a write confirmed within a moment is not worth announcing
  useEffect(() => {
    if (!online || pending === 0) { setShowSyncing(false); return undefined; }
    const timer = setTimeout(() => setShowSyncing(true), 1800);
    return () => clearTimeout(timer);
  }, [online, pending]);

  const t = TEXT[language] || TEXT.en;
  if (online && !showSyncing) return null;

  const message = !online
    ? (pending > 0 ? t.offlineWith : t.offline).replace('{n}', pending)
    : t.syncing.replace('{n}', pending);

  return (
    <div className={`offline-pill ${online ? 'is-syncing' : 'is-offline'}`} role="status" aria-live="polite">
      {online ? <RefreshCw size={14} className="offline-pill-spin" /> : <WifiOff size={14} />}
      <span>{message}</span>
    </div>
  );
}
