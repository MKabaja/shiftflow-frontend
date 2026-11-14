import { type RefObject, useLayoutEffect, useRef } from 'react';

/**
 * Restores focus to the trigger when a dropdown or modal closes.
 *
 * @param triggerRef - Element to focus on close; when omitted, the element focused at open time.
 */
function useFocusReturn<T extends HTMLElement>(isOpen: boolean, triggerRef?: RefObject<T | null>) {
  const preIsOpenRef = useRef<boolean>(isOpen);
  const fallbackRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const wasOpened: boolean = !preIsOpenRef.current && isOpen && !triggerRef;
    const wasClosed: boolean = preIsOpenRef.current && !isOpen;

    if (wasOpened) {
      fallbackRef.current = document.activeElement as HTMLElement | null;
    }
    if (wasClosed) {
      const target = triggerRef?.current ?? fallbackRef.current;
      target?.focus();
    }
    preIsOpenRef.current = isOpen;
  }, [isOpen, triggerRef]);
}

export { useFocusReturn };
