import { parseApiError } from '../parseApiError.ts';
import { NetworkError } from '../networkError.ts';
import { makeHttpError, makeValidationError } from '@/test/factories/httpError.factory.ts';

describe('parseApiError', () => {
  it('returns "unexpected" for a non-HTTP error', () => {
    expect(parseApiError(new Error('boom'))).toEqual({ messageKey: 'unexpected' });
  });

  it('returns "unexpected" for a non-error value (e.g. a string)', () => {
    expect(parseApiError('nope')).toEqual({ messageKey: 'unexpected' });
  });

  it('returns "network" for a request that never reached the server', () => {
    expect(parseApiError(new NetworkError(new TypeError('Failed to fetch')))).toEqual({
      messageKey: 'network',
    });
  });

  it.each([
    [401, 'unauthorized'],
    [403, 'forbidden'],
    [404, 'notFound'],
    [409, 'conflict'],
    [429, 'tooMany'],
  ])('maps status %i to messageKey "%s"', (status, messageKey) => {
    expect(parseApiError(makeHttpError(status))).toEqual({ messageKey, statusCode: status });
  });

  it('maps 422 with field errors to "validation" and forwards fieldErrors', () => {
    expect(parseApiError(makeValidationError({ email: ['taken'] }))).toEqual({
      messageKey: 'validation',
      fieldErrors: { email: ['taken'] },
      statusCode: 422,
    });
  });

  it('falls back to "unexpected" for 422 without an errors body', () => {
    expect(parseApiError(makeHttpError(422, { message: 'nope' }))).toEqual({
      messageKey: 'unexpected',
      statusCode: 422,
    });
  });

  it('falls back to "unexpected" for an unmapped status (500)', () => {
    expect(parseApiError(makeHttpError(500))).toEqual({
      messageKey: 'unexpected',
      statusCode: 500,
    });
  });
});
