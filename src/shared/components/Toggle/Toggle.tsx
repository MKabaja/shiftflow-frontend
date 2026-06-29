import { forwardRef, useId } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/shared/lib/cn.ts';
import { knobBaseStyles, sizeStyles, trackBaseStyles } from './Toggle.styles.ts';

export type ToggleSize = 'sm' | 'md';

type ToggleProps = {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: ToggleSize;
};

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  { checked, onChange, label, description, disabled = false, size = 'md' },
  ref,
) {
  const id = useId();
  const { track, knob, travel } = sizeStyles[size];

  return (
    <label
      htmlFor={id}
      className={cn(
        'flex items-center gap-3',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
      )}
    >
      <div className={cn(trackBaseStyles, track, checked ? 'bg-accent/30' : 'bg-bg-offset')}>
        <input
          ref={ref}
          id={id}
          type="checkbox"
          role="switch"
          aria-checked={checked}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <motion.div
          className={cn(knobBaseStyles, knob)}
          animate={{ x: checked ? travel : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        />
      </div>
      {label && (
        <div>
          <span className="text-text-primary text-sm">{label}</span>
          {description && <p className="text-text-muted mt-0.5 text-xs">{description}</p>}
        </div>
      )}
    </label>
  );
});
