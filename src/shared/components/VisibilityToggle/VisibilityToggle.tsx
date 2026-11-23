import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/shared/lib/helpers/cn.ts';
import { baseStyles, iconStyles } from './VisibilityToggle.styles.ts';

type VisibilityToggleProps = {
	masked: boolean;
	onToggle: () => void;
	showLabel: string;
	hideLabel: string;
	disabled?: boolean;
	className?: string;
};

export function VisibilityToggle({
	masked,
	onToggle,
	showLabel,
	hideLabel,
	disabled = false,
	className,
}: VisibilityToggleProps) {
	return (
		<button
			type="button"
			onClick={onToggle}
			disabled={disabled}
			aria-label={masked ? showLabel : hideLabel}
			aria-pressed={!masked}
			className={cn(baseStyles, className)}
		>
			{masked ? (
				<Eye className={iconStyles} />
			) : (
				<EyeOff className={iconStyles} />
			)}
		</button>
	);
}
