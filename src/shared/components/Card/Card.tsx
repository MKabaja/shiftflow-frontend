import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/shared/lib/helpers/cn.ts';
import { baseStyles, interactiveStyles, variantStyles } from './Card.styles.ts';

type CardVariant = 'default' | 'elevated' | 'auth';

type CardProps = ComponentProps<'div'> & {
	children: ReactNode;
	variant?: CardVariant;
	interactive?: boolean;
};

function Card({
	children,
	className,
	variant = 'default',
	interactive = false,
	...rest
}: CardProps) {
	return (
		<div
			className={cn(
				baseStyles,
				variantStyles[variant],
				interactive && interactiveStyles,
				className,
			)}
			{...rest}
		>
			{children}
		</div>
	);
}

export type { CardVariant };
export { Card };
