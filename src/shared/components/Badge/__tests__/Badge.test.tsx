import { render, screen } from '@testing-library/react';
import { Badge } from '../Badge.tsx';

describe('Badge Component', () => {
  it('renders children', () => {
    render(<Badge variant="default">hello</Badge>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
  it('applies success variant class', () => {
    render(<Badge variant="success">success</Badge>);
    expect(screen.getByText('success')).toHaveClass('text-success');
  });
});
