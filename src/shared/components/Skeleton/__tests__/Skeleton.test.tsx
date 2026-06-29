import { render } from '@testing-library/react';
import { Skeleton } from '../Skeleton.tsx';

describe('Skeleton', () => {
  it('renders without crashing and is aria-hidden', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies text variant class by default', () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass('rounded-sm');
  });

  it('applies circle variant class', () => {
    const { container } = render(<Skeleton variant="circle" />);
    expect(container.firstChild).toHaveClass('rounded-full');
  });

  it('applies rect variant class', () => {
    const { container } = render(<Skeleton variant="rect" />);
    expect(container.firstChild).toHaveClass('rounded');
  });

  it('merges custom className with base styles', () => {
    const { container } = render(<Skeleton className="h-10 w-10" />);
    expect(container.firstChild).toHaveClass('h-10 w-10 animate-shimmer');
  });
});
