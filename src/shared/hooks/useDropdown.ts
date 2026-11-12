import { useCallback, useState } from 'react';
import { useLockBodyScroll } from './useLockBodyScroll';
import { useKeyClose } from './useKeyClose';

type Axis = 'x' | 'y' | 'both';

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
