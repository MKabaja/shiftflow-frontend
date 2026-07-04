import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from '../Card.tsx';

const renderCard = (props = {}, children = 'Card content') => {
  return render(<Card {...props}>{children}</Card>);
};

describe('Card', () => {
  it('renders children', () => {
    renderCard();
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies external className', () => {
    const { container } = renderCard({ className: 'custom-class' });
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('overrides conflicting base styles with className', () => {
    const { container } = renderCard({ className: 'p-0' });
    expect(container.firstChild).toHaveClass('p-0');
    expect(container.firstChild).not.toHaveClass('p-6');
  });

  it('passes through rest props', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    renderCard({ onClick, 'data-testid': 'card', role: 'button' });

    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();

    await user.click(card);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
