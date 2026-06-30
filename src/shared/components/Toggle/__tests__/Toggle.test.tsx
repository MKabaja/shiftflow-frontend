import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toggle } from '../Toggle.tsx';

describe('Toggle', () => {
  it('has aria-checked="true" when checked', () => {
    render(
      <Toggle
        checked={true}
        onChange={() => {}}
      />,
    );
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('has aria-checked="false" when unchecked', () => {
    render(
      <Toggle
        checked={false}
        onChange={() => {}}
      />,
    );
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('calls onChange with toggled value on click', async () => {
    const handleChange = vi.fn();
    render(
      <Toggle
        checked={false}
        onChange={handleChange}
      />,
    );
    await userEvent.click(screen.getByRole('switch'));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('renders label text', () => {
    render(
      <Toggle
        checked={false}
        onChange={() => {}}
        label="Powiadomienia"
      />,
    );
    expect(screen.getByText('Powiadomienia')).toBeInTheDocument();
  });

  it('applies disabled styles to label', () => {
    const { container } = render(
      <Toggle
        checked={false}
        onChange={() => {}}
        disabled
      />,
    );
    expect(container.firstChild).toHaveClass('cursor-not-allowed');
  });
});
