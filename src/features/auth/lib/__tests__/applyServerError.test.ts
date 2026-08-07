import { AxiosError, type AxiosResponse } from 'axios';
import type { FieldValues, UseFormSetError } from 'react-hook-form';
import { applyServerError } from '../applyServerError.ts';
import type { LoginFormValues, LoginPinFormValues } from '../schemas.ts';
import type { ApiError } from '@/shared/types/api.ts';
import i18n from '@/shared/i18n';

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

const rejectedPin = makeAxiosError(422, {
  message: 'The pin field must be 4 characters.',
  errors: { pin: ['The pin field must be 4 characters.'] },
});
const noNamedFields = makeAxiosError(422, {
  message: 'The given data was invalid.',
  errors: {},
});
const fieldWithoutMessage = makeAxiosError(422, {
  message: 'The given data was invalid.',
  errors: { password: [] },
});
const oneUsableFieldOneEmpty = makeAxiosError(422, {
  message: 'The given data was invalid.',
  errors: {
    login: ['The login field is required.'],
    password: [],
  },
});

const makeSetError = <T extends FieldValues>() => vi.fn<UseFormSetError<T>>();

describe('applyServerError', () => {
  beforeAll(async () => {
    await i18n.changeLanguage('en');
  });

  describe('form-level errors (no field to attach to)', () => {
    it('maps 401 to the caller-provided key, not to "session expired"', () => {
      const setError = makeSetError<LoginFormValues>();
      applyServerError<LoginFormValues>(wrongPassword, setError, 'auth.invalidCredentials');

      expect(setError).toHaveBeenCalledTimes(1);
      expect(setError).toHaveBeenCalledWith('root.serverError', {
        type: 'server',
        message: 'Invalid login or password.',
      });
    });

    it('uses the PIN wording when the PIN form passes its own key', () => {
      const setError = makeSetError<LoginPinFormValues>();
      applyServerError<LoginPinFormValues>(wrongPin, setError, 'auth.invalidPin');

      expect(setError).toHaveBeenCalledWith(
        'root.serverError',
        expect.objectContaining({ message: 'Invalid login or PIN.' }),
      );
    });

    it('maps 403 to the deactivated-account message', () => {
      const setError = makeSetError<LoginPinFormValues>();
      applyServerError<LoginPinFormValues>(deactivated, setError, 'auth.invalidCredentials');

      expect(setError).toHaveBeenCalledWith(
        'root.serverError',
        expect.objectContaining({
          message: 'This account is inactive. Please contact your supervisor.',
        }),
      );
    });

    it('keeps the parsed key for 429', () => {
      const setError = makeSetError<LoginFormValues>();
      applyServerError<LoginFormValues>(rateLimited, setError, 'auth.invalidCredentials');

      expect(setError).toHaveBeenCalledWith(
        'root.serverError',
        expect.objectContaining({ message: 'Too many attempts. Please wait a moment.' }),
      );
    });

    it('reports a missing connection when there was no response at all', () => {
      const setError = makeSetError<LoginFormValues>();
      applyServerError<LoginFormValues>(noResponse, setError, 'auth.invalidCredentials');

      expect(setError).toHaveBeenCalledWith(
        'root.serverError',
        expect.objectContaining({ message: 'Cannot connect to the server' }),
      );
    });

    it('falls back to the generic message for a non-axios error', () => {
      const setError = makeSetError<LoginFormValues>();
      applyServerError<LoginFormValues>(new Error('boom'), setError, 'auth.invalidCredentials');

      expect(setError).toHaveBeenCalledWith(
        'root.serverError',
        expect.objectContaining({ message: 'Something went wrong. Please try again.' }),
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
      const manyMessages = makeAxiosError(422, {
        message: 'The given data was invalid.',
        errors: { password: ['first complaint', 'second complaint'] },
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
        expect.objectContaining({ message: 'Please correct the highlighted fields.' }),
      );
    });

    it('falls back to a form-level error when every field came back empty', () => {
      const setError = makeSetError<LoginFormValues>();
      applyServerError<LoginFormValues>(fieldWithoutMessage, setError, 'auth.invalidCredentials');

      expect(setError).toHaveBeenCalledTimes(1);
      expect(setError).toHaveBeenCalledWith(
        'root.serverError',
        expect.objectContaining({ message: 'Please correct the highlighted fields.' }),
      );
    });
  });
});
