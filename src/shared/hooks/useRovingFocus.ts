import { type RefObject, useEffect, useLayoutEffect, useRef } from 'react';

type Action = 'ArrowDown' | 'ArrowUp';
type ActionFunction = (index: number, length: number) => number;

const actionStrategy: Record<Action, ActionFunction> = {
  ArrowDown: (index, length) => (index + 1) % length,
  ArrowUp: (index, length) => (index - 1 + length) % length,
};

/**
 * Moves focus between items with `ArrowDown` / `ArrowUp`, wrapping at the ends.
 * Focus resets to the first item each time the container opens.
 *
 * @param selector - CSS selector of the items within the container.
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
    if (!container || !isOpen) return;

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
  }, [containerRef, selector, isOpen]);
}

export { useRovingFocus };
