import { cn } from '@/shared/lib/helpers/cn.ts';
import { disabledStyles } from '@/shared/lib/styles/disabledStyles.ts';
import { focusStyles } from '@/shared/lib/styles/focusStyles.ts';

const baseStyles: string = cn(
  'inline-flex items-center justify-center rounded-sm text-text-muted transition-colors hover:text-text-primary',
  focusStyles,
  disabledStyles,
);
const iconStyles: string = 'size-4';

export { baseStyles, iconStyles };
