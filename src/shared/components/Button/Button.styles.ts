import type { ButtonSize, ButtonVariant } from './Button.tsx';

type SizeStyle = Record<ButtonSize, string>;
type VariantStyle = Record<ButtonVariant, string>;

const sizeStyles: SizeStyle = {
  sm: 'h-8 min-w-16 px-3 text-sm',
  md: 'h-10 min-w-20 px-4 text-base',
  lg: 'h-12 min-w-24 px-6 text-lg',
};
const variantStyles: VariantStyle = {
  primary:
    'bg-accent text-bg-primary shadow-nm-subtle hover:shadow-nm-hover-accent active:shadow-nm-pressed-accent',
  secondary:
    'bg-card text-primary shadow-nm-subtle hover:shadow-nm-inset-soft active:shadow-nm-pressed',
  ghost:
    'bg-transparent text-text-primary hover:bg-bg-card hover:shadow-nm-inset-soft active:shadow-nm-pressed',
  danger:
    'bg-danger text-bg-primary shadow-nm-subtle hover:shadow-nm-hover-danger active:shadow-nm-pressed-danger',
};
const baseStyles: string =
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none rounded-sm gap-2 inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out';

export { sizeStyles, variantStyles, baseStyles };
