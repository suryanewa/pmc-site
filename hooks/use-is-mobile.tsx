import { useSyncExternalStore } from 'react';

const MOBILE_QUERY = '(max-width: 767px)';

let mediaQueryList: MediaQueryList | null = null;
const subscribers = new Set<() => void>();

function getMediaQueryList() {
  if (mediaQueryList) {
    return mediaQueryList;
  }
  mediaQueryList = window.matchMedia(MOBILE_QUERY);
  return mediaQueryList;
}

function notifySubscribers() {
  subscribers.forEach((subscriber) => subscriber());
}

function subscribe(callback: () => void) {
  const mql = getMediaQueryList();
  subscribers.add(callback);

  if (subscribers.size === 1) {
    mql.addEventListener('change', notifySubscribers);
  }

  return () => {
    subscribers.delete(callback);
    if (subscribers.size === 0) {
      mql.removeEventListener('change', notifySubscribers);
    }
  };
}

function getSnapshot() {
  return getMediaQueryList().matches;
}

function getServerSnapshot() {
  return false;
}

function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export { useIsMobile };
