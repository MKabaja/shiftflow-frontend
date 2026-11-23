import { queryOptions } from '@tanstack/react-query';
import { fetchCurrentUser } from '@/features/auth/api/auth.api.ts';
import type { User } from '@/features/auth/model/user.schemas.ts';
import { HttpError } from '@/shared/api/httpError.ts';
import { config } from '@/shared/lib/config/config.ts';

/**
 * Query keys and options for the session.
 *
 * `currentUser` is shared by hooks and route guards. Its data is `null` after a `401` clears the
 * session. A `401` is not retried; other errors retry once.
 */
export const authQueries = {
	all: () => ['auth'] as const,
	currentUser: () =>
		queryOptions({
			queryKey: [...authQueries.all(), 'me'] as const,
			queryFn: (): Promise<User | null> => fetchCurrentUser(),
			meta: { handled: true },
			staleTime: config.staleTime.auth,
			retry: retryUnlessUnauthorized,
		}),
};

function retryUnlessUnauthorized(failureCount: number, error: Error): boolean {
	if (error instanceof HttpError && error.status === 401) return false;
	return failureCount < 1;
}
