import {
  differenceInDays,
  differenceInMinutes,
  formatDistance,
  formatDistanceStrict,
  isValid,
  min,
  toDate,
  type DateArg,
  type Locale,
} from 'date-fns';
import { config } from '@/shared/lib/config/config.ts';
import { formatDate } from '@/shared/lib/helpers/formatDate.ts';

/**
 * Formats a date relative to `now` (`3 godziny temu`), or as a full date once it is
 * `config.relativeDateLimitDays` days old.
 *
 * @param date - date to format; a future date is treated as `now`.
 * @param locale - date-fns locale of the output.
 * @param now - reference point, defaults to the current time.
 * @returns The relative or full date, or `null` when `date` is invalid.
 */
export function formatRelativeDate(
  date: DateArg<Date>,
  locale: Locale,
  now: Date = new Date(),
): string | null {
  const parsedDate = toDate(date);
  if (!isValid(parsedDate)) return null;

  if (differenceInDays(now, parsedDate) >= config.relativeDateLimitDays) {
    return formatDate(parsedDate, locale);
  }

  const pastDate = min([parsedDate, now]);
  if (differenceInMinutes(now, pastDate) < 1) {
    return formatDistance(pastDate, now, { addSuffix: true, locale });
  }

  return formatDistanceStrict(pastDate, now, {
    addSuffix: true,
    roundingMethod: 'floor',
    locale,
  });
}
