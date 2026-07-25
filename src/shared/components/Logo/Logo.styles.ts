import type { LogoSize } from './Logo.tsx';

type SizeStyle = Record<LogoSize, string>;

const sizeStyles: SizeStyle = {
  sm: 'w-24',
  md: 'w-32',
  lg: 'w-44',
};

const baseStyles: string = 'h-auto select-none';

export { baseStyles, sizeStyles };
