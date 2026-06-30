import { forwardRef, ReactNode } from 'react';
import { Spinner } from '@/shared/components/Spinner';
import { cn } from '@/shared/lib/cn.ts';
import { baseStyles, sizeStyles, variantStyles } from './Button.styles.ts';
import { motion } from 'motion/react';

export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  className?: string;

  fullWidth?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'sm', isLoading, fullWidth, children, className },
  ref,
) {
  return (
    <motion.button
      type="button"
      ref={ref}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={cn(
        sizeStyles[size],
        variantStyles[variant],
        baseStyles,
        className,
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
    </motion.button>
  );
});
