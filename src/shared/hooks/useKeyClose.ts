import { useEffect } from 'react';

/**
 * Calls `onClose` when `key` (default `Escape`) is pressed while open.
 *
 * @param key - A `KeyboardEvent.key` value.
 */
export function useKeyClose(isOpen: boolean, onClose: () => void, key: string = 'Escape'): void {
  useEffect(() => {
    if (!isOpen) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === key) onClose();
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose, key]);
}
