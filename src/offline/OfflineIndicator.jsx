import { useSyncExternalStore } from 'react';
import { WifiOff } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getOfflineStatus, subscribeOfflineStatus } from './status';
import './OfflineIndicator.css';

const TEXT = {
  en: { offline: 'Offline · changes are saved on this device', offlineWith: 'Offline · {n} waiting to send', syncing: 'Sending {n} change(s)…' },
  uz: { offline: "Internet yo'q · o'zgarishlar qurilmada saqlanadi", offlineWith: "Internet yo'q · {n} ta yuborilishini kutyapti", syncing: "{n} ta o'zgarish yuborilmoqda…" },
  ru: { offline: 'Нет сети · изменения сохраняются на устройстве', offlineWith: 'Нет сети · ждут отправки: {n}', syncing: 'Отправка изменений: {n}…' },
};

// A small pill: shown only while there is no connection. Silent whenever online.
export default function OfflineIndicator() {
  const { language } = useLanguage();
  const { online, pending } = useSyncExternalStore(subscribeOfflineStatus, getOfflineStatus);
  const t = TEXT[language] || TEXT.en;
  // Online, sending saved changes happens quietly in the background.
  if (online) return null;

  const message = (pending > 0 ? t.offlineWith : t.offline).replace('{n}', pending);

  return (
    <div className="offline-pill is-offline" role="status" aria-live="polite">
      <WifiOff size={14} />
      <span>{message}</span>
    </div>
  );
}
