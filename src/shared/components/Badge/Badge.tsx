import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/helpers/cn.ts';
import { baseStyles, sizeStyles, variantStyles } from './Badge.styles.ts';

type BadgeVariant =
	| 'default'
	| 'accent'
	| 'success'
	| 'warning'
	| 'danger'
	| 'info'
	| 'outline';
type BadgeSize = 'sm' | 'md';

type BadgeProps = {
	variant?: BadgeVariant;
	children?: ReactNode;
	size?: BadgeSize;
};
function Badge({ variant = 'default', size = 'sm', children }: BadgeProps) {
	return (
		<span className={cn(baseStyles, variantStyles[variant], sizeStyles[size])}>
			{children}
		</span>
	);
}

export type { BadgeSize, BadgeVariant };
export { Badge };
