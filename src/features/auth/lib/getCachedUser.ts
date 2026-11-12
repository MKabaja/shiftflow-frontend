import { authQueries } from '@/features/auth/api/auth.queries.ts';
import { queryClient } from '@/app/queryClient.ts';
import type { User } from '@/features/auth/model/user.schemas.ts';

/**
 * Reads the logged-in user from the query cache, synchronously and without a request.
 *
 * Use {@link getCurrentUser} when the user may not be cached yet.
 *
 * @returns `null` when nobody is logged in or the session expired.
 */
function getCachedUser(): User | null {
  return queryClient.getQueryData(authQueries.currentUser().queryKey) ?? null;
}

export { getCachedUser };
