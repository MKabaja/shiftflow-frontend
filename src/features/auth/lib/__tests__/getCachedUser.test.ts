import { QueryClient } from '@tanstack/react-query';
import { authQueries } from '@/features/auth/api/auth.queries.ts';
import { makeUser } from '@/test/factories/user.factory.ts';

import { getCachedUser } from '../getCachedUser.ts';

describe('getCachedUser', () => {
	it('returns the very same user object that is stored in the cache', () => {
		const queryClient = new QueryClient();
		const user = makeUser();
		queryClient.setQueryData(authQueries.currentUser().queryKey, user);

		const result = getCachedUser(queryClient);

		expect(result).toBe(user);
	});

	it('returns null when nothing is cached', () => {
		const queryClient = new QueryClient();

		const result = getCachedUser(queryClient);

		expect(result).toBeNull();
	});
});
