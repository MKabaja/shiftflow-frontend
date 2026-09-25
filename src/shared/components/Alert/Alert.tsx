import { TriangleAlert } from 'lucide-react';
import { cn } from '@/shared/lib/helpers/cn.ts';
import { baseStyles, iconStyles } from './Alert.styles.ts';

type AlertProps = {
  message?: string;
  className?: string;
};

export function Alert({ message, className }: AlertProps) {
  if (!message) return null;

  return (
    <p
      role="alert"
      className={cn(baseStyles, className)}
    >
      <TriangleAlert
        aria-hidden="true"
        className={cn(iconStyles)}
      />
      {message}
    </p>
  );
}