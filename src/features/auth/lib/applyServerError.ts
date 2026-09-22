import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import type { ParseKeys } from 'i18next';
import { parseApiError } from '@/shared/lib/helpers/parseApiError.ts';

type InvalidCredentialsKey = Extract<
  ParseKeys<'errors'>,
  'auth.invalidCredentials' | 'auth.invalidPin'
>;

function applyServerError<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
  invalidKey: InvalidCredentialsKey,
): void {
  const { messageKey, statusCode, fieldErrors } = parseApiError(error);
  if (fieldErrors) {
    const entries = (Object.entries(fieldErrors) as [Path<T>, string[]][]).filter(
      ([, messages]) => messages.length > 0,
    );

    if (entries.length > 0) {
      entries.forEach(([field, messages]) => {
        setError(field, {
          type: 'server',
          message: messages[0],
        });
      });
      return;
    }
  }

  let key = messageKey;
  if (statusCode === 401) key = invalidKey;
  if (statusCode === 403) key = 'auth.accountDeactivated';

  setError('root.serverError', {
    type: 'server',
    message: key,
  });
}

export { applyServerError };
