import { type RefObject, useLayoutEffect, useRef } from 'react';

/**
 * Returns focus to the triggering element when a dropdown or modal closes.
 * On open it remembers where focus should go — an explicit `triggerRef`, or the currently
 * focused element as a fallback — and restores focus there on close.
 *
 * @param {boolean} isOpen - On the transition to `true` the focus source is captured; on the transition to `false` focus is restored.
 * @param {RefObject<T | null>} [triggerRef] - The element to focus on close. When omitted, the element focused at open time is used instead.
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
