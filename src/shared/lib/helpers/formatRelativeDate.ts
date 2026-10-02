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
 * Formats a past date relative to `now` (`3 godziny temu`, `1 day ago`)
 * while it is younger than `config.relativeDateLimitDays` full days, and as a
 * full date from {@link formatDate} after that.
 *
 * From one minute up the distance is rounded down, so the label never
 * overstates the age and the switch to a full date happens exactly at the
 * limit. Under a minute it reads as "less than a minute ago" or "1 minute ago"
 * instead of a seconds count.
 *
 * A date later than `now` is treated as `now`, so a server clock running
 * slightly ahead never produces "in 2 minutes".
 *
 * @param now - reference point, defaults to the current time.
 * @returns The formatted date, or an empty string when `date` is invalid.
 */
export function formatRelativeDate(
  date: DateArg<Date>,
  locale: Locale,
  now: Date = new Date(),
): string {
  const parsedDate = toDate(date);
  if (!isValid(parsedDate)) return '';

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
