import { cn } from '@/shared/lib/helpers/cn.ts';
import { disabledStyles } from '@/shared/lib/styles/disabledStyles.ts';
import { inputFocusStyles } from '@/shared/lib/styles/inputFocusStyles.ts';

type BoxStyleProps = {
  hasError?: boolean;
};

function boxStyles({ hasError }: BoxStyleProps): string {
  return cn(
    'h-14 w-12 rounded-md border border-border bg-bg-offset text-center font-display text-2xl font-semibold text-text-primary caret-accent shadow-nm-inset outline-none transition-all sm:h-16 sm:w-14',
    hasError ? 'border-danger' : inputFocusStyles,
    disabledStyles,
  );
}

const containerStyles: string = 'flex flex-col items-center gap-4';
const boxRowStyles: string = 'flex justify-center gap-3';
const toggleButtonStyles: string = cn(
  'inline-flex items-center justify-center text-text-muted transition-colors hover:text-text-primary',
  disabledStyles,
);

export { boxStyles, containerStyles, boxRowStyles, toggleButtonStyles };
