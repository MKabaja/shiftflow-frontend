import type { AvatarSize } from './Avatar.tsx';

type SizeStyle = Record<AvatarSize, string>;

const sizeStyles: SizeStyle = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-base',
  lg: 'w-14 h-14 text-xl',
  xl: 'w-20 h-20 text-3xl',
};
const baseStyles: string =
  'transition duration-200 border border-border shadow-nm-subtle font-display rounded-full  font-semibold flex items-center justify-center select-none shrink-0 overflow-hidden text-bg-deep';

export { baseStyles, sizeStyles };
