import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn.ts';
import { baseStyles, sizeStyles, variantStyles } from './Badge.styles.ts';

export type Variants = 'default' | 'success' | 'warning' | 'danger';
export type Sizes = 'sm' | 'md';

type BadgeProps = {
  variant: Variants;
  children?: ReactNode;
  size?: Sizes;
};
export function Badge({ variant = 'default', size = 'sm', children }: BadgeProps) {
  return (
    <span className={cn(baseStyles, variantStyles[variant], sizeStyles[size])}>{children}</span>
  );
}
