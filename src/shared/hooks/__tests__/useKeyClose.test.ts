import { renderHook } from '@testing-library/react';
import { useKeyClose } from '../useKeyClose.ts';

const press = (key: string) => document.dispatchEvent(new KeyboardEvent('keydown', { key }));

describe('useKeyClose', () => {
  it('calls onClose when Escape is pressed while open', () => {
    const onClose = vi.fn();
    renderHook(() => useKeyClose(true, onClose));

    press('Escape');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when closed', () => {
    const onClose = vi.fn();
    renderHook(() => useKeyClose(false, onClose));

    press('Escape');
    expect(onClose).not.toHaveBeenCalled();
  });

  it('ignores keys other than the watched one', () => {
    const onClose = vi.fn();
    renderHook(() => useKeyClose(true, onClose));

    press('Enter');
    expect(onClose).not.toHaveBeenCalled();
  });

  it('supports a custom key', () => {
    const onClose = vi.fn();
    renderHook(() => useKeyClose(true, onClose, 'Enter'));

    press('Enter');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('removes the listener on unmount', () => {
    const onClose = vi.fn();
    const { unmount } = renderHook(() => useKeyClose(true, onClose));

    unmount();
    press('Escape');
    expect(onClose).not.toHaveBeenCalled();
  });
});
