import { type Ref, useId, useState } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { config } from '@/shared/lib/config/config.ts';
import { cn } from '@/shared/lib/helpers/cn.ts';
import { errorTextStyles } from '@/shared/lib/styles/errorTextStyles.ts';
import { usePinInput } from '@/shared/hooks/usePinInput.ts';
import { VisibilityToggle } from '@/shared/components/VisibilityToggle';
import { boxRowStyles, boxStyles, containerStyles, rowStyles } from './PinInput.styles.ts';

export type PinInputProps = {
  ref?: Ref<HTMLInputElement>;
  length?: number;
  value?: string;
  onChange?: (pin: string) => void;
  onComplete?: (pin: string) => void;
  mask?: boolean;
  disabled?: boolean;
  error?: string | boolean;
  autoFocus?: boolean;
};

export function PinInput({
  ref,
  length = config.pinLength,
  value,
  onChange,
  onComplete,
  mask = true,
  disabled = false,
  error,
  autoFocus = true,
}: PinInputProps) {
  const { t } = useTranslation('common');
  const [masked, setMasked] = useState(mask);
  const errorId = useId();
  const { digits, registerRef, handleChange, handleKeyDown, handlePaste } = usePinInput({
    length,
    value,
    onChange,
    onComplete,
    disabled,
  });
  const hasError = Boolean(error);
  const errorMessage = typeof error === 'string' ? error : undefined;

  const setBoxRef = (index: number) => (element: HTMLInputElement | null) => {
    registerRef(index)(element);
    if (index !== 0) return;
    if (typeof ref === 'function') ref(element);
    else if (ref) ref.current = element;
  };

  return (
    <div className={cn(containerStyles)}>
      <div className={cn(rowStyles)}>
        <motion.div
          role="group"
          aria-label={t('pin.groupLabel')}
          aria-describedby={errorMessage ? errorId : undefined}
          className={cn(boxRowStyles)}
          animate={hasError ? { x: [0, -6, 6, -6, 6, 0] } : { x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {Array.from({ length }, (_, index) => (
            <motion.input
              key={index}
              ref={setBoxRef(index)}
              type={masked ? 'password' : 'text'}
              inputMode="numeric"
              autoComplete="off"
              maxLength={1}
              value={digits[index] ?? ''}
              disabled={disabled}
              autoFocus={autoFocus && index === 0}
              aria-label={t('pin.digitLabel', { index: index + 1, length })}
              aria-invalid={hasError}
              onChange={(event) => handleChange(index, event)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              onPaste={handlePaste}
              className={cn(boxStyles({ hasError }))}
              animate={{ scale: digits[index] ? [1.05, 1] : 1 }}
              transition={{ duration: 0.15 }}
            />
          ))}
        </motion.div>

        <VisibilityToggle
          masked={masked}
          setMasked={setMasked}
          showLabel={t('pin.showPin')}
          hideLabel={t('pin.hidePin')}
          disabled={disabled}
        />
      </div>

      {errorMessage && (
        <p
          className={cn(errorTextStyles)}
          id={errorId}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}
