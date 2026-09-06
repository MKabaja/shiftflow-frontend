import { cn } from '@/shared/lib/helpers/cn.ts';
import { baseStyles, orientationStyles } from './Separator.styles.ts';

export type SeparatorOrientation = 'horizontal' | 'vertical';

type SeparatorProps = {
  orientation?: SeparatorOrientation;
  className?: string;
};

export function Separator({ orientation = 'horizontal', className }: SeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(baseStyles, orientationStyles[orientation], className)}
    />
  );
}
