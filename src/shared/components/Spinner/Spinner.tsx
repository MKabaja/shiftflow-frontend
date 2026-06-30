import { cn } from '@/shared/lib/helpers/cn.ts';
import { baseStyles, sizeStyles, variantStyles } from './Spinner.styles.ts';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerVariant = 'accent' | 'contrast';

type SpinnerProps = {
  variant?: SpinnerVariant;
  size?: SpinnerSize;
  label?: string;
};

export function Spinner({ size = 'md', label = 'loading...', variant = 'accent' }: SpinnerProps) {
  return (
    <>
      <span
        role="status"
        aria-label={label}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant])}
      ></span>
      <span>{label}</span>
    </>
  );
}
