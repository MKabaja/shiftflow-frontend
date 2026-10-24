import { enUS, pl } from 'date-fns/locale';
import { formatDate } from '../formatDate.ts';

const NOON_UTC = '2026-06-18T12:00:00+00:00';

describe('formatDate', () => {
  it('formats an ISO date in Polish', () => {
    expect(formatDate(NOON_UTC, pl)).toBe('18 czerwca 2026');
  });

  it('uses the locale passed as an argument', () => {
    expect(formatDate(NOON_UTC, enUS)).toBe('June 18th, 2026');
  });

  it.each(['abc', ''])('returns null for invalid input %j', (input) => {
    expect(formatDate(input, pl)).toBeNull();
  });
});
