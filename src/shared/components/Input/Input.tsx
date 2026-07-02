import type { ComponentProps, ReactNode } from 'react';
import { useId } from 'react';
import { cn } from '@/shared/lib/helpers/cn.ts';
import { disabledStyles } from '@/shared/lib/styles/disabledStyles.ts';
import {
  containerStyles,
  errorTextStyles,
  fieldWrapperStyles,
  helperTextStyles,
  iconStyles,
  inputStyles,
  labelStyles,
} from './Input.styles.ts';

type InputProps = ComponentProps<'input'> & {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export function Input({
  ref,
  id,
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  ...rest
}: InputProps) {
  const generatedId = useId();
  const errorId = useId();
  const helperId = useId();
  const describedBy = error ? errorId : helperText ? helperId : undefined;
  const inputId = id ?? generatedId;
  const { className, ...inputRest } = rest;

  return (
    <div className={cn(containerStyles)}>
      {label && (
        <label
          className={cn(labelStyles)}
          htmlFor={inputId}
        >
          {label}
        </label>
      )}
      <div className={cn(fieldWrapperStyles)}>
        {leftIcon && (
          <span
            aria-hidden="true"
            className={cn(iconStyles('left'))}
          >
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...inputRest}
          className={cn(
            inputStyles({ hasError: !!error, hasRightIcon: !!rightIcon, hasLeftIcon: !!leftIcon }),
            disabledStyles,
            className,
          )}
        />
        {rightIcon && <span className={cn(iconStyles('right'))}>{rightIcon}</span>}
      </div>
      {error && (
        <p
          className={cn(errorTextStyles)}
          id={errorId}
        >
          {error}
        </p>
      )}
      {!error && helperText && (
        <p
          className={cn(helperTextStyles)}
          id={helperId}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
