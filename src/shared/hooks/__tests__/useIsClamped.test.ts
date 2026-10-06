import { renderHook } from '@testing-library/react';
import { useIsClamped } from '../useIsClamped.ts';
import {
  setElementSize,
  stubResizeObserver,
  triggerResize,
  triggerResizeIfObserved,
} from '@/test/mocks/resizeObserver.ts';

const renderUseIsClamped = (enabled = true) => {
  const ref = { current: document.createElement('p') };
  const result = renderHook(({ enabled }) => useIsClamped(ref, enabled), {
    initialProps: { enabled },
  });
  return { element: ref.current, ...result };
};

describe('useIsClamped', () => {
  beforeEach(() => {
    stubResizeObserver();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns false before the first measurement and observes the element', () => {
    const { element, result } = renderUseIsClamped();

    expect(result.current).toBe(false);
    expect(() => triggerResize(element)).not.toThrow();
  });

  it.each([
    { scrollHeight: 40, clientHeight: 40, expected: false },
    { scrollHeight: 41, clientHeight: 40, expected: false },
    { scrollHeight: 42, clientHeight: 40, expected: true },
  ])(
    'returns $expected for scrollHeight $scrollHeight and clientHeight $clientHeight',
    ({ scrollHeight, clientHeight, expected }) => {
      const { element, result } = renderUseIsClamped();

      setElementSize(element, scrollHeight, clientHeight);
      triggerResize(element);

      expect(result.current).toBe(expected);
    },
  );

  it('updates the result on every measurement', () => {
    const { element, result } = renderUseIsClamped();

    setElementSize(element, 40, 40);
    triggerResize(element);
    expect(result.current).toBe(false);

    setElementSize(element, 80, 40);
    triggerResize(element);
    expect(result.current).toBe(true);

    setElementSize(element, 40, 40);
    triggerResize(element);
    expect(result.current).toBe(false);
  });

  it('keeps the last result and stops measuring when disabled', () => {
    const { element, result, rerender } = renderUseIsClamped();
    setElementSize(element, 80, 40);
    triggerResize(element);

    rerender({ enabled: false });
    setElementSize(element, 40, 40);
    triggerResizeIfObserved(element);

    expect(result.current).toBe(true);
  });

  it('measures again when re-enabled', () => {
    const { element, result, rerender } = renderUseIsClamped();
    setElementSize(element, 80, 40);
    triggerResize(element);
    rerender({ enabled: false });
    setElementSize(element, 40, 40);

    rerender({ enabled: true });
    triggerResize(element);

    expect(result.current).toBe(false);
  });

  it('does not observe when disabled from the start', () => {
    const { element, result } = renderUseIsClamped(false);

    expect(() => triggerResize(element)).toThrow('No active ResizeObserver');
    expect(result.current).toBe(false);
  });

  it('stops observing on unmount', () => {
    const { element, unmount } = renderUseIsClamped();

    unmount();

    expect(() => triggerResize(element)).toThrow('No active ResizeObserver');
  });
});
