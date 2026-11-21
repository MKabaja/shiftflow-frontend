import {
	type ChangeEvent,
	type ClipboardEvent,
	type KeyboardEvent,
	useRef,
	useState,
} from 'react';

type UsePinInputParams = {
	length: number;
	value?: string;
	onChange?: (pin: string) => void;
	onComplete?: (pin: string) => void;
	disabled?: boolean;
};

type PinBoxElement = HTMLInputElement | null;

type NavigationKey = 'Backspace' | 'ArrowLeft' | 'ArrowRight';

type KeyHandler = (
	index: number,
	event: KeyboardEvent<HTMLInputElement>,
) => void;

type KeyHandlerByKey = Record<NavigationKey, KeyHandler>;

const DIGIT = /^\d$/;

/**
 * Provides the box refs, handlers and focus management of `PinInput`.
 *
 * Controlled when `value` is provided, otherwise holds its own state.
 */
export function usePinInput({
	length,
	value,
	onChange,
	onComplete,
	disabled = false,
}: UsePinInputParams) {
	const isControlled = value !== undefined;
	const [internalDigits, setInternalDigits] = useState<string[]>(() =>
		Array.from({ length }, () => ''),
	);
	const inputsRef = useRef<HTMLInputElement[]>([]);
	const digits = isControlled ? toDigits(value, length) : internalDigits;
	const keyHandlerByKey: KeyHandlerByKey = {
		Backspace: handleBackspace,
		ArrowLeft: handleArrowLeft,
		ArrowRight: handleArrowRight,
	};

	function handleChange(index: number, event: ChangeEvent<HTMLInputElement>) {
		if (disabled) return;
		const character = event.target.value.slice(-1);
		if (character !== '' && !DIGIT.test(character)) return;
		setDigit(index, character);
		if (character !== '') focusInput(index + 1);
	}

	function handleKeyDown(
		index: number,
		event: KeyboardEvent<HTMLInputElement>,
	) {
		if (disabled || !isNavigationKey(event.key)) return;
		keyHandlerByKey[event.key](index, event);
	}

	function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
		if (disabled) return;
		event.preventDefault();
		const pastedDigits = toDigits(event.clipboardData.getData('text'), length);
		const filledCount = pastedDigits.filter(isFilled).length;
		if (filledCount === 0) return;
		applyDigits(pastedDigits);
		focusInput(filledCount - 1);
	}

	function registerRef(index: number) {
		return (element: PinBoxElement) => {
			if (element) inputsRef.current[index] = element;
		};
	}

	return { digits, registerRef, handleChange, handleKeyDown, handlePaste };

	function isNavigationKey(key: string): key is NavigationKey {
		return Object.hasOwn(keyHandlerByKey, key);
	}

	function focusInput(index: number) {
		const targetIndex = clamp(index, 0, length - 1);
		const target = inputsRef.current[targetIndex];
		target?.focus();
		target?.select();
	}

	function applyDigits(nextDigits: string[]) {
		if (!isControlled) setInternalDigits(nextDigits);
		const pin = nextDigits.join('');
		onChange?.(pin);
		if (nextDigits.every(isFilled)) onComplete?.(pin);
	}

	function setDigit(index: number, digit: string) {
		const nextDigits = [...digits];
		nextDigits[index] = digit;
		applyDigits(nextDigits);
	}

	function handleBackspace(
		index: number,
		event: KeyboardEvent<HTMLInputElement>,
	) {
		if (digits[index]) {
			setDigit(index, '');
			return;
		}
		if (index > 0) {
			event.preventDefault();
			setDigit(index - 1, '');
			focusInput(index - 1);
		}
	}

	function handleArrowLeft(
		index: number,
		event: KeyboardEvent<HTMLInputElement>,
	) {
		if (index === 0) return;
		event.preventDefault();
		focusInput(index - 1);
	}

	function handleArrowRight(
		index: number,
		event: KeyboardEvent<HTMLInputElement>,
	) {
		if (index === length - 1) return;
		event.preventDefault();
		focusInput(index + 1);
	}
}

function toDigits(text: string, length: number): string[] {
	const digits = text.split('').filter((character) => DIGIT.test(character));
	return Array.from({ length }, (_, index) => digits[index] ?? '');
}

function isFilled(digit: string): boolean {
	return digit !== '';
}

function clamp(value: number, min: number, max: number): number {
	return Math.max(min, Math.min(value, max));
}
