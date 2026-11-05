import { queryOptions, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/lib/config/queryKeys.ts';
import { backend } from '@/shared/api/backend.ts';
import { collectionOf } from '@/shared/api/envelopes.ts';
import {
  availabilitySchema,
  type AvailabilityQueryParams,
} from '@/features/availability/model/availability.schemas.ts';

/**
 * Query for one month of availability entries (`GET /availabilities`), sorted by date.
 *
 * Marked `handled`: errors skip the global toast, the calendar shows them in place.
 *
 * @param params - `month` is 1–12, not `Date.getMonth()`.
 */
const availabilitiesQueryOptions = (params: AvailabilityQueryParams) =>
  queryOptions({
    queryKey: queryKeys.availability.month(params),
    meta: { handled: true },
    queryFn: async () => {
      const body = await backend.get('/availabilities', { params });

      return collectionOf(availabilitySchema).parse(body).data;
    },
  });

function useAvailabilities(params: AvailabilityQueryParams) {
  return useQuery(availabilitiesQueryOptions(params));
}

export { availabilitiesQueryOptions, useAvailabilities };
