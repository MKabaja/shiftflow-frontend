import { queryOptions } from '@tanstack/react-query';
import { fetchAvailabilityMonth } from '@/features/availability/api/availability.api.ts';
import type { AvailabilityQueryParams } from '@/features/availability/model/availability.schemas.ts';

/**
 * Query keys and options for availability.
 *
 * `month` is marked `handled`: errors skip the global toast, the calendar shows them in place.
 */
const availabilityQueries = {
  all: () => ['availability'] as const,
  month: (params: AvailabilityQueryParams) =>
    queryOptions({
      queryKey: [...availabilityQueries.all(), 'month', params.year, params.month] as const,
      queryFn: () => fetchAvailabilityMonth(params),
      meta: { handled: true },
    }),
};

export { availabilityQueries };
