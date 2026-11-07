import { backend } from '@/shared/api/backend.ts';
import { resourceOf } from '@/shared/api/envelopes.ts';
import { userSchema, type User } from '@/features/auth/model/user.schemas.ts';
import type { LoginFormValues, LoginPinFormValues } from '@/features/auth/model/login.schemas.ts';

/** `GET /me`. Rejects with a `401` `HttpError` when nobody is logged in. */
async function fetchCurrentUser(): Promise<User> {
  const body = await backend.get('/me');

  return resourceOf(userSchema).parse(body).data;
}

/** `POST /auth/login`. Rejects with a `401` `HttpError` on wrong credentials. */
async function login(credentials: LoginFormValues): Promise<User> {
  const body = await backend.post('/auth/login', { body: credentials, ignoreUnauthorized: true });

  return resourceOf(userSchema).parse(body).data;
}

/** `POST /auth/login-pin`. Rejects with a `401` `HttpError` on wrong credentials. */
async function loginWithPin(credentials: LoginPinFormValues): Promise<User> {
  const body = await backend.post('/auth/login-pin', {
    body: credentials,
    ignoreUnauthorized: true,
  });

  return resourceOf(userSchema).parse(body).data;
}

/** `POST /auth/logout`. */
async function logout(): Promise<void> {
  await backend.post('/auth/logout');
}

export { fetchCurrentUser, login, loginWithPin, logout };
