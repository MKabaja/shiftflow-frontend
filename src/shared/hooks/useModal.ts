import { useRef } from 'react';
import { useLockBodyScroll } from '@/shared/hooks/useLockBodyScroll.ts';
import { useKeyClose } from '@/shared/hooks/useKeyClose.ts';
import { useFocusReturn } from '@/shared/hooks/useFocusReturn.ts';
import { useFocusTrap } from '@/shared/hooks/useFocusTrap.ts';

/**
 * Adds modal behavior: scroll lock, close on `Escape`, focus trap and focus return.
 *
 * @returns `panelRef` — attach it to the modal panel to enable the focus trap.
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
