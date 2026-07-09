import type { ToggleSize } from './Toggle.tsx';
import { focusStyles } from '@/shared/lib/styles/focusStyles.ts';

type ToggleSizeStyle = Record<ToggleSize, { track: string; knob: string; travel: number }>;

const sizeStyles: ToggleSizeStyle = {
  sm: { track: 'w-8 h-4.5', knob: 'w-3.5 h-3.5 top-0.5', travel: 14 },
  md: { track: 'w-12 h-6', knob: 'w-4 h-4 top-1', travel: 28 },
};

// input is sr-only, so the ring has to react to its focus state via `:has()` on the visible track
const trackFocusStyles = focusStyles.trim().replaceAll('focus-visible:', 'has-[:focus-visible]:');

const trackBaseStyles = `relative inline-flex shrink-0 items-center rounded-full shadow-nm-inset transition-colors duration-200 ${trackFocusStyles}`;

const knobBaseStyles = 'absolute left-0.5  rounded-full bg-text-muted shadow-nm-raised-sm';

export { sizeStyles, trackBaseStyles, knobBaseStyles };
