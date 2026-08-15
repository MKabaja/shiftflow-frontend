import type { User } from '@/shared/types/api.ts';

type LandingPath = '/home' | '/schedule';

/**
 * Resolves the screen a user starts on once authenticated.
 *
 * The single owner of that decision: the login mutations use it after a
 * successful sign-in, and the route guards use it to bounce an already
 * logged-in visitor away from the public screens. Keeping it in one place is
 * what stops those callers from drifting apart.
 *
 * Returns an authenticated path only — never a public one, which would send
 * the guards into a redirect loop.
 *
 * @param user The authenticated {@link User}.
 * @returns `/home` for an employee, `/schedule` for every other role.
 */
function landingPathFor(user: User): LandingPath {
  return user.role === 'employee' ? '/home' : '/schedule';
}
export { landingPathFor };
