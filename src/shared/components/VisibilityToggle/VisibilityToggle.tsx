import type { Dispatch, SetStateAction } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/shared/lib/helpers/cn.ts';
import { baseStyles, iconStyles } from './VisibilityToggle.styles.ts';

type VisibilityToggleProps = {
  masked: boolean;
  setMasked: Dispatch<SetStateAction<boolean>>;
  showLabel: string;
  hideLabel: string;
  disabled?: boolean;
  className?: string;
};

export function VisibilityToggle({
  masked,
  setMasked,
  showLabel,
  hideLabel,
  disabled = false,
  className,
}: VisibilityToggleProps) {
  return (
    <button
      type="button"
      onClick={() => setMasked((prev) => !prev)}
      disabled={disabled}
      aria-label={masked ? showLabel : hideLabel}
      aria-pressed={!masked}
      className={cn(baseStyles, className)}
    >
      {masked ? (
        <Eye className={cn(iconStyles)} />
      ) : (
        <EyeOff className={cn(iconStyles)} />
      )}
    </button>
  );
}
