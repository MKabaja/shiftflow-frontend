import type { CardVariant } from './Card.tsx';

type VariantStyle = Record<CardVariant, string>;

const variantStyles: VariantStyle = {
  default: 'bg-bg-card shadow-nm-subtle',
  elevated:
    'shadow-nm-subtle bg-[radial-gradient(circle_at_50%_35%,var(--color-bg-elevated)_0%,var(--color-bg-card)_100%)]',
};
const baseStyles: string = 'rounded-lg p-6';
const interactiveStyles: string =
  'cursor-pointer transition-all duration-200 ease-out hover:-translate-y-[3px] hover:shadow-nm-raised-lg active:translate-y-0 active:shadow-nm-pressed';

export { baseStyles, variantStyles, interactiveStyles };
