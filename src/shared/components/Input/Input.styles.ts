import { cn } from '@/shared/lib/helpers/cn.ts';
import { errorTextStyles } from '@/shared/lib/styles/errorTextStyles.ts';
import { inputFocusStyles } from '@/shared/lib/styles/inputFocusStyles.ts';

type InputStyleProps = {
	hasError?: boolean;
	hasLeftIcon?: boolean;
	hasRightIcon?: boolean;
};

function inputStyles({
	hasError,
	hasLeftIcon,
	hasRightIcon,
}: InputStyleProps): string {
	return cn(
		'h-10 w-full rounded-md border border-border bg-bg-inset text-body-md text-text-primary shadow-nm-inset transition-all placeholder:text-text-muted',
		'px-3.5',
		hasLeftIcon && 'pl-9',
		hasRightIcon && 'pr-9',
		hasError ? 'border-danger' : inputFocusStyles,
	);
}
function iconStyles(side: 'left' | 'right'): string {
	return cn(
		'absolute top-1/2 -translate-y-1/2 text-text-muted',
		side === 'left' ? 'pointer-events-none left-3' : 'right-3',
	);
}

const containerStyles: string = 'flex flex-col gap-1.5 w-full';
const fieldWrapperStyles: string = 'relative flex items-center';
const labelStyles: string = 'block mb-1.5 text-text-muted text-label';
const helperTextStyles: string = 'text-text-muted mt-1 text-body-sm';

export {
	containerStyles,
	errorTextStyles,
	fieldWrapperStyles,
	helperTextStyles,
	iconStyles,
	inputStyles,
	labelStyles,
};
