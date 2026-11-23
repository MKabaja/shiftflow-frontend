import { useCallback, useState } from 'react';
import { useKeyClose } from './useKeyClose.ts';
import { type Axis, useLockBodyScroll } from './useLockBodyScroll.ts';

/**
 * Manages open state of a dropdown; while open it locks body scroll and closes on `Escape`.
 *
 * @param axis - Scroll axis to lock while open.
 */
export function useDropdown(axis: Axis) {
	const [isOpen, setIsOpen] = useState(false);
	const close = useCallback(() => setIsOpen(false), []);
	const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

	useLockBodyScroll(isOpen, axis);
	useKeyClose(isOpen, close);

	return { isOpen, close, toggle };
}
