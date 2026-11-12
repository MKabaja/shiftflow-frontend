import { authQueries } from '@/features/auth/api/auth.queries.ts';
import { queryClient } from '@/app/queryClient.ts';
import type { User } from '@/features/auth/model/user.schemas.ts';

/**
 * Loads the logged-in user for route guards, from cache or the network.
 *
 * Never rejects: any failure, not only `401`, resolves to `null`.
 *
 * @returns `null` when nobody is logged in or the request failed.
 */
async function getCurrentUser(): Promise<User | null> {
  try {
    return await queryClient.ensureQueryData(authQueries.currentUser());
  } catch {
    return null;
  }
}
export { getCurrentUser };
