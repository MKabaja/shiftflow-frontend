import { renderHook } from '@testing-library/react';
import { useFocusTrap } from '../useFocusTrap.ts';

const makeContainer = (html: string) => {
  const container = document.createElement('div');
  container.tabIndex = -1;
  container.innerHTML = html;
  document.body.appendChild(container);
  return container;
};

const tab = (target: HTMLElement, shiftKey = false) =>
  target.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey, bubbles: true }));

describe('useFocusTrap', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('moves focus to the first focusable element on open', () => {
    const container = makeContainer('<button>first</button><button>last</button>');
    renderHook(() => useFocusTrap(true, { current: container }));

    expect(container.querySelector('button')).toHaveFocus();
  });

  it('focuses the container itself when it has no focusable children', () => {
    const container = makeContainer('<p>no focusables here</p>');
    renderHook(() => useFocusTrap(true, { current: container }));

    expect(container).toHaveFocus();
  });

  it('does nothing when closed', () => {
    const container = makeContainer('<button>first</button>');
    renderHook(() => useFocusTrap(false, { current: container }));

    expect(container.querySelector('button')).not.toHaveFocus();
  });

  it('wraps focus to the first element when Tab is pressed on the last', () => {
    const container = makeContainer('<button>first</button><button>last</button>');
    renderHook(() => useFocusTrap(true, { current: container }));
    const [first, last] = container.querySelectorAll('button');

    last.focus();
    tab(last);
    expect(first).toHaveFocus();
  });

  it('wraps focus to the last element when Shift+Tab is pressed on the first', () => {
    const container = makeContainer('<button>first</button><button>last</button>');
    renderHook(() => useFocusTrap(true, { current: container }));
    const [first, last] = container.querySelectorAll('button');

    first.focus();
    tab(first, true);
    expect(last).toHaveFocus();
  });
});