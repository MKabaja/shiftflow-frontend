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
 * Replaces the global `ResizeObserver` with a mock fired by {@link triggerResize}.
 *
 * Call in `beforeEach`; restore with `vi.unstubAllGlobals()` in `afterEach`.
 */
export function stubResizeObserver(): void {
  observed.clear();
  vi.stubGlobal('ResizeObserver', MockResizeObserver);
}

/**
 * Fires the resize callback of the observer watching `element`, inside `act`.
 *
 * @throws When no observer watches `element`.
 */
export function triggerResize(element: Element): void {
  const observer = observed.get(element);
  if (!observer) throw new Error('No active ResizeObserver watches this element');
  act(() => observer.notify());
}

/**
 * Like {@link triggerResize}, but does nothing when no observer watches `element`.
 */
export function triggerResizeIfObserved(element: Element): void {
  const observer = observed.get(element);
  if (observer) act(() => observer.notify());
}

/**
 * Sets `scrollHeight` and `clientHeight` of the element, which are always `0` in jsdom.
 */
export function setElementSize(
  element: HTMLElement,
  scrollHeight: number,
  clientHeight: number,
): void {
  Object.defineProperty(element, 'scrollHeight', { configurable: true, value: scrollHeight });
  Object.defineProperty(element, 'clientHeight', { configurable: true, value: clientHeight });
}
