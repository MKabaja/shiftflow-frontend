import { type HTMLMotionProps, motion } from 'motion/react';
import type { ReactNode } from 'react';
import { Spinner } from '@/shared/components/Spinner/Spinner.tsx';
import { cn } from '@/shared/lib/helpers/cn.ts';
import { disabledStyles } from '@/shared/lib/styles/disabledStyles.ts';
import { focusStyles } from '@/shared/lib/styles/focusStyles.ts';
import { baseStyles, sizeStyles, variantStyles } from './Button.styles.ts';

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

type ButtonProps = HTMLMotionProps<'button'> & {
	children: ReactNode;
	variant?: ButtonVariant;
	size?: ButtonSize;
	isLoading?: boolean;
};

function Button({
	ref,
	variant = 'primary',
	size = 'sm',
	isLoading,
	children,
	type = 'button',
	...rest
}: ButtonProps) {
	const { className, ...motionRest } = rest;

	return (
		<motion.button
			type={type}
			ref={ref}
			{...motionRest}
			whileTap={{ scale: 0.98 }}
			transition={{ duration: 0.12, ease: 'easeOut' }}
			disabled={isLoading || rest.disabled}
			aria-busy={isLoading}
			className={cn(
				sizeStyles[size],
				variantStyles[variant],
				baseStyles,
				focusStyles,
				disabledStyles,
				className,
			)}
		>
			{isLoading ? (
				<Spinner
					size="sm"
					variant={variant === 'primary' ? 'contrast' : 'accent'}
				/>
			) : (
				children
			)}
		</motion.button>
	);
}

export type { ButtonSize, ButtonVariant };
export { Button };
