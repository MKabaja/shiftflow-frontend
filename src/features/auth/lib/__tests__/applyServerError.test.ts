import { AxiosError, type AxiosResponse } from 'axios';
import type { UseFormSetError } from 'react-hook-form';
import { applyServerError } from '../applyServerError.ts';
import type { LoginFormValues } from '../schemas.ts';
import type { ApiError } from '@/shared/types/api.ts';
import '@/shared/i18n';

/**
 * Response bodies below are the real ones, captured from the backend with
 * Postman on 2026-08-05 (see docs/BACKEND_API.md).
 */
const makeAxiosError = (status?: number, data?: ApiError): AxiosError => {
  const error = new AxiosError('request failed');
  if (status !== undefined) {
    error.response = { status, data } as unknown as AxiosResponse<ApiError>;
  }
  return error;
};

const wrongPassword = makeAxiosError(401, { message: 'Invalid password or login!' });
const wrongPin = makeAxiosError(401, { message: 'Invalid pin or login' });
const deactivated = makeAxiosError(403, { message: 'Account deactivated.' });
const rateLimited = makeAxiosError(429, { message: 'Too Many Attempts.' });
const noResponse = makeAxiosError();
const missingPassword = makeAxiosError(422, {
  message: 'The password field is required.',
  errors: { password: ['The password field is required.'] },
});
const twoBadFields = makeAxiosError(422, {
  message: 'The given data was invalid.',
  errors: {
    login: ['The login field is required.'],
    password: ['The password field must be at least 6 characters.'],
  },
});

const setup = () => vi.fn() as unknown as UseFormSetError<LoginFormValues>;
const callsOf = (setError: UseFormSetError<LoginFormValues>) => vi.mocked(setError).mock.calls;

describe('applyServerError', () => {
  describe('form-level errors (no field to attach to)', () => {
    it('maps 401 to the caller-provided key, not to "session expired"', () => {
      const setError = setup();
      applyServerError(wrongPassword, setError, 'auth.invalidCredentials');

      expect(setError).toHaveBeenCalledTimes(1);
      expect(setError).toHaveBeenCalledWith('root.serverError', {
        type: 'server',
        message: 'Nieprawidłowy login lub hasło.',
      });
    });

    it('uses the PIN wording when the PIN form passes its own key', () => {
      const setError = setup();
      applyServerError(wrongPin, setError, 'auth.invalidPin');

      expect(setError).toHaveBeenCalledWith(
        'root.serverError',
        expect.objectContaining({ message: 'Nieprawidłowy login lub PIN.' }),
      );
    });

    it('maps 403 to the deactivated-account message', () => {
      const setError = setup();
      applyServerError(deactivated, setError, 'auth.invalidCredentials');

      expect(setError).toHaveBeenCalledWith(
        'root.serverError',
        expect.objectContaining({ message: 'To konto jest nieaktywne. Skontaktuj się z przełożonym.' }),
      );
    });

    it('keeps the parsed key for 429', () => {
      const setError = setup();
      applyServerError(rateLimited, setError, 'auth.invalidCredentials');

      expect(setError).toHaveBeenCalledWith(
        'root.serverError',
        expect.objectContaining({ message: 'Za dużo prób. Odczekaj chwilę.' }),
      );
    });

    it('reports a missing connection when there was no response at all', () => {
      const setError = setup();
      applyServerError(noResponse, setError, 'auth.invalidCredentials');

      expect(setError).toHaveBeenCalledWith(
        'root.serverError',
        expect.objectContaining({ message: 'Brak połączenia z serwerem' }),
      );
    });

    it('falls back to the generic message for a non-axios error', () => {
      const setError = setup();
      applyServerError(new Error('boom'), setError, 'auth.invalidCredentials');

      expect(setError).toHaveBeenCalledWith(
        'root.serverError',
        expect.objectContaining({ message: 'Coś poszło nie tak. Spróbuj ponownie.' }),
      );
    });
  });

  describe('field-level errors (422)', () => {
    it('attaches the error to the field the backend named', () => {
      const setError = setup();
      applyServerError(missingPassword, setError, 'auth.invalidCredentials');

      expect(setError).toHaveBeenCalledWith('password', {
        type: 'server',
        message: 'The password field is required.',
      });
    });

    it('does not add a form-level error on top of field errors', () => {
      const setError = setup();
      applyServerError(missingPassword, setError, 'auth.invalidCredentials');

      const targets = callsOf(setError).map(([field]) => field);
      expect(targets).not.toContain('root.serverError');
    });

    it('handles every field the backend rejected', () => {
      const setError = setup();
      applyServerError(twoBadFields, setError, 'auth.invalidCredentials');

      expect(setError).toHaveBeenCalledTimes(2);
      expect(setError).toHaveBeenCalledWith('login', expect.objectContaining({ type: 'server' }));
      expect(setError).toHaveBeenCalledWith('password', expect.objectContaining({ type: 'server' }));
    });

    it('shows the first message when a field has several', () => {
      const setError = setup();
      const manyMessages = makeAxiosError(422, {
        message: 'The given data was invalid.',
        errors: { password: ['first complaint', 'second complaint'] },
      });
      applyServerError(manyMessages, setError, 'auth.invalidCredentials');

      expect(setError).toHaveBeenCalledWith(
        'password',
        expect.objectContaining({ message: 'first complaint' }),
      );
    });
  });
});