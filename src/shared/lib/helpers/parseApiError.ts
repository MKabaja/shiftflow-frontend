import axios from 'axios';
import type { ParseKeys } from 'i18next';
import type { ApiError } from '@/shared/types/api.ts';

export type ParsedApiError = {
  messageKey: ParseKeys<'errors'>;
  fieldErrors?: Record<string, string[]>;
  statusCode?: number;
};

type CodeMap = Record<number, ParseKeys<'errors'>>;

const errorStrategy: CodeMap = {
  401: 'unauthorized',
  403: 'forbidden',
  404: 'notFound',
  409: 'conflict',
  429: 'tooMany',
};

function parseApiError(error: unknown): ParsedApiError {
  const isAxiosError = axios.isAxiosError<ApiError>(error);

  if (!isAxiosError) return { messageKey: 'unexpected' };

  if (!error.response) return { messageKey: 'network' };

  const status = error.response.status;
  const data = error.response.data;
  const isValidationError = status === 422 && data?.errors;

  if (isValidationError)
    return { messageKey: 'validation', fieldErrors: data.errors, statusCode: status };

  return {
    statusCode: status,
    messageKey: errorStrategy[status] ?? 'unexpected',
  };
}

export { parseApiError };
