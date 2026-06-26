import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn.ts';
import { baseStyles, sizeStyles, variantStyles } from './Badge.styles.ts';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger';
export type BadgeSize = 'sm' | 'md';

type BadgeProps = {
  variant: BadgeVariant;
  children?: ReactNode;
  size?: BadgeSize;
};
export function Badge({ variant = 'default', size = 'sm', children }: BadgeProps) {
  return (
    <span className={cn(baseStyles, variantStyles[variant], sizeStyles[size])}>{children}</span>
  );
}
