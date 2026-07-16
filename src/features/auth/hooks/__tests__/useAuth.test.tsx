import { useAuth } from '../useAuth.ts';
import { makeUser } from '@/test/factories/user.ts';
import { renderHook } from '@testing-library/react';
import { useMe } from '@/features/auth/api/queries.ts';
import type { User } from '@/shared/types/api.ts';

const mockUseMe = (data: User | undefined) => {
  vi.mocked(useMe).mockReturnValue({
    data,
  } as ReturnType<typeof useMe>);
};

vi.mock('@/features/auth/api/queries.ts', () => ({
  useMe: vi.fn(),
}));

const employee = makeUser();

describe('useAuth', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns user = null when useMe has no data (undefined)', () => {
    mockUseMe(undefined);
    const { result } = renderHook(() => useAuth());
    expect(result.current.user).toBeNull();
  });

  it('all role flags are false when there is no user', () => {
    mockUseMe(undefined);
    const { result } = renderHook(() => useAuth());

    const { isAuthenticated, isAdmin, isManager, isEmployee } = result.current;

    expect(isAuthenticated).toBe(false);
    expect(isAdmin).toBe(false);
    expect(isManager).toBe(false);
    expect(isEmployee).toBe(false);
  });

  it('returns the user when useMe has data', () => {
    mockUseMe(employee);
    const { result } = renderHook(() => useAuth());
    expect(result.current.user).toBe(employee);
  });

  it('isAuthenticated is true when a user is present', () => {
    mockUseMe(employee);
    const { result } = renderHook(() => useAuth());
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('sets isAdmin true (others false) for an admin', () => {
    const admin = makeUser({ role: 'admin' });
    mockUseMe(admin);
    const { result } = renderHook(() => useAuth());
    const { isAdmin, isManager, isEmployee } = result.current;

    expect(isAdmin).toBe(true);
    expect(isManager).toBe(false);
    expect(isEmployee).toBe(false);
  });

  it('sets isManager true (others false) for a manager', () => {
    const manager = makeUser({ role: 'manager' });
    mockUseMe(manager);
    const { result } = renderHook(() => useAuth());
    const { isAdmin, isManager, isEmployee } = result.current;

    expect(isAdmin).toBe(false);
    expect(isManager).toBe(true);
    expect(isEmployee).toBe(false);
  });

  it('sets isEmployee true (others false) for an employee', () => {
    mockUseMe(employee);
    const { result } = renderHook(() => useAuth());
    const { isAdmin, isManager, isEmployee } = result.current;

    expect(isAdmin).toBe(false);
    expect(isManager).toBe(false);
    expect(isEmployee).toBe(true);
  });
});
