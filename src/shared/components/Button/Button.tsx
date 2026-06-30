import { forwardRef, ReactNode } from 'react';
import { Spinner } from '@/shared/components/Spinner';
import { cn } from '@/shared/lib/cn.ts';
import { baseStyles, sizeStyles, variantStyles } from './Button.styles.ts';

export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;

  fullWidth?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'sm', isLoading, fullWidth, children },
  ref,
) {
  return (
    <button
      type="button"
      ref={ref}
      className={cn(
        sizeStyles[size],
        variantStyles[variant],
        baseStyles,
        fullWidth ? 'w-full' : undefined,
      )}
    >
      {isLoading ? (
        <Spinner
          size="sm"
          variant={variant === 'primary' ? 'contrast' : 'accent'}
        />
      ) : (
        children
      )}
    </button>
  );
});
