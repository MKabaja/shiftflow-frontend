import { useEffect } from 'react';

type Axis = 'x' | 'y' | 'both';
type OverflowProperty = 'overflowX' | 'overflowY' | 'overflow';
type OverflowPropertyByAxis = Record<Axis, OverflowProperty>;

const overflowPropertyByAxis: OverflowPropertyByAxis = {
	x: 'overflowX',
	y: 'overflowY',
	both: 'overflow',
};

/**
 * Locks body scroll on `axis` while open; restores the previous value on close or unmount.
 */
function useLockBodyScroll(isOpen: boolean, axis: Axis = 'both'): void {
	useEffect(() => {
		const property = overflowPropertyByAxis[axis];
		const previousValue = document.body.style[property];

		setBodyStyle(property, isOpen ? 'hidden' : '');

		return () => {
			setBodyStyle(property, previousValue);
		};
	}, [isOpen, axis]);
}

function setBodyStyle(property: OverflowProperty, value: string) {
	document.body.style[property] = value;
}

export type { Axis };
export { useLockBodyScroll };
