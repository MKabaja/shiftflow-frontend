import { useRef } from 'react';
import { useLockBodyScroll } from '@/shared/hooks/useLockBodyScroll.ts';
import { useKeyClose } from '@/shared/hooks/useKeyClose.ts';
import { useFocusReturn } from '@/shared/hooks/useFocusReturn.ts';
import { useFocusTrap } from '@/shared/hooks/useFocusTrap.ts';

/**
 * Wires up the full focus and scroll behavior of a modal dialog by composing four hooks:
 * locks body scroll, closes on `Escape`, returns focus to the trigger on close, and traps
 * `Tab` focus inside the panel while open.
 *
 * @param {boolean} isOpen - Whether the modal is currently open.
 * @param {() => void} onClose - Called when the modal requests to close (e.g. on `Escape`).
 * @returns An object with `panelRef` — attach it to the modal panel to enable the focus trap.
 */
function useModal(isOpen: boolean, onClose: () => void) {
  const panelRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(isOpen, 'both');
  useKeyClose(isOpen, onClose);
  useFocusReturn(isOpen);
  useFocusTrap(isOpen, panelRef);

  return { panelRef };
}
export { useModal };
