import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ComponentProps } from 'react';
import { Modal } from '../Modal.tsx';

const noop = () => {};

const renderModal = (props: Partial<ComponentProps<typeof Modal>> = {}) =>
  render(
    <Modal
      isOpen
      onClose={noop}
      title="Title"
      {...props}
    />,
  );

describe('Modal', () => {
  describe('rendering', () => {
    it('renders the dialog when isOpen is true', () => {
      renderModal();
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('renders nothing when isOpen is false', () => {
      renderModal({ isOpen: false });
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders the children', () => {
      renderModal({ children: <p>Content</p> });
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders the footer when provided', () => {
      renderModal({ footer: <button>Save</button> });
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });

    it('merges a custom className onto the panel', () => {
      renderModal({ className: 'bg-red-500' });
      expect(screen.getByRole('dialog')).toHaveClass('bg-red-500');
    });
  });

  describe('ARIA', () => {
    it('exposes the dialog ARIA attributes', () => {
      renderModal();
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    });

    it('names the dialog via the title', () => {
      renderModal({ title: 'Edit shift' });
      expect(screen.getByRole('dialog')).toHaveAccessibleName('Edit shift');
    });

    it('describes the dialog when a description is provided', () => {
      renderModal({ description: 'Short description' });
      expect(screen.getByRole('dialog')).toHaveAccessibleDescription('Short description');
    });

    it('leaves the dialog without a description when none is provided', () => {
      renderModal();
      expect(screen.getByRole('dialog')).not.toHaveAttribute('aria-describedby');
      expect(screen.queryByText('Short description')).not.toBeInTheDocument();
    });
  });

  describe('closing', () => {
    it('calls onClose when the close button is clicked', async () => {
      const onClose = vi.fn();
      const user = userEvent.setup();
      renderModal({ onClose });

      await user.click(screen.getByRole('button', { name: 'close' }));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when Escape is pressed', async () => {
      const onClose = vi.fn();
      const user = userEvent.setup();
      renderModal({ onClose });

      await user.keyboard('{Escape}');
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when the backdrop is clicked', async () => {
      const onClose = vi.fn();
      const user = userEvent.setup();
      renderModal({ onClose });

      const backdrop = screen.getByRole('dialog').parentElement as HTMLElement;
      await user.click(backdrop);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose on backdrop click when closeOnBackdrop is false', async () => {
      const onClose = vi.fn();
      const user = userEvent.setup();
      renderModal({ onClose, closeOnBackdrop: false });

      const backdrop = screen.getByRole('dialog').parentElement as HTMLElement;
      await user.click(backdrop);
      expect(onClose).not.toHaveBeenCalled();
    });

    it('does not call onClose when clicking inside the panel', async () => {
      const onClose = vi.fn();
      const user = userEvent.setup();
      renderModal({ onClose });

      await user.click(screen.getByRole('dialog'));
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('body scroll lock', () => {
    it('locks body scroll while open and restores it on close', () => {
      const { rerender } = render(
        <Modal
          isOpen
          onClose={noop}
          title="Title"
        />,
      );
      expect(document.body.style.overflow).toBe('hidden');

      rerender(
        <Modal
          isOpen={false}
          onClose={noop}
          title="Title"
        />,
      );
      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('focus management', () => {
    it('moves focus to the close button when opened', () => {
      renderModal();
      expect(screen.getByRole('button', { name: 'close' })).toHaveFocus();
    });

    it('returns focus to the trigger after closing', () => {
      const { rerender } = render(
        <>
          <button>Open</button>
          <Modal
            isOpen={false}
            onClose={noop}
            title="Title"
          />
        </>,
      );
      const trigger = screen.getByRole('button', { name: 'Open' });
      trigger.focus();
      expect(trigger).toHaveFocus();

      rerender(
        <>
          <button>Open</button>
          <Modal
            isOpen
            onClose={noop}
            title="Title"
          />
        </>,
      );

      rerender(
        <>
          <button>Open</button>
          <Modal
            isOpen={false}
            onClose={noop}
            title="Title"
          />
        </>,
      );
      expect(trigger).toHaveFocus();
    });

    it('wraps focus from the last element back to the first on Tab', async () => {
      const user = userEvent.setup();
      renderModal({ footer: <button>Save</button> });

      const save = screen.getByRole('button', { name: 'Save' });
      save.focus();
      await user.tab();

      expect(screen.getByRole('button', { name: 'close' })).toHaveFocus();
    });

    it('wraps focus from the first element back to the last on Shift+Tab', async () => {
      const user = userEvent.setup();
      renderModal({ footer: <button>Save</button> });

      const close = screen.getByRole('button', { name: 'close' });
      close.focus();
      await user.tab({ shift: true });

      expect(screen.getByRole('button', { name: 'Save' })).toHaveFocus();
    });
  });
});
