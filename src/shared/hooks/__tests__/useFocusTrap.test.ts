import { renderHook } from '@testing-library/react';
import { useFocusTrap } from '../useFocusTrap.ts';

function makeTrap(html: string) {
	const trap = document.createElement('div');
	trap.tabIndex = -1;
	trap.innerHTML = html;
	document.body.appendChild(trap);
	return trap;
}

function tab(target: HTMLElement, shiftKey = false) {
	return target.dispatchEvent(
		new KeyboardEvent('keydown', { key: 'Tab', shiftKey, bubbles: true }),
	);
}

describe('useFocusTrap', () => {
	afterEach(() => {
		document.body.innerHTML = '';
	});

	it('moves focus to the first focusable element on open', () => {
		const trap = makeTrap('<button>first</button><button>last</button>');
		renderHook(() => useFocusTrap(true, { current: trap }));

		expect(trap.querySelector('button')).toHaveFocus();
	});

	it('focuses the container itself when it has no focusable children', () => {
		const trap = makeTrap('<p>no focusables here</p>');
		renderHook(() => useFocusTrap(true, { current: trap }));

		expect(trap).toHaveFocus();
	});

	it('does nothing when closed', () => {
		const trap = makeTrap('<button>first</button>');
		renderHook(() => useFocusTrap(false, { current: trap }));

		expect(trap.querySelector('button')).not.toHaveFocus();
	});

	it('wraps focus to the first element when Tab is pressed on the last', () => {
		const trap = makeTrap('<button>first</button><button>last</button>');
		renderHook(() => useFocusTrap(true, { current: trap }));
		const [first, last] = trap.querySelectorAll('button');

		last.focus();
		tab(last);
		expect(first).toHaveFocus();
	});

	it('wraps focus to the last element when Shift+Tab is pressed on the first', () => {
		const trap = makeTrap('<button>first</button><button>last</button>');
		renderHook(() => useFocusTrap(true, { current: trap }));
		const [first, last] = trap.querySelectorAll('button');

		first.focus();
		tab(first, true);
		expect(last).toHaveFocus();
	});
});
