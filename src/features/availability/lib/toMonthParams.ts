import type { AvailabilityQueryParams } from '@/features/availability/model/availability.schemas.ts';

/**
 * Extracts the year and month from a `Y-m-d` date string.
 *
 * Slices instead of using `new Date`, which shifts the 1st into the previous month in negative time zones.
 *
 * @returns `month` is 1–12.
 */
function toMonthParams(date: string): AvailabilityQueryParams {
  return {
    year: Number(date.slice(0, 4)),
    month: Number(date.slice(5, 7)),
  };
}

export { toMonthParams };
