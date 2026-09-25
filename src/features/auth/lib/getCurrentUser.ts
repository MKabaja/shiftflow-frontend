import { meQueryOptions } from '@/features/auth/api/queries.ts';
import { queryClient } from '@/shared/lib/config/queryClient.ts';
import type { User } from '@/shared/types/api.ts';

/**
 * Reads the logged-in user for the route guards, from cache or the network.
 *
 * A plain function rather than a hook, so it can run inside `beforeLoad` —
 * outside React, where `useAuth` is unavailable.
 *
 * Being logged out is an ordinary state here, not a failure, so the rejection
 * that {@link meQueryOptions} raises on a `401` is turned into `null`. Every
 * other failure (network down, `500`) collapses to `null` as well, which the
 * guards read as "not logged in" — until route-level error handling exists,
 * bouncing to the login screen beats crashing the route.
 *
 * @returns The current {@link User}, or `null` when nobody is authenticated.
 */
async function getCurrentUser(): Promise<User | null> {
  try {
    return await queryClient.ensureQueryData(meQueryOptions);
  } catch {
    return null;
  }
}
export { getCurrentUser };
