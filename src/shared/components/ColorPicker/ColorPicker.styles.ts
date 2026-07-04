import { cn } from '@/shared/lib/helpers/cn.ts';
import { disabledStyles } from '@/shared/lib/styles/disabledStyles.ts';
import { inputFocusStyles } from '@/shared/lib/styles/inputFocusStyles.ts';

type HexInputStyleProps = {
  hasError?: boolean;
};

function hexInputStyles({ hasError }: HexInputStyleProps): string {
  return cn(
    'h-8 w-full rounded-md border border-border bg-bg-offset px-2.5 text-body-sm uppercase text-text-primary shadow-nm-inset transition-all placeholder:text-text-muted',
    hasError ? 'border-danger' : inputFocusStyles,
    disabledStyles,
  );
}

const containerStyles: string = 'flex flex-col gap-1.5 w-full';
const labelStyles: string = 'block mb-1.5 text-text-muted text-label';
const cardStyles: string = 'flex flex-col gap-3 rounded-md bg-bg-card p-4 shadow-nm-raised';
const swatchRowStyles: string = 'flex items-center gap-2';
const swatchStyles: string = 'h-8 w-8 shrink-0 rounded-md border border-border';
const errorTextStyles: string = 'text-danger mt-1 text-body-sm';

export {
  hexInputStyles,
  containerStyles,
  labelStyles,
  cardStyles,
  swatchRowStyles,
  swatchStyles,
  errorTextStyles,
};
