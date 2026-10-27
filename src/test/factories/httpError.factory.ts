import { HttpError } from '@/shared/api/httpError.ts';
import type { ApiError } from '@/shared/types/api.ts';

type FieldErrors = NonNullable<ApiError['errors']>;

export function makeHttpError(status: number, body: ApiError = { message: 'error' }): HttpError {
  return new HttpError(status, body);
}

export function makeValidationError(fieldErrors: FieldErrors): HttpError {
  return makeHttpError(422, { message: 'The given data was invalid.', errors: fieldErrors });
}
