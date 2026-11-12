import { format, isValid, toDate, type DateArg, type Locale } from 'date-fns';

/**
 * Formats a date as a full localized calendar date, e.g. `18 czerwca 2026`.
 *
 * @returns `null` when `date` is invalid.
 */
export function formatDate(date: DateArg<Date>, locale: Locale): string | null {
  const parsedDate = toDate(date);
  if (!isValid(parsedDate)) return null;

  return format(parsedDate, 'PPP', { locale });
}
