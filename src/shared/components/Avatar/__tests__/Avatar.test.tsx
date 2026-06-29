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

  it('renders as div with role="img" when no onClick', () => {
    render(<Avatar name="John Doe"></Avatar>);
    const div = screen.getByRole('img');
    expect(div).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders as button and calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(
      <Avatar
        name="John Doe"
        onClick={handleClick}
      ></Avatar>,
    );
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
