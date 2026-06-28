import type { SkeletonVariant } from './Skeleton.tsx';

type VariantStyle = Record<SkeletonVariant, string>;

const variantStyles: VariantStyle = {
  text: 'rounded-sm',
  circle: 'rounded-full',
  rect: 'rounded',
};
const baseStyles: string =
  'overflow-hidden bg-linear-to-r from-(--color-bg-offset) via-(--color-bg-card) to-(--color-bg-offset) [background-size:200%_100%] animate-shimmer';

export { variantStyles, baseStyles };
