import type { AvailabilityQueryParams } from '@/shared/types/api.ts';

/**
 * Extracts the year and month from an API date string, to address that month's cache entry.
 *
 * Slices the string instead of parsing it with `new Date`, which reads `Y-m-d` as UTC midnight
 * and can shift the 1st of a month into the previous one in negative time zones.
 *
 * @param date Date in `Y-m-d` format, e.g. `2026-10-18`.
 * @returns `{ year, month }` with `month` as 1–12, e.g. `{ year: 2026, month: 10 }`.
 */
function toMonthParams(date: string): AvailabilityQueryParams {
  return {
    year: Number(date.slice(0, 4)),
    month: Number(date.slice(5, 7)),
  };
}

export { toMonthParams };
