import type { ToggleSize } from './Toggle.tsx';

type ToggleSizeStyle = Record<ToggleSize, { track: string; knob: string; travel: number }>;

export const sizeStyles: ToggleSizeStyle = {
  sm: { track: 'w-8 h-4.5', knob: 'w-3.5 h-3.5 top-0.5', travel: 14 },
  md: { track: 'w-12 h-6', knob: 'w-4 h-4 top-1', travel: 28 },
};

export const trackBaseStyles =
  'relative inline-flex shrink-0 items-center rounded-full shadow-nm-inset transition-colors duration-200';

export const knobBaseStyles = 'absolute left-0.5  rounded-full bg-text-muted shadow-nm-raised-sm';
