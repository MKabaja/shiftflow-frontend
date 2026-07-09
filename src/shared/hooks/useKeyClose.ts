import { useEffect } from 'react';

/**
 * Closes a dropdown or modal when a key is pressed while it is open (default `Escape`).
 * Listens on `document` only while `isOpen` is `true`, and removes the listener on close or unmount.
 *
 * @param {boolean} isOpen - When `true`, the key listener is active. When `false`, it is removed.
 * @param {() => void} onClose - Called when the watched key is pressed.
 * @param {string} [key="Escape"] - The `KeyboardEvent.key` value that triggers `onClose`.
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
