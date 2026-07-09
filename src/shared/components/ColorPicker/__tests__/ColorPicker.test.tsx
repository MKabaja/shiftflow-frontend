import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ColorPicker } from '../ColorPicker.tsx';

const renderColorPicker = (props = {}) =>
  render(
    <ColorPicker
      value="#000000"
      onChange={() => {}}
      {...props}
    />,
  );

describe('ColorPicker', () => {
  it('renders the label associated with the hex input', () => {
    renderColorPicker({ label: 'Color' });
    const input = screen.getByRole('textbox', { name: 'Color' });
    const label = screen.getByText('Color');

    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe('INPUT');
    expect(label.tagName).toBe('LABEL');
  });

  it('exposes a group labelled by the label', () => {
    renderColorPicker({ label: 'Color' });
    expect(screen.getByRole('group', { name: 'Color' })).toBeInTheDocument();
  });

  it('reflects the current value in the hex input', () => {
    renderColorPicker({ label: 'Color', value: '#C9A347' });
    const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Color' });

    expect(input.value.replace('#', '').toLowerCase()).toBe('c9a347');
  });

  it('marks the input invalid and describes it via the error message', () => {
    renderColorPicker({ label: 'Color', error: 'Pick a color' });
    const input = screen.getByRole('textbox', { name: 'Color' });

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Pick a color');
  });

  it('renders the error message as a paragraph', () => {
    renderColorPicker({ error: 'Pick a color' });
    const errorP = screen.getByText('Pick a color');

    expect(errorP).toBeInTheDocument();
    expect(errorP.tagName).toBe('P');
  });

  it('keeps the input valid and undescribed when no error is present', () => {
    renderColorPicker({ label: 'Color' });
    const input = screen.getByRole('textbox', { name: 'Color' });

    expect(input).toHaveAttribute('aria-invalid', 'false');
    expect(input).not.toHaveAttribute('aria-describedby');
  });

  it('merges a custom className onto the container group', () => {
    renderColorPicker({ label: 'Color', className: 'bg-red-500' });
    const group = screen.getByRole('group', { name: 'Color' });

    expect(group).toHaveClass('bg-red-500');
  });

  it('disables the hex input and flags the picker as disabled', () => {
    const { container } = renderColorPicker({ label: 'Color', disabled: true });
    const input = screen.getByRole('textbox', { name: 'Color' });
    const picker = container.querySelector('.sf-color-picker');

    expect(input).toBeDisabled();
    expect(picker).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not flag the picker as disabled by default', () => {
    const { container } = renderColorPicker({ label: 'Color' });
    const picker = container.querySelector('.sf-color-picker');

    expect(picker).not.toHaveAttribute('aria-disabled');
  });

  it('calls onChange with the hex value typed into the input', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    renderColorPicker({ label: 'Color', onChange });
    const input = screen.getByRole('textbox', { name: 'Color' });

    await user.clear(input);
    await user.type(input, 'ff0000');

    expect(onChange).toHaveBeenCalled();
    const lastValue = onChange.mock.calls.at(-1)?.[0] as string;
    expect(lastValue.replace('#', '').toLowerCase()).toBe('ff0000');
  });
});