import { queryOptions, useQuery } from '@tanstack/react-query';
import type {
  Availability,
  ApiError,
  CollectionResponse,
  AvailabilityQueryParams,
} from '@/shared/types/api.ts';
import type { AxiosError } from 'axios';
import { queryKeys } from '@/shared/lib/config/queryKeys.ts';
import { apiClient } from '@/shared/lib/config/axios.ts';

/**
 * Query definition for one month of availability entries (`GET /availabilities`).
 *
 * Marked `handled` — the calendar shows the error in place, without the global toast.
 *
 * @param params - Year and month to fetch; `month` is 1–12, not `Date.getMonth()` (0–11).
 * @returns Query options resolving to every {@link Availability} in that month, sorted by date.
 */
const availabilitiesQueryOptions = (params: AvailabilityQueryParams) =>
  queryOptions<Availability[], AxiosError<ApiError>>({
    queryKey: queryKeys.availability.month(params),
    meta: { handled: true },
    queryFn: async () => {
      const response = await apiClient.get<CollectionResponse<Availability>>('/availabilities', {
        params,
      });
      return response.data.data;
    },
  });

/**
 * React binding for {@link availabilitiesQueryOptions}.
 *
 * @param params - Year and month to fetch; `month` is 1–12.
 * @returns TanStack Query result with the month's {@link Availability} entries, or an `AxiosError`.
 */
function useAvailabilities(params: AvailabilityQueryParams) {
  return useQuery(availabilitiesQueryOptions(params));
}

export { availabilitiesQueryOptions, useAvailabilities };
