import { AxiosError, type AxiosResponse } from 'axios';
import { parseApiError } from '../parseApiError.ts';
import type { ApiError } from '@/shared/types/api.ts';

const makeAxiosError = (status?: number, data?: ApiError): AxiosError => {
  const error = new AxiosError('request failed');
  if (status !== undefined) {
    error.response = {
      status,
      data: data ?? { message: 'error' },
    } as unknown as AxiosResponse<ApiError>;
  }
  return error;
};

describe('parseApiError', () => {
  it('returns "unexpected" for a non-axios error', () => {
    expect(parseApiError(new Error('boom'))).toEqual({ messageKey: 'unexpected' });
  });

  it('returns "unexpected" for a non-error value (e.g. a string)', () => {
    expect(parseApiError('nope')).toEqual({ messageKey: 'unexpected' });
  });

  it('returns "network" for an axios error without a response', () => {
    expect(parseApiError(makeAxiosError())).toEqual({ messageKey: 'network' });
  });

  it.each([
    [401, 'unauthorized'],
    [403, 'forbidden'],
    [404, 'notFound'],
    [409, 'conflict'],
    [429, 'tooMany'],
  ])('maps status %i to messageKey "%s"', (status, messageKey) => {
    expect(parseApiError(makeAxiosError(status))).toEqual({ messageKey, statusCode: status });
  });

  it('maps 422 with field errors to "validation" and forwards fieldErrors', () => {
    const data: ApiError = { message: 'Validation failed', errors: { email: ['taken'] } };

    expect(parseApiError(makeAxiosError(422, data))).toEqual({
      messageKey: 'validation',
      fieldErrors: { email: ['taken'] },
      statusCode: 422,
    });
  });

  it('falls back to "unexpected" for 422 without an errors body', () => {
    expect(parseApiError(makeAxiosError(422, { message: 'nope' }))).toEqual({
      messageKey: 'unexpected',
      statusCode: 422,
    });
  });

  it('falls back to "unexpected" for an unmapped status (500)', () => {
    expect(parseApiError(makeAxiosError(500))).toEqual({
      messageKey: 'unexpected',
      statusCode: 500,
    });
  });
});
