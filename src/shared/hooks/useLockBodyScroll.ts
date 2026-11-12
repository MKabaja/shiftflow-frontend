import { useEffect } from 'react';

type Axis = 'x' | 'y' | 'both';
type Properties = 'overflowX' | 'overflowY' | 'overflow';

const axisMap: Record<Axis, Properties> = {
  x: 'overflowX',
  y: 'overflowY',
  both: 'overflow',
};

/**
 * Locks body scroll on `axis` while open; restores the previous value on close or unmount.
 */
export function useLockBodyScroll(isOpen: boolean, axis: Axis = 'both'): void {
  useEffect(() => {
    const property = axisMap[axis];
    const previousValue = document.body.style[property];

    setBodyStyle(property, isOpen ? 'hidden' : '');

    return () => {
      setBodyStyle(property, previousValue);
    };
  }, [isOpen, axis]);
}
function setBodyStyle(property: Properties, value: string) {
  document.body.style[property] = value;
}
