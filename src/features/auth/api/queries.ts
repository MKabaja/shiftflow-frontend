import { queryOptions, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/lib/config/queryKeys.ts';
import { backend } from '@/shared/api/backend.ts';
import { HttpError } from '@/shared/api/httpError.ts';
import { config } from '@/shared/lib/config/config.ts';
import type { SingleResource, User } from '@/shared/types/api.ts';

/**
 * Query for the signed-in user (`GET /me`), shared by hooks and route guards.
 *
 * A `401` means "not logged in" and is not retried; other errors retry once.
 */
const meQueryOptions = queryOptions({
  queryKey: queryKeys.auth.me,
  meta: { handled: true },
  queryFn: async () => {
    const response = await backend.get<SingleResource<User>>('/me');

    return response.data;
  },
  staleTime: config.staleTime.auth,
  retry: (failureCount, error) => {
    if (error instanceof HttpError && error.status === 401) return false;
    return failureCount < 1;
  },
});

function useMe() {
  return useQuery(meQueryOptions);
}

export { useMe, meQueryOptions };
