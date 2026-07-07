import { type RefObject, useEffect, useLayoutEffect, useRef } from 'react';

type Action = 'ArrowDown' | 'ArrowUp';
type ActionFunction = (index: number, length: number) => number;

const actionStrategy: Record<Action, ActionFunction> = {
  ArrowDown: (index, length) => (index + 1) % length,
  ArrowUp: (index, length) => (index - 1 + length) % length,
};

/**
 * Moves focus between items inside a container using the arrow keys (roving focus), e.g. a dropdown menu.
 * `ArrowDown` and `ArrowUp` cycle through the matching elements, wrapping around at the ends.
 * Focus resets to the first item each time the container opens.
 *
 * @param {RefObject<T | null>} containerRef - The container holding the focusable items.
 * @param {boolean} isOpen - When `true`, focus resets to the first item.
 * @param {string} [selector="a"] - CSS selector for the focusable items within the container.
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

    const focusableElements: HTMLElement[] = Array.from(container.querySelectorAll(selector));

    const handleKeyDown = (e: KeyboardEvent) => {
      const allowedKeys: Action[] = ['ArrowDown', 'ArrowUp'];

      if (!allowedKeys.includes(e.key as Action)) return;

      e.preventDefault();
      const action = e.key as Action;
      const nextIndex = actionStrategy[action](currentIndexRef.current, focusableElements.length);
      currentIndexRef.current = nextIndex;
      focusableElements[nextIndex]?.focus();
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [containerRef, selector]);
}

export { useRovingFocus };
