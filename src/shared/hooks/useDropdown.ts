import { useCallback, useState } from 'react';
import { useLockBodyScroll } from './useLockBodyScroll';
import { useKeyClose } from './useKeyClose';

type Axis = 'x' | 'y' | 'both';

/**
 * Manages open/close state for a dropdown or modal, with body-scroll lock and Escape-to-close built in.
 * Locks scroll via `useLockBodyScroll` and closes on `Escape` via `useKeyClose` while open.
 *
 * @param {Axis} axis - The scroll axis to lock while open.
 * @returns An object with:
 *   - `isOpen` — whether the dropdown is currently open
 *   - `close` — closes the dropdown
 *   - `toggle` — toggles the dropdown open or closed
 */

export function useDropdown(axis: Axis) {
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  useLockBodyScroll(isOpen, axis);
  useKeyClose(isOpen, close);

  return { isOpen, close, toggle };
}
