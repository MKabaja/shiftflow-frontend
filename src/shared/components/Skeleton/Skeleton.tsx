import { baseStyles, variantStyles } from './Skeleton.styles.ts';
import { cn } from '@/shared/lib/cn.ts';

export type SkeletonVariant = 'text' | 'circle' | 'rect';
type DimensionType = string | number;

type SkeletonProps = {
  variant: SkeletonVariant;
  width?: DimensionType;
  height?: DimensionType;
};

export function Skeleton({ variant = 'text', width = '100%', height = '1rem' }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      style={{ width, height }}
      className={cn(baseStyles, variantStyles[variant])}
    ></div>
  );
}
