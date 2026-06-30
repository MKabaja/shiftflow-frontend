import type { ButtonSize, ButtonVariant } from './Button.tsx';

type SizeStyle = Record<ButtonSize, string>;
type VariantStyle = Record<ButtonVariant, string>;

const sizeStyles: SizeStyle = {
  sm: 'h-8 min-w-[64px] px-3',
  md: 'h-10 min-w-[80px] px-4',
  lg: 'h-12 min-w-[96px] px-6',
};
const variantStyles: VariantStyle = {
  primary: 'bg-accent text-bg-primary shadow-nm-subtle hover:shadow-nm-hover-accent ',
  secondary: 'bg-card text-primary shadow-nm-subtle hover:shadow-nm-inset-soft',
  ghost: 'bg-transparent text-text-primary hover:bg-bg-card hover:shadow-nm-inset-soft',
  danger: 'bg-danger text-bg-primary  shadow-nm-subtle hover:shadow-nm-hover-danger',
};
const baseStyles: string =
  '  rounded-sm gap-2 inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out';

export { sizeStyles, variantStyles, baseStyles };
