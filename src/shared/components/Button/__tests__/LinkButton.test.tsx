import { render, screen } from '@testing-library/react';
import { LinkButton } from '../LinkButton.tsx';
import type { ComponentPropsWithoutRef } from 'react';

vi.mock('@tanstack/react-router', () => ({
  Link: ({
    children,
    to,
    target,
    rel,
    className,
    ...rest
  }: ComponentPropsWithoutRef<'a'> & { to: string }) => (
    <a
      href={to}
      target={target}
      rel={rel}
      className={className}
      {...rest}
    >
      {children}
    </a>
  ),
}));

const renderLink = (props: Partial<ComponentPropsWithoutRef<typeof LinkButton>> = {}) => {
  return render(
    <LinkButton
      to="/"
      {...props}
    >
      Przejdź
    </LinkButton>,
  );
};

describe('LinkButton', () => {
  it('renders children', () => {
    renderLink();
    expect(screen.getByRole('link', { name: 'Przejdź' })).toBeInTheDocument();
  });

  it('applies external className', () => {
    renderLink({ className: 'custom-class' });
    expect(screen.getByRole('link')).toHaveClass('custom-class');
  });

  it('passes target attribute', () => {
    renderLink({ target: '_blank' });
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
  });

  it('adds security rel for _blank when rel not provided', () => {
    renderLink({ target: '_blank' });
    expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('merges security tokens into provided rel for target="_blank"', () => {
    renderLink({ target: '_blank', rel: 'nofollow' });
    expect(screen.getByRole('link')).toHaveAttribute('rel', 'nofollow noopener noreferrer');
  });

  it('does not duplicate security tokens already present in rel', () => {
    renderLink({ target: '_blank', rel: 'noopener' });
    expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not add rel when target is not _blank', () => {
    renderLink();
    expect(screen.getByRole('link')).not.toHaveAttribute('rel');
  });
});
