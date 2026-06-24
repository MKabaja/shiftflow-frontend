import { useEffect, useRef, type RefObject } from 'react';
/**
 * Custom hook to return focus to a trigger element when a dropdown or modal is closed.
 *
 * @param isOpen - A boolean indicating whether the dropdown/modal is currently open.
 * @param triggerRef - A ref to the element that should receive focus when the dropdown/modal closes.
 *
 * This hook uses a ref to keep track of the previous open state of the dropdown/modal. When the `isOpen` state changes from `true` to `false`, it checks if the `triggerRef` is valid and focuses it.
 *
 * Usage:
 * ```tsx
 * const buttonRef = useRef<HTMLButtonElement>(null);
 * useFocusReturn(isOpen, buttonRef);
 * ```
 */

function useFocusReturn<T extends HTMLElement>(
    isOpen: boolean,
    triggerRef: RefObject<T | null>,
) {
    const preIsOpenRef = useRef<boolean>(isOpen);

    useEffect(() => {
        if (preIsOpenRef.current && !isOpen && triggerRef?.current) {
            triggerRef.current.focus();
        }
        preIsOpenRef.current = isOpen;
    }, [isOpen,triggerRef]);
}

export default useFocusReturn;
