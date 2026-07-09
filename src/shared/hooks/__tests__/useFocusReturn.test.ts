import { renderHook } from '@testing-library/react';
import { useFocusReturn } from '../useFocusReturn.ts';

describe('useFocusReturn', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('returns focus to the element focused at open time when no triggerRef is given', () => {
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);
    trigger.focus();

    const { rerender } = renderHook(({ open }) => useFocusReturn(open), {
      initialProps: { open: false },
    });

    rerender({ open: true });

    const other = document.createElement('button');
    document.body.appendChild(other);
    other.focus();

    rerender({ open: false });
    expect(trigger).toHaveFocus();
  });

  it('returns focus to an explicit triggerRef on close', () => {
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);

    const triggerRef = { current: trigger };
    const { rerender } = renderHook(({ open }) => useFocusReturn(open, triggerRef), {
      initialProps: { open: false },
    });

    rerender({ open: true });

    const other = document.createElement('button');
    document.body.appendChild(other);
    other.focus();

    rerender({ open: false });
    expect(trigger).toHaveFocus();
  });

  it('does not move focus while it stays open', () => {
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);
    trigger.focus();

    const { rerender } = renderHook(({ open }) => useFocusReturn(open), {
      initialProps: { open: false },
    });
    rerender({ open: true });

    const other = document.createElement('button');
    document.body.appendChild(other);
    other.focus();

    rerender({ open: true });
    expect(other).toHaveFocus();
  });
});