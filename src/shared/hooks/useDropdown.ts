import { useState, useCallback } from 'react';
import { useLockBodyScroll } from './useLockBodyScroll';
import { useKeyClose } from './useKeyClose';

/**
 * useDropdown - reusable hook for managing dropdown/modal open state.
 *
 * Locks body scroll using `useLockBodyScroll` and closes on Escape key
 * using `useKeyClose`.
 *
 * @param {"x"|"y"|"both"} [axis="x"] - Axis to lock when open:
 *     "x" for horizontal, "y" for vertical, "both" for both axes.
 *
 * @returns {{
 *     isOpen: boolean;
 *     close: () => void;
 *     toggle: () => void;
 * }}
 *     - isOpen: whether the dropdown is open
 *     - close: function to close the dropdown
 *     - toggle: function to open/close the dropdown
 */

export function useDropdown(axis: 'x' | 'y' | 'both' = 'x') {
    const [isOpen, setIsOpen] = useState(false);
    const close = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

    useLockBodyScroll(isOpen, axis);
    useKeyClose(isOpen, close);

    return { isOpen, close, toggle };
}
