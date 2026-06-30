import type { ButtonSize, ButtonVariant } from './Button.tsx';

type SizeStyle = Record<ButtonSize, string>;
type VariantStyle = Record<ButtonVariant, string>;

const sizeStyles: SizeStyle = {
  sm: 'h-8 min-w-[64px] px-3',
  md: 'h-10 min-w-[80px] px-4',
  lg: 'h-12 min-w-[96px] px-6',
};
const variantStyles: VariantStyle = {
  primary: 'bg-accent text-bg-primary hover:shadow-nm-hover-accent ',
  secondary: 'bg-card text-primary',
  ghost: 'bg-transparent text-text-primar hover:bg-elevated',
  danger: 'bg-danger/40 text-primary hover:bg-danger/80 hover:text-bg-primary',
};
const baseStyles: string =
  'hover:scale-105 shadow-nm-subtle  rounded-sm gap-2 inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out';

export { sizeStyles, variantStyles, baseStyles };
