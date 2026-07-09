import type { SpinnerSize, SpinnerVariant } from './Spinner.tsx';

type SizeStyle = Record<SpinnerSize, string>;
type VariantStyle = Record<SpinnerVariant, string>;

const variantStyles: VariantStyle = {
  accent: 'border-accent border-t-transparent',
  contrast: 'border-bg-primary border-t-transparent',
};

const sizeStyles: SizeStyle = {
  sm: 'size-4 border-2',
  md: 'size-6 border-2',
  lg: 'size-10 border-[3px]',
};

const baseStyles: string = 'animate-spin rounded-full  ';

export { sizeStyles, baseStyles, variantStyles };
