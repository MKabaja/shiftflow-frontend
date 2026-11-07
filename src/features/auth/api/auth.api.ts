import { backend } from '@/shared/api/backend.ts';
import { resourceOf } from '@/shared/api/envelopes.ts';
import { userSchema, type User } from '@/features/auth/model/user.schemas.ts';

/** Fetches the signed-in user (`GET /me`); rejects with a `401` `HttpError` when nobody is logged in. */
async function fetchCurrentUser(): Promise<User> {
  const body = await backend.get('/me');

  return resourceOf(userSchema).parse(body).data;
}

export { fetchCurrentUser };
