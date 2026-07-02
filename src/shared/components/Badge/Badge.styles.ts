import type { BadgeSize, BadgeVariant } from './Badge.tsx';

type VariantStyle = Record<BadgeVariant, string>;
type SizeStyle = Record<BadgeSize, string>;

const variantStyles: VariantStyle = {
  default: 'text-text-primary bg-elevated',
  accent: 'text-bg-primary bg-accent',
  success: 'text-success bg-success/15',
  warning: 'text-warning bg-warning/15',
  danger: 'text-danger bg-danger/15',
  info: 'text-info bg-info/15',
  outline: 'text-text-primary bg-transparent border border-border',
};
const sizeStyles: SizeStyle = {
  sm: 'h-5 px-2 py-0.5 text-body-xs',
  md: 'h-6 px-2.5 py-[3px] text-body-xs',
};
const baseStyles: string = 'inline-flex items-center rounded-full font-medium';

export { variantStyles, sizeStyles, baseStyles };
