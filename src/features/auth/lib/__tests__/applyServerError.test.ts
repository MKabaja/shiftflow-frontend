import type { FieldValues, UseFormSetError } from 'react-hook-form';
import { applyServerError } from '../applyServerError.ts';
import type { LoginFormValues, LoginPinFormValues } from '../schemas.ts';
import { NetworkError } from '@/shared/api/networkError.ts';
import { makeHttpError, makeValidationError } from '@/test/factories/httpError.factory.ts';

const wrongPassword = makeHttpError(401, { message: 'Invalid password or login!' });
const wrongPin = makeHttpError(401, { message: 'Invalid pin or login' });
const deactivated = makeHttpError(403, { message: 'Account deactivated.' });
const rateLimited = makeHttpError(429, { message: 'Too Many Attempts.' });
const noResponse = new NetworkError(new TypeError('Failed to fetch'));

const missingPassword = makeValidationError({ password: ['The password field is required.'] });
const twoBadFields = makeValidationError({
  login: ['The login field is required.'],
  password: ['The password field must be at least 6 characters.'],
});
const rejectedPin = makeValidationError({ pin: ['The pin field must be 4 characters.'] });
const noNamedFields = makeValidationError({});
const fieldWithoutMessage = makeValidationError({ password: [] });
const oneUsableFieldOneEmpty = makeValidationError({
  login: ['The login field is required.'],
  password: [],
});

const makeSetError = <T extends FieldValues>() => vi.fn<UseFormSetError<T>>();

describe('applyServerError', () => {
  describe('form-level errors (no field to attach to)', () => {
    it('maps 401 to the caller-provided key, not to "session expired"', () => {
      const setError = makeSetError<LoginFormValues>();
      applyServerError<LoginFormValues>(wrongPassword, setError, 'auth.invalidCredentials');

      expect(setError).toHaveBeenCalledTimes(1);
      expect(setError).toHaveBeenCalledWith('root.serverError', {
        type: 'server',
        message: 'auth.invalidCredentials',
      });
    });

    it('uses the PIN wording when the PIN form passes its own key', () => {
      const setError = makeSetError<LoginPinFormValues>();
      applyServerError<LoginPinFormValues>(wrongPin, setError, 'auth.invalidPin');

      expect(setError).toHaveBeenCalledWith(
        'root.serverError',
        expect.objectContaining({ message: 'auth.invalidPin' }),
      );
    });

    it('maps 403 to the deactivated-account message', () => {
      const setError = makeSetError<LoginPinFormValues>();
      applyServerError<LoginPinFormValues>(deactivated, setError, 'auth.invalidCredentials');

      expect(setError).toHaveBeenCalledWith(
        'root.serverError',
        expect.objectContaining({
          message: 'auth.accountDeactivated',
        }),
      );
    });

    it('keeps the parsed key for 429', () => {
      const setError = makeSetError<LoginFormValues>();
      applyServerError<LoginFormValues>(rateLimited, setError, 'auth.invalidCredentials');

      expect(setError).toHaveBeenCalledWith(
        'root.serverError',
        expect.objectContaining({ message: 'tooMany' }),
      );
    });

    it('reports a missing connection when there was no response at all', () => {
      const setError = makeSetError<LoginFormValues>();
      applyServerError<LoginFormValues>(noResponse, setError, 'auth.invalidCredentials');

      expect(setError).toHaveBeenCalledWith(
        'root.serverError',
        expect.objectContaining({ message: 'network' }),
      );
    });

    it('falls back to the generic message for a non-HTTP error', () => {
      const setError = makeSetError<LoginFormValues>();
      applyServerError<LoginFormValues>(new Error('boom'), setError, 'auth.invalidCredentials');

      expect(setError).toHaveBeenCalledWith(
        'root.serverError',
        expect.objectContaining({ message: 'unexpected' }),
      );
    });
  });

  describe('field-level errors (422)', () => {
    it('attaches the error to the field the backend named', () => {
      const setError = makeSetError<LoginFormValues>();
      applyServerError<LoginFormValues>(missingPassword, setError, 'auth.invalidCredentials');

      expect(setError).toHaveBeenCalledWith('password', {
        type: 'server',
        message: 'The password field is required.',
      });
    });

    it('does not add a form-level error on top of field errors', () => {
      const setError = makeSetError<LoginFormValues>();
      applyServerError<LoginFormValues>(missingPassword, setError, 'auth.invalidCredentials');
      const targets = setError.mock.calls.map(([field]) => field);

      expect(targets).not.toContain('root.serverError');
    });

    it('handles every field the backend rejected', () => {
      const setError = makeSetError<LoginFormValues>();
      applyServerError<LoginFormValues>(twoBadFields, setError, 'auth.invalidCredentials');

      expect(setError).toHaveBeenCalledTimes(2);
      expect(setError).toHaveBeenCalledWith('login', expect.objectContaining({ type: 'server' }));
      expect(setError).toHaveBeenCalledWith(
        'password',
        expect.objectContaining({ type: 'server' }),
      );
    });

    it('shows the first message when a field has several', () => {
      const setError = makeSetError<LoginFormValues>();
      const manyMessages = makeValidationError({
        password: ['first complaint', 'second complaint'],
      });
      applyServerError<LoginFormValues>(manyMessages, setError, 'auth.invalidCredentials');

      expect(setError).toHaveBeenCalledWith(
        'password',
        expect.objectContaining({ message: 'first complaint' }),
      );
    });

    it('attaches a rejected pin to the pin field of the PIN form', () => {
      const setError = makeSetError<LoginPinFormValues>();
      applyServerError<LoginPinFormValues>(rejectedPin, setError, 'auth.invalidPin');

      expect(setError).toHaveBeenCalledWith('pin', {
        type: 'server',
        message: 'The pin field must be 4 characters.',
      });
    });

    it('skips a field the backend named without any message', () => {
      const setError = makeSetError<LoginFormValues>();
      applyServerError<LoginFormValues>(
        oneUsableFieldOneEmpty,
        setError,
        'auth.invalidCredentials',
      );

      expect(setError).toHaveBeenCalledTimes(1);
      expect(setError).toHaveBeenCalledWith('login', expect.objectContaining({ type: 'server' }));
    });
  });

  describe('422 with nothing to attach', () => {
    it('falls back to a form-level error when no field was named', () => {
      const setError = makeSetError<LoginFormValues>();
      applyServerError<LoginFormValues>(noNamedFields, setError, 'auth.invalidCredentials');

      expect(setError).toHaveBeenCalledTimes(1);
      expect(setError).toHaveBeenCalledWith(
        'root.serverError',
        expect.objectContaining({ message: 'validation' }),
      );
    });

    it('falls back to a form-level error when every field came back empty', () => {
      const setError = makeSetError<LoginFormValues>();
      applyServerError<LoginFormValues>(fieldWithoutMessage, setError, 'auth.invalidCredentials');

      expect(setError).toHaveBeenCalledTimes(1);
      expect(setError).toHaveBeenCalledWith(
        'root.serverError',
        expect.objectContaining({ message: 'validation' }),
      );
    });
  });
});
