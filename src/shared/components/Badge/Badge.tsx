import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/helpers/cn.ts';
import { baseStyles, sizeStyles, variantStyles } from './Badge.styles.ts';

export type BadgeVariant = 'default' | 'accent' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
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
