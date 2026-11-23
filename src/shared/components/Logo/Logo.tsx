import logoUrl from '@/shared/assets/Logo.svg';
import logoIconUrl from '@/shared/assets/LogoIcon.svg';
import {
	baseStyles,
	sizeStyles,
} from '@/shared/components/Logo/Logo.styles.ts';
import { cn } from '@/shared/lib/helpers/cn.ts';

type LogoSize = 'sm' | 'md' | 'lg' | 'xl';
type LogoVariant = 'wordmark' | 'icon';
type VariantSrc = Record<LogoVariant, string>;

type LogoProps = {
	size: LogoSize;
	className?: string;
	variant?: LogoVariant;
};

const variantMap: VariantSrc = {
	wordmark: logoUrl,
	icon: logoIconUrl,
};

function Logo({ size, className, variant = 'wordmark' }: LogoProps) {
	return (
		<img
			src={variantMap[variant]}
			alt="ShiftFlow"
			className={cn(baseStyles, sizeStyles[variant][size], className)}
		/>
	);
}

export type { LogoSize, LogoVariant };
export { Logo };
