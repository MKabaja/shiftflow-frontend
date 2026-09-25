import { useMe } from '@/features/auth/api/queries.ts';
import type { User } from '@/shared/types/api.ts';

type UseAuthResult = {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isManager: boolean;
  isEmployee: boolean;
};

/**
 * Reads "who is logged in" from the {@link useMe} cache for use in components.
 *
 * Holds no state of its own. Normalizes the query's `undefined` (before the
 * first fetch) to `null`, so consumers handle a single "empty" shape, and
 * precomputes role flags for ergonomic checks in JSX.
 *
 * @returns The current {@link User} (`null` when unauthenticated), plus
 * `isAuthenticated` and per-role booleans (`isAdmin` / `isManager` / `isEmployee`).
 *
 * @example
 * const { user, isAdmin } = useAuth();
 * if (isAdmin) return <AdminPanel />;
 */
function useAuth(): UseAuthResult {
  const { data: user } = useMe();
  return {
    user: user ?? null,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isManager: user?.role === 'manager',
    isEmployee: user?.role === 'employee',
  };
}
export { useAuth };
