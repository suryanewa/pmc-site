import { useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
  const mql = window.matchMedia('(max-width: 767px)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getSnapshot() {
  return window.matchMedia('(max-width: 767px)').matches;
}

function getServerSnapshot() {
  return false;
}

function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export { useIsMobile };
