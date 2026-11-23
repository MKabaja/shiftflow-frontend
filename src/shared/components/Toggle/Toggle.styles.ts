import { focusStyles } from '@/shared/lib/styles/focusStyles.ts';
import type { ToggleSize } from './Toggle.tsx';

type ToggleSizeStyle = { track: string; knob: string; travel: number };
type ToggleSizeStyleBySize = Record<ToggleSize, ToggleSizeStyle>;

const sizeStyles: ToggleSizeStyleBySize = {
	sm: { track: 'w-8 h-4.5', knob: 'w-3.5 h-3.5 top-0.5', travel: 14 },
	md: { track: 'w-12 h-6', knob: 'w-4 h-4 top-1', travel: 28 },
};

const trackFocusStyles = focusStyles.replaceAll(
	'focus-visible:',
	'has-[:focus-visible]:',
);

const trackBaseStyles = `relative inline-flex shrink-0 items-center rounded-full shadow-nm-inset transition-colors duration-200 ${trackFocusStyles}`;
const trackCheckedStyles = 'bg-accent/30';
const trackUncheckedStyles = 'bg-bg-offset';

const knobBaseStyles =
	'absolute left-0.5 rounded-full bg-text-muted shadow-nm-raised-sm';

const labelBaseStyles = 'flex items-center gap-3';
const labelEnabledStyles = 'cursor-pointer';
const labelDisabledStyles = 'cursor-not-allowed opacity-40';
const labelTextStyles = 'text-body-md text-text-primary';
const descriptionStyles = 'mt-0.5 block text-body-sm text-text-muted';

export {
	descriptionStyles,
	knobBaseStyles,
	labelBaseStyles,
	labelDisabledStyles,
	labelEnabledStyles,
	labelTextStyles,
	sizeStyles,
	trackBaseStyles,
	trackCheckedStyles,
	trackUncheckedStyles,
};
