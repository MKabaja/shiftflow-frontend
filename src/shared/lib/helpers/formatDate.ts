import { format, isValid, toDate, type DateArg, type Locale } from 'date-fns';

/**
 * Formats a date as a full, localized calendar date — `18 czerwca 2026`
 * in Polish, `June 18th, 2026` in English.
 *
 * @returns The formatted date, or an empty string when `date` is invalid.
 */
export function formatDate(date: DateArg<Date>, locale: Locale): string {
  const parsedDate = toDate(date);
  if (!isValid(parsedDate)) return '';

  return format(parsedDate, 'PPP', { locale });
}
