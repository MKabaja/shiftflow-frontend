import { queryOptions, useQuery } from '@tanstack/react-query';
import type {
  Availability,
  CollectionResponse,
  AvailabilityQueryParams,
} from '@/shared/types/api.ts';
import { queryKeys } from '@/shared/lib/config/queryKeys.ts';
import { http } from '@/shared/api/http.ts';

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
      const response = await http.get<CollectionResponse<Availability>>('/availabilities', {
        params,
      });
      return response.data;
    },
  });

function useAvailabilities(params: AvailabilityQueryParams) {
  return useQuery(availabilitiesQueryOptions(params));
}

export { availabilitiesQueryOptions, useAvailabilities };
