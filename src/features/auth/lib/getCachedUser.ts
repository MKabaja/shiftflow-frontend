import { meQueryOptions } from '@/features/auth/api/queries.ts';
import { queryClient } from '@/shared/lib/config/queryClient.ts';
import type { User } from '@/shared/types/api.ts';

/**
 * Reads the logged-in user straight from the query cache, synchronously and without a request.
 *
 * For code outside React that runs after the route guards have already loaded the user, such
 * as mutation callbacks. Use {@link getCurrentUser} when the user may not be cached yet.
 *
 * @returns The cached {@link User}, or `null` when nobody is logged in or the session expired.
 */
function getCachedUser(): User | null {
  return queryClient.getQueryData(meQueryOptions.queryKey) ?? null;
}

export { getCachedUser };
