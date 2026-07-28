import { queryOptions, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/lib/config/queryKeys.ts';
import { apiClient } from '@/shared/lib/config/axios.ts';
import { config } from '@/shared/lib/config/config.ts';
import type { ApiError, SingleResource, User } from '@/shared/types/api.ts';
import type { AxiosError } from 'axios';

/**
 * Shared query definition for the currently authenticated user (`GET /me`).
 *
 * The single source of truth for the logged-in user: {@link useMe} and the
 * `_panel` / `_disposition` route guards pass this same object, so the cache
 * key, fetch and retry policy can never drift apart.
 *
 * Unwraps the `{ data }` envelope and returns the bare user. A `401` is
 * terminal (not retried) — it means "not logged in", so retrying cannot help;
 * other failures retry once.
 */
const meQueryOptions = queryOptions<User, AxiosError<ApiError>>({
  queryKey: queryKeys.auth.me,
  meta: { handled: true },
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

/**
 * React binding for {@link meQueryOptions}.
 *
 * Prefer {@link useAuth} in components when you only need the user + role flags.
 *
 * @returns TanStack Query result holding the {@link User}, or an `AxiosError`.
 * `data` is `undefined` until the first fetch resolves.
 */
function useMe() {
  return useQuery(meQueryOptions);
}

export { useMe, meQueryOptions };
