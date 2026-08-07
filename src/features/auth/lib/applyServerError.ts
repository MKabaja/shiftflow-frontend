import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import type { ParseKeys } from 'i18next';
import i18n from '@/shared/i18n';
import { parseApiError } from '@/shared/lib/helpers/parseApiError.ts';

function applyServerError<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
  invalidKey: ParseKeys<'errors'>,
): void {
  const { messageKey, statusCode, fieldErrors } = parseApiError(error);
  if (fieldErrors) {
    const entries = Object.entries(fieldErrors) as [Path<T>, string[]][];

    entries.forEach(([field, value]) => {
      setError(field, {
        type: 'server',
        message: value[0],
      });
    });
    return;
  }

  let key = messageKey;
  if (statusCode === 401) key = invalidKey;
  if (statusCode === 403) key = 'auth.accountDeactivated';

  setError('root.serverError', {
    type: 'server',
    message: i18n.t(key, { ns: 'errors' }),
  });
}

export { applyServerError };
