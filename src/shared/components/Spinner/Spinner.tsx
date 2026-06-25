import { cn } from '@/shared/lib/cn.ts';
import { baseStyles, sizeStyles } from './Spinner.styles.ts';

export type Sizes = 'sm' | 'md' | 'lg';

type SpinnerProps = {
  size?: Sizes;
  label?: string;
};

export function Spinner({ size = 'md', label = 'loading...' }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(baseStyles, sizeStyles[size])}
    />
  );
}
