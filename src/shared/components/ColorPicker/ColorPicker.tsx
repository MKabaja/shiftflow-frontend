import { useId } from 'react';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import { cn } from '@/shared/lib/helpers/cn.ts';
import { disabledContainerStyles } from '@/shared/lib/styles/disabledStyles.ts';
import {
  cardStyles,
  containerStyles,
  errorTextStyles,
  hexInputStyles,
  labelStyles,
  swatchRowStyles,
  swatchStyles,
} from './ColorPicker.styles.ts';
import './ColorPicker.css';

export type ColorPickerProps = {
  label?: string;
  error?: string;
  value: string;
  onChange: (hex: string) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
};

export function ColorPicker({
  id,
  label,
  error,
  value,
  onChange,
  disabled = false,
  className,
}: ColorPickerProps) {
  const generatedId = useId();
  const labelId = useId();
  const errorId = useId();
  const inputId = id ?? generatedId;
  const hasError = !!error;

  return (
    <div
      className={cn(containerStyles, className)}
      role="group"
      aria-labelledby={label ? labelId : undefined}
    >
      {label && (
        <label
          id={labelId}
          className={cn(labelStyles)}
          htmlFor={inputId}
        >
          {label}
        </label>
      )}
      <div className={cn(cardStyles)}>
        <div
          className={cn('sf-color-picker', disabled && disabledContainerStyles)}
          aria-disabled={disabled || undefined}
        >
          <HexColorPicker
            color={value}
            onChange={onChange}
          />
        </div>
        <div className={cn(swatchRowStyles)}>
          <span
            aria-hidden="true"
            className={cn(swatchStyles)}
            style={{ backgroundColor: value }}
          />
          <HexColorInput
            id={inputId}
            color={value}
            onChange={onChange}
            prefixed
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            className={hexInputStyles({ hasError })}
          />
        </div>
      </div>
      {error && (
        <p
          className={cn(errorTextStyles)}
          id={errorId}
        >
          {error}
        </p>
      )}
    </div>
  );
}
