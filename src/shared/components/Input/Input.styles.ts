import { cn } from '@/shared/lib/helpers/cn.ts';
import { inputFocusStyles } from '@/shared/lib/styles/inputFocusStyles.ts';

type InputStyleProps = {
  hasError?: boolean;
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
};

function inputStyles({ hasError, hasLeftIcon, hasRightIcon }: InputStyleProps): string {
  return cn(
    'h-10 w-full rounded-md bg-bg-offset text-body-md text-text-primary shadow-nm-inset transition-all border border-border placeholder:text-text-muted',
    'px-3.5',
    hasLeftIcon && 'pl-9',
    hasRightIcon && 'pr-9',
    hasError ? 'border-danger' : inputFocusStyles,
  );
}
function iconStyles(side: 'left' | 'right'): string {
  return cn(
    'absolute top-1/2 -translate-y-1/2 text-text-muted',
    side === 'left' ? 'left-3 pointer-events-none' : 'right-3',
  );
}

const containerStyles: string = 'flex flex-col gap-1.5 w-full';
const fieldWrapperStyles: string = 'relative flex items-center';
const labelStyles: string = 'block mb-1.5 text-text-muted text-label';
const errorTextStyles: string = 'text-danger mt-1 text-body-sm';
const helperTextStyles: string = 'text-text-muted mt-1 text-body-sm';

export {
  inputStyles,
  iconStyles,
  containerStyles,
  labelStyles,
  errorTextStyles,
  helperTextStyles,
  fieldWrapperStyles,
};
