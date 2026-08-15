import i18n from '@/shared/i18n';
import { LocaleSwitcher } from '../LocaleSwitcher.tsx';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const renderLocaleSwitcher = () => render(<LocaleSwitcher />);

beforeEach(async () => {
  await i18n.changeLanguage('en');
  document.documentElement.lang = 'en';
});
afterEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
  document.documentElement.lang = '';
});

describe('LocaleSwitcher', () => {
  describe('rendering and labels', () => {
    it('names the group so screen readers announce what it controls', () => {
      renderLocaleSwitcher();

      const group = screen.getByRole('group', {
        name: 'Change language',
      });

      expect(group).toBeInTheDocument();
    });

    it('labels each button with its own language endonym', () => {
      renderLocaleSwitcher();

      expect(screen.getByRole('button', { name: 'Polski' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'English' })).toBeInTheDocument();
    });
  });

  describe('selected state', () => {
    it('marks only the active locale with aria-pressed', () => {
      renderLocaleSwitcher();

      const buttonPL = screen.getByRole('button', { name: 'Polski' });
      const buttonEN = screen.getByRole('button', { name: 'English' });

      expect(buttonEN).toHaveAttribute('aria-pressed', 'true');
      expect(buttonPL).toHaveAttribute('aria-pressed', 'false');
    });

    it('moves aria-pressed to the locale that was clicked', async () => {
      const user = userEvent.setup();
      renderLocaleSwitcher();

      const buttonPL = screen.getByRole('button', { name: 'Polski' });
      const buttonEN = screen.getByRole('button', { name: 'English' });

      await user.click(buttonPL);

      expect(buttonEN).toHaveAttribute('aria-pressed', 'false');
      expect(buttonPL).toHaveAttribute('aria-pressed', 'true');
    });

    it('keeps every button focusable, including the active one', async () => {
      const user = userEvent.setup();
      renderLocaleSwitcher();

      const buttonPL = screen.getByRole('button', { name: 'Polski' });
      const buttonEN = screen.getByRole('button', { name: 'English' });

      await user.tab();
      expect(buttonPL).toHaveFocus();

      await user.tab();
      expect(buttonEN).toHaveFocus();
    });
  });

  describe('switching', () => {
    it('switches the interface language on click', async () => {
      const user = userEvent.setup();
      renderLocaleSwitcher();

      const buttonPL = screen.getByRole('button', { name: 'Polski' });
      await user.click(buttonPL);

      expect(screen.getByRole('group', { name: 'Zmień język' })).toBeInTheDocument();
    });

    it('reflects the chosen language in the lang attribute of the document', async () => {
      const user = userEvent.setup();
      renderLocaleSwitcher();

      expect(document.documentElement.lang).toBe('en');

      const buttonPL = screen.getByRole('button', { name: 'Polski' });
      await user.click(buttonPL);

      expect(document.documentElement.lang).toBe('pl');
    });
  });

  describe('persistence', () => {
    it('stores the chosen locale so it survives a reload', async () => {
      const user = userEvent.setup();
      renderLocaleSwitcher();

      const buttonEN = screen.getByRole('button', { name: 'English' });
      await user.click(buttonEN);

      expect(localStorage.getItem('shiftflow.locale')).toBe('en');
    });

    it('still switches the language when localStorage cannot be written', async () => {
      const user = userEvent.setup();
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('storage is blocked');
      });

      renderLocaleSwitcher();
      await user.click(screen.getByRole('button', { name: 'Polski' }));

      expect(screen.getByRole('group', { name: 'Zmień język' })).toBeInTheDocument();
      expect(document.documentElement.lang).toBe('pl');
    });
  });
});
