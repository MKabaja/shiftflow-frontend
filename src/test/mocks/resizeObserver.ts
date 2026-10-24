import { act } from '@testing-library/react';

const observed = new Map<Element, MockResizeObserver>();

class MockResizeObserver implements ResizeObserver {
  private readonly callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  observe(element: Element) {
    observed.set(element, this);
  }

  unobserve(element: Element) {
    if (observed.get(element) === this) observed.delete(element);
  }

  disconnect() {
    for (const [element, observer] of observed) {
      if (observer === this) observed.delete(element);
    }
  }

  notify() {
    this.callback([], this);
  }
}

/**
 * Replaces the global `ResizeObserver` (missing in jsdom) with a controllable mock.
 * Nothing is measured on its own — resizes are fired by {@link triggerResize}.
 * Call in `beforeEach`; restore with `vi.unstubAllGlobals()` in `afterEach`.
 */
export function stubResizeObserver(): void {
  observed.clear();
  vi.stubGlobal('ResizeObserver', MockResizeObserver);
}

/**
 * Fires the resize callback of the observer watching `element`, inside `act`.
 *
 * @throws When no active observer watches `element` — a missing observer is a test failure,
 * not a silent no-op.
 */
export function triggerResize(element: Element): void {
  const observer = observed.get(element);
  if (!observer) throw new Error('No active ResizeObserver watches this element');
  act(() => observer.notify());
}

/**
 * Like {@link triggerResize}, but does nothing when no observer watches `element`.
 * For checking that a disconnected observer no longer reacts to resizes.
 */
export function triggerResizeIfObserved(element: Element): void {
  const observer = observed.get(element);
  if (observer) act(() => observer.notify());
}

/**
 * Sets the element's `scrollHeight` and `clientHeight` (always `0` in jsdom).
 */
export function setElementSize(
  element: HTMLElement,
  scrollHeight: number,
  clientHeight: number,
): void {
  Object.defineProperty(element, 'scrollHeight', { configurable: true, value: scrollHeight });
  Object.defineProperty(element, 'clientHeight', { configurable: true, value: clientHeight });
}
