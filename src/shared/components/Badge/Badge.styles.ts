import type { Sizes, Variants } from './Badge.tsx';

type VariantStyle = Record<Variants, string>;
type SizeStyle = Record<Sizes, string>;

const variantStyles: VariantStyle = {
  default: 'text-primary bg-primary/10',
  success: 'text-success bg-success/10 border-success',
  warning: 'text-warning bg-warning/10 border-warning',
  danger: 'text-danger bg-danger/10 border-danger',
};
const sizeStyles: SizeStyle = {
  sm: 'rounded-sm px-2 py-0.5 text-xs',
  md: 'rounded-md px-3 py-1 text-sm ',
};
const baseStyles: string = 'font-medium shadow-nm-raised-sm border';

export { variantStyles, sizeStyles, baseStyles };
