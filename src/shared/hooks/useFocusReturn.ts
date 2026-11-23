import { type RefObject, useLayoutEffect, useRef } from 'react';

/**
 * Restores focus to the trigger when a dropdown or modal closes.
 *
 * @param triggerRef - Element to focus on close; when omitted, the element focused at open time.
 */
export function useFocusReturn<T extends HTMLElement>(
	isOpen: boolean,
	triggerRef?: RefObject<T | null>,
) {
	const wasOpenRef = useRef(isOpen);
	const fallbackRef = useRef<HTMLElement | null>(null);

	useLayoutEffect(() => {
		const wasOpened = !wasOpenRef.current && isOpen && !triggerRef;
		const wasClosed = wasOpenRef.current && !isOpen;

		if (wasOpened) {
			const { activeElement } = document;
			fallbackRef.current =
				activeElement instanceof HTMLElement ? activeElement : null;
		}
		if (wasClosed) {
			const target = triggerRef?.current ?? fallbackRef.current;
			target?.focus();
		}
		wasOpenRef.current = isOpen;
	}, [isOpen, triggerRef]);
}
