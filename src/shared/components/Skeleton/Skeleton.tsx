import { cn } from '@/shared/lib/helpers/cn.ts';
import { baseStyles, variantStyles } from './Skeleton.styles.ts';

export type SkeletonVariant = 'text' | 'circle' | 'rect';

type SkeletonProps = {
	variant?: SkeletonVariant;
	className?: string;
};

export function Skeleton({ variant = 'text', className }: SkeletonProps) {
	return (
		<div
			aria-hidden="true"
			className={cn(baseStyles, variantStyles[variant], className)}
		></div>
	);
}
