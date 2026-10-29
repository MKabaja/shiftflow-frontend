import type { ParseKeys } from 'i18next';
import { HttpError, apiErrorBodySchema } from '@/shared/api/httpError.ts';
import { NetworkError } from '@/shared/api/networkError.ts';

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

const validationErrorBodySchema = apiErrorBodySchema.pick({ errors: true }).required();

function parseApiError(error: unknown): ParsedApiError {
  if (error instanceof NetworkError) return { messageKey: 'network' };
  if (!(error instanceof HttpError)) return { messageKey: 'unexpected' };

  const { status, body } = error;

  if (status === 422) {
    const validationResult = validationErrorBodySchema.safeParse(body);

    if (validationResult.success)
      return {
        messageKey: 'validation',
        fieldErrors: validationResult.data.errors,
        statusCode: status,
      };
  }

  return {
    statusCode: status,
    messageKey: errorStrategy[status] ?? 'unexpected',
  };
}

export { parseApiError };
