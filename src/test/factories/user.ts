import type { User } from '@/features/auth/model/user.schemas.ts';

/**
 * Builds a {@link User} with deterministic defaults and shallow overrides.
 */
export function makeUser(overrides: Partial<User> = {}): User {
  return {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    login: 'test.user',
    role: 'employee',
    is_active: true,
    hourly_rate: null,
    monthly_hour_limit: null,
    quarter_hour_limit: null,
    break_limit: null,
    contract_type: null,
    locale: 'pl',
    positions: [],
    created_at: '2026-01-01T00:00:00.000000Z',
    ...overrides,
  };
}
