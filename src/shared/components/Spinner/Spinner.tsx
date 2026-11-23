import { useTranslation } from 'react-i18next';
import { cn } from '@/shared/lib/helpers/cn.ts';
import { baseStyles, sizeStyles, variantStyles } from './Spinner.styles.ts';

type SpinnerSize = 'sm' | 'md' | 'lg';
type SpinnerVariant = 'accent' | 'contrast';

type SpinnerProps = {
	variant?: SpinnerVariant;
	size?: SpinnerSize;
	label?: string;
};

function Spinner({ size = 'md', label, variant = 'accent' }: SpinnerProps) {
	const { t } = useTranslation();
	const text = label ?? t('loading');

	return (
		<>
			<span
				role="status"
				aria-label={text}
				className={cn(baseStyles, sizeStyles[size], variantStyles[variant])}
			></span>
			<span aria-hidden="true">{text}</span>
		</>
	);
}

export type { SpinnerSize, SpinnerVariant };
export { Spinner };
