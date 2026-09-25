import type { SeparatorOrientation } from './Separator.tsx';

type OrientationStyle = Record<SeparatorOrientation, string>;

const orientationStyles: OrientationStyle = {
  horizontal: 'h-px w-full',
  vertical: 'h-full w-px',
};

const baseStyles: string = 'bg-border shrink-0';

export { baseStyles, orientationStyles };
