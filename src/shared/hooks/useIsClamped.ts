import type { RefObject } from 'react';
import { useLayoutEffect, useState } from 'react';

/**
 * Tells whether the element's content is cut off (e.g. by `line-clamp`).
 * Re-measures on every size change; while `enabled` is `false` it keeps the last result.
 */
function useIsClamped<T extends HTMLElement>(
  ref: RefObject<T | null>,
  enabled: boolean = true,
): boolean {
  const [isClamped, setIsClamped] = useState(false);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!enabled || !element) return;

    const observer = new ResizeObserver(() => {
      setIsClamped(element.scrollHeight - element.clientHeight > 1);
    });
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, enabled]);

  return isClamped;
}

export { useIsClamped };
