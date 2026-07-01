import type { ComponentProps, ReactNode } from 'react';
import { useId } from 'react';

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

  return (
    <div>
      {label && <label htmlFor={inputId}>{label}</label>}
      <div>
        {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
        <input
          id={inputId}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...rest}
        />
        {rightIcon && <span>{rightIcon}</span>}

        {error && <p id={errorId}>{error}</p>}
        {!error && helperText && <p id={helperId}>{helperText}</p>}
      </div>
    </div>
  );
}
