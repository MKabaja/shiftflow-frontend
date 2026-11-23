import type { QueryClient } from '@tanstack/react-query';
import { authQueries } from '@/features/auth/api/auth.queries.ts';
import type { User } from '@/features/auth/model/user.schemas.ts';

/**
 * Returns the logged-in user from cache, requesting `/me` only when nothing is cached.
 *
 * @returns `null` when nobody is logged in or the request failed; never rejects.
 */
export async function getCurrentUser(
	queryClient: QueryClient,
): Promise<User | null> {
	try {
		return await queryClient.query({
			...authQueries.currentUser(),
			staleTime: 'static',
		});
	} catch {
		return null;
	}
}
