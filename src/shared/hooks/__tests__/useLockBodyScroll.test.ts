import { renderHook } from '@testing-library/react';
import { useLockBodyScroll } from '../useLockBodyScroll.ts';

describe('useLockBodyScroll', () => {
  it('locks overflow on both axes by default when open', () => {
    renderHook(() => useLockBodyScroll(true));
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('does not lock when closed', () => {
    renderHook(() => useLockBodyScroll(false));
    expect(document.body.style.overflow).toBe('');
  });

  it('locks only the x axis when axis is "x"', () => {
    renderHook(() => useLockBodyScroll(true, 'x'));
    expect(document.body.style.overflowX).toBe('hidden');
    expect(document.body.style.overflow).toBe('');
  });

  it('locks only the y axis when axis is "y"', () => {
    renderHook(() => useLockBodyScroll(true, 'y'));
    expect(document.body.style.overflowY).toBe('hidden');
    expect(document.body.style.overflow).toBe('');
  });

  it('restores overflow on unmount', () => {
    const { unmount } = renderHook(() => useLockBodyScroll(true));
    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('restores overflow when isOpen flips to false', () => {
    const { rerender } = renderHook(({ open }) => useLockBodyScroll(open), {
      initialProps: { open: true },
    });
    expect(document.body.style.overflow).toBe('hidden');

    rerender({ open: false });
    expect(document.body.style.overflow).toBe('');
  });
});
