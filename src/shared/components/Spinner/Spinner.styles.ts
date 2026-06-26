import type { SpinnerSize } from './Spinner.tsx';

type SizeStyle = Record<SpinnerSize, string>;

const sizeStyles: SizeStyle = {
  sm: 'size-4 border-2',
  md: 'size-6 border-2',
  lg: 'size-10 border-[3px]',
};

const baseStyles: string =
  'animate-spin rounded-full border-accent border-t-transparent';

export { sizeStyles, baseStyles };
