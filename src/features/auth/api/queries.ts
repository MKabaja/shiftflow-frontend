import { queryOptions, useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/lib/config/queryKeys.ts';
import { backend } from '@/shared/api/backend.ts';
import { HttpError } from '@/shared/api/httpError.ts';
import { resourceOf } from '@/shared/api/envelopes.ts';
import { config } from '@/shared/lib/config/config.ts';
import { userSchema } from '@/features/auth/model/user.schemas.ts';

/**
 * Query for the signed-in user (`GET /me`), shared by hooks and route guards.
 *
 * A `401` means "not logged in" and is not retried; other errors retry once.
 */
const meQueryOptions = queryOptions({
  queryKey: queryKeys.auth.me,
  meta: { handled: true },
  queryFn: async () => {
    const body = await backend.get('/me');

    return resourceOf(userSchema).parse(body).data;
  },
  staleTime: config.staleTime.auth,
  retry: (failureCount, error) => {
    if (error instanceof HttpError && error.status === 401) return false;
    return failureCount < 1;
  },
});

function useMe() {
  return useQuery(meQueryOptions);
}

export { useMe, meQueryOptions };
