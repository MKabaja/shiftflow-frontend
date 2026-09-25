import { render, screen } from '@testing-library/react';
import { Avatar } from '../Avatar.tsx';
import userEvent from '@testing-library/user-event';

describe('Avatar Component', () => {
  it('renders initials from name', () => {
    render(<Avatar name="John Doe"></Avatar>);
    const element = screen.getByText('JD');
    expect(element).toBeInTheDocument();
  });

  it('renders fallback icon when no name provided', () => {
    render(<Avatar name=""></Avatar>);
    expect(screen.queryByText(/^[A-Z]{1,2}$/)).not.toBeInTheDocument();
  });

  it('hides the decorative fallback from assistive technology', () => {
    const { container } = render(<Avatar name=""></Avatar>);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('leaves a clickable avatar without label named after the person', () => {
    render(
      <Avatar
        name="John Doe"
        onClick={vi.fn()}
      ></Avatar>,
    );
    expect(screen.getByRole('button', { name: 'John Doe' })).toBeInTheDocument();
  });

  it('renders as div with role="img" named after the person when no onClick', () => {
    render(<Avatar name="John Doe"></Avatar>);
    const div = screen.getByRole('img', { name: 'John Doe' });
    expect(div).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders as button and calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Avatar
        name="John Doe"
        label="Open profile"
        onClick={handleClick}
      ></Avatar>,
    );
    const button = screen.getByRole('button', { name: 'Open profile' });
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('names the button from label when there is no name', () => {
    render(
      <Avatar
        label="Open profile"
        onClick={vi.fn()}
      ></Avatar>,
    );
    expect(screen.getByRole('button', { name: 'Open profile' })).toBeInTheDocument();
  });
});
