import type { LogoSize, LogoVariant } from './Logo.tsx';

type SizeScale = Record<LogoSize, string>;
type VariantSizeScale = Record<LogoVariant, SizeScale>;

const sizeStyles: VariantSizeScale = {
  wordmark: { sm: 'w-24', md: 'w-32', lg: 'w-44', xl: 'w-60' },
  icon: { sm: 'size-5', md: 'size-7', lg: 'size-9', xl: 'size-12' },
};

const baseStyles: string = 'shrink-0 select-none';

export { baseStyles, sizeStyles };
