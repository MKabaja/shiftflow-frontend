import type { RefObject } from 'react';
import { useEffect, useLayoutEffect } from 'react';

const SELECTOR: string = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Traps `Tab` focus inside a container while it is open, moving focus in on open.
 *
 * @param containerRef - Give it `tabIndex={-1}` so it can hold focus when it has no focusable children.
 */
function useFocusTrap<T extends HTMLElement>(isOpen: boolean, containerRef: RefObject<T | null>) {
  useLayoutEffect(() => {
    if (!isOpen || !containerRef.current) return;
    const container = containerRef.current;
    const focusableElements = getFocusableElements(container);
    const first = focusableElements[0];
    (first ?? container)?.focus();
  }, [isOpen, containerRef]);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;
    const container = containerRef.current;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;
      const focusableElements = getFocusableElements(container);
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    container.addEventListener('keydown', handleKeyDown);
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, containerRef]);
}
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(SELECTOR));
}
export { useFocusTrap };
