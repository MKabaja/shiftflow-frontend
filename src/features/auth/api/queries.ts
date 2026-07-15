import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/lib/config/queryKeys.ts';
import { apiClient } from '@/shared/lib/config/axios.ts';
import { config } from '@/shared/lib/config/config.ts';
import type { ApiError, SingleResource, User } from '@/shared/types/api.ts';
import type { AxiosError } from 'axios';

/**
 * Query for the currently authenticated user (`GET /me`).
 *
 * The single source of truth for the logged-in user: route guards and
 * {@link useAuth} all read from this query's cache (`queryKeys.auth.me`).
 *
 * Unwraps the `{ data }` envelope and returns the bare user. `data` is
 * `undefined` until the first fetch resolves. A `401` is terminal (not retried) —
 * it means "not logged in", so retrying cannot help; other failures retry once.
 *
 * Prefer {@link useAuth} in components when you only need the user + role flags.
 *
 * @returns TanStack Query result holding the {@link User}, or an `AxiosError`.
 */
function useMe() {
  return useQuery<User, AxiosError<ApiError>>({
    queryKey: queryKeys.auth.me,
    queryFn: async () => {
      const response = await apiClient.get<SingleResource<User>>('/me');

      return response.data.data;
    },
    staleTime: config.staleTime.auth,

    retry: (failureCount, error) => {
      if (error.response?.status === 401) return false;
      return failureCount < 1;
    },
  });
}
export { useMe };
