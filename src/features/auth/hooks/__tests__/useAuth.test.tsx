import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { delay, http } from 'msw';
import { useAuth } from '../useAuth.ts';
import { authQueries } from '@/features/auth/api/auth.queries.ts';
import { makeUser } from '@/test/factories/user.ts';
import { server } from '@/test/msw/server.ts';
import type { User } from '@/features/auth/model/user.schemas.ts';

function renderUseAuth(user?: User) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  if (user) queryClient.setQueryData(authQueries.currentUser().queryKey, user);

  function wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  }

  return renderHook(() => useAuth(), { wrapper });
}

const employee = makeUser();

describe('useAuth', () => {
  beforeEach(() => {
    server.use(
      http.get('/api/me', async () => {
        await delay('infinite');
      }),
    );
  });

  it('returns user = null when the user query has no data (undefined)', () => {
    const { result } = renderUseAuth();
    expect(result.current.user).toBeNull();
  });

  it('all role flags are false when there is no user', () => {
    const { result } = renderUseAuth();

    const { isAuthenticated, isAdmin, isManager, isEmployee } = result.current;

    expect(isAuthenticated).toBe(false);
    expect(isAdmin).toBe(false);
    expect(isManager).toBe(false);
    expect(isEmployee).toBe(false);
  });

  it('returns the user when the user query has data', () => {
    const { result } = renderUseAuth(employee);
    expect(result.current.user).toBe(employee);
  });

  it('isAuthenticated is true when a user is present', () => {
    const { result } = renderUseAuth(employee);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('sets isAdmin true (others false) for an admin', () => {
    const admin = makeUser({ role: 'admin' });
    const { result } = renderUseAuth(admin);
    const { isAdmin, isManager, isEmployee } = result.current;

    expect(isAdmin).toBe(true);
    expect(isManager).toBe(false);
    expect(isEmployee).toBe(false);
  });

  it('sets isManager true (others false) for a manager', () => {
    const manager = makeUser({ role: 'manager' });
    const { result } = renderUseAuth(manager);
    const { isAdmin, isManager, isEmployee } = result.current;

    expect(isAdmin).toBe(false);
    expect(isManager).toBe(true);
    expect(isEmployee).toBe(false);
  });

  it('sets isEmployee true (others false) for an employee', () => {
    const { result } = renderUseAuth(employee);
    const { isAdmin, isManager, isEmployee } = result.current;

    expect(isAdmin).toBe(false);
    expect(isManager).toBe(false);
    expect(isEmployee).toBe(true);
  });
});
