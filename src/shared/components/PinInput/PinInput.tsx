import { type Ref, useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff } from 'lucide-react';
import { config } from '@/shared/lib/config/config.ts';
import { cn } from '@/shared/lib/helpers/cn.ts';
import { usePinInput } from '@/shared/hooks/usePinInput.ts';
import { boxRowStyles, boxStyles, containerStyles, toggleButtonStyles } from './PinInput.styles.ts';

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
  const [masked, setMasked] = useState(mask);
  const { digits, registerRef, handleChange, handleKeyDown, handlePaste } = usePinInput({
    length,
    value,
    onChange,
    onComplete,
    disabled,
  });
  const hasError = Boolean(error);

  const setBoxRef = (index: number) => (element: HTMLInputElement | null) => {
    registerRef(index)(element);
    if (index !== 0) return;
    if (typeof ref === 'function') ref(element);
    else if (ref) ref.current = element;
  };

  return (
    <div className={cn(containerStyles)}>
      <motion.div
        role="group"
        aria-label="PIN"
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
            aria-label={`PIN digit ${index + 1} of ${length}`}
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

      <button
        type="button"
        onClick={() => setMasked((prev) => !prev)}
        disabled={disabled}
        aria-label="Toggle PIN visibility"
        aria-pressed={!masked}
        className={cn(toggleButtonStyles)}
      >
        {masked ? <Eye size={16} /> : <EyeOff size={16} />}
      </button>
    </div>
  );
}
