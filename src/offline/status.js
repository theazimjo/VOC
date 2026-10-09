// What the offline layer is doing, for the little "offline / syncing" indicator.
let state = { online: true, pending: 0 };
const subscribers = new Set();

export const getOfflineStatus = () => state;

export function setOfflineStatus(patch) {
  const next = { ...state, ...patch };
  if (next.online === state.online && next.pending === state.pending) return;
  state = next;
  subscribers.forEach((fn) => fn());
}

export function subscribeOfflineStatus(fn) {
  subscribers.add(fn);
  return () => subscribers.delete(fn);
}
