import { useMemo, useSyncExternalStore } from 'react';

function useMatchMedia(query: string) {
  const breakPointQuery: MediaQueryList = useMemo(() => window.matchMedia(query), [query]);

  function subscribe(callback: () => void) {
    breakPointQuery.addEventListener('change', callback);

    return () => {
      breakPointQuery.removeEventListener('change', callback);
    };
  }
  function getSnapshot() {
    return breakPointQuery.matches;
  }

  return useSyncExternalStore(subscribe, getSnapshot);
}

export { useMatchMedia };
