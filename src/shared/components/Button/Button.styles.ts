import type { ButtonSize, ButtonVariant } from './Button.tsx';

type SizeStyle = Record<ButtonSize, string>;
type VariantStyle = Record<ButtonVariant, string>;

const sizeStyles: SizeStyle = {
  sm: 'h-8 min-w-16 px-3 text-body-sm gap-1.5',
  md: 'h-10 min-w-20 px-4 text-body-md gap-2',
  lg: 'h-12 min-w-24 px-6 text-body-lg gap-2',
};
const variantStyles: VariantStyle = {
  primary:
    'bg-accent text-bg-primary shadow-nm-subtle hover:bg-accent-dark active:shadow-nm-pressed-accent [--sweep-alpha:0.22]',
  secondary:
    'bg-bg-card text-text-primary border border-border-subtle shadow-nm-subtle active:shadow-nm-pressed [--sweep-alpha:0.12]',
  ghost:
    'bg-transparent text-text-primary hover:bg-white/4 active:bg-white/8 active:shadow-nm-pressed [--sweep-alpha:0.06]',
  danger:
    'bg-danger text-bg-primary shadow-nm-subtle active:shadow-nm-pressed-danger [--sweep-alpha:0.18]',
};
const baseStyles: string =
  'sweep-on-hover rounded-md inline-flex items-center justify-center font-display font-semibold transition-all duration-150 ease-out';

export { sizeStyles, variantStyles, baseStyles };
