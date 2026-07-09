import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { PinInput } from '../PinInput.tsx';

const renderPin = (props = {}) => render(<PinInput autoFocus={false} {...props} />);
const box = (n: number) => screen.getByLabelText(`PIN digit ${n} of 4`) as HTMLInputElement;

describe('PinInput', () => {
  it('renders the config-driven number of boxes by default (4)', () => {
    renderPin();
    expect(screen.getAllByLabelText(/PIN digit \d of 4/)).toHaveLength(4);
  });

  it('renders a custom number of boxes when length is passed', () => {
    render(<PinInput length={6} autoFocus={false} />);
    expect(screen.getAllByLabelText(/PIN digit \d of 6/)).toHaveLength(6);
  });

  it('labels each box for screen readers', () => {
    renderPin();
    expect(screen.getByLabelText('PIN digit 1 of 4')).toBeInTheDocument();
    expect(screen.getByLabelText('PIN digit 4 of 4')).toBeInTheDocument();
  });

  it('auto-advances focus to the next box on digit entry', async () => {
    const user = userEvent.setup();
    renderPin();
    await user.type(box(1), '5');

    expect(box(1)).toHaveValue('5');
    expect(box(2)).toHaveFocus();
  });

  it('ignores non-digit characters', async () => {
    const user = userEvent.setup();
    renderPin();
    await user.type(box(1), 'a');

    expect(box(1)).toHaveValue('');
  });

  it('moves focus to the previous box on Backspace when the current box is empty', async () => {
    const user = userEvent.setup();
    renderPin();
    await user.type(box(1), '1'); // focus advances to box 2
    await user.keyboard('{Backspace}');

    expect(box(1)).toHaveFocus();
    expect(box(1)).toHaveValue('');
  });

  it('moves focus with the arrow keys', async () => {
    const user = userEvent.setup();
    renderPin();
    await user.click(box(2));
    await user.keyboard('{ArrowLeft}');
    expect(box(1)).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(box(2)).toHaveFocus();
  });

  it('keeps focus on the first box when ArrowLeft is pressed there', async () => {
    const user = userEvent.setup();
    renderPin();
    await user.click(box(1));
    await user.keyboard('{ArrowLeft}');

    expect(box(1)).toHaveFocus();
  });

  it('keeps focus on the last box when ArrowRight is pressed there', async () => {
    const user = userEvent.setup();
    renderPin();
    await user.click(box(4));
    await user.keyboard('{ArrowRight}');

    expect(box(4)).toHaveFocus();
  });

  it('fills every box from a pasted value', async () => {
    const user = userEvent.setup();
    renderPin();
    await user.click(box(1));
    await user.paste('1234');

    expect(box(1)).toHaveValue('1');
    expect(box(2)).toHaveValue('2');
    expect(box(3)).toHaveValue('3');
    expect(box(4)).toHaveValue('4');
  });

  it('calls onChange with the current pin on entry', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderPin({ onChange });
    await user.type(box(1), '7');

    expect(onChange).toHaveBeenLastCalledWith('7');
  });

  it('calls onComplete with the full pin once all boxes are filled', async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    renderPin({ onComplete });
    await user.click(box(1));
    await user.paste('1234');

    expect(onComplete).toHaveBeenCalledWith('1234');
  });

  it('masks digits by default and toggles visibility', async () => {
    const user = userEvent.setup();
    renderPin();
    const toggle = screen.getByRole('button', { name: 'Toggle PIN visibility' });

    expect(box(1)).toHaveAttribute('type', 'password');
    expect(toggle).toHaveAttribute('aria-pressed', 'false');

    await user.click(toggle);
    expect(box(1)).toHaveAttribute('type', 'text');
    expect(toggle).toHaveAttribute('aria-pressed', 'true');

    await user.click(toggle);
    expect(box(1)).toHaveAttribute('type', 'password');
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
  });

  it('marks the boxes as invalid when error is set', () => {
    renderPin({ error: true });
    expect(box(1)).toHaveAttribute('aria-invalid', 'true');
  });

  it('forwards the ref to the first box', () => {
    const ref = createRef<HTMLInputElement>();
    renderPin({ ref });
    expect(ref.current).toBe(box(1));
  });

  it('focuses the first box on mount when autoFocus is set', () => {
    render(<PinInput />);
    expect(screen.getByLabelText('PIN digit 1 of 4')).toHaveFocus();
  });

  it('disables the boxes and the toggle when disabled', () => {
    renderPin({ disabled: true });
    expect(box(1)).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Toggle PIN visibility' })).toBeDisabled();
  });
});