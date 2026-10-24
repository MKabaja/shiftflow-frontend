import { meQueryOptions } from '@/features/auth/api/queries.ts';
import { queryClient } from '@/shared/lib/config/queryClient.ts';
import { makeUser } from '@/test/factories/user.ts';

import { getCachedUser } from '../getCachedUser.ts';

describe('getCachedUser', () => {
  afterEach(() => {
    queryClient.clear();
  });

  it('returns the very same user object that is stored in the cache', () => {
    const user = makeUser();
    queryClient.setQueryData(meQueryOptions.queryKey, user);

    const result = getCachedUser();

    expect(result).toBe(user);
  });

  it('returns null when nothing is cached', () => {
    const result = getCachedUser();

    expect(result).toBeNull();
  });
});
