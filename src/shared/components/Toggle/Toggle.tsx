import { motion } from 'motion/react';
import { type Ref, useId } from 'react';
import { cn } from '@/shared/lib/helpers/cn.ts';
import {
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
} from './Toggle.styles.ts';

type ToggleSize = 'sm' | 'md';

type ToggleProps = {
	ref?: Ref<HTMLInputElement>;
	checked: boolean;
	onChange: (next: boolean) => void;
	label?: string;
	description?: string;
	disabled?: boolean;
	size?: ToggleSize;
};

function Toggle({
	ref,
	checked,
	onChange,
	label,
	description,
	disabled = false,
	size = 'md',
}: ToggleProps) {
	const id = useId();
	const { track, knob, travel } = sizeStyles[size];

	return (
		<label
			htmlFor={id}
			className={cn(
				labelBaseStyles,
				disabled ? labelDisabledStyles : labelEnabledStyles,
			)}
		>
			<span
				className={cn(
					trackBaseStyles,
					track,
					checked ? trackCheckedStyles : trackUncheckedStyles,
				)}
			>
				<input
					ref={ref}
					id={id}
					type="checkbox"
					role="switch"
					aria-checked={checked}
					checked={checked}
					disabled={disabled}
					onChange={(e) => onChange(e.target.checked)}
					className="sr-only"
				/>
				<motion.span
					className={cn(knobBaseStyles, knob)}
					animate={{ x: checked ? travel : 0 }}
					transition={{ duration: 0.2, ease: 'easeOut' }}
				/>
			</span>
			{label && (
				<span>
					<span className={labelTextStyles}>{label}</span>
					{description && (
						<span className={descriptionStyles}>{description}</span>
					)}
				</span>
			)}
		</label>
	);
}

export type { ToggleSize };
export { Toggle };
