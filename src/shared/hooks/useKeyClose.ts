import { useEffect } from 'react';

/**
 * Calls `onClose` when `key` (default `Escape`) is pressed while open.
 *
 * @param key - A `KeyboardEvent.key` value.
 */
export function useKeyClose(
	isOpen: boolean,
	onClose: () => void,
	key: string = 'Escape',
): void {
	useEffect(() => {
		if (!isOpen) return;

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === key) onClose();
		}

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [isOpen, onClose, key]);
}
