import { useCallback, useMemo, useSyncExternalStore } from 'react';

/**
 * Tells whether the media `query` matches, re-rendering when the result changes.
 */
export function useMatchMedia(query: string): boolean {
	const mediaQueryList = useMemo(() => window.matchMedia(query), [query]);

	const subscribe = useCallback(
		(onChange: () => void) => {
			mediaQueryList.addEventListener('change', onChange);
			return () => mediaQueryList.removeEventListener('change', onChange);
		},
		[mediaQueryList],
	);

	return useSyncExternalStore(subscribe, () => mediaQueryList.matches);
}
