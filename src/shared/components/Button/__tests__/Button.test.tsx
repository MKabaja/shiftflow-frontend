import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button.tsx';

vi.mock('@/shared/components/Spinner', () => ({
  Spinner: () => <span data-testid="spinner" />,
}));

const renderButton = (props = {}, children = 'Zapisz') => {
  return render(<Button {...props}>{children}</Button>);
};

describe('Button', () => {
  it('renders children', () => {
    renderButton();
    expect(screen.getByRole('button', { name: 'Zapisz' })).toBeInTheDocument();
  });

  it('shows Spinner instead of children when loading', () => {
    renderButton({ isLoading: true });

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByText('Zapisz')).not.toBeInTheDocument();
  });

  it('has aria-busy when loading', () => {
    renderButton({ isLoading: true });

    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('is disabled when loading', () => {
    renderButton({ isLoading: true });

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is disabled when disabled prop passed', () => {
    renderButton({ disabled: true });

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    renderButton({ onClick });

    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    renderButton({ disabled: true, onClick });

    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('applies external className', () => {
    renderButton({ className: 'custom-class' });

    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
