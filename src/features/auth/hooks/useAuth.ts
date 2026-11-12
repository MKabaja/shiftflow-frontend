import { useQuery } from '@tanstack/react-query';
import { authQueries } from '@/features/auth/api/auth.queries.ts';
import type { User } from '@/features/auth/model/user.schemas.ts';

type UseAuthResult = {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isManager: boolean;
  isEmployee: boolean;
};

/**
 * Returns the logged-in {@link User} from the query cache, with role flags.
 *
 * @returns `user` is `null` when nobody is logged in or before the first fetch.
 */
function useAuth(): UseAuthResult {
  const { data: user } = useQuery(authQueries.currentUser());
  return {
    user: user ?? null,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isManager: user?.role === 'manager',
    isEmployee: user?.role === 'employee',
  };
}
export { useAuth };
