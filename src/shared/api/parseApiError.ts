import type { ParseKeys } from 'i18next';
import { HttpError } from '@/shared/api/httpError.ts';
import { NetworkError } from '@/shared/api/networkError.ts';

export type ParsedApiError = {
  messageKey: ParseKeys<'errors'>;
  fieldErrors?: Record<string, string[]>;
  statusCode?: number;
};

type CodeMap = Record<number, ParseKeys<'errors'>>;

type ValidationErrorBody = { errors: Record<string, string[]> };

const errorStrategy: CodeMap = {
  401: 'unauthorized',
  403: 'forbidden',
  404: 'notFound',
  409: 'conflict',
  429: 'tooMany',
};

function parseApiError(error: unknown): ParsedApiError {
  if (error instanceof NetworkError) return { messageKey: 'network' };
  if (!(error instanceof HttpError)) return { messageKey: 'unexpected' };

  const { status, body } = error;
  const isValidationError = status === 422 && hasFieldErrors(body);

  if (isValidationError)
    return {
      messageKey: 'validation',
      fieldErrors: body.errors,
      statusCode: status,
    };

  return {
    statusCode: status,
    messageKey: errorStrategy[status] ?? 'unexpected',
  };
}

function hasFieldErrors(body: unknown): body is ValidationErrorBody {
  return (
    typeof body === 'object' &&
    body !== null &&
    'errors' in body &&
    typeof body.errors === 'object' &&
    body.errors !== null
  );
}

export { parseApiError };
