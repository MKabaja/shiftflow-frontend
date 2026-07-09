import { render, screen } from '@testing-library/react';
import { Input } from '../Input.tsx';
import { createRef } from 'react';

const renderInput = (props = {}) => render(<Input {...props} />);
const icon = <span data-testid="icon" />;

describe('Input', () => {
  it('renders the label and input', () => {
    renderInput({ label: 'login' });
    const input = screen.getByRole('textbox', { name: 'login' });
    const label = screen.getByText('login');

    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe('INPUT');
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('LABEL');
  });

  it('marks the input as invalid and describes it via the error message', () => {
    renderInput({ label: 'login', error: 'Example error' });
    const input = screen.getByRole('textbox', { name: 'login' });

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Example error');
  });

  it('keeps the input valid and describes it via the helper text', () => {
    renderInput({ label: 'login', helperText: 'Example helperText' });
    const input = screen.getByRole('textbox', { name: 'login' });

    expect(input).toHaveAttribute('aria-invalid', 'false');
    expect(input).toHaveAccessibleDescription('Example helperText');
  });

  it('leaves aria-describedby undefined when neither error nor helperText is present', () => {
    renderInput({ label: 'login' });
    const input = screen.getByRole('textbox', { name: 'login' });
    expect(input).not.toHaveAttribute('aria-describedby');
  });

  it('renders the error message when error is provided', () => {
    renderInput({ error: 'Example error' });
    const errorP = screen.getByText('Example error');
    expect(errorP).toBeInTheDocument();
    expect(errorP.tagName).toBe('P');
  });

  it('renders the helper text when helperText is provided', () => {
    renderInput({ helperText: 'Example helperText' });
    const helperP = screen.getByText('Example helperText');
    expect(helperP).toBeInTheDocument();
    expect(helperP.tagName).toBe('P');
  });

  it('hides the helper text when both error and helperText are provided', () => {
    renderInput({ error: 'Example error', helperText: 'Example helperText' });
    const errorP = screen.queryByText('Example error');
    const helperP = screen.queryByText('Example helperText');

    expect(errorP).toBeInTheDocument();
    expect(helperP).not.toBeInTheDocument();
  });

  it('renders the leftIcon', () => {
    renderInput({ leftIcon: icon });
    const leftIcon = screen.getByTestId('icon');

    expect(leftIcon).toBeInTheDocument();
    expect(leftIcon.parentElement).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders the rightIcon', () => {
    renderInput({ rightIcon: icon });
    const rightIcon = screen.getByTestId('icon');

    expect(rightIcon).toBeInTheDocument();
    expect(rightIcon.parentElement).not.toHaveAttribute('aria-hidden');
  });

  it('merges a custom className onto the input element', () => {
    renderInput({ label: 'login', className: 'bg-red-500' });
    const input = screen.getByRole('textbox', { name: 'login' });

    expect(input).toHaveClass('bg-red-500');
    expect(input).not.toHaveClass('bg-bg-offset');
  });

  it('disables the input when disabled is passed', () => {
    renderInput({ label: 'login', disabled: true });
    const input = screen.getByRole('textbox', { name: 'login' });
    expect(input).toBeDisabled();
  });

  it('passes through other native input props via rest (e.g. placeholder)', () => {
    renderInput({ placeholder: 'test' });
    expect(screen.getByPlaceholderText('test')).toBeInTheDocument();
  });

  it('forwards the ref to the underlying input element', () => {
    const ref = createRef<HTMLInputElement>();
    renderInput({ label: 'login', ref });
    const input = screen.getByRole('textbox', { name: 'login' });

    expect(ref.current).toBe(input);
  });
});
