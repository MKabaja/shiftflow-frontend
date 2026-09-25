import type { User } from '@/shared/types/api.ts';

/**
 * Test factory for {@link User} — deterministic defaults + shallow overrides.
 *
 * Mirrors Laravel's `User::factory()->make()`: pass only the fields a test
 * cares about, the rest fall back to stable defaults. Overrides are typed
 * (`Partial<User>`), so field names and value types are still checked.
 *
 * @example
 * const admin = makeUser({ role: 'admin' });
 * const inactive = makeUser({ is_active: false });
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
