import { useEffect } from 'react';

type Axis = 'x' | 'y' | 'both';
type Properties = 'overflowX' | 'overflowY' | 'overflow';

const axisMap: Record<Axis, Properties> = {
  x: 'overflowX',
  y: 'overflowY',
  both: 'overflow',
};

/**
 * Locks body scroll on the specified axis when a component is open.
 * Automatically restores the original scroll behavior on close or unmount.
 *
 * @param {boolean} isOpen - When `true`, scroll is locked. When `false`, scroll is restored.
 * @param {Axis} [axis="x"] - The axis to lock:
 *   - `"x"` — locks horizontal scroll (`overflow-x`)
 *   - `"y"` — locks vertical scroll (`overflow-y`)
 *   - `"both"` — locks both axes (`overflow`)
 */

export function useLockBodyScroll(isOpen: boolean, axis: Axis = 'x'): void {
  useEffect(() => {
    const property = axisMap[axis];

    setBodyStyle(property, isOpen ? 'hidden' : '');

    return () => {
      setBodyStyle(property, '');
    };
  }, [isOpen, axis]);
}
function setBodyStyle(property: Properties, value: string) {
  document.body.style[property] = value;
}
