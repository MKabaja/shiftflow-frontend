import { addMinutes, subDays } from 'date-fns';
import { enUS, pl } from 'date-fns/locale';
import { config } from '@/shared/lib/config/config.ts';
import { formatDate } from '../formatDate.ts';
import { formatRelativeDate } from '../formatRelativeDate.ts';

const NOW = new Date('2026-10-02T12:00:00+00:00');
const THREE_HOURS_AGO = '2026-10-02T09:00:00+00:00';

describe('formatRelativeDate', () => {
  it('formats a recent date as relative time', () => {
    expect(formatRelativeDate(THREE_HOURS_AGO, enUS, NOW)).toBe('3 hours ago');
  });

  it('uses the locale passed as an argument', () => {
    expect(formatRelativeDate(THREE_HOURS_AGO, pl, NOW)).toBe('3 godziny temu');
  });

  it('rounds down to the whole unit', () => {
    expect(formatRelativeDate('2026-10-02T10:01:00+00:00', enUS, NOW)).toBe('1 hour ago');
  });

  it('shows "less than a minute ago" below one minute', () => {
    expect(formatRelativeDate('2026-10-02T11:59:50+00:00', enUS, NOW)).toBe(
      'less than a minute ago',
    );
  });

  it('treats a future date as now', () => {
    expect(formatRelativeDate('2026-10-02T12:05:00+00:00', enUS, NOW)).toBe(
      'less than a minute ago',
    );
  });

  it('returns null for invalid input', () => {
    expect(formatRelativeDate('abc', enUS, NOW)).toBeNull();
  });

  it('stays relative just before the limit', () => {
    const date = addMinutes(subDays(NOW, config.relativeDateLimitDays), 1).toISOString();
    const result = formatRelativeDate(date, enUS, NOW);

    expect(result).toMatch(/ ago$/);
    expect(result).not.toBe(formatDate(date, enUS));
  });

  it('switches to the full date at the limit', () => {
    const date = subDays(NOW, config.relativeDateLimitDays).toISOString();

    expect(formatRelativeDate(date, enUS, NOW)).toBe(formatDate(date, enUS));
  });
});
