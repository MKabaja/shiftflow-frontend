import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VisibilityToggle } from '../VisibilityToggle.tsx';

const renderToggle = (props = {}) =>
  render(
    <VisibilityToggle
      masked
      setMasked={vi.fn()}
      showLabel="Show password"
      hideLabel="Hide password"
      {...props}
    />,
  );

function StatefulToggle() {
  const [masked, setMasked] = useState(true);
  return (
    <VisibilityToggle
      masked={masked}
      setMasked={setMasked}
      showLabel="Show password"
      hideLabel="Hide password"
    />
  );
}

describe('VisibilityToggle', () => {
  it('labels itself with showLabel while masked', () => {
    renderToggle();
    expect(screen.getByRole('button', { name: 'Show password' })).toBeInTheDocument();
  });

  it('labels itself with hideLabel while unmasked', () => {
    renderToggle({ masked: false });
    expect(screen.getByRole('button', { name: 'Hide password' })).toBeInTheDocument();
  });

  it('reports the revealed state through aria-pressed', () => {
    renderToggle({ masked: false });
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('flips the masked state on click', async () => {
    const user = userEvent.setup();
    render(<StatefulToggle />);
    await user.click(screen.getByRole('button', { name: 'Show password' }));

    expect(screen.getByRole('button', { name: 'Hide password' })).toBeInTheDocument();
  });

  it('does not toggle when disabled', async () => {
    const setMasked = vi.fn();
    const user = userEvent.setup();
    renderToggle({ disabled: true, setMasked });
    const toggle = screen.getByRole('button');

    expect(toggle).toBeDisabled();
    await user.click(toggle);
    expect(setMasked).not.toHaveBeenCalled();
  });

  it('merges the className escape hatch', () => {
    renderToggle({ className: 'custom-class' });
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
