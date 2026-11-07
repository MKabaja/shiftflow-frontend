import { HttpError, type ApiErrorBody } from '@/shared/api/httpError.ts';

type FieldErrors = NonNullable<ApiErrorBody['errors']>;

export function makeHttpError(
  status: number,
  body: ApiErrorBody = { message: 'error' },
): HttpError {
  return new HttpError(status, body);
}

export function makeValidationError(fieldErrors: FieldErrors): HttpError {
  return makeHttpError(422, { message: 'The given data was invalid.', errors: fieldErrors });
}
