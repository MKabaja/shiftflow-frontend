import { cn } from '@/shared/lib/helpers/cn.ts';
import { baseStyles, variantStyles } from './Skeleton.styles.ts';

type SkeletonVariant = 'text' | 'circle' | 'rect';

type SkeletonProps = {
	variant?: SkeletonVariant;
	className?: string;
};

function Skeleton({ variant = 'text', className }: SkeletonProps) {
	return (
		<div
			aria-hidden="true"
			className={cn(baseStyles, variantStyles[variant], className)}
		></div>
	);
}

export type { SkeletonVariant };
export { Skeleton };
