import { useEffect, type RefObject, useLayoutEffect, useRef } from 'react';

type Action = 'ArrowDown' | 'ArrowUp';
type Actionfunction = (index: number, length: number) => number;

const actionStrategy: Record<Action, Actionfunction> = {
    ArrowDown: (index, length) => (index + 1) % length,
    ArrowUp: (index, length) => (index - 1 + length) % length,
};

/**
 * Custom hook to manage roving focus within a container element, such as a dropdown menu.
 *
 * @param containerRef - A ref to the container element that holds the focusable items.
 * @param isOpen - A boolean indicating whether the dropdown is currently open.
 * @param selector - A CSS selector string to identify focusable elements within the container (default is "a").
 *
 * This hook listens for keyboard events on the container element and updates the focus based on arrow key navigation. When the dropdown is opened, it resets the focus to the first item.
 *
 * Usage:
 * ```tsx
 * const containerRef = useRef<HTMLUListElement>(null);
 * useRovingFocus(containerRef, isOpen);
 * ```
 */
function useRovingFocus<T extends HTMLElement>(
    containerRef: RefObject<T | null>,
    isOpen: boolean,
    selector = 'a',
) {
    const currentIndexRef = useRef<number>(0);
    useLayoutEffect(() => {
        if (isOpen) {
            currentIndexRef.current = 0;
        }
    }, [isOpen]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const focusableElements: HTMLElement[] = Array.from(
            container.querySelectorAll(selector),
        );

        const handleKeyDown = (e: KeyboardEvent) => {
            const allowedKeys: Action[] = ['ArrowDown', 'ArrowUp'];

            if (!allowedKeys.includes(e.key as Action)) return;

            e.preventDefault();
            const action = e.key as Action;
            const nextIndex = actionStrategy[action](
                currentIndexRef.current,
                focusableElements.length,
            );
            currentIndexRef.current=nextIndex;
            focusableElements[nextIndex]?.focus();
        };

        container.addEventListener('keydown', handleKeyDown);
        return () => {
            container.removeEventListener('keydown', handleKeyDown);
        };
    }, [containerRef, selector]);
}

export default useRovingFocus;
