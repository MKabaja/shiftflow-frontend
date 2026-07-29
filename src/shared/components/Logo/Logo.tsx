import { cn } from '@/shared/lib/helpers/cn.ts';
import logoUrl from '@/shared/assets/Logo.svg';
import { baseStyles, sizeStyles } from '@/shared/components/Logo/Logo.styles.ts';

export type LogoSize = 'sm' | 'md' | 'lg' | 'xl';

type LogoProps = {
  size: LogoSize;
};

export function Logo({ size }: LogoProps) {
  return (
    <img
      src={logoUrl}
      alt="ShiftFlow"
      className={cn(baseStyles, sizeStyles[size])}
    />
  );
}
