import { cn } from '@/shared/lib/helpers/cn.ts';
import { disabledStyles } from '@/shared/lib/styles/disabledStyles.ts';
import { inputFocusStyles } from '@/shared/lib/styles/inputFocusStyles.ts';

type BoxStyleProps = {
  hasError?: boolean;
};

function boxStyles({ hasError }: BoxStyleProps): string {
  return cn(
    'h-10 w-14 shrink-0 rounded-md border border-border bg-bg-offset text-center font-display text-display-md text-text-primary caret-accent shadow-nm-inset outline-none transition-all',
    hasError ? 'border-danger' : inputFocusStyles,
    disabledStyles,
  );
}

const containerStyles: string = 'flex w-full flex-col gap-1.5';
const rowStyles: string = 'flex flex-row items-center gap-4';
const boxRowStyles: string = 'flex flex-1 justify-between max-w-xs';

export { boxStyles, containerStyles, rowStyles, boxRowStyles };
