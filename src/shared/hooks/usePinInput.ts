import { type ChangeEvent, type ClipboardEvent, type KeyboardEvent, useRef, useState } from 'react';

type UsePinInputParams = {
  length: number;
  value?: string;
  onChange?: (pin: string) => void;
  onComplete?: (pin: string) => void;
  disabled?: boolean;
};

type PinBoxElement = HTMLInputElement | null;

const DIGIT = /^\d$/;

/**
 * All PinInput behavior: refs to every box, per-box change/keydown/paste handlers,
 * focus management, and completion. Controlled when `value` is provided (e.g. RHF
 * Controller), otherwise the hook holds its own state.
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
  const digits = isControlled ? splitValue(value, length) : internalDigits;

  function handleChange(index: number, event: ChangeEvent<HTMLInputElement>) {
    if (disabled) return;
    const character = event.target.value.slice(-1);
    if (character !== '' && !DIGIT.test(character)) return;
    setDigit(index, character);
    if (character !== '') focusInput(index + 1);
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (disabled) return;
    switch (event.key) {
      case 'Backspace':
        handleBackspace(index, event);
        break;
      case 'ArrowLeft':
        handleArrowLeft(index, event);
        break;
      case 'ArrowRight':
        handleArrowRight(index, event);
        break;
      default:
        break;
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    if (disabled) return;
    event.preventDefault();
    const pastedDigits = event.clipboardData
      .getData('text')
      .split('')
      .filter((char) => DIGIT.test(char))
      .slice(0, length);
    if (pastedDigits.length === 0) return;
    commit(Array.from({ length }, (_, index) => pastedDigits[index] ?? ''));
    focusInput(pastedDigits.length - 1);
  }

  function registerRef(index: number) {
    return (element: PinBoxElement) => {
      if (element) inputsRef.current[index] = element;
    };
  }

  return { digits, registerRef, handleChange, handleKeyDown, handlePaste };

  function focusInput(index: number) {
    if (disabled) return;
    const targetIndex = clamp(index, 0, length - 1);
    const target = inputsRef.current[targetIndex];
    target?.focus();
    target?.select();
  }

  function commit(nextDigits: string[]) {
    if (!isControlled) setInternalDigits(nextDigits);
    const pin = nextDigits.join('');
    onChange?.(pin);
    if (nextDigits.every((digit) => digit !== '')) onComplete?.(pin);
  }

  function setDigit(index: number, digit: string) {
    const nextDigits = [...digits];
    nextDigits[index] = digit;
    commit(nextDigits);
  }

  function handleBackspace(index: number, event: KeyboardEvent<HTMLInputElement>) {
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

  function handleArrowLeft(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (index === 0) return;
    event.preventDefault();
    focusInput(index - 1);
  }

  function handleArrowRight(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (index === length - 1) return;
    event.preventDefault();
    focusInput(index + 1);
  }
}

function splitValue(value: string, length: number): string[] {
  const digits = value.split('').filter((char) => DIGIT.test(char));
  return Array.from({ length }, (_, index) => digits[index] ?? '');
}
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}
