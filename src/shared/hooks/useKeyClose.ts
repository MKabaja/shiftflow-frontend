import { useEffect } from 'react';

/**
 * Custom hook to close dropdowns or modals when a specific key is pressed (default is "Escape").
 * It listens for keydown events when `isOpen` is true and calls the `onClose` callback if the specified key is pressed.
 */
export function useKeyClose(
    isOpen: boolean,
    onClose: () => void,
    key: string = 'Escape',
): void {
    useEffect(() => {
        if (!isOpen) return;

        const handler = (e: KeyboardEvent) => {
            if (e.key === key) onClose();
        };

        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [isOpen, onClose, key]);
}
