import { act, renderHook } from '@testing-library/react';
import { useIsClamped } from '../useIsClamped.ts';

let callback: () => void;
const observe = vi.fn();
const disconnect = vi.fn();

const setSize = (element: HTMLElement, scrollHeight: number, clientHeight: number) => {
  Object.defineProperty(element, 'scrollHeight', { configurable: true, value: scrollHeight });
  Object.defineProperty(element, 'clientHeight', { configurable: true, value: clientHeight });
};

const triggerResize = () => act(() => callback());

const renderUseIsClamped = (enabled = true) => {
  const ref = { current: document.createElement('p') };
  const result = renderHook(({ enabled }) => useIsClamped(ref, enabled), {
    initialProps: { enabled },
  });
  return { element: ref.current, ...result };
};

describe('useIsClamped', () => {
  beforeEach(() => {
    observe.mockClear();
    disconnect.mockClear();
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(cb: () => void) {
          callback = cb;
        }
        observe = observe;
        disconnect = disconnect;
      },
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns false before the first measurement', () => {
    const { element, result } = renderUseIsClamped();

    expect(observe).toHaveBeenCalledWith(element);
    expect(result.current).toBe(false);
  });

  it.each([
    { scrollHeight: 40, clientHeight: 40, expected: false },
    { scrollHeight: 41, clientHeight: 40, expected: false },
    { scrollHeight: 42, clientHeight: 40, expected: true },
  ])(
    'returns $expected for scrollHeight $scrollHeight and clientHeight $clientHeight',
    ({ scrollHeight, clientHeight, expected }) => {
      const { element, result } = renderUseIsClamped();

      setSize(element, scrollHeight, clientHeight);
      triggerResize();

      expect(result.current).toBe(expected);
    },
  );

  it('updates the result on every measurement', () => {
    const { element, result } = renderUseIsClamped();

    setSize(element, 40, 40);
    triggerResize();
    expect(result.current).toBe(false);

    setSize(element, 80, 40);
    triggerResize();
    expect(result.current).toBe(true);

    setSize(element, 40, 40);
    triggerResize();
    expect(result.current).toBe(false);
  });

  it('keeps the last result and disconnects when disabled', () => {
    const { element, result, rerender } = renderUseIsClamped();
    setSize(element, 80, 40);
    triggerResize();

    rerender({ enabled: false });

    expect(result.current).toBe(true);
    expect(disconnect).toHaveBeenCalledTimes(1);

    setSize(element, 40, 40);
    rerender({ enabled: false });

    expect(result.current).toBe(true);
    expect(observe).toHaveBeenCalledTimes(1);
  });

  it('measures again with a new observer when re-enabled', () => {
    const { element, result, rerender } = renderUseIsClamped();
    setSize(element, 80, 40);
    triggerResize();
    rerender({ enabled: false });
    setSize(element, 40, 40);

    rerender({ enabled: true });

    expect(observe).toHaveBeenCalledTimes(2);
    expect(observe).toHaveBeenLastCalledWith(element);

    triggerResize();
    expect(result.current).toBe(false);
  });

  it('does not observe when disabled from the start', () => {
    const { result } = renderUseIsClamped(false);

    expect(observe).not.toHaveBeenCalled();
    expect(result.current).toBe(false);
  });

  it('disconnects the observer on unmount', () => {
    const { unmount } = renderUseIsClamped();

    unmount();

    expect(disconnect).toHaveBeenCalledTimes(1);
  });
});
