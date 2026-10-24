import { render, screen } from '@testing-library/react';
import { Spinner } from '../Spinner.tsx';

describe('Spinner', () => {
  it('renders without crashing', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has translated default aria-label', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading…');
  });

  it('accepts custom aria-label', () => {
    render(<Spinner label="Saving" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Saving');
  });

  it('applies size class', () => {
    render(<Spinner size="lg" />);
    expect(screen.getByRole('status')).toHaveClass('size-10');
  });
});
