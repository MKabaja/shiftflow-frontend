import type { User } from '@/features/auth/model/user.schemas.ts';

type LandingPath = '/home' | '/schedule';

/**
 * Returns the screen a user starts on after signing in: `/home` for an employee, `/schedule` otherwise.
 *
 * Never returns a public path, which would make the route guards redirect in a loop.
 */
function landingPathFor(user: User): LandingPath {
  return user.role === 'employee' ? '/home' : '/schedule';
}
export { landingPathFor };
